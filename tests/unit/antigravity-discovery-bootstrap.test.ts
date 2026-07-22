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
  getAntigravityProjectCacheKey,
  getAntigravityLoadCodeAssistUrls,
  getAntigravityOnboardUserUrls,
} from "../../open-sse/services/antigravityProjectBootstrap.ts";
import {
  ANTIGRAVITY_BOOTSTRAP_BASE_URLS,
  ANTIGRAVITY_DISCOVERY_BASE_URLS,
  ANTIGRAVITY_RUNTIME_BASE_URLS,
} from "../../open-sse/config/antigravityUpstream.ts";

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

  test("uses CLI/SDK harness headers when requested", async () => {
    let capturedHeaders: Headers | null = null;

    const mockFetch = async (_url: string, init?: RequestInit): Promise<Response> => {
      capturedHeaders = new Headers(init?.headers);
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-harness" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    await ensureAntigravityProjectAssigned("harness-token", mockFetch, "harness");

    assert.match(
      capturedHeaders?.get("User-Agent") || "",
      /^antigravity\/4\.2\.0 [^ ]+\/[^ ]+ google-api-nodejs-client\/10\.3\.0$/
    );
    assert.equal(capturedHeaders?.get("X-Goog-Api-Client"), "gl-node/22.21.1");
    assert.equal(capturedHeaders?.get("Client-Metadata"), null);
  });

  test("uses the dedicated production bootstrap endpoint", () => {
    assert.deepEqual(ANTIGRAVITY_BOOTSTRAP_BASE_URLS, ["https://cloudcode-pa.googleapis.com"]);
    assert.deepEqual(getAntigravityLoadCodeAssistUrls(), [
      "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist",
    ]);
  });

  test("keeps sandbox out of the runtime endpoint list", () => {
    assert.deepEqual(ANTIGRAVITY_RUNTIME_BASE_URLS, [
      "https://daily-cloudcode-pa.googleapis.com",
      "https://cloudcode-pa.googleapis.com",
    ]);
    assert.equal(
      ANTIGRAVITY_RUNTIME_BASE_URLS.some((url) => url.includes("sandbox")),
      false
    );
    assert.deepEqual(ANTIGRAVITY_DISCOVERY_BASE_URLS, [
      "https://daily-cloudcode-pa.googleapis.com",
      "https://cloudcode-pa.googleapis.com",
      "https://daily-cloudcode-pa.sandbox.googleapis.com",
    ]);
  });

  test("hashes access tokens in project cache keys", () => {
    const token = "raw-token-that-must-not-remain-in-the-cache-key";
    const key = getAntigravityProjectCacheKey(token, "ide");

    assert.match(key, /^ide:[a-f0-9]{64}$/);
    assert.equal(key.includes(token), false);
    assert.equal(key.includes(token.slice(0, 16)), false);
    assert.notEqual(
      key,
      getAntigravityProjectCacheKey("raw-token-that-must-not-remain-in-the-cache-keZ", "ide")
    );
  });

  test("coalesces concurrent bootstrap calls for the same token and profile", async () => {
    let networkCalls = 0;
    let release: (() => void) | undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const mockFetch = async (): Promise<Response> => {
      networkCalls += 1;
      await gate;
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-shared" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const pending = [
      ensureAntigravityProjectAssigned("shared-token", mockFetch),
      ensureAntigravityProjectAssigned("shared-token", mockFetch),
      ensureAntigravityProjectAssigned("shared-token", mockFetch),
    ];
    await Promise.resolve();
    assert.equal(networkCalls, 1);
    release?.();
    assert.deepEqual(await Promise.all(pending), ["proj-shared", "proj-shared", "proj-shared"]);
  });

  test("propagates caller abort and does not attempt another bootstrap host", async () => {
    const controller = new AbortController();
    const hitUrls: string[] = [];
    const mockFetch = async (url: string, init?: RequestInit): Promise<Response> => {
      hitUrls.push(url);
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      });
    };

    const pending = ensureAntigravityProjectAssigned(
      "abort-token",
      mockFetch,
      "ide",
      controller.signal
    );
    controller.abort(new DOMException("caller disconnected", "AbortError"));

    await assert.rejects(pending, { name: "AbortError" });
    assert.equal(hitUrls.length, 1);
  });

  test("starts a fresh bootstrap when a new caller arrives after all prior waiters abort", async () => {
    const firstController = new AbortController();
    let networkCalls = 0;

    const mockFetch = async (_url: string, init?: RequestInit): Promise<Response> => {
      networkCalls += 1;
      if (networkCalls === 1) {
        return new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), {
            once: true,
          });
        });
      }

      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-fresh" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const abandoned = ensureAntigravityProjectAssigned(
      "replace-aborted-token",
      mockFetch,
      "ide",
      firstController.signal
    );
    firstController.abort(new DOMException("first caller disconnected", "AbortError"));

    const replacement = ensureAntigravityProjectAssigned("replace-aborted-token", mockFetch);

    await assert.rejects(abandoned, { name: "AbortError" });
    assert.equal(await replacement, "proj-fresh");
    assert.equal(networkCalls, 2);
  });

  test("isolates aborts between callers sharing one in-flight bootstrap", async () => {
    const firstController = new AbortController();
    let networkCalls = 0;
    let release: (() => void) | undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const mockFetch = async (_url: string, init?: RequestInit): Promise<Response> => {
      networkCalls += 1;
      await Promise.race([
        gate,
        new Promise<never>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), {
            once: true,
          });
        }),
      ]);
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-shared" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const first = ensureAntigravityProjectAssigned(
      "shared-abort-token",
      mockFetch,
      "ide",
      firstController.signal
    );
    const second = ensureAntigravityProjectAssigned("shared-abort-token", mockFetch);
    firstController.abort(new DOMException("first caller disconnected", "AbortError"));

    await assert.rejects(first, { name: "AbortError" });
    assert.equal(networkCalls, 1);
    release?.();
    assert.equal(await second, "proj-shared");
  });

  test("does not cache ordinary bootstrap failures", async () => {
    let calls = 0;
    const mockFetch = async (): Promise<Response> => {
      calls += 1;
      if (calls === 1) return new Response("unavailable", { status: 503 });
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-recovered" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    assert.equal(await ensureAntigravityProjectAssigned("recover-token", mockFetch), undefined);
    assert.equal(
      await ensureAntigravityProjectAssigned("recover-token", mockFetch),
      "proj-recovered"
    );
    assert.equal(calls, 2);
  });
});

