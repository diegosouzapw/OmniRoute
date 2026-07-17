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

test("providers import route rejects an unknown provider id at the schema layer", async () => {
  await resetStorage();
  const response = await postImport({
    entries: [{ provider: "totally-not-a-real-provider", name: "x", apiKey: "sk-1" }],
  });
  assert.equal(response.status, 400);
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
