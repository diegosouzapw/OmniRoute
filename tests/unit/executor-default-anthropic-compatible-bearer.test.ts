/**
 * Port of decolua/9router commit b977bf74:
 * Some third-party Anthropic-compatible gateways (configured via
 * `anthropic-compatible-*` provider IDs) require Authorization: Bearer
 * in addition to x-api-key. Without the Bearer header, those gateways
 * return 401 "missing_api_key" on every forward.
 *
 * For NON-official anthropic-compatible endpoints (any `baseUrl` that is
 * not empty AND does not contain "api.anthropic.com"), the default
 * executor's buildHeaders must emit BOTH `x-api-key` and `Authorization:
 * Bearer <apiKey>`. Official api.anthropic.com upstreams are unchanged
 * (x-api-key only).
 */

import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const BASE_CREDS_THIRD_PARTY = {
  apiKey: "k-third-party",
  providerSpecificData: { baseUrl: "https://gateway.example/v1" },
} as Record<string, unknown>;

const BASE_CREDS_OFFICIAL = {
  apiKey: "k-official",
  providerSpecificData: { baseUrl: "https://api.anthropic.com/v1" },
} as Record<string, unknown>;

test("anthropic-compatible (third-party gateway): sends x-api-key AND Authorization: Bearer", () => {
  const executor = new DefaultExecutor("anthropic-compatible-thirdparty");
  const headers = executor.buildHeaders(BASE_CREDS_THIRD_PARTY, true) as Record<
    string,
    string
  >;
  assert.equal(headers["x-api-key"], "k-third-party");
  assert.equal(
    headers["Authorization"],
    "Bearer k-third-party",
    "third-party anthropic-compatible upstreams need the Bearer fallback too"
  );
});

test("anthropic-compatible (official api.anthropic.com): only x-api-key, no Bearer", () => {
  const executor = new DefaultExecutor("anthropic-compatible-official");
  const headers = executor.buildHeaders(BASE_CREDS_OFFICIAL, true) as Record<
    string,
    string
  >;
  assert.equal(headers["x-api-key"], "k-official");
  assert.equal(
    headers["Authorization"],
    undefined,
    "official anthropic upstream must NOT receive a Bearer header alongside x-api-key"
  );
});

test("anthropic-compatible (no baseUrl): treated as official, no Bearer", () => {
  // Empty/missing baseUrl means: "talk to api.anthropic.com" — keep the legacy
  // behavior (x-api-key only).
  const executor = new DefaultExecutor("anthropic-compatible-empty");
  const headers = executor.buildHeaders(
    { apiKey: "k-empty", providerSpecificData: {} } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["x-api-key"], "k-empty");
  assert.equal(headers["Authorization"], undefined);
});
