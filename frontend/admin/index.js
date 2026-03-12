import Form from "./components/Form.js";
import fetchData from "./fetchData.js";

const endpoint = "/api/products";

fetchData(endpoint);
const form = new Form();