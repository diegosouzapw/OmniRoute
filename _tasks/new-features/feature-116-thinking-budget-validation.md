# Feature 03 — Thinking Budget Validation

## Resumo

Implementar validação e normalização de thinking budgets antes de enviar requisições ao upstream. Cada modelo tem limites específicos (min/max tokens, zero permitido, níveis discretos vs contínuos) que devem ser enforced pelo proxy para evitar erros silenciosos ou rejeições do provider.

## Motivação

Modelos com thinking/reasoning (Claude, Gemini, GPT) aceitam um parâmetro de "thinking budget" que controla quanto o modelo pode "pensar" antes de responder. Cada modelo tem limites diferentes que, se violados, causam erros 400 do upstream ou (pior) são silenciosamente truncados. O ProxyPilot implementa validação rigorosa desses limites; nosso proxy não valida nada.

## O que ganhamos

- **Prevenção de erros**: Erros 400 sont interceptados e corrigidos ANTES de chegar ao provider
- **Normalização cross-provider**: Cliente pode enviar `reasoning_effort: "high"` e o proxy traduz para o budget correto de cada provider
- **Transparência**: Logs mostram quando um budget foi ajustado e por quê
- **Compatibilidade**: Clients que não sabem os limites de cada modelo funcionam corretamente

## Situação Atual (Antes)

```
Cliente envia: { thinking_budget: 50000 } para gemini-2.5-flash
→ Upstream rejeita: max é 24576
→ Erro opaco retornado ao cliente
→ Cliente não sabe o que aconteceu
```

- Nenhuma validação de budgets
- Erros silenciosos ou opacos
- Cliente precisa saber os limites de cada modelo

## Situação Proposta (Depois)

```
Cliente envia: { thinking_budget: 50000 } para gemini-2.5-flash
→ Proxy valida: max é 24576 → clamp para 24576
→ Upstream recebe budget válido → resposta com sucesso
→ Header X-Thinking-Budget-Adjusted: "50000→24576" no response
```

## Especificação Técnica

### Tabela de Thinking Support por Modelo

```javascript
// src/shared/constants/thinkingSupport.js

export const THINKING_SUPPORT = {
  // ── Claude ──
  "claude-opus-4-6": { min: 1024, max: 128000, zeroAllowed: true, dynamic: false },
  "claude-opus-4-5-20251101": { min: 1024, max: 128000, zeroAllowed: true, dynamic: false },
  "claude-sonnet-4-5-20250929": { min: 1024, max: 128000, zeroAllowed: true, dynamic: false },
  "claude-haiku-4-5-20251001": { min: 1024, max: 128000, zeroAllowed: true, dynamic: false },
  "claude-opus-4-20250514": { min: 1024, max: 128000, zeroAllowed: false, dynamic: false },

  // ── Gemini ──
  "gemini-2.5-pro": { min: 128, max: 32768, zeroAllowed: false, dynamic: true },
  "gemini-2.5-flash": { min: 0, max: 24576, zeroAllowed: true, dynamic: true },
  "gemini-2.5-flash-lite": { min: 0, max: 24576, zeroAllowed: true, dynamic: true },
  "gemini-3-pro-preview": {
    min: 128,
    max: 32768,
    zeroAllowed: false,
    dynamic: true,
    levels: ["low", "high"],
  },
  "gemini-3-flash-preview": {
    min: 128,
    max: 32768,
    zeroAllowed: false,
    dynamic: true,
    levels: ["minimal", "low", "medium", "high"],
  },

  // ── OpenAI/Codex ──
  "gpt-5-codex": { levels: ["low", "medium", "high"] },
  "gpt-5.2": { levels: ["none", "low", "medium", "high", "xhigh"] },
  "gpt-5.2-codex": { levels: ["low", "medium", "high", "xhigh"] },
  "gpt-5.3-codex": { levels: ["low", "medium", "high", "xhigh"] },
  "gpt-5.3-codex-spark": { levels: ["low", "medium", "high", "xhigh"] },

  // ── Kimi ──
  "kimi-k2-thinking": { min: 1024, max: 32000, zeroAllowed: true, dynamic: true },
  "kimi-k2.5": { min: 1024, max: 32000, zeroAllowed: true, dynamic: true },
};
```

