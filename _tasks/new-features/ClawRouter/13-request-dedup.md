# 13 — Request Deduplication: Evitar Chamadas Duplicadas Upstream

> **Prioridade**: 🟡 Média  
> **Categoria**: Feature de performance e custo  
> **Impacto**: Em cenários multi-agente, evita que requests idênticos simultâneos gerem múltiplas chamadas upstream (e custos duplos)

---

## Contexto e Motivação

O ClawRouter tem um módulo `src/dedup.ts` (5.244 bytes) que implementa **deduplicação de requests**.

O cenário que isso resolve:
```
Agente A → OmniRoute: "Summarize this document" (mesmo texto)
Agente B → OmniRoute: "Summarize this document" (mesmo texto)
                              ↓
         Sem dedup: 2 chamadas upstream ($$$)
         Com dedup: 1 chamada upstream, resultado compartilhado ($)
```

Em workflows multi-agente (A2A, MCP multi-session), esse padrão é comum:
múltiplos sub-agentes fazem o mesmo call para obter contexto compartilhado.

---

## Estratégia de Implementação

Usar um **in-memory Map** de `request_hash → Promise<response>`.

Quando chega um request:
1. Calcular hash do request (model + messages + temperature + tools)
2. Se já existe uma Promise em andamento para esse hash → retornar a mesma Promise
3. Se não existe → criar Promise, adicionar ao Map, executar upstream
4. Quando a Promise resolver → remover do Map e retornar resultado

Isso garante que requests **simultâneos** (não sequenciais) com mesmo conteúdo
compartilhem o resultado, mas requests subsequentes (após a primeira terminar)
ainda façam novos calls (pois o cache foi limpo).

---

## Arquivos a Modificar

```
open-sse/handlers/chatCore.ts          ← ponto de entrada para aplicar dedup
open-sse/services/requestDedup.ts     ← NOVO arquivo (criar)
```

---

## Passo 1: Criar `open-sse/services/requestDedup.ts`

```typescript
/**
 * Request Deduplication Service
 *
 * Deduplica requests idênticos **simultâneos** ao mesmo upstream.
 * Requests com o mesmo hash que chegam enquanto outro está em andamento
 * recebem o mesmo resultado sem gerar chamada upstream adicional.
 *
 * Inspirado pelo módulo dedup.ts do ClawRouter (BlockRunAI).
 * 
 * IMPORTANTE: Apenas para requests determinísticos (temperature=0 ou baixa).
 * Requests com temperature alta NÃO são deduplicados (resultados diferentes esperados).
 */

import { createHash } from "node:crypto";

// Tipo da função que executa o request real
type RequestFn<T> = () => Promise<T>;

// Interface para configuração
export interface DedupConfig {
  enabled: boolean;
  // Deduplica apenas requests com temperature <= este threshold:
  maxTemperatureForDedup: number;
  // TTL do cache em-andamento (failsafe — normalmente limpa ao resolver):
  timeoutMs: number;
}

export const DEFAULT_DEDUP_CONFIG: DedupConfig = {
  enabled: true,
  maxTemperatureForDedup: 0.1, // apenas requests quasi-determinísticos
  timeoutMs: 30_000,           // 30s failsafe timeout
};

// Map de hash → Promise em andamento
const inflight = new Map<string, Promise<unknown>>();

/**
 * Calcular hash único para um request.
 * Inclui: model, messages (serializado), temperature, tools, max_tokens.
 * Exclui: stream, user, metadata (não afetam o resultado do LLM).
 */
export function computeRequestHash(requestBody: unknown): string {
  const body = requestBody as Record<string, unknown>;
  
  const relevantFields = {
    model: body.model,
    messages: body.messages,
    temperature: body.temperature ?? 1.0,
    tools: body.tools ?? null,
    tool_choice: body.tool_choice ?? null,
    max_tokens: body.max_tokens ?? null,
    response_format: body.response_format ?? null,
    // Não incluir: stream, user, stream_options, metadata
  };
  
  const serialized = JSON.stringify(relevantFields, null, 0);
  return createHash("sha256").update(serialized).digest("hex").slice(0, 16);
}

/**
 * Executar um request com deduplicação.
 * Se já existe um request com o mesmo hash em andamento, aguarda o resultado.
 * 
 * @param hash - Hash único do request
 * @param requestFn - Função que executa o request real
 * @param config - Configuração de dedup
 * @returns Promise com o resultado (compartilhado entre requests duplicados)
 */
export async function deduplicatedExecute<T>(
  hash: string,
  requestFn: RequestFn<T>,
  config: DedupConfig = DEFAULT_DEDUP_CONFIG,
): Promise<{ result: T; wasDeduplicated: boolean }> {
  if (!config.enabled) {
    const result = await requestFn();
    return { result, wasDeduplicated: false };
  }

  // Verificar se já existe um request com esse hash em andamento:
  const existing = inflight.get(hash);
  if (existing) {
    // Request duplicado — aguardar o resultado do request original:
    console.debug(`[Dedup] Request ${hash} deduplicated — reusing inflight result`);
    const result = await existing as T;
    return { result, wasDeduplicated: true };
  }

  // Criar Promise e registrar no Map:
  const timeoutSignal = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Dedup timeout after ${config.timeoutMs}ms`)), config.timeoutMs)
  );

  const promise = Promise.race([requestFn(), timeoutSignal]) as Promise<T>;
  inflight.set(hash, promise);

  try {
    const result = await promise;
    return { result, wasDeduplicated: false };
  } finally {
    // Limpar do Map após resolver (sucesso ou erro):
    inflight.delete(hash);
  }
}

