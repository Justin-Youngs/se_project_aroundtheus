import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._input = this._popupElement.querySelectorAll(".modal__input");
  }
  _getInputValues() {
    const formValues = {};
    const inputList = this.popupForm.querySelectorAll(".modal__input");
    inputList.forEach((input) => {
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
    });
  }
  setInputValues(data) {
    this._input.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this.popupForm.reset();
    super.close();
  }
}