### Função de Validação

```javascript
// src/lib/thinking/validateThinkingBudget.js

export function validateThinkingBudget(modelId, budget, level) {
  const support = THINKING_SUPPORT[modelId];
  if (!support) return { valid: true, budget, level, adjusted: false };

  const result = { valid: true, adjusted: false, warnings: [] };

  // Modelo usa levels (e.g., GPT)
  if (support.levels && level) {
    if (!support.levels.includes(level)) {
      // Clamp para o level mais próximo
      const idx = Math.min(
        support.levels.length - 1,
        Math.max(0, Math.round((support.levels.length - 1) * getLevelRatio(level)))
      );
      result.level = support.levels[idx];
      result.adjusted = true;
      result.warnings.push(`Level "${level}" not supported, adjusted to "${result.level}"`);
    } else {
      result.level = level;
    }
    return result;
  }

  // Modelo usa budget numérico (e.g., Claude, Gemini)
  if (budget !== undefined && budget !== null) {
    if (budget === 0 && !support.zeroAllowed) {
      result.budget = support.min;
      result.adjusted = true;
      result.warnings.push(`Zero budget not allowed, set to min: ${support.min}`);
    } else if (budget > 0 && budget < support.min) {
      result.budget = support.min;
      result.adjusted = true;
      result.warnings.push(`Budget ${budget} below min ${support.min}, clamped`);
    } else if (budget > support.max) {
      result.budget = support.max;
      result.adjusted = true;
      result.warnings.push(`Budget ${budget} above max ${support.max}, clamped`);
    } else {
      result.budget = budget;
    }
    return result;
  }

  return result;
}
```

### Integração no Fluxo SSE

```javascript
// Em src/sse/handlers/chat.js — antes de enviar ao upstream

import { validateThinkingBudget } from "../lib/thinking/validateThinkingBudget.js";

// Validar thinking budget
const thinkingResult = validateThinkingBudget(
  payload.model,
  payload.thinking?.budget_tokens,
  payload.reasoning?.effort
);

if (thinkingResult.adjusted) {
  logger.info(
    `Thinking budget adjusted for ${payload.model}: ${thinkingResult.warnings.join(", ")}`
  );
  // Aplicar budget corrigido ao payload
  if (thinkingResult.budget !== undefined) {
    payload.thinking = { ...payload.thinking, budget_tokens: thinkingResult.budget };
  }
  if (thinkingResult.level !== undefined) {
    payload.reasoning = { ...payload.reasoning, effort: thinkingResult.level };
  }
}
```

## Arquivos a Criar/Modificar

| Arquivo                                      | Ação                                                    |
| -------------------------------------------- | ------------------------------------------------------- |
| `src/shared/constants/thinkingSupport.js`    | **NOVO** — Tabela de suporte por modelo                 |
| `src/lib/thinking/validateThinkingBudget.js` | **NOVO** — Função de validação                          |
| `src/sse/handlers/chat.js`                   | **MODIFICAR** — Integrar validação                      |
| `open-sse/config/providerRegistry.js`        | **MODIFICAR** — Adicionar thinking metadata aos modelos |

## Critérios de Aceite

- [ ] Budgets acima do máximo são clampados silenciosamente (com log)
- [ ] Budgets abaixo do mínimo são elevados (com log)
- [ ] Zero budget em modelos que não aceitam é convertido para min
- [ ] Levels inválidos são mapeados para o mais próximo
- [ ] Header `X-Thinking-Budget-Adjusted` presente quando houve ajuste
- [ ] Tabela THINKING_SUPPORT é mantida atualizada com novos modelos

## Referência

- [ProxyPilot: internal/thinking/validate.go](https://github.com/Finesssee/ProxyPilot/blob/main/internal/thinking/validate.go) (291 linhas)
- [ProxyPilot: internal/thinking/apply.go](https://github.com/Finesssee/ProxyPilot/blob/main/internal/thinking/apply.go) (437 linhas)
- [ProxyPilot: internal/registry/model_definitions_static_data.go](https://github.com/Finesssee/ProxyPilot/blob/main/internal/registry/model_definitions_static_data.go) (ThinkingSupport structs)
