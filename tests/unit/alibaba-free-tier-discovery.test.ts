/**
 * @file alibaba-free-tier-discovery.test.ts
 * @description Tests for probe-based Alibaba free-tier model classification.
 *
 * @changes
 * - [2026-07-25] [Composer] - Add Alibaba free-tier probe classification tests
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildAlibabaFreeTierFilterContext,
  classifyAlibabaFreeTierProbe,
  filterAlibabaFreeEligibleModels,
  isAlibabaFreeTierCapableModel,
  isAlibabaNativeFreeTierModelFamily,
  isAlibabaThirdPartyPaidModelFamily,
  mergeAlibabaFreeTierProbeResults,
} from "../../open-sse/services/alibabaFreeTierDiscovery.ts";

const FREE_TIER_ONLY_BODY = JSON.stringify({
  error: {
    code: "AllocationQuota.FreeTierOnly",
    message:
      'The free quota has been exhausted. To continue accessing the model on a paid basis, please disable the "use free tier only" mode in the management console.',
  },
});

test("classifyAlibabaFreeTierProbe: FreeTierOnly means capable but drained", () => {
  const result = classifyAlibabaFreeTierProbe("qwen3.6-plus", 403, FREE_TIER_ONLY_BODY);
  assert.equal(result.verdict, "capable_drained");
});

test("classifyAlibabaFreeTierProbe: native 200 means capable with remaining quota", () => {
  const result = classifyAlibabaFreeTierProbe("qwen3-coder-plus", 200, "{}");
  assert.equal(result.verdict, "capable_available");
});

test("classifyAlibabaFreeTierProbe: kimi 200 is paid-only third-party family", () => {
  const result = classifyAlibabaFreeTierProbe("kimi-k2.7-code", 200, "{}");
  assert.equal(result.verdict, "not_capable");
  assert.equal(isAlibabaThirdPartyPaidModelFamily("kimi-k2.7-code"), true);
  assert.equal(isAlibabaNativeFreeTierModelFamily("kimi-k2.7-code"), false);
});

test("mergeAlibabaFreeTierProbeResults persists capable and no-free-tier sets", () => {
  const merged = mergeAlibabaFreeTierProbeResults(
    { alibabaBillingMode: "free" },
    [
      { modelId: "qwen3.6-plus", verdict: "capable_drained", status: 403 },
      { modelId: "kimi-k2.7-code", verdict: "not_capable", status: 200 },
      { modelId: "qwen3-coder-plus", verdict: "capable_available", status: 200 },
    ],
    "free"
  );

  assert.ok(merged.alibabaFreeTierCapableModels?.includes("qwen3.6-plus"));
  assert.ok(merged.alibabaFreeTierCapableModels?.includes("qwen3-coder-plus"));
  assert.ok(merged.alibabaNoFreeTierModels?.includes("kimi-k2.7-code"));
  assert.ok(merged.alibabaFreeDrainedModels?.includes("qwen3.6-plus"));
});

test("filterAlibabaFreeEligibleModels excludes drained and paid-only families", () => {
  const filtered = filterAlibabaFreeEligibleModels(
    ["qwen3.6-plus", "qwen3-coder-plus", "kimi-k2.7-code", "glm-5.2"],
    {
      alibabaFreeDrainedModels: ["qwen3.6-plus"],
      alibabaNoFreeTierModels: ["kimi-k2.7-code"],
    }
  );
  assert.deepEqual(filtered, ["qwen3-coder-plus", "glm-5.2"]);
});

test("isAlibabaFreeTierCapableModel defaults native families to capable before probe", () => {
  assert.equal(isAlibabaFreeTierCapableModel("qwen3-coder-next", {}), true);
  assert.equal(isAlibabaFreeTierCapableModel("kimi-k2.7-code", {}), false);
  assert.equal(
    isAlibabaFreeTierCapableModel("kimi-k2.7-code", {
      alibabaNoFreeTierModels: ["kimi-k2.7-code"],
    }),
    false
  );
});

test("isAlibabaFreeTierCapableModel does not guess when console quota sync exists", () => {
  const psd = {
    alibabaFreeTierCapableModels: ["qwen3.6-plus"],
    alibabaNoFreeTierModels: ["qwen3.7-plus"],
    alibabaFreeTierQuotaLastSyncAt: "2026-07-25T00:00:00.000Z",
  };
  assert.equal(isAlibabaFreeTierCapableModel("qwen3.6-plus", psd), true);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3.7-plus", psd), false);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3-coder-next", psd), true);
  assert.equal(isAlibabaFreeTierCapableModel("totally-unknown-model", psd), false);
});

test("buildAlibabaFreeTierFilterContext blocks paid models on unsynced sibling keys", () => {
  const merged = buildAlibabaFreeTierFilterContext(
    [
      {
        id: "main",
        providerSpecificData: {
          alibabaBillingMode: "free",
          alibabaFreeTierQuotaLastSyncAt: "2026-07-25T00:00:00.000Z",
          alibabaFreeTierCapableModels: ["qwen3.6-plus"],
          alibabaNoFreeTierModels: ["glm-5.2-fast-preview"],
        },
      },
      {
        id: "main-2",
        providerSpecificData: {
          alibabaBillingMode: "free",
        },
      },
    ],
    "main-2"
  );

  assert.equal(isAlibabaFreeTierCapableModel("glm-5.2-fast-preview", merged), false);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3.6-plus", merged), true);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3.7-max", merged), false);
  assert.equal(isAlibabaFreeTierCapableModel("totally-unknown-model", merged), false);
});

test("buildAlibabaFreeTierFilterContext prefers sibling with populated free-model lists", () => {
  const merged = buildAlibabaFreeTierFilterContext(
    [
      {
        id: "main",
        providerSpecificData: {
          alibabaBillingMode: "free",
          alibabaFreeTierQuotaLastSyncAt: "2026-07-25T12:00:00.000Z",
          alibabaFreeTierCapableModels: [],
          alibabaNoFreeTierModels: [],
        },
      },
      {
        id: "main-2",
        providerSpecificData: {
          alibabaBillingMode: "free",
          alibabaFreeTierQuotaLastSyncAt: "2026-07-25T06:00:00.000Z",
          alibabaFreeTierCapableModels: ["qwen3.6-plus"],
          alibabaNoFreeTierModels: ["glm-5.2-fast-preview", "qwen3.7-max"],
        },
      },
    ],
    "main-2"
  );

  assert.equal(isAlibabaFreeTierCapableModel("glm-5.2-fast-preview", merged), false);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3.6-plus", merged), true);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3.7-max", merged), false);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3-coder-next", merged), true);
});

test("strictAllowlist blocks optimistic qwen/glm guessing for alibabafree combos", () => {
  const psd = {
    alibabaBillingMode: "free",
    alibabaFreeDrainedModels: [],
    alibabaNoFreeTierModels: [],
    alibabaFreeTierCapableModels: [],
  };

  assert.equal(isAlibabaFreeTierCapableModel("qwen-not-in-builtin-list", psd), true);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3.7-max", psd), false);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3.7-max", psd, { strictAllowlist: true }), false);
  assert.equal(
    isAlibabaFreeTierCapableModel(
      "qwen3.6-plus",
      { ...psd, alibabaFreeTierCapableModels: ["qwen3.6-plus"] },
      { strictAllowlist: true }
    ),
    true
  );
  assert.deepEqual(
    filterAlibabaFreeEligibleModels(["qwen3.7-max", "qwen3.6-plus", "glm-5.2-fast-preview"], psd, {
      strictAllowlist: true,
    }),
    ["qwen3.6-plus"]
  );
});
