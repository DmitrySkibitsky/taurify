import { useUserStore } from '@/modules/user/stores/user.ts';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

class HttpService {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_SPOTIFY_API_URI,
      headers: {},
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const userStore = useUserStore();

        const token: string | undefined = userStore.accessToken?.access_token;

        if (token) {
          config.headers = config.headers ?? {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }

  public get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  public post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T, AxiosResponse<T>, D>(url, data, config);
  }

  public put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T, AxiosResponse<T>, D>(url, data, config);
  }

  public delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

export default new HttpService();
