import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression for the phantom `@/lib/db/connections` import shipped in #10939.
// That module does not exist, so Turbopack failed production builds with
// "Module not found: Can't resolve '@/lib/db/connections'". Connection metadata
// must come from src/lib/db/providers.ts instead.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-utilization-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const routeSource = fs.readFileSync(
  path.resolve(import.meta.dirname, "../../src/app/api/usage/utilization/route.ts"),
  "utf8"
);
const { GET } = await import("../../src/app/api/usage/utilization/route.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("utilization route does not import phantom @/lib/db/connections", () => {
  assert.equal(routeSource.includes("@/lib/db/connections"), false);
  assert.match(routeSource, /getProviderConnectionById/);
});

test("utilization route module resolves", async () => {
  assert.equal(typeof GET, "function");
});

test("aggregateBy=connection returns email/name/displayName metadata for a real connection", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "testprovider",
    name: "Utilization Meta Seed",
    displayName: "Utilization Meta Seed",
    authType: "apikey",
    apiKey: "sk-test-utilization-meta",
  });
  const connectionId = (created as { id: string }).id;

  const request = new Request(
    `http://localhost/api/usage/utilization?range=24h&aggregateBy=connection`
  );
  const response = await GET(request);
  assert.equal(response.status, 200);

  const body = (await response.json()) as {
    connectionMeta?: Record<
      string,
      { email: string | null; name: string | null; displayName: string | null }
    >;
  };

  assert.ok(body.connectionMeta !== undefined);
  const meta = body.connectionMeta?.[connectionId];
  if (meta) {
    assert.equal(meta.displayName, "Utilization Meta Seed");
    assert.equal(meta.email, null);
    assert.equal(meta.name, "Utilization Meta Seed");
  }
});

test("invalid range is rejected before any DB access", async () => {
  const request = new Request("http://localhost/api/usage/utilization?range=2h");
  const response = await GET(request);
  assert.equal(response.status, 400);
});
