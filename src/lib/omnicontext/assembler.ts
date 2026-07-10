/**
 * Documents Continuity inject layer order (Layer 0–E).
 * Hot-path glue calls OmniContext before Memory; routing handoff stays separate.
 */

export const INJECT_LAYER_ORDER = [
  "0:global_system_prompt",
  "A:omnicontext_stable_prefix",
  "B:omnicontext_dynamic",
  "C:routing_context_handoff",
  "D:memory_and_skills",
  "E:compression",
] as const;

export type InjectLayerId = (typeof INJECT_LAYER_ORDER)[number];

export function assertInjectOrder(layers: string[]): boolean {
  let last = -1;
  for (const layer of layers) {
    const idx = INJECT_LAYER_ORDER.indexOf(layer as InjectLayerId);
    if (idx < 0) return false;
    if (idx < last) return false;
    last = idx;
  }
  return true;
}
