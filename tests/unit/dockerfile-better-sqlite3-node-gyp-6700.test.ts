/**
 * #6700 — Dokploy (and some other self-hosted) Docker builds ended up with a
 * broken/mismatched better-sqlite3 native binding under npm 11. The `builder`
 * stage installed dependencies with `npm ci --ignore-scripts` (deliberate — it
 * closes the supply-chain surface where a transitive dep's install script runs
 * arbitrary code) and then re-enabled the native build for the one package that
 * needs it via `npm rebuild better-sqlite3`. `npm rebuild` re-runs the package's
 * own install script indirectly, which depends on npm's script-allowlist
 * machinery correctly re-enabling that single package's script — some
 * self-hosted build environments hit a broken build via that indirection.
 *
 * Fix: invoke `node-gyp rebuild` directly inside `node_modules/better-sqlite3`,
 * bypassing npm's script-running layer entirely, so the compile step is
 * deterministic regardless of npm version or ignore-scripts allowlist behavior.
 *
 * This guards the mechanism (the direct node-gyp invocation replaces the
 * `npm rebuild` indirection, and a smoke-load still follows it); the end-to-end
 * "the Dokploy build now produces a working binding" proof is a successful
 * `docker build` in that environment (tracked as a live-validation follow-up —
 * this sandbox has no accessible Docker daemon to run the real build).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dockerfile = fs.readFileSync(path.join(repoRoot, "Dockerfile"), "utf-8");
const lines = dockerfile.split("\n");

/** Line indices that bound the `builder` stage (from its FROM to the next FROM). */
function builderStageRange(): { start: number; end: number } {
  const start = lines.findIndex((l) => /^FROM\s+\S+\s+AS\s+builder\b/i.test(l.trim()));
  assert.ok(start >= 0, "Dockerfile must declare a `builder` stage");
  const after = lines.slice(start + 1).findIndex((l) => /^FROM\s+/i.test(l.trim()));
  const end = after === -1 ? lines.length : start + 1 + after;
  return { start, end };
}

test("#6700 builder stage compiles better-sqlite3 via a direct node-gyp rebuild, not `npm rebuild`", () => {
  const { start, end } = builderStageRange();
  const stage = lines.slice(start, end).join("\n");

  assert.match(
    stage,
    /cd node_modules\/better-sqlite3\s*&&\s*npx\s+(--yes\s+)?node-gyp rebuild/,
    "builder stage must compile better-sqlite3 by invoking node-gyp directly inside its " +
      "package directory (bypasses npm's rebuild-script indirection)"
  );
  assert.doesNotMatch(
    stage,
    /npm rebuild better-sqlite3/,
    "builder stage must not fall back to `npm rebuild better-sqlite3` — that indirection " +
      "is the #6700 Dokploy build failure mode"
  );
});

test("#6700 the better-sqlite3 rebuild happens after `npm ci --ignore-scripts` and before the smoke-load", () => {
  const { start, end } = builderStageRange();
  // Ignore comment lines (`#…`) so prose that merely mentions these commands
  // (e.g. explaining *why* in a comment above the RUN step) is not mistaken
  // for the real instruction when checking ordering.
  const stage = lines.slice(start, end).filter((l) => !l.trim().startsWith("#"));

  const ignoreScriptsIdx = stage.findIndex((l) => /npm ci\b.*--ignore-scripts/.test(l));
  const rebuildIdx = stage.findIndex((l) => /node-gyp rebuild/.test(l));
  const smokeLoadIdx = stage.findIndex((l) =>
    /node -e ".*require\('better-sqlite3'\)\(':memory:'\)\.close\(\)"/.test(l)
  );

  assert.ok(ignoreScriptsIdx >= 0, "builder stage must run `npm ci --ignore-scripts`");
  assert.ok(rebuildIdx >= 0, "builder stage must run the better-sqlite3 node-gyp rebuild");
  assert.ok(smokeLoadIdx >= 0, "builder stage must smoke-load better-sqlite3 after the rebuild");
  assert.ok(
    ignoreScriptsIdx <= rebuildIdx && rebuildIdx <= smokeLoadIdx,
    "order must be: npm ci --ignore-scripts -> node-gyp rebuild -> smoke-load"
  );
});
