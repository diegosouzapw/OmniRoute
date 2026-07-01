import { getCombos, updateCombo } from "../src/lib/db/combos";

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

const EXPECTED_BALANCE = [...BALANCE_MODELS, ...PRO_MODELS, ...FLASH_MODELS, ...LAST_MODELS];
const EXPECTED_FLASH = [...FLASH_MODELS, ...BALANCE_MODELS, ...PRO_MODELS, ...LAST_MODELS];
const EXPECTED_PRO = [...PRO_MODELS, ...BALANCE_MODELS, ...FLASH_MODELS, ...LAST_MODELS];

async function main() {
  const combos = await getCombos();
  console.log(`Found ${combos.length} combos in database`);

  const list = [
    { name: "balance", models: EXPECTED_BALANCE },
    { name: "flash", models: EXPECTED_FLASH },
    { name: "pro", models: EXPECTED_PRO },
  ];

  for (const item of list) {
    const existing = combos.find((c) => c.name === item.name);
    if (!existing) {
      console.error(`Combo '${item.name}' not found in database!`);
      continue;
    }

    console.log(`Updating combo '${item.name}' (id: ${existing.id})...`);
    await updateCombo(existing.id as string, {
      models: item.models,
      strategy: "priority",
    });
    console.log(`Successfully updated combo '${item.name}'`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
