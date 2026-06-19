/**
 * #4235 Phase B — OpenRouter-style `auto/<category>:<tier>` composition.
 *
 * The built-in catalog (builtinCatalog.ts) historically mapped each `auto/*` id to
 * a single flat `AutoVariant` (coding/fast/cheap/offline/smart/lkgp). That conflates
 * two orthogonal axes the issue asks to separate:
 *
 *   - **category** (what kind of route): coding · reasoning · vision · chat · multimodal
 *     → a *candidate filter* (vision/reasoning/multimodal keep only capable models).
 *   - **tier** (how to optimize): fast · cheap/floor · free · reliable · pro
 *     → scoring *weights* (a mode pack) and, for free/pro, a model-tier *filter*
 *       via `classifyTier` (free → free models only, pro → premium models only).
 *
 * This module parses `auto/<category>[:<tier>]` and turns it into a weight variant +
 * an optional candidate filter, all without touching the core combo scorer
 * (`combo.ts::buildAutoCandidates`) — the filter is applied to the candidate pool in
 * `virtualFactory.createVirtualAutoCombo`, and the weights reuse the existing mode packs.
 */
import type { AutoVariant } from "./autoPrefix";
import { classifyTier } from "../tierResolver";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { isVisionModelId } from "@/shared/constants/visionModels";

export type AutoCategory = "coding" | "reasoning" | "vision" | "chat" | "multimodal";
export type AutoTier = "fast" | "cheap" | "floor" | "free" | "reliable" | "pro";

export const AUTO_CATEGORIES: readonly AutoCategory[] = [
  "coding",
  "reasoning",
  "vision",
  "chat",
  "multimodal",
];
export const AUTO_TIERS: readonly AutoTier[] = ["fast", "cheap", "floor", "free", "reliable", "pro"];

const CATEGORY_SET = new Set<string>(AUTO_CATEGORIES);
const TIER_SET = new Set<string>(AUTO_TIERS);

export interface ParsedAutoSuffix {
  valid: boolean;
  category?: AutoCategory;
  tier?: AutoTier;
}

/**
 * Parse the suffix after `auto/`. Recognizes:
 *   - `<category>`            → `{ category }`            (e.g. `vision`)
 *   - `<category>:<tier>`     → `{ category, tier }`      (e.g. `coding:fast`)
 *
 * Tier-only flat variants (`fast`, `cheap`, `smart`, …) are NOT handled here — they
 * stay with the legacy `parseAutoPrefix` path so existing behavior is unchanged.
 */
export function parseAutoSuffix(suffix: string | null | undefined): ParsedAutoSuffix {
  if (typeof suffix !== "string" || suffix.length === 0) return { valid: false };
  const parts = suffix.split(":");
  if (parts.length > 2) return { valid: false };
  const [head, tail] = parts;

  if (tail !== undefined) {
    if (!CATEGORY_SET.has(head) || !TIER_SET.has(tail)) return { valid: false };
    return { valid: true, category: head as AutoCategory, tier: tail as AutoTier };
  }
  if (CATEGORY_SET.has(head)) return { valid: true, category: head as AutoCategory };
  return { valid: false };
}

/**
 * Map a tier to the mode-pack variant used for scoring weights.
 * `floor` is an alias of `cheap`. `free`/`pro` carry no weight bias (they default to
 * the quality-first pack) — their effect is the candidate filter below.
 * `reliable` resolves to the dedicated reliability pack handled in the factory.
 */
export function tierToWeightVariant(tier?: AutoTier): AutoVariant | "reliability" | undefined {
  switch (tier) {
    case "fast":
      return "fast";
    case "cheap":
    case "floor":
      return "cheap";
    case "reliable":
      return "reliability";
    default:
      return undefined;
  }
}

interface PoolCandidate {
  provider: string;
  model: string;
}

/**
 * Build a candidate filter from category + tier. Returns `null` when no filtering is
 * needed (coding/chat with no model-tier constraint), so the caller can skip the pass.
 * Category and tier checks are AND-combined.
 */
export function buildAutoCandidateFilter(
  category?: AutoCategory,
  tier?: AutoTier
): ((candidate: PoolCandidate) => boolean) | null {
  const checks: Array<(c: PoolCandidate) => boolean> = [];

  if (category === "vision" || category === "multimodal") {
    checks.push((c) => {
      try {
        const caps = getResolvedModelCapabilities({ provider: c.provider, model: c.model });
        return caps.supportsVision === true || isVisionModelId(c.model);
      } catch {
        return isVisionModelId(c.model);
      }
    });
  }
  if (category === "reasoning") {
    checks.push((c) => {
      try {
        const caps = getResolvedModelCapabilities({ provider: c.provider, model: c.model });
        return caps.reasoning === true || caps.supportsThinking === true;
      } catch {
        return false;
      }
    });
  }
  if (tier === "free") {
    checks.push((c) => safeClassifyTier(c) === "free");
  }
  if (tier === "pro") {
    checks.push((c) => safeClassifyTier(c) === "premium");
  }

  if (checks.length === 0) return null;
  return (candidate: PoolCandidate) => checks.every((fn) => fn(candidate));
}

function safeClassifyTier(c: PoolCandidate): string {
  try {
    return classifyTier(c.provider, c.model).tier;
  } catch {
    return "cheap";
  }
}
