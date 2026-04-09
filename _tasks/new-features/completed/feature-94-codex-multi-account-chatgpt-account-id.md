# Feature 84 — Suporte Multi-Account Codex via Chatgpt-Account-Id Header

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — `src/services/api/quota.service.ts` (linhas 80-101)  
**Prioridade:** 🟡 Média  
**Impacto:** Suporte correto a múltiplas contas Codex (OpenAI) na mesma sessão

---

## Motivação

Quando um usuário tem múltiplas contas OpenAI (ex: Plus pessoal + Team empresa), a API de usage do Codex requer o header `Chatgpt-Account-Id` para retornar a quota correta de cada conta. Sem esse header, a API retorna sempre a quota da conta padrão, o que gera dados incorretos quando o roteamento está usando outra conta.

O zero-limit implementa a resolução desse `account_id` a partir do `id_token` JWT da conta, extraindo o campo `chatgpt_account_id`.

---

## O que Ganhamos

1. **Quotas corretas por conta**: Cada conta Codex mostra sua quota real no dashboard
2. **Roteamento informado**: O accountSelector sabe exatamente qual conta tem quota disponível
3. **Suporte a Team/Enterprise**: Contas OpenAI Team têm limites diferentes da conta pessoal
4. **Sem falsos positivos**: Evita mostrar quota zerada quando outra conta está cheia

---

## ANTES (Situação Atual)

```javascript
// Buscamos usage do Codex sem especificar qual conta
// Se o usuário tem múltiplas contas OpenAI, vemos apenas a quota da conta padrão
// Headers atuais:
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  "User-Agent": "codex_cli_rs/...",
};
```

---

## DEPOIS (Implementação Proposta)

### 1. Extrair account_id do JWT id_token

```javascript
// src/lib/usage/parsers/codexAccountId.js (NOVO)

/**
 * Decodifica o payload de um JWT (base64url) sem verificação de assinatura.
 * Usado apenas para extrair claims localmente.
 */
function decodeJwtPayload(token) {
  if (!token || typeof token !== "string") return null;

  // Se já é um objeto (parsed), retornar direto
  if (typeof token === "object") return token;

  const segments = token.split(".");
  if (segments.length < 2) return null;

  try {
    const base64 = segments[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const decoded = Buffer.from(padded, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Extrai o chatgpt_account_id de um id_token JWT ou objeto parsed.
 *
 * O id_token pode estar em vários locais da estrutura do auth file:
 * - file.id_token (string JWT ou objeto)
 * - file.metadata.id_token
 * - file.attributes.id_token
 *
 * @param {Object} authFile - Objeto do auth file
 * @returns {string|null} O account_id ou null
 */
export function resolveCodexAccountId(authFile) {
  const candidates = [
    authFile.id_token,
    authFile.metadata?.id_token,
    authFile.attributes?.id_token,
  ];

  for (const candidate of candidates) {
    const payload = decodeJwtPayload(candidate);
    if (!payload) continue;

    const accountId = payload.chatgpt_account_id || payload.chatgptAccountId;
    if (accountId && typeof accountId === "string" && accountId.trim()) {
      return accountId.trim();
    }
  }

  return null;
}
```

### 2. Usar no fetcher de usage

```javascript
// src/lib/usage/fetcher.js (modificar fetchCodexUsage)

import { resolveCodexAccountId } from "./parsers/codexAccountId.js";

async function fetchCodexUsage(connection, token) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "codex_cli_rs/0.76.0 (Debian 13.0.0; x86_64) WindowsTerminal",
  };

  // *** NOVO: Adicionar account_id se disponível ***
  const accountId = resolveCodexAccountId(connection.authFile || {});
  if (accountId) {
    headers["Chatgpt-Account-Id"] = accountId;
  }

  const response = await fetch(CODEX_USAGE_URL, { headers });
  // ... parsear resposta
}
```

---

## Arquivos Afetados

| Arquivo                                   | Ação                                  |
| ----------------------------------------- | ------------------------------------- |
| `src/lib/usage/parsers/codexAccountId.js` | **NOVO** — Resolver account_id do JWT |
| `src/lib/usage/fetcher.js`                | Adicionar header `Chatgpt-Account-Id` |

---

## Formato do JWT id_token do Codex

```json
{
  "aud": "pdlLIX2Y72MIl2rhLhTE9VV9bN905kBh",
  "sub": "auth0|user123",
  "chatgpt_account_id": "acc_12345abcde",
  "email": "user@example.com",
  "plan_type": "plus",
  "exp": 1739750400,
  "iat": 1739746800
}
```

O campo `chatgpt_account_id` é o valor que deve ser usado no header.

---

## Referência Direta

- Arquivo original: `zero-limit/src/shared/utils/quota.helpers.ts` — `extractCodexChatgptAccountId()` linhas 108-126
- Arquivo original: `zero-limit/src/services/api/quota.service.ts` — `fetchCodex()` linhas 80-101
- JWT decode helper: `zero-limit/src/shared/utils/quota.helpers.ts` — `decodeBase64UrlPayload()` linhas 61-77
