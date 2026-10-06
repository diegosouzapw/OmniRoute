/**
 * Security regression (GHSA-35fw-cv32-2373): every /api/cli-tools/* route whose
 * handler reaches a child-process spawn must be classified LOCAL_ONLY so loopback
 * enforcement runs unconditionally before any auth check.
 *
 * 13 routes call getCliRuntimeStatus(toolId) directly from their exported GET
 * handler (src/shared/services/cliRuntime.ts): getCliRuntimeStatus ->
 * locateCommandCandidate -> locateCommand -> runProcess("sh", ["-c",
 * 'command -v -- "$1"', ...]) -> spawn(). /api/cli-tools/detect reaches the same
 * class via detectAllTools() -> execFile(binary, ["--version"]) + execFile("which")
 * (src/lib/cli-helper/tool-detector.ts). Their six siblings (omp, letta,
 * grok-build, forge, jcode, qwen -settings + runtime/) call the SAME helper and
 * were already LOCAL_ONLY; these 14 were only behind Tier 3 MANAGEMENT, which
 * requireManagementAuth() waives whenever requireLogin=false (including the
 * fresh-install window before a password is set).
 *
 * Classifying them LOCAL_ONLY closes the remote-spawn vector: a non-loopback /
 * non-LAN caller — with or without a leaked JWT over a Cloudflared/Ngrok tunnel —
 * cannot trigger process spawning or enumerate the host's CLI inventory.
 * Hard Rules #15 + #17. See docs/security/ROUTE_GUARD_TIERS.md.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyBypassableByManageScope,
  isLocalOnlyPath,
} from "../../src/server/authz/routeGuard.ts";
import { SPAWN_CAPABLE_PREFIXES } from "../../src/shared/constants/spawnCapablePrefixes.ts";
import { SPAWN_CAPABLE_ROUTE_ROOTS } from "../../scripts/check/check-route-guard-membership.ts";

/** The 14 cli-tools routes that reach a spawn (GHSA-35fw-cv32-2373). */
const SPAWNING_CLI_TOOLS_ROUTES: ReadonlyArray<string> = [
  "/api/cli-tools/all-statuses",
  "/api/cli-tools/claude-settings",
  "/api/cli-tools/cline-settings",
  "/api/cli-tools/codewhale-settings",
  "/api/cli-tools/codex-settings",
  "/api/cli-tools/crush-settings",
  "/api/cli-tools/deepseek-tui-settings",
  "/api/cli-tools/detect",
  "/api/cli-tools/droid-settings",
  "/api/cli-tools/kilo-settings",
  "/api/cli-tools/openclaw-settings",
  "/api/cli-tools/pi-settings",
  "/api/cli-tools/smelt-settings",
  "/api/cli-tools/status",
];

for (const route of SPAWNING_CLI_TOOLS_ROUTES) {
  test(`GHSA-35fw: ${route} is LOCAL_ONLY (reaches spawn via getCliRuntimeStatus/detectAllTools)`, () => {
    assert.equal(isLocalOnlyPath(route), true);
  });

  test(`GHSA-35fw: ${route}/ (trailing slash) is LOCAL_ONLY`, () => {
    assert.equal(isLocalOnlyPath(`${route}/`), true);
  });

  test(`GHSA-35fw: ${route} cannot be opened through the manage-scope bypass`, () => {
    // Mirror in SPAWN_CAPABLE_PREFIXES: the zod schema rejects the prefix at
    // PATCH /api/settings time and the runtime predicate refuses a malformed row.
    assert.ok(
      SPAWN_CAPABLE_PREFIXES.includes(route),
      `${route} must be listed in SPAWN_CAPABLE_PREFIXES`
    );
    assert.equal(isLocalOnlyBypassableByManageScope(route), false);
  });

  test(`GHSA-35fw: the spawn-capable route audit enumerates ${route}`, () => {
    const root = `src/app${route}`;
    assert.ok(
      SPAWN_CAPABLE_ROUTE_ROOTS.includes(root),
      `${root} must be listed in SPAWN_CAPABLE_ROUTE_ROOTS so the 6A.8 gate enforces it`
    );
  });
}

test("GHSA-35fw: the already-gated cli-tools siblings stay LOCAL_ONLY", () => {
  // Guards against a refactor dropping the precedent these entries follow.
  assert.equal(isLocalOnlyPath("/api/cli-tools/omp-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/letta-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/grok-build-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/forge-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/jcode-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/qwen-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/runtime/claude"), true);
});

test("GHSA-35fw: non-spawning cli-tools routes are NOT over-gated (no blanket prefix)", () => {
  // These are legitimate remote-dashboard routes: file/config reads and writes
  // with no child-process reach. A blanket "/api/cli-tools/" prefix would break
  // every tunnel-served dashboard, so the fix is 14 exact entries, not one.
  assert.equal(isLocalOnlyPath("/api/cli-tools/apply"), false);
  assert.equal(isLocalOnlyPath("/api/cli-tools/backups"), false);
  assert.equal(isLocalOnlyPath("/api/cli-tools/config"), false);
  assert.equal(isLocalOnlyPath("/api/cli-tools/guide-settings/claude"), false);
  assert.equal(isLocalOnlyPath("/api/cli-tools/hermes-agent-settings"), false);
  assert.equal(isLocalOnlyPath("/api/cli-tools/keys"), false);
  assert.equal(isLocalOnlyPath("/api/cli-tools/logs"), false);
  // "/api/cli-tools/openclaw-settings" must not swallow the sibling
  // "/api/cli-tools/openclaw/auto-order" (different segment, no spawn).
  assert.equal(isLocalOnlyPath("/api/cli-tools/openclaw/auto-order"), false);
});
