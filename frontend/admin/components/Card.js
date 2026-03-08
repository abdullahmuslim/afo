class Card {
  el;
  cardInfo;

  constructor(cardInfo){
    this.cardInfo = cardInfo;
    const element = document.createElement("div");
    const imgID = crypto.randomUUID();
    const image = new Image();
    image.src = cardInfo.img;
    image.onload = () => {
      const img = document.getElementById(imgID);
      console.log("loaded");
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
    const form = document.querySelector("form");
    let cardInfo = e.currentTarget.getAttribute("cardInfo");
    cardInfo = JSON.parse(cardInfo);
    form.innerHTML = `
    <label class="imageInput" for="filePicker">
      <p>click <span>here</span> to add an image from your device</p>
      <input class="filePicker" type="file" name="" id="filePicker" accept="image/*" alt="" />
      <p class="uploadedImage" style="background-image: url('${cardInfo.img}'); background-size: cover;"></p>
    </label>
    <button class="imgButton" type="button">upload</button>
    <div class="cardTitles">
      <input type="text" name="" id="" value="${cardInfo.name}" placeholder="product name" />
      <input type="text" name="" id="" value="${cardInfo.description}" placeholder="write short and attention sparking description" />
    </div>
    <textarea class="description" name="" id="" placeholder="enter full spec details here" rows="8" cols="40"></textarea>
    <button class="submit" type="submit">add</button>
    `;
    console.log(form.innerHTML);
  }
}

export default Card;