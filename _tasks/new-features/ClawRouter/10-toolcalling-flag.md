# 10 — `toolCalling` Flag por Modelo: Routing Inteligente com Tools

> **Prioridade**: 🟡 Média  
> **Categoria**: Feature de infraestrutura de routing  
> **Impacto**: Evita que requests com tools sejam roteadas para modelos que não suportam tool calling estruturado

---

## Contexto e Motivação

O ClawRouter tem um campo `toolCalling: boolean` explícito em cada modelo:

```typescript
// ClawRouter models.ts:
{
  id: "nvidia/gpt-oss-120b",
  // toolCalling: AUSENTE (= false por default)
  // "Models without this flag output tool invocations as plain text JSON,
  //  which leaks raw {"command":"..."} into visible chat messages."
},
{
  id: "openai/gpt-5.4",
  toolCalling: true,  // ← suporta structured function calls
},
```

**O problema que isso resolve**: Quando o AutoCombo roteia um request que contém `tools[]`
para um modelo que não suporta tool calling nativo (ex: NVIDIA gpt-oss-120b, alguns modelos
DeepSeek livres), o modelo retorna o resultado como JSON puro no texto de resposta ao invés
de usar o formato `tool_calls` da API OpenAI. Isso quebra silenciosamente o agent flow.

---

## Proposta de Implementação

Adicionar metadado `supportsToolCalling: boolean` (ou `capabilities: string[]` com "tools")
no registry de modelos do OmniRoute, e usar esse dado para filtrar modelos durante o routing
automático quando a request contém `tools`.

---

## Arquivos a Modificar

```
src/shared/constants/models.ts            ← ou onde existir o registry de modelos
open-sse/services/autoCombo/index.ts      ← ou onde ocorre o scoring AutoCombo
open-sse/services/combo.ts               ← filtro de modelos compatíveis com tools
open-sse/handlers/chatCore.ts            ← detecção de requests com tools
```

---

## Passo 1: Definir Tipo de Metadado de Modelo

Verificar onde o registry de modelos do OmniRoute está (provavelmente em `providerRegistry.ts`
ou em `src/lib/db/models.ts`). Adicionar o campo:

```typescript
// No tipo que define um modelo no registry:
export interface ModelMetadata {
  id: string;
  name: string;
  description?: string;
  contextWindow: number;
  maxOutput?: number;
  pricing?: { input: number; output: number };
  
  // ← NOVO: capabilities do modelo
  capabilities: ModelCapability[];
  
  // Deprecated após migrar para capabilities[]:
  // supportsToolCalling?: boolean;
}

export type ModelCapability = 
  | "chat"           // chat básico (todos têm)
  | "tools"          // tool calling estruturado (OpenAI function calling format)
  | "vision"         // processamento de imagem
  | "reasoning"      // chain-of-thought / thinking
  | "agentic"        // otimizado para workflows multi-step
  | "embedding"      // somente embeddings
  | "streaming";     // suporte a SSE streaming
```

---

## Passo 2: Mapear Modelos com `tools` Capability

Com base nos dados do ClawRouter e conhecimento das APIs, mapear quais modelos suportam
tool calling estruturado:

```typescript
// Modelos QUE suportam tool calling nativo (capabilities: ["tools"]):
const TOOL_CAPABLE_MODELS = [
  // OpenAI
  "gpt-4o", "gpt-4o-mini", "gpt-4.1", "gpt-4.1-mini", "gpt-4.1-nano",
  "gpt-5.4", "gpt-5.4-pro", "gpt-5.3-codex", "gpt-5.2",
  "o1", "o3", "o1-mini", "o3-mini", "o4-mini",

  // Anthropic
  "claude-sonnet-4.6", "claude-opus-4.6", "claude-haiku-4.5",
  "claude-sonnet-4-5-20250929", "claude-haiku-4-5-20251001",

  // Google
  "gemini-3.1-pro", "gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.5-flash-lite",

  // xAI Grok-4
  "grok-4-fast-non-reasoning", "grok-4-fast-reasoning",
  "grok-4-1-fast-non-reasoning", "grok-4-1-fast-reasoning",
  "grok-3",

  // Outros
  "kimi-k2.5", "minimax-m2.5", "glm-5", "glm-5-turbo",
  "deepseek-chat",
];

// Modelos que NÃO suportam (ou incerto):
const NON_TOOL_MODELS = [
  "nvidia/gpt-oss-120b",    // free, sem structured tool calling
  "deepseek-reasoner",      // verificar — R1 pode ter limitações
  "glm-4.7",               // GLM 4.x pode não ter tool calling nativo
];
```

