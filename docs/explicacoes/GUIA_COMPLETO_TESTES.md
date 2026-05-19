# 📝 GUIA COMPLETO DE TESTES - Notificações API

## 🎯 TUDO QUE VOCÊ PODE TESTAR AGORA

---

## 🚀 TESTE RÁPIDO (5 minutos)

Se você quer apenas fazer um teste básico rapidamente:

```
1. POST /eventos (criar evento)
2. POST /participantes (criar participante)
3. POST /inscricoes (criar inscrição → gera notificação!)
4. GET /notificacoes (ver notificação criada)
5. POST /notificacoes/teste-email (testar e-mail com preview)
```

---

## 📦 SEÇÃO A: EVENTOS

### A1. Criar Evento

**Método:** `POST`  
**URL:** `http://localhost:3000/eventos`  
**Content-Type:** `application/json`

**Corpo (Body em JSON):**
```json
{
  "nome": "Workshop de Node.js",
  "descricao": "Aprenda Node.js do zero ao avançado",
  "data": "2025-08-15",
  "local": "SENAI - Sala 3",
  "capacidade": 30
}
```

**Resposta (sucesso 201):**
```json
{
  "id": 1,
  "nome": "Workshop de Node.js",
  "descricao": "Aprenda Node.js do zero ao avançado",
  "data": "2025-08-15T00:00:00.000Z",
  "local": "SENAI - Sala 3",
  "capacidade": 30,
  "banner": null,
  "createdAt": "2026-05-19T10:30:00.000Z",
  "updatedAt": "2026-05-19T10:30:00.000Z"
}
```

**Campos obrigatórios:** `nome`, `data`  
**Campos opcionais:** `descricao`, `local`, `capacidade`

---

### A2. Listar Todos os Eventos

**Método:** `GET`  
**URL:** `http://localhost:3000/eventos`  
**Body:** Deixe vazio

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Workshop de Node.js",
    ...
  },
  {
    "id": 2,
    "nome": "Palestra React",
    ...
  }
]
```

---

### A3. Buscar Evento por ID

**Método:** `GET`  
**URL:** `http://localhost:3000/eventos/1`  
**Body:** Deixe vazio

---

### A4. Atualizar Evento

**Método:** `PUT`  
**URL:** `http://localhost:3000/eventos/1`  
**Content-Type:** `application/json`

**Corpo (Body em JSON):**
```json
{
  "nome": "Workshop Avançado de Node.js",
  "capacidade": 50
}
```

**✅ O que acontece:**
- Evento é atualizado
- Log é registrado em `logs/app.log`
- Terminal mostra: `[OBSERVER] Evento #1 atualizado`

---

### A5. Deletar Evento

**Método:** `DELETE`  
**URL:** `http://localhost:3000/eventos/1`  
**Body:** Deixe vazio

**Resposta (sucesso):**
```json
{}
```

---

### A6. Upload de Banner para Evento

**Método:** `POST`  
**URL:** `http://localhost:3000/eventos/1/banner`  
**Content-Type:** `multipart/form-data` (NÃO JSON!)

**Corpo:** Form Data
- Key: `banner`
- Value: Selecione um arquivo de imagem (.jpg, .png, etc)

**Resposta (sucesso 200):**
```json
{
  "mensagem": "Banner atualizado com sucesso",
  "banner": "/uploads/banner-1.jpg"
}
```

---

## 👥 SEÇÃO B: PARTICIPANTES

### B1. Criar Participante

**Método:** `POST`  
**URL:** `http://localhost:3000/participantes`  
**Content-Type:** `application/json`

**Corpo (Body em JSON):**
```json
{
  "nome": "Ana Silva",
  "email": "ana@email.com"
}
```

**Resposta (sucesso 201):**
```json
{
  "id": 1,
  "nome": "Ana Silva",
  "email": "ana@email.com",
  "createdAt": "2026-05-19T10:30:00.000Z",
  "updatedAt": "2026-05-19T10:30:00.000Z"
}
```

