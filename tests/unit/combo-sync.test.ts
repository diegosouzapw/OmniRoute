import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const DB_PATH = "/Users/chewji/.omniroute/storage.sqlite";
const OPENCODE_PATH = "/Users/chewji/.config/opencode/opencode.jsonc";
const AGENT_PATH = "/Users/chewji/.config/opencode/oh-my-openagent.json";

// Model lists
const PRO_MODELS = [
  "antigravity/gemini-3.5-flash-high",
  "antigravity/claude-opus-4-6-thinking",
  "kr/glm-5",
  "opencode-go/glm-5.2",
  "gh/gpt-5.3-codex",
  "cmd/zai-org/GLM-5.2",
  "mistral/mistral-large-latest",
];

const BALANCE_MODELS = [
  "antigravity/gemini-3.5-flash-medium",
  "antigravity/claude-sonnet-4-6",
  "gc/grok-build",
  "kr/claude-sonnet-4.5",
  "opencode-go/minimax-m3",
  "gh/claude-sonnet-4.6",
  "cmd/xiaomi/mimo-v2.5-pro",
  "mistral/mistral-medium-latest",
  "opencode-zen/nemotron-3-ultra-free",
];

const FLASH_MODELS = [
  "antigravity/gemini-3.5-flash-low",
  "antigravity/gpt-oss-120b-medium",
  "kr/claude-haiku-4.5",
  "opencode-go/mimo-v2.5",
  "gh/claude-haiku-4.5",
  "cmd/xiaomi/mimo-v2.5",
  "mistral/mistral-small-latest",
  "opencode-zen/mimo-v2.5-free",
];

const LAST_MODELS = [
  "bzl/auto:free",
  "openrouter/openrouter/free",
  "kc/openrouter/free",
  "kc/kilo-auto/free",
  "mcode/mimo-auto",
];

// Expected combo configurations
const EXPECTED_BALANCE = [...BALANCE_MODELS, ...PRO_MODELS, ...FLASH_MODELS, ...LAST_MODELS];
const EXPECTED_FLASH = [...FLASH_MODELS, ...BALANCE_MODELS, ...PRO_MODELS, ...LAST_MODELS];
const EXPECTED_PRO = [...PRO_MODELS, ...BALANCE_MODELS, ...FLASH_MODELS, ...LAST_MODELS];

const ALL_PROVIDED_MODELS = new Set([
  ...PRO_MODELS,
  ...BALANCE_MODELS,
  ...FLASH_MODELS,
  ...LAST_MODELS,
]);

test("DB Combos check", () => {
  if (!fs.existsSync(DB_PATH)) {
    assert.fail(`DB file not found at ${DB_PATH}`);
  }

  const db = new Database(DB_PATH, { readonly: true });
  const rows = db
    .prepare("SELECT name, data FROM combos WHERE name IN ('balance', 'flash', 'pro')")
    .all() as any[];
  db.close();

  assert.equal(rows.length, 3, "Should have 3 combos in the database");

  const combosByName = new Map(rows.map((row) => [row.name, JSON.parse(row.data)]));

  for (const [name, expectedOrder] of [
    ["balance", EXPECTED_BALANCE],
    ["flash", EXPECTED_FLASH],
    ["pro", EXPECTED_PRO],
  ] as const) {
    const combo = combosByName.get(name);
    assert.ok(combo, `Combo '${name}' should exist`);
    assert.equal(combo.strategy, "priority", `Strategy for '${name}' should be 'priority'`);

    const actualModels = combo.models.map((m: any) => m.model);
    assert.deepEqual(
      actualModels,
      expectedOrder,
      `Models order in combo '${name}' does not match expected priority sequence`
    );
  }
});

