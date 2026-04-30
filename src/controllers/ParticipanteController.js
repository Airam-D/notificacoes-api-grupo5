const ParticipanteService = require("../services/ParticipanteService");
const parseId = require("../helpers/parseId");

async function index(req, res, next) {
    try {
        const todos = await ParticipanteService.listarTodos();
        return res.json(todos);
    } catch (err) {
        next(err);
    }
}

async function show(req, res, next) {
    try {
        const id = parseId(req.params.id);

        // Busca o participante por ID
        const participante = await ParticipanteService.buscarPorId(id);

        // Retorna o participante encontrado
        return res.json(participante);
    } catch (err) {
        next(err);
    }
}

async function store(req, res, next) {
    try {
        const novoParticipante = await ParticipanteService.criar(req.body);

        return res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro);
    }
}

async function update(req, res, next) {
    try {
        const id = parseId(req.params.id);

        const participanteAtualizado = await ParticipanteService.atualizar(id, req.body);

        return res.json(participanteAtualizado);
    } catch (erro) {
        next(erro);
    }
}

async function destroy(req, res, next) {
    try {
        const id = parseId(req.params.id);

        await ParticipanteService.deletar(id);

        return res.status(204).send();
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
};