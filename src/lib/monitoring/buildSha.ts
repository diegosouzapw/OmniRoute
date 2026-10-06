/**
 * Runtime build identity (#10427).
 *
 * `scripts/build/write-build-sha.mjs` stamps the git SHA into `dist/BUILD_SHA` and
 * `.build/next/standalone/BUILD_SHA` at release-build time. Reading it back at runtime is
 * what lets an operator answer "what code is this box actually running?" over HTTP.
 *
 * Before this existed, answering that question during the 2026-08-14 gateway outage meant
 * SSH-ing into the host and grepping the compiled Next chunks — the deployed package
 * turned out to be built from a feature branch that predated the fix it was supposed to
 * carry.
 *
 * Resolution order: explicit env var (containers can inject it without the sentinel file),
 * then the sentinel files relative to the working directory. Unknown → `null`, never a
 * fabricated or guessed value.
 */

import fs from "node:fs";
import path from "node:path";

const SENTINEL_PATHS = [
  ["dist", "BUILD_SHA"],
  [".build", "next", "standalone", "BUILD_SHA"],
  ["BUILD_SHA"],
];

let cached: string | null | undefined;

export function readRunningBuildSha(cwd: string = process.cwd()): string | null {
  if (cached !== undefined) return cached;

  const fromEnv = process.env.OMNIROUTE_BUILD_SHA?.trim();
  if (fromEnv) {
    cached = fromEnv;
    return cached;
  }

  for (const segments of SENTINEL_PATHS) {
    try {
      const value = fs.readFileSync(path.join(cwd, ...segments), "utf8").trim();
      if (value) {
        cached = value;
        return cached;
      }
    } catch {
      // Sentinel absent at this location — try the next one. A dev run has none of them.
    }
  }

  cached = null;
  return cached;
}
