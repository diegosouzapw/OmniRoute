# Feature 117 — Dynamic Model Registry com Reference Counting

## Objetivo

Implementar um registry centralizado de modelos com rastreamento dinâmico de clientes por modelo, contagem de referências, estado de quota, suspensão temporária e notificações via hooks — substituindo a abordagem estática atual.

## Motivação

Atualmente o OmniRoute lista modelos de forma estática via `providerRegistry.js`. Não há noção de:

- Quantos "clientes" (credentials/accounts) podem servir cada modelo
- Quais credenciais estão com quota excedida e há quanto tempo
- Quais credenciais estão temporariamente suspensas (e por qual razão)
- Como notificar componentes externos quando a disponibilidade de modelos muda

O CLIProxyAPI implementa um `ModelRegistry` global com reference counting que resolve TODOS esses problemas de forma elegante e thread-safe (ou no nosso caso, event-loop-safe).

## O que Ganhamos

- **Disponibilidade real**: Saber exatamente quantas credenciais servem cada modelo AGORA
- **Quota tracking**: Credenciais com quota excedida são rastreadas com timestamp, com expiração automática após 5 minutos
- **Suspensão**: Credenciais com problemas são suspensas com razão, sem remover do registry
- **Auto-hide**: Modelos sem credenciais válidas são automaticamente ocultados de `/v1/models`
- **Hooks assíncronos**: Componentes externos (dashboard, analytics) são notificados de mudanças
- **Provider por credencial**: Registry rastreia qual provider/canal cada credencial pertence

## Situação Atual (Antes)

```
providerRegistry.js → Lista estática de modelos por provider
  ↓
GET /v1/models → Retorna TODOS os modelos, independente de quota ou disponibilidade
  ↓
POST /v1/chat/completions → Tenta usar credencial
  ↓
Credencial com quota excedida → Erro 429 → Retry na próxima
  → Sem tracking de quem está down
  → Sem auto-remoção da listagem
  → Sem restauração automática após cooldown
```

## Situação Proposta (Depois)

```
ModelRegistry (dinâmico)
  ├── Modelo: "gemini-2.5-pro"
  │     ├── count: 3 (3 credenciais podem servir)
  │     ├── quotaExceeded: { "cred-2": "2026-02-16T22:50:00Z" } (1 com quota)
  │     ├── suspended: { "cred-3": "rate-limit" }
  │     ├── effectiveClients: 1 (3 - 1expired - 1suspended)
  │     └── providers: { "gemini-cli": 2, "vertex": 1 }
  │
  ├── Modelo: "claude-opus-4-6"
  │     ├── count: 0 → AUTO-HIDDEN de /v1/models
  │     └── ...
  │
GET /v1/models → Mostra apenas modelos com effectiveClients > 0
  → Modelos em cooldown-only (quota, sem suspensão) ainda aparecem
POST /v1/chat/completions
  → Seleciona apenas credenciais não-excedidas e não-suspensas
  → Registra quota exceeded com timestamp
  → Após 5min, limpa automaticamente
```

## Especificação Técnica

### Estrutura ModelRegistration

```javascript
// src/lib/registry/modelRegistry.js

/**
 * @typedef {Object} ModelRegistration
 * @property {Object} info - Metadata do modelo (id, name, type, contextLength, etc.)
 * @property {Map<string, Object>} infoByProvider - Info específica por provider
 * @property {number} count - Quantas credenciais servem este modelo
 * @property {Date} lastUpdated - Último update
 * @property {Map<string, Date>} quotaExceededClients - Credenciais com quota excedida + timestamp
 * @property {Map<string, string>} suspendedClients - Credenciais suspensas com razão
 * @property {Map<string, number>} providers - Contagem por provider
 */
```

### ModelRegistry (Singleton)

```javascript
// src/lib/registry/modelRegistry.js

class ModelRegistry {
  constructor() {
    this.models = new Map();           // modelId → ModelRegistration
    this.clientModels = new Map();     // credentialId → [modelIds]
    this.clientProviders = new Map();  // credentialId → providerName
    this.hooks = [];                   // ModelRegistryHook[]
    this.QUOTA_EXPIRY_MS = 5 * 60 * 1000; // 5 min
  }

  /**
   * Register a credential and the models it serves.
   * Handles additions, removals, and provider changes via diff.
   */
  registerClient(clientId, provider, models) { ... }

  /**
   * Unregister a credential, decrementing all its model counts.
   * Models that reach 0 are auto-removed.
   */
  unregisterClient(clientId) { ... }

  /**
   * Mark a model as quota exceeded for a specific credential.
   * Auto-expires after QUOTA_EXPIRY_MS.
   */
  setModelQuotaExceeded(clientId, modelId) { ... }

  /** Clear quota exceeded status */
  clearModelQuotaExceeded(clientId, modelId) { ... }

  /**
   * Temporarily suspend a credential for a model.
   * Different from quota: manual, with reason string.
   */
  suspendClientModel(clientId, modelId, reason) { ... }

  /** Resume a suspended credential */
  resumeClientModel(clientId, modelId) { ... }

  /**
   * Get available models, filtering by effective client count.
   * Models with only quota-exceeded/cooldown clients still appear.
   * Models with suspension-only clients are hidden.
   */
  getAvailableModels(handlerType) { ... }

  /** Get models available for specific provider */
  getAvailableModelsByProvider(provider) { ... }
}

export const registry = new ModelRegistry();
```

