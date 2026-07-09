import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "@omniroute/open-sse/config/providers/index.ts";
import { resolveStreamFlag } from "@omniroute/open-sse/utils/aiSdkCompat.ts";

// Cline / ClinePass only implement upstream streaming — a non-streaming request
// returns "generateText is not implemented" / an empty body. They carry
// `forceStream: true` so chatCore forces the UPSTREAM request to stream
// (`upstreamStream = stream || isClaudeCodeCompatible || providerRequiresStreaming`)
// even when the client wants JSON. The client-facing `stream` flag stays as the
// client sent it, so the `if (!stream)` branch drains the forced upstream SSE and
// converts it back to JSON via readNonStreamingResponseBody. Regression guard for
// the "cline model test → generateText is not implemented / STREAM_EARLY_EOF" bug
// (live-verified on the VPS: stream:true works, stream:false failed). (#6126)

test("cline provider is flagged forceStream (streaming-only upstream)", () => {
  assert.equal(REGISTRY.cline?.forceStream, true);
});

test("clinepass provider is flagged forceStream (streaming-only upstream)", () => {
  assert.equal(REGISTRY.clinepass?.forceStream, true);
});

test("upstreamStream is forced true for a forceStream provider even when the client sent stream:false", () => {
  // Mirror the chatCore wiring: providerRequiresStreaming derives from the
  // registry flag, and upstreamStream ORs it in so the upstream always streams.
  const providerRequiresStreaming = REGISTRY.cline?.forceStream === true;
  const isClaudeCodeCompatible = false;
  const clientStream = false; // client asked for JSON
  const upstreamStream = clientStream || isClaudeCodeCompatible || providerRequiresStreaming;
  assert.equal(upstreamStream, true);
});

test("client-facing stream stays false for a stream:false JSON caller (so SSE→JSON conversion runs)", () => {
  // chatCore MUST NOT pass providerRequiresStreaming into resolveStreamFlag:
  // a stream:false client keeps stream=false so the `if (!stream)` branch drains
  // the forced upstream SSE and returns JSON. Forcing stream=true here would skip
  // that conversion and yield STREAM_EARLY_EOF for JSON callers.
  assert.equal(resolveStreamFlag(false, "application/json", "openai"), false);
  // A stream:true client still streams end-to-end.
  assert.equal(resolveStreamFlag(true, "application/json", "openai"), true);
});
