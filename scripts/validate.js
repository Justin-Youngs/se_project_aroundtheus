function showInputError(input, formEl, { errorClass }) {
  const errorSpan = formEl.querySelector("#" + input.id + "-error");
  console.log(input.validationMessage);
  errorSpan.textContent = input.validationMessage;
  errorSpan.classList.add(errorClass);
}
function hideInputError(input, formEl, { errorClass }) {
  const errorSpan = formEl.querySelector("#" + input.id + "-error");

  errorSpan.textContent = "";
  errorSpan.classList.remove(errorClass);
}

function checkInputValidity(formEl, input, settings) {
  if (input.validity.valid) {
    console.log("valid");
    hideInputError(input, formEl, settings);
  } else {
    showInputError(input, formEl, settings);
  }
}

function hasValidInputs(inputlist) {
  return inputlist.every((input) => input.validity.valid === true);
}

function toggleButton(inputlist, submitButton, settings) {
  if (hasValidInputs(inputlist)) {
    enableButton(submitButton, settings);
  } else {
    disableButton(submitButton, settings);
  }
}

function enableButton(submitButton, settings) {
  submitButton.disabled = false;
  submitButton.classList.remove(settings.inactiveButtonClass);
}

function disableButton(submitButton, settings) {
  submitButton.disabled = true;
  submitButton.classList.add(settings.inactiveButtonClass);
}

function setEventListeners(formEl, settings) {
  const inputlist = [...formEl.querySelectorAll(settings.inputSelector)];
  const submitButton = formEl.querySelector(settings.submitButtonSelector);
  inputlist.forEach((input) => {
    input.addEventListener("input", (e) => {
      checkInputValidity(formEl, input, settings);
      toggleButton(inputlist, submitButton, settings);
    });
  });
}

enableValidation = (settings) => {
  const formElements = [...document.querySelectorAll(settings.formSelector)];
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, settings);
  });
};

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(settings);
function resetValidation(formEl, inputList, settings) {
  inputList.forEach((input) => {
    hideInputError(input, formEl, settings);
  });
}
