// src/services/volunteerService.js (ejemplo)

const API_BASE_URL = "http://localhost:3000/api";

export const volunteerService = {
  // Obtiene todas las áreas (Staff y Asesoría)
  async getAllAreas() {
    const response = await fetch(`${API_BASE_URL}/areas`);
    if (!response.ok) {
      throw new Error("Failed to fetch all areas");
    }
    return response.json(); // Esto devolverá { staffAreas: [], asesoryAreas: [] }
  },

  // Obtiene las subáreas para un ID de Área Staff específico
  async getSubAreasByAreaStaffId(areaStaffId) {
    const response = await fetch(`${API_BASE_URL}/areas/staff/${areaStaffId}/subareas`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subareas for staff area ID ${areaStaffId}`);
    }
    return response.json();
  },

  // Obtiene las preguntas para un ID de SubÁrea específico
  async   getQuestionsBySubAreaId(subAreaId) {
    const response = await fetch(`${API_BASE_URL}/areas/subareas/${subAreaId}/questions`);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions for subarea ID ${subAreaId}`);
    }
    return response.json();
  },

  // obtiene las preguntas para un id de area especifico
  async getQuestionsByAreaId(AreaId) {
    const response = await fetch(`${API_BASE_URL}/areas/${AreaId}/questions`);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions for area ID ${AreaId}`);
    }
    return response.json();
  },

  // Si aún usas este método para ciertas preguntas dinámicas (basado en el ID del área Staff)
  async getAreaQuestions(areaIds) {
    const idsString = areaIds.join(',');
    const response = await fetch(`${API_BASE_URL}/areas/questions-by-area-staff-ids?areaIds=${idsString}`);
    if (!response.ok) {
      throw new Error("Failed to fetch area questions");
    }
    return response.json();
  },

  // ... otros métodos como createVolunteer
  async createVolunteer(formData) {
    // Aquí podrías necesitar transformar formData antes de enviarlo,
    // especialmente las respuestas dinámicas y los archivos.
    // Asegúrate de que tu backend espera el formato correcto.
    const response = await fetch(`${API_BASE_URL}/volunteers`, { // Asumiendo un endpoint para crear voluntarios
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ajusta si subes archivos (multipart/form-data)
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create volunteer");
    }
    return response.json();
  },
};/**
 * modificar
 */

// src/services/volunteerService.js
import api from "./api"; // Usamos nuestra instancia centralizada de Axios
/**
 * Sube un archivo directamente a Cloudinary después de obtener una firma del backend.
 * @param {File} file - El archivo a subir.
 * @returns {Promise<string>} La URL segura del archivo subido.
 */
export const uploadFileToCloudinary = async (file) => {
    // 1. Obtenemos la firma segura de nuestro backend
    // Asegúrate de que la ruta '/api/cloudinary/signature' es correcta
    const { data: { signature, timestamp, folder } } = await api.get('/cloudinary/signature');

    // 2. Preparamos el FormData para enviar a Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    // Reemplaza el valor de api_key con tu clave real de Cloudinary
    formData.append('api_key', '121771835722339');
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);
    formData.append('folder', folder);

    // 3. Hacemos la petición POST directamente a la API de Cloudinary

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dnupey6af/upload`;

    // Usamos axios directamente para esta llamada externa, no nuestra instancia 'api'
    // ya que no necesita nuestros headers de autorización, etc.
    const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
    });

    const cloudinaryData = await response.json();

    if (!response.ok) {
        throw new Error(cloudinaryData.error?.message || 'Error al subir a Cloudinary');
    }

    // 4. Devolvemos la URL segura del archivo subido
    return cloudinaryData.secure_url;
};




export const createApplication = async (endpoint, applicationData) => {
    const response = await api.post(endpoint, applicationData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};




/**
 * Envía la postulación para un voluntario de STAFF.
 * @param {FormData} staffPayload - El objeto FormData con los datos y el archivo.
 * @returns {Promise<object>}
 */
export const createStaffApplication = async (staffPayload) => {
  const response = await api.post('/volunteer/staff', staffPayload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Envía la postulación para un voluntario ASESOR.
 * @param {FormData} adviserPayload - El objeto FormData con los datos y los archivos.
 * @returns {Promise<object>}
 */
export const createAdviserApplication = async (adviserPayload) => {
  const response = await api.post('/volunteer/adviser', adviserPayload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// ... (Aquí puedes mantener tus otras funciones de servicio si las necesitas en otros lugares)
