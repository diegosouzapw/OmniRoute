type JsonRecord = Record<string, unknown>;

export const AG_TOOL_SUFFIX = "_ide";

const AG_DEFAULT_TOOL_NAMES = [
  "browser_subagent",
  "command_status",
  "find_by_name",
  "generate_image",
  "grep_search",
  "list_dir",
  "list_resources",
  "multi_replace_file_content",
  "notify_user",
  "read_resource",
  "read_terminal",
  "read_url_content",
  "replace_file_content",
  "run_command",
  "search_web",
  "send_command_input",
  "task_boundary",
  "view_content_chunk",
  "view_file",
  "write_to_file",
] as const;

const AG_DECOY_TOOL_NAMES = [
  ...AG_DEFAULT_TOOL_NAMES,
  "mcp_sequential_thinking_sequentialthinking",
] as const;

export const AG_DEFAULT_TOOLS = new Set<string>(AG_DEFAULT_TOOL_NAMES);

export const AG_DECOY_TOOLS = AG_DECOY_TOOL_NAMES.map((name) =>
  Object.freeze({
    name,
    description: "This tool is currently unavailable.",
    parameters: {
      type: "OBJECT",
      properties: {},
      required: [],
    },
  })
);

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function toToolName(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function rememberCloakedToolName(
  toolNameMap: Map<string, string>,
  rawName: string,
  cloakedName: string
): boolean {
  if (cloakedName === rawName) return false;
  toolNameMap.set(cloakedName, toolNameMap.get(rawName) ?? rawName);
  return true;
}

export function shouldCloakAntigravityTool(toolName: string): boolean {
  return (
    toolName.length > 0 && !AG_DEFAULT_TOOLS.has(toolName) && !toolName.endsWith(AG_TOOL_SUFFIX)
  );
}

export function getCloakedAntigravityToolName(toolName: string): string {
  return shouldCloakAntigravityTool(toolName) ? `${toolName}${AG_TOOL_SUFFIX}` : toolName;
}

function cloakAntigravityToolDeclarations(
  tools: unknown,
  toolNameMap: Map<string, string>
): JsonRecord[] | null {
  if (!Array.isArray(tools)) return null;

  const preservedTools: JsonRecord[] = [];
  const cloakedDeclarations: JsonRecord[] = [];

  for (const toolValue of tools) {
    const tool = asRecord(toolValue);
    if (!tool || !Array.isArray(tool.functionDeclarations)) {
      preservedTools.push(toolValue as JsonRecord);
      continue;
    }

    for (const declarationValue of tool.functionDeclarations) {
      const declaration = asRecord(declarationValue);
      if (!declaration) continue;

      const rawName = toToolName(declaration.name);
      if (!rawName) {
        cloakedDeclarations.push({ ...declaration });
        continue;
      }

      const cloakedName = getCloakedAntigravityToolName(rawName);
      rememberCloakedToolName(toolNameMap, rawName, cloakedName);
      cloakedDeclarations.push({ ...declaration, name: cloakedName });
    }
  }

  if (cloakedDeclarations.length === 0) return null;

  const declaredNames = new Set(
    cloakedDeclarations.map((declaration) => toToolName(declaration.name)).filter(Boolean)
  );
  const decoys = AG_DECOY_TOOLS.filter((declaration) => !declaredNames.has(declaration.name));
  return [...preservedTools, { functionDeclarations: [...cloakedDeclarations, ...decoys] }];
}

function cloakAntigravityToolPart(partValue: unknown, toolNameMap: Map<string, string>): unknown {
  const part = asRecord(partValue);
  if (!part) return partValue;

  const nextPart: JsonRecord = { ...part };
  let changed = false;

  for (const key of ["functionCall", "functionResponse"] as const) {
    const toolUse = asRecord(part[key]);
    if (!toolUse) continue;

    const rawName = toToolName(toolUse.name);
    const cloakedName = getCloakedAntigravityToolName(rawName);
    if (rememberCloakedToolName(toolNameMap, rawName, cloakedName)) {
      nextPart[key] = { ...toolUse, name: cloakedName };
      changed = true;
    }
  }

  return changed ? nextPart : partValue;
}

function cloakAntigravityContents(
  contents: unknown,
  toolNameMap: Map<string, string>
): unknown[] | null {
  if (!Array.isArray(contents)) return null;

  let contentsChanged = false;
  const nextContents = contents.map((contentValue) => {
    const content = asRecord(contentValue);
    if (!content || !Array.isArray(content.parts)) return contentValue;

    const parts = content.parts;
    const nextParts = parts.map((partValue) => cloakAntigravityToolPart(partValue, toolNameMap));
    if (nextParts.every((part, index) => part === parts[index])) return contentValue;

    contentsChanged = true;
    return { ...content, parts: nextParts };
  });

  return contentsChanged ? nextContents : null;
}

export function cloakAntigravityToolPayload<T extends JsonRecord>(
  body: T
): {
  body: T;
  toolNameMap: Map<string, string> | null;
} {
  const request = asRecord(body.request);
  if (!request) {
    return { body, toolNameMap: null };
  }

  const existingToolNameMap =
    body._toolNameMap instanceof Map ? (body._toolNameMap as Map<string, string>) : null;
  const toolNameMap = existingToolNameMap
    ? new Map(existingToolNameMap)
    : new Map<string, string>();
  let changed = false;

  const nextRequest: JsonRecord = {
    ...request,
  };

  const nextTools = cloakAntigravityToolDeclarations(request.tools, toolNameMap);
  if (nextTools) {
    nextRequest.tools = nextTools;
    changed = true;
  }

  const nextContents = cloakAntigravityContents(request.contents, toolNameMap);
  if (nextContents) {
    nextRequest.contents = nextContents;
    changed = true;
  }

  if (!changed) {
    return {
      body,
      toolNameMap: toolNameMap.size > 0 ? toolNameMap : null,
    };
  }

  return {
    body: {
      ...body,
      request: nextRequest,
    },
    toolNameMap: toolNameMap.size > 0 ? toolNameMap : null,
  };
}
