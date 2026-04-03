import hide from "./assets/hide.svg";
import show from "./assets/show.svg";
import loadingMotion from "./assets/loadingMotion.svg";

const host = "https://special-dream-2d5e7f6b1a.strapiapp.com";
const authEndpoint = "/api/auth/local";

// check if already authenticated
if (localStorage.getItem("userInfo") !== null) {
  location.replace("../");
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const verify = () => {
  const identifier = document.getElementById("identifier")
  const identifierValue = identifier.value;
  const identifierErrDisplay = identifier.nextElementSibling;
  const password = document.getElementById("password");
  const passwordValue = password.value;
  const passwordErrorDisplay = password.nextElementSibling;
  
  const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/;

  if (identifierValue === ""){
    identifierErrDisplay.textContent = "field can't be empty";
    return false;
  }
  else if (identifierValue.length <= 3){
    identifierErrDisplay.textContent = "username is too short";
    return false;
  }else if (/[^a-zA-Z0-9\s]/.test(identifierValue) && !emailPattern.test(identifierValue)) {
    identifierErrDisplay.textContent = "invalid email";
    return false;
  }

  if (passwordValue === ""){
    passwordErrorDisplay.textContent = "password can't be empty";
    return false;
  }
  else if (passwordValue.length <= 8){
    passwordErrorDisplay.textContent = "password is too short";
    return false;
  }

  return true;
}

async function authorize(identifier, password) {
  const payload = {
    identifier,
    password
  }
  
  loading(true);
  let response = await fetch(host + authEndpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return {serverRes: response.status};
    }
  })
  .then(res =>  res)
  .catch(error => {
    console.log(error);
  });
  if (!response) response = { serverRes: 503};
  return { serverRes: 200, ...response };
}

const form = document.querySelector("form");
const handleSubmit = async (event) => {
  event.preventDefault();
  // collect input
  const identifier = document.getElementById("identifier").value;
  const password = document.getElementById("password").value;

  // verify input
  const verified = verify();
  if (verified) {
    let response = await authorize(identifier, password);
    
    if (!navigator.onLine) {
      // show error message
      const loginErrorEl = document.querySelector(".loginError");
      loginErrorEl.textContent = "check your internet connection";
    }
    while(response.serverRes === 503 && navigator.onLine){
      response = await authorize(identifier, password);
      await sleep(2000);
    }
    
    if (response.serverRes === 200){
      const info = {jwt: response.jwt, expiryDate: Date.now() + (86400 * 7 * 1000), username: response.user.username};
      localStorage.setItem("userInfo", JSON.stringify(info));
      location.replace("../");
    }else if (response.serverRes === 400){
      // show error message
      const loginErrorEl = document.querySelector(".loginError");
      loginErrorEl.textContent = "invalid username or password";
    }
    loading(false);

  }
}
form.addEventListener("submit", handleSubmit);

const inputs = [...document.querySelectorAll(".form-field input:not([type='checkbox'])")];
const clearError = (event) => {
  const element = event.currentTarget;
  element.nextElementSibling.textContent = "";
  const loginErrorEl = document.querySelector(".loginError");
  loginErrorEl.textContent = "";
}
inputs.forEach(input => {
  input.addEventListener("focus", clearError);
  input.addEventListener("blur", verify);
});

const visibility = document.querySelector(".input.password .icon");

const showPassowrd = () => {
  const passwordEl = document.getElementById("password");
  passwordEl.setAttribute("type", "text");
  visibility.src = show;
}
const hidePassowrd = () => {
  const passwordEl = document.getElementById("password");
  passwordEl.setAttribute("type", "password");
  visibility.src = hide;
}
visibility.addEventListener("mousedown", showPassowrd);
visibility.addEventListener("touchstart", showPassowrd);

visibility.addEventListener("mouseup", hidePassowrd);
visibility.addEventListener("touchend", hidePassowrd);

const loading = state => {
  const button = document.querySelector("button.submit");
  if (state) {
    button.innerHTML = `
      <img class="loader" src=${loadingMotion} alt="" />
    `;
    button.classList.add("loading");
    button.children[0].style.display = "inline";
  } else {
    button.textContent = "Log In";
    button.classList.remove("loading");
  }
}