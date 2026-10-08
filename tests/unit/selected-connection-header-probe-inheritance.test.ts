/**
 * #15567 / #15521 moved withSelectedConnectionHeader() out of chatHelpers.ts into
 * src/sse/handlers/chat/selectedConnectionHeader.ts. The release tip had meanwhile
 * taught the chatHelpers copy (#15594) to carry the provider-probe marker onto the
 * clone it builds when the original response's headers are immutable. This guard
 * keeps the extracted helper — and the chatHelpers re-export — from dropping it.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { withSelectedConnectionHeader } =
  await import("../../src/sse/handlers/chat/selectedConnectionHeader.ts");
const helpers = await import("../../src/sse/handlers/chatHelpers.ts");
const { markProviderProbeResponse, isProviderProbeResponse } =
  await import("../../src/shared/utils/providerProbeResult.ts");

function immutableProbeResponse(): Response {
  // Response.redirect() returns a Response whose headers are immutable, which forces
  // withSelectedConnectionHeader() down its clone path.
  const response = Response.redirect("https://example.invalid/probe", 302);
  assert.throws(() => response.headers.set("x-probe", "1"));
  markProviderProbeResponse(response);
  return response;
}

test("cloned response keeps the provider-probe marker (#15594 on the extracted helper)", () => {
  const original = immutableProbeResponse();
  const out = withSelectedConnectionHeader(original, "conn-1");
  assert.notEqual(out, original, "immutable headers must produce a clone");
  assert.equal(out.headers.get("X-OmniRoute-Selected-Connection-Id"), "conn-1");
  assert.equal(isProviderProbeResponse(out), true);
});

test("chatHelpers re-exports the same probe-preserving helper", () => {
  assert.equal(helpers.withSelectedConnectionHeader, withSelectedConnectionHeader);
});

test("a non-probe response is not marked as a probe after cloning", () => {
  const original = Response.redirect("https://example.invalid/plain", 302);
  const out = withSelectedConnectionHeader(original, "conn-2");
  assert.equal(isProviderProbeResponse(out), false);
});
