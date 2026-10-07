import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-a2a-status-card-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_BASE_URL = process.env.OMNIROUTE_BASE_URL;

process.env.DATA_DIR = TEST_DATA_DIR;
// The bug only shows with no admin override: getBaseUrl() then reads
// request.nextUrl.origin, which throws when the status route forgets to
// forward its own request to the agent-card handler.
delete process.env.OMNIROUTE_BASE_URL;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const statusRoute = await import("../../src/app/api/a2a/status/route.ts");

function statusRequest(url: string): NextRequest {
  // A real NextRequest: `nextUrl` is what getBaseUrl() reads, and a plain
  // Request does not have it.
  return new NextRequest(new Request(url, { method: "GET" }));
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_BASE_URL === undefined) delete process.env.OMNIROUTE_BASE_URL;
  else process.env.OMNIROUTE_BASE_URL = ORIGINAL_BASE_URL;
});

test("A2A status serves the agent card built from the incoming request origin", async () => {
  await settingsDb.updateSettings({ a2aEnabled: true });

  const response = await statusRoute.GET(statusRequest("http://gateway.test:9999/api/a2a/status"));
  const body = (await response.json()) as {
    agent: { name?: string; url?: string } | null;
    capabilities: { streaming?: boolean } | null;
    skills: unknown[];
  };

  assert.equal(response.status, 200);
  assert.notEqual(body.agent, null);
  // A non-localhost origin: a hardcoded fallback base URL cannot pass by accident.
  assert.equal(body.agent?.url, "http://gateway.test:9999/a2a");
  assert.equal(body.capabilities?.streaming, true);
  assert.ok(body.skills.length >= 6, `expected the card's skills, got ${body.skills.length}`);
});
