# Teste de Integração — Bloco 4

**Data:** 26/05
**Testador:** Airam D' Avilla

| # | Teste | Resultado | Observação |
|---|---|---|---|
| 1 | GET /eventos (seed) | ✅ / ❌ | |
| 2 | POST /eventos | ✅ / ❌ | |
| 3 | POST /participantes | ✅ / ❌ | |
| 4 | POST /inscricoes | ✅ / ❌ | |
| 5 | Abrir MailPit no navegador | ✅ / ❌ | |
| 6 | GET /notificacoes | ✅ / ❌ | |
| 7 | POST /inscricoes | ✅ / ❌ | |
| 8 | PATCH /inscricoes/:id/cancelar | ✅ / ❌ | |
| 9 | Verificar e-mail de cancelamento | Abrir MailPit | E-mail de cancelamento |
| 10 | GET /notificacoes/estatisticas | ✅ / ❌ | total, enviadas, porTipo |
| 11 | POST /notificacoes/1/reenviar | ✅ / ❌ | 200 + e-mail no MailPit |
| 12 | GET /exportar/eventos/xml | ✅ / ❌ | XML válido |
| 13 | Exportar relatório | ✅ / ❌ | JSON com inscritos por evento |
| 14 | Upload de banner | ✅ / ❌ | Banner salvo |
| 15 | Swagger completo | ✅ / ❌ | Página funcional |
| 16 | **Reiniciar servidor** | ✅ / ❌ | `Ctrl+C` + `npm run dev` | — |
| 17 | Listar eventos | `GET /eventos` | Tudo persiste! |

**Problemas encontrados:**
- Reenviar a notificação
- Upload do Banner

**Correções feitas:**
- Ajustes no app.js (removido middleware desnecessário)
- Ajuste no notificacaoRoutes.js (atualizada documentação)