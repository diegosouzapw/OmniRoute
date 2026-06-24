/**
 * TDD for the RTK learn/discover API routes (F2.1 / Item 2).
 *
 * GET /api/context/rtk/discover           → ranked noise candidates mined from the
 *                                            opt-in rtk raw-output sample store.
 * GET /api/context/rtk/learn?command=X     → a suggested RTK filter draft for command X.
 *
 * Auth: requireManagementAuth — not required in the unconfigured/first-run state
 * (fresh temp DATA_DIR, no INITIAL_PASSWORD), so these exercise the 200 happy path.
 * The pure miners (discoverRepeatedNoise/suggestFilter) and the sample adapter
 * (listRtkCommandSamples) are unit-tested separately; this asserts the wiring.
 *
 * Run: node --import tsx/esm --test tests/unit/api/compression/rtk-learn-discover-routes.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-ld-routes-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.INITIAL_PASSWORD;
delete process.env.JWT_SECRET;

const { maybePersistRtkRawOutput } =
  await import("../../../../open-sse/services/compression/engines/rtk/index.ts");
const discoverRoute = await import("../../../../src/app/api/context/rtk/discover/route.ts");
const learnRoute = await import("../../../../src/app/api/context/rtk/learn/route.ts");

function seedSamples() {
  // Three runs of the same command with a shared noise line + a unique line each.
  for (let i = 0; i < 3; i++) {
    maybePersistRtkRawOutput(
      `Resolving dependencies...\nnpm warn deprecated foo@1.0.0\nadded ${i} packages in ${i}s\n`,
      { retention: "always", command: "npm install" }
    );
  }
}

function get(url: string): Request {
  return new Request(url, {
    method: "GET",
    headers: { "x-omniroute-peer-locality": "loopback" },
  });
}

test.beforeEach(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_INITIAL_PASSWORD !== undefined)
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

test("GET /discover — returns ranked noise candidates + sampleCount", async () => {
  seedSamples();
  const res = await discoverRoute.GET(get("http://localhost/api/context/rtk/discover"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { sampleCount: number; candidates: Array<{ hits: number }> };
  assert.equal(body.sampleCount, 3);
  assert.ok(Array.isArray(body.candidates));
  assert.ok(body.candidates.length > 0, "the shared 'Resolving dependencies' line is a candidate");
});

test("GET /discover — empty store → 200 with no candidates", async () => {
  const res = await discoverRoute.GET(get("http://localhost/api/context/rtk/discover"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { sampleCount: number; candidates: unknown[] };
  assert.equal(body.sampleCount, 0);
  assert.equal(body.candidates.length, 0);
});

test("GET /learn?command=npm install — returns a suggested filter learned from matching samples", async () => {
  seedSamples();
  const res = await learnRoute.GET(
    get("http://localhost/api/context/rtk/learn?command=" + encodeURIComponent("npm install"))
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    command: string;
    sampleCount: number;
    filter: { id: string; match: { commands: string[] } };
  };
  assert.equal(body.command, "npm install");
  assert.equal(body.sampleCount, 3, "only the matching command's samples are learned from");
  assert.ok(body.filter.id.length > 0);
  assert.ok(body.filter.match.commands.length > 0);
});

test("GET /learn without a command → 400", async () => {
  const res = await learnRoute.GET(get("http://localhost/api/context/rtk/learn"));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message?: string } | string };
  // Error must not leak a stack trace (Hard Rule #12).
  const msg = typeof body.error === "string" ? body.error : (body.error?.message ?? "");
  assert.ok(!msg.includes("at /"), "no stack trace in error body");
});

test("GET /learn filters out other commands' samples", async () => {
  seedSamples(); // 3× "npm install"
  maybePersistRtkRawOutput("Compiling cargo...\nFinished in 2s\n", {
    retention: "always",
    command: "cargo build",
  });
  const res = await learnRoute.GET(
    get("http://localhost/api/context/rtk/learn?command=" + encodeURIComponent("npm install"))
  );
  const body = (await res.json()) as { sampleCount: number };
  assert.equal(body.sampleCount, 3, "the cargo sample is excluded");
});