---

## Passo 3: Filtrar no AutoCombo / Routing

Localizar onde o AutoCombo decide qual modelo/provider usar. Adicionar filtro:

```typescript
// Em open-sse/services/autoCombo/index.ts ou similar:

function selectBestModel(
  candidates: ModelCandidate[],
  requestHasTools: boolean,
  requestHasVision: boolean
): ModelCandidate {
  let filtered = candidates;

  // Se o request tem tools, filtrar apenas modelos que suportam tool calling:
  if (requestHasTools) {
    const toolCapable = candidates.filter(c => 
      c.capabilities?.includes("tools") ?? false
    );
    
    if (toolCapable.length > 0) {
      filtered = toolCapable; // usar apenas os que suportam
    } else {
      // Nenhum modelo disponível com tool support — log warning
      console.warn("[AutoCombo] Nenhum modelo com suporte a tools disponível. " +
        "Request pode falhar ou retornar tool calls em formato incorreto.");
    }
  }

  // Se o request tem imagens, filtrar apenas modelos com vision:
  if (requestHasVision) {
    const visCapable = filtered.filter(c =>
      c.capabilities?.includes("vision") ?? false
    );
    if (visCapable.length > 0) filtered = visCapable;
  }

  // Ordenar por score (custo + latência + qualidade)
  return filtered.sort((a, b) => b.score - a.score)[0];
}
```

---

## Passo 4: Detectar `tools` no Request em `chatCore.ts`

```typescript
// Em open-sse/handlers/chatCore.ts, ao processar a request:
const requestBody = JSON.parse(rawBody);

// Detectar se request tem tools:
const requestHasTools = 
  Array.isArray(requestBody.tools) && requestBody.tools.length > 0 ||
  requestBody.tool_choice !== undefined ||
  requestBody.function_call !== undefined ||  // formato legado
  Array.isArray(requestBody.functions);       // formato legado

// Detectar se request tem imagens (vision):
const requestHasVision = requestBody.messages?.some((msg: any) =>
  Array.isArray(msg.content) && msg.content.some((c: any) =>
    c.type === "image_url" || c.type === "image"
  )
) ?? false;

// Passar para o autoCombo com os contextos:
const selectedModel = await autoCombo.selectModel({
  ...comboConfig,
  requestHasTools,
  requestHasVision,
  prompt: extractText(requestBody.messages),
});
```

---

## Passo 5: Logar no Dashboard

Quando o filtro de `toolCalling` descarta modelos durante o routing, registrar no log:

```typescript
// Ao fazer o filtering:
if (requestHasTools && removedModels.length > 0) {
  await logEvent({
    type: "routing_filter",
    reason: "tool_calling_filter",
    removedModels: removedModels.map(m => m.id),
    selectedModel: best.id,
    message: `${removedModels.length} modelos removidos por não suportarem tool calling`
  });
}
```

---

## Testes de Validação

### Teste 1: Request com tools → deve ir para modelo compatível
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -d '{
    "model": "auto",  // AutoCombo
    "messages": [{"role": "user", "content": "Get weather in São Paulo"}],
    "tools": [{"type": "function", "function": {"name": "get_weather", "parameters": {}}}]
  }'
```
Verificar nos logs que o modelo selecionado tem `capabilities: ["tools"]`.

### Teste 2: Request sem tools → pode ir para qualquer modelo
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "What is 2+2?"}]
  }'
```
O AutoCombo pode selecionar `nvidia/gpt-oss-120b` (barato/grátis) sem problema.

### Teste 3: Verificar que NVIDIA não é selecionado com tools
Com um combo que inclui NVIDIA como opção, fazer request com tools.
Verificar que `gpt-oss-120b` não aparece como modelo selecionado nos logs.

---

## Referências

- [ClawRouter models.ts - toolCalling flag](https://github.com/BlockRunAI/ClawRouter/blob/main/src/models.ts)
- ClawRouter comment: `"Models without this flag output tool invocations as plain text JSON, which leaks raw {"command":"..."} into visible chat messages. Default: false (must opt-in to prevent silent regressions on new models)."`

---

## Rollback

Feature é opt-in — remover a lógica de filtro em `selectBestModel()`. Os modelos continuam
funcionando normalmente, apenas o filtro automático é desabilitado.
