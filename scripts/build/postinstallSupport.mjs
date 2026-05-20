#!/usr/bin/env node

import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Detect whether the current install tree contains the published standalone app bundle.
 * Source checkouts should not create `app/` during postinstall because Next.js would
 * mis-detect it as a competing App Router root and serve 404s for the real `src/app` routes.
 *
 * @param {string} rootDir
 * @returns {boolean}
 */
export function hasStandaloneAppBundle(rootDir) {
  return existsSync(join(rootDir, "app", "server.js"));
}
