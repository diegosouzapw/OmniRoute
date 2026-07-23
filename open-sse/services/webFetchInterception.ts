/**
 * webFetchInterception.ts — provider-native `web_fetch` tool interception (#7339,
 * Phase 3-4 of #3384). Structural twin of webSearchFallback.ts: pure request-body /
 * tool-array transformation only, no HTTP fetch, no streaming/SSE, no abort-signal
 * handling here. Rewrites a provider-native `web_fetch` tool declaration into a
 * synthetic `omniroute_web_fetch` function tool; the actual `/v1/web/fetch` call
 * happens later, once the model emits that synthetic tool call, through the existing
 * generic tool-call execution path (@/lib/skills/interception::handleToolCallExecution).
 */

import { FORMATS } from "../translator/formats.ts";

export const OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME = "omniroute_web_fetch";
// "web_fetch" mirrors the Responses-API-style built-in tool type convention already
// used for web_search; "web_fetch_20250910" is Anthropic's dated server-tool type.
const WEB_FETCH_TOOL_TYPES = new Set(["web_fetch", "web_fetch_20250910"]);

type JsonRecord = Record<string, unknown>;

export interface WebFetchFallbackPlan {
  enabled: boolean;
  toolName: string | null;
  convertedToolCount: number;
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function isBuiltInWebFetchTool(tool: unknown): tool is JsonRecord {
  const toolRecord = toRecord(tool);
  const toolType = typeof toolRecord.type === "string" ? toolRecord.type : "";
  return WEB_FETCH_TOOL_TYPES.has(toolType) && !toolRecord.function;
}

function isBuiltInWebFetchToolChoice(toolChoice: unknown): boolean {
  const choice = toRecord(toolChoice);
  const toolType = typeof choice.type === "string" ? choice.type : "";
  return WEB_FETCH_TOOL_TYPES.has(toolType);
}

function buildFallbackParameters(): JsonRecord {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      url: {
        type: "string",
        description: "The URL to fetch and extract content from.",
      },
      format: {
        type: "string",
        enum: ["markdown", "html", "links", "screenshot"],
        description: "Desired output format. Defaults to markdown.",
      },
      include_metadata: {
        type: "boolean",
        description: "Whether to include page metadata (title, description) in the result.",
      },
    },
    required: ["url"],
  };
}

function buildFallbackTool(targetFormat?: string | null): JsonRecord {
  const name = OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME;
  const description = [
    "Fetch and extract the content of a specific URL.",
    "Use this when the user references a URL or asks you to read or summarize a specific page.",
  ].join(" ");
  const parameters = buildFallbackParameters();

  // Responses API expects FLAT function tools ({ type, name, parameters }), whereas
  // Chat Completions expects NESTED ({ type, function: { name, parameters } }) — see
  // the identical note in webSearchFallback.ts (issue #2390).
  if (targetFormat === FORMATS.OPENAI_RESPONSES) {
    return { type: "function", name, description, parameters };
  }

  return {
    type: "function",
    function: { name, description, parameters },
  };
}

export function supportsNativeWebFetchFallbackBypass({
  interceptFetchOverride,
}: {
  provider?: string | null;
  sourceFormat?: string | null;
  targetFormat: string | null | undefined;
  nativeCodexPassthrough: boolean;
  // Per-model rule (#3384/#7339) — resolveInterceptFetch() in src/lib/db/interceptionRules.ts.
  // true = force interception; anything else (false/undefined, i.e. no operator
  // opt-in) = native passthrough. Unlike its interceptSearch sibling — which
  // predates #3384's opt-in rule and mirrors the older native-bypass heuristics
  // by default — web_fetch interception is BRAND NEW behavior (#7339), so it
  // stays strictly opt-in with no heuristic default: a request with no
  // interceptFetch DB row configured is byte-identical to pre-#7339 behavior
  // (the tool array is never touched), per Hard Rule #20's "opt-in, never
  // default-on" precedent and the zero-overhead-when-disabled requirement.
  interceptFetchOverride?: boolean;
}): boolean {
  return interceptFetchOverride !== true;
}

export function prepareWebFetchFallbackBody<T extends JsonRecord>(
  body: T,
  options: {
    provider?: string | null;
    sourceFormat?: string | null;
    targetFormat?: string | null;
    nativeCodexPassthrough: boolean;
    interceptFetchOverride?: boolean;
  }
): { body: T; fallback: WebFetchFallbackPlan } {
  const tools = Array.isArray(body.tools) ? body.tools : null;
  if (!tools || tools.length === 0) {
    return {
      body,
      fallback: { enabled: false, toolName: null, convertedToolCount: 0 },
    };
  }

  const builtInFetchTools = tools.filter(isBuiltInWebFetchTool);
  if (builtInFetchTools.length === 0) {
    return {
      body,
      fallback: { enabled: false, toolName: null, convertedToolCount: 0 },
    };
  }

  if (supportsNativeWebFetchFallbackBypass(options)) {
    return {
      body,
      fallback: { enabled: false, toolName: null, convertedToolCount: 0 },
    };
  }

  const toolNames = new Set<string>();
  const preservedTools = tools.filter((tool) => {
    if (isBuiltInWebFetchTool(tool)) return false;
    const toolRecord = toRecord(tool);
    const functionRecord = toRecord(toolRecord.function);
    const name =
      typeof functionRecord.name === "string"
        ? functionRecord.name
        : typeof toolRecord.name === "string"
          ? toolRecord.name
          : "";
    if (name.trim().length > 0) {
      toolNames.add(name.trim());
    }
    return true;
  });

  const isResponsesTarget = options.targetFormat === FORMATS.OPENAI_RESPONSES;

  if (!toolNames.has(OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME)) {
    preservedTools.unshift(buildFallbackTool(options.targetFormat));
  }

  const nextBody: T = {
    ...body,
    tools: preservedTools as T["tools"],
  };

  if (isBuiltInWebFetchToolChoice(body.tool_choice)) {
    nextBody.tool_choice = (
      isResponsesTarget
        ? { type: "function", name: OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME }
        : { type: "function", function: { name: OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME } }
    ) as T["tool_choice"];
  }

  return {
    body: nextBody,
    fallback: {
      enabled: true,
      toolName: OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME,
      convertedToolCount: builtInFetchTools.length,
    },
  };
}
