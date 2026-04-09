# Feature 87 — Atualização de User-Agent Strings para Compatibilidade com Providers

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — `src/constants/api.ts`  
**Prioridade:** 🔴 Alta  
**Impacto:** Prevenção de bloqueios por rate-limit e detecção de bots

---

## Motivação

Cada provider de IA verifica o `User-Agent` das requisições para:

1. Aplicar rate limits diferenciados (CLIs oficiais recebem mais quota)
2. Detectar e bloquear bots ou proxies não-autorizados
3. Coletar telemetria de versão

Manter os User-Agents atualizados com as versões mais recentes dos CLIs oficiais reduz o risco de bloqueio e pode garantir limites mais generosos. O zero-limit (versão 1.1.1) contém valores mais recentes que os que provavelmente usamos.

> **Nota:** Embora já existam features 44, 49 e 66 sobre headers, elas não contêm os valores específicos mais recentes encontrados no zero-limit v1.1.1. Este documento complementa aqueles com dados concretos e atualizados.

---

## O que Ganhamos

1. **Menos bloqueios**: User-Agents atualizados reduzem chance de rate-limiting agressivo
2. **Paridade com CLI oficial**: Nosso proxy se apresenta como o CLI oficial mais recente
3. **Melhor tratamento de Kiro**: Headers `x-amz-user-agent` necessários para AWS
4. **Copilot API version**: Header `X-GitHub-Api-Version` é obrigatório

---

## Valores Atualizados (zero-limit v1.1.1)

### Antigravity

```javascript
const ANTIGRAVITY_HEADERS = {
  Authorization: "Bearer $TOKEN$",
  "Content-Type": "application/json",
  "User-Agent": "antigravity/1.11.5 windows/amd64",
};
```

### Codex (OpenAI)

```javascript
const CODEX_HEADERS = {
  Authorization: "Bearer $TOKEN$",
  "Content-Type": "application/json",
  "User-Agent": "codex_cli_rs/0.76.0 (Debian 13.0.0; x86_64) WindowsTerminal",
};
```

### Kiro (CodeWhisperer / AWS)

```javascript
const KIRO_HEADERS = {
  Authorization: "Bearer $TOKEN$",
  "Content-Type": "application/json",
  "User-Agent": "aws-sdk-js/3.0.0 KiroIDE-0.1.0 os/windows lang/js md/nodejs/18.0.0",
  "x-amz-user-agent": "aws-sdk-js/3.0.0", // ← HEADER EXTRA necessário para AWS
};
```

### GitHub Copilot

```javascript
const COPILOT_HEADERS = {
  Authorization: "Bearer $TOKEN$",
  Accept: "application/vnd.github+json", // ← GitHub API format
  "X-GitHub-Api-Version": "2022-11-28", // ← OBRIGATÓRIO para GitHub API v3
};
```

### Gemini CLI

```javascript
const GEMINI_CLI_HEADERS = {
  Authorization: "Bearer $TOKEN$",
  "Content-Type": "application/json",
  // Não requer User-Agent especial
};
```

---

## ANTES vs DEPOIS (Comparação de Headers)

| Provider    | Campo                | Valor Atual (Provável) | Valor Atualizado                                                     |
| ----------- | -------------------- | ---------------------- | -------------------------------------------------------------------- |
| Antigravity | User-Agent           | `antigravity/1.x.x`    | `antigravity/1.11.5 windows/amd64`                                   |
| Codex       | User-Agent           | `codex_cli_rs/0.x.x`   | `codex_cli_rs/0.76.0 (Debian 13.0.0; x86_64) WindowsTerminal`        |
| Kiro        | User-Agent           | `aws-sdk-js/3.0.0`     | `aws-sdk-js/3.0.0 KiroIDE-0.1.0 os/windows lang/js md/nodejs/18.0.0` |
| Kiro        | x-amz-user-agent     | ❌ Ausente             | `aws-sdk-js/3.0.0`                                                   |
| Copilot     | Accept               | ❌ Ausente             | `application/vnd.github+json`                                        |
| Copilot     | X-GitHub-Api-Version | ❌ Ausente             | `2022-11-28`                                                         |

---

## Implementação

### Onde atualizar no OmniRoute

Os headers devem ser atualizados nos seguintes locais:

```
src/lib/usage/fetcher.js                  — Headers de busca de quota
src/sse/services/auth.js                  — Headers de autenticação/refresh
src/sse/services/tokenRefresh.js          — Headers de refresh de token
src/lib/oauth/services/kiro.js            — Headers do OAuth Kiro
src/lib/oauth/services/github.js          — Headers do OAuth GitHub/Copilot
src/shared/constants/providers.js         — Constantes centralizadas
```

### Abordagem recomendada

Centralizar todos os headers por provider em `src/shared/constants/providers.js`:

```javascript
// src/shared/constants/providers.js (adicionar)

export const PROVIDER_HEADERS = {
  antigravity: {
    "User-Agent": "antigravity/1.11.5 windows/amd64",
  },
  codex: {
    "User-Agent": "codex_cli_rs/0.76.0 (Debian 13.0.0; x86_64) WindowsTerminal",
  },
  kiro: {
    "User-Agent": "aws-sdk-js/3.0.0 KiroIDE-0.1.0 os/windows lang/js md/nodejs/18.0.0",
    "x-amz-user-agent": "aws-sdk-js/3.0.0",
  },
  copilot: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
};
```

---

## Arquivos Afetados

| Arquivo                             | Ação                           |
| ----------------------------------- | ------------------------------ |
| `src/shared/constants/providers.js` | Centralizar `PROVIDER_HEADERS` |
| `src/lib/usage/fetcher.js`          | Usar headers centralizados     |
| `src/sse/services/auth.js`          | Usar headers centralizados     |
| `src/sse/services/tokenRefresh.js`  | Usar headers centralizados     |

---

## Referência Direta

- Arquivo original: `zero-limit/src/constants/api.ts` (46 linhas)
- Todos os valores exatos estão nas linhas 17-45
