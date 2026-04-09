# Feature 02 — Prompt Cache Sintético

## Resumo

Implementar um cache de system prompts frequentes para estimar e visualizar economia de tokens. Diferente do Response Cache (Feature 01), este cache não retorna respostas — ele identifica system prompts repetidos e pode sinalizar ao provider que aquele prompt já foi visto (aproveitando prompt caching nativo de providers como Anthropic e Google).

## Motivação

Coding agents como Claude Code, Codex CLI e Cursor enviam o mesmo system prompt em TODAS as requisições de uma sessão. Estes prompts podem ter 5.000-50.000 tokens. Providers como Anthropic e Google oferecem desconto para prompts cacheados, mas só se o proxy sinalizá-los corretamente.

## O que ganhamos

- **Economia real**: Anthropic cobra 90% menos para tokens de prompt que estão no cache
- **Visibilidade**: Saber quais prompts são mais frequentes e quanto custariam sem cache
- **Cross-provider**: Mesmo providers sem cache nativo, o tracking ajuda a otimizar
- **Dashboard**: Top 10 prompts mais frequentes com economia estimada

## Situação Atual (Antes)

```
Requisição 1: system_prompt (30K tokens) → Provider → cobrado 30K tokens
Requisição 2: system_prompt (30K tokens) → Provider → cobrado 30K tokens (idêntico!)
Requisição 3: system_prompt (30K tokens) → Provider → cobrado 30K tokens (idêntico!)
// Total: 90K tokens cobrados, 60K desperdiçados
```

- Nenhum tracking de prompts repetidos
- Sem sinalização para providers que suportam cache
- Sem visibilidade do custo de repetição

## Situação Proposta (Depois)

```
Requisição 1: system_prompt → hash → cache MISS → Provider (30K tokens full price)
Requisição 2: system_prompt → hash → cache HIT  → Provider (30K tokens @ 10% price)
Requisição 3: system_prompt → hash → cache HIT  → Provider (30K tokens @ 10% price)
// Total: ~36K tokens efetivos, economia de ~60%
```

## Especificação Técnica

### Estrutura do Prompt Cache

```javascript
// src/lib/cache/promptCache.js

class PromptCache {
  constructor(config) {
    this.maxSize = config.maxSize || 500;
    this.ttlMs = (config.ttlSeconds || 1800) * 1000; // 30 min default
    this.entries = new Map(); // hash → PromptCacheEntry
    this.enabled = config.enabled || false;
  }
}

const PromptCacheEntry = {
  hash: String, // SHA-256 do system prompt
  hitCount: Number, // vezes que foi reutilizado
  firstSeen: Date, // primeira vez visto
  lastSeen: Date, // última vez visto
  estimatedTokens: Number, // estimativa de tokens
  promptPreview: String, // primeiros 100 chars para debug
};
```

### Detecção de System Prompt

```javascript
function extractSystemPrompt(payload) {
  if (!payload?.messages) return null;
  const systemMsgs = payload.messages.filter((m) => m.role === "system");
  if (systemMsgs.length === 0) return null;
  return systemMsgs.map((m) => m.content).join("\n");
}

function hashPrompt(prompt) {
  return crypto.createHash("sha256").update(prompt).digest("hex");
}
```

### Sinalização para Providers

Para Anthropic, adicionar `cache_control` quando detectar prompt cacheado:

```javascript
// Quando system prompt é cache HIT, sinalizar ao Anthropic
if (provider === "claude" && promptCache.has(systemPromptHash)) {
  payload.system = [
    {
      type: "text",
      text: systemPrompt,
      cache_control: { type: "ephemeral" }, // ativa Anthropic prompt caching
    },
  ];
}
```

### Management APIs

| Endpoint                    | Método | Descrição                        |
| --------------------------- | ------ | -------------------------------- |
| `/api/prompt-cache/stats`   | GET    | Entries, hits, economia estimada |
| `/api/prompt-cache/clear`   | POST   | Limpar cache                     |
| `/api/prompt-cache/enabled` | PUT    | Toggle runtime                   |
| `/api/prompt-cache/top`     | GET    | Top 10 prompts mais frequentes   |

### Estimativa de Tokens Economizados

```javascript
getEstimatedSavings() {
  let totalTokensSaved = 0;
  for (const entry of this.entries.values()) {
    // Cada hit após o primeiro economiza ~90% dos tokens
    totalTokensSaved += entry.estimatedTokens * (entry.hitCount - 1) * 0.9;
  }
  return totalTokensSaved;
}
```

## Configuração

```env
PROMPT_CACHE_ENABLED=true
PROMPT_CACHE_MAX_SIZE=500
PROMPT_CACHE_TTL_SECONDS=1800
```

## Arquivos a Criar/Modificar

| Arquivo                                       | Ação                                               |
| --------------------------------------------- | -------------------------------------------------- |
| `src/lib/cache/promptCache.js`                | **NOVO** — Classe do prompt cache                  |
| `src/sse/handlers/chat.js`                    | **MODIFICAR** — Detectar system prompt e sinalizar |
| `src/app/(dashboard)/dashboard/cache/page.js` | **MODIFICAR** — Adicionar seção de prompt cache    |

## Critérios de Aceite

- [ ] System prompts repetidos são detectados e contados
- [ ] Anthropic requests incluem `cache_control` quando prompt é cache HIT
- [ ] Stats mostram economia estimada em tokens
- [ ] Top 10 endpoint retorna prompts mais frequentes com preview
- [ ] TTL de 30 min (default) remove entries antigas automaticamente

## Referência

- [ProxyPilot: internal/cache/prompt_cache.go](https://github.com/Finesssee/ProxyPilot/blob/main/internal/cache/prompt_cache.go) (394 linhas, Go)
