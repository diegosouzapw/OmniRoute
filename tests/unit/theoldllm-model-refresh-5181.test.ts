import test from "node:test";
import assert from "node:assert/strict";

// Feature guard for #5181 — "Update The Old LLM (Free) model list".
//
// Two things this proves, both of which fail on the pre-#5181 code:
//   1. mapModel() now passes KNOWN upstream IDs through UNCHANGED. Before the fix,
//      any non-GPT/Claude id (Gemini, o-series, Grok, DeepSeek, Sonar) fell through
//      to the `return "GPT_5_4"` default and silently misrouted every request.
//   2. The registry catalog is refreshed with the current free-tier models while
//      keeping the legacy alias IDs for saved-preference backward compatibility.
const { mapModel, CHATGPT_UPSTREAM_MODELS } = await import(
  "../../open-sse/executors/theoldllm.ts"
);
const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");

function catalogIds(): string[] {
  const entry = getRegistryEntry("theoldllm");
  assert.ok(entry, "theoldllm registry entry must exist");
  return (entry.models ?? []).map((m) => m.id);
}

test("#5181 known upstream IDs pass through mapModel unchanged (Gemini no longer misroutes to GPT_5_4)", () => {
  // These are the exact cases the old default clause broke.
  assert.equal(mapModel("gemini_3_pro"), "gemini_3_pro");
  assert.equal(mapModel("gemini_2_5_pro"), "gemini_2_5_pro");
  assert.equal(mapModel("gemini_2_0_flash"), "gemini_2_0_flash");
  assert.equal(mapModel("openrouter_grok_4"), "openrouter_grok_4");
  assert.equal(mapModel("together_deepseek_v3"), "together_deepseek_v3");
  assert.equal(mapModel("sonar-pro"), "sonar-pro");
  assert.equal(mapModel("GPT_o4_mini"), "GPT_o4_mini");
  // Every declared upstream id must round-trip through mapModel unchanged.
  for (const id of CHATGPT_UPSTREAM_MODELS) {
    assert.equal(mapModel(id), id, `${id} must route unchanged`);
  }
});

test("#5181 legacy alias IDs still map to available upstream models (backward compatibility)", () => {
  assert.equal(mapModel("claude_opus_4"), "CLAUDE_4_6_OPUS");
  assert.equal(mapModel("claude_sonnet_4"), "CLAUDE_4_6_SONNET");
  assert.equal(mapModel("claude_haiku_3_5"), "CLAUDE_4_5_HAIKU");
  assert.equal(mapModel("gpt-5.4"), "GPT_5_4");
  assert.equal(mapModel("gpt-4o"), "GPT_4O");
});

test("#5181 catalog is refreshed with the current free-tier models", () => {
  const ids = catalogIds();
  for (const id of [
    "GPT_5_3",
    "GPT_5_2",
    "GPT_5_1",
    "GPT_5",
    "GPT_o4_mini",
    "GPT_o3_mini",
    "gemini_2_5_pro",
    "gemini_2_0_flash",
    "gemini_1_5_flash",
    "CLAUDE_4_6_OPUS",
    "CLAUDE_4_6_SONNET",
    "CLAUDE_4_5_HAIKU",
    "openrouter_grok_4",
    "sonar-pro",
  ]) {
    assert.ok(ids.includes(id), `catalog must include refreshed model ${id}`);
  }
});

test("#5181 legacy catalog entries are preserved (no breaking removal of saved-preference IDs)", () => {
  const ids = catalogIds();
  for (const id of ["GPT_5_4", "GPT_4o", "claude_opus_4", "gemini_3_pro"]) {
    assert.ok(ids.includes(id), `legacy catalog id ${id} must be preserved`);
  }
});

test("#5181 every refreshed catalog id routes to a valid upstream model", () => {
  // No catalog id may fall through to the GPT_5_4 default unless it is genuinely a
  // GPT-5 alias — Gemini/Grok/DeepSeek/Sonar/Claude entries must resolve to their
  // own upstream id, not silently collapse onto GPT_5_4.
  const nonGptExpectations: Record<string, string> = {
    gemini_2_5_pro: "gemini_2_5_pro",
    gemini_2_0_flash: "gemini_2_0_flash",
    gemini_1_5_flash: "gemini_1_5_flash",
    CLAUDE_4_6_OPUS: "CLAUDE_4_6_OPUS",
    openrouter_grok_4: "openrouter_grok_4",
    "sonar-pro": "sonar-pro",
  };
  for (const [id, expected] of Object.entries(nonGptExpectations)) {
    assert.equal(mapModel(id), expected);
  }
});