**Campos obrigatórios:** `nome`, `email` (email deve ser válido)

---

### B2. Listar Todos os Participantes

**Método:** `GET`  
**URL:** `http://localhost:3000/participantes`  
**Body:** Deixe vazio

---

### B3. Buscar Participante por ID

**Método:** `GET`  
**URL:** `http://localhost:3000/participantes/1`  
**Body:** Deixe vazio

---

### B4. Atualizar Participante

**Método:** `PUT`  
**URL:** `http://localhost:3000/participantes/1`  
**Content-Type:** `application/json`

**Corpo (Body em JSON):**
```json
{
  "nome": "Ana Silva Santos",
  "email": "ana.silva@email.com"
}
```

---

### B5. Deletar Participante

**Método:** `DELETE`  
**URL:** `http://localhost:3000/participantes/1`  
**Body:** Deixe vazio

---

## 📝 SEÇÃO C: INSCRIÇÕES (COM NOTIFICAÇÕES AUTOMÁTICAS! ⭐)

### C1. Criar Inscrição ⭐ ISTO CRIA UMA NOTIFICAÇÃO AUTOMATICAMENTE!

**Método:** `POST`  
**URL:** `http://localhost:3000/inscricoes`  
**Content-Type:** `application/json`

**Corpo (Body em JSON):**
```json
{
  "eventoId": 1,
  "participanteId": 1
}
```

**Resposta (sucesso 201):**
```json
{
  "id": 1,
  "evento_id": 1,
  "participante_id": 1,
  "dataInscricao": "2026-05-19T10:30:00.000Z",
  "status": "confirmada",
  "createdAt": "2026-05-19T10:30:00.000Z",
  "updatedAt": "2026-05-19T10:30:00.000Z"
}
```

**✅ O que acontece automaticamente:**

1. **No Terminal:**
   ```
   [DEBUG] Inscrição criada: { id: 1, eventoId: 1, participanteId: 1 }
   [DEBUG] Emitindo evento inscricao:criada
   [OBSERVER] Nova inscrição detectada: #1
   [OBSERVER] Notificação #1 criada para ana@email.com
   ```

2. **No Banco de Dados:** Uma notificação é criada na tabela `notificacoes`

3. **No Arquivo de Log (`logs/app.log`):**
   ```
   [2026-05-19T10:30:00.123Z] ✓ Inscrição #1 criada (evento: 1, participante: 1)
   [2026-05-19T10:30:00.456Z] 📧 Notificação #1 criada (tipo: confirmacao, destinatário: ana@email.com)
   ```

**Campos obrigatórios:** `eventoId`, `participanteId`

---

### C2. Listar Todas as Inscrições

**Método:** `GET`  
**URL:** `http://localhost:3000/inscricoes`  
**Body:** Deixe vazio

---

### C3. Listar Inscrições por Evento

**Método:** `GET`  
**URL:** `http://localhost:3000/inscricoes/evento/1`  
**Body:** Deixe vazio

**Retorna todas as inscrições do evento #1**

---

### C4. Cancelar Inscrição

**Método:** `PATCH`  
**URL:** `http://localhost:3000/inscricoes/1/cancelar`  
**Body:** Deixe vazio ou `{}`

**Resposta:**
```json
{
  "id": 1,
  "evento_id": 1,
  "participante_id": 1,
  "status": "cancelada",
  ...
}
```

---

## 📧 SEÇÃO D: NOTIFICAÇÕES

### D1. Listar Todas as Notificações

**Método:** `GET`  
**URL:** `http://localhost:3000/notificacoes`  
**Body:** Deixe vazio

