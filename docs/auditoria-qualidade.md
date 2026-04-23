# Auditoria de Qualidade — Sprint 2

**Data:** [23/04/2026]
**Revisores:** João: revisou uma metade do projeto / Airam: revisou a outra metade do projeto

## Checklist de Qualidade

### Organização

- [ ] Estrutura de pastas segue o padrão MVC + Services
- [ ] Imports organizados (externos primeiro, internos depois)
- [ ] Nomes de variáveis e funções são claros e consistentes

### Tratamento de Erros

- [ ] Todos os controllers usam try/catch + next(erro)
- [ ] Erros retornam formato padronizado
- [ ] Erros do Sequelize são tratados no errorHandler

### Validações

- [ ] Todas as rotas POST/PUT têm validação
- [ ] E-mails são validados
- [ ] IDs são parseados corretamente

### Documentação

- [ ] Swagger cobre todas as rotas atuais
- [ ] README está atualizado
- [ ] .env.example tem todas as variáveis

### Git

- [ ] Todos os membros têm commits recentes
- [ ] Mensagens de commit são descritivas
- [ ] .gitignore está correto

## Dívidas Técnicas Encontradas

Dívida técnica é todo "atalho" que vocês tomaram no código que funciona agora mas vai dar
problema no futuro.

| #   | Descrição                                           | Arquivo   | Prioridade | Responsável   |
| --- | --------------------------------------------------- | --------- | ---------- | ------------- |
| 1   | EX: Aquele console.log('teste') que ficou no código | [arquivo] | Alta       | [Responsável] |
| 2   |                                                     |           |            |               |