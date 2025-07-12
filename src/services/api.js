import axios from "axios";
const API_URL_LOCAL = 'http://localhost:3000/api';
const API_URL_PRODUCTION='https://yachaywasiback.shop/api';

const api = axios.create({
  baseURL: API_URL_LOCAL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
