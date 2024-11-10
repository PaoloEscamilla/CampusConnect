document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const rutaId = urlParams.get('ruta'); // Obtener el ID de la ruta desde la URL
    
    if (rutaId) {
        // Hacer una solicitud para obtener los pasos de la ruta
        fetch(`http://localhost:3000/rutas/conPasos/${rutaId}`)
            .then(response => response.json())
            .then(data => {
                const pasosList = document.getElementById('pasos-list');
                pasosList.innerHTML = ''; // Limpiar la lista de pasos

                const destinoNombre = data.ubicacionDestino?.nombre || "Destino desconocido";
                
                // Título para los pasos con el nombre del destino
                const titulo = document.createElement('h3');
                titulo.textContent = `Pasos para llegar a ${destinoNombre}:`;
                pasosList.appendChild(titulo);

                if (!data.pasosRuta || data.pasosRuta.length === 0) {
                    pasosList.innerHTML += '<p>No se encontraron pasos para esta ruta.</p>';
                    return;
                }
                
                // Mostrar cada paso con su instrucción, secuencia y imagen
                data.pasosRuta.forEach(paso => {
                    const pasoItem = document.createElement('div');
                    pasoItem.classList.add('paso-item');
                    
                    pasoItem.innerHTML = `
                        <p><strong>Secuencia ${paso.secuencia}:</strong> ${paso.instruccion}</p>
                        <img src="${paso.imagen_url}" alt="Imagen del paso" style="width:100%; max-width:400px;">
                    `;
                    
                    pasosList.appendChild(pasoItem);
                });

                // Mostrar la sección de pasos
                document.getElementById('pasos-section').style.display = 'block';
            })
            .catch(error => {
                const pasosList = document.getElementById('pasos-list');
                pasosList.innerHTML = '<p>Error al cargar los pasos de la ruta.</p>';
                console.error('Error al cargar los pasos de la ruta:', error);
            });
    } else {
        console.error('No se encontró el ID de la ruta en la URL');
    }
});
