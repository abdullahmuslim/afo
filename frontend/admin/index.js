import Form from "./components/Form.js";
import fetchData from "./fetchData.js";
import loading from "./loader.js";

const endpoint = "/api/products";

//check if authenticated
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo === null) {
  location.href = "./auth/";
} else if (userInfo.expiryDate < Date.now()) {
  location.href = "./auth/";
}
const username = document.querySelector(".user span");
username.textContent = userInfo.username;

const form = new Form();
loading(true, 0);
await fetchData(endpoint);