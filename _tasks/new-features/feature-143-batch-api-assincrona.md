# Feature 143 — Batch API Assíncrona

## Resumo

Implementar endpoint `/api/sse/batches` para processamento assíncrono em lote, permitindo submeter centenas de requisições num único call com execução em background e polling de status. Compatível com a Batch API da OpenAI.

## Motivação

O LiteLLM em `proxy/batches_endpoints/` implementa passthrough para a Batch API da OpenAI, que oferece desconto de 50% para processamento não-urgente. O OmniRoute não tem processamento assíncrono — todas as requisições são síncronas. Clientes que precisam processar grandes volumes (avaliações em massa, migração de dados, análise de corpus) são obrigados a fazer calls sequenciais.

## O que ganhamos

- **Desconto de custo**: Batch processing tem custo menor em vários provedores
- **Throughput**: Processar centenas de requisições sem saturar conexões
- **Rate limit friendly**: Processamento respeitando limites, sem pressão
- **Observabilidade**: Status de cada batch com progresso detalhado
- **Idempotência**: Retries automáticos para itens que falharam

## Situação Atual (Antes)

```
Cliente precisa avaliar 500 prompts:
  → Loop de 500 requests sequenciais
  → Rate limits a cada ~100 requests
  → Timeout do cliente
  → Se a conexão cair, recomeça do zero
  → Sem tracking de progresso
```

## Situação Proposta (Depois)

```
POST /api/sse/batches
Body: {
  "requests": [
    {"model": "gpt-4o", "messages": [{"role": "user", "content": "Pergunta 1"}]},
    {"model": "gpt-4o", "messages": [{"role": "user", "content": "Pergunta 2"}]},
    ... (500 items)
  ],
  "completion_window": "24h",
  "metadata": {"description": "Avaliação Q1"}
}

Response: { "id": "batch_abc123", "status": "validating", "total": 500 }

GET /api/sse/batches/batch_abc123
Response: {
  "id": "batch_abc123",
  "status": "in_progress",
  "total": 500,
  "completed": 312,
  "failed": 3,
  "estimated_completion": "2026-02-17T04:00:00Z"
}

GET /api/sse/batches/batch_abc123/results
Response: [
  {"index": 0, "status": "completed", "response": {...}},
  {"index": 1, "status": "completed", "response": {...}},
  {"index": 2, "status": "failed", "error": "rate_limit"},
  ...
]
```

## Especificação Técnica

### Modelo de Dados

```javascript
// SQLite: batch_jobs table
// id TEXT PRIMARY KEY, status TEXT, total INTEGER, completed INTEGER,
// failed INTEGER, requests TEXT (JSON), results TEXT (JSON),
// created_at INTEGER, completed_at INTEGER, metadata TEXT (JSON)
```

### Batch Processor

```javascript
// src/lib/batch/batchProcessor.js

import { nanoid } from "nanoid";

const CONCURRENCY = 5; // Max requests simultâneas por batch
const RETRY_LIMIT = 3;

export class BatchProcessor {
  constructor(db) {
    this.db = db;
    this.activeBatches = new Map();
  }

  async create(requests, options = {}) {
    const batch = {
      id: `batch_${nanoid(12)}`,
      status: "validating",
      total: requests.length,
      completed: 0,
      failed: 0,
      requests,
      results: new Array(requests.length).fill(null),
      createdAt: Date.now(),
      metadata: options.metadata || {},
    };

    this.db.saveBatch(batch);

    // Processar em background
    setImmediate(() => this._process(batch));

    return { id: batch.id, status: batch.status, total: batch.total };
  }

  async _process(batch) {
    batch.status = "in_progress";
    this.db.updateBatchStatus(batch.id, "in_progress");

    // Processar com concurrency limitada
    const queue = batch.requests.map((req, index) => ({ req, index, retries: 0 }));
    const active = new Set();

    while (queue.length > 0 || active.size > 0) {
      while (active.size < CONCURRENCY && queue.length > 0) {
        const item = queue.shift();
        const promise = this._processItem(batch, item).finally(() => active.delete(promise));
        active.add(promise);
      }
      await Promise.race([...active]);
    }

    batch.status = batch.failed > 0 ? "completed_with_errors" : "completed";
    batch.completedAt = Date.now();
    this.db.updateBatchStatus(batch.id, batch.status);
  }

  async _processItem(batch, item) {
    try {
      const response = await processChat(item.req); // Reusar lógica SSE
      batch.results[item.index] = { status: "completed", response };
      batch.completed++;
    } catch (err) {
      if (item.retries < RETRY_LIMIT) {
        item.retries++;
        // Re-enqueue com delay
        await new Promise((r) => setTimeout(r, 1000 * item.retries));
        return this._processItem(batch, item);
      }
      batch.results[item.index] = { status: "failed", error: err.message };
      batch.failed++;
    }
    // Update progress periodicamente
    this.db.updateBatchProgress(batch.id, batch.completed, batch.failed);
  }
}
```

### API Routes

```javascript
// src/app/api/batches/route.js

// POST — Criar batch
export async function POST(req) {
  /* create batch */
}

// GET — Listar batches
export async function GET(req) {
  /* list batches */
}

// src/app/api/batches/[id]/route.js
// GET — Status do batch

// src/app/api/batches/[id]/results/route.js
// GET — Resultados do batch
```

## Arquivos a Criar/Modificar

| Arquivo                                     | Ação                                     |
| ------------------------------------------- | ---------------------------------------- |
| `src/lib/batch/batchProcessor.js`           | **NOVO** — Engine de processamento batch |
| `src/lib/db/batches.js`                     | **NOVO** — CRUD de batch jobs no SQLite  |
| `src/app/api/batches/route.js`              | **NOVO** — Create + List                 |
| `src/app/api/batches/[id]/route.js`         | **NOVO** — Status + Cancel               |
| `src/app/api/batches/[id]/results/route.js` | **NOVO** — Download results              |

## Critérios de Aceite

- [ ] POST cria batch e retorna imediatamente com ID
- [ ] Processamento em background com concurrency limitada (5)
- [ ] GET retorna status com progresso (completed/failed/total)
- [ ] Retry automático até 3x para itens com falha
- [ ] Resultados completos disponíveis via GET results
- [ ] Cancel endpoint para abortar batch em andamento
- [ ] Não mais que 1000 items por batch (validação)

## Referência

- [LiteLLM: proxy/batches_endpoints/](https://github.com/BerriAI/litellm/tree/main/litellm/proxy/batches_endpoints)
- [OpenAI Batch API](https://platform.openai.com/docs/api-reference/batch)
