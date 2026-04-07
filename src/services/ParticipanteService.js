const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const {
    isRequired,
    isEmail,
    minLength,
    validar,
} = require("../helpers/validator");
function listarTodos() {
    // Implemente
    return ParticipanteModel.listarTodos();
}
function buscarPorId(id) {
    // Busque no Model, lance NotFoundError se não encontrar
    const participante = ParticipanteModel.buscarPorId(id);
    if (!participante) {
        throw new NotFoundError("Particpante");
    }
    return participante
}
function criar(dados) {
    const { nome, email } = dados;
    const erros = validar([
        // Que validações fazem sentido para Participante?
        isRequired(nome, "Nome"),
        minLength(nome, 2, "Nome"),
        isRequired(email, "Email"),
        isEmail(email, "Email"),

    ]);
    if (erros) throw new ValidationError(erros.join("; "));
    return ParticipanteModel.criar({ nome, email });
}
function atualizar(id, dados) {
    const { nome, email } = dados;

    // Valida apenas se os dados vierem
    let validacoes = [];
    if (nome) validacoes.push(minLength(nome, 2, "Nome"));
    if (email) validacoes.push(isEmail(email, "Email"));

    const erros = validar(validacoes);
    if (erros) {
        throw new ValidationError(erros.join("; "));
    }

    // Atualiza usando "dados" (Service não usa req.body!)
    const participanteAtualizado = ParticipanteModel.atualizar(id, dados);

    if (!participanteAtualizado) {
        throw new NotFoundError("Participante não encontrado");
    }

    return participanteAtualizado;
}
function deletar(id) {
    // Delete o participante
    const deletado = ParticipanteModel.deletar(id);

    // Se não encontrar, retorne 404
    if (!deletado) {
        throw new NotFoundError("Participante não encontrado");
    }
    
    // Service não usa "res.status". Apenas finalize a função.
}
module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };