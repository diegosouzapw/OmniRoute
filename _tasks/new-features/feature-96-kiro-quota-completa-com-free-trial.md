# Feature 85 — Parsing Completo de Quota Kiro com Free Trial e Usage Breakdown

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — `src/services/api/parsers/kiro.parser.ts`  
**Prioridade:** 🟡 Média  
**Impacto:** Cobertura completa de quotas do Kiro (CodeWhisperer) com suporte a free trial

---

## Motivação

A API de usage do Kiro (CodeWhisperer) retorna uma estrutura complexa com:

1. **`usageBreakdownList`** — Lista de categorias de uso (ex: "Agentic Requests", "Code Generations")
2. **`freeTrialInfo`** — Informações de trial gratuito ativo (com limite e expiração separados)
3. **`subscriptionInfo`** — Dados do plano de assinatura
4. **`userInfo`** — Email do usuário

O zero-limit parseia todos esses campos, criando quotas separadas para "Base" e "Bonus" (trial) com contagem regressiva de reset por categoria. O OmniRoute atualmente não parseia essa estrutura detalhada, perdendo a oportunidade de:

- Mostrar quotas separadas por categoria (agente vs code generation)
- Detectar se o usuário tem um free trial ativo
- Mostrar o tempo até o reset/expiração do trial

---

## O que Ganhamos

1. **Quotas por categoria**: "Agentic Requests" separado de "Code Generations"
2. **Detecção de free trial**: Mostrar quotas bonus separadas das base
3. **Reset time granular**: Cada categoria tem seu próprio `nextDateReset`
4. **Plano e email**: Extrair `subscriptionTitle` e `userInfo.email`
5. **Roteamento otimizado**: Priorizar contas com mais quota restante por categoria

---

## ANTES (Situação Atual)

```javascript
// Provavelmente parseamos apenas o status da conexão Kiro
// Sem breakdown por categoria de uso ou detecção de trial
```

---

## DEPOIS (Implementação Proposta)

### Parser completo de quota Kiro

```javascript
// src/lib/usage/parsers/kiroQuota.js (NOVO)

/**
 * Formata um timestamp Unix (segundos) em uma string relativa
 * Ex: 1739750400 → "2d 5h" ou "12h 30m"
 */
function formatTimeUntilReset(unixSeconds) {
  if (!unixSeconds) return null;

  const resetDate = new Date(unixSeconds * 1000);
  const now = new Date();
  const diffMs = resetDate.getTime() - now.getTime();

  if (diffMs <= 0) return "Ready";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/**
 * Parseia a resposta completa da API getUsageLimits do Kiro/CodeWhisperer.
 *
 * Estrutura esperada do payload:
 * {
 *   subscriptionInfo: { subscriptionTitle: "..." },
 *   userInfo: { email: "..." },
 *   usageBreakdownList: [
 *     {
 *       displayName: "Agentic Request",
 *       displayNamePlural: "Agentic Requests",
 *       resourceType: "AGENTIC_REQUEST",
 *       currentUsage: 5,        (ou currentUsageWithPrecision)
 *       usageLimit: 25,         (ou usageLimitWithPrecision)
 *       nextDateReset: 1739750400,
 *       freeTrialInfo: {
 *         freeTrialStatus: "ACTIVE",
 *         currentUsage: 2,
 *         usageLimit: 10,
 *         freeTrialExpiry: 1740355200
 *       }
 *     }
 *   ]
 * }
 *
 * @param {Object} payload - Resposta da API
 * @returns {Object} { models: QuotaModel[], plan, email }
 */
export function parseKiroQuota(payload) {
  if (!payload) return { models: [], plan: "Unknown" };

  const models = [];
  const subscriptionInfo = payload.subscriptionInfo;
  const plan = subscriptionInfo?.subscriptionTitle || "Standard";

  const breakdownList = payload.usageBreakdownList;
  if (Array.isArray(breakdownList)) {
    for (const breakdown of breakdownList) {
      const displayName = breakdown.displayName || breakdown.resourceType || "Usage";
      const displayNamePlural = breakdown.displayNamePlural || `${displayName}s`;

      // Reset time do breakdown
      const nextReset = breakdown.nextDateReset || payload.nextDateReset;
      const resetTimeStr = formatTimeUntilReset(nextReset);

      // === Free Trial Info (se trial ativo) ===
      const freeTrialInfo = breakdown.freeTrialInfo;
      const hasActiveTrial = freeTrialInfo?.freeTrialStatus === "ACTIVE";

      if (hasActiveTrial && freeTrialInfo) {
        const used = Math.round(
          freeTrialInfo.currentUsageWithPrecision ?? freeTrialInfo.currentUsage ?? 0
        );
        const total = Math.round(
          freeTrialInfo.usageLimitWithPrecision ?? freeTrialInfo.usageLimit ?? 0
        );
        const remaining = total - used;

        let percentage = 0;
        if (total > 0) {
          percentage = Math.max(0, Math.round((remaining / total) * 100));
        }

        // Trial expiry separado
        const trialResetStr = formatTimeUntilReset(freeTrialInfo.freeTrialExpiry);

        models.push({
          name: `Bonus ${displayNamePlural}`,
          percentage,
          resetTime: trialResetStr,
          used,
          total,
          isTrial: true,
        });
      }

      // === Quota Regular ===
      const regularUsed = Math.round(
        breakdown.currentUsageWithPrecision ?? breakdown.currentUsage ?? 0
      );
      const regularTotal = Math.round(
        breakdown.usageLimitWithPrecision ?? breakdown.usageLimit ?? 0
      );

      if (regularTotal > 0) {
        const regularRemaining = regularTotal - regularUsed;
        const percentage = Math.max(0, Math.round((regularRemaining / regularTotal) * 100));
        const quotaName = hasActiveTrial ? `Base ${displayNamePlural}` : displayNamePlural;

        models.push({
          name: quotaName,
          percentage,
          resetTime: resetTimeStr,
          used: regularUsed,
          total: regularTotal,
          isTrial: false,
        });
      }
    }
  }

  // Fallback se nenhuma quota foi encontrada
  if (models.length === 0) {
    models.push({ name: "kiro-standard", percentage: 100, resetTime: null });
  }

  const email = payload.userInfo?.email;

  return { models, plan, email };
}
```

