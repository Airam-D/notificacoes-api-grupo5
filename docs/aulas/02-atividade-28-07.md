# Atividade 1 — Contrato da API e Design Responsivo

**PEND — Programação Front-End** · 28/07/2026

---

## O desafio do semestre

No 3º semestre vocês construíram uma **API de Notificações**: Node.js, Express, MySQL, Sequelize e Nodemailer. Ela está rodando agora mesmo, no servidor da sala. Mas hoje ela só é acessível por quem sabe usar o Postman.

Neste semestre vocês vão construir a **interface** dela — em React — e ela vai precisar ser:

- **Responsiva** — usável em qualquer tamanho de tela
- **Acessível** — usável por qualquer pessoa
- **Instalável** — funcionar como aplicativo, mesmo sem internet
- **Capaz de notificar** — disparar notificação no dispositivo do usuário

Cada uma dessas palavras é um bloco do semestre. Todas se acumulam sobre o mesmo projeto.

---

## Parte 1 — O que é um Contrato de API

Quando o back-end e o front-end são construídos por pessoas diferentes, alguém precisa escrever **o acordo entre os dois lados**.

Esse acordo é o **contrato da API**. Para cada rota, ele responde cinco perguntas:

1. Qual o **método**? (GET, POST, PUT, DELETE)
2. Qual o **caminho**? (`/notificacoes`, `/notificacoes/:id`)
3. O que precisa ser **enviado**?
4. O que **volta** em caso de sucesso?
5. Quais **códigos de status** podem aparecer?

### Por que isso importa

**Desacoplamento.** Quem escreve o front-end não precisa saber se o banco é MySQL ou Postgres, se usa Sequelize ou SQL escrito na mão, ou como o Nodemailer foi configurado. Precisa saber apenas: _envio isso, recebo aquilo_.

**Estabilidade.** O back-end pode ser reescrito inteiro — trocar de banco, trocar de linguagem — sem quebrar uma linha do front-end, desde que o contrato continue valendo.

> No mercado, a forma padronizada de escrever contratos de API se chama **OpenAPI** (ou Swagger). É o mesmo conceito, num formato que ferramentas conseguem ler.

### O caso desta turma

As 8 APIs da turma foram padronizadas de propósito: **todas têm os mesmos endpoints**. Isso significa que existe **um único contrato** para a sala inteira.

E é aí que está a demonstração: ao longo do semestre vão nascer **8 front-ends completamente diferentes** — cores diferentes, layouts diferentes, decisões de UX diferentes — todos consumindo exatamente o mesmo contrato. Todos funcionando.

Isso é separação de responsabilidades funcionando na prática.

---

## Parte 2 — Validando sua API

Vamos montar o contrato coletivamente no projetor. Depois, cada grupo valida a própria API contra ele.

### Contrato coletivo da turma

| #   | Método | Rota | Corpo da requisição | Resposta (sucesso) | Status | Auth |
| --- | ------ | ---- | ------------------- | ------------------ | ------ | ---- |
| 1   |        |      |                     |                    |        |      |
| 2   |        |      |                     |                    |        |      |
| 3   |        |      |                     |                    |        |      |
| 4   |        |      |                     |                    |        |      |
| 5   |        |      |                     |                    |        |      |

### Validação (em grupo)

Abra o Postman/Insomnia, aponte para a **URL da API do seu grupo no servidor da sala** e teste **cada rota** do contrato.

Para cada uma, marque:

- ✅ **Confere** — comportamento idêntico ao contrato
- ⚠️ **Diverge** — funciona, mas diferente do combinado (rota, nome de campo, status)
- ❌ **Falha** — não responde ou retorna erro

Registre as divergências e falhas em uma **issue no repositório do grupo**.

> Encontrar divergência hoje é vitória, não problema. Cada uma que passar despercebida vai reaparecer em setembro, quando o React tentar consumir a rota e nada acontecer.

### Divisão sugerida no grupo

| Integrante | Responsabilidade                                          |
| ---------- | --------------------------------------------------------- |
| 1          | Confirmar que a API está no ar e anotar a URL             |
| 2          | Testar rotas de criação e envio                           |
| 3          | Testar rotas de listagem e consulta                       |
| 4          | Registrar divergências na issue e conferir a documentação |

