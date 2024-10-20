// Obtener referencias a los elementos del DOM
const origenSelect = document.getElementById('origen');
const destinoSelect = document.getElementById('destino');
const rutasDiv = document.getElementById('rutas');
const pasosDiv = document.getElementById('pasos');

// Cargar ubicaciones (origen y destino) desde la API
async function cargarUbicaciones() {
    try {
        const res = await fetch('/ubicaciones');
        const ubicaciones = await res.json();

        origenSelect.innerHTML = '<option value="">Selecciona un origen</option>';
        destinoSelect.innerHTML = '<option value="">Selecciona un destino</option>';

        ubicaciones.forEach((ubicacion) => {
            const optionOrigen = document.createElement('option');
            optionOrigen.value = ubicacion.codigo;
            optionOrigen.textContent = ubicacion.nombre;
            origenSelect.appendChild(optionOrigen);

            const optionDestino = document.createElement('option');
            optionDestino.value = ubicacion.codigo;
            optionDestino.textContent = ubicacion.nombre;
            destinoSelect.appendChild(optionDestino);
        });
    } catch (error) {
        console.error('Error al cargar ubicaciones:', error);
    }
}

// Cargar rutas cuando se seleccionan origen y destino
async function cargarRutas() {
    const origen = origenSelect.value;
    const destino = destinoSelect.value;

    if (!origen || !destino) {
        rutasDiv.innerHTML = '<p>Por favor selecciona origen y destino.</p>';
        return;
    }

    try {
        const res = await fetch(`/rutas/destino/${destino}`);
        const rutas = await res.json();

        rutasDiv.innerHTML = ''; // Limpiar rutas anteriores

        if (rutas.length > 0) {
            rutas.forEach((ruta) => {
                const rutaCard = document.createElement('div');
                rutaCard.innerHTML = `
                    <p><strong>Duración:</strong> ${ruta.duracion}</p>
                    <p><strong>Distancia:</strong> ${ruta.distancia}</p>
                    <button class="ver-pasos" data-id="${ruta.id}">Ver Pasos</button>
                `;
                rutasDiv.appendChild(rutaCard);
            });
        } else {
            rutasDiv.innerHTML = '<p>No se encontraron rutas.</p>';
        }

        // Asignar eventos a los botones "Ver Pasos"
        asignarEventosVerPasos();
    } catch (error) {
        console.error('Error al cargar las rutas:', error);
        rutasDiv.innerHTML = '<p>Error al cargar las rutas.</p>';
    }
}

// Asignar manejador de eventos a los botones "Ver Pasos"
function asignarEventosVerPasos() {
    const botonesVerPasos = document.querySelectorAll('.ver-pasos');
    botonesVerPasos.forEach((boton) => {
        boton.addEventListener('click', async () => {
            const rutaId = boton.getAttribute('data-id');
            try {
                const resPasos = await fetch(`/pasos/${rutaId}`);
                const pasos = await resPasos.json(); // Obtener el array de pasos

                pasosDiv.innerHTML = ''; // Limpiar los pasos anteriores

                if (pasos.length > 0) {
                    console.log('Pasos obtenidos:', pasos); // Verificar en la consola si llegan todos los pasos

                    pasos.forEach((paso) => {
                        const pasoCard = document.createElement('div');
                        pasoCard.innerHTML = `
                            <p><strong>${paso.secuencia}.</strong> ${paso.instruccion}</p>
                            <img src="${paso.imagen_url}" alt="Imagen del paso" style="width: 100px; height: auto;">
                        `;
                        pasosDiv.appendChild(pasoCard);
                    });
                } else {
                    pasosDiv.innerHTML = '<p>No se encontraron pasos para esta ruta.</p>';
                }
            } catch (error) {
                console.error('Error al cargar los pasos:', error);
                pasosDiv.innerHTML = '<p>Error al cargar los pasos.</p>';
            }
        });
    });
}

// Inicializar eventos
document.getElementById('buscar').addEventListener('click', cargarRutas);

// Cargar las ubicaciones al cargar la página
cargarUbicaciones();
