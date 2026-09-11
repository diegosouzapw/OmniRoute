import { AI_PROVIDERS } from "@/shared/constants/providers";

export type UpdateStep = {
  step: string;
  status: string;
  message: string;
};

export type VersionInfo = {
  current: string;
  latest: string;
  updateAvailable: boolean;
  channel: string;
  autoUpdateSupported: boolean;
  autoUpdateError?: string | null;
};

export type HomePageClientProps = {
  machineId?: string;
};

export type ProviderSummaryItem = {
  id: string;
  provider: {
    id: string;
    name: string;
    color?: string;
    textIcon?: string;
    alias?: string;
  };
  total: number;
  connected: number;
  errors: number;
  modelCount: number;
  authType: "free" | "oauth" | "apikey" | string;
};

export type ProviderMetricSummary = {
  totalRequests?: number;
  totalSuccesses?: number;
  successRate?: number;
  avgLatencyMs?: number;
  lastRequestAt?: string | null;
  lastErrorAt?: string | null;
  lastStatus?: number | null;
  lastErrorStatus?: number | null;
};

export type ProviderModelSummary = {
  fullModel: string;
  alias?: string;
  model?: string;
};

export const PROVIDER_ALIAS_TO_ID = new Map(
  Object.entries(AI_PROVIDERS)
    .flatMap(([providerId, providerInfo]) =>
      providerInfo.alias ? [[providerInfo.alias.toLowerCase(), providerId]] : []
    )
    .filter((entry): entry is [string, string] => entry.length === 2)
);

export function normalizeProviderId(providerId?: string | null): string {
  const normalized = typeof providerId === "string" ? providerId.trim().toLowerCase() : "";
  if (!normalized) return "";
  return AI_PROVIDERS[normalized] ? normalized : PROVIDER_ALIAS_TO_ID.get(normalized) || normalized;
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function mergeUpdateStep(steps: UpdateStep[], nextStep: UpdateStep) {
  const idx = steps.findIndex((step) => step.step === nextStep.step);
  if (idx === -1) {
    return [...steps, nextStep];
  }

  const next = [...steps];
  next[idx] = nextStep;
  return next;
}

// Quick-start link classes, extracted so each <Link> still fits on one line with
// prefetch={false} (#8281) — HomePageClient is size-frozen.
export const INLINE_LINK = "text-primary hover:underline";
export const DOCS_LINK =
  "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors";

// Apple bento tokens for the /home quick-start grid (#11899).
export const BENTO_CARD =
  "rounded-[18px] bg-[#F5F5F7] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 p-6 flex gap-4";
export const BENTO_ICON =
  "flex items-center justify-center size-10 rounded-2xl shrink-0 border border-black/5 dark:border-white/10";
export const BENTO_TITLE =
  "text-[15px] font-semibold tracking-tight text-[#1D1D1F] dark:text-text-main";
export const BENTO_DESC = "text-[13px] leading-relaxed text-text-muted mt-1";

// Stable no-op subscription for useSyncExternalStore reads of never-changing
// browser globals (location.origin does not change without a full navigation).
export function emptySubscribe() {
  return () => {};
}
