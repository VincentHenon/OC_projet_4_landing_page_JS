function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const firstName = document.getElementById("first");
const lastName =  document.getElementById("last");
const birthDate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
//const location = document.getElementById("location");
const submitBtn = document.querySelector(".btn-submit");
// Regex pattern
const nameReg = "";
const birthReg = "";
const quantityReg = "";


////_________________////
//// MODAL HANDLING ////

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalClose.addEventListener("click", closeModalClick)
window.addEventListener("keydown", closeModalKey)

// close modal function on click
function closeModalClick() {
  modalbg.style.display = "none";
}

// close modal function on keydown
function closeModalKey(e) {
  if(e.key === "Escape") {
    modalbg.style.display = "none";
  }
}

////__________________////
//// FORM VALIDATION ////

// submit button on click
submitBtn.addEventListener("click", submitForm)

// submit function
function submitForm() {

}

