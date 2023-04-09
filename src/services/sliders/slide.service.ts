import { API_URL, getSlideUrl } from "src/api/configs/api.config";
import api from "src/api/interceptors";
import { ISlideCreate } from "./slide.props";

export const SlideService = {
  async create(data: ISlideCreate) {
    const response = await api.post<any>(
      `${API_URL}${getSlideUrl("/create")}`,
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
    return await api.get<any>(getSlideUrl(`/indexAdmin`), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },
  async update(id: any, data: any) {
    return await api.post<any>(getSlideUrl(`/edit/${id}`), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async show(id: any) {
    return await api.get<any>(getSlideUrl(`/show/${id}`));
  },
  async delete(id: string) {
    return await api.delete<string>(getSlideUrl(`/delete/${id}`));
  },
};
