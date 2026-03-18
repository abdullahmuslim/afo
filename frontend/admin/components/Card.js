import Form from "./Form.js";
import { deleteItem } from "../fetchData.js";

class Card {
  el;
  cardInfo;

  constructor(cardInfo){
    this.cardInfo = cardInfo;
    const element = document.createElement("div");
    const imgID = crypto.randomUUID();
    const image = new Image();
    image.classList.add("img");
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
      <button class="productAction" type="button">delete</button>
    `;
    element.classList.add("card");
    // element.setAttribute("img", cardInfo.img);
    element.dataset.cardInfo = JSON.stringify(cardInfo);
    element.addEventListener("click", this.projectSelf)
    const button = element.lastElementChild;
    button.addEventListener("click", this.deleteProduct);
    this.el = element;
  }
  
  projectSelf(e){
    let cardInfo = e.currentTarget.dataset.cardInfo;
    cardInfo = JSON.parse(cardInfo);
    const form = new Form(cardInfo);
  }

  async deleteProduct(e) {
    const product = e.currentTarget.parentElement;
    const cardInfo = JSON.parse(product.dataset.cardInfo);
    const imgId = cardInfo.imgId;
    if (imgId) await deleteItem(`/api/upload?=${imgId}`);
    await deleteItem(`/api/products/${cardInfo.documentId}`)
  }
}

export default Card;