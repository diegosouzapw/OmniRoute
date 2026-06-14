import test from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import { configureProperties } from "../../helpers/propertyConfig.ts";
import { translateRequest } from "../../../open-sse/translator/index.ts";
import { FORMATS } from "../../../open-sse/translator/formats.ts";

configureProperties();

// Non-empty, non-whitespace content required: translator drops messages with empty/whitespace
// content (observed real behavior — empty-content messages produce invalid Claude/Gemini requests).
const messageArb = fc.record({
  role: fc.constantFrom("user", "assistant", "system"),
  content: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
});
const bodyArb = fc.record({
  model: fc.string({ minLength: 1 }),
  messages: fc.array(messageArb, { minLength: 1, maxLength: 6 }),
});

test("translateRequest openai->claude never throws and keeps messages", () => {
  fc.assert(
    fc.property(bodyArb, (body) => {
      const out = translateRequest(
        FORMATS.OPENAI,
        FORMATS.CLAUDE,
        body.model,
        body,
        true
      ) as Record<string, unknown>;
      assert.ok(out && typeof out === "object");
      // Either messages array is non-empty, or content went to system field (system-only body)
      const hasMessages = Array.isArray(out.messages) && (out.messages as unknown[]).length > 0;
      const hasSystem = Array.isArray(out.system) && (out.system as unknown[]).length > 0;
      assert.ok(hasMessages || hasSystem, "output must have messages or non-empty system");
    })
  );
});

test("translateRequest round-trip openai->claude->openai preserves message count for well-formed input", () => {
  // Generate bodies with properly alternating user/assistant roles (no consecutive same role),
  // optionally preceded by a system message. This is the well-formed case where Claude's
  // merge-consecutive-same-role normalization does NOT collapse messages.
  // Invariant-calibration note: arbitrary bodies with consecutive same-role messages get merged
  // by the OpenAI→Claude translator (correct behavior — Claude doesn't allow consecutive same-role).
  // We test only the well-formed alternating case for an exact-count invariant.
  const altBodyArb = fc.record({
    model: fc.string({ minLength: 1 }),
    messages: fc.integer({ min: 1, max: 5 }).chain((n) => {
      // Build alternating user/assistant sequence, starting with user
      const msgs = Array.from({ length: n }, (_, i) => ({
        role: (i % 2 === 0 ? "user" : "assistant") as "user" | "assistant",
        content: "msg" + i,
      }));
      return fc.constant(msgs);
    }),
  });
  fc.assert(
    fc.property(altBodyArb, (body) => {
      const claude = translateRequest(
        FORMATS.OPENAI,
        FORMATS.CLAUDE,
        body.model,
        body,
        true
      ) as Record<string, unknown>;
      const back = translateRequest(
        FORMATS.CLAUDE,
        FORMATS.OPENAI,
        body.model,
        claude,
        true
      ) as Record<string, unknown>;
      assert.ok(Array.isArray(back.messages));
      assert.equal((back.messages as unknown[]).length, body.messages.length);
    })
  );
});
