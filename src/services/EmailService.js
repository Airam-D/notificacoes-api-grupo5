const nodemailer = require('nodemailer');

let transporter = null;

// Endereço do MailPit (configurado via .env)
const SMTP_HOST = process.env.SMTP_HOST || 'MAILPIT_IP';
const SMTP_PORT = process.env.SMTP_PORT || 1025;
const MAILPIT_URL = `http://${SMTP_HOST}:8025`;

/**
 * Inicializa o transporter conectando ao MailPit.
 * Chamado uma vez ao iniciar o servidor.
 */
async function inicializar() {
    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT),
        secure: false,
        tls: { rejectUnauthorized: false },
    });

    // Testar a conexão com o MailPit
    try {
        await transporter.verify();
        console.log('═══════════════════════════════════════════');
        console.log('📧 Servidor de e-mail conectado!');
        console.log(`   SMTP: ${SMTP_HOST}:${SMTP_PORT}`);
        console.log(`   Painel: ${MAILPIT_URL}`);
        console.log('═══════════════════════════════════════════');
    } catch (erro) {
        console.error('⚠️ Servidor de e-mail indisponível:', erro.message);
        console.error('   Verifique se o MailPit está rodando e o IP está correto.');
    }
}

/**
 * Envia um e-mail.
 * @param {string} para - E-mail do destinatário
 * @param {string} assunto - Assunto do e-mail
 * @param {string} html - Conteúdo HTML do e-mail
 * @returns {object} Informações do envio
 */
async function enviar(para, assunto, html) {
    if (!transporter) {
        throw new Error('EmailService não inicializado. Chame inicializar() primeiro.');
    }

    const info = await transporter.sendMail({
        from: '"Plataforma de Eventos" <eventos@notificacoes.com>',
        to: para,
        subject: assunto,
        html: html,
    });

    console.log(`📧 E-mail enviado para ${para} (ID: ${info.messageId})`);
    console.log(`   Visualizar em: ${MAILPIT_URL}`);

    return {
        messageId: info.messageId,
        visualizarEm: MAILPIT_URL,
    };
}

module.exports = {
    inicializar,
    enviar,
};