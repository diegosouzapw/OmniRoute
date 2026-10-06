// Codex Responses-API tool normalization (hosted-tool passthrough + free-plan gating).
// Extracted verbatim from codex.ts. Self-contained (console.debug only).

import { stripUnsupportedRegexPatterns } from "../../translator/helpers/schemaCoercion.ts";

// Responses-API hosted tool types that OpenAI/Codex executes server-side.
// These arrive shaped as `{ type, ...params }` with no `function` object and no `name` —
// e.g. Codex CLI injects `{ type: "image_generation", output_format: "png" }` or
// `{ type: "namespace", name: "mcp__atlassian__", tools: [...] }` for MCP tool groups.
// Keep them through `normalizeCodexTools` so upstream can execute them.
export const CODEX_HOSTED_TOOL_TYPES: ReadonlySet<string> = new Set([
  "tool_search",
  "image_generation",
  "web_search",
  "web_search_preview",
  "file_search",
  "computer",
  "computer_use_preview",
  "code_interpreter",
  "mcp",
]);

// #2980: a free-plan Codex account (workspacePlanType === "free", from the OAuth
// id_token) cannot run the server-side `image_generation` hosted tool. The Codex
// CLI injects it into every Responses request regardless of plan, so it must be
// dropped for free-plan accounts (mirrors CLIProxyAPI's isCodexFreePlanAuth).
export function isCodexFreePlan(providerSpecificData: unknown): boolean {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return false;
  const data = providerSpecificData as {
    workspacePlanType?: unknown;
    chatgptPlanType?: unknown;
  };
  const plan =
    typeof data.workspacePlanType === "string"
      ? data.workspacePlanType
      : data.chatgptPlanType;
  return typeof plan === "string" && plan.trim().toLowerCase() === "free";
}

type JsonRecord = Record<string, unknown>;

const REDUNDANT_ONEOF_OBJECT_MAP_FIELDS = [
  "properties",
  "patternProperties",
  "$defs",
  "definitions",
] as const;

const REDUNDANT_ONEOF_ARRAY_SCHEMA_FIELDS = ["prefixItems", "oneOf", "anyOf", "allOf"] as const;

const REDUNDANT_ONEOF_SINGLE_SCHEMA_FIELDS = [
  "items",
  "additionalProperties",
  "not",
  "if",
  "then",
  "else",
] as const;

const REDUNDANT_ONEOF_ANNOTATION_KEYS = new Set(["const", "description", "title", "$comment"]);

/**
 * Remove a redundant `oneOf` when it is fully covered by a sibling `enum`.
 *
 * The Codex private Responses endpoint (`chatgpt.com/backend-api/codex/responses`)
 * intermittently returns a 502 `upstream_empty_response` when a tool parameter
 * carries the JSON-Schema pattern `oneOf: [{const, ...annotations}]` together
 * with a sibling `enum` whose value set exactly matches the `const` set. In that
 * case `oneOf` adds no constraint beyond `enum`, so dropping it is semantically
 * safe and eliminates the trigger.
 *
 * Only the exact-match redundant case is stripped. Bare `oneOf[const]` without
 * a sibling `enum`, narrowing const sets, non-matching enums, type-discriminated
 * `oneOf`, and `anyOf`/`allOf` are all preserved.
 */
export function stripRedundantOneOfConstEnum(schema: unknown): unknown {
  if (Array.isArray(schema)) {
    return schema.map((entry) => stripRedundantOneOfConstEnum(entry));
  }
  if (!isPlainObject(schema)) return schema;

  const result: JsonRecord = { ...schema };

  maybeStripRedundantOneOf(result);

  for (const field of REDUNDANT_ONEOF_OBJECT_MAP_FIELDS) {
    const map = result[field];
    if (isPlainObject(map)) {
      result[field] = Object.fromEntries(
        Object.entries(map).map(([key, value]) => [key, stripRedundantOneOfConstEnum(value)])
      );
    }
  }

  for (const field of REDUNDANT_ONEOF_ARRAY_SCHEMA_FIELDS) {
    if (Array.isArray(result[field])) {
      result[field] = (result[field] as unknown[]).map((entry) =>
        stripRedundantOneOfConstEnum(entry)
      );
    }
  }

  for (const field of REDUNDANT_ONEOF_SINGLE_SCHEMA_FIELDS) {
    if (result[field] !== undefined) {
      result[field] = stripRedundantOneOfConstEnum(result[field]);
    }
  }

  return result;
}

function maybeStripRedundantOneOf(node: JsonRecord): void {
  const branches = node.oneOf;
  if (!Array.isArray(branches) || branches.length === 0) return;

  const enumValues = Array.isArray(node.enum) ? node.enum : null;
  if (!enumValues || enumValues.length === 0) return;

  // Every branch must be {const, ...annotations only}.
  const constValues: unknown[] = [];
  for (const branch of branches) {
    if (!isPlainObject(branch)) return;
    const branchKeys = Object.keys(branch);
    if (!branchKeys.includes("const")) return;
    if (!branchKeys.every((key) => REDUNDANT_ONEOF_ANNOTATION_KEYS.has(key))) return;
    constValues.push((branch as JsonRecord).const);
  }

  // Restrict to string consts and string enums (confirmed production shape).
  if (!constValues.every((value) => typeof value === "string")) return;
  if (!enumValues.every((value) => typeof value === "string")) return;

  // All const values must be unique.
  if (new Set(constValues).size !== constValues.length) return;

  // The const set must exactly match the enum set.
  const enumSet = new Set(enumValues);
  if (enumSet.size !== constValues.length) return;
  if (!constValues.every((value) => enumSet.has(value))) return;

  delete node.oneOf;
}

