const axios = require('axios');

class ApiService {
  constructor() {
    this.baseUrl = process.env.API_URL || 'http://translation-api:4040';
  }

  async updateTranslationStatus(id, status) {
    try {
      const response = await axios.put(`${this.baseUrl}/translations/${id}/status`, {
        status
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar status:', error.message);
      throw error;
    }
  }

  async updateTranslationResult(id, translatedText, error = null) {
    try {
      const payload = error 
        ? { error }
        : { translatedText };

      const response = await axios.put(`${this.baseUrl}/translations/${id}/result`, payload);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar resultado:', error.message);
      throw error;
    }
  }
}

module.exports = new ApiService(); 