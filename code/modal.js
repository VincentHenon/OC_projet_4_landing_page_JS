//// HEADER HANDLER ////

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

////______________////
//// DOM ELEMENTS ////
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const formEl = document.querySelector("#form");
const modalClose = document.querySelector(".close");
const firstNameEl = document.getElementById("first");
const lastNameEl = document.getElementById("last");
const emailEl = document.getElementById("email");
const birthDateEl = document.getElementById("birthdate");
const contestNumberEl = document.getElementById("quantity");
const termsOfUseEl = document.getElementById("checkbox1");
const locationEl = document.getElementById("location1");
const form = document.querySelector(".modal-form");
const newsLetter = document.getElementById("checkbox2");

let locationChecked = null;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

////________________////
//// MODAL HANDLER ////

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// open modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal events
modalClose.addEventListener("click", closeModalClick);
window.addEventListener("keydown", closeModalKey);

// close modal function on click
function closeModalClick() {
  modalbg.style.display = "none";
}

// close modal function on keydown
function closeModalKey(e) {
  if (e.key === "Escape") {
    modalbg.style.display = "none";
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

////__________________////
//// VALIDATION TESTS ////

// conditional returns true if (isRequired === "") for email, contestNumber, firstName, lastName
const isRequired = (value) => (value === "" ? false : true);

// conditional returns true if length is greater or equal than "min" or less or equal than max
const isWithinRange = (length, min, max) => length >= min && length <= max;

// conditional returns true if length is greater or equal than "min"
const isLessThanMin = (length, min) => (length >= min ? true : false);

// conditionnal returns true if value is a Number
const isNumber = (value) => (isNaN(value) ? true : false);

// conditional returns true if checkbox is checked
const isChecked = (checkbox) => (checkbox.checked ? true : false);

// function returns true if (name === nameRegex)
const isNameValid = (name) => {
  const nameRegex = /^[A-Za-zÀ-ÿ -]+$/; // only letters, space, -, accents
  return nameRegex.test(name);
};

// conditional returns true if email === emailRegex
const isEmailValid = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////

////_______________////
//// FIELDS TESTS ////


const checkFirstName = () => {
  let valid = false; // default value
  const min = 2; // minimum letters needed
  const firstNameValue = firstNameEl.value.trim();

  if (!isRequired(firstNameValue)) {
    showError(firstNameEl, "Ce champs est obligatoire.");
  } else if (!isLessThanMin(firstNameValue.length, min)) {
    showError(firstNameEl, `Caractères minimum requis : ${min}.`);
  } else if (!isNameValid(firstNameValue)) {
    showError(
      firstNameEl,
      "Seules les lettres sont autorisées pour ce champs."
    );
  } else {
    showSuccess(firstNameEl);
    valid = true;
  }
  return valid;
};

const checkLastName = () => {
  let valid = false; // default value
  const min = 2; // minimum letters needed
  const lastNameValue = lastNameEl.value.trim();

  if (!isRequired(lastNameValue)) {
    showError(lastNameEl, "Ce champs est obligatoire.");
  } else if (!isLessThanMin(lastNameValue.length, min)) {
    showError(lastNameEl, `Caractères minimum requis : ${min}.`);
  } else if (!isNameValid(lastNameValue)) {
    showError(lastNameEl, "Seules les lettres sont autorisées pour ce champs.");
  } else {
    showSuccess(lastNameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const emailValue = emailEl.value.trim();

  if (!isRequired(emailValue)) {
    showError(emailEl, "Ce champs est obligatoire.");
  } else if (!isEmailValid(emailValue)) {
    showError(emailEl, "Veuillez saisir un e-mail valide.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkBirthDate = () => {
  let valid = false;
  const birthDateValue = birthDateEl.value;

  if (!isRequired(birthDateValue)) {
    showError(birthDateEl, "Vous devez indiquer votre date de naissance.");
  } else {
    showSuccess(birthDateEl);
    valid = true;
  }
  return valid;
};

const checkContestNumber = () => {
  let valid = false;
  const min = 0;
  const max = 99;

  let contestNumberValue = Number(contestNumberEl.value);

  if (!contestNumberValue) {
    showError(contestNumberEl, "Ce champs est obligatoire.");
  } else if (isNumber(contestNumberValue)) {
    showError(contestNumberEl, "Veuillez saisir un nombre.");
  } else if (!isWithinRange(contestNumberValue, min, max)) {
    showError(
      contestNumberEl,
      `Veuillez saisir un nombre entre ${min} et ${max}.`
    );
  } else {
    showSuccess(contestNumberEl);
    valid = true;
  }
  return valid;
};

const checkTermsOfUse = () => {
  let valid = false;

  if (!isChecked(termsOfUseEl)) {
    showError(
      termsOfUseEl,
      "Vous devez accepter les conditions d'utilisation."
    );
  } else {
    showSuccess(termsOfUseEl);
    valid = true;
  }
  return valid;
};

const checkLocation = () => {
  let valid = false;
  let locationCheckedEl = document.querySelector(
    'input[name="location"]:checked'
  );

  if (!locationCheckedEl) {
    showError(
      locationEl,
      "Veuillez sélectionner le tournoi auquel vous voulez participer."
    );
  } else {
    showSuccess(locationEl);
    valid = true;
  }
  return valid;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////

////_______________________////
//// DISPLAY ERROR HANDLER ////

function showError(el, message) {
  let inputField = null;
  inputField = el.parentElement;

  inputField.setAttribute("data-error", message);
  inputField.setAttribute("data-error-visible", "true");
}

function showSuccess(el) {
  let inputField = null;
  inputField = el.parentElement;

  inputField.setAttribute("data-error", "");
  inputField.setAttribute("data-error-visible", "false");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

////_________________////
//// FORM VALIDATION ////

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validate();
});

function validate(e) {
  let data = {};

  let isFirstNameValid = checkFirstName();
  let isLastNameValid = checkLastName();
  let isEmailValid = checkEmail();
  let isBirthDateValid = checkBirthDate();
  let isContestNumberValid = checkContestNumber();
  let isTermsOfUseValid = checkTermsOfUse();
  let isLocationValid = checkLocation();

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isBirthDateValid &&
    isContestNumberValid &&
    isTermsOfUseValid &&
    isLocationValid
  ) {
    displaySuccessMessage();

    //data to send to server side
    data = {
      firstName: firstNameEl.value,
      lastName: lastNameEl.value,
      email: emailEl.value,
      birthDate: birthDateEl.value,
      contestNumber: contestNumberEl.value,
      city: locationChecked,
      newsLetter: newsLetter.value,
    };
    console.log(data);
  }
}

const displaySuccessMessage = () => {
  const succesMessage = document.createElement("div");
  succesMessage.innerHTML = `<div class="success-message"><h4>Merci!<br/>Votre réservation a bien été reçue.</h4><button id="btn-success">fermer</button></div>`;
  form.parentNode.replaceChild(succesMessage, form);
  const content = document.querySelector(".content");
  document
    .getElementById("btn-success")
    .addEventListener("click", closeModalClick);
};
