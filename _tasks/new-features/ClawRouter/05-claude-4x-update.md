# 05 — Claude 4.5 e 4.6: Atualização dos Modelos Anthropic

> **Prioridade**: 🔴 Alta  
> **Provider existente**: `anthropic` (já em `providers.ts`), `claude` (OAuth)  
> **Impacto**: Garantir que os modelos mais novos da Anthropic estejam disponíveis com preços corretos

---

## Contexto e Motivação

O ClawRouter usa Claude nas versões **4.5** e **4.6**:
- `anthropic/claude-haiku-4.5` — $1.00/$5.00/M, 200k context
- `anthropic/claude-sonnet-4.6` — $3.00/$15.00/M, 200k context, até **64k output**
- `anthropic/claude-opus-4.6` — $5.00/$25.00/M, 200k context, 32k output

O OmniRoute já tem alguns desses modelos em `pricing.ts`:
- provider `cc` (Claude Code OAuth): tem `claude-sonnet-4-5-20250929`, `claude-haiku-4-5-20251001`
- provider `anthropic` (API Key): tem `claude-sonnet-4-20250514`, `claude-opus-4-20250514`
- provider `kiro`: tem `claude-sonnet-4.5`, `claude-opus-4.6`

**O principal gap**: `claude-sonnet-4.6` e `claude-haiku-4.5` podem não estar registrados
no provider `anthropic` (API Key) com os preços corretos do ClawRouter.

---

## Mapeamento de Modelos Anthropic

O ClawRouter usa um esquema de versionamento `4.X` (número apenas), enquanto Anthropic usa
datas de release (`-20250514`) nos IDs reais da API. A tabela de correspondência:

| ClawRouter ID | ID Real Anthropic API | Preço Input | Preço Output | Max Output |
|---------------|----------------------|-------------|--------------|------------|
| `claude-haiku-4.5` | `claude-haiku-4-5-20251001` | $1.00 | $5.00 | 8192 |
| `claude-sonnet-4.6` | `claude-sonnet-4-6-20251031` (estimado) | $3.00 | $15.00 | **64000** |
| `claude-opus-4.6` | `claude-opus-4-6-20251031` (estimado) | $5.00 | $25.00 | 32000 |

> ⚠️ **Verificar**: As datas de release (`-20251031`) são estimadas. Confirmar os IDs exatos
> na [Anthropic API Models page](https://www.anthropic.com/api).

---

## Investigação Necessária

### 1. Listar modelos disponíveis na API Anthropic

```bash
curl https://api.anthropic.com/v1/models \
  -H "x-api-key: <anthropic-api-key>" \
  -H "anthropic-version: 2023-06-01"
```

Isso retorna a lista atual de modelos disponíveis com seus IDs exatos.

### 2. Verificar Sonnet 4.6 — Max Output 64k

O ClawRouter indica `maxOutput: 64000` para Sonnet 4.6, que é MUITO maior que o padrão (8192).
Este é um diferencial importante. Verificar se nossa implementação limita o max_tokens
ou se passa o valor do usuário direto.

---

## Arquivos a Modificar

```
src/shared/constants/pricing.ts           ← seção anthropic e cc 
open-sse/executors/base.ts               ← EXTENDED_CONTEXT_MODELS lista (para Sonnet 4.6)
```

---

## Passo 1: Atualizar `pricing.ts` — seção `anthropic`

```typescript
anthropic: {
  // Existente — manter:
  "claude-sonnet-4-20250514": {
    input: 3.0,
    output: 15.0,
    cached: 1.5,
    reasoning: 15.0,
    cache_creation: 3.0,
  },
  "claude-opus-4-20250514": {
    input: 15.0,
    output: 75.0,
    cached: 7.5,
    reasoning: 112.5,
    cache_creation: 15.0,
  },
  "claude-3-5-sonnet-20241022": { /* manter */ },

  // NOVO — Claude 4.5 Haiku (preço corrigido conforme ClawRouter):
  "claude-haiku-4-5-20251001": {
    input: 1.0,    // ClawRouter: $1.00 (era $0.5/?? nosso)
    output: 5.0,   // ClawRouter: $5.00
    cached: 0.5,
    reasoning: 7.5,
    cache_creation: 1.0,
  },
  // Alias sem data:
  "claude-haiku-4.5": {
    input: 1.0,
    output: 5.0,
    cached: 0.5,
    reasoning: 7.5,
    cache_creation: 1.0,
  },

  // NOVO — Claude Sonnet 4.6 (confirmar ID real na API):
  // Nota: maxOutput até 64000 tokens segundo ClawRouter
  "claude-sonnet-4-6-20251031": { // ← confirmar data exata
    input: 3.0,
    output: 15.0,
    cached: 1.5,
    reasoning: 22.5,
    cache_creation: 3.0,
  },
  "claude-sonnet-4.6": { // alias sem data
    input: 3.0,
    output: 15.0,
    cached: 1.5,
    reasoning: 22.5,
    cache_creation: 3.0,
  },

  // NOVO — Claude Opus 4.6 (confirmar ID real):
  "claude-opus-4-6-20251031": { // ← confirmar data exata
    input: 5.0,    // ClawRouter: $5.00 (muito mais barato que Opus 4 = $15)
    output: 25.0,  // ClawRouter: $25.00 (vs $75 do Opus 4)
    cached: 2.5,
    reasoning: 37.5,
    cache_creation: 5.0,
  },
  "claude-opus-4.6": { // alias
    input: 5.0,
    output: 25.0,
    cached: 2.5,
    reasoning: 37.5,
    cache_creation: 5.0,
  },
},
```

---

## Passo 2: Atualizar `pricing.ts` — seção `cc` (Claude Code OAuth)

```typescript
cc: {
  // Existente — verificar se preços estão corretos:
  "claude-opus-4-5-20251101": {
    input: 15.0,   // Preço Opus 4-5 é diferente do Opus 4.6!
    output: 75.0,
    // ...
  },
  "claude-sonnet-4-5-20250929": {
    input: 3.0,
    output: 15.0,
    // ...
  },
  "claude-haiku-4-5-20251001": {
    input: 1.0,    // ← verificar se está correto (ClawRouter usa $1.00)
    output: 5.0,   // ← verificar (ClawRouter usa $5.00)
    // ...
  },

  // NOVO — Adicionar Sonnet 4.6 e Opus 4.6 se disponíveis via OAuth:
  "claude-sonnet-4-6": {
    input: 3.0,
    output: 15.0,
    cached: 1.5,
    reasoning: 22.5,
    cache_creation: 3.0,
  },
},
```

---

## Passo 3: Suporte ao Max Output 64k do Sonnet 4.6

O `base.ts` executor tem uma lista `EXTENDED_CONTEXT_MODELS` para o header `context-1m-2025-08-07`.
O Sonnet 4.6 com 64k max output pode precisar de um header de beta capability diferente.

Verificar na Anthropic API se `claude-sonnet-4.6` precisa de algum header especial
para suportar outputs de 64k tokens:

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: <key>" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-sonnet-4-6-20251031",
    "max_tokens": 64000,
    "messages": [{"role": "user", "content": "Write 10000 words about AI."}]
  }'
