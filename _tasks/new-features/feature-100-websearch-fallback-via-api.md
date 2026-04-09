# Feature 86 — WebSearch Fallback via CLI Tools

**Fonte:** Análise do repositório `kaitranntt/ccs` — módulo `src/utils/websearch-manager.ts` e subdiretório `src/utils/websearch/`
**Prioridade:** 🟢 P3 — Melhoria incremental
**Complexidade:** Média-Alta (integração com CLI externas)

---

## Motivação

O tool `web_search` é uma feature **server-side** executada pela API do Claude (Anthropic). Quando um request é roteado para providers alternativos (Gemini, Antigravity, Codex, Qwen), o provider **não tem acesso** ao web_search porque é uma ferramenta proprietária da Anthropic.

O CCS resolve isso instalando um **hook** que intercepta chamadas `web_search` e as redireciona para ferramentas CLI disponíveis localmente:

1. **Gemini CLI** (`gemini`) — busca via Google
2. **Grok CLI** — busca via xAI
3. **OpenCode CLI** — busca genérica

Esse fallback é completamente transparente para o cliente.

---

## O Que Ganhamos

1. **WebSearch funciona em qualquer provider** — não apenas via Claude direto
2. **Fallback automático** — se Gemini CLI está disponível, ele é usado como search engine
3. **Transparência** — o cliente não sabe que o search foi redirecionado
4. **Extensível** — fácil adicionar novos backends de search (Perplexity API, SearXNG, etc.)

---

## Situação Atual (Antes)

```
Cliente → Request com tool_call "web_search" → OmniRoute → Gemini/Antigravity
                                                            ↓
                                                  ❌ Provider não suporta web_search
                                                  Tool é ignorado silenciosamente
                                                  Resposta sem resultados de busca
```

**Problema:** Quando o routing envia para um provider que não é Claude, qualquer `web_search` tool use é perdido. O modelo pode até mencionar que tentou buscar, mas os resultados nunca chegam.

---

## Situação Desejada (Depois)

```
Cliente → Request com tool_call "web_search" → OmniRoute [WebSearch Interceptor]
                                                 ↓
                                    Detecta: provider não suporta web_search
                                    Verifica: Perplexity API configurada? SearXNG disponível?
                                                 ↓
                                    Fallback via API de busca → resultados injetados
                                                 ↓
                                    ✅ Resposta do modelo com dados de busca reais
```

---

## Implementação Detalhada

### 1. Serviço de WebSearch Fallback: `src/lib/webSearchFallback.js`

```javascript
/**
 * WebSearch Fallback — intercept web_search tool calls
 * when the target provider doesn't support them natively.
 *
 * Backends suportados:
 * 1. Perplexity API (sonar) — se API key configurada
 * 2. SearXNG (self-hosted) — se URL configurada
 * 3. Tavily API — se API key configurada
 *
 * Diferente do CCS que usa CLIs locais, usamos APIs que
 * o OmniRoute já pode ter configuradas como providers.
 */

const PROVIDERS_WITH_NATIVE_SEARCH = new Set(["claude", "anthropic"]);

/**
 * Verifica se o provider alvo suporta web_search nativamente
 */
export function supportsNativeWebSearch(providerId) {
  return PROVIDERS_WITH_NATIVE_SEARCH.has(providerId);
}

/**
 * Detecta web_search tool calls no body da request
 */
export function extractWebSearchCalls(body) {
  if (!body?.tool_results && !body?.messages) return [];

  // Procurar tool_use blocks com name "web_search"
  const messages = body.messages || [];
  const searchCalls = [];

  for (const msg of messages) {
    if (!msg.content || !Array.isArray(msg.content)) continue;
    for (const block of msg.content) {
      if (block.type === "tool_use" && block.name === "web_search") {
        searchCalls.push({
          id: block.id,
          query: block.input?.query || "",
        });
      }
    }
  }

  return searchCalls;
}

/**
 * Executa busca via backend alternativo
 */
export async function executeWebSearch(query, config) {
  // Prioridade 1: Perplexity API
  if (config.perplexityApiKey) {
    return await searchViaPerplexity(query, config.perplexityApiKey);
  }

  // Prioridade 2: SearXNG (self-hosted)
  if (config.searxngUrl) {
    return await searchViaSearXNG(query, config.searxngUrl);
  }

  // Prioridade 3: Tavily
  if (config.tavilyApiKey) {
    return await searchViaTavily(query, config.tavilyApiKey);
  }

  // Sem backend disponível
  return {
    success: false,
    results: [],
    error: "No web search backend configured. Add a Perplexity, SearXNG, or Tavily key.",
  };
}

async function searchViaPerplexity(query, apiKey) {
  try {
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [{ role: "user", content: query }],
        max_tokens: 1000,
      }),
    });

    if (!res.ok) throw new Error(`Perplexity API error: ${res.status}`);
    const data = await res.json();

    return {
      success: true,
      results: [
        {
          title: `Search results for: ${query}`,
          content: data.choices?.[0]?.message?.content || "No results",
          source: "perplexity",
        },
      ],
      citations: data.citations || [],
    };
  } catch (err) {
    return { success: false, results: [], error: err.message };
  }
}

async function searchViaSearXNG(query, baseUrl) {
  try {
    const url = new URL("/search", baseUrl);
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("categories", "general");

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`SearXNG error: ${res.status}`);
    const data = await res.json();

    return {
      success: true,
      results: (data.results || []).slice(0, 5).map((r) => ({
        title: r.title,
        content: r.content,
        url: r.url,
        source: "searxng",
      })),
    };
  } catch (err) {
    return { success: false, results: [], error: err.message };
  }
}

async function searchViaTavily(query, apiKey) {
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        max_results: 5,
        include_answer: true,
      }),
    });

    if (!res.ok) throw new Error(`Tavily API error: ${res.status}`);
    const data = await res.json();

    return {
      success: true,
      results: (data.results || []).map((r) => ({
        title: r.title,
        content: r.content,
        url: r.url,
        source: "tavily",
      })),
      answer: data.answer,
    };
  } catch (err) {
    return { success: false, results: [], error: err.message };
  }
}

/**
 * Injeta resultados de busca no body como tool_result
 */
export function injectSearchResults(body, searchCallId, results) {
  const toolResult = {
    type: "tool_result",
    tool_use_id: searchCallId,
    content: JSON.stringify(results),
  };

  // Adicionar como mensagem do role "user" (resposta do tool)
  body.messages = body.messages || [];
  body.messages.push({
    role: "user",
    content: [toolResult],
  });

  return body;
}
```

