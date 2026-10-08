// Regression coverage for #14325 — the `:next` Docker channel got stuck at the
// 2026-09-17 image because every `docker/build-push-action` step in
// docker-publish.yml runs `npm run build` (webpack, OMNIROUTE_USE_TURBOPACK=0)
// with the Dockerfile's default 6144 MB V8 heap ceiling
// (`ARG OMNIROUTE_BUILD_MEMORY_MB=6144`), instead of the 12288 MB ceiling that
// the equivalent native `npm run build` invocations already use in
// build.yml/quality.yml on the very same runner class. The build then dies with
// "FATAL ERROR: Ineffective mark-compacts near heap limit ... JavaScript heap
// out of memory" during the webpack production pass, well before the process's
// RSS would approach the kernel/cgroup OOM-killer limit that
// docker-build-memory-budget.test.ts already guards.
//
// This is a distinct failure mode from that file's "ResourceExhausted" kernel
// OOM: this one is V8 hitting its OWN heap ceiling, which is a pure function of
// the --max-old-space-size value baked into NODE_OPTIONS at build time. Under
// webpack (unlike Turbopack) that ceiling directly bounds the process's real
// memory use, so it is fixable by raising the heap budget alone.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const workflow = readFileSync(
  fileURLToPath(new URL("../../.github/workflows/docker-publish.yml", import.meta.url)),
  "utf8"
);

const buildYml = readFileSync(
  fileURLToPath(new URL("../../.github/workflows/build.yml", import.meta.url)),
  "utf8"
);

// build.yml already proves the runner class (the same GitHub-hosted
// ubuntu-24.04 / ubuntu-24.04-arm boxes docker-publish.yml's `build` job uses)
// fits a 12288 MB webpack heap for this exact `npm run build`/`build:release`
// invocation.
test("build.yml's known-good heap budget is 12288 MB", () => {
  assert.match(buildYml, /OMNIROUTE_BUILD_MEMORY_MB:\s*"12288"/);
});

test("every docker-publish.yml build-push-action step raises the V8 heap ceiling past the Dockerfile's 6144 MB default", () => {
  const buildArgBlocks = [...workflow.matchAll(/build-args:\s*\|\n((?: {12}\S.*\n)+)/g)].map(
    (m) => m[1]
  );

  assert.ok(
    buildArgBlocks.length >= 4,
    `expected at least 4 build-args blocks (runner-base/runner-web ×2 platforms' worth of steps), found ${buildArgBlocks.length}`
  );

  const missing: number[] = [];
  buildArgBlocks.forEach((block, i) => {
    if (!/OMNIROUTE_BUILD_MEMORY_MB=\d+/.test(block)) {
      missing.push(i);
    }
  });

  assert.deepEqual(
    missing,
    [],
    `build-args block(s) at index ${JSON.stringify(missing)} never override OMNIROUTE_BUILD_MEMORY_MB, ` +
      `so those docker/build-push-action steps build with the Dockerfile's default ` +
      `ARG OMNIROUTE_BUILD_MEMORY_MB=6144 heap ceiling instead of the 12288 MB that build.yml already ` +
      `proves fits the same runner class — this is why every Docker publish on release/v3.8.51 since ` +
      `2026-09-18 16:58 UTC has died with "JavaScript heap out of memory" inside the webpack production pass`
  );
});
