import Form from "./components/Form.js";
import fetchData from "./fetchData.js";
import loading from "./loader.js";

const endpoint = "/api/products";

//check if authenticated
const userInfo = localStorage.getItem("userInfo");
if (userInfo === null) {
  location.href = "./auth/";
} else if (userInfo.expiryDate < Date.now()) {
  location.href = "./auth/";
}

const form = new Form();
loading(true, 0);
await fetchData(endpoint);