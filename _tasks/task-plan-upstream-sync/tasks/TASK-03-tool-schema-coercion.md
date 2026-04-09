# TASK-03 — Coerção de Tipos em JSON Schema de Tools (string→integer)

**Prioridade:** 🔴 CRÍTICA  
**Origem:** PR upstream `decolua/9router#422`  
**Branch:** `fix/task-03-tool-schema-coercion`  
**Commit msg:** `fix: coerce string numeric JSON Schema constraints to integers in tool translation`

---

## Problema

Alguns clientes (especialmente Cursor, Cline, e outros IDEs) enviam JSON Schema de ferramentas com valores numéricos em formato string ao invés de inteiro. Por exemplo:

```json
{
  "type": "object",
  "properties": {
    "count": {
      "type": "integer",
      "minimum": "1",
      "maximum": "100"
    },
    "items": {
      "type": "array",
      "minItems": "2",
      "maxItems": "10"
    }
  }
}
```

Quando esse schema chega ao provider (Claude, OpenAI), a validação estrita do JSON Schema rejeita o request com erro **400 Bad Request** porque `minimum`, `maximum`, `minItems`, `maxItems` etc. devem ser numéricos (`integer` ou `number`), não strings.

O OmniRoute atualmente **não sanitiza** esses valores — faz passthrough direto.

---

## Solução

Criar uma função de sanitização recursiva que percorre o JSON Schema de cada ferramenta e converte campos numéricos de string para integer quando possível. A sanitização deve ocorrer **antes** de enviar ao provider, no pipeline de tradução.

---

## Campos Alvos (JSON Schema spec)

Os seguintes campos devem ser coercidos de string→number se forem strings numéricas válidas:

| Campo | Tipo esperado | Exemplo inválido | Correção |
|-------|--------------|-------------------|----------|
| `minimum` | number | `"1"` | `1` |
| `maximum` | number | `"100"` | `100` |
| `exclusiveMinimum` | number | `"0"` | `0` |
| `exclusiveMaximum` | number | `"101"` | `101` |
| `minLength` | integer | `"2"` | `2` |
| `maxLength` | integer | `"255"` | `255` |
| `minItems` | integer | `"1"` | `1` |
| `maxItems` | integer | `"50"` | `50` |
| `minProperties` | integer | `"1"` | `1` |
| `maxProperties` | integer | `"20"` | `20` |
| `multipleOf` | number | `"5"` | `5` |

---

## Arquivos a Modificar/Criar

### 1. CRIAR: `open-sse/translator/helpers/schemaCoercion.ts`

Arquivo novo com a função de sanitização:

```typescript
/**
 * Coerce string-encoded numeric JSON Schema constraints to their proper types.
 * Some clients (Cursor, Cline, etc.) send e.g. "minimum": "1" instead of "minimum": 1,
 * which causes 400 errors on strict providers like Claude and OpenAI.
 */

const NUMERIC_SCHEMA_FIELDS = [
  "minimum", "maximum",
  "exclusiveMinimum", "exclusiveMaximum",
  "minLength", "maxLength",
  "minItems", "maxItems",
  "minProperties", "maxProperties",
  "multipleOf",
] as const;

export function coerceSchemaNumericFields(schema: any): any {
  if (!schema || typeof schema !== "object") return schema;
  if (Array.isArray(schema)) return schema.map(coerceSchemaNumericFields);

  const result = { ...schema };

  for (const field of NUMERIC_SCHEMA_FIELDS) {
    if (field in result && typeof result[field] === "string") {
      const num = Number(result[field]);
      if (!isNaN(num) && isFinite(num)) {
        result[field] = num;
      }
    }
  }

  // Recurse into nested schema structures
  if (result.properties && typeof result.properties === "object") {
    result.properties = Object.fromEntries(
      Object.entries(result.properties).map(([key, val]) => [
        key,
        coerceSchemaNumericFields(val),
      ])
    );
  }
  if (result.items) {
    result.items = coerceSchemaNumericFields(result.items);
  }
  if (result.additionalProperties && typeof result.additionalProperties === "object") {
    result.additionalProperties = coerceSchemaNumericFields(result.additionalProperties);
  }
  if (Array.isArray(result.anyOf)) {
    result.anyOf = result.anyOf.map(coerceSchemaNumericFields);
  }
  if (Array.isArray(result.oneOf)) {
    result.oneOf = result.oneOf.map(coerceSchemaNumericFields);
  }
  if (Array.isArray(result.allOf)) {
    result.allOf = result.allOf.map(coerceSchemaNumericFields);
  }
  if (result.not && typeof result.not === "object") {
    result.not = coerceSchemaNumericFields(result.not);
  }

  return result;
}

/**
 * Apply schema coercion to all tools in a request body.
 * Handles both OpenAI format (function.parameters) and Claude format (input_schema).
 */
export function coerceToolSchemas(tools: any[]): any[] {
  if (!Array.isArray(tools)) return tools;

  return tools.map((tool) => {
    if (!tool || typeof tool !== "object") return tool;

    const result = { ...tool };

    // OpenAI format: tool.function.parameters
    if (result.function?.parameters) {
      result.function = {
        ...result.function,
        parameters: coerceSchemaNumericFields(result.function.parameters),
      };
    }

    // Claude format: tool.input_schema
    if (result.input_schema) {
      result.input_schema = coerceSchemaNumericFields(result.input_schema);
    }

    // Direct parameters (some formats)
    if (result.parameters && !result.function) {
      result.parameters = coerceSchemaNumericFields(result.parameters);
    }

    return result;
  });
}
```

