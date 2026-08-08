import assert from "node:assert/strict";
import test from "node:test";

import { devin_cliProvider } from "../../open-sse/config/providers/registry/devin-cli/index.ts";
import { devin_desktopProvider } from "../../open-sse/config/providers/registry/devin-desktop/index.ts";
import { DEVIN_MODEL_CATALOG } from "../../open-sse/config/providers/registry/devin/catalog.ts";

test("Devin CLI and Desktop use the shared catalog without duplicate model ids", () => {
  const ids = DEVIN_MODEL_CATALOG.map((model) => model.id);

  assert.equal(devin_cliProvider.models, DEVIN_MODEL_CATALOG);
  assert.equal(devin_desktopProvider.models, DEVIN_MODEL_CATALOG);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every((id) => !id.toLowerCase().includes("byok")));
});

test("Devin CLI catalog includes the refreshed native model ids", () => {
  const ids = new Set(DEVIN_MODEL_CATALOG.map((model) => model.id));

  for (const id of [
    "swe-1-7-lightning",
    "claude-5-fable-max",
    "gpt-5-6-sol-max",
    "gpt-5-5-high",
    "glm-5-2-max-1m",
    "claude-opus-5-low",
    "claude-opus-5-medium",
    "claude-opus-5-high",
    "claude-opus-5-xhigh",
    "claude-opus-5-max",
    "gemini-3-6-flash-minimal",
    "gemini-3-6-flash-low",
    "gemini-3-6-flash-medium",
    "gemini-3-6-flash-high",
    "kimi-k3-low",
    "kimi-k3-high",
    "kimi-k3-max",
    "inkling-none",
    "inkling-low",
    "inkling-medium",
    "inkling-high",
    "inkling-xhigh",
    "inkling-max",
  ]) {
    assert.ok(ids.has(id), `expected refreshed Devin model id: ${id}`);
  }
});

test("Devin CLI catalog does not expose retired dotted or review model ids", () => {
  const ids = new Set(DEVIN_MODEL_CATALOG.map((model) => model.id));

  for (const id of ["swe-1.6-fast", "swe-1.6", "claude-opus-4.7-review"]) {
    assert.equal(ids.has(id), false, `retired Devin model id must stay absent: ${id}`);
  }
});
