import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export interface AxiosErrorResponse {
  errors?: Record<string, any>;
  message?: string;
}

export interface UseAxiosReturnType<T> {
  response: T | null;
  error: AxiosErrorResponse | null;
  loading: boolean;
  statusCode: number | null;
  sendRequest: (config: AxiosRequestConfig) => Promise<T | null>;
}

const useAxios = <T,>(): UseAxiosReturnType<T> => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<AxiosErrorResponse | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(
    async (config: AxiosRequestConfig): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res: AxiosResponse<T> = await axios.request<T>({
          ...config,
          headers: {
            ...headers,
            ...config.headers,
          },
        });
        setResponse(res.data);
        return res.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        const errorData = axiosError.response?.data as AxiosErrorResponse;
        setError(errorData ?? { message: axiosError.message });
        if (axiosError.response) {
          setStatusCode(axiosError.response.status);
          setError(axiosError.response.data as AxiosErrorResponse);
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { response, statusCode, sendRequest, error, loading };
};

export default useAxios;
