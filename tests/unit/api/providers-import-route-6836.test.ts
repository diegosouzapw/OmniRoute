import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #6836 — POST /api/providers/import: heterogeneous file-driven provider import.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-providers-import-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const importRoute = await import("../../../src/app/api/providers/import/route.ts");

type ImportRouteResponse = {
  total: number;
  success: number;
  failed: number;
  created: Array<{
    apiKey?: unknown;
    provider: string;
    providerSpecificData?: { baseUrl?: string };
  }>;
  errors: Array<{ index: number; message: string }>;
};

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function postImport(body: unknown) {
  return importRoute.POST(
    new Request("http://localhost/api/providers/import", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );
}

test("providers import route returns 400 for invalid JSON", async () => {
  await resetStorage();
  const response = await importRoute.POST(
    new Request("http://localhost/api/providers/import", { method: "POST", body: "not json" })
  );
  assert.equal(response.status, 400);
});

test("providers import route returns 400 for empty entries", async () => {
  await resetStorage();
  const response = await postImport({ entries: [] });
  assert.equal(response.status, 400);
});

test("providers import route rejects an unknown provider id per-row (not at the schema layer)", async () => {
  // Provider-existence is validated server-side per-row (the check cannot live in the
  // client-reachable Zod schema — it would drag the server-only provider catalog into
  // the browser/CLI bundle, #6836). An unknown provider is therefore a per-row failure
  // in a 200 response, not a whole-request 400.
  await resetStorage();
  const response = await postImport({
    entries: [{ provider: "totally-not-a-real-provider", name: "x", apiKey: "sk-1" }],
  });
  assert.equal(response.status, 200);
  const body = (await response.json()) as ImportRouteResponse;
  assert.equal(body.total, 1);
  assert.equal(body.success, 0);
  assert.equal(body.failed, 1);
  assert.equal(body.created.length, 0);
  assert.match(body.errors?.[0]?.message ?? "", /Unknown or unsupported provider/);
});

test("providers import route requires name and apiKey per entry", async () => {
  await resetStorage();
  const response = await postImport({
    entries: [{ provider: "openai", name: "", apiKey: "sk-1" }],
  });
  assert.equal(response.status, 400);
});

test("providers import route imports a heterogeneous list with 200 + per-row results", async () => {
  await resetStorage();
  const response = await postImport({
    entries: [
      { provider: "openai", name: "Prod OpenAI", apiKey: "sk-openai-1" },
      { provider: "anthropic", name: "Prod Anthropic", apiKey: "sk-anthropic-1" },
    ],
  });
  assert.equal(response.status, 200);
  const body = (await response.json()) as ImportRouteResponse;
  assert.equal(body.total, 2);
  assert.equal(body.success, 2);
  assert.equal(body.failed, 0);
  assert.equal(body.created.length, 2);
  // Never echo the raw apiKey back.
  assert.ok(body.created.every((c) => c.apiKey === undefined));
  assert.deepEqual(
    body.created.map((c) => c.provider).sort(),
    ["anthropic", "openai"]
  );
});

test("providers import route: partial-failure — unresolvable compatible node fails its own row only", async () => {
  await resetStorage();
  const response = await postImport({
    entries: [
      { provider: "openai", name: "Prod OpenAI", apiKey: "sk-openai-1" },
      {
        provider: "openai-compatible-unknown-node-id",
        name: "Bad Compatible",
        apiKey: "sk-bad-1",
      },
    ],
  });
  assert.equal(response.status, 200);
  const body = (await response.json()) as ImportRouteResponse;
  assert.equal(body.total, 2);
  assert.equal(body.success, 1);
  assert.equal(body.failed, 1);
  assert.equal(body.errors[0].index, 1);
  assert.equal(body.errors[0].message, "Provider node not found");
  // Error responses/messages must never leak a raw stack trace (Hard Rule #12).
  assert.ok(!JSON.stringify(body).includes(" at /"));
});

test("providers import route: same-batch (provider,name) collision does not overwrite the first row (#2587-class data loss)", async () => {
  await resetStorage();
  const response = await postImport({
    entries: [
      { provider: "openai", name: "Prod OpenAI", apiKey: "sk-openai-first" },
      { provider: "openai", name: "Prod OpenAI", apiKey: "sk-openai-second" },
    ],
  });
  assert.equal(response.status, 200);
  const body = (await response.json()) as ImportRouteResponse;
  assert.equal(body.total, 2);
  assert.equal(body.success, 2, "both rows must be created — the second must not silently upsert into the first");
  assert.equal(body.failed, 0);
  assert.equal(body.created.length, 2);

  const providersDb = await import("../../../src/lib/db/providers.ts");
  const connections = (await providersDb.getProviderConnections({
    provider: "openai",
  })) as Array<{ id: string; name?: string | null; apiKey?: string }>;
  assert.equal(connections.length, 2, "the collision must produce TWO distinct connections, never one");

  const first = connections.find((c) => c.apiKey === "sk-openai-first");
  const second = connections.find((c) => c.apiKey === "sk-openai-second");
  assert.ok(first, "the first row's apiKey must survive unmodified");
  assert.ok(second, "the second row must be a genuine insert, not a silent overwrite");
  assert.notEqual(first!.id, second!.id, "the two rows must be distinct connections");
  assert.notEqual(
    first!.name,
    second!.name,
    "the colliding row must be disambiguated with a distinct name, not silently share the first row's name"
  );
});

test("providers import route: re-importing an existing (provider,name) does not overwrite the saved connection", async () => {
  await resetStorage();
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const existing = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Prod OpenAI",
    apiKey: "sk-existing",
    priority: 3,
    testStatus: "unavailable",
    lastError: "429 rate limited",
  });
  assert.ok(existing);

  const response = await postImport({
    entries: [{ provider: "openai", name: "Prod OpenAI", apiKey: "sk-reimported" }],
  });
  assert.equal(response.status, 200);
  const body = (await response.json()) as ImportRouteResponse;
  assert.equal(body.success, 1);

  const connections = (await providersDb.getProviderConnections({
    provider: "openai",
  })) as Array<{ id: string; name?: string | null; apiKey?: string; testStatus?: string; lastError?: string }>;
  assert.equal(connections.length, 2, "re-import must APPEND a new connection, not replace the existing one");

  const survivor = connections.find((c) => c.id === existing!.id);
  assert.ok(survivor, "the pre-existing connection must still exist, unreplaced");
  assert.equal(survivor!.apiKey, "sk-existing", "existing apiKey must not be overwritten by the re-import");
  assert.equal(survivor!.testStatus, "unavailable", "existing testStatus must survive the re-import");
  assert.equal(survivor!.lastError, "429 rate limited", "existing lastError must survive the re-import");

  const imported = connections.find((c) => c.id !== existing!.id);
  assert.ok(imported, "the newly imported row must exist as a distinct connection");
  assert.equal(imported!.apiKey, "sk-reimported");
  assert.notEqual(imported!.name, "Prod OpenAI", "the re-imported row must be disambiguated, not collide on name");
});

test("providers import route applies a per-entry baseUrl override for compatible providers", async () => {
  await resetStorage();
  // openai-compatible providers require a registered node; without one the row fails
  // cleanly (asserted above). This test only proves the schema/route accept and forward
  // a per-entry baseUrl for a first-party (non-compatible) provider without erroring.
  const response = await postImport({
    entries: [{ provider: "openai", name: "Prod", apiKey: "sk-1", baseUrl: "https://example.com" }],
  });
  assert.equal(response.status, 200);
  const body = (await response.json()) as ImportRouteResponse;
  assert.equal(body.success, 1);
  assert.equal(body.created[0].providerSpecificData?.baseUrl, "https://example.com");
});
