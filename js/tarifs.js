const API_URL = "http://localhost:1337/api/ab-tarifs?populate=ab_categories";

// Fonction pour récupérer les tarifs depuis l'API
async function fetchTarifs() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data && data.data) {
            displayTarifs(data.data);
        } else {
            console.error("Aucun tarif trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des tarifs :", error);
    }
}

// Fonction pour afficher les tarifs sur la page
function displayTarifs(tarifs) {
    const container = document.getElementById("tarifs-container");
    container.innerHTML = ""; // Nettoie le contenu avant d'ajouter les tarifs

    const promotions = tarifs.filter((tarif) => tarif.promotion && !isNaN(tarif.tarifPromotion)); // Filtrer les promotions
    const categories = {};

    // Grouper les prestations par catégorie
    tarifs.forEach((tarif) => {
        const categoryList = tarif.ab_categories || [];
        if (categoryList.length === 0) {
            if (!categories["Sans catégorie"]) {
                categories["Sans catégorie"] = [];
            }
            categories["Sans catégorie"].push(tarif);
        } else {
            categoryList.forEach((category) => {
                const categoryName = category.nom;
                if (!categories[categoryName]) {
                    categories[categoryName] = [];
                }
                categories[categoryName].push(tarif);
            });
        }
    });

    // Ajouter la section des promotions
    if (promotions.length > 0) {
        const promoSection = document.createElement("div");
        promoSection.classList.add("category", "promotions");

        const promoTitle = document.createElement("h2");
        promoTitle.textContent = "Promotions en cours";
        promoSection.appendChild(promoTitle);

        promotions.forEach((promo) => {
            const promoDiv = document.createElement("div");
            promoDiv.classList.add("tarif");

            promoDiv.innerHTML = `
                <strong>${promo.prestation}</strong><br>
                <small style="text-decoration: line-through;">${promo.tarif} €</small> <strong>${promo.tarifPromotion} €</strong><br>
                <small>${promo.description || ""}</small>
            `;
            promoSection.appendChild(promoDiv);
        });

        container.appendChild(promoSection);
    }

    // Trier les catégories par ordre alphabétique
    const sortedCategories = Object.keys(categories).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));

    // Générer les sections pour les catégories
    sortedCategories.forEach((category) => {
        const section = document.createElement("div");
        section.classList.add("category");

        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = category;
        section.appendChild(categoryTitle);

        // Trier les prestations par ordrePrestation dans chaque catégorie
        const sortedPrestations = categories[category].sort(
            (a, b) => a.ordrePrestation - b.ordrePrestation
        );

        // Ajouter les prestations dans la catégorie
        sortedPrestations.forEach((tarif) => {
            const prestationDiv = document.createElement("div");
            prestationDiv.classList.add("tarif");

            prestationDiv.innerHTML = `
                <strong>${tarif.prestation}</strong> - ${tarif.tarif} €<br>
                <small>${tarif.description || ""}</small>
            `;
            section.appendChild(prestationDiv);
        });

        container.appendChild(section);
    });
}

// Charger les tarifs au chargement de la page
document.addEventListener("DOMContentLoaded", fetchTarifs);