test("opencode.jsonc check", () => {
  if (!fs.existsSync(OPENCODE_PATH)) {
    assert.fail(`opencode.jsonc file not found at ${OPENCODE_PATH}`);
  }

  const content = fs.readFileSync(OPENCODE_PATH, "utf8");
  // Robust JSONC parser: strip comments (keeping strings intact) and trailing commas
  const cleanJson = content
    .replace(/("([^"\\]|\\.)*")|(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, (m, g1) => (g1 ? g1 : ""))
    .replace(/,\s*([}\]])/g, "$1");

  const config = JSON.parse(cleanJson);
  const interstellarModels = config.provider?.interstellar?.models;
  assert.ok(interstellarModels, "provider.interstellar.models block should exist");

  const actualModelIds = Object.keys(interstellarModels);

  // Checks that all combos are declared in opencode.jsonc
  for (const combo of ["balance", "flash", "pro"]) {
    assert.ok(
      actualModelIds.includes(combo),
      `Combo '${combo}' missing from opencode.jsonc interstellar models`
    );
    assert.ok(interstellarModels[combo].name, `Combo '${combo}' should have a 'name' field`);
  }

  // Checks that all provided models are declared and no unprovided models exist (excluding the 3 combos)
  const nonComboModels = actualModelIds.filter((id) => !["balance", "flash", "pro"].includes(id));

  // Verify sets are equal
  for (const expectedModel of ALL_PROVIDED_MODELS) {
    assert.ok(
      nonComboModels.includes(expectedModel),
      `Model '${expectedModel}' missing from opencode.jsonc`
    );
  }

  for (const actualModel of nonComboModels) {
    assert.ok(
      ALL_PROVIDED_MODELS.has(actualModel),
      `Model '${actualModel}' should not be in opencode.jsonc (not in provided models_list)`
    );
  }

  // Verify display name naming convention "Model [Provider]"
  const getProviderName = (modelId: string): string => {
    if (modelId.startsWith("antigravity/")) return "Antigravity";
    if (modelId.startsWith("gc/")) return "Grok";
    if (modelId.startsWith("kr/")) return "Kiro";
    if (modelId.startsWith("bzl/")) return "BazaarLink";
    if (modelId.startsWith("mistral/")) return "Mistral";
    if (modelId.startsWith("opencode-zen/")) return "Opencode Zen";
    if (modelId.startsWith("opencode-go/")) return "Opencode Go";
    if (modelId.startsWith("openrouter/")) return "Openrouter";
    if (modelId.startsWith("kc/")) return "Kilo Code";
    if (modelId.startsWith("gh/")) return "Github Copilot";
    if (modelId.startsWith("mcode/")) return "MiMo Code";
    if (modelId.startsWith("cmd/")) return "Command Code";
    return "";
  };

  for (const modelId of nonComboModels) {
    const name = interstellarModels[modelId].name;
    const provider = getProviderName(modelId);
    assert.ok(
      name.endsWith(`[${provider}]`),
      `Model '${modelId}' displayName '${name}' doesn't end with suffix '[${provider}]'`
    );
  }
});

test("oh-my-openagent.json check", () => {
  if (!fs.existsSync(AGENT_PATH)) {
    assert.fail(`oh-my-openagent.json list not found at ${AGENT_PATH}`);
  }

  const config = JSON.parse(fs.readFileSync(AGENT_PATH, "utf8"));

  // Verify that any modified model/fallback_models refer to interstellar/combo
  // And that model !== fallback
  const checkModelField = (field: string) => {
    assert.ok(
      field.startsWith("interstellar/"),
      `Model '${field}' should use 'interstellar/' provider`
    );
    const combo = field.split("/")[1];
    assert.ok(
      ["balance", "flash", "pro"].includes(combo),
      `Model combo '${combo}' should be one of balance/flash/pro`
    );
  };

  if (config.agents) {
    for (const [agentName, agentVal] of Object.entries(config.agents) as any) {
      if (agentVal.model) {
        checkModelField(agentVal.model);
      }
      if (agentVal.fallback_models) {
        for (const fall of agentVal.fallback_models) {
          checkModelField(fall.model);
          assert.notEqual(
            agentVal.model,
            fall.model,
            `Agent '${agentName}' has model and fallback equal: ${agentVal.model}`
          );
        }
      }
    }
  }

  if (config.categories) {
    for (const [catName, catVal] of Object.entries(config.categories) as any) {
      if (catVal.model) {
        checkModelField(catVal.model);
      }
      if (catVal.fallback_models) {
        for (const fall of catVal.fallback_models) {
          checkModelField(fall.model);
          assert.notEqual(
            catVal.model,
            fall.model,
            `Category '${catName}' has model and fallback equal: ${catVal.model}`
          );
        }
      }
    }
  }
});
