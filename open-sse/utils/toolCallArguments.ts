export function appendToolCallArgumentDelta(current: unknown, incoming: unknown): string {
  const existing = typeof current === "string" ? current : "";
  const next = typeof incoming === "string" ? incoming : "";

  if (!existing || !next) return existing + next;
  if (existing.endsWith(next)) return existing;
  if (next.startsWith(existing)) return next;

  const maxOverlap = Math.min(existing.length, next.length);
  for (let size = maxOverlap; size > 0; size -= 1) {
    if (existing.endsWith(next.slice(0, size))) {
      return existing + next.slice(size);
    }
  }

  return existing + next;
}
