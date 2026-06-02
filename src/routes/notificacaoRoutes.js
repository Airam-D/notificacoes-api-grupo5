const express = require('express');
const router = express.Router();
const EmailService = require('../services/EmailService');
const { Notificacao, Inscricao, Evento, Participante, sequelize } = require('../models');

/**
 * @swagger
 * /notificacoes:
 *   get:
 *     summary: Listar todos as notificações
 *     tags: [Notificações]
 *     responses:
 *       200:
 *         description: Lista de notificações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificacao'
 */

router.get('/', async (req, res, next) => {
    try {
        const notificacoes = await Notificacao.findAll({
            include: [{
                model: Inscricao,
                as: 'inscricao',
                include: [
                    { model: Evento, as: 'evento', attributes: ['nome'] },
                    { model: Participante, as: 'participante', attributes: ['nome', 'email'] },
                ],
            }],
            order: [['createdAt', 'DESC']],
        });
        res.json(notificacoes);
    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * /notificacoes/estatisticas:
 *   get:
 *     summary: Estatísticas de envio de notificações
 *     tags: [Notificações]
 *     responses:
 *       200:
 *         description: Estatísticas de notificações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 enviadas:
 *                   type: integer
 *                 naoEnviadas:
 *                   type: integer
 *                 porTipo:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 */

// GET /notificacoes/estatisticas — dashboard de envios
router.get('/estatisticas', async (req, res, next) => {
    try {
        const total = await Notificacao.count();
        const enviadas = await Notificacao.count({ where: { enviada: true } });
        const naoEnviadas = total - enviadas;

        const porTipoRaw = await Notificacao.findAll({
            attributes: ['tipo', [sequelize.fn('COUNT', sequelize.col('id')), 'quantidade']],
            group: ['tipo'],
        });
        const porTipo = {};
        porTipoRaw.forEach(row => {
            porTipo[row.tipo] = parseInt(row.get('quantidade'), 10);
        });
        res.json({ total, enviadas, naoEnviadas, porTipo });
    } catch (erro) {
        next(erro);
    }
});

// GET /notificacoes/:id — detalhes de uma notificação
/**
 * @swagger
 * /notificacoes/{id}:
 *   get:
 *     summary: Buscar notificação por ID
 *     tags: [Notificações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da notificação
 *     responses:
 *       200:
 *         description: Notificação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notificacao'
 *       404:
 *         description: Notificação não encontrada
 */
router.get('/:id', async (req, res, next) => {
    try {
        const notificacao = await Notificacao.findByPk(parseInt(req.params.id), {
            include: [{
                model: Inscricao,
                as: 'inscricao',
                include: [
                    { model: Evento, as: 'evento', attributes: ['nome'] },
                    { model: Participante, as: 'participante', attributes: ['nome', 'email'] },
                ],
            }],
        });
        if (!notificacao) {
            return res.status(404).json({ erro: 'Notificação não encontrada' });
        }
        res.json(notificacao);
    } catch (erro) {
        next(erro);
    }
});

// POST /notificacoes/:id/reenviar — reenviar uma notificação
/**
 * @swagger
 * /notificacoes/{id}/reenviar:
 *   post:
 *     summary: Reenviar uma notificação existente
 *     tags: [Notificações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da notificação
 *     responses:
 *       200:
 *         description: Notificação reenviada com sucesso
 *       404:
 *         description: Notificação não encontrada
 */
router.post('/:id/reenviar', async (req, res, next) => {
    try {
        const notificacao = await Notificacao.findByPk(parseInt(req.params.id));
        if (!notificacao) {
            return res.status(404).json({ erro: 'Notificação não encontrada' });
        }
        const resultado = await EmailService.enviar(
            notificacao.destinatarioEmail,
            notificacao.assunto,
            notificacao.conteudo,
        );
        notificacao.dataEnvio = new Date();
        notificacao.enviada = true;
        await notificacao.save();
        res.json({ mensagem: 'Notificação reenviada com sucesso', previewUrl: resultado.previewUrl });
    } catch (erro) {
        next(erro);
    }
});

// POST /notificacoes/teste-email — enviar e-mail de teste
/**
 * @swagger
 * /notificacoes/teste-email:
 *   post:
 *     summary: Enviar e-mail de teste pela API
 *     tags: [Notificações]
 *     responses:
 *       200:
 *         description: E-mail de teste enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 previewUrl:
 *                   type: string
 */
router.post('/teste-email', async (req, res, next) => {
    try {
        const resultado = await EmailService.enviar(
            'teste@exemplo.com',
            'Teste da API de Notificações',
            '<h1>Funcionou! 🎉</h1><p>Este e-mail foi enviado pela nossa API do Grupo 5.</p>'
        );

        res.json({
            mensagem: 'E-mail de teste enviado!',
            previewUrl: resultado.previewUrl,
        });
    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Notificacao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         tipo:
 *           type: string
 *           enum: [confirmacao, lembrete, cancelamento, boas_vindas]
 *         destinatarioEmail:
 *           type: string
 *         assunto:
 *           type: string
 *         conteudo:
 *           type: string
 *         enviada:
 *           type: boolean
 *         dataEnvio:
 *           type: string
 *           format: date-time
 *         inscricaoId:
 *           type: integer
 */


module.exports = router;