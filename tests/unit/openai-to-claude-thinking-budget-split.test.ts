import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the openai-to-claude thinking-budget extraction.
// `fitThinkingToMaxTokens` (+ its private helpers safeCapMaxOutputTokens / MIN_*)
// live in the pure leaf `openai-to-claude/thinkingBudget.ts`; the host re-exports
// the public symbol so external importers (tests) keep working unchanged.
const HERE = dirname(fileURLToPath(import.meta.url));
const REQ = join(HERE, "../../open-sse/translator/request");
const HOST = join(REQ, "openai-to-claude.ts");
const LEAF = join(REQ, "openai-to-claude/thinkingBudget.ts");

test("leaf hosts fitThinkingToMaxTokens and does not import the host", () => {
  const leaf = readFileSync(LEAF, "utf8");
  assert.match(leaf, /export function fitThinkingToMaxTokens\(/);
  assert.match(leaf, /function safeCapMaxOutputTokens\(/);
  assert.doesNotMatch(leaf, /from "\.\.\/openai-to-claude\.ts"/);
});

test("host re-exports fitThinkingToMaxTokens from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(
    host,
    /export \{ fitThinkingToMaxTokens \} from "\.\/openai-to-claude\/thinkingBudget\.ts"/
  );
});

test("re-exported fitThinkingToMaxTokens is callable via the host module and behaves", async () => {
  const mod = await import("../../open-sse/translator/request/openai-to-claude.ts");
  assert.equal(typeof mod.fitThinkingToMaxTokens, "function");
  // No budgeted thinking → max_tokens floored to >= 1, thinking passed through.
  const out = mod.fitThinkingToMaxTokens("gpt-4o-mini", 0, undefined);
  assert.equal(out.thinking, undefined);
  assert.ok(out.maxTokens >= 1);
});
