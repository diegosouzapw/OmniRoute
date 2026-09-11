import type { LanguageModelV3 } from "@ai-sdk/provider";
import { type Logger, isGeminiModelId, sanitizeToolInputSchemas } from "./shared/index.js";

type CallOptions = Parameters<LanguageModelV3["doGenerate"]>[0];

/**
 * Gemini answers `400 INVALID_ARGUMENT` — for the entire request, not just the
 * offending tool — when a tool declaration carries `$schema` or
 * `additionalProperties`. Anything upstream that emits standard JSON Schema
 * therefore breaks tool calling as soon as the chain routes to Gemini. A
 * `$ref` is forwarded untouched instead: stripping it would widen the schema
 * to "accept anything", which is worse than letting the gateway answer. The
 * v1 plugin dealt with this by wrapping `fetch` and rewriting the JSON body; the
 * v2 home for it is the language model, where the tools are still structured
 * data and no re-parsing is needed.
 *
 * Returns the model untouched when it is not bound for Gemini, so the wrapper
 * costs nothing on every other chain.
 */
export function sanitizeToolSchemasFor<T extends LanguageModelV3 | undefined>(
  language: T,
  modelId: string,
  log: Logger
): T {
  if (language === undefined) return language;
  if (!isGeminiModelId(modelId)) return language;

  const clean = (options: CallOptions): CallOptions => {
    const tools = sanitizeToolInputSchemas(options.tools);
    if (tools === undefined) return options;
    log.debug(
      `[omniroute-v2] stripped Gemini-incompatible schema keywords from ${tools.length} tool declaration(s) for ${modelId}`
    );
    return { ...options, tools } as CallOptions;
  };

  // Prototype-linked so every other member of the model — including accessors
  // and anything a future SDK version adds — keeps working untouched.
  const wrapped: LanguageModelV3 = Object.create(language as object) as LanguageModelV3;
  wrapped.doGenerate = (options) => language.doGenerate(clean(options));
  wrapped.doStream = (options) => language.doStream(clean(options));
  return wrapped as T;
}
