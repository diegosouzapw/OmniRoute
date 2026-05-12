import test from "node:test";
import assert from "node:assert/strict";

const runtimeTimeouts = await import("../../src/shared/utils/runtimeTimeouts.ts");

test("upstream timeout config derives hidden fetch timeouts from FETCH_TIMEOUT_MS", () => {
  const config = runtimeTimeouts.getUpstreamTimeoutConfig({
    FETCH_TIMEOUT_MS: "600000",
    STREAM_IDLE_TIMEOUT_MS: "600000",
  });

  assert.deepEqual(config, {
    fetchTimeoutMs: 600000,
    streamIdleTimeoutMs: 600000,
    streamReadinessTimeoutMs: 30000,
    fetchHeadersTimeoutMs: 600000,
    fetchBodyTimeoutMs: 600000,
    fetchConnectTimeoutMs: 30000,
    fetchKeepAliveTimeoutMs: 4000,
  });
});

test("REQUEST_TIMEOUT_MS becomes the common timeout baseline when specific overrides are unset", () => {
  const upstreamConfig = runtimeTimeouts.getUpstreamTimeoutConfig({
    REQUEST_TIMEOUT_MS: "600000",
  });
  const apiBridgeConfig = runtimeTimeouts.getApiBridgeTimeoutConfig({
    REQUEST_TIMEOUT_MS: "600000",
  });

  assert.equal(upstreamConfig.fetchTimeoutMs, 600000);
  assert.equal(upstreamConfig.streamIdleTimeoutMs, 600000);
  assert.equal(upstreamConfig.fetchHeadersTimeoutMs, 600000);
  assert.equal(upstreamConfig.fetchBodyTimeoutMs, 600000);
  assert.equal(apiBridgeConfig.proxyTimeoutMs, 600000);
  assert.equal(apiBridgeConfig.serverRequestTimeoutMs, 600000);
});

test("upstream timeout config honors explicit overrides and falls back on invalid values", () => {
  const config = runtimeTimeouts.getUpstreamTimeoutConfig({
    REQUEST_TIMEOUT_MS: "550000",
    FETCH_TIMEOUT_MS: "600000",
    STREAM_IDLE_TIMEOUT_MS: "600000",
    FETCH_HEADERS_TIMEOUT_MS: "610000",
    FETCH_BODY_TIMEOUT_MS: "0",
    FETCH_CONNECT_TIMEOUT_MS: "45000",
    FETCH_KEEPALIVE_TIMEOUT_MS: "-1",
  });

  assert.equal(config.fetchHeadersTimeoutMs, 610000);
  assert.equal(config.fetchBodyTimeoutMs, 0);
  assert.equal(config.fetchConnectTimeoutMs, 45000);
  assert.equal(config.fetchKeepAliveTimeoutMs, 4000);
});

test("TLS client timeout defaults to FETCH_TIMEOUT_MS and can be overridden", () => {
  const defaultConfig = runtimeTimeouts.getTlsClientTimeoutConfig({
    FETCH_TIMEOUT_MS: "600000",
  });
  const overriddenConfig = runtimeTimeouts.getTlsClientTimeoutConfig({
    FETCH_TIMEOUT_MS: "600000",
    TLS_CLIENT_TIMEOUT_MS: "720000",
  });

  assert.equal(defaultConfig.timeoutMs, 600000);
  assert.equal(overriddenConfig.timeoutMs, 720000);
});

test("stainless timeout derives from fetch timeout and rounds up to whole seconds", () => {
  assert.equal(
    runtimeTimeouts.getStainlessTimeoutSeconds({
      REQUEST_TIMEOUT_MS: "1200000",
    }),
    1200
  );
  assert.equal(
    runtimeTimeouts.getStainlessTimeoutSeconds({
      FETCH_TIMEOUT_MS: "600001",
    }),
    601
  );
});

test("API bridge timeouts align request timeout with long proxy timeout by default", () => {
  const config = runtimeTimeouts.getApiBridgeTimeoutConfig({
    API_BRIDGE_PROXY_TIMEOUT_MS: "600000",
  });

  assert.deepEqual(config, {
    proxyTimeoutMs: 600000,
    serverRequestTimeoutMs: 600000,
    serverHeadersTimeoutMs: 60000,
    serverKeepAliveTimeoutMs: 5000,
    serverSocketTimeoutMs: 0,
  });
});

test("API bridge proxy timeout defaults to the long upstream request window", () => {
  const config = runtimeTimeouts.getApiBridgeTimeoutConfig({});

  assert.equal(config.proxyTimeoutMs, 600000);
  assert.equal(config.serverRequestTimeoutMs, 600000);
});
