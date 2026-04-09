# Feature 81 — Cooldown de Provider com Failover Automático na Chain de Combo

**Fonte:** Análise do repositório `kaitranntt/ccs` — módulo `src/cliproxy/quota-manager.ts`
**Prioridade:** 🟡 P1 — Melhora resiliência de routing
**Complexidade:** Média (novo serviço + integração no combo router)

---

## Motivação

Quando um provider retorna rate-limit (429) ou quota exaurida, o OmniRoute atualmente faz failover para o próximo provider na chain. Porém, nas próximas requests, **tenta o mesmo provider exaurido novamente**, desperdiçando latência e tokens.

O CCS implementa um sistema sofisticado de **cooldown com cache de 30 segundos** e **deduplicação de requests** — quando um provider é marcado como exaurido, ele recebe um cooldown configurável e é pulado automaticamente nas próximas pre-flight checks.

---

## O Que Ganhamos

1. **Latência reduzida** — providers exauridos são pulados imediatamente (sem tentativa fútil)
2. **Menos erros 429 nos logs** — cada provider exaurido é tentado apenas uma vez
3. **Auto-cura** — cooldowns expiram automaticamente, reabilitando providers
4. **Tier-priority** — failover respeita prioridade de tiers (ultra > pro > free)
5. **Request deduplication** — se duas requests paralelas verificam o mesmo provider, apenas uma fetch real é feita

---

## Situação Atual (Antes)

```
Request 1 → Provider A (429 Rate Limited) → Fallback → Provider B ✅
Request 2 → Provider A (429 de novo!) → espera timeout → Provider B ✅
Request 3 → Provider A (429 de novo!) → espera timeout → Provider B ✅
```

**Problema:** Cada request tenta Provider A antes de cair no fallback, desperdiçando 2-5 segundos por tentativa.

---

## Situação Desejada (Depois)

```
Request 1 → Provider A (429) → marca cooldown 5min → Fallback → Provider B ✅
Request 2 → [Provider A em cooldown, skip] → Provider B ✅  (0ms overhead)
Request 3 → [Provider A em cooldown, skip] → Provider B ✅  (0ms overhead)
...
5 min depois:
Request N → Provider A → cooldown expirado ✅ (tenta novamente)
```

---

## Implementação Detalhada

### 1. Novo Serviço: `src/lib/providerCooldown.js`

```javascript
/**
 * Provider Cooldown Manager
 *
 * Gerencia cooldowns de providers com:
 * - Cache in-memory com TTL de 30 segundos para quota checks
 * - Deduplicação de requests paralelos
 * - Cooldown configurável por provider
 */

const CACHE_TTL_MS = 30_000; // 30 segundos
const DEFAULT_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutos

// Cache de status
const statusCache = new Map(); // key → { healthy: bool, timestamp, reason }

// Cooldown tracking
const cooldownMap = new Map(); // key → { until: timestamp }

// Deduplicação de fetches in-flight
const pendingChecks = new Map();

/**
 * Verifica se provider+credencial está em cooldown
 */
export function isOnCooldown(providerKey) {
  const entry = cooldownMap.get(providerKey);
  if (!entry) return false;

  if (Date.now() > entry.until) {
    cooldownMap.delete(providerKey);
    return false; // Cooldown expirou
  }
  return true;
}

/**
 * Aplica cooldown a um provider exaurido
 */
export function applyCooldown(providerKey, durationMs = DEFAULT_COOLDOWN_MS, reason = "") {
  cooldownMap.set(providerKey, {
    until: Date.now() + durationMs,
    reason,
    appliedAt: new Date().toISOString(),
  });
}

/**
 * Remove cooldown manualmente
 */
export function clearCooldown(providerKey) {
  cooldownMap.delete(providerKey);
}

/**
 * Lista todos os providers em cooldown (para dashboard)
 */
export function getActiveCooldowns() {
  const now = Date.now();
  const active = [];

  for (const [key, entry] of cooldownMap) {
    if (now <= entry.until) {
      active.push({
        provider: key,
        reason: entry.reason,
        remainingMs: entry.until - now,
        expiresAt: new Date(entry.until).toISOString(),
      });
    } else {
      cooldownMap.delete(key); // Limpar expirados
    }
  }

  return active;
}

/**
 * Cache de health check com deduplicação
 */
export async function getCachedHealth(providerKey, checkFn) {
  // 1. Verificar cache
  const cached = statusCache.get(providerKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached;
  }

  // 2. Deduplicar requests paralelos
  const pending = pendingChecks.get(providerKey);
  if (pending) return pending;

  // 3. Executar check real
  const promise = checkFn()
    .then((result) => {
      const entry = { ...result, timestamp: Date.now() };
      statusCache.set(providerKey, entry);
      return entry;
    })
    .catch(() => ({ healthy: false, timestamp: Date.now() }))
    .finally(() => pendingChecks.delete(providerKey));

  pendingChecks.set(providerKey, promise);
  return promise;
}

/**
 * Limpar todo o cache (para testes ou reset manual)
 */
export function clearAllCooldowns() {
  cooldownMap.clear();
  statusCache.clear();
  pendingChecks.clear();
}
```

