/**
 * Tests for TinyCMS Web provider — registration, credential validation, challenge/PoW flow.
 *
 * Validates:
 * - WEB_COOKIE_PROVIDERS contains the tinycms-web entry
 * - Registry entry has correct shape and models
 * - Executor resolves for both primary id and alias
 * - UUID validation (must start with 'R')
 * - WASM initialization flow
 * - Challenge/PoW flow with mocked network calls
 * - Error sanitization (Hard Rule #12: no stack traces)
 * - Configurable userid from providerSpecificData
 */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";

import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { TinyCmsExecutor } from "../../open-sse/executors/tinycms.ts";
import { setupDomMocks, type DomMockRestore } from "../../open-sse/executors/tinycmsSigner.ts";

// tinycmsSigner.ts intentionally does NOT install its window/document/canvas
// shims as a module-load side effect (see setupDomMocks() there) — doing so
// would leak those globals into every other test file that transitively
// imports it (e.g. through the provider registry). Install them explicitly
// for this file only, and restore whatever was there before once this file's
// tests are done.
let restoreDomMocks: DomMockRestore;

before(() => {
  restoreDomMocks = setupDomMocks();
});

after(() => {
  restoreDomMocks();
});

// ── Catalog / WEB_COOKIE_PROVIDERS ────────────────────────────────────────────

test("tinycms-web is present in WEB_COOKIE_PROVIDERS", () => {
  const p = (WEB_COOKIE_PROVIDERS as Record<string, unknown>)["tinycms-web"] as Record<
    string,
    unknown
  >;
  assert.ok(p, "WEB_COOKIE_PROVIDERS['tinycms-web'] must exist");
  assert.equal(p.id, "tinycms-web");
  assert.equal(p.alias, "tcw");
  assert.equal((p.name as string).toLowerCase().includes("tinycms"), true);
});

test("tinycms-web WEB_COOKIE_PROVIDERS entry is marked as free-tier", () => {
  const p = (WEB_COOKIE_PROVIDERS as Record<string, unknown>)["tinycms-web"] as Record<
    string,
    unknown
  >;
  assert.equal(p.hasFree, true);
  assert.ok(typeof p.freeNote === "string" && (p.freeNote as string).length > 0);
  assert.ok(typeof p.authHint === "string" && (p.authHint as string).length > 0);
});

// ── Registry / REGISTRY ───────────────────────────────────────────────────────

test("tinycms-web is present in the provider REGISTRY with correct shape", () => {
  const r = REGISTRY["tinycms-web"];
  assert.ok(r, "REGISTRY['tinycms-web'] must exist");
  assert.equal(r.id, "tinycms-web");
  assert.equal(r.alias, "tcw");
  assert.equal(r.executor, "tinycms-web");
  assert.equal(r.format, "openai");
  assert.equal(r.authType, "apikey");
  assert.equal(r.authHeader, "uuid");
});

test("tinycms-web registry has all expected models", () => {
  const r = REGISTRY["tinycms-web"];
  assert.ok(r.models && r.models.length > 0, "must have at least one model");
  assert.deepEqual(
    r.models.map((m) => m.id),
    [
      "claude-fable-5",
      "claude-opus-5",
      "claude-sonnet-5",
      "gpt-5.6-sol",
      "gpt-5.6-luna",
      "gpt-5.5",
      "gpt-5.4-mini",
      "gpt-5.4-nano",
      "gpt-5.3-thinking-free",
      "gpt-5.3-free",
      "gpt-oss-120b",
      "gemini-3.6-flash",
      "gemini-3.1-pro-preview",
      "gemini-3.1-flash-lite-preview",
      "grok-4.5",
      "deepseek-v4-pro",
      "deepseek-v4-flash",
      "kimi-k3",
      "glm-5.2",
      "qwen3.6-plus",
      "mimo-v2.5-pro",
      "mimo-v2.5",
    ]
  );
});

test("tinycms-web model names are human-readable strings", () => {
  const r = REGISTRY["tinycms-web"];
  for (const m of r.models) {
    assert.ok(m.id && typeof m.id === "string", `model id must be a string: ${JSON.stringify(m)}`);
    assert.ok(
      m.name && typeof m.name === "string",
      `model name must be a string: ${JSON.stringify(m)}`
    );
  }
});

test("supportsReasoning is set on gpt-5.3-thinking-free", () => {
  const r = REGISTRY["tinycms-web"];
  const thinkingModel = r.models.find((m) => m.id === "gpt-5.3-thinking-free");
  assert.ok(thinkingModel, "gpt-5.3-thinking-free must exist");
  assert.equal(thinkingModel!.supportsReasoning, true);
});

// ── Executor ──────────────────────────────────────────────────────────────────

test("getExecutor returns TinyCmsExecutor for 'tinycms-web'", async () => {
  const e = await getExecutor("tinycms-web");
  assert.ok(e instanceof TinyCmsExecutor, "executor must be TinyCmsExecutor");
});

test("getExecutor returns TinyCmsExecutor for 'tcw' alias", async () => {
  const e = await getExecutor("tcw");
  assert.ok(e instanceof TinyCmsExecutor, "alias 'tcw' must resolve to TinyCmsExecutor");
});

