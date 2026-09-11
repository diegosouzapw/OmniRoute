import test from "node:test";
import { strict as assert } from "node:assert";

const {
  setSystemPromptConfig,
  injectSystemPromptPostTranslation,
  injectSystemPromptPreTranslation,
} = await import("../../open-sse/services/systemPrompt.ts");

const PREFIX = "PREFIX-RULES";
const SUFFIX = "SUFFIX-RULES";

function resetConfig() {
  setSystemPromptConfig({ enabled: true, prefixPrompt: PREFIX, suffixPrompt: SUFFIX });
}

function countOccurrences(s, needle) {
  return s.split(needle).length - 1;
}

test("idempotence: second application is a no-op (ONE copy of prefix/suffix)", () => {
  resetConfig();
  const body = {
    messages: [
      { role: "system", content: "ORIG" },
      { role: "user", content: "hi" },
    ],
  };
  const once = injectSystemPromptPostTranslation(body);
  const twice = injectSystemPromptPostTranslation(once);
  assert.equal(twice.messages.length, once.messages.length, "no message growth on second pass");
  assert.equal(countOccurrences(String(twice.messages[0].content), PREFIX), 1);
  assert.equal(countOccurrences(String(twice.messages[0].content), SUFFIX), 1);
});

test("no client system -> exactly one combined system inserted", () => {
  resetConfig();
  const body = { messages: [{ role: "user", content: "hi" }] };
  const out = injectSystemPromptPostTranslation(body);
  const systems = out.messages.filter((m) => m.role === "system");
  assert.equal(systems.length, 1);
  assert.ok(String(systems[0].content).startsWith(PREFIX));
  assert.ok(String(systems[0].content).endsWith(SUFFIX));
});

test("claude-format body: system field gets injection, messages untouched", () => {
  resetConfig();
  const body = { system: "CLIENT", messages: [{ role: "user", content: "hi" }] };
  const out = injectSystemPromptPostTranslation(body);
  assert.equal(out.system, "PREFIX-RULES\n\nCLIENT\n\nSUFFIX-RULES");
  assert.ok(
    !out.messages.some((m) => m.role === "system"),
    "no system-role message inside claude messages"
  );
});

test("idempotence flag does not leak into upstream JSON", () => {
  resetConfig();
  const body = { messages: [{ role: "user", content: "hi" }] };
  const out = injectSystemPromptPostTranslation(body);
  assert.equal(
    JSON.stringify(out).includes("_systemPromptInjected"),
    false,
    "flag must stay non-enumerable"
  );
});

test("multi-system codex semantics preserved: prefix on first, suffix on last", () => {
  resetConfig();
  const body = {
    messages: [
      { role: "system", content: "A" },
      { role: "developer", content: "B" },
      { role: "user", content: "hi" },
    ],
  };
  const out = injectSystemPromptPostTranslation(body);
  assert.equal(countOccurrences(String(out.messages[0].content), PREFIX), 1);
  assert.equal(countOccurrences(String(out.messages[1].content), SUFFIX), 1);
});

test("skip flag respected", () => {
  resetConfig();
  const body = { _skipSystemPrompt: true, messages: [{ role: "user", content: "hi" }] };
  const out = injectSystemPromptPostTranslation(body);
  assert.equal(out.messages.length, 1, "no injection when _skipSystemPrompt");
});

test("claude-format body WITHOUT system field: combined goes to body.system, not messages", () => {
  resetConfig();
  const body = { messages: [{ role: "user", content: "hi" }] };
  const out = injectSystemPromptPostTranslation(body, { targetFormat: "claude" });
  assert.equal(out.system, "PREFIX-RULES\n\nSUFFIX-RULES");
  assert.ok(
    !out.messages.some((m) => m.role === "system"),
    "claude target must never get a system-role message in messages"
  );
});

