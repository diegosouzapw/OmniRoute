// Agent Skills metadata — single source of truth for /dashboard/agent-skills.
// Each curated entry drives the catalog; endpoints/cliCommands are resolved
// at runtime by src/lib/agentSkills/catalog.ts (via OpenAPI + CLI parsers).

import type { AgentSkill, SkillArea, SkillCategory } from "@/lib/agentSkills/types";

const REPO = "diegosouzapw/OmniRoute";
const BRANCH = "main";
const SKILL_PATH = "skills";

export const AGENT_SKILLS_REPO_URL = `https://github.com/${REPO}`;
export const AGENT_SKILLS_RAW_BASE = `https://raw.githubusercontent.com/${REPO}/refs/heads/${BRANCH}/${SKILL_PATH}`;
export const AGENT_SKILLS_BLOB_BASE = `https://github.com/${REPO}/blob/${BRANCH}/${SKILL_PATH}`;

export function getAgentSkillRawUrl(id: string): string {
  return `${AGENT_SKILLS_RAW_BASE}/${id}/SKILL.md`;
}

export function getAgentSkillBlobUrl(id: string): string {
  return `${AGENT_SKILLS_BLOB_BASE}/${id}/SKILL.md`;
}

// ── Curated entry shape ───────────────────────────────────────────────────────
// Only the fields that cannot be derived at runtime go here.
// The full AgentSkill shape (endpoints, cliCommands, rawUrl, githubUrl)
// is composed by catalog.ts at runtime.

export interface CuratedSkillEntry {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  area: SkillArea;
  icon?: string;
  isEntry?: boolean;
  isNew?: boolean;
}

// ── Canonical 42-entry curated list (D28) ────────────────────────────────────

