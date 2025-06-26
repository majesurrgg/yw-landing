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
};