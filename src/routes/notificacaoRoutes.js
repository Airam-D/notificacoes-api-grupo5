const express = require('express');
const router = express.Router();
const EmailService = require('../services/EmailService');
const { Notificacao, Inscricao, Evento, Participante, sequelize } = require('../models');

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

// GET /notificacoes/estatisticas — dashboard de contagens
router.get('/estatisticas', async (req, res, next) => {
    try {
        const { Notificacao, sequelize } = require('../models');

        const total = await Notificacao.count();
        const enviadas = await Notificacao.count({ where: { enviada: true } });
        const naoEnviadas = total - enviadas;

        // Contagem por tipo
        const porTipoRaw = await Notificacao.findAll({
            attributes: ['tipo', [sequelize.fn('COUNT', sequelize.col('id')), 'quantidade']],
            group: ['tipo'],
        });

        const porTipo = {};
        porTipoRaw.forEach(r => {
            porTipo[r.tipo] = parseInt(r.get('quantidade'), 10);
        });

        res.json({ total, enviadas, naoEnviadas, porTipo });
    } catch (erro) {
        next(erro);
    }
});

// POST /notificacoes/teste-email — enviar e-mail de teste
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
 *           enum: [confirmacao, lembrete]
 *         destinatario_email:
 *           type: string
 *         assunto:
 *           type: string
 *         enviada:
 *           type: boolean
 *         data_envio:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /notificacoes:
 *   get:
 *     summary: Listar notificações
 *     tags: [Notificações]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [confirmacao, lembrete]
 *       - in: query
 *         name: enviada
 *         schema:
 *           type: string
 *           enum: [true, false]
 *     responses:
 *       200:
 *         description: Lista de notificações
 */

/**
 * @swagger
 * /notificacoes/estatisticas:
 *   get:
 *     summary: Estatísticas de envio
 *     tags: [Notificações]
 *     responses:
 *       200:
 *         description: Contagens de notificações
 */

/**
 * @swagger
 * /notificacoes/{id}/reenviar:
 *   post:
 *     summary: Reenviar uma notificação
 *     tags: [Notificações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notificação reenviada
 *       404:
 *         description: Notificação não encontrada
 */

module.exports = router;