/**
 * normalizeHeaders — cross-undici-instance Headers normalizer.
 *
 * On Node 24, accessing an undici-backed `Headers` object that was constructed
 * by a *different* undici copy (e.g. a mock global `Response` in tests, or a
 * version mismatch between undici instances bundled into different workspaces)
 * throws `Cannot read private member #headers` because undici guards its internal
 * state with private class fields.
 *
 * This helper avoids that crash by iterating through the public iterable API
 * (`forEach`, then `entries`) first, falling back to plain-object enumeration
 * for any non-standard map-like value.
 *
 * Always returns a plain `Record<string, string>` with lower-cased keys so
 * callers never need to worry about header case sensitivity.
 */
export function normalizeHeaders(h: unknown): Record<string, string> {
  if (!h) return {};
  const out: Record<string, string> = {};

  // Preferred path: forEach avoids creating an iterator object
  try {
    if (typeof (h as Headers).forEach === "function") {
      (h as Headers).forEach((value: string, key: string) => {
        out[key.toLowerCase()] = value;
      });
      return out;
    }
  } catch {
    // fall through — different undici instance, try next approach
  }

  // Second path: entries() iterator
  try {
    if (typeof (h as Headers).entries === "function") {
      for (const [k, v] of (h as Headers).entries()) {
        out[k.toLowerCase()] = String(v);
      }
      return out;
    }
  } catch {
    // fall through — try plain object enumeration
  }

  // Final fallback: treat as plain object
  if (typeof h === "object") {
    for (const [k, v] of Object.entries(h as Record<string, unknown>)) {
      out[k.toLowerCase()] = String(v ?? "");
    }
  }
  return out;
}

/**
 * Convenience wrapper: get a header value from any headers-like object.
 * Returns null (same contract as `Headers.prototype.get`) when absent.
 */
export function getHeader(h: unknown, name: string): string | null {
  const plain = normalizeHeaders(h);
  return plain[name.toLowerCase()] ?? null;
}
