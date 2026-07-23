// tests/unit/build/check-openapi-breaking.test.ts
// TDD unit tests for scripts/check/check-openapi-breaking.mjs — Fase 8 B.4 oasdiff.
//
// Strategy:
//   • parseOasdiffBreaking() — pure parser, tested with synthetic oasdiff JSON
//     (the REAL shape emitted by `oasdiff breaking --format json`, verified at 1.19.1).
//   • binary-absent SKIP — spawn the gate with a PATH stripped of oasdiff and assert
//     it prints `openapiBreaking=SKIP reason=binary-absent` and exits 0 (advisory).
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import { parseOasdiffBreaking } from "../../../scripts/check/check-openapi-breaking.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../..");
const GATE = path.join(REPO_ROOT, "scripts/check/check-openapi-breaking.mjs");

// ---------------------------------------------------------------------------
// Fixtures — REAL shape of `oasdiff breaking --format json` (oasdiff 1.19.1).
// e.g. removing a path emits:
//   {"id":"api-path-removed-without-deprecation","text":"api path removed...",
//    "level":3,"operation":"GET","path":"/api/bar","section":"paths",...}
// ---------------------------------------------------------------------------

function makeBreaking(
  overrides: {
    id?: string;
    text?: string;
    level?: number;
    operation?: string;
    path?: string;
  } = {}
) {
  return {
    id: overrides.id ?? "api-path-removed-without-deprecation",
    text: overrides.text ?? "api path removed without deprecation",
    level: overrides.level ?? 3,
    operation: overrides.operation ?? "GET",
    path: overrides.path ?? "/api/foo",
    section: "paths",
    baseSource: { file: "/tmp/base.yaml", line: 12, column: 5 },
    fingerprint: "33e8aeb41d4a",
  };
}

// ---------------------------------------------------------------------------
// parseOasdiffBreaking — empty / invalid input
// ---------------------------------------------------------------------------

test("parseOasdiffBreaking: null retorna count=0", () => {
  const r = parseOasdiffBreaking(null);
  assert.equal(r.count, 0);
  assert.deepEqual(r.byId, {});
  assert.deepEqual(r.byPath, {});
  assert.deepEqual(r.items, []);
});

test("parseOasdiffBreaking: undefined retorna count=0", () => {
  const r = parseOasdiffBreaking(undefined as unknown as null);
  assert.equal(r.count, 0);
});

test("parseOasdiffBreaking: array vazio (sem breaking change) retorna count=0", () => {
  const r = parseOasdiffBreaking([]);
  assert.equal(r.count, 0);
  assert.deepEqual(r.byId, {});
  assert.deepEqual(r.byPath, {});
});

test("parseOasdiffBreaking: objeto (não-array) retorna count=0", () => {
  const r = parseOasdiffBreaking({ id: "x" } as unknown as null);
  assert.equal(r.count, 0);
});

test("parseOasdiffBreaking: string retorna count=0", () => {
  const r = parseOasdiffBreaking("breaking" as unknown as null);
  assert.equal(r.count, 0);
});

test("parseOasdiffBreaking: número retorna count=0", () => {
  const r = parseOasdiffBreaking(42 as unknown as null);
  assert.equal(r.count, 0);
});

// ---------------------------------------------------------------------------
// parseOasdiffBreaking — counting
// ---------------------------------------------------------------------------

test("parseOasdiffBreaking: 1 breaking change retorna count=1", () => {
  const r = parseOasdiffBreaking([makeBreaking()]);
  assert.equal(r.count, 1);
  assert.equal(r.items.length, 1);
});

test("parseOasdiffBreaking: 3 breaking changes retorna count=3", () => {
  const r = parseOasdiffBreaking([
    makeBreaking({ id: "api-path-removed-without-deprecation", path: "/api/a" }),
    makeBreaking({ id: "request-parameter-became-required", path: "/api/b" }),
    makeBreaking({ id: "response-property-removed", path: "/api/c" }),
  ]);
  assert.equal(r.count, 3);
});

test("parseOasdiffBreaking: ignora entradas null/não-objeto no array", () => {
  const r = parseOasdiffBreaking([makeBreaking(), null, 5, makeBreaking({ path: "/api/x" })]);
  assert.equal(r.count, 2);
});

// ---------------------------------------------------------------------------
// parseOasdiffBreaking — grouping
// ---------------------------------------------------------------------------

test("parseOasdiffBreaking: agrupa por id em byId", () => {
  const r = parseOasdiffBreaking([
    makeBreaking({ id: "api-path-removed-without-deprecation", path: "/api/a" }),
    makeBreaking({ id: "response-property-removed", path: "/api/b" }),
    makeBreaking({ id: "api-path-removed-without-deprecation", path: "/api/c" }),
  ]);
  assert.equal(r.byId["api-path-removed-without-deprecation"], 2);
  assert.equal(r.byId["response-property-removed"], 1);
});

test("parseOasdiffBreaking: agrupa por path em byPath", () => {
  const r = parseOasdiffBreaking([
    makeBreaking({ path: "/api/chat", operation: "POST" }),
    makeBreaking({ path: "/api/chat", operation: "GET" }),
    makeBreaking({ path: "/api/models" }),
  ]);
  assert.equal(r.byPath["/api/chat"], 2);
  assert.equal(r.byPath["/api/models"], 1);
});

test("parseOasdiffBreaking: id ausente usa 'unknown'", () => {
  const r = parseOasdiffBreaking([{ path: "/api/x", text: "weird" }]);
  assert.equal(r.count, 1);
  assert.equal(r.byId["unknown"], 1);
});

test("parseOasdiffBreaking: path ausente usa 'unknown'", () => {
  const r = parseOasdiffBreaking([{ id: "some-rule", text: "weird" }]);
  assert.equal(r.count, 1);
  assert.equal(r.byPath["unknown"], 1);
});

// ---------------------------------------------------------------------------
// Integration — binary-absent SKIP (advisory, exit 0)
//
// Run the gate with a PATH that does NOT contain oasdiff. `findOasdiff()` then
// returns null and the gate must SKIP gracefully with exit 0. We point HOME to a
// temp dir too so a user-local ~/.local/bin/oasdiff cannot leak into the lookup.
// ---------------------------------------------------------------------------

test("gate: SKIP graceful (exit 0) quando oasdiff ausente do PATH", () => {
  const res = spawnSync(process.execPath, [GATE, "--quiet"], {
    cwd: REPO_ROOT,
    encoding: "utf8",
    timeout: 30_000,
    env: {
      // Minimal PATH with only the dir holding the node binary — no oasdiff.
      PATH: path.dirname(process.execPath),
      HOME: "/nonexistent-home-for-oasdiff-test",
      BASE_REF: "origin/release/v3.8.26",
    },
  });
  assert.equal(res.status, 0, `expected exit 0, got ${res.status}; stderr: ${res.stderr}`);
  assert.match(
    res.stdout,
    /openapiBreaking=SKIP reason=binary-absent/,
    `expected binary-absent SKIP, got stdout: ${res.stdout}`
  );
});
