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
    const session = getLocalStorage('user-session');
    config.headers['Accept'] = "application/json";
    config.headers['user-session'] = session;
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
    const session = headers['user-session'];
    if (session) setLocalStorage('user-session', session);
    return response;
  },
  (err) => {
    // Erro network
    toastError(err, "Ошибка");
  }
);

export default api;
