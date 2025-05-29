// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.65.244:8000/', // Use environment variables for flexibility
});


export default api;