**Resposta:**
```json
[
  {
    "id": 1,
    "inscricao_id": 1,
    "tipo": "confirmacao",
    "destinatario_email": "ana@email.com",
    "assunto": "Inscrição confirmada: Workshop de Node.js",
    "conteudo": "Olá Ana Silva! Sua inscrição no evento \"Workshop de Node.js\" foi confirmada.",
    "data_envio": null,
    "enviada": false,
    "createdAt": "2026-05-19T10:30:00.000Z",
    "updatedAt": "2026-05-19T10:30:00.000Z",
    "inscricao": {
      "id": 1,
      "evento": {
        "nome": "Workshop de Node.js"
      },
      "participante": {
        "nome": "Ana Silva",
        "email": "ana@email.com"
      }
    }
  }
]
```

---

### D2. Enviar E-mail de Teste 📧 (COM PREVIEW!)

**Método:** `POST`  
**URL:** `http://localhost:3000/notificacoes/teste-email`  
**Content-Type:** `application/json`

**Corpo (Body em JSON):**
```json
{}
```

**OU deixe completamente vazio se a ferramenta permitir**

**Resposta (sucesso 200):**
```json
{
  "mensagem": "E-mail de teste enviado!",
  "previewUrl": "https://ethereal.email/message/WaX123abc456def..."
}
```

---

### ✅ COMO USAR O PREVIEW DE E-MAIL:

1. Receba a resposta com `previewUrl`
2. **Copie o link** da `previewUrl`
3. **Cole no navegador** (Ctrl+V, Enter)
4. **Você verá:**
   - O e-mail renderizado exatamente como o destinatário veria
   - Assunto do e-mail
   - Conteúdo HTML formatado
   - Links, imagens, etc
   - Opção de "View source" para ver HTML puro

**Exemplo de link:**
```
https://ethereal.email/message/WaX123abc456def789ghi...
```

---

## 💾 SEÇÃO E: EXPORTAÇÕES

### E1. Exportar Eventos em XML

**Método:** `GET`  
**URL:** `http://localhost:3000/exportar/eventos/xml`  
**Body:** Deixe vazio

**Resposta:** Arquivo XML
```xml
<?xml version="1.0" encoding="UTF-8"?>
<eventos>
  <evento>
    <id>1</id>
    <nome>Workshop de Node.js</nome>
    <descricao>Aprenda Node.js do zero</descricao>
    <data>2025-08-15T00:00:00.000Z</data>
    <local>SENAI</local>
    <capacidade>30</capacidade>
  </evento>
</eventos>
```

---

### E2. Exportar Eventos em JSON (Download)

**Método:** `GET`  
**URL:** `http://localhost:3000/exportar/eventos/json`  
**Body:** Deixe vazio

**Resultado:** Baixa arquivo `eventos.json` com todos os eventos em JSON

---

### E3. Exportar Inscrições em XML

**Método:** `GET`  
**URL:** `http://localhost:3000/exportar/inscricoes/xml`  
**Body:** Deixe vazio

**Resposta:** Arquivo XML com todas as inscrições

---

### E4. Relatório de Inscrições (JSON)

**Método:** `GET`  
**URL:** `http://localhost:3000/exportar/relatorio/inscricoes`  
**Body:** Deixe vazio

**Resposta:**
```json
{
  "geradoEm": "2026-05-19T10:30:00.000Z",
  "totalEventos": 2,
  "relatorio": [
    {
      "evento": "Workshop de Node.js",
      "data": "2025-08-15T00:00:00.000Z",
      "capacidade": 30,
      "totalInscritos": 2,
      "vagasRestantes": 28,
      "inscritos": [
        {
          "nome": "Ana Silva",
          "email": "ana@email.com",
          "status": "confirmada",
          "dataInscricao": "2026-05-19T10:30:00.000Z"
        },
        {
          "nome": "João Pereira",
          "email": "joao@email.com",
          "status": "confirmada",
          "dataInscricao": "2026-05-19T10:31:00.000Z"
        }
      ]
    }
  ]
}
```

---

### E5. Exportar Relatório em CSV (Download)

**Método:** `GET`  
**URL:** `http://localhost:3000/exportar/relatorio/inscricoes/csv`  
**Body:** Deixe vazio

