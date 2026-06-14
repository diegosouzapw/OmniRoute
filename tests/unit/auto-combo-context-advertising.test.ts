/**
 * TDD regression tests — auto-combo context-window advertising + per-target
 * combo compression limit (the "premature auto compaction" bug).
 *
 * Bug chain (discussion report: coding agents "keep forgetting things"):
 *  1. /api/combos/auto never exposed context_length, so the opencode plugin
 *     advertised `limit: { context: 0 }` for auto combos. opencode disables
 *     its smart auto-compaction entirely when context === 0, letting the
 *     conversation grow until OmniRoute's destructive purifyHistory() drops
 *     old messages silently.
 *  2. chatCore's proactive-compression block overrode the per-target context
 *     limit with min(...allComboTargets) even though chatCore always executes
 *     with the CONCRETE target's provider/model (handleSingleModel resolves
 *     the target before calling chatCore) — compressing at the smallest
 *     target's window while running on the largest target.
 *
 * Fixes under test:
 *  - virtualFactory.computeAdvertisedLimits(): MAX of candidates' known
 *    context windows (the auto-combo context pre-filter routes oversized
 *    requests to large-window candidates, so MAX is safe to advertise).
 *  - GET /api/combos/auto includes context_length / max_output_tokens.
 *  - contextManager.resolveComboContextLimit(): prefers the executing
 *    target's own limit; min(...targets) only as a defensive fallback when
 *    the current provider/model resolves no specific limit.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-combo-ctx-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "auto-combo-ctx-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const contextManager = await import("../../open-sse/services/contextManager.ts");
const combosAutoRoute = await import("../../src/app/api/combos/auto/route.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

// ── virtualFactory.computeAdvertisedLimits ───────────────────────────────────

test("computeAdvertisedLimits returns MAX of candidates' known context windows", () => {
  const { computeAdvertisedLimits } = virtualFactory as unknown as {
    computeAdvertisedLimits: (candidates: Array<{ provider: string; model: string }>) => {
      contextLength: number | null;
      maxOutputTokens: number | null;
    };
  };
  assert.equal(
    typeof computeAdvertisedLimits,
    "function",
    "virtualFactory should export computeAdvertisedLimits()"
  );

  // gemini has registry defaultContextLength=1048576; claude has 200000.
  const result = computeAdvertisedLimits([
    { provider: "claude", model: "claude-sonnet-4-6" },
    { provider: "gemini", model: "gemini-2.5-pro" },
  ]);
  assert.equal(result.contextLength, 1048576, "MAX of candidate windows should win");
  assert.ok(
    typeof result.maxOutputTokens === "number" && result.maxOutputTokens > 0,
    "maxOutputTokens should be a positive number"
  );
});

test("computeAdvertisedLimits returns null limits for an empty candidate pool", () => {
  const { computeAdvertisedLimits } = virtualFactory as unknown as {
    computeAdvertisedLimits: (candidates: Array<{ provider: string; model: string }>) => {
      contextLength: number | null;
      maxOutputTokens: number | null;
    };
  };
  const result = computeAdvertisedLimits([]);
  assert.equal(result.contextLength, null);
  assert.equal(result.maxOutputTokens, null);
});

test("computeAdvertisedLimits never returns 0 for a non-empty pool (unknown models fall back)", () => {
  const { computeAdvertisedLimits } = virtualFactory as unknown as {
    computeAdvertisedLimits: (candidates: Array<{ provider: string; model: string }>) => {
      contextLength: number | null;
      maxOutputTokens: number | null;
    };
  };
  const result = computeAdvertisedLimits([
    { provider: "totally-unknown-provider", model: "mystery-model" },
  ]);
  assert.ok(
    typeof result.contextLength === "number" && result.contextLength > 0,
    `unknown candidates should fall back to a positive default, got ${result.contextLength}`
  );
});

// ── GET /api/combos/auto advertises context_length ──────────────────────────

test("GET /api/combos/auto includes positive context_length for combos with candidates", async () => {
  await settingsDb.updateSettings({ requireLogin: false });

  const req = new Request("http://localhost/api/combos/auto", { method: "GET" });
  const res = await combosAutoRoute.GET(req as never);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.ok(Array.isArray(body.combos), "body.combos should be an array");
  assert.ok(body.combos.length > 0, "should list at least the default auto combo");

  for (const combo of body.combos) {
    if ((combo.candidateCount ?? 0) > 0) {
      assert.ok(
        typeof combo.context_length === "number" && combo.context_length > 0,
        `combo ${combo.id} with ${combo.candidateCount} candidates must advertise a positive context_length, got ${combo.context_length}`
      );
      assert.ok(
        typeof combo.max_output_tokens === "number" && combo.max_output_tokens > 0,
        `combo ${combo.id} must advertise a positive max_output_tokens, got ${combo.max_output_tokens}`
      );
    }
  }
});

// ── contextManager.resolveComboContextLimit (per-target compression limit) ──

test("resolveComboContextLimit prefers the executing target's own limit over combo min", () => {
  const { resolveComboContextLimit } = contextManager as unknown as {
    resolveComboContextLimit: (opts: {
      provider: string;
      model: string | null;
      comboTargetLimits: number[];
    }) => { limit: number; source: string };
  };
  assert.equal(
    typeof resolveComboContextLimit,
    "function",
    "contextManager should export resolveComboContextLimit()"
  );

  // Executing on gemini (1048576 provider default) while the combo also has
  // a tiny 32k target: compression must use the EXECUTING target's window.
  const result = resolveComboContextLimit({
    provider: "gemini",
    model: "gemini-2.5-pro",
    comboTargetLimits: [32000, 1048576],
  });
  assert.equal(result.limit, 1048576, "must not regress to min(...targets) on a known target");
  assert.equal(result.source, "target");
});

test("resolveComboContextLimit regression: claude target must not be compressed at an 8k sibling", () => {
  const { resolveComboContextLimit } = contextManager as unknown as {
    resolveComboContextLimit: (opts: {
      provider: string;
      model: string | null;
      comboTargetLimits: number[];
    }) => { limit: number; source: string };
  };
  const result = resolveComboContextLimit({
    provider: "claude",
    model: "claude-sonnet-4-6",
    comboTargetLimits: [8000],
  });
  assert.equal(result.limit, 200000);
  assert.equal(result.source, "target");
});

test("resolveComboContextLimit falls back to combo min when the target has no specific limit", () => {
  const { resolveComboContextLimit } = contextManager as unknown as {
    resolveComboContextLimit: (opts: {
      provider: string;
      model: string | null;
      comboTargetLimits: number[];
    }) => { limit: number; source: string };
  };
  const result = resolveComboContextLimit({
    provider: "totally-unknown-provider",
    model: "mystery-model",
    comboTargetLimits: [32000, 200000],
  });
  assert.equal(result.limit, 32000, "unknown target should defensively use min of combo targets");
  assert.equal(result.source, "combo-min");
});

test("resolveComboContextLimit uses generic fallback when nothing else is known", () => {
  const { resolveComboContextLimit } = contextManager as unknown as {
    resolveComboContextLimit: (opts: {
      provider: string;
      model: string | null;
      comboTargetLimits: number[];
    }) => { limit: number; source: string };
  };
  const result = resolveComboContextLimit({
    provider: "totally-unknown-provider",
    model: "mystery-model",
    comboTargetLimits: [],
  });
  assert.equal(result.limit, 128000, "generic default fallback");
  assert.equal(result.source, "fallback");
});
