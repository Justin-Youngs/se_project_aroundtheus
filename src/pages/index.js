// Imports
import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Api from "../utils/Api.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import { validationSettings } from "../utils/constants.js";

// Constants
const cardSelector = "#card-template";
const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileImageElement = document.querySelector(
  ".profile__image-edit-overlay"
);

// Variables
let cardSection;
let userId;
let currentCardId;
let currentCardElement;

// API Setup
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "10d17407-86f1-491f-abfe-58acfabab0ea",
    "Content-Type": "application/json",
  },
});

// Popup: Image Preview
const imagePopup = new PopupWithImage("#preview-modal");
imagePopup.setEventListeners();

// Popup: New Card
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardEditSubmit,
});
newCardPopup.setEventListeners();

// Popup: Profile Image Edit
const profileImagePopup = new PopupWithForm({
  popupSelector: "#avatar-edit-modal",
  handleFormSubmit: handleProfileImageSubmit,
});
profileImagePopup.setEventListeners();

// Popup: Profile Edit
const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
profileEditPopup.setEventListeners();

// Popup: Delete Card
const deleteCardPopup = new PopupWithForm({
  popupSelector: "#delete-card-modal",
  handleFormSubmit: handleCardDelete,
});
deleteCardPopup.setEventListeners();

// User Info
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

// Load User Info Load Cards
api
  .getInitialData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
    userId = userData._id;

    cardSection = new Section({
      items: cards,
      renderer: renderCard,
      containerSelector: ".cards__list",
    });
    cardSection.renderItems();
  })
  .catch((err) => console.error(err));

//
// Create Card
function createCard(cardData, api) {
  const card = new Card(
    cardData,
    cardSelector,
    () => imagePopup.open(cardData.name, cardData.link),
    api,
    (cardId, cardElement) => handleDeleteButtonClick(cardId, cardElement),
    userId
  );

  return card.getView();
}

// Render Card
function renderCard(cardData, isInitial = true) {
  const cardElement = createCard(cardData, api);
  cardSection.addItem(cardElement, isInitial);
}

// Handle Profile Edit
function handleProfileEditSubmit(formValues) {
  return api
    .updateUserInfo(formValues.name, formValues.description)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });
      profileEditPopup.close();
    })
    .catch((err) => console.error(err));
}

// Handle Add Card
function handleAddCardEditSubmit(formValues) {
  this.renderLoading(true, "Create", "Creating...");
  return api
    .createCard(formValues.title, formValues.link)
    .then((cardData) => {
      renderCard(cardData, false);
      newCardPopup.close();
      addCardValidator.disableButton();
    })
    .catch((err) => console.error(`Error: ${err}`))
    .finally(() => {
      this.renderLoading(false, "Create");
    });
}

// Handle Profile Image Update
function handleProfileImageSubmit(formValues) {
  return api
    .updateAvatar(formValues.avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });
      profileImagePopup.close();
    })
    .catch((err) => console.error(err));
}

// Handle Delete Button Click
function handleDeleteButtonClick(cardId, cardElement) {
  currentCardId = cardId;
  currentCardElement = cardElement;
  deleteCardPopup.open();
}

// Handle Card Deletion
function handleCardDelete() {
  this.renderLoading(true, "Yes", "Deleting...");
  return api
    .deleteCard(currentCardId)
    .then(() => {
      currentCardElement.remove();
      deleteCardPopup.close();
      currentCardId = null;
      currentCardElement = null;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      this.renderLoading(false, "Yes");
    });
}

// Validation
const editProfileValidator = new FormValidator(
  validationSettings,
  profileEditPopup.popupForm
);
const addCardValidator = new FormValidator(
  validationSettings,
  newCardPopup.popupForm
);
const profileImageValidator = new FormValidator(
  validationSettings,
  profileImagePopup.popupForm
);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
profileImageValidator.enableValidation();

// Event Listeners
profileEditButton.addEventListener("click", () => {
  const profileValues = userInfo.getUserInfo();
  profileEditPopup.setInputValues({
    name: profileValues.name,
    description: profileValues.about,
  });
  editProfileValidator.resetValidation();
  profileEditPopup.open();
});

profileAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

profileImageElement.addEventListener("click", () => {
  profileImagePopup.open();
});