**Resultado:** Baixa arquivo `inscricoes.csv` com formato:
```csv
ID,Evento,Data Evento,Participante,Email,Status,Data Inscricao
1,Workshop Node.js,2025-08-15,Ana Silva,ana@email.com,confirmada,2026-05-19
2,Workshop Node.js,2025-08-15,João Pereira,joao@email.com,confirmada,2026-05-19
```

---

## 📋 TABELA DE REFERÊNCIA RÁPIDA

| # | Ação | Método | URL | Body Type |
| - | - | - | - | - |
| 1 | Criar Evento | POST | `/eventos` | JSON |
| 2 | Listar Eventos | GET | `/eventos` | (vazio) |
| 3 | Buscar Evento | GET | `/eventos/1` | (vazio) |
| 4 | Atualizar Evento | PUT | `/eventos/1` | JSON |
| 5 | Deletar Evento | DELETE | `/eventos/1` | (vazio) |
| 6 | Upload Banner | POST | `/eventos/1/banner` | Form Data |
| 7 | Criar Participante | POST | `/participantes` | JSON |
| 8 | Listar Participantes | GET | `/participantes` | (vazio) |
| 9 | Buscar Participante | GET | `/participantes/1` | (vazio) |
| 10 | Atualizar Participante | PUT | `/participantes/1` | JSON |
| 11 | Deletar Participante | DELETE | `/participantes/1` | (vazio) |
| 12 | Criar Inscrição ⭐ | POST | `/inscricoes` | JSON |
| 13 | Listar Inscrições | GET | `/inscricoes` | (vazio) |
| 14 | Inscrições por Evento | GET | `/inscricoes/evento/1` | (vazio) |
| 15 | Cancelar Inscrição | PATCH | `/inscricoes/1/cancelar` | (vazio) |
| 16 | Listar Notificações | GET | `/notificacoes` | (vazio) |
| 17 | Teste E-mail 📧 | POST | `/notificacoes/teste-email` | JSON (`{}`) |
| 18 | Exportar Eventos XML | GET | `/exportar/eventos/xml` | (vazio) |
| 19 | Exportar Eventos JSON | GET | `/exportar/eventos/json` | (vazio) |
| 20 | Exportar Inscrições XML | GET | `/exportar/inscricoes/xml` | (vazio) |
| 21 | Relatório Inscrições JSON | GET | `/exportar/relatorio/inscricoes` | (vazio) |
| 22 | Relatório Inscrições CSV | GET | `/exportar/relatorio/inscricoes/csv` | (vazio) |

---

## ✅ PLANO DE TESTE COMPLETO (20 minutos)

### Passo 1: Criar Dados Base (2 min)
- [ ] **POST /eventos** - Criar 2 eventos diferentes
- [ ] **POST /participantes** - Criar 3 participantes

### Passo 2: Testar Inscrições + Notificações (3 min)
- [ ] **POST /inscricoes** - Criar 2 inscrições
- [ ] Verificar logs no terminal: `[OBSERVER] Nova inscrição detectada`
- [ ] **GET /notificacoes** - Verificar que notificações foram criadas

### Passo 3: Testar E-mail com Preview (3 min)
- [ ] **POST /notificacoes/teste-email** - Receber previewUrl
- [ ] Copiar o link da `previewUrl`
- [ ] Abrir no navegador (nova aba)
- [ ] Visualizar e-mail renderizado

### Passo 4: Testar Atualizações (2 min)
- [ ] **PUT /eventos/1** - Atualizar um evento
- [ ] **PUT /participantes/1** - Atualizar um participante

### Passo 5: Testar Exportações (4 min)
- [ ] **GET /exportar/eventos/xml** - Visualizar XML
- [ ] **GET /exportar/eventos/json** - Baixar JSON
- [ ] **GET /exportar/relatorio/inscricoes** - Ver relatório completo
- [ ] **GET /exportar/relatorio/inscricoes/csv** - Baixar CSV

