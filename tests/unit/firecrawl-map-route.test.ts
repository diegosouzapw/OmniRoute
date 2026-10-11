import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-firecrawl-map-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const mapRoute = await import("../../src/app/api/v1/web/map/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function request(body: unknown) {
  return new Request("http://localhost/v1/web/map", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("Map rejects non-http URLs before selecting a provider", async () => {
  const response = await mapRoute.POST(request({ url: "file:///etc/passwd", limit: 10 }));
  assert.equal(response.status, 400);
  const privateResponse = await mapRoute.POST(request({ url: "http://127.0.0.1", limit: 10 }));
  assert.equal(privateResponse.status, 400);
});

test("Map uses the configured Firecrawl connection and returns its links", async () => {
  await providersDb.createProviderConnection({
    provider: "firecrawl",
    authType: "apikey",
    name: "firecrawl-map-test",
    apiKey: "fc-map-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (String(url).endsWith("/v2/team/credit-usage")) {
      return Response.json({ success: true, data: { remainingCredits: 100, planCredits: 1000 } });
    }
    assert.equal(String(url), "https://api.firecrawl.dev/v2/map");
    assert.equal((init?.headers as Record<string, string>).Authorization, "Bearer fc-map-test");
    return Response.json({ success: true, links: [{ url: "https://example.com/about" }] });
  };

  try {
    const response = await mapRoute.POST(request({ url: "https://example.com", limit: 10 }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      success: true,
      links: [{ url: "https://example.com/about" }],
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Map tries another Firecrawl connection after credits run out", async () => {
  await providersDb.createProviderConnection({
    provider: "firecrawl",
    authType: "apikey",
    name: "firecrawl-map-second",
    apiKey: "fc-map-second",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const originalFetch = globalThis.fetch;
  const attemptedKeys: string[] = [];
  globalThis.fetch = async (url, init) => {
    if (String(url).endsWith("/v2/team/credit-usage")) {
      return Response.json({ success: true, data: { remainingCredits: 100, planCredits: 1000 } });
    }
    const key = (init?.headers as Record<string, string>).Authorization;
    attemptedKeys.push(key);
    if (attemptedKeys.length === 1) {
      return Response.json({ error: "Insufficient credits" }, { status: 402 });
    }
    return Response.json({ success: true, links: [{ url: "https://example.com/next" }] });
  };

  try {
    const response = await mapRoute.POST(request({ url: "https://example.com", limit: 10 }));
    assert.equal(response.status, 200);
    assert.equal(attemptedKeys.length, 2);
    assert.notEqual(attemptedKeys[0], attemptedKeys[1]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
