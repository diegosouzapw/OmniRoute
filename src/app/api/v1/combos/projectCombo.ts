/**
 * Public projection helpers for GET /v1/combos (issue #2300).
 *
 * Strip internal routing details (connectionId, weights, labels, etc.) before
 * returning combo metadata to API-key callers. Kept in a separate module so
 * the projection can be unit-tested without spinning up the Next.js route.
 *
 * #10968: the projection also reports `accountPinned` per model step — a boolean
 * derived from the stripped `connectionId`, so callers can distinguish a combo
 * that fails over between two accounts of one provider from a duplicated step.
 *
 * #3979: client-facing combo catalogs (the `/v1/combos`, VS Code and LobeHub /
 * OpenCode import surfaces) can opt into advertising the combo's resolved
 * capabilities (multimodal / reasoning / caching) so importing clients enable
 * those features instead of requiring manual config after import.
 */
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import {
  resolveNestedComboTargets,
  type ComboCollectionLike,
  type ComboLike,
  type ResolvedComboTarget,
} from "@omniroute/open-sse/services/combo/comboStructure.ts";

export interface PublicComboStep {
  kind: "model" | "combo-ref";
  model?: string;
  comboName?: string;
  providerId?: string;
  /**
   * #10968: whether this step pins one specific account of its provider.
   *
   * Two steps that pin different accounts of the same provider project to
   * identical `{kind, model, providerId}` objects, so a client cannot tell a
   * two-account failover from the same step listed twice. This says which it
   * is without exposing the `connectionId` the flag is derived from — not even
   * a prefix, per the issue.
   *
   * Set on every `model` step. Absent on `combo-ref`, which routes through
   * another combo and has no account of its own.
   */
  accountPinned?: boolean;
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
  /**
   * #14232: the full combo collection. When supplied, combo-ref steps are
   * expanded through the same resolver the routing runtime uses, so nested
   * leaves count toward capabilities exactly as they would count at dispatch
   * time — matching how /v1/models evaluates the same combo. Without it the
   * legacy behavior applies: any combo-ref forces the conservative false.
   */
  allCombos?: ComboCollectionLike;
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
    // Same shape test as providerId above. `cleanupComboConnectionRefs` drops the
    // key when the connection is deleted, so a step whose pinned account is gone
    // reports false rather than pointing at nothing.
    out.accountPinned = typeof step.connectionId === "string" && step.connectionId.length > 0;
    return out;
  }
  return null;
}

/**
 * #3979: derive the capabilities a combo can be imported with.
 * - `multimodal` / `reasoning`: true only when there is at least one concrete
 *   model step, there are no unresolvable nested combo-refs, and EVERY model
 *   step proves the capability via the registry. #14232: with `allCombos`
 *   supplied, resolvable combo-refs are expanded through
 *   `resolveNestedComboTargets` — the same target pool the routing runtime
 *   dispatches against and /v1/models evaluates — so nested leaves count
 *   toward the verdict instead of every nested combo being capped at false.
 * - `caching`: reflects the operator's explicit per-combo Context-Cache-Protection
 *   choice (no registry caching flag exists), so caching is never advertised
 *   unless the operator opted in — avoiding surprise prompt-cache cost.
 */
export function computeComboCapabilities(
  combo: Record<string, unknown>,
  resolve: ComboCapabilityResolver = defaultCapabilityResolver,
  allCombos?: ComboCollectionLike
): PublicComboCapabilities {
  const rawModels = Array.isArray(combo.models) ? combo.models : [];
  let hasComboRef = false;
  const directModelIds: string[] = [];

  for (const m of rawModels) {
    if (!m || typeof m !== "object") continue;
    const step = m as Record<string, unknown>;
    if (step.kind === "combo-ref") {
      hasComboRef = true;
    } else if (step.kind === "model" && typeof step.model === "string") {
      directModelIds.push(step.model);
    }
  }

  // #14232: with the collection in hand, combo-ref steps expand through the
  // same resolver the runtime dispatch uses, so the projection evaluates the
  // exact target pool a request would hit. Unresolvable refs (dangling names,
  // cycles at the depth cap) contribute no targets and force the conservative
  // false below, matching the doc contract.
  const modelIds: string[] = [...directModelIds];
  if (hasComboRef && allCombos) {
    const resolved = resolveNestedComboTargets(combo as unknown as ComboLike, allCombos);
    for (const target of resolved as ResolvedComboTarget[]) {
      if (target.kind === "model" && typeof target.modelStr === "string") {
        modelIds.push(target.modelStr);
      }
    }
  }

  let multimodal = modelIds.length > 0 && (!hasComboRef || Boolean(allCombos));
  let reasoning = modelIds.length > 0 && (!hasComboRef || Boolean(allCombos));

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
    out.capabilities = computeComboCapabilities(
      combo,
      options.resolveCapabilities,
      options.allCombos
    );
  }

  return out;
}
