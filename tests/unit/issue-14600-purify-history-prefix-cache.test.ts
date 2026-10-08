import { test } from "node:test";
import assert from "node:assert/strict";
import { compressContext } from "../../open-sse/services/contextManager.ts";

/**
 * Repro for issue #14600: purifyHistory()'s dropped-message notice interpolates
 * a per-request `dropped` count into messages[0] (the prefix-cache anchor).
 * Because `keep` is re-derived by binary search on every request, two
 * consecutive requests over the SAME growing conversation (same leading system
 * prompt, one more turn added) can produce a DIFFERENT drop count, which
 * changes the byte content of messages[0] and busts the upstream provider's
 * prefix cache even though the system prompt itself never changed.
 *
 * This test simulates two consecutive requests on the same conversation, one
 * turn apart, sized so the binary search lands on a different `keep` value
 * (and therefore a different `dropped` count) each time. It asserts that
 * messages[0] is byte-identical across the two requests -- the invariant a
 * prefix cache needs.
 */

function bigTurn(n: number) {
  return { role: "user", content: `turn ${n}: ${"x".repeat(4_000)}` };
}

function requestWithNTurns(n: number) {
  const body = {
    model: "any-model",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      ...Array.from({ length: n }, (_, i) => bigTurn(i)),
    ],
  };
  // ~4k tokens/turn vs a small target forces Layer-3 purify_history for both requests.
  return compressContext(body, { maxTokens: 5_000, reserveTokens: 0 });
}

test("issue #14600: purify_history notice must be byte-stable across requests on a growing conversation (prefix-cache anchor)", () => {
  const resultA = requestWithNTurns(13);
  const resultB = requestWithNTurns(14);

  assert.equal(resultA.compressed, true, "request A must trigger purify_history");
  assert.equal(resultB.compressed, true, "request B must trigger purify_history");

  const messagesA = (resultA.body as { messages: Array<Record<string, unknown>> }).messages;
  const messagesB = (resultB.body as { messages: Array<Record<string, unknown>> }).messages;

  const first0 = String(messagesA[0].content);
  const first1 = String(messagesB[0].content);

  // Sanity: both carry the compression notice.
  assert.match(first0, /Context compressed/);
  assert.match(first1, /Context compressed/);

  // THE BUG: the drop count differs between the two requests (9 vs 10, per
  // the binary-search math), which makes messages[0] differ byte-for-byte --
  // destroying the upstream prefix cache anchored at index 0.
  assert.equal(
    first0,
    first1,
    `messages[0] must be byte-identical across consecutive requests on the same ` +
      `conversation so the upstream prefix cache is not invalidated by the drop ` +
      `counter alone.\n  request A (13 turns): ${JSON.stringify(first0)}\n  request B (14 turns): ${JSON.stringify(first1)}`
  );
});
