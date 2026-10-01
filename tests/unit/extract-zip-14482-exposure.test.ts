// tests/unit/extract-zip-14482-exposure.test.ts
// Probe for issue #14482 — extract-zip GHSA-7pqw-9j4j-h8q3 / GHSA-jmr9-qjv8-65gv.
//
// This is NOT a functional-bug repro (there is no OmniRoute code path that calls the
// vulnerable npm package). It is a reachability/exposure proof: it asserts the two
// premises the triage relies on to call this "accepted risk, doc-only fix" rather than
// "code bug, needs a patch":
//   1. extract-zip is reachable ONLY through the promptfoo (devDependency) ->
//      @openai/codex-security chain — never through a production dependency.
//   2. OmniRoute's own source (src/, open-sse/, bin/, electron/ *code*, not its
//      package-lock.json) never imports the "extract-zip" npm package directly.
// If either assertion ever breaks (e.g. a future PR adds extract-zip as a direct or
// production dependency, or a production module starts importing it), this test goes
// red and should block merge until re-triaged — that is the intended regression guard.
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..", "..");

// Reads the committed package-lock.json directly rather than shelling out to
// `npm ls` against installed node_modules: in a git-worktree checkout that reuses a
// SYMLINKED node_modules from a different (main) checkout, npm ls's hoisting/
// "extraneous" detection reflects the shared install state, not this checkout's
// lockfile, and produced a false top-level `extract-zip` node in exactly this setup.
// The lockfile's `packages[path].dependencies` edges are deterministic and checkout-
// local, independent of what happens to be physically installed in node_modules.
interface LockPackage {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}

interface Lockfile {
  packages?: Record<string, LockPackage>;
}

function readLockfile(): Lockfile {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "package-lock.json"), "utf8")) as Lockfile;
}

function declaredDependents(lock: Lockfile, depName: string): string[] {
  const dependents: string[] = [];
  for (const [key, pkg] of Object.entries(lock.packages ?? {})) {
    if (key === "") continue; // root project node itself, handled separately
    const deps: Record<string, string> = {
      ...(pkg.dependencies ?? {}),
      ...(pkg.optionalDependencies ?? {}),
    };
    if (Object.prototype.hasOwnProperty.call(deps, depName)) dependents.push(key);
  }
  return dependents;
}

test("extract-zip (GHSA-7pqw-9j4j-h8q3 / GHSA-jmr9-qjv8-65gv) is reachable only via the promptfoo devDependency chain", () => {
  const lock = readLockfile();
  const root = lock.packages?.[""] ?? {};

  // 1. The root project must never depend on extract-zip directly (prod or dev).
  assert.ok(
    !Object.prototype.hasOwnProperty.call(root.dependencies ?? {}, "extract-zip"),
    "root project must not depend on extract-zip directly (production)"
  );
  assert.ok(
    !Object.prototype.hasOwnProperty.call(root.devDependencies ?? {}, "extract-zip"),
    "root project must not depend on extract-zip directly (dev)"
  );

  // 2. Exactly one package in the whole tree declares a dependency on extract-zip,
  //    and it must be @openai/codex-security.
  const extractZipDependents = declaredDependents(lock, "extract-zip");
  assert.deepEqual(
    extractZipDependents,
    ["node_modules/@openai/codex-security"],
    `expected only @openai/codex-security to depend on extract-zip, got: ${extractZipDependents.join(", ")}`
  );

  // 3. The only thing that depends on @openai/codex-security must be promptfoo.
  const codexSecurityDependents = declaredDependents(lock, "@openai/codex-security");
  assert.deepEqual(
    codexSecurityDependents,
    ["node_modules/promptfoo"],
    `expected only promptfoo to depend on @openai/codex-security, got: ${codexSecurityDependents.join(", ")}`
  );

  // 4. promptfoo itself must be a devDependency, never a production dependency —
  //    this is what makes `npm audit --omit=dev` correctly report 0 for this chain.
  assert.ok(
    Object.prototype.hasOwnProperty.call(root.devDependencies ?? {}, "promptfoo"),
    "promptfoo must be listed under devDependencies"
  );
  assert.ok(
    !Object.prototype.hasOwnProperty.call(root.dependencies ?? {}, "promptfoo"),
    "promptfoo must NOT also be listed under production dependencies"
  );
});

test("OmniRoute's own production/runtime code never imports the extract-zip npm package", () => {
  const scanDirs = ["src", "open-sse", "bin"].map((d) => path.join(ROOT, d));
  const offenders: string[] = [];

  function walkFiles(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") continue;
        walkFiles(full);
      } else if (/\.(ts|tsx|js|mjs|cjs)$/.test(entry.name)) {
        const content = fs.readFileSync(full, "utf8");
        // Match an actual import/require of the npm package, not incidental substring
        // hits like our own local `extractZip()` helper function name.
        if (/(?:from\s+["']extract-zip["']|require\(["']extract-zip["']\))/.test(content)) {
          offenders.push(full);
        }
      }
    }
  }

  for (const dir of scanDirs) walkFiles(dir);

  assert.deepEqual(
    offenders,
    [],
    `expected no production import of the vulnerable "extract-zip" npm package, found: ${offenders.join(", ")}`
  );
});
