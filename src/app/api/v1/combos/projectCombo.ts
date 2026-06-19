/**
 * Public projection helpers for GET /v1/combos (issue #2300).
 *
 * Strip internal routing details (connectionId, weights, labels, etc.) before
 * returning combo metadata to API-key callers. Kept in a separate module so
 * the projection can be unit-tested without spinning up the Next.js route.
 *
 * #3979: client-facing combo catalogs (the `/v1/combos`, VS Code and LobeHub /
 * OpenCode import surfaces) can opt into advertising the combo's resolved
 * capabilities (multimodal / reasoning / caching) so importing clients enable
 * those features instead of requiring manual config after import.
 */
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";

export interface PublicComboStep {
  kind: "model" | "combo-ref";
  model?: string;
  comboName?: string;
  providerId?: string;
}

/**
 * #3979: capabilities a combo can be safely imported with. A combo advertises
 * a capability only when EVERY concrete model step proves it (the routing
 * strategy may dispatch to any member, so the weakest member is the ceiling).
 */
export interface PublicComboCapabilities {
  multimodal: boolean;
  reasoning: boolean;
  caching: boolean;
}

export interface PublicCombo {
  name: string;
  strategy: string;
  description?: string;
  models: PublicComboStep[];
  capabilities?: PublicComboCapabilities;
}

/** Capability subset projectCombo needs; injectable so tests stay DB-free + deterministic. */
export type ComboCapabilityResolver = (model: string) => {
  supportsVision: boolean | null;
  reasoning: boolean;
};

export interface ProjectComboOptions {
  /** When true, attach the resolved `capabilities` block to the projection (#3979). */
  includeCapabilities?: boolean;
  /** Override the capability resolver (defaults to the model registry). */
  resolveCapabilities?: ComboCapabilityResolver;
}

const defaultCapabilityResolver: ComboCapabilityResolver = (model) => {
  const caps = getResolvedModelCapabilities(model);
  return { supportsVision: caps.supportsVision, reasoning: caps.reasoning };
};

export function projectComboStep(step: Record<string, unknown>): PublicComboStep | null {
  const kind = step.kind;
  if (kind === "combo-ref" && typeof step.comboName === "string") {
    return { kind: "combo-ref", comboName: step.comboName };
  }
  if (kind === "model" && typeof step.model === "string") {
    const out: PublicComboStep = { kind: "model", model: step.model };
    if (typeof step.providerId === "string" && step.providerId.length > 0) {
      out.providerId = step.providerId;
    }
    return out;
  }
  return null;
}

/**
 * #3979: derive the capabilities a combo can be imported with.
 * - `multimodal` / `reasoning`: true only when there is at least one concrete
 *   model step, there are no unresolvable nested combo-refs, and EVERY model
 *   step proves the capability via the registry.
 * - `caching`: reflects the operator's explicit per-combo Context-Cache-Protection
 *   choice (no registry caching flag exists), so caching is never advertised
 *   unless the operator opted in — avoiding surprise prompt-cache cost.
 */
export function computeComboCapabilities(
  combo: Record<string, unknown>,
  resolve: ComboCapabilityResolver = defaultCapabilityResolver
): PublicComboCapabilities {
  const rawModels = Array.isArray(combo.models) ? combo.models : [];
  const modelIds: string[] = [];
  let hasComboRef = false;

  for (const m of rawModels) {
    if (!m || typeof m !== "object") continue;
    const step = m as Record<string, unknown>;
    if (step.kind === "combo-ref") {
      hasComboRef = true;
    } else if (step.kind === "model" && typeof step.model === "string") {
      modelIds.push(step.model);
    }
  }

  let multimodal = modelIds.length > 0 && !hasComboRef;
  let reasoning = modelIds.length > 0 && !hasComboRef;

  if (multimodal || reasoning) {
    for (const id of modelIds) {
      const caps = resolve(id);
      if (caps.supportsVision !== true) multimodal = false;
      if (caps.reasoning !== true) reasoning = false;
    }
  }

  const caching = combo.context_cache_protection === true;

  return { multimodal, reasoning, caching };
}

export function projectCombo(
  combo: Record<string, unknown>,
  options?: ProjectComboOptions
): PublicCombo | null {
  const name = typeof combo.name === "string" ? combo.name.trim() : "";
  if (!name) return null;

  const strategy = typeof combo.strategy === "string" ? combo.strategy : "priority";

  const out: PublicCombo = { name, strategy, models: [] };
  if (typeof combo.description === "string" && combo.description.length > 0) {
    out.description = combo.description;
  }

  const rawModels = Array.isArray(combo.models) ? combo.models : [];
  for (const m of rawModels) {
    if (m && typeof m === "object") {
      const step = projectComboStep(m as Record<string, unknown>);
      if (step) out.models.push(step);
    }
  }

  if (options?.includeCapabilities) {
    out.capabilities = computeComboCapabilities(combo, options.resolveCapabilities);
  }

  return out;
}