---

## Parte 3 — Design Responsivo: fazendo a tela caber

### A meta tag que muda tudo

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Sem ela, o navegador do celular finge ter 980px de largura e depois encolhe a página inteira — o resultado é aquele site em que você precisa dar zoom para ler.

Com ela, o navegador assume a largura real do dispositivo, e o CSS passa a valer de verdade.

### Unidades relativas

Medidas fixas em `px` não se adaptam. Estas se adaptam:

| Unidade     | É relativa a                      | Quando usar                        |
| ----------- | --------------------------------- | ---------------------------------- |
| `%`         | tamanho do elemento pai           | largura de containers              |
| `rem`       | tamanho da fonte da raiz (`html`) | **tipografia e espaçamentos**      |
| `em`        | tamanho da fonte do elemento pai  | espaçamento interno de componentes |
| `vw` / `vh` | largura / altura da janela        | seções de tela cheia               |
| `ch`        | largura do caractere "0" da fonte | limitar largura de texto           |

**Regra prática:** por padrão, use `rem`. Use `em` só quando quiser que a medida acompanhe a fonte do componente. Mantenha `px` apenas em bordas e sombras.

**Cuidado com `em`:** ele é relativo ao pai, então valores aninhados se multiplicam. Três níveis de `1.2em` resultam em 1,728 — não 1,2.

---

## Parte 4 — Situação-problema

### Contexto

A tela de listagem de notificações foi construída com medidas fixas. Em uma largura de 360px, ela quebra: aparece barra de rolagem horizontal, o texto vaza do card e os botões saem da tela.

### Ponto de partida

Você vai receber uma tela pronta — `index.html`, `estilo.css` e `banner.png`. Ela funciona no monitor do laboratório e **quebra em tela estreita**: aparece barra de rolagem horizontal, o texto vaza dos cartões e os botões saem da tela.

Seu trabalho não é reconstruir. É **encontrar as causas e corrigir**.

### Sua tarefa

Converter essa tela em um layout **fluido**, usando exclusivamente o que foi visto hoje — viewport e unidades relativas.

Media queries são o assunto do próximo encontro. **Não use ainda.** A ideia é descobrir até onde dá para chegar só com fluidez — e onde ela deixa de ser suficiente.

### Como testar

Use o **modo responsivo do DevTools** (`F12` → ícone de dispositivo, ou `Ctrl+Shift+M`) ou a extensão **Mobile Simulator**. Teste em **360px, 768px e 1280px**.

Os celulares da escola estão disponíveis para conferir o resultado em tela real quando quiser.

### Requisitos

- [x] A meta tag `viewport` está presente e correta
- [x] Nenhuma largura de container está em `px`
- [x] Toda a tipografia está em `rem`
- [x] Nenhum container que contém texto tem altura fixa
- [x] Imagens não estouram o container (`max-width: 100%`)
- [x] A largura do texto corrido está limitada para permanecer legível
- [x] `user-scalable=no` **não** foi usado

### Critério de aceitação

A tela é aprovada quando **não existe barra de rolagem horizontal em 360, 768 e 1280px** e todo o conteúdo permanece legível.

---

## Checklist de encerramento — antes de sair da aula

Nada fica pendente para casa. Antes de encerrar, o repositório do grupo precisa ter:

- [x] Documentação da API conferida contra o contrato coletivo
- [x] Issue aberta com as divergências encontradas (ou registro de que não houve nenhuma)
- [x] Tela de listagem convertida para layout fluido
- [x] Prints das três larguras testadas
- [x] Push feito

---

## Para pensar até o próximo encontro

Layout fluido faz a tela **esticar e encolher**. Mas às vezes esticar não basta: um menu que funciona como barra horizontal no monitor precisa virar menu sanfonado numa tela estreita. Isso não é esticar — é **mudar de forma**.

Como o CSS decide fazer coisas diferentes dependendo do tamanho da tela?

É o que vocês vão resolver em 04/08.
