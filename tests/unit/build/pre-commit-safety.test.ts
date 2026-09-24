import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const hook = readFileSync(new URL("../../../.husky/pre-commit", import.meta.url), "utf8");

function runHook(extra: Record<string, string> = {}) {
  // Execute the checked-in hook. Only the external tools are fixtures; no real
  // stash, index mutation or dependency installation is permitted by the probe.
  const tools = `
command() { if [ "$1 $2" = "-v npx" ] && [ "$MOCK_NPX_MISSING" = "1" ]; then return 1; fi; builtin command "$@"; }
npx() { printf 'NPX:%s\\n' "$*"; return "$MOCK_LINT_EXIT"; }
node() { printf 'NODE:%s\\n' "$*"; }
npm() { printf 'NPM:%s\\n' "$*"; }
sh() { printf 'SH:%s\\n' "$*"; }
`;
  return spawnSync("bash", ["-c", `${tools}\n${hook}`], {
    encoding: "utf8",
    env: { ...process.env, MOCK_NPX_MISSING: "0", MOCK_LINT_EXIT: "0", ...extra },
  });
}

test("hook never stashes and never downloads a missing lint-staged", () => {
  const result = runHook();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /NPX:--no-install lint-staged --no-stash/);
  assert.match(result.stdout, /NODE:scripts\/check\/check-tracked-artifacts.mjs/);
});

test("missing npx blocks the commit instead of silently skipping all checks", () => {
  const result = runHook({ MOCK_NPX_MISSING: "1" });
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.stdout, /NODE:|NPM:/);
});

test("failed lint-staged preserves its exit even when the hook is executed directly", () => {
  const result = runHook({ MOCK_LINT_EXIT: "42" });
  assert.equal(result.status, 42);
  assert.doesNotMatch(result.stdout, /NODE:|NPM:/);
});
