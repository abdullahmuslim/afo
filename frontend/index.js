import Carousel, {Card} from "./carousel.js";
import fetchData, { dummyData } from "./fetchData.js"


const endpoint = "/api/products";
const carousel = new Carousel(dummyData);
const fetchedData = fetchData(endpoint);

const main = document.querySelector(".hero");
const randomInt = () => Math.floor(Math.random() * 99);
main.style.backgroundPosition = `${randomInt()}% ${randomInt()}%`;

const logo = new Image();
logo.src = "./images/logo.jpg";
logo.onload = () => {
  const loadAnime = document.querySelector(".miniLoading");
  loadAnime.style.display = "none";
  loadAnime.parentElement.appendChild(logo);
}
