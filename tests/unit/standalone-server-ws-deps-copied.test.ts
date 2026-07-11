/**
 * tests/unit/standalone-server-ws-deps-copied.test.ts
 *
 * Bug: #6608 added `import headResponseGuard from "./head-response-guard.cjs"`
 * to scripts/dev/standalone-server-ws.mjs but did NOT add a copy entry to
 * scripts/build/assembleStandalone.mjs. The standalone Docker image then
 * crashed at boot: ERR_MODULE_NOT_FOUND /app/head-response-guard.cjs.
 *
 * Guard: every RELATIVE import in standalone-server-ws.mjs must have a
 * matching copy entry in assembleStandalone.mjs, so a future sibling module
 * cannot silently break the container again.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "../..");
const serverWsSrc = readFileSync(join(ROOT, "scripts/dev/standalone-server-ws.mjs"), "utf8");
const assembleSrc = readFileSync(join(ROOT, "scripts/build/assembleStandalone.mjs"), "utf8");

/** All relative same-dir imports of standalone-server-ws.mjs (./foo.mjs|cjs). */
function relativeImports(src: string): string[] {
  const out: string[] = [];
  const re = /from\s+["']\.\/([\w./-]+\.(?:mjs|cjs))["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) out.push(m[1]);
  return [...new Set(out)];
}

test("standalone-server-ws.mjs has relative imports to verify", () => {
  const imports = relativeImports(serverWsSrc);
  assert.ok(imports.length > 0, "expected at least one relative import (sanity)");
  assert.ok(
    imports.includes("head-response-guard.cjs"),
    "expected the #6608 head-response-guard.cjs import (sanity)"
  );
});

test("every relative import of standalone-server-ws.mjs is copied by assembleStandalone", () => {
  const missing = relativeImports(serverWsSrc).filter((f) => !assembleSrc.includes(f));
  assert.deepEqual(
    missing,
    [],
    `assembleStandalone.mjs must copy these server-ws.mjs dependencies: ${missing.join(", ")}`
  );
});
