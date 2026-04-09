# 08 — Kimi K2.5 via Moonshot API Direta

> **Prioridade**: 🟡 Média-Alta  
> **Provider existente**: `kimi` (API Key), `nvidia` (free tier kimi-k2.5)  
> **Impacto**: Acesso direto ao Kimi K2.5 via Moonshot para melhor latência e limites

---

## Contexto e Motivação

O ClawRouter usa `moonshot/kimi-k2.5` via endpoint direto com preços de $0.60/$3.00/M.
Nosso OmniRoute tem:
1. `kimi` provider (API Key) com apenas `kimi-latest` ($1.00/$4.00/M) — genérico
2. `nvidia` provider com `moonshotai/kimi-k2.5` (grátis como dev access)

O acesso direto ao Kimi K2.5 via API Moonshot (api.moonshot.cn ou console.moonshot.cn)
oferece:
- Preço mais baixo: $0.60/$3.00 vs $1.00/$4.00 atual
- Context window: **262.144 tokens** (muito maior)
- Capabilities: reasoning, vision, agentic, toolCalling
- Acesso sem limite de rate do free tier NVIDIA

---

## Specs do Kimi K2.5 (via ClawRouter)

| Atributo | Valor |
|----------|-------|
| Model ID | `kimi-k2.5` ou `moonshot-kimi-k2.5` |
| Input Price | $0.60/M tokens |
| Output Price | $3.00/M tokens |
| Context Window | 262.144 tokens |
| Max Output | 8.192 tokens |
| Reasoning | ✅ |
| Vision | ✅ |
| Agentic | ✅ |
| Tool Calling | ✅ |

---

## Investigação Necessária

### 1. Verificar endpoint Moonshot API

