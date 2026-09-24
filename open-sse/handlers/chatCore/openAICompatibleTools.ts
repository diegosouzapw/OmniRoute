import { FORMATS } from "../../translator/formats.ts";

type Tool = Record<string, unknown>;

// Built-in providers whose OpenAI Chat wire format was observed to accept only
// `type: "function"` tools. Keep this list conservative: only add a provider
// after a concrete upstream rejection of a non-function tool type (#13789,
// agentrouter GLM: `400 tools[0].type:type is illegal`). Providers that support
// richer tool types (openai `custom`, responses hosted tools) must NOT appear
// here — normalization would silently rewrite their requests.
const BUILTIN_FUNCTION_TOOLS_ONLY_PROVIDERS: ReadonlySet<string> = new Set(["agentrouter"]);

/**
 * Whether non-function tool types must be converted/dropped before translation.
 *
 * Custom `openai-compatible-*` connections always normalize (they only support
 * function tools). Built-in providers normalize only when on the allowlist AND
 * the wire target is OpenAI Chat — the Responses target keeps native hosted
 * tool definitions, and Claude targets have their own dispatch normalization.
 */
export function shouldNormalizeFunctionToolsOnly(
  provider: string | undefined,
  targetFormat: string
): boolean {
  if (!provider) return false;
  if (provider.startsWith("openai-compatible-")) return true;
  return targetFormat === FORMATS.OPENAI && BUILTIN_FUNCTION_TOOLS_ONLY_PROVIDERS.has(provider);
}

export function normalizeOpenAICompatibleTools(
  tools: Tool[],
  sourceFormat: string
): { tools: Tool[]; dropped: number } {
  // The Responses translator has dedicated handling for custom, namespace,
  // tool_search, local_shell, and hosted tool types. Normalizing any of them
  // here destroys information before that format-aware conversion can run.
  if (sourceFormat === FORMATS.OPENAI_RESPONSES) {
    return { tools, dropped: 0 };
  }

  const before = tools.length;
  const normalized = tools
    .filter((tool) => !tool.type || tool.type === "function" || !!tool.function || !!tool.name)
    .map((tool) => {
      // Responses custom tools carry free-form input. Preserve their native shape so
      // the Responses translator can produce the required { input: string } schema.
      if (!tool.type || tool.type === "function" || tool.function) {
        return tool;
      }

      return {
        type: "function",
        function: {
          name: tool.name,
          ...(tool.description === undefined ? {} : { description: tool.description }),
          ...(tool.parameters !== undefined || tool.input_schema !== undefined
            ? { parameters: tool.parameters ?? tool.input_schema ?? {} }
            : {}),
          ...(tool.strict === undefined ? {} : { strict: tool.strict }),
        },
      };
    });

  return { tools: normalized, dropped: before - normalized.length };
}
