import { codePromo } from "../data/dataPromo.js";

const promoCardContainer = document.querySelector(".card");
const activeCardsContainer = document.querySelector(".cards");
const inactiveCardsContainer = document.querySelector(".cards-inactive");

// Convertir les dates string en objet Date
const codePromoWithConvertedDates = codePromo.map(({ date_to, ...rest }) => ({
  ...rest,
  date_to: new Date(date_to),
}));

// Trier les données en mettant les dates expirées à la fin et par proximité de la date d'expiration
const sortedCodePromo = codePromoWithConvertedDates.sort((a, b) => {
  const now = new Date();
  const dateToA = a.date_to;
  const dateToB = b.date_to;

  const expiredA = dateToA < now;
  const expiredB = dateToB < now;

  if (expiredA !== expiredB) {
    return expiredA ? 1 : -1;
  }

  return Math.abs(dateToA - now) - Math.abs(dateToB - now);
});

// Cloner la structure HTML de la carte de code promo
function clonePromoCard(data) {
  const clone = promoCardContainer.cloneNode(true);
  return clone;
}

// Remplir la carte de code promo avec les données dynamiques
function fillPromoCardData(currentCard, data) {
  const { code, date_to, description, condition } = data;

  currentCard.querySelector(".code-promo").textContent = code;
  currentCard.querySelector(".expiration-date span").textContent = date_to.toLocaleDateString("fr-FR");

  const descriptionElement = currentCard.querySelector(".description");
  descriptionElement.innerHTML = description.replace(/\*([^*]+)\*/g, "<span>$1</span>")
                                             .replace(/(https?:\/\/[^\s,]+)(,?)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>$2');

  currentCard.querySelector(".condition").textContent = condition;
}

// Créer et ajouter une carte de code promo dans le DOM
function createAndAppendPromoCard(data) {
  const card = clonePromoCard(data);
  fillPromoCardData(card, data);
  (data.date_to > new Date() ? activeCardsContainer : inactiveCardsContainer).appendChild(card);
}

// Créer et ajouter les cartes de code promo dans le DOM pour chaque donnée triée
sortedCodePromo.forEach(createAndAppendPromoCard);

// Ajouter la classe "inactive" pour modifier le CSS dans la section de code promo inactif
function addInactiveClass() {
  const promoCardsInactiveElements = document.querySelectorAll(
    ".cards-inactive .code-promo-btn, .cards-inactive .expiration-date, .cards-inactive .description"
  );

  promoCardsInactiveElements.forEach((element) => {
    element.classList.add("inactive");
  });
}

addInactiveClass();

// Copier le code promo lorsque le bouton est cliqué
function copyPromoCode() {
  const promoButtons = document.querySelectorAll(".code-promo-btn");

  promoButtons.forEach((button, index) => {
    if (sortedCodePromo[index]) {
      button.id = `promo-${sortedCodePromo[index].id_cart_rule}`;
    }

    button.addEventListener("click", () => {
      if (!button.classList.contains("inactive")) {
        const textToCopy = button.children[1].textContent.trim();
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
      }
    });
  });
}
copyPromoCode();
