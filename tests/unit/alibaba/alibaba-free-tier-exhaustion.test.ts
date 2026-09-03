/**
 * @file alibaba-free-tier-exhaustion.test.ts
 * @description Regression tests for Alibaba Model Studio free-tier drain handling.
 *
 * @changes
 * - [2026-07-24] [Composer] - Add free-tier exhaustion detection and combo exhaustion tests
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ALIBABA_FREE_DRAINED_LOCK_MS,
  filterAlibabaFreeTierModels,
  getAlibabaBillingMode,
  getAlibabaFreeDrainedModels,
  isAlibabaFreeQuotaExhaustedError,
  isAlibabaModelFreeDrained,
  isAlibabaModelStudioProvider,
  mergeAlibabaFreeDrainedModels,
} from "../../../open-sse/services/alibabaFreeTier.ts";
import {
  applyComboTargetExhaustion,
  type ComboExhaustionSets,
} from "../../../open-sse/services/combo/targetExhaustion.ts";
import {
  clearAllModelLockouts,
  isModelLocked,
  lockModel,
} from "../../../open-sse/services/accountFallback.ts";

const ALIBABA_FREE_QUOTA_ERROR =
  "The free quota has been exhausted. To continue accessing the model on a paid basis, please complete your payment information (or disable the use free tier only mode).";

test("detects Alibaba free-quota exhaustion phrasing", () => {
  assert.equal(isAlibabaFreeQuotaExhaustedError(ALIBABA_FREE_QUOTA_ERROR), true);
  assert.equal(isAlibabaFreeQuotaExhaustedError("free tier of the model has been exhausted"), true);
  assert.equal(isAlibabaFreeQuotaExhaustedError("Forbidden"), false);
});

test("defaults Alibaba billing mode to paid and supports free override", () => {
  assert.equal(getAlibabaBillingMode({}), "paid");
  assert.equal(getAlibabaBillingMode({ alibabaBillingMode: "free" }), "free");
});

test("mergeAlibabaFreeDrainedModels persists unique model ids", () => {
  const first = mergeAlibabaFreeDrainedModels({}, "qwen3.7-max-preview");
  const second = mergeAlibabaFreeDrainedModels(first, "qwen3.6-plus");
  const third = mergeAlibabaFreeDrainedModels(second, "qwen3.7-max-preview");

  assert.deepEqual(getAlibabaFreeDrainedModels(third), ["qwen3.7-max-preview", "qwen3.6-plus"]);
  assert.equal(isAlibabaModelFreeDrained("alibaba", third, "qwen3.7-max-preview"), true);
  assert.equal(isAlibabaModelFreeDrained("openai", third, "qwen3.7-max-preview"), false);
});

test("isAlibabaModelStudioProvider recognizes alibaba family ids", () => {
  assert.equal(isAlibabaModelStudioProvider("alibaba"), true);
  assert.equal(isAlibabaModelStudioProvider("alibaba-cn"), true);
  assert.equal(isAlibabaModelStudioProvider("ali"), true);
  assert.equal(isAlibabaModelStudioProvider("bailian-coding-plan"), false);
});

test("alibaba free-quota 403 does not exhaust the whole connection in combo routing", () => {
  const s: ComboExhaustionSets = {
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
  };
  const log = { info() {}, warn() {}, error() {}, debug() {} };
  const target = {
    kind: "model",
    executionKey: "ek",
    modelStr: "alibaba/qwen3.7-max-preview",
    provider: "alibaba",
    providerId: null,
    connectionId: "conn-1",
  } as Parameters<typeof applyComboTargetExhaustion>[0];

  const exhausted = applyComboTargetExhaustion(target, {
    result: { status: 403 },
    fallbackResult: {},
    errorText: ALIBABA_FREE_QUOTA_ERROR,
    rawModel: "qwen3.7-max-preview",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    sets: s,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info",
  });

  assert.equal(exhausted, false);
  assert.equal(s.exhaustedConnections.size, 0);
  assert.equal(s.exhaustedProviders.size, 0);
});

test("filterAlibabaFreeTierModels removes only persisted drained models", () => {
  const filtered = filterAlibabaFreeTierModels(["qwen3.7-max-preview", "qwen3.6-plus"], {
    alibabaFreeDrainedModels: ["qwen3.7-max-preview"],
  });
  assert.deepEqual(filtered, ["qwen3.6-plus"]);
});

test("permanent free-tier lockout uses a multi-year cooldown window", () => {
  clearAllModelLockouts();
  lockModel(
    "alibaba",
    "conn-1",
    "qwen3.7-max-preview",
    "free_quota_exhausted",
    ALIBABA_FREE_DRAINED_LOCK_MS
  );
  assert.equal(isModelLocked("alibaba", "conn-1", "qwen3.7-max-preview"), true);
  clearAllModelLockouts();
});
