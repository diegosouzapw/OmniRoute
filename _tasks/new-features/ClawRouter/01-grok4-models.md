# 01 — Grok-4 Family (xAI): Novos Modelos Ultrabaratos

> **Prioridade**: 🔴 Alta  
> **Provider existente**: `xai` (já em `providers.ts` linha 159)  
> **Impacto**: Modelos de reasoning a $0.20/$0.50/M — os mais baratos do mercado com tool calling

---

## Contexto e Motivação

ClawRouter adicionou a **família Grok-4** da xAI em março/2026 como os modelos mais rápidos no
seu benchmark end-to-end. Com latência de **1143ms** (grok-4-fast-non-reasoning), 30% mais rápido
que o Gemini-2.5-flash (1238ms), e custo de apenas **$0.20/$0.50 por 1M tokens**, esses modelos
são candidatos ideais para as tiers SIMPLE e MEDIUM do nosso AutoCombo.

### Modelos a Adicionar

| Model ID | Nome | Input $/M | Output $/M | Context | Reasoning | Tool Calling | Obs |
|----------|------|-----------|------------|---------|-----------|--------------|-----|
| `grok-4-fast-non-reasoning` | Grok 4 Fast | $0.20 | $0.50 | 131072 | ❌ | ✅ | 1143ms latência |
| `grok-4-fast-reasoning` | Grok 4 Fast Reasoning | $0.20 | $0.50 | 131072 | ✅ | ✅ | com thinking |
| `grok-4-1-fast-non-reasoning` | Grok 4.1 Fast | $0.20 | $0.50 | 131072 | ❌ | ✅ | versão 4.1 |
| `grok-4-1-fast-reasoning` | Grok 4.1 Fast Reasoning | $0.20 | $0.50 | 131072 | ✅ | ✅ | versão 4.1 |
| `grok-4-0709` | Grok 4 (0709) | $0.20 | $1.50 | 131072 | ✅ | ✅ | mais poderoso |
| `grok-3-mini` | Grok 3 Mini | $0.30 | $0.50 | 131072 | ❌ | ✅ | alternativa eco |

> ⚠️ **Nota**: `grok-3-fast` foi removido pelos ClawRouter (muito caro, $5/$25).  
> `grok-code-fast-1` foi removido por "poor retention" — não adicionar.

---

## Arquivos a Modificar

```
src/shared/constants/pricing.ts          ← adicionar preços dos novos modelos
src/shared/constants/models.ts           ← verificar se tem registry de modelos
open-sse/services/providerRegistry.ts   ← registrar os modelos no catálogo  
```

> **Verificar**: A xAI usa a API `api.x.ai/v1` com formato OpenAI-compatible.  
> O executor existente `open-sse/executors/` provavelmente tem um `xai.ts` ou
> usa o executor genérico OpenAI-compatible. Confirmar antes de implementar.

---

## Passo 1: Adicionar os Preços em `pricing.ts`

Localizar a seção do provider `xai` em `src/shared/constants/pricing.ts`.
Se não existir, criar logo após a seção `openai`.

```typescript
// xAI (Grok)
xai: {
  // Grok 3 Family
  "grok-3": {
    input: 3.0,
    output: 15.0,
    cached: 1.5,
    reasoning: 22.5,
    cache_creation: 3.0,
  },
  "grok-3-mini": {
    input: 0.3,
    output: 0.5,
    cached: 0.15,
    reasoning: 0.75,
    cache_creation: 0.3,
  },

  // Grok 4 Fast Family — ultrabaratos, $0.20/$0.50 por 1M tokens
  // Benchmark ClawRouter: grok-4-fast-non-reasoning = 1143ms (30% mais rápido que Gemini-2.5-flash)
  "grok-4-fast-non-reasoning": {
    input: 0.2,
    output: 0.5,
    cached: 0.1,
    reasoning: 0.0, // não tem reasoning mode
    cache_creation: 0.2,
  },
  "grok-4-fast-reasoning": {
    input: 0.2,
    output: 0.5,
    cached: 0.1,
    reasoning: 0.75, // reasoning tokens com custo de output
    cache_creation: 0.2,
  },
  "grok-4-1-fast-non-reasoning": {
    input: 0.2,
    output: 0.5,
    cached: 0.1,
    reasoning: 0.0,
    cache_creation: 0.2,
  },
  "grok-4-1-fast-reasoning": {
    input: 0.2,
    output: 0.5,
    cached: 0.1,
    reasoning: 0.75,
    cache_creation: 0.2,
  },

  // Grok 4 Standard (versão datada para consistência)
  "grok-4-0709": {
    input: 0.2,
    output: 1.5,
    cached: 0.1,
    reasoning: 2.25,
    cache_creation: 0.2,
  },

  // Grok 2 Vision
  "grok-2-vision": {
    input: 2.0,
    output: 10.0,
    cached: 1.0,
    reasoning: 15.0,
    cache_creation: 2.0,
  },
},
```

---

## Passo 2: Registrar Modelos no catálogo do Provider Registry

Localizar `open-sse/services/providerRegistry.ts` (ou equivalente) — é o arquivo onde
os modelos de cada provider ficam registrados para aparecer no dashboard e ser selecionáveis.

Adicionar dentro da seção do provider `xai`:

