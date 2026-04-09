# Feature OQueElaFaz 11 — Spend Batch Writer e Reset Automático de Budget

**Origem:** padrão de escrita assíncrona/batch observado no LiteLLM  
**Prioridade:** P1  
**Impacto esperado:** menor I/O no SQLite e governança financeira previsível

---

## O que ela faz

Substitui atualização síncrona de custo por request por batch periódico, com reset automático de budgets (diário/semanal/mensal).

---

## Motivação

Escrita síncrona em alta frequência pressiona SQLite e pode impactar latência.

---

## O que ganhamos

1. Menor overhead de gravação
2. Budget controlado por ciclo
3. Menor risco de lock em disco sob alta carga

---

## Antes e Depois

## Antes

- custo gravado a cada request
- reset de budget manual

## Depois

- buffer em memória + flush periódico
- reset programado com trilha de auditoria

---

## Como fazer (passo a passo)

1. Criar `SpendBuffer` por chave/projeto com agregação.
2. Agendar flush a cada N segundos ou ao atingir lote.
3. Persistir em transação única por lote.
4. Implementar scheduler de reset por período configurado.
5. Criar log de auditoria de resets e flushes.

---

## Arquivos-alvo sugeridos

- `src/lib/usageDb.js`
- `src/lib/usageAnalytics.js`
- `src/lib/db/settings.js`
- `src/lib/db/apiKeys.js`
- `src/lib/schedulers/budgetReset.js`

---

## Critérios de aceite

- Flush em lote reduz número de writes por minuto.
- Reset automático executa no horário configurado.
- Nenhuma perda de contabilização em shutdown controlado.

---

## Riscos e mitigação

| Risco                           | Mitigação                                          |
| ------------------------------- | -------------------------------------------------- |
| Perda de buffer em crash        | flush em shutdown + checkpoint periódico           |
| atraso de visibilidade do custo | endpoint com custo parcial em memória + persistido |

---

## Métricas de sucesso

- writes/min no SQLite
- tempo de flush e tamanho médio de lote
- divergência entre custo bufferizado e persistido
