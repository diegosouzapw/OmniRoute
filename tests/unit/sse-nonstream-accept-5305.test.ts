import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  resolveStreamFlag,
  acceptHeaderForcesStream,
} from "../../open-sse/utils/aiSdkCompat.ts";

// #5305: the Vercel AI SDK / OpenAI SDK non-stream path (doGenerate/generateText)
// OMITS `stream` in the body and sends `Accept: application/json, text/event-stream`,
// then parses the response as JSON. OmniRoute was coercing such requests into SSE
// (route-level Accept override in src/sse/handlers/chat.ts + resolveStreamFlag),
// so the caller got `data: {...}` and failed with "Invalid JSON response".
//
// Rule: an Accept header that explicitly lists `application/json` is a JSON opt-in,
// even when it ALSO lists `text/event-stream`. Only a PURE SSE Accept header
// (text/event-stream WITHOUT application/json) forces streaming when `stream` is
// omitted. An explicit body `stream` value always wins.

describe("#5305 acceptHeaderForcesStream — route-level Accept streaming opt-in", () => {
  it("does NOT force stream for the Vercel/OpenAI SDK non-stream signature (json + sse, stream omitted)", () => {
    assert.equal(acceptHeaderForcesStream("application/json, text/event-stream", undefined), false);
  });

  it("forces stream for a pure-SSE Accept header (text/event-stream only, stream omitted)", () => {
    assert.equal(acceptHeaderForcesStream("text/event-stream", undefined), true);
  });

  it("does NOT force stream for a pure-JSON Accept header", () => {
    assert.equal(acceptHeaderForcesStream("application/json", undefined), false);
  });

  it("never overrides an explicit body stream value (false or true)", () => {
    assert.equal(acceptHeaderForcesStream("text/event-stream", false), false);
    assert.equal(acceptHeaderForcesStream("text/event-stream", true), false);
  });

  it("does not force stream when there is no Accept header", () => {
    assert.equal(acceptHeaderForcesStream(undefined, undefined), false);
    assert.equal(acceptHeaderForcesStream("", undefined), false);
  });
});

describe("#5305 resolveStreamFlag — openai non-stream with mixed Accept", () => {
  it("defaults to NON-stream (JSON) for openai + omitted stream + `application/json, text/event-stream`", () => {
    assert.equal(resolveStreamFlag(undefined, "application/json, text/event-stream", "openai"), false);
  });

  it("keeps streaming for openai + omitted stream + pure text/event-stream Accept", () => {
    assert.equal(resolveStreamFlag(undefined, "text/event-stream", "openai"), true);
  });

  it("keeps streaming for openai + omitted stream + no/`*/*` Accept (legacy default unchanged)", () => {
    assert.equal(resolveStreamFlag(undefined, undefined, "openai"), true);
    assert.equal(resolveStreamFlag(undefined, "*/*", "openai"), true);
  });

  it("explicit body stream:true still wins over a json-leaning Accept", () => {
    assert.equal(resolveStreamFlag(true, "application/json, text/event-stream", "openai"), true);
  });

  it("a forceStream provider still streams regardless of the json Accept (#2081 preserved)", () => {
    assert.equal(
      resolveStreamFlag(undefined, "application/json, text/event-stream", "openai", {
        providerRequiresStreaming: true,
      }),
      true
    );
  });
});
