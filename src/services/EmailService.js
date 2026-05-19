const nodemailer = require('nodemailer');

let transporter = null;
let contaTeste = null;

/**
 * Inicializa o transporter com uma conta de teste do Ethereal.
 * Chamado uma vez ao iniciar o servidor.
 */
async function inicializar() {
    // Criar conta de teste automaticamente
    contaTeste = await nodemailer.createTestAccount();

    console.log('═══════════════════════════════════════════');
    console.log('📧 E-mail de teste configurado!');
    console.log(`   Usuário: ${contaTeste.user}`);
    console.log(`   Senha:   ${contaTeste.pass}`);
    console.log(`   Painel:  https://ethereal.email/login`);
    console.log('═══════════════════════════════════════════');

    // Criar o transporter (o "carteiro" que envia os e-mails)
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: contaTeste.user,
            pass: contaTeste.pass,
        },
    });
}

/**
 * Envia um e-mail.
 * @param {string} para - E-mail do destinatário
 * @param {string} assunto - Assunto do e-mail
 * @param {string} html - Conteúdo HTML do e-mail
 * @returns {object} Informações do envio, incluindo URL de preview
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

    // O Ethereal gera uma URL para visualizar o e-mail enviado!
    const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log(`📧 E-mail enviado para ${para}`);
    console.log(`   Preview: ${previewUrl}`);

    return {
        messageId: info.messageId,
        previewUrl: previewUrl,
    };
}

module.exports = {
    inicializar,
    enviar,
};