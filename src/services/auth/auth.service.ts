import axios from "axios";
export const AuthService = {
  async login(data: any) {
    const response = await axios.post(
      `https://27.u6964.xvest3.ru/api/user/login`,
      data
    );
    return response;
  },
};
