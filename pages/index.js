import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Wrappers
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#modal-form");
const addCardModal = document.querySelector("#add-card-modal");

const addCardEditform = addCardModal.querySelector("#modal-add-card-form");

//Buttons and nodes
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-add-card-close-button"
);
const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileCloseModalButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(
  ".modal__preview-caption"
);
const previewModalCloseButton = previewModal.querySelector(
  "#preview-modal-close-button"
);
//Form data
const profileTitleInput = document.querySelector("#name-input");
const profileDescriptionInput = document.querySelector("#description-input");
const cardTitleInput = addCardEditform.querySelector("#add-card-title-input");

const cardUrlInput = addCardEditform.querySelector("#add-card-image-input");

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}
function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("click", closeModalOnOverlay);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("click", closeModalOnOverlay);
}

function openPreview(src, caption) {
  previewModalImageEl.src = src;
  previewModalImageEl.alt = caption;
  previewModalCaptionEl.textContent = caption;
  openModal(previewModal);
}

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, openPreview);
  return card.getView();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

const cardSelector = "#card-template";

//validation//

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addCardValidator = new FormValidator(validationSettings, addCardEditform);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  profileEditForm.reset();
}

function handleAddCardEditSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  addCardEditform.reset();
  addCardValidator.disableButton();
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editProfileValidator.resetValidation();
  openModal(profileEditModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(addCardModal);
});

profileCloseModalButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

previewModalCloseButton.addEventListener("click", () =>
  closeModal(previewModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardEditform.addEventListener("submit", handleAddCardEditSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
