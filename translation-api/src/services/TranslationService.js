const { v4: uuidv4 } = require('uuid');
const Translation = require('../models/Translation');
const rabbitmq = require('../config/rabbitmq');

class TranslationService {
  static async createTranslation(originalText, sourceLanguage, targetLanguage) {
    const id = uuidv4();
    
    const translation = await Translation.create({
      id,
      originalText,
      sourceLanguage,
      targetLanguage
    });

    await rabbitmq.publishMessage('translation-queue', {
      id,
      text: originalText,
      sourceLanguage,
      targetLanguage
    });

    return translation;
  }

  static async getTranslation(id) {
    const translation = await Translation.findById(id);
    if (!translation) {
      throw new Error('Translation not found');
    }
    return translation;
  }

  static async getAllTranslations() {
    return await Translation.findAll();
  }

  static async updateTranslationStatus(id, status) {
    const translation = await Translation.findById(id);
    if (!translation) {
      throw new Error('Translation not found');
    }

    return await Translation.update(id, { status });
  }

  static async updateTranslationResult(id, translatedText, error) {
    const translation = await Translation.findById(id);
    if (!translation) {
      throw new Error('Translation not found');
    }

    const updateData = error 
      ? { status: 'failed', error }
      : { status: 'completed', translatedText };

    return await Translation.update(id, updateData);
  }
}

module.exports = TranslationService; 