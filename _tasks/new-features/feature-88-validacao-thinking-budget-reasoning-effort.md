# Feature 82 — Validação de Thinking Budget e Reasoning Effort

**Fonte:** Análise do repositório `kaitranntt/ccs` — módulos `src/cliproxy/thinking-validator.ts` e `src/cliproxy/codex-reasoning-proxy.ts`
**Prioridade:** 🟢 P2 — Otimização de tokens
**Complexidade:** Média (novo serviço + integração em handlers)

---

## Motivação

Modelos como Claude Opus 4.6, Gemini 3 Pro e GPT-5.3 Codex suportam configurações de "thinking" (extended thinking/reasoning), mas cada modelo tem **limites diferentes**:

| Modelo                     | Tipo                | Min  | Max    | Suporta "off"? |
| -------------------------- | ------------------- | ---- | ------ | -------------- |
| Claude Opus 4.6 Thinking   | Budget (tokens)     | 1024 | 128000 | ✅             |
| Claude Sonnet 4.5 Thinking | Budget (tokens)     | 1024 | 32000  | ✅             |
| GPT-5.3 Codex              | Levels (none→xhigh) | none | xhigh  | ✅             |
| GPT-5.2 Codex              | Levels (none→high)  | none | high   | ❌ max=high    |
| Gemini 3 Pro High          | Budget (tokens)     | 0    | 100000 | ✅             |

Quando um usuário configura thinking budget de 200.000 tokens para Claude Opus 4.6, o budget é **silenciosamente ignorado** pelo provider — desperdiçando a expectativa do usuário. Pior, para Codex, um valor incompatível pode causar **erro 400**.

O CCS implementa validação rigorosa: clampa valores ao range suportado, converte entre tipos (level ↔ budget), e exibe warnings informativos.

---

## O Que Ganhamos

1. **Prevenção de erros 400** — valores fora do range são clampados automaticamente
2. **Economia de tokens** — budgets excessivos são reduzidos ao máximo efetivo
3. **Transparência** — warnings no log explicam ajustes feitos
4. **Mapeamento cross-model** — "high" no Codex equivale a ~32000 tokens, conversão automática
5. **Dashboard integration** — modelos mostram limites de thinking na UI

---

## Situação Atual (Antes)

```
Usuário configura: thinking_budget = 200000
              ↓
OmniRoute: envia 200000 para API
              ↓
Claude Opus 4.6: aceita max 128000, ignora excedente silenciosamente
              ↓
Resultado: ❌ Usuário acha que está usando 200k tokens de thinking
```

Para Codex:

```
Usuário configura: reasoning_effort = "xhigh"
              ↓
OmniRoute: envia "xhigh" para GPT-5.2 Codex (max=high)
              ↓
API retorna: ❌ 400 Bad Request ("invalid reasoning effort")
```

---

## Situação Desejada (Depois)

```
Usuário configura: thinking_budget = 200000
              ↓
OmniRoute [ThinkingValidator]:
  - Detecta modelo: Claude Opus 4.6 (max: 128000)
  - Clampa para: 128000
  - Warning: "Budget 200000 exceeds max 128000 for Claude Opus 4.6. Clamped to 128000."
              ↓
API recebe: ✅ 128000 (valor válido)
```

Para Codex:

```
Usuário configura: reasoning_effort = "xhigh"
              ↓
OmniRoute [ThinkingValidator]:
  - Detecta modelo: GPT-5.2 (max_level: high)
  - Clamp: "xhigh" → "high"
  - Warning: "Effort xhigh exceeds max 'high' for GPT-5.2. Capped at 'high'."
              ↓
API recebe: ✅ "high" (valor válido)
```

---

## Implementação Detalhada

### 1. Registro de Capacidades de Thinking: `src/shared/constants/thinkingCapabilities.js`

