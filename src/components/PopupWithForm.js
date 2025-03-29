import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupElement.querySelectorAll(".modal__input");
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

      this._handleFormSubmit(formValues);
      this.popupForm.reset();
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
}
