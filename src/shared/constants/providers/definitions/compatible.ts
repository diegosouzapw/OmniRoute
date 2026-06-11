export const OPENAI_COMPATIBLE_PREFIX = "openai-compatible-";

export const ANTHROPIC_COMPATIBLE_PREFIX = "anthropic-compatible-";

export const CLAUDE_CODE_COMPATIBLE_PREFIX = "anthropic-compatible-cc-";

export const UPSTREAM_PROXY_PROVIDERS = {
  cliproxyapi: {
    id: "cliproxyapi",
    alias: "cpa",
    name: "CLIProxyAPI",
    icon: "proxy",
    color: "#6366F1",
    textIcon: "CPA",
    website: "https://github.com/router-for-me/CLIProxyAPI",
    defaultPort: 8317,
    healthEndpoint: "/v1/models",
    managementPrefix: "/v0/management",
    configDir: "~/.cli-proxy-api",
    binaryName: "cli-proxy-api",
    githubRepo: "router-for-me/CLIProxyAPI",
  },
  "9router": {
    id: "9router",
    alias: "nr",
    name: "9router",
    icon: "router",
    color: "#0EA5E9",
    textIcon: "9R",
    website: "https://www.npmjs.com/package/9router",
    defaultPort: 20130,
    healthEndpoint: "/api/health",
    npmPackage: "9router",
    embedded: true,
    isEmbeddedService: true,
    riskNoticeVariant: "embedded-service" as const,
  },
};

export const CLOUD_AGENT_PROVIDERS = {
  jules: {
    id: "jules",
    alias: "jules",
    name: "Google Jules",
    icon: "engineering",
    color: "#4285F4",
    textIcon: "JL",
    website: "https://jules.google",
    authHint: "Jules API key for creating and managing cloud coding tasks.",
  },
  devin: {
    id: "devin",
    alias: "devin",
    name: "Devin",
    icon: "smart_toy",
    color: "#111827",
    textIcon: "DV",
    website: "https://devin.ai",
    authHint: "Devin API key for cloud agent sessions.",
  },
  "codex-cloud": {
    id: "codex-cloud",
    alias: "codex-cloud",
    name: "Codex Cloud",
    icon: "cloud",
    color: "#10A37F",
    textIcon: "CC",
    website: "https://openai.com/codex",
    authHint: "OpenAI API key with Codex Cloud task access.",
  },
};

export const SELF_HOSTED_CHAT_PROVIDER_IDS = new Set([
  "lm-studio",
  "vllm",
  "lemonade",
  "llamafile",
  "llama-cpp",
  "triton",
  "docker-model-runner",
  "xinference",
  "oobabooga",
]);
