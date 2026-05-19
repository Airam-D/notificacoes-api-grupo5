# 📧 GUIA COMPLETO: ETHEREAL EMAIL SERVICE

## 🎯 O que é Ethereal?

**Ethereal** é um serviço de teste de e-mail **100% gratuito** que simula um servidor de e-mail real.

**Objetivo:** Testar envio de e-mails SEM enviar para pessoas reais.

---

## 🔄 Como Funciona o Fluxo

```
┌─────────────────────┐
│   Sua Aplicação     │
│  (notificacoes-api) │
└──────────┬──────────┘
           │
           │ POST /notificacoes/teste-email
           │
           ▼
┌─────────────────────┐
│  EmailService.js    │ ← Você criou isso!
│  (usa Nodemailer)   │
└──────────┬──────────┘
           │
           │ Conecta via SMTP
           │
           ▼
┌─────────────────────┐
│  Ethereal Server    │ ← Serviço de teste
│  (smtp.ethereal)    │
└──────────┬──────────┘
           │
           │ Simula envio
           │
           ▼
┌─────────────────────┐
│  Caixa de Entrada   │ ← ethereal.email
│  Virtual (Web)      │
└─────────────────────┘
           │
           │ Você acessa com o link Preview
           │
           ▼
┌─────────────────────┐
│  Navegador          │
│  (Visualiza Email)  │
└─────────────────────┘
```

---

## 🛠️ Configuração do EmailService

### Passo 1: Instalar Nodemailer

```bash
npm install nodemailer
```

### Passo 2: Criar Conta Ethereal (Automático!)

Quando você usa `nodemailer.createTestAccount()`, ele:
1. ✅ Cria uma conta de teste automática
2. ✅ Retorna e-mail e senha temporários
3. ✅ Valida se tudo está funcionando

### Passo 3: Arquivo EmailService.js

```javascript
const nodemailer = require('nodemailer');

let transporter = null;

async function inicializar() {
    if (transporter) return transporter;

    try {
        // Criar conta de teste automática (PRIMEIRA VEZ)
        const testAccount = await nodemailer.createTestAccount();

        console.log('[EMAIL] Conta de teste criada:');
        console.log('  Email:', testAccount.user);
        console.log('  Senha:', testAccount.pass);

        // Configurar transporter com a conta de teste
        transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,      // smtp.ethereal.email
            port: testAccount.smtp.port,      // 587
            secure: testAccount.smtp.secure,  // false
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        console.log('[EMAIL] Transporter configurado com sucesso!');
        return transporter;
    } catch (erro) {
        console.error('[EMAIL] Erro ao criar conta:', erro.message);
        throw erro;
    }
}

async function enviar(destinatario, assunto, conteudo) {
    try {
        const trans = await inicializar();

        // Enviar e-mail
        const info = await trans.sendMail({
            from: '"API de Notificações" <noreply@notificacoes.com>',
            to: destinatario,
            subject: assunto,
            html: conteudo,
        });

        console.log(`[EMAIL] E-mail enviado: ${info.messageId}`);

        // Gerar preview URL
        const previewUrl = nodemailer.getTestMessageUrl(info);

        console.log('[EMAIL] Preview:', previewUrl);

        return {
            messageId: info.messageId,
            previewUrl: previewUrl,
        };
    } catch (erro) {
        console.error('[EMAIL] Erro ao enviar:', erro.message);
        throw erro;
    }
}

module.exports = {
    enviar,
};
```

---

## 📊 Fluxo de Teste Passo a Passo

### ✅ Primeira Vez que Você Testa

```
1. Você faz: POST /notificacoes/teste-email
   ↓
2. EmailService.enviar() é chamado
   ↓
3. nodemailer.createTestAccount() executa
   ↓
4. ETHEREAL CRIA CONTA AUTOMÁTICA:
   - Email: xyz@ethereal.email
   - Senha: (gerada automaticamente)
   ↓
5. Nodemailer conecta ao servidor Ethereal
   ↓
6. E-mail é "enviado" (armazenado no Ethereal)
   ↓
7. Você recebe: previewUrl
   ↓
8. Você clica no link → Vê o e-mail no navegador!
```

