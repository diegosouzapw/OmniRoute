/**
 * bailian-coding-plan ("Alibaba Token Plan") pointed inference and validation at two
 * DIFFERENT hosts.
 *
 * #10290 moved the open-sse registry to the Token Plan host, but the dashboard's key
 * validation resolves its URL through ALIBABA_PROVIDER_REGION_ENDPOINTS, which still held
 * the legacy Coding Plan host. Verified live 2026-08-18 with a valid Token Plan key:
 *
 *   coding-intl.dashscope.aliyuncs.com   → 401 invalid_api_key
 *   token-plan.ap-southeast-1.maas...    → 429 Throttling.AllocationQuota (auth OK)
 *
 * validateBailianCodingPlanProvider maps 401/403 to "Invalid API key", so a perfectly
 * good key was rejected at add-connection time while the very same key worked for
 * inference. These tests pin the two paths together.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "../../../open-sse/config/providers/index.ts";
import { PROVIDER_ENDPOINTS } from "../../../src/shared/constants/config.ts";
import { DEFAULT_PROVIDER_BASE_URLS } from "../../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";
import {
  ALIBABA_PROVIDER_ENDPOINTS,
  resolveAlibabaProviderBaseUrl,
} from "../../../src/shared/constants/alibabaProviderRegions.ts";

const LEGACY_CODING_PLAN_HOST = "coding-intl.dashscope.aliyuncs.com";

test("validation resolves the same host the inference registry dispatches to", () => {
  const registryBaseUrl = REGISTRY["bailian-coding-plan"].baseUrl;
  const resolved = resolveAlibabaProviderBaseUrl("bailian-coding-plan", {
    region: "global-sg",
  });

  assert.equal(
    resolved,
    registryBaseUrl,
    "the dashboard would validate the key against a different host than inference uses"
  );
});

test("no default endpoint still points at the Coding Plan host", () => {
  // The catalog entry is a TOKEN Plan; Coding Plan keys are a different product and the
  // legacy host rejects Token Plan keys outright. Compare parsed hostnames, not URL
  // substrings (CodeQL js/incomplete-url-substring-sanitization).
  assert.notEqual(
    new URL(PROVIDER_ENDPOINTS["bailian-coding-plan"]).hostname,
    LEGACY_CODING_PLAN_HOST,
    "PROVIDER_ENDPOINTS still defaults to the legacy Coding Plan host"
  );
  assert.notEqual(
    new URL(DEFAULT_PROVIDER_BASE_URLS["bailian-coding-plan"]).hostname,
    LEGACY_CODING_PLAN_HOST,
    "the dashboard base-URL placeholder still shows the legacy Coding Plan host"
  );
  for (const region of ["global-sg", "china-beijing"] as const) {
    assert.notEqual(
      new URL(ALIBABA_PROVIDER_ENDPOINTS["bailian-coding-plan"][region]).hostname,
      LEGACY_CODING_PLAN_HOST,
      `region ${region} still maps to the legacy Coding Plan host`
    );
  }
});

test("both regions keep the Anthropic-compatible path the claude format requires", () => {
  // format: "claude" + chatPath "/messages" — a compatible-mode URL here would 404.
  for (const region of ["global-sg", "china-beijing"] as const) {
    assert.ok(
      ALIBABA_PROVIDER_ENDPOINTS["bailian-coding-plan"][region].endsWith("/apps/anthropic/v1"),
      `region ${region} must keep the /apps/anthropic/v1 root`
    );
  }
});

test("a saved legacy preset URL still follows the region selector", () => {
  // Migration guard: connections created before the fix carry the legacy host in
  // providerSpecificData.baseUrl. isFamilyPresetUrl must keep recognizing it as a
  // preset — otherwise it is treated as a deliberate custom URL and the connection
  // stays pinned to the host that rejects its key, with no way out but manual editing.
  const legacyPreset = "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1";

  assert.equal(
    resolveAlibabaProviderBaseUrl("bailian-coding-plan", {
      region: "global-sg",
      baseUrl: legacyPreset,
    }),
    ALIBABA_PROVIDER_ENDPOINTS["bailian-coding-plan"]["global-sg"],
    "a stored legacy preset must not pin the connection to the dead host"
  );
});

test("a genuinely custom base URL still wins over the region preset", () => {
  const custom = "https://my-gateway.internal/apps/anthropic/v1";
  assert.equal(
    resolveAlibabaProviderBaseUrl("bailian-coding-plan", {
      region: "global-sg",
      baseUrl: custom,
    }),
    custom
  );
});