function isPlainObject(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeCodexTools(
  body: Record<string, unknown>,
  options?: {
    dropImageGeneration?: boolean;
    preserveCustomTools?: boolean;
    defaultFunctionStrict?: boolean;
  }
): void {
  if (!Array.isArray(body.tools)) return;

  const validToolNames = new Set<string>();
  body.tools = body.tools.filter((toolValue) => {
    if (!toolValue || typeof toolValue !== "object" || Array.isArray(toolValue)) {
      return false;
    }

    const tool = toolValue as Record<string, unknown>;
    const toolType = typeof tool.type === "string" ? tool.type : "";

    // Preserve namespace tools (MCP tool groups used by Codex/OpenAI Responses API).
    // Codex API supports them natively; register sub-tool names for tool_choice validation.
    if (toolType === "namespace") {
      if (Array.isArray(tool.tools)) {
        for (const st of tool.tools as unknown[]) {
          if (st && typeof st === "object" && !Array.isArray(st)) {
            const subTool = st as Record<string, unknown>;
            const name = typeof subTool.name === "string" ? subTool.name.trim().slice(0, 128) : "";
            if (name) validToolNames.add(name);
          }
        }
      }
      return true;
    }

    // Native Codex clients send Responses API custom tools such as apply_patch as:
    // { type: "custom", name, format }. Preserve those only on native passthrough;
    // translated/non-native requests can still contain provider-specific "custom"
    // shapes that the Codex backend would reject.
    if (toolType === "custom" && options?.preserveCustomTools === true) {
      const name = typeof tool.name === "string" ? tool.name.trim().slice(0, 128) : "";
      if (!name) return false;
      tool.name = name;
      validToolNames.add(name);
      return true;
    }

    if (toolType !== "function") {
      const hasFunctionObject = tool.function && typeof tool.function === "object";
      const hasName = typeof tool.name === "string";
      if (!toolType || hasFunctionObject || hasName) {
        return false;
      }
      if (CODEX_HOSTED_TOOL_TYPES.has(toolType)) {
        // #2980: drop the CLI-injected image_generation tool for free-plan
        // accounts, which can't run it server-side (upstream 400 otherwise).
        if (toolType === "image_generation" && options?.dropImageGeneration === true) {
          return false;
        }
        return true;
      }
      console.debug(`[Codex] dropping unknown hosted tool type: ${toolType}`);
      return false;
    }

    const rawName =
      typeof tool.name === "string"
        ? tool.name
        : tool.function &&
            typeof tool.function === "object" &&
            !Array.isArray(tool.function) &&
            typeof (tool.function as Record<string, unknown>).name === "string"
          ? ((tool.function as Record<string, unknown>).name as string)
          : "";
    const name = rawName.trim();
    if (!name) {
      return false;
    }

    // Codex Responses API requires function tools in flat Responses format:
    // { type: "function", name, description, parameters }
    // Some clients/translators send Chat Completions shape:
    // { type: "function", function: { name, description, parameters } }
    // which upstream rejects with "Missing required parameter: tools[0].name".
    // Flatten the nested `function` wrapper into top-level fields (#1914).
    const functionObject =
      tool.function && typeof tool.function === "object" && !Array.isArray(tool.function)
        ? (tool.function as Record<string, unknown>)
        : null;
    const description =
      typeof tool.description === "string"
        ? tool.description
        : typeof functionObject?.description === "string"
          ? functionObject.description
          : "";
    const parameters =
      tool.parameters && typeof tool.parameters === "object" && !Array.isArray(tool.parameters)
        ? tool.parameters
        : functionObject?.parameters &&
            typeof functionObject.parameters === "object" &&
            !Array.isArray(functionObject.parameters)
          ? functionObject.parameters
          : { type: "object", properties: {} };
    const strict =
      typeof tool.strict === "boolean"
        ? tool.strict
        : typeof functionObject?.strict === "boolean"
          ? functionObject.strict
          : typeof options?.defaultFunctionStrict === "boolean"
            ? options.defaultFunctionStrict
            : undefined;

    // Codex/OpenAI Responses API rejects `pattern` fields using regex lookaround
    // (e.g. `^(?=.*@).+$`) with a 400 "regex lookaround is not supported" error.
    // Strip those before the schema reaches upstream (9router#1556).
    const sanitizedParameters = stripRedundantOneOfConstEnum(
      stripUnsupportedRegexPatterns(parameters)
    );

    // Rewrite in-place to Responses format
    for (const key of Object.keys(tool)) {
      delete tool[key];
    }
    tool.type = "function";
    tool.name = name.slice(0, 128);
    if (description) tool.description = description;
    tool.parameters = sanitizedParameters;
    if (strict !== undefined) tool.strict = strict;

    validToolNames.add(name);
    return true;
  });

  if (
    body.tool_choice &&
    typeof body.tool_choice === "object" &&
    !Array.isArray(body.tool_choice)
  ) {
    const toolChoice = body.tool_choice as Record<string, unknown>;
    if (toolChoice.type === "function") {
      const rawName = typeof toolChoice.name === "string" ? toolChoice.name.trim() : "";
      if (!rawName || !validToolNames.has(rawName)) {
        delete body.tool_choice;
      }
    } else if (toolChoice.type === "local_shell") {
      delete body.tool_choice;
    }
  }
}
