import test from "node:test";
import assert from "node:assert/strict";

const { handleDesignerWebImageGeneration } = await import(
  "../../open-sse/handlers/imageGeneration/providers/designerWeb.ts"
);

/**
 * `stepDesignerWebPoll` classifies an unrecognized upstream body as a terminal
 * 502 — the "empty" arm of the step union, alongside pending / ready / upstream
 * failure.
 *
 * `microsoft-designer-web-6672.test.ts` covers every other arm end-to-end
 * (400 no prompt, 401 no token, immediate ready, poll-then-ready, non-OK
 * upstream, 504 timeout) but tests "empty" only at the parser level
 * (`parseDesignerWebResponse: unrecognized shape is 'empty'`) — it never drives
 * the handler with one, so the 502 the handler synthesizes from it was
 * unasserted.
 */

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response;
}

const BASE = {
  model: "dall-e-3",
  provider: "microsoft-designer-web",
  providerConfig: { baseUrl: "https://designerapp.officeapps.live.com/designerapp/DallE.ashx" },
  credentials: { apiKey: "tok-abc" },
};

test("a 200 with an unrecognized body is a terminal 502, not a retry", async () => {
  let calls = 0;
  const result = await handleDesignerWebImageGeneration({
    ...BASE,
    body: { prompt: "a cat astronaut", timeout_ms: 5_000, poll_interval_ms: 1 },
    fetchImpl: async () => {
      calls += 1;
      return jsonResponse(200, { unexpected: true });
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 502, "an unparseable success body is a bad-gateway, not a timeout");
  assert.match(String(result.error), /did not contain image data or polling metadata/);
  assert.equal(calls, 1, "the empty classification is terminal — it must not keep polling");
});

test("a 200 with neither images nor polling metadata does not fall through to 504", async () => {
  // The distinction matters: 502 says "the upstream answered with something we
  // cannot use", 504 says "the upstream never finished". A timeout_ms generous
  // enough to allow several polls proves the 502 came from classification, not
  // from the deadline.
  const result = await handleDesignerWebImageGeneration({
    ...BASE,
    body: { prompt: "a cat astronaut", timeout_ms: 10_000, poll_interval_ms: 1 },
    fetchImpl: async () => jsonResponse(200, { polling_response: {} }),
  });

  assert.equal(result.status, 502);
  assert.notEqual(result.status, 504);
});
