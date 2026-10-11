/**
 * #14587 — /v1/combos must identify which member blocks a combo's `multimodal`
 * capability: every projected model step carries a per-member `supportsVision`,
 * and the invariant `multimodal === every(member.supportsVision === true)` holds.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { projectCombo } = await import("../../src/app/api/v1/combos/projectCombo.ts");

const VISION: Record<string, boolean | null> = {
  "acme/sees": true,
  "acme/blind": false,
  "acme/unknown": null,
};
const resolveCapabilities = (model: string) => ({
  supportsVision: model in VISION ? VISION[model] : null,
  reasoning: false,
});

function combo(models: string[]) {
  return {
    name: "c",
    strategy: "priority",
    models: models.map((model) => ({ kind: "model", model })),
  };
}

test("#14587 model steps expose per-member supportsVision when capabilities are requested", () => {
  const out = projectCombo(combo(["acme/sees", "acme/blind", "acme/unknown"]), {
    includeCapabilities: true,
    resolveCapabilities,
  });
  assert.deepEqual(
    out?.models.map((m) => m.supportsVision),
    [true, false, null]
  );
  assert.equal(out?.capabilities?.multimodal, false);
});

test("#14587 invariant: multimodal === every member supportsVision === true", () => {
  for (const ids of [
    ["acme/sees"],
    ["acme/sees", "acme/sees"],
    ["acme/sees", "acme/blind"],
    ["acme/sees", "acme/unknown"],
  ]) {
    const out = projectCombo(combo(ids), { includeCapabilities: true, resolveCapabilities });
    const every = out!.models.every((m) => m.supportsVision === true);
    assert.equal(out!.capabilities!.multimodal, every, ids.join(","));
  }
});

test("#14587 supportsVision is omitted without includeCapabilities", () => {
  const out = projectCombo(combo(["acme/sees"]));
  assert.equal("supportsVision" in out!.models[0], false);
});
