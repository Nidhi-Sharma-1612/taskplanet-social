import axios from "axios";

const api = axios.create({
  baseURL: "https://taskplanet-backend-4g9s.onrender.com/api",
  withCredentials: true,
});

export default api;
