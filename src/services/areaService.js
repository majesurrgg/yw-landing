import api from "./api";

export const listAreas = async () => {
  const response = await api.get("/areas");
  return response.data;
};