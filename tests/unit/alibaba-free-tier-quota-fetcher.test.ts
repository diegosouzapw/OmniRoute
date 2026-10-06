/**
 * @file alibaba-free-tier-quota-fetcher.test.ts
 * @description Tests for Alibaba console free-tier quota API parsing and classification.
 *
 * @changes
 * - [2026-07-25] [Composer] - Add multimodal and audio quota classification tests
 * - [2026-07-25] [Composer] - Add console free-tier quota fetcher tests
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  classifyAlibabaAudioFreeTierQuotaEntries,
  classifyAlibabaFreeTierQuotaEntries,
  classifyAlibabaFreeTierQuotaEntry,
  classifyAlibabaMultimodalFreeTierQuotaEntries,
  classifyAlibabaVisionFreeTierQuotaEntries,
  isAlibabaQuotaValidityExpired,
  mergeAlibabaFreeTierQuotaClassification,
  normalizeAlibabaConsoleCookie,
  parseAlibabaFreeTierQuotaEntries,
  applyAlibabaSharedFreeTierEligibility,
  buildAlibabaFreeTierTextFilterContext,
  extractAlibabaSharedFreeTierEligibility,
  isAlibabaFreeTierAudioCapableModel,
  isAlibabaFreeTierMultimodalCapableModel,
  isAlibabaFreeTierVisionCapableModel,
} from "../../open-sse/services/alibabaFreeTierQuotaFetcher.ts";
import { isAlibabaFreeTierCapableModel } from "../../open-sse/services/alibabaFreeTierDiscovery.ts";
import {
  isDashscopeAudioModelId,
  isDashscopeMultimodalModelId,
  isDashscopeVisionModelId,
} from "../../open-sse/services/dashscopeTextModels.ts";

const SAMPLE_CONSOLE_RESPONSE = {
  code: "200",
  data: {
    DataV2: {
      data: {
        data: {
          freeTierQuotas: [
            {
              quotaInitTotal: 1000000,
              quotaValidityPeriod: 1830297600000,
              freeTierOnly: true,
              quotaTotalPercentage: 99.98,
              model: "qwen3.6-plus",
              quotaTotal: 999795,
              quotaStatus: "VALID",
            },
            {
              freeTierOnly: false,
              model: "qwen3.7-plus",
              quotaStatus: "UNKNOWN",
            },
            {
              freeTierOnly: false,
              model: "kimi-k2.7-code",
              quotaStatus: "UNKNOWN",
            },
            {
              freeTierOnly: true,
              model: "glm-5.2",
              quotaStatus: "UNKNOWN",
            },
            {
              quotaInitTotal: 0,
              freeTierOnly: false,
              quotaTotalPercentage: 0,
              model: "glm-5.2-fast-preview",
              quotaTotal: 0,
              quotaStatus: "VALID",
            },
            {
              quotaInitTotal: 1000000,
              freeTierOnly: true,
              quotaTotalPercentage: 100,
              model: "qwen3-vl-plus",
              quotaTotal: 1000000,
              quotaStatus: "VALID",
            },
          ],
        },
        success: true,
      },
    },
  },
};

const SAMPLE_VISION_CONSOLE_RESPONSE = {
  code: "200",
  data: {
    DataV2: {
      data: {
        data: {
          freeTierQuotas: [
            {
              quotaInitTotal: 50,
              freeTierOnly: false,
              quotaTotalPercentage: 100,
              model: "wan2.7-t2v",
              quotaTotal: 50,
              quotaStatus: "VALID",
            },
            {
              quotaInitTotal: 100,
              freeTierOnly: false,
              quotaTotalPercentage: 100,
              model: "qwen-image-2.0-pro",
              quotaTotal: 100,
              quotaStatus: "VALID",
            },
            {
              quotaInitTotal: 0,
              freeTierOnly: false,
              quotaTotalPercentage: 0,
              model: "qwen-image-3.0-pro",
              quotaTotal: 0,
              quotaStatus: "VALID",
            },
            {
              quotaInitTotal: 1000000,
              freeTierOnly: true,
              quotaTotalPercentage: 100,
              model: "qwen3.6-plus",
              quotaTotal: 999795,
              quotaStatus: "VALID",
            },
          ],
        },
        success: true,
      },
    },
  },
};

const SAMPLE_MULTIMODAL_CONSOLE_RESPONSE = {
  code: "200",
  data: {
    DataV2: {
      data: {
        data: {
          freeTierQuotas: [
            {
              quotaInitTotal: 1000000,
              freeTierOnly: true,
              model: "qwen3.5-omni-plus",
              quotaTotal: 1000000,
              quotaStatus: "VALID",
            },
            {
              quotaInitTotal: 0,
              freeTierOnly: false,
              model: "qwen-omni-turbo-latest",
              quotaTotal: 0,
              quotaStatus: "VALID",
            },
            {
              quotaInitTotal: 36000,
              freeTierOnly: true,
              model: "qwen3-asr-flash",
              quotaTotal: 36000,
              quotaStatus: "VALID",
            },
          ],
        },
        success: true,
      },
    },
  },
};

const SAMPLE_AUDIO_CONSOLE_RESPONSE = {
  code: "200",
  data: {
    DataV2: {
      data: {
        data: {
          freeTierQuotas: [
            {
              quotaInitTotal: 36000,
              freeTierOnly: true,
              model: "qwen3-asr-flash",
              quotaTotal: 36000,
              quotaStatus: "VALID",
            },
            {
              quotaInitTotal: 10000,
              freeTierOnly: true,
              model: "qwen3-tts-flash",
              quotaTotal: 10000,
              quotaStatus: "VALID",
            },
            {
              quotaInitTotal: 0,
              freeTierOnly: false,
              model: "voice-enrollment",
              quotaTotal: 0,
              quotaStatus: "VALID",
            },
            {
              quotaInitTotal: 1000000,
              freeTierOnly: true,
              model: "qwen3.5-omni-plus",
              quotaTotal: 1000000,
              quotaStatus: "VALID",
            },
          ],
        },
        success: true,
      },
    },
  },
};

test("parseAlibabaFreeTierQuotaEntries reads console payload", () => {
  const entries = parseAlibabaFreeTierQuotaEntries(SAMPLE_CONSOLE_RESPONSE);
  assert.equal(entries.length, 6);
  assert.equal(entries[0].model, "qwen3.6-plus");
  assert.equal(entries[0].freeTierOnly, true);
});

test("classifyAlibabaFreeTierQuotaEntry maps console flags", () => {
  assert.equal(
    classifyAlibabaFreeTierQuotaEntry({
      model: "qwen3.6-plus",
      freeTierOnly: true,
      quotaStatus: "VALID",
      quotaTotal: 100,
    }),
    "available"
  );
  assert.equal(
    classifyAlibabaFreeTierQuotaEntry({
      model: "glm-5.2",
      freeTierOnly: true,
      quotaStatus: "UNKNOWN",
    }),
    "capable_unknown"
  );
  assert.equal(
    classifyAlibabaFreeTierQuotaEntry({
      model: "qwen3.7-plus",
      freeTierOnly: false,
      quotaStatus: "UNKNOWN",
    }),
    "not_capable"
  );
  assert.equal(
    classifyAlibabaFreeTierQuotaEntry({
      model: "glm-5.2-fast-preview",
      freeTierOnly: false,
      quotaStatus: "VALID",
      quotaTotal: 0,
      quotaInitTotal: 0,
    }),
    "not_capable"
  );
});

test("classifyAlibabaFreeTierQuotaEntry treats expired quotaValidityPeriod as not_capable", () => {
  assert.equal(
    classifyAlibabaFreeTierQuotaEntry(
      {
        model: "qwen3.6-plus",
        freeTierOnly: true,
        quotaStatus: "VALID",
        quotaTotal: 100,
        quotaValidityPeriod: Date.now() - 60_000,
      },
      Date.now()
    ),
    "not_capable"
  );
  assert.equal(
    isAlibabaQuotaValidityExpired({
      model: "qwen3.6-plus",
      freeTierOnly: true,
      quotaStatus: "VALID",
      quotaValidityPeriod: Date.now() + 60_000,
    }),
    false
  );
});

test("classifyAlibabaFreeTierQuotaEntries filters text-only models for alibabafree", () => {
  const classification = classifyAlibabaFreeTierQuotaEntries(
    parseAlibabaFreeTierQuotaEntries(SAMPLE_CONSOLE_RESPONSE),
    { textOnly: true }
  );

  assert.ok(classification.capableModels.includes("qwen3.6-plus"));
  assert.ok(classification.capableModels.includes("glm-5.2"));
  assert.ok(classification.noFreeTierModels.includes("qwen3.7-plus"));
  assert.ok(classification.noFreeTierModels.includes("kimi-k2.7-code"));
  assert.ok(classification.noFreeTierModels.includes("glm-5.2-fast-preview"));
  assert.equal(classification.capableModels.includes("qwen3-vl-plus"), false);
});

test("classifyAlibabaVisionFreeTierQuotaEntries includes promo vision quota models", () => {
  const classification = classifyAlibabaVisionFreeTierQuotaEntries(
    parseAlibabaFreeTierQuotaEntries(SAMPLE_VISION_CONSOLE_RESPONSE)
  );

  assert.ok(classification.capableModels.includes("wan2.7-t2v"));
  assert.ok(classification.capableModels.includes("qwen-image-2.0-pro"));
  assert.ok(classification.drainedModels.includes("qwen-image-3.0-pro"));
  assert.equal(classification.capableModels.includes("qwen-image-3.0-pro"), false);
  assert.equal(classification.capableModels.includes("qwen3.6-plus"), false);
});

test("isDashscopeVisionModelId recognizes wan and qwen-image families", () => {
  assert.equal(isDashscopeVisionModelId("wan2.7-t2v"), true);
  assert.equal(isDashscopeVisionModelId("qwen-image-plus"), true);
  assert.equal(isDashscopeVisionModelId("qwen3.6-plus"), false);
});

test("classifyAlibabaMultimodalFreeTierQuotaEntries requires freeTierOnly omni models", () => {
  const classification = classifyAlibabaMultimodalFreeTierQuotaEntries(
    parseAlibabaFreeTierQuotaEntries(SAMPLE_MULTIMODAL_CONSOLE_RESPONSE)
  );

  assert.ok(classification.capableModels.includes("qwen3.5-omni-plus"));
  assert.ok(classification.noFreeTierModels.includes("qwen-omni-turbo-latest"));
  assert.equal(classification.capableModels.includes("qwen3-asr-flash"), false);
});

test("classifyAlibabaAudioFreeTierQuotaEntries includes asr and tts free-tier models", () => {
  const classification = classifyAlibabaAudioFreeTierQuotaEntries(
    parseAlibabaFreeTierQuotaEntries(SAMPLE_AUDIO_CONSOLE_RESPONSE)
  );

  assert.ok(classification.capableModels.includes("qwen3-asr-flash"));
  assert.ok(classification.capableModels.includes("qwen3-tts-flash"));
  assert.ok(classification.noFreeTierModels.includes("voice-enrollment"));
  assert.equal(classification.capableModels.includes("qwen3.5-omni-plus"), false);
});

test("isDashscopeMultimodalModelId and isDashscopeAudioModelId classify model families", () => {
  assert.equal(isDashscopeMultimodalModelId("qwen3.5-omni-plus"), true);
  assert.equal(isDashscopeMultimodalModelId("qwen3-asr-flash"), false);
  assert.equal(isDashscopeAudioModelId("qwen3-tts-flash"), true);
  assert.equal(isDashscopeAudioModelId("cosyvoice-v3-flash"), true);
  assert.equal(isDashscopeAudioModelId("qwen3.5-omni-plus"), false);
});

test("mergeAlibabaFreeTierQuotaClassification makes discovery authoritative", () => {
  const text = classifyAlibabaFreeTierQuotaEntries(
    parseAlibabaFreeTierQuotaEntries(SAMPLE_CONSOLE_RESPONSE),
    { textOnly: true }
  );
  const vision = classifyAlibabaVisionFreeTierQuotaEntries(
    parseAlibabaFreeTierQuotaEntries(SAMPLE_VISION_CONSOLE_RESPONSE)
  );
  const multimodal = classifyAlibabaMultimodalFreeTierQuotaEntries(
    parseAlibabaFreeTierQuotaEntries(SAMPLE_MULTIMODAL_CONSOLE_RESPONSE)
  );
  const audio = classifyAlibabaAudioFreeTierQuotaEntries(
    parseAlibabaFreeTierQuotaEntries(SAMPLE_AUDIO_CONSOLE_RESPONSE)
  );
  const merged = mergeAlibabaFreeTierQuotaClassification(
    { alibabaBillingMode: "free" },
    {
      text,
      vision,
      multimodal,
      audio,
      entries: [...text.entries, ...vision.entries, ...multimodal.entries, ...audio.entries],
    }
  );

  assert.equal(merged.alibabaFreeTierDiscoverySource, "console-quota-api");
  assert.equal(typeof merged.alibabaFreeTierQuotaLastSyncAt, "string");
  assert.ok(merged.alibabaFreeTierVisionCapableModels?.includes("wan2.7-t2v"));
  assert.equal(merged.alibabaFreeTierVisionCapableModels?.includes("qwen-image-3.0-pro"), false);
  assert.ok(merged.alibabaFreeTierMultimodalCapableModels?.includes("qwen3.5-omni-plus"));
  assert.ok(merged.alibabaFreeTierAudioCapableModels?.includes("qwen3-tts-flash"));

  assert.equal(isAlibabaFreeTierCapableModel("qwen3.6-plus", merged), true);
  assert.equal(isAlibabaFreeTierCapableModel("qwen3.7-plus", merged), false);
  assert.equal(isAlibabaFreeTierVisionCapableModel("wan2.7-t2v", merged), true);
  assert.equal(isAlibabaFreeTierVisionCapableModel("qwen-image-3.0-pro", merged), false);
  assert.equal(isAlibabaFreeTierMultimodalCapableModel("qwen3.5-omni-plus", merged), true);
  assert.equal(isAlibabaFreeTierAudioCapableModel("qwen3-tts-flash", merged), true);
});

test("mergeAlibabaFreeTierQuotaClassification preserves text lists on partial category snapshot", () => {
  const merged = mergeAlibabaFreeTierQuotaClassification(
    {
      alibabaBillingMode: "free",
      alibabaFreeTierCapableModels: ["qwen3.6-plus"],
      alibabaNoFreeTierModels: ["qwen3.7-max"],
    },
    {
      text: { capableModels: [], noFreeTierModels: [], drainedModels: [], entries: [] },
      vision: {
        capableModels: ["wan2.7-t2v"],
        noFreeTierModels: [],
        drainedModels: [],
        entries: [],
      },
      multimodal: { capableModels: [], noFreeTierModels: [], drainedModels: [], entries: [] },
      audio: { capableModels: [], noFreeTierModels: [], drainedModels: [], entries: [] },
      entries: [],
    }
  );

  assert.deepEqual(merged.alibabaFreeTierCapableModels, ["qwen3.6-plus"]);
  assert.deepEqual(merged.alibabaNoFreeTierModels, ["qwen3.7-max"]);
  assert.deepEqual(merged.alibabaFreeTierVisionCapableModels, ["wan2.7-t2v"]);
});

test("buildAlibabaFreeTierTextFilterContext uses canonical sibling free-model lists", () => {
  const context = buildAlibabaFreeTierTextFilterContext(
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
          alibabaNoFreeTierModels: ["qwen3.7-max", "glm-5.2-fast-preview"],
        },
      },
    ],
    "main"
  );

  assert.ok((context.alibabaFreeTierCapableModels as string[]).includes("qwen3.6-plus"));
  assert.equal((context.alibabaFreeTierCapableModels as string[]).includes("glm-5.2"), false);
  assert.ok((context.alibabaNoFreeTierModels as string[]).includes("qwen3.7-max"));
  assert.ok((context.alibabaNoFreeTierModels as string[]).includes("glm-5.2-fast-preview"));
});

test("shared free-tier eligibility copies lists but preserves per-connection drained models", () => {
  const shared = extractAlibabaSharedFreeTierEligibility({
    alibabaFreeTierCapableModels: ["qwen3.6-plus"],
    alibabaNoFreeTierModels: ["qwen3.7-max"],
    alibabaFreeTierQuotaLastSyncAt: "2026-07-25T00:00:00.000Z",
  });
  const applied = applyAlibabaSharedFreeTierEligibility(
    {
      alibabaBillingMode: "free",
      alibabaFreeDrainedModels: ["qwen3.6-plus"],
    },
    shared
  );

  assert.deepEqual(applied.alibabaFreeTierCapableModels, ["qwen3.6-plus"]);
  assert.deepEqual(applied.alibabaFreeDrainedModels, ["qwen3.6-plus"]);
});

test("normalizeAlibabaConsoleCookie accepts ticket-only paste", () => {
  assert.equal(normalizeAlibabaConsoleCookie("abc123ticket"), "login_aliyunid_ticket=abc123ticket");
  assert.equal(
    normalizeAlibabaConsoleCookie("login_aliyunid_ticket=abc123ticket; cna=xyz"),
    "login_aliyunid_ticket=abc123ticket; cna=xyz"
  );
});
