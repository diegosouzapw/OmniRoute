import { test } from "node:test";
import assert from "node:assert/strict";

import { normalizeCodexTools } from "../../open-sse/executors/codex/tools.ts";
import { stripUnsupportedRegexPatterns } from "../../open-sse/translator/helpers/schemaCoercion.ts";

// Port of 9router#3922: the Codex backend rejects JSON Schema `pattern` values that
// use Unicode property escapes (`\p{...}` / `\P{...}`) with HTTP 400:
//   "Invalid schema for function 'Artifact': '^\\p{Cc}$' is not a 'regex'."
// Codex CLI / Claude Code inject such a tool (`Artifact`), so these patterns must be
// dropped before the schema reaches the upstream.

function artifactBody(pattern: string): Record<string, unknown> {
  return {
    tools: [
      {
        type: "function",
        name: "Artifact",
        parameters: {
          type: "object",
          properties: { artifactName: { type: "string", pattern } },
        },
      },
    ],
  };
}

function artifactNameSchema(body: Record<string, unknown>): Record<string, unknown> {
  const tools = body.tools as Array<Record<string, unknown>>;
  const parameters = tools[0].parameters as Record<string, unknown>;
  const properties = parameters.properties as Record<string, unknown>;
  return properties.artifactName as Record<string, unknown>;
}

test("normalizeCodexTools strips Unicode property escape \\p{...} patterns", () => {
  const body = artifactBody("^\\p{Cc}$");
  normalizeCodexTools(body);
  const schema = artifactNameSchema(body);
  assert.equal(schema.pattern, undefined, "\\p{...} pattern must not be forwarded upstream");
  assert.equal(schema.type, "string");
});

test("stripUnsupportedRegexPatterns strips negated \\P{...} escapes in nested schemas", () => {
  const result = stripUnsupportedRegexPatterns({
    type: "object",
    properties: {
      name: { type: "string", pattern: "^\\P{L}+$" },
      tags: { type: "array", items: { type: "string", pattern: "\\p{Lu}" } },
    },
  }) as { properties: { name: { pattern?: string }; tags: { items: { pattern?: string } } } };
  assert.equal(result.properties.name.pattern, undefined);
  assert.equal(result.properties.tags.items.pattern, undefined);
});

test("lookaround patterns are still stripped and plain patterns preserved", () => {
  const lookaround = artifactBody("^(?=.*@).+$");
  normalizeCodexTools(lookaround);
  assert.equal(artifactNameSchema(lookaround).pattern, undefined);

  const plain = artifactBody("^[a-z]+$");
  normalizeCodexTools(plain);
  assert.equal(artifactNameSchema(plain).pattern, "^[a-z]+$");

  // An escaped backslash followed by a literal "p{" is not a property escape.
  const literal = artifactBody("^a\\\\p{2}$");
  normalizeCodexTools(literal);
  assert.equal(artifactNameSchema(literal).pattern, "^a\\\\p{2}$");
});
