import axios from "axios";

export default function getBalance(wallet_address) {
    return axios.get(`http://127.0.0.1:8000/getbalance/?wallet_address=${wallet_address}`);
}
