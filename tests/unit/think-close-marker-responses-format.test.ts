import test from "node:test";
import assert from "node:assert/strict";

const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { resolveSuppressThinkClose } = await import("../../open-sse/utils/thinkCloseMarker.ts");

// kimi-coding via /v1/responses: the Claude→OpenAI `</think>` close marker
// (#4633) exists for Chat Completions clients that scan content for the marker
// (Claude Code / Cursor). Responses API clients receive reasoning as
// structured reasoning items (responsesTransformer maps reasoning_content
// natively), so the textual marker has no consumer on this path and always
// leaks verbatim into `response.output_text.delta`.

test("openai-responses client format always suppresses the close marker", () => {
  assert.equal(
    resolveSuppressThinkClose({
      userAgent: "OpenAI/JS 6.26.0",
      thinkingMarkerHeader: null,
      clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    }),
    true
  );
});

test("openai-responses suppression wins over an explicit keep header", () => {
  // There is no legitimate marker consumer in the Responses API format; an
  // explicit `x-omniroute-thinking-marker: on` would only re-create the leak.
  assert.equal(
    resolveSuppressThinkClose({
      userAgent: null,
      thinkingMarkerHeader: "on",
      clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    }),
    true
  );
});

test("openai chat format keeps the conservative default (marker on)", () => {
  assert.equal(
    resolveSuppressThinkClose({
      userAgent: "OpenAI/JS 6.26.0",
      thinkingMarkerHeader: null,
      clientResponseFormat: FORMATS.OPENAI,
    }),
    false
  );
});

test("absent client format preserves the UA/header policy", () => {
  assert.equal(
    resolveSuppressThinkClose({ userAgent: "opencode/1.0", thinkingMarkerHeader: null }),
    true
  );
  assert.equal(
    resolveSuppressThinkClose({ userAgent: "unknown-client", thinkingMarkerHeader: null }),
    false
  );
});
