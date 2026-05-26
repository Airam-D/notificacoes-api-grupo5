# Relatório Técnico — API de Notificações

**Grupo:** 5

**Membros:** Airam & João Marcelo

**Data:** 21/05/2026

---

## 1. Introdução

### 1.1 Objetivo do Projeto

Esta API REST foi desenvolvida como atividade prática do curso de Programação Back-End (SENAI). O objetivo principal é oferecer um módulo de notificações para uma plataforma de eventos, cobrindo:

- Gerenciamento de eventos, participantes e inscrições;
- Envio automático de notificações por e-mail (boas‑vindas, confirmação de inscrição, cancelamento);
- Exportação de dados e geração de relatórios para apoio à tomada de decisão.

O projeto utiliza um padrão orientado a eventos (EventEmitter) para desacoplar a lógica principal das ações colaterais (envio de e-mails, criação de notificações no banco, logging).

### 1.2 Escopo

Incluído:

- CRUD completo para Eventos e Participantes;
- Fluxo de Inscrições (criar, listar por evento, cancelar);
- Observers para notificações, e-mails e logs;
- EmailService para envios via Ethereal (ambiente de testes);
- Exportadores (JSON, XML, CSV) e upload de banners;
- Documentação Swagger e scripts de auxílio ao desenvolvimento.

Fora do escopo (possíveis evoluções): autenticação/authorization completa (JWT), interface frontend própria, envio em produção (SMTP real configurado em serviço externo), fila para envio massivo de e-mails.

---

## 2. Tecnologias Utilizadas

| Tecnologia                                   | Versão (aprox.) | Justificativa                                                 |
| -------------------------------------------- | --------------- | ------------------------------------------------------------- |
| Node.js                                      | 18+             | Plataforma madura para APIs e ecossistema rico                |
| Express.js                                   | 4.x             | Framework minimalista e flexível para APIs REST               |
| MySQL                                        | 8.x             | Banco relacional estável e conhecido na disciplina            |
| Sequelize                                    | 6.x             | ORM para organização dos models e migrations                  |
| Nodemailer                                   | 6.x             | Envio de e-mails e integração com Ethereal em desenvolvimento |
| Swagger (swagger-jsdoc + swagger-ui-express) | —               | Documentação interativa da API                                |
| node-cache                                   | —               | Cache de respostas para endpoints de leitura                  |
| xmlbuilder2                                  | —               | Geração de XML para exportação                                |

---

## 3. Arquitetura do Sistema

### 3.1 Visão Geral

Arquitetura organizada em camadas:

- Rotas (`src/routes`) → Recebem requisições e delegam aos controllers;
- Controllers (`src/controllers`) → Tratam validações simples e chamam serviços;
- Services (`src/services`) → Contêm a lógica de negócio e emitem eventos via `appEmitter`;
- Models (`src/models`) → Definição das entidades Sequelize e relacionamentos;
- Observers (`src/events`) → Escutam eventos e realizam efeitos (e-mail, notificação, log).

### 3.2 Diagrama Simplificado

Cliente → Rotas → Controllers → Services → (DB) / appEmitter → Observers → Efeitos (Email, Notificação, Log)

### 3.3 Banco de Dados (Modelos principais)

- `Evento` — id, nome, descricao, data, local, banner, createdAt, updatedAt
- `Participante` — id, nome, email, telefone, createdAt, updatedAt
- `Inscricao` — id, eventoId, participanteId, status, createdAt, updatedAt
- `Notificacao` — id, inscricaoId, tipo, destinatarioEmail, assunto, conteudo, enviada, dataEnvio

Observações: os models usam `underscored: true` (colunas em snake_case). No código, acessamos propriedades em camelCase (Sequelize faz o mapeamento).

---

## 4. Funcionalidades Implementadas

| Funcionalidade                    | Status       | Bloco PBE |
| --------------------------------- | ------------ | --------- |
| CRUD de Eventos                   | ✅ Completo   | 1 e 3     |
| CRUD de Participantes             | ✅ Completo   | 1 e 3     |
| Inscrições                        | ✅ Completo   | 1 e 3     |
| Middlewares e tratamento de erros | ✅ Completo   | 2         |
| Validação de dados                | ✅ Completo   | 2         |
| Persistência MySQL                | ✅ Completo   | 3         |
| Exportação JSON/XML               | ✅ Completo   | 3         |
| Upload de arquivos                | ✅ Completo   | 3         |
| Notificações por e-mail           | ✅ Completo   | 4         |
| Deploy                            | ❎ Incompleto | 5         |
| Documentação Swagger              | ✅ Incompleto | 5         |

---

## 5. Processo de Desenvolvimento

### 5.1 Metodologia

Trabalho organizado de forma iterativa com pequenas entregas. Uso de Git para controle de versão e commits frequentes para documentar o progresso.

### 5.2 Divisão de Tarefas

- Airam: serviços, observers, EmailService, documentação e integração de e-mails;
- João Marcelo: controllers, rotas, models, exportadores e testes manuais.