test("claude-format array system: prefix/suffix as text blocks, once each", () => {
  resetConfig();
  const body = {
    system: [{ type: "text", text: "CLIENT" }],
    messages: [{ role: "user", content: "hi" }],
  };
  const out = injectSystemPromptPostTranslation(body, { targetFormat: "claude" });
  assert.deepEqual(out.system, [
    { type: "text", text: "PREFIX-RULES" },
    { type: "text", text: "CLIENT" },
    { type: "text", text: "SUFFIX-RULES" },
  ]);
  assert.ok(!out.messages.some((m) => m.role === "system"));
});

test("gemini-format body: systemInstruction parts get prefix/suffix once each", () => {
  resetConfig();
  // Real shape produced by open-sse/translator/request/claude-to-gemini.ts:95-97
  // and openai-to-gemini.ts:350-356: { role: "system", parts: [{ text }] }
  const body = {
    contents: [{ role: "user", parts: [{ text: "hi" }] }],
    systemInstruction: { role: "system", parts: [{ text: "CLIENT" }] },
  };
  const out = injectSystemPromptPostTranslation(body, { targetFormat: "gemini" });
  const texts = out.systemInstruction.parts.map((p) => p.text);
  assert.equal(texts.filter((t) => t === "PREFIX-RULES").length, 1);
  assert.equal(texts.filter((t) => t === "SUFFIX-RULES").length, 1);
  assert.ok(texts.includes("CLIENT"));
});

test("gemini-format body without systemInstruction: combined systemInstruction created", () => {
  resetConfig();
  const body = { contents: [{ role: "user", parts: [{ text: "hi" }] }] };
  const out = injectSystemPromptPostTranslation(body, { targetFormat: "gemini" });
  const texts = out.systemInstruction.parts.map((p) => p.text).join("|");
  assert.equal(countOccurrences(texts, "PREFIX-RULES"), 1);
  assert.equal(countOccurrences(texts, "SUFFIX-RULES"), 1);
  assert.equal(out.contents.length, 1, "contents untouched");
});

test("responses-format body: instructions wrapped once, input untouched", () => {
  resetConfig();
  // Real targetFormat value is FORMATS.OPENAI_RESPONSES = "openai-responses"
  // (open-sse/translator/formats.ts), not "responses".
  const body = {
    model: "m",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    instructions: "INSTR",
  };
  const out = injectSystemPromptPostTranslation(body, { targetFormat: "openai-responses" });
  assert.equal(out.instructions, "PREFIX-RULES\n\nINSTR\n\nSUFFIX-RULES");
  assert.equal(out.input.length, 1);
});

test("responses-format body without instructions: combined instructions created", () => {
  resetConfig();
  const body = {
    model: "m",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
  };
  const out = injectSystemPromptPostTranslation(body, { targetFormat: "openai-responses" });
  assert.equal(out.instructions, "PREFIX-RULES\n\nSUFFIX-RULES");
});

// ---- Round 2: gated PRE-translation pass for carrier-less targets ----

// kiro: openai-to-kiro.ts:283-284/872 reads body.messages system roles ONLY
// (no body.system carrier exists). The gate must write into messages[] exactly
// once so the translator's <system-reminder> fold carries prefix+suffix once.
test("pre-translation gate: kiro target gets single messages[] injection", () => {
  resetConfig();
  const body = {
    messages: [
      { role: "system", content: "SYS" },
      { role: "user", content: "hi" },
    ],
  };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "kiro" });
  const sysMsg = out.messages.find((m) => m.role === "system");
  assert.ok(sysMsg, "system message preserved");
  assert.equal(countOccurrences(String(sysMsg.content), PREFIX), 1);
  assert.equal(countOccurrences(String(sysMsg.content), SUFFIX), 1);
});

