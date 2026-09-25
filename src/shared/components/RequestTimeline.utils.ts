import { getHttpStatusStyle } from "@/shared/constants/colors";

export type TimelineRowKind = "llm" | "mcp";

export interface TimelineLog {
  id: string;
  timestamp: string;
  status: number;
  model: string | null;
  provider: string | null;
  account: string | null;
  duration: number;
  tokens: { in: number; out: number };
  active?: boolean;
  completed?: boolean;
  error?: string | null;
  path?: string | null;
  /** Conversation id (X-ConversationId) — same field as call_logs.session_tag. */
  sessionTag?: string | null;
  /** Defaults to llm when omitted so older call-log rows keep packing. */
  kind?: TimelineRowKind;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  toolName?: string | null;
  errorCode?: string | null;
  scopes?: string[];
}

export interface Lane {
  startMs: number;
  endMs: number;
}

export type ViewMode = "follow" | "live" | "pan";

export const VISIBLE_WINDOW_MS = 5 * 60 * 1000;
export const BAR_HEIGHT = 28;
export const LANE_GAP = 4;
export const LANE_HEIGHT = BAR_HEIGHT + LANE_GAP;
export const HEADER_HEIGHT = 48;
export const AXIS_HEIGHT = 32;
export const MIN_BAR_WIDTH = 3;
export const DEFAULT_LIST_POLL_SECONDS = 2;
export const TIMELINE_LIST_POLL_STORAGE_KEY = "timelineListPollSeconds";
export const FOLLOW_LINE_X = 0.75;
export const LIVE_LINE_FRACTION = 0.9;

export function computeBarRange(
  log: TimelineLog,
  nowMs: number
): { startMs: number; endMs: number } {
  const ts = new Date(log.timestamp).getTime();
  if (log.active) return { startMs: ts, endMs: nowMs };
  if (log.completed) return { startMs: ts, endMs: ts + (log.duration || 0) };
  return { startMs: ts - (log.duration || 0), endMs: ts };
}

export const MODE_META: Record<ViewMode, { labelKey: string; descriptionKey: string }> = {
  follow: {
    labelKey: "follow",
    descriptionKey: "followDescription",
  },
  live: {
    labelKey: "now",
    descriptionKey: "nowDescription",
  },
  pan: {
    labelKey: "pan",
    descriptionKey: "panDescription",
  },
};