```javascript
/**
 * Mapa de capacidades de thinking por provider/modelo.
 * Complementa o registro de modelos existente em providerRegistry.js
 */

export const THINKING_LEVELS = ["none", "minimal", "low", "medium", "high", "xhigh"];
export const THINKING_LEVEL_ORDER = Object.fromEntries(THINKING_LEVELS.map((l, i) => [l, i]));

// Budgets correspondentes a cada nível
export const LEVEL_TO_BUDGET = {
  none: 0,
  minimal: 1024,
  low: 4096,
  medium: 16384,
  high: 32768,
  xhigh: 65536,
};

export const THINKING_CAPABILITIES = {
  // Claude (Antigravity)
  "claude-opus-4-6-thinking": {
    type: "budget",
    min: 1024,
    max: 128000,
    zeroAllowed: true,
    dynamicAllowed: true,
  },
  "claude-opus-4-5-thinking": {
    type: "budget",
    min: 1024,
    max: 64000,
    zeroAllowed: true,
    dynamicAllowed: true,
  },
  "claude-sonnet-4-5-thinking": {
    type: "budget",
    min: 1024,
    max: 32000,
    zeroAllowed: true,
    dynamicAllowed: true,
  },

  // Codex
  "gpt-5.3-codex": {
    type: "levels",
    levels: ["none", "low", "medium", "high", "xhigh"],
    maxLevel: "xhigh",
    zeroAllowed: true,
  },
  "gpt-5.2-codex": {
    type: "levels",
    levels: ["none", "low", "medium", "high"],
    maxLevel: "high",
    zeroAllowed: true,
  },
  "gpt-5.1-codex": {
    type: "levels",
    levels: ["none", "low", "medium", "high"],
    maxLevel: "high",
    zeroAllowed: true,
  },

  // Gemini
  "gemini-3-pro-high": {
    type: "budget",
    min: 0,
    max: 100000,
    zeroAllowed: true,
    dynamicAllowed: true,
  },
  "gemini-3-pro-low": {
    type: "budget",
    min: 0,
    max: 10000,
    zeroAllowed: true,
    dynamicAllowed: true,
  },
};
```

### 2. Serviço de Validação: `src/sse/services/thinkingValidator.js`

```javascript
import {
  THINKING_CAPABILITIES,
  THINKING_LEVEL_ORDER,
  LEVEL_TO_BUDGET,
} from "@/shared/constants/thinkingCapabilities";

/**
 * Valida e ajusta parâmetros de thinking/reasoning
 *
 * @returns {{ valid: boolean, value: any, warning?: string }}
 */
export function validateThinking(modelId, value) {
  const capabilities = THINKING_CAPABILITIES[modelId];

  // Modelo sem info de thinking → passthrough
  if (!capabilities) {
    return { valid: true, value };
  }

  // Modelo sem suporte a thinking
  if (capabilities.type === "none") {
    return {
      valid: false,
      value: null,
      warning: `Model ${modelId} does not support extended thinking. Value ignored.`,
    };
  }

  // Valor "auto"/"dynamic" → passthrough se suportado
  if (value === "auto" || value === "dynamic") {
    if (capabilities.dynamicAllowed) {
      return { valid: true, value };
    }
    return {
      valid: false,
      value: capabilities.type === "budget" ? capabilities.max : capabilities.maxLevel,
      warning: `Model ${modelId} does not support dynamic thinking. Using max value.`,
    };
  }

  // Tipo Budget (tokens)
  if (capabilities.type === "budget") {
    return validateBudget(capabilities, value, modelId);
  }

  // Tipo Levels (none, low, medium, high, xhigh)
  if (capabilities.type === "levels") {
    return validateLevel(capabilities, value, modelId);
  }

  return { valid: true, value };
}

function validateBudget(capabilities, value, modelId) {
  const numValue = typeof value === "string" ? parseInt(value, 10) : value;

  if (isNaN(numValue)) {
    // Tentar converter level string para budget
    const budget = LEVEL_TO_BUDGET[value.toLowerCase?.()];
    if (budget !== undefined) {
      const clamped = Math.min(Math.max(budget, capabilities.min), capabilities.max);
      return {
        valid: true,
        value: clamped,
        warning:
          clamped !== budget
            ? `Level "${value}" mapped to budget ${budget}, clamped to ${clamped} for ${modelId}.`
            : undefined,
      };
    }
    return {
      valid: false,
      value: capabilities.min,
      warning: `Invalid budget value "${value}" for ${modelId}. Using minimum ${capabilities.min}.`,
    };
  }

  if (numValue === 0 && capabilities.zeroAllowed) {
    return { valid: true, value: 0 }; // Thinking desabilitado
  }

  if (numValue < capabilities.min) {
    return {
      valid: true,
      value: capabilities.min,
      warning: `Budget ${numValue} below minimum ${capabilities.min} for ${modelId}. Raised to ${capabilities.min}.`,
    };
  }

  if (numValue > capabilities.max) {
    return {
      valid: true,
      value: capabilities.max,
      warning: `Budget ${numValue} exceeds max ${capabilities.max} for ${modelId}. Clamped to ${capabilities.max}.`,
    };
  }

  return { valid: true, value: numValue };
}

function validateLevel(capabilities, value, modelId) {
  const level = String(value).toLowerCase();

  // Verificar se é um level válido
  if (!capabilities.levels.includes(level)) {
    // Tentar encontrar o level mais próximo
    const closest = findClosestLevel(level, capabilities.levels);
    return {
      valid: true,
      value: closest,
      warning: `Level "${value}" not supported for ${modelId}. Using closest: "${closest}".`,
    };
  }

  // Verificar max level
  const levelOrder = THINKING_LEVEL_ORDER[level] || 0;
  const maxOrder = THINKING_LEVEL_ORDER[capabilities.maxLevel] || 0;

  if (levelOrder > maxOrder) {
    return {
      valid: true,
      value: capabilities.maxLevel,
      warning: `Level "${level}" exceeds max "${capabilities.maxLevel}" for ${modelId}. Capped to "${capabilities.maxLevel}".`,
    };
  }

  return { valid: true, value: level };
}

function findClosestLevel(target, available) {
  const targetOrder = THINKING_LEVEL_ORDER[target];
  if (targetOrder === undefined) return available[available.length - 1]; // último = mais alto

  let closest = available[0];
  let minDist = Infinity;

  for (const level of available) {
    const dist = Math.abs(THINKING_LEVEL_ORDER[level] - targetOrder);
    if (dist < minDist) {
      minDist = dist;
      closest = level;
    }
  }
  return closest;
}
```

