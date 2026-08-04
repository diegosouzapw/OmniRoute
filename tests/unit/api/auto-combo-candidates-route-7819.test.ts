/**
 * #7819 (Level 1) — GET /api/v1/auto-combo/[channel]/candidates
 * Run: node --import tsx/esm --test tests/unit/api/auto-combo-candidates-route-7819.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7819-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const routeModule = await import(
  "../../../src/app/api/v1/auto-combo/[channel]/candidates/route.ts"
);

function makeRequest(channel: string) {
  return new Request(`http://localhost/api/v1/auto-combo/${encodeURIComponent(channel)}/candidates`);
}

async function callGET(channel: string) {
  return routeModule.GET(makeRequest(channel), { params: Promise.resolve({ channel }) });
}

test.beforeEach(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#7819: GET /candidates for the base 'auto' channel returns 200 with a candidates array", async () => {
  const res = await callGET("auto");
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.channel, "auto");
  assert.ok(Array.isArray(body.candidates));
});

test("#7819: GET /candidates rejects an invalid channel path segment (400, sanitized body)", async () => {
  const res = await callGET("../../etc/passwd");
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(!body.error.message.includes("at /"), "error body must never leak a stack trace");
});

test("#7819: GET /candidates 404s for an unrecognized built-in auto channel", async () => {
  const res = await callGET("totally-not-a-real-channel");
  assert.equal(res.status, 404);
  const body = await res.json();
  assert.ok(!body.error.message.includes("at /"), "error body must never leak a stack trace");
});
