import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const GATE = join(ROOT, "scripts", "check", "check-openapi-security-tiers.mjs");

function runGate(): { code: number; out: string } {
  try {
    const out = execFileSync(process.execPath, [GATE], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { code: 0, out };
  } catch (err) {
    const e = err as { status?: number; stdout?: string; stderr?: string };
    return { code: e.status ?? 1, out: `${e.stdout ?? ""}${e.stderr ?? ""}` };
  }
}

// routeGuard protects a path when EITHER list matches — `isAlwaysProtectedPath`
// ORs ALWAYS_PROTECTED_API_PATHS with ALWAYS_PROTECTED_API_PATTERNS. The gate
// used to read only the prefix array, so every regex-covered route was reported
// as an annotation mismatch: the four `{claude,codex}-auth/{export,apply-local}`
// routes turned release/v3.8.51 red while being correctly protected at runtime.
// Same defect class the LOCAL_ONLY arm already had (#12350).
test("openapi-security-tiers accepts routes covered only by ALWAYS_PROTECTED_API_PATTERNS", () => {
  const { code, out } = runGate();

  assert.ok(
    !/has x-always-protected but is NOT/.test(out),
    `gate reported an always-protected route as uncovered:\n${out}`
  );
  assert.equal(code, 0, `gate must pass on a clean tree, got exit ${code}:\n${out}`);
});