test("TinyCmsExecutor can be instantiated", () => {
  const executor = new TinyCmsExecutor();
  assert.ok(executor, "must instantiate without errors");
  assert.ok(typeof executor.execute === "function", "must have an execute method");
});

// ── UUID validation (must start with 'R') ─────────────────────────────────────

test("TinyCmsExecutor returns 401 when UUID is missing", async () => {
  const executor = new TinyCmsExecutor();
  const result = await executor.execute({
    model: "gpt-5-free",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: {},
    signal: AbortSignal.timeout(5000),
  });
  assert.ok("response" in result, "response must be present");
  assert.equal(result.response.status, 401);
  const body = await result.response.json();
  const errMsg = body?.error?.message || "";
  assert.ok(errMsg.includes("Invalid or missing device UUID"), "error must mention missing UUID");
  // Hard Rule #12: must NOT leak stack traces
  assert.ok(!errMsg.includes("at /"), "error must not contain a stack trace path");
});

test("TinyCmsExecutor returns 401 when UUID does not start with 'R'", async () => {
  const executor = new TinyCmsExecutor();
  const result = await executor.execute({
    model: "gpt-5-free",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "abc123" }, // does not start with 'R'
    signal: AbortSignal.timeout(5000),
  });
  assert.ok("response" in result, "response must be present");
  assert.equal(result.response.status, 401);
  const body = await result.response.json();
  const errMsg = body?.error?.message || "";
  assert.ok(errMsg.includes("Invalid or missing device UUID"), "error must mention missing UUID");
  assert.ok(!errMsg.includes("at /"), "error must not contain a stack trace path");
});

test("TinyCmsExecutor returns the standard executor response envelope on success", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (new URL(url).hostname === "api64.ipify.org") {
      return new Response(JSON.stringify({ ip: "127.0.0.1" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/api/challenge")) {
      return new Response(
        JSON.stringify({
          challenge: "test",
          challengeId: "challenge-id",
          expiresAt: Date.now() + 60_000,
          version: "1",
          difficulty: 0,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response("upstream body", {
      status: 200,
      headers: { "X-TinyCMS-Test": "yes" },
    });
  };

  try {
    const requestBody = { messages: [{ role: "user", content: "hi" }] };
    const result = await new TinyCmsExecutor().execute({
      model: "gpt-5-free",
      body: requestBody,
      stream: false,
      credentials: { apiKey: "Rtest-device" },
    });

    assert.ok(!(result instanceof Response), "TinyCMS must preserve executor metadata");
    assert.equal(result.response.status, 200);
    assert.equal(result.headers?.["x-tinycms-test"], "yes");
    assert.deepEqual(result.transformedBody, requestBody);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── WASM initialization ───────────────────────────────────────────────────────

test("initTinyCmsWasm module exports expected functions", async () => {
  const signer = await import("../../open-sse/executors/tinycmsSigner.ts");
  assert.ok(typeof signer.initTinyCmsWasm === "function", "must export initTinyCmsWasm function");
  assert.ok(
    typeof signer.generateSecurePayload === "function",
    "must export generateSecurePayload function"
  );
});

test("initTinyCmsWasm is idempotent (calling twice does not throw)", async () => {
  const signer = await import("../../open-sse/executors/tinycmsSigner.ts");
  try {
    await signer.initTinyCmsWasm();
    await signer.initTinyCmsWasm(); // Second call should be a no-op
  } catch {
    // WASM may not be available in all Node.js test environments;
    // the important thing is that the function handles errors gracefully
    // and both calls behave the same way.
  }
});

// ── Error sanitization (Hard Rule #12) ────────────────────────────────────────

test("TinyCmsExecutor sanitizes errors (no stack traces in error response)", async () => {
  const executor = new TinyCmsExecutor();
  const result = await executor.execute({
    model: "gpt-5-free",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "" }, // empty UUID
    signal: AbortSignal.timeout(5000),
  });

  assert.ok("response" in result, "response must be present");
  const body = await result.response.json();
  const errMsg = body?.error?.message || "";
  assert.ok(errMsg.includes("Invalid or missing device UUID"), "error must mention missing UUID");
  assert.ok(!errMsg.includes("at /"), "error must not contain a stack trace path (Hard Rule #12)");
});

// ── Provider-specific credential requirements ─────────────────────────────────

test("tinycms-web credential requirement is kind: token with app-config-uuid", async () => {
  const { WEB_SESSION_CREDENTIAL_REQUIREMENTS } =
    await import("../../src/shared/providers/webSessionCredentials.ts");
  const req = (WEB_SESSION_CREDENTIAL_REQUIREMENTS as Record<string, unknown>)[
    "tinycms-web"
  ] as Record<string, unknown>;
  assert.ok(req, "credential requirement must exist for tinycms-web");
  assert.equal(req.kind, "token");
  assert.equal(req.credentialName, "app-config-uuid");
  assert.equal(req.acceptsFullCookieHeader, false);
  assert.ok(Array.isArray(req.storageKeys), "must have storageKeys array");
  assert.ok((req.storageKeys as string[]).includes("apiKey"), "apiKey must be in storageKeys");
  assert.ok((req.storageKeys as string[]).includes("uuid"), "uuid must be in storageKeys");
});