test("pre-translation gate: kiro target with array system content gets text blocks", () => {
  resetConfig();
  const body = {
    messages: [
      { role: "system", content: [{ type: "text", text: "SYS" }] },
      { role: "user", content: "hi" },
    ],
  };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "kiro" });
  const texts = out.messages[0].content.map((c) => c.text).join("|");
  assert.equal(countOccurrences(texts, "PREFIX-RULES"), 1);
  assert.equal(countOccurrences(texts, "SUFFIX-RULES"), 1);
});

test("pre-translation gate: kiro target without system message inserts combined system", () => {
  resetConfig();
  const body = { messages: [{ role: "user", content: "hi" }] };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "kiro" });
  assert.equal(out.messages[0].role, "system");
  assert.equal(countOccurrences(String(out.messages[0].content), PREFIX), 1);
  assert.equal(countOccurrences(String(out.messages[0].content), SUFFIX), 1);
});

test("pre-translation gate: idempotent on second application", () => {
  resetConfig();
  const body = {
    messages: [
      { role: "system", content: "SYS" },
      { role: "user", content: "hi" },
    ],
  };
  const once = injectSystemPromptPreTranslation(body, { targetFormat: "kiro" });
  const twice = injectSystemPromptPreTranslation(once, { targetFormat: "kiro" });
  assert.equal(twice.messages.length, once.messages.length);
  assert.equal(countOccurrences(String(twice.messages[0].content), PREFIX), 1);
});

test("pre-translation gate: does NOT dual-write — system field wins, messages untouched", () => {
  resetConfig();
  // Round-3 M-2: for a body carrying BOTH carriers, the claude-source `system`
  // field is the authoritative one (#2468 ordering: prefix → client → suffix);
  // messages must stay untouched so the wrap is never duplicated.
  const body = {
    system: "STRAY",
    messages: [
      { role: "system", content: "SYS" },
      { role: "user", content: "hi" },
    ],
  };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "kiro" });
  assert.equal(
    out.system,
    "PREFIX-RULES\n\nSTRAY\n\nSUFFIX-RULES",
    "system field is the single carrier"
  );
  assert.equal(
    countOccurrences(String(out.messages[0].content), PREFIX),
    0,
    "messages untouched — dual-write would duplicate upstream"
  );
});

test("pre-translation gate: no-op for carrier-ful targets (openai handled at 3068)", () => {
  resetConfig();
  const body = {
    messages: [
      { role: "system", content: "SYS" },
      { role: "user", content: "hi" },
    ],
  };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "openai" });
  assert.equal(
    countOccurrences(String(out.messages[0].content), PREFIX),
    0,
    "openai must get its injection post-translation, not pre"
  );
  assert.equal(out.messages[0].content, "SYS");
});

test("pre-translation gate: no-op when disabled or no prompts configured", () => {
  setSystemPromptConfig({ enabled: false, prefixPrompt: PREFIX, suffixPrompt: SUFFIX });
  const body = { messages: [{ role: "user", content: "hi" }] };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "kiro" });
  assert.equal(out.messages.length, 1);
  setSystemPromptConfig({ enabled: true, prefixPrompt: "", suffixPrompt: "" });
  const out2 = injectSystemPromptPreTranslation(body, { targetFormat: "kiro" });
  assert.equal(out2.messages.length, 1);
  resetConfig();
});

// antigravity: translator wraps the payload in a Cloud Code envelope and the
// executor reads ONLY envelope.request (antigravity.ts:733/:417-425) — the
// envelope rejects unknown top-level fields with 400 (:813-815). A top-level
// systemInstruction created post-translation would be an invalid field, and
// envelope.request.systemInstruction is already pinned to
// ANTIGRAVITY_DEFAULT_SYSTEM (openai-to-gemini.ts:719) — so antigravity must be
// gated PRE-translation into client messages, same as kiro.
test("pre-translation gate: antigravity target gets single messages[] injection", () => {
  resetConfig();
  const body = {
    messages: [
      { role: "system", content: "SYS" },
      { role: "user", content: "hi" },
    ],
  };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "antigravity" });
  const sysMsg = out.messages.find((m) => m.role === "system");
  assert.ok(sysMsg, "system message preserved");
  assert.equal(countOccurrences(String(sysMsg.content), PREFIX), 1);
  assert.equal(countOccurrences(String(sysMsg.content), SUFFIX), 1);
});

