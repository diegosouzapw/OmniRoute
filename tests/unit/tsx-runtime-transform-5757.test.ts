/**
 * #5757 — regression guard for the runtime `tsx/esm` → esbuild transform path.
 *
 * Background: `tsx` is a runtime `dependency` (not dev), and the published CLI
 * registers it at boot (`bin/omniroute.mjs` → `await import("tsx/esm")`) to load
 * OmniRoute's own `.ts` sources. A fresh `npm install omniroute` therefore pulls
 * `esbuild` transitively via `tsx`. #5757 worried a broken esbuild could make a
 * fresh install "build-fragile", and proposed forcing `esbuild@0.27.4`.
 *
 * That override is unsafe: `tsx` declares `esbuild@~0.28.0` and `fumadocs-mdx`
 * (also a runtime dep) declares `esbuild@^0.28.0`; forcing 0.27.x pushes esbuild
 * below both. So instead of pinning a version, these two tests guard the actual
 * invariants:
 *   1. the runtime tsx/esm loader still transforms modern syntax correctly, and
 *   2. the resolved esbuild stays inside tsx's declared range (so nobody
 *      reintroduces the out-of-range override this issue proposed).
 *
 * Run: node --import tsx/esm --test tests/unit/tsx-runtime-transform-5757.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const FIXTURE = join(__dirname, "_fixtures", "tsx-runtime-modern-syntax.ts");

test("#5757: runtime tsx/esm loader transforms modern syntax (esbuild functional guard)", () => {
  // Exactly the mechanism bin/omniroute.mjs uses. cwd = package root so `tsx`
  // resolves regardless of where the process is launched from (see #4055).
  const res = spawnSync(process.execPath, ["--import", "tsx/esm", FIXTURE], {
    cwd: REPO_ROOT,
    encoding: "utf8",
    timeout: 60_000,
  });

  assert.equal(res.status, 0, `tsx/esm failed to run the fixture:\n${res.stderr}`);
  const line = (res.stdout || "").split("\n").find((l) => l.startsWith("TSX_TRANSFORM_OK"));
  assert.ok(
    line,
    `missing TSX_TRANSFORM_OK marker.\nstdout:\n${res.stdout}\nstderr:\n${res.stderr}`
  );

  const payload = JSON.parse(line!.slice("TSX_TRANSFORM_OK ".length)) as {
    rest: Record<string, number>;
    arr: number[];
    bumped: number;
    opt: number;
    total: number;
  };
  assert.equal(payload.bumped, 42); // class field + private field lowering
  assert.equal(payload.opt, 99); // optional chaining + nullish coalescing
  assert.equal(payload.total, 154); // destructuring/spread/async/logical-assign
  assert.deepEqual(payload.rest, { c: 3, d: 4 });
  assert.deepEqual(payload.arr, [20, 30, 10]);
});

test("#5757: resolved esbuild stays within tsx's declared range (blocks the out-of-range override)", () => {
  const tsxPkg = JSON.parse(
    readFileSync(join(REPO_ROOT, "node_modules", "tsx", "package.json"), "utf8")
  ) as { dependencies?: Record<string, string> };
  const esbuildPkg = JSON.parse(
    readFileSync(join(REPO_ROOT, "node_modules", "esbuild", "package.json"), "utf8")
  ) as { version: string };

  const declared = tsxPkg.dependencies?.esbuild ?? "";
  // e.g. "~0.28.0" → base minor "0.28". Self-maintaining: when tsx bumps its
  // esbuild range, this guard follows it automatically.
  const baseMinor = declared.replace(/^[~^]/, "").split(".").slice(0, 2).join(".");
  assert.ok(baseMinor, `could not parse tsx's declared esbuild range: "${declared}"`);
  assert.ok(
    esbuildPkg.version.startsWith(baseMinor + "."),
    `esbuild ${esbuildPkg.version} is outside tsx's declared range "${declared}". ` +
      `A global esbuild override (such as the esbuild@0.27.4 workaround proposed in #5757) ` +
      `breaks tsx and fumadocs-mdx (both require esbuild@^0.28) — do not add one.`
  );
});
