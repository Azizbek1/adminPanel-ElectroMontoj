import { API_URL, getPortUrl } from "src/api/configs/api.config";
import api from "src/api/interceptors";
import { IProtCreate } from "./portfolio.props";

export const PrortFolioService = {
  async create(data: IProtCreate) {
    const response = await api.post<any>(
      `${API_URL}${getPortUrl("/create")}`,
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
    return await api.get<any>(getPortUrl(`/index`), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },
  async update(id: any, data: any) {
    return await api.post<any>(getPortUrl(`/edit/${id}`), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async show(id: any) {
    return await api.get<any>(getPortUrl(`/show/${id}`));
  },
  async delete(id: string) {
    return await api.delete<string>(getPortUrl(`/delete/${id}`));
  },
};
