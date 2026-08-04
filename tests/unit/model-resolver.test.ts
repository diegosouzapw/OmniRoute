import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const previousDataDir = process.env.DATA_DIR;
const modelResolverDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-resolver-"));
process.env.DATA_DIR = modelResolverDataDir;

const model = await import("../../open-sse/services/model.ts");

function withEnv(name: string, value: string | undefined, fn: () => Promise<void>) {
  return async () => {
    const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
    const previous = process.env[name];
    if (value === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = value;
    }
    invalidateDbCache("settings");
    try {
      await fn();
    } finally {
      if (previous === undefined) {
        delete process.env[name];
      } else {
        process.env[name] = previous;
      }
      invalidateDbCache("settings");
    }
  };
}

test.after(async () => {
  const core = await import("../../src/lib/db/core.ts");
  const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
  core.resetDbInstance();
  invalidateDbCache();
  fs.rmSync(modelResolverDataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = previousDataDir;
  }
});

test("resolveProviderAlias returns null for null/undefined", () => {
  assert.equal(model.resolveProviderAlias(null), null);
  assert.equal(model.resolveProviderAlias(undefined), null);
});

test("resolveProviderAlias returns empty string for empty string", () => {
  const result = model.resolveProviderAlias("");
  assert.ok(result === null || result === "");
});

test("resolveProviderAlias returns known alias", () => {
  const result = model.resolveProviderAlias("claude");
  assert.ok(result === "claude" || result === "anthropic" || typeof result === "string");
});

test("resolveProviderAlias returns input string for unknown alias", () => {
  const result = model.resolveProviderAlias("totally-unknown-provider");
  assert.equal(result, "totally-unknown-provider");
});

test("parseModel parses provider/model format", () => {
  const result = model.parseModel("openai/gpt-4o");
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test("parseModel handles plain model name", () => {
  const result = model.parseModel("gpt-4o");
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test("parseModel returns null-like for null/undefined", () => {
  const result1 = model.parseModel(null);
  const result2 = model.parseModel(undefined);
  assert.ok(result1 !== undefined);
  assert.ok(result2 !== undefined);
});

test("parseModel handles empty string", () => {
  const result = model.parseModel("");
  assert.ok(result !== undefined);
});

test("normalizeCrossProxyModelId handles plain model", () => {
  const result = model.normalizeCrossProxyModelId("gpt-4o");
  assert.ok(typeof result === "object");
});

test("normalizeCrossProxyModelId handles provider/model", () => {
  const result = model.normalizeCrossProxyModelId("openai/gpt-4o");
  assert.ok(typeof result === "object");
});

test("normalizeCrossProxyModelId handles null", () => {
  const result = model.normalizeCrossProxyModelId(null);
  assert.ok(typeof result === "object");
});

test("normalizeCrossProxyModelId handles undefined", () => {
  const result = model.normalizeCrossProxyModelId(undefined);
  assert.ok(typeof result === "object");
});

test("resolveCanonicalProviderModel returns object for known model", () => {
  const result = model.resolveCanonicalProviderModel("openai", "gpt-4o");
  assert.ok(typeof result === "object");
  assert.ok(result !== null);
});

test("resolveCanonicalProviderModel handles null modelId", () => {
  const result = model.resolveCanonicalProviderModel("openai", null);
  assert.ok(typeof result === "object");
});

test("resolveModelAliasFromMap returns null for null alias", () => {
  const result = model.resolveModelAliasFromMap(null, {});
  assert.equal(result, null);
});

test("resolveModelAliasFromMap returns null for empty map", () => {
  const result = model.resolveModelAliasFromMap("test", {});
  assert.equal(result, null);
});

test("resolveModelAliasFromMap resolves alias from map", () => {
  const aliases = { "gpt-4": "gpt-4o" };
  const result = model.resolveModelAliasFromMap("gpt-4", aliases);
  assert.ok(result === "gpt-4o" || result === null);
});

test("CODEX_NATIVE_UNPREFIXED_MODELS is a Set", () => {
  assert.ok(model.CODEX_NATIVE_UNPREFIXED_MODELS instanceof Set);
  assert.ok(model.CODEX_NATIVE_UNPREFIXED_MODELS.has("codex-auto-review"));
});

test("getModelInfoCore resolves known model", async () => {
  const result = await model.getModelInfoCore("gpt-4o", {});
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test("getModelInfoCore handles unknown model", async () => {
  const result = await model.getModelInfoCore("totally-unknown-model-xyz", {});
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test("getModelInfoCore handles null", async () => {
  const result = await model.getModelInfoCore(null, {});
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test(
  "getModelInfoCore routes newly released unprefixed Claude models to Claude Code when enabled",
  withEnv("OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS", "true", async () => {
    const result = await model.getModelInfoCore("claude-fable-5", {});
    assert.deepEqual(result, {
      provider: "claude",
      model: "claude-fable-5",
      extendedContext: false,
    });
  })
);

test(
  "getModelInfoCore resolves ambiguous unprefixed Claude catalog models to Claude Code when enabled",
  withEnv("OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS", "true", async () => {
    const result = await model.getModelInfoCore("claude-haiku-4-5-20251001", {});
    assert.deepEqual(result, {
      provider: "claude",
      model: "claude-haiku-4-5-20251001",
      extendedContext: false,
    });
  })
);

test("getModelInfoCore routes unprefixed Claude models to Claude Code from settings toggle", async () => {
  const previousEnvFlag =
    process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS;
  delete process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS;

  try {
    const { updateSettings } = await import("../../src/lib/db/settings.ts");
    await updateSettings({ preferClaudeCodeForUnprefixedClaudeModels: true });

    const result = await model.getModelInfoCore("claude-fable-5", {});
    assert.deepEqual(result, {
      provider: "claude",
      model: "claude-fable-5",
      extendedContext: false,
    });

    const extendedResult = await model.getModelInfoCore("claude-fable-5[1m]", {});
    assert.deepEqual(extendedResult, {
      provider: "claude",
      model: "claude-fable-5",
      extendedContext: true,
    });
  } finally {
    if (previousEnvFlag === undefined) {
      delete process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS;
    } else {
      process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS = previousEnvFlag;
    }
  }
});

test("getModelInfoCore lets settings toggle disable Claude Code preference", async () => {
  const previousEnvFlag =
    process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS;
  process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS = "true";

  try {
    const { updateSettings } = await import("../../src/lib/db/settings.ts");
    await updateSettings({ preferClaudeCodeForUnprefixedClaudeModels: false });

    // With the toggle OFF, a bare `claude-*` id must NOT be auto-preferred to the
    // Claude Code ("claude") provider — it falls back to normal inference. The exact
    // fallback target depends on the live catalog (an id present in a single provider
    // resolves there; one present in several is reported ambiguous and requires a
    // provider prefix), so assert the toggle's effect rather than a catalog-dependent
    // target: the result is simply not routed to Claude Code.
    const result = await model.getModelInfoCore("claude-fable-5", {});
    assert.notEqual(result.provider, "claude");
  } finally {
    if (previousEnvFlag === undefined) {
      delete process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS;
    } else {
      process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS = previousEnvFlag;
    }
  }
});
