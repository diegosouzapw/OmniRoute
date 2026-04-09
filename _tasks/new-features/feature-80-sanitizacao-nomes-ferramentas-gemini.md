# Feature 79 — Sanitização de Nomes de Ferramentas para Gemini

**Fonte:** Análise do repositório `kaitranntt/ccs` — módulo `src/cliproxy/tool-sanitization-proxy.ts`
**Prioridade:** 🟡 P1 — Impacto direto na compatibilidade
**Complexidade:** Média (novo middleware + testes)

---

## Motivação

O Google Gemini impõe um **limite rígido de 64 caracteres** nos nomes de ferramentas (tools) enviados na API. Quando clientes como Claude Code ou Cursor usam MCP (Model Context Protocol), os nomes de ferramentas podem facilmente exceder esse limite, especialmente com prefixos de namespace (ex: `mcp__filesystem__read_multiple_files_with_validation`).

Além disso, o Gemini **rejeita propriedades JSON Schema não-padrão** no campo `input_schema` das ferramentas, como `x-`, `examples`, ou `$schema`.

Sem essa sanitização, qualquer request que passe por um provider Gemini com ferramentas MCP complexas **falha silenciosamente** ou retorna erro 400.

---

## O Que Ganhamos

1. **Compatibilidade total Gemini ↔ MCP** — ferramentas com nomes longos funcionam transparentemente
2. **Zero quebra no cliente** — o proxy mapeia nomes truncados de volta aos originais nas respostas
3. **Suporte a streaming SSE** — restauração funciona tanto em respostas buffered quanto streaming
4. **Proteção contra crash** — quando o upstream Gemini retorna conteúdo vazio, um response sintético é injetado para evitar "No assistant message found" no Claude Code

---

## Situação Atual (Antes)

```
Cliente → OmniRoute → Gemini API
         ❌ Gemini rejeita tool name com 80+ chars
         ❌ Gemini rejeita propriedades JSON Schema custom
         ❌ Sem tratamento, request falha com erro 400
```

**Comportamento atual:** OmniRoute passa os nomes de ferramentas inalterados para o Gemini. Se um MCP server registrar ferramentas com nomes longos (> 64 chars), toda a request falha.

---

## Situação Desejada (Depois)

```
Cliente → OmniRoute [Tool Sanitization Middleware] → Gemini API
         ✅ Nomes truncados para ≤ 64 chars com hash para unicidade
         ✅ Schema sanitizado (removidas props não-padrão)
         ✅ Nomes originais restaurados na resposta (bidrecional)
         ✅ Streaming SSE processado evento-a-evento
```

---

## Implementação Detalhada

### 1. Novo Módulo: `src/sse/middleware/toolSanitizer.js`

**Responsabilidades:**

- Interceptar requests que contenham `tools[]` no body
- Verificar se algum `tools[].name` excede 64 caracteres
- Truncar nome preservando legibilidade: `{primeiros 55 chars}_{hash 8 chars}`
- Manter mapa bidirecional `sanitizedName ↔ originalName` por request
- Restaurar nomes originais em responses que contenham `tool_use` blocks

**Algoritmo de Truncamento (do CCS):**

```javascript
function sanitizeName(original) {
  const MAX_LEN = 64;
  if (original.length <= MAX_LEN) return original;

  // Hash dos últimos chars para unicidade
  const hash = createHash("sha256").update(original).digest("hex").slice(0, 8);

  // Preserva o máximo do nome original
  const prefix = original.slice(0, MAX_LEN - 1 - hash.length); // -1 para o underscore
  return `${prefix}_${hash}`;
}
```

**Schema Sanitization:**

```javascript
const GEMINI_UNSUPPORTED_PROPS = new Set([
  "$schema",
  "examples",
  "x-",
  "$ref",
  "$defs",
  "additionalItems",
  "const",
]);

function sanitizeSchema(schema) {
  if (!schema || typeof schema !== "object") return schema;

  const cleaned = {};
  for (const [key, value] of Object.entries(schema)) {
    if (GEMINI_UNSUPPORTED_PROPS.has(key)) continue;
    if (key.startsWith("x-")) continue;

    if (typeof value === "object" && !Array.isArray(value)) {
      cleaned[key] = sanitizeSchema(value);
    } else if (key === "properties" && typeof value === "object") {
      cleaned[key] = {};
      for (const [propKey, propVal] of Object.entries(value)) {
        cleaned[key][propKey] = sanitizeSchema(propVal);
      }
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}
```

### 2. Integração no Pipeline SSE

**Onde inserir:** No handler de chat (`src/sse/handlers/chat.js`) **antes** de enviar para o executor, apenas quando o provider alvo é Gemini.

```javascript
// Em chat.js, antes do executor:
if (provider.format === "gemini" || provider.format === "gemini-cli") {
  const { sanitizedBody, nameMapper } = sanitizeTools(requestBody);
  requestBody = sanitizedBody;
  // Guardar nameMapper para restaurar na resposta
}
```

### 3. Restauração em Responses (SSE Streaming)

Para responses streaming, processar cada evento SSE individualmente:

```javascript
function restoreToolNames(sseEvent, nameMapper) {
  if (!nameMapper.hasChanges()) return sseEvent;

  // Processar eventos content_block_start com tool_use
  if (event.type === "content_block_start" && event.content_block?.type === "tool_use") {
    event.content_block.name = nameMapper.restore(event.content_block.name);
  }
  return event;
}
```

### 4. Detecção de Colisões

Quando duas ferramentas diferentes geram o mesmo nome sanitizado, logar warning:

```javascript
if (nameMapper.hasCollisions()) {
  for (const collision of nameMapper.getCollisions()) {
    logger.warn(
      `[tool-sanitizer] Hash collision: ${collision.originals.join(", ")} → "${collision.sanitized}"`
    );
  }
}
```

---

## Arquivos a Criar/Modificar

| Ação          | Arquivo                                 | Descrição                                     |
| ------------- | --------------------------------------- | --------------------------------------------- |
| **CRIAR**     | `src/sse/middleware/toolSanitizer.js`   | Módulo principal de sanitização               |
| **CRIAR**     | `src/sse/middleware/schemaSanitizer.js` | Limpeza de JSON Schema                        |
| **MODIFICAR** | `src/sse/handlers/chat.js`              | Inserir middleware antes do envio para Gemini |
| **MODIFICAR** | `open-sse/utils/proxyFetch.js`          | Adicionar hook de restauração para streaming  |
| **CRIAR**     | `tests/unit/tool-sanitizer.test.mjs`    | Testes unitários                              |

---

## Testes Necessários

1. Nome com 60 chars → não altera (passthrough)
2. Nome com 80 chars → trunca para exatamente 64 chars
3. Dois nomes diferentes → geram hashes diferentes (sem colisão)
4. Schema com `$schema` e `x-custom` → propriedades removidas
5. Response com `tool_use` → nome original restaurado
6. SSE streaming → restauração evento-a-evento funciona
7. Sem ferramentas no body → bypass total (zero overhead)

---

## Referência do CCS

- [tool-sanitization-proxy.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/tool-sanitization-proxy.ts) — 660 linhas, proxy HTTP completo
- [tool-name-mapper.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/tool-name-mapper.ts) — mapeamento bidirecional
- [schema-sanitizer.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/schema-sanitizer.ts) — limpeza de JSON Schema
