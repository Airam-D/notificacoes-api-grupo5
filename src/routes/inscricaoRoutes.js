const express = require("express");
const router = express.Router();
const InscricaoController = require("../controllers/inscricaoController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Inscricao:
 *       type: object
 *       required:
 *       - eventoId
 *       - participanteId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         eventoId:
 *           type: integer
 *           description: ID do evento
 *         participanteId:
 *           type: integer
 *           description: ID do participante
 *         dataInscricao:
 *           type: string
 *           description: Data da inscrição
 *         status:
 *           type: string
 *           enum: [confirmada, cancelada]
 *           description: Status da inscrição
 *       example:
 *         id: 1
 *         eventoId: 1
 *         participanteId: 1
 *         dataInscricao: "2025-08-01T10:30:00.000Z"
 *         status: confirmada
 */

/**
 * @swagger
 * /inscricoes:
 *   post:
 *     summary: Criar uma nova inscrição
 *     tags: [Inscrições]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             - eventoId
 *             - participanteId
 *             properties:
 *               eventoId:
 *                 type: integer
 *               participanteId:
 *                 type: integer
 *             example:
 *               eventoId: 1
 *               participanteId: 2
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", InscricaoController.store);

/**
 * @swagger
 * /inscricoes:
 *   get:
 *     summary: Listar todas as inscrições
 *     tags: [Inscrições]
 *     responses:
 *       200:
 *         description: Lista de inscrições
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inscricao'
 */
router.get("/", InscricaoController.index);

/**
 * @swagger
 * /inscricoes/evento/{eventoId}:
 *   get:
 *     summary: Listar inscrições por evento
 *     tags: [Inscrições]
 *     parameters:
 *     - in: path
 *       name: eventoId
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID do evento
 *     responses:
 *       200:
 *         description: Lista de inscrições do evento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inscricao'
 *       404:
 *         description: Evento não encontrado
 */
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);

/**
 * @swagger
 * /inscricoes/{id}/cancelar:
 *   patch:
 *     summary: Cancelar uma inscrição
 *     tags: [Inscrições]
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID da inscrição
 *     responses:
 *       200:
 *         description: Inscrição cancelada
 *       404:
 *         description: Inscrição não encontrada
 */
router.patch("/:id/cancelar", InscricaoController.cancelar);

module.exports = router;