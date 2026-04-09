# Feature 83 — Sincronização Dinâmica de Catálogo de Modelos

**Fonte:** Análise do repositório `kaitranntt/ccs` — módulo `src/cliproxy/catalog-cache.ts`
**Prioridade:** 🟢 P2 — Melhora experiência e reduz manutenção manual
**Complexidade:** Média (novo serviço + endpoint API + integração dashboard)

---

## Motivação

Atualmente, quando um provider lança um novo modelo (ex: Claude Opus 4.7, GPT-5.4 Codex), o OmniRoute precisa de uma **atualização manual** no arquivo `open-sse/config/providerRegistry.js`, seguida de rebuild e deploy. Isso significa que existe sempre um gap entre o lançamento do modelo e sua disponibilidade no catálogo.

O CCS implementa um sistema de **cache dinâmico com TTL de 24 horas** que sincroniza modelos do upstream automaticamente. O cache é persistido em disco (`~/.ccs/cache/model-catalog.json`) e mesclado com o catálogo estático, preservando metadados locais como `tier`, `broken` e `deprecated`.

---

## O Que Ganhamos

1. **Auto-discovery de modelos** — novos modelos aparecem sem necessidade de update manual
2. **TTL de 24h** — não sobrecarrega o upstream com fetches constantes
3. **Merge inteligente** — modelos remotos complementam (não substituem) o catálogo estático
4. **Metadata preservada** — flags locais como `broken` e `deprecated` são mantidas mesmo após sync
5. **Fallback seguro** — se a sync falhar, o catálogo estático continua funcionando
6. **Dashboard widget** — idade do cache e botão de "force refresh"

---

## Situação Atual (Antes)

```
Provider lança GPT-5.4 Codex (quarta-feira)
                    ↓
OmniRoute: catálogo estático → modelo não aparece
                    ↓
Desenvolvedor: precisa editar providerRegistry.js
                    ↓
Deploy: dias depois → modelo disponível
```

**Problema:** Gap de dias entre lançamento e disponibilidade. Usuários com `passthroughModels: true` podem usar qualquer modelo, mas sem nome amigável e sem aparecer no dropdown de seleção.

---

## Situação Desejada (Depois)

```
Provider lança GPT-5.4 Codex (quarta-feira)
                    ↓
OmniRoute [CatalogSync]: próximo health check detecta modelo novo
                    ↓
Cache atualizado: modelo aparece com nome genérico
                    ↓
Imediato: modelo disponível no dropdown com nome auto-gerado
                    ↓
Sviluppatore: pode atualizar providerRegistry.js depois (melhoria de nome)
```

---

## Implementação Detalhada

### 1. Cache Service: `src/lib/catalogCache.js`

```javascript
import { getDbInstance } from "./db/core.js";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas
const CACHE_NAMESPACE = "catalogCache";

/**
 * Lê modelos cacheados para um provider
 * @returns {{ models: Array, fetchedAt: string, age: number } | null}
 */
export async function getCachedModels(providerId) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(CACHE_NAMESPACE, providerId);

  if (!row) return null;

  const data = JSON.parse(row.value);
  const age = Date.now() - new Date(data.fetchedAt).getTime();

  if (age > CACHE_TTL_MS) {
    return null; // Cache expirado
  }

  return { ...data, age };
}

/**
 * Salva modelos no cache
 */
export async function setCachedModels(providerId, models) {
  const db = getDbInstance();
  const value = JSON.stringify({
    models,
    fetchedAt: new Date().toISOString(),
    modelCount: models.length,
  });

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    CACHE_NAMESPACE,
    providerId,
    value
  );
}

/**
 * Limpa cache de um provider
 */
export async function clearCachedModels(providerId) {
  const db = getDbInstance();
  if (providerId) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      CACHE_NAMESPACE,
      providerId
    );
  } else {
    db.prepare("DELETE FROM key_value WHERE namespace = ?").run(CACHE_NAMESPACE);
  }
}

/**
 * Retorna idade do cache para todos os providers
 */
export async function getCacheStatus() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(CACHE_NAMESPACE);

  return rows.map((row) => {
    const data = JSON.parse(row.value);
    const age = Date.now() - new Date(data.fetchedAt).getTime();
    return {
      provider: row.key,
      fetchedAt: data.fetchedAt,
      ageMs: age,
      ageHuman: formatAge(age),
      modelCount: data.modelCount,
      expired: age > CACHE_TTL_MS,
    };
  });
}

function formatAge(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m ago`;
  return `${minutes}m ago`;
}
```

### 2. Serviço de Sync: `src/lib/catalogSync.js`

```javascript
import { PROVIDER_MODELS } from "@omniroute/open-sse/config/providerModels.js";
import { getCachedModels, setCachedModels } from "./catalogCache.js";

/**
 * Estratégias de fetch por provider
 * Cada provider pode ter uma forma diferente de listar modelos
 */
