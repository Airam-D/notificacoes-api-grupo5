const InscricaoModel = require("../models/inscricaoModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

// POST /inscricoes — criar uma inscrição
function store(req, res) {
    const { eventoId, participanteId } = req.body;
    if (!evento) throw new NotFoundError("Evento");
    if (jaInscrito)
        throw new ValidationError("Participante já inscrito neste evento");
    const resultado = InscricaoModel.criar(
        parseInt(eventoId),
        parseInt(participanteId),
    );
    // Se o resultado tem a propriedade "erro", algo deu errado
    if (resultado.erro) {
        if (resultado.erro === "Evento não encontrado") {
            if (!evento) throw new NotFoundError("Evento");
        }
    }
    res.status(201).json(resultado);
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