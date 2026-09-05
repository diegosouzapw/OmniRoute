/**
 * next-version-pinned.test.ts — `next` must be pinned to an exact version.
 *
 * The published package ships a PREBUILT `.next` directory. That build output is
 * tightly coupled to the exact Next.js runtime that produced it: `next start`
 * reads build manifests whose shape changes between minors. With a caret range,
 * `npm i -g omniroute` resolves whatever Next is latest at INSTALL time, so a
 * fresh upstream release silently breaks every new install even though nothing
 * in this repo changed.
 *
 * That is not hypothetical: Next 16.3.1 (published 2026-08-13T22:45Z) added
 * `validationLevel` to its server config schema, and a `.next` built by 16.2.12
 * crashes at boot with "Cannot read properties of undefined (reading
 * 'validationLevel')" — the symbol has 0 occurrences in 16.2.12 and 74 in
 * 16.3.1. Range `^16.2.11` picked it up on the VPS install (2026-08-14).
 *
 * `react`/`react-dom` are already pinned exactly for the same reason; this test
 * extends that invariant to `next` and keeps package.json in sync with the
 * lockfile version the build actually uses.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../../../", import.meta.url);
const EXACT_VERSION = /^\d+\.\d+\.\d+(?:-[\w.]+)?$/;

/** Deps whose published artifact is coupled to the exact installed runtime. */
const MUST_BE_EXACT = ["next", "react", "react-dom"];

async function readJson(relative: string): Promise<Record<string, unknown>> {
  return JSON.parse(await readFile(fileURLToPath(new URL(relative, ROOT)), "utf8"));
}

test("build-coupled dependencies are pinned to exact versions", async () => {
  const pkg = await readJson("package.json");
  const deps = (pkg.dependencies ?? {}) as Record<string, string>;

  const ranged = MUST_BE_EXACT.filter((name) => deps[name] && !EXACT_VERSION.test(deps[name]));

  assert.deepEqual(
    ranged,
    [],
    "these ship a prebuilt artifact and must be pinned exactly (a range lets a fresh " +
      `upstream release break new installs): ${ranged.map((n) => `${n}@${deps[n]}`).join(", ")}`
  );
});

test("pinned next version matches the lockfile version the build uses", async () => {
  const pkg = await readJson("package.json");
  const lock = await readJson("package-lock.json");

  const declared = ((pkg.dependencies ?? {}) as Record<string, string>).next;
  const packages = (lock.packages ?? {}) as Record<string, { version?: string }>;
  const locked = packages["node_modules/next"]?.version;

  assert.ok(locked, "next missing from package-lock.json");
  assert.equal(
    declared,
    locked,
    `package.json declares next@${declared} but the lockfile builds with next@${locked}`
  );
});
