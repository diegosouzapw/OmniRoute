import assert from "node:assert/strict";
import { test } from "node:test";

import {
  parseKimiCodingModels,
  PROVIDER_MODELS_CONFIG,
} from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { normalizeDiscoveredModels } from "../../src/lib/providerModels/modelDiscovery.ts";

const response = {
  data: [
    {
      id: "kimi-for-coding",
      display_name: "Kimi for Coding",
      protocol: "anthropic",
      context_length: 262144,
      supports_reasoning: false,
      supports_thinking_type: "only",
      think_efforts: {
        support: true,
        valid_efforts: ["low", "medium", "high"],
        default_effort: "medium",
      },
      supports_image_in: true,
      supports_video_in: true,
      supports_tool_use: true,
    },
    {
      id: "kimi-fast",
      supports_reasoning: true,
      supports_thinking_type: "no",
      think_efforts: {
        support: false,
        valid_efforts: ["high"],
        default_effort: "high",
      },
      supports_tool_use: false,
    },
  ],
};

test("Kimi Code discovery maps protocol and current thinking metadata", () => {
  assert.deepEqual(parseKimiCodingModels(response), [
    {
      id: "kimi-for-coding",
      name: "Kimi for Coding",
      owned_by: "kimi-code",
      targetFormat: "claude",
      upstreamProtocol: "anthropic",
      context_length: 262144,
      supportsThinking: true,
      alwaysThinking: true,
      supportedThinkingEfforts: ["low", "medium", "high"],
      defaultThinkingEffort: "medium",
      supportsVision: true,
      supportsVideo: true,
      supportsTools: true,
    },
    {
      id: "kimi-fast",
      name: "kimi-fast",
      owned_by: "kimi-code",
      targetFormat: "openai",
      upstreamProtocol: "kimi",
      supportsThinking: false,
      supportsVision: false,
      supportsVideo: false,
      supportsTools: false,
    },
  ]);
});

test("Kimi Code discovery imports k3 with its current max-effort contract", () => {
  const discovered = parseKimiCodingModels({
    data: [
      {
        id: "k3",
        display_name: "Kimi K3",
        protocol: "anthropic",
        context_length: 1048576,
        supports_thinking_type: "both",
        think_efforts: {
          support: true,
          valid_efforts: ["max"],
          default_effort: "max",
        },
        supports_image_in: true,
        supports_tool_use: true,
      },
    ],
  });

  assert.deepEqual(discovered, [
    {
      id: "k3",
      name: "Kimi K3",
      owned_by: "kimi-code",
      targetFormat: "claude",
      upstreamProtocol: "anthropic",
      context_length: 1048576,
      supportsThinking: true,
      supportedThinkingEfforts: ["max"],
      defaultThinkingEffort: "max",
      supportsVision: true,
      supportsVideo: false,
      supportsTools: true,
    },
  ]);
});

test("Kimi Code discovery uses OAuth CLI identity while the hidden legacy path keeps x-api-key", () => {
  const oauthHeaders = PROVIDER_MODELS_CONFIG["kimi-coding"].buildHeaders?.("oauth-token", {
    providerSpecificData: {
      deviceId: "123456781234123412341234567890ab",
      deviceName: "test-host",
      deviceModel: "test-model",
      osVersion: "test-os",
    },
  });
  assert.equal(oauthHeaders?.Authorization, "Bearer oauth-token");
  assert.equal(oauthHeaders?.Accept, "application/json");
  assert.equal(oauthHeaders?.["X-Msh-Platform"], "kimi_code_cli");
  assert.equal(oauthHeaders?.["X-Msh-Version"], "0.26.0");
  assert.equal(oauthHeaders?.["X-Msh-Device-Id"], "12345678-1234-1234-1234-1234567890ab");
  assert.equal(oauthHeaders?.["User-Agent"], "kimi-code-cli/0.26.0");

  const primaryApiKeyHeaders = PROVIDER_MODELS_CONFIG["kimi-coding"].buildHeaders?.("api-key", {
    authType: "apikey",
  });
  assert.deepEqual(primaryApiKeyHeaders, {
    Accept: "application/json",
    "x-api-key": "api-key",
  });

  const legacyHeaders = PROVIDER_MODELS_CONFIG["kimi-coding-apikey"].buildHeaders?.("api-key");
  assert.deepEqual(legacyHeaders, {
    Accept: "application/json",
    "x-api-key": "api-key",
  });
});

test("Kimi Code metadata survives discovery normalization", () => {
  const normalized = normalizeDiscoveredModels(parseKimiCodingModels(response));
  assert.deepEqual(normalized[0], {
    id: "kimi-for-coding",
    name: "Kimi for Coding",
    source: "imported",
    targetFormat: "claude",
    upstreamProtocol: "anthropic",
    supportedThinkingEfforts: ["low", "medium", "high"],
    defaultThinkingEffort: "medium",
    inputTokenLimit: 262144,
    supportsThinking: true,
    alwaysThinking: true,
    supportsTools: true,
    supportsVideo: true,
    supportsVision: true,
  });
  assert.equal(normalized[1]?.supportsThinking, false);
  assert.equal(normalized[1]?.supportsTools, false);
});
