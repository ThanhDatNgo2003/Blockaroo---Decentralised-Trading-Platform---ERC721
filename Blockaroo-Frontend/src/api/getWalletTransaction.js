import axios from "axios";

export default function getTransaction(wallet_address) {
    return axios.get(`http://127.0.0.1:8000/gethistory/?wallet_address=${wallet_address}`);
}
