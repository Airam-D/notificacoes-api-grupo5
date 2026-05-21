const baseTemplate = require('./baseTemplate');

function lembreteEvento(dados) {
    const { participanteNome, eventoNome, eventoData, eventoLocal } = dados;

    // Calcular quantos dias faltam
    const hoje = new Date();
    const dataEvento = new Date(eventoData);
    const diffMs = dataEvento - hoje;
    const diasFaltando = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const conteudo = `
    <h2>Lembrete: Evento se aproxima! ⏰</h2>
    <p>Olá <strong>${participanteNome}</strong>,</p>
    <p>Faltam apenas <strong>${diasFaltando}</strong> dias para o evento <strong>${eventoNome}</strong>!</p>
    <p>O evento acontecerá no dia <strong>${eventoData}</strong> no local: <strong>${eventoLocal}</strong>.</p>
    <p>Prepare-se e não se atrase!</p>
  `;

    return baseTemplate(conteudo);
}

module.exports = lembreteEvento;