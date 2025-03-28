import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import { initialCards, validationSettings } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

const cardSection = new Section({
  items: initialCards,
  renderer: renderCard,
  containerSelector: ".cards__list",
});

const userInfo = new UserInfo(".profile__title", ".profile__description");

const imagePopup = new PopupWithImage("#preview-modal");
imagePopup.setEventListeners();

const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardEditSubmit
);
newCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

function createCard(cardData) {
  console.log(cardData);
  const card = new Card(cardData, cardSelector, () => {
    imagePopup.open(cardData.name, cardData.link);
  });
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

const cardSelector = "#card-template";

//Wrappers
const cardsWrap = document.querySelector(".cards__list");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

//validation//

const editProfileValidator = new FormValidator(
  validationSettings,
  profileEditPopup.popupForm
);
const addCardValidator = new FormValidator(
  validationSettings,
  newCardPopup.popupForm
);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function handleProfileEditSubmit(formValues) {
  userInfo.setUserInfo({ name: formValues.name, job: formValues.description });
  profileEditPopup.close();
}

function handleAddCardEditSubmit(formValues) {
  renderCard(
    {
      name: formValues.title,
      link: formValues.link,
    },
    cardsWrap
  );
  newCardPopup.close();
  addCardValidator.disableButton();
}

profileEditButton.addEventListener("click", () => {
  const profileValues = userInfo.getUserInfo();
  profileEditPopup.setInputValues({
    name: profileValues.name,
    description: profileValues.job,
  });
  editProfileValidator.resetValidation();
  profileEditPopup.open();
});

profileAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

cardSection.renderItems();
