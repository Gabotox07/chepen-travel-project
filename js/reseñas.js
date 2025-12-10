document.addEventListener('DOMContentLoaded', () => {
    const reseñasContainer = document.getElementById('reseñas-container');
    const form = document.getElementById('add-review-form');
    const puntuacionInputDiv = document.getElementById('puntuacion-input');
    const scoreInput = document.getElementById('review-score');
    const formMessage = document.getElementById('form-message');
    let currentScore = 0;
    
    const apiUrl = 'data/reseñas.json';
    const LOCAL_STORAGE_KEY = 'chepenTravelUserReviews';

    // Función para dibujar las estrellas y manejar la selección
    const setupStarRating = () => {
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.classList.add('fas', 'fa-star', 'star');
            star.setAttribute('data-value', i);
            
            star.addEventListener('click', (e) => {
                currentScore = parseInt(e.target.getAttribute('data-value'));
                scoreInput.value = currentScore;
                updateStars(currentScore);
            });

            // Implementación de hover para mejor UX
            star.addEventListener('mouseover', (e) => {
                updateStars(parseInt(e.target.getAttribute('data-value')), true);
            });
            star.addEventListener('mouseout', () => {
                updateStars(currentScore);
            });

            puntuacionInputDiv.appendChild(star);
        }
    };

    // Función para actualizar el estado visual de las estrellas
    const updateStars = (score, isHover = false) => {
        document.querySelectorAll('.puntuacion-stars .star').forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            const effectiveScore = isHover ? score : currentScore;

            if (starValue <= effectiveScore) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    };
    
    // Función para obtener las reseñas de LocalStorage
    const getLocalReviews = () => {
        const reviews = localStorage.getItem(LOCAL_STORAGE_KEY);
        return reviews ? JSON.parse(reviews) : [];
    };

    // Función para guardar una nueva reseña en LocalStorage
    const saveReview = (review) => {
        const existingReviews = getLocalReviews();
        // Asegurarse de que el ID sea único (simple: timestamp)
        review.id = Date.now();
        existingReviews.push(review);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingReviews));
    };

    // Función para generar las estrellas en la tarjeta
    const generateStarsHtml = (score) => {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="fas fa-star" style="color: ${i <= score ? 'gold' : '#ccc'};"></i>`;
        }
        return starsHtml;
    };

    // Función para renderizar una sola tarjeta de reseña
    const renderReviewCard = (review) => {
        const card = document.createElement('div');
        card.classList.add('reseña-card');

        const stars = generateStarsHtml(review.puntuacion);
        
        card.innerHTML = `
            <h4>${review.nombre}</h4>
            <div class="puntuacion-stars">${stars}</div>
            <p>"${review.comentario}"</p>
            <span class="reseña-fecha">Enviado el: ${review.fecha}</span>
        `;
        reseñasContainer.appendChild(card);
    };

    // Función principal para cargar todas las reseñas
    const loadAllReviews = async () => {
        // 1. Cargar reseñas iniciales del JSON
        let initialReviews = [];
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                initialReviews = await response.json();
            }
        } catch (error) {
            console.error('Error cargando reseñas iniciales:', error);
        }

        // 2. Cargar reseñas del usuario desde LocalStorage
        const userReviews = getLocalReviews();

        // 3. Combinar y renderizar (Las reseñas de LocalStorage aparecen primero)
        const allReviews = [...userReviews, ...initialReviews];
        
        reseñasContainer.innerHTML = ''; // Limpiar el contenedor
        
        if (allReviews.length === 0) {
            reseñasContainer.innerHTML = '<p class="text-center">Sé el primero en dejar una reseña.</p>';
        } else {
            allReviews.forEach(renderReviewCard);
        }
    };

    // Manejo del envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('review-name').value;
        const comment = document.getElementById('review-comment').value;
        const score = parseInt(scoreInput.value);

        if (score === 0) {
            formMessage.textContent = 'Por favor, selecciona una puntuación con las estrellas.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
            formMessage.style.display = 'block';
            return;
        }

        const newReview = {
            nombre: name,
            puntuacion: score,
            comentario: comment,
            fecha: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
        };

        // 1. Guardar en LocalStorage
        saveReview(newReview);

        // 2. Mostrar mensaje de éxito
        formMessage.textContent = '¡Gracias! Tu reseña ha sido enviada con éxito.';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');
        formMessage.style.display = 'block';

        // 3. Recargar la lista de reseñas para mostrar la nueva
        loadAllReviews();
        
        // 4. Limpiar formulario
        form.reset();
        currentScore = 0;
        updateStars(0);
        scoreInput.value = 0;

        // Opcional: Ocultar el mensaje después de unos segundos
        setTimeout(() => {
             formMessage.style.display = 'none';
        }, 5000);
    });

    // Inicializar: Configurar estrellas y cargar reseñas
    setupStarRating();
    loadAllReviews();
});