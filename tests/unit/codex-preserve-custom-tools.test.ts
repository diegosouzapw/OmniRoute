/**
 * Port of upstream decolua/9router commit ed68bced:
 * "fix(codex): preserve custom tools during request normalization"
 *
 * Responses-native freeform tools shaped as { type: "custom", name, format }
 * (e.g. grammar-backed apply_patch) must survive `normalizeCodexTools` and
 * reach the upstream Codex Responses API intact, even when the request is
 * NOT a native Codex passthrough (i.e. preserveCustomTools !== true).
 *
 * Pre-fix behavior: such tools were dropped on non-native paths, breaking
 * clients like Cursor / freeform-tool plugins that pre-normalize to Responses
 * shape before reaching OmniRoute.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { normalizeCodexTools } = await import("../../open-sse/executors/codex.ts");

test("normalizeCodexTools preserves Responses-native custom freeform tools without preserveCustomTools flag", () => {
  const body: Record<string, unknown> = {
    model: "gpt-5.5",
    tools: [
      {
        type: "custom",
        name: "apply_patch",
        description: "patch",
        format: { type: "grammar", syntax: "lark", definition: "start: /.+/" },
      },
      {
        type: "function",
        name: "plain_fn",
        description: "plain",
        parameters: { type: "object", properties: {} },
      },
    ],
  };

  // NOTE: no preserveCustomTools option — simulating a non-native passthrough
  // request that has already been pre-shaped to the Responses API.
  normalizeCodexTools(body);

  const tools = body.tools as Array<Record<string, unknown>>;
  assert.equal(tools.length, 2, "custom freeform tool must not be dropped");
  assert.equal(tools[0].type, "custom");
  assert.equal(tools[0].name, "apply_patch");
  assert.deepEqual(tools[0].format, {
    type: "grammar",
    syntax: "lark",
    definition: "start: /.+/",
  });
  assert.equal(tools[1].type, "function");
  assert.equal(tools[1].name, "plain_fn");
});

test("normalizeCodexTools still drops anonymous custom tools (no name)", () => {
  const body: Record<string, unknown> = {
    model: "gpt-5.5",
    tools: [
      {
        type: "custom",
        // no name → invalid for upstream, must be dropped
        format: { type: "grammar", syntax: "lark", definition: "start: /.+/" },
      },
    ],
  };

  normalizeCodexTools(body);

  assert.deepEqual(body.tools, [], "custom tool without a name must still be dropped");
});
