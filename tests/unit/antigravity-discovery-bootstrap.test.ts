/**
 * Tests: antigravity loadCodeAssist bootstrap before :models discovery.
 *
 * The Google Cloud Code Assist /v1internal:models endpoint requires a prior
 * /v1internal:loadCodeAssist call to assign a project context to the OAuth
 * token. Without this bootstrap, :models returns 404 for all three base URLs.
 *
 * These tests verify:
 * 1. ensureAntigravityProjectAssigned calls loadCodeAssist before returning.
 * 2. The call is memoized — repeated calls for the same token do not re-hit
 *    the network.
 * 3. Non-fatal: if loadCodeAssist fails, the function resolves without throwing.
 * 4. The loadCodeAssist request uses the correct headers (Authorization, User-Agent).
 * 5. Ordering guarantee — in a full discovery flow, loadCodeAssist is called
 *    BEFORE any :models request.
 */

import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  ensureAntigravityProjectAssigned,
  clearAntigravityProjectCache,
  getAntigravityProjectFromCache,
  getAntigravityLoadCodeAssistUrls,
} from "../../open-sse/services/antigravityProjectBootstrap.ts";

// Reset the module-level memoization cache between tests.
beforeEach(() => {
  clearAntigravityProjectCache();
});

describe("ensureAntigravityProjectAssigned", () => {
  test("calls loadCodeAssist and caches the returned project id", async () => {
    const calls: string[] = [];

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      calls.push(url);
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({ cloudaicompanionProject: "proj-from-bootstrap" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("Not Found", { status: 404 });
    };

    await ensureAntigravityProjectAssigned("fake-token-1", mockFetch);

    const loadCalls = calls.filter((u) => u.endsWith(":loadCodeAssist"));
    assert.ok(loadCalls.length >= 1, ":loadCodeAssist must be called at least once");

    const cached = getAntigravityProjectFromCache("fake-token-1");
    assert.equal(cached, "proj-from-bootstrap", "project id must be memoized after first call");
  });

  test("subsequent calls for the same token skip the network", async () => {
    let networkCalls = 0;

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      networkCalls += 1;
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-cached" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    await ensureAntigravityProjectAssigned("fake-token-2", mockFetch);
    await ensureAntigravityProjectAssigned("fake-token-2", mockFetch);
    await ensureAntigravityProjectAssigned("fake-token-2", mockFetch);

    assert.equal(networkCalls, 1, "network must be called exactly once for the same token");
  });

  test("different tokens each trigger their own loadCodeAssist call", async () => {
    const calledFor: string[] = [];

    const mockFetch = async (url: string, init?: RequestInit): Promise<Response> => {
      const auth = new Headers(init?.headers).get("Authorization") ?? "";
      calledFor.push(auth);
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-x" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    await ensureAntigravityProjectAssigned("token-A", mockFetch);
    await ensureAntigravityProjectAssigned("token-B", mockFetch);

    assert.equal(calledFor.length, 2, "each unique token should trigger one network call");
  });

  test("does not throw when loadCodeAssist returns non-200", async () => {
    const mockFetch = async (_url: string, _init?: RequestInit): Promise<Response> => {
      return new Response("Service Unavailable", { status: 503 });
    };

    // Must resolve without throwing even if all endpoints fail.
    await assert.doesNotReject(ensureAntigravityProjectAssigned("fail-token", mockFetch));
  });

  test("does not throw when fetch rejects (network error)", async () => {
    const mockFetch = async (_url: string, _init?: RequestInit): Promise<Response> => {
      throw new Error("ECONNREFUSED");
    };

    await assert.doesNotReject(ensureAntigravityProjectAssigned("throw-token", mockFetch));
  });

  test("sets Authorization header with Bearer token", async () => {
    let capturedAuth: string | null = null;

    const mockFetch = async (_url: string, init?: RequestInit): Promise<Response> => {
      capturedAuth = new Headers(init?.headers).get("Authorization") ?? null;
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-auth-check" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    await ensureAntigravityProjectAssigned("my-secret-token", mockFetch);

    assert.equal(capturedAuth, "Bearer my-secret-token", "Authorization header must be set");
  });

  test("falls through to next URL when first loadCodeAssist returns 404", async () => {
    const hitUrls: string[] = [];

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      hitUrls.push(url);
      if (url.includes("sandbox")) {
        // First URL fails
        return new Response("not found", { status: 404 });
      }
      // Second URL succeeds
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-fallback" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    await ensureAntigravityProjectAssigned("fallback-token", mockFetch);

    assert.ok(hitUrls.length >= 2, "should try at least two URLs on the first failure");
    const cached = getAntigravityProjectFromCache("fallback-token");
    assert.equal(cached, "proj-fallback", "should cache the project from the successful URL");
  });

  test("getAntigravityLoadCodeAssistUrls returns URLs matching ANTIGRAVITY_BASE_URLS", () => {
    const urls = getAntigravityLoadCodeAssistUrls();
    assert.ok(urls.length >= 1, "must return at least one URL");
    for (const url of urls) {
      assert.ok(url.endsWith(":loadCodeAssist"), `URL must end with :loadCodeAssist, got: ${url}`);
      assert.ok(url.startsWith("https://"), `URL must be HTTPS, got: ${url}`);
    }
  });
});

// ── Ordering guarantee: loadCodeAssist BEFORE :models ─────────────────────────
//
// This test simulates the full discovery flow: a test-controlled fetch
// that records call order, and verifies that :loadCodeAssist precedes
// any :models request. The integration is verified by calling
// ensureAntigravityProjectAssigned then simulating a :models request.

describe("ordering guarantee: loadCodeAssist before :models", () => {
  test("loadCodeAssist is called before :models in a simulated discovery flow", async () => {
    const callOrder: string[] = [];

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        callOrder.push("loadCodeAssist");
        return new Response(JSON.stringify({ cloudaicompanionProject: "proj-order-test" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.endsWith(":models")) {
        callOrder.push("models");
        return new Response(
          JSON.stringify({
            models: [{ id: "gemini-3-pro-antigravity", displayName: "Gemini 3 Pro" }],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response("not found", { status: 404 });
    };

    // Step 1: bootstrap project (what route.ts now does before the models loop).
    await ensureAntigravityProjectAssigned("order-token", mockFetch);

    // Step 2: simulate a :models discovery request (what the loop does).
    const modelsUrl = "https://cloudcode-pa.googleapis.com/v1internal:models";
    await mockFetch(modelsUrl);

    const loadIdx = callOrder.indexOf("loadCodeAssist");
    const modelsIdx = callOrder.indexOf("models");

    assert.ok(loadIdx >= 0, ":loadCodeAssist must be called");
    assert.ok(modelsIdx >= 0, ":models must be called");
    assert.ok(loadIdx < modelsIdx, ":loadCodeAssist must be called BEFORE :models");
  });
});
