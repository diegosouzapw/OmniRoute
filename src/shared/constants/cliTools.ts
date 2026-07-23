// CLI Tools configuration
import { getClaudeCodeDefaultModels } from "@omniroute/open-sse/config/providerRegistry";
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";
import { GROK_BUILD_CLI_TOOL } from "@/shared/constants/cliToolsGrokBuild";

const _cc = getClaudeCodeDefaultModels();
type CliModel = NonNullable<CliCatalogEntry["defaultModels"]>[number];
const createCliModel = (id: string, name: string): CliModel => ({ id, name, alias: id });

export const CLI_TOOLS: Record<string, CliCatalogEntry> = {
  claude: {
    id: "claude",
    name: "Claude Code",
    image: "/providers/claude.svg",
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
    image: "/providers/codex.svg",
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
    image: "/providers/openclaw.svg",
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
    image: "/providers/cursor.svg",
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
    image: "/providers/cline.svg",
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
    image: "/providers/continue.svg",
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
      "gemini-3.6-flash-high",
      "gemini-3.6-flash-medium",
      "gemini-3.6-flash-low",
      "claude-opus-4-6-thinking",
      "claude-sonnet-4-6",
      "gemini-pro-agent",
      "gemini-3.1-pro-low",
      "gemini-3-flash-agent",
      "gemini-3.5-flash-low",
      "gemini-3.5-flash-extra-low",
      "gpt-oss-120b-medium",
    ],
    defaultModels: [
      createCliModel("gemini-3.6-flash-high", "Gemini 3.6 Flash High"),
      createCliModel("gemini-3.6-flash-medium", "Gemini 3.6 Flash Medium"),
      createCliModel("gemini-3.6-flash-low", "Gemini 3.6 Flash Low"),
      createCliModel("gemini-pro-agent", "Gemini 3.1 Pro High"),
      createCliModel("gemini-3.1-pro-low", "Gemini 3.1 Pro Low"),
      createCliModel("gemini-3-flash-agent", "Gemini 3.5 Flash High"),
      createCliModel("gemini-3.5-flash-low", "Gemini 3.5 Flash Medium"),
      createCliModel("gemini-3.5-flash-extra-low", "Gemini 3.5 Flash Low"),
      createCliModel("claude-sonnet-4-6", "Claude Sonnet 4.6"),
      createCliModel("claude-opus-4-6-thinking", "Claude Opus 4.6 Thinking"),
      createCliModel("gpt-oss-120b-medium", "GPT OSS 120B Medium"),
    ],
  },
  copilot: {
    id: "copilot",
    name: "GitHub Copilot",
    image: "/providers/copilot.svg",
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
    image: "/providers/qwen.svg",
    color: "#10B981",
    description: "Qwen Code CLI — current V4 OpenAI-compatible model provider via OmniRoute",
    docsUrl: "https://qwenlm.github.io/qwen-code-docs/en/users/configuration/model-providers/",
    configType: "guide",
    category: "code",
    vendor: "Alibaba",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "qwen",
    previewConfigMode: "qwen",
    notes: [
      {
        type: "info",
        text: "OmniRoute is registered under modelProviders.openai using Qwen Code's current bare-array V4 format.",
      },
      {
        type: "info",
        text: "The API key is stored only as OMNIROUTE_API_KEY in ~/.qwen/.env, leaving your existing provider credentials untouched.",
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
        desc: "Write the modelProviders entry and dedicated .env key without replacing other Qwen Code settings.",
      },
    ],
    codeBlock: {
      language: "json",
      code: `{
  "modelProviders": {
    "openai": [
      {
        "id": "{{model}}",
        "name": "{{model}} (OmniRoute)",
        "envKey": "OMNIROUTE_API_KEY",
        "baseUrl": "{{baseUrl}}"
      }
    ]
  },
  "security": { "auth": { "selectedType": "openai" } },
  "model": { "name": "{{model}}", "baseUrl": "{{baseUrl}}" }
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

  "grok-build": GROK_BUILD_CLI_TOOL,
  // ── Code entries — cursor-cli ─────────────────────────────────────────────
  "cursor-cli": {
    id: "cursor-cli",
    name: "Cursor Agent CLI",
    image: "/providers/cursor.svg",
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
    image: "/providers/roocode.svg",
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

  /**
   * ★ Added by plan 14 (CLI Pages Redesign) — 2026-05-27
   * Kept as a legacy/dual entry after CodeWhale (see below) took over as the
   * actively-maintained successor. Existing users who still have DeepSeek
   * TUI installed keep a working dashboard card; new users are steered to
   * "codewhale" instead.
   */
  "deepseek-tui": {
    id: "deepseek-tui",
    name: "DeepSeek TUI",
    image: "/providers/deepseek.svg",
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

  /**
   * ★ Added 2026-07-02 (dual-entry, see deepseek-tui above). CodeWhale is
   * the actively-maintained successor to DeepSeek TUI — same author, new
   * name. Config lives under ~/.codewhale/config.toml; the settings route
   * also keeps ~/.deepseek/config.toml (legacy) in sync for upgrading
   * users. Reference: https://github.com/Hmbown/CodeWhale
   */
  codewhale: {
    id: "codewhale",
    name: "CodeWhale",
    icon: "terminal",
    color: "#4F46E5",
    description:
      "CodeWhale — Rust-based coding agent CLI with OPENAI_BASE_URL support (successor to DeepSeek TUI)",
    docsUrl: "https://github.com/Hmbown/CodeWhale",
    configType: "custom",
    category: "code",
    vendor: "OSS (Hmbown)",
    acpSpawnable: false,
    baseUrlSupport: "full",
    defaultCommand: "codewhale",
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

  /** Added — ported from upstream decolua/9router#1233 (dashboard catalog entry for Crush). */
  crush: {
    id: "crush",
    name: "Crush",
    icon: "terminal",
    color: "#FB923C",
    description: "Crush coding agent CLI — terminal AI agent by Charm (charmbracelet/crush)",
    docsUrl: "https://github.com/charmbracelet/crush",
    configType: "custom",
    category: "code",
    vendor: "OSS (Charm)",
    acpSpawnable: false,
    baseUrlSupport: "full",
    defaultCommand: "crush",
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

  omp: {
    id: "omp",
    name: "Oh My Pi",
    image: "/providers/omp.png",
    color: "#111111",
    docsUrl: "https://github.com/can1357/oh-my-pi",
    description: "Oh My Pi terminal coding agent via OmniRoute",
    configType: "custom",
    category: "agent",
    vendor: "OSS",
    acpSpawnable: true,
    baseUrlSupport: "full",
    defaultCommand: "omp",
    notes: [
      {
        type: "info",
        text: "Oh My Pi reads custom OpenAI-compatible providers from ~/.omp/agent/models.yml. OmniRoute adds itself as a provider with auto-discovery — models appear automatically in omp's /model menu.",
      },
      {
        type: "warning",
        text: "Config path: Linux/macOS ~/.omp/agent/models.yml • Windows %USERPROFILE%\\.omp\\.omp\\agent\\models.yml",
      },
    ],
  },

  letta: {
    id: "letta",
    name: "Letta CLI",
    image: "/providers/letta.png",
    color: "#FF6B35",
    description: "Letta CLI — AI agent with persistent memory and tool use",
    configType: "custom",
    category: "agent",
    vendor: "Letta",
    acpSpawnable: false,
    baseUrlSupport: "full",
    docsUrl: "https://docs.letta.com",
    notes: [
      {
        type: "info",
        text: "Letta CLI uses pi-ai which sends OpenAI-compatible requests. OmniRoute configures it as an OpenAI provider with custom base URL.",
      },
      {
        type: "info",
        text: "CLI (Local Mode): OmniRoute auto-configures ~/.letta/lc-local-backend/providers/auth.json. Use 'letta --info' to check if local mode is enabled.",
      },
      {
        type: "warning",
        text: "Local mode config path: ~/.letta/lc-local-backend/providers/auth.json (CLI only)",
      },
    ],
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
