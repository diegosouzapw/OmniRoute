import test from "node:test";
import assert from "node:assert/strict";

const { GrokCliExecutor } = await import("@omniroute/open-sse/executors/grok-cli");

// Codex CLI replays Grok's reasoning items with `content: null`. Grok Build rejects that turn
// with `400 Could not decode the compaction blob. Ensure it is unmodified from the compact
// response.` even though `encrypted_content` is byte-identical; the same item without the
// `content` key is accepted. transformRequest() must drop the null `content` and leave the
// encrypted blob untouched.

const ENCRYPTED = "gAAAAB-opaque-grok-blob";

function transform(input: unknown[]) {
  const executor = new GrokCliExecutor();
  return executor.transformRequest("grok-4.6", { input }, true, {} as never) as Record<
    string,
    unknown
  >;
}

test("grok-cli transformRequest drops null content from replayed reasoning items", () => {
  const reasoning = {
    type: "reasoning",
    id: "rs_1",
    summary: [],
    content: null,
    encrypted_content: ENCRYPTED,
  };
  const input = [{ type: "message", role: "user", content: "hi" }, reasoning];

  const out = transform(input);

  assert.deepEqual((out.input as unknown[])[1], {
    type: "reasoning",
    id: "rs_1",
    summary: [],
    encrypted_content: ENCRYPTED,
  });
  // The caller's item is not mutated.
  assert.equal(reasoning.content, null);
});

test("grok-cli transformRequest keeps reasoning content that is present", () => {
  const reasoning = {
    type: "reasoning",
    summary: [],
    content: [{ type: "reasoning_text", text: "step" }],
    encrypted_content: ENCRYPTED,
  };

  const out = transform([reasoning]);

  assert.deepEqual((out.input as unknown[])[0], reasoning);
});

test("grok-cli transformRequest leaves null content on non-reasoning items alone", () => {
  const message = { type: "message", role: "assistant", content: null };

  const out = transform([message]);

  assert.deepEqual((out.input as unknown[])[0], message);
});
