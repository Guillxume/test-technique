import { codePromo } from "../data/dataPromo.js";

const promoCardContainer = document.querySelector(".card");
const activeCardsContainer = document.querySelector(".cards");
const inactiveCardsContainer = document.querySelector(".cards-inactive");

// Convertir les dates string en objet Date et trier les données
const sortedCodePromo = codePromo.map(({ date_to, ...rest }) => ({
  ...rest,
  date_to: new Date(date_to)
})).sort((a, b) => a.date_to - b.date_to);

// Cloner la structure HTML de la carte de code promo
const clonePromoCard = () => promoCardContainer.cloneNode(true);

// Remplir la carte de code promo avec les données dynamiques
const fillPromoCardData = (currentCard, data) => {
  const { code, date_to, description, condition } = data;
  currentCard.querySelector(".code-promo").textContent = code;
  currentCard.querySelector(".expiration-date span").textContent = date_to.toLocaleDateString("fr-FR");
  const descriptionElement = currentCard.querySelector(".description");
  descriptionElement.innerHTML = description.replace(/\*([^*]+)\*/g, "<span>$1</span>")
                                             .replace(/(https?:\/\/[^\s,]+)(,?)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>$2');
  currentCard.querySelector(".condition").textContent = condition;
};

// Créer et ajouter une carte de code promo dans le DOM
const createAndAppendPromoCard = (data) => {
  const card = clonePromoCard();
  fillPromoCardData(card, data);
  (data.date_to > new Date() ? activeCardsContainer : inactiveCardsContainer).appendChild(card);
};

// Ajouter la classe "inactive" pour modifier le CSS dans la section de code promo inactif
const addInactiveClass = () => {
  const promoCardsInactiveElements = document.querySelectorAll(
    ".cards-inactive .code-promo-btn, .cards-inactive .expiration-date, .cards-inactive .description"
  );
  promoCardsInactiveElements.forEach((element) => {
    element.classList.add("inactive");
  });
};

// Copier le code promo lorsque le bouton est cliqué
const copyPromoCode = (textToCopy, button) => {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      const messageElement = document.createElement("span");
      messageElement.textContent = `Code promo "${textToCopy}" copié !`;
      messageElement.classList.add("copied-message");
      button.parentNode.insertBefore(messageElement, button.nextSibling);
      messageElement.classList.add("visible");
      setTimeout(() => {
        messageElement.classList.remove("visible");
        setTimeout(() => {
          messageElement.remove();
        }, 200);
      }, 1500);
    })
    .catch((err) => console.error("Erreur lors de la copie : ", err));
};

// Attacher un gestionnaire d'événements pour copier le code promo
document.addEventListener("click", (event) => {
  const target = event.target;
  const promoButton = target.closest(".code-promo-btn");
  if (promoButton && !promoButton.classList.contains("inactive")) {
    const textToCopy = promoButton.children[1].textContent.trim();
    copyPromoCode(textToCopy, promoButton);
  }
});

// Créer et ajouter les cartes de code promo dans le DOM pour chaque donnée triée
sortedCodePromo.forEach(createAndAppendPromoCard);

// Ajouter la classe "inactive" pour les éléments inactifs
addInactiveClass();
