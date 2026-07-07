import test, { describe } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { ZedHostedExecutor, __test__ } from "../../open-sse/executors/zed-hosted.ts";
import {
  createZedNativeAuthData,
  encodeZedPrivateKeyVerifier,
  decodeZedPrivateKeyVerifier,
  decryptZedAccessToken,
  parseZedCallbackPayload,
  buildZedUserAuthHeader,
  resolveZedOrganizationId,
  mapZedModel,
  clearZedCaches,
} from "../../open-sse/shared/zedAuth.ts";

const { normalizeZedProvider, unwrapZedLine } = __test__;

// ─── Registry ──────────────────────────────────────────────────────────────

describe("zed-hosted registry entry", () => {
  test("registers under id zed-hosted, distinct from the zed IDE-import id", () => {
    const entry = REGISTRY["zed-hosted"];
    assert.ok(entry, "REGISTRY.zed-hosted must exist");
    assert.equal(entry.id, "zed-hosted");
    assert.equal(entry.executor, "zed-hosted");
    assert.equal(entry.authType, "oauth");
    assert.notEqual("zed-hosted", "zed", "must not collide with the existing zed IDE id");
  });

  test("models is empty — catalog is fetched live, never hardcoded", () => {
    const entry = REGISTRY["zed-hosted"];
    assert.deepEqual(entry.models, []);
    assert.equal(typeof entry.modelsUrl, "string");
    assert.ok(entry.modelsUrl.length > 0);
  });

  test("no embedded oauth client_id/client_secret literal (Hard Rule #11 N/A — no upstream secret)", () => {
    const entry = REGISTRY["zed-hosted"];
    assert.equal(entry.oauth, undefined);
  });

  test("executor is wired in the executors map", () => {
    assert.ok(hasSpecializedExecutor("zed-hosted"));
    assert.ok(getExecutor("zed-hosted") instanceof ZedHostedExecutor);
  });
});

// ─── zedAuth: RSA keypair + native-app sign-in URL ─────────────────────────

describe("createZedNativeAuthData", () => {
  test("generates a fresh keypair and a native_app_signin URL carrying the public key", () => {
    const authData = createZedNativeAuthData();
    assert.match(authData.authUrl, /^https:\/\/zed\.dev\/native_app_signin\?/);
    const url = new URL(authData.authUrl);
    assert.ok(url.searchParams.get("native_app_public_key"));
    assert.equal(url.searchParams.get("native_app_port"), String(authData.nativeAppPort));
    assert.ok(authData.privateKeyVerifier.startsWith("zed-rsa-pkcs1:"));
    assert.ok(authData.systemId.length > 0);
  });

  test("two calls produce different keypairs (never reused across login attempts)", () => {
    const first = createZedNativeAuthData();
    const second = createZedNativeAuthData();
    assert.notEqual(first.privateKeyVerifier, second.privateKeyVerifier);
  });

  test("honors a custom nativeAppPort", () => {
    const authData = createZedNativeAuthData({}, { nativeAppPort: 12345 });
    assert.equal(authData.nativeAppPort, 12345);
    const url = new URL(authData.authUrl);
    assert.equal(url.searchParams.get("native_app_port"), "12345");
  });
});

describe("zed private key verifier encode/decode round-trip", () => {
  test("round-trips an RSA PEM private key through the opaque verifier string", () => {
    const { privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "pkcs1", format: "der" },
      privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });
    const verifier = encodeZedPrivateKeyVerifier(privateKey);
    assert.ok(verifier.startsWith("zed-rsa-pkcs1:"));
    const decoded = decodeZedPrivateKeyVerifier(verifier);
    assert.equal(decoded, privateKey);
  });

  test("rejects a malformed/missing verifier", () => {
    assert.throws(() => decodeZedPrivateKeyVerifier(""), /Missing Zed private key verifier/);
    assert.throws(() => decodeZedPrivateKeyVerifier("not-a-zed-verifier"), /Missing Zed private key verifier/);
  });
});

