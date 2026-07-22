import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, "..", "..");

const sanitizer = readFileSync(join(repoRoot, "src/shared/utils/inputSanitizer.ts"), "utf-8");
const injection = readFileSync(join(repoRoot, "src/lib/guardrails/promptInjection.ts"), "utf-8");
const flags = readFileSync(join(repoRoot, "src/shared/constants/featureFlagDefinitions.ts"), "utf-8");

test("#8093: inputSanitizer uses opt-in (=== \"true\") not opt-out (!== \"false\")", () => {
  assert.match(
    sanitizer,
    /enabled:\s*process\.env\.INPUT_SANITIZER_ENABLED\s*===\s*"true"/,
    "inputSanitizer must use === \"true\" for opt-in default OFF"
  );
  assert.doesNotMatch(
    sanitizer,
    /INPUT_SANITIZER_ENABLED.*!==\s*"false"/,
    "must NOT use !== \"false\" pattern anymore"
  );
});

test("#8093: promptInjectionGuard uses opt-in (=== \"true\")", () => {
  assert.match(
    injection,
    /INPUT_SANITIZER_ENABLED\s*===\s*"true"/,
    "promptInjection guard must use === \"true\""
  );
  assert.doesNotMatch(
    injection,
    /INPUT_SANITIZER_ENABLED.*!==\s*"false"/,
    "must NOT use !== \"false\" pattern anymore"
  );
});

test("#8093: featureFlagDefinitions defaultValue is false", () => {
  // Extract the INPUT_SANITIZER_ENABLED block and check defaultValue
  const block = flags.match(/key:\s*"INPUT_SANITIZER_ENABLED"[\s\S]*?defaultValue:\s*"(\w+)"/);
  assert.ok(block, "INPUT_SANITIZER_ENABLED flag definition must exist");
  assert.equal(block![1], "false", "defaultValue must be \"false\" (opt-in)");
});
