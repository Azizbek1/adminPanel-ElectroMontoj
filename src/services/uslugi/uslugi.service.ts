import { API_URL, getUslugiUrl } from "src/api/configs/api.config";
import api from "src/api/interceptors";
import { IUslugiCreate } from "./uslugi.props";

export const UslugiService = {
  async create(data: IUslugiCreate) {
    const response = await api.post<any>(
      `${API_URL}${getUslugiUrl("/create")}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  },
  async getAll(searchTerm?: string) {
    return await api.get<any>(getUslugiUrl(`/indexAdmin`), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },
  async update(id: any, data: any) {
    return await api.post<any>(getUslugiUrl(`/edit/${id}`), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async show(id: any) {
    return await api.get<any>(getUslugiUrl(`/show/${id}`));
  },
  async delete(id: string) {
    return await api.delete<string>(getUslugiUrl(`/delete/${id}`));
  },
};
