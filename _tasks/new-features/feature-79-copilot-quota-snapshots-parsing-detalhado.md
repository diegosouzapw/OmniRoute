# Feature 79 — Parsing Detalhado de Quota Snapshots do GitHub Copilot

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — `src/services/api/parsers/copilot.parser.ts`  
**Prioridade:** 🟡 Média  
**Impacto:** Visibilidade granular de cotas Copilot no dashboard de usage

---

## Motivação

Atualmente, o OmniRoute monitora limites de uso de providers via `src/lib/usage/fetcher.js`, mas **não parseia o campo `quota_snapshots`** da API interna do GitHub Copilot (`https://api.github.com/copilot_internal/user`). Isso significa que perdemos a oportunidade de mostrar ao usuário os três tipos de cota separados:

- **Chat** — completions interativas
- **Completions** — code completions (inline suggestions)
- **Premium Interactions** — uso de modelos premium (GPT-4, etc.)

Cada tipo tem seu próprio `percent_remaining` e `entitlement` (total permitido), permitindo que o usuário saiba exatamente **qual recurso** do Copilot está se esgotando.

---

## O que Ganhamos

1. **Visibilidade granular**: O usuário verá 3 barras de progresso separadas (Chat, Completions, Premium) ao invés de um indicador genérico
2. **Decisão de roteamento informada**: Se `premium_interactions` está baixo mas `completions` está cheio, podemos rotear para modelos não-premium
3. **Detecção de plano**: Distinguir entre Free, Pro, Business e Enterprise automaticamente
4. **Reset time**: Exibir quando cada cota será resetada

---

## ANTES (Situação Atual)

```javascript
// src/lib/usage/fetcher.js (simplificado)
// Apenas busca status genérico do Copilot, sem breakdown por tipo de cota
async function fetchCopilotUsage(connectionId) {
  const response = await fetch(COPILOT_URL, { headers });
  const data = await response.json();
  // Retorna apenas status de conexão, sem parsing de quotas detalhadas
  return { connected: true, plan: data.copilot_plan };
}
```

---

## DEPOIS (Implementação Proposta)

### 1. Adicionar constantes do endpoint

```javascript
// src/shared/constants/providers.js (adicionar)
export const COPILOT_ENTITLEMENT_URL = "https://api.github.com/copilot_internal/user";
export const COPILOT_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
```

### 2. Criar parser de quota snapshots

```javascript
// src/lib/usage/parsers/copilotQuota.js (NOVO)

/**
 * Detecta o plano do Copilot baseado em access_type_sku e copilot_plan
 * Referência: zero-limit/src/services/api/parsers/copilot.parser.ts
 */
export function detectCopilotPlan(payload) {
  const sku = (payload.access_type_sku || "").toLowerCase();
  const plan = (payload.copilot_plan || "").toLowerCase();

  if (sku.includes("enterprise") || plan === "enterprise") return "Enterprise";
  if (sku.includes("business") || plan === "business") return "Business";
  if (sku.includes("educational") || sku.includes("pro") || plan.includes("pro")) return "Pro";
  if (plan === "individual" && !sku.includes("free_limited")) return "Pro";
  if (sku.includes("free_limited") || sku === "free" || plan.includes("free")) return "Free";
  return payload.copilot_plan
    ? payload.copilot_plan.charAt(0).toUpperCase() + payload.copilot_plan.slice(1)
    : "Unknown";
}

/**
 * Parseia quota_snapshots da resposta da API do Copilot
 * Retorna array de { name, percentage, resetTime }
 */
export function parseCopilotQuotaSnapshots(payload) {
  const quotas = [];
  const resetDate =
    payload.quota_reset_date_utc || payload.quota_reset_date || payload.limited_user_reset_date;

  const quotaSnapshots = payload.quota_snapshots;
  if (quotaSnapshots) {
    const parseSnapshot = (name, snapshot, defaultTotal) => {
      if (!snapshot || snapshot.unlimited === true) return;
      let percentage = 100;

      if (typeof snapshot.percent_remaining === "number") {
        percentage = Math.min(100, Math.max(0, snapshot.percent_remaining));
      } else {
        const remaining = snapshot.remaining ?? 0;
        const total = snapshot.entitlement ?? defaultTotal;
        if (total > 0) {
          percentage = Math.min(100, Math.max(0, (remaining / total) * 100));
        }
      }

      quotas.push({
        name,
        percentage: Math.round(percentage),
        resetTime: resetDate || null,
      });
    };

    parseSnapshot("Chat", quotaSnapshots.chat, 50);
    parseSnapshot("Completions", quotaSnapshots.completions, 2000);
    parseSnapshot("Premium", quotaSnapshots.premium_interactions, 50);
  }

  // Fallback para contas de plano limitado
  if (quotas.length === 0) {
    const limitedQuotas = payload.limited_user_quotas;
    const monthlyQuotas = payload.monthly_quotas;
    if (limitedQuotas && monthlyQuotas) {
      const parseLimit = (name, remainingKey, totalKey) => {
        const remaining = limitedQuotas[remainingKey] ?? 0;
        const total = monthlyQuotas[totalKey] ?? 0;
        if (total > 0) {
          quotas.push({
            name,
            percentage: Math.round(Math.min(100, Math.max(0, (remaining / total) * 100))),
            resetTime: resetDate || null,
          });
        }
      };
      parseLimit("Chat", "chat", "chat");
      parseLimit("Completions", "completions", "completions");
    }
  }

  return quotas;
}
```

### 3. Integrar no ProviderLimitCard

O componente `src/app/(dashboard)/dashboard/usage/components/ProviderLimits/ProviderLimitCard.js` deve consumir essas quotas e renderizar barras de progresso individuais para cada tipo.

---

## Arquivos Afetados

| Arquivo                                                                  | Ação                                          |
| ------------------------------------------------------------------------ | --------------------------------------------- |
| `src/shared/constants/providers.js`                                      | Adicionar `COPILOT_ENTITLEMENT_URL` e headers |
| `src/lib/usage/parsers/copilotQuota.js`                                  | **NOVO** — Parser de quotas Copilot           |
| `src/lib/usage/fetcher.js`                                               | Integrar parser no fluxo de fetch             |
| `src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.js` | Adaptar rendering                             |

---

## Referência Direta

- Arquivo original: `zero-limit/src/services/api/parsers/copilot.parser.ts` (87 linhas)
- Lógica de plano: linhas 10-29
- Quota snapshots: linhas 37-60
- Fallback limited_user_quotas: linhas 62-78
