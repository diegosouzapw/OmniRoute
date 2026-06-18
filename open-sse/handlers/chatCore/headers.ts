export function getHeaderValueCaseInsensitive(
  headers: Record<string, unknown> | Headers | null | undefined,
  targetName: string
) {
  if (!headers || typeof headers !== "object") return null;
  if (headers instanceof Headers) {
    return headers.get(targetName);
  }
  const lowered = targetName.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lowered && typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}
