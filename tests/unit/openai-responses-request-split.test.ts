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

test("mid-conversation system turns are preserved as developer-role input items (#6954)", async () => {
  const mod = await import("../../open-sse/translator/request/openai-responses.ts");
  const out = mod.openaiToOpenAIResponsesRequest(
    "gpt-5.5",
    {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello" },
        { role: "system", content: "Available agent types: claude, claude-code-guide" },
        { role: "assistant", content: "Hi there!" },
        { role: "system", content: "Reminder: stay concise." },
      ],
    },
    true,
    null
  ) as Record<string, unknown>;

  // The FIRST system turn becomes `instructions`.
  assert.equal(out.instructions, "You are a helpful assistant.");

  const input = out.input as Array<Record<string, unknown>>;

  // Mid-conversation system turns must survive as developer-role input items —
  // not dropped, and never misattributed as assistant (#6954).
  const developerItems = input.filter((i) => i.role === "developer");
  assert.equal(developerItems.length, 2, "two mid-conversation system turns should become developer items");
  assert.deepEqual(
    (developerItems[0].content as Array<Record<string, unknown>>).map((c) => c.text),
    ["Available agent types: claude, claude-code-guide"]
  );
  assert.deepEqual(
    (developerItems[1].content as Array<Record<string, unknown>>).map((c) => c.text),
    ["Reminder: stay concise."]
  );

  // No harness-injected system content should appear as assistant prose.
  const assistantText = input
    .filter((i) => i.role === "assistant")
    .map((i) => JSON.stringify(i.content))
    .join(" ");
  assert.ok(!assistantText.includes("Available agent types"));
  assert.ok(!assistantText.includes("Reminder: stay concise."));
});

test("mid-conversation system content as an array with a bare string survives (#6954 follow-up)", async () => {
  const mod = await import("../../open-sse/translator/request/openai-responses.ts");
  const out = mod.openaiToOpenAIResponsesRequest(
    "gpt-5.5",
    {
      messages: [
        { role: "system", content: "Base instructions." },
        { role: "user", content: "Hi" },
        { role: "system", content: ["Remember to be concise."] },
      ],
    },
    true,
    null
  ) as Record<string, unknown>;
  const input = out.input as Array<Record<string, unknown>>;
  const devItems = input.filter((i) => i.role === "developer");
  assert.equal(devItems.length, 1, "array-form system turn should become a developer item");
  assert.deepEqual(
    (devItems[0].content as Array<Record<string, unknown>>).map((c) => c.text),
    ["Remember to be concise."]
  );
});
