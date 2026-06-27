// Port of upstream #2081 — forceStream (stream-only) providers must keep streaming even
// when the client asks for a non-streaming/JSON response. OmniRoute then accumulates the
// provider stream and returns a normal JSON body to the client (handleForcedSSEToJson).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveStreamFlag } from "../../open-sse/utils/aiSdkCompat.ts";

describe("resolveStreamFlag — forceStream / providerRequiresStreaming guard (#2081)", () => {
  it("keeps streaming for a forceStream provider even when client prefers JSON and sets stream:false", () => {
    // The bug: Accept: application/json + stream:false used to override providerRequiresStreaming,
    // sending stream:false to a stream-only provider (e.g. CodeBuddy) → HTTP 400.
    const result = resolveStreamFlag(
      false, // body.stream = false
      "application/json", // Accept header
      undefined, // sourceFormat
      { providerRequiresStreaming: true }
    );
    assert.equal(result, true, "stream-only provider must stay streaming even when client prefers JSON");
  });

  it("non-forceStream provider: client prefers JSON + stream:false → non-streaming (unchanged behavior)", () => {
    const result = resolveStreamFlag(
      false,
      "application/json",
      undefined,
      { providerRequiresStreaming: false }
    );
    assert.equal(result, false, "normal provider should respect client JSON preference");
  });

  it("forceStream provider: no explicit stream flag → streams by default", () => {
    const result = resolveStreamFlag(
      undefined,
      undefined,
      undefined,
      { providerRequiresStreaming: true }
    );
    assert.equal(result, true);
  });

  it("ordinary provider with no special flags streams by default (backward compat)", () => {
    const result = resolveStreamFlag(undefined, undefined);
    assert.equal(result, true);
  });

  it("forceStream provider: client explicitly sends stream:true → stays true", () => {
    const result = resolveStreamFlag(
      true,
      "application/json",
      undefined,
      { providerRequiresStreaming: true }
    );
    assert.equal(result, true);
  });

  it("forceStream provider: client sends Accept: text/event-stream + stream:false → stays true", () => {
    // SSE Accept header alone shouldn't be needed for stream-only providers,
    // but providerRequiresStreaming should still force true.
    const result = resolveStreamFlag(
      false,
      "text/event-stream",
      undefined,
      { providerRequiresStreaming: true }
    );
    assert.equal(result, true);
  });

  it("without providerRequiresStreaming option, JSON client + stream:false still gets non-streaming", () => {
    // Verify backward compatibility — no regression for callers that don't pass the option
    const result = resolveStreamFlag(false, "application/json");
    assert.equal(result, false);
  });
});
