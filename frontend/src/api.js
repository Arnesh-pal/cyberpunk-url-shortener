import axios from 'axios';

// Determine the base URL based on the environment
const API_URL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BACKEND_URL // Your live Render URL
    : 'http://localhost:5001';         // Your local server URL

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: API_URL
});

export default api;