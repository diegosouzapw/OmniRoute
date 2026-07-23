// Grok native-tool selection + native->OpenAI mapping (pure). Verbatim from grok-web.ts.
import type { GrokStreamResponse } from "./types.ts";
import {
  type OpenAIToolCall,
  type GrokToolRegistry,
  type GrokFunctionToolSummary,
  type NativeToolIntent,
  type ToolBridgeContext,
  semanticToolKey,
  extractFirstUrl,
  wantsUrlFetch,
  getSchemaProperties,
  isTerminalTool,
  isFileReadTool,
  isUrlFetchTool,
  isWebSearchTool,
  isContextMemoryTool,
  isMetaOrInfrastructureTool,
  firstString,
  extractNumericUserParam,
  adaptArgumentsToDeclaredTool,
} from "./tool-bridge.ts";

export function toolScore(
  tool: GrokFunctionToolSummary,
  intent: NativeToolIntent,
  context: ToolBridgeContext
): number {
  const name = tool.name.toLowerCase();
  const description = (tool.description || "").toLowerCase();
  const properties = getSchemaProperties(tool.parameters);
  const propNames = new Set(Object.keys(properties).map((key) => key.toLowerCase()));
  const text = `${name} ${description}`;
  const userText = context.lastUserText.toLowerCase();
  let score = 0;

  if (intent === "bash") {
    if (!isTerminalTool(tool)) score -= 80;
    if (name === "bash") score += 100;
    if (["shell", "terminal", "run_command", "execute_command", "exec", "command"].includes(name))
      score += 80;
    if (propNames.has("command") || propNames.has("cmd")) score += 60;
    if (/bash|shell|terminal|command|execute|run/.test(text)) score += 25;
    if (/read|search|grep|web|http|browser|context|note|memory/.test(name)) score -= 50;
  } else if (intent === "readFile") {
    if (!isFileReadTool(tool)) score -= 60;
    if (["read", "read_file", "readfile", "file_read"].includes(name)) score += 100;
    if (propNames.has("filepath") || propNames.has("file_path") || propNames.has("path"))
      score += 50;
    if (/read.*file|file.*read|filesystem/.test(text)) score += 25;
    if (/write|edit|delete|remove|bash|shell|command/.test(text)) score -= 50;
  } else if (intent === "webSearch" || intent === "browsePage") {
    const preferUrlFetch = wantsUrlFetch(userText);
    if (isContextMemoryTool(tool) || isMetaOrInfrastructureTool(tool)) score -= 180;
    if (intent === "browsePage" || preferUrlFetch) {
      if (!isUrlFetchTool(tool)) score -= 60;
      if (/webfetch|web_fetch|fetch|browse|browse_page|read_url|url_fetch|page/.test(name))
        score += 140;
      if (propNames.has("url") || propNames.has("uri")) score += 90;
      if (/fetch|browse|url|web page|page content|extract.*url|read.*url/.test(text)) score += 55;
      if (
        /websearch|web_search|search/.test(name) &&
        !(propNames.has("url") || propNames.has("uri"))
      )
        score -= 80;
    }
    if (intent === "webSearch" && !isWebSearchTool(tool)) score -= 60;
    if (
      intent === "browsePage" &&
      /\b(websearch|web_search|search)\b/.test(name) &&
      !(propNames.has("url") || propNames.has("uri"))
    )
      score -= 120;
    if (["web_search", "websearch", "search"].includes(name)) score += 100;
    if (propNames.has("query") || propNames.has("search")) score += 50;
    if (/web.*search|search.*web|internet|browse/.test(text)) score += 25;
    if (/file|bash|shell|command|write|edit/.test(text)) score -= 50;
  }

  return score;
}

export function pickDeclaredToolForIntent(
  intent: NativeToolIntent,
  toolRegistry: GrokToolRegistry
): string | null {
  let best: { name: string; score: number } | null = null;
  for (const tool of toolRegistry.toolsByName.values()) {
    const score = toolScore(tool, intent, { lastUserText: toolRegistry.lastUserText });
    if (score <= 0) continue;
    if (!best || score > best.score) best = { name: tool.name, score };
  }
  return best?.name || null;
}

export function mapGrokNativeToolToOpenAI(
  resp: GrokStreamResponse,
  toolRegistry: GrokToolRegistry
): OpenAIToolCall | null {
  if (!toolRegistry.enabled || !resp.toolUsageCard) return null;
  const card = resp.toolUsageCard as Record<string, unknown>;
  const id = resp.toolUsageCardId || String(card.toolUsageCardId || `call_${crypto.randomUUID()}`);

  const bash = card.bash as { args?: Record<string, unknown> } | undefined;
  if (bash?.args) {
    const name = pickDeclaredToolForIntent("bash", toolRegistry);
    if (name) {
      const args = adaptArgumentsToDeclaredTool(name, bash.args, toolRegistry, "bash", {
        preserveUnknownArgs: false,
      });
      if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) return null;
      return { id, type: "function", function: { name, arguments: JSON.stringify(args) } };
    }
  }

  const readFile = (card.readFile || card.read_file) as
    { args?: Record<string, unknown> } | undefined;
  if (readFile?.args) {
    const rawPath = readFile.args.filePath || readFile.args.file_path || readFile.args.path;
    const name = pickDeclaredToolForIntent("readFile", toolRegistry);
    if (name && typeof rawPath === "string") {
      const userOffset = extractNumericUserParam(toolRegistry.lastUserText, ["offset"]);
      const userLimit = extractNumericUserParam(toolRegistry.lastUserText, [
        "limit",
        "limite",
        "límite",
      ]);
      const rawArgs = {
        ...readFile.args,
        ...(userOffset !== undefined ? { offset: userOffset } : {}),
        ...(userLimit !== undefined ? { limit: userLimit } : {}),
        filePath: rawPath,
        file_path: rawPath,
        path: rawPath,
      };
      const args = adaptArgumentsToDeclaredTool(name, rawArgs, toolRegistry, "readFile", {
        preserveUnknownArgs: false,
      });
      if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) return null;
      return { id, type: "function", function: { name, arguments: JSON.stringify(args) } };
    }
  }

  const webSearch = card.webSearch as { args?: Record<string, unknown> } | undefined;
  if (webSearch?.args) {
    const name = pickDeclaredToolForIntent("webSearch", toolRegistry);
    if (name) {
      const requestedUrl = wantsUrlFetch(toolRegistry.lastUserText)
        ? extractFirstUrl(toolRegistry.lastUserText)
        : undefined;
      const args = adaptArgumentsToDeclaredTool(
        name,
        requestedUrl ? { ...webSearch.args, url: requestedUrl, uri: requestedUrl } : webSearch.args,
        toolRegistry,
        requestedUrl ? "webFetch" : "webSearch",
        { preserveUnknownArgs: false }
      );
      if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) return null;
      return { id, type: "function", function: { name, arguments: JSON.stringify(args) } };
    }
  }

  const browsePage = (card.browsePage || card.browse_page) as
    { args?: Record<string, unknown> } | undefined;
  if (browsePage?.args) {
    const url = firstString(browsePage.args.url, browsePage.args.uri);
    const name = pickDeclaredToolForIntent("browsePage", toolRegistry);
    if (name && url) {
      const args = adaptArgumentsToDeclaredTool(
        name,
        { ...browsePage.args, url, uri: url, input: url },
        toolRegistry,
        "browsePage",
        { preserveUnknownArgs: false }
      );
      if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) return null;
      return { id, type: "function", function: { name, arguments: JSON.stringify(args) } };
    }
  }

  return null;
}
