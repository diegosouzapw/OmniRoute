import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the claude-web executor payload extraction.
// The pure payload types + transforms + default tools/style live in the leaf
// claude-web/payload.ts (no host state, no fetch/auth). Host imports back the
// symbols it uses (ClaudeWebRequestPayload, transformToClaude, transformFromClaude).
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "claude-web.ts");
const LEAF = join(EXE, "claude-web/payload.ts");

test("leaf hosts the payload builders/transforms and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of ["transformToClaude", "transformFromClaude", "getDefaultTools"]) {
    assert.match(src, new RegExp(`export function ${sym}\\b`));
  }
  assert.match(src, /export interface ClaudeWebRequestPayload\b/);
  assert.doesNotMatch(src, /from "\.\.\/claude-web\.ts"/);
});

test("host imports the transforms back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/claude-web\/payload\.ts"/);
});

test("transformToClaude builds a Claude-web payload with model + tools", async () => {
  const { transformToClaude } = await import("../../open-sse/executors/claude-web/payload.ts");
  const payload = transformToClaude(
    { messages: [{ role: "user", content: "hi" }] },
    "claude-sonnet-4-6"
  );
  assert.equal(typeof payload, "object");
  assert.ok(Array.isArray(payload.tools));
});
