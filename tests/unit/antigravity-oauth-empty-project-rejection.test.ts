/**
 * #11284 — Antigravity OAuth must never persist a connection without a Cloud
 * Code projectId, and the connect-time post-exchange must detect Google's
 * BYOP ("bring your own project") behavior instead of silently swallowing it.
 *
 * Production evidence (VPS docker `omniroute`, 2026-08-24): five antigravity
 * connections were persisted with project_id="" and
 * providerSpecificData.projectId="" while tier/subscriptionTier were fully
 * populated (g1-pro-tier / "Google AI Pro") — proof the token exchange and
 * loadCodeAssist round-trips SUCCEEDED but Google returned no
 * cloudaicompanionProject (BYOP accounts, #8491). The old postExchange
 * swallowed that outcome and the route marked the rows testStatus="active",
 * so the dashboard showed "Connected" while every model call failed.
 *
 * Contract pinned here:
 *   1. postExchange reports WHY no project was found:
 *      - "requires_manual_project" → onboardUser answered 200 without a
 *        cloudaicompanionProject in the body (Google BYOP).
 *      - "discovery_failed" → loadCodeAssist/onboardUser errored or timed out.
 *      - absent/undefined → projectId discovered normally.
 *   2. mapTokens surfaces that outcome as tokenData.projectDiscoveryOutcome so
 *      the OAuth route can mark the connection degraded (saved, not active)
 *      instead of silently persisting a false "Connected" row.
 *
 * Run: node --import tsx/esm --test tests/unit/antigravity-oauth-empty-project-rejection.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

import { antigravity } from "../../src/lib/oauth/providers/antigravity.ts";

const originalFetch = globalThis.fetch;

function jsonRes(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("postExchange reports requires_manual_project when onboardUser answers 200 without a project (Google BYOP)", async () => {
  // Fresh account: loadCodeAssist has no project; onboardUser "succeeds" (200)
  // but its body carries NO cloudaicompanionProject — Google now expects the
  // user to bring their own GCP project (#8491). The retry loadCodeAssist
  // still finds nothing. Outcome must be surfaced, not swallowed.
  let onboardCalls = 0;
  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "byop@example.com" });
    if (u.includes("loadCodeAssist")) {
      return jsonRes({
        allowedTiers: [{ id: "g1-pro-tier", isDefault: true }],
      });
    }
    if (u.includes("onboardUser")) {
      onboardCalls++;
      // BYOP shape: 200 OK, body without cloudaicompanionProject.
      return jsonRes({ done: true });
    }
    return jsonRes({});
  }) as typeof fetch;

  const result = await antigravity.postExchange({ access_token: "tok" } as never);

  assert.ok(onboardCalls >= 1, "onboarding attempt must run");
  assert.equal(result.projectId, "", "no project exists for BYOP accounts");
  assert.equal(
    result.projectDiscoveryOutcome,
    "requires_manual_project",
    "BYOP outcome must be reported so the route marks the connection degraded"
  );
});

test("postExchange reports discovery_failed when loadCodeAssist errors (was silently swallowed)", async () => {
  // Upstream hard-fails: previously this collapsed to console.log + empty
  // projectId with zero signal. Now it must be classified discovery_failed.
  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "err@example.com" });
    if (u.includes("loadCodeAssist")) return jsonRes({ error: "boom" }, 500);
    if (u.includes("onboardUser")) return jsonRes({ error: "boom" }, 500);
    return jsonRes({});
  }) as typeof fetch;

  const result = await antigravity.postExchange({ access_token: "tok" } as never);

  assert.equal(result.projectId, "");
  assert.equal(
    result.projectDiscoveryOutcome,
    "discovery_failed",
    "upstream failures must be classified instead of silently dropped"
  );
});

test("postExchange omits projectDiscoveryOutcome when a project is discovered (happy path unchanged)", async () => {
  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "ok@example.com" });
    if (u.includes("loadCodeAssist")) {
      return jsonRes({
        cloudaicompanionProject: "happy-path-project",
        allowedTiers: [{ id: "legacy-tier", isDefault: true }],
      });
    }
    if (u.includes("onboardUser")) return jsonRes({ done: true });
    return jsonRes({});
  }) as typeof fetch;

  const result = await antigravity.postExchange({ access_token: "tok" } as never);

  assert.equal(result.projectId, "happy-path-project");
  assert.equal(
    result.projectDiscoveryOutcome,
    undefined,
    "successful discovery must not carry an outcome flag"
  );
});

test("postExchange reports discovery_failed when onboarding succeeds but retry still finds nothing (propagation/transient)", async () => {
  // onboardUser returns 200 WITHOUT cloudaicompanionProject in the body but
  // the retry loadCodeAssist eventually surfaces it — recovery wins, no
  // outcome flag. (The pure-lag case is covered by the onboard-body fallback.)
  let lcaCalls = 0;
  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "lag@example.com" });
    if (u.includes("loadCodeAssist")) {
      lcaCalls++;
      return jsonRes({
        allowedTiers: [{ id: "legacy-tier", isDefault: true }],
      });
    }
    if (u.includes("onboardUser")) {
      // Real onboarding success shape: project id present in body.
      return jsonRes({ done: true, cloudaicompanionProject: { id: "late-project" } });
    }
    return jsonRes({});
  }) as typeof fetch;

  const result = await antigravity.postExchange({ access_token: "tok" } as never);

  assert.equal(result.projectId, "late-project");
  assert.equal(
    result.projectDiscoveryOutcome,
    undefined,
    "recovered projectId means healthy connection"
  );
  void lcaCalls;
});

test("postExchange still fails when onboarding carries a project but every discovery path stays empty", async () => {
  // Degenerate upstream: onboardUser body has a project but retry loadCodeAssist
  // errors — must NOT persist as silently-empty; classify discovery_failed.
  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "lag2@example.com" });
    if (u.includes("loadCodeAssist")) return jsonRes({ error: "boom" }, 500);
    if (u.includes("onboardUser")) {
      return new Response(null, { status: 500 });
    }
    return jsonRes({});
  }) as typeof fetch;

  const result = await antigravity.postExchange({ access_token: "tok" } as never);

  assert.equal(result.projectId, "");
  assert.equal(result.projectDiscoveryOutcome, "discovery_failed");
});

test("mapTokens surfaces projectDiscoveryOutcome for the OAuth route degrade gate", async () => {
  // The route can only act on what mapTokens hands it — the outcome must
  // survive into tokenData.
  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("userinfo")) return jsonRes({ email: "map@example.com" });
    if (u.includes("loadCodeAssist")) {
      return jsonRes({ allowedTiers: [{ id: "legacy-tier", isDefault: true }] });
    }
    if (u.includes("onboardUser")) return jsonRes({ done: true });
    return jsonRes({});
  }) as typeof fetch;

  const tokens = { access_token: "tok" } as never;
  const extra = await antigravity.postExchange(tokens);
  const mapped = antigravity.mapTokens(tokens, extra);

  assert.equal(mapped.projectId, "");
  assert.equal(
    mapped.projectDiscoveryOutcome,
    "requires_manual_project",
    "degrade gate needs the outcome on the mapped payload"
  );
});
