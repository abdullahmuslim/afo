class Carousel {
  // Defines the container for our carousel

  #cuttoff = 3; // limit for visible cards on both sides of main card
  #maxCard = 7; // number of acceptable carousel cards
  cards = [];

  constructor(cardsInfo){
    cardsInfo.some((card, index) => {
      if (index >= this.#maxCard) return true;
      this.cards.push(new Card(card));
    });

    //duplicate the original card instances
    this.cards.map(card => {
      this.cards.push(Card.clone(card));
    });

    this.#render();
    this.#setHandlers();
    
  }

  #render(){
    // Carousel initialisation and addition to DOM
    const container = document.querySelector(".carousel");
    // set initial markup
    container.innerHTML = `
      <div class="cards-holder"></div>
      <div class="carousel-buttons">
        <button id="carousel-prev"><img src="./images/left.png" alt="prev" /></button>
        <button id="carousel-next"><img src="./images/left.png" alt="next" /></button>
      </div>
      <div class="indicators"></div>
    `;
    
    const cardsHolder = document.querySelector(".cards-holder");
    this.cards.map(card => {
      cardsHolder.appendChild(card.el);
    });
    
    

    this.#arrange();
    this.#generateIndicator();
    this.indicate();

  }

  #arrange(){
    // update cards position and general styling
    this.cards.map((card, index) => {
      card.style(index, this.#cuttoff);
    });
  }
  
  #generateIndicator(){
    const indicators = document.querySelector(".indicators");
    for (let i = 0; i < this.#maxCard; i++){
      const span = document.createElement("span");
      indicators.appendChild(span);
    }
  }

  #setHandlers(){
    const [prev, next] = [...document.querySelector(".carousel-buttons").children];
    const handlePrev = () => this.prev();
    const handleNext = () => this.next();
    prev.addEventListener("click", handlePrev);
    next.addEventListener("click", handleNext);

    const images = [...document.querySelectorAll(".card .img")];
images.map( img => {
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
    const handleAction = e => {
      const target = e.currentTarget;
      const el = target.parentElement.children[1];
      let text = el.textContent;
      let message = `Hi, I would like to order ${text}`;
      message = encodeURIComponent(message);
      const url = `https://wa.me/2349034196928?text=${message}`;
      window.location.href = url;
    }

    productActions.map( action => action.addEventListener("click", handleAction));

  }
  
  next(){
    // bring card to the right to focus
    const old = this.cards.shift();
    this.cards.push(old);
    this.#arrange();
    this.indicate();
  }
  
  prev(){
    // bring card to the left to focus
    const old = this.cards.pop();
    this.cards.unshift(old);
    this.#arrange();
    this.indicate();
  }
  
  indicate(){
    const indicators = [...document.querySelector(".indicators").children];
    const activeElement = this.cards[0].el;
    const container = activeElement.parentElement;
    let activeIndex = [...container.children].indexOf(activeElement);
    
    // add active styling to the currently focused card
    this.cards.map(card => card.el.classList.remove("active"));
    this.cards[0].el.classList.add("active");
    
    const cardsNum = container.children.length / 2;
    activeIndex = (activeIndex > cardsNum) ? activeIndex - (cardsNum) : activeIndex;
    
    indicators.map((indicator, index) => {
      indicator.classList.remove("active");
      if (index === activeIndex) indicator.classList.add("active");
    })
  }


}

export class Card {
  // Definition for individual card in the carousel
  el;
  cardInfo;

  constructor(cardInfo){
    this.cardInfo = cardInfo;
    const element = document.createElement("div");
    element.innerHTML = `
      ${(cardInfo.corner) ? `<p class="corner"><span>${cardInfo.corner}</span></p>` : ""}
      <img class="img" img=${cardInfo.img} />
      <h3 class="productName">${cardInfo.name}</h3>
      <p class="productDesc">${cardInfo.description}</p>
      <button class="productAction" type="button">request</button>
    `;
    element.classList.add("card");
    // element.setAttribute("img", cardInfo.img);
    this.el = element;
  }

  style(index, cuttoff){
    // set stacking
    const zIndex = `-${(index > cuttoff ? index - cuttoff : index)}`;
    const elementStyle = this.el.style;
    elementStyle.zIndex = zIndex;
    
    // set position
    // positioning is also dependent on size incorporated translate property
    const divisionMultiplier = (100/2);
    elementStyle.left = `${(index < cuttoff+1) ? divisionMultiplier + (index * 25) : divisionMultiplier + (25 * (cuttoff - index))}%`;

    // hide excess
    const display = `${(index <= cuttoff*2) ? "flex" : "none"}`;
    elementStyle.display = display;

    // set sizing
    const size = (index <= cuttoff) ? Math.abs(1 - (index*0.3)) : Math.abs((1 - (index - cuttoff)*0.3));
    elementStyle.transform = `translate(-50%, 0%) scale(${size})`;

  }

  static clone(card){
    return new Card(card.cardInfo);
  }
}

export default Carousel;