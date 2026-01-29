const handleAction = e => {
    const target = e.currentTarget;
    const el = target.parentElement.children[1];
    let text = el.textContent;
    let message = `Hi, I would like to order ${text}`;
    message = encodeURIComponent(message);
    const url = `https://wa.me/2349034196928?text=${message}`;
    window.location.href = url;
    
}

const main = document.querySelector(".main");
const randomInt = () => Math.floor(Math.random() * 99);
main.style.backgroundPosition = `${randomInt()}% ${randomInt()}%`;

const logo = new Image();
logo.src = "./images/logo.jpg";
logo.onload = () => {
  const loadAnime = document.querySelector(".miniLoading");
  loadAnime.style.display = "none";
  loadAnime.parentElement.appendChild(logo);
}

const cards = [...document.querySelectorAll(".card")];
cards.map( card => {
  const src = card.getAttribute("img");
  const image = new Image();
  image.src = src;
  image.onload = () => {
    card.style.backgroundImage = `url("${src}")`;
    card.style.animation = "none";
    card.style.backgroundSize = "cover";
  }
});

const productActions = [...document.querySelectorAll(".productAction")];
productActions.map( action => action.addEventListener("click", handleAction));
