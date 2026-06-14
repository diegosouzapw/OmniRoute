// Regression guard for #4863: X-Route-Model header overrides body.model for routing.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveRoutingModel } from "../../src/sse/handlers/resolveRoutingModel.ts";

function req(headers: Record<string, string>) {
  return { headers: { get: (n: string) => headers[n.toLowerCase()] ?? null } };
}

describe("resolveRoutingModel (#4863)", () => {
  it("uses body.model when no X-Route-Model header is present", () => {
    assert.equal(resolveRoutingModel(req({}), { model: "gpt-5.3-codex" }), "gpt-5.3-codex");
  });

  it("X-Route-Model header overrides body.model", () => {
    assert.equal(
      resolveRoutingModel(req({ "x-route-model": "my-combo" }), { model: "codex/gpt-5.3-codex" }),
      "my-combo"
    );
  });

  it("trims surrounding whitespace from the header value", () => {
    assert.equal(
      resolveRoutingModel(req({ "x-route-model": "  alias-x  " }), { model: "fallback" }),
      "alias-x"
    );
  });

  it("falls back to body.model when the header is empty/whitespace-only", () => {
    assert.equal(resolveRoutingModel(req({ "x-route-model": "   " }), { model: "fallback" }), "fallback");
  });
});
