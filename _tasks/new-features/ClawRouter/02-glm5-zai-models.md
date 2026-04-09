# 02 — GLM-5 via Z.AI: Novo Provider com 128k Output

> **Prioridade**: 🔴 Alta  
> **Provider existente**: `glm` (já em `providers.ts` linha 67 com modelos glm-4.6/4.7)  
> **Impacto**: GLM-5 adicionado pelo ClawRouter em 2026-03-17 (hoje!). Destaque: **128k output tokens**

---

## Contexto e Motivação

O ClawRouter adicionou os modelos `zai/glm-5` e `zai/glm-5-turbo` em 17/03/2026 (hoje),
via dois commits consecutivos (0.12.55 e 0.12.56). O diferencial do GLM-5 é o seu
**maxOutput de 128.000 tokens** — um dos maiores output windows disponíveis — a um custo
moderado de $1.00/$3.20 por 1M tokens.

O Z.AI (anteriormente ZhipuAI) é a empresa por trás do GLM. Nosso provider `glm` atual
já aponta para o endpoint da BigModel (`open.bigmodel.cn`) com modelos GLM-4.6 e 4.7.
O GLM-5 deveria ser acessível pelo mesmo endpoint.

---

## Modelos a Adicionar

| Model ID | Nome | Input $/M | Output $/M | Context | Max Output | Tool Calling |
|----------|------|-----------|------------|---------|------------|--------------|
| `glm-5` | GLM-5 | $1.00 | $3.20 | 200000 | **128000** | ✅ |
| `glm-5-turbo` | GLM-5 Turbo | $1.20 | $4.00 | 200000 | **128000** | ✅ |

> Comparação: GLM-4.7 tem apenas 4096 output tokens. GLM-5 tem **128k** — muda completamente o uso-case.

---

## Investigação Necessária Antes da Implementação

### 1. Verificar o endpoint Z.AI para GLM-5

O endpoint atual para nosso provider `glm` é `https://open.bigmodel.cn/api/paas/v4/chat/completions`.
Verificar se GLM-5 usa o mesmo endpoint ou se há um novo endpoint Z.AI:

```bash
# Testar com a API key Z.AI/BigModel existente:
curl -X POST https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Authorization: Bearer <glm-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model": "glm-5", "messages": [{"role": "user", "content": "test"}]}'
```

Se retornar 404, checar se há um endoint alternativo como `https://api.z.ai/v1/`.

### 2. Verificar nomes exatos dos modelos

O ClawRouter usa `zai/glm-5` (com prefixo `zai/`). Testar se a API aceita:
- `glm-5` (sem prefixo)
- `GLM-5` (casing)
- `zai/glm-5` (com prefixo)

---

## Arquivos a Modificar

```
src/shared/constants/pricing.ts          ← adicionar GLM-5 na seção "glm"
open-sse/services/providerRegistry.ts   ← registrar os novos modelos
```

---

## Passo 1: Adicionar Preços em `pricing.ts`

Localizar a seção `glm` em `src/shared/constants/pricing.ts` (linha ~500):

```typescript
// GLM (glm)
glm: {
  // Modelos existentes GLM-4.x
  "glm-4.7": {
    input: 0.75,
    output: 3.0,
    cached: 0.375,
    reasoning: 4.5,
    cache_creation: 0.75,
  },
  "glm-4.6": {
    input: 0.5,
    output: 2.0,
    cached: 0.25,
    reasoning: 3.0,
    cache_creation: 0.5,
  },
  "glm-4.6v": {
    input: 0.75,
    output: 3.0,
    cached: 0.375,
    reasoning: 4.5,
    cache_creation: 0.75,
  },

  // ← NOVO: GLM-5 Family (Z.AI) — adicionado 2026-03-17
  // Destaque: maxOutput de 128k tokens — muito acima dos modelos GLM-4.x
  "glm-5": {
    input: 1.0,
    output: 3.2,
    cached: 0.5,
    reasoning: 4.8,   // output tokens em reasoning mode
    cache_creation: 1.0,
  },
  "glm-5-turbo": {
    input: 1.2,
    output: 4.0,
    cached: 0.6,
    reasoning: 6.0,
    cache_creation: 1.2,
  },
},
```

---

## Passo 2: Registrar no Provider Registry

Localizar onde os modelos do provider `glm` são declarados/catalogados.
Se existir um `providerRegistry.ts` ou similar, adicionar:

