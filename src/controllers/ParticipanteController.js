const ParticipanteService = require("../services/ParticipanteService");
const parseId = require("../helpers/parseId");

function index(req, res, next) {
    try {
        const todos = ParticipanteService.listarTodos();
        return res.json(todos);
    } catch (err) {
        next(err); // Passa o erro para o middleware de tratamento
    }
};
function show(req, res, next) {
    try {
        const id = parseId(req.params.id);
        // Busque o participante por ID
        const participante = ParticipanteService.buscarPorId(id);
        // Se encontrar, retorne o participante
        return res.json(participante);
    } catch (err) {
        next(err); // Passa o erro para o middleware de tratamento
    }
}
function store(req, res, next) {
    try {
        const novoParticipante = ParticipanteService.criar(req.body);
        res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro);
    }
}
function update(req, res, next) {
    try {
        const id = parseId(req.params.id);
        const participanteAtualizado = ParticipanteService.atualizar(id, req.body);
        res.json(participanteAtualizado);
    } catch (erro) {
        next(erro);
    }
}

function destroy(req, res, next) {
    try {
        const id = parseId(req.params.id);
        ParticipanteService.deletar(id);
        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}