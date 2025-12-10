document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-principal');
    // Las rutas deben coincidir con tus archivos en assets/images/
    const images = [
        'via-crucis05.jpg',
        'mis-turismo.jpg',
        'via-crucis03.jpg', 
        'chepen02.jpg'
        // Añade aquí todas las imágenes que quieras en el carrusel
    ];
    let currentIndex = 0;

    // Función para cambiar la imagen de fondo
    const changeBackground = () => {
        // Construye la ruta relativa desde la raíz del proyecto
        const imageUrl = `assets/imagenes/${images[currentIndex]}`;
        
        // Aplica un efecto de transición suave
        heroSection.style.opacity = 0; 
        
        setTimeout(() => {
            heroSection.style.backgroundImage = `url(${imageUrl})`;
            heroSection.style.opacity = 1;
        }, 500); // Espera 0.5 segundos para la transición
        
        // Avanza al siguiente índice, volviendo a 0 si llega al final
        currentIndex = (currentIndex + 1) % images.length;
    };

    // Inicializa el carrusel (el primer cambio será inmediato)
    heroSection.style.transition = 'opacity 0.5s ease-in-out';
    changeBackground();

    // Configura el intervalo para cambiar la imagen cada 5 segundos (5000ms)
    setInterval(changeBackground, 5000); 

    // Opcional: Para evitar que el usuario vea la primera imagen estática
    // en el CSS, podemos borrar el background-image estático de .hero-principal 
    // y dejar que JS lo ponga desde el inicio. Por ahora lo dejamos para la prueba.
});