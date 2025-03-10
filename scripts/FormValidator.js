class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;

    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(input) {
    const errorSpan = this._form.querySelector("#" + input.id + "-error");
    input.classList.add(this._inputErrorClass);
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorSpan = this._form.querySelector("#" + input.id + "-error");
    input.classList.remove(this._inputErrorClass);
    errorSpan.textContent = "";
    errorSpan.classList.remove(this._errorClass);
  }

  _enableButton(submitButton) {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
  }

  disableButton(submitButton) {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
  }

  _toggleButton(inputlist, submitButton) {
    if (this._hasValidInputs(inputlist)) {
      this._enableButton(submitButton);
    } else {
      this.disableButton(submitButton);
    }
  }

  _hasValidInputs(inputlist) {
    return this._inputlist.every((input) => input.validity.valid === true);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      console.log("valid");
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  resetValidation(formEl, inputlist) {
    this._inputlist.forEach((input) => {
      this._hideInputError(input, formEl);
    });
  }

  _setEventListeners(inputlist) {
    this._inputlist = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    this._inputlist.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton(inputlist);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form);
  }
}

export default FormValidator;
