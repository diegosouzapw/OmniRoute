import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The /api/skills/** routes returned `{ error: err.message }` verbatim on a 500,
// leaking absolute filesystem paths (skillRegistry writes to disk, so EACCES/ENOSPC
// surface a real path). These routes are consumed by the dashboard as `{ error: string }`
// (OmniMarketplaceTab.tsx, OmniSkillsPageClient.tsx), so the fix keeps the string shape
// and only routes the message through sanitizeErrorMessage (Hard Rule #12: no path/stack leak).
//
// mock.module is unreliable under this tsx/ESM + node:test runner (see
// instrumentation-warm-catalog-cache.test.ts), so the singleton method is monkey-patched.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-sanitize-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY;

process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const skillsRoute = await import("../../src/app/api/skills/route.ts");

const LEAKY_PATH = "/home/testuser/.omniroute/skills/evil/handler.js";

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  delete process.env.OMNIROUTE_API_KEY;
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_OMNIROUTE_API_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_OMNIROUTE_API_KEY;
});

test("GET /api/skills sanitizes an absolute path out of a 500 error body", async () => {
  const original = skillRegistry.loadFromDatabase.bind(skillRegistry);
  skillRegistry.loadFromDatabase = async () => {
    throw new Error(`EACCES: permission denied, open ${LEAKY_PATH}`);
  };

  try {
    const res = await skillsRoute.GET(new Request("http://localhost/api/skills"));
    assert.equal(res.status, 500);

    const body = (await res.json()) as { error?: unknown };
    // Shape preserved: still a plain string (the dashboard reads data.error as a string).
    assert.equal(typeof body.error, "string");
    const error = body.error as string;

    // The leaked absolute path must be gone; sanitizeErrorMessage replaces it with <path>.
    assert.ok(
      !error.includes(LEAKY_PATH) && !error.includes("/home/testuser"),
      `error must not leak the absolute path, got: ${JSON.stringify(error)}`
    );
    assert.ok(error.length > 0, "error should still carry a non-empty message");
  } finally {
    skillRegistry.loadFromDatabase = original;
  }
});
