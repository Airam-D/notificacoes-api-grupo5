const { Evento } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');

async function listarTodos() {
    const eventos = await Evento.findAll({
        order: [['data', 'ASC']],
    });
    return eventos;
}

async function buscarPorId(id) {
    const evento = await Evento.findByPk(id);

    if (!evento) {
        throw new NotFoundError('Evento');
    }

    return evento;
}

async function criar(dados) {
    try {
        const novoEvento = await Evento.create(dados);
        return novoEvento;
    } catch (erro) {
        // O Sequelize lança SequelizeValidationError para validações do Model
        if (erro.name === 'SequelizeValidationError') {
            const mensagens = erro.errors.map(e => e.message).join('; ');
            throw new ValidationError(mensagens);
        }
        throw erro;
    }
}

// Atualizar e Deletar vamos implementar na próxima aula
async function atualizar(id, dados) {
    // TODO: próxima aula
}

async function deletar(id) {
    // TODO: próxima aula
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};