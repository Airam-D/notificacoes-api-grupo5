const appEmitter = require('./eventEmitter');
const { Notificacao, Participante, Evento, Inscricao } = require('../models');
const EmailService = require('../services/EmailService');
const confirmacaoInscricao = require('../templates/email/confirmacaoInscricao');
const cancelamentoInscricao = require('../templates/email/cancelamentoInscricao');

// Helper para buscar dados completos da inscrição
async function buscarDadosInscricao(inscricaoId) {
    return await Inscricao.findByPk(inscricaoId, {
        include: [
            { model: Evento, as: 'evento' },
            { model: Participante, as: 'participante' },
        ],
    });
}

// Helper para salvar notificação no banco
async function salvarNotificacao(dados) {
    return await Notificacao.create(dados);
}

// ── OBSERVER: Inscrição criada ──
appEmitter.on('inscricao:criada', async (inscricao) => {
    try {
        const dados = await buscarDadosInscricao(inscricao.id);
        if (!dados) return;

        const { evento, participante } = dados;
        const assunto = `Inscrição confirmada: ${evento.nome}`;
        const html = confirmacaoInscricao({
            participanteNome: participante.nome,
            eventoNome: evento.nome,
            eventoData: evento.data,
            eventoLocal: evento.local,
        });

        // Dentro do observer, ANTES de criar a notificação:

        const jaNotificado = await Notificacao.findOne({
            where: {
                inscricaoId: inscricao.id,
                tipo: 'confirmacao',
                destinatarioEmail: participante.email,
            }
        });

        if (jaNotificado) {
            console.log('[NOTIFICAÇÃO] Confirmação já enviada, ignorando duplicata');
            return;
        }

        const resultado = await EmailService.enviar(participante.email, assunto, html);

        console.log(`✅ [EMAIL-CONFIRMACAO] E-mail enviado para ${participante.email}`);
        console.log(`   MessageID: ${resultado.messageId}`);
        console.log(`   Painel MailPit: ${resultado.visualizarEm}`);

        // 📌 IMPORTANTE: Só salva notificação com enviada:true se o e-mail foi enviado com sucesso
        const notificacao = await salvarNotificacao({
            inscricaoId: inscricao.id,
            tipo: 'confirmacao',
            destinatarioEmail: participante.email,
            assunto,
            conteudo: html,
            dataEnvio: new Date(),
            enviada: true, // ✅ Email foi bem-sucedido
        });

        console.log(`✅ [NOTIFICAÇÃO-CONFIRMACAO] Registro criado com ID ${notificacao.id}`);

        // Emite evento secundário para logObserver capturar
        appEmitter.emit('notificacao:enviada', {
            inscricaoId: inscricao.id,
            tipo: 'confirmacao',
            email: participante.email,
            messageId: resultado.messageId,
        });
    } catch (erro) {
        console.error(`❌ [OBSERVER-ERRO] Falha ao processar inscricao:criada #${inscricao.id}:`);
        console.error(`   Tipo: ${erro.code || erro.name || 'UNKNOWN'}`);
        console.error(`   Mensagem: ${erro.message}`);
        console.error(`   Stack: ${erro.stack}`);

        // Emite evento de erro para logObserver capturar
        appEmitter.emit('notificacao:erro', {
            inscricaoId: inscricao.id,
            tipo: 'confirmacao',
            email: participante.email,
            erro: erro.message,
            codigo: erro.code || 'UNKNOWN',
        });
    }
});

// ── OBSERVER: Inscrição cancelada ──
appEmitter.on('inscricao:cancelada', async (inscricao) => {
    try {
        const dados = await buscarDadosInscricao(inscricao.id);
        if (!dados) return;

        const { evento, participante } = dados;
        const assunto = `Inscrição cancelada: ${evento.nome}`;
        const html = cancelamentoInscricao({
            participanteNome: participante.nome,
            eventoNome: evento.nome,
        });

        const resultado = await EmailService.enviar(participante.email, assunto, html);

        console.log(`✅ [EMAIL-CANCELAMENTO] E-mail enviado para ${participante.email}`);
        console.log(`   MessageID: ${resultado.messageId}`);
        console.log(`   Painel MailPit: ${resultado.visualizarEm}`);

        // 📌 IMPORTANTE: Só salva notificação com enviada:true se o e-mail foi enviado com sucesso
        const notificacao = await salvarNotificacao({
            inscricaoId: inscricao.id,
            tipo: 'cancelamento',
            destinatarioEmail: participante.email,
            assunto,
            conteudo: html,
            dataEnvio: new Date(),
            enviada: true, // ✅ Email foi bem-sucedido
        });

        console.log(`✅ [NOTIFICAÇÃO-CANCELAMENTO] Registro criado com ID ${notificacao.id}`);

        // Emite evento secundário para logObserver capturar
        appEmitter.emit('notificacao:enviada', {
            inscricaoId: inscricao.id,
            tipo: 'cancelamento',
            email: participante.email,
            messageId: resultado.messageId,
        });
    } catch (erro) {
        console.error(`❌ [OBSERVER-ERRO] Falha ao processar inscricao:cancelada #${inscricao.id}:`);
        console.error(`   Tipo: ${erro.code || erro.name || 'UNKNOWN'}`);
        console.error(`   Mensagem: ${erro.message}`);
        console.error(`   Stack: ${erro.stack}`);

        // Emite evento de erro para logObserver capturar
        appEmitter.emit('notificacao:erro', {
            inscricaoId: inscricao.id,
            tipo: 'cancelamento',
            email: participante.email,
            erro: erro.message,
            codigo: erro.code || 'UNKNOWN',
        });
    }
});