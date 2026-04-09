# Feature 141 — Dual Cache Layer

## Resumo

Implementar uma camada de cache dupla (in-memory LRU + SQLite persistente) onde o cache in-memory serve como L1 ultra-rápido e o SQLite como L2 persistente. Hits no L1 evitam qualquer I/O, enquanto o L2 garante sobrevivência a restarts.

## Motivação

O LiteLLM em `litellm/caching/dual_cache.py` combina in-memory com Redis numa arquitetura "read L1 first, then L2". O OmniRoute tem `cacheLayer.js` (in-memory simples) e `semanticCache.js` (embeddings), mas não tem combinação L1/L2 para responses. Isso significa que:

- Restart do servidor perde todo o cache
- Sem warmup automático do cache
- Sem métricas de hit/miss

## O que ganhamos

- **Latência ~0ms em hits L1**: Respostas servidas da memória sem I/O
- **Persistência**: Cache sobrevive restarts via SQLite L2
- **Warmup automático**: L1 se aquece progressivamente via reads do L2
- **Métricas**: Hit rate, latência média, tamanho do cache
- **TTL duplo**: L1 com TTL curto (ex: 5min), L2 com TTL longo (ex: 24h)

## Situação Atual (Antes)

```
Request A: "Hello" → cache miss → upstream → 500ms → response
Request B: "Hello" → cache miss (restart) → upstream → 500ms → response
Request C: "Hello" → cache miss (evicted) → upstream → 500ms → response

→ Sem persistência, sem métricas
→ cacheLayer.js: Map simples sem LRU ou TTL
```

## Situação Proposta (Depois)

```
Request A: "Hello" → L1 miss → L2 miss → upstream → 500ms → salva L1+L2
Request B: "Hello" → L1 HIT → 0.1ms → response (sem I/O)
  [restart]
Request C: "Hello" → L1 miss → L2 HIT → 2ms → salva L1 → response
Request D: "Hello" → L1 HIT → 0.1ms → response

Métricas: { l1_hits: 2, l2_hits: 1, misses: 1, hit_rate: 75% }
```

## Especificação Técnica

### DualCache Implementation

```javascript
// src/lib/cache/dualCache.js

import { LRUCache } from "lru-cache";
import db from "../db/core.js";

const DEFAULT_L1_MAX = 500; // max entries in memory
const DEFAULT_L1_TTL = 300_000; // 5 minutes
const DEFAULT_L2_TTL = 86400; // 24 hours (seconds, for SQLite)

class DualCache {
  constructor(options = {}) {
    this.l1 = new LRUCache({
      max: options.maxL1 || DEFAULT_L1_MAX,
      ttl: options.ttlL1 || DEFAULT_L1_TTL,
    });

    this.l2TTL = options.ttlL2 || DEFAULT_L2_TTL;
    this.metrics = { l1_hits: 0, l2_hits: 0, misses: 0, sets: 0 };

    this._initL2Table();
  }

  /**
   * Buscar valor: L1 → L2 → null
   */
  async get(key) {
    // L1: in-memory
    const l1Value = this.l1.get(key);
    if (l1Value !== undefined) {
      this.metrics.l1_hits++;
      return l1Value;
    }

    // L2: SQLite
    const l2Row = this._l2Get(key);
    if (l2Row) {
      this.metrics.l2_hits++;
      const value = JSON.parse(l2Row.value);
      // Warm L1
      this.l1.set(key, value);
      return value;
    }

    this.metrics.misses++;
    return null;
  }

  /**
   * Salvar valor em ambos os níveis.
   */
  async set(key, value, ttlL2 = null) {
    // L1
    this.l1.set(key, value);

    // L2
    const serialized = JSON.stringify(value);
    const expiresAt = Math.floor(Date.now() / 1000) + (ttlL2 || this.l2TTL);
    this._l2Set(key, serialized, expiresAt);

    this.metrics.sets++;
  }

  /**
   * Invalidar em ambos os níveis.
   */
  async delete(key) {
    this.l1.delete(key);
    this._l2Delete(key);
  }

  /**
   * Métricas de performance.
   */
  getMetrics() {
    const total = this.metrics.l1_hits + this.metrics.l2_hits + this.metrics.misses;
    return {
      ...this.metrics,
      total_requests: total,
      hit_rate:
        total > 0
          ? (((this.metrics.l1_hits + this.metrics.l2_hits) / total) * 100).toFixed(1) + "%"
          : "0%",
      l1_size: this.l1.size,
    };
  }

  // ── L2 (SQLite) internals ──

  _initL2Table() {
    db.exec(`
      CREATE TABLE IF NOT EXISTS response_cache (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s', 'now'))
      )
    `);
    // Cleanup job: remove expired entries periodicamente
    setInterval(() => this._l2Cleanup(), 600_000); // 10 min
  }

  _l2Get(key) {
    const now = Math.floor(Date.now() / 1000);
    return db
      .prepare("SELECT value FROM response_cache WHERE key = ? AND expires_at > ?")
      .get(key, now);
  }

  _l2Set(key, value, expiresAt) {
    db.prepare(
      `
      INSERT OR REPLACE INTO response_cache (key, value, expires_at)
      VALUES (?, ?, ?)
    `
    ).run(key, value, expiresAt);
  }

  _l2Delete(key) {
    db.prepare("DELETE FROM response_cache WHERE key = ?").run(key);
  }

  _l2Cleanup() {
    const now = Math.floor(Date.now() / 1000);
    const result = db.prepare("DELETE FROM response_cache WHERE expires_at <= ?").run(now);
    if (result.changes > 0) {
      console.log(`[DualCache] Cleaned ${result.changes} expired entries`);
    }
  }
}

export const responseCache = new DualCache();
```

### Cache Key Generator

```javascript
// Gerar key baseada no conteúdo da requisição
export function generateCacheKey(model, messages, params = {}) {
  const content = JSON.stringify({
    model,
    messages,
    temperature: params.temperature,
    max_tokens: params.max_tokens,
    // Excluir: stream, metadata, user
  });

  // Hash SHA-256 para key compacta
  const hash = crypto.createHash("sha256").update(content).digest("hex");
  return `chat:${model}:${hash.slice(0, 16)}`;
}
```

## Arquivos a Criar/Modificar

| Arquivo                      | Ação                                            |
| ---------------------------- | ----------------------------------------------- |
| `src/lib/cache/dualCache.js` | **NOVO** — Implementação DualCache (L1+L2)      |
| `src/lib/cacheLayer.js`      | **DEPRECAR** — Gradual migration para DualCache |
| `src/sse/handlers/chat.js`   | **MODIFICAR** — Cache lookup antes do upstream  |
| `src/app/api/cache/route.js` | **NOVO** — Endpoint para métricas e invalidação |

## Critérios de Aceite

- [ ] L1 (in-memory LRU) com TTL de 5 minutos e max 500 entries
- [ ] L2 (SQLite) com TTL de 24 horas
- [ ] Warmup: read de L2 popula L1 automaticamente
- [ ] Métricas de hit/miss/hit_rate expostas via API
- [ ] L2 cleanup automático de entries expiradas a cada 10 min
- [ ] Bypass via header `Cache-Control: no-cache`
- [ ] Invalidação funciona em ambos os níveis

## Referência

- [LiteLLM: caching/dual_cache.py](https://github.com/BerriAI/litellm/blob/main/litellm/caching/dual_cache.py)
- [LiteLLM: caching/caching_handler.py](https://github.com/BerriAI/litellm/blob/main/litellm/caching/caching_handler.py) — LLMCachingHandler
