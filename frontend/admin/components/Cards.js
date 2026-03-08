import Card from "./Card.js";

class Cards {
  lists = [];
  constructor(cardsInfo){
    this.cardsInfo = cardsInfo;
    cardsInfo.map(info => {
      this.lists.push(new Card(info))
    });
    this.#render();
  }
  #render(){
    // Cards initialisation and addition to DOM
    const container = document.querySelector(".main");
    // set initial markup
    container.innerHTML = "";
    
    this.lists.map(card => {
      container.appendChild(card.el);
    });
  }
}

export default Cards;