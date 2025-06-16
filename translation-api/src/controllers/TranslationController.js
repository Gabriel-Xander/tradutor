const TranslationService = require('../services/TranslationService');
const { validateLanguages } = require('../helpers/languageValidator');

class TranslationController {
  static async create(req, res, next) {
    try {
      const { originalText, sourceLanguage, targetLanguage } = req.body;

      if (!originalText || !sourceLanguage || !targetLanguage) {
        return res.status(400).json({
          error: 'Missing required fields: originalText, sourceLanguage, targetLanguage'
        });
      }

      const languageValidation = validateLanguages(sourceLanguage, targetLanguage);
      if (!languageValidation.isValid) {
        return res.status(400).json({
          error: 'Linguagens não suportadas',
          details: languageValidation.errors,
          supportedLanguages: languageValidation.supportedLanguages,
          message: `Apenas suportamos as linguagens: ${languageValidation.supportedLanguages.join(', ')}`
        });
      }

      const translation = await TranslationService.createTranslation(
        originalText,
        sourceLanguage,
        targetLanguage
      );

      res.status(201).json({
        id: translation.id,
        status: translation.status,
        message: 'Translation request created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const translation = await TranslationService.getTranslation(id);

      res.json({
        id: translation.id,
        originalText: translation.originalText,
        translatedText: translation.translatedText,
        sourceLanguage: translation.sourceLanguage,
        targetLanguage: translation.targetLanguage,
        status: translation.status,
        error: translation.error,
        createdAt: translation.createdAt,
        updatedAt: translation.updatedAt
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const translations = await TranslationService.getAllTranslations();
      res.json(translations);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          error: 'Status is required'
        });
      }

      const translation = await TranslationService.updateTranslationStatus(id, status);

      res.json({
        id: translation.id,
        status: translation.status,
        message: 'Status updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateResult(req, res, next) {
    try {
      const { id } = req.params;
      const { translatedText, error } = req.body;

      const translation = await TranslationService.updateTranslationResult(id, translatedText, error);

      res.json({
        id: translation.id,
        status: translation.status,
        message: 'Translation result updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async health(req, res) {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  }
}

module.exports = TranslationController; 