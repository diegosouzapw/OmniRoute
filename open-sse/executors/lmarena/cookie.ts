/**
 * LMArena / arena.ai session cookie reconstruction.
 * Supabase SSR splits `arena-auth-prod-v1` across `.0`, `.1`, … chunks.
 */

export const LMARENA_AUTH_COOKIE = "arena-auth-prod-v1";

interface ParsedCookie {
  name: string;
  value: string;
}

/**
 * Parse a raw `Cookie:`-style blob (`name=value; name2=value2; …`) into an
 * ordered list of name/value pairs. Whitespace around names is trimmed; values
 * are kept verbatim (they may legitimately contain `=`, e.g. base64 padding).
 */
function parseCookieBlob(blob: string): ParsedCookie[] {
  const pairs: ParsedCookie[] = [];
  for (const part of blob.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    const name = part.slice(0, eq).trim();
    if (!name) continue;
    const value = part.slice(eq + 1).trim();
    pairs.push({ name, value });
  }
  return pairs;
}

/**
 * Reconstruct LMArena's single `arena-auth-prod-v1` auth cookie from the
 * Supabase SSR chunked form.
 *
 * - Non-empty single cookie → returned unchanged (pre-migration back-compat).
 * - Otherwise join ascending `.N` chunks (no base64-decode / no JSON-parse).
 * - Neither single nor chunks → raw blob returned for the missing-cookie path.
 */
export function reconstructLMArenaCookie(rawCookie: string): string {
  if (!rawCookie || !rawCookie.trim()) return rawCookie;

  const pairs = parseCookieBlob(rawCookie);

  const existing = pairs.find((p) => p.name === LMARENA_AUTH_COOKIE);
  if (existing && existing.value) return rawCookie;

  const chunkPrefix = `${LMARENA_AUTH_COOKIE}.`;
  const chunks = new Map<number, string>();
  for (const { name, value } of pairs) {
    if (!name.startsWith(chunkPrefix)) continue;
    const idxRaw = name.slice(chunkPrefix.length);
    if (!/^\d+$/.test(idxRaw)) continue;
    chunks.set(Number(idxRaw), value);
  }

  const joinedParts: string[] = [];
  for (let i = 0; chunks.has(i); i++) {
    joinedParts.push(chunks.get(i) ?? "");
  }
  const joined = joinedParts.join("");
  if (!joined) return rawCookie;

  const preserved = pairs.filter(
    (p) => p.name !== LMARENA_AUTH_COOKIE && !p.name.startsWith(chunkPrefix)
  );
  return [`${LMARENA_AUTH_COOKIE}=${joined}`, ...preserved.map((p) => `${p.name}=${p.value}`)].join(
    "; "
  );
}

function buildLMArenaCookieFromStoredFields(data: Record<string, unknown>): string {
  const pairs: string[] = [];
  for (const [name, value] of Object.entries(data)) {
    if (name !== LMARENA_AUTH_COOKIE && !name.startsWith(`${LMARENA_AUTH_COOKIE}.`)) {
      continue;
    }
    if (typeof value !== "string" || !value.trim()) continue;
    pairs.push(`${name}=${value.trim()}`);
  }

  if (pairs.length === 0) return "";
  return reconstructLMArenaCookie(pairs.join("; "));
}

export function readLMArenaCookie(credentials: unknown): string {
  if (!credentials || typeof credentials !== "object") return "";
  const c = credentials as Record<string, unknown>;
  const direct = typeof c.cookie === "string" ? c.cookie : "";
  if (direct.trim()) return reconstructLMArenaCookie(direct);
  const apiKey = typeof c.apiKey === "string" ? c.apiKey : "";
  if (apiKey.trim()) return reconstructLMArenaCookie(apiKey);
  const topLevelChunks = buildLMArenaCookieFromStoredFields(c);
  if (topLevelChunks) return topLevelChunks;
  const psd = c.providerSpecificData;
  if (psd && typeof psd === "object") {
    const nestedData = psd as Record<string, unknown>;
    const nested = nestedData.cookie;
    if (typeof nested === "string" && nested.trim()) return reconstructLMArenaCookie(nested);
    const nestedChunks = buildLMArenaCookieFromStoredFields(nestedData);
    if (nestedChunks) return nestedChunks;
  }
  return "";
}