### ✅ Próximas Vezes

```
1. nodemailer.createTestAccount() já sabe os dados
2. Reconecta com a mesma conta
3. Novo e-mail é armazenado
4. Você recebe novo previewUrl
5. Tudo funciona igual!
```

---

## 🌐 O que Você Vê no Ethereal (Web)

Quando você abre o `previewUrl`:

```
┌─────────────────────────────────────┐
│  ethereal.email                     │
├─────────────────────────────────────┤
│ [Bem-vindo] ← Assunto              │
│ From: API de Notificações           │
│ To: ana@email.com                   │
│ Date: 2026-05-19 10:30              │
├─────────────────────────────────────┤
│ CONTEÚDO HTML RENDERIZADO:          │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ Bem-vindo, Ana Silva! 🎉      │   │
│ │                               │   │
│ │ Sua conta foi criada com       │   │
│ │ sucesso na Plataforma.         │   │
│ │                               │   │
│ │ ✓ Se inscrever em eventos     │   │
│ │ ✓ Receber notificações        │   │
│ └───────────────────────────────┘   │
├─────────────────────────────────────┤
│ [View source] [HTML] [Plain text]   │
└─────────────────────────────────────┘
```

---

## 🎯 Vantagens do Ethereal

| Aspecto | Descrição |
| --- | --- |
| **✅ Grátis** | Sem custo, sem cartão de crédito |
| **✅ Automático** | Cria conta automaticamente |
| **✅ Seguro** | Nenhum e-mail real é enviado |
| **✅ Rápido** | Instantâneo, sem delay |
| **✅ Visualização** | Vê HTML renderizado no navegador |
| **✅ Teste Completo** | Simula servidor real 100% |
| **✅ Múltiplos E-mails** | Pode testar vários |
| **❌ Real** | Não envia para verdade (é teste!) |

---

## 📝 Configuração no .env (OPCIONAL)

Se você quiser guardar dados da conta:

```env
# .env
ETHEREAL_USER=xyz@ethereal.email
ETHEREAL_PASS=senha_gerada_automaticamente
```

Mas **NÃO é necessário** porque Ethereal cria automaticamente!

---

## 🧪 Como Testar AGORA

### Teste 1: Verificar se Ethereal está Funcionando

```bash
npm run dev
```

Terminal deve mostrar:
```
✓ Conexão com MySQL estabelecida
✓ Servidor rodando em http://localhost:3000
```

### Teste 2: Enviar E-mail de Teste

**No Insomnia/Postman:**

- **Método:** `POST`
- **URL:** `http://localhost:3000/notificacoes/teste-email`
- **Body:** `{}`

**Terminal deve mostrar:**
```
[EMAIL] Conta de teste criada:
  Email: abc123@ethereal.email
  Senha: xyz789abc

[EMAIL] Transporter configurado com sucesso!

[EMAIL] E-mail enviado: <message-id>

[EMAIL] Preview: https://ethereal.email/message/WaX...
```

**Resposta da API:**
```json
{
  "mensagem": "E-mail de teste enviado!",
  "previewUrl": "https://ethereal.email/message/WaX123..."
}
```

### Teste 3: Visualizar E-mail

1. **Copie o `previewUrl`** da resposta
2. **Cole no navegador** (Ctrl+V, Enter)
3. **Veja o e-mail renderizado!**

---

## 🔄 Cenários de Teste

### Cenário 1: Participante se Cadastra

```
1. POST /participantes
   Body: { "nome": "João", "email": "joao@email.com" }

2. Automaticamente:
   - Participante é criado
   - Evento 'participante:criado' é emitido
   - Observer boasVindasObserver escuta
   - E-mail é enviado via Ethereal
   
3. Terminal mostra:
   [BOAS-VINDAS] Enviando e-mail...
   [EMAIL] E-mail enviado
   [EMAIL] Preview: https://...
   
4. Você clica no link e VÊ o e-mail!
```

