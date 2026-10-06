/**
 * The boot-time secret check runs through enforceWebRuntimeEnv() (src/lib/env/runtimeEnv.ts),
 * which feeds validateSecrets() errors into the same exit path as the schema errors. Nothing
 * pinned that wiring, so unplugging it would silently let a server boot with a too-short
 * API_KEY_SECRET.
 *
 * secretsValidator.ts also exported enforceSecrets(), a second entry point around the same
 * validateSecrets() call. It had no live caller and duplicated a guard that was already
 * running — removed here, and asserted gone so it does not come back.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { validateSecrets } from "../../src/shared/utils/secretsValidator.ts";

function readSource(relativePath: string): string {
  return fs.readFileSync(path.resolve(import.meta.dirname, "../..", relativePath), "utf-8");
}

// ── validateSecrets rules ────────────────────────────────────────────────────

test("validateSecrets: a strong API_KEY_SECRET and unset JWT_SECRET is valid", () => {
  const result = validateSecrets({ API_KEY_SECRET: "a".repeat(32) });
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("validateSecrets: a missing API_KEY_SECRET is an error (the only required rule)", () => {
  const result = validateSecrets({});
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.name === "API_KEY_SECRET"));
});

test("validateSecrets: an API_KEY_SECRET shorter than 16 chars is an error", () => {
  const result = validateSecrets({ API_KEY_SECRET: "short" });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.name === "API_KEY_SECRET"));
});

test("validateSecrets: a known-weak but long-enough API_KEY_SECRET is a warning, not an error", () => {
  // "endpoint-proxy-api-key-secret" is 30 chars — long enough to reach the
  // known-weak check specifically, not the length check.
  const result = validateSecrets({ API_KEY_SECRET: "endpoint-proxy-api-key-secret" });
  assert.equal(result.valid, true, "known-weak values are a warning, not a hard error");
  assert.ok(result.warnings.some((w) => w.name === "API_KEY_SECRET"));
});

test("validateSecrets: JWT_SECRET is optional — a missing one is not an error", () => {
  const result = validateSecrets({ API_KEY_SECRET: "a".repeat(32) });
  assert.equal(result.valid, true);
  assert.equal(
    result.errors.some((e) => e.name === "JWT_SECRET"),
    false
  );
});

// ── The live guard: validateSecrets errors must stay fatal at boot ───────────

test("enforceWebRuntimeEnv exits the process on a secret error", () => {
  const source = readSource("src/lib/env/runtimeEnv.ts");
  assert.match(
    source,
    /const secretValidation = validateSecrets\(env\)/,
    "validateWebRuntimeEnv must run validateSecrets"
  );
  assert.match(
    source,
    /const errors = \[\.\.\.secretValidation\.errors\]/,
    "secret errors must be merged into the fatal error list, not just warned about"
  );
  assert.match(source, /process\.exit\(1\)/, "enforceWebRuntimeEnv must exit on an invalid env");
});

test("registerNodejs calls enforceWebRuntimeEnv, after ensureSecrets", () => {
  const source = readSource("src/instrumentation-node.ts");
  const ensure = source.indexOf("await ensureSecrets();");
  const enforce = source.indexOf("enforceWebRuntimeEnv()");

  assert.notEqual(ensure, -1, "ensureSecrets() call not found");
  assert.notEqual(enforce, -1, "enforceWebRuntimeEnv() call not found — the boot guard is unwired");
  assert.ok(
    ensure < enforce,
    "enforceWebRuntimeEnv() must run after ensureSecrets(), which generates the secrets a " +
      "fresh install does not have yet"
  );
});

test("secretsValidator exports no second enforce entry point", () => {
  const source = readSource("src/shared/utils/secretsValidator.ts");
  assert.doesNotMatch(
    source,
    /export function enforceSecrets/,
    "enforceSecrets() duplicated the enforceWebRuntimeEnv() guard with no caller"
  );
});
