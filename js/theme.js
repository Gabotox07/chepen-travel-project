document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Obtener la preferencia guardada del LocalStorage [cite: 142]
    const currentTheme = localStorage.getItem('theme');

    // Aplicar el tema guardado al cargar la página
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode'); // Aplicar clase CSS [cite: 141]
        // Actualizar icono, si es necesario
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }

    // Escuchar el click en el botón
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Guardar la nueva preferencia [cite: 142]
        let theme = 'light';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
            // Cambiar el icono a sol
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        } else {
            // Cambiar el icono a luna
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
        }
        
        localStorage.setItem('theme', theme);
    });
});