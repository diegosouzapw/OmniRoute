import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the openai-responses request-translator extraction.
// Pure shared primitives live in `openai-responses/helpers.ts`; the chat->Responses
// direction (`openaiToOpenAIResponsesRequest`) lives in `openai-responses/toResponses.ts`.
// The host keeps `openaiResponsesToOpenAIRequest` + both register() calls and re-exports
// the moved function so external importers (tests) keep working unchanged.
const HERE = dirname(fileURLToPath(import.meta.url));
const REQ = join(HERE, "../../open-sse/translator/request");
const HOST = join(REQ, "openai-responses.ts");
const HELPERS = join(REQ, "openai-responses/helpers.ts");
const TO_RESPONSES = join(REQ, "openai-responses/toResponses.ts");

test("helpers leaf is pure (no host import) and exports the shared primitives", () => {
  const src = readFileSync(HELPERS, "utf8");
  assert.doesNotMatch(src, /from "\.\.\/openai-responses\.ts"/);
  for (const sym of ["toRecord", "toString", "clampCallId", "normalizeVerbosity"]) {
    assert.match(src, new RegExp(`export (function|const) ${sym}\\b`));
  }
});

test("toResponses leaf hosts the chat->Responses direction and imports helpers, not the host", () => {
  const src = readFileSync(TO_RESPONSES, "utf8");
  assert.match(src, /export function openaiToOpenAIResponsesRequest\(/);
  assert.match(src, /from "\.\/helpers\.ts"/);
  assert.doesNotMatch(src, /from "\.\.\/openai-responses\.ts"/);
});

test("host re-exports the moved function and keeps both register() directions", () => {
  const src = readFileSync(HOST, "utf8");
  assert.match(
    src,
    /export \{ openaiToOpenAIResponsesRequest \} from "\.\/openai-responses\/toResponses\.ts"/
  );
  assert.match(src, /export function openaiResponsesToOpenAIRequest\(/);
  assert.match(src, /register\(FORMATS\.OPENAI_RESPONSES, FORMATS\.OPENAI,/);
  assert.match(src, /register\(FORMATS\.OPENAI, FORMATS\.OPENAI_RESPONSES,/);
});

test("both directions are callable via the host module", async () => {
  const mod = await import("../../open-sse/translator/request/openai-responses.ts");
  assert.equal(typeof mod.openaiResponsesToOpenAIRequest, "function");
  assert.equal(typeof mod.openaiToOpenAIResponsesRequest, "function");
  // chat->Responses basic shape: wraps into { input: [...], stream: true }.
  const out = mod.openaiToOpenAIResponsesRequest(
    "gpt-4",
    { messages: [{ role: "user", content: "hi" }] },
    true,
    null
  ) as Record<string, unknown>;
  assert.ok(Array.isArray(out.input));
});
