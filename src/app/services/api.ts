import axios from 'axios';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const instance = axios.create({
  baseURL: import.meta.env.VITE_SPOTIFY_API_URI,
  headers: {
    Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
  },
});

export default instance;
