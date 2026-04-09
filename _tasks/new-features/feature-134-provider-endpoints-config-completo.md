# Feature 134 — Provider Endpoints Config Completo

## Resumo

Expandir o mapeamento de URLs base de provedores no `config.js` e `providerRegistry.js` para incluir todos os provedores suportados pelo OmniRoute, com endpoints corretos, versionados e validados. Adicionalmente, criar um mecanismo de discovery automático de endpoints para provedores OpenAI-compatíveis.

## Motivação

O LiteLLM mantém URLs base para 106+ provedores em seus arquivos de configuração. O OmniRoute em `config.js` lista apenas 9 endpoints fixos (openrouter, glm, kimi, minimax, openai, anthropic, gemini e variantes). Os demais provedores (DeepSeek, Groq, Fireworks, Together, Cerebras, Mistral, Perplexity, NVIDIA, Nebius, SiliconFlow, Hyperbolic, xAI) dependem de configuração manual pelo usuário ou hardcoding espalhado pelo código.

## O que ganhamos

- **Setup rápido**: Usuário adiciona apenas a API key, sem precisar saber a URL
- **Menos erros**: URLs erradas são uma fonte comum de falhas silenciosas
- **Manutenibilidade**: Centralização facilita atualização quando provedores mudam URLs
- **Discovery automático**: Provedores custom podem ter endpoint detectado automaticamente

## Situação Atual (Antes)

```javascript
// config.js — apenas 9 endpoints
export const PROVIDER_ENDPOINTS = {
  openrouter: "https://openrouter.ai/api/v1/chat/completions",
  glm: "https://api.z.ai/api/anthropic/v1/messages",
  kimi: "https://api.moonshot.ai/v1/chat/completions",
  openai: "https://api.openai.com/v1/chat/completions",
  anthropic: "https://api.anthropic.com/v1/messages",
  gemini: "https://generativelanguage.googleapis.com/v1beta/models",
  // ... 3 mais
};

// Provedores como deepseek, groq, fireworks → sem URL configurada
// Resultado: erro "endpoint not configured" ou fallback genérico
```

## Situação Proposta (Depois)

```javascript
// config.js — todos os provedores com endpoints completos
export const PROVIDER_ENDPOINTS = {
  // ── Provedores com API Key (Tier 1 — mais usados) ──
  openai: "https://api.openai.com/v1",
  anthropic: "https://api.anthropic.com/v1",
  gemini: "https://generativelanguage.googleapis.com/v1beta",
  deepseek: "https://api.deepseek.com/v1",
  groq: "https://api.groq.com/openai/v1",
  xai: "https://api.x.ai/v1",
  mistral: "https://api.mistral.ai/v1",

  // ── Tier 2 — frequentemente usados ──
  openrouter: "https://openrouter.ai/api/v1",
  fireworks: "https://api.fireworks.ai/inference/v1",
  together: "https://api.together.xyz/v1",
  cerebras: "https://api.cerebras.ai/v1",
  perplexity: "https://api.perplexity.ai",
  cohere: "https://api.cohere.com/v2",

  // ── Tier 3 — especializados ──
  nvidia: "https://integrate.api.nvidia.com/v1",
  nebius: "https://api.studio.nebius.ai/v1",
  siliconflow: "https://api.siliconflow.cn/v1",
  hyperbolic: "https://api.hyperbolic.xyz/v1",

  // ── Provedores regionais ──
  glm: "https://api.z.ai/api/anthropic/v1",
  kimi: "https://api.moonshot.ai/v1",
  "kimi-coding": "https://api.kimi.com/coding/v1",
  minimax: "https://api.minimax.io/anthropic/v1",
  "minimax-cn": "https://api.minimaxi.com/anthropic/v1",

  // ── Audio Providers ──
  deepgram: "https://api.deepgram.com/v1",
  assemblyai: "https://api.assemblyai.com/v2",

  // ── Image Providers ──
  nanobanana: "https://api.nanobananaapi.ai/v1",
};

// Mapeamento de sufixos por tipo de operação
export const ENDPOINT_PATHS = {
  chat: "/chat/completions",
  completions: "/completions",
  embeddings: "/embeddings",
  images: "/images/generations",
  audio: "/audio/transcriptions",
  moderations: "/moderations",
  models: "/models",
};
```

