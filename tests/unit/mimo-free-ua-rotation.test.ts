import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";

/**
 * Port of upstream decolua/9router commit 36153fed.
 *
 * The bootstrap site of the MiMoCode free executor was sending only
 * `Content-Type: application/json` — the upstream anti-abuse gate now
 * 403s requests without a browser-shaped `User-Agent`. The chat site
 * already rotates the UA pool (line 311 of `mimocode.ts`); this test
 * locks the same rotation in for the bootstrap site.
 */

interface CapturedRequest {
  url: string;
  headers: Record<string, string>;
}

const originalFetch = globalThis.fetch;

function installFetchStub(jwt: string): CapturedRequest[] {
  const captured: CapturedRequest[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    const headers: Record<string, string> = {};
    const raw = init?.headers as Record<string, string> | undefined;
    if (raw) for (const [k, v] of Object.entries(raw)) headers[k] = String(v);
    captured.push({ url, headers });
    // Valid JWT shape so parseJwtExp succeeds (header.payload.signature, b64url).
    const payload = Buffer.from(
      JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })
    ).toString("base64url");
    const body = JSON.stringify({ jwt: `h.${payload}.s` });
    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return captured;
}

describe("MiMoCode bootstrap — User-Agent rotation (port of 9router 36153fed)", () => {
  let captured: CapturedRequest[] = [];

  beforeEach(() => {
    captured = installFetchStub("test-jwt");
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("sends a Chrome-shaped User-Agent header from the USER_AGENTS pool on every bootstrap", async () => {
    const mod = await import("../../open-sse/executors/mimocode.ts");
    const { bootstrapJwt, USER_AGENTS } = (mod as any).__test__ ?? {};
    assert.ok(typeof bootstrapJwt === "function", "expected __test__.bootstrapJwt export");
    assert.ok(Array.isArray(USER_AGENTS) && USER_AGENTS.length > 0, "expected USER_AGENTS pool");

    const baseUrl = "https://api.example.test";
    // Run multiple bootstraps with distinct fingerprints to defeat the
    // bootstrapInflight dedupe.
    const N = 24;
    for (let i = 0; i < N; i++) {
      await bootstrapJwt(baseUrl, `fingerprint-${i}`);
    }

    assert.strictEqual(captured.length, N, "fetch should be called once per bootstrap");
    const seen = new Set<string>();
    for (const req of captured) {
      assert.ok(req.url.endsWith("/api/free-ai/bootstrap"), "bootstrap URL");
      const ua = req.headers["User-Agent"];
      assert.ok(ua, "every bootstrap must carry a User-Agent header");
      assert.ok(
        (USER_AGENTS as string[]).includes(ua),
        `User-Agent ${ua} must come from the USER_AGENTS pool`
      );
      seen.add(ua);
    }
    // Probabilistic: across 24 calls into a pool of 3, expect at least 2
    // distinct picks. (Single-pick probability ≈ 3·(1/3)^24, negligible.)
    assert.ok(seen.size >= 2, `expected rotation across bootstraps, saw ${seen.size}`);
  });
});
