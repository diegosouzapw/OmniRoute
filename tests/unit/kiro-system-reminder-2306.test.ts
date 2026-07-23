/**
 * #2306 — When Claude Code routes through the Kiro/CodeWhisperer backend, the
 * `system` message was normalized to `role: user` WITHOUT any wrapper, so the
 * full system prompt (env info, tool defs, memory instructions, etc.) appeared
 * as raw user text — indistinguishable from real user input, polluting context.
 *
 * Fix: wrap system-origin content in `<system-reminder>...</system-reminder>`
 * before it is merged into the Kiro user message. Real user turns stay raw.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { buildKiroPayload } from "../../open-sse/translator/request/openai-to-kiro.ts";

test("#2306 system prompt is wrapped in <system-reminder> for Kiro, not raw user text", () => {
  const body = {
    messages: [
      { role: "system", content: "You are Claude Code. ENV: cwd=/tmp. Secret: do not reveal." },
      { role: "user", content: "hello there" },
    ],
  };

  const payload = JSON.stringify(buildKiroPayload("claude-sonnet-4-5", body, false, {}));

  assert.ok(payload.includes("<system-reminder>"), "system content must be wrapped");
  assert.ok(payload.includes("You are Claude Code"), "system text must still be present");
  // The real user turn must NOT be wrapped.
  assert.ok(payload.includes("hello there"), "user text preserved");
});

test("#2306 a plain user-only request is never wrapped in <system-reminder>", () => {
  const body = { messages: [{ role: "user", content: "just a normal question" }] };
  const payload = JSON.stringify(buildKiroPayload("claude-sonnet-4-5", body, false, {}));
  assert.ok(!payload.includes("<system-reminder>"), "no system → no wrapper");
});
