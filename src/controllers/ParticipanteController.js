const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

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
            throw  new NotFoundError("Participante não encontrado");
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
        // Valide: nome e email são obrigatórios
        if (!nome || !email) {
            throw new ValidationError("Nome e email são obrigatórios");
        }
        // Crie o participante e retorne com status 201
        const novoParticipante = ParticipanteModel.criar({ nome, email });
        return res.status(201).json(novoParticipante);
    } catch (err) {
        next(err);
    }
}
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        // Atualize o participante
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