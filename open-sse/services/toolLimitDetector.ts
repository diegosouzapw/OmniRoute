import { MAX_TOOLS_LIMIT } from "../config/constants.ts";

const DETECTED_LIMITS = new Map<string, { limit: number; timestamp: number }>();
const TTL_MS = 24 * 60 * 60 * 1000;
const DEFAULT_LIMIT = MAX_TOOLS_LIMIT;

const PROVIDER_TOOL_LIMITS: Record<string, number> = {
  "grok-cli": 200,
  "nvidia": 1536,
};

const _detectedLimitsSweep = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of DETECTED_LIMITS) {
    if (now - entry.timestamp > TTL_MS) DETECTED_LIMITS.delete(key);
  }
}, 60_000);
if (typeof _detectedLimitsSweep === "object" && "unref" in _detectedLimitsSweep) {
  (_detectedLimitsSweep as { unref?: () => void }).unref?.();
}

export function getKnownToolLimit(provider: string | null | undefined): number | null {
  const proactiveLimit = PROVIDER_TOOL_LIMITS[provider];
  if (proactiveLimit !== undefined) {
    return proactiveLimit;
  }
  const cached = DETECTED_LIMITS.get(provider);
  if (cached && Date.now() - cached.timestamp < TTL_MS) {
    return cached.limit;
  }
  return null;
}

export function getEffectiveToolLimit(provider: string | null | undefined): number {
  return getKnownToolLimit(provider) ?? DEFAULT_LIMIT;
}

export function setDetectedToolLimit(provider: string, limit: number): void {
  const current = getEffectiveToolLimit(provider);
  if (limit < current) {
    DETECTED_LIMITS.set(provider, { limit, timestamp: Date.now() });
  }
}

const TOOL_LIMIT_PATTERNS = [
  /'tools':\s*maximum\s+number\s+of\s+items\s+is\s+(\d+)/i,
  /Maximum\s+number\s+of\s+tools\s+(?:allowed\s+)?(?:is\s+)?(\d+)/i,
  /Too\s+many\s+tools\.?\s*(?:Maximum\s+)?(\d+)/i,
  /\d+\s+tools\s+have\s+been\s+provided\s+but\s+(?:the\s+)?maximum\s+is\s+(\d+)/i,
  /tool.*limit.*(\d+)/i,
  /tools.*exceeded.*(\d+)/i,
];

export function parseToolLimitFromError(errorMessage: string): number | null {
  for (const pattern of TOOL_LIMIT_PATTERNS) {
    const match = errorMessage.match(pattern);
    if (match && match[1]) {
      const limit = parseInt(match[1], 10);
      if (limit > 0 && limit <= 10000) {
        return limit;
      }
    }
  }
  return null;
}

const TOOL_LIMIT_ERROR_INDICATORS = [
  "maximum number of tools",
  "too many tools",
  "tools limit",
  "'tools'",
  "maximum number of items",
];

export function shouldDetectLimit(errorMessage: string, statusCode: number): boolean {
  if (statusCode !== 400) return false;
  const lower = errorMessage.toLowerCase();
  return TOOL_LIMIT_ERROR_INDICATORS.some((indicator) => lower.includes(indicator));
}

export function getDetectedToolLimit(provider: string): number {
  return getEffectiveToolLimit(provider);
}

export function clearDetectedLimits(): void {
  DETECTED_LIMITS.clear();
}
