const express = require('express');
const router = express.Router();
const EmailService = require('../services/EmailService');
const { Notificacao, Inscricao, Evento, Participante } = require('../models');

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

module.exports = router;