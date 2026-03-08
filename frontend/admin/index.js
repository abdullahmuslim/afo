import Cards from "./components/Cards.js";
import Form from "./components/Form.js";
import fetchData, {dummyData} from "./fetchData.js";

const endpoint = "/api/products";

const cards = new Cards(dummyData);
const fetchedData = fetchData(endpoint);
const form = new Form();
