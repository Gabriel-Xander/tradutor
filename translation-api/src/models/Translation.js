const prisma = require('../config/database');

class Translation {
  static async create(data) {
    return await prisma.translation.create({
      data: {
        id: data.id,
        originalText: data.originalText,
        sourceLanguage: data.sourceLanguage,
        targetLanguage: data.targetLanguage,
        status: 'queued'
      }
    });
  }

  static async findById(id) {
    return await prisma.translation.findUnique({
      where: { id }
    });
  }

  static async update(id, data) {
    return await prisma.translation.update({
      where: { id },
      data
    });
  }

  static async findAll() {
    return await prisma.translation.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
}

module.exports = Translation; 