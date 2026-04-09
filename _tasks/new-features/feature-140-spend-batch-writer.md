# Feature 140 — Spend Batch Writer

## Resumo

Substituir a gravação síncrona de custos por um buffer em memória com flush periódico ao banco de dados, reduzindo significativamente a carga de I/O no SQLite durante picos de tráfego.

## Motivação

O LiteLLM em `proxy/db/db_spend_update_writer.py` usa um `DBSpendUpdateWriter` que acumula updates de spend em memória e faz batch writes ao PostgreSQL a cada 60 segundos. No OmniRoute, `costRules.js` e `usageDb.js` gravam cada evento de custo individualmente no SQLite. Sob carga (centenas de requisições/minuto), isso cria contention no banco, latência em writes, e potencial de WAL bloat.

## O que ganhamos

- **Performance**: ~100x menos operações de write no SQLite
- **Latência reduzida**: Requisições não esperam I/O do banco para retornar
- **Estabilidade**: Elimina contention do SQLite sob carga
- **Durabilidade**: Flush periódico + flush on shutdown garante zero perda

## Situação Atual (Antes)

```
Request 1: calcCost() → INSERT INTO usage_events ← 1 write
Request 2: calcCost() → INSERT INTO usage_events ← 1 write
...
Request 100: calcCost() → INSERT INTO usage_events ← 1 write

Total: 100 writes/min ao SQLite
→ Cada write: 0.5-2ms (WAL mode)
→ Latência adicionada: 50-200ms/min em I/O
→ Contention: writes bloqueiam reads concorrentes
```

## Situação Proposta (Depois)

```
Request 1: buffer.increment(key, 0.001)   ← in-memory, ~0ms
Request 2: buffer.increment(key, 0.002)   ← in-memory, ~0ms
...
Request 100: buffer.increment(key, 0.005) ← in-memory, ~0ms

--- A cada 60 segundos ---
Flush: 1 batch INSERT com 15 keys agregadas ← 1 write
→ Total: 1 write/min ao SQLite (em vez de 100)
→ Latência adicionada: ~0ms por requisição
→ Zero contention
```

## Especificação Técnica

### Buffer de Spend

```javascript
// src/lib/spend/batchWriter.js

const FLUSH_INTERVAL_MS = 60_000; // 60 seconds
const MAX_BUFFER_SIZE = 1000; // Safety: flush if buffer too large

class SpendBatchWriter {
  constructor() {
    this.buffer = new Map(); // keyId -> { spend: 0, tokens_in: 0, tokens_out: 0, count: 0 }
    this.eventBuffer = []; // Detailed events for usage_events table
    this._timer = null;
    this._flushing = false;
  }

  /**
   * Iniciar flush periódico.
   */
  start() {
    this._timer = setInterval(() => this.flush(), FLUSH_INTERVAL_MS);
    // Flush on process exit
    process.on("beforeExit", () => this.flush());
    process.on("SIGTERM", () => {
      this.flush();
      process.exit(0);
    });
    process.on("SIGINT", () => {
      this.flush();
      process.exit(0);
    });
  }

  /**
   * Acumular custo (chamado a cada requisição).
   */
  increment(keyId, cost, tokensIn = 0, tokensOut = 0, metadata = {}) {
    const entry = this.buffer.get(keyId) || { spend: 0, tokens_in: 0, tokens_out: 0, count: 0 };
    entry.spend += cost;
    entry.tokens_in += tokensIn;
    entry.tokens_out += tokensOut;
    entry.count += 1;
    this.buffer.set(keyId, entry);

    // Buffer detalhado de eventos (para usage_events table)
    this.eventBuffer.push({
      keyId,
      cost,
      tokensIn,
      tokensOut,
      model: metadata.model,
      provider: metadata.provider,
      timestamp: Date.now(),
    });

    // Safety flush se buffer muito grande
    if (this.eventBuffer.length >= MAX_BUFFER_SIZE) {
      this.flush();
    }
  }

  /**
   * Flush buffer para banco.
   */
  async flush() {
    if (this._flushing || (this.buffer.size === 0 && this.eventBuffer.length === 0)) return;

    this._flushing = true;
    try {
      // 1. Batch update de spend por key (UPDATE ... SET spend = spend + ?)
      const spendUpdates = [...this.buffer.entries()];
      this.buffer.clear();

      for (const [keyId, data] of spendUpdates) {
        // Uma operação de update por key (não por request!)
        await updateKeySpend(keyId, data.spend, data.tokens_in, data.tokens_out, data.count);
      }

      // 2. Batch insert de eventos detalhados
      const events = [...this.eventBuffer];
      this.eventBuffer = [];

      if (events.length > 0) {
        await batchInsertUsageEvents(events);
      }

      console.log(`[SpendWriter] Flushed: ${spendUpdates.length} keys, ${events.length} events`);
    } catch (err) {
      console.error("[SpendWriter] Flush error:", err.message);
      // Re-buffer on failure (não perder dados)
    } finally {
      this._flushing = false;
    }
  }

  stop() {
    if (this._timer) clearInterval(this._timer);
    this.flush(); // Final flush
  }
}

export const spendWriter = new SpendBatchWriter();
```

### Batch Insert Helper

```javascript
// src/lib/db/usage.js — novo método

export function batchInsertUsageEvents(events) {
  const stmt = db.prepare(`
    INSERT INTO usage_events (key_id, cost, tokens_in, tokens_out, model, provider, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction((events) => {
    for (const e of events) {
      stmt.run(e.keyId, e.cost, e.tokensIn, e.tokensOut, e.model, e.provider, e.timestamp);
    }
  });

  tx(events); // All inserts in one transaction = 100x faster
}
```

## Como fazer (passo a passo)

1. Introduzir writer singleton com buffer por chave e flush periódico configurável.
2. Trocar gravação síncrona por `increment()` no ponto de cálculo de custo.
3. Implementar flush transacional em lote para eventos de usage e acumulados de spend.
4. Garantir flush em shutdown gracioso (`SIGTERM`, `SIGINT`, `beforeExit`).
5. Rebufferizar dados em caso de falha no flush para evitar perda de contabilização.
6. Instrumentar métricas de lote (tamanho, tempo de flush, erro) para operação.

## Arquivos a Criar/Modificar

| Arquivo                        | Ação                                             |
| ------------------------------ | ------------------------------------------------ |
| `src/lib/spend/batchWriter.js` | **NOVO** — Buffer + flush periódico              |
| `src/lib/usageDb.js`           | **MODIFICAR** — Adicionar batchInsertUsageEvents |
| `src/domain/costRules.js`      | **MODIFICAR** — Usar spendWriter.increment()     |
| `src/server-init.js`           | **MODIFICAR** — Iniciar spendWriter.start()      |

## Critérios de Aceite

- [ ] Custo acumulado em memória e flushed a cada 60s
- [ ] Batch INSERT usa transaction SQLite para performance
- [ ] Flush automático se buffer exceder 1000 eventos
- [ ] Flush garantido em SIGTERM/SIGINT (graceful shutdown)
- [ ] Zero perda de dados: re-buffer em caso de erro de flush
- [ ] Log a cada flush com contagem de keys e eventos

## Referência

- [LiteLLM: proxy/db/db_spend_update_writer.py](https://github.com/BerriAI/litellm/blob/main/litellm/proxy/db/db_spend_update_writer.py)
- [LiteLLM: proxy/db/pod_lock_manager.py](https://github.com/BerriAI/litellm/blob/main/litellm/proxy/db/pod_lock_manager.py) — lock management para multi-pod flush
