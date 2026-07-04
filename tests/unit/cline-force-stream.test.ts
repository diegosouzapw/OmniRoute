import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "@omniroute/open-sse/config/providers/index.ts";
import { resolveStreamFlag } from "@omniroute/open-sse/utils/aiSdkCompat.ts";

// Cline / ClinePass only implement upstream streaming — a non-streaming request
// returns "generateText is not implemented" / an empty body. They must carry
// `forceStream: true` so chatCore forces upstream streaming (upstreamStream) even
// when the client wants JSON, then converts the SSE back to JSON. Regression guard
// for the "cline model test → generateText is not implemented / empty response"
// bug (live-verified on the VPS: stream:true works, stream:false failed).

test("cline provider is flagged forceStream (streaming-only upstream)", () => {
  assert.equal(REGISTRY.cline?.forceStream, true);
});

test("clinepass provider is flagged forceStream (streaming-only upstream)", () => {
  assert.equal(REGISTRY.clinepass?.forceStream, true);
});

test("resolveStreamFlag forces streaming for a forceStream provider even when the client sent stream:false", () => {
  // providerRequiresStreaming derives from REGISTRY[provider].forceStream === true
  const providerRequiresStreaming = REGISTRY.cline?.forceStream === true;
  assert.equal(
    resolveStreamFlag(false, "application/json", "openai", { providerRequiresStreaming }),
    true
  );
});

test("resolveStreamFlag still honors stream:false for a normal (non-forceStream) provider", () => {
  const providerRequiresStreaming = REGISTRY.openai?.forceStream === true; // false
  assert.equal(
    resolveStreamFlag(false, "application/json", "openai", { providerRequiresStreaming }),
    false
  );
});
