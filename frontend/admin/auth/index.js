const host = "https://special-dream-2d5e7f6b1a.strapiapp.com";
const authEndpoint = "/api/auth/local";

const verify = () => {
  const identifier = document.getElementById("identifier")
  const identifierValue = identifier.value;
  const identifierErrDisplay = identifier.nextElementSibling;
  const password = document.getElementById("password");
  const passwordValue = password.value;
  const passwordErrorDisplay = password.nextElementSibling;
  
  const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/;

  if (identifierValue.length <= 3){
    identifierErrDisplay.textContent = "name is too short";
    return false;
  }else if (/[^a-zA-Z0-9\s]/.test(identifierValue) && !emailPattern.test(identifierValue)) {
    identifierErrDisplay.textContent = "invalid email";
    return false;
  }

  if (passwordValue.length <= 8){
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

  const reponse = await fetch(host + authEndpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (reponse.ok) {
      return response.json()
    } else {
      return new Promise((resolve, reject) => {
        return {jwt: reponse.status};
      })
    }
  })
  .then(res => {
    return res.jwt;
  });
  return reponse;
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
  }
}
form.addEventListener("submit", handleSubmit);

const inputs = [...document.querySelectorAll(".form-field input:not([type='checkbox'])")];
const clearError = (event) => {
  const element = event.currentTarget;
  element.nextElementSibling.textContent = "";
}
inputs.forEach(input => {
  input.addEventListener("focus", clearError);
  input.addEventListener("blur", verify);
});