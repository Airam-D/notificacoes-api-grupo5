// Dados iniciais (seed)
let participantes = [
    { id: 1, nome: "Ana Silva", email: "ana@email.com" },
    { id: 2, nome: "Carlos Souza", email: "carlos@email.com" },
    { id: 3, nome: "Maria Santos", email: "maria@email.com" },
];

let proximoId = 4;

// 👇 Implemente as funções abaixo seguindo o padrão do EventoModel
function listarTodos() {

    // Retorne todos os participantes
    return participantes;

}
function buscarPorId(id) {

    // Use .find() para buscar pelo ID
    return participantes.find((p) => p.id === id);

}
function criar(dados) {
    const novoParticipante = {
        id: proximoId,
        // Pegando os dados dinâmicos em vez do texto fixo:
        nome: dados.nome,
        email: dados.email
    };

    proximoId++;
    participantes.push(novoParticipante);
    return novoParticipante;
}
function atualizar(id, dados) {

    const index = participantes.findIndex((p) => p.id === id);
    // Se não encontrar, retorne null
    if (index === -1) return null;

    // Se encontrar, atualize e retorne o participante atualizado
    // Use o spread operator como fizemos no EventoModel
    participantes[index] = { ...participantes[index], ...dados };
    return participantes[index];
}
function deletar(id) {
    // 1. Encontra o índice do participante
    const index = participantes.findIndex((p) => p.id === id);

    // 2. Se o índice for -1, significa que o participante não existe
    if (index === -1) {
        return false; // Retorna false para o Controller saber que não encontrou
    }

    // 3. Se existe, remove 1 item a partir daquele índice
    participantes.splice(index, 1);

    // 4. Retorna true para confirmar que foi deletado
    return true;
}

function listarTodos() {
    return participantes;
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};