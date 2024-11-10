document.addEventListener('DOMContentLoaded', () => {
  const origenSelect = document.getElementById('origen');
  const destinoSelect = document.getElementById('destino');
  const buscarButton = document.getElementById('buscar');
  const rutasContainer = document.getElementById('rutas');
  const pasosContainer = document.getElementById('pasos-container');

  // Cargar opciones de ubicaciones
  const cargarUbicaciones = async () => {
    try {
      const response = await fetch('/ubicaciones');
      if (!response.ok) {
        throw new Error('Error al cargar ubicaciones');
      }
      const ubicaciones = await response.json();

      // Ordenar las ubicaciones alfabéticamente por nombre
      ubicaciones.sort((a, b) => a.nombre.localeCompare(b.nombre));

      ubicaciones.forEach(ubicacion => {
        const option = document.createElement('option');
        option.value = ubicacion.id;

        // Filtrar según el tipo de ubicación y ajustar el texto mostrado
        if (ubicacion.tipo === 'entrada') {
          option.textContent = ubicacion.nombre; // Solo el nombre para las entradas
          origenSelect.appendChild(option);
        } else if (ubicacion.tipo === 'edificio') {
          option.textContent = `${ubicacion.nombre} - ${ubicacion.descripcion}`; // Nombre y descripción para edificios
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
    const origenId = parseInt(origenSelect.value, 10);
    const destinoId = parseInt(destinoSelect.value, 10);

    if (isNaN(origenId) || isNaN(destinoId)) {
      alert('Por favor selecciona un origen y un destino válidos.');
      return;
    }

    try {
      const response = await fetch(`/rutas/filtrar?origen_id=${origenId}&destino_id=${destinoId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se encontraron rutas.');
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
  
    if (rutas.length === 0) {
      rutasContainer.innerHTML = '<p>No se encontraron rutas.</p>';
      return;
    }
  
    rutas.forEach(ruta => {
      const destinoNombre = ruta.ubicacionDestino.descripcion || ruta.ubicacionDestino.nombre;
      const origenNombre = ruta.ubicacionOrigen.descripcion || ruta.ubicacionOrigen.nombre;
      const rutaDiv = document.createElement('div');
      rutaDiv.className = 'ruta';
      rutaDiv.innerHTML = `
        <h3>Ruta desde ${origenNombre} hacia ${destinoNombre}</h3>
        <img src="${ruta.imagen_url}" alt="Referencia visual">
        <p>Duración: ${ruta.duracion || 'No especificada'} minutos</p>
        <p>Distancia: ${ruta.distancia || 'No especificada'} metros</p>
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener pasos de la ruta');
      }
      const rutaData = await response.json(); // Obtener datos completos de la ruta
    
      console.log('Datos de la ruta con pasos:', rutaData); // Log para verificar los datos

      // Revisar si los pasos existen en la respuesta
      if (!rutaData.pasosRuta || rutaData.pasosRuta.length === 0) {
        pasosContainer.innerHTML = '<p>No hay pasos disponibles para esta ruta.</p>';
        return;
      }

      // Limpiar y agregar los pasos al contenedor
      pasosContainer.innerHTML = '';
      rutaData.pasosRuta.forEach(paso => {
        const pasoDiv = document.createElement('div');
        pasoDiv.className = 'paso';
        pasoDiv.innerHTML = `
          <p>Secuencia: ${paso.secuencia}</p>
          <p>Instrucción: ${paso.instruccion}</p>
          <img src="${paso.imagen_url}" alt="Imagen de paso" style="max-width: 100px;">
        `;
        pasosContainer.appendChild(pasoDiv);
      });
    } catch (error) {
      pasosContainer.innerHTML = '<p>Error al obtener pasos de la ruta.</p>';
      console.error('Error al obtener pasos:', error);
    }
  };
});

