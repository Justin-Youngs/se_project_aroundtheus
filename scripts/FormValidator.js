class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(input) {
    const errorSpan = this._form.querySelector("#" + input.id + "-error");
    input.classList.add(this._inputErrorClass);
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(this._errorClass);
  }

  hideInputError(input) {
    const errorSpan = this._form.querySelector("#" + input.id + "-error");
    input.classList.remove(this._inputErrorClass);
    errorSpan.textContent = "";
    errorSpan.classList.remove(this._errorClass);
  }

  _toggleButton(inputlist, submitButton) {
    if (hasValidInputs(inputlist)) {
      enableButton(submitButton, settings);
    } else {
      disableButton(submitButton, settings);
    }
  }

  _hasValidInputs(inputlist) {
    return inputlist.every((input) => input.validity.valid === true);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      console.log("valid");
      hideInputError(input);
    } else {
      showInputError(input);
    }
  }

  _setEventListeners() {
    const inputlist = [...formEl.querySelectorAll(settings.inputSelector)];
    const submitButton = formEl.querySelector(settings.submitButtonSelector);
    inputlist.forEach((input) => {
      input.addEventListener("input", (e) => {
        checkInputValidity(formEl, input, settings);
        toggleButton(inputlist, submitButton, settings);
      });
    });
  }

  enableValidation() {
    this._form;
  }
}

export default FormValidator;
