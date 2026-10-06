import test from "node:test";
import assert from "node:assert/strict";
const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");
const silentLog = { warn: () => {} };
function makeTinyProbeResponse(): Response {
  // Mirrors the issue's reported shape verbatim: "reasoning consumed 10/10 tokens — no content output"
  return new Response(
    JSON.stringify({
      choices: [{ message: { content: null, reasoning_content: "Ok" }, finish_reason: "length" }],
      usage: { completion_tokens: 10, reasoning_tokens: 10 },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
test("#12659 EXPECTED: combo validator exempts a tiny-budget reasoning probe (finish_reason:length, tiny completion_tokens) instead of a genuine quality failure", async () => {
  const res = makeTinyProbeResponse();
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, `reproduces #12659: ... (reason: ${out.reason})`);
});
