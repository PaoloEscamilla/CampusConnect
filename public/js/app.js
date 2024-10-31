document.addEventListener('DOMContentLoaded', () => {
    const origenSelect = document.getElementById('origen');
    const destinoSelect = document.getElementById('destino');
    const buscarButton = document.getElementById('buscar');
    const rutasContainer = document.getElementById('rutas');
    const pasosContainer = document.getElementById('pasos');
  
    // Cargar opciones de ubicaciones
    const cargarUbicaciones = async () => {
      try {
        const response = await fetch('/ubicaciones');
        if (!response.ok) {
          throw new Error('Error al cargar ubicaciones');
        }
        const ubicaciones = await response.json();
  
        console.log('Ubicaciones cargadas:', ubicaciones);
  
        ubicaciones.forEach(ubicacion => {
          console.log('Procesando ubicación:', ubicacion);
          const option = document.createElement('option');
          option.value = ubicacion.id;
          option.textContent = ubicacion.nombre;
  
          // Filtrar según el tipo de ubicación
          if (ubicacion.tipo === 'entrada') {
            origenSelect.appendChild(option);
          } else if (ubicacion.tipo === 'edificio') {
            destinoSelect.appendChild(option);
          }
        });
      } catch (error) {
        console.error('Error al cargar ubicaciones:', error);
      }
    };
  
    cargarUbicaciones();
  
    // Buscar rutas
    buscarButton.addEventListener('click', async () => {
      const origenId = parseInt(origenSelect.value);
      const destinoId = parseInt(destinoSelect.value);
  
      if (!origenId || !destinoId) {
        alert('Por favor selecciona un origen y un destino.');
        return;
      }
  
      try {
        const response = await fetch(`/rutas/filtrar?origen_id=${origenId}&destino_id=${destinoId}`);
        if (!response.ok) {
          throw new Error('No se encontraron rutas.');
        }
        const rutas = await response.json();
        mostrarRutas(rutas);
      } catch (error) {
        rutasContainer.innerHTML = '<p>No se encontraron rutas.</p>';
        pasosContainer.innerHTML = '';
        console.error('Error al obtener rutas:', error);
      }
    });
  
    // Mostrar rutas en el contenedor
    const mostrarRutas = (rutas) => {
      rutasContainer.innerHTML = '';
      pasosContainer.innerHTML = '';
  
      rutas.forEach(ruta => {
        const rutaDiv = document.createElement('div');
        rutaDiv.className = 'ruta';
        rutaDiv.innerHTML = `
          <h3>Ruta desde ${ruta.origen_id} hacia ${ruta.destino_id}</h3>
          <img src="${ruta.imagen_url}" alt="Referencia visual">
          <p>Duración: ${ruta.duracion} minutos</p>
          <p>Distancia: ${ruta.distancia} metros</p>
          <button onclick="cargarPasos(${ruta.id})">Ver pasos</button>
        `;
        rutasContainer.appendChild(rutaDiv);
      });
    };
  
    // Cargar los pasos de una ruta
    window.cargarPasos = async (rutaId) => {
      try {
        const response = await fetch(`/rutas/conPasos/${rutaId}`);
        if (!response.ok) {
          throw new Error('Error al obtener pasos de la ruta');
        }
        const { pasos } = await response.json();
  
        pasosContainer.innerHTML = '';
        pasos.forEach(paso => {
          const pasoDiv = document.createElement('div');
          pasoDiv.className = 'paso';
          pasoDiv.innerHTML = `
            <p>Instrucción: ${paso.instruccion}</p>
            <p>Secuencia: ${paso.secuencia}</p>
          `;
          pasosContainer.appendChild(pasoDiv);
        });
      } catch (error) {
        pasosContainer.innerHTML = '<p>Error al obtener pasos de la ruta.</p>';
        console.error('Error al obtener pasos:', error);
      }
    };
  });
  