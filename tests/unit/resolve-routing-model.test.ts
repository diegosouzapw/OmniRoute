// Regression guard for #4863: X-Route-Model header overrides body.model for routing.
// Also covers alignBodyModelWithRouting — without body alignment the post-guardrail
// path silently restores body.model and undoes the header (zai header + opencode body → 401).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  alignBodyModelWithRouting,
  resolveRoutingModel,
} from "../../src/sse/handlers/resolveRoutingModel.ts";

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

describe("alignBodyModelWithRouting (X-Route-Model body lockstep)", () => {
  it("rewrites body.model when it differs from the routing model", () => {
    const body = { model: "opencode-zen/gpt-5.4", messages: [{ role: "user", content: "hi" }] };
    const routed = resolveRoutingModel(req({ "x-route-model": "zai/glm-5.2" }), body);
    const result = alignBodyModelWithRouting(body, routed);
    assert.equal(routed, "zai/glm-5.2");
    assert.equal(result.aligned, true);
    assert.equal(result.previousModel, "opencode-zen/gpt-5.4");
    assert.equal(result.body.model, "zai/glm-5.2");
    // Original body object is not mutated
    assert.equal(body.model, "opencode-zen/gpt-5.4");
  });

  it("is a no-op when body.model already matches", () => {
    const body = { model: "zai/glm-5.2" };
    const result = alignBodyModelWithRouting(body, "zai/glm-5.2");
    assert.equal(result.aligned, false);
    assert.equal(result.body, body);
  });

  it("is a no-op when routing model is empty", () => {
    const body = { model: "opencode-zen/gpt-5.4" };
    const result = alignBodyModelWithRouting(body, null);
    assert.equal(result.aligned, false);
    assert.equal(result.body.model, "opencode-zen/gpt-5.4");
  });
});
