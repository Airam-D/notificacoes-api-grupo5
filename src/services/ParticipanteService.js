const { Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');
const appEmitter = require('../events/eventEmitter');

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
        const novoParticipante = await Participante.create(dados);
        
        // Emitir evento para observers
        console.log('[DEBUG] Emitindo evento participante:criado');
        appEmitter.emit('participante:criado', novoParticipante);
        
        return novoParticipante;
    } catch (error) {
        // Re-lance o erro para ser tratado no controller
        throw error;
    }
}

async function atualizar(id, dados) {}
async function deletar(id) {}

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };