/**
 * Issue #8353 — Missing OpenCode Go reasoning variants.
 *
 * These tests cover:
 *  1. Static registry metadata for aliases that have not migrated to derived variants
 *  2. parseEffortLevel → base + effort for every listed alias
 *  3. transformRequest rewrite + reasoning_effort injection
 *  4. MiniMax M3 stays out of the effort-alias path
 */

import test from "node:test";
import assert from "node:assert/strict";

const { parseEffortLevel, OpencodeExecutor } =
  (await import("../../../open-sse/executors/opencode.ts")) as {
    parseEffortLevel: (model: string) => { baseModel: string; effort: string } | null;
    OpencodeExecutor: new (provider: string) => {
      transformRequest: (
        model: string,
        body: Record<string, unknown>,
        stream: boolean,
        credentials: unknown
      ) => Record<string, unknown>;
    };
  };

const { REGISTRY } = (await import("../../../open-sse/config/providerRegistry.ts")) as {
  REGISTRY: Record<
    string,
    {
      models?: Array<{
        id: string;
        name?: string;
        targetFormat?: string;
        supportsReasoning?: boolean;
        supportedThinkingEfforts?: string[];
      }>;
    }
  >;
};

/** Exact alias set from #8353, plus the newly declared DeepSeek tiers. */
const ISSUE_ALIASES: ReadonlyArray<{ alias: string; base: string; effort: string }> = [
  { alias: "deepseek-v4-flash-none", base: "deepseek-v4-flash", effort: "none" },
  { alias: "deepseek-v4-flash-low", base: "deepseek-v4-flash", effort: "low" },
  { alias: "deepseek-v4-flash-high", base: "deepseek-v4-flash", effort: "high" },
  { alias: "deepseek-v4-flash-max", base: "deepseek-v4-flash", effort: "max" },
  { alias: "grok-4.5-low", base: "grok-4.5", effort: "low" },
  { alias: "grok-4.5-medium", base: "grok-4.5", effort: "medium" },
  { alias: "grok-4.5-high", base: "grok-4.5", effort: "high" },
  { alias: "hy3-none", base: "hy3", effort: "none" },
  { alias: "hy3-low", base: "hy3", effort: "low" },
  { alias: "hy3-high", base: "hy3", effort: "high" },
  { alias: "kimi-k3-max", base: "kimi-k3", effort: "max" },
  { alias: "qwen3.6-plus-high", base: "qwen3.6-plus", effort: "high" },
  { alias: "qwen3.6-plus-max", base: "qwen3.6-plus", effort: "max" },
  { alias: "qwen3.7-max-high", base: "qwen3.7-max", effort: "high" },
  { alias: "qwen3.7-max-max", base: "qwen3.7-max", effort: "max" },
  { alias: "qwen3.7-plus-high", base: "qwen3.7-plus", effort: "high" },
  { alias: "qwen3.7-plus-max", base: "qwen3.7-plus", effort: "max" },
  {
    alias: "muse-spark-1.2-contributor-minimal",
    base: "muse-spark-1.2-contributor",
    effort: "minimal",
  },
  {
    alias: "muse-spark-1.2-contributor-low",
    base: "muse-spark-1.2-contributor",
    effort: "low",
  },
  {
    alias: "muse-spark-1.2-contributor-medium",
    base: "muse-spark-1.2-contributor",
    effort: "medium",
  },
  {
    alias: "muse-spark-1.2-contributor-high",
    base: "muse-spark-1.2-contributor",
    effort: "high",
  },
  {
    alias: "muse-spark-1.2-contributor-xhigh",
    base: "muse-spark-1.2-contributor",
    effort: "xhigh",
  },
];

const NEW_BASES = [
  "grok-4.5",
  "hy3",
  "kimi-k3",
  "qwen3.7-plus",
  "muse-spark-1.2-contributor",
] as const;

function goModelIds(): string[] {
  const entry = REGISTRY["opencode-go"];
  assert.ok(entry, "opencode-go registry entry must exist");
  return (entry.models ?? []).map((m) => m.id);
}