test("pre-translation gate: antigravity without system message inserts combined", () => {
  resetConfig();
  const body = { messages: [{ role: "user", content: "hi" }] };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "antigravity" });
  assert.equal(out.messages[0].role, "system");
  assert.equal(countOccurrences(String(out.messages[0].content), PREFIX), 1);
  assert.equal(countOccurrences(String(out.messages[0].content), SUFFIX), 1);
});

test("gemini branch: antigravity envelope must NOT get a top-level systemInstruction created", () => {
  resetConfig();
  // 3068 receives the envelope itself for antigravity; the gemini branch must
  // not fabricate an invalid top-level systemInstruction on it.
  const body = {
    project: "p",
    requestId: "r",
    request: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
  };
  const out = injectSystemPromptPostTranslation(body, { targetFormat: "antigravity" });
  assert.equal(
    out.systemInstruction,
    undefined,
    "no invalid top-level systemInstruction on a Cloud Code envelope"
  );
  assert.equal(out.messages, undefined, "envelope has no messages to mutate");
});

// ---- Round 3: source-shape coverage in the gate ----

// I-NEW-1: a responses-source client (e.g. /v1/responses falling back to a kiro
// connection) reaches the gate with {input, instructions} — no messages[], no
// system field. The hub translation (openai-responses -> openai,
// openai-responses.ts:205-207) promotes instructions to a system message, so
// wrapping instructions here reaches the kiro <system-reminder> fold.
test("pre-translation gate: responses-source body gets instructions wrapped once, input untouched", () => {
  resetConfig();
  const body = {
    model: "m",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    instructions: "INSTR",
  };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "kiro" });
  assert.equal(out.instructions, "PREFIX-RULES\n\nINSTR\n\nSUFFIX-RULES");
  assert.equal(out.input.length, 1, "input untouched");
});

test("pre-translation gate: responses-source without instructions creates combined", () => {
  resetConfig();
  const body = {
    model: "m",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
  };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "kiro" });
  assert.equal(out.instructions, "PREFIX-RULES\n\nSUFFIX-RULES");
  assert.equal(out.input.length, 1);
});

// gemini-source client (contents + systemInstruction) reaching a carrier-less
// target: inject into systemInstruction parts exactly once.
test("pre-translation gate: gemini-source body gets systemInstruction parts once each", () => {
  resetConfig();
  const body = {
    contents: [{ role: "user", parts: [{ text: "hi" }] }],
    systemInstruction: { role: "system", parts: [{ text: "CLIENT" }] },
  };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "antigravity" });
  const texts = out.systemInstruction.parts.map((p) => p.text);
  assert.equal(texts.filter((t) => t === "PREFIX-RULES").length, 1);
  assert.equal(texts.filter((t) => t === "SUFFIX-RULES").length, 1);
  assert.ok(texts.includes("CLIENT"));
});

test("pre-translation gate: gemini-source without systemInstruction creates combined parts", () => {
  resetConfig();
  const body = { contents: [{ role: "user", parts: [{ text: "hi" }] }] };
  const out = injectSystemPromptPreTranslation(body, { targetFormat: "antigravity" });
  const texts = out.systemInstruction.parts.map((p) => p.text).join("|");
  assert.equal(countOccurrences(texts, "PREFIX-RULES"), 1);
  assert.equal(countOccurrences(texts, "SUFFIX-RULES"), 1);
  assert.equal(out.contents.length, 1, "contents untouched");
});

// M3: reset config so this file's settings never leak into other test files.
test.after(() => setSystemPromptConfig({ enabled: false, prefixPrompt: "", suffixPrompt: "" }));
