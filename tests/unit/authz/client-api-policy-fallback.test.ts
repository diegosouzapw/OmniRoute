/**
 * Issue #2257 — clientApi policy behavior when an invalid Bearer is sent and
 * REQUIRE_API_KEY=false.
 *
 * The existing `client-api-policy.test.ts` shares a DB-backed setup via
 * `resetStorage()` and `apiKeysDb` that has SQLite migration races on this
 * branch. This standalone file mocks `validateApiKey` to test the policy's
 * fallback branch in isolation — no DB, no migration runner.
 */

import test from "node:test";
import assert from "node:assert/strict";
import Module from "node:module";

// ─── Mock validateApiKey via require interception (so the dynamic import in
// the policy module returns our stub instead of hitting the real DB module) ─

type ValidateFn = (key: string) => boolean | Promise<boolean>;
let mockValidateApiKey: ValidateFn = () => false;

const originalResolve = (Module as unknown as { _resolveFilename: typeof Module._resolveFilename })
  ._resolveFilename;

// Intercept require() / import() resolution for the apiKeys DB module and
// substitute it for our stub. This runs only for the exact path the policy
// imports — production code paths are unaffected.
const POLICY_IMPORT_TARGET = "src/lib/db/apiKeys";

(Module as unknown as { _resolveFilename: typeof Module._resolveFilename })._resolveFilename =
  function patched(this: unknown, request: string, ...rest: unknown[]) {
    if (request.includes(POLICY_IMPORT_TARGET)) {
      // Resolve to a stub file we create below
      const stubPath = new URL("./__stub_apiKeys.mjs", import.meta.url).pathname;
      // @ts-expect-error - rest spread to original
      return originalResolve.call(this, stubPath, ...rest);
    }
    // @ts-expect-error - rest spread to original
    return originalResolve.call(this, request, ...rest);
  };

// Write the stub file ad-hoc (Node's loader needs a real file)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STUB_PATH = path.join(__dirname, "__stub_apiKeys.mjs");
fs.writeFileSync(
  STUB_PATH,
  `export const validateApiKey = (key) => globalThis.__mockValidateApiKey(key);\n`
);

// Wire the stub to our local variable
(globalThis as unknown as { __mockValidateApiKey: ValidateFn }).__mockValidateApiKey = (key) =>
  mockValidateApiKey(key);

test.after(() => {
  try {
    fs.unlinkSync(STUB_PATH);
  } catch {
    /* ignore */
  }
});

// ─── Load policy fresh (after the interceptor is in place) ────────────────

async function loadPolicy() {
  const mod = await import(`../../../src/server/authz/policies/clientApi.ts?ts=${Date.now()}`);
  return mod.clientApiPolicy;
}

function ctx(headers: Headers, normalizedPath = "/api/v1/chat/completions") {
  return {
    request: { method: "POST", headers, url: `http://localhost${normalizedPath}` },
    classification: {
      routeClass: "CLIENT_API" as const,
      reason: "client_api_v1" as const,
      normalizedPath,
    },
    requestId: "req_test",
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────

test.beforeEach(() => {
  // Default to "every key fails" — individual tests override as needed.
  mockValidateApiKey = () => false;
  delete process.env.REQUIRE_API_KEY;
});

test("#2257 — invalid bearer + REQUIRE_API_KEY=true → 401", async () => {
  process.env.REQUIRE_API_KEY = "true";
  const policy = await loadPolicy();
  const headers = new Headers({ authorization: "Bearer sk-stub-bogus" });
  const out = await policy.evaluate(ctx(headers));
  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 401);
    assert.equal(out.code, "AUTH_002");
  }
});

test("#2257 — invalid bearer + REQUIRE_API_KEY=false → anonymous (with warning log)", async () => {
  const originalWarn = console.warn;
  const warnings: string[] = [];
  console.warn = (msg: string) => warnings.push(String(msg));
  try {
    const policy = await loadPolicy();
    const headers = new Headers({ authorization: "Bearer sk-stub-bogus" });
    const out = await policy.evaluate(ctx(headers));
    assert.equal(out.allow, true);
    if (out.allow) {
      assert.equal(out.subject.kind, "anonymous");
      assert.equal(out.subject.id, "local");
    }
    assert.ok(
      warnings.some((w) => w.includes("[clientApiPolicy]") && w.includes("REQUIRE_API_KEY=false")),
      "expected a warning about the fallback"
    );
  } finally {
    console.warn = originalWarn;
  }
});

test("#2257 — fallback warning masks the bearer (only last-4 in log)", async () => {
  const originalWarn = console.warn;
  const warnings: string[] = [];
  console.warn = (msg: string) => warnings.push(String(msg));
  try {
    const policy = await loadPolicy();
    const headers = new Headers({ authorization: "Bearer sk-secretprefix-secretmiddle-XYZW" });
    const out = await policy.evaluate(ctx(headers));
    assert.equal(out.allow, true);
    assert.ok(
      warnings.every((w) => !w.includes("secretprefix") && !w.includes("secretmiddle")),
      "warning leaked the full bearer; only masked key id should be logged"
    );
    assert.ok(
      warnings.some((w) => w.includes("key_XYZW")),
      "expected masked key id (last-4) in the warning"
    );
  } finally {
    console.warn = originalWarn;
  }
});

test("#2257 — no bearer + REQUIRE_API_KEY=false → anonymous (unchanged, no fallback warning)", async () => {
  const originalWarn = console.warn;
  const warnings: string[] = [];
  console.warn = (msg: string) => warnings.push(String(msg));
  try {
    const policy = await loadPolicy();
    const out = await policy.evaluate(ctx(new Headers()));
    assert.equal(out.allow, true);
    if (out.allow) {
      assert.equal(out.subject.kind, "anonymous");
    }
    // No warning should fire when no bearer is sent in the first place —
    // the warning is specifically for the "invalid-bearer-fell-through" case.
    assert.ok(
      warnings.every((w) => !w.includes("[clientApiPolicy]")),
      "no fallback warning expected when no bearer was sent"
    );
  } finally {
    console.warn = originalWarn;
  }
});