export function formatTimeAxis(ms: number): string {
  const d = new Date(ms);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  const s = d.getSeconds().toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function getStatusColor(status: number, active: boolean | undefined): string {
  if (active) return "#6366F1";
  return getHttpStatusStyle(status).bg;
}

/** Teal, distinct from the 2xx green used for LLM bars. */
export const MCP_BAR_COLOR = "#0F766E";

export function getTimelineBarColor(log: TimelineLog): string {
  if (log.kind === "mcp" && (log.status || 0) < 400) return MCP_BAR_COLOR;
  return getStatusColor(log.status, log.active);
}

export function mcpAuditId(id: number): string {
  return `mcp:${id}`;
}

export type McpAuditTimelineEntry = {
  id: number;
  toolName: string;
  durationMs: number;
  apiKeyId: string | null;
  success: boolean;
  errorCode?: string | null;
  createdAt: string;
};

export function sqliteTimestampToIso(raw: string): string {
  if (raw.includes("T")) return raw.endsWith("Z") ? raw : `${raw}Z`;
  return `${raw.trim().replace(" ", "T")}Z`;
}

export function mapMcpAuditEntry(
  entry: McpAuditTimelineEntry,
  scopeLookup?: (tool: string) => readonly string[] | undefined
): TimelineLog {
  const toolName = entry.toolName;
  const success = entry.success === true;
  const errorCode = entry.errorCode ?? null;
  return {
    id: mcpAuditId(entry.id),
    timestamp: sqliteTimestampToIso(entry.createdAt),
    status: success ? 200 : 500,
    model: toolName,
    provider: "mcp",
    account: null,
    duration: Number(entry.durationMs) || 0,
    tokens: { in: 0, out: 0 },
    completed: true,
    kind: "mcp",
    apiKeyId: entry.apiKeyId,
    toolName,
    error: success ? null : errorCode || "error",
    errorCode,
    scopes: [...(scopeLookup?.(toolName) ?? [])],
  };
}

export function mergeTimelineLogs(llm: TimelineLog[], mcp: TimelineLog[]): TimelineLog[] {
  const taggedLlm = llm.map((row) => ({ ...row, kind: row.kind ?? "llm" }));
  return [...taggedLlm, ...mcp];
}

export type TimelineFetchUrls = { llm: string; mcp: string | null };

export function timelineFetchUrls(
  selectedApiKey: string,
  knownApiKeyIds: readonly string[] = []
): TimelineFetchUrls {
  const llm = new URLSearchParams({ limit: "200" });
  if (selectedApiKey) llm.set("apiKey", selectedApiKey);
  const llmUrl = `/api/usage/call-logs?${llm.toString()}`;
  if (!selectedApiKey) {
    const mcp = new URLSearchParams({ limit: "200" });
    return { llm: llmUrl, mcp: `/api/mcp/audit?${mcp.toString()}` };
  }
  if (knownApiKeyIds.includes(selectedApiKey)) {
    const mcp = new URLSearchParams({ limit: "200" });
    mcp.set("apiKeyId", selectedApiKey);
    return { llm: llmUrl, mcp: `/api/mcp/audit?${mcp.toString()}` };
  }
  return { llm: llmUrl, mcp: null };
}

export function uniqueApiKeyOptions(logs: TimelineLog[]): string[] {
  return [
    ...new Set(
      logs
        .map((row) => row.apiKeyId || row.apiKeyName)
        .filter((value): value is string => typeof value === "string" && value.length > 0)
    ),
  ].sort();
}

export function uniqueApiKeyIds(logs: TimelineLog[]): string[] {
  return [
    ...new Set(
      logs
        .map((row) => row.apiKeyId)
        .filter((value): value is string => typeof value === "string" && value.length > 0)
    ),
  ];
}

export function mergeApiKeyOptions(
  seen: readonly string[],
  logs: TimelineLog[],
  selectedApiKey = ""
): string[] {
  const extra = selectedApiKey ? [selectedApiKey] : [];
  return [...new Set([...seen, ...uniqueApiKeyOptions(logs), ...extra])]
    .filter((value) => value.length > 0)
    .sort();
}

export type TimelineLoadResult = {
  logs: TimelineLog[];
  llmOk: boolean;
  /**
   * True when this poll's MCP rows are authoritative: a live MCP fetch
   * succeeded, or the name-only filter skipped MCP on purpose (empty list).
   * False only when a live MCP fetch failed; nextTimelineLogs then keeps
   * the previous MCP bars.
   */
  mcpOk: boolean;
};

export function rememberApiKeysFromPoll(
  knownIds: readonly string[],
  seenOptions: readonly string[],
  result: TimelineLoadResult,
  selectedApiKey = ""
): { knownIds: string[]; seenOptions: string[] } {
  if (!result.llmOk && !result.mcpOk) {
    return { knownIds: [...knownIds], seenOptions: [...seenOptions] };
  }
  return {
    knownIds: [...new Set([...knownIds, ...uniqueApiKeyIds(result.logs)])],
    seenOptions: mergeApiKeyOptions(seenOptions, result.logs, selectedApiKey),
  };
}

export type TimelineFetch = (url: string) => Promise<{
  ok: boolean;
  json: () => Promise<unknown>;
}>;

function asTimelineLogs(value: unknown): TimelineLog[] {
  return Array.isArray(value) ? (value as TimelineLog[]) : [];
}

function asMcpEntries(value: unknown): McpAuditTimelineEntry[] {
  if (!value || typeof value !== "object") return [];
  const entries = (value as { entries?: unknown }).entries;
  if (!Array.isArray(entries)) return [];
  return entries.filter(
    (entry): entry is McpAuditTimelineEntry =>
      Boolean(entry) &&
      typeof entry === "object" &&
      typeof (entry as McpAuditTimelineEntry).id === "number" &&
      typeof (entry as McpAuditTimelineEntry).toolName === "string"
  );
}

export function nextTimelineLogs(
  current: TimelineLog[],
  result: TimelineLoadResult
): TimelineLog[] {
  const currentLlm = current.filter((row) => row.kind !== "mcp");
  const currentMcp = current.filter((row) => row.kind === "mcp");
  const freshLlm = result.logs.filter((row) => row.kind !== "mcp");
  const freshMcp = result.logs.filter((row) => row.kind === "mcp");
  return [
    ...(result.llmOk ? freshLlm : currentLlm),
    ...(result.mcpOk ? freshMcp : currentMcp),
  ];
}

export async function loadTimelineLogs(
  fetchImpl: TimelineFetch,
  selectedApiKey = "",
  scopeLookup?: (tool: string) => readonly string[] | undefined,
  knownApiKeyIds: readonly string[] = []
): Promise<TimelineLoadResult> {
  const urls = timelineFetchUrls(selectedApiKey, knownApiKeyIds);
  const llmPromise = fetchImpl(urls.llm)
    .then(async (res) => {
      if (!res.ok) return { ok: false as const, logs: [] as TimelineLog[] };
      return { ok: true as const, logs: asTimelineLogs(await res.json()) };
    })
    .catch(() => ({ ok: false as const, logs: [] as TimelineLog[] }));
  const mcpPromise = urls.mcp
    ? fetchImpl(urls.mcp)
        .then(async (res) => {
          if (!res.ok) return { ok: false as const, logs: [] as TimelineLog[] };
          return {
            ok: true as const,
            logs: asMcpEntries(await res.json()).map((entry) =>
              mapMcpAuditEntry(entry, scopeLookup)
            ),
          };
        })
        .catch(() => ({ ok: false as const, logs: [] as TimelineLog[] }))
    : Promise.resolve({ ok: true as const, logs: [] as TimelineLog[] });
  const [llm, mcp] = await Promise.all([llmPromise, mcpPromise]);
  return {
    logs: mergeTimelineLogs(llm.logs, mcp.logs),
    llmOk: llm.ok,
    mcpOk: mcp.ok,
  };
}

export const DEFAULT_CONVERSATION_LANE_REUSE_WINDOW_MS = 2 * 60 * 1000;

// Exported so other components (e.g. the "Full Conversation" transcript panel
// in RequestLoggerDetail.tsx) can decide "is this conversation still in
// progress" using the SAME setting as the timeline's lane-reuse window,
// rather than a separate, potentially-inconsistent one.
export const CONVERSATION_LANE_REUSE_STORAGE_KEY = "timelineConversationLaneReuseMinutes";

/**
 * Assigns each item a lane (row) index. Items sharing a `sessionTag`
 * (conversation id) are forced onto the same lane as long as the gap since
 * that lane's last item is within `reuseWindowMs` — after that, the lane is
 * free again and falls back to the normal greedy overlap-avoidance packing
 * below (unrelated to any conversation).
 */
export function allocateLanes(
  items: TimelineLog[],
  nowMs: number,
  reuseWindowMs: number = DEFAULT_CONVERSATION_LANE_REUSE_WINDOW_MS
): Map<string, number> {
  const lanes: Lane[] = [];
  const laneConversation: (string | null)[] = [];
  const laneMap = new Map<string, number>();

  const sorted = [...items].sort((a, b) => {
    const aStart = new Date(a.timestamp).getTime();
    const bStart = new Date(b.timestamp).getTime();
    return aStart - bStart;
  });

  for (const item of sorted) {
    const { startMs, endMs } = computeBarRange(item, nowMs);
    const conversationId = item.sessionTag || null;

    let placed = false;

    if (conversationId) {
      for (let i = 0; i < lanes.length; i++) {
        if (laneConversation[i] === conversationId && startMs - lanes[i].endMs <= reuseWindowMs) {
          lanes[i] = { startMs, endMs };
          laneMap.set(item.id, i);
          placed = true;
          break;
        }
      }
    }

    if (!placed) {
      for (let i = 0; i < lanes.length; i++) {
        if (lanes[i].endMs < startMs) {
          lanes[i] = { startMs, endMs };
          laneConversation[i] = conversationId;
          laneMap.set(item.id, i);
          placed = true;
          break;
        }
      }
    }
    if (!placed) {
      laneMap.set(item.id, lanes.length);
      laneConversation.push(conversationId);
      lanes.push({ startMs, endMs });
    }
  }

  return laneMap;
}

export function truncateModel(model: string | null): string {
  if (!model) return "";
  const parts = model.split("/");
  const short = parts[parts.length - 1];
  return short.length > 16 ? short.slice(0, 15) + "…" : short;
}

export function formatDateLabel(ms: number): string {
  const d = new Date(ms);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}
