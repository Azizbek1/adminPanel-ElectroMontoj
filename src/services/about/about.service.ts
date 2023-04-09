import { API_URL, getAboutUrl } from "src/api/configs/api.config";
import api from "src/api/interceptors";
import { IAboutCreate } from "./about.props";

export const AboutService = {
  async create(data: IAboutCreate) {
    const response = await api.post<any>(
      `${API_URL}${getAboutUrl("/create")}`,
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
    return await api.get<any>(getAboutUrl(`/index`), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },
  async update(data: any) {
    return await api.post<any>(getAboutUrl(`/edit`), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async show(id: any) {
    return await api.get<any>(getAboutUrl(`/show`));
  },
  async delete(id: string) {
    return await api.delete<string>(getAboutUrl(`/delete/${id}`));
  },
};
