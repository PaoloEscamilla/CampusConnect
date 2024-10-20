document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const rutaId = urlParams.get('ruta'); // Obtener el ID de la ruta desde la URL
    
    if (rutaId) {
        // Hacer una solicitud para obtener los pasos de la ruta
        fetch(`http://localhost:3000/rutas/completa/${rutaId}`)
            .then(response => response.json())
            .then(data => {
                const pasosList = document.getElementById('pasos-list');
                pasosList.innerHTML = ''; // Limpiar la lista de pasos
                
                if (data.pasos.length === 0) {
                    pasosList.innerHTML = '<p>No se encontraron pasos para esta ruta.</p>';
                    return;
                }
                
                data.pasos.forEach(paso => {
                    const pasoItem = document.createElement('div');
                    pasoItem.classList.add('paso-item');
                    pasoItem.textContent = `${paso.secuencia}. ${paso.instruccion}`;
                    pasosList.appendChild(pasoItem);
                });

                // Mostrar la sección de pasos
                document.getElementById('pasos-section').style.display = 'block';
            })
            .catch(error => console.error('Error al cargar los pasos de la ruta:', error));
    } else {
        console.error('No se encontró el ID de la ruta en la URL');
    }
});