---

### 2. MODIFICAR: `open-sse/translator/index.ts`

Localizar a função `translateRequest` e adicionar a chamada de coerção **após** ter o body traduzido, **antes** de retornar:

```typescript
import { coerceToolSchemas } from "./helpers/schemaCoercion.ts";

// No final de translateRequest, antes do return:
if (translated.tools) {
  translated.tools = coerceToolSchemas(translated.tools);
}
```

**ATENÇÃO:** Verificar se `translateRequest` já faz alguma sanitização de tools. Se sim, adicionar a coerção na mesma location.

---

### 3. CRIAR: `tests/unit/schema-coercion.test.mjs`

Testes unitários para a função de coerção:

```javascript
import test from "node:test";
import assert from "node:assert/strict";

const { coerceSchemaNumericFields, coerceToolSchemas } = await import(
  "../../open-sse/translator/helpers/schemaCoercion.ts"
);

test("coerceSchemaNumericFields converts string numbers to integers", () => {
  const schema = {
    type: "object",
    properties: {
      count: { type: "integer", minimum: "1", maximum: "100" },
    },
  };
  const result = coerceSchemaNumericFields(schema);
  assert.equal(result.properties.count.minimum, 1);
  assert.equal(result.properties.count.maximum, 100);
  assert.equal(typeof result.properties.count.minimum, "number");
});

test("coerceSchemaNumericFields handles nested schemas", () => {
  const schema = {
    type: "array",
    items: { type: "string", minLength: "2", maxLength: "255" },
    minItems: "1",
    maxItems: "50",
  };
  const result = coerceSchemaNumericFields(schema);
  assert.equal(result.minItems, 1);
  assert.equal(result.maxItems, 50);
  assert.equal(result.items.minLength, 2);
  assert.equal(result.items.maxLength, 255);
});

test("coerceSchemaNumericFields ignores non-numeric strings", () => {
  const schema = { type: "string", minimum: "abc" };
  const result = coerceSchemaNumericFields(schema);
  assert.equal(result.minimum, "abc"); // kept as-is (NaN guard)
});

test("coerceSchemaNumericFields preserves already-numeric fields", () => {
  const schema = { minimum: 5, maximum: 10 };
  const result = coerceSchemaNumericFields(schema);
  assert.equal(result.minimum, 5);
  assert.equal(result.maximum, 10);
});

test("coerceToolSchemas handles OpenAI format", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "test",
        parameters: {
          type: "object",
          properties: { n: { type: "integer", minimum: "1" } },
        },
      },
    },
  ];
  const result = coerceToolSchemas(tools);
  assert.equal(result[0].function.parameters.properties.n.minimum, 1);
});

test("coerceToolSchemas handles Claude format", () => {
  const tools = [
    {
      name: "test",
      input_schema: {
        type: "object",
        properties: { n: { type: "integer", minimum: "1" } },
      },
    },
  ];
  const result = coerceToolSchemas(tools);
  assert.equal(result[0].input_schema.properties.n.minimum, 1);
});
```

---

## Validação

1. **Build:** `npm run build`
2. **Testes unitários:** `npm run test:unit` — deve incluir os novos 6+ testes
3. **Todos os 939+ testes existentes** devem continuar passando

---

## Riscos

- **Baixo risco:** A coerção é conservadora — só converte strings que são numéricas válidas
- **Performance:** Negligível — recursão em schemas JSON que raramente têm mais de 3-4 níveis
