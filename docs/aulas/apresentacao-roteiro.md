# Roteiro de Apresentação — API de Notificações (Grupo 5)

Tempo sugerido: 12–18 minutos
Formato: slide a slide com fala sugerida, transições, comandos para demo e checklist pré-apresentação.

**Slide 1 — Título (30s)**
- Título: Apresentação do Projeto — API de Notificações (Grupo 5)
- Fala sugerida: "Bom dia/tarde. Meu nome é [Seu Nome]. Vou apresentar a API de notificações desenvolvida pelo Grupo 5. Mostrarei objetivo, arquitetura, principais funcionalidades, implementação, demonstração e conclusões."
- Transição: "Começo pelo contexto e motivação."

**Slide 2 — Contexto e Motivação (1min)**
- Pontos-chave: necessidade de comunicações automáticas em eventos, ganho de eficiência, auditoria e testes.
- Fala sugerida: "Eventos e inscrições exigem notificações automáticas. Este projeto centraliza o envio de e-mails, grava histórico e facilita testes locais com Ethereal."
- Transição: "Agora os objetivos do projeto."

**Slide 3 — Objetivos do Projeto (45s)**
- Objetivos listados:
  - Automatizar notificações em eventos.
  - Persistir histórico de notificações.
  - Disponibilizar API REST documentada.
  - Facilitar testes e deploy.
- Fala sugerida: "Os objetivos foram automatizar o envio de notificações, registrar histórico para auditoria, expor uma API bem documentada e permitir testes locais seguros."

**Slide 4 — Arquitetura (1min)**
- Mostrar diagrama simples: Cliente → API (Routes → Controllers → Services) → DB (MySQL via Sequelize)
  - EventEmitter → Observers (Email, Notificação, Log)
- Fala sugerida: "A aplicação é Node.js + Express + Sequelize; o padrão de eventos desacopla envio de e-mail e auditoria do fluxo principal."
- Referência a arquivos: `src/server.js`, `src/app.js`, `src/events/eventEmitter.js`.

**Slide 5 — Principais Funcionalidades (1min)**
- Lista resumida:
  - CRUD de eventos, participantes e inscrições
  - Envio de e-mails (confirmação, cancelamento)
  - Histórico de notificações
  - Upload de banner
  - Cache simples e documentação Swagger
- Fala sugerida: "Essas funcionalidades atendem ao fluxo comum de um sistema de eventos, desde criação até envio de mensagens ao participante."
- Referências: `src/routes/*`, `src/templates/email/*`.

**Slide 6 — Fluxo de Notificação (1min)**
- Exemplo passo a passo:
  1. Usuário faz inscrição (controller)
  2. Service grava inscrição e emite evento
  3. Observers reagem: gravam notificação, enviam e-mail, geram log
- Fala sugerida: "O fluxo usa EventEmitter para que o envio de e-mail e a auditoria não travem a operação principal."
- Arquivos para citar: `src/events/notificacaoObserver.js`, `src/events/boasVindasObserver.js`, `src/services/InscricaoService.js`.

**Slide 7 — Modelos e Banco de Dados (1min)**
- Principais tabelas: `eventos`, `participantes`, `inscricoes`, `notificacoes`.
- Uso de migrations e seeders para controlar versões e dados iniciais.
- Fala sugerida: "Usamos Sequelize com migrations em `database/migrations` e seeders em `database/seeders` para facilitar replicação do ambiente."

**Slide 8 — Serviços e Templates (1min)**
- `EmailService` centraliza transporte SMTP (Ethereal em dev).
- Templates em `src/templates/email` com base (`baseTemplate.js`) para consistência visual.
- Fala sugerida: "Templates facilitam manutenção e padronização de mensagens; `EmailService` abstrai o provedor SMTP."

**Slide 9 — Endpoints e Documentação (45s)**
- Documentação Swagger disponível em `/api-docs`.
- Fala sugerida: "A API expõe rotas para gerenciar eventos/participantes/inscricoes/notificacoes. A documentação interativa ajuda na validação durante o demo."

**Slide 10 — Demonstração ao vivo (4–6 min)**
- Objetivo do demo: iniciar servidor, abrir Swagger, criar uma inscrição e mostrar e-mail enviado e registro de notificação.
- Pré-requisitos: `node`, `npm`, `.env` com credenciais locais (DB, SMTP) ou usar Ethereal configurado no projeto.
- Comandos (PowerShell):
```powershell
npm install
npm run db:migrate
npm run db:seed
# alternativa rápida
npm run db:reset
npm run dev
```
- Ações passo a passo durante demo:
  1. Mostrar `http://localhost:3000/api-docs`.
  2. Fazer um `POST /inscricoes` usando o Swagger (ou Postman) com payload de teste.
  3. Mostrar console do servidor onde `EmailService` imprime link do Ethereal ou mostra log do envio.
  4. Consultar tabela `notificacoes` (pelo console ou query) para confirmar persistência.
