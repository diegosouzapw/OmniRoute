// SSRF regression guard for kiro region — GHSA-6mwv-4mrm-5p3m.
// Without the assertValidAwsRegion guard, a malicious region value
// would be interpolated directly into upstream URLs like
// `https://oidc.${region}.amazonaws.com/token`, allowing the caller to
// redirect the proxy to arbitrary hosts (file://, 127.0.0.1, EC2 metadata, etc).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AWS_REGION_PATTERN, assertValidAwsRegion } from "../../src/lib/oauth/constants/oauth";
import { KiroService } from "../../src/lib/oauth/services/kiro";

describe("AWS_REGION_PATTERN", () => {
  it("accepts canonical AWS regions", () => {
    for (const r of [
      "us-east-1",
      "us-west-2",
      "eu-west-1",
      "ap-southeast-2",
      "ca-central-1",
      "sa-east-1",
      "me-south-1",
      "af-south-1",
      "eu-central-2",
    ]) {
      assert.ok(AWS_REGION_PATTERN.test(r), `expected ${r} to match`);
    }
  });

  it("rejects SSRF-shaped values", () => {
    for (const bad of [
      "127.0.0.1",
      "169.254.169.254",
      "localhost",
      "evil.example.com",
      "us-east-1.evil.com",
      "us-east-1/../foo",
      "us-east-1#frag",
      "us-east-1?x=1",
      "file:///etc/passwd",
      "http://internal",
      "",
      "US-EAST-1", // wrong case
      "us_east_1",
      "us-east-",
      "-east-1",
      "us--east-1",
    ]) {
      assert.ok(!AWS_REGION_PATTERN.test(bad), `expected ${bad!} to be rejected`);
    }
  });
});

describe("assertValidAwsRegion", () => {
  it("returns the region when valid", () => {
    assert.equal(assertValidAwsRegion("us-east-1"), "us-east-1");
  });

  it("throws on non-string", () => {
    assert.throws(() => assertValidAwsRegion(undefined as unknown as string));
    assert.throws(() => assertValidAwsRegion(null as unknown as string));
    assert.throws(() => assertValidAwsRegion(123 as unknown as string));
  });

  it("throws on invalid region", () => {
    assert.throws(() => assertValidAwsRegion("127.0.0.1"));
    assert.throws(() => assertValidAwsRegion("evil.com"));
    assert.throws(() => assertValidAwsRegion(""));
  });
});

describe("KiroService SSRF guard", () => {
  const svc = new KiroService();

  it("registerClient rejects malicious region", async () => {
    await assert.rejects(() => svc.registerClient("127.0.0.1"));
    await assert.rejects(() => svc.registerClient("evil.example.com"));
  });

  it("startDeviceAuthorization rejects malicious region", async () => {
    await assert.rejects(() =>
      svc.startDeviceAuthorization("cid", "csec", "https://x", "169.254.169.254")
    );
  });

  it("pollDeviceToken rejects malicious region", async () => {
    await assert.rejects(() => svc.pollDeviceToken("cid", "csec", "dc", "127.0.0.1"));
  });

  it("validateImportToken rejects malicious region before fetching", async () => {
    await assert.rejects(() => svc.validateImportToken("aorAAAAAGfoo", "127.0.0.1"));
  });
});

// Sink guard for the background token refresh (open-sse): `providerSpecificData.region` is only
// length-checked on write, so the refresh must re-validate it before interpolating it into the
// AWS SSO OIDC host — otherwise clientId/clientSecret/refreshToken are POSTed off AWS.
describe("Kiro token refresh SSRF guard", () => {
  type FetchCall = { url: string; body: unknown };
  type LogCall = { level: string; message: unknown };

  async function runRefresh(
    region: unknown,
    responder: (url: string) => Response
  ): Promise<{ calls: FetchCall[]; logs: LogCall[]; result: unknown }> {
    const { refreshKiroToken } =
      await import("../../open-sse/services/tokenRefresh/providers/kiro.ts");
    const calls: FetchCall[] = [];
    const logs: LogCall[] = [];
    const log = {
      info: (_scope: unknown, message: unknown) => logs.push({ level: "info", message }),
      warn: (_scope: unknown, message: unknown) => logs.push({ level: "warn", message }),
      error: (_scope: unknown, message: unknown) => logs.push({ level: "error", message }),
    };
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : undefined });
      return responder(url);
    }) as typeof fetch;
    try {
      const result = await refreshKiroToken(
        "kiro-refresh",
        { authMethod: "idc", clientId: "aws-client", clientSecret: "aws-secret", region },
        log
      );
      return { calls, logs, result };
    } finally {
      globalThis.fetch = originalFetch;
    }
  }

  const okToken = () =>
    new Response(JSON.stringify({ accessToken: "a", refreshToken: "r", expiresIn: 900 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  it("never sends the refresh request to a host derived from a malicious region", async () => {
    for (const bad of [
      "evil.example#",
      "evil.example/x?",
      "127.0.0.1",
      "169.254.169.254",
      "us-east-1.evil.com",
      "user@evil.example",
    ]) {
      const { calls, logs } = await runRefresh(bad, okToken);
      assert.equal(calls.length, 1, `one call expected for ${bad}`);
      assert.equal(calls[0].url, "https://oidc.us-east-1.amazonaws.com/token");
      assert.equal(new URL(calls[0].url).host, "oidc.us-east-1.amazonaws.com");
      assert.ok(
        logs.some((l) => l.level === "warn"),
        `expected a warn log when ignoring region ${bad}`
      );
    }
  });

  it("keeps the client re-registration retry on AWS when the region is malicious", async () => {
    let tokenAttempts = 0;
    const { calls } = await runRefresh("evil.example#", (url) => {
      if (url.endsWith("/client/register")) {
        return new Response(JSON.stringify({ clientId: "new-id", clientSecret: "new-sec" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      tokenAttempts += 1;
      if (tokenAttempts === 1) {
        return new Response(JSON.stringify({ __type: "InvalidClientException" }), {
          status: 400,
        });
      }
      return okToken();
    });
    assert.deepEqual(
      calls.map((c) => c.url),
      [
        "https://oidc.us-east-1.amazonaws.com/token",
        "https://oidc.us-east-1.amazonaws.com/client/register",
        "https://oidc.us-east-1.amazonaws.com/token",
      ]
    );
  });

  it("honors a valid region and normalizes case/whitespace", async () => {
    const { calls, logs } = await runRefresh(" EU-WEST-1 ", okToken);
    assert.equal(calls[0].url, "https://oidc.eu-west-1.amazonaws.com/token");
    assert.ok(!logs.some((l) => l.level === "warn"));
  });

  it("falls back to us-east-1 without warning when no region is stored", async () => {
    const { calls, logs } = await runRefresh(undefined, okToken);
    assert.equal(calls[0].url, "https://oidc.us-east-1.amazonaws.com/token");
    assert.ok(!logs.some((l) => l.level === "warn"));
  });
});

describe("safeAwsRegion", () => {
  it("returns the normalized region when valid and the fallback otherwise", async () => {
    const { safeAwsRegion } = await import("../../open-sse/services/kiroRegion.ts");
    assert.equal(safeAwsRegion("ap-southeast-2"), "ap-southeast-2");
    assert.equal(safeAwsRegion(" US-WEST-2 "), "us-west-2");
    assert.equal(safeAwsRegion("evil.example#"), "us-east-1");
    assert.equal(safeAwsRegion(undefined), "us-east-1");
    assert.equal(safeAwsRegion(42), "us-east-1");
    assert.equal(safeAwsRegion("127.0.0.1", "eu-central-1"), "eu-central-1");
  });
});
