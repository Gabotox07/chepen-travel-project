document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // 1. Efecto Sticky para el Header [cite: 299]
    // Aunque el header ya es fixed, esta función podría cambiar su estilo 
    // (ej. añadir sombra o cambiar fondo) al hacer scroll.
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // 2. Animación del Menú Móvil (collapsible menú) [cite: 299]
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        // Cambiar icono del botón (ej. de barras a X)
        const icon = navToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Añade el CSS para el efecto sticky en style.css (ejemplo)
    /*
    #main-header.sticky {
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .dark-mode #main-header.sticky {
        background-color: rgba(18, 18, 18, 0.95);
        box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);
    }
    */
    
    // Aquí se inicializarían otras funciones generales como el carrusel
    // pero eso lo haremos en el siguiente paso.
});