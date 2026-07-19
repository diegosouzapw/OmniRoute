import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  APP_STAGING_ALLOWED_EXACT_PATHS,
  PACK_ARTIFACT_REQUIRED_PATHS,
} from "../../scripts/build/pack-artifact-policy.ts";

// #7065 (3rd occurrence of this class — tls-options/3.8.41, head-response-guard/3.8.47):
// dist/server-ws.mjs imports sibling files that assembleStandalone copies into dist/,
// but the prepublish prune deletes anything not in APP_STAGING_ALLOWED_EXACT_PATHS and
// check:pack-artifact only fails for entries in PACK_ARTIFACT_REQUIRED_PATHS. Any local
// import missing from EITHER list ships a tarball that crashes on boot. This test derives
// the closure from the source of truth (the wrapper's own imports) so the class is closed.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WRAPPER = path.join(ROOT, "scripts", "dev", "standalone-server-ws.mjs");

function localImports(): string[] {
  const src = fs.readFileSync(WRAPPER, "utf8");
  return [...src.matchAll(/from\s+"\.\/([^"]+)"/g)].map((m) => m[1]);
}

test("every server-ws.mjs local import survives the prepublish prune (allowlist)", () => {
  const missing = localImports().filter((f) => !APP_STAGING_ALLOWED_EXACT_PATHS.includes(f));
  assert.deepEqual(missing, [], `add to APP_STAGING_ALLOWED_EXACT_PATHS: ${missing.join(", ")}`);
});

test("every server-ws.mjs local import is enforced by check:pack-artifact (required)", () => {
  const missing = localImports().filter(
    (f) => !PACK_ARTIFACT_REQUIRED_PATHS.includes(`dist/${f}`)
  );
  assert.deepEqual(missing, [], `add dist/<file> to PACK_ARTIFACT_REQUIRED_PATHS: ${missing.join(", ")}`);
});

test("sanity: the wrapper actually has local imports (regex not silently broken)", () => {
  assert.ok(localImports().length >= 5, `parsed only ${localImports().length} imports`);
});
