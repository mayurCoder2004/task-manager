// src/api.js
import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

const API = axios.create({
  baseURL: API_BASE_URL
});

API.interceptors.request.use(req => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;