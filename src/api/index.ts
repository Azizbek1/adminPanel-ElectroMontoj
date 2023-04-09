import axios from "axios";

import { API_URL } from "./api.config";
import {
  getLocalStorage,
  setLocalStorage,
} from "../settings/localstorage/localStorage";
import { toastError } from "../settings/ToastReact/ToastReact";
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config: any) => {
    const session = getLocalStorage(import.meta.env.VITE_APP_SESSION_KEY);
    config.headers[import.meta.env.VITE_APP_ACCEPT] = "application/json";
    config.headers[import.meta.env.VITE_APP_SESSION_KEY] = session;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Handle errors of all responses
api.interceptors.response.use(
  (response) => {
    const { headers } = response;
    const session = headers[import.meta.env.VITE_APP_SESSION_KEY];
    if (session) setLocalStorage(import.meta.env.VITE_APP_SESSION_KEY, session);
    return response;
  },
  (err) => {
    // Erro network
    toastError(err, "Ошибка");
  }
);

export default api;
