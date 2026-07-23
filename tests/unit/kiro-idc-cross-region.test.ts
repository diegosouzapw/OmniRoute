/**
 * Regression: Kiro enterprise IAM Identity Center accounts whose IdC instance lives OUTSIDE the
 * two Amazon Q Developer profile regions (us-east-1 / eu-central-1) — e.g. eu-north-1 (Stockholm),
 * start URL https://d-XXXX.awsapps.com/start.
 *
 * Root cause fixed here: the backend used the IdC/OIDC token region (eu-north-1) for every
 * CodeWhisperer runtime call, hitting q.eu-north-1.amazonaws.com — a host that does not exist as a
 * Q Developer runtime endpoint. Result: profileArn discovery failed (Limits showed nothing) and
 * generateAssistantResponse failed (every request 502). AWS hosts the Q Developer PROFILE (and its
 * runtime) only in us-east-1 / eu-central-1, regardless of the IdC region.
 *
 * The fix: the RUNTIME region is derived from the profileArn (us-east-1 / eu-central-1), and
 * profileArn discovery probes those profile regions with the cross-region SSO token — never the
 * IdC region.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveKiroRuntimeRegion,
  buildKiroProfileDiscoveryRegions,
  discoverKiroProfileArnAcrossRegions,
  kiroRuntimeHost,
  regionFromKiroProfileArn,
  KIRO_PROFILE_REGIONS,
} from "../../open-sse/services/kiroRegion.ts";
import { resolveKiroRegion as resolveExecutorRegion } from "../../open-sse/executors/kiro.ts";
import { kiro } from "@/lib/oauth/providers/kiro";
import { __testing } from "@omniroute/open-sse/services/usage.ts";

const { getKiroUsage } = __testing;

const EU_CENTRAL_ARN = "arn:aws:codewhisperer:eu-central-1:820374639727:profile/RX4VNUHGHGAQ";

test("KIRO_PROFILE_REGIONS is exactly us-east-1 and eu-central-1", () => {
  assert.deepEqual([...KIRO_PROFILE_REGIONS], ["us-east-1", "eu-central-1"]);
});

test("regionFromKiroProfileArn extracts the region from a CodeWhisperer ARN", () => {
  assert.equal(regionFromKiroProfileArn(EU_CENTRAL_ARN), "eu-central-1");
  assert.equal(
    regionFromKiroProfileArn("arn:aws:codewhisperer:us-east-1:1:profile/X"),
    "us-east-1"
  );
  assert.equal(regionFromKiroProfileArn(undefined), undefined);
  assert.equal(regionFromKiroProfileArn("not-an-arn"), undefined);
});

test("resolveKiroRuntimeRegion: profileArn region beats the IdC (eu-north-1) stored region", () => {
  // The exact failing scenario: IdC token region eu-north-1, profile in eu-central-1.
  assert.equal(
    resolveKiroRuntimeRegion({ region: "eu-north-1", profileArn: EU_CENTRAL_ARN }),
    "eu-central-1"
  );
});

test("resolveKiroRuntimeRegion: an IdC region that is not a Q profile region is ignored for runtime", () => {
  // No profileArn yet, IdC region eu-north-1 → must NOT route to q.eu-north-1; fall back to us-east-1.
  assert.equal(resolveKiroRuntimeRegion({ region: "eu-north-1" }), "us-east-1");
  assert.equal(resolveKiroRuntimeRegion({ region: "us-west-1" }), "us-east-1");
});

test("resolveKiroRuntimeRegion: a valid stored profile region is honored, defaults to us-east-1", () => {
  assert.equal(resolveKiroRuntimeRegion({ region: "eu-central-1" }), "eu-central-1");
  assert.equal(resolveKiroRuntimeRegion({ region: "us-east-1" }), "us-east-1");
  assert.equal(resolveKiroRuntimeRegion({}), "us-east-1");
  assert.equal(resolveKiroRuntimeRegion(null), "us-east-1");
});

test("the executor's resolveKiroRegion routes an eu-north-1 IdC account to the profile region", () => {
  assert.equal(
    resolveExecutorRegion({
      providerSpecificData: { region: "eu-north-1", profileArn: EU_CENTRAL_ARN },
    }),
    "eu-central-1"
  );
  // generateAssistantResponse must therefore target the real Q host, not q.eu-north-1.
  assert.equal(kiroRuntimeHost("eu-central-1"), "https://q.eu-central-1.amazonaws.com");
});

test("buildKiroProfileDiscoveryRegions: EU IdC probes the profile regions first, then the IdC region", () => {
  const regions = buildKiroProfileDiscoveryRegions("eu-north-1");
  assert.deepEqual(regions, ["eu-central-1", "us-east-1", "eu-north-1"]);
  // The profile regions (fast path) are tried BEFORE the IdC-region fallback.
  assert.ok(regions.indexOf("eu-central-1") < regions.indexOf("eu-north-1"));
  assert.ok(regions.indexOf("us-east-1") < regions.indexOf("eu-north-1"));
  // Another EMEA IdC region → still EU-first, IdC region appended as fallback.
  assert.deepEqual(buildKiroProfileDiscoveryRegions("me-central-1"), [
    "eu-central-1",
    "us-east-1",
    "me-central-1",
  ]);
});

test("buildKiroProfileDiscoveryRegions: non-EU IdC probes us-east-1 first, then the IdC region", () => {
  assert.deepEqual(buildKiroProfileDiscoveryRegions("us-west-2"), [
    "us-east-1",
    "eu-central-1",
    "us-west-2",
  ]);
  assert.deepEqual(buildKiroProfileDiscoveryRegions("ap-southeast-2"), [
    "us-east-1",
    "eu-central-1",
    "ap-southeast-2",
  ]);
  // No stored region → just the two profile regions.
  assert.deepEqual(buildKiroProfileDiscoveryRegions(undefined), ["us-east-1", "eu-central-1"]);
});

test("buildKiroProfileDiscoveryRegions: a stored profile region is probed first", () => {
  assert.deepEqual(buildKiroProfileDiscoveryRegions("eu-central-1"), ["eu-central-1", "us-east-1"]);
  assert.deepEqual(buildKiroProfileDiscoveryRegions("us-east-1"), ["us-east-1", "eu-central-1"]);
});

test("discoverKiroProfileArnAcrossRegions: eu-north-1 IdC finds the eu-central-1 profile, skips q.eu-north-1", async () => {
  const requested: string[] = [];
  const fetchImpl = (async (input: RequestInfo | URL) => {
    const url = String(input);
    requested.push(url);
    // Simulate reality: q.eu-north-1 does not exist (network failure); eu-central-1 hosts the profile.
    if (url.includes("eu-north-1")) throw new Error("ENOTFOUND q.eu-north-1.amazonaws.com");
    if (url.includes("eu-central-1")) {
      return new Response(JSON.stringify({ profiles: [{ arn: EU_CENTRAL_ARN }] }), { status: 200 });
    }
    // us-east-1 has no profile for this identity.
    return new Response(JSON.stringify({ profiles: [] }), { status: 200 });
  }) as unknown as typeof fetch;

  const arn = await discoverKiroProfileArnAcrossRegions("sso-token", "eu-north-1", fetchImpl);
  assert.equal(arn, EU_CENTRAL_ARN);
  assert.ok(
    requested.every((u) => !u.includes("eu-north-1")),
    `must never probe q.eu-north-1, got: ${JSON.stringify(requested)}`
  );
  assert.ok(
    requested.some((u) => u.startsWith("https://q.eu-central-1.amazonaws.com/")),
    "must probe the eu-central-1 Q Developer host"
  );
});

test("discoverKiroProfileArnAcrossRegions: a non-EU (ap-southeast-2) IdC resolves a us-east-1 profile", async () => {
  // Proves the fix is general, not eu-north-1-specific: an APAC IdC's profile lives in a Q
  // profile region (us-east-1 here) and is found via the cross-region SSO token.
  const US_EAST_ARN = "arn:aws:codewhisperer:us-east-1:111111111111:profile/APAC";
  const requested: string[] = [];
  const fetchImpl = (async (input: RequestInfo | URL) => {
    const url = String(input);
    requested.push(url);
    if (url.includes("us-east-1")) {
      return new Response(JSON.stringify({ profiles: [{ arn: US_EAST_ARN }] }), { status: 200 });
    }
    return new Response(JSON.stringify({ profiles: [] }), { status: 200 });
  }) as unknown as typeof fetch;

  const arn = await discoverKiroProfileArnAcrossRegions("sso-token", "ap-southeast-2", fetchImpl);
  assert.equal(arn, US_EAST_ARN);
  assert.equal(
    resolveKiroRuntimeRegion({ region: "ap-southeast-2", profileArn: arn }),
    "us-east-1"
  );
  // The us-east-1 profile region is probed before the ap-southeast-2 IdC-region fallback.
  assert.ok(requested.some((u) => u.startsWith("https://codewhisperer.us-east-1.amazonaws.com/")));
});

test("discoverKiroProfileArnAcrossRegions: no token / no profile yields undefined without throwing", async () => {
  assert.equal(await discoverKiroProfileArnAcrossRegions("", "eu-north-1"), undefined);
  const emptyFetch = (async () =>
    new Response(JSON.stringify({ profiles: [] }), { status: 200 })) as unknown as typeof fetch;
  assert.equal(
    await discoverKiroProfileArnAcrossRegions("tok", "eu-north-1", emptyFetch),
    undefined
  );
});

test("kiro.postExchange (login) discovers the eu-central-1 profile for an eu-north-1 IdC token", async () => {
  const originalFetch = global.fetch;
  const requested: string[] = [];
  global.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    requested.push(url);
    if (url.includes("eu-north-1")) throw new Error("ENOTFOUND");
    if (url.includes("eu-central-1")) {
      return new Response(JSON.stringify({ profiles: [{ arn: EU_CENTRAL_ARN }] }), { status: 200 });
    }
    return new Response(JSON.stringify({ profiles: [] }), { status: 200 });
  }) as typeof fetch;

  try {
    const extra = await kiro.postExchange({ access_token: "sso-token", _region: "eu-north-1" });
    assert.deepEqual(extra, { profileArn: EU_CENTRAL_ARN });
    assert.ok(requested.every((u) => !u.includes("eu-north-1")));
  } finally {
    global.fetch = originalFetch;
  }
});

test("kiro.mapTokens keeps region=eu-north-1 (for OIDC refresh) AND stores the eu-central-1 profileArn", () => {
  const mapped = kiro.mapTokens(
    { access_token: "at", refresh_token: "rt", expires_in: 3600, _region: "eu-north-1" },
    { profileArn: EU_CENTRAL_ARN }
  );
  // region stays the IdC/OIDC region so token refresh hits oidc.eu-north-1.amazonaws.com …
  assert.equal(mapped.providerSpecificData.region, "eu-north-1");
  // … while the profileArn carries the eu-central-1 runtime region for CodeWhisperer calls.
  assert.equal(mapped.providerSpecificData.profileArn, EU_CENTRAL_ARN);
});

test("getKiroUsage: eu-north-1 IdC account resolves quota via the eu-central-1 profile", async () => {
  const originalFetch = globalThis.fetch;
  const requested: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const target = String(
      (init?.headers as Record<string, string> | undefined)?.["x-amz-target"] || ""
    );
    requested.push(`${target} ${url}`);
    // q.eu-north-1 must never be contacted.
    if (url.includes("eu-north-1")) throw new Error("ENOTFOUND q.eu-north-1");
    if (target.endsWith("ListAvailableProfiles")) {
      if (url.includes("eu-central-1")) {
        return new Response(JSON.stringify({ profiles: [{ arn: EU_CENTRAL_ARN }] }), {
          status: 200,
        });
      }
      return new Response(JSON.stringify({ profiles: [] }), { status: 200 });
    }
    // GetUsageLimits at the eu-central-1 host → real IAM CREDIT breakdown.
    return new Response(
      JSON.stringify({
        subscriptionInfo: { subscriptionTitle: "KIRO POWER" },
        usageBreakdownList: [
          {
            resourceType: "CREDIT",
            currentUsageWithPrecision: 12,
            usageLimitWithPrecision: 1000,
          },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    // No persisted profileArn (the broken state), IdC region eu-north-1.
    const result = (await getKiroUsage("sso-token", {
      authMethod: "idc",
      region: "eu-north-1",
    })) as {
      plan?: string;
      quotas?: Record<string, { used: number; total: number }>;
      message?: string;
    };
    assert.ok(result.quotas, `expected quotas, got: ${JSON.stringify(result)}`);
    assert.equal(result.plan, "KIRO POWER");
    assert.equal(result.quotas!.credit.used, 12);
    assert.equal(result.quotas!.credit.total, 1000);
    // GetUsageLimits must have gone to the eu-central-1 runtime host, never q.eu-north-1.
    assert.ok(
      requested.some((r) => r.includes("GetUsageLimits") && r.includes("eu-central-1")),
      `GetUsageLimits should hit eu-central-1, got: ${JSON.stringify(requested)}`
    );
    assert.ok(requested.every((r) => !r.includes("eu-north-1")));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