### Hook de Notificação

```javascript
// src/lib/registry/registryHooks.js

/**
 * @typedef {Object} ModelRegistryHook
 * @property {function} onModelsRegistered - (provider, clientId, models) => void
 * @property {function} onModelsUnregistered - (provider, clientId) => void
 */

// Exemplo: notificar dashboard via SSE
export const dashboardHook = {
  onModelsRegistered(provider, clientId, models) {
    broadcastToAdminSSE({
      event: "models_changed",
      data: { provider, clientId, count: models.length },
    });
  },
  onModelsUnregistered(provider, clientId) {
    broadcastToAdminSSE({ event: "models_changed", data: { provider, clientId, count: 0 } });
  },
};
```

### Integração no Startup e Credential Management

```javascript
// Quando uma credencial é adicionada/validada:
import { registry } from "@/lib/registry/modelRegistry";

function onCredentialValidated(credential, availableModels) {
  registry.registerClient(
    credential.id,
    credential.provider,
    availableModels.map((m) => ({
      id: m.id,
      name: m.name,
      type: credential.provider,
      contextLength: m.contextLength,
      maxCompletionTokens: m.maxCompletionTokens,
    }))
  );
}

// Quando uma credencial é removida:
function onCredentialRemoved(credentialId) {
  registry.unregisterClient(credentialId);
}

// Quando há quota exceeded:
function onQuotaExceeded(credentialId, modelId) {
  registry.setModelQuotaExceeded(credentialId, modelId);
}
```

## Effective Clients Calculation

```javascript
getEffectiveClients(registration) {
  const now = Date.now();
  let expiredQuota = 0;
  let cooldownSuspended = 0;
  let otherSuspended = 0;

  // Count expired quota clients
  for (const [, timestamp] of registration.quotaExceededClients) {
    if (now - timestamp.getTime() < this.QUOTA_EXPIRY_MS) {
      expiredQuota++;
    }
  }

  // Count suspended clients by reason
  for (const [, reason] of registration.suspendedClients) {
    if (reason === 'quota') cooldownSuspended++;
    else otherSuspended++;
  }

  const effective = registration.count - expiredQuota - otherSuspended;
  const showInListing = effective > 0 ||
    (registration.count > 0 && (expiredQuota > 0 || cooldownSuspended > 0) && otherSuspended === 0);

  return { effective: Math.max(0, effective), showInListing };
}
```

## Arquivos a Criar/Modificar

| Arquivo                             | Ação                                          |
| ----------------------------------- | --------------------------------------------- |
| `src/lib/registry/modelRegistry.js` | **NOVO** — Registry com ref counting          |
| `src/lib/registry/registryHooks.js` | **NOVO** — Sistema de hooks                   |
| `src/lib/registry/index.js`         | **NOVO** — Re-export do singleton             |
| `open-sse/sse-server.js`            | **MODIFICAR** — Usar registry para /v1/models |
| `src/sse/services/model.js`         | **MODIFICAR** — Consultar registry            |
| `src/sse/handlers/chat.js`          | **MODIFICAR** — Reportar quota/suspensão      |

## Critérios de Aceite

- [ ] Modelos sem credenciais válidas são ocultados de `/v1/models`
- [ ] Quota exceeded é rastreada com timestamp e expira em 5 minutos
- [ ] Suspensão temporária remove credencial sem deletar do registry
- [ ] Hooks são chamados assincronamente quando modelos mudam
- [ ] Contagem por provider é mantida (suporte a multi-provider por modelo)
- [ ] `/v1/models` mostra modelos em cooldown-only mas não suspensos
- [ ] Registry é singleton, acessível de qualquer módulo
- [ ] Log claro quando credenciais são registradas/desregistradas

## Referência

- [CLIProxyAPI: internal/registry/model_registry.go](https://github.com/router-for-me/CLIProxyAPI) — 1192 linhas, implementação completa
