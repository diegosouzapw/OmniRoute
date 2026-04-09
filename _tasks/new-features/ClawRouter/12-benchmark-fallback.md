# 12 — Benchmark-Driven Fallback Chains: Latência Real no Routing

> **Prioridade**: 🟡 Média  
> **Categoria**: Otimização de performance do AutoCombo  
> **Impacto**: Ordenar fallback chains com base em latência P50/P95 medida, não apenas custo

---

## Contexto e Motivação

O ClawRouter rodou um **benchmark end-to-end de latência em 39 modelos** e usa os dados
para ordenar as fallback chains. Os resultados mais relevantes:

```
grok-4-fast-non-reasoning: 1143ms  ← mais rápido!
grok-4-1-fast-non-reasoning: 1244ms
gemini-2.5-flash: 1238ms (60% retention rate)
kimi-k2.5: 1646ms
gpt-4o-mini: 2764ms
claude-sonnet: 3000-5000ms
gpt-4o: 3500ms
```

Isso produziu uma mudança no commit `0.12.47`:
- `grok-4-fast-non-reasoning` foi promovido para PRIMARY na tier SIMPLE
- `kimi-k2.5` promovido para PRIMARY na tier MEDIUM
- `gemini-2.5-flash` permaneceu como opção mas com nota de "60% retention"

**Para o OmniRoute**: Nosso `autoCombo` scoring considera custo mas não latência empírica.
Adicionar um componente de latência ao score final resultaria em routing mais rápido.

---

## Estratégia: Moving Average de Latência

Ao invés de fazer benchmarks manuais periódicos (como o ClawRouter), implementar um
**moving average de latência** calculado automaticamente com base nas requests reais.

Para cada model+provider, manter:
- P50 (mediana), P95, P99 de latência
- Contagem de requests nas últimas 24h/7d
- Taxa de erro (como % das requests)

Usar esses dados no scoring do AutoCombo.

---

## Arquivos a Modificar

```
src/lib/db/settings.ts                     ← ou usageDb.ts — guardar latência por modelo
src/lib/usageDb.ts                         ← armazenar latência junto com usage
open-sse/handlers/chatCore.ts             ← medir e salvar latência de cada request
open-sse/services/autoCombo/scorer.ts     ← usar latência no score final
```

---

## Passo 1: Adicionar campo de latência no Usage DB

Verificar `src/lib/usageDb.ts` — já salva usage de tokens por request.
Adicionar campos de timing:

```typescript
// Em usageDb.ts, ao salvar uma request:
interface RequestUsageEntry {
  // Campos existentes:
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  timestamp: number;

  // NOVOS campos de timing:
  latencyMs: number;          // tempo total request→response
  timeToFirstTokenMs: number; // TTFT para streaming
  success: boolean;           // true = 200, false = erro
  errorCode?: number;         // código HTTP se falhou
}
```

### Schema SQLite para latência:

Se a tabela `usage` não tiver os campos de latência, adicionar via migration:

```sql
-- Migration: adicionar campos de latência na tabela usage
ALTER TABLE usage ADD COLUMN latency_ms INTEGER DEFAULT 0;
ALTER TABLE usage ADD COLUMN ttft_ms INTEGER DEFAULT 0;
ALTER TABLE usage ADD COLUMN success INTEGER DEFAULT 1;
ALTER TABLE usage ADD COLUMN error_code INTEGER;

-- Vista agregada para scoring do AutoCombo:
CREATE VIEW IF NOT EXISTS model_latency_stats AS
SELECT
  provider,
  model,
  COUNT(*) as total_requests,
  AVG(latency_ms) as avg_latency_ms,
  -- P50 (mediana via SQLite):
  (SELECT latency_ms FROM usage u2
   WHERE u2.provider = u.provider AND u2.model = u.model AND u2.success = 1
   ORDER BY latency_ms
   LIMIT 1 OFFSET (COUNT(*) / 2)) as p50_latency_ms,
  AVG(CASE WHEN success = 1 THEN 1.0 ELSE 0.0 END) as success_rate,
  MAX(timestamp) as last_used
FROM usage u
WHERE timestamp > (strftime('%s', 'now') - 86400) * 1000  -- últimas 24h
GROUP BY provider, model;
```

---

## Passo 2: Medir Latência em `chatCore.ts`

