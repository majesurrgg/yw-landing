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
export const listAreasStaff = async () => {
  const response = await api.get("/areas/staff");
  return response.data;
};

/**
 * Obtiene los detalles de un Área de Staff por su ID.
 * La usamos para obtener el nombre del área principal en el formulario.
 * @param {string} areaId - El ID del área.
 * @returns {Promise<object>}
 */
export const getAreaById = async (areaId) => {
  const response = await api.get(`/areas/${areaId}`);
  return response.data;
};


/**
 * Obtiene los detalles de una SubÁrea específica por su ID.
 * La usamos para obtener el nombre del puesto al que se postula.
 * @param {string} subAreaId - El ID de la subárea.
 * @returns {Promise<object>}
 */
export const getSubAreaById = async (subAreaId) => {
  const response = await api.get(`/subareas/${subAreaId}`);
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