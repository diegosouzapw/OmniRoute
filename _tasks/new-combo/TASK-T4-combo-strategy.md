# TASK T4 — Nova Strategy `context-relay` em `combo.ts`

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Confirmar que T1, T2, T3 estão concluídas
3. Ler `open-sse/services/combo.ts` COMPLETO (1458 linhas) para entender:
   - Como `handleComboChat` despacha para cada strategy (linhas 716-933)
   - O padrão do loop de fallback (linhas 942-1117)  
   - Como `handleRoundRobinCombo` está estruturado (linhas ~1140-1458)
   - Como `isModelAvailable` é chamado (linhas 960-975)
4. Ler `open-sse/services/codexQuotaFetcher.ts` para entender a interface `CodexDualWindowQuota`
5. Ler `open-sse/services/contextHandoff.ts` (criado em T3)

## Objetivo

Adicionar o despacho da nova strategy `context-relay` no `handleComboChat` e implementar o handler `handleContextRelayCombo`. Esta função é análoga ao `handleRoundRobinCombo` mas adiciona:

1. **Detecção de threshold** (85%) após cada request — dispara handoff async
2. **Injeção de handoff** antes de enviar para a nova conta (quando existe handoff ativo)

## Onde Adicionar no `combo.ts`

### Passo 1: Import dos novos módulos

No topo de `combo.ts`, adicionar imports:

```typescript
import {
  maybeGenerateHandoff,
  injectHandoffIntoBody,
  HANDOFF_WARNING_THRESHOLD,
} from "./contextHandoff.ts";
import { getHandoff, deleteHandoff } from "../../src/lib/db/contextHandoffs.ts";
import { fetchCodexQuota } from "./codexQuotaFetcher.ts";
import { parseModel } from "./model.ts"; // já importado
```

> **ATENÇÃO**: Verificar o path relativo correto para `src/lib/db/contextHandoffs.ts` a partir de `open-sse/services/`. Pode precisar ser `../../src/lib/db/contextHandoffs.ts` ou via alias `@/lib/db/contextHandoffs`.

### Passo 2: Despacho no `handleComboChat`

Localizar a seção de despacho de strategies (após linha 726 onde `round-robin` é despachado). Adicionar ANTES do bloco de ordenação genérico:

```typescript
// Route to context-relay handler if strategy matches
if (strategy === "context-relay") {
  return handleContextRelayCombo({
    body,
    combo,
    handleSingleModel: handleSingleModelWrapped,
    isModelAvailable,
    log,
    settings,
    allCombos,
  });
}
```

### Passo 3: Implementar `handleContextRelayCombo`

Criar como função separada no arquivo (próxima a `handleRoundRobinCombo`). Esta função é uma variante do loop priority com hooks de handoff.