Acessar [https://platform.moonshot.cn/docs/api](https://platform.moonshot.cn/docs/api)  
ou [https://api.moonshot.cn/v1](https://api.moonshot.cn/v1) para documantação do endpoint.

Testar conectividade:
```bash
curl https://api.moonshot.cn/v1/models \
  -H "Authorization: Bearer <moonshot-api-key>"
```

Se retornar lista de modelos incluindo `kimi-k2.5`, o endpoint está correto.

### 2. Verificar ID do modelo

O endpoint Moonshot pode usar IDs diferentes:
- `kimi-k2.5` (sem prefixo)
- `moonshot-v1-8k` (formato antigo)
- `kimi-k2.5-preview`

Testar:
```bash
curl -X POST https://api.moonshot.cn/v1/chat/completions \
  -H "Authorization: Bearer <moonshot-key>" \
  -d '{"model": "kimi-k2.5", "messages": [{"role": "user", "content": "test"}]}'
```

### 3. Verificar se provider `kimi` atual aponta para Moonshot

Verificar o executor do provider `kimi` — deve ter o `baseUrl` apontado para `api.moonshot.cn`.
Se estiver apontando para outro endpoint, precisará criar uma rota para o endpoint correto.

---

## Arquivos a Modificar

```
src/shared/constants/pricing.ts          ← atualizar seção kimi com kimi-k2.5
open-sse/executors/kimi.ts              ← verificar baseUrl e verificar se existe
open-sse/services/providerRegistry.ts   ← registrar kimi-k2.5 com specs corretas
```

---

## Passo 1: Atualizar `pricing.ts` — Seção `kimi`

```typescript
// Seção kimi (API Key do Moonshot):
kimi: {
  // Existente (manter para backcompat):
  "kimi-latest": {
    input: 1.0,
    output: 4.0,
    cached: 0.5,
    reasoning: 6.0,
    cache_creation: 1.0,
  },

  // NOVO — Kimi K2.5 com preço direto Moonshot (mais barato):
  "kimi-k2.5": {
    input: 0.60,
    output: 3.00,
    cached: 0.30,   // ~50% do input (padrão Moonshot)
    reasoning: 4.50, // 1.5x output para reasoning tokens
    cache_creation: 0.60,
  },

  // Alias com prefixo para compatibilidade:
  "moonshot-kimi-k2.5": {
    input: 0.60,
    output: 3.00,
    cached: 0.30,
    reasoning: 4.50,
    cache_creation: 0.60,
  },
},
```

---

## Passo 2: Verificar/Criar Executor Kimi

Verificar se existe `open-sse/executors/kimi.ts`. Se não existir, o provider kimi pode
estar usando um executor genérico OpenAI-compatible. Confirmar:

```typescript
// Se executors/kimi.ts não existir ou não tiver baseUrl de Moonshot, criar:
import { BaseExecutor } from "./base.ts";

export class KimiExecutor extends BaseExecutor {
  constructor() {
    super("kimi", {
      id: "kimi",
      // Endpoint oficial da Moonshot AI:
      baseUrl: "https://api.moonshot.cn/v1/chat/completions",
      // Alternativo — se acima não funcionar:
      // baseUrl: "https://api.kimi.moonshot.cn/v1/chat/completions",
    });
  }

  // Kimi usa Authorization: Bearer <key> igual ao OpenAI
  // Provavelmente não precisa de transformRequest
}
```

Registrar em `open-sse/executors/index.ts`:
```typescript
import { KimiExecutor } from "./kimi.ts";
// No mapa de executors:
"kimi": new KimiExecutor(),
```

---

## Passo 3: Registrar no Provider Registry

```typescript
{
  id: "kimi-k2.5",
  name: "Kimi K2.5",
  description: "Kimi flagship. 262k context, agentic, vision, reasoning. $0.60/$3.00/M via Moonshot API.",
  contextWindow: 262144,
  maxOutput: 8192,
  capabilities: ["chat", "tools", "reasoning", "vision"],
  pricing: { input: 0.60, output: 3.00 },
  tags: ["reasoning", "agentic", "vision", "tools", "large-context"],
},
```

---

## Distinção entre Kimi gratuito (NVIDIA) e Pago (Moonshot)

O nosso NVIDIA provider já tem `moonshotai/kimi-k2.5` como modelo gratuito.
É importante deixar claro na UI qual é qual:

- **nvidia provider**: `moonshotai/kimi-k2.5` — **gratuito** (com limites de rate severos)
- **kimi provider**: `kimi-k2.5` — **pago** ($0.60/$3.00, sem rate limits)

Verificar se no dashboard existe alguma indicação disso, ou se o providerRegistry tem
um campo para marcar modelos free vs paid.

---

## Testes de Validação

### Teste 1: Conectividade com Moonshot
```bash
curl https://api.moonshot.cn/v1/models \
  -H "Authorization: Bearer <kimi-api-key>"
```
Esperado: lista de modelos disponíveis.

### Teste 2: Chat com Kimi K2.5
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <kimi-api-key>" \
  -d '{
    "model": "kimi-k2.5",
    "messages": [{"role": "user", "content": "Explain quantum entanglement in simple terms."}],
    "stream": false
  }'
```

### Teste 3: Tool calling com K2.5
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <kimi-api-key>" \
  -d '{
    "model": "kimi-k2.5",
    "messages": [{"role": "user", "content": "Search for today price of Bitcoin"}],
    "tools": [{"type": "function", "function": {"name": "web_search", "parameters": {"type": "object", "properties": {"query": {"type": "string"}}}}}]
  }'
```

---

## Referências

- [Moonshot AI Platform](https://platform.moonshot.cn)
- [ClawRouter models.ts - Kimi K2.5](https://github.com/BlockRunAI/ClawRouter/blob/main/src/models.ts)
- ClawRouter commit: `fix: restore quality models as auto primary` (0.12.47) — Kimi K2.5 como MEDIUM primary

---

## Rollback

Remover entradas em `pricing.ts`. Se criou executor novo, remover `executors/kimi.ts`.
