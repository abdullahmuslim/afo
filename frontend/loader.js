export let loader;
const loading = (forward, index) => {
  const loadElement = document.querySelector(".progress");
  let text = "loading...";
  if (index === 0){
    forward = true;
    text = text.slice(0, 1);
    loader = setTimeout(()=>loading(forward, index+1), 100);
  }else if (index === text.length){
    forward = false;
    text = text.slice(0, text.length);
    loader = setTimeout(()=>loading(forward, index-1), 100);
  }else{
    text = text.slice(0, index);
    index = (forward) ? index + 1 : index - 1;
    loader = setTimeout(()=>loading(forward, index), 100);
  }
  // console.log(text);
  loadElement.textContent = text;
  
}
export default loading;