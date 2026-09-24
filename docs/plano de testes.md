## 4. Análise de Risco

### 4.2 Os 5 Maiores Riscos (em ordem de prioridade)
1. **Risco 1 — Falha no envio de e-mails/notificações:** O sistema não envia notificações após uma inscrição ou cancelamento (Probabilidade: 4, Impacto: 5).
2. **Risco 2 — Validação incorreta de IDs e dados de entrada:** Aceitação de IDs inválidos (como "12abc") ou dados malformatados (Probabilidade: 3, Impacto: 4).
3. **Risco 3 — Falha de persistência de dados:** Inscrições ou eventos não serem guardados após reiniciar o servidor (Probabilidade: 2, Impacto: 5).
4. **Risco 4 — Erro na exportação de relatórios (XML/JSON):** Ficheiros de exportação corrompidos ou malformatados (Probabilidade: 3, Impacto: 3).
5. **Risco 5 — Falha no upload de banners:** Erros ao carregar ficheiros de imagem nos eventos (Probabilidade: 2, Impacto: 2).

---

## 6. Critérios de Aceitação

### 6.2 Critérios de Qualidade de Código
- **Cobertura de Código:** Cobertura de linhas $\ge 60\%$ nos ficheiros da pasta `src/helpers/`.

---

## 9. Papéis e Responsabilidades

### 9.1 Responsável pelo Plano de Testes
- **Responsável:** Airam D' Avilla (ou o nome do elemento do grupo encarregue).