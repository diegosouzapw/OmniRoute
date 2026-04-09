# Feature 146 — Lowest Cost Routing Strategy

## Resumo

Adicionar uma nova estratégia de roteamento ao `comboResolver.js` que seleciona automaticamente o deployment mais barato que suporte o modelo solicitado. Usa dados do Model Registry para comparar custos por token entre provedores.

## Motivação

O LiteLLM em `router_strategy/lowest_cost.py` (320 linhas) seleciona o deployment com o menor custo por token, considerando input e output tokens estimados. O OmniRoute tem `costRules.js` com pricing, mas não usa custos para decisões de roteamento — o combo resolver escolhe por prioridade, round-robin ou random, sem considerar preço.

## O que ganhamos

- **Redução de custos**: Automaticamente rota para o provider mais barato
- **Transparência**: Cliente pode solicitar `"strategy": "lowest-cost"` por request
- **Context-aware**: Para modelos grandes, escolhe provider com melhor custo/context window
- **Complementar ao lowest-latency**: Dois eixos de otimização (custo vs velocidade)

## Situação Atual (Antes)

```
Combo "claude-sonnet-4.5" → strategy: "priority"
  Providers: [
    cc (free/OAuth) → custo: $0.00,
    anthropic (API key) → custo: $3.00/1M input,
    bedrock (enterprise) → custo: $2.40/1M input  ← 20% mais barato que API
  ]

  → Sempre usa cc primeiro (priority), mesmo se estiver lento/indisponível
  → Quando cc cai, usa anthropic ($3.00) em vez de bedrock ($2.40)
  → Sem considerar custo na decisão
```

## Situação Proposta (Depois)

```
Combo "claude-sonnet-4.5" → strategy: "lowest-cost"
  Providers: [cc, anthropic, bedrock]

  cc disponível → custo $0.00 → selecionado ✓ (free sempre ganha)
  cc indisponível → | anthropic: $3.00 | bedrock: $2.40 |
                    → bedrock selecionado ✓ (20% mais barato)

  Requisição com 50k tokens:
    anthropic: 50k × $3.00/1M = $0.15
    bedrock: 50k × $2.40/1M = $0.12
    → Economia: $0.03 por request × 1000/dia = $30/dia
```

## Especificação Técnica

### Cost Calculator para Routing

```javascript
// src/domain/costRouter.js

import { getModelPricing } from "../shared/utils/modelRegistry.js";

/**
 * Estimar custo total de uma requisição para um deployment.
 */
export function estimateRequestCost(deployment, estimatedInputTokens, estimatedOutputTokens) {
  // Free providers (OAuth) = custo zero
  if (deployment.authMethod === "oauth" || deployment.isFree) {
    return 0;
  }

  const pricing = getDeploymentPricing(deployment);
  if (!pricing) return Infinity; // Sem pricing = última opção

  const inputCost = (estimatedInputTokens / 1_000_000) * pricing.input;
  const outputCost = (estimatedOutputTokens / 1_000_000) * pricing.output;
  return inputCost + outputCost;
}

/**
 * Selecionar deployment mais barato.
 */
export function getLowestCostDeployment(
  deployments,
  estimatedInputTokens,
  estimatedOutputTokens = 500
) {
  if (deployments.length === 0) return null;
  if (deployments.length === 1) return deployments[0];

  const scored = deployments.map((d) => ({
    deployment: d,
    cost: estimateRequestCost(d, estimatedInputTokens, estimatedOutputTokens),
  }));

  scored.sort((a, b) => a.cost - b.cost);
  return scored[0].deployment;
}

function getDeploymentPricing(deployment) {
  // 1. Custom pricing no deployment override
  if (deployment.customPricing) return deployment.customPricing;

  // 2. Registry pricing
  return getModelPricing(deployment.model);
}
```

### Integração com comboResolver.js

```javascript
// Adicionar case 'lowest-cost' ao switch

case 'lowest-cost': {
  const estimated = estimateTokenCount(context.messages);
  const best = getLowestCostDeployment(
    normalized.map((m, i) => ({ ...m, index: i })),
    estimated.input,
    estimated.output
  );
  return { model: best.model, index: best.index };
}
```

### Estimativa de Tokens

```javascript
// Estimativa rápida (char count / 4)
export function estimateTokenCount(messages) {
  const text = messages.map((m) => (typeof m.content === "string" ? m.content : "")).join("");
  const inputTokens = Math.ceil(text.length / 4);
  const outputTokens = Math.min(inputTokens * 0.5, 2000); // Heuristic
  return { input: inputTokens, output: outputTokens };
}
```

## Arquivos a Criar/Modificar

| Arquivo                       | Ação                                                  |
| ----------------------------- | ----------------------------------------------------- |
| `src/domain/costRouter.js`    | **NOVO** — Estimativa e seleção por menor custo       |
| `src/domain/comboResolver.js` | **MODIFICAR** — Adicionar strategy `lowest-cost`      |
| `src/domain/types.js`         | **MODIFICAR** — Adicionar `lowest-cost` às strategies |

## Critérios de Aceite

- [ ] Strategy `lowest-cost` seleciona deployment mais barato
- [ ] Providers free (OAuth) sempre têm custo $0 e ganham a seleção
- [ ] Custo estimado baseado em token count × pricing do registry
- [ ] Custom pricing no deployment override tem prioridade
- [ ] Sem pricing configurado = Infinity (último resort)
- [ ] Funciona combinado com filtros de availability e cooldown

## Referência

- [LiteLLM: router_strategy/lowest_cost.py](https://github.com/BerriAI/litellm/blob/main/litellm/router_strategy/lowest_cost.py) — 320 linhas
