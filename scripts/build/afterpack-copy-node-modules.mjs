import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

// electron-builder >=26 injects an "!**/node_modules/**" ignore into every
// extraResources/extraFiles pattern list (app-builder-lib/out/fileMatcher.js),
// and that ignore cannot be overridden by any later positive filter pattern —
// verified empirically with a minimal fixture on 26.15.3. The standalone
// server resolves better-sqlite3 (and other runtime deps) from the *primary*
// node_modules at resources/app/node_modules (see
// prepare-electron-standalone.mjs: "Verify better-sqlite3 Node-API prebuilds in
// the primary node_modules"), so without this hook the packaged desktop app silently loses its native
// SQLite driver and falls back to sql.js — the exact regression guarded by
// issue #7592's cold-restart smoke check.
export default async function afterPack(context) {
  const stagingNodeModules = join(
    context.packager.projectDir,
    "..",
    ".build",
    "electron-standalone",
    "node_modules"
  );
  const destNodeModules = join(context.appOutDir, "resources", "app", "node_modules");

  if (!existsSync(stagingNodeModules)) {
    console.warn(`[afterpack] no staged node_modules at ${stagingNodeModules} — skipping restore`);
    return;
  }

  rmSync(destNodeModules, { recursive: true, force: true });
  cpSync(stagingNodeModules, destNodeModules, { recursive: true });
  console.log(
    `[afterpack] restored ${readdirSync(destNodeModules).length} runtime module(s) into resources/app/node_modules`
  );
}
