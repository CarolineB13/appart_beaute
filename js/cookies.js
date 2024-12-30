document.addEventListener('DOMContentLoaded', () => {
    // Éléments de la modale de cookies
    const cookieModal = document.getElementById('cookie-modal');
    const manageCookiesLink = document.querySelector('a[href="#gestion-cookies"]');
    const saveCookiesButton = document.getElementById('save-cookies');
    const closeCookiesButton = document.getElementById('close-cookies');
    const analyticsCookies = document.getElementById('analytics-cookies');
    const marketingCookies = document.getElementById('marketing-cookies');

    // Charger Google Analytics
    const loadGoogleAnalytics = () => {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-XXXXX-Y', 'auto'); // Remplacez UA-XXXXX-Y par votre ID Google Analytics
        ga('send', 'pageview');
    };

    // Charger les préférences depuis localStorage
    const loadPreferences = () => {
        const preferences = JSON.parse(localStorage.getItem('cookiePreferences')) || {
            analytics: false, // Désactivé par défaut
            marketing: false, // Désactivé par défaut
        };
        analyticsCookies.checked = preferences.analytics;
        marketingCookies.checked = preferences.marketing;

        // Charger Google Analytics si les cookies d’analyse sont acceptés
        if (preferences.analytics) {
            loadGoogleAnalytics();
        }
    };

    // Sauvegarder les préférences dans localStorage
    const savePreferences = () => {
        const preferences = {
            analytics: analyticsCookies.checked,
            marketing: marketingCookies.checked,
        };
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        alert('Vos préférences ont été sauvegardées.');

        // Charger Google Analytics si accepté après sauvegarde
        if (preferences.analytics) {
            loadGoogleAnalytics();
        }
    };

    // Ouvrir la modale des cookies
    if (manageCookiesLink) {
        manageCookiesLink.addEventListener('click', (e) => {
            e.preventDefault();
            cookieModal.classList.remove('hidden');
            loadPreferences();
        });
    }

    // Fermer la modale
    if (closeCookiesButton) {
        closeCookiesButton.addEventListener('click', () => {
            cookieModal.classList.add('hidden');
        });
    }

    // Sauvegarder les préférences depuis la modale
    if (saveCookiesButton) {
        saveCookiesButton.addEventListener('click', () => {
            savePreferences();
            cookieModal.classList.add('hidden');
        });
    }

    // Charger les préférences au démarrage
    loadPreferences();
});
