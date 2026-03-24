const ParticipanteModel = require("../models/ParticipanteModel");
function index(req, res) {
    const todos = ParticipanteModel.listarTodos();
    return res.json(todos);
};
function show(req, res) {
    const id = parseInt(req.params.id);
    // Busque o participante por ID
    const participante = ParticipanteModel.buscarPorId(id);

    // Se não encontrar, retorne 404 com mensagem de erro
    if (!participante) {
        return res.status(404).json({ erro: "Participante não encontrado" });
    }

    // Se encontrar, retorne o participante
    return res.json(participante);
}
function store(req, res) {
    const { nome, email } = req.body;
    // Valide: nome e email são obrigatórios
    if (!nome || !email) {
        return res.status(400).json({ erro: "Nome e email são obrigatórios" });
    }
    // Crie o participante e retorne com status 201
    const novoParticipante = ParticipanteModel.criar({ nome, email });
    return res.status(201).json(novoParticipante);
}
function update(req, res) {
    const id = parseInt(req.params.id);
    // Atualize o participante
    const participante = ParticipanteModel.atualizar(id, req.body);
    // Se não encontrar, retorne 404
    if (!participante) {
        return res.status(404).json({ erro: "Participante não encontrado" });
    }
    // Se encontrar, retorne o participante atualizado
    return res.json(participante);
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    // Delete o participante
    const deletado = ParticipanteModel.deletar(id);
    // Se não encontrar, retorne 404
    if (!deletado) {
        return res.status(404).json({ erro: "Participante não encontrado" });
    }
    // Se encontrar, retorne 204 (sem conteúdo)
    return res.status(204).json();
}
module.exports = { index, show, store, update, destroy };