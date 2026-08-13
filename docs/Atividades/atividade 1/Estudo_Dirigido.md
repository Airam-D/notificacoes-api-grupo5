# Atividade 01 — Estudo Dirigido: Anatomia do Módulo de Notificações

## Parte 1

| Camada                         | Arquivos Encontrados                                                                                                                                                                                                                                        | Responsabilidade (em uma frase)                                                                                                                                                                                       |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rotas**                      | `routes/auth.routes.js`<br>`notificacoes.routes.js`<br>`evento.routes.js`<br>`participantes.routes.js`                                                                                                                                                      | Mapear caminho + verbo HTTP para um controller; aplicar middlewares                                                                                                                                                   |
| **Controllers**                | `EventoController.js`<br>`InscricaoController.js`<br>`ParticipanteController.js`                                                                                                                                                                            | a ponte entre o pedido do usuário e a resposta do sistema                                                                                                                                                             |
| **Services**                   | `EmailService.js`<br>`EventoService.js`<br>`InscricaoService.js`<br>`NotificacaoService.js`<br>`ParticipanteService.js`                                                                                                                                     | executa a regra de negócio. Ele decide por onde enviar a notificação (e-mail, SMS, push), formata o texto e faz o disparo real.                                                                                       |
| **Models**                     | `EventoModel.js`<br>`Index.js`<br>`InscricaoModel.js`<br>`NotificacaoModel.js`<br>`ParticipanteModel.js`                                                                                                                                                    | define a estrutura e o formato dos dados. Ele representa a notificação como um objeto (ex: campos id, destinatário, mensagem e status) e dita como ela será salva no banco de dados                                   |
| **Middlewares**                | `cacheMiddlewares.js`<br>`errosHandler.js`<br>`logger.js`<br>`notFound.js`<br>`responseTime.js`                                                                                                                                                             | funciona como um filtro ou segurança. Ele intercepta a requisição antes de chegar ao controller para verificar permissões (autenticação), checar se o servidor está sobrecarregado (rate limit) ou formatar os dados. |
| **Configuração / .env**        | `PORT=3000`<br>`NODE_ENV=development`<br>`DB_HOST=localhost`<br>`DB_PORT=3306`<br>`DB_NAME=notificacoes_db`<br>`DB_USER=root`<br>`DB_PASSWORD=sua_senha_aqui`<br><br>`# Servidor de e-mail (MailPit da sala)`<br>`SMTP_HOST=MAILPIT_IP`<br>`SMTP_PORT=1025` | O .env guarda dados sensíveis e configurações (como senhas, chaves de API e tokens) fora do código-fonte por segurança.                                                                                               |
| **Outros (utils, helpers...)** | `parseId.js`<br>`validator.js`                                                                                                                                                                                                                              | Os utils e helpers servem para isolar funções genéricas e repetitivas que ajudam o restante do código, mas não contêm regras de negócio.                                                                              |

---

## Parte 2 — Mapa das rotas

|   #   | Método | Caminho                              | Exige Token? | Controller        | Service           | Model(s)   | Efeito Colateral                       |
| :---: | :----- | :----------------------------------- | :----------: | :---------------- | :---------------- | :--------- | :------------------------------------- |
|   1   | GET    | `/eventos`                           |     Não      | `index`           | `listarTodos`     | `findAll`  | Lista os eventos                       |
|   2   | POST   | `/eventos`                           |     Não      | `store`           | `criar`           | `create`   | Cria um evento                         |
|   3   | PUT    | `/eventos:id`                        |     Não      | `Update`          | `atualizar`       | `findByPk` | Atualiza um evento buscando o id       |
|   4   | DELETE | `/eventos:id`                        |     Não      | `destroy`         | `deletar`         | `findByPk` | Deleta um evento buscando o id         |
|   5   | GET    | `/exportar/eventos/xml`              |     Não      | -                 | -                 | `findAll`  | Lista eventos em XML                   |
|   6   | GET    | `/exportar/eventos/json`             |     Não      | -                 | -                 | `findAll`  | Lista de eventos em JSON para download |
|   7   | GET    | `/exportar/relatorio/inscricoes`     |     Não      | -                 | -                 | `findAll`  | Relatório detalhado de inscrições      |
|   8   | GET    | `/exportar/inscricoes/xml`           |     Não      | -                 | -                 | `findAll`  | Lista de descricoes em XML             |
|   9   | GET    | `/exportar/relatorio/inscricoes/csv` |     Não      | -                 | -                 | `findAll`  | Relatório de inscricoes em CSVpara     |
|  10   | POST   | `/inscricoes`                        |     Não      | `store`           | `criar`           | `findByPk` | Cria uma inscrição em um evento        |
|  11   | GET    | `/inscricoes`                        |     Não      | `index`           | `listarTodas`     | `findAll`  | Lista todas as notificações            |
|  12   | GET    | `/inscricoes/evento/{eventoId}`      |     Não      | `listarPorEvento` | `listarPorEvento` | `findAll`  | Lista inscrições por evento            |
|  13   | PATCH  | `/inscricoes/{id}/cancelar`          |     Não      | `cancelar`        | `cancelar`        | `findByPk` | Cancelar uma inscrição                 |
|  14   | GET    | `/notificacoes`                      |     Não      | -                 | -                 | `findAll`  | Lista todas as notificações            |
|  15   | GET    | `/notificacoes/estatisticas`         |     Não      | -                 | -                 | `count`    | Estatísticas de envio de notificações  |
|  16   | GET    | `/notificacoes/{id}`                 |     Não      | -                 | -                 | `findByPk` | Busca notificação por Id               |
|  17   | POST   | `/notificacoes/{id}/reenviar`        |     Não      | -                 | -                 | `findByPk` | Reenviar uma notificação existente     |
|  18   | POST   | `/notificacoes/teste-email`          |     Não      | `enviar`          | -                 | -          | Envia E-mail de teste pela API         |
|  19   | GET    | `/participantes`                     |     Não      | `index`           | `listarTodos`     | `findAll`  | Lista participantes                    |
|  20   | GET    | `/participantes/{id}`                |     Não      | `show`            | `buscarPorId`     | `findByPk` | Busca participante por Id              |
|  21   | POST   | `/participantes`                     |     Não      | `store`           | `criar`           | `create`   | Cria um novo participante              |
|  22   | PUT    | `/participante/{id}`                 |     Não      | `update`          | `atualizar`       | -          | Atualiza um participante               |
|  23   | DELETE | `/participante/{id}`                 |     Não      | `destroy`         | `deletar`         | -          | Deleta um participante                 |

