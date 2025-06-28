import api from "./api";
/*
* Obtiene todas las áreas de Staff y Asesoría
*/
export const listAreas = async () => {
  const response = await api.get("/areas");
  return response.data;
};

/**
 * Obtiene un area por su ID, incluyendo sub subareas
 * @Param {number} areaId - El id del area a buscar
 */
export const getAreaById = async() => {
  const response = await api.get(`/areas/${areaId}`);
  return response.data;
}
