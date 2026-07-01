import fs from "fs";

const OPENCODE_PATH = "/Users/chewji/.config/opencode/opencode.jsonc";

const MODELS_MAP = {
  // Antigravity
  "antigravity/gemini-3.5-flash-low": "Gemini 3.5 Flash Low [Antigravity]",
  "antigravity/gemini-3.5-flash-medium": "Gemini 3.5 Flash Medium [Antigravity]",
  "antigravity/gemini-3.5-flash-high": "Gemini 3.5 Flash High [Antigravity]",
  "antigravity/claude-opus-4-6-thinking": "Claude Opus 4.6 Thinking [Antigravity]",
  "antigravity/claude-sonnet-4-6": "Claude Sonnet 4.6 [Antigravity]",
  "antigravity/gpt-oss-120b-medium": "GPT-OSS 120B Medium [Antigravity]",

  // Kiro
  "kr/claude-sonnet-4.5": "Claude Sonnet 4.5 [Kiro]",
  "kr/claude-haiku-4.5": "Claude Haiku 4.5 [Kiro]",
  "kr/glm-5": "GLM 5 [Kiro]",

  // BazaarLink
  "bzl/auto:free": "Auto Free [BazaarLink]",

  // Mistral
  "mistral/mistral-large-latest": "Mistral Large Latest [Mistral]",
  "mistral/mistral-medium-latest": "Mistral Medium Latest [Mistral]",
  "mistral/mistral-small-latest": "Mistral Small Latest [Mistral]",

  // Opencode Zen
  "opencode-zen/mimo-v2.5-free": "MiMo v2.5 Free [Opencode Zen]",
  "opencode-zen/nemotron-3-ultra-free": "Nemotron 3 Ultra Free [Opencode Zen]",

  // Opencode Go
  "opencode-go/glm-5.2": "GLM 5.2 [Opencode Go]",
  "opencode-go/minimax-m3": "Minimax M3 [Opencode Go]",
  "opencode-go/mimo-v2.5": "MiMo v2.5 [Opencode Go]",

  // Openrouter
  "openrouter/openrouter/free": "OpenRouter Free [Openrouter]",

  // Kilo Code
  "kc/openrouter/free": "OpenRouter Free [Kilo Code]",
  "kc/kilo-auto/free": "Kilo Auto Free [Kilo Code]",

  // Github Copilot
  "gh/claude-haiku-4.5": "Claude Haiku 4.5 [Github Copilot]",
  "gh/claude-sonnet-4.6": "Claude Sonnet 4.6 [Github Copilot]",
  "gh/gpt-5.3-codex": "GPT-5.3 Codex [Github Copilot]",

  // MiMo Code
  "mcode/mimo-auto": "MiMo Auto [MiMo Code]",

  // Command Code
  "cmd/zai-org/GLM-5.2": "GLM 5.2 [Command Code]",
  "cmd/xiaomi/mimo-v2.5-pro": "MiMo v2.5 Pro [Command Code]",
  "cmd/xiaomi/mimo-v2.5": "MiMo v2.5 [Command Code]",

  // Combos
  balance: "Balance",
  flash: "Flash",
  pro: "Pro",
};

function main() {
  if (!fs.existsSync(OPENCODE_PATH)) {
    console.error(`Config not found at ${OPENCODE_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(OPENCODE_PATH, "utf8");

  // Locate provider interstellar models block start: "models": {
  const modelsStartToken = '"models": {';
  const startIdx = content.indexOf(modelsStartToken);
  if (startIdx === -1) {
    console.error("Could not find models block in config!");
    process.exit(1);
  }

  const beforeModelsBlock = content.slice(0, startIdx + modelsStartToken.length);

  // We need to match the closing brace of the models object.
  // Since models object has nested objects, let us find the matching closing brace.
  let braceCount = 1;
  let currentIdx = startIdx + modelsStartToken.length;
  let insideString = false;
  let escapeNext = false;

  while (braceCount > 0 && currentIdx < content.length) {
    const char = content[currentIdx];

    if (escapeNext) {
      escapeNext = false;
    } else if (char === "\\") {
      escapeNext = true;
    } else if (char === '"') {
      insideString = !insideString;
    } else if (!insideString) {
      if (char === "{") {
        braceCount++;
      } else if (char === "}") {
        braceCount--;
      }
    }
    currentIdx++;
  }

  const afterModelsBlock = content.slice(currentIdx - 1);

  // Format the models block nice and clean
  let modelsStr = "\n";
  const keys = Object.keys(MODELS_MAP);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val = MODELS_MAP[key as keyof typeof MODELS_MAP];
    modelsStr += `        "${key}": {\n          "name": "${val}"\n        }`;
    if (i < keys.length - 1) {
      modelsStr += ",\n\n";
    } else {
      modelsStr += "\n      ";
    }
  }

  const newContent = beforeModelsBlock + modelsStr + afterModelsBlock;
  fs.writeFileSync(OPENCODE_PATH, newContent, "utf8");
  console.log("Successfully updated opencode.jsonc with accurate models and combos!");
}

main();
