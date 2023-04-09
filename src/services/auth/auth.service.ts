import api from "../../api";
import { API_URL } from "../../api/api.config";
export const AuthService = {
  async login(data: any) {
    const response = await api.post(
      `${API_URL}/user/login`,
      data
    );
    return response;
  },
};