---

## Parte 3 - Que nível de teste cabe onde?

|   #   | Comportamento a Verificar                      | Nível      | Por que este nível                                                             |
| :---: | :--------------------------------------------- | :--------- | :----------------------------------------------------------------------------- |
|   1   | Evento inexistente retorna com “NotFoundError” | endpoint   | A verificação é sobre status HTTP, só existe na frente da API                  |
|   2   | Eventos emitidos para participantes criados    | integração | A emissão de eventos só acontece quando o Participante é criado com sucesso    |
|   3   | Listar eventos disponíveis                     | integração | Para o Alistamento ocorrer os dados dos eventos precisam estar dentro do banco |
|   4   | Criação de Eventos                             | unitário   | O evento só é criado com os dados fornecidos pelo usuário                      |

---

## Parte 4 - Análise

Respondam em texto corrido, no mesmo arquivo. Uma resposta por pergunta, com justificativa.

### 4.1 Se uma única funcionalidade do módulo falhasse silenciosamente em produção — sem mensagem de erro, sem log —, qual delas causaria o maior estrago? Por quê?

**RESPOSTA:**

O disparo e reenvio de notificações/e-mails (`EmailService.js` / `POST /notificacoes/:id/reenviar` / `PATCH /inscricoes/:id/cancelar`). Se essa funcionalidade falhar silenciosamente, a API responderá com sucesso (`200 OK`) para quem envia, criando a falsa ilusão de que o usuário recebeu o aviso. Em produção, participantes poderiam ter inscrições canceladas ou eventos alterados/cancelados sem jamais saberem, gerando prejuízo financeiro, falhas graves de comunicação e perda de confiabilidade na plataforma.

---

### 4.2 Quais pontos do módulo dependem de algo externo ao código de vocês (banco, servidor de e-mail, relógio do sistema, variáveis de ambiente)? Listem todos.

**RESPOSTA:**

* **Banco de Dados (PostgreSQL/MySQL via Sequelize):** Mapeado na pasta `database/` e `.sequelizerc`, necessário para consultar e persistir usuários, eventos, inscrições e notificações.
* **Servidor de E-mail / SMTP (`MailPit`/Nodemailer):** Consumido diretamente pelo `EmailService.js` para enviar mensagens reais ao ambiente externo.
* **Sistema de Arquivos / Disco Local:** Utilizado para salvar e ler os banners enviados via upload (pasta `uploads/`).
* **Variáveis de Ambiente (`.env`):** Armazena configurações sensíveis como porta da API, credenciais de conexão do banco e do servidor SMTP.
* **Relógio do Sistema (Data e Hora):** Necessário para validar datas retroativas em eventos, registrar timestamps de envio de notificações e validar expiração de tokens/datas.

---

### 4.3 Escolham uma função ou método que seja regra de negócio pura — algo que roda sem precisar de banco nem de rede. Copiem o nome e o arquivo. (Essa vai ser, provavelmente, a primeira coisa que vocês vão testar em 03/09.)

**RESPOSTA:**

* **Nome do método:** `validarFormatoEmail` (ou a função de formatação de XML em `exportarEventosXml`)
* **Arquivo:** `src/helpers/validacao.js` (ou `src/helpers/xmlHelper.js`)
* **Justificativa:** É um método que recebe apenas uma string/objeto de entrada e aplica expressões regulares ou regras de conversão em memória, retornando `true`/`false` ou a string formatada sem realizar chamadas de rede, IO de arquivos ou consultas ao banco.

---

### 4.4 Existe alguma parte do módulo que vocês não sabem explicar o que faz? Registrem qual. Não é demérito — é a primeira coisa que um responsável por qualidade precisa mapear ao assumir um sistema.

**RESPOSTA:**

A pasta `src/events/` e alguns middlewares da pasta `src/errors/`. Ainda precisamos mapear exatamente como os disparos de eventos assíncronos internos são acionados pelo `app.js` e como o manipulador de erros global intercepta exceções não tratadas antes de devolver a resposta HTTP.