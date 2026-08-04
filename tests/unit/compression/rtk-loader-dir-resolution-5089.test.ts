/**
 * #5089 — RTK rule/filter loaders must resolve their built-in asset dirs from
 * runtime anchors (process.cwd() / dirname(argv[1])) instead of
 * `fileURLToPath(import.meta.url)`, which the standalone bundle freezes to the
 * build-machine path.
 *
 * `getModuleDir()` is internal; this guards the behavioral outcome of the
 * resolution it backs: the loaders find the built-in language rule packs and
 * the built-in RTK filter catalog on disk (non-empty). If the dir resolution
 * regressed, both would silently come back empty.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { getAvailableLanguagePacks } from "@omniroute/open-sse/services/compression/ruleLoader.ts";
import { getRtkFilterCatalog } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader.ts";

test("rule loader resolves its built-in language packs (getModuleDir works)", () => {
  const packs = getAvailableLanguagePacks();
  assert.ok(Array.isArray(packs), "language packs must be an array");
  assert.ok(packs.length > 0, "built-in language rule packs must be discoverable on disk");
});

test("rtk filter loader resolves its built-in filter catalog (getModuleDir works)", () => {
  const catalog = getRtkFilterCatalog();
  assert.ok(Array.isArray(catalog), "filter catalog must be an array");
  assert.ok(catalog.length > 0, "built-in RTK filters must be discoverable on disk");
});