describe("RSA encrypt/decrypt round-trip (native-app callback token decryption)", () => {
  test("decrypts an OAEP-encrypted access token using the matching private key", () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "pkcs1", format: "pem" },
      privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });
    const plaintextToken = "zed_access_token_abc123";
    const encrypted = crypto.publicEncrypt(
      { key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" },
      Buffer.from(plaintextToken, "utf8")
    );
    const verifier = encodeZedPrivateKeyVerifier(privateKey);
    const decrypted = decryptZedAccessToken(encrypted.toString("base64url"), verifier);
    assert.equal(decrypted, plaintextToken);
  });

  test("falls back to PKCS1 padding when OAEP fails, else throws a clear error", () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "pkcs1", format: "pem" },
      privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });
    const plaintextToken = "zed_access_token_pkcs1";
    const encrypted = crypto.publicEncrypt(
      { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
      Buffer.from(plaintextToken, "utf8")
    );
    const verifier = encodeZedPrivateKeyVerifier(privateKey);
    const decrypted = decryptZedAccessToken(encrypted.toString("base64url"), verifier);
    assert.equal(decrypted, plaintextToken);
  });

  test("throws a descriptive error when the ciphertext is structurally invalid for the key", () => {
    // Node/OpenSSL's PKCS1 fallback is deliberately lenient (implicit-reject
    // padding, a Bleichenbacher-oracle mitigation) — arbitrary garbage bytes at
    // the modulus size still "succeed" with meaningless plaintext instead of
    // throwing, on both padding modes. An empty ciphertext is the one shape
    // that reliably fails both padding attempts (RSA "data too small"),
    // exercising the combined try/catch → rethrow path.
    const { privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "pkcs1", format: "pem" },
      privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });
    const verifier = encodeZedPrivateKeyVerifier(privateKey);
    assert.throws(
      () => decryptZedAccessToken(Buffer.alloc(0).toString("base64url"), verifier),
      /Failed to decrypt Zed access token/
    );
  });
});

describe("parseZedCallbackPayload", () => {
  test("parses a native-app callback URL (127.0.0.1:<port>/?user_id=...&access_token=...)", () => {
    const parsed = parseZedCallbackPayload(
      "http://127.0.0.1:58443/?user_id=user_123&access_token=ZW5jcnlwdGVk"
    );
    assert.equal(parsed.userId, "user_123");
    assert.equal(parsed.encryptedAccessToken, "ZW5jcnlwdGVk");
  });

  test("parses a bare query string (no scheme/host)", () => {
    const parsed = parseZedCallbackPayload("?user_id=abc&access_token=xyz");
    assert.equal(parsed.userId, "abc");
    assert.equal(parsed.encryptedAccessToken, "xyz");
  });

  test("parses JSON input", () => {
    const parsed = parseZedCallbackPayload(JSON.stringify({ user_id: "u1", access_token: "t1" }));
    assert.equal(parsed.userId, "u1");
    assert.equal(parsed.encryptedAccessToken, "t1");
  });

  test("rejects empty input", () => {
    assert.throws(() => parseZedCallbackPayload(""), /Missing Zed callback URL/);
  });

  test("rejects a payload missing user_id or access_token", () => {
    assert.throws(
      () => parseZedCallbackPayload("http://127.0.0.1:1/?user_id=only"),
      /must include user_id and access_token/
    );
  });
});

describe("buildZedUserAuthHeader", () => {
  test('builds the "<userId> <accessToken>" scheme (not Bearer)', () => {
    const header = buildZedUserAuthHeader({
      accessToken: "tok",
      providerSpecificData: { userId: "u1" },
    });
    assert.equal(header, "u1 tok");
  });

  test("throws when userId or accessToken is missing", () => {
    assert.throws(() => buildZedUserAuthHeader({ accessToken: "tok" }));
    assert.throws(() => buildZedUserAuthHeader({ providerSpecificData: { userId: "u1" } }));
  });
});