### 5.3 Controle de Versão

Repositório central no GitHub. Branch principal `main`. Commits claros com mensagens descritivas; push final antes da entrega.

---

## 6. Arquitetura de Eventos e Observers

O projeto segue o padrão Observer usando um EventEmitter central (`src/events/eventEmitter.js`).

- Serviços emitem eventos com payloads (ex.: `appEmitter.emit('inscricao:criada', novaInscricao)`).
- Observers escutam eventos e realizam ações assíncronas:
  - `notificacaoObserver` — cria registro em `Notificacao`, envia e-mail de confirmação/cancelamento;
  - `boasVindasObserver` — envia e-mail de boas‑vindas quando `participante:criado`;
  - `logObserver` — registra eventos importantes em `logs/app.log`.

Benefícios:

- Desacoplamento entre lógica principal e efeitos colaterais;
- Facilidade para adicionar novos comportamentos (ex.: webhook, fila) sem alterar services;
- Melhor testabilidade e leitura do fluxo.

---

## 7. EmailService (Ethereal) — Implementação e Uso

Resumo técnico:

- Implementado em `src/services/EmailService.js` usando `nodemailer`;
- Na inicialização (`server.js`) chamamos `await EmailService.inicializar()` que cria uma conta de teste via `nodemailer.createTestAccount()` e configura o `transporter` com as credenciais retornadas;
- `EmailService.enviar(destinatario, assunto, html)` envia o e-mail e retorna `{ messageId, previewUrl }` — o `previewUrl` permite abrir o e-mail no navegador via Ethereal (ideal para demo);

Observação: Ethereal é apenas para desenvolvimento; para produção basta substituir as credenciais do `transporter` por um SMTP real (SendGrid, SES, etc.).

---

## 8. Testes e Verificações Realizadas

- Testes manuais usando Insomnia/Postman para todos os endpoints principais;
- Verificação do fluxo de eventos: criação de participante → `participante:criado` → e-mail de boas-vindas (previewUrl);
- Criação de inscrição → `inscricao:criada` → notificação criada no BD e e-mail de confirmação;
- Cancelamento de inscrição (PATCH `/inscricoes/:id/cancelar`) → `inscricao:cancelada` → envio de e-mail de cancelamento;
- Exportação de dados (JSON, XML, CSV) e abertura dos arquivos gerados;
- Logs verificados em `logs/app.log` para garantir rastreabilidade.

Problema identificado e corrigido durante desenvolvimento:

- Bug: alguns observers tentavam ler campos de objetos nulos quando a busca de dados relacionada retornava `null`. Solução: buscar os dados completos via `Inscricao.findByPk(id, { include: [...] })` e validar `if (!dados) return;` antes de acessar propriedades (implementado em `notificacaoObserver`).

---

## 9. Checklist para Apresentação (passo a passo)

1. Preparação:
	- `npm install`
	- Ajustar `.env` (porta, se necessário)

2. Iniciar aplicação:

```powershell
npm run dev
```

3. Conferir console: procurar mensagem de inicialização do EmailService (conta Ethereal criada) e URL do Swagger (`/api-docs`).

4. Demonstração prática:
	- Criar participante: POST `/participantes` (mostrar console com `previewUrl` e abrir no navegador);
	- Criar evento e inscrever participante: POST `/inscricoes` (ver notificação criada no BD e e-mail de confirmação);
	- Cancelar inscrição: PATCH `/inscricoes/:id/cancelar` (ver e-mail de cancelamento e registro de notificação);
	- Exportar relatório: GET `/exportar/...` (baixar e abrir CSV/XML);
	- Mostrar `logs/app.log` com registros das operações.

5. Encerramento: explicar limitações (Ethereal dev-only) e próximos passos.

---

## 10. Desafios e Soluções

| Desafio                                   | Solução aplicada                                                                                           |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Observers acessando propriedades nulas    | Validar dados retornados por `findByPk` com `include` antes de acessar campos; adicionar log de erro claro |
| Duplicação de rotas/descrições no Swagger | Centralizar schemas em `src/swagger.js` e remover duplicatas nas rotas                                     |
| Falta de logs estruturados                | Implementar `logObserver` escrevendo em `logs/app.log` com timestamps e mensagens amigáveis                |

---

## 11. Lições Aprendidas

+- A arquitetura orientada a eventos facilita adicionar comportamentos sem impactar a lógica principal;
+- Testes com Ethereal tornam a demonstração de e-mails confiável sem enviar mensagens reais;
+- Manter consistência entre nomes de campos (camelCase no código e snake_case no banco) evita bugs silenciosos com Sequelize `underscored: true`;
+- Registrar logs detalhados foi essencial para depurar fluxos assíncronos.

---

## 12. Próximos Passos

+- Realizar o Deploy
+- Fazer a documentação Swagger

---

## 13. Referências

- https://expressjs.com/
- https://sequelize.org/
- https://nodemailer.com/

---