### Cenário 2: Inscrição em Evento

```
1. POST /inscricoes
   Body: { "eventoId": 1, "participanteId": 1 }

2. Automaticamente:
   - Inscrição é criada
   - Notificação é criada
   - Observer notificacaoObserver escuta
   - E-mail de confirmação é preparado
   
3. Para visualizar o e-mail de inscrição:
   - POST /notificacoes/teste-email
   - Clique no preview
```

---

## ⚙️ Configuração Técnica (Detalhes)

### SMTP do Ethereal

```javascript
{
    host: 'smtp.ethereal.email',  // Servidor SMTP
    port: 587,                     // Porta TLS
    secure: false,                 // TLS (não SSL)
    auth: {
        user: 'xyz@ethereal.email',      // Gerado automaticamente
        pass: 'senha_gerada_automaticamente'  // Gerado automaticamente
    }
}
```

### Formato do E-mail

```javascript
{
    from: '"API de Notificações" <noreply@notificacoes.com>',
    to: 'ana@email.com',
    subject: 'Bem-vindo!',
    html: '<h1>Bem-vindo!</h1><p>...</p>'
}
```

---

## 📚 Estrutura de Pastas

```
notificacoes-api-grupo5/
├── src/
│   ├── services/
│   │   └── EmailService.js ← Arquivo principal
│   ├── events/
│   │   ├── boasVindasObserver.js ← Envia boas-vindas
│   │   └── notificacaoObserver.js ← Envia confirmações
│   └── routes/
│       └── notificacaoRoutes.js ← POST /teste-email
├── .env
└── package.json
```

---

## 🐛 Troubleshooting

### ❌ "Cannot find module 'nodemailer'"
**Solução:** 
```bash
npm install nodemailer
```

### ❌ "ECONNREFUSED - Cannot connect to Ethereal"
**Solução:** 
- Verificar conexão com internet
- Ethereal está sempre disponível
- Reiniciar servidor: `npm run dev`

### ❌ "E-mail não recebe previewUrl"
**Solução:**
- Verificar se EmailService.js está em `src/services/`
- Verificar se está importado em `notificacaoRoutes.js`
- Ver logs do terminal

