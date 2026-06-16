# 🔔 Notificações API

API REST para módulo de notificações por e-mail de uma plataforma de eventos.

![Node.js](https://img.shields.io/badge/Node.js-24+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MariaDB](https://img.shields.io/badge/MariaDB-11.x-blue)
![Deploy](https://img.shields.io/badge/Deploy-Servidor%20SENAI-blueviolet)

**🌐 URL de Produção:** 10.137.148.205
**📚 Documentação:** (<http://localhost:3000/api-docs/>)

---

## 📋 Sobre o Projeto

Sistema de notificações por e-mail para uma plataforma de eventos.
Quando um participante se inscreve em um evento, recebe automaticamente
um e-mail de confirmação. O sistema também envia notificações de cancelamento.

**Desenvolvido como projeto da SA2** — SENAI "Santo Paschoal Crepaldi"
Curso: Técnico em Desenvolvimento de Sistemas
UCs: Programação Back-End + Projetos de Software

### Equipe

- Airam D' Avilla Costa — [GitHub](https://github.com/Airam-D)
- João Marcelo Monteiro de Oliveira — [GitHub](https://github.com/us)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 24+
- MySQL 8.0 ou MariaDB 11+
- Git

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Airam-D/notificacoes-api-grupo5.git
   cd notificacoes-api-grupo5
   ```

---

## 📚 Rotas da API

### Eventos

<http://localhost:3000/routes/eventoRoutes>

### Participantes

<http://localhost:3000/routes/participanteRoutes>

### Inscrições

<http://localhost:3000/routes/inscricaoRoutes>

### Notificações

<http://localhost:3000/routes/notificacaoRoutes>

### Exportação

<http://localhost:3000/routes/exportRoutes>

---

## 🛠️ Tecnologias

| Tecnologia           | Finalidade                     |
| -------------------- | ------------------------------ |
| Node.js              | Runtime                        |
| Express.js           | Framework web                  |
| MariaDB              | Banco de dados                 |
| Sequelize            | ORM                            |
| Nodemailer + MailPit | Envio de e-mails (teste local) |
| Swagger              | Documentação                   |
| Multer               | Upload de arquivos             |

---

## 📁 Estrutura do Projeto

```
package.json
README.md
docs/
   custos.md
   funcoes.md
   infraestrutura.md
   postman-collection.json
   project-charter.md
   riscos.md
   wbs.md
   aulas/
      aula27-swagger-completo.md
      aula30-readme-testes-git.md
src/
   app.js
   server.js
   swagger.js
   controllers/
      EventoController.js
      inscricaoController.js
      ParticipanteController.js
   errors/
      AppError.js
   helpers/
      parseId.js
      validator.js
   middlewares/
      errorHandler.js
      logger.js
      notFound.js
      responseTime.js
   models/
      EventoModel.js
      inscricaoModel.js
      ParticipanteModel.js
   routes/
      eventoRoutes.js
      inscricaoRoutes.js
      participanteRoutes.js
      notificacaoRoutes.js
      exportRoutes.js
   services/
      EventoService.js
      InscricaoService.js
      ParticipanteService.js
   config/
      database.json
      upload.js
   database/
      migrations/
      seeders/
logs/
uploads/
package-lock.json (or yarn.lock)
```

---

## 🔧 Scripts Disponíveis

| Comando              | Descrição             |
| -------------------- | --------------------- |
| `npm start`          | Inicia em produção    |
| `npm run dev`        | Inicia com Nodemon    |
| `npm run db:migrate` | Executa migrations    |
| `npm run db:seed`    | Insere dados iniciais |
| `npm run db:reset`   | Recria banco completo |

---

## 📧 Sistema de Notificações

A API usa o **Padrão Observer** para disparar notificações automaticamente:

- ✅ Confirmação de inscrição
- ✅ Cancelamento de inscrição

Em desenvolvimento, e-mails são capturados pelo MailPit (servidor SMTP local na rede da sala).

---

## 📄 Licença

Projeto acadêmico — SENAI 2026