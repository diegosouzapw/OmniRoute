# 06 — Gemini 3.1 Pro: Novo Flagship Google

> **Prioridade**: 🔴 Alta  
> **Provider existente**: `gemini` (API Key), `gc` (Gemini CLI)  
> **Impacto**: Versão mais nova do flagship Google com context window de 1.05M tokens

---

## Contexto e Motivação

O ClawRouter lista o modelo `google/gemini-3.1-pro` como o flagship atual do Google:
- **Preço**: $2.00/$12.00/M tokens
- **Context**: 1.050.000 tokens
- **Max Output**: 65.536 tokens
- **Capabilities**: reasoning, vision, toolCalling
- Alias: `gemini-3.1-pro-preview` → `google/gemini-3.1-pro`

O OmniRoute já tem `gemini-3-pro-preview` em `pricing.ts` em `gc` e `gemini` com os
mesmos preços ($2.00/$12.00). Porém, o `gemini-3.1-pro` pode ser um modelo diferente/atualizado!

---

## Estado Atual no OmniRoute

```typescript
// pricing.ts seção gemini:
"gemini-3-pro-preview": {
  input: 2.0,
  output: 12.0,
  // ...
},
"gemini-2.5-pro": { /* ... */ },
"gemini-2.5-flash": { /* ... */ },
"gemini-2.5-flash-lite": { /* ... */ },

// pricing.ts seção gc:
"gemini-3-pro-preview": { /* ... */ },
"gemini-3-flash-preview": { /* ... */ },
"gemini-2.5-pro": { /* ... */ },
```

---

## Investigação Necessária

### 1. Verificar se `gemini-3.1-pro` é modelo novo ou alias

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models" \
  -H "x-goog-api-key: <GEMINI_API_KEY>"
```

Buscar na lista por:
- `gemini-3.1-pro`
- `gemini-3-1-pro`  
- `gemini-3.1-pro-preview`
- `gemini-3-pro` (sem versão menor)

### 2. Verificar via Gemini CLI

```bash
cat ~/.config/google-cloud/application_default_credentials.json  # verificar token
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro" \
  -H "x-goog-api-key: <key>"
```

Testar se retorna 200 (modelo existe) ou 404 (não existe).

---

## Arquivos a Modificar

```
src/shared/constants/pricing.ts          ← adicionar gemini-3.1-pro
open-sse/services/providerRegistry.ts   ← registrar modelo
```

---

## Passo 1: Adicionar `gemini-3.1-pro` em `pricing.ts`

Se a investigação confirmar que é um modelo novo/diferente do `gemini-3-pro-preview`:

```typescript
// Seção gemini (API Key):
gemini: {
  // Existente:
  "gemini-3-pro-preview": { /* manter */ },
  "gemini-2.5-pro": { /* manter */ },
  "gemini-2.5-flash": { /* manter */ },
  "gemini-2.5-flash-lite": { /* manter */ },

  // NOVO — Gemini 3.1 Pro (versão com ponto, como referenciado pelo ClawRouter):
  "gemini-3.1-pro": {
    input: 2.0,
    output: 12.0,
    cached: 0.25,     // 12.5% do input (padrão Google)
    reasoning: 18.0,  // 1.5x output para reasoning tokens
    cache_creation: 2.0,
  },
  // Alias sem "." pois Google por vezes usa formato diferente:
  "gemini-3-1-pro": {
    input: 2.0,
    output: 12.0,
    cached: 0.25,
    reasoning: 18.0,
    cache_creation: 2.0,
  },
},

// Seção gc (Gemini CLI):
gc: {
  // Existente:
  "gemini-3-pro-preview": { /* manter */ },
  "gemini-3-flash-preview": { /* manter */ },

  // NOVO:
  "gemini-3.1-pro": {
    input: 2.0,
    output: 12.0,
    cached: 0.25,
    reasoning: 18.0,
    cache_creation: 2.0,
  },
},
```

---

## Passo 2: Aliases de Redirecionamento

Verificar se o ClawRouter usa `gemini-3.1-pro-preview` como alias que aponta
para `gemini-3.1-pro`. Se sim, implementar o mesmo na nossa camada de aliases:

```typescript
// Em models.ts ou onde existem aliases:
"gemini-3.1-pro-preview": "gemini-3.1-pro",
"google/gemini-3.1-pro-preview": "gemini-3.1-pro",
```

---

## Passo 3: Registrar no Provider Registry

```typescript
{
  id: "gemini-3.1-pro",
  name: "Gemini 3.1 Pro",
  description: "Modelo mais avançado do Google. 1.05M context, reasoning, vision, tools. $2/$12/M.",
  contextWindow: 1050000,
  maxOutput: 65536,
  capabilities: ["chat", "tools", "reasoning", "vision"],
  pricing: { input: 2.0, output: 12.0 },
  tags: ["reasoning", "vision", "tools", "large-context", "flagship"],
},
```

---

## Testes de Validação

### Teste 1: Verificar se modelo existe
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <gemini-key>" \
  -d '{"model": "gemini-3.1-pro", "messages": [{"role": "user", "content": "Hello"}]}'
```
Não deve retornar 404.

### Teste 2: Comparar com gemini-3-pro-preview
```bash
# Ambos devem responder corretamente:
curl -X POST http://localhost:3000/v1/chat/completions ... "model": "gemini-3-pro-preview"
curl -X POST http://localhost:3000/v1/chat/completions ... "model": "gemini-3.1-pro"
```

---

## Referências

- [Google AI Models](https://ai.google.dev/gemini-api/docs/models)
- [ClawRouter models.ts - Gemini 3.1](https://github.com/BlockRunAI/ClawRouter/blob/main/src/models.ts)

---

## Rollback

Apenas remover entradas adicionadas em `pricing.ts` e provider registry.
