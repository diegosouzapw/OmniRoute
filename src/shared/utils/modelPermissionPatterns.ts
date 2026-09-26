export function modelPatternMatches(pattern: string, candidates: string[]): boolean {
  return candidates.some((candidate) => {
    if (pattern === candidate) return true;
    if (pattern.endsWith("/*")) return candidate.startsWith(pattern.slice(0, -1));
    return pattern.includes("*") && matchesWildcardPattern(pattern, candidate);
  });
}

export function matchesWildcardPattern(pattern: string, candidate: string): boolean {
  const patternSegments = pattern.split("/");
  const candidateSegments = candidate.split("/");
  return (
    patternSegments.length === candidateSegments.length &&
    patternSegments.every((segment, index) =>
      segmentMatchesWildcard(segment, candidateSegments[index])
    )
  );
}

export function segmentMatchesWildcard(pattern: string, segment: string): boolean {
  if (pattern === segment) return true;
  if (!pattern.includes("*")) return false;
  const parts = pattern.split("*");
  let cursor = 0;
  const first = parts[0];
  if (first) {
    if (!segment.startsWith(first)) return false;
    cursor = first.length;
  }
  const last = parts[parts.length - 1];
  const endLimit = segment.length - last.length;
  if (last && !segment.endsWith(last)) return false;
  for (let index = 1; index < parts.length - 1; index++) {
    const piece = parts[index];
    if (!piece) continue;
    const position = segment.indexOf(piece, cursor);
    if (position === -1 || position + piece.length > endLimit) return false;
    cursor = position + piece.length;
  }
  return cursor <= endLimit;
}
