import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  REQUIRED_MACHINE_TOKEN_RUNTIME_FILES,
  REQUIRED_SQLJS_RUNTIME_FILES,
} from "../../scripts/check/check-pack-boot.mjs";
import { PACK_ARTIFACT_NEVER_ALLOWED_SEGMENTS } from "../../scripts/build/pack-artifact-policy.ts";
import * as sqliteRuntime from "../../bin/cli/runtime/sqliteRuntime.mjs";

// Coherence guard for the v3.8.50 publish blocker (#11242): check:pack-artifact
// FAILS any tarball path containing a node_modules segment (files[] excludes them
// via "!**/node_modules/**"), while check:pack-boot REQUIRED sql.js under the
// vendored dist/node_modules/ location — a path the tarball can never contain,
// so the two gates could never be green at the same time. The npm packaging
// model is now dependency-based: sql.js and node-machine-id are declared
// `dependencies` that a clean install places under <packageRoot>/node_modules/,
// and better-sqlite3 is an optionalDependency installed natively per platform.
// These tests pin that contract so neither gate can drift back into conflict.

const REPO_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const PKG = JSON.parse(readFileSync(path.join(REPO_ROOT, "package.json"), "utf8")) as {
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
};

test("pack-boot required runtime files never reference a never-publishable vendored path", () => {
  const requiredFiles = [...REQUIRED_SQLJS_RUNTIME_FILES, ...REQUIRED_MACHINE_TOKEN_RUNTIME_FILES];
  assert.ok(requiredFiles.length > 0, "pack-boot must require at least one runtime file");
  for (const requiredPath of requiredFiles) {
    for (const segment of PACK_ARTIFACT_NEVER_ALLOWED_SEGMENTS) {
      const vendoredPrefix = `dist/${segment}/`;
      assert.ok(
        !requiredPath.includes(vendoredPrefix),
        `"${requiredPath}" lives under ${vendoredPrefix} — check:pack-artifact bans any ` +
          `tarball path with a "${segment}" segment, so check:pack-boot must require the ` +
          `dependency-installed location (node_modules/<pkg>) instead (#11242)`
      );
    }
  }
});

test("sql.js and node-machine-id are declared runtime dependencies (npm installs them)", () => {
  assert.ok(
    PKG.dependencies?.["sql.js"],
    "sql.js must stay in dependencies so a clean install provides node_modules/sql.js"
  );
  assert.ok(
    PKG.dependencies?.["node-machine-id"],
    "node-machine-id must stay in dependencies so a clean install provides node_modules/node-machine-id"
  );
});

test("the lazy better-sqlite3 runtime install targets the declared optionalDependency major", () => {
  const spec = (sqliteRuntime as Record<string, unknown>).BETTER_SQLITE3_VERSION;
  assert.equal(
    typeof spec,
    "string",
    "bin/cli/runtime/sqliteRuntime.mjs must export BETTER_SQLITE3_VERSION"
  );
  const declared = PKG.optionalDependencies?.["better-sqlite3"];
  assert.ok(declared, "package.json must declare better-sqlite3 as an optionalDependency");

  const majorOf = (versionSpec: string): number => {
    const match = versionSpec.match(/(\d+)\./);
    assert.ok(match, `"${versionSpec}" must contain a semver major`);
    return Number(match[1]);
  };
  assert.equal(
    majorOf(spec as string),
    majorOf(declared),
    `lazy runtime install "${spec}" drifted from optionalDependencies.better-sqlite3 ` +
      `"${declared}" — the fallback install must track the same major (#11242)`
  );
});
