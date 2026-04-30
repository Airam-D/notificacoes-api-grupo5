const { Participante } = require('../models');
const { NotFoundError } = require('../errors/AppError');

async function listarTodos() {
    // Use Participante.findAll() com ordenação por nome
    return await Participante.findAll({ order: [['nome', 'ASC']] });
}

async function buscarPorId(id) {
    // Use Participante.findByPk(id)
    // Se não encontrar, lance NotFoundError
    const participante = await Participante.findByPk(id);

    if (!participante) {
        throw new NotFoundError("Participante não encontrado");
    }

    return participante;
}

async function criar(dados) {
    // Use Participante.create(dados) com try/catch para erros do Sequelize
    try {
        return await Participante.create(dados);
    } catch (error) {
        // Re-lance o erro para ser tratado no controller
        throw error;
    }
}

// Atualizar e deletar ficam para a próxima aula
async function atualizar(id, dados) { /* TODO */ }
async function deletar(id) { /* TODO */ }

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };