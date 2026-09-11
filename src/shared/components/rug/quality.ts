/**
 * Device tiering for the weaving renderer.
 *
 * The illusion has to survive on a mid-range phone, so quality is chosen up
 * front from what the device reports and then lowered again if frames actually
 * come in slow. Fibre density and shader octaves drop before resolution does:
 * a softer weave still reads as textile, a pixellated one does not.
 */
export type QualityTier = "high" | "medium" | "low";

export interface QualitySettings {
  /** Ceiling on devicePixelRatio. */
  maxDpr: number;
  /** Ceiling on total drawing-buffer pixels, whatever the DPR works out to. */
  pixelBudget: number;
  /** Octaves of fibre detail. */
  octaves: number;
  /** Whether the weaving front carries live thread tension. */
  tension: boolean;
}

export const QUALITY: Record<QualityTier, QualitySettings> = {
  high: { maxDpr: 2, pixelBudget: 2_600_000, octaves: 3, tension: true },
  medium: { maxDpr: 1.6, pixelBudget: 1_400_000, octaves: 2, tension: true },
  low: { maxDpr: 1.15, pixelBudget: 700_000, octaves: 1, tension: false },
};

const TIER_ORDER: QualityTier[] = ["high", "medium", "low"];

/** The next tier down, or null at the bottom. */
export function lowerTier(tier: QualityTier): QualityTier | null {
  return TIER_ORDER[TIER_ORDER.indexOf(tier) + 1] ?? null;
}

interface NavigatorCapabilities extends Navigator {
  deviceMemory?: number;
}

/**
 * Initial tier, from what the device is willing to tell us. Deliberately
 * conservative: it is cheaper to start at medium and stay smooth than to start
 * at high and stutter through the first scroll.
 */
export function detectTier(): QualityTier {
  if (typeof window === "undefined") return "medium";

  const nav = navigator as NavigatorCapabilities;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const dpr = window.devicePixelRatio || 1;

  if (cores <= 4 || memory <= 2) return "low";
  if (coarse && (cores <= 6 || memory <= 4)) return "medium";
  // A large, dense desktop display is a lot of pixels for an integrated GPU.
  if (!coarse && cores >= 8 && memory >= 8) return dpr > 2.5 ? "medium" : "high";
  return "medium";
}

/**
 * Rolling frame-time watch. Reports once when the recent average has been over
 * budget for a full window, and never recovers upward — flapping between tiers
 * is more visible than staying one notch low.
 */
export class FrameBudget {
  private readonly samples: number[] = [];
  private tripped = false;

  constructor(
    private readonly budgetMs = 24,
    private readonly window = 45
  ) {}

  /** Returns true exactly once, on the frame the budget is judged blown. */
  record(frameMs: number): boolean {
    if (this.tripped) return false;
    // Ignore the first frames after init and any single stall (a tab switch,
    // a GC pause); only a sustained average counts.
    if (frameMs > 250) return false;
    this.samples.push(frameMs);
    if (this.samples.length < this.window) return false;
    if (this.samples.length > this.window) this.samples.shift();

    const mean = this.samples.reduce((a, b) => a + b, 0) / this.samples.length;
    if (mean <= this.budgetMs) return false;
    this.tripped = true;
    return true;
  }

  reset(): void {
    this.samples.length = 0;
    this.tripped = false;
  }
}
