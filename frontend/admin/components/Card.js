import Form from "./Form.js";

class Card {
  el;
  cardInfo;

  constructor(cardInfo){
    this.cardInfo = cardInfo;
    const element = document.createElement("div");
    const imgID = crypto.randomUUID();
    const image = new Image();
    image.src = cardInfo.img;
    image.style.animation = "none";
    image.style.backgroundSize = "cover";
    image.onload = () => {
      const img = document.getElementById(imgID);
      img.replaceWith(image);
    }
    element.innerHTML = `
      ${(cardInfo.corner) ? `<p class="corner"><span>${cardInfo.corner}</span></p>` : ""}
      <img class="img" id="${imgID}" />
      <h3 class="productName">${cardInfo.name}</h3>
      <p class="productDesc">${cardInfo.description}</p>
    `;
    element.classList.add("card");
    // element.setAttribute("img", cardInfo.img);
    element.setAttribute("cardInfo", JSON.stringify(cardInfo));
    element.addEventListener("click", this.projectSelf)
    this.el = element;
  }
  
  projectSelf(e){
    let cardInfo = e.currentTarget.getAttribute("cardInfo");
    cardInfo = JSON.parse(cardInfo);
    const form = new Form(cardInfo);
  }
}

export default Card;