### ❌ "Preview URL abre em branco"
**Solução:**
- Copia URL completa (com https://)
- Abre em aba privada/anônima
- Tenta em outro navegador

---

## 📊 CHECKLIST COMPLETO

### ✅ FASE 1: VERIFICAÇÃO BÁSICA

- [ ] **Nodemailer instalado?**
  ```bash
  npm list nodemailer
  ```
  Deve mostrar: `nodemailer@versão`

- [ ] **EmailService.js existe?**
  - Caminho: `src/services/EmailService.js`
  - Tem as funções: `inicializar()` e `enviar()`

- [ ] **boasVindasObserver.js existe?**
  - Caminho: `src/events/boasVindasObserver.js`
  - Está registrado em `app.js`?
  ```javascript
  require('./events/boasVindasObserver');
  ```

- [ ] **notificacaoRoutes.js tem POST /teste-email?**
  - Deve importar EmailService
  - Deve chamar `EmailService.enviar()`

---

### ✅ FASE 2: TESTES DE FUNCIONAMENTO

- [ ] **Servidor inicia sem erros?**
  ```bash
  npm run dev
  ```
  Deve mostrar:
  ```
  ✓ Conexão com MySQL estabelecida
  ✓ Servidor rodando em http://localhost:3000
  ```

- [ ] **POST /notificacoes/teste-email retorna 200?**
  - Abra Insomnia/Postman
  - POST para `http://localhost:3000/notificacoes/teste-email`
  - Body: `{}`
  - Status: 200 OK

- [ ] **Resposta tem previewUrl?**
  - Deve conter: `"previewUrl": "https://ethereal.email/message/..."`
  - URL começa com `https://ethereal.email`

- [ ] **Terminal mostra logs do Ethereal?**
  Deve mostrar:
  ```
  [EMAIL] Conta de teste criada
  [EMAIL] E-mail enviado
  [EMAIL] Preview: https://...
  ```

---

### ✅ FASE 3: TESTES DE VISUALIZAÇÃO

- [ ] **Preview URL abre no navegador?**
  - Copie o `previewUrl` da resposta
  - Cole no navegador
  - Deve abrir página do Ethereal

- [ ] **E-mail renderizado corretamente?**
  - Vê o assunto ("Teste da API")
  - Vê o conteúdo HTML formatado
  - Vê o "From" e "To"

- [ ] **HTML está bem formatado?**
  - Títulos aparecem maiores
  - Parágrafos com espaçamento
  - Links clicáveis (se houver)

---

### ✅ FASE 4: TESTES DE INTEGRAÇÃO

- [ ] **Participante criado envia e-mail?**
  - POST `/participantes`
  - Body: `{ "nome": "Test", "email": "test@email.com" }`
  - Terminal mostra logs de boas-vindas

- [ ] **E-mail de boas-vindas tem conteúdo correto?**
  - Contém o nome do participante
  - Contém o e-mail
  - Tem formatação HTML

- [ ] **Inscrição gera notificação com e-mail?**
  - POST `/inscricoes`
  - Observer notificacaoObserver cria notificação
  - E-mail pode ser visualizado

- [ ] **Logs registram tudo?**
  - Abra `logs/app.log`
  - Deve ter:
    ```
    ✓ Participante criado
    💌 E-mail de boas-vindas enviado
    ✓ Inscrição criada
    📧 Notificação criada
    ```

---

### ✅ FASE 5: TESTES DE ERRO (OPCIONAL)

- [ ] **Sem conexão internet - Ethereal falha?**
  - Desconecte internet
  - Tente enviar e-mail
  - Deve mostrar erro de conexão

- [ ] **E-mail inválido - Funciona mesmo assim?**
  - POST com e-mail "invalido@"
  - Ethereal aceita (é teste!)
  - Preview funciona

- [ ] **Múltiplos e-mails - Todos aparecem?**
  - Envie 3 e-mails seguidos
  - Cada um gera previewUrl diferente
  - Todos têm IDs únicos

---

### ✅ FASE 6: VERIFICAÇÃO FINAL

- [ ] **Tudo funciona conforme esperado?**

- [ ] **Documentação está completa?**
  - README.md atualizado
  - GUIA_COMPLETO_TESTES.md existe

- [ ] **Logs são informativos?**
  - Terminal mostra progresso
  - `logs/app.log` tem registros

- [ ] **Código está limpo?**
  - Sem console.log desnecessários
  - Sem erros no terminal

---

## 🎓 Resumo do Aprendizado

```
VOCÊ APRENDEU:

1. ✅ O que é Ethereal
   └─ Serviço de teste de e-mail

2. ✅ Como funciona Nodemailer
   └─ Biblioteca para enviar e-mails

3. ✅ Criar EmailService
   └─ Classe que centraliza envio

4. ✅ Implementar Observers
   └─ Enviar e-mail quando evento ocorre

5. ✅ Testar com Preview
   └─ Visualizar e-mail no navegador

6. ✅ Integrar com sua API
   └─ Boas-vindas, notificações, etc
```

---

## 🚀 Próximos Passos

```
Depois de Ethereal:

1. Migrar para Email Real
   └─ Gmail, SendGrid, AWS SES, etc

2. Armazenar E-mails Enviados
   └─ Salvar em tabela do banco

3. Retry Automático
   └─ Reenviar se falhar

4. Templates de E-mail
   └─ Arquivos .html reutilizáveis

5. Fila de E-mails
   └─ Bull, RabbitMQ para envios assíncronos
```

---

## 📞 SUPORTE ETHEREAL

- **Website:** https://ethereal.email
- **Docs:** https://nodemailer.com/smtp/testing/
- **Grátis:** 100% gratuito
- **Sem Limite:** Testes infinitos

---

**Você está pronto para testar e-mails! 🎉**

