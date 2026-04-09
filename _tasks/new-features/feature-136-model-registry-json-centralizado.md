# Feature 136 — Model Registry JSON Centralizado

## Resumo

Criar um banco de dados JSON centralizado (`model_registry.json`) com metadados completos de cada modelo suportado: max_input_tokens, max_output_tokens, pricing, capabilities (function_calling, vision, prompt_caching, tool_choice), e mode (chat, embedding, image, audio). Substituir os mappings hardcoded espalhados por vários arquivos.

## Motivação

O LiteLLM mantém um arquivo de 1.3MB (`model_prices_and_context_window.json`) com **2.566 modelos** mapeados com tokens, custos e capabilities. No OmniRoute, essas informações estão fragmentadas em:

- `pricing.js` — custos por $/1M tokens (~100 modelos)
- `providerModels.js` — lista de modelos por provider (nomes e IDs)
- `thinkingSupport.js` — limites de thinking budget
- Nenhum arquivo centralizado com max_tokens, capabilities

Isso causa: validação incompleta de requisições, falta de metadata para routing inteligente, custos estimados em vez de precisos.

## O que ganhamos

- **Validação automática**: Rejeitar requisições com `max_tokens` acima do suportado
- **Routing inteligente**: Selecionar modelo baseado em capabilities (visão, tools, etc.)
- **Custo preciso**: Uma única source of truth para pricing
- **Discovery de modelos**: API `/api/models` rica com metadata completo
- **Dashboard melhorado**: Exibir context window, preço, capabilities por modelo

## Situação Atual (Antes)

```
// Pricing em pricing.js
"claude-sonnet-4-5-20250929": { input: 3.0, output: 15.0, cached: 1.5 } // SEM max_tokens

// Modelos em providerModels.js
{ id: "claude-sonnet-4-5-20250929", name: "Claude Sonnet 4.5" } // SEM capabilities

// Thinking em thinkingSupport.js
"claude-sonnet-4-5-20250929": { min: 1024, max: 128000 } // Arquivo separado

→ 3 arquivos diferentes para consultar metadata de um modelo
→ Sem max_input_tokens → não valida context overflow
→ Sem supports_vision → não sabe se modelo aceita imagens
```

## Situação Proposta (Depois)

```javascript
// model_registry.json — source of truth única
{
  "claude-sonnet-4-5-20250929": {
    "provider": "anthropic",
    "aliases": ["cc", "anthropic"],
    "name": "Claude Sonnet 4.5",
    "mode": "chat",
    "max_input_tokens": 200000,
    "max_output_tokens": 64000,
    "pricing": {
      "input": 3.0,          // $/1M tokens
      "output": 15.0,
      "cached": 1.5,
      "cache_creation": 3.0,
      "reasoning": 15.0
    },
    "thinking": {
      "supported": true,
      "min": 1024,
      "max": 128000,
      "zero_allowed": true
    },
    "capabilities": {
      "function_calling": true,
      "vision": true,
      "prompt_caching": true,
      "response_schema": true,
      "tool_choice": true,
      "parallel_tool_calls": true,
      "streaming": true,
      "system_messages": true
    }
  }
}

→ Uma fonte única, todas as informações num lugar
→ Validação automática de context, tools, vision
→ Import simples: import registry from './model_registry.json'
```

## Especificação Técnica

### Estrutura do Registry

```javascript
// src/shared/data/model_registry.json
// Cada entry segue esta estrutura:
{
  "model_id": {
    "provider": "string",           // litellm_provider equivalent
    "aliases": ["string"],          // OmniRoute aliases (cc, gc, ag, etc.)
    "name": "string",              // Display name
    "mode": "chat|embedding|image_generation|audio_transcription|rerank|moderation",
    "max_input_tokens": 0,         // Context window
    "max_output_tokens": 0,        // Max response tokens
    "pricing": {
      "input": 0,                  // $/1M input tokens
      "output": 0,                 // $/1M output tokens
      "cached": 0,                 // $/1M cached input tokens
      "cache_creation": 0,         // $/1M cache write tokens
      "reasoning": 0               // $/1M reasoning tokens
    },
    "thinking": {                  // Optional
      "supported": false,
      "min": 0,
      "max": 0,
      "zero_allowed": false,
      "levels": []                 // e.g., ["low", "medium", "high"]
    },
    "capabilities": {
      "function_calling": false,
      "vision": false,
      "prompt_caching": false,
      "response_schema": false,
      "tool_choice": false,
      "parallel_tool_calls": false,
      "streaming": true,
      "system_messages": true
    },
    "deprecated": false,
    "deprecated_at": null           // ISO date string
  }
}
```

