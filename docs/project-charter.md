# Project Charter — API de Notificações

## 1. Nome do Projeto
API de Notificações por E-mail para Plataforma de Eventos

## 2. Objetivo
Desenvolver uma API REST que gerencie o envio de notificações por e-mail
(confirmação de inscrição e lembretes) para participantes de eventos.

## 3. Justificativa
Este projeto visa desenvolver uma API para automatizar notificações por e-mail em uma plataforma de eventos, melhorando a comunicação com participantes e facilitando a gestão de inscrições. Como parte da Situação de Aprendizagem do SENAI, contribui para o aprendizado prático em desenvolvimento back-end.


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
| Nome     | Função/Responsabilidade                                               |
| -------- | --------------------------------------------------------------------- |
| [Airam]  | [Líder do grupo, responsável pelos testes e pelos controllers/routes] |
| [João]   | [Responsável pelo deploy e Models/Migrations]                         |
| [Wesley] | [Responsável pela documentação e pelo service]                          |

## 6. Tecnologias
Node.js, Express.js, MySQL, Sequelize, Swagger, Nodemailer, Git/GitHub

## 7. Prazo
Início: 03/03/2026 | Entrega final: 23/06/2026

## 8. Critérios de Sucesso
- [ ] API funcional com todos os CRUDs
- [ ] Dados persistidos em MySQL
- [ ] Notificações por e-mail funcionando (simulado)
- [ ] Documentação Swagger completa
- [ ] Deploy realizado
- [ ] Apresentação aprovada
