# Feature 131 — Response Cost Headers

## Resumo

Adicionar headers HTTP de custo, modelo e provider em cada resposta SSE, permitindo que clientes rastreiem automaticamente custos, identifiquem qual provider/modelo atendeu a requisição, e detectem cache hits.

## Motivação

O LiteLLM retorna o header `x-litellm-response-cost` em cada resposta, permitindo que dashboards, CLIs e integrações calculem custos sem depender de APIs de billing separadas. Atualmente, o OmniRoute calcula custos internamente (`costRules.js`, `usageAnalytics.js`) mas **não expõe** essas informações ao cliente na resposta HTTP.

Isso obriga o cliente a:

- Consultar o dashboard ou API de usage separadamente
- Estimar custos por conta própria
- Não ter visibilidade instantânea sobre qual deployment atendeu

## O que ganhamos

- **Transparência instantânea**: O cliente sabe o custo exato de cada requisição no momento da resposta
- **Integração com CLIs**: Ferramentas como Claude Code, Codex CLI podem exibir custos em tempo real
- **Debugging facilitado**: Saber qual provider/modelo respondeu ajuda a diagnosticar problemas
- **Cache awareness**: Clientes sabem quando uma resposta veio do cache
- **Métricas client-side**: Dashboards externos podem agregar custos sem acessar a API

## Situação Atual (Antes)

```
Cliente envia: POST /v1/chat/completions

Resposta:
  Status: 200
  Headers:
    Content-Type: text/event-stream
    X-Request-Id: req_abc123
  Body: data: {"choices": [...]}

→ Cliente NÃO sabe:
  - Quanto custou esta requisição
  - Qual provider/modelo realmente respondeu
  - Se veio do cache ou não
```

## Situação Proposta (Depois)

```
Cliente envia: POST /v1/chat/completions

Resposta:
  Status: 200
  Headers:
    Content-Type: text/event-stream
    X-Request-Id: req_abc123
    X-OmniRoute-Response-Cost: 0.0001234567      ← custo em USD
    X-OmniRoute-Model: claude-sonnet-4-5-20250929 ← modelo real utilizado
    X-OmniRoute-Provider: cc                       ← provider/alias
    X-OmniRoute-Cache-Hit: false                   ← se veio do cache
    X-OmniRoute-Latency-Ms: 1243                   ← latência total
    X-OmniRoute-Tokens-In: 150                     ← tokens de entrada
    X-OmniRoute-Tokens-Out: 87                     ← tokens de saída
  Body: data: {"choices": [...]}

→ Cliente pode usar esses headers para monitoramento, billing e debugging
```

## Especificação Técnica

### Headers a Adicionar

| Header                      | Tipo    | Descrição                                      |
| --------------------------- | ------- | ---------------------------------------------- |
| `X-OmniRoute-Response-Cost` | float   | Custo em USD (precisão 10 casas decimais)      |
| `X-OmniRoute-Model`         | string  | Nome exato do modelo que respondeu             |
| `X-OmniRoute-Provider`      | string  | Alias do provider (e.g., `cc`, `gc`, `openai`) |
| `X-OmniRoute-Cache-Hit`     | boolean | `true` se a resposta veio do cache             |
| `X-OmniRoute-Latency-Ms`    | integer | Latência total em milissegundos                |
| `X-OmniRoute-Tokens-In`     | integer | Total de tokens de entrada consumidos          |
| `X-OmniRoute-Tokens-Out`    | integer | Total de tokens de saída gerados               |

### Integração no Fluxo SSE

```javascript
// Em src/sse/handlers/chat.js — após receber resposta do upstream

// Extrair dados de usage do response final (chunk com usage)
const usage = responseData.usage || {};
const cost = calculateCostFromTokens(usage, getPricingForModel(provider, model));

// Adicionar headers de custo ao response
const headers = new Headers({
  "Content-Type": "text/event-stream",
  "X-Request-Id": requestId,
  "X-OmniRoute-Response-Cost": cost.toFixed(10),
  "X-OmniRoute-Model": resolvedModel,
  "X-OmniRoute-Provider": providerAlias,
  "X-OmniRoute-Cache-Hit": String(cachedResponse),
  "X-OmniRoute-Latency-Ms": String(Date.now() - startTime),
  "X-OmniRoute-Tokens-In": String(usage.prompt_tokens || 0),
  "X-OmniRoute-Tokens-Out": String(usage.completion_tokens || 0),
});
```

### Para Streaming SSE

Em requisições streaming, os tokens totais só são conhecidos no último chunk. Duas abordagens:

1. **Trailer Headers** (preferível mas nem todos os clientes suportam)
2. **Comment-based metadata no último evento SSE** (universal):

```javascript
// Ao finalizar o stream, antes do [DONE]
writer.write(
  encoder.encode(
    `data: {"x_omniroute_cost":${cost},"x_omniroute_tokens_in":${tokensIn},"x_omniroute_tokens_out":${tokensOut}}\n\n`
  )
);
// Ou como comentário SSE:
writer.write(encoder.encode(`: x-omniroute-response-cost=${cost.toFixed(10)}\n`));
```

## Como fazer (passo a passo)

1. Definir constantes de headers em módulo compartilhado para evitar divergência de nomes.
2. Coletar métricas de custo/tokens no fechamento da resposta (stream e non-stream).
3. Anexar headers no objeto de resposta HTTP com valores normalizados e seguros.
4. Para SSE, emitir metadados finais antes do `[DONE]` quando tokens finais só existirem no último chunk.
5. Garantir que ausência de usage não quebre resposta (fallback para `0`).
6. Adicionar testes cobrindo headers em sucesso, fallback e cache hit.

## Arquivos a Criar/Modificar

| Arquivo                           | Ação                                                   |
| --------------------------------- | ------------------------------------------------------ |
| `src/sse/handlers/chat.js`        | **MODIFICAR** — Adicionar headers de custo ao response |
| `src/sse/handlers/chatHelpers.js` | **MODIFICAR** — Calcular custo e coletar métricas      |
| `src/shared/constants/headers.js` | **NOVO** — Constantes dos nomes dos headers            |

## Critérios de Aceite

- [ ] Header `X-OmniRoute-Response-Cost` presente em todas as respostas (streaming e non-streaming)
- [ ] Header `X-OmniRoute-Model` reflete o modelo real usado (não o alias)
- [ ] Header `X-OmniRoute-Cache-Hit` é `true` quando resposta vem do semantic/response cache
- [ ] Custo com precisão de pelo menos 6 casas decimais
- [ ] Headers não quebram compatibilidade com clientes OpenAI existentes
- [ ] Para streaming, metadados incluídos como comentário SSE antes do `[DONE]`

## Referência

- [LiteLLM: proxy/common_request_processing.py](https://github.com/BerriAI/litellm/blob/main/litellm/proxy/common_request_processing.py) — extrai custo de `_hidden_params` e adiciona ao response header
- [LiteLLM: cost_calculator.py](https://github.com/BerriAI/litellm/blob/main/litellm/cost_calculator.py) — cálculo de custo baseado em tokens × preço
