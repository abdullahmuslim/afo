import Cards from "./components/Cards.js";
import Form from "./components/Form.js";
import fetchData from "./fetchData.js";

fetchData();
const fetchedData = [
  {
    img: "./images/img2.png",
    corner: "20% off",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  {
    img: "./images/ps5.png",
    corner: "",
    name: "Sony Slim Playstation 5",
    description: "All the power of the original PS5, now 30% smaller with a 1TB SSD",
  },
  {
    img: "./images/jblcharge6.png",
    corner: "",
    name: "JBL Charge6",
    description: "Bold JBL Pro Sound and a built-in power bank—now with 28 hours of playtime and IP68 durability.",
  },
  {
    img: "./images/img1.png",
    corner: "limited",
    name: "Dual Wireless Charging Pad ",
    description: "Sleek, low-profile pad, eliminates cable clutter. Charge your phone and earbuds simultaneously.",
  },
  {
    img: "./images/oraimospeaker.png",
    corner: "limited",
    name: "Oraimo SpaceBox OBS-382",
    description: "Immersive 10W stereo sound and dynamic RGB lights in a sleek, portable design.",
  },
  {
    img: "./images/img3.png",
    corner: "",
    name: "Foldable Phone Grip and Stand",
    description: "a modern aluminium phone stand",
  },
  {
    img: "./images/opensnap.png",
    corner: "flash sale",
    name: "Oraimo Earbuds OpenSnap Wireless Open Ear",
    description: "Secure, open-ear comfort with powerful bass and total environmental awareness.",
  },
  {
    img: "./images/redmibuds6.png",
    corner: "limited",
    name: "Redmi Buds 6 Play",
    description: "Powerful 10mm bass and 36-hour total playtime in a super-lightweight design.",
  },
  
];
const cards = new Cards(fetchedData);
const form = new Form();
