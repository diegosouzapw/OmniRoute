import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getBifrostRoutingConfig,
  resolveRelayRoutingBackend,
  shouldTryBifrostForRequest,
  recordBifrostFailure,
  getActiveBifrostCooldown,
  clearBifrostFailure,
  resetBifrostCooldowns,
  getRoutingFallbackHeader,
  getRoutingFallbackReasonHeader,
} from "../../../../src/shared/services/bifrost/bifrostRouting.ts";

test("bifrostRouting: getBifrostRoutingConfig resolves from env", () => {
  const env: NodeJS.ProcessEnv = {
    BIFROST_BASE_URL: "http://127.0.0.1:8080/",
    BIFROST_API_KEY: "secret-key",
    BIFROST_TIMEOUT_MS: "12000",
    BIFROST_ENABLED: "1",
    BIFROST_STREAMING_ENABLED: "1",
  };

  const config = getBifrostRoutingConfig(env);
  assert.ok(config);
  assert.equal(config?.baseUrl, "http://127.0.0.1:8080");
  assert.equal(config?.apiKey, "secret-key");
  assert.equal(config?.timeoutMs, 12000);
  assert.equal(config?.enabled, true);
  assert.equal(config?.streamingEnabled, true);
});

test("bifrostRouting: getBifrostRoutingConfig returns null when unconfigured and supervisor absent", () => {
  const config = getBifrostRoutingConfig({});
  assert.equal(config, null);
});

test("bifrostRouting: resolveRelayRoutingBackend resolves configured or auto", () => {
  assert.equal(
    resolveRelayRoutingBackend({ OMNIROUTE_RELAY_BACKEND: "bifrost" }),
    "bifrost"
  );
  assert.equal(resolveRelayRoutingBackend({ OMNIROUTE_RELAY_BACKEND: "ts" }), "ts");
  assert.equal(
    resolveRelayRoutingBackend({
      BIFROST_BASE_URL: "http://127.0.0.1:8080",
      BIFROST_ENABLED: "1",
    }),
    "auto"
  );
  assert.equal(resolveRelayRoutingBackend({}), "ts");
});

test("bifrostRouting: circuit breaker failure cooldown lifecycle", () => {
  const baseUrl = "http://127.0.0.1:8080";
  resetBifrostCooldowns();
  assert.equal(getActiveBifrostCooldown(baseUrl), null);

  recordBifrostFailure(baseUrl, "timed out", 1000, 5000);
  const active = getActiveBifrostCooldown(baseUrl, 2000);
  assert.ok(active);
  assert.equal(active?.reason, "timed out");
  assert.equal(active?.remainingMs, 4000);

  // Expired check
  assert.equal(getActiveBifrostCooldown(baseUrl, 6500), null);

  // Manual clear
  recordBifrostFailure(baseUrl, "502 error", 1000, 5000);
  clearBifrostFailure(baseUrl);
  assert.equal(getActiveBifrostCooldown(baseUrl, 2000), null);
});

test("bifrostRouting: shouldTryBifrostForRequest evaluates sidecar eligibility", () => {
  const cfg = {
    baseUrl: "http://127.0.0.1:8080",
    timeoutMs: 30000,
    streamingEnabled: true,
    enabled: true,
  };

  // When backend is ts
  assert.deepEqual(shouldTryBifrostForRequest("ts", cfg, { model: "gpt-4" }), {
    tryBifrost: false,
  });

  // When backend is forced bifrost
  assert.deepEqual(shouldTryBifrostForRequest("bifrost", cfg, { model: "gpt-4" }), {
    tryBifrost: true,
  });

  // When backend is auto with sidecar lookup
  const lookupEligible = () => ({ eligible: true, reasons: [] });
  const lookupIneligible = () => ({ eligible: false, reasons: ["unsupported"] });
  const lookupUnknown = () => null;

  assert.deepEqual(shouldTryBifrostForRequest("auto", cfg, { model: "gpt-4" }, lookupEligible), {
    tryBifrost: true,
  });
  assert.deepEqual(
    shouldTryBifrostForRequest("auto", cfg, { model: "custom-model" }, lookupIneligible),
    { tryBifrost: false, fallbackReason: "bifrost-ineligible" }
  );
  assert.deepEqual(
    shouldTryBifrostForRequest("auto", cfg, { model: "unknown-model" }, lookupUnknown),
    { tryBifrost: false, fallbackReason: "bifrost-provider-unknown" }
  );
});

test("bifrostRouting: fallback headers helper parsing", () => {
  const cfg = {
    baseUrl: "http://127.0.0.1:8080",
    timeoutMs: 30000,
    streamingEnabled: true,
    enabled: true,
  };
  assert.equal(getRoutingFallbackHeader("auto", cfg), "bifrost");
  assert.equal(getRoutingFallbackHeader("ts", cfg), undefined);

  assert.equal(
    getRoutingFallbackReasonHeader("bifrost-cooldown; remaining=1200"),
    "bifrost-cooldown"
  );
  assert.equal(getRoutingFallbackReasonHeader("bifrost-error"), "bifrost-error");
  assert.equal(getRoutingFallbackReasonHeader("unknown-reason"), undefined);
});
