const LibreTranslateService = require('./LibreTranslateService');
const ApiService = require('./ApiService');

class TranslationService {
  static async processTranslation(data) {
    try {
      console.log(`Processando tradução para ID: ${data.id}`);
      
      await ApiService.updateTranslationStatus(data.id, 'processing');

      console.log('Aguardando 10 segundos antes de iniciar a tradução...');
      await new Promise(resolve => setTimeout(resolve, 10000));

      const translationResult = await LibreTranslateService.translate(
        data.text,
        data.sourceLanguage,
        data.targetLanguage
      );
      
      console.log('Resposta do LibreTranslate:', translationResult);

      await ApiService.updateTranslationResult(data.id, translationResult.translatedText);

      console.log(`Tradução concluída para ID: ${data.id}`);

    } catch (error) {
      console.error('Erro na tradução:', error);
      await ApiService.updateTranslationResult(data.id, null, error.message || 'Erro desconhecido');
    }
  }
}

module.exports = TranslationService; 