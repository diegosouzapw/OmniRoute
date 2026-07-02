type JsonRecord = Record<string, unknown>;

export type RoutingTagMatchMode = "any" | "all";

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function normalizeSingleRoutingTag(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

export function normalizeRoutingTags(value: unknown): string[] {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];

  const deduped = new Set<string>();
  for (const rawValue of rawValues) {
    const normalized = normalizeSingleRoutingTag(rawValue);
    if (normalized) deduped.add(normalized);
  }
  return Array.from(deduped);
}

export function normalizeRoutingTagMatchMode(value: unknown): RoutingTagMatchMode {
  const normalized =
    typeof value === "string" ? value.trim().toLowerCase() : typeof value === "number" ? "" : "";
  return normalized === "all" ? "all" : "any";
}

export function getConnectionRoutingTags(providerSpecificData: unknown): string[] {
  return normalizeRoutingTags(asRecord(providerSpecificData).tags);
}

export function matchesRoutingTags(
  connectionTags: string[],
  requestTags: string[],
  matchMode: RoutingTagMatchMode = "any"
): boolean {
  if (requestTags.length === 0) return true;
  if (connectionTags.length === 0) return false;

  const tagSet = new Set(connectionTags);
  if (matchMode === "all") {
    return requestTags.every((tag) => tagSet.has(tag));
  }
  return requestTags.some((tag) => tagSet.has(tag));
}

export function resolveRequestRoutingTags(body: Record<string, unknown> | null | undefined): {
  tags: string[];
  matchMode: RoutingTagMatchMode;
} {
  const metadata = asRecord(body?.metadata);
  return {
    tags: normalizeRoutingTags(metadata.tags),
    matchMode: normalizeRoutingTagMatchMode(metadata.tag_match_mode ?? metadata.tagMatchMode),
  };
}
