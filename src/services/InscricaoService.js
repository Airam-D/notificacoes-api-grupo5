// src/services/InscricaoService.js
const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, validar } = require("../helpers/validator");
function criar(dados) {
    const { eventoId, participanteId } = dados;
    // Validar campos obrigatórios
    const erros = validar([
        isRequired(eventoId, "eventoId"),
        isRequired(participanteId, "participanteId"),
    ]);
    if (erros) throw new ValidationError(erros.join("; "));
    // Verificar se evento existe
    const evento = EventoModel.buscarPorId(parseInt(eventoId));
    if (!evento) throw new NotFoundError("Evento");
    // Verificar se participante existe
    const participante = ParticipanteModel.buscarPorId(parseInt(participanteId));
    if (!participante) throw new NotFoundError("Participante");
    // Criar inscrição (o Model pode lançar erro de duplicata)
    return InscricaoModel.criar(parseInt(eventoId), parseInt(participanteId));
}
function listarTodas() {
    // Implemente
    return InscricaoModel.listarTodas();
}
function listarPorEvento(eventoId) {
    // Implemente
    return InscricaoModel.listarPorEvento(eventoId);
}
function cancelar(id) {
    // Cancele, lance NotFoundError se não encontrar
    const inscricao = InscricaoModel.cancelar(id);
    if (!inscricao) {
        throw new NotFoundError("Inscrição não encontrada");
    }
    inscricao.status = "cancelado";
    return inscricao;
}
module.exports = { criar, listarTodas, listarPorEvento, cancelar };