# Feature 10 — Quota Auto-Switch

## Resumo

Implementar detecção automática de "quota exceeded" nos responses do upstream e chavear transparentemente para a próxima credencial disponível ou para um modelo alternativo (preview/cheaper). O cliente não percebe a troca — recebe a resposta normalmente.

## Motivação

Credenciais OAuth e API keys têm quotas diárias/mensais. Quando uma credencial excede sua quota, o upstream retorna erro 429 ou mensagem de quota exceeded. Hoje, o proxy simplesmente retorna o erro ao cliente. Com auto-switch, o proxy tenta automaticamente com outra credencial ou modelo.

## O que ganhamos

- **Uptime contínuo**: Quota excedida em uma credencial não interrompe o serviço
- **Transparência**: Cliente não percebe a troca
- **Economia**: Modelos preview (grátis/cheaper) são usados como fallback
- **Multi-account**: Distribui uso entre múltiplas credenciais naturalmente

## Situação Atual (Antes)

```
Req 1-100: Credencial A → sucesso
Req 101:   Credencial A → 429 "Quota exceeded"
→ Proxy retorna erro 429 ao cliente
→ Cliente precisa esperar ou trocar provider manualmente
```

## Situação Proposta (Depois)

```
Req 1-100: Credencial A → sucesso
Req 101:   Credencial A → 429 "Quota exceeded"
→ Proxy detecta quota exceeded
→ Marca Credencial A como "quota exceeded" por 1h
→ Retry com Credencial B → sucesso
→ Cliente recebe resposta normal (transparente)
```

```
Fallback para modelo preview:
Req 101:   claude-opus-4-6 → todas credenciais 429
→ Proxy tenta claude-sonnet-4-5 (preview) → sucesso
→ Header X-Fallback-Model: "claude-sonnet-4-5" no response
```

## Especificação Técnica

### Detecção de Quota Exceeded

```javascript
// src/lib/quota/quotaDetector.js

const QUOTA_PATTERNS = [
  { status: 429, bodyContains: "rate_limit_exceeded" },
  { status: 429, bodyContains: "quota_exceeded" },
  { status: 429, bodyContains: "resource_exhausted" },
  { status: 429, bodyContains: "Too Many Requests" },
  { status: 403, bodyContains: "billing_not_active" },
  { status: 402, bodyContains: "insufficient_quota" },
];

export function isQuotaExceeded(statusCode, responseBody) {
  const bodyStr = typeof responseBody === "string" ? responseBody : JSON.stringify(responseBody);

  return QUOTA_PATTERNS.some((p) => p.status === statusCode && bodyStr.includes(p.bodyContains));
}
```

### Quota Tracker

```javascript
// src/lib/quota/quotaTracker.js

export class QuotaTracker {
  constructor() {
    // Map<credentialId, { exceededAt: Date, expiresAt: Date }>
    this.exceeded = new Map();
    this.cooldownMs = 60 * 60 * 1000; // 1 hora default
  }

  markExceeded(credentialId) {
    const now = Date.now();
    this.exceeded.set(credentialId, {
      exceededAt: new Date(now),
      expiresAt: new Date(now + this.cooldownMs),
    });
  }

  isAvailable(credentialId) {
    const entry = this.exceeded.get(credentialId);
    if (!entry) return true;
    if (Date.now() > entry.expiresAt.getTime()) {
      this.exceeded.delete(credentialId); // Cooldown expirou
      return true;
    }
    return false;
  }

  getAvailableCredentials(allCredentials) {
    return allCredentials.filter((c) => this.isAvailable(c.id));
  }

  getStats() {
    return {
      totalExceeded: this.exceeded.size,
      entries: Array.from(this.exceeded.entries()).map(([id, e]) => ({
        credentialId: id.substring(0, 8) + "...", // mask
        exceededAt: e.exceededAt,
        expiresAt: e.expiresAt,
        remainingMs: Math.max(0, e.expiresAt.getTime() - Date.now()),
      })),
    };
  }
}
```

### Modelo Fallback

```javascript
// src/lib/quota/modelFallback.js

const FALLBACK_MAP = {
  // modelo ideal → modelo fallback (mais barato/com quota)
  "claude-opus-4-6": "claude-sonnet-4-5-20250929",
  "claude-opus-4-5-20251101": "claude-sonnet-4-5-20250929",
  "gpt-5.3-codex": "gpt-5.2-codex",
  "gpt-5.2-codex": "gpt-5.1-codex",
  "gemini-3-pro-preview": "gemini-3-flash-preview",
  "gemini-2.5-pro": "gemini-2.5-flash",
};

export function getFallbackModel(modelId) {
  return FALLBACK_MAP[modelId] || null;
}
```

### Integração no Fluxo

```javascript
// src/sse/handlers/chat.js

async function handleWithQuotaSwitch(payload, credentials, quotaTracker) {
  const available = quotaTracker.getAvailableCredentials(credentials);

  for (const credential of available) {
    const response = await proxyFetch(url, payload, credential);

    if (isQuotaExceeded(response.status, response.body)) {
      quotaTracker.markExceeded(credential.id);
      logger.warn(`Quota exceeded for ${credential.id}, switching...`);
      continue; // Tentar próxima credencial
    }

    return response; // Sucesso
  }

  // Todas as credenciais excedidas — tentar modelo fallback
  if (config.switchPreviewModel) {
    const fallbackModel = getFallbackModel(payload.model);
    if (fallbackModel) {
      logger.warn(
        `All credentials exceeded for ${payload.model}, falling back to ${fallbackModel}`
      );
      payload.model = fallbackModel;
      // Resetar credenciais e tentar de novo com modelo mais barato
      return handleWithQuotaSwitch(payload, credentials, quotaTracker);
    }
  }

  // Nenhuma opção disponível
  throw new Error("All credentials exceeded quota and no fallback available");
}
```

### Configuração

```env
# Quota auto-switch
QUOTA_SWITCH_ENABLED=true
QUOTA_COOLDOWN_MINUTES=60
QUOTA_SWITCH_PREVIEW_MODEL=true
```

### Management API

| Endpoint            | Método | Descrição                      |
| ------------------- | ------ | ------------------------------ |
| `/api/quota/status` | GET    | Status de todas as credenciais |
| `/api/quota/reset`  | POST   | Reset manual do tracker        |

## Arquivos a Criar/Modificar

| Arquivo                          | Ação                                  |
| -------------------------------- | ------------------------------------- |
| `src/lib/quota/quotaDetector.js` | **NOVO** — Detecção de quota exceeded |
| `src/lib/quota/quotaTracker.js`  | **NOVO** — Tracking de credenciais    |
| `src/lib/quota/modelFallback.js` | **NOVO** — Mapa de fallback           |
| `src/sse/handlers/chat.js`       | **MODIFICAR** — Integrar auto-switch  |
| Dashboard status page            | **MODIFICAR** — Mostrar quota status  |

## Critérios de Aceite

- [ ] 429 com patterns conhecidos marca credencial como exceeded
- [ ] Credencial excedida é pulada por 1 hora (cooldown configurável)
- [ ] Cooldown expira e credencial volta a ser usada
- [ ] Fallback para modelo mais barato quando todas credenciais excedidas
- [ ] Header `X-Fallback-Model` no response quando fallback usado
- [ ] Management API mostra status de quota
- [ ] Log indica quando switch aconteceu e qual credencial/modelo

## Referência

- [ProxyPilot: config.example.yaml linhas 50-55](https://github.com/Finesssee/ProxyPilot/blob/main/config.example.yaml) (quota-exceeded section)
