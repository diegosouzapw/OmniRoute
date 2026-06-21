/**
 * Regression for #4459 (perf: kiro/wedge hot-path) — guards the one change with real
 * correctness risk: the terminal scan now skips JSON.parse for any data line that does
 * not contain the substring `"type"`, returning terminal only via the preceding `event:`
 * line. If that shortcut dropped a genuine terminal, a buffered non-streaming response
 * would never be recognized as complete (hang / wrong result). These cases pin that the
 * shortcut is behavior-preserving across the three shapes the scan must handle.
 *
 * The other three changes in the PR are lower-risk by construction: the full-message CRC
 * is opt-in (KIRO_VERIFY_FULL_CRC, default off keeps the prelude CRC), busy_timeout is a
 * tuning constant, and the compact artifact serialization is read back via JSON.parse
 * (readCallArtifact) so it round-trips unchanged.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  appendNonStreamingSseTerminalSignal,
  type NonStreamingSseTerminalState,
} from "../../open-sse/handlers/chatCore/nonStreamingSse.ts";

function freshState(): NonStreamingSseTerminalState {
  return { currentEvent: "", pendingLine: "" };
}

test("typed terminal (data carries \"type\") is still detected via JSON.parse", () => {
  const state = freshState();
  const done = appendNonStreamingSseTerminalSignal(
    state,
    'data: {"type":"message_stop"}\n\n'
  );
  assert.equal(done, true);
});

test("Claude terminal signalled by event: line with a typeless data body is detected via the shortcut", () => {
  const state = freshState();
  // `event: message_stop` sets currentEvent; the `{}` data body has no "type" substring,
  // so it takes the shortcut and must still resolve terminal via currentEvent.
  const done = appendNonStreamingSseTerminalSignal(state, "event: message_stop\ndata: {}\n\n");
  assert.equal(done, true);
});

test("OpenAI chunks (no \"type\", non-terminal event) are not falsely terminated; [DONE] still ends", () => {
  const state = freshState();
  const mid = appendNonStreamingSseTerminalSignal(
    state,
    'data: {"choices":[{"delta":{"content":"hi"}}]}\n\n'
  );
  assert.equal(mid, false, "a normal OpenAI chunk must not be treated as terminal");
  const end = appendNonStreamingSseTerminalSignal(state, "data: [DONE]\n\n");
  assert.equal(end, true, "[DONE] still terminates");
});

test("non-terminal typed event does not terminate", () => {
  const state = freshState();
  const done = appendNonStreamingSseTerminalSignal(
    state,
    'data: {"type":"content_block_delta"}\n\n'
  );
  assert.equal(done, false);
});