```typescript
// Em open-sse/handlers/chatCore.ts, ao executar request:

const requestStartMs = Date.now();
let timeToFirstTokenMs: number | null = null;

// Para streaming, medir TTFT:
const onFirstChunk = () => {
  if (timeToFirstTokenMs === null) {
    timeToFirstTokenMs = Date.now() - requestStartMs;
  }
};

let success = false;
try {
  const response = await executor.execute({ /* ... */ });
  success = response.status >= 200 && response.status < 300;
} catch (err) {
  success = false;
} finally {
  const latencyMs = Date.now() - requestStartMs;
  
  // Salvar no usage DB:
  await saveRequestLatency({
    provider: selectedProvider,
    model: selectedModel,
    latencyMs,
    timeToFirstTokenMs: timeToFirstTokenMs ?? latencyMs,
    success,
    errorCode: success ? undefined : lastErrorCode,
    timestamp: Date.now(),
  });
}
```

---

## Passo 3: Carregar Stats de Latência no AutoCombo

```typescript
// Em open-sse/services/autoCombo/index.ts:
import { getModelLatencyStats } from "../../lib/usageDb.ts";

// Ao inicializar o AutoCombo (ou ao receber um request):
const latencyStats = await getModelLatencyStats();
// latencyStats: Map<`${provider}/${model}`, { p50: number, successRate: number }>
```

---

## Passo 4: Incluir Latência no Score Final

```typescript
// Em scorerUtil.ts ou autoCombo/scorer.ts:

function calculateModelScore(
  model: ModelCandidate,
  latencyStats: LatencyStats | null,
  requestContext: RequestContext
): number {
  // Score base existente (custo, disponibilidade, etc.):
  let score = model.baseScore;

  // Adicionar componente de latência (se tiver dados suficientes):
  if (latencyStats && latencyStats.totalRequests >= 10) {
    // Normalizar latência: modelos mais rápidos ganham mais pontos
    // Referência: 1000ms = score 0, 5000ms = score -0.3
    const latencyPenalty = Math.max(0, (latencyStats.p50Latency - 1000) / 4000) * 0.3;
    score -= latencyPenalty;

    // Penalizar modelos com alta taxa de erro:
    const errorPenalty = (1 - latencyStats.successRate) * 0.5;
    score -= errorPenalty;
  }

  return score;
}
```

---

## Passo 5: Dashboard — Métricas de Latência por Modelo

Adicionar uma seção no `/dashboard/health` ou `/dashboard/analytics`
mostrando P50 de latência por modelo:

```
Model Latency Performance (últimas 24h)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
grok-4-fast    ████████░░░░░  1143ms P50  ████ 99.9%
gemini-flash   ████████░░░░░  1238ms P50  ████ 99.7%
kimi-k2.5      ██████████░░░  1646ms P50  ████ 98.1%
gpt-4o-mini    █████████████  2764ms P50  ████ 99.5%
claude-sonnet  ████████████████ 4200ms P50 ████ 99.8%
```

---

## Passo 6: Latência Inicial (Bootstrapping)

Para providers sem dados históricos, usar valores padrão baseados nos benchmarks do ClawRouter:

```typescript
// open-sse/services/autoCombo/defaultLatencies.ts
export const DEFAULT_LATENCY_MS: Record<string, number> = {
  // Baseado em benchmarks do ClawRouter 2026-03-17:
  "grok-4-fast-non-reasoning": 1143,
  "grok-4-1-fast-non-reasoning": 1244,
  "gemini-2.5-flash": 1238,
  "kimi-k2.5": 1646,
  "gpt-4o-mini": 2764,
  "gpt-4o": 3500,

  // Estimativas conservadoras para modelos sem benchmark:
  "claude-sonnet-4.6": 4000,
  "claude-opus-4.6": 6000,
  "deepseek-chat": 2000,
  "gemini-2.5-pro": 3000,
  "o3": 15000, // raciocínio lento mas profundo
};
```

---

## Testes de Validação

### Teste 1: Latência está sendo salva
```bash
# Fazer 20 requests
for i in {1..20}; do
  curl -X POST http://localhost:3000/v1/chat/completions ...
done

# Verificar no SQLite:
sqlite3 ~/.omniroute/data.db \
  "SELECT provider, model, AVG(latency_ms), COUNT(*) FROM usage GROUP BY provider, model"
```

### Teste 2: AutoCombo muda de preferência com latência alta
Simular um modelo lento (mock ou delay):
- Registrar manualmente uma P50 alta para um modelo
- Verificar que o AutoCombo passa a preferir alternativas mais rápidas

### Teste 3: Dashboard exibe métricas
Verificar em `/dashboard/health` que as métricas de latência aparecem após requests suficientes.

---

## Referências

- ClawRouter commit: `perf: benchmark-driven routing optimization based on latency test` (0.12.45)
- ClawRouter commit: `fix: restore quality models as auto primary` (0.12.47) — reverteu baseando-se em retention data
- ClawRouter: Latências medidas (grok-4-fast: 1143ms, gemini-flash: 1238ms, kimi: 1646ms)
