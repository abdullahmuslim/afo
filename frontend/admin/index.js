import Form from "./components/Form.js";
import fetchData from "./fetchData.js";

const endpoint = "/api/products";

const form = new Form();
fetchData(endpoint);