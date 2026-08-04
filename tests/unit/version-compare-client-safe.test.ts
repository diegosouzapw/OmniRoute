// Regression guard for the base-red that broke the Turbopack `next build`:
// kimiSponsorBannerGate.ts (pulled into the "use client" KimiSponsorBanner
// bundle) imported the semver helpers from `versionCheck.ts`, whose top-level
// `import { execFile } from "child_process"` cannot be tree-shaken out of a
// client bundle → "Module not found: Can't resolve 'child_process'".
//
// The fix moved the pure helpers into `versionCompare.ts` (dependency-free) and
// pointed the client-reachable gate at it. These assertions lock that in so the
// server module can never sneak back into the client bundle via this path.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const src = (p: string) => readFileSync(resolve(here, "../../", p), "utf8");

const COMPARE = "src/lib/system/versionCompare.ts";
const GATE = "src/app/(dashboard)/dashboard/kimiSponsorBannerGate.ts";

test("versionCompare.ts is dependency-free (no server-only imports)", () => {
  // Match actual import/require statements, not the word appearing in the
  // module's own docstring (which explains WHY it avoids these).
  const importLines = src(COMPARE)
    .split("\n")
    .filter((l) => /^\s*import\b/.test(l) || /\brequire\s*\(/.test(l));
  const joined = importLines.join("\n");
  for (const forbidden of ["child_process", "@/lib/services/installers", "@/shared/utils/logger", '"util"']) {
    assert.ok(
      !joined.includes(forbidden),
      `versionCompare.ts must stay client-safe — found forbidden import ${forbidden}`
    );
  }
  // The file must in fact have no import statements at all (fully self-contained).
  assert.equal(importLines.length, 0, "versionCompare.ts should have zero imports");
});

test("the client-reachable Kimi banner gate imports helpers from versionCompare, not versionCheck", () => {
  const code = src(GATE);
  assert.match(code, /from "@\/lib\/system\/versionCompare"/);
  assert.ok(
    !/from "@\/lib\/system\/versionCheck"/.test(code),
    "kimiSponsorBannerGate.ts must NOT import from versionCheck (drags child_process into the client bundle)"
  );
});

test("versionCompare exports working isNewer/normalizeVersion", async () => {
  const m = await import("../../src/lib/system/versionCompare.ts");
  assert.deepEqual(m.normalizeVersion("v3.8.60"), [3, 8, 60]);
  assert.equal(m.normalizeVersion("garbage"), null);
  assert.equal(m.isNewer("3.8.61", "3.8.60"), true);
  assert.equal(m.isNewer("3.8.60", "3.8.60"), false);
  assert.equal(m.isNewer(null, "3.8.60"), false);
});

test("versionCheck still re-exports the helpers (back-compat for server importers)", async () => {
  const m = await import("../../src/lib/system/versionCheck.ts");
  assert.equal(typeof m.isNewer, "function");
  assert.equal(typeof m.normalizeVersion, "function");
  assert.equal(m.isNewer("3.9.0", "3.8.60"), true);
});
