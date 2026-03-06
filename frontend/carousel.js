class Carousel {
  // Defines the container for our carousel

  #cuttoff = 3; // limit for visible cards on both sides of main card
  #maxCard = 7; // number of acceptable carousel cards
  cards = [];

  constructor(cardsInfo){
    cardsInfo.some((card, index) => {
      this.cards.push(new Card(card));
      if (index >= this.#maxCard - 1) return true;
    });

    //duplicate the original card instances
    this.cards.map(card => {
      this.cards.push(Card.clone(card));
    });

    this.render();
  }

  render(){
    // Carousel initialisation and addition to DOM
    const carousel = document.querySelector(".carousel");
    carousel.innerHTML = ""; // remove initial markup
    this.cards.map(card => {
      carousel.appendChild(card.el);
    });

    this.#arrange();

  }

  next(){
    // bring card to the right to focus
    const old = this.cards.shift();
    this.cards.push(old);
    this.#arrange();
  }
  
  prev(){
    // bring card to the left to focus
    const old = this.cards.pop();
    this.cards.unshift(old);
    this.#arrange();
  }

  #arrange(){
    // update cards position and general styling
    this.cards.map((card, index) => {
      card.style(index, this.#cuttoff);
    });
  }

}

export class Card {
  // Definition for individual card in the carousel
  el;
  cardInfo;

  constructor(cardInfo){
    this.cardInfo = cardInfo;
    const element = document.createElement("div");
    element.classList.add("card");
    element.textContent = "card" + cardInfo;
    this.el = element;
  }

  style(index, cuttoff){
    // set stacking
    const zIndex = `-${(index > cuttoff ? index - cuttoff : index)}`;
    const elementStyle = this.el.style;
    elementStyle.zIndex = zIndex;
    
    // set position
    const divisionMultiplier = (100/3);
    elementStyle.left = `${(index < cuttoff+1) ? divisionMultiplier + (index * 25) : divisionMultiplier + (25 * (cuttoff - index))}%`;

    // hide excess
    const display = `${(index <= cuttoff*2) ? "grid" : "none"}`;
    elementStyle.display = display;

    // set sizing
    // const size = Math.abs(1 / (Number(zIndex)+1));
    // console.log(size);
    // elementStyle.transform = `scale(${size})`;

  }

  static clone(card){
    return new Card(card.cardInfo);
  }
}

export default Carousel;