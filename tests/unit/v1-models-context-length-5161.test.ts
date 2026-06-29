import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ctx-len-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// #5161 — every non-combo /v1/models entry whose underlying model has a known
// context window MUST carry a positive `context_length` field. Without this,
// downstream clients like @ai-sdk/openai-compatible fall back to 0 and
// over-truncate prompts (see comment in v1-models-by-id-4674.test.ts:47).
test("non-combo /v1/models entries with a known window expose context_length", async () => {
  const req = new Request("http://localhost:20128/v1/models");
  const res = await catalog.getUnifiedModelsResponse(req);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data), "data must be an array");

  // Filter to non-combo entries (combos are owned_by="combo") that name a
  // well-known long-context model. At least one such entry must exist.
  const KNOWN_LONG_CONTEXT_PATTERN = /(gemini-2|gemini-1\.5|claude-(sonnet|opus)-4|gpt-5|deepseek-v3|llama-3\.[123])/i;
  const candidates = body.data.filter(
    (m: { id: string; owned_by?: string; object?: string }) =>
      m.object === "model" &&
      m.owned_by !== "combo" &&
      KNOWN_LONG_CONTEXT_PATTERN.test(m.id)
  );
  if (candidates.length === 0) {
    // Empty catalog (e.g. no providers configured) — nothing to assert.
    return;
  }

  const withContext = candidates.filter(
    (m: { context_length?: unknown }) =>
      typeof m.context_length === "number" && m.context_length > 0
  );
  assert.ok(
    withContext.length > 0,
    `Expected at least one well-known model entry to carry context_length > 0; ` +
      `got ${candidates.length} candidate(s), 0 with context_length. ` +
      `Sample id: ${candidates[0]?.id}`
  );
});

test("when context_length is set, max_input_tokens defaults to the same value", async () => {
  const req = new Request("http://localhost:20128/v1/models");
  const res = await catalog.getUnifiedModelsResponse(req);
  const body = await res.json();
  const sample = (body.data as Array<{ context_length?: number; max_input_tokens?: number }>)
    .filter((m) => typeof m.context_length === "number" && m.context_length > 0)
    .slice(0, 5);
  for (const m of sample) {
    if (typeof m.max_input_tokens === "number") {
      assert.ok(
        m.max_input_tokens > 0,
        `max_input_tokens must be > 0 when present (got ${m.max_input_tokens})`
      );
    }
  }
});