```typescript
/**
 * Context-Relay combo strategy handler.
 *
 * Estende o loop priority com dois hooks:
 * 1. Pre-request: injeta HandoffPayload se existe para a sessão (nova conta)
 * 2. Post-request: dispara geração async de handoff se quota >= 85%
 *
 * A troca proativa de conta (a 95%) é gerenciada pelo quota preflight
 * em checkModelAvailable (já implementado em src/sse/handlers/chat.ts).
 *
 * @param options - Mesmo shape que handleComboChat
 */
async function handleContextRelayCombo({
  body,
  combo,
  handleSingleModel,
  isModelAvailable,
  log,
  settings,
  allCombos,
}) {
  // Resolver lista de modelos (mesma lógica do loop priority)
  let orderedModels;
  if (allCombos) {
    orderedModels = resolveNestedComboModels(combo, allCombos);
  } else {
    orderedModels = combo.models.map((m) => normalizeModelEntry(m).model);
  }

  const config = settings
    ? resolveComboConfig(combo, settings)
    : { ...getDefaultComboConfig(), ...(combo.config || {}) };

  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = config.retryDelayMs ?? 2000;
  const concurrency = config.concurrency ?? 1;
  const queueTimeout = config.queueTimeoutMs ?? 30000;

  // Extrair sessionId do body (injetado via X-Session-Id ou fingerprint)
  // O sessionId é o mesmo usado pelo sessionManager
  const sessionId = (body as any)._omniSessionId || null;

  let lastError = null;
  let lastStatus = null;
  let earliestRetryAfter = null;
  let fallbackCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < orderedModels.length; i++) {
    const modelStr = orderedModels[i];
    const parsed = parseModel(modelStr);
    const provider = parsed.provider || parsed.providerAlias || "unknown";
    const profile = getProviderProfile(provider);
    const breakerKey = `combo:${modelStr}`;
    const breaker = getCircuitBreaker(breakerKey, {
      failureThreshold: profile.circuitBreakerThreshold,
      resetTimeout: profile.circuitBreakerReset,
    });

    // Skip se circuit breaker OPEN
    if (!breaker.canExecute()) {
      log.info("COMBO-CR", `Skipping ${modelStr}: circuit breaker OPEN`);
      if (i > 0) fallbackCount++;
      continue;
    }

    // Pre-check disponibilidade (inclui quota preflight de 95%)
    if (isModelAvailable) {
      const available = await isModelAvailable(modelStr);
      if (!available) {
        log.info("COMBO-CR", `Skipping ${modelStr}: not available (quota or cooldown)`);
        if (i > 0) fallbackCount++;
        continue;
      }
    }

    // ── Hook 1: Injeção de Handoff (se nova conta) ────────────────────────
    let requestBody = body;
    if (sessionId && i > 0) {
      // i > 0 indica que estamos usando uma conta de fallback (houve troca)
      const handoff = await getHandoff(sessionId, combo.name).catch(() => null);
      if (handoff) {
        requestBody = injectHandoffIntoBody(body, handoff);
        log.info(
          "COMBO-CR",
          `Injecting handoff context from account ${handoff.fromAccount} into ${modelStr} ` +
          `(${handoff.messageCount} messages, generated at ${handoff.generatedAt})`
        );
        // Deletar após injetar (evita reinjeção em turns subsequentes)
        deleteHandoff(sessionId, combo.name).catch(() => {});
      }
    }
    // ─────────────────────────────────────────────────────────────────────

    // Adquirir semaphore slot
    let release;
    try {
      release = await semaphore.acquire(modelStr, {
        maxConcurrency: concurrency,
        timeoutMs: queueTimeout,
      });
    } catch (err) {
      if (err.code === "SEMAPHORE_TIMEOUT") {
        log.warn("COMBO-CR", `Semaphore timeout for ${modelStr}`);
        if (i > 0) fallbackCount++;
        continue;
      }
      throw err;
    }

    try {
      for (let retry = 0; retry <= maxRetries; retry++) {
        if (retry > 0) {
          await new Promise((r) => setTimeout(r, retryDelayMs));
        }

        log.info("COMBO-CR", `→ ${modelStr}${i > 0 ? ` (fallback +${i})` : ""}${retry > 0 ? ` (retry ${retry})` : ""}`);

        const result = await handleSingleModel(requestBody, modelStr);

        if (result.ok) {
          // ── Hook 2: Disparar Handoff Async (se quota >= 85%) ───────────
          if (sessionId && provider === "codex") {
            // Buscar connectionId actual para lookup de quota
            // O connectionId é injetado no _omniConnectionId pelo chat.ts (T5)
            const connectionId = (requestBody as any)._omniConnectionId || null;
            if (connectionId) {
              const quotaInfo = await fetchCodexQuota(connectionId).catch(() => null);
              if (quotaInfo && quotaInfo.percentUsed >= HANDOFF_WARNING_THRESHOLD) {
                // Obter messages do body para o summary
                const messages = Array.isArray(requestBody.messages) ? requestBody.messages : [];
                const resetAt = quotaInfo.window5h.resetAt || quotaInfo.window7d.resetAt;

                maybeGenerateHandoff({
                  sessionId,
                  comboName: combo.name,
                  connectionId,
                  percentUsed: quotaInfo.percentUsed,
                  messages,
                  model: modelStr,
                  expiresAt: resetAt,
                  handleSingleModel,
                });
              }
            }
          }
          // ────────────────────────────────────────────────────────────────

          const latencyMs = Date.now() - startTime;
          breaker._onSuccess();
          recordComboRequest(combo.name, modelStr, {
            success: true,
            latencyMs,
            fallbackCount,
            strategy: "context-relay",
          });
          return result;
        }

        // Tratamento de erro (igual ao priority loop)
        // ... [copiar lógica de checkFallbackError, TRANSIENT_FOR_BREAKER, etc.]
        // Ver implementação completa do loop priority (linhas 942-1117 de combo.ts)
      }
    } finally {
      release();
    }
  }

  // Todos os modelos falharam
  recordComboRequest(combo.name, null, {
    success: false,
    latencyMs: Date.now() - startTime,
    fallbackCount,
    strategy: "context-relay",
  });

  return unavailableResponse(503, lastError || "All context-relay combo models unavailable");
}
```

## Notas sobre o `sessionId`

O `_omniSessionId` e `_omniConnectionId` são campos internos (prefixados com `_omni`) que precisam ser **injetados pelo `chat.ts`** no body antes de chamar `handleComboChat`. Isso é feito na T5.

> **Alternativa**: Em vez de poluir o body, passar `sessionId` como parâmetro extra no `handleComboChat`. Verificar o que causa menos impacto na assinatura existente.

## Verificação

```bash
# TypeScript
npm run typecheck:core

# ESLint nos arquivos modificados
npx eslint open-sse/services/combo.ts

# Testes existentes não devem quebrar
node --import tsx/esm --test tests/unit/plan3-p0.test.mjs
```

## Status

- [ ] Import dos novos módulos no topo do `combo.ts`
- [ ] Despacho `context-relay` adicionado no `handleComboChat`
- [ ] `handleContextRelayCombo` implementado:
  - [ ] Loop de fallback (priority-like)
  - [ ] Hook 1: Injeção de handoff na troca de conta
  - [ ] Hook 2: Trigger async de geração de handoff a 85%
- [ ] TypeScript compila sem erros
- [ ] Testes existentes passando (31/31)
