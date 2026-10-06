import assert from "node:assert/strict";
import test from "node:test";

import { OPENCODE_ZEN_GO_SHARED_MODELS } from "../../open-sse/config/opencodeZenGoSharedModels.ts";
import { opencode_zenProvider } from "../../open-sse/config/providers/registry/opencode/zen/index.ts";
import { opencode_goProvider } from "../../open-sse/config/providers/registry/opencode/go/index.ts";

test("every OPENCODE_ZEN_GO_SHARED_MODELS entry is present, unmodified, exactly once in opencode-zen", () => {
  for (const shared of OPENCODE_ZEN_GO_SHARED_MODELS) {
    const matches = opencode_zenProvider.models.filter((m) => m.id === shared.id);
    assert.equal(matches.length, 1, `${shared.id} must appear exactly once in opencode-zen`);
    assert.deepEqual(matches[0], shared, `${shared.id} must match the shared definition exactly`);
  }
});

test("every OPENCODE_ZEN_GO_SHARED_MODELS entry is present, unmodified, exactly once in opencode-go", () => {
  for (const shared of OPENCODE_ZEN_GO_SHARED_MODELS) {
    const matches = opencode_goProvider.models.filter((m) => m.id === shared.id);
    assert.equal(matches.length, 1, `${shared.id} must appear exactly once in opencode-go`);
    assert.deepEqual(matches[0], shared, `${shared.id} must match the shared definition exactly`);
  }
});

test("OPENCODE_ZEN_GO_SHARED_MODELS is frozen (no accidental cross-registry mutation)", () => {
  assert.ok(Object.isFrozen(OPENCODE_ZEN_GO_SHARED_MODELS));
});

test("referenced non-shared model ids remain present", () => {
  const goIds = new Set(opencode_goProvider.models.map((m) => m.id));
  const zenIds = new Set(opencode_zenProvider.models.map((m) => m.id));
  for (const id of ["minimax-m3", "glm-5.1"]) {
    assert.ok(goIds.has(id) || zenIds.has(id), `expected ${id} in go or zen`);
  }
});

test("models[0] is the intended dashboard default", () => {
  assert.equal(opencode_goProvider.models[0].id, "glm-5.2");
  assert.equal(opencode_zenProvider.models[0].id, "big-pickle");
});
