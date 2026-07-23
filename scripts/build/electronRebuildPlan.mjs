/**
 * Spawn plan for the better-sqlite3 Electron-ABI rebuild (pure — import-safe for tests).
 *
 * On Windows, `npx.cmd` MUST be spawned through a shell: since Node's
 * CVE-2024-27980 hardening, spawning `.cmd`/`.bat` shims without `shell: true`
 * fails outright (spawnSync returns `status: null`), which broke the v3.8.47
 * tag build ("better-sqlite3 rebuild against electron 43.1.0 failed (exit null)").
 * The args are a fixed literal list — no untrusted input reaches the shell.
 */
export function buildRebuildSpawnPlan(platform) {
  const win = platform === "win32";
  return {
    command: win ? "npx.cmd" : "npx",
    args: ["--yes", "node-gyp", "rebuild"],
    shell: win,
  };
}
