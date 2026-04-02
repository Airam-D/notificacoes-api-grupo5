# Project Charter — API de Notificações

## 1. Nome do Projeto
API de Notificações por E-mail para Plataforma de Eventos

## 2. Objetivo
Desenvolver uma API REST que gerencie o envio de notificações por e-mail
(confirmação de inscrição e lembretes) para participantes de eventos.

## 3. Justificativa
[Por que este módulo é necessário? Que problema ele resolve?]

## 4. Escopo
### Incluído:
- CRUD de Eventos, Participantes e Inscrições
- Módulo de notificações por e-mail (simulado)
- Documentação com Swagger
- Deploy em plataforma de nuvem

### Não incluído:
- Autenticação de usuários
- Front-end
- Envio de SMS ou push notifications

## 5. Equipe
| Nome | Função/Responsabilidade |
|------|------------------------|
| [Airam] | [Líder do grupo, responsável pelos testes e pelos controllers/routes] |
| [João] | [Responsável pelo deploy e Models/Migrations] |
| [Wesley] | [Responsável pela documentação e ploservice] |

## 6. Tecnologias
Node.js, Express.js, MySQL, Sequelize, Swagger, Nodemailer, Git/GitHub

## 7. Prazo
Início: [data] | Entrega final: [data da apresentação]

## 8. Critérios de Sucesso
- [ ] API funcional com todos os CRUDs
- [ ] Dados persistidos em MySQL
- [ ] Notificações por e-mail funcionando (simulado)
- [ ] Documentação Swagger completa

- [ ] Deploy realizado
- [ ] Apresentação aprovada

## Matriz de Responsabilidades (RACI)
| Atividade | Airam | João | Wesley | 
|---|---|---|---|
| Models/Migrations | João R | Wesley C | Airam I |
| Controllers/Routes | Wesley I | Airam R | João C |
| Services | João C | Airam I | Wesley R |
| Documentação | Wesley R | Airam I |  João C |
| Testes Postman | João C | Airam R | Wesley I |
| Deploy | Wesley I | Airam C | João R |
**R** = Responsável | **A** = Aprovador | **C** = Consultado | **I** = Informado