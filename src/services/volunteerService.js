/**
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
