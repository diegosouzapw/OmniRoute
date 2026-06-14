/**
 * #2980 spin-off — free-plan Codex accounts can't run the server-side
 * `image_generation` hosted tool, but the Codex CLI injects it into every
 * Responses request, causing an upstream 400. Drop it for free-plan accounts
 * (mirrors CLIProxyAPI's isCodexFreePlanAuth); preserve it for paid plans.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { normalizeCodexTools, isCodexFreePlan } = await import("../../open-sse/executors/codex.ts");

test("isCodexFreePlan detects workspacePlanType === 'free' (case-insensitive)", () => {
  assert.equal(isCodexFreePlan({ workspacePlanType: "free" }), true);
  assert.equal(isCodexFreePlan({ workspacePlanType: "FREE" }), true);
  assert.equal(isCodexFreePlan({ workspacePlanType: "team" }), false);
  assert.equal(isCodexFreePlan({ workspacePlanType: "" }), false);
  assert.equal(isCodexFreePlan({}), false);
  assert.equal(isCodexFreePlan(undefined), false);
  assert.equal(isCodexFreePlan(null), false);
});

test("normalizeCodexTools drops image_generation when dropImageGeneration=true (free plan)", () => {
  const body: Record<string, unknown> = {
    tools: [
      { type: "image_generation", output_format: "png" },
      { type: "function", name: "foo", parameters: { type: "object" } },
    ],
  };
  normalizeCodexTools(body, { dropImageGeneration: true });
  const tools = body.tools as Array<{ type?: string; name?: string }>;
  assert.equal(
    tools.some((t) => t.type === "image_generation"),
    false,
    "image_generation must be dropped for free-plan accounts"
  );
  assert.equal(tools.length, 1, "the function tool must survive");
  assert.equal(tools[0].type, "function");
});

test("normalizeCodexTools preserves image_generation for paid plans (default / false)", () => {
  for (const opts of [undefined, { dropImageGeneration: false }]) {
    const body: Record<string, unknown> = {
      tools: [{ type: "image_generation", output_format: "png" }],
    };
    normalizeCodexTools(body, opts);
    const tools = body.tools as Array<{ type?: string }>;
    assert.equal(
      tools.some((t) => t.type === "image_generation"),
      true,
      "image_generation must be preserved for paid/unknown plans"
    );
  }
});
