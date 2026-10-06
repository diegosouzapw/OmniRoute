import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-blocked-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "search-blocked-test-secret";

const { getSettings, updateSettings } = await import("../../src/lib/db/settings.ts");
const { GET, POST } = await import("../../src/app/api/v1/search/route.ts");

test("GET /v1/search excludes blocked search providers", async () => {
  await updateSettings({ blockedProviders: ["brave-search"] });

  const response = await GET();
  const data = await response.json();

  const providerIds = data.data.map((p: { id: string }) => p.id);
  assert.equal(providerIds.includes("brave-search"), false);
});

test("POST /v1/search rejects explicit blocked search provider with 403", async () => {
  await updateSettings({ blockedProviders: ["brave-search"] });

  const req = new Request("http://localhost:20128/v1/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "test query", provider: "brave-search" }),
  });

  const response = await POST(req);
  assert.equal(response.status, 403);
  const data = await response.json();
  assert.match(data.error.message, /blocked by security policy/i);
});