### 2. Configuração

Adicionar ao `.env` ou settings:

```bash
# WebSearch Fallback Configuration
WEBSEARCH_FALLBACK_PERPLEXITY_KEY=pplx-xxx  # Prioridade 1
WEBSEARCH_FALLBACK_SEARXNG_URL=http://localhost:8080  # Prioridade 2
WEBSEARCH_FALLBACK_TAVILY_KEY=tvly-xxx  # Prioridade 3
```

### 3. Integração no Handler

```javascript
// Em src/sse/handlers/chat.js, antes do envio ao provider:
import {
  supportsNativeWebSearch,
  extractWebSearchCalls,
  executeWebSearch,
} from "@/lib/webSearchFallback";

if (!supportsNativeWebSearch(targetProvider)) {
  const searchCalls = extractWebSearchCalls(requestBody);
  if (searchCalls.length > 0) {
    for (const call of searchCalls) {
      const results = await executeWebSearch(call.query, config);
      if (results.success) {
        requestBody = injectSearchResults(requestBody, call.id, results);
        logger.info(
          `[websearch-fallback] Executed search for "${call.query}" via ${results.results[0]?.source}`
        );
      }
    }
  }
}
```

---

## Diferença em Relação ao CCS

| Aspecto      | CCS                                | OmniRoute (proposto)                |
| ------------ | ---------------------------------- | ----------------------------------- |
| Backend      | Gemini CLI, Grok CLI, OpenCode CLI | Perplexity API, SearXNG, Tavily API |
| Instalação   | Requer CLIs instaladas localmente  | APIs remotas, sem dependência local |
| Configuração | Auto-detect de binários            | API keys no .env                    |
| Qualidade    | Resultados de busca brutos         | Resultados formatados com citações  |

---

## Arquivos a Criar/Modificar

| Ação          | Arquivo                                  | Descrição                          |
| ------------- | ---------------------------------------- | ---------------------------------- |
| **CRIAR**     | `src/lib/webSearchFallback.js`           | Serviço de fallback com 3 backends |
| **MODIFICAR** | `src/sse/handlers/chat.js`               | Integrar interceptação             |
| **CRIAR**     | `tests/unit/websearch-fallback.test.mjs` | Testes unitários                   |

---

## Testes Necessários

1. Provider Claude → sem interceptação (suporta nativamente)
2. Provider Gemini + web_search tool → interceptação ativada
3. Perplexity configurada → busca via Perplexity
4. Apenas SearXNG configurada → busca via SearXNG
5. Nenhum backend → retorno com mensagem de erro informativa
6. Resultados injetados → body contém tool_result correto
7. Request sem web_search → nenhum overhead (bypass rápido)

---

## Referência do CCS

- [websearch-manager.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/utils/websearch-manager.ts) — 86 linhas, gerenciador central
- [websearch/gemini-cli.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/utils/websearch/) — detecção e execução via Gemini CLI
- [websearch/hook-installer.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/utils/websearch/) — instalação de hooks
