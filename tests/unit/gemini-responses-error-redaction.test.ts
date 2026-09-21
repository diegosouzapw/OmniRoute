import assert from "node:assert/strict";
import test from "node:test";
import { translateResponse, initState } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("Gemini keeps raw failure wording internal but projects response.completed.error", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const hostileMessage =
    "Gemini failed at /srv/omniroute/private-runtime.ts:71:3 token=sk-gemini-secret-123456";

  const translated = translateResponse(
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES,
    {
      response: {
        error: {
          code: 503,
          status: "UNAVAILABLE",
          message: hostileMessage,
          api_key: "sk-gemini-secret-abcdef",
        },
      },
    },
    state
  );
  assert.equal(translated?.length ?? 0, 0);
  assert.match(state.upstreamError?.message ?? "", /private-runtime\.ts/);

  const flushed = translateResponse(FORMATS.GEMINI, FORMATS.OPENAI_RESPONSES, null, state);
  const completed = flushed.find((event) => event?.data?.type === "response.completed");
  assert.ok(completed);
  assert.equal(completed.data.response.status, "failed");

  const publicError = JSON.stringify(completed.data.response.error);
  assert.doesNotMatch(publicError, /private-runtime\.ts/);
  assert.doesNotMatch(publicError, /sk-gemini-secret/);
  assert.doesNotMatch(publicError, /api_key/);
  assert.equal(completed.data.response.error.code, "503");
});
