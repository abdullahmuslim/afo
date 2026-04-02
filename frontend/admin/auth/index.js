const host = "https://special-dream-2d5e7f6b1a.strapiapp.com";
const authEndpoint = "/api/auth/local";

// check if already authenticated
if (localStorage.getItem("userInfo") !== null) {
  location.replace("../");
}

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
  
  const response = await fetch(host + authEndpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return {serverRes: response.status};
    }
  })
  .then(res =>  res)
  .catch(error => {
    console.error(error);
  });

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
    const response = await authorize(identifier, password);
    if (response.serverRes === 200){
      const info = {jwt: response.jwt, expiryDate: Date.now() + (86400 * 7 * 1000), username: response.user.username};
      localStorage.setItem("userInfo", JSON.stringify(info));
      location.replace("../");
    }else if (response.serverRes === 400){
      const loginErrorEl = document.querySelector(".loginError");
      loginErrorEl.textContent = "invalid username or password";
      // show error message
    }

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

const passwordEl = document.getElementById("password");
const showPassowrd = () => {
  passwordEl.setAttribute("type", "text");
}
const hidePassowrd = () => {
  passwordEl.setAttribute("type", "password");
}
passwordEl.addEventListener("mousedown", showPassowrd);
passwordEl.addEventListener("mouseup", hidePassowrd);