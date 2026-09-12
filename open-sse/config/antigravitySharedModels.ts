// Shared Antigravity model catalog — single source of truth for both surfaces.
//
// `agy` (CLI) and `antigravity` (IDE) share the same backend. Adding a model
// to both surfaces = one edit here. Each surface can still diverge via an
// explicit add/remove delta in its own file (currently both deltas are empty).

export const ANTIGRAVITY_SHARED_MODELS = Object.freeze([
  // Gemini 3.7 Flash tiers. The live endpoint selects High by default and advertises
  // all three ids to both the IDE 2.5.5 and CLI 1.1.x clients.
  {
    id: "gemini-3.7-flash-high",
    name: "Gemini 3.7 Flash (High)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.7-flash-medium",
    name: "Gemini 3.7 Flash (Medium)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.7-flash-low",
    name: "Gemini 3.7 Flash (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.7-flash-tiered",
    name: "Gemini 3.7 Flash (Tiered)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  // Gemini 3.1 Pro budget tiers. Live streamGenerateContent validation uses
  // `gemini-pro-agent` for High; the separately advertised `gemini-3.1-pro-high`
  // discovery slot currently returns HTTP 400 and is intentionally not public.
  {
    id: "gemini-pro-agent",
    name: "Gemini 3.1 Pro (High)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-pro-low",
    name: "Gemini 3.1 Pro (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  // Claude (Antigravity backend). Discussion #3184 confirmed these are
  // user-callable through both the agy and antigravity OAuth providers.
  {
    id: "claude-opus-4-6-thinking",
    name: "Claude Opus 4.6 (Thinking)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6 (Thinking)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  // GPT-OSS
  {
    id: "gpt-oss-120b-medium",
    name: "GPT-OSS 120B (Medium)",
    contextLength: 131072,
    maxOutputTokens: 32768,
    supportsReasoning: true,
    toolCalling: true,
  },
]);

/**
 * Build a surface-specific catalog from the shared base plus an explicit delta.
 * This preserves the ability for agy/antigravity to diverge in the future while
 * keeping today's single-edit maintenance path.
 */
export function buildSurfaceCatalog(
  base: readonly { id: string; [k: string]: unknown }[],
  delta: { add?: typeof base; remove?: readonly string[] } = {}
): typeof base {
  const removed = new Set(delta.remove ?? []);
  const added = delta.add ?? [];
  const filtered = base.filter((m) => !removed.has(m.id));
  return Object.freeze([...filtered, ...added]);
}
