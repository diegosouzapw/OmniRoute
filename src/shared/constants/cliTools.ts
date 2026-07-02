// CLI Tools configuration
import { getClaudeCodeDefaultModels } from "@omniroute/open-sse/config/providerRegistry";
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";

const _cc = getClaudeCodeDefaultModels();

export const CLI_TOOLS: Record<string, CliCatalogEntry> = {
  claude: {
    id: "claude",
    name: "Claude Code",
    icon: "terminal",
    color: "#D97757",
    description: "Anthropic Claude Code CLI — ANTHROPIC_BASE_URL points to OmniRoute",
    docsUrl: "https://docs.anthropic.com/en/docs/claude-code/overview",
    configType: "env",
    category: "code",
    vendor: "Anthropic",
    acpSpawnable: true,
    baseUrlSupport: "full",
    envVars: {
      baseUrl: "ANTHROPIC_BASE_URL",
      model: "ANTHROPIC_MODEL",
      opusModel: "ANTHROPIC_DEFAULT_OPUS_MODEL",
      sonnetModel: "ANTHROPIC_DEFAULT_SONNET_MODEL",
      haikuModel: "ANTHROPIC_DEFAULT_HAIKU_MODEL",
    },
    modelAliases: ["default", "sonnet", "opus", "haiku", "opusplan"],
    settingsFile: "~/.claude/settings.json",
    defaultCommand: "claude",
    defaultModels: [
      {
        id: "model",
        name: "Default Model",
        alias: "model",
        envKey: "ANTHROPIC_MODEL",
        defaultValue: _cc.sonnet ? `cc/${_cc.sonnet}` : "cc/claude-sonnet-4-5-20250929",
        isTopLevel: true,
      },
      {
        id: "smallFast",
        name: "Small Fast Model",
        alias: "smallFast",
        envKey: "ANTHROPIC_SMALL_FAST_MODEL",
        defaultValue: _cc.haiku ? `cc/${_cc.haiku}` : "cc/claude-haiku-4-5-20251001",
        isTopLevel: true,
      },
      {
        id: "opus",
        name: "Claude Opus",
        alias: "opus",
        envKey: "ANTHROPIC_DEFAULT_OPUS_MODEL",
        defaultValue: _cc.opus ? `cc/${_cc.opus}` : "cc/claude-opus-4-5-20251101",
      },
      {
        id: "sonnet",
        name: "Claude Sonnet",
        alias: "sonnet",
        envKey: "ANTHROPIC_DEFAULT_SONNET_MODEL",
        defaultValue: _cc.sonnet ? `cc/${_cc.sonnet}` : "cc/claude-sonnet-4-5-20250929",
      },
      {
        id: "haiku",
        name: "Claude Haiku",
        alias: "haiku",
        envKey: "ANTHROPIC_DEFAULT_HAIKU_MODEL",
        defaultValue: _cc.haiku ? `cc/${_cc.haiku}` : "cc/claude-haiku-4-5-20251001",
      },
    ],
  },
  codex: {
    id: "codex",
    name: "OpenAI Codex CLI",
    color: "#10A37F",
    description: "OpenAI Codex CLI — OpenAI-compatible base URL targets OmniRoute",
    docsUrl: "https://github.com/openai/codex",
    configType: "custom",
    category: "code",
    vendor: "OpenAI",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "codex",
  },
  droid: {
    id: "droid",
    name: "Factory Droid",
    image: "/providers/droid.svg",
    color: "#00D4FF",
    description: "Factory AI Droid — BYOK assistant with configurable endpoint",
    docsUrl: "/docs?section=cli-tools&tool=droid",
    configType: "custom",
    category: "code",
    vendor: "Factory AI",
    acpSpawnable: false,
    baseUrlSupport: "partial",
    defaultCommand: "droid",
  },
  openclaw: {
    id: "openclaw",
    name: "Open Claw",
    image: "/providers/openclaw.png",
    color: "#FF6B35",
    description: "Open Claw — open-source multi-backend agent CLI (OSS, P. Steinberger)",
    docsUrl: "/docs?section=cli-tools&tool=openclaw",
    configType: "custom",
    category: "agent",
    vendor: "OSS (P. Steinberger)",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "openclaw",
  },
  cursor: {
    id: "cursor",
    name: "Cursor",
    image: "/providers/cursor.png",
    color: "#000000",
    // Cursor App routes via its own cloud server — local base URL not supported.
    // Use cursor-cli entry for headless/agent CLI mode with custom endpoint.
    description: "Cursor AI Code Editor — Cloud Endpoint required (use cursor-cli for CLI mode)",
    docsUrl: "https://docs.cursor.com/settings/models",
    configType: "guide",
    category: "code",
    vendor: "Anysphere",
    acpSpawnable: false,
    baseUrlSupport: "none",
    requiresCloud: true,
    defaultCommands: ["agent", "cursor"],
    notes: [
      { type: "warning", text: "Requires Cursor Pro account to use this feature." },
      {
        type: "cloudCheck",
        text: "Cursor routes requests through its own server, so local endpoint is not supported. Please enable Cloud Endpoint in Settings.",
      },
    ],
    guideSteps: [
      { step: 1, title: "Open Settings", desc: "Go to Settings → Models" },
      { step: 2, title: "Enable OpenAI API", desc: 'Enable "OpenAI API key" option' },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "API Key", type: "apiKeySelector" },
      { step: 5, title: "Add Custom Model", desc: 'Click "View All Model" → "Add Custom Model"' },
      { step: 6, title: "Select Model", type: "modelSelector" },
    ],
  },
  cline: {
    id: "cline",
    name: "Cline",
    color: "#00D1B2",
    description: "Cline — open-source VS Code coding agent with OpenAI-compatible base URL",
    docsUrl: "https://docs.cline.bot/",
    configType: "custom",
    category: "code",
    vendor: "OSS",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "cline",
  },
  kilo: {
    id: "kilo",
    name: "Kilo Code",
    image: "/providers/kilocode.svg",
    color: "#FF6B6B",
    description: "Kilo Code — VS Code AI assistant with custom base URL support",
    docsUrl: "/docs?section=cli-tools&tool=kilocode",
    configType: "custom",
    category: "code",
    vendor: "Kilo-Org",
    acpSpawnable: false,
    baseUrlSupport: "full",
    defaultCommand: "kilocode",
  },
  continue: {
    id: "continue",
    name: "Continue",
    image: "/providers/continue.png",
    color: "#7C3AED",
    description: "Continue — open-source AI coding assistant with full provider config",
    docsUrl: "https://docs.continue.dev/",
    configType: "guide",
    category: "code",
    vendor: "continue.dev",
    acpSpawnable: false,
    baseUrlSupport: "full",
    guideSteps: [
      { step: 1, title: "Open Config", desc: "Open Continue configuration file" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Select Model", type: "modelSelector" },
      {
        step: 4,
        title: "Add Model Config",
        desc: "Add the following configuration to your models array:",
      },
    ],
    codeBlock: {
      language: "json",
      code: `{
  "apiBase": "{{baseUrl}}",
  "title": "{{model}}",
  "model": "{{model}}",
  "provider": "openai",
  "apiKey": "{{apiKey}}"
}`,
    },
  },
  antigravity: {
    id: "antigravity",
    name: "Antigravity",
    color: "#4285F4",
    description: "Google Antigravity IDE — MITM intercept required (plan 11 backlog)",
    docsUrl: "/docs?section=cli-tools&tool=antigravity",
    // configType:"mitm" — fluxo MITM; baseUrlSupport:"none" → excluído das listas,
    // acessível só via legacy /[id] route após F8
    configType: "mitm",
    category: "code",
    vendor: "Google",
    acpSpawnable: false,
    baseUrlSupport: "none",
    modelAliases: [
      "claude-opus-4-6-thinking",
      "claude-sonnet-4-6",
      "gemini-3-flash",
      "gpt-oss-120b-medium",
      "gemini-3.1-pro-high",
      "gemini-3.1-pro-low",
    ],
    defaultModels: [
      { id: "gemini-3.1-pro-high", name: "Gemini 3.1 Pro High", alias: "gemini-3.1-pro-high" },
      { id: "gemini-3.1-pro-low", name: "Gemini 3.1 Pro Low", alias: "gemini-3.1-pro-low" },
      { id: "gemini-3-flash", name: "Gemini 3 Flash", alias: "gemini-3-flash" },
      {
        id: "claude-sonnet-4-6",
        name: "Claude Sonnet 4.6",
        alias: "claude-sonnet-4-6",
      },
      {
        id: "claude-opus-4-6-thinking",
        name: "Claude Opus 4.6 Thinking",
        alias: "claude-opus-4-6-thinking",
      },
      { id: "gpt-oss-120b-medium", name: "GPT OSS 120B Medium", alias: "gpt-oss-120b-medium" },
    ],
  },
  copilot: {
    id: "copilot",
    name: "GitHub Copilot",
    image: "/providers/copilot.png",
    color: "#1F6FEB",
    // D-nota: copilot suporta COPILOT_PROVIDER_BASE_URL desde v1.0.19+
    description: "GitHub Copilot Chat — VS Code extension with COPILOT_PROVIDER_BASE_URL support",
    docsUrl: "https://code.visualstudio.com/docs/copilot/overview",
    configType: "custom",
    category: "code",
    vendor: "GitHub / Microsoft",
    acpSpawnable: false,
    baseUrlSupport: "full",
  },
  opencode: {
    id: "opencode",
    name: "OpenCode",
    imageLight: "/providers/opencode-light.svg",
    imageDark: "/providers/opencode-dark.svg",
    icon: "terminal",
    color: "#FF6B35",
    description: "OpenCode — AI coding agent CLI by Anomaly (terminal, multi-provider)",
    docsUrl: "/docs?section=cli-tools&tool=opencode",
    configType: "guide",
    category: "code",
    vendor: "Anomaly",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "opencode",
    modelSelectionMode: "multiple",
    hideComboModels: true,
    previewConfigMode: "opencode",
    notes: [
      {
        type: "warning",
        text: "Config path: ~/.config/opencode/opencode.json on all platforms (Windows: %USERPROFILE%\\\\.config\\\\opencode\\\\opencode.json)",
      },
      {
        type: "warning",
        text: 'Thinking variant example: opencode run "implement this feature" --model omniroute/claude-sonnet-4-5-thinking --variant high',
      },
    ],
    guideSteps: [
      { step: 1, title: "Install OpenCode", desc: "Install via npm: npm install -g opencode-ai" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Set Base URL", desc: "opencode config set baseUrl {{baseUrl}}" },
      { step: 4, title: "Select Model", type: "modelSelector" },
      {
        step: 5,
        title: "Use Thinking Variant",
        desc: "For thinking models, run with --variant high/low/max (example command below).",
      },
    ],
    codeBlock: {
      language: "json",
      code: `{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "{{baseUrl}}",
        "apiKey": "{{apiKey}}"
      },
      "models": {
        "{{model}}": { "name": "{{model}}" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}`,
    },
  },
  // hermes (simple guide) — category: "code", baseUrlSupport: "none"
  // Excluded from the CLI Code's list (not in D15 19-entry list).
  // The advanced multi-role agent is "hermes-agent" (category: "agent", baseUrlSupport: "full").
  // Legacy /[id] route still renders this card after F8.
  hermes: {
    id: "hermes",
    name: "Hermes",
    icon: "terminal",
    color: "#8B5CF6",
    description:
      "Nous Research Hermes — generic OpenAI-compatible setup (use hermes-agent for full agent)",
    docsUrl: "/docs?section=cli-tools&tool=hermes",
    configType: "guide",
    category: "code",
    vendor: "Nous Research",
    acpSpawnable: false,
    baseUrlSupport: "none",
    defaultCommand: "hermes",
    guideSteps: [
      {
        step: 1,
        title: "Open Hermes Config",
        desc: "Open your Hermes configuration file or create one if this is the first run.",
      },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "Select Model", type: "modelSelector" },
      {
        step: 5,
        title: "Save Provider Block",
        desc: "Use the JSON block below as the OpenAI-compatible provider definition for OmniRoute.",
      },
    ],
    codeBlock: {
      language: "json",
      code: `{
  "provider": {
    "type": "openai",
    "baseURL": "{{baseUrl}}",
    "apiKey": "{{apiKey}}",
    "model": "{{model}}"
  }
}`,
    },
  },

  // Rich, first-class support for the real advanced Hermes Agent (Nous Research)
  // Separate from the original simple "Hermes" guide above.
  "hermes-agent": {
    id: "hermes-agent",
    name: "Hermes Agent",
    icon: "terminal",
    color: "#8B5CF6",
    description: "Hermes Agent (Nous Research) — advanced multi-role autonomous terminal AI",
    docsUrl: "/docs?section=cli-tools&tool=hermes-agent",
    configType: "custom",
    category: "agent",
    vendor: "Nous Research",
    acpSpawnable: false,
    baseUrlSupport: "full",
    defaultCommand: "hermes",
  },
  kiro: {
    id: "kiro",
    name: "Kiro AI",
    image: "/providers/kiro.svg",
    icon: "psychology_alt",
    color: "#FF6B35",
    description: "Amazon Kiro — AI-powered IDE with MITM intercept (plan 11 backlog)",
    docsUrl: "/docs?section=cli-tools&tool=kiro",
    // configType:"mitm" — fluxo MITM; baseUrlSupport:"none" → excluído das listas,
    // acessível só via legacy /[id] route após F8
    configType: "mitm",
    category: "code",
    vendor: "Amazon",
    acpSpawnable: false,
    baseUrlSupport: "none",
    guideSteps: [
      { step: 1, title: "Open Kiro Settings", desc: "Go to Settings → AI Provider" },
      { step: 2, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 3, title: "API Key", type: "apiKeySelector" },
      { step: 4, title: "Select Model", type: "modelSelector" },
    ],
  },
  qwen: {
    id: "qwen",
    name: "Qwen Code",
    icon: "psychology",
    color: "#10B981",
    description:
      "Alibaba Qwen Code CLI — supports OpenAI, Anthropic & Gemini providers via OmniRoute",
    docsUrl: "https://qwenlm.github.io/qwen-code-docs/en/users/configuration/model-providers/",
    configType: "guide",
    category: "code",
    vendor: "Alibaba",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "qwen",
    notes: [
      {
        type: "info",
        text: "Qwen Code supports multiple provider types (openai, anthropic, gemini) via modelProviders in settings.json. OmniRoute works as an OpenAI-compatible endpoint.",
      },
      {
        type: "info",
        text: "Any model available in OmniRoute can be used — not just Qwen models. Select from Qwen, Claude, Gemini, GPT, and more.",
      },
      {
        type: "warning",
        text: "Config path: Linux/macOS ~/.qwen/settings.json • Windows %USERPROFILE%\\.qwen\\settings.json",
      },
      {
        type: "error",
        text: "Qwen OAuth free tier was discontinued on 2026-04-15. Use OmniRoute with bailian-coding-plan/alibaba/alibaba-cn/openrouter/anthropic/gemini providers instead.",
      },
    ],
    modelAliases: [
      "coder-model",
      "qwen3-coder-plus",
      "qwen3-coder-flash",
      "vision-model",
      "claude-sonnet-4-6",
      "claude-opus-4-6-thinking",
      "gemini-3-flash",
      "gemini-3.1-pro-high",
    ],
    defaultModels: [
      {
        id: "coder-model",
        name: "Coder Model (Qwen 3.6 Plus)",
        alias: "coder-model",
        envKey: "OPENAI_MODEL",
        defaultValue: "coder-model",
        isTopLevel: true,
      },
      {
        id: "qwen3-coder-plus",
        name: "Qwen 3 Coder Plus",
        alias: "qwen3-coder-plus",
        envKey: "OPENAI_MODEL",
        defaultValue: "qwen3-coder-plus",
      },
      {
        id: "qwen3-coder-flash",
        name: "Qwen 3 Coder Flash",
        alias: "qwen3-coder-flash",
        envKey: "OPENAI_MODEL",
        defaultValue: "qwen3-coder-flash",
      },
      {
        id: "vision-model",
        name: "Vision Model (Multimodal)",
        alias: "vision-model",
        envKey: "OPENAI_MODEL",
        defaultValue: "vision-model",
      },
      {
        id: "claude-sonnet-4-6",
        name: "Claude Sonnet 4.6",
        alias: "claude-sonnet-4-6",
        envKey: "OPENAI_MODEL",
        defaultValue: "claude-sonnet-4-6",
      },
      {
        id: "claude-opus-4-6-thinking",
        name: "Claude Opus 4.6 Thinking",
        alias: "claude-opus-4-6-thinking",
        envKey: "OPENAI_MODEL",
        defaultValue: "claude-opus-4-6-thinking",
      },
      {
        id: "gemini-3.1-pro-high",
        name: "Gemini 3.1 Pro High",
        alias: "gemini-3.1-pro-high",
        envKey: "OPENAI_MODEL",
        defaultValue: "gemini-3.1-pro-high",
      },
      {
        id: "gemini-3-flash",
        name: "Gemini 3 Flash",
        alias: "gemini-3-flash",
        envKey: "OPENAI_MODEL",
        defaultValue: "gemini-3-flash",
      },
    ],
    guideSteps: [
      { step: 1, title: "Install Qwen Code", desc: "npm install -g @qwen-code/qwen-code" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "Select Model", type: "modelSelector" },
      {
        step: 5,
        title: "Save Config",
        desc: "Click Save Config below to write your settings.json automatically.",
      },
    ],
    codeBlock: {
      language: "json",
      code: `# ~/.qwen/settings.json — OmniRoute via security.auth
{
  "security": {
    "auth": {
      "selectedType": "openai",
      "apiKey": "{{apiKey}}",
      "baseUrl": "{{baseUrl}}"
    }
  },
  "model": {
    "name": "{{model}}"
  }
}`,
    },
  },
  custom: {
    id: "custom",
    name: "Custom CLI",
    icon: "terminal",
    color: "#10B981",
    description: "Generic OpenAI-compatible CLI or SDK configuration generator",
    docsUrl: "/docs?section=cli-tools",
    configType: "custom-builder",
    category: "code",
    vendor: "Custom",
    acpSpawnable: false,
    baseUrlSupport: "full",
  },

  // ── Code entries — aider ──────────────────────────────────────────────────
  aider: {
    id: "aider",
    name: "Aider",
    icon: "terminal",
    color: "#2DD4BF",
    description: "Aider AI pair-programming CLI — OpenAI-compatible --openai-api-base flag",
    docsUrl: "https://aider.chat/docs/config/options.html",
    configType: "guide",
    category: "code",
    vendor: "OSS (P. Gauthier)",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "aider",
    guideSteps: [
      { step: 1, title: "Install Aider", desc: "pip install aider-chat" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "Select Model", type: "modelSelector" },
    ],
    codeBlock: {
      language: "bash",
      code: `export OPENAI_API_KEY="{{apiKey}}"
aider --openai-api-base "{{baseUrl}}" --model "{{model}}"`,
    },
  },

  // ── Code entries — forge ──────────────────────────────────────────────────
  forge: {
    id: "forge",
    name: "ForgeCode",
    icon: "terminal",
    color: "#F97316",
    description: "ForgeCode coding agent CLI — custom provider via .forge.toml",
    docsUrl: "https://github.com/antinomyhq/forge",
    configType: "custom",
    category: "code",
    vendor: "Antinomy HQ",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "forge",
  },

  // ── Code entries — cursor-cli ─────────────────────────────────────────────
  "cursor-cli": {
    id: "cursor-cli",
    name: "Cursor Agent CLI",
    icon: "terminal",
    color: "#000000",
    description: "Cursor Agent CLI — headless agent mode with custom provider endpoint",
    docsUrl: "https://docs.cursor.com/advanced/api",
    configType: "guide",
    category: "code",
    vendor: "Anysphere",
    acpSpawnable: true,
    baseUrlSupport: "partial",
    defaultCommand: "cursor",
    guideSteps: [
      { step: 1, title: "Install Cursor CLI", desc: "Download cursor binary from cursor.com" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "Select Model", type: "modelSelector" },
    ],
  },

  // ── Code entries — new ★ ──────────────────────────────────────────────────

  /** ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27 */
  roo: {
    id: "roo",
    name: "Roo Code",
    icon: "terminal",
    color: "#7C3AED",
    description: "Roo Code AI Assistant — VS Code extension with OpenAI-compatible custom base URL",
    docsUrl: "https://docs.roocode.com/",
    configType: "guide",
    category: "code",
    vendor: "Roo (OSS)",
    acpSpawnable: false,
    baseUrlSupport: "full",
    guideSteps: [
      { step: 1, title: "Install Roo Code", desc: "Install the Roo Code VS Code extension" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "Select Model", type: "modelSelector" },
    ],
  },

  /** ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27 */
  jcode: {
    id: "jcode",
    name: "jcode",
    icon: "terminal",
    color: "#10B981",
    description: "jcode terminal coding agent — OpenAI-compatible CLI by 1jehuang",
    docsUrl: "https://github.com/1jehuang/jcode",
    configType: "custom",
    category: "code",
    vendor: "OSS (1jehuang)",
    acpSpawnable: false,
    baseUrlSupport: "full",
    defaultCommand: "jcode",
  },

  /** ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27 */
  "deepseek-tui": {
    id: "deepseek-tui",
    name: "DeepSeek TUI",
    icon: "terminal",
    color: "#4F46E5",
    description: "DeepSeek TUI — Rust-based coding agent CLI with OPENAI_BASE_URL support",
    docsUrl: "https://github.com/hunterbown/deepseek-tui",
    configType: "custom",
    category: "code",
    vendor: "OSS (Hunter Bown)",
    acpSpawnable: false,
    baseUrlSupport: "full",
    defaultCommand: "deepseek-tui",
  },

  /** ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27 */
  smelt: {
    id: "smelt",
    name: "Smelt",
    icon: "terminal",
    color: "#EF4444",
    description: "Smelt coding agent CLI — OpenAI-compatible agent by leonardcser",
    docsUrl: "https://github.com/leonardcser/smelt",
    configType: "custom",
    category: "code",
    vendor: "OSS (leonardcser)",
    acpSpawnable: false,
    baseUrlSupport: "full",
    defaultCommand: "smelt",
  },

  /** ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27 */
  pi: {
    id: "pi",
    name: "Pi",
    icon: "terminal",
    color: "#F59E0B",
    description: "Pi coding agent CLI — lightweight terminal AI by M. Zechner",
    docsUrl: "https://github.com/badlogic/pi",
    configType: "custom",
    category: "code",
    vendor: "OSS (M. Zechner)",
    acpSpawnable: false,
    baseUrlSupport: "full",
    defaultCommand: "pi",
  },

  // ── Agent entries ─────────────────────────────────────────────────────────

  /** ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27 */
  goose: {
    id: "goose",
    name: "Goose",
    icon: "smart_toy",
    color: "#F97316",
    description: "Goose autonomous agent CLI — Block / Linux Foundation OSS, full base URL",
    docsUrl: "https://block.github.io/goose/",
    configType: "guide",
    category: "agent",
    vendor: "Block / Linux Foundation",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "goose",
    guideSteps: [
      { step: 1, title: "Install Goose", desc: "pip install goose-ai or brew install goose" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "Select Model", type: "modelSelector" },
    ],
    codeBlock: {
      language: "yaml",
      code: `# ~/.config/goose/config.yaml
GOOSE_PROVIDER: "openai"
GOOSE_MODEL: "{{model}}"
OPENAI_HOST: "{{baseUrl}}"
OPENAI_API_KEY: "{{apiKey}}"`,
    },
  },

  /** ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27 */
  interpreter: {
    id: "interpreter",
    name: "Open Interpreter",
    icon: "smart_toy",
    color: "#8B5CF6",
    description: "Open Interpreter — autonomous coding agent CLI with --api_base flag",
    docsUrl: "https://docs.openinterpreter.com/",
    configType: "guide",
    category: "agent",
    vendor: "OSS",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "interpreter",
    guideSteps: [
      { step: 1, title: "Install", desc: "pip install open-interpreter" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "Select Model", type: "modelSelector" },
    ],
    codeBlock: {
      language: "bash",
      code: `interpreter --api_base "{{baseUrl}}" --api_key "{{apiKey}}" --model "{{model}}"`,
    },
  },

  /** ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27 */
  warp: {
    id: "warp",
    name: "Warp AI",
    icon: "terminal",
    color: "#1D4ED8",
    description: "Warp AI terminal — BYOK desktop app with partial base URL support",
    docsUrl: "https://docs.warp.dev/",
    configType: "guide",
    category: "agent",
    vendor: "Warp Inc.",
    acpSpawnable: true,
    baseUrlSupport: "partial",
    guideSteps: [
      { step: 1, title: "Install Warp", desc: "Download Warp from warp.dev (desktop app)" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Configure BYOK", desc: "Go to Settings → AI → BYOK Provider" },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "Select Model", type: "modelSelector" },
    ],
    notes: [
      {
        type: "warning",
        text: "Warp is a desktop app, not a CLI binary. baseUrlSupport is partial — some models may require the native Warp endpoint.",
      },
    ],
  },

  /** ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27 */
  "agent-deck": {
    id: "agent-deck",
    name: "Agent Deck",
    icon: "device_hub",
    color: "#0EA5E9",
    description: "Agent Deck — multi-agent stdio backend orchestrator (OSS, asheshgoplani)",
    docsUrl: "https://github.com/asheshgoplani/agent-deck",
    configType: "guide",
    category: "agent",
    vendor: "OSS (asheshgoplani)",
    acpSpawnable: false,
    baseUrlSupport: "full",
    defaultCommand: "agent-deck",
    guideSteps: [
      { step: 1, title: "Install Agent Deck", desc: "npm install -g agent-deck" },
      { step: 2, title: "API Key", type: "apiKeySelector" },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "Select Model", type: "modelSelector" },
    ],
  },
};

// ─── Registry helpers ────────────────────────────────────────────────────────

export type CliToolEntry = CliCatalogEntry;

/** Returns an ordered list of all registered CLI tools. */
export function listCliTools(): CliToolEntry[] {
  return Object.values(CLI_TOOLS);
}

/** Returns a single tool by id, or undefined if not found. */
export function getCliTool(id: string): CliToolEntry | undefined {
  return CLI_TOOLS[id];
}
