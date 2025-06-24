export type APIResponse<T> = {
  success: boolean;
  content: T;
  data: T;
  status?: number;
};
