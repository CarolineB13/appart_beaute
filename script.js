// Sélectionne les éléments
const hamburger = document.getElementById('hamburger');
const navigation = document.querySelector('.navigation');

// Ajoute un événement au clic sur le hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // Transforme les barres en croix
    navigation.classList.toggle('active'); // Affiche/cache le menu mobile
});

// Optionnel : Fermer le menu au clic sur un lien
const links = document.querySelectorAll('.navigation a');
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navigation.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const images = document.querySelectorAll(".carousel img");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let index = 0;

    function showImage() {
        const translateValue = `translateX(-${index * 100}%)`;
        carouselContainer.style.transform = translateValue;
        carouselContainer.style.webkitTransform = translateValue; // Préfixe pour Safari
    }

    prevButton.addEventListener("click", () => {
        index = (index > 0) ? index - 1 : images.length - 1;
        showImage();
    });

    nextButton.addEventListener("click", () => {
        index = (index < images.length - 1) ? index + 1 : 0;
        showImage();
    });
});
const swiper = new Swiper('.swiper', {
    loop: true, // Les images défilent en boucle
    autoplay: {
        delay: 3000, // 3 secondes entre chaque image
        disableOnInteraction: false, // Continue même après interaction
    },
    speed: 1000, // Transition douce entre les images
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Permet de cliquer sur les bullets
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
