document.addEventListener('DOMContentLoaded', () => {
    const rutasContainer = document.getElementById('rutas-container');
    const mapModal = document.getElementById('map-modal');
    const closeModalButton = document.querySelector('.close-button');
    const mapIframe = document.getElementById('map-iframe');
    
    let allRutas = []; // Para almacenar los datos cargados del JSON

    // 1. Función para obtener y almacenar los datos de rutas desde JSON
    const fetchRutas = async () => {
        try {
            const response = await fetch('data/rutas.json');
            if (!response.ok) {
                // Si el archivo no se encuentra (404) o hay otro error
                throw new Error('Error al cargar rutas.json. Verifique el archivo.');
            }
            allRutas = await response.json();
            // Una vez cargados, renderiza las rutas
            renderRutas(allRutas); 
            
        } catch (error) {
            console.error('Fallo al obtener datos de rutas:', error);
            rutasContainer.innerHTML = '<p class="text-center error-message">No se pudieron cargar las rutas turísticas. Inténtelo más tarde.</p>';
        }
    };

    // 2. Función para renderizar el listado de rutas
    const renderRutas = (rutasToRender) => {
        rutasContainer.innerHTML = ''; // Limpiar
        
        rutasToRender.forEach(ruta => {
            // Convierte el array de puntos en una lista <li> HTML
            const puntosList = ruta.puntos.map(punto => `<li><i class="fas fa-map-pin"></i> ${punto}</li>`).join('');
            
            const rutaHTML = `
                <div id="${ruta.id}" class="ruta-card-detail">
                    <div class="ruta-header">
                        <h3>${ruta.nombre}</h3>
                        <div class="ruta-info">
                            <i class="fas fa-clock"></i> ${ruta.duracion} | 
                            <i class="fas fa-car-side"></i> ${ruta.transporte}
                        </div>
                    </div>
                    <div class="ruta-content">
                        <p>${ruta.descripcion}</p>
                        <h4>Puntos Clave del Recorrido</h4>
                        <ul class="ruta-pasos">
                            ${puntosList}
                        </ul>
                        <button class="btn btn-primary mt-3 show-map-btn" data-map-url="${ruta.mapUrl}">
                            <i class="fas fa-map-marked-alt"></i> Ver Mapa
                        </button>
                    </div>
                </div>
            `;
            rutasContainer.innerHTML += rutaHTML;
        });
        
        // Asignar eventos a los nuevos botones
        document.querySelectorAll('.show-map-btn').forEach(button => {
            button.addEventListener('click', showMapModal);
        });
    };

    // 3. Función para mostrar el modal del mapa
    const showMapModal = (event) => {
        const mapUrl = event.currentTarget.getAttribute('data-map-url');
        
        // Establecer la URL del mapa en el iframe
        mapIframe.src = mapUrl;
        
        // Mostrar el modal
        mapModal.style.display = 'block';
    };

    // 4. Función para cerrar el modal
    const closeMapModal = () => {
        mapModal.style.display = 'none';
        mapIframe.src = ''; // Limpiar el iframe
    };

    // 5. Eventos para el modal
    closeModalButton.addEventListener('click', closeMapModal);

    window.addEventListener('click', (event) => {
        // Cerrar modal al hacer clic fuera
        if (event.target === mapModal) {
            closeMapModal();
        }
    });

    // Iniciar la carga de rutas al cargar la página
    fetchRutas();
});