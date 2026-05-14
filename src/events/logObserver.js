const appEmitter = require('./eventEmitter');
const fs = require('fs');
const path = require('path');

// Caminho do arquivo de log
const logDir = path.join(__dirname, '../../logs');
const logFile = path.join(logDir, 'app.log');

// Garantir que o diretório de logs existe
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Função auxiliar para escrever no log
function registrarLog(mensagem) {
    const timestamp = new Date().toISOString();
    const linha = `[${timestamp}] ${mensagem}\n`;
    
    try {
        fs.appendFileSync(logFile, linha);
    } catch (erro) {
        console.error('[LOG] Erro ao escrever no arquivo de log:', erro.message);
    }
}

// Observer: registra quando uma inscrição é criada
appEmitter.on('inscricao:criada', (inscricao) => {
    registrarLog(`✓ Inscrição #${inscricao.id} criada (evento: ${inscricao.evento_id}, participante: ${inscricao.participante_id})`);
});

// Observer: registra quando uma inscrição é cancelada
appEmitter.on('inscricao:cancelada', (inscricao) => {
    registrarLog(`✗ Inscrição #${inscricao.id} cancelada`);
});

// Observer: registra quando um evento é criado
appEmitter.on('evento:criado', (evento) => {
    registrarLog(`✓ Evento #${evento.id} criado: "${evento.nome}" (${evento.data})`);
});

// Observer: registra quando um evento é atualizado
appEmitter.on('evento:atualizado', (evento) => {
    registrarLog(`◆ Evento #${evento.id} atualizado: "${evento.nome}"`);
});

// Observer: registra quando um evento é deletado
appEmitter.on('evento:deletado', (eventoId) => {
    registrarLog(`✗ Evento #${eventoId} deletado`);
});

// Observer: registra quando um participante é criado
appEmitter.on('participante:criado', (participante) => {
    registrarLog(`✓ Participante #${participante.id} criado: "${participante.nome}" (${participante.email})`);
});

// Observer: registra quando um participante é atualizado
appEmitter.on('participante:atualizado', (participante) => {
    registrarLog(`◆ Participante #${participante.id} atualizado: "${participante.nome}"`);
});

// Observer: registra quando um participante é deletado
appEmitter.on('participante:deletado', (participanteId) => {
    registrarLog(`✗ Participante #${participanteId} deletado`);
});

// Observer: registra quando uma notificação é criada
appEmitter.on('notificacao:criada', (notificacao) => {
    registrarLog(`📧 Notificação #${notificacao.id} criada (tipo: ${notificacao.tipo}, destinatário: ${notificacao.destinatarioEmail})`);
});

// Observer: registra quando uma notificação é enviada
appEmitter.on('notificacao:enviada', (notificacao) => {
    registrarLog(`📨 Notificação #${notificacao.id} enviada para ${notificacao.destinatarioEmail}`);
});

// Observer: registra quando uma notificação falha
appEmitter.on('notificacao:erro', (notificacao, erro) => {
    registrarLog(`❌ Notificação #${notificacao.id} falhou: ${erro}`);
});

// Observer: registra quando um arquivo é exportado
appEmitter.on('exportacao:realizada', (tipo, arquivo) => {
    registrarLog(`💾 Exportação realizada: ${tipo} → ${arquivo}`);
});

// Observer: registra erros gerais
appEmitter.on('erro:geral', (erro) => {
    registrarLog(`❌ ERRO: ${erro.message}`);
});

console.log('[LOG] Observer de logs registrado - Logs serão salvos em logs/app.log');

module.exports = { registrarLog };