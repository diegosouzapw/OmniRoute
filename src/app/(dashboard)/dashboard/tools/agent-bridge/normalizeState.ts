import type {
  AgentBridgePageData,
  AgentBridgeServerState,
  AgentStateEntry,
  AgentMappingsMap,
} from "./AgentBridgePageClient";

function defaultServerState(): AgentBridgeServerState {
  return {
    running: false,
    port: 443,
    certTrusted: false,
    upstreamCa: null,
    lastStartedAt: null,
    activeConns: 0,
    interceptedCount: 0,
  };
}

export const DEFAULT_AGENT_BRIDGE_STATE: AgentBridgePageData = {
  serverState: defaultServerState(),
  agentStates: [],
  bypassPatterns: [],
  mappings: {},
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Normalize whatever `/api/tools/agent-bridge/state` returns into the shape the
 * page/components require, ALWAYS returning a well-formed object (#3318).
 *
 * The page previously assigned the raw response straight into `initialData`, but
 * the route returns `{ server, agents }` while the UI reads
 * `{ serverState, agentStates, bypassPatterns, mappings }` — leaving
 * `serverState` undefined and crashing `serverState.running`.
 *
 * This maps the known server fields through (incl. the legacy `server` key →
 * `serverState`, `server.certExists` → `certTrusted`) and falls back to safe
 * defaults for everything else, so the page renders instead of crashing.
 * Note: the legacy `agents` payload has a different per-entry shape than
 * `AgentStateEntry`, so it is intentionally NOT coerced — `agentStates` defaults
 * to `[]` unless the response already provides the correct `agentStates` key.
 */
export function normalizeAgentBridgeState(raw: unknown): AgentBridgePageData {
  if (!isRecord(raw)) return { ...DEFAULT_AGENT_BRIDGE_STATE, serverState: defaultServerState() };

  const serverState = defaultServerState();
  const source = isRecord(raw.serverState)
    ? raw.serverState
    : isRecord(raw.server)
      ? raw.server
      : undefined;
  if (source) {
    if (typeof source.running === "boolean") serverState.running = source.running;
    if (typeof source.port === "number") serverState.port = source.port;
    // accept both the canonical `certTrusted` and the legacy `certExists`
    if (typeof source.certTrusted === "boolean") serverState.certTrusted = source.certTrusted;
    else if (typeof source.certExists === "boolean") serverState.certTrusted = source.certExists;
    if (typeof source.upstreamCa === "string") serverState.upstreamCa = source.upstreamCa;
    if (typeof source.lastStartedAt === "string") serverState.lastStartedAt = source.lastStartedAt;
    if (typeof source.activeConns === "number") serverState.activeConns = source.activeConns;
    if (typeof source.interceptedCount === "number") {
      serverState.interceptedCount = source.interceptedCount;
    }
  }

  return {
    serverState,
    agentStates: Array.isArray(raw.agentStates) ? (raw.agentStates as AgentStateEntry[]) : [],
    bypassPatterns: Array.isArray(raw.bypassPatterns) ? (raw.bypassPatterns as string[]) : [],
    mappings: isRecord(raw.mappings) ? (raw.mappings as AgentMappingsMap) : {},
  };
}
