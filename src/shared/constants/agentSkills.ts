// Agent Skills metadata — single source of truth for /dashboard/agent-skills.
// Each skill = 1 raw GitHub URL the user copies and pastes to any AI agent.

const REPO = "diegosouzapw/OmniRoute";
const BRANCH = "main";
const SKILL_PATH = "skills";

export const AGENT_SKILLS_REPO_URL = `https://github.com/${REPO}`;
export const AGENT_SKILLS_RAW_BASE = `https://raw.githubusercontent.com/${REPO}/refs/heads/${BRANCH}/${SKILL_PATH}`;
export const AGENT_SKILLS_BLOB_BASE = `https://github.com/${REPO}/blob/${BRANCH}/${SKILL_PATH}`;

export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  endpoint: string | null;
  icon: string;
  category: "api" | "cli";
  isEntry?: boolean;
  isNew?: boolean;
}

export const AGENT_SKILLS: AgentSkill[] = [
  // ── API Skills ──────────────────────────────────────────────────────────────
  {
    id: "omniroute",
    name: "OmniRoute (Entry)",
    description:
      "Setup + index of all capabilities. Start here — covers base URL, auth, model discovery, and links to every capability skill.",
    endpoint: null,
    icon: "hub",
    category: "api",
    isEntry: true,
  },
  {
    id: "omniroute-chat",
    name: "Chat",
    description: "Chat / code-gen via OpenAI or Anthropic format with streaming and reasoning.",
    endpoint: "/v1/chat/completions",
    icon: "chat",
    category: "api",
  },
  {
    id: "omniroute-image",
    name: "Image Generation",
    description: "Text-to-image via DALL-E, Imagen, FLUX, MiniMax, SDWebUI, and more.",
    endpoint: "/v1/images/generations",
    icon: "image",
    category: "api",
  },
  {
    id: "omniroute-tts",
    name: "Text-to-Speech",
    description: "OpenAI / ElevenLabs / Edge / Google / Deepgram voices.",
    endpoint: "/v1/audio/speech",
    icon: "record_voice_over",
    category: "api",
  },
  {
    id: "omniroute-stt",
    name: "Speech-to-Text",
    description:
      "Transcribe audio via OpenAI Whisper, Groq, Gemini, Deepgram, AssemblyAI, and more.",
    endpoint: "/v1/audio/transcriptions",
    icon: "mic",
    category: "api",
  },
  {
    id: "omniroute-embeddings",
    name: "Embeddings",
    description: "Vectors for RAG / semantic search via OpenAI, Gemini, Mistral, and more.",
    endpoint: "/v1/embeddings",
    icon: "scatter_plot",
    category: "api",
  },
  {
    id: "omniroute-web-search",
    name: "Web Search",
    description: "Tavily / Exa / Brave / Serper / SearXNG / Google PSE / You.com.",
    endpoint: "/v1/search",
    icon: "search",
    category: "api",
  },
  {
    id: "omniroute-web-fetch",
    name: "Web Fetch",
    description: "URL → markdown / text / HTML via Firecrawl, Jina, Tavily, Exa.",
    endpoint: "/v1/web/fetch",
    icon: "language",
    category: "api",
  },
  {
    id: "omniroute-mcp",
    name: "MCP Server",
    description:
      "37 tools over SSE/stdio/HTTP: routing, cache, compression, memory, skills, providers, audit.",
    endpoint: "/api/mcp/sse",
    icon: "electrical_services",
    category: "api",
  },
  {
    id: "omniroute-a2a",
    name: "A2A Protocol",
    description:
      "JSON-RPC 2.0 agent-to-agent server with 5 built-in skills: smart-routing, quota, discovery, cost, health.",
    endpoint: "/a2a",
    icon: "device_hub",
    category: "api",
  },
  {
    id: "omniroute-routing",
    name: "Routing & Combos",
    description:
      "Create and configure routing combos, 14 strategies, Auto-combo scoring, and fallback chains.",
    endpoint: "/api/combos",
    icon: "route",
    category: "api",
    isNew: true,
  },
  {
    id: "omniroute-compression",
    name: "Compression",
    description:
      "RTK (command output), Caveman (prose), stacked mode, and MCP accessibility-tree filter. Save 60–90% tokens.",
    endpoint: "/api/settings/compression",
    icon: "compress",
    category: "api",
    isNew: true,
  },
  {
    id: "omniroute-monitoring",
    name: "Monitoring & Health",
    description:
      "Health endpoints, circuit breakers, provider metrics (p50/p95/p99), budget guard, and MCP monitoring tools.",
    endpoint: "/api/monitoring/health",
    icon: "monitor_heart",
    category: "api",
    isNew: true,
  },

  // ── CLI Skills ───────────────────────────────────────────────────────────────
  {
    id: "omniroute-cli",
    name: "CLI (Entry)",
    description:
      "Install, global flags (--output, --base-url, --api-key), environment variables, and index of all CLI capability skills.",
    endpoint: null,
    icon: "terminal",
    category: "cli",
    isEntry: true,
    isNew: true,
  },
  {
    id: "omniroute-cli-admin",
    name: "CLI Admin",
    description:
      "Server lifecycle (start/stop/restart), non-interactive setup, doctor diagnostics, backup/restore, autostart, and tunnels.",
    endpoint: null,
    icon: "manage_accounts",
    category: "cli",
    isNew: true,
  },
  {
    id: "omniroute-cli-providers",
    name: "CLI Providers & Keys",
    description:
      "Add/test/remove provider connections, manage API keys, rotate credentials, OAuth flows, list models, and manage combos.",
    endpoint: null,
    icon: "key",
    category: "cli",
    isNew: true,
  },
  {
    id: "omniroute-cli-cloud",
    name: "CLI Cloud Agents",
    description:
      "Control Codex, Devin, and Jules cloud agents — create tasks, track status, approve plans, send messages, and view sources.",
    endpoint: null,
    icon: "cloud_sync",
    category: "cli",
    isNew: true,
  },
  {
    id: "omniroute-cli-eval",
    name: "CLI Evals",
    description:
      "Create and run eval suites, watch live benchmark progress, view scorecards, compare models, and integrate with CI.",
    endpoint: null,
    icon: "science",
    category: "cli",
    isNew: true,
  },
];

export function getAgentSkillRawUrl(id: string): string {
  return `${AGENT_SKILLS_RAW_BASE}/${id}/SKILL.md`;
}

export function getAgentSkillBlobUrl(id: string): string {
  return `${AGENT_SKILLS_BLOB_BASE}/${id}/SKILL.md`;
}
