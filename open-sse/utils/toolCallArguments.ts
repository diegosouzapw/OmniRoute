export function appendToolCallArgumentDelta(current: unknown, incoming: unknown): string {
  const existing = typeof current === "string" ? current : "";
  const next = typeof incoming === "string" ? incoming : "";

  if (!existing || !next) return existing + next;
  if (existing.endsWith(next)) return existing;
  if (next.startsWith(existing)) return next;

  const maxOverlap = Math.min(existing.length, next.length);
  const firstChar = next[0];
  const startIdx = existing.length - maxOverlap;

  for (let i = startIdx; i < existing.length; i++) {
    if (existing[i] === firstChar) {
      const overlapLength = existing.length - i;
      if (existing.endsWith(next.slice(0, overlapLength))) {
        return existing + next.slice(overlapLength);
      }
    }
  }

  return existing + next;
}
