import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mock, test } from "node:test";

import { getProvider, pollForToken } from "../../src/lib/oauth/providers.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { MuseCodeSubscriptionExecutor } from "../../open-sse/executors/muse-code-subscription.ts";
import {
  MUSE_KEY_URL,
  MUSE_SUBSCRIPTION_PROVIDER,
  MUSE_SUBSCRIPTION_BASE_URL,
  MUSE_SUBSCRIPTION_RESPONSES_URL,
} from "../../open-sse/services/museCodeSubscription.ts";

// These tests require a full OmniRoute checkout and its installed dependencies.
// The standalone protocol suite intentionally does not import the application.
const ID = MUSE_SUBSCRIPTION_PROVIDER;
const credentials = {
  accessToken: "test-muse-key-never-valid",
  providerSpecificData: {
    credentialSource: "muse-code-device-login",
    isSubscriptionActive: true,
    baseUrl: MUSE_SUBSCRIPTION_BASE_URL,
    extraApiKeys: [],
  },
};

test.afterEach(() => mock.restoreAll());

test("Muse is registered as a device flow with a numeric public client identifier", () => {
  assert.equal(getProvider(ID).flowType, "device_code");
  assert.match(resolvePublicCred("muse_code_id"), /^\d{15,16}$/);
  assert.equal(getProvider(ID).config.clientId, resolvePublicCred("muse_code_id"));
});

test("native Responses registry uses a distinct subscription provider and forces streaming", () => {
  const entry = getRegistryEntry(ID);
  assert.ok(entry);
  assert.equal(entry.authType, "oauth");
  assert.equal(entry.format, "openai-responses");
  assert.equal(entry.forceStream, true);
  assert.equal(entry.passthroughModels, false);
  assert.notEqual(entry, getRegistryEntry("muse-code"));
  assert.equal(entry.models[0].id, "muse-spark-1.3");
});

test("canonical and alias executors have separate instances and the same fixed endpoint", async () => {
  const canonical = await getExecutor(ID);
  const alias = await getExecutor("mcs");
  assert.ok(canonical instanceof MuseCodeSubscriptionExecutor);
  assert.ok(alias instanceof MuseCodeSubscriptionExecutor);
  assert.notEqual(canonical, alias);
  assert.equal(canonical.buildUrl(), MUSE_SUBSCRIPTION_RESPONSES_URL);
});

test("UI device flow and server no-PKCE lists both include the provider", () => {
  const ui = readFileSync(new URL("../../src/shared/components/OAuthModal.tsx", import.meta.url), "utf8");
  const route = readFileSync(
    new URL("../../src/app/api/oauth/[provider]/[action]/route.ts", import.meta.url), "utf8"
  );
  assert.match(ui, /DEVICE_CODE_PROVIDERS = new Set\(\[\s*"muse-code-subscription"/);
  assert.match(route, /NO_PKCE_DEVICE_CODE_PROVIDERS = new Set\(\[\s*"muse-code-subscription"/);
});

test("generic poll wrapper reports HTTP 400 authorization_pending correctly", async () => {
  mock.method(globalThis, "fetch", async () =>
    Response.json({ error: "authorization_pending" }, { status: 400 })
  );
  const result = await pollForToken(ID, "device", undefined, undefined);
  assert.equal(result.success, false);
  assert.ok("pending" in result);
  assert.equal(result.pending, true);
});

test("generic poll wrapper persists a minted subscription key rather than the DCA token", async () => {
  mock.method(globalThis, "fetch", async (url: string) => {
    if (url === MUSE_KEY_URL) {
      return Response.json({
        api_key: credentials.accessToken,
        is_subs_active: true,
        base_url: MUSE_SUBSCRIPTION_BASE_URL,
      });
    }
    return Response.json({ access_token: "dca:inert-test-token", expires_in: 1 });
  });
  const result = await pollForToken(ID, "device", undefined, undefined);
  assert.equal(result.success, true);
  assert.ok("tokens" in result);
  assert.equal(result.tokens.accessToken, credentials.accessToken);
  assert.equal(result.tokens.expiresIn, undefined);
  assert.equal(result.tokens.refreshToken, undefined);
});

test("executor rejects an API key before delegating to any upstream transport", async () => {
  const delegated = mock.method(DefaultExecutor.prototype, "execute", async () => {
    throw new Error("should not delegate");
  });
  const executor = new MuseCodeSubscriptionExecutor();
  const result = await executor.execute({
    model: "muse-spark-1.3", stream: true, body: { input: "hello" },
    credentials: { apiKey: "ordinary-api-key" },
  });
  const response = result instanceof Response ? result : result.response;
  assert.equal(response.status, 401);
  assert.equal(delegated.mock.callCount(), 0);
  const text = await response.text();
  assert.ok(!text.includes("ordinary-api-key"));
  assert.ok(!text.includes("at /"));
});

test("executor delegates streaming and returns subscription rate limits unchanged", async () => {
  const upstream = new Response("quota exceeded", {
    status: 429, headers: { "Retry-After": "60" },
  });
  const delegated = mock.method(DefaultExecutor.prototype, "execute", async () => ({
    response: upstream,
  }));
  const executor = new MuseCodeSubscriptionExecutor();
  const result = await executor.execute({
    model: "muse-spark-1.3", stream: false, body: { input: "hello" }, credentials,
    upstreamExtraHeaders: { Authorization: "forbidden-override" },
  });
  const response = result instanceof Response ? result : result.response;
  assert.equal(response, upstream);
  assert.equal(response.headers.get("retry-after"), "60");
  assert.equal(delegated.mock.calls[0].arguments[0].stream, true);
  assert.equal(delegated.mock.calls[0].arguments[0].upstreamExtraHeaders, undefined);
});

test("executor returns an actionable sanitized re-login error on upstream 401", async () => {
  mock.method(DefaultExecutor.prototype, "execute", async () => ({
    response: new Response("upstream-sensitive-body", { status: 401 }),
  }));
  const executor = new MuseCodeSubscriptionExecutor();
  const result = await executor.execute({
    model: "muse-spark-1.3", stream: true, body: { input: "hello" }, credentials,
  });
  const response = result instanceof Response ? result : result.response;
  assert.equal(response.status, 401);
  const text = await response.text();
  assert.match(text, /Sign in again/);
  assert.ok(!text.includes("upstream-sensitive-body"));
});
