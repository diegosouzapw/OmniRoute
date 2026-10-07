/**
 * NextAuth session-token cookie helpers shared by web-cookie providers that
 * authenticate via __Secure-next-auth.session-token (for example, Perplexity Web).
 *
 * Rotation can change the shape (unchunked → chunked or vice versa). When that
 * happens, every old family member must be dropped — keeping the stale variant
 * alongside the new one would send both, and depending on parser precedence the
 * server could read the stale value and fail auth.
 */
export const SESSION_TOKEN_FAMILY_RE = /^__Secure-next-auth\.session-token(?:\.\d+)?$/;

/**
 * Merge any rotated session-token chunks from a Set-Cookie response into the
 * original cookie blob, preserving every other cookie the caller pasted
 * (cf_clearance, __cf_bm, _cfuvid, …). Returns null if no rotation occurred
 * or the rotated chunks match what's already there.
 */
export function mergeRefreshedCookie(
  originalCookie: string,
  setCookieHeader: string | null
): string | null {
  if (!setCookieHeader) return null;
  const matches = Array.from(
    setCookieHeader.matchAll(/(__Secure-next-auth\.session-token(?:\.\d+)?)=([^;,\s]+)/g)
  );
  if (matches.length === 0) return null;

  const refreshed = new Map<string, string>();
  for (const m of matches) refreshed.set(m[1], m[2]);

  let blob = originalCookie.trim();
  if (/^cookie\s*:\s*/i.test(blob)) blob = blob.replace(/^cookie\s*:\s*/i, "");

  // Bare value (no `=`): the original was just the session-token contents.
  if (!/=/.test(blob)) {
    return Array.from(refreshed, ([k, v]) => `${k}=${v}`).join("; ");
  }

  const pairs = blob.split(/;\s*/).filter(Boolean);
  const result: string[] = [];
  let mutated = false;
  let droppedStale = false;
  for (const pair of pairs) {
    const eqIdx = pair.indexOf("=");
    if (eqIdx < 0) {
      result.push(pair);
      continue;
    }
    const name = pair.slice(0, eqIdx).trim();
    const value = pair.slice(eqIdx + 1);
    if (SESSION_TOKEN_FAMILY_RE.test(name)) {
      if (!refreshed.has(name) || refreshed.get(name) !== value) mutated = true;
      droppedStale = true;
      continue;
    }
    result.push(`${name}=${value}`);
  }
  for (const [name, value] of refreshed) {
    result.push(`${name}=${value}`);
  }
  if (!droppedStale) mutated = true;
  return mutated ? result.join("; ") : null;
}

/**
 * Build the Cookie header value from whatever the user pasted.
 *
 * Accepts bare values, unchunked/chunked cookie lines, and full DevTools
 * "Cookie: …" headers.
 */
export function buildSessionCookieHeader(rawInput: string): string {
  let s = rawInput.trim();
  if (/^cookie\s*:\s*/i.test(s)) s = s.replace(/^cookie\s*:\s*/i, "");
  if (/__Secure-next-auth\.session-token(?:\.\d+)?\s*=/.test(s)) {
    return s;
  }
  return `__Secure-next-auth.session-token=${s}`;
}
