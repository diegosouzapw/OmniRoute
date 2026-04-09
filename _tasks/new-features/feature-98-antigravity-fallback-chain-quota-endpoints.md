# Feature 86 — Fallback Chain para Endpoints de Quota Antigravity

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — `src/services/api/quota.service.ts` (linhas 52-78) e `src/constants/api.ts` (linhas 6-10)  
**Prioridade:** 🔴 Alta  
**Impacto:** Resiliência na busca de quota Antigravity com 3 URLs de fallback

---

## Motivação

A Google opera múltiplos endpoints para a API de quota do Antigravity:

```
1. https://daily-cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels       (daily)
2. https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:fetchAvailableModels (sandbox)
3. https://cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels              (production)
```

Cada um pode estar indisponível por diferentes razões (manutenção, rate limit, região). O zero-limit implementa um **fallback chain** que tenta os 3 em sequência — se o primeiro falha, tenta o segundo, e assim por diante. Isso aumenta significativamente a confiabilidade da busca de quotas.

Atualmente, o OmniRoute provavelmente usa apenas um endpoint, ficando vulnerável a falhas pontuais na infraestrutura do Google.

---

## O que Ganhamos

1. **Resiliência 3x**: Se um endpoint cai, os outros dois servem como backup
2. **Cobertura de manutenção**: Endpoints `daily-*` e `sandbox-*` podem ter janelas de manutenção diferentes
3. **Latência otimizada**: O primeiro que responder com sucesso é usado
4. **Sem downtime de quota**: Mesmo durante deploys do Google, pelo menos um endpoint tende a estar ativo

---

## ANTES (Situação Atual)

```javascript
// Usamos um único endpoint para buscar quotas do Antigravity
const ANTIGRAVITY_QUOTA_URL = "https://cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels";
// Se este endpoint estiver fora do ar, a busca de quota falha completamente
```

---

## DEPOIS (Implementação Proposta)

### 1. Definir array de URLs de fallback

```javascript
// src/shared/constants/providers.js (adicionar)
export const ANTIGRAVITY_QUOTA_URLS = [
  "https://daily-cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels",
  "https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:fetchAvailableModels",
  "https://cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels",
];

export const ANTIGRAVITY_QUOTA_HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "antigravity/1.11.5 windows/amd64",
};
```

### 2. Implementar fallback chain no fetcher

```javascript
// src/lib/usage/fetcher.js (modificar fetchAntigravityQuota)

import {
  ANTIGRAVITY_QUOTA_URLS,
  ANTIGRAVITY_QUOTA_HEADERS,
} from "../../shared/constants/providers.js";

/**
 * Busca quotas do Antigravity usando fallback chain de 3 endpoints.
 * Tenta cada URL em sequência até obter sucesso.
 *
 * @param {string} token - Bearer token da conta Antigravity
 * @returns {Object} { models: QuotaModel[], error?: string }
 */
async function fetchAntigravityQuota(token) {
  let lastError = "";

  for (const url of ANTIGRAVITY_QUOTA_URLS) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...ANTIGRAVITY_QUOTA_HEADERS,
          Authorization: `Bearer ${token}`,
        },
        body: "{}",
      });

      if (response.ok) {
        const data = await response.json();
        const models = parseAntigravityModels(data);
        if (models.length > 0) {
          return { models };
        }
      }

      // Guardar erro para caso todos falhem
      const errorText = await response.text().catch(() => "");
      lastError = formatQuotaError(response.status, errorText);
    } catch (err) {
      lastError = err.message;
      // Continuar para o próximo URL
    }
  }

  return { models: [], error: lastError || "Failed to fetch quota from all endpoints" };
}

/**
 * Formata mensagem de erro de quota com contexto
 */
function formatQuotaError(status, rawMessage) {
  if (status === 401 || status === 403) {
    if (rawMessage.includes("token") || rawMessage.includes("auth")) {
      return `Token invalid or expired (${status})`;
    }
    return `Access denied (${status})`;
  }
  if (status === 429) return "Rate limit exceeded";
  if (rawMessage.length > 100) return rawMessage.substring(0, 97) + "...";
  return rawMessage || `HTTP ${status}`;
}
```

---

## Diagrama de Fallback

```
Request
  │
  ├─► daily-cloudcode-pa.googleapis.com ─── OK? → return
  │                                         FAIL? ↓
  ├─► daily-cloudcode-pa.sandbox.googleapis.com ─── OK? → return
  │                                                 FAIL? ↓
  └─► cloudcode-pa.googleapis.com ─── OK? → return
                                      FAIL? → return error
```

---

## Arquivos Afetados

| Arquivo                             | Ação                                     |
| ----------------------------------- | ---------------------------------------- |
| `src/shared/constants/providers.js` | Adicionar `ANTIGRAVITY_QUOTA_URLS` array |
| `src/lib/usage/fetcher.js`          | Loop de fallback com try/catch por URL   |

---

## Endpoint Adicional: retrieveUserQuota (Gemini CLI)

Para contas Gemini CLI (não Antigravity), existe um endpoint separado que requer `projectId`:

```
POST https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuota
Body: { "project": "<project_id>" }
```

Este endpoint retorna `{ buckets: [{ modelId, remainingFraction, resetTime }] }` — uma estrutura diferente do `fetchAvailableModels`. Pode valer a pena implementá-lo em uma feature futura para suporte a contas Gemini CLI.

---

## Referência Direta

- Array de URLs: `zero-limit/src/constants/api.ts` linhas 6-10
- Fallback loop: `zero-limit/src/services/api/quota.service.ts` linhas 52-78
- Error formatting: `zero-limit/src/services/api/quota.service.ts` linhas 29-49