### Passo 6: Testar Cancelamentos (2 min)
- [ ] **PATCH /inscricoes/1/cancelar** - Cancelar uma inscrição
- [ ] **GET /notificacoes** - Verificar status

### Passo 7: Verificar Logs (2 min)
- [ ] Abrir arquivo `logs/app.log`
- [ ] Verificar todas as ações registradas:
  - ✓ Inscrições criadas
  - ✓ Notificações criadas
  - ✓ Eventos atualizados
  - ✓ Inscrições canceladas

### Passo 8: Teste de Limpeza (OPCIONAL)
- [ ] **DELETE /eventos/1** - Deletar um evento
- [ ] **DELETE /participantes/1** - Deletar um participante
- [ ] Verificar logs das deleções

---

## 🔍 DICAS ÚTEIS

### Como saber qual ID usar?

Quando você **cria** um evento ou participante, a resposta inclui o `id`:

```json
{
  "id": 1,  ← Use este número!
  "nome": "Workshop",
  ...
}
```

Depois use esse `id` nas requisições que precisam dele:
- `GET /eventos/1` (o "1" é o ID)
- `PUT /eventos/1` (o "1" é o ID)
- `DELETE /eventos/1` (o "1" é o ID)

---

### Como copiar cURL para testar no terminal

1. Faça a requisição no Insomnia/Postman
2. Clique em **"Generate Code"** ou **"Code"**
3. Selecione **"cURL"**
4. Cole no PowerShell/Terminal

**Exemplo cURL:**
```bash
curl -X POST http://localhost:3000/eventos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Workshop Node.js",
    "descricao": "Aprenda Node",
    "data": "2025-08-15",
    "local": "SENAI",
    "capacidade": 30
  }'
```

---

## 🐛 ERROS COMUNS E SOLUÇÕES

### ❌ "Evento não encontrado"
**Causa:** Você está usando um ID que não existe  
**Solução:** Crie o evento primeiro e use o ID correto

### ❌ "Participante já inscrito neste evento"
**Causa:** O mesmo participante tentou se inscrever 2x no mesmo evento  
**Solução:** Use outro participante ou crie um novo

### ❌ "Sequelize ValidationError"
**Causa:** Dados inválidos no corpo (type error)  
**Solução:** Verifique:
- `eventoId` deve ser número, não string
- `participanteId` deve ser número, não string
- `data` deve ser formato YYYY-MM-DD
- `email` deve ser um e-mail válido

### ❌ "No arquivo encontrado" (no upload de banner)
**Causa:** Você esqueceu de selecionar um arquivo  
**Solução:** Mude para **Form Data** e selecione uma imagem

---

## 📝 REFERÊNCIA DE CAMPOS

### EVENTOS
```json
{
  "nome": "string (obrigatório)",
  "descricao": "string (opcional)",
  "data": "YYYY-MM-DD (obrigatório)",
  "local": "string (opcional)",
  "capacidade": "number (opcional)"
}
```

### PARTICIPANTES
```json
{
  "nome": "string (obrigatório)",
  "email": "string válido (obrigatório)"
}
```

### INSCRIÇÕES
```json
{
  "eventoId": "number (obrigatório)",
  "participanteId": "number (obrigatório)"
}
```

---

## 📊 FLUXO DE UM TESTE COMPLETO

```
┌─ Criar Evento (id = 1)
│
├─ Criar Participante (id = 1)
│
├─ POST /inscricoes
│  └─ Automaticamente cria Notificação (id = 1)
│     └─ E-mail preparado para envio
│
├─ GET /notificacoes
│  └─ Visualiza notificação criada
│
├─ POST /notificacoes/teste-email
│  └─ Recebe previewUrl
│     └─ Abre no navegador para visualizar
│
└─ GET /exportar/relatorio/inscricoes
   └─ Vê relatório com evento, inscrições e participantes
```

---

**Você está pronto para testar! 🚀 Bom teste!**
