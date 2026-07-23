/**
 * Guard for the legacy OAuth service-class removal (salvage of the closed PR #5039,
 * "Remove legacy OAuth service classes"; gaps v3.8.42 — T10 / Onda 5 item 5.7).
 *
 * The `src/lib/oauth/services/` folder is a superseded surface: the live OAuth flow runs
 * through `src/lib/oauth/providers.ts` + `src/lib/oauth/providers/` (wired into the generic
 * `src/app/api/oauth/[provider]/[action]/route.ts`). The old per-provider service-class
 * hierarchy (`class *Service extends OAuthService`) plus its barrel had ZERO production or
 * test references and were removed. Only three files survive because routes still import them
 * directly by path (never via the deleted barrel):
 *   - `kiro.ts`      → src/app/api/oauth/kiro/{import,auto-import,social-exchange}/route.ts
 *   - `cursor.ts`    → src/app/api/oauth/cursor/import/route.ts
 *   - `codexImport.ts` (utility fns, not a service class) → src/app/api/oauth/codex/import/route.ts
 *
 * This guard pins the removal so the dead classes are not re-introduced, and asserts the
 * live files remain. Real safety net is that typecheck/build/tests stay green: had any deleted
 * class been referenced, `typecheck:core` would fail.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SERVICES = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../src/lib/oauth/services"
);

const REMOVED_DEAD = [
  "oauth", // base class OAuthService
  "openai", // OpenAIService extends OAuthService
  "github", // GitHubService extends OAuthService
  "claude", // ClaudeService extends OAuthService
  "codex", // CodexService extends OAuthService
  "antigravity", // AntigravityService
  "qwen", // QwenService
  "qoder", // QoderService
  "index", // the barrel re-exporting all of the above
];

const KEPT_LIVE = ["kiro", "cursor", "codexImport"];

test("legacy OAuth service-class files stay removed (dead code — PR #5039)", () => {
  for (const f of REMOVED_DEAD) {
    assert.equal(
      fs.existsSync(path.join(SERVICES, `${f}.ts`)),
      false,
      `src/lib/oauth/services/${f}.ts is dead legacy code (0 refs) and must not be re-added`
    );
  }
});

test("live OAuth service files remain (imported directly by routes)", () => {
  for (const f of KEPT_LIVE) {
    assert.equal(
      fs.existsSync(path.join(SERVICES, `${f}.ts`)),
      true,
      `src/lib/oauth/services/${f}.ts is still imported by routes and must remain`
    );
  }
});
