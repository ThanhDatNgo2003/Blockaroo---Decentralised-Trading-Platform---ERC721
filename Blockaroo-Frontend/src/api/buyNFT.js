import axios from "axios";

export default function updateBuy(item_id, from_address, to_address) {
    return axios.post("http://127.0.0.1:8000/buynft/", {
        item_id: item_id,
        from_address: from_address,
        to_address: to_address
    });
}