- Fala sugerida: "Vou resetar a base (se necessário), iniciar a API e executar um POST para demonstrar o envio automático de e-mail e o registro da notificação."

**Slide 11 — Qualidade e Testes (1min)**
- Pontos: migrations/seeders, tratamento de erros (`errors/AppError.js`), middlewares (`errorHandler.js`), uso de Observers para desacoplamento.
- Observação: não há suite de testes automatizados no repositório — sugerir adição de unit e integration tests como próximo passo.

**Slide 12 — Deploy e Infraestrutura (45s)**
- Requisitos de deploy: variáveis de ambiente para DB e SMTP, executar migrations no servidor target.
- Recomendações: usar MySQL gerenciado, variáveis seguras (secrets), contêinerização para reproducibilidade.
- Fala sugerida: "Para produção, configurar SMTP real e escalabilidade via filas/workers para envio de e-mail."

**Slide 13 — Conclusão e Próximos Passos (45s)**
- Conclusões: fluxo de notificações funcional, persistência e documentação em Swagger.
- Próximos passos recomendados:
  - Adicionar testes automatizados (unit/integration)
  - Implementar fila para envio em massa (Bull/RabbitMQ)
  - Painel administrativo para templates e reenvio

**Slide 14 — Checklist Pré-Apresentação (rápido, 30s)**
- Itens para validar antes da apresentação:
  - `npm run db:reset` executado e sem erro
  - `npm run dev` ou `npm start` rodando sem erros
  - `http://localhost:3000/api-docs` acessível
  - Ethereal/console mostrando envio de e-mail
  - Prints salvos (Swagger, POST de teste, e-mail no Ethereal)

**Slide 15 — Perguntas e Respostas (Q&A)**
- Perguntas prováveis e respostas sugeridas:
  - Q: Como o projeto trata falhas no envio de e-mail?
    - R: O envio é logado; podemos adicionar re-tentativas ou enfileirar o envio com workers para maior robustez.
  - Q: Como escalar o envio de e-mails?
    - R: Separar envio em workers e usar filas (Bull/RabbitMQ), além de provedores SMTP escaláveis.
  - Q: Como validar dados recebidos?
    - R: Atualmente há validações em `helpers/validator.js`; recomenda-se usar Joi ou Zod para validação centralizada.
  - Q: Como auditar envios?
    - R: Cada envio é persistido em `notificacoes` e `logObserver` também grava auditoria. Podemos exportar relatórios ou integrar com ELK/Graylog.

---

## Apêndice — Comandos Rápidos
```powershell
# Instalar dependências
npm install

# Rodar migrations e seed
npm run db:migrate
npm run db:seed

# Reset rápido (recria e popula)
npm run db:reset

# Rodar servidor
npm run dev
# ou
npm start
```

## Arquivos-chave para destacar na apresentação
- `src/server.js` — inicialização, porta e inicialização de `EmailService`
- `src/app.js` — configuração do Express e middlewares
- `src/events/eventEmitter.js`, `src/events/*.js` — sistema de eventos e observers
- `src/services/EmailService.js` — envio de e-mail e inicialização do transporte
- `src/templates/email/*` — templates utilizados
- `database/migrations/*`, `database/seeders/*` — controle do schema e dados iniciais
- `package.json` — scripts úteis (`db:reset`, `dev`, `start`)

## Dicas práticas
- Prepare 1-2 slides de backup com prints caso o demo falhe: um do Swagger e outro do e-mail no Ethereal.
- Execute `npm run db:reset` e `npm run dev` pelo menos uma vez antes da apresentação.
- Deixe o terminal com o servidor e a aba do Swagger prontos para economizar tempo.

---

Se quiser, eu:
- gero uma versão em `docs/aulas/apresentacao-roteiro.md` (já criada) em formato pronto para colar nos slides (já feita),
- ou adapto o roteiro para caber em X slides (ex.: 10 slides) com textos mais curtos por slide,
- ou gero prints automáticos do Swagger e de um POST de exemplo (preciso rodar o servidor aqui — você autoriza?).

Diga qual das opções prefere para eu ajustar antes de finalizar.