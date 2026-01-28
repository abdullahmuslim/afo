const handleAction = e => {
    const target = e.currentTarget;
    const el = target.parentElement.children[1];
    let text = el.textContent;
    let message = `Hi, I would like to order ${text}`;
    message = encodeURIComponent(message);
    const url = `https://wa.me/2349034196928?text=${message}`;
    window.location.href = url;
    
}

const cards = [...document.querySelectorAll(".card")];
cards.map( card => {
  const src = card.getAttribute("img");
  card.style.backgroundImage = `url("${src}")`;
});

const productActions = [...document.querySelectorAll(".productAction")];
productActions.map( action => action.addEventListener("click", handleAction));
