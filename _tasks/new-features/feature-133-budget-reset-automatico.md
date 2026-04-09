# Feature 133 — Budget Reset Automático

## Resumo

Implementar reset automático de budgets por API key em intervalos configuráveis (diário, semanal, mensal), sem necessidade de intervenção manual. Inclui notificação proativa quando o budget está próximo do limite.

## Motivação

O LiteLLM em `proxy/management_helpers/budget_reset_job.py` executa um job periódico (a cada 10-12 min) que verifica e reseta budgets expirados para keys, users e teams. No OmniRoute, `costRules.js` compara contra `dailyLimitUsd` mas:

- Não existe reset automático — o acúmulo diário é calculado on-demand via `getDailyTotal()`
- Não há conceito de `budget_reset_at` (data/hora do próximo reset)
- Não há notificação quando o warning threshold é atingido
- Não há suporte a períodos semanais/mensais com reset programado

## O que ganhamos

- **Zero manutenção**: Budgets resetam automaticamente no período configurado
- **Previsibilidade**: Clientes sabem exatamente quando o budget reseta
- **Alertas proativos**: Notificação quando 80% do budget é consumido
- **Controle granular**: Diário, semanal, mensal com horário de reset configurável

## Situação Atual (Antes)

```
API Key "demo-key-1" → dailyLimitUsd: $5.00
  → Custo hoje: $4.80
  → Meia-noite passa...
  → getDailyTotal() recalcula automaticamente porque filtra entries de hoje

  PROBLEMAS:
  - Sem aviso quando atingiu 80% ($4.00)
  - Sem suporte a "reseta toda segunda-feira" (semanal)
  - Sem suporte a "reseta dia 1 de cada mês" (mensal)
  - Sem campo budget_reset_at para o cliente consultar
  - Nenhum log de quando o reset aconteceu
```

## Situação Proposta (Depois)

```
API Key "demo-key-1" → dailyLimitUsd: $5.00, resetInterval: "daily", resetAt: "00:00"
  → Custo hoje: $4.00 (80%)
  → [ALERTA] "Warning: demo-key-1 atingiu 80% do budget diário ($4.00/$5.00)"
  → Custo atinge $5.00 → bloqueado
  → 00:00 UTC → BudgetResetJob executa
  → [LOG] "Budget reset: demo-key-1 — $5.00 → $0.00 (período: daily)"
  → API Key liberada para uso novamente

API Key "team-prod" → monthlyLimitUsd: $100.00, resetInterval: "monthly"
  → Reseta automaticamente no dia 1 de cada mês
  → Dashboard mostra: "Próximo reset: 2026-03-01T00:00:00Z"
```

## Especificação Técnica

### Configuração de Budget Ampliada

```javascript
// Extensão do BudgetConfig em costRules.js

/**
 * @typedef {Object} BudgetConfig
 * @property {number} dailyLimitUsd
 * @property {number} [monthlyLimitUsd]
 * @property {number} [weeklyLimitUsd]         // NOVO
 * @property {number} [warningThreshold=0.8]
 * @property {'daily'|'weekly'|'monthly'} [resetInterval='daily']  // NOVO
 * @property {string} [resetTime='00:00']       // NOVO — hora do reset (UTC)
 * @property {number} [budget_reset_at]         // NOVO — timestamp do próximo reset
 */
```

### Budget Reset Job

```javascript
// src/lib/jobs/budgetResetJob.js

import { loadAllBudgets, saveBudget, saveBudgetResetLog } from "../db/domainState.js";

const RESET_INTERVAL_MS = 10 * 60 * 1000; // Verificar a cada 10 minutos

export function startBudgetResetJob() {
  setInterval(async () => {
    try {
      const budgets = loadAllBudgets();
      const now = Date.now();

      for (const [keyId, config] of Object.entries(budgets)) {
        if (!config.budget_reset_at || now < config.budget_reset_at) continue;

        // Budget expirado — resetar
        const nextReset = calculateNextReset(config.resetInterval, config.resetTime);

        // Log do reset
        saveBudgetResetLog(keyId, {
          resetAt: now,
          previousSpend: getDailyTotal(keyId),
          interval: config.resetInterval,
          nextReset,
        });

        // Atualizar próximo reset
        config.budget_reset_at = nextReset;
        saveBudget(keyId, config);

        console.log(
          `[BudgetReset] Key ${keyId}: reset completed, next at ${new Date(nextReset).toISOString()}`
        );
      }
    } catch (err) {
      console.error("[BudgetReset] Job failed:", err.message);
    }
  }, RESET_INTERVAL_MS);
}

function calculateNextReset(interval, resetTime = "00:00") {
  const [hours, minutes] = resetTime.split(":").map(Number);
  const next = new Date();
  next.setUTCHours(hours, minutes, 0, 0);

  switch (interval) {
    case "daily":
      next.setUTCDate(next.getUTCDate() + 1);
      break;
    case "weekly":
      next.setUTCDate(next.getUTCDate() + (7 - next.getUTCDay()));
      break;
    case "monthly":
      next.setUTCMonth(next.getUTCMonth() + 1);
      next.setUTCDate(1);
      break;
  }
  return next.getTime();
}
```

### Notificação de Warning Threshold

```javascript
// Em costRules.js — checkBudget()

export function checkBudget(apiKeyId, additionalCost = 0) {
  const budget = getBudget(apiKeyId);
  if (!budget) return { allowed: true, dailyUsed: 0, dailyLimit: 0, warningReached: false };

  const dailyUsed = getDailyTotal(apiKeyId);
  const projectedTotal = dailyUsed + additionalCost;
  const warningReached = projectedTotal >= budget.dailyLimitUsd * budget.warningThreshold;

  // NOVO: Emitir evento de warning na primeira vez que threshold é cruzado
  if (warningReached && !budget._warningEmitted) {
    emitBudgetWarning(apiKeyId, {
      used: projectedTotal,
      limit: budget.dailyLimitUsd,
      percentage: ((projectedTotal / budget.dailyLimitUsd) * 100).toFixed(1),
      nextReset: budget.budget_reset_at,
    });
    budget._warningEmitted = true;
  }

  // ... resto da lógica existente
}
```

## Arquivos a Criar/Modificar

| Arquivo                          | Ação                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| `src/lib/jobs/budgetResetJob.js` | **NOVO** — Job periódico de reset                            |
| `src/domain/costRules.js`        | **MODIFICAR** — Adicionar resetInterval, emitir warnings     |
| `src/lib/db/domainState.js`      | **MODIFICAR** — Adicionar loadAllBudgets, saveBudgetResetLog |
| `src/server-init.js`             | **MODIFICAR** — Iniciar budgetResetJob                       |
| `src/app/api/keys/route.js`      | **MODIFICAR** — Aceitar config de reset no CRUD              |

## Critérios de Aceite

- [ ] Budgets diários resetam automaticamente à meia-noite UTC
- [ ] Budgets semanais resetam na segunda-feira
- [ ] Budgets mensais resetam no dia 1
- [ ] Warning é emitido quando threshold (80%) é atingido
- [ ] Log de cada reset é persistido no banco
- [ ] Dashboard exibe próximo horário de reset por key
- [ ] API GET /api/keys retorna `budget_reset_at` no response

## Referência

- [LiteLLM: proxy/management_helpers/budget_reset_job.py](https://github.com/BerriAI/litellm/blob/main/litellm/proxy/management_helpers/budget_reset_job.py)
- [LiteLLM: proxy/proxy_server.py](https://github.com/BerriAI/litellm/blob/main/litellm/proxy/proxy_server.py) — `initialize_scheduled_background_jobs()`
