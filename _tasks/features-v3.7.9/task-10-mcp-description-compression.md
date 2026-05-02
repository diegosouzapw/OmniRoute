# Task 10 — Compress MCP Tool Descriptions in Server Responses

> **Priority**: P2 | **Effort**: 90 min | **Dependencies**: Task 08 | **Branch**: `release/v3.7.9`

---

## Problem

OmniRoute serves as an MCP server with **29 tools**, each having verbose `description` fields that are injected into the model's context every time `tools/list` is called. The original `caveman-shrink` is a dedicated stdio proxy that intercepts MCP responses and compresses description fields — saving tokens on every tool listing request.

Since OmniRoute IS the MCP server, we can compress our own tool descriptions **at response time** without needing a separate proxy. This is more efficient and eliminates an extra process.

---

## Solution

Create a compression middleware that intercepts MCP `tools/list`, `prompts/list`, and `resources/list` responses and compresses `description` fields in-place, using the same protection + compression logic from our preservation + caveman rules pipeline.

## Design

```
Client → tools/list request → MCP server → response with tool[] →
  → compressToolDescriptions() → compressed response → Client
```

The compression function:
1. Walks the response payload looking for `description` string fields
2. For each description, applies protected pattern extraction (code, URLs, identifiers)
3. Applies article + filler + pleasantries + leader removal
4. Restores protected patterns
5. Replaces the description in-place

This is functionally equivalent to `caveman-shrink/compress.js::compress()` but in TypeScript and integrated directly.

## File: New `open-sse/mcp-server/descriptionCompressor.ts`

```typescript
/**
 * MCP Tool Description Compressor
 *
 * Compresses prose in MCP tool/prompt/resource descriptions to reduce
 * model context size. Preserves code, URLs, identifiers, and version numbers.
 *
 * Ref: caveman-shrink/compress.js
 */

import { extractPreservedBlocks, restorePreservedBlocks } from "../services/compression/preservation.ts";
import { applyRulesToText } from "../services/compression/caveman.ts";
import { getRulesForContext } from "../services/compression/cavemanRules.ts";

const ARTICLES_RE = /\b(?:a|an|the)\s+(?=[a-z])/gi;
const LEADERS_RE = /^(?:i'?ll|i will|i can|you can|we will|we can|let me|let'?s)\s+/gim;
const FILLERS_RE = /\b(?:just|really|basically|actually|simply|quite|very|essentially|literally)\b/gi;
const PLEASANTRIES_RE = /\b(?:please|kindly|sure|certainly|of course|happy to)\b[,.]?\s*/gi;

export function compressDescription(text: string): string {
  if (!text || typeof text !== "string" || text.length < 20) return text;

  const { text: extracted, blocks } = extractPreservedBlocks(text);

  let compressed = extracted;
  compressed = compressed.replace(LEADERS_RE, "");
  compressed = compressed.replace(PLEASANTRIES_RE, "");
  compressed = compressed.replace(FILLERS_RE, "");
  compressed = compressed.replace(ARTICLES_RE, "");

  // Cleanup
  compressed = compressed.replace(/[ \t]{2,}/g, " ");
  compressed = compressed.replace(/\s+([,.;:!?])/g, "$1");
  compressed = compressed.replace(/\n{3,}/g, "\n\n");
  compressed = compressed.replace(/(^|[.!?]\s+)([a-z])/gm, (_, pre, ch) => pre + ch.toUpperCase());
  compressed = compressed.trim();

  return restorePreservedBlocks(compressed, blocks);
}

export function compressDescriptionsInPayload(
  payload: unknown,
  fields: string[] = ["description"]
): void {
  const fieldSet = new Set(fields);
  if (!payload || typeof payload !== "object") return;

  if (Array.isArray(payload)) {
    for (const item of payload) compressDescriptionsInPayload(item, fields);
    return;
  }

  const obj = payload as Record<string, unknown>;
  for (const [key, val] of Object.entries(obj)) {
    if (fieldSet.has(key) && typeof val === "string") {
      obj[key] = compressDescription(val);
    } else if (val && typeof val === "object") {
      compressDescriptionsInPayload(val, fields);
    }
  }
}
```

## Integration: `open-sse/mcp-server/server.ts`

After the MCP server builds its tools/list response, call `compressDescriptionsInPayload()` on the result before returning. The exact integration point depends on the MCP server framework, but conceptually:

```typescript
import { compressDescriptionsInPayload } from "./descriptionCompressor.ts";

// In the tools/list handler or response middleware:
const response = buildToolsListResponse();
compressDescriptionsInPayload(response.result);
return response;
```

## Tests: `tests/unit/compression/mcp-description-compressor.test.ts`

```typescript
import { describe, it } from "node:test";
import assert from "node:assert";
import { compressDescription, compressDescriptionsInPayload } from
  "../../../open-sse/mcp-server/descriptionCompressor.ts";

describe("compressDescription", () => {
  it("should remove articles and filler from description", () => {
    const desc = "I'll get the current health status of the proxy server and return a summary.";
    const result = compressDescription(desc);
    assert(!result.includes("I'll"));
    assert(!result.includes("the current"));
    assert(result.length < desc.length);
  });

  it("should preserve inline code in descriptions", () => {
    const desc = "Use the `get_health` tool to check the server status.";
    const result = compressDescription(desc);
    assert(result.includes("`get_health`"));
  });

  it("should preserve URLs", () => {
    const desc = "Fetches data from https://api.example.com/v1/health endpoint.";
    const result = compressDescription(desc);
    assert(result.includes("https://api.example.com/v1/health"));
  });

  it("should skip very short descriptions", () => {
    assert.strictEqual(compressDescription("Health check"), "Health check");
  });
});

describe("compressDescriptionsInPayload", () => {
  it("should compress description fields in tools array", () => {
    const payload = {
      tools: [
        { name: "get_health", description: "I'll get the current health status of the proxy." },
        { name: "list_combos", description: "This tool will list all the available combos." },
      ],
    };
    compressDescriptionsInPayload(payload);
    assert(!payload.tools[0].description.includes("I'll"));
    assert(!payload.tools[1].description.includes("This tool will"));
  });

  it("should handle nested descriptions", () => {
    const payload = {
      tools: [{ name: "test", inputSchema: { properties: { arg: { description: "The argument value to use" } } } }],
    };
    compressDescriptionsInPayload(payload);
    assert(!payload.tools[0].inputSchema.properties.arg.description.includes("The "));
  });
});
```

## Verification

```bash
node --import tsx/esm --test tests/unit/compression/mcp-description-compressor.test.ts
```

## Commit

```
feat(compression): compress MCP tool descriptions in server responses

Ports caveman-shrink's description compression to OmniRoute's MCP
server. Removes articles, filler, pleasantries, and leaders from tool
descriptions while preserving code, URLs, and identifiers. Applied at
response time for tools/list, prompts/list, resources/list.

Ref: caveman-shrink index.js + compress.js
```

## Rollback

Remove `descriptionCompressor.ts` and its call site in `server.ts`.

## 2026-05-02 Expansion Addendum

Align this task with upstream `caveman-shrink` v1 behavior:

- Compress only MCP list metadata: `tools`, `prompts`, `resources`, and `resourceTemplates`.
- Do not compress tool-call response bodies or request payloads.
- Add a kill switch (`OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` or DB setting) so admins can
  disable description shrinking for debugging/client compatibility.
- Record description-compression savings separately from prompt compression when Task 20 lands.
- Keep nested schema `description` compression conservative; avoid double-processing top-level
  tool descriptions and nested parameter descriptions.
