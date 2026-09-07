import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  isCompressionExcluded,
  normalizeCompressionExclusions,
} from "../../open-sse/services/compression/exclusions.ts";

const chatCoreSource = readFileSync(
  new URL("../../open-sse/handlers/chatCore.ts", import.meta.url),
  "utf8"
);

// Regression guard for https://github.com/diegosouzapw/OmniRoute/issues/12793:
// native Codex passthrough (`POST /v1/responses`, provider `codex`) silently stopped
// producing compression analytics (100% `skip_reason='excluded'`) after #8933 added
// `nativeCodexPassthrough ||` to the prompt-compression exclusion (landed on release
// via #11088). Prompt compression must depend ONLY on the operator exclusions list.

test("codex prompt compression is not gated on native passthrough", () => {
  const match = chatCoreSource.match(/const compressionExcluded =([\s\S]*?);/);
  assert.ok(match, "compressionExcluded assignment must exist in chatCore.ts");
  assert.doesNotMatch(
    match[1],
    /nativeCodexPassthrough/,
    "prompt-compression exclusion must not reference nativeCodexPassthrough"
  );
  assert.match(match[1], /isCompressionExcluded/);
});

test("codex target is compressible by default; operators can still opt out via exclusions", () => {
  assert.equal(
    isCompressionExcluded(
      { provider: "codex", model: "gpt-5.6-terra" },
      normalizeCompressionExclusions([])
    ),
    false
  );
  assert.equal(
    isCompressionExcluded(
      { provider: "codex", model: "gpt-5.6-terra" },
      normalizeCompressionExclusions(["codex/*"])
    ),
    true
  );
});

test("prompt-only scope: reactive compaction still bypasses native passthrough", () => {
  // Deliberately left for follow-up (overflow fail-fast + history-rewriting safety).
  // If these gates are ever lifted, update the PR body notes, not just this test.
  assert.match(
    chatCoreSource,
    /reactiveContextCompactionEnabled\s*&&\s*!nativeCodexPassthrough\s*&&\s*estimatedTokens\s*>\s*threshold/
  );
  assert.match(
    chatCoreSource,
    /reactiveContextCompactionEnabled\s*&&\s*!nativeCodexPassthrough\s*&&\s*finalEstimatedInputTokens\s*>=\s*finalContextLimit/
  );
});
