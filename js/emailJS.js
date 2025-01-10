// Initialiser EmailJS
(function () {
  emailjs.init("hgroXu5DU30wk5nF4"); // Remplacez par votre clé publique
})();

/**
* Valide les champs du formulaire avant envoi.
* @param {HTMLFormElement} form - Le formulaire HTML contenant les données.
* @returns {boolean} - True si tous les champs sont remplis, false sinon.
*/
function validateForm(form) {
  const inputs = form.querySelectorAll("input, textarea");
  for (let input of inputs) {
      if (!input.value.trim()) {
          alert(`Veuillez remplir le champ : ${input.name}`);
          return false;
      }

      // Validation spécifique pour le champ téléphone
      if (input.name === "user_phone" && !/^[0-9]{10}$/.test(input.value.trim())) {
          alert("Veuillez entrer un numéro de téléphone valide à 10 chiffres s'il vous plaît.");
          return false;
      }
  }
  return true;
}

/**
* Met à jour l'état d'envoi du formulaire.
* @param {HTMLFormElement} form - Le formulaire HTML.
* @param {boolean} isSending - True si l'envoi est en cours, false sinon.
*/
function updateFormState(form, isSending) {
  const button = form.querySelector("button[type='submit']");

  if (isSending) {
      button.disabled = true;
      button.textContent = "Envoi en cours...";
  } else {
      button.disabled = false;
      button.textContent = "Envoyer";
  }
}

/**
* Gère l'envoi d'emails via EmailJS.
* @param {HTMLFormElement} form - Le formulaire HTML contenant les données.
*/
function sendEmail(form) {
  if (!validateForm(form)) {
      return; // Stoppe l'exécution si le formulaire est invalide
  }

  // Mettre à jour l'état du formulaire
  updateFormState(form, true);

  // Envoyer un email à Marjorie
  emailjs
      .sendForm("service_gcaa1er", "template_uzihz2x", form)
      .then(
          function () {
              console.log("Email envoyé à Marjorie avec succès.");
          },
          function (error) {
              console.error("Erreur lors de l'envoi à Marjorie :", error);
          }
      );

  // Envoyer une réponse automatique au visiteur
  emailjs
      .sendForm("service_gcaa1er", "template_w6psw0s", form)
      .then(
          function () {
              alert(
                  "Votre message a été envoyé avec succès ! Une confirmation vous a été envoyée par email."
              );
              form.reset(); // Réinitialise le formulaire après envoi
          },
          function (error) {
              alert(
                  "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
              );
              console.error(
                  "Erreur lors de l'envoi de la réponse automatique :",
                  error
              );
          }
      )
      .finally(() => {
          updateFormState(form, false); // Réinitialise l'état du bouton après l'envoi
      });
}

/**
* Associe la fonction d'envoi d'email au formulaire.
*/
function initializeFormHandler() {
  const form = document.getElementById("contactForm");
  if (form) {
      form.addEventListener("submit", function (event) {
          event.preventDefault(); // Empêche le rechargement de la page
          sendEmail(form); // Appelle la fonction d'envoi d'email
      });
  }
}

// Initialiser le gestionnaire pour le formulaire
initializeFormHandler();

// Exporter la fonction pour une utilisation dans d'autres fichiers
export { sendEmail, initializeFormHandler };
