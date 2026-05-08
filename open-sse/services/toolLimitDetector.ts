import { MAX_TOOLS_LIMIT } from "../config/constants.ts";

interface ToolLimitCache {
  limit: number;
  timestamp: number;
}

const TOOL_LIMIT_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const toolLimitCache = new Map<string, ToolLimitCache>();

export function getDetectedToolLimit(provider: string): number {
  const cached = toolLimitCache.get(provider);
  if (cached && Date.now() - cached.timestamp < TOOL_LIMIT_CACHE_TTL_MS) {
    return cached.limit;
  }
  return MAX_TOOLS_LIMIT;
}

export function setDetectedToolLimit(provider: string, limit: number): void {
  toolLimitCache.set(provider, { limit, timestamp: Date.now() });
}

export function parseToolLimitFromError(errorMessage: string, statusCode: number): number | null {
  if (statusCode !== 400) return null;

  const patterns = [
    /['"]tools['"]:\s*maximum\s+number\s+of\s+items\s+is\s+(\d+)/i,
    /maximum\s+number\s+of\s+tools\s+(?:is\s+)?(\d+)/i,
    /tools.*limit.*?(\d+)/i,
    /too\s+many\s+tools.*?(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = errorMessage.match(pattern);
    if (match) {
      const limit = parseInt(match[1], 10);
      if (limit > 0 && limit <= 10000) {
        return limit;
      }
    }
  }

  return null;
}

export function shouldDetectLimit(errorMessage: string, statusCode: number): boolean {
  if (statusCode !== 400) return false;
  const lowerMsg = errorMessage.toLowerCase();
  return (lowerMsg.includes("tool") || lowerMsg.includes("tools")) && lowerMsg.includes("maximum");
}

export function clearToolLimitCache(): void {
  toolLimitCache.clear();
}
