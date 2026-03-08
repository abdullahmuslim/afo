import Cards from "./components/Cards.js";

const fetchedData = [
  {
    img: "../img2.png",
    corner: "20% off",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  {
    img: "./images/ps5.png",
    corner: "",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  {
    img: "./images/jblcharge6.png",
    corner: "20% off more",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  {
    img: "./images/img2.png",
    corner: "20% off",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  {
    img: "./images/oraimospeaker.png",
    corner: "20% off",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  {
    img: "./images/img3.png",
    corner: "20% off",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  {
    img: "./images/opensnap.png",
    corner: "20% off",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  {
    img: "./images/redmibuds6.png",
    corner: "20% off",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  
];
const cards = new Cards(fetchedData);

const pickFile = (e) => {
  const el = e.currentTarget;
  const image = el.files[0];
  const imageURL = URL.createObjectURL(image);
  const uncompressedImg = new Image();
  uncompressedImg.src = imageURL;
  
  const uploadedImage = document.querySelector(".uploadedImage");
  uploadedImage.style.backgroundImage = `url(${imageURL})`;
  uploadedImage.style.backgroundSize = "cover";
  
  uncompressedImg.onload = () => {
    // image compression using HTML canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    canvas.width = uncompressedImg.naturalWidth;
    canvas.height = uncompressedImg.naturalHeight;
    ctx.drawImage(uncompressedImg,  0, 0);
    let source = canvas.toDataURL("image/webp", 0.75);
    source = source.replace("data:image/webp;base64,", "");
    // const data = new FormData();
  }
}
const filePicker = document.querySelector(".filePicker");
filePicker.addEventListener("change", pickFile);
