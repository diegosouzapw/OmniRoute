import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// #11016 follow-up (suggested by maintainer on PR #11029): assert that the
// disabled boot path produces the correct "[STARTUP] Credential health scheduler
// disabled" log at runtime.
//
// Two complementary assertions:
// 1. Runtime: spawn a subprocess that imports the real scheduler with the disable
//    env set, calls initCredentialHealthCheck(), and logs the result using the
//    same conditional from instrumentation-node.ts — verifying the actual output.
// 2. Static: read src/instrumentation-node.ts and assert the boot wiring still
//    uses initCredentialHealthCheck()'s return value to select the log message.
//    This breaks if the production conditional is removed or refactored away.

const thisDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDir, "../../..");

// In CI: projectRoot has a real node_modules.
// In a worktree: the junction may not work with tsx; fall back to the main checkout.
function resolveMainCheckout(): string {
  const hasRealNodeModules = existsSync(resolve(projectRoot, "node_modules", ".package-lock.json"));
  if (hasRealNodeModules) return projectRoot;
  const candidate = resolve(projectRoot, "../../../..");
  if (existsSync(resolve(candidate, "node_modules", ".package-lock.json"))) return candidate;
  return projectRoot;
}

const mainCwd = resolveMainCheckout();

const BOOT_DISABLED_SCRIPT = `
  process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";
  const { initCredentialHealthCheck } = await import(
    "./src/lib/credentialHealth/scheduler.ts"
  );
  const started = initCredentialHealthCheck();
  console.log(
    started
      ? "[STARTUP] Credential health scheduler started"
      : "[STARTUP] Credential health scheduler disabled"
  );
  process.exit(0);
`;

test("disabled scheduler emits [STARTUP] Credential health scheduler disabled via the real initCredentialHealthCheck", () => {
  const result = execFileSync(
    process.execPath,
    ["--import", "tsx/esm", "--input-type=module", "--eval", BOOT_DISABLED_SCRIPT],
    {
      cwd: mainCwd,
      env: {
        ...process.env,
        OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK: "true",
        NODE_NO_WARNINGS: "1",
      },
      encoding: "utf8",
      timeout: 30_000,
    }
  );

  assert.match(
    result,
    /\[STARTUP\] Credential health scheduler disabled/,
    "must log the disabled message when OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK is set"
  );
  assert.doesNotMatch(
    result,
    /\[STARTUP\] Credential health scheduler started/,
    "must NOT log the started message when disabled"
  );
});

test("instrumentation-node.ts wires initCredentialHealthCheck return to the log conditional", () => {
  const src = readFileSync(
    resolve(projectRoot, "src/instrumentation-node.ts"),
    "utf8"
  ).replace(/\r\n/g, "\n");

  assert.match(
    src,
    /const started = initCredentialHealthCheck\(\)/,
    "boot wiring must capture the return value of initCredentialHealthCheck()"
  );
  assert.match(
    src,
    /started[\s\S]{0,50}\?[\s\S]{0,80}scheduler started[\s\S]{0,50}:[\s\S]{0,80}scheduler disabled/,
    "boot wiring must use the return value to select started vs disabled log"
  );
});
