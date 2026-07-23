/**
 * Fast object-tree size estimator — walks without JSON.stringify.
 * Safe for circular references (uses WeakSet).
 * Early-exits at 256KB to avoid wasting CPU on huge payloads.
 */
export function estimateSizeFast(value: unknown): number {
  let bytes = 0;
  const stack: unknown[] = [value];
  const seen = new WeakSet();
  while (stack.length > 0) {
    const v = stack.pop();
    if (v === null || v === undefined) continue;
    if (typeof v === "string") {
      bytes += v.length;
      if (bytes > 262144) return bytes;
    } else if (typeof v === "number") bytes += 8;
    else if (typeof v === "boolean") bytes += 4;
    else if (typeof v === "object") {
      if (seen.has(v as object)) continue;
      seen.add(v as object);
      if (Array.isArray(v)) {
        for (let i = 0; i < v.length; i++) stack.push(v[i]);
      } else {
        for (const key in v) {
          if (Object.prototype.hasOwnProperty.call(v, key)) stack.push((v as Record<string, unknown>)[key]);
        }
      }
    }
  }
  return bytes;
}

export function isSmallEnoughForSemanticCache(value: unknown): boolean {
  return estimateSizeFast(value) <= 256 * 1024;
}
