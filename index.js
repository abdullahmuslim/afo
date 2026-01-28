const cards = [...document.querySelectorAll(".card")];
cards.map( (card, index) => {
  card.style.backgroundImage = `url("./images/img${index+1}.png")`;
});
