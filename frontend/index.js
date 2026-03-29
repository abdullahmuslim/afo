import fetchData from "./fetchData.js"
import loading from "./loader.js";
import logoSrc from "./images/logo.jpg";

const endpoint = "/api/products";
const fetchedData = fetchData(endpoint);

const main = document.querySelector(".hero");
const randomInt = () => Math.floor(Math.random() * 99);
main.style.backgroundPosition = `${randomInt()}% ${randomInt()}%`;

const logo = new Image();
logo.src = logoSrc;
logo.onload = () => {
  const loadAnime = document.querySelector(".miniLoading");
  loadAnime.style.display = "none";
  loadAnime.parentElement.appendChild(logo);
}


loading(true, 0);