### 3. Integração no Handler de Chat

```javascript
// Em src/sse/handlers/chat.js, antes do envio:
import { validateThinking } from "@/sse/services/thinkingValidator";

// Para Claude (thinking budget)
if (body.thinking?.budget_tokens) {
  const result = validateThinking(modelId, body.thinking.budget_tokens);
  if (result.warning) logger.warn(`[thinking] ${result.warning}`);
  body.thinking.budget_tokens = result.value;
}

// Para Codex (reasoning effort)
if (body.reasoning?.effort) {
  const result = validateThinking(modelId, body.reasoning.effort);
  if (result.warning) logger.warn(`[thinking] ${result.warning}`);
  body.reasoning.effort = result.value;
}
```

---

## Arquivos a Criar/Modificar

| Ação          | Arquivo                                        | Descrição                         |
| ------------- | ---------------------------------------------- | --------------------------------- |
| **CRIAR**     | `src/shared/constants/thinkingCapabilities.js` | Registro de capacidades           |
| **CRIAR**     | `src/sse/services/thinkingValidator.js`        | Serviço de validação              |
| **MODIFICAR** | `src/sse/handlers/chat.js`                     | Integrar validação antes do envio |
| **CRIAR**     | `tests/unit/thinking-validator.test.mjs`       | Testes unitários                  |

---

## Testes Necessários

1. Budget 50000 para Claude Opus 4.6 (max 128k) → passthrough sem alteração
2. Budget 200000 para Claude Opus 4.6 → clampado para 128000 + warning
3. Budget 500 para Claude Opus 4.6 (min 1024) → elevado para 1024 + warning
4. Budget 0 (thinking off) para modelo com `zeroAllowed: true` → aceito
5. Level "xhigh" para GPT-5.2 (max "high") → cappado para "high" + warning
6. Level "xhigh" para GPT-5.3 (max "xhigh") → aceito sem alteração
7. Level string "high" para budget model → convertido via `LEVEL_TO_BUDGET` para 32768
8. Modelo desconhecido → passthrough (sem validação)
9. Valor "auto" para modelo com `dynamicAllowed: true` → passthrough
10. Valor "auto" para modelo sem `dynamicAllowed` → convertido para max

---

## Referência do CCS

- [thinking-validator.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/thinking-validator.ts) — 404 linhas, validação completa
- [codex-reasoning-proxy.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/codex-reasoning-proxy.ts) — 460 linhas, effort injection para Codex
- [model-catalog.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/model-catalog.ts) — definição de capabilities por modelo
