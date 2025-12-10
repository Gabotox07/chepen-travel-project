document.addEventListener('DOMContentLoaded', () => {
    const eventosGrid = document.getElementById('eventos-grid');
    const filterButtons = document.querySelectorAll('.filter-buttons .btn-filter');
    const apiUrl = 'data/eventos.json';
    let allEventos = [];

    // Función para obtener los eventos
    const fetchEventos = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('No se pudo obtener el archivo de eventos.');
            }
            allEventos = await response.json();
            renderEventos(allEventos);
            
        } catch (error) {
            console.error('Error cargando eventos:', error);
            eventosGrid.innerHTML = '<p class="text-center error-message">No se pudo cargar el calendario de eventos.</p>';
        }
    };

    // Función para renderizar las tarjetas de eventos
    const renderEventos = (eventosToRender) => {
        eventosGrid.innerHTML = ''; // Limpiar la grilla
        
        if (eventosToRender.length === 0) {
            eventosGrid.innerHTML = '<p class="text-center">No hay eventos disponibles para esta categoría.</p>';
            eventosGrid.style.display = 'block'; // Asegurar que el mensaje se vea
            return;
        }

        // Usamos la clase experiencias-grid para aplicar el layout CSS grid
        eventosToRender.forEach(evento => {
            const cardHTML = `
                <div class="evento-card" data-tipo="${evento.tipo}">
                    <div class="evento-card-header">
                        <img src="assets/imagenes/${evento.imagen}" alt="${evento.nombre}">
                        <span class="evento-date">${evento.fecha}</span>
                    </div>
                    <div class="evento-card-content">
                        <h3>${evento.nombre}</h3>
                        <p class="lugar"><i class="fas fa-map-marker-alt"></i> ${evento.lugar}</p>
                        <p>${evento.descripcion}</p>
                        <button class="btn btn-primary btn-small mt-2">Ver Detalles</button>
                    </div>
                </div>
            `;
            eventosGrid.innerHTML += cardHTML;
        });
    };

    // 5. Lógica de Filtros
    const handleFilter = (filter) => {
        // Remover clase 'active' de todos y añadir al botón clicado
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.btn-filter[data-filter="${filter}"]`).classList.add('active');

        // Filtrar los eventos
        if (filter === 'all') {
            renderEventos(allEventos);
        } else {
            const filtered = allEventos.filter(evento => evento.tipo === filter);
            renderEventos(filtered);
        }
    };

    // Asignar eventos a los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filterValue = e.currentTarget.getAttribute('data-filter');
            handleFilter(filterValue);
        });
    });

    // Iniciar la carga de eventos
    fetchEventos();
});