import axios from "axios";

export default function sellnft(sellObject) {
    return axios.put("http://127.0.0.1:8000/sellnft/", {
        token_id: sellObject.token_id,
        price: sellObject.price,
        wallet_address: sellObject.wallet_address
    });
}