/**
 * Regression for #7270 — combo session stickiness is a silent no-op on the OpenAI
 * Responses API (`/v1/responses`).
 *
 * The stickiness key was derived exclusively from `body.messages`, but Responses-API
 * requests carry their turns in `.input` and never populate `.messages`. So
 * deriveMessageHash(body.messages) resolved to null, stickiness failed open, and a
 * single conversation was re-ordered every turn as if stickiness were disabled —
 * regardless of strategy or the toggle.
 *
 * This drives the REAL handleComboChat with a round-robin combo and an `.input`-shaped
 * body and asserts:
 *  - a single sessionless Responses-API conversation re-pins to its turn-1 connection
 *    (FAILS before the fix: the combo rotates A → B → C …);
 *  - distinct conversations still spread across connections (spreading preserved);
 *  - the new normalizeStickinessMessages() helper covers both wire shapes.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stick-resp-7270-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const stick = await import("../../open-sse/services/combo/sessionStickiness.ts");
const dbCore = await import("../../src/lib/db/core.ts");

function makeLog() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

function rrCombo(name: string) {
  return {
    name,
    strategy: "round-robin",
    config: { maxRetries: 0 },
    models: [
      { kind: "model", provider: "codex", providerId: "codex", model: "m-a", connectionId: "conn-A", id: `${name}-0` },
      { kind: "model", provider: "codex", providerId: "codex", model: "m-b", connectionId: "conn-B", id: `${name}-1` },
      { kind: "model", provider: "glm-cn", providerId: "glm-cn", model: "m-c", connectionId: "conn-C", id: `${name}-2` },
    ],
  };
}

// Responses-API shape: turns live in `.input` (array of message items with
// input_text content parts), and `.messages` is absent.
function responsesBody(combo: Record<string, unknown>, firstMessage: string) {
  return {
    model: combo.name,
    input: [{ role: "user", content: [{ type: "input_text", text: firstMessage }] }],
    stream: false,
  };
}

async function dispatchConnection(
  combo: Record<string, unknown>,
  body: Record<string, unknown>
): Promise<string> {
  let conn = "?";
  await handleComboChat({
    body,
    combo,
    allCombos: [combo],
    isModelAvailable: async () => true,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (
      _b: unknown,
      modelStr: string,
      target?: { connectionId?: string | null }
    ) => {
      conn = target?.connectionId ?? "?";
      return Response.json({ choices: [{ message: { role: "assistant", content: modelStr } }] });
    },
  });
  return conn;
}

test.beforeEach(() => {
  stick.clearAllStickyBindings();
  // Fail-open saturation (unknown → full headroom) so we exercise the stickiness
  // MECHANISM, not the headroom gate.
  stick.__setStickinessHeadroomFetcherForTests(async () => undefined);
});

test.after(() => {
  stick.__setStickinessHeadroomFetcherForTests(null);
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("normalizeStickinessMessages: covers .messages, .input array and .input string", () => {
  const fromMessages = stick.normalizeStickinessMessages({
    messages: [{ role: "user", content: "hi" }],
  });
  assert.deepEqual(fromMessages, [{ role: "user", content: "hi" }]);

  const fromInputArray = stick.normalizeStickinessMessages({
    input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
  });
  assert.ok(Array.isArray(fromInputArray) && fromInputArray.length === 1);

  const fromInputString = stick.normalizeStickinessMessages({ input: "plain string turn" });
  assert.deepEqual(fromInputString, [{ role: "user", content: "plain string turn" }]);

  // .messages wins over .input when both present (Chat Completions precedence).
  const both = stick.normalizeStickinessMessages({
    messages: [{ role: "user", content: "from messages" }],
    input: "from input",
  });
  assert.deepEqual(both, [{ role: "user", content: "from messages" }]);

  assert.equal(stick.normalizeStickinessMessages({}), null);
  assert.equal(stick.normalizeStickinessMessages(null), null);
});

test("normalizeStickinessMessages: .input array of PLAIN STRINGS maps to user messages (#7270 bare-string-array gap)", () => {
  // The Responses API also allows `.input` to be an array of bare strings (each string
  // is shorthand for an `input_text` user message) — the exact shape
  // `responsesInputNormalization.ts`'s `normalizeCodexResponsesInputItem` already
  // special-cases (`typeof itemValue === "string"`). Before this fix, the
  // Array.isArray(input) branch cast the array straight through unmapped, so
  // deriveMessageHash's `messages.find(m => m?.role === "user")` never matched a bare
  // string and the key stayed null (fail-open), same bug as #7270 for this narrower shape.
  const fromPlainStringArray = stick.normalizeStickinessMessages({
    input: ["First turn of the conversation, plain string item"],
  });
  assert.deepEqual(fromPlainStringArray, [
    { role: "user", content: "First turn of the conversation, plain string item" },
  ]);

  const key = stick.deriveMessageHash(fromPlainStringArray);
  assert.ok(key !== null, "a bare-string .input array item must still yield a stickiness key");
  assert.match(key!, /^[a-f0-9]{16}$/);

  // Mixed arrays (bare string turn followed by a structured item) must only map the
  // bare-string entries, leaving object items untouched.
  const mixed = stick.normalizeStickinessMessages({
    input: ["plain turn", { role: "user", content: [{ type: "input_text", text: "hi" }] }],
  });
  assert.deepEqual(mixed?.[0], { role: "user", content: "plain turn" });
  assert.deepEqual(mixed?.[1], { role: "user", content: [{ type: "input_text", text: "hi" }] });
});

test("an .input-shaped Responses body yields a stable, non-null stickiness key", () => {
  const body = responsesBody(rrCombo("k"), "First turn of the conversation");
  // Old behavior: deriveMessageHash(body.messages) is null (bug).
  assert.equal(
    stick.deriveMessageHash(body.messages as never),
    null,
    "body.messages is absent on the Responses API — the old key source is null"
  );
  // New behavior: the normalized view produces a stable key.
  const key1 = stick.deriveMessageHash(stick.normalizeStickinessMessages(body));
  const key2 = stick.deriveMessageHash(stick.normalizeStickinessMessages(body));
  assert.ok(key1 !== null, "normalized Responses body must yield a key");
  assert.match(key1!, /^[a-f0-9]{16}$/);
  assert.equal(key1, key2, "stable across calls");
});

test("round-robin: a sessionless Responses-API conversation re-pins across turns (#7270)", async () => {
  const combo = rrCombo("rr-resp-stick");
  const conns: string[] = [];
  for (let turn = 0; turn < 5; turn++) {
    conns.push(
      await dispatchConnection(combo, responsesBody(combo, "Refactor the streaming handler."))
    );
  }
  // Turns 2..5 must all reuse turn 1's connection. Before the fix the RR combo rotates
  // (conn-A → conn-B → conn-C → …) because the .input key resolved to null → set size 3.
  assert.equal(
    new Set(conns.slice(1)).size,
    1,
    `turns 2..5 must stick to one connection, got: ${conns.join(", ")}`
  );
  assert.equal(conns[1], conns[0], "turn 2 must reuse turn 1's connection");
});

// Responses-API shape variant: `.input` is an array of PLAIN STRING items (each string
// is shorthand for a user message), not an array of message objects. Before this fix,
// normalizeStickinessMessages cast the array straight through unmapped, so
// deriveMessageHash never found a `role === "user"` entry and stickiness stayed
// fail-open for this narrower wire shape too.
function responsesBodyPlainStringArray(combo: Record<string, unknown>, firstMessage: string) {
  return {
    model: combo.name,
    input: [firstMessage],
    stream: false,
  };
}

test("round-robin: a sessionless Responses-API conversation with .input as a plain-string array re-pins across turns (#7270 bare-string-array gap)", async () => {
  const combo = rrCombo("rr-resp-stick-strarr");
  const conns: string[] = [];
  for (let turn = 0; turn < 5; turn++) {
    conns.push(
      await dispatchConnection(
        combo,
        responsesBodyPlainStringArray(combo, "Refactor the streaming handler (string-array input).")
      )
    );
  }
  // Turns 2..5 must all reuse turn 1's connection. Before the fix, the bare-string
  // .input array items yield a null key → the RR combo rotates (conn-A → conn-B → conn-C).
  assert.equal(
    new Set(conns.slice(1)).size,
    1,
    `turns 2..5 must stick to one connection, got: ${conns.join(", ")}`
  );
  assert.equal(conns[1], conns[0], "turn 2 must reuse turn 1's connection");
});

test("round-robin: distinct Responses-API conversations still spread (#7270 spreading guard)", async () => {
  const combo = rrCombo("rr-resp-spread");
  const hist: Record<string, number> = {};
  for (let i = 0; i < 6; i++) {
    const conn = await dispatchConnection(
      combo,
      responsesBody(combo, `conversation number ${i} — distinct first turn`)
    );
    hist[conn] = (hist[conn] || 0) + 1;
  }
  assert.ok(
    Object.keys(hist).length > 1,
    `distinct conversations must spread across connections, got: ${JSON.stringify(hist)}`
  );
});
