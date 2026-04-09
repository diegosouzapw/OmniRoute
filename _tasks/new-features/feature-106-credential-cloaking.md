# Feature 07 — Credential Cloaking (Claude)

## Resumo

Implementar um sistema de "cloaking" para requisições Claude que disfarça que a requisição veio de um proxy e não diretamente do Claude Code CLI. Inclui injeção do system prompt oficial do Claude Code, obfuscação de palavras sensíveis, e modos de operação configuráveis.

## Motivação

A Anthropic monitora padrões de uso para detectar proxies não autorizados. Se uma requisição não parecer vir do Claude Code oficial, a conta pode ser flagged ou suspensa. O cloaking garante que as requisições pareçam orgânicas, protegendo as credenciais OAuth dos usuários.

## O que ganhamos

- **Proteção de credenciais**: Menor risco de suspensão de contas
- **Transparência**: Requisições parecem nativas do Claude Code
- **Flexibilidade**: Modos `auto`, `always` e `never` por credencial
- **Segurança**: Palavras sensíveis são obfuscadas com zero-width characters

## Situação Atual (Antes)

```
Proxy envia requisição para Anthropic:
→ System prompt: custom (não do Claude Code)
→ Headers: mistura de headers do proxy + claude
→ Anthropic detecta padrão anômalo
→ Risco de flag/suspensão da conta
```

## Situação Proposta (Depois)

```
Proxy envia requisição para Anthropic com cloaking:
→ System prompt: Claude Code official prompt prepended
→ Headers: exatamente iguais ao Claude Code
→ Palavras sensíveis obfuscadas: "AP​I" (com zero-width char)
→ Anthropic vê requisição como Claude Code nativa
```

## Especificação Técnica

### Modos de Cloaking

| Modo     | Comportamento                                                   |
| -------- | --------------------------------------------------------------- |
| `auto`   | Aplica cloaking apenas quando o client NÃO é Claude Code nativo |
| `always` | Sempre aplica cloaking, mesmo para Claude Code                  |
| `never`  | Nunca aplica cloaking                                           |

### Strict Mode

| Strict  | Comportamento                                                             |
| ------- | ------------------------------------------------------------------------- |
| `false` | Prepend Claude Code prompt ao system message do user                      |
| `true`  | Remove TODOS os system messages do user, mantém apenas Claude Code prompt |

### Configuração

```json
// Per-credential cloaking config
{
  "claude_credentials": [
    {
      "credentialId": "hash-of-api-key",
      "cloak": {
        "mode": "auto",
        "strictMode": false,
        "sensitiveWords": ["API", "proxy", "endpoint", "reverse"]
      }
    }
  ]
}
```

### Detecção de Claude Code Client

```javascript
// src/lib/cloaking/detectClient.js

export function isClaudeCodeClient(headers) {
  const userAgent = headers["user-agent"] || "";
  const xApp = headers["x-app"] || "";

  return userAgent.includes("claude-cli/") || xApp === "cli" || userAgent.includes("claude-code/");
}
```

### Obfuscação de Palavras Sensíveis

```javascript
// src/lib/cloaking/obfuscate.js

const ZERO_WIDTH_CHAR = "\u200B"; // Zero-width space

export function obfuscateSensitiveWords(text, words) {
  if (!words || words.length === 0) return text;

  let result = text;
  for (const word of words) {
    // Inserir zero-width char no meio da palavra
    const midpoint = Math.floor(word.length / 2);
    const obfuscated = word.slice(0, midpoint) + ZERO_WIDTH_CHAR + word.slice(midpoint);
    result = result.replaceAll(word, obfuscated);
  }
  return result;
}
```

### Injeção do Claude Code System Prompt

```javascript
// src/lib/cloaking/claudeCodePrompt.js

// Claude Code's official system prompt prefix
const CLAUDE_CODE_SYSTEM_PREFIX = `You are Claude, made by Anthropic. You are an interactive CLI-based coding assistant.`;

export function applyCloaking(payload, config) {
  if (config.mode === "never") return payload;

  const messages = [...payload.messages];

  if (config.strictMode) {
    // Remove ALL user system messages
    const filtered = messages.filter((m) => m.role !== "system");
    // Prepend Claude Code system prompt
    filtered.unshift({ role: "system", content: CLAUDE_CODE_SYSTEM_PREFIX });
    payload.messages = filtered;
  } else {
    // Prepend Claude Code prompt to existing system
    const systemIdx = messages.findIndex((m) => m.role === "system");
    if (systemIdx >= 0) {
      messages[systemIdx].content =
        CLAUDE_CODE_SYSTEM_PREFIX + "\n\n" + messages[systemIdx].content;
    } else {
      messages.unshift({ role: "system", content: CLAUDE_CODE_SYSTEM_PREFIX });
    }
    payload.messages = messages;
  }

  // Obfuscate sensitive words in all messages
  if (config.sensitiveWords?.length > 0) {
    for (const msg of payload.messages) {
      if (typeof msg.content === "string") {
        msg.content = obfuscateSensitiveWords(msg.content, config.sensitiveWords);
      }
    }
  }

  return payload;
}
```

### Integração

```javascript
// src/sse/handlers/chat.js — especificamente para provider Claude

if (provider === "claude" && credential.cloak) {
  const shouldCloak =
    credential.cloak.mode === "always" ||
    (credential.cloak.mode === "auto" && !isClaudeCodeClient(req.headers));

  if (shouldCloak) {
    payload = applyCloaking(payload, credential.cloak);
    logger.debug("Cloaking applied for Claude request");
  }
}
```

## Arquivos a Criar/Modificar

| Arquivo                                | Ação                              |
| -------------------------------------- | --------------------------------- |
| `src/lib/cloaking/detectClient.js`     | **NOVO** — Detecção de Client     |
| `src/lib/cloaking/obfuscate.js`        | **NOVO** — Obfuscação ZWC         |
| `src/lib/cloaking/claudeCodePrompt.js` | **NOVO** — Injeção de prompt      |
| `src/lib/cloaking/index.js`            | **NOVO** — Export consolidado     |
| `src/sse/handlers/chat.js`             | **MODIFICAR** — Integrar cloaking |

## Critérios de Aceite

- [ ] Modo `auto` aplica cloaking apenas para clients não-Claude-Code
- [ ] Modo `always` aplica cloaking para todos os clients
- [ ] Modo `never` nunca aplica cloaking
- [ ] Strict mode remove system messages do user e injeta Claude Code prompt
- [ ] Non-strict mode prepend Claude Code prompt ao system existente
- [ ] Palavras sensíveis são obfuscadas com zero-width characters
- [ ] Headers da requisição correspondem exatamente ao Claude Code CLI
- [ ] Log indica quando cloaking foi aplicado

## ⚠️ Considerações Éticas

> [!WARNING]
> Credential cloaking é uma técnica que pode violar os Termos de Serviço da Anthropic. Implementar esta feature deve ser feito com consciência dos riscos. O uso é de responsabilidade do operador do proxy.

## Referência

- [ProxyPilot: config.example.yaml linhas 149-157](https://github.com/Finesssee/ProxyPilot/blob/main/config.example.yaml) (cloak section)
