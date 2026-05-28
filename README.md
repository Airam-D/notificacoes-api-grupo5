# 🔔 Notificações API

API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos.

## 📋 Sobre o Projeto

Este projeto faz parte da **Situação de Aprendizagem** do curso de Programação Back-End do **SENAI**.
O módulo é responsável por enviar notificações (confirmação de inscrição, lembretes) para participantes de eventos.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript no servidor
- **Express.js** - Framework web para Node.js
- **Swagger (swagger-jsdoc + swagger-ui-express)** - Documentação interativa da API
- **Dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Ferramenta para reinicialização automática durante desenvolvimento

# 🔔 Notificações API — Apresentação Completa

API REST desenvolvida como parte da Situação de Aprendizagem do curso de Programação Back-End (SENAI). O objetivo é gerenciar eventos, participantes e inscrições, além de enviar notificações por e-mail (confirmação, cancelamento, boas-vindas) usando um sistema baseado em eventos (EventEmitter) e observers.

Conteúdo deste README: visão geral, arquitetura, como rodar, endpoints, fluxo de eventos, EmailService (Ethereal), logging, cache, exports, testes e roteiro de apresentação.

---

## Índice

- Visão Geral
- Funcionalidades Principais
- Estrutura do Projeto
- Arquitetura e Fluxos (Eventos / Observers)
- EmailService (Ethereal) — Como funciona
- Rotas e Endpoints (resumo para apresentação)
- Banco de Dados / Modelos
- Logging e Monitoramento
- Cache
- Exportações (JSON, XML, CSV)
- Tests & Checklist de Apresentação
- Como demonstrar o projeto (roteiro rápido)
- Problemas conhecidos e próximos passos

---

## Visão Geral

Esta API fornece:

- CRUD para Eventos, Participantes e Inscrições
- Observer pattern para lidar com efeitos colaterais (notificações, logs, emails)
- EmailService com Ethereal (conta de teste automática) para preview de e-mails
- Exportação de dados (XML / JSON / CSV)
- Cache em endpoints de leitura para melhorar performance

O servidor roda por padrão na porta `3000` e a documentação Swagger está disponível em `/api-docs`.

---

## Funcionalidades Principais (para apresentação)

- Criar/Editar/Deletar eventos
- Criar/Editar/Deletar participantes
- Realizar inscrições em eventos
- Cancelar inscrições (emite evento de cancelamento)
- Notificações automáticas criadas ao inscrever-se
- E-mails automáticos: boas-vindas, confirmação e cancelamento (Ethereal)
- Logs centralizados em `logs/app.log`
- Exportar relatórios em vários formatos

---

## Estrutura do Projeto

Principais pastas e arquivos (resumo):

```
src/
├── app.js                # Configura middlewares, rotas e observers
├── server.js             # Inicializa DB e EmailService, inicia servidor
├── swagger.js            # Configuração do Swagger
├── controllers/          # Recebe requisições HTTP
├── services/             # Lógica de negócio (emit events aqui)
├── events/               # Observers (notificacao, log, boasVindas)
├── models/               # Sequelize models
├── routes/               # Definição de rotas (evento, participante, inscricao, notificacao)
├── middlewares/          # Erros, responseTime, etc
└── templates/            # Templates de e-mail (HTML)

docs/                     # Documentação adicional (guias, custo, WBS...)
logs/                     # logs/app.log
uploads/                  # uploads de banners
```

---

## Arquitetura e Fluxos (Event-driven)

- Os serviços (ex.: `ParticipanteService`, `InscricaoService`) executam a lógica e emitem eventos via `appEmitter`.
- Observers localizados em `src/events` escutam esses eventos e realizam ações assíncronas:
   - `notificacaoObserver` → cria registros de notificação e envia e-mails de confirmação/cancelamento
   - `boasVindasObserver` → envia e-mail de boas-vindas quando `participante:criado`
   - `logObserver` → registra eventos importantes em `logs/app.log`

Fluxo exemplo (inscrição):

