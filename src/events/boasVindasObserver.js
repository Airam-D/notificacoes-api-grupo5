const appEmitter = require('./eventEmitter');
const EmailService = require('../services/EmailService');

console.log('[OBSERVER] Observer de e-mail de boas-vindas registrado');

// Observer: envia e-mail de boas-vindas quando participante é criado
appEmitter.on('participante:criado', async (participante) => {
    try {
        console.log(`[BOAS-VINDAS] Enviando e-mail para novo participante: ${participante.nome}`);

        // Montar o corpo do e-mail
        const assunto = 'Bem-vindo à Plataforma de Eventos!';
        const conteudo = `
            <h1>Bem-vindo, ${participante.nome}! 🎉</h1>
            <p>Sua conta foi criada com sucesso na Plataforma de Eventos.</p>
            <p><strong>E-mail:</strong> ${participante.email}</p>
            <p>Agora você pode:</p>
            <ul>
                <li>✓ Se inscrever em eventos</li>
                <li>✓ Receber notificações de confirmação</li>
                <li>✓ Participar de workshops e palestras</li>
            </ul>
            <p>Qualquer dúvida, entre em contato conosco!</p>
            <p>Divirta-se! 🚀</p>
        `;

        // Enviar e-mail
        const resultado = await EmailService.enviar(
            participante.email,
            assunto,
            conteudo
        );

        console.log(`[BOAS-VINDAS] E-mail enviado para ${participante.email}`);
        console.log(`[BOAS-VINDAS] Preview: ${resultado.previewUrl}`);

        // Emitir evento de sucesso para log
        appEmitter.emit('email:boas-vindas-enviado', {
            participanteId: participante.id,
            email: participante.email,
            previewUrl: resultado.previewUrl
        });

    } catch (erro) {
        console.error('[BOAS-VINDAS] Erro ao enviar e-mail:', erro.message);
        appEmitter.emit('email:erro', {
            tipo: 'boas-vindas',
            participanteId: participante.id,
            erro: erro.message
        });
    }
});

module.exports = {};
