import { API_URL, getServisgiUrl } from "src/api/configs/api.config";
import api from "src/api/interceptors";

export const ServisesService = {
  async create(data: any) {
    const response = await api.post<any>(
      `${API_URL}${getServisgiUrl("/create")}`,
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
    return await api.get<any>(getServisgiUrl(`/index`), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },
  async update(id: any, data: any) {
    return await api.post<any>(getServisgiUrl(`/edit/${id}`), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async show(id: any) {
    return await api.get<any>(getServisgiUrl(`/show/${id}`));
  },
  async delete(id: string) {
    return await api.delete<string>(getServisgiUrl(`/delete/${id}`));
  },
};
