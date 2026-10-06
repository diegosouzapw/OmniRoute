import assert from "node:assert/strict";
import test from "node:test";

import {
  parseEffortLevel,
  resolveOpencodeTargetFormat,
} from "../../open-sse/executors/opencode.ts";

const { REGISTRY } = (await import("../../open-sse/config/providerRegistry.ts")) as {
  REGISTRY: Record<
    string,
    {
      models?: Array<{
        id: string;
        targetFormat?: string;
        supportsReasoning?: boolean;
        contextLength?: number;
        maxOutputTokens?: number;
      }>;
    }
  >;
};

// #12674: opencode-go/muse-spark-1.3-contributor (upstream release 2026-09-02)
// 500s via /v1/chat/completions because the upstream serves Muse Spark only on
// the Responses API and the model had no registry targetFormat entry, so the
// executor fell back to "openai". Base + effort-tier alias set verified via
// `opencode models opencode-go --refresh --verbose` (minimal/low/medium/high/
// xhigh, no max — same as 1.2).
const BASE = "muse-spark-1.3-contributor";
const ALIASES = ["minimal", "low", "medium", "high", "xhigh"].map((effort) => ({
  alias: `${BASE}-${effort}`,
  effort,
}));

function goModels() {
  const entry = REGISTRY["opencode-go"];
  assert.ok(entry, "opencode-go registry entry must exist");
  return entry.models ?? [];
}

test("#12674 registry: 1.3 base + effort aliases target the Responses API", () => {
  const models = goModels();
  for (const id of [BASE, ...ALIASES.map((a) => a.alias)]) {
    const model = models.find((m) => m.id === id);
    assert.ok(model, `${id} must be registered on opencode-go`);
    assert.equal(model?.targetFormat, "openai-responses", `${id} must target Responses`);
    assert.equal(model?.supportsReasoning, true, `${id} must support reasoning`);
    assert.equal(model?.contextLength, 1048576, `${id} context must be 1M`);
    assert.equal(model?.maxOutputTokens, 131072, `${id} max output must be 128K`);
  }
});

test("#12674 executor: 1.3 resolves to openai-responses (URL selection)", () => {
  assert.equal(resolveOpencodeTargetFormat("opencode-go", BASE), "openai-responses");
  assert.equal(resolveOpencodeTargetFormat("opencode-go", `${BASE}-high`), "openai-responses");
});

for (const { alias, effort } of ALIASES) {
  test(`#12674 parseEffortLevel: ${alias} → ${effort}`, () => {
    assert.deepEqual(parseEffortLevel(alias), { baseModel: BASE, effort });
  });
}

test("#12674 parseEffortLevel: 1.3 has no max tier", () => {
  assert.equal(parseEffortLevel(`${BASE}-max`), null);
});

test("#12674 catalog: 1.3 aliases stay Go-only (not on opencode-zen)", () => {
  const zenIds = new Set((REGISTRY["opencode-zen"]?.models ?? []).map((m) => m.id));
  assert.equal(zenIds.has(BASE), false, "opencode-zen must not expose 1.3 base");
  for (const { alias } of ALIASES) {
    assert.equal(zenIds.has(alias), false, `opencode-zen must not expose ${alias}`);
  }
});