function zenModelIds(): string[] {
  const entry = REGISTRY["opencode-zen"];
  assert.ok(entry, "opencode-zen registry entry must exist");
  return (entry.models ?? []).map((m) => m.id);
}

// ─── Catalog exposure ──────────────────────────────────────────────────────

test("#8353 catalog: DeepSeek aliases are derived instead of registered as duplicate rows", () => {
  const ids = new Set(goModelIds());
  for (const { alias, base } of ISSUE_ALIASES) {
    assert.equal(ids.has(alias), base !== "deepseek-v4-flash", alias);
  }
});

test("#8353 catalog: new base models are registered on opencode-go", () => {
  const ids = new Set(goModelIds());
  for (const base of NEW_BASES) {
    assert.ok(ids.has(base), `opencode-go must expose base model ${base}`);
  }
});

test("#8353 catalog: hy3 base is distinct from hy3-preview", () => {
  const ids = new Set(goModelIds());
  assert.ok(ids.has("hy3"), "hy3 Go-tier base must exist");
  assert.ok(ids.has("hy3-preview"), "hy3-preview must remain");
  assert.equal(
    parseEffortLevel("hy3-preview"),
    null,
    "hy3-preview must not parse as an effort alias"
  );
});

test("#8353 catalog: aliases are NOT synthesized on opencode-zen", () => {
  const zenIds = new Set(zenModelIds());
  for (const { alias } of ISSUE_ALIASES) {
    assert.equal(zenIds.has(alias), false, `opencode-zen must not expose ${alias}`);
  }
  // kimi-k3 became a live zen model in the 2026-08-17 registry sync (present in
  // https://opencode.ai/zen/v1/models) — only the remaining Go-tier-only bases
  // must stay absent from zen. The effort alias kimi-k3-max is still Go-only
  for (const base of NEW_BASES) {
    if (base === "kimi-k3") continue;
    assert.equal(zenIds.has(base), false, `opencode-zen must not expose base ${base}`);
  }
});
test("#8353 catalog: qwen effort aliases keep Claude targetFormat", () => {
  const models = REGISTRY["opencode-go"]?.models ?? [];
  for (const id of [
    "qwen3.6-plus-high",
    "qwen3.6-plus-max",
    "qwen3.7-max-high",
    "qwen3.7-max-max",
    "qwen3.7-plus-high",
    "qwen3.7-plus-max",
  ]) {
    const entry = models.find((m) => m.id === id);
    assert.ok(entry, `${id} must exist`);
    assert.equal(entry.targetFormat, "claude", `${id} must keep targetFormat: claude`);
  }
});

// ─── parseEffortLevel ──────────────────────────────────────────────────────

for (const { alias, base, effort } of ISSUE_ALIASES) {
  test(`#8353 parseEffortLevel: ${alias} → ${effort}`, () => {
    assert.deepEqual(parseEffortLevel(alias), { baseModel: base, effort });
  });
}

test("#8353 parseEffortLevel: unsupported tiers stay null", () => {
  assert.equal(parseEffortLevel("deepseek-v4-flash-medium"), null);
  assert.equal(parseEffortLevel("grok-4.5-max"), null);
  assert.equal(parseEffortLevel("hy3-max"), null);
  assert.equal(parseEffortLevel("kimi-k3-high"), null);
  assert.equal(parseEffortLevel("qwen3.6-plus-low"), null);
  assert.equal(parseEffortLevel("muse-spark-1.2-contributor-max"), null);
});

test("#8353 parseEffortLevel: existing DeepSeek V4 Pro / GLM / MiMo aliases still work", () => {
  assert.deepEqual(parseEffortLevel("deepseek-v4-pro-max"), {
    baseModel: "deepseek-v4-pro",
    effort: "max",
  });
  assert.deepEqual(parseEffortLevel("glm-5.2-high"), { baseModel: "glm-5.2", effort: "high" });
  assert.deepEqual(parseEffortLevel("mimo-v2.5-max"), { baseModel: "mimo-v2.5", effort: "max" });
});