### 2. Integração no Combo Router

No handler de combo/fallback (`src/sse/handlers/chat.js`), antes de tentar cada provider:

```javascript
import { isOnCooldown, applyCooldown } from "@/lib/providerCooldown";

// Dentro do loop de fallback:
for (const provider of comboChain) {
  const cooldownKey = `${provider.id}:${credentialId}`;

  // Skip se em cooldown
  if (isOnCooldown(cooldownKey)) {
    logger.info(`[combo] Skipping ${provider.id} (cooldown active)`);
    continue;
  }

  try {
    const result = await executeProvider(provider, request);
    return result; // Sucesso
  } catch (err) {
    if (err.status === 429 || err.message?.includes("rate_limit")) {
      // Aplicar cooldown de 5 minutos
      applyCooldown(cooldownKey, 5 * 60 * 1000, `Rate limited: ${err.message}`);
      logger.warn(`[combo] ${provider.id} rate limited, cooldown applied (5m)`);
    }
    // Continuar para próximo provider
  }
}
```

### 3. Endpoint de Dashboard para Visualização

```javascript
// GET /api/providers/cooldowns
export async function GET() {
  const { getActiveCooldowns } = await import("@/lib/providerCooldown");
  return Response.json({ cooldowns: getActiveCooldowns() });
}
```

---

## Configuração

Adicionar ao settings/config do OmniRoute:

```json
{
  "cooldown": {
    "default_duration_ms": 300000,
    "rate_limit_duration_ms": 300000,
    "quota_exhausted_duration_ms": 600000,
    "cache_ttl_ms": 30000
  }
}
```

---

## Arquivos a Criar/Modificar

| Ação          | Arquivo                                    | Descrição                              |
| ------------- | ------------------------------------------ | -------------------------------------- |
| **CRIAR**     | `src/lib/providerCooldown.js`              | Serviço de cooldown com cache e dedup  |
| **MODIFICAR** | `src/sse/handlers/chat.js`                 | Integrar cooldown checks no combo loop |
| **CRIAR**     | `src/app/api/providers/cooldowns/route.js` | Endpoint de dashboard                  |
| **CRIAR**     | `tests/unit/provider-cooldown.test.mjs`    | Testes unitários                       |

---

## Testes Necessários

1. Provider sem cooldown → request normal
2. Provider com cooldown ativo → skip imediato
3. Cooldown expirado → provider tentado novamente
4. Duas requests paralelas para mesmo provider → apenas um check real (dedup)
5. Cache TTL de 30s → segundo check dentro da janela usa cache
6. `getActiveCooldowns()` → retorna lista correta com remaining time
7. `clearAllCooldowns()` → reset completo

---

## Referência do CCS

- [quota-manager.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/quota-manager.ts) — 554 linhas, sistema completo de quota + cooldown + pre-flight
- Pattern: `fetchQuotaWithDedup()` (deduplicação), `applyCooldown()`, `findHealthyAccount()` (tier priority)
