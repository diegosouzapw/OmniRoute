import { FORMATS } from "../translator/formats.ts";

export const OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME = "omniroute_web_search";
const WEB_SEARCH_TOOL_TYPES = new Set(["web_search", "web_search_preview"]);
const SEARCH_CONTEXT_DEFAULTS: Record<string, number> = {
  low: 5,
  medium: 8,
  high: 10,
};

type JsonRecord = Record<string, unknown>;

export interface WebSearchFallbackPlan {
  enabled: boolean;
  toolName: string | null;
  convertedToolCount: number;
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function isBuiltInWebSearchTool(tool: unknown): tool is JsonRecord {
  const toolRecord = toRecord(tool);
  const toolType = typeof toolRecord.type === "string" ? toolRecord.type : "";
  return WEB_SEARCH_TOOL_TYPES.has(toolType) && !toolRecord.function;
}

function isBuiltInWebSearchToolChoice(toolChoice: unknown): boolean {
  const choice = toRecord(toolChoice);
  const toolType = typeof choice.type === "string" ? choice.type : "";
  return WEB_SEARCH_TOOL_TYPES.has(toolType);
}

function buildFallbackDescription(tool: JsonRecord): string {
  const externalWebAccess = tool.external_web_access !== false;
  const contextSize =
    typeof tool.search_context_size === "string"
      ? tool.search_context_size.trim().toLowerCase()
      : "";
  const defaultMaxResults = SEARCH_CONTEXT_DEFAULTS[contextSize] || SEARCH_CONTEXT_DEFAULTS.medium;
  const accessMode = externalWebAccess ? "public web" : "configured search index";

  return [
    `Search the ${accessMode} for recent, factual information and return cited results.`,
    "Use this when the answer depends on current events, external documents, or fresh facts.",
    `If max_results is omitted, prefer about ${defaultMaxResults} results.`,
  ].join(" ");
}

function buildFallbackParameters(tool: JsonRecord): JsonRecord {
  const contextSize =
    typeof tool.search_context_size === "string"
      ? tool.search_context_size.trim().toLowerCase()
      : "";
  const defaultMaxResults = SEARCH_CONTEXT_DEFAULTS[contextSize] || SEARCH_CONTEXT_DEFAULTS.medium;

  return {
    type: "object",
    additionalProperties: false,
    properties: {
      query: {
        type: "string",
        description: "The web search query to execute.",
      },
      search_type: {
        type: "string",
        enum: ["web", "news"],
        description: "Use 'news' for recent headlines or reporting; otherwise use 'web'.",
      },
      max_results: {
        type: "integer",
        minimum: 1,
        maximum: 20,
        default: defaultMaxResults,
        description: "Maximum number of results to retrieve.",
      },
      country: {
        type: "string",
        description: "Optional 2-letter country code for localization, e.g. US or BR.",
      },
      language: {
        type: "string",
        description: "Optional language code such as en or pt-BR.",
      },
      time_range: {
        type: "string",
        enum: ["any", "day", "week", "month", "year"],
        description: "Optional recency filter.",
      },
      filters: {
        type: "object",
        additionalProperties: false,
        properties: {
          include_domains: {
            type: "array",
            items: { type: "string" },
            description: "Optional list of domains to include.",
          },
          exclude_domains: {
            type: "array",
            items: { type: "string" },
            description: "Optional list of domains to exclude.",
          },
        },
      },
    },
    required: ["query"],
  };
}

function buildFallbackTool(tool: JsonRecord, targetFormat?: string | null): JsonRecord {
  const name = OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME;
  const description = buildFallbackDescription(tool);
  const parameters = buildFallbackParameters(tool);

  // Responses API expects FLAT function tools ({ type, name, parameters }), whereas
  // Chat Completions expects NESTED ({ type, function: { name, parameters } }). On the
  // Responses→Responses passthrough path nothing flattens the injected tool, so a nested
  // shape reaches the upstream as `tools[0].function.name` and is rejected with
  // "Missing required parameter: 'tools[0].name'." (issue #2390).
  if (targetFormat === FORMATS.OPENAI_RESPONSES) {
    return { type: "function", name, description, parameters };
  }

  return {
    type: "function",
    function: { name, description, parameters },
  };
}

export function supportsNativeWebSearchFallbackBypass({
  sourceFormat,
  targetFormat,
  nativeCodexPassthrough,
}: {
  provider?: string | null;
  sourceFormat?: string | null;
  targetFormat: string | null | undefined;
  nativeCodexPassthrough: boolean;
}): boolean {
  // Native Codex (OpenAI Responses) passthrough: the upstream runs web search itself.
  if (nativeCodexPassthrough) return true;
  // Gemini target: the Gemini translator maps built-in web search to googleSearch natively.
  if (targetFormat === FORMATS.GEMINI) return true;
  // Claude -> Claude passthrough: the Anthropic Messages upstream (e.g. a Claude
  // subscription driven by Claude Code) natively runs web_search_20250305. Forward the
  // native tool untouched instead of rewriting it to omniroute_web_search. Mirrors the
  // Codex/Gemini bypasses so every native-web-search provider is treated symmetrically.
  if (sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE) return true;
  return false;
}

export function prepareWebSearchFallbackBody<T extends JsonRecord>(
  body: T,
  options: {
    provider?: string | null;
    sourceFormat?: string | null;
    targetFormat?: string | null;
    nativeCodexPassthrough: boolean;
  }
): { body: T; fallback: WebSearchFallbackPlan } {
  const tools = Array.isArray(body.tools) ? body.tools : null;
  if (!tools || tools.length === 0) {
    return {
      body,
      fallback: { enabled: false, toolName: null, convertedToolCount: 0 },
    };
  }

  const builtInSearchTools = tools.filter(isBuiltInWebSearchTool);
  if (builtInSearchTools.length === 0) {
    return {
      body,
      fallback: { enabled: false, toolName: null, convertedToolCount: 0 },
    };
  }

  if (supportsNativeWebSearchFallbackBypass(options)) {
    return {
      body,
      fallback: { enabled: false, toolName: null, convertedToolCount: 0 },
    };
  }

  const toolNames = new Set<string>();
  const preservedTools = tools.filter((tool) => {
    if (isBuiltInWebSearchTool(tool)) return false;
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

  if (!toolNames.has(OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME)) {
    preservedTools.unshift(
      buildFallbackTool(toRecord(builtInSearchTools[0]), options.targetFormat)
    );
  }

  const nextBody: T = {
    ...body,
    tools: preservedTools as T["tools"],
  };

  if (isBuiltInWebSearchToolChoice(body.tool_choice)) {
    // Match the injected tool shape: flat for Responses API, nested for Chat Completions.
    nextBody.tool_choice = (
      isResponsesTarget
        ? { type: "function", name: OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME }
        : { type: "function", function: { name: OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME } }
    ) as T["tool_choice"];
  }

  return {
    body: nextBody,
    fallback: {
      enabled: true,
      toolName: OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME,
      convertedToolCount: builtInSearchTools.length,
    },
  };
}