```typescript
// Na seção do provider glm:
{
  id: "glm-5",
  name: "GLM-5",
  description: "Novo flagship da Z.AI. Context 200k, output até 128k tokens — ideal para geração longa.",
  contextWindow: 200000,
  maxOutput: 128000,       // ← 128k output é o diferencial principal!
  capabilities: ["chat", "tools"],
  pricing: { input: 1.0, output: 3.2 },
  tags: ["large-output", "tools", "new"],
  releaseDate: "2026-03-17",
},
{
  id: "glm-5-turbo",
  name: "GLM-5 Turbo",
  description: "Versão turbo do GLM-5. Mais rápido, custo levemente maior. Mesmo output 128k.",
  contextWindow: 200000,
  maxOutput: 128000,
  capabilities: ["chat", "tools"],
  pricing: { input: 1.2, output: 4.0 },
  tags: ["large-output", "fast", "tools", "new"],
  releaseDate: "2026-03-17",
},
```

---

## Passo 3: Verificar o Executor GLM

Verificar se `open-sse/executors/` tem um `glm.ts`.
O executor do GLM deve ter algo como:

```typescript
export class GLMExecutor extends BaseExecutor {
  constructor() {
    super("glm", {
      id: "glm",
      baseUrl: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
      // Pode precisar adicionar endpoint Z.AI se GLM-5 for de lá
    });
  }
}
```

Se GLM-5 usar endpoint diferente, pode ser necessário:
1. Adicionar `baseUrls` com os dois endpoints (com fallback)
2. Ou criar um provider separado `zai` com o endpoint novo

---

## Passo 4: Caso Z.AI seja um Provider Separado

Se a investigação confirmar que GLM-5 está em um endpoint diferente (não `open.bigmodel.cn`),
criar um provider novo `zai` em `providers.ts`:

```typescript
// Em src/shared/constants/providers.ts, dentro de APIKEY_PROVIDERS:
zai: {
  id: "zai",
  alias: "zai",
  name: "Z.AI (GLM-5)",
  icon: "psychology",
  color: "#2563EB",
  textIcon: "ZA",
  website: "https://api.z.ai",
},
```

E criar executor `open-sse/executors/zai.ts`:

```typescript
import { BaseExecutor } from "./base.ts";

export class ZAIExecutor extends BaseExecutor {
  constructor() {
    super("zai", {
      id: "zai",
      baseUrl: "https://api.z.ai/v1/chat/completions", // ← confirmar URL exata
    });
  }
}
```

E registrar em `open-sse/executors/index.ts`:
```typescript
import { ZAIExecutor } from "./zai.ts";
// ...no mapa de executors:
"zai": new ZAIExecutor(),
```

---

## Testes de Validação

### Teste 1: Verificar maxOutput
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <glm-api-key>" \
  -d '{
    "model": "glm-5",
    "messages": [{"role": "user", "content": "Write a very long story about space exploration, at least 5 chapters."}],
    "max_tokens": 10000,
    "stream": false
  }'
```
Objetivo: confirmar que respostas longas (>4k tokens) são possíveis, ao contrário do GLM-4.7.

### Teste 2: Tool Calling
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <glm-api-key>" \
  -d '{
    "model": "glm-5",
    "messages": [{"role": "user", "content": "Calculate 42 * 17 using the calculator tool"}],
    "tools": [{"type": "function", "function": {"name": "calculate", "parameters": {"type": "object", "properties": {"expr": {"type": "string"}}, "required": ["expr"]}}}],
    "stream": false
  }'
```

### Teste 3: Preço no Analytics
Verificar após chamadas que o custo aparece como ~$1.00/M input.

---

## Referências

- [ClawRouter commit: feat: add zai/glm-5 and zai/glm-5-turbo](https://github.com/BlockRunAI/ClawRouter/commit/e5bafec998cc9ff80efe770d0b66ccfe05884f9d)
- [ClawRouter commit: feat: add zai/glm-5 and glm-5-turbo to model picker](https://github.com/BlockRunAI/ClawRouter/commit/c8857f3f9adf63947fde1a204b1546fa65d9be13)
- [Z.AI / ZhipuAI API](https://open.bigmodel.cn/dev/api)

---

## Rollback

Apenas remover as entradas adicionadas em `pricing.ts` e `providerRegistry.ts`.
Se criou um provider `zai` novo, remover também de `providers.ts` e o arquivo `executors/zai.ts`.
