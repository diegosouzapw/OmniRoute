/**
 * NextAuth session-cookie rotation helpers.
 *
 * Shared by cookie-session web providers (chatgpt-web, perplexity-web, …)
 * that store `__Secure-next-auth.session-token` (possibly chunked) in the
 * connection apiKey / cookie blob and must persist Set-Cookie rotations.
 */

// Session-token family — NextAuth uses one of these depending on token size:
//   __Secure-next-auth.session-token            (unchunked, < 4KB)
//   __Secure-next-auth.session-token.0          (chunked, first piece)
//   __Secure-next-auth.session-token.N          (chunked, additional pieces)
// Rotation can change the shape (unchunked → chunked or vice versa). When
// that happens, every old family member must be dropped — keeping the stale
// variant alongside the new one would send both, and depending on parser
// precedence the server could read the stale value and fail auth.
export const SESSION_TOKEN_FAMILY_RE = /^__Secure-next-auth\.session-token(?:\.\d+)?$/;

/**
 * Merge any rotated session-token chunks from a Set-Cookie response into the
 * original cookie blob, preserving every other cookie the caller pasted
 * (cf_clearance, __cf_bm, _cfuvid, _puid, ...). Returns null if no rotation
 * occurred or the rotated chunks match what's already there.
 *
 * Returning only the matched session-token chunks here was a bug: when the
 * caller pastes a full DevTools Cookie line (the recommended form), the
 * Cloudflare cookies are required for subsequent requests, and dropping
 * them re-triggers `cf-mitigated: challenge`.
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
  // Replace with the new chunked form.
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
    // Drop ALL session-token-family members from the original — we'll
    // append the refreshed set below. This handles unchunked→chunked and
    // chunked→unchunked rotations, where keeping the old name would leave
    // the stale token visible alongside the new one.
    if (SESSION_TOKEN_FAMILY_RE.test(name)) {
      if (!refreshed.has(name) || refreshed.get(name) !== value) mutated = true;
      droppedStale = true;
      continue;
    }
    result.push(`${name}=${value}`);
  }
  // Append the full refreshed family.
  for (const [name, value] of refreshed) {
    result.push(`${name}=${value}`);
  }
  if (!droppedStale) mutated = true; // refreshed chunks were entirely new
  return mutated ? result.join("; ") : null;
}


/**
 * Collect every Set-Cookie value from a fetch Headers object.
 * `Headers.get("set-cookie")` is unreliable when multiple cookies are present
 * (some runtimes join with ", " which breaks cookie parsing). Prefer getSetCookie
 * when available.
 */
export function collectSetCookieHeader(headers: Headers | null | undefined): string | null {
  if (!headers) return null;
  const anyHeaders = headers as Headers & { getSetCookie?: () => string[] };
  if (typeof anyHeaders.getSetCookie === "function") {
    const list = anyHeaders.getSetCookie();
    if (Array.isArray(list) && list.length > 0) return list.join(", ");
  }
  return headers.get("set-cookie");
}
