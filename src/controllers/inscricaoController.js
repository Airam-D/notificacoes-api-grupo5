const InscricaoModel = require("../models/inscricaoModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, validar } = require("../helpers/validator");

// POST /inscricoes — criar uma inscrição
function store(req, res, next) {
    try {
        const { eventoId, participanteId } = req.body;
        const erros = validar([
            // eventoId é obrigatório
            isRequired(eventoId, "Evento ID"),

            // participanteId é obrigatório
            isRequired(participanteId, "Participante ID"),
        ]);
        if (erros) {
            throw new ValidationError(erros.join("; "));
        }
        const resultado = InscricaoModel.criar(
            parseInt(eventoId),
            parseInt(participanteId),
        );
        res.status(201).json(resultado);
    } catch (erro) {
        next(erro);
    }
}
// GET /inscricoes — listar todas
function index(req, res) {
    // Implemente: retorne todas as inscrições
    const inscricoes = InscricaoModel.listarTodas();
    res.json(inscricoes);
}
// GET /inscricoes/evento/:eventoId — listar inscrições de um evento
function listarPorEvento(req, res) {
    const eventoId = parseInt(req.params.eventoId);
    // Implemente: use InscricaoModel.listarPorEvento()
    const inscricoes = InscricaoModel.listarPorEvento(eventoId);
    res.json(inscricoes);
}
// PATCH /inscricoes/:id/cancelar — cancelar uma inscrição
function cancelar(req, res) {
    const id = parseInt(req.params.id);
    // Implemente: use InscricaoModel.cancelar()
    const inscricao = InscricaoModel.cancelar(id);

    // Se retornar null, responda 404
    if (!inscricao) throw new NotFoundError("Inscrição não encontrada");
    if (inscricao.erro) {
        if (inscricao.erro === "Inscrição já cancelada") {
            throw new ValidationError("Inscrição já cancelada");
        }
    }

    // Se retornar a inscrição, responda com ela
    res.json(inscricao);
}
module.exports = { store, index, listarPorEvento, cancelar };