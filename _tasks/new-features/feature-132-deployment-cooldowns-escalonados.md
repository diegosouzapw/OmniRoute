# Feature 132 — Deployment Cooldowns Escalonados

## Resumo

Implementar cooldowns proporcionais ao tipo de erro para deployments/contas de provedores. Em vez de um TTL fixo para todas as falhas, erros de rate limit (429) recebem cooldown maior, erros de servidor (5xx) recebem cooldown intermediário, e erros de autenticação (401/403) recebem cooldown longo.

## Motivação

O LiteLLM em `litellm/router_utils/cooldown_handlers.py` implementa cooldowns inteligentes por tipo de erro, evitando que o router continue enviando requisições para deployments que vão falhar. O OmniRoute atual em `modelAvailability.js` usa um TTL fixo de cooldown (tipicamente 60s) independente do tipo de erro. Isso causa:

- Rate limits (429): cooldown curto demais → mais 429s acumulados
- Auth errors (401): cooldown curto demais → tentativas inúteis
- Server errors (502/503): cooldown pode ser excessivo para erros transitórios

## O que ganhamos

- **Redução de erros em cascata**: Rate limits resolvidos antes de re-tentar
- **Economia de quota**: Menos requisições desperdiçadas em providers com problemas
- **Recovery mais rápido**: Erros transitórios (502) se recuperam rapidamente
- **Inteligência de routing**: Informação de cooldown alimenta decisões de fallback

## Situação Atual (Antes)

```
Account cc-01 → 429 Too Many Requests
  → Cooldown: 60s (fixo)
  → Após 60s: tenta novamente (provavelmente outro 429)
  → Ciclo de falha por vários minutos

Account ag-02 → 401 Unauthorized
  → Cooldown: 60s (fixo)
  → Após 60s: tenta novamente (sempre vai falhar)
  → Desperdício de recursos até reset manual
```

## Situação Proposta (Depois)

```
Account cc-01 → 429 Too Many Requests
  → Cooldown: 120s (2x base) com exponential backoff
  → Retry-After header respeitado se presente
  → Recuperação mais segura

Account ag-02 → 401 Unauthorized
  → Cooldown: 300s (5x base) — provável problema de credencial
  → Alerta no dashboard: "Credencial inválida para ag-02"
  → Não tenta mais até intervenção manual ou TTL longo

Account openai-01 → 502 Bad Gateway
  → Cooldown: 30s (0.5x base) — provavelmente transitório
  → Recuperação rápida
```

## Especificação Técnica

### Tabela de Cooldown por Status Code

```javascript
// src/domain/cooldownPolicy.js

const COOLDOWN_MULTIPLIERS = {
  // Rate Limits — cooldown longo, respeitar Retry-After
  429: { multiplier: 2.0, maxMs: 300_000, respectRetryAfter: true },

  // Auth Errors — cooldown muito longo, precisa intervenção
  401: { multiplier: 5.0, maxMs: 600_000, respectRetryAfter: false },
  403: { multiplier: 5.0, maxMs: 600_000, respectRetryAfter: false },

  // Server Errors — cooldown curto, geralmente transitório
  500: { multiplier: 1.0, maxMs: 120_000, respectRetryAfter: false },
  502: { multiplier: 0.5, maxMs: 60_000, respectRetryAfter: false },
  503: { multiplier: 1.5, maxMs: 180_000, respectRetryAfter: true },

  // Timeout — cooldown moderado
  408: { multiplier: 1.5, maxMs: 120_000, respectRetryAfter: false },

  // Default
  default: { multiplier: 1.0, maxMs: 120_000, respectRetryAfter: false },
};

const BASE_COOLDOWN_MS = 60_000; // 60 seconds

export function calculateCooldownMs(statusCode, retryAfterHeader = null) {
  const rule = COOLDOWN_MULTIPLIERS[statusCode] || COOLDOWN_MULTIPLIERS.default;

  // Respeitar Retry-After se o provider enviou
  if (rule.respectRetryAfter && retryAfterHeader) {
    const retryAfterMs = parseRetryAfter(retryAfterHeader);
    if (retryAfterMs > 0) {
      return Math.min(retryAfterMs, rule.maxMs);
    }
  }

  const cooldown = Math.min(BASE_COOLDOWN_MS * rule.multiplier, rule.maxMs);
  return cooldown;
}

function parseRetryAfter(header) {
  const seconds = parseInt(header, 10);
  if (!isNaN(seconds)) return seconds * 1000;
  // RFC 7231: date format
  const date = new Date(header);
  if (!isNaN(date.getTime())) return Math.max(0, date.getTime() - Date.now());
  return 0;
}
```

### Exponential Backoff para Falhas Consecutivas

```javascript
// Contar falhas consecutivas por deployment
const consecutiveFailures = new Map(); // deploymentId -> count

export function getCooldownWithBackoff(deploymentId, statusCode, retryAfterHeader) {
  const failures = (consecutiveFailures.get(deploymentId) || 0) + 1;
  consecutiveFailures.set(deploymentId, failures);

  const baseCooldown = calculateCooldownMs(statusCode, retryAfterHeader);
  // Exponential backoff: 1x, 2x, 4x, 8x (capped at 4 doublings)
  const backoffMultiplier = Math.min(Math.pow(2, failures - 1), 16);
  return Math.min(baseCooldown * backoffMultiplier, 600_000); // max 10 min
}

export function clearCooldownCounter(deploymentId) {
  consecutiveFailures.delete(deploymentId);
}
```

### Integração com modelAvailability.js

```javascript
// Modificar setModelUnavailable para usar cooldowns escalonados
import { getCooldownWithBackoff, clearCooldownCounter } from "./cooldownPolicy.js";

export function setModelUnavailable(model, statusCode, retryAfterHeader) {
  const cooldownMs = getCooldownWithBackoff(model, statusCode, retryAfterHeader);
  unavailableModels.set(model, {
    until: Date.now() + cooldownMs,
    statusCode,
    cooldownMs,
    reason: getErrorReason(statusCode),
  });
}

// No sucesso, limpar counter
export function clearModelError(model) {
  clearCooldownCounter(model);
}
```

## Arquivos a Criar/Modificar

| Arquivo                           | Ação                                            |
| --------------------------------- | ----------------------------------------------- |
| `src/domain/cooldownPolicy.js`    | **NOVO** — Lógica de cooldown escalonado        |
| `src/domain/modelAvailability.js` | **MODIFICAR** — Usar cooldowns proporcionais    |
| `src/sse/handlers/chat.js`        | **MODIFICAR** — Passar statusCode e Retry-After |

## Critérios de Aceite

- [ ] Erros 429 têm cooldown ≥ 120s (2x base)
- [ ] Erros 401/403 têm cooldown ≥ 300s (5x base)
- [ ] Erros 502 têm cooldown ≤ 30s (0.5x base)
- [ ] Header `Retry-After` é respeitado quando presente
- [ ] Exponential backoff em falhas consecutivas do mesmo deployment
- [ ] Counter de backoff é resetado no primeiro sucesso
- [ ] Dashboard mostra tempo restante de cooldown por deployment

## Referência

- [LiteLLM: router_utils/cooldown_handlers.py](https://github.com/BerriAI/litellm/blob/main/litellm/router_utils/) — cooldown logic por tipo de erro
- [LiteLLM: router.py](https://github.com/BerriAI/litellm/blob/main/litellm/router.py) — integração com deployment health tracking
