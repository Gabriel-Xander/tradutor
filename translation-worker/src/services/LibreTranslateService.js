const axios = require('axios');

class LibreTranslateService {
  constructor() {
    this.baseUrl = process.env.LIBRETRANSLATE_URL || 'http://libretranslate:5000';
    this.maxRetries = parseInt(process.env.MAX_RETRIES || '3');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async translate(text, sourceLanguage, targetLanguage, retryCount = 0) {
    try {
      const response = await axios.post(`${this.baseUrl}/translate`, {
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text'
      }, {
        timeout: 30000
      });
      
      return response.data;
    } catch (error) {
      if (retryCount < this.maxRetries && (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT')) {
        console.log(`Tentativa ${retryCount + 1}/${this.maxRetries + 1} falhou. Tentando novamente em 5 segundos...`);
        await this.sleep(5000);
        return this.translate(text, sourceLanguage, targetLanguage, retryCount + 1);
      }
      throw error;
    }
  }
}

module.exports = new LibreTranslateService(); 