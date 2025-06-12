import axios from 'axios';
// SERVICIO DE FRONTEND
const API_URL = 'http://localhost:3000/api';

export const volunteerService = {

  async createVolunteer(volunteerData) {
    try {
      const formData = new FormData();

      // Add all fields to formData
      Object.keys(volunteerData).forEach(key => {
        if (key === 'cv_url' && volunteerData[key] instanceof File) {
          formData.append('cv', volunteerData[key]);
        } else {
          formData.append(key, volunteerData[key]);
        }
      });

      const response = await axios.post(`${API_URL}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener Áreas
  async getVolunteerAreas() {
    try {
      const response = await axios.get(`${API_URL}/areas`); // <-- /api/areas (endpoint expuesto en back)
      return response.data;
    } catch (error) {
      console.error('Error loading areas:', error.response ? error.response.data : error.message);
      throw error.response?.data || error.message;
    }
  },

  // Obtener subareas
  async getSubAreas(areaId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/areas/subareas/${areaId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching subareas:", error);
      throw error;
    }
  },
  
  // Obtener preguntas de cada área
  async getAreaQuestions(areaId) {
    try {
      const response = await axios.get(`<span class="math-inline">\{API\_URL\}/areas/questions/</span>{areaId}`); // <-- /api/areas/questions/:areaId (endpoint expuesto en back)
      return response.data;
    } catch (error) {
      console.error('Error loading area questions:', error.response ? error.response.data : error.message);
      throw error.response?.data || error.message;
    }
  }
}; 