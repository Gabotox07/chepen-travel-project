document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('lugares-grid');
    const filterButtons = document.querySelectorAll('.btn-filter');
    let allLugares = []; // Variable global para almacenar todos los datos

    // Función para obtener y almacenar los datos de lugares
    const fetchLugares = async () => {
        try {
            const response = await fetch('data/lugares.json');
            if (!response.ok) {
                throw new Error('Error al cargar lugares.json');
            }
            allLugares = await response.json();
            // Una vez cargados, renderiza todos los lugares por defecto
            renderLugares(allLugares); 
            
        } catch (error) {
            console.error('Error al obtener datos de lugares:', error);
            gridContainer.innerHTML = '<p class="error-message">No se pudieron cargar los destinos turísticos. Inténtelo más tarde.</p>';
        }
    };

    // Función principal para renderizar las tarjetas
    const renderLugares = (lugaresToRender) => {
        gridContainer.innerHTML = ''; // Limpia el contenedor
        
        if (lugaresToRender.length === 0) {
            gridContainer.innerHTML = '<p class="text-center">No se encontraron destinos que coincidan con el filtro.</p>';
            return;
        }

        lugaresToRender.forEach(lugar => {
            const cardHTML = `
                <div class="experiencia-card" data-category="${lugar.categoria}">
                    <img src="assets/imagenes/${lugar.imagen}" alt="Imagen de ${lugar.nombre}">
                    <div class="experiencia-card-content">
                        <span class="card-category">${lugar.categoria}</span>
                        <h3>${lugar.nombre}</h3>
                        <p>${lugar.descripcion}</p>
                        <a href="#" class="btn btn-primary btn-small">Más detalles</a> 
                    </div>
                </div>
            `;
            gridContainer.innerHTML += cardHTML;
        });
    };

    // Función para manejar el clic en los botones de filtro
    const handleFilterClick = (event) => {
        // Remover 'active' de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Agregar 'active' al botón clicado
        event.currentTarget.classList.add('active');

        // Obtener el valor del filtro (Historia, Naturaleza, all, etc.)
        const filterValue = event.currentTarget.getAttribute('data-filter');

        let filteredLugares = [];

        if (filterValue === 'all') {
            // Mostrar todos los lugares
            filteredLugares = allLugares;
        } else {
            // Filtrar por la categoría seleccionada
            filteredLugares = allLugares.filter(lugar => lugar.categoria === filterValue);
        }

        // Renderizar el resultado
        renderLugares(filteredLugares);
    };

    // Asignar el evento click a cada botón de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Iniciar la carga de los datos al cargar la página
    fetchLugares();
});