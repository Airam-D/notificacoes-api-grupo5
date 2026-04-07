const InscricaoService = require("../services/InscricaoService");
const parseId = require("../helpers/parseId");

// POST /inscricoes — criar uma inscrição
function store(req, res, next) {
    try {
        const resultado = InscricaoService.criar(req.body);
        res.status(201).json(resultado);
    } catch (erro) {
        next(erro);
    }
}
// GET /inscricoes — listar todas
function index(req, res) {
    // Implemente: retorne todas as inscrições
    const inscricoes = InscricaoService.listarTodas();
    res.json(inscricoes);
}
// GET /inscricoes/evento/:eventoId — listar inscrições de um evento
function listarPorEvento(req, res) {
    const eventoId = parseId(req.params.eventoId);
    // Implemente: use InscricaoService.listarPorEvento()
    const inscricoes = InscricaoService.listarPorEvento(eventoId);
    res.json(inscricoes);
}
// PATCH /inscricoes/:id/cancelar — cancelar uma inscrição
function cancelar(req, res) {
    const id = parseId(req.params.id);
    // Implemente: use InscricaoService.cancelar()
    const inscricao = InscricaoService.cancelar(id);

    // Se retornar a inscrição, responda com ela
    res.json(inscricao);
}
module.exports = { store, index, listarPorEvento, cancelar };