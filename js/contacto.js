document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const contactMessage = document.getElementById('contact-message');

    // ⚠️ REEMPLAZA ESTOS VALORES CON TUS CREDENCIALES DE EMAILJS
    const serviceID = 'YOUR_SERVICE_ID'; // Ejemplo: 'default_service'
    const templateID = 'YOUR_TEMPLATE_ID'; // Ejemplo: 'template_contact'
    const publicKey = 'YOUR_PUBLIC_KEY'; // Ejemplo: 'AbcdefghIjklMnOpQrStUvWzYx'

    // Inicializar EmailJS al cargar la página
    emailjs.init(publicKey);

    // Función para mostrar mensajes de estado
    const showMessage = (message, isSuccess) => {
        contactMessage.textContent = message;
        contactMessage.classList.remove('success', 'error');
        contactMessage.classList.add(isSuccess ? 'success' : 'error');
        contactMessage.style.display = 'block';
        submitBtn.disabled = false;
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            contactMessage.style.display = 'none';
        }, 5000);
    };

    // Manejo del envío del formulario
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        submitBtn.disabled = true;
        contactMessage.style.display = 'none';
        
        // Envío del email utilizando EmailJS
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                showMessage('Mensaje enviado con éxito. Te responderemos pronto.', true);
                contactForm.reset(); // Limpiar el formulario
            }, (error) => {
                console.error('EmailJS Error:', error);
                showMessage('Hubo un error al enviar el mensaje. Inténtalo de nuevo. (Error: ' + error.status + ')', false);
            });
    });

    // ⚠️ Aviso si no se han reemplazado las credenciales
    if (publicKey === 'YOUR_PUBLIC_KEY') {
        showMessage('AVISO: El formulario no está configurado. Reemplaza las claves de EmailJS en js/contacto.js', false);
    }
});