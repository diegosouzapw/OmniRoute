import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const routePath = path.join(repoRoot, "src/app/api/v1/me/status/route.ts");

test("GET /api/v1/me/status rejects missing Bearer token in the handler", async () => {
  const route = await import("../../../src/app/api/v1/me/status/route.ts");

  const response = await route.GET(new Request("http://localhost/api/v1/me/status"));

  assert.equal(response.status, 401);
});

test("GET /api/v1/me/status derives identity from Bearer metadata and ignores query apiKeyId", () => {
  const source = fs.readFileSync(routePath, "utf8");

  assert.match(source, /Authorization/);
  assert.match(source, /Bearer/);
  assert.match(source, /validateApiKey/);
  assert.match(source, /getApiKeyMetadata/);
  assert.match(source, /metadata\.id === "env-key"/);
  assert.doesNotMatch(source, /searchParams\.get\(["']apiKeyId["']\)/);
});
