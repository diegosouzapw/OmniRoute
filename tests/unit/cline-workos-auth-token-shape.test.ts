import test from "node:test";
import assert from "node:assert/strict";

import {
  buildClineHeaders,
  getClineAccessToken,
  getClineAuthorizationHeader,
} from "../../src/shared/utils/clineAuth.ts";
import { buildProviderHeaders } from "../../open-sse/services/provider.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("getClineAccessToken prefixes the token with workos:", () => {
  assert.equal(getClineAccessToken("abc123"), "workos:abc123");
});

test("getClineAccessToken is idempotent when already prefixed", () => {
  assert.equal(getClineAccessToken("workos:abc123"), "workos:abc123");
});

test("getClineAccessToken trims and rejects empty / non-string input", () => {
  assert.equal(getClineAccessToken("  abc123  "), "workos:abc123");
  assert.equal(getClineAccessToken("   "), "");
  assert.equal(getClineAccessToken(""), "");
  assert.equal(getClineAccessToken(undefined), "");
  assert.equal(getClineAccessToken(null), "");
  assert.equal(getClineAccessToken(42), "");
});

test("getClineAuthorizationHeader builds a workos-prefixed bearer header", () => {
  assert.equal(getClineAuthorizationHeader("abc123"), "Bearer workos:abc123");
  assert.equal(getClineAuthorizationHeader(""), "");
});

test("buildClineHeaders emits the full cline client header set", () => {
  const headers = buildClineHeaders("abc123");
  assert.equal(headers.Authorization, "Bearer workos:abc123");
  assert.equal(headers["HTTP-Referer"], "https://cline.bot");
  assert.equal(headers["X-Title"], "Cline");
  assert.equal(headers["X-CLIENT-TYPE"], "omniroute");
  assert.equal(headers["X-IS-MULTIROOT"], "false");
  // Branding must be OmniRoute, never 9Router.
  assert.ok(/^OmniRoute\//.test(headers["User-Agent"]));
  assert.ok(!/9router/i.test(JSON.stringify(headers)));
});

test("buildClineHeaders merges extra headers and omits Authorization with no token", () => {
  const headers = buildClineHeaders("", { Accept: "application/json" });
  assert.equal(headers.Accept, "application/json");
  assert.ok(!("Authorization" in headers));
  // Client-identification headers are still present even without a token.
  assert.equal(headers["X-CLIENT-TYPE"], "omniroute");
});

test("buildProviderHeaders uses the cline workos auth token shape", () => {
  const headers = buildProviderHeaders("cline", { apiKey: "tok-abc" }, true);
  assert.equal(headers.Authorization, "Bearer workos:tok-abc");
  assert.equal(headers["HTTP-Referer"], "https://cline.bot");
  assert.equal(headers["X-CLIENT-TYPE"], "omniroute");
});

test("buildProviderHeaders honors an accessToken for cline", () => {
  const headers = buildProviderHeaders("cline", { accessToken: "acc-xyz" }, false);
  assert.equal(headers.Authorization, "Bearer workos:acc-xyz");
});

test("DefaultExecutor.buildHeaders uses the cline workos auth token shape", () => {
  const executor = new DefaultExecutor("cline");
  const headers = executor.buildHeaders({ apiKey: "tok-abc" }, true);
  assert.equal(headers.Authorization, "Bearer workos:tok-abc");
  assert.equal(headers["HTTP-Referer"], "https://cline.bot");
  assert.equal(headers["X-CLIENT-TYPE"], "omniroute");
  assert.equal(headers["X-Title"], "Cline");
});
