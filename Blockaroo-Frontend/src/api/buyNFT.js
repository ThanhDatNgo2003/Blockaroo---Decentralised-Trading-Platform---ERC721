import axios from "axios";

export default function buynft(buyObject) {
    return axios.put("http://127.0.0.1:8000/buynft/", {
        token_id: buyObject.token_id,
        from_address: buyObject.from_address,
        to_address: buyObject.to_address
    });
}