import Cards from "./components/Cards.js";

const host = "http://localhost:1337";
const authEndpoint = "/api/auth/local"
let token = "";

const authorize = () => {
  fetch(host+endpoint, {
    "identifier": "muslimabdullah925@gmail.com",
    "password": "PA#w0rd1",
  }).then(response => response.json).then(res => {
    token = res.jwt;
  });
}

export const dummyData = [
  {
    id: "",
    img: "./img2.png",
    corner: "20% off",
    name: "Mobile Gimbal Stabilizer",
    description: "Don't just record your life - capture it in cinematic quality",
  },
  {
    id: "",
    img: "./images/ps5.png",
    corner: "",
    name: "Sony Slim Playstation 5",
    description: "All the power of the original PS5, now 30% smaller with a 1TB SSD",
  },
  {
    id: "",
    img: "./images/jblcharge6.png",
    corner: "",
    name: "JBL Charge6",
    description: "Bold JBL Pro Sound and a built-in power bank—now with 28 hours of playtime and IP68 durability.",
  },
  {
    id: "",
    img: "./images/img1.png",
    corner: "limited",
    name: "Dual Wireless Charging Pad ",
    description: "Sleek, low-profile pad, eliminates cable clutter. Charge your phone and earbuds simultaneously.",
  },
  {
    id: "",
    img: "./images/oraimospeaker.png",
    corner: "limited",
    name: "Oraimo SpaceBox OBS-382",
    description: "Immersive 10W stereo sound and dynamic RGB lights in a sleek, portable design.",
  },
  {
    id: "",
    img: "./images/img3.png",
    corner: "",
    name: "Foldable Phone Grip and Stand",
    description: "a modern aluminium phone stand",
  },
  {
    id: "",
    img: "./images/opensnap.png",
    corner: "flash sale",
    name: "Oraimo Earbuds OpenSnap Wireless Open Ear",
    description: "Secure, open-ear comfort with powerful bass and total environmental awareness.",
  },
  {
    id: "",
    img: "./images/redmibuds6.png",
    corner: "limited",
    name: "Redmi Buds 6 Play",
    description: "Powerful 10mm bass and 36-hour total playtime in a super-lightweight design.",
  },
  
];

export async function putData(endpoint, data) {
  const url = host + endpoint;
  if (token === ""){
    authorize();
  }
  try{
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}>`
      },
      body: JSON.stringify({ data: data }),
    });
    if (!response.ok){
      throw new Error("HTTP Error: " + response.status);
    }
    return response.json();
  } catch(error){
    console.error(error);
  }
}

export async function putImage(endpoint, formData) {
  const url = host + endpoint;
  if (token === ""){
    authorize();
  }
  try{
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}>`
      },
      body: formData,
    });
    if (!response.ok){
      throw new Error("HTTP Error: " + response.status);
    }
    return response.json();
  } catch(error){
    console.error(error);
  }
}

async function fetchData(endpoint){
  try {
    const response = await fetch(`${host+endpoint}?populate=image`);
    if (!response.ok){
      throw new Error("HTTP error: " + response.status);
    }
    let data = await response.json()
    data = data.data.map(eachRes => {
      return {...eachRes, img: host + eachRes.image[0].url}
    });
    const cards = new Cards(data);
    return data;
  } catch (e) {
    console.error(e.message);
  }
}

export default fetchData;