---

## Exemplo de Resposta da API

```json
{
  "subscriptionInfo": {
    "subscriptionTitle": "Kiro Pro"
  },
  "userInfo": {
    "email": "user@example.com"
  },
  "nextDateReset": 1739750400,
  "usageBreakdownList": [
    {
      "displayName": "Agentic Request",
      "displayNamePlural": "Agentic Requests",
      "resourceType": "AGENTIC_REQUEST",
      "currentUsage": 8,
      "usageLimit": 25,
      "nextDateReset": 1739750400,
      "freeTrialInfo": {
        "freeTrialStatus": "ACTIVE",
        "currentUsage": 3,
        "usageLimit": 15,
        "freeTrialExpiry": 1740355200
      }
    },
    {
      "displayName": "Code Generation",
      "displayNamePlural": "Code Generations",
      "resourceType": "CODE_GENERATION",
      "currentUsage": 120,
      "usageLimit": 500,
      "nextDateReset": 1739750400
    }
  ]
}
```

Resultado parseado:

| Nome                   | % Restante    | Reset                |
| ---------------------- | ------------- | -------------------- |
| Bonus Agentic Requests | 80% (12/15)   | 5d 2h (trial expiry) |
| Base Agentic Requests  | 68% (17/25)   | 2d 8h                |
| Code Generations       | 76% (380/500) | 2d 8h                |

---

## Arquivos Afetados

| Arquivo                                                          | Ação                         |
| ---------------------------------------------------------------- | ---------------------------- |
| `src/lib/usage/parsers/kiroQuota.js`                             | **NOVO** — Parser completo   |
| `src/lib/usage/fetcher.js`                                       | Integrar novo parser         |
| `src/shared/constants/providers.js`                              | Atualizar URL e headers Kiro |
| `src/app/(dashboard)/dashboard/usage/components/ProviderLimits/` | Renderizar quotas Kiro       |

---

## Referência Direta

- Arquivo original: `zero-limit/src/services/api/parsers/kiro.parser.ts` (89 linhas)
- Free trial parsing: linhas 31-62
- Regular usage: linhas 64-77
- Suspended detection: ver feature-81