/** Curated metadata for all 42 agent skills. Source-of-truth for the catalog. */
export const CURATED_SKILLS: CuratedSkillEntry[] = [
  // ── API Skills (22) ─────────────────────────────────────────────────────────

  {
    id: "omni-auth",
    name: "Authentication",
    description:
      "Manage API key authentication and session tokens. Start here to authenticate requests via Bearer token, obtain session cookies, and configure login requirements for the OmniRoute API.",
    category: "api",
    area: "auth",
    icon: "lock",
    isEntry: true,
  },
  {
    id: "omni-providers",
    name: "Providers",
    description:
      "Manage provider connections, API keys, OAuth flows, and connection tests via the REST API. List, add, update, remove, and test AI provider integrations (OpenAI, Anthropic, Gemini, and 160+).",
    category: "api",
    area: "providers",
    icon: "key",
  },
  {
    id: "omni-models",
    name: "Models",
    description:
      "Query available AI models across all configured providers. List models, resolve model aliases, and browse the full model catalog including provider-specific variants.",
    category: "api",
    area: "models",
    icon: "neurology",
  },
  {
    id: "omni-combos-routing",
    name: "Combos & Routing",
    description:
      "Create and manage routing combos with 14 strategies (priority, weighted, round-robin, Auto-combo, etc.). Configure fallback chains, test routing outcomes, and retrieve combo metrics.",
    category: "api",
    area: "combos-routing",
    icon: "route",
    isNew: true,
  },
  {
    id: "omni-api-keys",
    name: "API Keys",
    description:
      "Create, list, rotate, and revoke OmniRoute API keys. Control per-key scopes, spending limits, and expiration. Keys gate access to all proxy and management endpoints.",
    category: "api",
    area: "api-keys",
    icon: "vpn_key",
  },
  {
    id: "omni-usage-logs",
    name: "Usage & Logs",
    description:
      "Access detailed call logs and usage analytics. Filter by provider, model, time range, status, and cost. Export logs and aggregate token usage across all connections.",
    category: "api",
    area: "usage-logs",
    icon: "bar_chart",
  },
  {
    id: "omni-budget",
    name: "Budget & Rate Limits",
    description:
      "Configure spending limits, token quotas, and rate-limit policies per API key or globally. Inspect current consumption and enforce cost controls across providers.",
    category: "api",
    area: "budget",
    icon: "savings",
  },
  {
    id: "omni-settings",
    name: "Settings",
    description:
      "Read and update global application settings: system prompts, thinking budget, IP filters, payload rules, combo defaults, and require-login configuration.",
    category: "api",
    area: "settings",
    icon: "settings",
  },
  {
    id: "omni-proxies",
    name: "Proxy Configuration",
    description:
      "Configure HTTP/HTTPS/SOCKS proxies for upstream provider requests. Set per-provider or global proxy rules, test connectivity, and manage proxy rotation.",
    category: "api",
    area: "proxies",
    icon: "swap_horiz",
  },
  {
    id: "omni-cache",
    name: "Cache",
    description:
      "Manage the LLM response cache. View cache statistics, clear entries, configure TTL policies, and control semantic-similarity caching thresholds.",
    category: "api",
    area: "cache",
    icon: "cached",
  },
  {
    id: "omni-compression",
    name: "Compression",
    description:
      "Configure RTK (command output), Caveman (prose), and stacked compression modes. Manage language packs, custom rules, and test prompt compression reducing tokens by 60–90%.",
    category: "api",
    area: "compression",
    icon: "compress",
    isNew: true,
  },
  {
    id: "omni-context-rtk",
    name: "Context & RTK",
    description:
      "Configure RTK filters, context engineering rules, and context relay settings. Test compression with real prompt samples and manage context transformation pipelines.",
    category: "api",
    area: "context-rtk",
    icon: "data_object",
    isNew: true,
  },
  {
    id: "omni-resilience",
    name: "Resilience & Monitoring",
    description:
      "Monitor provider health, circuit-breaker states, p50/p95/p99 latency metrics, and budget guard alerts. Inspect connection cooldowns and model lockouts in real time.",
    category: "api",
    area: "resilience",
    icon: "monitor_heart",
    isNew: true,
  },
  {
    id: "omni-cli-tools",
    name: "CLI Tools",
    description:
      "Manage CLI tool integrations exposed via the API. List, configure, and invoke CLI tool plugins that extend OmniRoute's automation surface.",
    category: "api",
    area: "cli-tools",
    icon: "terminal",
  },
  {
    id: "omni-tunnels",
    name: "Tunnels",
    description:
      "Create and manage secure tunnels (ngrok, Cloudflare Tunnel, custom) to expose OmniRoute to the internet or share access with remote agents and CI pipelines.",
    category: "api",
    area: "tunnels",
    icon: "vpn_lock",
  },
  {
    id: "omni-sync-cloud",
    name: "Cloud Sync",
    description:
      "Synchronise OmniRoute configuration, provider connections, and settings to/from cloud storage. Manage cloud worker authentication and remote backup targets.",
    category: "api",
    area: "sync-cloud",
    icon: "cloud_sync",
  },
  {
    id: "omni-db-backups",
    name: "Database & Backups",
    description:
      "Trigger system backups, restore from backup files, and manage the SQLite database lifecycle. Supports export, import, and incremental snapshot strategies.",
    category: "api",
    area: "db-backups",
    icon: "backup",
  },
  {
    id: "omni-webhooks",
    name: "Webhooks",
    description:
      "Register, list, test, and remove webhook endpoints. Configure event subscriptions (request.completed, provider.error, budget.exceeded, etc.) and manage delivery retries.",
    category: "api",
    area: "webhooks",
    icon: "webhook",
  },
  {
    id: "omni-mcp",
    name: "MCP Server",
    description:
      "Connect to the OmniRoute MCP server (37 tools, 3 transports: SSE/stdio/HTTP). Covers routing, cache, compression, memory, skills, providers, and audit tools across 16 permission scopes.",
    category: "api",
    area: "mcp",
    icon: "electrical_services",
  },
  {
    id: "omni-agents-a2a",
    name: "Agents & A2A Protocol",
    description:
      "Interact with OmniRoute via JSON-RPC 2.0 agent-to-agent protocol. 6 built-in A2A skills: smart-routing, quota-management, provider-discovery, cost-analysis, health-report, list-capabilities.",
    category: "api",
    area: "agents-a2a",
    icon: "device_hub",
  },
  {
    id: "omni-version-manager",
    name: "Version Manager",
    description:
      "Install, start, stop, restart, and update embedded services (9Router, CLIProxyAPI). Monitor service status, retrieve logs, and configure auto-start for local-only service endpoints.",
    category: "api",
    area: "version-manager",
    icon: "manage_history",
  },
  {
    id: "omni-inference",
    name: "Inference (OpenAI-compatible)",
    description:
      "The core OpenAI-compatible inference endpoints: chat completions, embeddings, images, audio (TTS/STT), moderations, rerank, and the Responses API. The primary integration surface for AI agents.",
    category: "api",
    area: "inference",
    icon: "hub",
  },

  // ── CLI Skills (20) ──────────────────────────────────────────────────────────

  {
    id: "cli-serve",
    name: "CLI: Serve",
    description:
      "Start, stop, and restart the OmniRoute server from the CLI. Manage daemon mode, port configuration, auto-recovery, system tray integration, and the dashboard open shortcut.",
    category: "cli",
    area: "cli-serve",
    icon: "play_circle",
    isEntry: true,
  },
  {
    id: "cli-health",
    name: "CLI: Health",
    description:
      "Check server health, component status, and live metrics from the CLI. Run `health`, `health components`, and `health watch` for a real-time dashboard of circuit breakers and provider status.",
    category: "cli",
    area: "cli-health",
    icon: "favorite",
  },
  {
    id: "cli-providers",
    name: "CLI: Providers",
    description:
      "Manage provider connections from the CLI: list available/configured providers, add, test, test-all, validate, rotate API keys, and view per-provider metrics.",
    category: "cli",
    area: "cli-providers",
    icon: "key",
  },
  {
    id: "cli-keys",
    name: "CLI: API Keys",
    description:
      "Create, list, rotate, and revoke OmniRoute API keys from the CLI. Manage OAuth flows for provider authentication and inspect key scopes and expiration.",
    category: "cli",
    area: "cli-keys",
    icon: "vpn_key",
  },
  {
    id: "cli-models",
    name: "CLI: Models",
    description:
      "Query available AI models, list model aliases, and browse the full model catalog from the CLI. Filter by provider, search by capability, and resolve model name variants.",
    category: "cli",
    area: "cli-models",
    icon: "neurology",
  },
  {
    id: "cli-chat",
    name: "CLI: Chat",
    description:
      "Send chat completions, stream responses, and start an interactive REPL session from the CLI. Supports all OmniRoute providers, combo routing, and system prompt configuration.",
    category: "cli",
    area: "cli-chat",
    icon: "chat",
  },
  {
    id: "cli-routing",
    name: "CLI: Routing & Combos",
    description:
      "Create, list, update, and delete routing combos from the CLI. Test routing strategies, inspect combo metrics, and configure fallback chains interactively.",
    category: "cli",
    area: "cli-routing",
    icon: "route",
  },
  {
    id: "cli-resilience",
    name: "CLI: Resilience & Quotas",
    description:
      "Inspect and manage circuit-breaker states, connection cooldowns, quota limits, and backoff levels from the CLI. Reset stuck providers and configure resilience thresholds.",
    category: "cli",
    area: "cli-resilience",
    icon: "monitor_heart",
  },
  {
    id: "cli-compression",
    name: "CLI: Compression",
    description:
      "Configure and test prompt compression from the CLI. Manage RTK filters, Caveman rules, stacked compression modes, and preview compression output with real prompts.",
    category: "cli",
    area: "cli-compression",
    icon: "compress",
  },
  {
    id: "cli-contexts",
    name: "CLI: Contexts & Sessions",
    description:
      "Manage context engineering configurations, RTK filter sets, and conversation sessions from the CLI. Apply context-relay settings and inspect active context pipelines.",
    category: "cli",
    area: "cli-contexts",
    icon: "data_object",
  },
  {
    id: "cli-cost-usage",
    name: "CLI: Cost & Usage",
    description:
      "View cost breakdowns, token usage, and call logs from the CLI. Filter by provider, model, or date range. Export usage reports and inspect per-connection spending.",
    category: "cli",
    area: "cli-cost-usage",
    icon: "savings",
  },
  {
    id: "cli-mcp",
    name: "CLI: MCP",
    description:
      "Inspect the MCP server status, list registered tools and scopes, run tool invocations, and manage MCP audit logs from the CLI.",
    category: "cli",
    area: "cli-mcp",
    icon: "electrical_services",
  },
  {
    id: "cli-a2a",
    name: "CLI: A2A Protocol",
    description:
      "Interact with the OmniRoute A2A server from the CLI. Send tasks, inspect skill execution history, and test the JSON-RPC 2.0 agent-to-agent protocol interactively.",
    category: "cli",
    area: "cli-a2a",
    icon: "device_hub",
  },
  {
    id: "cli-tunnel",
    name: "CLI: Tunnels",
    description:
      "Start and stop tunnel connections (ngrok, Cloudflare, custom) from the CLI. Inspect active tunnel URLs, configure authentication, and test external reachability.",
    category: "cli",
    area: "cli-tunnel",
    icon: "vpn_lock",
  },
  {
    id: "cli-backup-sync",
    name: "CLI: Backup & Sync",
    description:
      "Backup and restore OmniRoute data from the CLI. Trigger incremental snapshots, sync to cloud storage, manage backup schedules, and restore from archive files.",
    category: "cli",
    area: "cli-backup-sync",
    icon: "backup",
  },
  {
    id: "cli-policy-audit",
    name: "CLI: Policy & Audit",
    description:
      "Inspect audit logs, manage access policies, view telemetry data, and review request history from the CLI. Filter by event type, user, or time range for compliance workflows.",
    category: "cli",
    area: "cli-policy-audit",
    icon: "policy",
  },
  {
    id: "cli-batches",
    name: "CLI: Batches & Files",
    description:
      "Submit and monitor batch inference jobs from the CLI. Upload and manage files for batch processing, retrieve results, and integrate batch pipelines with CI/CD workflows.",
    category: "cli",
    area: "cli-batches",
    icon: "batch_prediction",
  },
  {
    id: "cli-eval",
    name: "CLI: Evals",
    description:
      "Create and run evaluation suites, watch live benchmark progress, view scorecards, compare model performance, and integrate eval runs with CI workflows from the CLI.",
    category: "cli",
    area: "cli-eval",
    icon: "science",
  },
  {
    id: "cli-plugins-skills",
    name: "CLI: Plugins, Skills & Memory",
    description:
      "Manage Omni Skills (list, install, test, remove), plugins (create, configure), and persistent memory (search, add, clear) from the CLI.",
    category: "cli",
    area: "cli-plugins-skills",
    icon: "extension",
  },
  {
    id: "cli-setup",
    name: "CLI: Setup & Config",
    description:
      "Run initial setup, configure global CLI settings, manage environment variables, check for updates, and configure autostart via the CLI setup and config commands.",
    category: "cli",
    area: "cli-setup",
    icon: "build",
  },

  // ── Config Skills ────────────────────────────────────────────────────────────

  {
    id: "config-codex-cli",
    name: "Config: Codex CLI",
    description:
      "Step-by-step agent workflow to configure the OpenAI Codex CLI on any machine (Linux, macOS, Windows) to use OmniRoute as an OpenAI-compatible backend. Detects OS and shell, writes config.toml and 7 named profiles, sets environment variables, and verifies the setup.",
    category: "config",
    area: "config-codex-cli",
    icon: "terminal",
    isNew: true,
  },
];