### API de Acesso ao Registry

```javascript
// src/shared/utils/modelRegistry.js

import registry from "../data/model_registry.json" with { type: "json" };

export function getModelInfo(modelId) {
  return registry[modelId] || null;
}

export function getMaxInputTokens(modelId) {
  return registry[modelId]?.max_input_tokens || null;
}

export function getMaxOutputTokens(modelId) {
  return registry[modelId]?.max_output_tokens || null;
}

export function hasCapability(modelId, capability) {
  return registry[modelId]?.capabilities?.[capability] === true;
}

export function getModelPricing(modelId) {
  return registry[modelId]?.pricing || null;
}

export function getModelsByProvider(providerId) {
  return Object.entries(registry)
    .filter(([, m]) => m.provider === providerId || m.aliases?.includes(providerId))
    .map(([id, m]) => ({ id, ...m }));
}

export function getModelsByCapability(capability) {
  return Object.entries(registry)
    .filter(([, m]) => m.capabilities?.[capability] === true)
    .map(([id, m]) => ({ id, ...m }));
}

/**
 * Validar que uma requisição não excede os limites do modelo.
 */
export function validateRequestLimits(modelId, requestTokens, requestMaxTokens) {
  const info = registry[modelId];
  if (!info) return { valid: true }; // Unknown model, allow

  const errors = [];
  if (info.max_input_tokens && requestTokens > info.max_input_tokens) {
    errors.push(`Input tokens (${requestTokens}) exceeds model limit (${info.max_input_tokens})`);
  }
  if (info.max_output_tokens && requestMaxTokens > info.max_output_tokens) {
    errors.push(`max_tokens (${requestMaxTokens}) exceeds model limit (${info.max_output_tokens})`);
  }
  return { valid: errors.length === 0, errors };
}
```

## Como fazer (passo a passo)

1. Definir schema formal do `model_registry.json` e validar no carregamento.
2. Migrar metadados de pricing, limites e capabilities para o novo registro central.
3. Implementar API utilitária (`getModelInfo`, `hasCapability`, `validateRequestLimits`).
4. Integrar validações de limite e capacidade no pipeline de handlers antes do upstream.
5. Manter compatibilidade temporária com fontes antigas (fallback controlado).
6. Criar rotina de atualização com diff e revisão humana antes de publicar nova versão.

## Arquivos a Criar/Modificar

| Arquivo                               | Ação                                             |
| ------------------------------------- | ------------------------------------------------ |
| `src/shared/data/model_registry.json` | **NOVO** — Database centralizado de modelos      |
| `src/shared/utils/modelRegistry.js`   | **NOVO** — API de acesso ao registry             |
| `src/shared/constants/pricing.js`     | **DEPRECAR** — Gradualmente migrar para registry |
| `src/shared/constants/models.js`      | **MODIFICAR** — Usar registry como source        |
| `src/lib/usage/costCalculator.js`     | **MODIFICAR** — Usar pricing do registry         |
| `open-sse/config/providerModels.js`   | **MODIFICAR** — Enriquecer com capabilities      |

## Critérios de Aceite

- [ ] Registry tem pelo menos todos os modelos já em pricing.js + providerModels.js
- [ ] Cada modelo tem max_input_tokens, max_output_tokens, pricing e capabilities
- [ ] API `getModelInfo()` retorna metadados completos por model_id
- [ ] `validateRequestLimits()` valida context window antes de enviar upstream
- [ ] Endpoint `/api/models/catalog` retorna o registry com filtros
- [ ] pricing.js e providerModels.js podem ser gradualmente migrados
- [ ] Script de atualização pode importar dados do LiteLLM JSON

## Referência

- [LiteLLM: model_prices_and_context_window.json](https://github.com/BerriAI/litellm/blob/main/model_prices_and_context_window.json) — 2.566 modelos, 1.3MB
- [LiteLLM: utils.py → get_model_info()](https://github.com/BerriAI/litellm/blob/main/litellm/utils.py) — API de acesso