```

Se retornar erro sobre max_tokens, adicionar o modelo à lista de extended context
ou criar uma nova lista para high-output models em `base.ts`.

---

## Passo 4: Registrar no Provider Registry

```typescript
// Adicionar na seção Anthropic do provider registry:
{
  id: "claude-sonnet-4.6",
  name: "Claude Sonnet 4.6",
  description: "Sonnet mais recente. 200k context, até 64k output, reasoning incluso. $3/$15/M.",
  contextWindow: 200000,
  maxOutput: 64000, // ← diferencial vs 8192 dos modelos anteriores
  capabilities: ["chat", "tools", "reasoning", "vision"],
  pricing: { input: 3.0, output: 15.0 },
  tags: ["reasoning", "agentic", "vision", "tools", "large-output"],
},
{
  id: "claude-opus-4.6",
  name: "Claude Opus 4.6",
  description: "Opus mais recente e mais barato que o 4. $5/$25/M (vs $15/$75 do Opus 4).",
  contextWindow: 200000,
  maxOutput: 32000,
  capabilities: ["chat", "tools", "reasoning", "vision"],
  pricing: { input: 5.0, output: 25.0 },
  tags: ["reasoning", "premium", "vision", "tools"],
},
{
  id: "claude-haiku-4.5",
  name: "Claude Haiku 4.5",
  description: "Haiku mais rápido e barato. 200k context, $1/$5/M, ideal para tasks simples.",
  contextWindow: 200000,
  maxOutput: 8192,
  capabilities: ["chat", "tools", "vision"],
  pricing: { input: 1.0, output: 5.0 },
  tags: ["cheap", "fast", "vision", "tools"],
},
```

---

## Testes de Validação

### Teste 1: Listar modelos Claude disponíveis
```bash
curl http://localhost:3000/v1/models | python3 -c "
import sys, json
models = json.load(sys.stdin)
claudeModels = [m for m in models.get('data', []) if 'claude' in m['id']]
for m in claudeModels: print(m['id'])
"
```

### Teste 2: Testar output longo do Sonnet 4.6
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <anthropic-key>" \
  -d '{
    "model": "claude-sonnet-4.6",
    "messages": [{"role": "user", "content": "Write a detailed 5000-word technical report."}],
    "max_tokens": 5000
  }'
```
Verificar que não retorna erro de max_tokens excedido.

---

## Referências

- [Anthropic API Models](https://docs.anthropic.com/en/docs/about-claude/models)
- [ClawRouter models.ts - Claude entries](https://github.com/BlockRunAI/ClawRouter/blob/main/src/models.ts)
- Nossa seção `pricing.ts` linha ~430
- `open-sse/executors/base.ts` linha 204 (`EXTENDED_CONTEXT_MODELS`)

---

## Rollback

Adicionar entradas não quebra modelos existentes. Para reverter: remover os novos modelos
do `pricing.ts` e `providerRegistry.ts`.
