import assert from "node:assert/strict";
import test from "node:test";

import { buildModalityBridgeResponseHeaders } from "../../src/lib/guardrails/modalityBridge/bridgeResponseHeaders.ts";
import { withModalityBridgeHeader } from "../../src/sse/handlers/chatHelpers.ts";
import { applyCorsHeaders, setRuntimeAllowedOrigins } from "../../src/server/cors/origins.ts";

test("JSON and SSE success wrappers expose the same bounded dedicated handle header", async () => {
  const handles = Array.from({ length: 6 }, (_, index) => ({
    handle: String(index).repeat(64),
    expiresAt: Date.now() + 60_000,
  }));
  const metadata = [
    {
      guardrail: "video-bridge",
      meta: { videosProcessed: 1, videoModel: "example/vision", videoDrilldownHandles: handles },
    },
  ];
  for (const contentType of ["application/json", "text/event-stream"]) {
    const response = withModalityBridgeHeader(
      new Response("untouched body", { headers: { "Content-Type": contentType } }),
      buildModalityBridgeResponseHeaders(metadata)
    );
    assert.equal(
      response.headers.get("x-omniroute-video-drilldown"),
      handles
        .slice(0, 4)
        .map(({ handle }) => handle)
        .join(",")
    );
    assert.ok(response.headers.get("x-omniroute-modality-bridge")?.includes("video->text"));
    assert.equal(await response.text(), "untouched body");
  }
});

test("browser clients can read dedicated handles without widening the CORS origin policy", () => {
  const previous = process.env.CORS_ALLOW_ALL;
  const previousOrigins = process.env.CORS_ALLOWED_ORIGINS;
  const previousLegacy = process.env.CORS_ORIGIN;
  delete process.env.CORS_ALLOW_ALL;
  delete process.env.CORS_ALLOWED_ORIGINS;
  delete process.env.CORS_ORIGIN;
  setRuntimeAllowedOrigins("https://client.example");
  try {
    for (const origin of ["https://client.example", "https://untrusted.example"]) {
      const response = new Response("ok");
      applyCorsHeaders(
        response,
        new Request("https://omniroute.example/v1/chat/completions", {
          headers: { Origin: origin },
        })
      );
      if (origin === "https://client.example") {
        assert.equal(response.headers.get("Access-Control-Allow-Origin"), origin);
        const exposed = response.headers.get("Access-Control-Expose-Headers")?.toLowerCase();
        assert.ok(exposed?.includes("x-omniroute-video-drilldown"));
        assert.ok(exposed?.includes("x-omniroute-modality-bridge"));
      } else {
        assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
        assert.equal(response.headers.get("Access-Control-Expose-Headers"), null);
      }
      assert.equal(response.headers.get("Access-Control-Allow-Credentials"), null);
    }
  } finally {
    if (previous === undefined) delete process.env.CORS_ALLOW_ALL;
    else process.env.CORS_ALLOW_ALL = previous;
    if (previousOrigins === undefined) delete process.env.CORS_ALLOWED_ORIGINS;
    else process.env.CORS_ALLOWED_ORIGINS = previousOrigins;
    if (previousLegacy === undefined) delete process.env.CORS_ORIGIN;
    else process.env.CORS_ORIGIN = previousLegacy;
    setRuntimeAllowedOrigins("");
  }
});

test("only bounded server video metadata can mint response handles", async () => {
  const handle = "a".repeat(64);
  const header = buildModalityBridgeResponseHeaders([
    { guardrail: "caller", meta: { videoDrilldownHandles: [{ handle }] } },
    {
      guardrail: "video-bridge",
      meta: { videoDrilldownHandles: [null, { handle: "\r\nforged" }, { handle }, { handle }] },
    },
  ]);
  assert.equal(header?.["x-omniroute-video-drilldown"], handle);
  assert.equal(buildModalityBridgeResponseHeaders([]), null);
  const response = withModalityBridgeHeader(Response.redirect("https://example.com"), header);
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("x-omniroute-video-drilldown"), handle);
});
