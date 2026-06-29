import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getBifrostRoutingConfig,
  resolveRelayRoutingBackend,
  shouldTryBifrost,
} from "../../../../src/app/api/v1/relay/chat/completions/routingBackend.ts";

test("relay routing backend defaults to TypeScript without bifrost", () => {
  const env = {};

  assert.equal(resolveRelayRoutingBackend(env), "ts");
  assert.equal(getBifrostRoutingConfig(env), null);
});

test("relay routing backend auto-enables bifrost when base URL is configured", () => {
  const env = {
    BIFROST_BASE_URL: "http://127.0.0.1:8080/",
    OMNIROUTE_BIFROST_KEY: "sidecar-key",
    BIFROST_TIMEOUT_MS: "250",
  };

  const config = getBifrostRoutingConfig(env);

  assert.equal(resolveRelayRoutingBackend(env), "auto");
  assert.equal(config?.baseUrl, "http://127.0.0.1:8080");
  assert.equal(config?.apiKey, "sidecar-key");
  assert.equal(config?.timeoutMs, 250);
  assert.equal(config?.streamingEnabled, true);
  assert.equal(config?.enabled, true);
  assert.equal(shouldTryBifrost("auto", config), true);
});

test("relay routing backend honors explicit TS and strict bifrost modes", () => {
  const env = {
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
    OMNIROUTE_RELAY_BACKEND: "ts",
  };
  const config = getBifrostRoutingConfig(env);

  assert.equal(resolveRelayRoutingBackend(env), "ts");
  assert.equal(shouldTryBifrost("ts", config), false);

  env.OMNIROUTE_RELAY_BACKEND = "bifrost";
  assert.equal(resolveRelayRoutingBackend(env), "bifrost");
  assert.equal(shouldTryBifrost("bifrost", config), true);
});

test("relay routing backend respects bifrost killswitch", () => {
  const env = {
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
    BIFROST_ENABLED: "0",
  };
  const config = getBifrostRoutingConfig(env);

  assert.equal(resolveRelayRoutingBackend(env), "ts");
  assert.equal(config?.enabled, false);
  assert.equal(shouldTryBifrost("auto", config), false);
});

test("relay routing backend falls back on invalid timeout values", () => {
  const env = {
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
    BIFROST_TIMEOUT_MS: "not-a-number",
  };

  assert.equal(getBifrostRoutingConfig(env)?.timeoutMs, 30000);
});
