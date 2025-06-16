const express = require('express');
const TranslationController = require('../controllers/TranslationController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Translation:
 *       type: object
 *       required:
 *         - originalText
 *         - sourceLanguage
 *         - targetLanguage
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da tradução
 *         originalText:
 *           type: string
 *           description: Texto original a ser traduzido
 *         translatedText:
 *           type: string
 *           description: Texto traduzido
 *         sourceLanguage:
 *           type: string
 *           description: Idioma de origem
 *         targetLanguage:
 *           type: string
 *           description: Idioma de destino
 *         status:
 *           type: string
 *           enum: [queued, processing, completed, failed]
 *           description: Status da tradução
 *         error:
 *           type: string
 *           description: Mensagem de erro se houver
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /translations/health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Serviço funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */
router.get('/health', TranslationController.health);

/**
 * @swagger
 * /translations:
 *   post:
 *     summary: Criar nova tradução
 *     tags: [Translations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalText
 *               - sourceLanguage
 *               - targetLanguage
 *             properties:
 *               originalText:
 *                 type: string
 *                 example: "Hello, how are you?"
 *               sourceLanguage:
 *                 type: string
 *                 example: "en"
 *               targetLanguage:
 *                 type: string
 *                 example: "pt"
 *     responses:
 *       201:
 *         description: Tradução criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 */
router.post('/', TranslationController.create);

/**
 * @swagger
 * /translations:
 *   get:
 *     summary: Listar todas as traduções
 *     tags: [Translations]
 *     responses:
 *       200:
 *         description: Lista de traduções
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Translation'
 */
router.get('/', TranslationController.getAll);

/**
 * @swagger
 * /translations/{id}/status:
 *   put:
 *     summary: Atualizar status da tradução
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tradução
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [queued, processing, completed, failed]
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       404:
 *         description: Tradução não encontrada
 */
router.put('/:id/status', TranslationController.updateStatus);

/**
 * @swagger
 * /translations/{id}/result:
 *   put:
 *     summary: Atualizar resultado da tradução
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tradução
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               translatedText:
 *                 type: string
 *               error:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resultado atualizado com sucesso
 *       404:
 *         description: Tradução não encontrada
 */
router.put('/:id/result', TranslationController.updateResult);

/**
 * @swagger
 * /translations/{id}:
 *   get:
 *     summary: Obter tradução por ID
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tradução
 *     responses:
 *       200:
 *         description: Tradução encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Translation'
 *       404:
 *         description: Tradução não encontrada
 */
router.get('/:id', TranslationController.getById);

module.exports = router; 