import { API_URL, getNewsUrl } from "src/api/configs/api.config";
import api from "src/api/interceptors";
import { INewsCreate } from "./news.props";

export const NewsService = {
  async create(data: INewsCreate) {
    const response = await api.post<any>(
      `${API_URL}${getNewsUrl("/create")}`,
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
    return await api.get<any>(getNewsUrl(`/index`), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },
  async update(id: any, data: any) {
    return await api.post<any>(getNewsUrl(`/edit/${id}`), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async show(id: any) {
    return await api.get<any>(getNewsUrl(`/show/${id}`));
  },
  async delete(id: string) {
    return await api.delete<string>(getNewsUrl(`/delete/${id}`));
  },
};