/**
 * Verificar se um request deve ser deduplicado com base na temperatura.
 * Requests com alta temperatura (resultado aleatório) NÃO devem ser deduplicados.
 */
export function shouldDedup(
  requestBody: unknown,
  config: DedupConfig,
): boolean {
  if (!config.enabled) return false;
  
  const body = requestBody as Record<string, unknown>;
  const temperature = typeof body.temperature === "number" ? body.temperature : 1.0;
  
  // Não deduplicar streaming (resultados são SSE streams, não objetos simples):
  if (body.stream === true) return false;
  
  // Não deduplicar alta temperatura:
  if (temperature > config.maxTemperatureForDedup) return false;
  
  return true;
}

/**
 * Número atual de requests em andamento (para monitoring).
 */
export function getInflightCount(): number {
  return inflight.size;
}

/**
 * Limpar todos os requests em andamento (para shutdown gracioso).
 */
export function clearInflight(): void {
  inflight.clear();
}
```

---

## Passo 2: Integrar em `chatCore.ts`

Localizar o ponto em `chatCore.ts` onde o request é enviado para o executor upstream.
Adicionar a camada de dedup:

```typescript
// Em open-sse/handlers/chatCore.ts:
import {
  computeRequestHash,
  deduplicatedExecute,
  shouldDedup,
  DEFAULT_DEDUP_CONFIG,
} from "../services/requestDedup.ts";

// ... no handler principal:
async function handleChatCompletion(req: Request): Promise<Response> {
  const bodyText = await req.text();
  const requestBody = JSON.parse(bodyText);

  // Determinar se devemos dedup este request:
  if (shouldDedup(requestBody, DEFAULT_DEDUP_CONFIG)) {
    const hash = computeRequestHash(requestBody);
    
    const { result, wasDeduplicated } = await deduplicatedExecute(
      hash,
      () => executeUpstreamRequest(requestBody, /* ... */),
      DEFAULT_DEDUP_CONFIG,
    );
    
    // Adicionar header indicando dedup (útil para debug):
    const headers = new Headers(result.headers);
    if (wasDeduplicated) {
      headers.set("X-Dedup-Status", "deduplicated");
    }
    
    return new Response(result.body, { status: result.status, headers });
  }

  // Executar normalmente (streaming ou alta temperatura):
  return executeUpstreamRequest(requestBody, /* ... */);
}
```

---

## Passo 3: Expor Métricas no Dashboard

Adicionar uma métrica de "deduplicated requests" no dashboard de analytics:

```typescript
// Ao logar uso:
await logProxyRequest({
  // ... campos existentes ...
  wasDeduplicated: wasDeduplicated,
});

// No analytics, exibir:
// "Requests deduplicados: 45 (2.3% do total) — economia: $0.032"
```

---

## Considerações Importantes

### O que NÃO deve ser deduplicado:

1. **Requests streaming** (`stream: true`) — os SSE streams não podem ser compartilhados facilmente
2. **Alta temperatura** (> 0.1) — usuário espera resultados variados
3. **Requests com `seed`** — implica que o usuário quer resultados reproduzíveis mas distintos
4. **Requests de embedding** — geralmente determinísticos, mas têm volume alto e o Map cresceria

### Limitações da implementação In-Memory:

- Se o processo reiniciar, o state é perdido (não é problema — requests em andamento estão caindo de qualquer forma)
- Em deploy com múltiplas instâncias (load balancer), a dedup não funciona cross-instance (apenas intra-processo)
- Para dedup cross-instance, precisaria de Redis ou similar (FORA do escopo desta feature)

---

## Testes de Validação

### Teste 1: Dedup básico (requests idênticos simultâneos)
```typescript
// Teste de integração:
const results = await Promise.all([
  fetch("http://localhost:3000/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({ model: "gpt-4o", messages: [{role:"user", content:"Hello"}], temperature: 0 }),
  }),
  fetch("http://localhost:3000/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({ model: "gpt-4o", messages: [{role:"user", content:"Hello"}], temperature: 0 }),
  }),
  fetch("http://localhost:3000/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({ model: "gpt-4o", messages: [{role:"user", content:"Hello"}], temperature: 0 }),
  }),
]);

// Verificar headers:
const dedupStatuses = results.map(r => r.headers.get("X-Dedup-Status"));
// Esperado: [null, "deduplicated", "deduplicated"] (1 real, 2 deduplicados)

// Verificar custo no analytics: apenas 1 request upstream deve aparecer
```

### Teste 2: Sem dedup em requests diferentes
```typescript
// Dois requests com mensagens diferentes NÃO devem ser deduplicados:
const [r1, r2] = await Promise.all([
  fetch("...", { body: JSON.stringify({messages: [{content: "Hello"}]}) }),
  fetch("...", { body: JSON.stringify({messages: [{content: "Goodbye"}]}) }),
]);
// Ambos devem ter X-Dedup-Status: null
```

### Teste 3: Sem dedup com alta temperatura
```typescript
const r = await fetch("...", {
  body: JSON.stringify({ model: "gpt-4o", messages: [...], temperature: 0.8 })
});
// X-Dedup-Status deve ser null mesmo com requests simultâneos
```

---

## Referências

- [ClawRouter src/dedup.ts](https://github.com/BlockRunAI/ClawRouter/blob/main/src/dedup.ts)
- ClawRouter readme: contexto de uso em workflows agênticos

---

## Rollback

Setar `DEFAULT_DEDUP_CONFIG.enabled = false` ou remover a chamada a `deduplicatedExecute()`
em `chatCore.ts`. O arquivo `requestDedup.ts` pode permanecer sem causar problemas.
