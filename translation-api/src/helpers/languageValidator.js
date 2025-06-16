/**
 * Linguagens suportadas pelo sistema
 */
const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'];

/**
 * Valida se uma linguagem é suportada
 * @param {string} language - Código da linguagem
 * @returns {boolean} - True se suportada, false caso contrário
 */
function isLanguageSupported(language) {
  return SUPPORTED_LANGUAGES.includes(language.toLowerCase());
}

/**
 * Valida as linguagens de origem e destino
 * @param {string} sourceLanguage - Linguagem de origem
 * @param {string} targetLanguage - Linguagem de destino
 * @returns {object} - Objeto com isValid e error
 */
function validateLanguages(sourceLanguage, targetLanguage) {
  const errors = [];

  if (!isLanguageSupported(sourceLanguage)) {
    errors.push(`sourceLanguage '${sourceLanguage}' não é suportada`);
  }

  if (!isLanguageSupported(targetLanguage)) {
    errors.push(`targetLanguage '${targetLanguage}' não é suportada`);
  }

  if (sourceLanguage === targetLanguage) {
    errors.push('sourceLanguage e targetLanguage não podem ser iguais');
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    supportedLanguages: SUPPORTED_LANGUAGES
  };
}

/**
 * Obtém a lista de linguagens suportadas
 * @returns {Array} - Array com as linguagens suportadas
 */
function getSupportedLanguages() {
  return [...SUPPORTED_LANGUAGES];
}

module.exports = {
  isLanguageSupported,
  validateLanguages,
  getSupportedLanguages,
  SUPPORTED_LANGUAGES
}; 