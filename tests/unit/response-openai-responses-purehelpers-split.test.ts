import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the response/openai-responses pure-helper extraction.
// The stateless helpers (normalizeToolName / stripEmptyOptionalToolArgs /
// normalizeOutputIndex / normalizeUpstreamFailure / extractResponsesReasoningSummaryText)
// live in the pure leaf `openai-responses/pureHelpers.ts` (no stream state, no host import).
// The host imports them back and re-exports normalizeUpstreamFailure for external importers.
const HERE = dirname(fileURLToPath(import.meta.url));
const RESP = join(HERE, "../../open-sse/translator/response");
const HOST = join(RESP, "openai-responses.ts");
const LEAF = join(RESP, "openai-responses/pureHelpers.ts");

test("leaf hosts the pure helpers, has no stream state and no host import", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of [
    "normalizeToolName",
    "stripEmptyOptionalToolArgs",
    "normalizeOutputIndex",
    "normalizeUpstreamFailure",
    "extractResponsesReasoningSummaryText",
  ]) {
    assert.match(src, new RegExp(`export function ${sym}\\b`));
  }
  assert.doesNotMatch(src, /from "\.\.\/openai-responses\.ts"/);
  // No stream-state parameter leaked into the pure leaf (ignore comments).
  const code = src
    .split("\n")
    .filter((l) => !l.trim().startsWith("//"))
    .join("\n");
  assert.doesNotMatch(code, /\bstate\b/);
});

test("host imports helpers back and re-exports normalizeUpstreamFailure", () => {
  const src = readFileSync(HOST, "utf8");
  assert.match(src, /from "\.\/openai-responses\/pureHelpers\.ts"/);
  assert.match(
    src,
    /export \{ normalizeUpstreamFailure \} from "\.\/openai-responses\/pureHelpers\.ts"/
  );
});

test("normalizeUpstreamFailure preserves upstream error semantics", async () => {
  const { normalizeUpstreamFailure } =
    await import("../../open-sse/translator/response/openai-responses/pureHelpers.ts");
  assert.equal(
    normalizeUpstreamFailure({ error: { code: "rate_limit_exceeded", message: "slow down" } })
      .status,
    429
  );
  assert.equal(
    normalizeUpstreamFailure({ error: { code: "context_length_exceeded", message: "too big" } })
      .status,
    400
  );
  assert.equal(normalizeUpstreamFailure({ message: "boom" }).status, 502);
});
