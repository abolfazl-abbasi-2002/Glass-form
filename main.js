// Element
const title = document.querySelector(".title");
const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const btns = document.querySelectorAll(".btn");
const icons = document.querySelectorAll(".icon");

// functions
// hide look eye icon
function lookHidePass(el) {
  const input = el.previousElementSibling;
  if (input.type === "password") {
    input.type = "text";
    el.firstElementChild.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    el.firstElementChild.classList.replace("fa-eye-slash", "fa-eye");
  }
}

// change form
function changeForm(el) {
  const data = el.dataset.href;
  if (data === "signup") {
    title.textContent = "Register Form";
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
  }
  if (data === "login") {
    title.textContent = "Login Form";
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    signupBtn.classList.remove("active");
    loginBtn.classList.add("active");
  }
}

// events
icons.forEach((icon) => {
  icon.addEventListener("click", (e) => lookHidePass(e.currentTarget));
});
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => changeForm(e.currentTarget));
});

////////////////////////////
// validation form
////////////////////////////
// regex format
const emailFormat =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passFormat =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// elements
const inputs = document.querySelectorAll(".input");
const submitBtns = document.querySelectorAll(".submit");
const regPassInput = document.getElementById("reg-pass-input");
const regConPassInput = document.getElementById("reg-Conpass-input");

// functions
function addWrongStyle(el, span) {
  span.classList.remove("hidden");
  el.style.border = "#D58B8F 1px solid";
}

function removeWrongStyle(el, span) {
  span.classList.add("hidden");
  el.style.border = "";
}

function validateInputs(e) {
  const data = e.dataset.value;
  const value = e.value;

  if (data === "email") {
    const span = e.parentNode.lastElementChild;
    if (!value.match(emailFormat)) {
      addWrongStyle(e, span);
      return false;
    } else {
      removeWrongStyle(e, span);
    }
  }

  if (data === "pass") {
    const span = e.parentNode.nextElementSibling;
    if (!value.match(passFormat)) {
      addWrongStyle(e, span);
      return false;
    } else {
      removeWrongStyle(e, span);
    }
  }

  if (data === "conpass") {
    const span = e.parentNode.nextElementSibling;
    if (!(e.value === regPassInput.value)) {
      addWrongStyle(e, span);
      return false;
    } else {
      removeWrongStyle(e, span);
    }
  }

  return true;
}

// events
inputs.forEach((input) =>
  input.addEventListener("input", (e) => validateInputs(input))
);

submitBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const parent = e.currentTarget.parentNode;
    parent.querySelectorAll(".input").forEach((input) => {
      if (!validateInputs(input)) e.preventDefault();
    });
  })
);