## Especificação Técnica

### Helpers de Resolução de Endpoint

```javascript
// src/shared/utils/endpointResolver.js

import { PROVIDER_ENDPOINTS, ENDPOINT_PATHS } from "../constants/config.js";

/**
 * Resolve o endpoint completo para uma operação em um provider.
 * @param {string} providerId - ID do provider
 * @param {'chat'|'embeddings'|'images'|'audio'|'models'} operation - Tipo de operação
 * @param {object} [overrides] - Overrides do provider connection
 * @returns {string} URL completa
 */
export function resolveEndpoint(providerId, operation = "chat", overrides = {}) {
  // Custom base URL do provider connection tem prioridade
  if (overrides.baseUrl) {
    return `${overrides.baseUrl.replace(/\/$/, "")}${ENDPOINT_PATHS[operation] || ""}`;
  }

  const base = PROVIDER_ENDPOINTS[providerId];
  if (!base) {
    throw new Error(`No endpoint configured for provider: ${providerId}`);
  }

  return `${base}${ENDPOINT_PATHS[operation] || ""}`;
}

/**
 * Validar que um endpoint está acessível.
 * @param {string} url - URL para validar
 * @returns {Promise<{ok: boolean, latencyMs: number, error?: string}>}
 */
export async function validateEndpoint(url) {
  const start = Date.now();
  try {
    const res = await fetch(url.replace(/\/chat\/completions$/, "/models"), {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    return { ok: res.ok || res.status === 401, latencyMs: Date.now() - start };
  } catch (err) {
    return { ok: false, latencyMs: Date.now() - start, error: err.message };
  }
}
```

## Como fazer (passo a passo)

1. Inventariar todos os providers ativos no `providerRegistry` e seus endpoints por operação.
2. Normalizar configuração para guardar apenas base URL + paths por endpoint.
3. Implementar resolver único de endpoint com prioridade para override de conexão.
4. Adicionar validação de conectividade por provider com timeout curto e retorno estruturado.
5. Migrar handlers para usar o resolver central em vez de montagem ad hoc de URL.
6. Cobrir em testes os casos de endpoint ausente, override e path por operação.

## Arquivos a Criar/Modificar

| Arquivo                                | Ação                                                             |
| -------------------------------------- | ---------------------------------------------------------------- |
| `src/shared/constants/config.js`       | **MODIFICAR** — Expandir PROVIDER_ENDPOINTS com todos provedores |
| `src/shared/utils/endpointResolver.js` | **NOVO** — Helper de resolução de endpoint                       |
| `open-sse/config/providerRegistry.js`  | **MODIFICAR** — Usar PROVIDER_ENDPOINTS centralizado             |

## Critérios de Aceite

- [ ] Todos os 25+ provedores do OmniRoute têm endpoint configurado
- [ ] URLs base não incluem path de operação (apenas domínio + versão)
- [ ] Helper `resolveEndpoint()` composita base + operation path
- [ ] Custom `baseUrl` em provider connections tem prioridade sobre default
- [ ] Endpoint `/api/providers/validate` testa conectividade do endpoint
- [ ] Dashboard exibe endpoint configurado para cada provider

## Referência

- [LiteLLM: litellm/llms/{provider}/chat/transformation.py](https://github.com/BerriAI/litellm/tree/main/litellm/llms) — cada provider define `get_complete_url()`
- [LiteLLM: model_prices_and_context_window.json](https://github.com/BerriAI/litellm/blob/main/model_prices_and_context_window.json) — provider + base URL implícitos
