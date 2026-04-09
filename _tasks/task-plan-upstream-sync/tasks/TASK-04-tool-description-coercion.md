# TASK-04 — Coerção de `tool.description` para String

**Prioridade:** 🟡 IMPORTANTE  
**Origem:** PR upstream `decolua/9router#421`  
**Branch:** `fix/task-04-tool-description-coercion`  
**Commit msg:** `fix: coerce tool description to string in all translation paths`

---

## Problema

Em alguns cenários, clientes enviam ferramentas com `description` como valor não-string:

```json
{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": null,
    "parameters": { "type": "object", "properties": {} }
  }
}
```

Ou até mesmo:
```json
{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": 42,
    "parameters": { "type": "object", "properties": {} }
  }
}
```

Quando o OmniRoute traduz isso para o formato Claude (`input_schema`), a Anthropic API rejeita `description` do tipo `null` ou `number` com erro 400. Da mesma forma, ao traduzir de volta para OpenAI, `description: null` nem sempre é aceito.

---

## Solução

Adicionar sanitização defensiva no pipeline de tradução que converte:
- `null` → `""` (string vazia)
- `undefined` → campo omitido (sem mudança)
- `number` → `String(value)`
- Qualquer outro tipo não-string → `String(value)`

A sanitização deve ser aplicada em **todos** os caminhos de tradução de tools.

---

## Arquivos a Modificar

### 1. MODIFICAR: `open-sse/translator/helpers/schemaCoercion.ts`

Adicionar a este arquivo (criado na TASK-03) uma função para sanitizar descriptions:

```typescript
/**
 * Ensure tool.description is always a string.
 * Some clients send null, undefined, or numeric descriptions.
 */
export function sanitizeToolDescription(tool: any): any {
  if (!tool || typeof tool !== "object") return tool;

  const result = { ...tool };

  // OpenAI format: tool.function.description
  if (result.function && result.function.description !== undefined) {
    if (result.function.description === null) {
      result.function = { ...result.function, description: "" };
    } else if (typeof result.function.description !== "string") {
      result.function = { ...result.function, description: String(result.function.description) };
    }
  }

  // Claude format: tool.description (direct)
  if ("description" in result && !result.function) {
    if (result.description === null) {
      result.description = "";
    } else if (typeof result.description !== "string") {
      result.description = String(result.description);
    }
  }

  return result;
}

/**
 * Apply description sanitization to all tools in a request body.
 */
export function sanitizeToolDescriptions(tools: any[]): any[] {
  if (!Array.isArray(tools)) return tools;
  return tools.map(sanitizeToolDescription);
}
```

---

### 2. MODIFICAR: `open-sse/translator/index.ts`

Na mesma location onde a coerção de schemas (TASK-03) é aplicada, adicionar também a sanitização de descriptions:

```typescript
import { coerceToolSchemas, sanitizeToolDescriptions } from "./helpers/schemaCoercion.ts";

// No final de translateRequest, antes do return:
if (translated.tools) {
  translated.tools = coerceToolSchemas(translated.tools);
  translated.tools = sanitizeToolDescriptions(translated.tools);
}
```

---

### 3. ADICIONAR em: `tests/unit/schema-coercion.test.mjs`

Adicionar testes para description sanitization ao arquivo criado na TASK-03:

```javascript
test("sanitizeToolDescription converts null to empty string (OpenAI format)", () => {
  const tool = {
    type: "function",
    function: { name: "test", description: null, parameters: {} },
  };
  const result = sanitizeToolDescription(tool);
  assert.equal(result.function.description, "");
});

test("sanitizeToolDescription converts number to string (OpenAI format)", () => {
  const tool = {
    type: "function",
    function: { name: "test", description: 42, parameters: {} },
  };
  const result = sanitizeToolDescription(tool);
  assert.equal(result.function.description, "42");
});

test("sanitizeToolDescription handles Claude format", () => {
  const tool = { name: "test", description: null, input_schema: {} };
  const result = sanitizeToolDescription(tool);
  assert.equal(result.description, "");
});

test("sanitizeToolDescription preserves valid string descriptions", () => {
  const tool = {
    type: "function",
    function: { name: "test", description: "A useful tool", parameters: {} },
  };
  const result = sanitizeToolDescription(tool);
  assert.equal(result.function.description, "A useful tool");
});
```

---

## Dependência

- **Depende de TASK-03** — esta tarefa adiciona código ao arquivo `schemaCoercion.ts` criado na TASK-03
- Se executar TASK-04 antes de TASK-03, criar o arquivo `schemaCoercion.ts` primeiro

---

## Validação

1. **Build:** `npm run build`
2. **Testes unitários:** `npm run test:unit` — todos devem passar incluindo os novos 4+ testes
3. **Regressão:** Os 939+ testes existentes devem continuar sem falhas

---

## Riscos

- **Nenhum breaking change:** A coerção é puramente defensiva
- **Edge case:** Se um cliente intencionalmente usa description como objeto JSON, `String()` vai gerar `"[object Object]"` — isso é aceitável como fallback defensivo