1. Cliente POST `/inscricoes` -> `InscricaoService.criar()`
2. Serviço valida e cria inscrição no banco
3. `appEmitter.emit('inscricao:criada', novaInscricao)`
4. `notificacaoObserver` busca dados relacionados (evento, participante) e envia e-mail via `EmailService` e salva `Notificacao`
5. `logObserver` registra o evento

---

## EmailService (Ethereal) — Como funciona (resumo técnico)

- Implementado em `src/services/EmailService.js`.
- Usa `nodemailer.createTestAccount()` para criar automaticamente uma conta de teste no Ethereal na inicialização.
- `server.js` chama `await EmailService.inicializar()` antes de iniciar o servidor, garantindo que o `transporter` esteja pronto.
- `EmailService.enviar(destinatario, assunto, html)` envia e retorna `{ messageId, previewUrl }` onde `previewUrl` permite visualizar o e-mail no navegador (https://ethereal.email).

Observações para apresentação:

- Ethereal não envia e-mails de verdade — é ideal para demonstrações. O previewUrl é o ponto chave a mostrar.
- Para produção, basta trocar a configuração do `transporter` com credenciais SMTP reais.

---

### Notificações
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /notificacoes | Listar (filtros: tipo, enviada) |
| GET | /notificacoes/estatisticas | Dashboard de envios |
| GET | /notificacoes/:id | Detalhes |
| POST | /notificacoes/:id/reenviar | Reenviar |
| POST | /notificacoes/teste-email | Enviar e-mail de teste |

### Exportação
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /exportar/eventos/xml | Eventos em XML |
| GET | /exportar/eventos/json | Eventos em JSON (download) |
| GET | /exportar/relatorio/inscricoes | Relatório de inscrições |

## 📧 Sistema de Notificações

A API envia e-mails automaticamente usando o **Padrão Observer**:
- **Confirmação de inscrição** — enviado ao criar uma inscrição
- **Cancelamento** — enviado ao cancelar uma inscrição

Em desenvolvimento, os e-mails são capturados pelo **MailPit** (servidor SMTP local).
Visualize os e-mails em `http://MAILPIT_IP:8025`.

## Rotas e Endpoints (resumo para apresentação)

Base URL: `http://localhost:3000`

- Eventos: `/eventos`
   - GET `/eventos` — listar (cache aplicado)
   - GET `/eventos/:id` — detalhe (cache aplicável)
   - POST `/eventos` — criar
   - PUT `/eventos/:id` — atualizar
   - DELETE `/eventos/:id` — deletar
   - POST `/:id/banner` — upload de banner

- Participantes: `/participantes`
   - GET `/participantes` — listar
   - GET `/participantes/:id` — detalhe
   - POST `/participantes` — criar (emite `participante:criado`)
   - PUT `/participantes/:id` — atualizar
   - DELETE `/participantes/:id` — deletar

- Inscrições: `/inscricoes`
   - GET `/inscricoes` — listar
   - GET `/inscricoes/evento/:eventoId` — listar por evento
   - POST `/inscricoes` — criar (emite `inscricao:criada`)
   - PATCH `/inscricoes/:id/cancelar` — cancelar (emite `inscricao:cancelada`)

- Notificações: `/notificacoes`
   - GET `/notificacoes` — listar notificações
   - POST `/notificacoes/teste-email` — envia e-mail de teste via Ethereal

- Export: `/exportar` — endpoints para exportar dados (JSON, XML, CSV, relatórios)

Use a documentação Swagger (`/api-docs`) durante a apresentação para navegar por todos os endpoints e schemas.

---

## Banco de Dados / Models (Sequelize)

- SGBD: MySQL
- Principais models:
   - `Evento` (id, nome, descricao, data, local, banner, createdAt, updatedAt)
   - `Participante` (id, nome, email, telefone, createdAt, updatedAt)
   - `Inscricao` (id, eventoId, participanteId, status, createdAt, updatedAt)
   - `Notificacao` (id, inscricaoId, tipo, destinatarioEmail, assunto, conteudo, enviada, dataEnvio)

Observação: Os models usam `underscored: true` no Sequelize (colunas em snake_case), mas o código acessa campos em camelCase (ex.: `inscricao.id`, `participante.nome`).

---

## Logging e Monitoramento

- `logObserver` consolida logs em `logs/app.log` com timestamps e mensagens amigáveis.
- Durante a apresentação, abra `logs/app.log` para mostrar o histórico de eventos (criação de inscrição, envio de e-mail, erros).

---

## Cache

- Cache aplicado em endpoints de leitura (ex.: listagem de eventos) com TTL curto (30–60s) via `node-cache`.
- O cache é invalidado em operações que alteram dados (criar/atualizar/deletar) para garantir consistência.

---

## Exportações

- Exporta dados de eventos/inscrições em JSON, XML e CSV.
- Usado `xmlbuilder2` para conversão a XML e utilitários para CSV.

---

## Tests & Checklist de Apresentação (resumo rápido)

Antes da apresentação, verifique:

1. `npm install` executado e dependências instaladas.
2. `.env` configurado (porta, credenciais se necessário).
3. `npm run dev` inicia sem erros e `EmailService.inicializar()` é chamado (ver console: conta Ethereal criada).
4. Acesse `http://localhost:3000/api-docs` e navegue pelos endpoints.
5. Demonstre fluxo completo:
    - Criar participante → veja preview do e-mail de boas-vindas (Ethereal previewUrl no console).
    - Criar inscrição → ver notificação criada e e-mail de confirmação.
    - Cancelar inscrição (PATCH `/inscricoes/:id/cancelar`) → verificar que o observer de cancelamento envia e-mail e salva notificação.
    - Mostrar `logs/app.log` com entradas para cada etapa.
6. Exportar lista de inscrições em CSV/XML e abrir no editor.

Checklist de comandos para demo:

```powershell
# Instalar e iniciar
npm install
npm run dev

# Testes rápidos (curl/Insomnia/Postman)
POST http://localhost:3000/participantes  { nome, email }
POST http://localhost:3000/inscricoes      { eventoId, participanteId }
PATCH http://localhost:3000/inscricoes/:id/cancelar
POST http://localhost:3000/notificacoes/teste-email
```

---

## Como demonstrar (roteiro prático para apresentação)

1. Abrir `http://localhost:3000/api-docs` e mostrar os schemas.
2. Criar um participante (POST `/participantes`) — mostrar console com `previewUrl` e abrir no navegador.
3. Criar um evento e inscrever participante — demonstrar criação de `Notificacao` e e-mail de confirmação.
4. Cancelar inscrição — executar PATCH `/inscricoes/:id/cancelar` e mostrar e-mail de cancelamento.
5. Mostrar arquivos: `logs/app.log`, `uploads/` (banners) e `docs/`.

Dica: mantenha o terminal visível e copie o `previewUrl` mostrado para abrir o e-mail no navegador ao vivo.

---

## Problemas conhecidos e próximos passos

- Atualmente, o EmailService está configurado para Ethereal (teste). Para produção, configurar SMTP real (SendGrid, AWS SES, Gmail etc.).
- Poderíamos adicionar fila de envio (Bull/RabbitMQ) para maior confiabilidade em alta carga.
- Implementar preferências de notificação por participante.

---

## Contribuição e Contato

1. Fork → branch feature → PR
2. Testes manuais e revisar `docs/` antes do merge

Autores: Grupo 5 (SENAI)

---

## Licença

ISC

---

Se quiser, eu posso agora:

- (A) Gerar automaticamente um checklist detalhado para a sua apresentação (passo a passo),
- (B) Inserir no README um roteiro de slides sugerido com trechos de terminal e screenshots,
- (C) Executar alterações adicionais no projeto para cobrir pontos faltantes que você queira demonstrar.

Diga qual opção prefere e eu continuo.