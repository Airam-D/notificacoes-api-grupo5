const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, minLength, isEmail, validar, isPositiveInteger } = require("../helpers/validator");

function index(req, res, next) {
    try {
        const todos = ParticipanteModel.listarTodos();
        return res.json(todos);
    } catch (err) {
        next(err); // Passa o erro para o middleware de tratamento
    }
};
function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        // Busque o participante por ID
        const participante = ParticipanteModel.buscarPorId(id);

        // Se não encontrar, retorne 404 com mensagem de erro
        if (!participante) {
            throw new NotFoundError("Participante não encontrado");
        }

        // Se encontrar, retorne o participante
        return res.json(participante);
    } catch (err) {
        next(err); // Passa o erro para o middleware de tratamento
    }
}
function store(req, res, next) {
    try {
        const { nome, email } = req.body;
        const erros = validar([
            // Nome é obrigatório e deve ter pelo menos 2 caracteres
            isRequired(nome, "Nome"),
            minLength(nome, 2, "Nome"),
            // Email é obrigatório e deve ser um e-mail válido
            isRequired(email, "Email"),
            isEmail(email, "Email"),

        ]);
        if (erros) {
            throw new ValidationError(erros.join("; "));
        }
        const novoParticipante = ParticipanteModel.criar({ nome, email });
        res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro);
    }
}
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const { nome, capacidade } = req.body

        const erros = validar([
            minLength(nome, 3, "Nome"),
            isPositiveInteger(capacidade, "Capacidade"),
        ]);

        // Atualizar o participante
        const participante = ParticipanteModel.atualizar(id, req.body);

        // Se não encontrar, retorne 404
        if (!participante) {
            throw new NotFoundError("Participante não encontrado");
        }
        // Se encontrar, retorne o participante atualizado
        return res.json(participante);
    } catch (err) {
        next(err);
    }
}

function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        // Delete o participante
        const deletado = ParticipanteModel.deletar(id);
        // Se não encontrar, retorne 404
        if (!deletado) {
            throw new NotFoundError("Participante não encontrado");
        }
        // Se encontrar, retorne 204 (sem conteúdo)
        return res.status(204).json();
    } catch (err) {
        next(err);
    }
}
module.exports = { index, show, store, update, destroy };