const appEmitter = require('./eventEmitter');
const { Notificacao, Participante, Evento, Inscricao } = require('../models');
const EmailService = require('../services/EmailService');

appEmitter.on('inscricao:criada', async (inscricao) => {
    try {
        console.log(`[OBSERVER] Nova inscrição detectada: #${inscricao.id}`);

        const inscricaoCompleta = await Inscricao.findByPk(inscricao.id, {
            include: [
                { model: Evento, as: 'evento' },
                { model: Participante, as: 'participante' },
            ],
        });

        if (!inscricaoCompleta) return;

        const { evento, participante } = inscricaoCompleta;

        // Montar o HTML do e-mail
        const html = `
      <h2>Inscrição Confirmada! ✅</h2>
      <p>Olá <strong>${participante.nome}</strong>,</p>
      <p>Sua inscrição no evento <strong>"${evento.nome}"</strong> foi confirmada com sucesso.</p>
      <p><strong>Detalhes do evento:</strong></p>
      <ul>
        <li><strong>Data:</strong> ${new Date(evento.data).toLocaleDateString('pt-BR')}</li>
        <li><strong>Local:</strong> ${evento.local || 'A definir'}</li>
      </ul>
      <p>Até lá! 🎉</p>
      <hr>
      <small>Este é um e-mail automático da Plataforma de Eventos.</small>
    `;

        // Enviar o e-mail via MailPit
        await EmailService.enviar(
            participante.email,
            `Inscrição confirmada: ${evento.nome}`,
            html
        );

        // Salvar a notificação no banco com status "enviada"
        await Notificacao.create({
            inscricao_id: inscricao.id,
            tipo: 'confirmacao',
            destinatario_email: participante.email,
            assunto: `Inscrição confirmada: ${evento.nome}`,
            conteudo: html,
            data_envio: new Date(),
            enviada: true,
        });

        console.log(`[NOTIFICAÇÃO] Confirmação enviada para ${participante.email}`);
    } catch (erro) {
        console.error('[NOTIFICAÇÃO] Erro ao enviar:', erro.message);
    }
});