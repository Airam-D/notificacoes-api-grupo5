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
- **CORS** - Middleware para permitir requisições de diferentes origens

## 📁 Estrutura do Projeto

Abaixo está a organização dos diretórios e arquivos da nossa aplicação, separada por responsabilidades para facilitar a manutenção e escalabilidade:

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

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor em modo produção |
| `npm run dev` | Inicia o servidor com Nodemon (desenvolvimento) |

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)

### Passos para Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Airam-D/notificacoes-api-grupo5.git
   cd notificacoes-api-grupo5
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edite o arquivo `.env` com suas configurações (porta, ambiente, etc.)

4. **Inicie o servidor:**
   - Para desenvolvimento:
     ```bash
     npm run dev
     ```
   - Para produção:
     ```bash
     npm start
     ```

5. **Acesse a aplicação:**
   - **API Base:** [http://localhost:3000](http://localhost:3000)
   - **Documentação Swagger:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 📚 API Endpoints

A API possui os seguintes recursos principais:

### Eventos

- `GET /eventos` - Listar todos os eventos
- `GET /eventos/:id` - Buscar evento por ID
- `POST /eventos` - Criar novo evento
- `PUT /eventos/:id` - Atualizar evento
- `DELETE /eventos/:id` - Deletar evento

### Participantes

- `GET /participantes` - Listar todos os participantes
- `GET /participantes/:id` - Buscar participante por ID
- `POST /participantes` - Criar novo participante
- `PUT /participantes/:id` - Atualizar participante
- `DELETE /participantes/:id` - Deletar participante

### Inscrições

- `GET /inscricoes` - Listar todas as inscrições
- `GET /inscricoes/:id` - Buscar inscrição por ID
- `POST /inscricoes` - Criar nova inscrição
- `PUT /inscricoes/:id` - Atualizar inscrição
- `DELETE /inscricoes/:id` - Deletar inscrição

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do servidor
PORT=3000

# Ambiente
NODE_ENV=development
```

## 📖 Documentação Adicional

- [Postman Collection](./docs/postman-collection.json) - Coleção para testes da API
- [Project Charter](./docs/project-charter.md) - Carta do projeto
- [Estrutura WBS](./docs/wbs.md) - Work Breakdown Structure
- [Análise de Riscos](./docs/riscos.md) - Análise de riscos
- [Funções](./docs/funcoes.md) - Descrição das funções
- [Infraestrutura](./docs/infraestrutura.md) - Infraestrutura do projeto
- [Custos](./docs/custos.md) - Análise de custos

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 👥 Autores

- **Grupo 5** - Desenvolvimento da API de Notificações
- **SENAI** - Instituição de ensino