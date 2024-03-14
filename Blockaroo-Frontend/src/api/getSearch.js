import axios from "axios";

export default function searchItems(keyword) {
    return axios.get(`http://127.0.0.1:8000/NFTitems/search?keyword=${keyword}`);
}
