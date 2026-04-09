# Feature 83 — Detecção Automática de Plano Copilot (Free/Pro/Business/Enterprise)

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — `src/services/api/parsers/copilot.parser.ts` (linhas 10-29)  
**Prioridade:** 🟡 Média  
**Impacto:** Roteamento e limites diferenciados por plano do Copilot

---

## Motivação

A API do GitHub Copilot (`/copilot_internal/user`) retorna dois campos que indicam o plano do usuário:

- `access_type_sku` — String com o SKU do plano (ex: `copilot_for_business_seat`, `copilot_free_limited`)
- `copilot_plan` — String com o nome do plano (ex: `business`, `individual`)

O zero-limit implementa uma lógica robusta de detecção combinando ambos os campos para determinar o plano correto. O OmniRoute atualmente não faz essa distinção, o que impede:

1. Aplicar limites de quota diferenciados por plano
2. Exibir o tipo de plano no dashboard
3. Rotear preferencialmente para contas enterprise (que têm mais quota)

---

## O que Ganhamos

1. **Roteamento por tier**: Priorizar contas Enterprise > Business > Pro > Free
2. **Limites corretos**: Plano Free tem ~50 chat, 2000 completions; Pro/Business têm muito mais
3. **Feedback no dashboard**: O usuário vê qual plano cada conta Copilot tem
4. **Seleção inteligente**: O accountSelector pode evitar contas Free quando há alternativas

---

## ANTES (Situação Atual)

```javascript
// Copilot não tem detecção de plano
// Todas as contas são tratadas igualmente
// Não sabemos se é Free, Pro, Business ou Enterprise
```

---

## DEPOIS (Implementação Proposta)

### Lógica de detecção de plano

```javascript
// src/lib/usage/parsers/copilotPlan.js (NOVO)

/**
 * Detecta o plano do GitHub Copilot baseado em access_type_sku e copilot_plan.
 *
 * Regras de prioridade (do zero-limit):
 * 1. Enterprise: sku contém 'enterprise' OU plan === 'enterprise'
 * 2. Business: sku contém 'business' OU plan === 'business'
 * 3. Pro: sku contém 'educational' ou 'pro' OU plan contém 'pro'
 *    TAMBÉM: plan === 'individual' E sku NÃO contém 'free_limited'
 * 4. Free: sku contém 'free_limited' ou 'free' OU plan contém 'free'
 * 5. Fallback: capitalizar o copilot_plan ou retornar 'Unknown'
 *
 * @param {Object} payload - Resposta da API /copilot_internal/user
 * @returns {string} 'Enterprise' | 'Business' | 'Pro' | 'Free' | 'Unknown'
 */
export function detectCopilotPlan(payload) {
  const sku = (payload.access_type_sku || "").toLowerCase();
  const plan = (payload.copilot_plan || "").toLowerCase();

  // Enterprise
  if (sku.includes("enterprise") || plan === "enterprise") return "Enterprise";

  // Business
  if (sku.includes("business") || plan === "business") return "Business";

  // Pro (inclui educational)
  if (sku.includes("educational") || sku.includes("pro") || plan.includes("pro")) return "Pro";

  // Individual (não-free) = Pro
  if (plan === "individual" && !sku.includes("free_limited")) return "Pro";

  // Free
  if (sku.includes("free_limited") || sku === "free" || plan.includes("free")) return "Free";

  // Fallback
  if (payload.copilot_plan) {
    return payload.copilot_plan.charAt(0).toUpperCase() + payload.copilot_plan.slice(1);
  }
  return "Unknown";
}

/**
 * Limites padrão por plano do Copilot (referência para quota estimation)
 */
export const COPILOT_PLAN_DEFAULTS = {
  Free: { chat: 50, completions: 2000, premium: 0 },
  Pro: { chat: 300, completions: 10000, premium: 50 },
  Business: { chat: 500, completions: 20000, premium: 100 },
  Enterprise: { chat: 1000, completions: 50000, premium: 500 },
  Unknown: { chat: 50, completions: 2000, premium: 0 },
};
```

---

## Arquivos Afetados

| Arquivo                                           | Ação                                         |
| ------------------------------------------------- | -------------------------------------------- |
| `src/lib/usage/parsers/copilotPlan.js`            | **NOVO** — Detecção de plano                 |
| `src/lib/usage/fetcher.js`                        | Chamar `detectCopilotPlan()` ao buscar usage |
| `src/lib/accountSelector.js`                      | Usar plano como critério de priorização      |
| `src/app/(dashboard)/dashboard/usage/components/` | Exibir badge de plano                        |

---

## Exemplos de Valores da API

| `access_type_sku`           | `copilot_plan` | Plano Detectado |
| --------------------------- | -------------- | --------------- |
| `copilot_for_business_seat` | `business`     | **Business**    |
| `copilot_enterprise_seat`   | `enterprise`   | **Enterprise**  |
| `copilot_pro`               | `individual`   | **Pro**         |
| `copilot_individual`        | `individual`   | **Pro**         |
| `copilot_free_limited`      | `individual`   | **Free**        |
| `copilot_educational`       | `individual`   | **Pro**         |
| (vazio)                     | (vazio)        | **Unknown**     |

---

## Referência Direta

- Arquivo original: `zero-limit/src/services/api/parsers/copilot.parser.ts` (linhas 4-29)
- Cada condição foi mapeada 1:1 da implementação original
