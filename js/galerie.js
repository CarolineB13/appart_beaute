document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "http://localhost:1337/api/ab-galeries?populate=*";

    try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result.data) {
            let photos = result.data;

            // Filtrer les photos publiées uniquement
            photos = photos.filter(photo => photo.publie);

            // Trier les photos par date décroissante
            photos.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Extraire les catégories uniques disponibles
            const categories = [...new Set(photos.map(photo => photo.categorie))];

            // Ajouter les boutons de filtrage des catégories
            const filterContainer = document.getElementById("filters");
            filterContainer.innerHTML = `<button class="filter-button" onclick="filterGallery('all')">Toutes</button>`;
            categories.forEach(categorie => {
                filterContainer.innerHTML += `<button class="filter-button" onclick="filterGallery('${categorie}')">${categorie}</button>`;
            });

            // Fonction pour afficher les photos filtrées
            window.filterGallery = (category) => {
                let filteredPhotos = category === 'all' 
                    ? photos 
                    : photos.filter(photo => photo.categorie === category);
                renderGallery(filteredPhotos);
            };

            // Affichage initial de toutes les photos
            renderGallery(photos);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des photos:", error);
    }
});

// Fonction pour afficher les photos dans la galerie
function renderGallery(filteredPhotos) {
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.innerHTML = "";
    filteredPhotos.forEach(photo => {
        const imageUrl = photo.image && photo.image.url 
            ? `http://localhost:1337${photo.image.url}` 
            : 'default-image.jpg'; // Image par défaut si aucune photo n'est présente
        
        const photoElement = document.createElement('div');
        photoElement.className = "photo-item";
        photoElement.innerHTML = `
            <img src="${imageUrl}" alt="${photo.titre}" loading="lazy">
        `;
        galleryContainer.appendChild(photoElement);
    });
}
