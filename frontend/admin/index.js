import Cards from "./components/Cards.js";
import Form from "./components/Form.js";
import fetchData from "./fetchData.js";
import loading from "./loader.js";

const endpoint = "/api/products";

const form = new Form();
loading(true, 0);
const data = await fetchData(endpoint);
const cards = new Cards(data);