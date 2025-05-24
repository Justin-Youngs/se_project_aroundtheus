import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupElement.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._defaultButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formValues = this._getInputValues();

      this.renderLoading(true);
      this._handleFormSubmit(formValues)
        .then(() => {
          this.close();
          this.popupForm.reset();
        })
        .finally(() => {
          this.renderLoading(false, this._defaultButtonText);
        });
    });
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
  }
  renderLoading(isLoading, buttonText = "Save", loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._defaultButtonText = buttonText;
    } else {
      this._submitButton.textContent = buttonText;
    }
  }
}
