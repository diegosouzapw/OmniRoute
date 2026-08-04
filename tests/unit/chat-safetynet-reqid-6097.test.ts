import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #6097 — Regression guard for the "safety-net combo redirect" ReferenceError.
//
// `handleSingleModelChat` (src/sse/handlers/chat.ts) contains a safety net: when
// `resolveModelOrError` resolves the incoming model to a combo object (e.g. an
// `auto/*` virtual combo), it redirects to `handleComboChat`. The argument object
// it built used `correlationId: reqId`, but `reqId` is only defined in the SIBLING
// `handleChat` scope — NOT inside `handleSingleModelChat`. Whenever that redirect
// actually fired, the handler threw `ReferenceError: reqId is not defined`, which
// surfaced to the client as a 502 `{"error":{"message":"reqId is not defined"}}`.
//
// The redirect is reached in practice when a persisted combo contains an `auto/*`
// member: `handleComboChat` iterates the outer combo's targets and calls
// `handleSingleModelChat("auto/fast", …)`; there `resolveModelOrError` discovers the
// virtual auto-combo and takes the safety-net branch. (The top-level `handleChat`
// combo lookup only sees the OUTER combo, so the auto member is only expanded one
// layer deeper — exactly the "main handler's combo lookup missed it" case the code
// comment describes.)
//
// The fix mirrors the 3 sibling call-sites: `correlationId: runtimeOptions?.correlationId ?? null`.
//
// This test drives the real /v1/chat/completions route with a nested-auto combo and
// asserts the redirect completes (200 + real upstream dispatch) instead of throwing.
// WITHOUT the fix it fails: 502 with the "reqId is not defined" body and zero fetches.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-safetynet-6097-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

const originalFetch = globalThis.fetch;

async function flushBackgroundWork() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  await new Promise((resolve) => setImmediate(resolve));
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test(
  "#6097 safety-net combo redirect does not throw ReferenceError: reqId is not defined",
  async () => {
    // A healthy provider connection so the inner auto/* combo has a candidate to
    // dispatch to once the safety-net redirect completes.
    await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "openai-safetynet-6097",
      apiKey: "sk-safetynet-6097",
      isActive: true,
      testStatus: "active",
    });

    // A persisted combo whose single member is a virtual `auto/*` combo. The
    // top-level handler resolves the OUTER combo; only when handleComboChat calls
    // handleSingleModelChat("auto/fast", …) does resolveModelOrError discover the
    // auto combo and fire the safety-net redirect.
    await combosDb.createCombo({
      name: "nested-auto-6097",
      strategy: "priority",
      models: [{ provider: "auto", model: "fast" }],
    });

    const fetchCalls: string[] = [];
    globalThis.fetch = async (url: any) => {
      fetchCalls.push(String(url));
      return Response.json({
        id: "chatcmpl-safetynet-6097",
        choices: [{ message: { role: "assistant", content: "OK" } }],
      });
    };

    const request = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forces the combo target to be attempted (bypasses availability
        // pre-skipping) so the redirect path is exercised deterministically.
        "X-Internal-Test": "combo-health-check",
      },
      body: JSON.stringify({
        model: "nested-auto-6097",
        messages: [{ role: "user", content: "Reply with OK only." }],
        max_tokens: 16,
        stream: false,
        temperature: 0,
      }),
    });

    const response = await chatRoute.POST(request);
    const bodyText = await response.text();

    // Primary guard: the exact bug signature must never appear.
    assert.ok(
      !bodyText.includes("reqId is not defined"),
      `safety-net redirect leaked a ReferenceError: ${bodyText.slice(0, 200)}`
    );

    // The redirect must complete successfully (buggy version returned 502).
    assert.equal(
      response.status,
      200,
      `expected 200 after safety-net redirect, got ${response.status}: ${bodyText.slice(0, 200)}`
    );

    // And it must have proceeded past the redirect into a real upstream dispatch
    // (buggy version threw before any fetch → zero calls).
    assert.ok(
      fetchCalls.length > 0,
      "expected the redirected inner combo to reach a real upstream fetch"
    );

    const body = JSON.parse(bodyText) as any;
    assert.equal(body.choices[0].message.content, "OK");
  }
);
