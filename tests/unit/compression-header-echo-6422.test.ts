/**
 * #6422 — X-OmniRoute-Compression response header echo.
 *
 * Docs promise that when a request supplies `x-omniroute-compression`, the response
 * echoes `X-OmniRoute-Compression: <mode>; source=<source>`. Internal early-returns
 * (idempotency-cache short-circuit, some combo/fusion assembly paths) omit that
 * header, so the outermost route layer echoes a best-effort value from the request.
 * These tests lock the helper's contract so a future refactor cannot silently drop
 * the echo again.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  readCompressionRequestHeader,
  withCompressionHeaderEcho,
} from "../../src/shared/utils/compressionHeaderEcho";

function makeRequest(headerValue: string | null): {
  headers: { get(name: string): string | null };
} {
  return {
    headers: {
      get(name: string) {
        if (name.toLowerCase() === "x-omniroute-compression") return headerValue;
        return null;
      },
    },
  };
}

describe("compressionHeaderEcho (#6422)", () => {
  it("reads the request header (case-insensitive, trimmed)", () => {
    assert.equal(readCompressionRequestHeader(makeRequest("engine:rtk")), "engine:rtk");
    assert.equal(readCompressionRequestHeader(makeRequest("  off  ")), "  off  ");
    assert.equal(readCompressionRequestHeader(makeRequest(null)), null);
    assert.equal(readCompressionRequestHeader(makeRequest("")), null);
    assert.equal(readCompressionRequestHeader(makeRequest("   ")), null);
  });

  it("echoes the request header value onto the response when missing", () => {
    const inner = new Response("body", { status: 200 });
    const wrapped = withCompressionHeaderEcho(inner, "engine:rtk");
    assert.equal(wrapped.headers.get("X-OmniRoute-Compression"), "engine:rtk; source=request-header");
    assert.equal(wrapped.status, 200);
  });

  it("normalizes off / default / engine:* to lowercase", () => {
    assert.equal(
      withCompressionHeaderEcho(new Response(""), "OFF").headers.get("X-OmniRoute-Compression"),
      "off; source=request-header"
    );
    assert.equal(
      withCompressionHeaderEcho(new Response(""), "Default").headers.get("X-OmniRoute-Compression"),
      "default; source=request-header"
    );
    assert.equal(
      withCompressionHeaderEcho(new Response(""), "Engine:Rtk").headers.get(
        "X-OmniRoute-Compression"
      ),
      "engine:rtk; source=request-header"
    );
  });

  it("preserves operator casing on named-combo values", () => {
    const wrapped = withCompressionHeaderEcho(new Response(""), "  MyCombo  ");
    assert.equal(wrapped.headers.get("X-OmniRoute-Compression"), "MyCombo; source=request-header");
  });

  it("never overwrites an existing X-OmniRoute-Compression header set by the inner pipeline", () => {
    const inner = new Response("", {
      headers: {
        "X-OmniRoute-Compression": "stacked; source=routing; tokens=100->42; rules: rtk-nl x2",
      },
    });
    const wrapped = withCompressionHeaderEcho(inner, "engine:rtk");
    assert.equal(
      wrapped.headers.get("X-OmniRoute-Compression"),
      "stacked; source=routing; tokens=100->42; rules: rtk-nl x2"
    );
  });

  it("is a no-op when the request did not supply the header", () => {
    const inner = new Response("", { headers: { "X-Other": "keep" } });
    const wrapped = withCompressionHeaderEcho(inner, null);
    assert.equal(wrapped, inner);
    assert.equal(wrapped.headers.get("X-OmniRoute-Compression"), null);
    assert.equal(wrapped.headers.get("X-Other"), "keep");
  });
});
