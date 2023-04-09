import api from "../../api";
export const AuthService = {
  async login(data: any) {
    const response = await api.post(
      `https://27.u6964.xvest3.ru/api/user/login`,
      data
    );
    return response;
  },
};
