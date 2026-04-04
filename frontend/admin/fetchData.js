import { loader } from "./loader.js";
import Cards from "./components/Cards.js";
import { loading } from "./components/Form.js";

const host = "https://great-excitement-009d6e4afb.strapiapp.com";
const authEndpoint = "/api/auth/local";

async function getToken() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo === null) {
    location.href = "./auth/";
  } else if (userInfo.expiryDate < Date.now()) {
    location.href = "./auth/";
  }
  
  const authToken = userInfo.jwt;
  return authToken;
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

export async function postData(endpoint, productData) {
  const url = host + endpoint;
  const token = await getToken();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: productData }),
    });
    if (!response.ok) {
      loading(false);
      throw new Error("HTTP Error: " + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}


export async function putData(endpoint, productData) {
  const url = host + endpoint;
  const token = await getToken();
  try {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: productData }),
    });
    if (!response.ok) {
      loading(false);
      throw new Error("HTTP Error: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function putImage(endpoint, formData) {
  const url = host + endpoint;
  const token = await getToken();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteItem(endpoint) {
  const url = host + endpoint;
  const token = await getToken();
  try {
    const response = fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error(error.message);
  }
}

let wakeServer;
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${host + endpoint}?populate=image`);
    if (response.status !== 503){
      const splashScreen = document.querySelector(".splash-screen-wrapper");
      splashScreen.style.display = "none";
      clearTimeout(wakeServer);
      clearTimeout(loader);
    }
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }
    let data = await response.json();
    data = data.data.map(eachRes => {
      return {
        ...eachRes,
        img: eachRes.image && eachRes.image[0].url,
        imgId: eachRes.image && eachRes.image[0].id,
        imgName:  eachRes.image && eachRes.image[0].name
      }
    });
    const cards = new Cards(data);
    return data;
  } catch (error) {
    if (error.name === "TypeError"){
      // console.log("waking server 503");
      wakeServer = setTimeout(() => {
        fetchData(endpoint);
      }, 2000); // resend a request every 2secs to wake server
    } else {
      console.error(error);
    }
  }
}

export async function getImage(endpoint) {
  const url = host + endpoint;
  const token = await getToken();
  try {
    const response = fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error(error.message);
  }
}

export default fetchData;