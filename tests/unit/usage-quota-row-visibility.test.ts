import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  filterQuotasByVisibility,
  getHiddenQuotaRows,
  getQuotaVisibilityKey,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx";

describe("provider quota visibility (upstream 9router#2371 port)", () => {
  const quotas = [
    { modelKey: "gemini-pro-agent", name: "Gemini 3.1 Pro (High)", used: 200, total: 1000 },
    {
      modelKey: "claude-opus-4-6-thinking",
      name: "Claude Opus 4.6 (Thinking)",
      used: 100,
      total: 1000,
    },
  ];

  it("derives a stable key preferring modelKey over name", () => {
    assert.equal(getQuotaVisibilityKey(quotas[0]), "gemini-pro-agent");
    assert.equal(getQuotaVisibilityKey({ name: "no-model-key" }), "no-model-key");
    assert.equal(getQuotaVisibilityKey(null), "");
    assert.equal(getQuotaVisibilityKey(undefined), "");
  });

  it("shows all quotas by default (no visibility config)", () => {
    assert.equal(filterQuotasByVisibility("antigravity", quotas, {}).length, 2);
    assert.deepEqual(getHiddenQuotaRows("antigravity", quotas, {}), []);
  });

  it("hides the configured provider row and reports it separately", () => {
    const visibility = { antigravity: { hidden: ["claude-opus-4-6-thinking"] } };

    const visible = filterQuotasByVisibility("antigravity", quotas, visibility);
    const hidden = getHiddenQuotaRows("antigravity", quotas, visibility);

    assert.deepEqual(
      visible.map((q) => q.modelKey),
      ["gemini-pro-agent"]
    );
    assert.deepEqual(
      hidden.map((q) => q.modelKey),
      ["claude-opus-4-6-thinking"]
    );
  });

  it("never applies one provider's hidden list to another provider", () => {
    const visibility = { codex: { hidden: ["gemini-pro-agent"] } };
    assert.equal(filterQuotasByVisibility("antigravity", quotas, visibility).length, 2);
    assert.deepEqual(getHiddenQuotaRows("antigravity", quotas, visibility), []);
  });

  it("returns an empty array for non-array quotas input", () => {
    assert.deepEqual(filterQuotasByVisibility("antigravity", undefined as unknown as [], {}), []);
    assert.deepEqual(getHiddenQuotaRows("antigravity", undefined as unknown as [], {}), []);
  });
});
