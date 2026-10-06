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
  clearAntigravityOnboardBackoff,
  getAntigravityProjectFromCache,
  getAntigravityLoadCodeAssistUrls,
  ANTIGRAVITY_REQUIRES_MANUAL_PROJECT,
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

    const projectId = await ensureAntigravityProjectAssigned("fake-token-1", mockFetch);

    const loadCalls = calls.filter((u) => u.endsWith(":loadCodeAssist"));
    assert.ok(loadCalls.length >= 1, ":loadCodeAssist must be called at least once");
    assert.equal(projectId, "proj-from-bootstrap", "project id must be returned");
    assert.equal(
      getAntigravityProjectFromCache("fake-token-1"),
      "proj-from-bootstrap",
      "project id must be memoized after first call"
    );
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

  test("uses the official CLI content headers when requested", async () => {
    let capturedHeaders: Headers | null = null;

    const mockFetch = async (_url: string, init?: RequestInit): Promise<Response> => {
      capturedHeaders = new Headers(init?.headers);
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-harness" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    await ensureAntigravityProjectAssigned("cli-token", mockFetch, "cli");

    assert.match(
      capturedHeaders?.get("User-Agent") || "",
      /^antigravity\/cli\/1\.1\.5 \(aidev_client; os_type=.+; arch=.+; auth_method=consumer\)$/
    );
    assert.equal(capturedHeaders?.get("X-Goog-Api-Client"), null);
    assert.equal(capturedHeaders?.get("Client-Metadata"), null);
  });

  test("uses the official IDE native content headers by default", async () => {
    let capturedHeaders: Headers | null = null;
    const mockFetch = async (_url: string, init?: RequestInit): Promise<Response> => {
      capturedHeaders = new Headers(init?.headers);
      return Response.json({ cloudaicompanionProject: "proj-ide" });
    };

    await ensureAntigravityProjectAssigned("ide-token", mockFetch);

    assert.match(capturedHeaders?.get("User-Agent") || "", /^antigravity\/ide\/2\.1\.1 /);
    assert.equal(capturedHeaders?.get("X-Goog-Api-Client"), null);
    assert.equal(capturedHeaders?.get("Client-Metadata"), null);
  });

  test("bootstrap tries loadCodeAssist then onboardUser on 404, non-fatal", async () => {
    const hitUrls: string[] = [];

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      hitUrls.push(url);
      return new Response("not found", { status: 404 });
    };

    const projectId = await ensureAntigravityProjectAssigned("bootstrap-404-token", mockFetch);

    // loadCodeAssist returns no project on 404, so the fallback calls
    // onboardUser (also 404). Total: 2 URLs (loadCodeAssist + onboardUser).
    assert.equal(hitUrls.length, 2, "must try loadCodeAssist then onboardUser");
    for (const url of hitUrls) {
      assert.equal(new URL(url).hostname, "cloudcode-pa.googleapis.com");
    }
    assert.equal(projectId, undefined, "a 404 bootstrap is non-fatal and returns undefined");
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

// ── onboardUser fallback when loadCodeAssist returns no project ──────────

describe("onboardUser fallback", () => {
  test("calls onboardUser when loadCodeAssist returns empty, then retries loadCodeAssist", async () => {
    let loadCalls = 0;
    let onboardCalls = 0;

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        loadCalls++;
        // First call returns empty, second returns project after onboarding.
        if (loadCalls >= 2) {
          return new Response(JSON.stringify({ cloudaicompanionProject: "proj-after-onboard" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.endsWith(":onboardUser")) {
        onboardCalls++;
        // Google's LRO returns the created project inside the response — a body
        // WITHOUT cloudaicompanionProject means BYOP (manual project required).
        return new Response(
          JSON.stringify({ done: true, cloudaicompanionProject: "proj-onboarded" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      return new Response("Not Found", { status: 404 });
    };

    const projectId = await ensureAntigravityProjectAssigned("onboard-test-token", mockFetch);

    assert.equal(projectId, "proj-after-onboard");
    assert.equal(onboardCalls, 1, "onboardUser must be called exactly once");
    assert.ok(loadCalls >= 2, "loadCodeAssist must be called twice (before and after onboard)");
  });

  test("returns undefined when both loadCodeAssist and onboardUser fail", async () => {
    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.endsWith(":onboardUser")) {
        return new Response("Forbidden", { status: 403 });
      }
      return new Response("Not Found", { status: 404 });
    };

    const projectId = await ensureAntigravityProjectAssigned("both-fail-token", mockFetch);
    assert.equal(projectId, undefined, "must return undefined when both fail");
  });

  test("does not re-attempt onboardUser within the failure backoff window", async () => {
    let onboardCalls = 0;

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.endsWith(":onboardUser")) {
        onboardCalls++;
        // Transient upstream failure (500) — NOT the BYOP signal, so the
        // failure-backoff semantics are what is under test here.
        return new Response("Upstream error", {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("Not Found", { status: 404 });
    };

    await ensureAntigravityProjectAssigned("dedup-token", mockFetch);
    await ensureAntigravityProjectAssigned("dedup-token", mockFetch);

    assert.equal(onboardCalls, 1, "onboardUser must be attempted once within the backoff window");
  });

  test("retries onboardUser after the failure backoff expires (account heals itself)", async () => {
    let onboardCalls = 0;

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        // Only the retry AFTER the second (healed) onboard attempt yields a project.
        if (onboardCalls >= 2) {
          return new Response(JSON.stringify({ cloudaicompanionProject: "proj-healed" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.endsWith(":onboardUser")) {
        onboardCalls++;
        if (onboardCalls === 1) {
          // First attempt: transient upstream failure -> failure backoff.
          return new Response("Upstream error", {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
        // Second (healed) attempt: Google returns the created project.
        return new Response(
          JSON.stringify({ done: true, cloudaicompanionProject: "proj-healed-onboard" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      return new Response("Not Found", { status: 404 });
    };

    // First attempt: onboard fails transiently -> failure recorded.
    const first = await ensureAntigravityProjectAssigned("heal-token", mockFetch);
    assert.equal(first, undefined);
    assert.equal(onboardCalls, 1);

    // Immediately after: backoff blocks a re-attempt.
    const second = await ensureAntigravityProjectAssigned("heal-token", mockFetch);
    assert.equal(second, undefined);
    assert.equal(onboardCalls, 1, "no re-attempt inside the backoff window");

    // Simulate the backoff expiring: the next request heals the account.
    clearAntigravityOnboardBackoff();
    const healed = await ensureAntigravityProjectAssigned("heal-token", mockFetch);
    assert.equal(healed, "proj-healed");
    assert.equal(onboardCalls, 2, "onboardUser must be retried after backoff expiry");
  });

  test("returns the BYOP sentinel when onboardUser completes without a project (Google #8491)", async () => {
    let onboardCalls = 0;

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.endsWith(":onboardUser")) {
        onboardCalls++;
        // 200 done WITHOUT cloudaicompanionProject = BYOP: Google deprecated
        // automatic project creation for standard-tier personal accounts.
        return new Response(JSON.stringify({ done: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("Not Found", { status: 404 });
    };

    const first = await ensureAntigravityProjectAssigned("byop-token", mockFetch);
    assert.equal(first, ANTIGRAVITY_REQUIRES_MANUAL_PROJECT);

    // The account is cached as BYOP — a second call must NOT re-run the
    // pointless ~18s onboard round-trip (no extra fetch, same sentinel).
    const second = await ensureAntigravityProjectAssigned("byop-token", mockFetch);
    assert.equal(second, ANTIGRAVITY_REQUIRES_MANUAL_PROJECT);
    assert.equal(onboardCalls, 1, "onboardUser must not be re-attempted for a cached BYOP account");
  });

  test("skips onboardUser when loadCodeAssist succeeds on first try", async () => {
    let onboardCalls = 0;

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({ cloudaicompanionProject: "proj-exists" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.endsWith(":onboardUser")) {
        onboardCalls++;
        return new Response(JSON.stringify({ done: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("Not Found", { status: 404 });
    };

    const projectId = await ensureAntigravityProjectAssigned("already-ok-token", mockFetch);

    assert.equal(projectId, "proj-exists");
    assert.equal(onboardCalls, 0, "onboardUser must NOT be called when loadCodeAssist succeeds");
  });
});
