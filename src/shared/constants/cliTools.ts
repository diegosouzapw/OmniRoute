// CLI Tools configuration
export const CLI_TOOLS = {
  claude: {
    id: "claude",
    name: "Claude Code",
    icon: "terminal",
    color: "#D97757",
    description: "Anthropic Claude Code CLI",
    docsUrl: "https://docs.anthropic.com/en/docs/claude-code/overview",
    configType: "env",
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
        id: "opus",
        name: "Claude Opus",
        alias: "opus",
        envKey: "ANTHROPIC_DEFAULT_OPUS_MODEL",
        defaultValue: "cc/claude-opus-4-5-20251101",
      },
      {
        id: "sonnet",
        name: "Claude Sonnet",
        alias: "sonnet",
        envKey: "ANTHROPIC_DEFAULT_SONNET_MODEL",
        defaultValue: "cc/claude-sonnet-4-5-20250929",
      },
      {
        id: "haiku",
        name: "Claude Haiku",
        alias: "haiku",
        envKey: "ANTHROPIC_DEFAULT_HAIKU_MODEL",
        defaultValue: "cc/claude-haiku-4-5-20251001",
      },
    ],
  },
  codex: {
    id: "codex",
    name: "OpenAI Codex CLI",
    image: "/providers/codex.png",
    color: "#10A37F",
    description: "OpenAI Codex CLI",
    docsUrl: "https://github.com/openai/codex",
    configType: "custom",
    defaultCommand: "codex",
  },
  droid: {
    id: "droid",
    name: "Factory Droid",
    image: "/providers/droid.png",
    color: "#00D4FF",
    description: "Factory Droid AI Assistant",
    docsUrl: "/docs?section=cli-tools&tool=droid",
    configType: "custom",
    defaultCommand: "droid",
  },
  openclaw: {
    id: "openclaw",
    name: "Open Claw",
    image: "/providers/openclaw.png",
    color: "#FF6B35",
    description: "Open Claw AI Assistant",
    docsUrl: "/docs?section=cli-tools&tool=openclaw",
    configType: "custom",
    defaultCommand: "openclaw",
  },
  cursor: {
    id: "cursor",
    name: "Cursor",
    image: "/providers/cursor.png",
    color: "#000000",
    description: "Cursor AI Code Editor",
    docsUrl: "https://docs.cursor.com/settings/models",
    configType: "guide",
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
  windsurf: {
    id: "windsurf",
    name: "Windsurf",
    image: "/providers/windsurf.svg",
    color: "#4A90E2",
    description: "Windsurf AI-first IDE by Codeium",
    docsUrl: "https://windsurf.com/",
    configType: "guide",
    notes: [
      {
        type: "warning",
        text: "Official Windsurf docs currently describe BYOK for select Claude models plus enterprise URL/token settings, not a generic custom OpenAI-compatible provider.",
      },
    ],
    guideSteps: [
      {
        step: 1,
        title: "Open AI Settings",
        desc: "Click the AI Settings icon in Windsurf or go to Settings",
      },
      {
        step: 2,
        title: "Add Custom Provider",
        desc: 'Select "Add custom provider" (OpenAI-compatible)',
      },
      { step: 3, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 4, title: "API Key", type: "apiKeySelector" },
      { step: 5, title: "Select Model", type: "modelSelector" },
    ],
  },
  cline: {
    id: "cline",
    name: "Cline",
    image: "/providers/cline.png",
    color: "#00D1B2",
    description: "Cline AI Coding Assistant CLI",
    docsUrl: "https://docs.cline.bot/",
    configType: "custom",
    defaultCommand: "cline",
  },
  kilo: {
    id: "kilo",
    name: "Kilo Code",
    image: "/providers/kilocode.png",
    color: "#FF6B6B",
    description: "Kilo Code AI Assistant CLI",
    docsUrl: "/docs?section=cli-tools&tool=kilocode",
    configType: "custom",
    defaultCommand: "kilocode",
  },
  continue: {
    id: "continue",
    name: "Continue",
    image: "/providers/continue.png",
    color: "#7C3AED",
    description: "Continue AI Assistant",
    docsUrl: "https://docs.continue.dev/",
    configType: "guide",
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
    image: "/providers/antigravity.png",
    color: "#4285F4",
    description: "Google Antigravity IDE with MITM",
    docsUrl: "/docs?section=cli-tools&tool=antigravity",
    configType: "mitm",
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
    description: "GitHub Copilot Chat — VS Code Extension",
    docsUrl: "https://code.visualstudio.com/docs/copilot/overview",
    configType: "custom",
  },
  opencode: {
    id: "opencode",
    name: "OpenCode",
    image: "/providers/opencode.png",
    icon: "terminal",
    color: "#FF6B35",
    description: "OpenCode AI coding agent (Terminal)",
    docsUrl: "/docs?section=cli-tools&tool=opencode",
    configType: "guide",
    defaultCommand: "opencode",
    notes: [
      {
        type: "warning",
        text: "Config path: Linux/macOS ~/.config/opencode/opencode.json • Windows %APPDATA%\\\\opencode\\\\opencode.json",
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
  "providers": {
    "omniroute": {
      "name": "OmniRoute",
      "api": "openai",
      "baseURL": "{{baseUrl}}",
      "apiKey": "{{apiKey}}",
      "models": [
        "{{model}}",
        "claude-sonnet-4-5-thinking",
        "gemini-3.1-pro-high",
        "gemini-3-flash"
      ]
    }
  }
}`,
    },
  },
  kiro: {
    id: "kiro",
    name: "Kiro AI",
    image: "/providers/kiro.png",
    icon: "psychology_alt",
    color: "#FF6B35",
    description: "Amazon Kiro — AI-powered IDE with MITM",
    docsUrl: "/docs?section=cli-tools&tool=kiro",
    configType: "mitm",
    guideSteps: [
      { step: 1, title: "Open Kiro Settings", desc: "Go to Settings → AI Provider" },
      { step: 2, title: "Base URL", value: "{{baseUrl}}", copyable: true },
      { step: 3, title: "API Key", type: "apiKeySelector" },
      { step: 4, title: "Select Model", type: "modelSelector" },
    ],
  },
  // HIDDEN: gemini-cli
  // "gemini-cli": {
  //   id: "gemini-cli",
  //   name: "Gemini CLI",
  //   icon: "terminal",
  //   color: "#4285F4",
  //   description: "Google Gemini CLI",
  //   configType: "env",
  //   envVars: {
  //     baseUrl: "GEMINI_API_BASE_URL",
  //     model: "GEMINI_MODEL",
  //   },
  //   defaultModels: [
  //     { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", alias: "pro" },
  //     { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", alias: "flash" },
  //   ],
  // },
};

// Get all provider models for mapping dropdown
export const getProviderModelsForMapping = (providers) => {
  const result = [];
  providers.forEach((conn) => {
    if (conn.isActive && (conn.testStatus === "active" || conn.testStatus === "success")) {
      result.push({
        connectionId: conn.id,
        provider: conn.provider,
        name: conn.name,
        models: conn.models || [],
      });
    }
  });
  return result;
};