test("#8353 parseEffortLevel: MiniMax M3 has no effort-tier aliases", () => {
  assert.equal(parseEffortLevel("minimax-m3-thinking"), null);
  assert.equal(parseEffortLevel("minimax-m3-none"), null);
  assert.equal(parseEffortLevel("minimax-m3-high"), null);
});

// ─── transformRequest rewrite ──────────────────────────────────────────────

const CREDENTIALS = { apiKey: "k" } as Record<string, unknown>;

// #10788: DeepSeek V4 keeps the base-rewrite + reasoning_effort injection (the
// opencode-go DeepSeek contract accepts the flat field); every other family
// must receive the effort-suffixed alias VERBATIM, because the suffix is their
// only native effort mechanism and opencode-go has no flat reasoning_effort.
const TRANSFORM_SAMPLES = [
  {
    alias: "deepseek-v4-flash-low",
    wireModel: "deepseek-v4-flash",
    effort: "low" as const,
    note: "DeepSeek rewrites to base + reasoning_effort (#4647)",
  },
  { alias: "grok-4.5-medium", wireModel: "grok-4.5-medium", effort: null },
  { alias: "hy3-none", wireModel: "hy3-none", effort: null },
  { alias: "kimi-k3-max", wireModel: "kimi-k3-max", effort: null },
  { alias: "qwen3.7-plus-max", wireModel: "qwen3.7-plus-max", effort: null },
  { alias: "qwen3.7-max-high", wireModel: "qwen3.7-max-high", effort: null },
  {
    alias: "muse-spark-1.2-contributor-xhigh",
    wireModel: "muse-spark-1.2-contributor-xhigh",
    effort: null,
  },
] as const;

for (const { alias, wireModel, effort, note } of TRANSFORM_SAMPLES) {
  test(`#8353/#10788 transformRequest: ${alias} → model=${wireModel}`, () => {
    const executor = new OpencodeExecutor("opencode-go");
    const body = { model: alias, messages: [{ role: "user", content: "hi" }] };

    const out = executor.transformRequest(alias, body, true, CREDENTIALS);

    assert.equal(out.model, wireModel);
    if (effort === null) {
      assert.equal(
        out.reasoning_effort,
        undefined,
        "non-DeepSeek families must not receive a flat reasoning_effort field"
      );
    } else {
      assert.equal(out.reasoning_effort, effort, note);
    }
  });
}

test("#8353 transformRequest: does not clobber an already-set reasoning_effort", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const body = {
    model: "deepseek-v4-flash-max",
    reasoning_effort: "caller-supplied",
    messages: [{ role: "user", content: "hi" }],
  };

  const out = executor.transformRequest("deepseek-v4-flash-max", body, true, CREDENTIALS);

  assert.equal(out.model, "deepseek-v4-flash");
  assert.equal(out.reasoning_effort, "caller-supplied");
});

// ─── #10788: base-model tier declarations match the executor vocabulary ────

test("#10788 registry base rows declare the same tiers EFFORT_TIERS parses", () => {
  const expectedTiers: Record<string, string[]> = {
    "glm-5.2": ["high", "max"],
    "mimo-v2.5": ["high", "max"],
    "grok-4.5": ["low", "medium", "high"],
    hy3: ["none", "low", "high"],
    "kimi-k3": ["max"],
    "qwen3.6-plus": ["high", "max"],
    "qwen3.7-max": ["high", "max"],
    "qwen3.7-plus": ["high", "max"],
  };
  for (const providerId of ["opencode-go", "opencode-zen"]) {
    const entry = REGISTRY[providerId];
    assert.ok(entry?.models, `${providerId} must expose models`);
    for (const [base, tiers] of Object.entries(expectedTiers)) {
      if (providerId === "opencode-zen" && !entry.models.some((m) => m.id === base)) continue;
      const row = entry.models.find((m) => m.id === base);
      assert.ok(row, `${providerId} must declare base model ${base}`);
      assert.ok(row.supportsReasoning, `${providerId}/${base} must be reasoning-capable`);
      assert.deepEqual(
        [...(row.supportedThinkingEfforts ?? [])].sort(),
        [...tiers].sort(),
        `${providerId}/${base} tier vocabulary must match EFFORT_TIERS`
      );
    }
  }
});
