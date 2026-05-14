const appEmitter = require('./eventEmitter');
const { Notificacao, Participante, Evento, Inscricao } = require('../models');

console.log('[OBSERVER] Observer de notificações registrado');

// Observer: escuta o evento 'inscricao:criada'
appEmitter.on('inscricao:criada', async (inscricao) => {
    try {
        console.log(`[OBSERVER] Nova inscrição detectada: #${inscricao.id}`);
        console.log('[OBSERVER] Buscando dados completos da inscrição...');

        // Buscar dados completos para montar a notificação
        const inscricaoCompleta = await Inscricao.findByPk(inscricao.id, {
            include: [
                { model: Evento, as: 'evento' },
                { model: Participante, as: 'participante' },
            ],
        });

        if (!inscricaoCompleta) {
            console.error('[OBSERVER] Inscrição não encontrada no banco');
            return;
        }

        console.log('[OBSERVER] Inscrição carregada com sucesso');

        const { evento, participante } = inscricaoCompleta;

        console.log('[OBSERVER] Criando notificação no banco...');

        // Criar a notificação no banco
        const notificacao = await Notificacao.create({
            inscricaoId: inscricao.id,
            tipo: 'confirmacao',
            destinatarioEmail: participante.email,
            assunto: `Inscrição confirmada: ${evento.nome}`,
            conteudo: `Olá ${participante.nome}! Sua inscrição no evento "${evento.nome}" foi confirmada.`,
            enviada: false,
        });

        console.log(`[OBSERVER] Notificação #${notificacao.id} criada para ${participante.email}`);
        
        // Emitir evento para o logObserver registrar
        appEmitter.emit('notificacao:criada', notificacao);
    } catch (erro) {
        // O observer não deve derrubar a aplicação se falhar
        console.error('[OBSERVER] Erro ao criar notificação:', erro.message);
        console.error('[OBSERVER] Stack:', erro.stack);
    }
});

// Observer: escuta 'inscricao:cancelada'
appEmitter.on('inscricao:cancelada', async (inscricao) => {
    try {
        console.log(`[OBSERVER] Inscrição #${inscricao.id} cancelada`);
        // Aqui poderíamos enviar um e-mail de cancelamento
        // Por enquanto, apenas logamos
    } catch (erro) {
        console.error('[OBSERVER] Erro:', erro.message);
    }
});