describe("resolveZedOrganizationId", () => {
  test("prefers an explicit providerSpecificData.organizationId", () => {
    const orgId = resolveZedOrganizationId({
      providerSpecificData: { organizationId: "org-explicit" },
    } as any);
    assert.equal(orgId, "org-explicit");
  });

  test("falls back to the personal organization from userInfo", () => {
    const orgId = resolveZedOrganizationId({ providerSpecificData: {} } as any, {
      organizations: [
        { id: "org-team", is_personal: false },
        { id: "org-personal", is_personal: true },
      ],
    });
    assert.equal(orgId, "org-personal");
  });

  test("falls back to the first organization when none is personal", () => {
    const orgId = resolveZedOrganizationId({ providerSpecificData: {} } as any, {
      organizations: [{ id: "org-first" }, { id: "org-second" }],
    });
    assert.equal(orgId, "org-first");
  });
});

describe("mapZedModel", () => {
  test("maps a raw Zed model into the normalized shape", () => {
    const mapped = mapZedModel({
      id: "claude-sonnet-5",
      display_name: "Claude Sonnet 5",
      provider: "anthropic",
      max_token_count: 1000000,
      max_output_tokens: 128000,
      supports_tools: true,
      supports_images: true,
      supports_thinking: true,
    });
    assert.ok(mapped);
    assert.equal(mapped?.id, "claude-sonnet-5");
    assert.equal(mapped?.name, "Claude Sonnet 5");
    assert.equal(mapped?.contextLength, 1000000);
    assert.equal(mapped?.supportsTools, true);
  });

  test("returns null for a model with no id", () => {
    assert.equal(mapZedModel({}), null);
  });
});

// ─── Executor: provider-family inference ────────────────────────────────────

describe("normalizeZedProvider", () => {
  test("maps explicit provider strings", () => {
    assert.equal(normalizeZedProvider("anthropic", "any"), "Anthropic");
    assert.equal(normalizeZedProvider("openai", "any"), "OpenAi");
    assert.equal(normalizeZedProvider("open_ai", "any"), "OpenAi");
    assert.equal(normalizeZedProvider("google", "any"), "Google");
    assert.equal(normalizeZedProvider("gemini", "any"), "Google");
    assert.equal(normalizeZedProvider("xai", "any"), "XAi");
    assert.equal(normalizeZedProvider("x-ai", "any"), "XAi");
  });

  test("infers from the model id when provider is absent", () => {
    assert.equal(normalizeZedProvider(null, "claude-sonnet-5"), "Anthropic");
    assert.equal(normalizeZedProvider(null, "gemini-3.1-pro"), "Google");
    assert.equal(normalizeZedProvider(null, "grok-4"), "XAi");
    assert.equal(normalizeZedProvider(null, "gpt-5.5"), "OpenAi");
    assert.equal(normalizeZedProvider(null, "some-unknown-model"), "OpenAi");
  });
});

// ─── Executor: NDJSON line unwrapping ───────────────────────────────────────

describe("unwrapZedLine", () => {
  test("parses an event line", () => {
    const line = JSON.stringify({ event: { type: "message_start" } });
    assert.deepEqual(unwrapZedLine(line), { event: { type: "message_start" } });
  });

  test("parses a status line", () => {
    const line = JSON.stringify({ status: "stream_ended" });
    assert.deepEqual(unwrapZedLine(line), { status: "stream_ended" });
  });

  test('recognizes the "[DONE]" sentinel, with or without an SSE "data:" prefix', () => {
    assert.deepEqual(unwrapZedLine("[DONE]"), { done: true });
    assert.deepEqual(unwrapZedLine("data: [DONE]"), { done: true });
  });

  test("returns null for a blank line", () => {
    assert.equal(unwrapZedLine(""), null);
    assert.equal(unwrapZedLine("   "), null);
  });

  test("returns null for unparsable JSON", () => {
    assert.equal(unwrapZedLine("not json"), null);
  });
});

