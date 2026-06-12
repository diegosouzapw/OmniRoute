/**
 * Kiro enterprise IAM Identity Center region routing.
 *
 * Kiro/CodeWhisperer access tokens and Q Developer profile ARNs are region-bound. Enterprise
 * IAM Identity Center accounts whose profile lives outside us-east-1 (e.g. eu-central-1) must
 * route to the regional Amazon Q endpoint (q.{region}.amazonaws.com) with the region-matched
 * profileArn — sending them to the default us-east-1 host fails with 403/400. These tests cover
 * the region resolver, the regional host mapping, and the profileArn discovery added to the
 * device-code login.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { resolveKiroRegion, kiroRuntimeHost } from "../../open-sse/executors/kiro.ts";
import { kiro } from "@/lib/oauth/providers/kiro";

test("resolveKiroRegion prefers the stored region", () => {
  assert.equal(resolveKiroRegion({ providerSpecificData: { region: "eu-central-1" } }), "eu-central-1");
});

test("resolveKiroRegion falls back to the region in the profileArn", () => {
  assert.equal(
    resolveKiroRegion({
      providerSpecificData: {
        profileArn: "arn:aws:codewhisperer:ap-southeast-2:123456789012:profile/ABC123",
      },
    }),
    "ap-southeast-2"
  );
});

test("resolveKiroRegion defaults to us-east-1 when nothing is set", () => {
  assert.equal(resolveKiroRegion({ providerSpecificData: {} }), "us-east-1");
  assert.equal(resolveKiroRegion(null), "us-east-1");
  assert.equal(resolveKiroRegion(undefined), "us-east-1");
});

test("resolveKiroRegion normalizes case and whitespace", () => {
  assert.equal(
    resolveKiroRegion({ providerSpecificData: { region: "  EU-CENTRAL-1 " } }),
    "eu-central-1"
  );
});

test("kiroRuntimeHost keeps the legacy host for us-east-1 and uses regional Q hosts otherwise", () => {
  assert.equal(kiroRuntimeHost("us-east-1"), "https://codewhisperer.us-east-1.amazonaws.com");
  assert.equal(kiroRuntimeHost("eu-central-1"), "https://q.eu-central-1.amazonaws.com");
  assert.equal(kiroRuntimeHost("ap-southeast-2"), "https://q.ap-southeast-2.amazonaws.com");
});

test("kiro.postExchange discovers the region-matched profileArn via ListAvailableProfiles", async () => {
  const originalFetch = global.fetch;
  let requestedUrl = "";
  let requestedTarget = "";

  global.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    requestedUrl = String(input);
    requestedTarget = String((init?.headers as Record<string, string>)?.["x-amz-target"] || "");
    return new Response(
      JSON.stringify({
        profiles: [
          { arn: "arn:aws:codewhisperer:us-east-1:111111111111:profile/USEAST" },
          { arn: "arn:aws:codewhisperer:eu-central-1:820374639727:profile/RX4VNUHGHGAQ" },
        ],
      }),
      { status: 200 }
    );
  }) as typeof fetch;

  try {
    const extra = await kiro.postExchange({ access_token: "token", _region: "eu-central-1" });
    assert.equal(requestedUrl, "https://q.eu-central-1.amazonaws.com/");
    assert.equal(requestedTarget, "AmazonCodeWhispererService.ListAvailableProfiles");
    assert.deepEqual(extra, {
      profileArn: "arn:aws:codewhisperer:eu-central-1:820374639727:profile/RX4VNUHGHGAQ",
    });
  } finally {
    global.fetch = originalFetch;
  }
});

test("kiro.postExchange returns null when no profile is available (AWS Builder ID)", async () => {
  const originalFetch = global.fetch;
  global.fetch = (async () =>
    new Response(JSON.stringify({ profiles: [] }), { status: 200 })) as typeof fetch;
  try {
    assert.equal(await kiro.postExchange({ access_token: "token", _region: "us-east-1" }), null);
  } finally {
    global.fetch = originalFetch;
  }
});

test("kiro.postExchange never throws on network failure", async () => {
  const originalFetch = global.fetch;
  global.fetch = (async () => {
    throw new Error("network down");
  }) as typeof fetch;
  try {
    assert.equal(await kiro.postExchange({ access_token: "token", _region: "eu-central-1" }), null);
  } finally {
    global.fetch = originalFetch;
  }
});

test("kiro.mapTokens stores the discovered profileArn from postExchange extra", () => {
  const mapped = kiro.mapTokens(
    { access_token: "at", refresh_token: "rt", expires_in: 3600, _region: "eu-central-1" },
    { profileArn: "arn:aws:codewhisperer:eu-central-1:820374639727:profile/RX4VNUHGHGAQ" }
  );
  assert.equal(
    mapped.providerSpecificData.profileArn,
    "arn:aws:codewhisperer:eu-central-1:820374639727:profile/RX4VNUHGHGAQ"
  );
});

test("kiro.mapTokens omits profileArn when postExchange found none", () => {
  const mapped = kiro.mapTokens(
    { access_token: "at", refresh_token: "rt", expires_in: 3600, _region: "us-east-1" },
    null
  );
  assert.equal("profileArn" in mapped.providerSpecificData, false);
});
