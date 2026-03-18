import Cards from "./components/Cards.js";
import Form from "./components/Form.js";
import fetchData from "./fetchData.js";

const endpoint = "/api/products";

const form = new Form();
const data = await fetchData(endpoint);
const cards = new Cards(data);