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
