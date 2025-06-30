import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_SPOTIFY_API_URI,
  headers: {},
});

export default instance;
