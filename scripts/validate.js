const showInputError = (input, formEl, { errorClass }) => {
  const errorSpan = formEl.querySelector("#" + input.id + "-error");
  console.log(input.validationMessage);
  errorSpan.textContent = input.validationMessage;
  errorSpan.classList.add(errorClass);
};
const hideInputError = (input, formEl, { errorClass }) => {
  const errorSpan = formEl.querySelector("#" + input.id + "-error");

  errorSpan.textContent = "";
  errorSpan.classList.remove(errorClass);
};

const checkInputValidity = (formEl, input, settings) => {
  if (input.validity.valid) {
    console.log("valid");
    hideInputError(input, formEl, settings);
  } else {
    showInputError(input, formEl, settings);
  }
};

const hasValidInputs = (inputlist) => {
  return inputlist.every((input) => input.validity.valid === true);
};

const toggleButton = (inputlist, button, settings) => {
  if (hasValidInputs(inputlist)) {
    button.disabled = false;
  } else {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  }
  button.classlist.remove(inactiveButtonClass);
  return (button.disabled = true);
};

const setEventListeners = (formEl, settings) => {
  const inputlist = [...formEl.querySelectorAll(settings.inputSelector)];
  const submitButton = formEl.querySelector(settings.submitButtonSelector);
  inputlist.forEach((input) => {
    input.addEventListener("input", (e) => {
      checkInputValidity(formEl, input, settings);
      toggleButton(inputlist, submitButton, settings);
    });
  });
};

enableValidation = (settings) => {
  const formElements = [...document.querySelectorAll(settings.formSelector)];
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, settings);
  });
};

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
