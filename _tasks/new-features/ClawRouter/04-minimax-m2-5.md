# 04 — MiniMax M2.5: Modelo Reasoning + Agentic Barato

> **Prioridade**: 🔴 Alta  
> **Provider existente**: `minimax` (já em `providers.ts` linha 85)  
> **Impacto**: Atualização do modelo MiniMax para M2.5 com reasoning e capacidade agentic

---

## Contexto e Motivação

Nosso provider `minimax` atual lista apenas `MiniMax-M2.1` em `pricing.ts` com preço
$0.5/$2.0. O ClawRouter usa `minimax/minimax-m2.5` com preço $0.30/$1.20 — mais barato
E com capacidades de reasoning + agentic que o M2.1 não tinha.

O MiniMax M2.5 da ClawRouter:
- **Context**: 204.800 tokens
- **Max Output**: 16.384 tokens
- **Preço**: $0.30 input / $1.20 output (mais barato que M2.1)
- **Capacidades**: reasoning, agentic, tool calling
- **Uso ideal**: Tasks médias que precisam de raciocínio sem custo de GPT-4/Claude

---

## Estado Atual no OmniRoute

```typescript
// pricing.ts linha 535:
minimax: {
  "MiniMax-M2.1": {
    input: 0.5,
    output: 2.0,
    // ...
  },
},
```

E no `qoder` provider:
```typescript
"minimax-m2": {
  input: 0.5,
  output: 2.0,
  // ...
},
```

---

## Investigação Necessária

### 1. Verificar endpoint e nome do modelo M2.5

O endpoint MiniMax atual é provavelmente `https://api.minimaxi.com/v1/text/chatcompletion_v2`
ou similar. Verificar se o `minimax-m2.5` é acessível via:

```bash
# Testar com API key MiniMax:
curl -X POST https://api.minimaxi.com/v1/text/chatcompletion_v2 \
  -H "Authorization: Bearer <minimax-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model": "minimax-m2.5", "messages": [{"role": "user", "content": "test"}]}'
```

Também testar com `MiniMax-M2.5` (casing diferente) pois a API MiniMax usa CamelCase.

### 2. Verificar endpoint da China vs Global

O MiniMax tem dois providers no OmniRoute: `minimax` e `minimax-cn`. Verificar se M2.5
está disponível nos dois ou apenas em um.

---

## Arquivos a Modificar

```
src/shared/constants/pricing.ts          ← adicionar M2.5 na seção minimax
open-sse/services/providerRegistry.ts   ← registrar M2.5
```

---

## Passo 1: Adicionar M2.5 em `pricing.ts`

```typescript
minimax: {
  // Existente (manter para backcompat):
  "MiniMax-M2.1": {
    input: 0.5,
    output: 2.0,
    cached: 0.25,
    reasoning: 3.0,
    cache_creation: 0.5,
  },
  // NOVO: MiniMax M2.5 — mais barato e mais capaz que M2.1
  "minimax-m2.5": {
    input: 0.30,
    output: 1.20,
    cached: 0.15,
    reasoning: 1.80,
    cache_creation: 0.30,
  },
  // Alias com CamelCase (API MiniMax frequentemente usa esse casing):
  "MiniMax-M2.5": {
    input: 0.30,
    output: 1.20,
    cached: 0.15,
    reasoning: 1.80,
    cache_creation: 0.30,
  },
},
```

---

## Passo 2: Registrar no Provider Registry

```typescript
{
  id: "minimax-m2.5",
  name: "MiniMax M2.5",
  description: "Novo flagship MiniMax. $0.30/$1.20/M com reasoning, agentic e tool calling. 204k context.",
  contextWindow: 204800,
  maxOutput: 16384,
  capabilities: ["chat", "tools", "reasoning"],
  pricing: { input: 0.30, output: 1.20 },
  tags: ["reasoning", "agentic", "tools", "cheap"],
},
```

---

## Passo 3: Verificar Alias em minimax-cn

Se o provider `minimax-cn` também deveria ter o M2.5:

```typescript
"minimax-cn": {
  // ... outros modelos
  "minimax-m2.5": {
    input: 0.30, // pode diferir na versão China
    output: 1.20,
    cached: 0.15,
    reasoning: 1.80,
    cache_creation: 0.30,
  },
},
```

---

## Testes de Validação

### Teste 1: Modelo disponível
```bash
curl http://localhost:3000/v1/models | jsonpath "$.data[?(@.id == 'minimax-m2.5')]"
```

### Teste 2: Chat simples
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <minimax-key>" \
  -d '{"model": "minimax-m2.5", "messages": [{"role": "user", "content": "Solve: 2x + 5 = 15. Show your work step by step."}]}'
```

### Teste 3: Tool calling
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <minimax-key>" \
  -d '{
    "model": "minimax-m2.5",
    "messages": [{"role": "user", "content": "Search for the weather in São Paulo"}],
    "tools": [{"type": "function", "function": {"name": "get_weather", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}}}}]
  }'
```

---

## Referências

- [ClawRouter models.ts - MiniMax M2.5](https://github.com/BlockRunAI/ClawRouter/blob/main/src/models.ts)
- [MiniMax API Documentation](https://www.minimaxi.com/document/guides/chat-model/pro)

---

## Rollback

Remover apenas as entradas adicionadas em `pricing.ts`. Risk: muito baixo.
