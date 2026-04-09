# Feature 139 — Parallel Request Limiter

## Resumo

Implementar limitação de requisições simultâneas (concurrency) por API key, evitando que uma única key monopolize todos os deployments. Inclui fila de espera com timeout para requisições que excedem o limite.

## Motivação

O LiteLLM em `router_strategy/budget_limiter.py` implementa `max_parallel_requests` por key/user/team. Isso previne que um único cliente sature todos os deployments com requisições simultâneas. O OmniRoute não tem controle de concorrência — se um cliente enviar 100 requisições simultâneas, todas são encaminhadas ao upstream, potencialmente causando rate limits globais.

## O que ganhamos

- **Proteção contra abuso**: Uma key não pode monopolizar todos os recursos
- **Estabilidade**: Carga distribuída previne picos de rate limit
- **Fairness**: Múltiplos clientes compartilham capacidade equitativamente
- **QoS**: Keys premium podem ter limites maiores que keys free

## Situação Atual (Antes)

```
Key "free-demo" → sem limite de concorrência
  → Cliente envia 50 requests simultâneas para claude-sonnet
  → Todas vão para os mesmos 3 deployments
  → 429s em cascata para TODOS os usuários do sistema
  → Sem proteção ou fairness
```

## Situação Proposta (Depois)

```
Key "free-demo" → maxParallelRequests: 5
  → Requests 1-5: executam imediatamente
  → Requests 6-50: enfileiradas
  → Conforme 1-5 terminam, próximas da fila executam
  → Timeout de 30s na fila → 503 "Service Busy"
  → Outros clientes não são afetados

Key "premium-client" → maxParallelRequests: 25
  → Maior capacidade para clientes pagos
```

## Especificação Técnica

### Semaphore Pattern

```javascript
// src/lib/concurrency/semaphore.js

class Semaphore {
  constructor(maxConcurrency) {
    this.max = maxConcurrency;
    this.current = 0;
    this.queue = [];
  }

  async acquire(timeoutMs = 30000) {
    if (this.current < this.max) {
      this.current++;
      return true;
    }

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const idx = this.queue.indexOf(entry);
        if (idx !== -1) this.queue.splice(idx, 1);
        reject(new Error("Parallel request limit exceeded"));
      }, timeoutMs);

      const entry = {
        resolve: () => {
          clearTimeout(timer);
          this.current++;
          resolve(true);
        },
      };
      this.queue.push(entry);
    });
  }

  release() {
    this.current--;
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next.resolve();
    }
  }
}

// ── Per-Key Limiter ──
const keyLimiters = new Map(); // keyId -> Semaphore

export function getKeyLimiter(keyId, maxParallel = 10) {
  if (!keyLimiters.has(keyId)) {
    keyLimiters.set(keyId, new Semaphore(maxParallel));
  }
  return keyLimiters.get(keyId);
}

export function removeKeyLimiter(keyId) {
  keyLimiters.delete(keyId);
}
```

### Integração com o SSE Handler

```javascript
// Em src/sse/handlers/chat.js
import { getKeyLimiter } from "../../lib/concurrency/semaphore.js";

export async function handleChat(req) {
  const apiKeyId = req.headers.get("x-api-key-id");
  const maxParallel = getKeyConfig(apiKeyId)?.maxParallelRequests || 10;
  const limiter = getKeyLimiter(apiKeyId, maxParallel);

  try {
    await limiter.acquire(30000); // 30s timeout na fila
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Too many parallel requests. Please retry later.",
          type: "rate_limit_exceeded",
          code: "parallel_limit",
        },
      }),
      { status: 429 }
    );
  }

  try {
    // ... processar request normalmente
    return await processChat(req);
  } finally {
    limiter.release(); // Sempre liberar, mesmo com erro
  }
}
```

## Arquivos a Criar/Modificar

| Arquivo                            | Ação                                                    |
| ---------------------------------- | ------------------------------------------------------- |
| `src/lib/concurrency/semaphore.js` | **NOVO** — Semaphore + per-key limiter                  |
| `src/sse/handlers/chat.js`         | **MODIFICAR** — Integrar acquire/release                |
| `src/lib/db/apiKeys.js`            | **MODIFICAR** — Adicionar maxParallelRequests ao schema |
| `src/app/api/keys/route.js`        | **MODIFICAR** — CRUD de maxParallel                     |

## Critérios de Aceite

- [ ] Requisições além do limite são enfileiradas (não rejeitadas imediatamente)
- [ ] Timeout de fila configurável (default 30s) → 429 após timeout
- [ ] `release()` sempre chamado (mesmo em caso de erro) via `finally`
- [ ] Dashboard exibe requisições simultâneas ativas por key
- [ ] `maxParallelRequests` configurável via API por key
- [ ] Sem deadlocks possíveis (Semaphore simples com queue FIFO)

## Referência

- [LiteLLM: router_strategy/budget_limiter.py](https://github.com/BerriAI/litellm/blob/main/litellm/router_strategy/budget_limiter.py) — max_parallel_requests enforcement
