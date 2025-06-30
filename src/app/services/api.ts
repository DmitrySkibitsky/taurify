import axios from 'axios';

export type APIResponse<T> = {
  success: boolean;
  content: T;
  data: T;
  status?: number;
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_SPOTIFY_API_URI,
  headers: {},
});

export default instance;