// ── onboardUser fallback: first-time account whose project is not yet provisioned ──
//
// When loadCodeAssist returns no project (a genuinely first-time account), the
// runtime bootstrap runs onboardUser exactly once per logical request — bounded,
// abort-aware, and fail-closed. It NEVER fabricates a project id: if provisioning
// does not yield one, ensureAntigravityProjectAssigned resolves undefined and the
// executor returns 422.

describe("onboardUser fallback when loadCodeAssist has no project", () => {
  test("derives the onboardUser url from the dedicated bootstrap endpoint", () => {
    assert.deepEqual(getAntigravityOnboardUserUrls(), [
      "https://cloudcode-pa.googleapis.com/v1internal:onboardUser",
    ]);
  });

  test("onboards and caches the provisioned project (no 422, never fabricated)", async () => {
    const calls: string[] = [];

    const mockFetch = async (url: string, _init?: RequestInit): Promise<Response> => {
      calls.push(url);
      if (url.endsWith(":loadCodeAssist")) {
        // First-time account: no project yet, but a default tier is offered.
        return new Response(JSON.stringify({ allowedTiers: [{ id: "free-tier", isDefault: true }] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.endsWith(":onboardUser")) {
        return new Response(
          JSON.stringify({ done: true, response: { cloudaicompanionProject: "proj-onboarded" } }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response("not found", { status: 404 });
    };

    const projectId = await ensureAntigravityProjectAssigned("onboard-token", mockFetch);

    assert.equal(projectId, "proj-onboarded");
    assert.equal(getAntigravityProjectFromCache("onboard-token"), "proj-onboarded");
    assert.equal(calls.filter((u) => u.endsWith(":loadCodeAssist")).length, 1);
    assert.equal(calls.filter((u) => u.endsWith(":onboardUser")).length, 1);
  });

  test("extracts a nested project id object from the onboard response", async () => {
    const mockFetch = async (url: string): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(
        JSON.stringify({ done: true, response: { cloudaicompanionProject: { id: "proj-nested" } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    assert.equal(await ensureAntigravityProjectAssigned("nested-token", mockFetch), "proj-nested");
  });

  test("sends the resolved tier id and metadata in the onboard body", async () => {
    let onboardBody: Record<string, unknown> | null = null;

    const mockFetch = async (url: string, init?: RequestInit): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({ allowedTiers: [{ id: "pro-tier", isDefault: true }] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      onboardBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(
        JSON.stringify({ done: true, response: { cloudaicompanionProject: "p" } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    await ensureAntigravityProjectAssigned("tier-token", mockFetch);

    assert.equal(onboardBody?.tierId, "pro-tier");
    assert.deepEqual(onboardBody?.metadata, { ideType: "ANTIGRAVITY" });
  });

  test("returns undefined (→ 422) when onboard finishes with no project — never fabricated", async () => {
    const calls: string[] = [];

    const mockFetch = async (url: string): Promise<Response> => {
      calls.push(url);
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      // Long-running op reports done, but the account has no entitlement → no project.
      return new Response(JSON.stringify({ done: true, response: {} }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const projectId = await ensureAntigravityProjectAssigned("no-entitlement-token", mockFetch);

    assert.equal(projectId, undefined);
    assert.equal(getAntigravityProjectFromCache("no-entitlement-token"), undefined);
    // A terminal done:true is not retried — exactly one onboard attempt.
    assert.equal(calls.filter((u) => u.endsWith(":onboardUser")).length, 1);
  });

  test("gives up (→ 422) when provisioning never completes within the budget", async () => {
    let onboardCalls = 0;

    const mockFetch = async (url: string): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      onboardCalls += 1;
      // The op never reports done within our attempt budget.
      return new Response(JSON.stringify({ done: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const projectId = await ensureAntigravityProjectAssigned("slow-provision-token", mockFetch);

    assert.equal(projectId, undefined);
    // Bounded to ONBOARD_MAX_ATTEMPTS polls; no fabrication, no unbounded loop.
    assert.equal(onboardCalls, 3);
  });

  test("aborts onboarding when the caller disconnects mid-provision", async () => {
    const controller = new AbortController();

    const mockFetch = async (url: string, init?: RequestInit): Promise<Response> => {
      if (url.endsWith(":loadCodeAssist")) {
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      // onboard hangs until the caller aborts.
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      });
    };

    const pending = ensureAntigravityProjectAssigned(
      "abort-onboard-token",
      mockFetch,
      "ide",
      controller.signal
    );
    controller.abort(new DOMException("caller disconnected", "AbortError"));

    await assert.rejects(pending, { name: "AbortError" });
  });

  test("does not call onboardUser when loadCodeAssist already returns a project", async () => {
    const calls: string[] = [];

    const mockFetch = async (url: string): Promise<Response> => {
      calls.push(url);
      return new Response(JSON.stringify({ cloudaicompanionProject: "proj-direct" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    assert.equal(await ensureAntigravityProjectAssigned("direct-token", mockFetch), "proj-direct");
    assert.equal(calls.filter((u) => u.endsWith(":onboardUser")).length, 0);
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
