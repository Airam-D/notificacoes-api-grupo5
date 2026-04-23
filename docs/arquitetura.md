# Documentação de Arquitetura — API de Notificações

## 1. Visão Geral

A API de Notificações é um módulo back-end REST responsável por gerenciar o envio
de notificações por e-mail para participantes de eventos em uma plataforma de eventos.

## 2. Arquitetura em Camadas

Cliente (Postman/Browser)
│
▼
[Middlewares] → express.json, cors, responseTime, cacheMiddleware
│
▼
[Routes] → Mapeamento de URLs para Controllers
│
▼
[Controllers] → Recebe req, chama Service, monta res
│
▼
[Services] → Validação, regras de negócio
│
▼
[Models (Sequelize)] → Acesso ao banco de dados
│
▼
[MySQL] → Persistência

## 3. Entidades e Relacionamentos

| Entidade     | Tabela        | Descrição                          |
| ------------ | ------------- | ---------------------------------- |
| Evento       | eventos       | Representa um evento na plataforma |
| Participante | participantes | Pessoa cadastrada                  |
| Inscrição    | inscricoes    | Relação participante ↔ evento      |
| Notificação  | notificacoes  | E-mail enviado ou a enviar         |

### Relacionamentos:

- Evento 1 → N Inscrição
- Participante 1 → N Inscrição
- Inscrição 1 → N Notificação

## 4. Endpoints da API

### Eventos

| Método | Rota                | Descrição         |
| ------ | ------------------- | ----------------- |
| GET    | /eventos            | Listar (paginado) |
| GET    | /participantes/:id  | Buscar por ID     |
| POST   | /inscricoes         | Criar             |
| PUT    | /inscricoes/:id     | Atualizar         |
| DELETE | /participantes/:id  | Deletar           |
| POST   | /eventos/:id/banner | Upload de imagem  |


## 5. Tecnologias e Justificativa

| Tecnologia | Justificativa                                          |
| ---------- | ------------------------------------------------------ |
| Node.js    | Runtime JavaScript no servidor, conhecimento da equipe |
| Express.js | Framework minimalista e flexível                       |
| MySQL      | Banco relacional, sinergia com UC de BD                |
| Sequelize  | ORM que abstrai SQL, facilita migrations               |

## 6. Estrutura de Pastas

```
src/
├── app.js              # Configuração principal da aplicação Express
├── server.js           # Ponto de entrada do servidor
├── swagger.js          # Configuração da documentação Swagger
├── controllers/        # Controladores da API (lógica de rotas)
│   ├── EventoController.js
│   ├── ParticipanteController.js
│   └── inscricaoController.js
├── services/           # Serviços (lógica de negócio)
│   ├── EventoService.js
│   ├── InscricaoService.js
│   └── ParticipanteService.js
├── models/             # Modelos de dados
│   ├── EventoModel.js
│   ├── inscricaoModel.js
│   └── ParticipanteModel.js
├── routes/             # Definição das rotas da API
│   ├── eventoRoutes.js
│   ├── inscricaoRoutes.js
│   └── participanteRoutes.js
├── middlewares/        # Middlewares personalizados
│   ├── errorHandler.js
│   ├── logger.js
│   ├── notFound.js
│   └── responseTime.js
├── errors/             # Tratamento de erros
│   └── AppError.js
└── helpers/            # Funções auxiliares
    ├── parseId.js
    └── validator.js

docs/                   # Documentação adicional
├── custos.md
├── funcoes.md
├── infraestrutura.md
├── postman-collection.json
├── project-charter.md
├── riscos.md
└── wbs.md
```

## Breve Descrição dos Diretórios (Opcional para seu .md)

Caso queira adicionar um contexto extra no seu arquivo de arquitetura, aqui está uma sugestão:

* **`helpers/`**: Funções utilitárias e de suporte (ex: validações e tratamento de IDs).
* **`middlewares/`**: Interceptadores de requisições (ex: log, tratamento de erros e 404).
* **`models/`**: Definição dos esquemas de dados e comunicação com o banco de dados.
* **`routes/`**: Definição dos endpoints da API e vinculação com os serviços.
* **`services/`**: Camada de lógica de negócio da aplicação.
* **`app.js`**: Configuração central do Express.
* **`server.js`**: Ponto de entrada que inicializa o servidor.
* **`swagger.js`**: Configuração da documentação da API.

## 7. Variáveis de Ambiente

| Variável | Descrição         | Exemplo         |
| -------- | ----------------- | --------------- |
| PORT     | Porta do servidor | 3000            |
| DB_HOST  | Host do MySQL     | localhost       |
| DB_NAME  | Nome do banco     | notificacoes_db |
| ...      | ...               | ...             |

> **Capacidade técnica exercitada:** 9 (documentação técnica do sistema)
> 
### Tempo restante: trabalho técnico

Use o tempo restante da aula para avançar no projeto PBE (persistência, banco de dados).