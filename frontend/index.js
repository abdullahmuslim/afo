import Carousel, {Card} from "./carousel.js";
import fetchData from "./admin/fetchData.js"

fetchData();

const handleAction = e => {
    const target = e.currentTarget;
    const el = target.parentElement.children[1];
    let text = el.textContent;
    let message = `Hi, I would like to order ${text}`;
    message = encodeURIComponent(message);
    const url = `https://wa.me/2349034196928?text=${message}`;
    window.location.href = url;
    
}

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

const fetchedData = fetchData();

const carousel = new Carousel(fetchedData);

const [prev, next] = [...document.querySelector(".carousel-buttons").children];
const handlePrev = () => carousel.prev();
const handleNext = () => carousel.next();
prev.addEventListener("click", handlePrev);
next.addEventListener("click", handleNext);

const images = [...document.querySelectorAll(".card .img")];
images.map( img => {
  console.log(img);
  const src = img.getAttribute("img");
  const image = new Image();
  image.src = src;
  image.onload = () => {
    img.src = src;
    img.style.animation = "none";
    img.style.backgroundSize = "cover";
  }
});


const productActions = [...document.querySelectorAll(".productAction")];
productActions.map( action => action.addEventListener("click", handleAction));
