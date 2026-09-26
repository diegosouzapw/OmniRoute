/**
 * Non-enumerable field on the assembled stream chat message that carries Claude passthrough
 * tool names to the session-turn extractor only. JSON.stringify, object spreads and
 * structuredClone all skip it, so call logs, the semantic cache and reasoning replay see the
 * body exactly as before. Standalone so the extractor does not pull in the stream helpers.
 */
export const TOOL_USE_NAMES_FIELD = "_omnirouteToolNames";