```typescript
// Em providerRegistry.ts, dentro do objeto xai models/catalog:
{
  id: "grok-4-fast-non-reasoning",
  name: "Grok 4 Fast",
  description: "Modelo mais rápido do xAI. 1143ms latência medida. Sem reasoning, com tool calling.",
  contextWindow: 131072,
  maxOutput: 16384,
  capabilities: ["chat", "tools"],
  pricing: { input: 0.2, output: 0.5 },
  tags: ["fast", "cheap", "tools"],
},
{
  id: "grok-4-fast-reasoning",
  name: "Grok 4 Fast Reasoning",
  description: "Variante reasoning do Grok 4 Fast. Mesmo custo base, tokens de thinking extras.",
  contextWindow: 131072,
  maxOutput: 16384,
  capabilities: ["chat", "tools", "reasoning"],
  pricing: { input: 0.2, output: 0.5 },
  tags: ["fast", "cheap", "reasoning", "tools"],
},
{
  id: "grok-4-1-fast-non-reasoning",
  name: "Grok 4.1 Fast",
  description: "Versão 4.1 do Grok 4 Fast. Mesmas características, possivelmente melhorado.",
  contextWindow: 131072,
  maxOutput: 16384,
  capabilities: ["chat", "tools"],
  pricing: { input: 0.2, output: 0.5 },
  tags: ["fast", "cheap", "tools"],
},
{
  id: "grok-4-1-fast-reasoning",
  name: "Grok 4.1 Fast Reasoning",
  description: "Versão 4.1 reasoning do Grok 4 Fast.",
  contextWindow: 131072,
  maxOutput: 16384,
  capabilities: ["chat", "tools", "reasoning"],
  pricing: { input: 0.2, output: 0.5 },
  tags: ["fast", "cheap", "reasoning", "tools"],
},
{
  id: "grok-3-mini",
  name: "Grok 3 Mini",
  description: "Versão mini do Grok 3. Eco-friendly, boa relação custo/benefício.",
  contextWindow: 131072,
  maxOutput: 16384,
  capabilities: ["chat", "tools"],
  pricing: { input: 0.3, output: 0.5 },
  tags: ["eco", "cheap"],
},
```

---

## Passo 3: Verificar o Executor xAI

Verificar se existe `open-sse/executors/xai.ts`. Se existir, confirmar que:
- O `baseUrl` aponta para `https://api.x.ai/v1`
- O `chatPath` é `/chat/completions`
- Os headers incluem `Authorization: Bearer <apiKey>` 
- Não há transformação especial de modelo necessária

Se o executor usa o padrão OpenAI-compatible herdando de `BaseExecutor`, os novos
modelos funcionam automaticamente com o executor existente desde que os IDs estejam corretos.

```typescript
// Exemplo de como deve estar o executor xai (se existir):
export class XAIExecutor extends BaseExecutor {
  constructor() {
    super("xai", {
      id: "xai",
      baseUrl: "https://api.x.ai/v1/chat/completions",
    });
  }
  // Sem transformações especiais — API é OpenAI-compatible
}
```

---

## Passo 4: Adicionar Aliases (Opcional — para conveniência)

Em `src/shared/constants/models.ts` ou onde existirem aliases de modelo:

```typescript
// Aliases para facilitar o uso pelo usuário
"grok-fast": "grok-4-fast-non-reasoning",
"grok-fast-reasoning": "grok-4-fast-reasoning",
"grok4": "grok-4-fast-non-reasoning",
"xai/grok-fast": "grok-4-fast-non-reasoning",
```

---

## Passo 5: Verificar na API de modelos

Após implementar, chamar:
```bash
curl http://localhost:3000/v1/models | grep grok
```

Deve listar todos os 6 modelos Grok-4 novos.

---

## Testes de Validação

### Teste 1: Smoke test de chamada simples
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <sua-api-key-xai>" \
  -d '{
    "model": "grok-4-fast-non-reasoning",
    "messages": [{"role": "user", "content": "Hello, respond in one word."}],
    "stream": false
  }'
```
Esperado: resposta em <2 segundos, uma palavra.

### Teste 2: Tool calling
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <sua-api-key-xai>" \
  -d '{
    "model": "grok-4-fast-reasoning",
    "messages": [{"role": "user", "content": "What is 15 * 23?"}],
    "tools": [{"type": "function", "function": {"name": "calculator", "parameters": {"type": "object", "properties": {"expression": {"type": "string"}}}}}],
    "stream": false
  }'
```
Esperado: resposta com `tool_calls` no formato correto OpenAI.

### Teste 3: Preço no dashboard
Navegar no dashboard `/dashboard/analytics` após uma chamada e verificar
se o custo calculado corresponde a $0.20/M input tokens.

---

## Referências

- [xAI API Docs](https://docs.x.ai/docs)
- [ClawRouter models.ts - Grok entries](https://github.com/BlockRunAI/ClawRouter/blob/main/src/models.ts)
- Commit ClawRouter: `fix: restore quality models as auto primary` (0.12.47)
- Commit ClawRouter: `perf: benchmark-driven routing optimization` (0.12.45)

---

## Rollback

Se os modelos não funcionarem:
1. Remover as entradas de `pricing.ts`
2. Remover entradas do `providerRegistry.ts`
3. Fazer `git revert` dos arquivos modificados

Não há risco de quebrar modelos existentes pois as alterações são apenas adicionais.
