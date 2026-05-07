const InscricaoService = require('../services/InscricaoService');
const cache = require('../config/cache');

async function store(req, res, next) {
    try {
        const novaInscricao = await InscricaoService.criar(req.body);
        cache.flushAll();
        return res.status(201).json(novaInscricao);
    } catch (erro) {
        return next(erro);
    }
}

async function index(req, res, next) {
    try {
        const inscricoes = await InscricaoService.listarTodas();
        cache.flushAll();

        return res.json(inscricoes);
    } catch (erro) {
        return next(erro);
    }
}

async function listarPorEvento(req, res, next) {
    try {
        const { eventoId } = req.params;

        const inscricoes = await InscricaoService.listarPorEvento(eventoId);

        return res.json(inscricoes);
    } catch (erro) {
        return next(erro);
    }
}

async function cancelar(req, res, next) {
    try {
        const { id } = req.params;

        const inscricaoCancelada = await InscricaoService.cancelar(id);
        cache.flushAll();

        return res.json(inscricaoCancelada);
    } catch (erro) {
        return next(erro);
    }
}

module.exports = {
    store,
    index,
    listarPorEvento,
    cancelar
};