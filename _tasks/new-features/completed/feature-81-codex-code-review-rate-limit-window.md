# Feature 80 — Parsing de Code Review Rate Limit Window do Codex (OpenAI)

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — `src/services/api/parsers/codex.parser.ts`  
**Prioridade:** 🟡 Média  
**Impacto:** Cobertura completa de rate limits do Codex CLI

---

## Motivação

A API de usage do Codex (`https://chatgpt.com/backend-api/wham/usage`) retorna **3 windows de rate limit**, mas nosso projeto atualmente parseia apenas 2 (5-hour e weekly). A terceira window — **code review** — é ignorada, o que pode causar falhas silenciosas quando o usuário esgota o limite de code review sem saber.

O zero-limit implementa o parsing completo das 3 windows no arquivo `codex.parser.ts`.

---

## O que Ganhamos

1. **Cobertura completa de rate limits**: O usuário vê os 3 limites (5h, semanal, code review)
2. **Roteamento proativo**: Se o limite de code review estiver esgotado, podemos rotear para outra conta ou provider
3. **Compatibilidade com planos Plus/Pro**: Diferentes planos têm limites de code review diferentes
4. **Informação de reset time**: Mostrar quando cada window reseta

---

## ANTES (Situação Atual)

```javascript
// Parsing de usage do Codex parseia apenas rate_limit.primary_window e secondary_window
// O campo code_review_rate_limit é ignorado
```

---

## DEPOIS (Implementação Proposta)

### Adicionar parsing do code_review_rate_limit

```javascript
// src/lib/usage/parsers/codexQuota.js (adicionar ao parser existente)

/**
 * Parseia a resposta de usage do Codex com as 3 windows completas
 * Referência: zero-limit/src/services/api/parsers/codex.parser.ts
 *
 * A resposta pode vir em dois formatos:
 * Formato 1 (nested): { rate_limit: { primary_window, secondary_window }, code_review_rate_limit: { primary_window } }
 * Formato 2 (flat):   { 5_hour_window, weekly_window, code_review_window }
 */
export function parseCodexFullUsage(payload) {
  if (!payload) return { limits: [], plan: "Unknown" };

  const plan = payload.plan_type || payload.planType || "Plus";
  const limits = [];

  const processWindow = (name, windowData) => {
    if (!windowData || typeof windowData !== "object") return;

    const usedPercent = windowData.used_percent ?? windowData.usedPercent;
    let percentage = 0;

    if (usedPercent !== null && usedPercent !== undefined) {
      // Inverter: API retorna % usado, queremos % restante
      percentage = Math.max(0, Math.min(100, 100 - usedPercent));
    } else {
      const remaining = windowData.remaining_count ?? windowData.remainingCount ?? 0;
      const total = windowData.total_count ?? windowData.totalCount ?? 1;
      percentage = Math.round((Number(remaining) / Math.max(Number(total), 1)) * 100);
    }

    let resetTime = null;
    const resetAt = windowData.reset_at ?? windowData.resetAt;
    const resetAfter = windowData.reset_after_seconds ?? windowData.resetAfterSeconds;

    if (resetAt && resetAt > 0) {
      resetTime = new Date(resetAt * 1000).toISOString();
    } else if (resetAfter && resetAfter > 0) {
      resetTime = new Date(Date.now() + resetAfter * 1000).toISOString();
    }

    limits.push({ name, percentage, resetTime });
  };

  // Formato 1: nested rate_limit
  if (payload.rate_limit && typeof payload.rate_limit === "object") {
    const rl = payload.rate_limit;
    processWindow("5-hour limit", rl.primary_window ?? rl.primaryWindow);
    processWindow("Weekly limit", rl.secondary_window ?? rl.secondaryWindow);
  } else {
    // Formato 2: flat
    processWindow("5-hour limit", payload["5_hour_window"] ?? payload.fiveHourWindow);
    processWindow("Weekly limit", payload["weekly_window"] ?? payload.weeklyWindow);
  }

  // *** NOVO: Code Review Rate Limit ***
  if (payload.code_review_rate_limit && typeof payload.code_review_rate_limit === "object") {
    const cr = payload.code_review_rate_limit;
    processWindow("Code review limit", cr.primary_window ?? cr.primaryWindow);
  } else {
    processWindow("Code review limit", payload["code_review_window"] ?? payload.codeReviewWindow);
  }

  return { plan, limits };
}
```

---

## Arquivos Afetados

| Arquivo                                                                  | Ação                                        |
| ------------------------------------------------------------------------ | ------------------------------------------- |
| `src/lib/usage/fetcher.js`                                               | Adicionar code_review_rate_limit ao parsing |
| `src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.js` | Renderizar 3ª barra para code review        |

---

## Dados da API de Referência

Estrutura da resposta `https://chatgpt.com/backend-api/wham/usage`:

```json
{
  "plan_type": "plus",
  "rate_limit": {
    "primary_window": {
      "used_percent": 45.2,
      "reset_at": 1739750400,
      "remaining_count": 27,
      "total_count": 50
    },
    "secondary_window": {
      "used_percent": 12.0,
      "reset_at": 1740355200,
      "remaining_count": 440,
      "total_count": 500
    }
  },
  "code_review_rate_limit": {
    "primary_window": {
      "used_percent": 0,
      "reset_at": 1739750400,
      "remaining_count": 10,
      "total_count": 10
    }
  }
}
```

---

## Referência Direta

- Arquivo original: `zero-limit/src/services/api/parsers/codex.parser.ts` (60 linhas)
- Code review parsing: linhas 51-56
- Window processing: linhas 15-40
