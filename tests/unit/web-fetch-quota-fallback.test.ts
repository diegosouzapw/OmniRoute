import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-web-fetch-fallback-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const webFetchRoute = await import("../../src/app/api/v1/web/fetch/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(
  provider: string,
  overrides: {
    apiKey?: string | null;
    rateLimitedUntil?: string | null;
  } = {}
) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey ?? "test-key",
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: overrides.rateLimitedUntil ?? null,
    providerSpecificData: {},
  });
}

function postWebFetch(body: Record<string, unknown>) {
  return webFetchRoute.POST(
    new Request("http://localhost/api/v1/web/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://example.com", ...body }),
    })
  );
}

interface WebFetchTestBody {
  provider?: string;
  content?: string;
  error?: { message: string };
}

async function readJson(response: Response): Promise<WebFetchTestBody> {
  return (await response.json()) as WebFetchTestBody;
}

const FUTURE_ISO = new Date(Date.now() + 5 * 60 * 1000).toISOString();

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── (a) credential-time: rate-limited stub is skipped, not short-circuited ──

test("auto-select skips a rate-limited firecrawl and falls to jina-reader", async () => {
  await seedConnection("firecrawl", { rateLimitedUntil: FUTURE_ISO });
  await seedConnection("jina-reader", { apiKey: "jina-key" });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const u = String(url);
    if (u.includes("api.firecrawl.dev")) {
      throw new Error("firecrawl should never be called once rate-limited");
    }
    if (u.includes("r.jina.ai")) {
      return new Response(
        JSON.stringify({ data: { content: "jina content", links: [] } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`unexpected fetch to ${u}`);
  };

  try {
    const response = await postWebFetch({});
    const body = await readJson(response);

    assert.equal(response.status, 200);
    assert.equal(body.provider, "jina-reader");
    assert.equal(body.content, "jina content");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── (b) request-time: credentialed provider returns 429 → falls through ────

test("auto-select falls through to jina-reader when firecrawl returns 429 at request time", async () => {
  await seedConnection("firecrawl", { apiKey: "fc-key" });
  await seedConnection("jina-reader", { apiKey: "jina-key" });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const u = String(url);
    if (u.includes("api.firecrawl.dev")) {
      return new Response(JSON.stringify({ error: "rate limited" }), {
        status: 429,
        headers: { "content-type": "application/json" },
      });
    }
    if (u.includes("r.jina.ai")) {
      return new Response(
        JSON.stringify({ data: { content: "jina content", links: [] } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`unexpected fetch to ${u}`);
  };

  try {
    const response = await postWebFetch({});
    const body = await readJson(response);

    assert.equal(response.status, 200);
    assert.equal(body.provider, "jina-reader");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── (c) provider-specific quota status (402/403) triggers fallback; plain 400 does NOT ──

test("auto-select falls through to jina-reader when firecrawl returns 403 (quota-style)", async () => {
  await seedConnection("firecrawl", { apiKey: "fc-key" });
  await seedConnection("jina-reader", { apiKey: "jina-key" });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const u = String(url);
    if (u.includes("api.firecrawl.dev")) {
      return new Response(JSON.stringify({ error: "quota exceeded" }), {
        status: 403,
        headers: { "content-type": "application/json" },
      });
    }
    if (u.includes("r.jina.ai")) {
      return new Response(
        JSON.stringify({ data: { content: "jina content", links: [] } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`unexpected fetch to ${u}`);
  };

  try {
    const response = await postWebFetch({});
    const body = await readJson(response);

    assert.equal(response.status, 200);
    assert.equal(body.provider, "jina-reader");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("auto-select does NOT fall through when firecrawl returns a plain 400 bad request", async () => {
  await seedConnection("firecrawl", { apiKey: "fc-key" });
  await seedConnection("jina-reader", { apiKey: "jina-key" });

  let jinaWasCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const u = String(url);
    if (u.includes("api.firecrawl.dev")) {
      return new Response(JSON.stringify({ error: "bad url" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    if (u.includes("r.jina.ai")) {
      jinaWasCalled = true;
      return new Response(
        JSON.stringify({ data: { content: "jina content", links: [] } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`unexpected fetch to ${u}`);
  };

  try {
    const response = await postWebFetch({});
    const body = await readJson(response);

    assert.equal(response.status, 400);
    assert.equal(jinaWasCalled, false, "jina-reader must not be tried for a non-quota 400");
    assert.ok(!(body.error?.message ?? "").includes("at /"), "error must not leak stack paths");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── (d) explicit rate-limited provider → 429, no silent fallback ───────────

test("explicit rate-limited provider request returns 429 without falling back", async () => {
  await seedConnection("firecrawl", { rateLimitedUntil: FUTURE_ISO });
  await seedConnection("jina-reader", { apiKey: "jina-key" });

  let jinaWasCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const u = String(url);
    if (u.includes("r.jina.ai")) {
      jinaWasCalled = true;
    }
    throw new Error(`unexpected fetch to ${u}`);
  };

  try {
    const response = await postWebFetch({ provider: "firecrawl" });
    const body = await readJson(response);

    assert.equal(response.status, 429);
    assert.equal(jinaWasCalled, false, "explicit provider request must never fall back");
    assert.ok(response.headers.get("Retry-After"), "should include a Retry-After header");
    assert.ok(!(body.error?.message ?? "").includes("at /"), "error must not leak stack paths");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── (e) whole pool exhausted at request time → single 429 with retry-after ─

test("auto-select returns a single 429 with retry-after when the whole pool is exhausted", async () => {
  await seedConnection("firecrawl", { apiKey: "fc-key" });
  await seedConnection("jina-reader", { apiKey: "jina-key" });
  await seedConnection("tavily-search", { apiKey: "tavily-key" });
  await seedConnection("tinyfish", { apiKey: "tf-key" });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    return new Response(JSON.stringify({ error: "rate limited" }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const response = await postWebFetch({});
    const body = await readJson(response);

    assert.equal(response.status, 429);
    assert.ok(response.headers.get("Retry-After"), "should include a Retry-After header");
    assert.ok(!(body.error?.message ?? "").includes("at /"), "error must not leak stack paths");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── No credentials at all → generic 400 (unchanged behavior) ──────────────

test("auto-select returns 400 when no web-fetch provider is configured", async () => {
  const response = await postWebFetch({});
  const body = await readJson(response);

  assert.equal(response.status, 400);
  assert.ok((body.error?.message ?? "").includes("No credentials configured"));
});
