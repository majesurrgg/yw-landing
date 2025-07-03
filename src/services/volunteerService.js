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



/**
 * Envía la postulación completa al backend.
 * @param {object} applicationData - Los datos del formulario, con el formato del DTO.
 * @returns {Promise<object>}
 */
export const createApplication = async (applicationData) => {
    // NOTA: La subida de archivos (CV) requiere un tratamiento especial (multipart/form-data).
    // Por ahora, este código asume que el `cv_url` ya es un string (una URL).
    const response = await api.post('/applications', applicationData);
    return response.data;
};
