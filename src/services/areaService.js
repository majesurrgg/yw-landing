import api from "./api";

/**
 * obtiene todas subareas de atributo asesories en area staff
 */
export const listAreasAsesories = async () => {
  const response = await api.get("/subareas/type/asesories");
  return response.data;
}

/*
* Obtiene todas las áreas de Staff
*/
/**
 * obtiene todas subareas de atributo asesories en area staff
 */
export const listAreasStaffAsesories = async () => {
  const response = await api.get("/subareas/staff/type/asesories");
  return response.data;
}

/*
* Obtiene todas las áreas de Staff
*/
export const listAreasStaff = async () => {
  const response = await api.get("/areas/staff");
  return response.data;
};

/**
 * Obtiene las preguntas dinámicas para una SubÁrea específica.
 * @param {string} subAreaId - El ID de la subárea.
 * @returns {Promise<Array>}
 */
export const getQuestionsBySubAreaId = async (subAreaId) => {
  const response = await api.get(`/areas/subareas/${subAreaId}/questions`);
  return response.data;
};

/**
 * Obtiene un area por su ID, incluyendo sub subareas
 */
export const getAreaById = async(areaId) => {
  const response = await api.get(`/areas/${areaId}`);
  return response.data;
}


/**
 * obtiene sub area por id 
 */
export const getSubAreaById = async(subareaId) => {
  const response = await api.get(`/subareas/${subareaId}`);
  return response.data;
}