import axios from "axios";

export default function updateSell(item_id, price) {
    return axios.post("http://127.0.0.1:8000/sellnft/", {
        item_id: item_id,
        price: price
    });
}