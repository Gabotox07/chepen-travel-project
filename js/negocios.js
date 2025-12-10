document.addEventListener('DOMContentLoaded', () => {
    const negociosGrid = document.getElementById('negocios-grid');
    const filterButtons = document.querySelectorAll('.filter-buttons .btn-filter');
    const apiUrl = 'data/negocios.json';
    let allNegocios = [];

    // 1. Función para obtener los negocios
    const fetchNegocios = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('No se pudo obtener el archivo de negocios.');
            }
            allNegocios = await response.json();
            renderNegocios(allNegocios);
            
        } catch (error) {
            console.error('Error cargando negocios:', error);
            negociosGrid.innerHTML = '<p class="text-center error-message">No se pudo cargar el directorio de negocios.</p>';
        }
    };

    // 2. Función para renderizar las tarjetas de negocios
    const renderNegocios = (negociosToRender) => {
        negociosGrid.innerHTML = ''; // Limpiar la grilla
        
        if (negociosToRender.length === 0) {
            negociosGrid.innerHTML = '<p class="text-center">No hay negocios disponibles para esta categoría.</p>';
            return;
        }

        negociosToRender.forEach(negocio => {
            // Determinar si es Premium y el contenido de la etiqueta
            const isPremium = negocio.nivel === 'Premium';
            const premiumClass = isPremium ? 'premium' : 'basico';
            const premiumTag = isPremium ? '<span class="premium-tag"><i class="fas fa-star"></i> PREMIUM</span>' : '';
            
            const cardHTML = `
                <div class="negocio-card ${premiumClass}" data-categoria="${negocio.categoria}">
                    <div class="negocio-card-header">
                        <img src="assets/imagenes/${negocio.imagen}" alt="${negocio.nombre}">
                        ${premiumTag}
                    </div>
                    <div class="negocio-card-content">
                        <h3 class="card-title">${negocio.nombre}</h3>
                        <p class="card-category">${negocio.categoria}</p>
                        <p>${negocio.descripcion}</p>
                        <p class="contacto"><i class="fas fa-phone"></i> ${negocio.contacto}</p>
                        <button class="btn btn-primary btn-small mt-2">Más Información</button>
                    </div>
                </div>
            `;
            negociosGrid.innerHTML += cardHTML;
        });
    };

    // 3. Lógica de Filtros
    const handleFilter = (filter) => {
        // Remover clase 'active' de todos y añadir al botón clicado
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.btn-filter[data-filter="${filter}"]`).classList.add('active');

        // Filtrar los negocios
        if (filter === 'all') {
            renderNegocios(allNegocios);
        } else {
            // Nota: El filtro debe ser case-sensitive (coincidir con el JSON)
            const filtered = allNegocios.filter(negocio => negocio.categoria === filter);
            renderNegocios(filtered);
        }
    };

    // Asignar eventos a los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filterValue = e.currentTarget.getAttribute('data-filter');
            handleFilter(filterValue);
        });
    });

    // Iniciar la carga de negocios
    fetchNegocios();
});