// ─── Executor: resolveModel + zedLlmFetch (mocked fetch) ────────────────────

describe("ZedHostedExecutor.resolveModel + zedLlmFetch (mocked upstream)", () => {
  const credentials = {
    accessToken: "plaintext-access-token",
    providerSpecificData: { userId: "u1", organizationId: "org-1" },
  };

  test("resolves the provider family from the live model catalog", async (t) => {
    clearZedCaches();
    const calls: string[] = [];
    const originalFetch = globalThis.fetch;
    t.after(() => {
      globalThis.fetch = originalFetch;
      clearZedCaches();
    });

    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = String(input);
      calls.push(url);
      if (url.includes("/client/llm_tokens")) {
        return new Response(JSON.stringify({ token: "llm-token-abc" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/models")) {
        return new Response(
          JSON.stringify({
            models: [
              { id: "claude-sonnet-5", provider: "anthropic", display_name: "Claude Sonnet 5" },
              { id: "gpt-5.5", provider: "openai", display_name: "GPT-5.5" },
            ],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;

    const executor = new ZedHostedExecutor();
    const result = await executor.resolveModel("claude-sonnet-5", credentials as any, undefined, undefined);
    assert.equal(result.provider, "Anthropic");
    assert.ok(calls.some((u) => u.includes("/client/llm_tokens")));
    assert.ok(calls.some((u) => u.includes("/models")));
  });

  test("falls back to model-id inference when the catalog fetch fails", async (t) => {
    clearZedCaches();
    const originalFetch = globalThis.fetch;
    t.after(() => {
      globalThis.fetch = originalFetch;
      clearZedCaches();
    });
    globalThis.fetch = (async () => {
      throw new Error("network down");
    }) as typeof fetch;

    const executor = new ZedHostedExecutor();
    const warnCalls: string[] = [];
    const result = await executor.resolveModel(
      "gemini-3.1-pro",
      credentials as any,
      undefined,
      { warn: (_tag: string, msg: string) => warnCalls.push(msg) } as any
    );
    assert.equal(result.provider, "Google");
    assert.ok(warnCalls.length > 0);
  });
});

// ─── Executor: parseError ────────────────────────────────────────────────────

describe("ZedHostedExecutor.parseError", () => {
  const executor = new ZedHostedExecutor();

  test("surfaces a friendly message for trial_blocked", () => {
    const response = new Response(null, { status: 402 });
    const result = executor.parseError(
      response,
      JSON.stringify({ code: "trial_blocked", message: "trial exhausted" })
    );
    assert.equal(result.status, 402);
    assert.match(result.message, /trial\/billing access/);
  });

  test("prefixes other error codes with Zed", () => {
    const response = new Response(null, { status: 400 });
    const result = executor.parseError(response, JSON.stringify({ code: "bad_request", message: "oops" }));
    assert.equal(result.message, "Zed bad_request: oops");
  });

  test("falls back to raw body text when there is no code", () => {
    const response = new Response(null, { status: 500, statusText: "Internal Server Error" });
    const result = executor.parseError(response, "boom");
    assert.equal(result.message, "boom");
  });

  test("never leaks a stack trace (Hard Rule #12 — message stays upstream-text-only)", () => {
    const response = new Response(null, { status: 500 });
    const result = executor.parseError(response, "totally fine upstream text");
    assert.ok(!result.message.includes("    at "));
  });
});

// ─── Executor: no proactive refresh (long-lived native-app token) ──────────

describe("ZedHostedExecutor credential-refresh contract", () => {
  test("needsRefresh is always false — no refresh flow exposed by Zed", () => {
    const executor = new ZedHostedExecutor();
    assert.equal(executor.needsRefresh(), false);
  });

  test("refreshCredentials resolves to null", async () => {
    const executor = new ZedHostedExecutor();
    assert.equal(await executor.refreshCredentials(), null);
  });
});