const SYNC_STRATEGIES = {
  // OpenAI-compatible: GET /v1/models
  openai: async (baseUrl, authHeader, authValue) => {
    const modelsUrl = baseUrl.replace("/chat/completions", "/models");
    const res = await fetch(modelsUrl, {
      headers: { [authHeader]: authValue },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.map((m) => ({
      id: m.id,
      name: m.id, // Nome genérico, será melhorado via merge
      source: "remote",
    }));
  },

  // Gemini: GET /v1beta/models
  gemini: async (baseUrl, authHeader, authValue) => {
    const modelsUrl = baseUrl.replace(/\/v1beta\/models.*/, "/v1beta/models");
    const res = await fetch(modelsUrl, {
      headers: { [authHeader]: authValue },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.models?.map((m) => ({
      id: m.name?.replace("models/", ""),
      name: m.displayName || m.name,
      source: "remote",
    }));
  },
};

/**
 * Sincroniza modelos de um provider, se suportado
 * @returns {Array} Lista mesclada estático + remoto
 */
export async function syncProviderModels(providerId, providerConfig, credentials) {
  // 1. Verificar cache
  const cached = await getCachedModels(providerId);
  if (cached) {
    return mergeModels(providerId, cached.models);
  }

  // 2. Determinar estratégia de sync
  const strategy = SYNC_STRATEGIES[providerConfig.format];
  if (!strategy) {
    return null; // Provider não suporta sync
  }

  // 3. Fetch remoto
  try {
    const remoteModels = await strategy(
      providerConfig.baseUrl,
      providerConfig.authHeader,
      credentials
    );

    if (remoteModels && remoteModels.length > 0) {
      await setCachedModels(providerId, remoteModels);
      return mergeModels(providerId, remoteModels);
    }
  } catch (err) {
    // Falha silenciosa — catálogo estático continua funcionando
    console.warn(`[catalog-sync] Failed to sync ${providerId}: ${err.message}`);
  }

  return null;
}

/**
 * Merge: estático tem prioridade para nome/metadata, remoto adiciona novos modelos
 */
function mergeModels(providerId, remoteModels) {
  const staticModels = PROVIDER_MODELS[providerId] || [];
  const staticById = new Map(staticModels.map((m) => [m.id, m]));

  const merged = [...staticModels]; // Começa com todos os estáticos

  for (const remote of remoteModels) {
    if (!staticById.has(remote.id)) {
      // Modelo novo! Adicionar com flag source=remote
      merged.push({
        id: remote.id,
        name: remote.name || remote.id,
        source: "remote",
        discovered: new Date().toISOString(),
      });
    }
    // Se já existe no estático, não sobrescreve (estático tem prioridade)
  }

  return merged;
}
```

### 3. Endpoint de Dashboard

```javascript
// GET /api/models/catalog-status
export async function GET() {
  const { getCacheStatus } = await import("@/lib/catalogCache");
  return Response.json({ status: await getCacheStatus() });
}

// POST /api/models/catalog-sync — force refresh
export async function POST(req) {
  const { providerId } = await req.json();
  const { clearCachedModels } = await import("@/lib/catalogCache");
  await clearCachedModels(providerId);
  return Response.json({ success: true, message: `Cache cleared for ${providerId || "all"}` });
}
```

---

## Arquivos a Criar/Modificar

| Ação          | Arquivo                                      | Descrição                |
| ------------- | -------------------------------------------- | ------------------------ |
| **CRIAR**     | `src/lib/catalogCache.js`                    | Cache service com SQLite |
| **CRIAR**     | `src/lib/catalogSync.js`                     | Serviço de sync + merge  |
| **CRIAR**     | `src/app/api/models/catalog-status/route.js` | Status do cache          |
| **CRIAR**     | `src/app/api/models/catalog-sync/route.js`   | Force refresh            |
| **MODIFICAR** | `src/shared/constants/models.js`             | Integrar models remotos  |
| **CRIAR**     | `tests/unit/catalog-cache.test.mjs`          | Testes unitários         |

---

## Testes Necessários

1. Cache vazio → fetch remoto → cache escrito
2. Cache válido (< 24h) → retorna cache, sem fetch
3. Cache expirado (> 24h) → fetch remoto novamente
4. Merge: modelo estático prevalece sobre remoto (nome)
5. Merge: modelo remoto novo é adicionado com `source: 'remote'`
6. Fetch falha → retorna null, catálogo estático continua
7. `clearCachedModels(providerId)` → remove apenas o provider especificado
8. `getCacheStatus()` → retorna idades corretas para todos os providers

---

## Referência do CCS

- [catalog-cache.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/catalog-cache.ts) — 234 linhas, cache com merge inteligente
- Pattern: `getOrFetch()` → `merge(static, remote)` → `updateCache()`
