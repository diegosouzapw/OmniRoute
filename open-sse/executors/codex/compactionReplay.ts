type JsonRecord = Record<string, unknown>;

const WEB_SEARCH_TYPES = new Set([
  "web_search",
  "web_search_preview",
  "web_search_preview_2025_03_11",
]);

function record(value: unknown): JsonRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

/** Only the regular Responses compaction replay, never ordinary turns. */
export function isCodexCompactionWebReplay(body: JsonRecord): boolean {
  const raw = record(body.client_metadata)?.["x-codex-turn-metadata"];
  if (typeof raw !== "string") return false;
  let metadata: JsonRecord | null;
  try {
    metadata = record(JSON.parse(raw));
  } catch {
    return false;
  }
  return (
    metadata?.request_kind === "compaction" &&
    (body.tools === undefined || Array.isArray(body.tools)) &&
    Array.isArray(body.input) &&
    body.input.some((item) => record(item)?.type === "web_search_call")
  );
}

/** Declare the historical tool without permitting a new search or tool call. */
export function ensureCodexCompactionReplayTools(body: JsonRecord, nativeCompact: boolean): void {
  if (nativeCompact || !isCodexCompactionWebReplay(body)) return;
  const tools = (body.tools ?? []) as unknown[];
  if (tools.some((tool) => WEB_SEARCH_TYPES.has(record(tool)?.type as string))) return;
  body.tools = [...tools, { type: "web_search" }];
  body.tool_choice = "none";
}
