import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  getBifrostRoutingConfig,
  getRoutingFallbackHeader,
  resolveRelayRoutingBackend,
  shouldTryBifrost,
  shouldTryBifrostForRequest,
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

test("relay routing backend exposes TS fallback header only for enabled auto bifrost fallback", () => {
  const config = getBifrostRoutingConfig({
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
  });

  assert.equal(getRoutingFallbackHeader("auto", config), "bifrost");
  assert.equal(getRoutingFallbackHeader("ts", config), undefined);
  assert.equal(getRoutingFallbackHeader("bifrost", config), undefined);
  assert.equal(
    getRoutingFallbackHeader(
      "auto",
      getBifrostRoutingConfig({
        BIFROST_BASE_URL: "http://127.0.0.1:8080",
        BIFROST_ENABLED: "0",
      })
    ),
    undefined
  );
  assert.equal(getRoutingFallbackHeader("auto", null), undefined);
});

test("relay routing backend keeps strict bifrost failures out of auto fallback accounting", () => {
  const config = getBifrostRoutingConfig({
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
  });

  assert.equal(shouldTryBifrost("bifrost", config), true);
  assert.equal(getRoutingFallbackHeader("bifrost", config), undefined);
  assert.equal(resolveRelayRoutingBackend({ OMNIROUTE_RELAY_BACKEND: "bifrost" }), "bifrost");
});

test("relay routing backend auto mode tries bifrost for manifest-eligible providers", () => {
  const config = getBifrostRoutingConfig({
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
  });

  assert.deepEqual(
    shouldTryBifrostForRequest("auto", config, { model: "openai/gpt-4.1" }, () => ({
      eligible: true,
      reasons: [],
    })),
    { tryBifrost: true }
  );
});

test("relay routing backend auto mode skips bifrost for manifest-ineligible providers", () => {
  const config = getBifrostRoutingConfig({
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
  });

  assert.deepEqual(
    shouldTryBifrostForRequest("auto", config, { model: "cw/claude-sonnet-4.6" }, () => ({
      eligible: false,
      reasons: ["custom executor: claude-web"],
    })),
    { tryBifrost: false, fallbackReason: "bifrost-ineligible" }
  );
});

test("relay routing backend auto mode keeps unknown providers on TS fallback", () => {
  const config = getBifrostRoutingConfig({
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
  });

  assert.deepEqual(
    shouldTryBifrostForRequest("auto", config, { model: "unknown/model" }, () => null),
    { tryBifrost: false, fallbackReason: "bifrost-provider-unknown" }
  );
});

test("relay routing backend strict bifrost bypasses manifest eligibility", () => {
  const config = getBifrostRoutingConfig({
    BIFROST_BASE_URL: "http://127.0.0.1:8080",
  });

  assert.deepEqual(
    shouldTryBifrostForRequest("bifrost", config, { model: "cw/claude-sonnet-4.6" }, () => ({
      eligible: false,
      reasons: ["custom executor: claude-web"],
    })),
    { tryBifrost: true }
  );
});

test("automatic relay keeps the Bifrost timeout active until an SSE stream finalizes", () => {
  const routeSource = readFileSync(
    new URL("../../../../src/app/api/v1/relay/chat/completions/route.ts", import.meta.url),
    "utf8"
  );
  const forwardToBifrost = routeSource.slice(
    routeSource.indexOf("async function forwardToBifrost"),
    routeSource.indexOf("export async function OPTIONS")
  );
  const streamBranch = forwardToBifrost.slice(
    forwardToBifrost.indexOf("if (wantsStream && upstream.body)"),
    forwardToBifrost.indexOf("clearTimeout(tid);\n    recordUsage(")
  );

  assert.match(
    streamBranch,
    /finalizeReadableStream\(upstream\.body, \(error\) => \{\s*clearTimeout\(tid\)/
  );
  assert.match(streamBranch, /const statusCode = timedOut \? 504 : upstream\.status/);
  assert.match(streamBranch, /error && backend === "auto"/);
  assert.match(streamBranch, /recordBifrostFailure\(/);
});
