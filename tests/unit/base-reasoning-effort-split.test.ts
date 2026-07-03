import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the base executor reasoning-effort extraction.
// The provider-aware reasoning_effort sanitation lives in base/reasoningEffort.ts
// (deps are config/services only — no host import, no cycle). base.ts re-exports it
// so external importers (mimoThinking + tests) keep the "./base.ts" path.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");

test("leaf hosts sanitizeReasoningEffortForProvider and does not import the host", () => {
  const src = readFileSync(join(EXE, "base/reasoningEffort.ts"), "utf8");
  assert.match(src, /export function sanitizeReasoningEffortForProvider\b/);
  assert.doesNotMatch(src, /from "\.\.\/base\.ts"/);
});

test("base.ts re-exports it for external importers", () => {
  const host = readFileSync(join(EXE, "base.ts"), "utf8");
  assert.match(
    host,
    /export \{[^}]*sanitizeReasoningEffortForProvider[^}]*\} from "\.\/base\/reasoningEffort\.ts"/s
  );
});

test("both import paths resolve to the same function", async () => {
  const viaHost = (await import("../../open-sse/executors/base.ts"))
    .sanitizeReasoningEffortForProvider;
  const viaLeaf = (await import("../../open-sse/executors/base/reasoningEffort.ts"))
    .sanitizeReasoningEffortForProvider;
  assert.equal(viaHost, viaLeaf);
});
