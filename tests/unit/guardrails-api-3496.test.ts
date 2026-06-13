import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

// #3496 — docs/reference/API_REFERENCE.md documented a `/api/guardrails*` and
// `/api/shadow*` surface that did not exist (doc-fiction, frozen in the
// check-docs-symbols allowlist). The guardrail pipeline itself is real
// (src/lib/guardrails), so the fix implements the two routes that map to real
// behavior — GET /api/guardrails (list) and POST /api/guardrails/test (dry-run
// the pre-call hooks) — removes the fictional enable/disable/logs + shadow rows
// from the docs, and drops them from KNOWN_STALE_DOC_REFS.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-guardrails-3496-"));
process.env.DATA_DIR = TEST_DATA_DIR;
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = "test-guardrails-3496-jwt-secret";
if (!process.env.API_KEY_SECRET) process.env.API_KEY_SECRET = "test-guardrails-3496-apikey-secret";

const listRoute = await import("../../src/app/api/guardrails/route.ts");
const testRoute = await import("../../src/app/api/guardrails/test/route.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  try {
    core.getDbInstance().close();
  } catch {
    /* ignore */
  }
  try {
    core.resetDbInstance();
  } catch {
    /* ignore */
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#3496 GET /api/guardrails lists the registered guardrails with status", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/guardrails");
  const res = await listRoute.GET(req);
  assert.equal(res.status, 200);

  const body = await res.json();
  assert.ok(Array.isArray(body.guardrails), "expected guardrails[] in the body");

  const names = body.guardrails.map((g) => g.name);
  for (const expected of ["vision-bridge", "pii-masker", "prompt-injection"]) {
    assert.ok(names.includes(expected), `expected ${expected} in [${names.join(", ")}]`);
  }

  for (const g of body.guardrails) {
    assert.equal(typeof g.name, "string");
    assert.equal(typeof g.enabled, "boolean");
    assert.equal(typeof g.priority, "number");
  }
});

test("#3496 POST /api/guardrails/test runs the pre-call pipeline over a sample input", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/guardrails/test", {
    method: "POST",
    body: { input: { messages: [{ role: "user", content: "hello world" }] } },
  });
  const res = await testRoute.POST(req);
  assert.equal(res.status, 200);

  const body = await res.json();
  assert.equal(typeof body.blocked, "boolean");
  assert.ok(Array.isArray(body.results), "expected a per-guardrail results[]");

  const evaluated = body.results.map((r) => r.guardrail);
  assert.ok(
    evaluated.includes("pii-masker"),
    `expected pii-masker to be evaluated, got [${evaluated.join(", ")}]`
  );
});

test("#3496 POST /api/guardrails/test honors disabledGuardrails", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/guardrails/test", {
    method: "POST",
    body: { input: "hello", disabledGuardrails: ["pii-masker"] },
  });
  const res = await testRoute.POST(req);
  assert.equal(res.status, 200);

  const body = await res.json();
  const pii = body.results.find((r) => r.guardrail === "pii-masker");
  assert.ok(pii, "pii-masker should still appear in results");
  assert.equal(pii.skipped, true, "pii-masker should be skipped when disabled");
});

test("#3496 POST /api/guardrails/test rejects a body without input (400)", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/guardrails/test", {
    method: "POST",
    body: {},
  });
  const res = await testRoute.POST(req);
  assert.equal(res.status, 400);
});

// Regression guard for the quality gate: the docs no longer reference any
// non-existent guardrails/shadow route, and the allowlist no longer freezes them.
test("#3496 check-docs-symbols no longer freezes guardrails/shadow + API_REFERENCE is clean", async () => {
  const { KNOWN_STALE_DOC_REFS, collectRouteFiles, extractDocApiPaths, findStaleDocApiRefs } =
    await import("../../scripts/check/check-docs-symbols.mjs");

  // (1) allowlist no longer freezes any guardrails/shadow path
  for (const frozen of [...KNOWN_STALE_DOC_REFS]) {
    assert.ok(
      !frozen.startsWith("/api/guardrails") && !frozen.startsWith("/api/shadow"),
      `allowlist should not still freeze ${frozen}`
    );
  }

  // (2) API_REFERENCE.md no longer references a non-existent guardrails/shadow route
  const routeFiles = collectRouteFiles();
  const apiRefRel = "docs/reference/API_REFERENCE.md";
  const src = fs.readFileSync(path.join(process.cwd(), apiRefRel), "utf8");
  const docPathsByFile = [{ file: apiRefRel, paths: extractDocApiPaths(src) }];
  const misses = findStaleDocApiRefs(docPathsByFile, routeFiles, KNOWN_STALE_DOC_REFS);
  const ghosts = misses.filter(
    (m) => m.includes("/api/guardrails") || m.includes("/api/shadow")
  );
  assert.deepEqual(ghosts, [], `stale guardrails/shadow refs remain: ${ghosts.join("; ")}`);
});
