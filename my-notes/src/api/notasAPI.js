import axios from "axios";

const notasAPI = axios.create({
    baseURL: 'https://vrcastilloss.pythonanywhere.com/api/',
    headers: { 'Content-Type': 'application/json' },
});

export default notasAPI;