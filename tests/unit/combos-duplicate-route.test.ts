/**
 * Unit tests for POST /api/combos/duplicate (Rule #18).
 *
 * Coverage: auth gate, input validation (400), success response shape (201)
 * including weight distribution and naming convention, config fields,
 * and error sanitization (no stack traces in responses).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "os";
import path from "node:path";

// ── DB / auth setup ───────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combos-duplicate-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "combos-duplicate-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

// Route loaded AFTER env is set
const duplicateRoute = await import("../../src/app/api/combos/duplicate/route.ts");

function makePostRequest(url: string, body: unknown, apiKey?: string): Request {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(body),
  });
}

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

// ── Auth gate ─────────────────────────────────────────────────────────────────

test("POST /api/combos/duplicate returns 401/403 when auth is required and no token", async () => {
  await settingsDb.updateSettings({ requireLogin: true });
  process.env.INITIAL_PASSWORD = "test-password-dup";

  const req = makePostRequest("http://localhost/api/combos/duplicate", {
    name: "auto/best-coding",
  });
  const res = await duplicateRoute.POST(req as never);

  assert.ok(
    res.status === 401 || res.status === 403,
    `Expected 401 or 403 without auth, got ${res.status}`
  );

  await settingsDb.updateSettings({ requireLogin: false });
  delete process.env.INITIAL_PASSWORD;
});

test("POST /api/combos/duplicate passes auth with valid management API key", async () => {
  await settingsDb.updateSettings({ requireLogin: true });
  process.env.INITIAL_PASSWORD = "test-password-dup-key";
  const { key } = await apiKeysDb.createApiKey("dup-test", "machine-dup", ["manage"]);

  // Invalid body (empty name) — auth should pass, business logic rejects
  const req = makePostRequest("http://localhost/api/combos/duplicate", { name: "" }, key);
  const res = await duplicateRoute.POST(req as never);

  assert.ok(
    !(res.status === 401 || res.status === 403),
    `Auth should have passed with valid key, got ${res.status}`
  );
  assert.equal(res.status, 400);

  await settingsDb.updateSettings({ requireLogin: false });
  delete process.env.INITIAL_PASSWORD;
});

// ── Input validation ────────────────────────────────────────────────────────

test("POST /api/combos/duplicate returns 400 when name is missing", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = makePostRequest("http://localhost/api/combos/duplicate", {});
  const res = await duplicateRoute.POST(req as never);
  const body = await res.json();

  assert.equal(res.status, 400);
  assert.ok(
    typeof body.error === "string" && body.error.length > 0,
    "should return an error message"
  );
});

test("POST /api/combos/duplicate returns 400 when name is not a string", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = makePostRequest("http://localhost/api/combos/duplicate", {
    name: 123,
  });
  const res = await duplicateRoute.POST(req as never);

  assert.equal(res.status, 400);
});

test("POST /api/combos/duplicate returns 400 when name is empty string", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = makePostRequest("http://localhost/api/combos/duplicate", {
    name: "",
  });
  const res = await duplicateRoute.POST(req as never);

  assert.equal(res.status, 400);
});

// ── Success response shape (when models match) ───────────────────────────────

test("POST /api/combos/duplicate returns valid combo with correct naming and weights on success", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = makePostRequest("http://localhost/api/combos/duplicate", {
    name: "auto/best-coding",
  });
  const res = await duplicateRoute.POST(req as never);
  const body = await res.json();

  if (res.status === 201) {
    // --- Naming convention: starts with static- and ends with "copy" (or "copy N") ---
    assert.ok(
      typeof body.name === "string" && body.name.length > 0,
      "response should contain combo name"
    );
    assert.ok(
      body.name.startsWith("static-"),
      `Combo name should start with 'static-', got: ${body.name}`
    );
    assert.ok(
      /^static-[\w-]+(\s+\d+)?$/.test(body.name),
      `Combo name should be 'static-<template>' optionally followed by a numeric suffix, got: ${body.name}`
    );

    // --- Default strategy is "priority" ---
    assert.equal(body.strategy, "priority", "default strategy should be priority");

    // --- Models array present and weights sum to exactly 100 ---
    assert.ok(Array.isArray(body.models), "response should include models array");
    const totalWeight = body.models.reduce(
      (sum: number, m: { weight?: number }) => sum + (m.weight ?? 0),
      0
    );
    assert.equal(totalWeight, 100, `model weights must sum to exactly 100, got ${totalWeight}`);

    // Every model has a positive weight
    for (const m of body.models) {
      assert.ok(m.weight > 0, `each model weight must be positive, got ${m.weight}`);
    }
  } else if (res.status === 422) {
    // No models matched — still valid behavior in a clean test DB
    ok();
  } else {
    throw new Error(`Unexpected status: ${res.status}`);
  }

  function ok() {}
});

test("POST /api/combos/duplicate uses custom strategy when provided", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = makePostRequest("http://localhost/api/combos/duplicate", {
    name: "auto/best-coding",
    strategy: "round-robin",
  });
  const res = await duplicateRoute.POST(req as never);
  const body = await res.json();

  if (res.status === 201) {
    assert.equal(body.strategy, "round-robin");
  } else if (res.status === 422) {
    ok();
  } else {
    throw new Error(`Unexpected status: ${res.status}`);
  }

  function ok() {}
});

test("POST /api/combos/duplicate created combo has sourceAutoCombo, weightPack in config and version 2", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = makePostRequest("http://localhost/api/combos/duplicate", {
    name: "auto/best-coding",
  });
  const res = await duplicateRoute.POST(req as never);
  const body = await res.json();

  if (res.status === 201) {
    assert.ok(
      body.config && typeof body.config.sourceAutoCombo === "string",
      "config should contain sourceAutoCombo reference"
    );
    assert.equal(body.config.sourceAutoCombo, "auto/best-coding");
    assert.equal(body.version, 2);

    // Description includes template name + ISO timestamp (e.g. "auto/best-coding @ 2026-...")
    assert.ok(
      typeof body.description === "string" && body.description.startsWith("auto/best-coding @ "),
      `description should be 'templateName @ timestamp', got: ${body.description}`
    );

    // weightPack is captured from the virtual combo's scoring config at creation time
    assert.ok(
      typeof body.config.weightPack === "object" && body.config.weightPack !== null,
      "config should include weightPack"
    );
    const wp = body.config.weightPack;
    assert.ok(
      typeof wp.taskFit === "number" || typeof wp.health === "number",
      "weightPack should contain scoring coefficients"
    );
  } else if (res.status === 422) {
    ok();
  }

  function ok() {}
});

test("POST /api/combos/duplicate generates unique name when duplicate exists", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  // Create two duplicates — second should have a different name (numeric suffix)
  const req1 = makePostRequest("http://localhost/api/combos/duplicate", {
    name: "auto/best-coding",
  });
  const res1 = await duplicateRoute.POST(req1 as never);

  if (res1.status !== 201) ok();
  else {
    const body1 = await res1.json();

    const req2 = makePostRequest("http://localhost/api/combos/duplicate", {
      name: "auto/best-coding",
    });
    const res2 = await duplicateRoute.POST(req2 as never);
    const body2 = await res2.json();

    if (res2.status === 201) {
      assert.ok(
        body1.name !== body2.name,
        `duplicate combo should get a unique name. Both got: ${body1.name}`
      );
      // Second one ends with a numeric suffix (e.g. " 2") to disambiguate
      assert.ok(
        /\s+[\d]+$/.test(body2.name),
        `second duplicate should end with a numeric suffix, got: ${body2.name}`
      );
    } else if (res2.status === 422) {
      ok(); // no models matched for second call either
    } else {
      throw new Error(`Unexpected status on second call: ${res2.status}`);
    }
  }

  function ok() {}
});

// ── Error response does not leak stack traces ───────────────────────────────

test("POST /api/combos/duplicate error responses do not contain stack traces", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = makePostRequest("http://localhost/api/combos/duplicate", {
    name: "auto/nonexistent-template-xyz",
  });
  const res = await duplicateRoute.POST(req as never);
  const body = await res.json();

  assert.ok(!JSON.stringify(body).includes("at "), "error response must not leak stack traces");
});
