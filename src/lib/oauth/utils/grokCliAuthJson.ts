/**
 * Grok Build (grok-cli) paste-import validation (#7610).
 *
 * The paste-token import path used to accept a bare JWT ("key" field only),
 * which creates a connection with refresh_token=null that can never
 * auto-refresh and dies at expiry. This module requires the full
 * ~/.grok/auth.json object (validating that a refresh_token is present
 * somewhere in it) before the paste is accepted.
 *
 * Extracted from OAuthModal.tsx so it can be unit-tested directly (and to
 * keep the frozen file-size gate on OAuthModal.tsx from growing).
 */
export type GrokCliPasteTokenResult =
  | { ok: true; token: string | Record<string, unknown> }
  | { ok: false; error: string };

export function parseGrokCliPasteToken(raw: string): GrokCliPasteTokenResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste the full contents of ~/.grok/auth.json" };
  }
  // Full auth.json object (preferred — includes refresh_token).
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return {
          ok: false,
          error: "auth.json must be a JSON object from ~/.grok/auth.json",
        };
      }
      const doc = parsed as Record<string, unknown>;
      let hasKey = false;
      let hasRefresh = false;
      for (const entry of Object.values(doc)) {
        if (!entry || typeof entry !== "object") continue;
        const obj = entry as Record<string, unknown>;
        if (typeof obj.key === "string" && obj.key.startsWith("eyJ")) {
          hasKey = true;
          if (typeof obj.refresh_token === "string" && obj.refresh_token.length > 0) {
            hasRefresh = true;
            break;
          }
        }
        if (typeof obj.access_token === "string" && obj.access_token.startsWith("eyJ")) {
          hasKey = true;
          if (typeof obj.refresh_token === "string" && obj.refresh_token.length > 0) {
            hasRefresh = true;
            break;
          }
        }
      }
      if (!hasKey) {
        return {
          ok: false,
          error:
            'Could not find a Grok Build JWT ("key") in the pasted auth.json. Run `grok login` and paste the full file.',
        };
      }
      if (!hasRefresh) {
        return {
          ok: false,
          error:
            "auth.json is missing refresh_token. Re-run `grok login` and paste the full ~/.grok/auth.json so the connection can auto-refresh (#7610).",
        };
      }
      return { ok: true, token: doc };
    } catch {
      return {
        ok: false,
        error: "Could not parse auth.json. Paste the full JSON from ~/.grok/auth.json.",
      };
    }
  }
  // Bare JWT — deliberately rejected so connections are not created without refresh_token.
  if (trimmed.startsWith("eyJ")) {
    return {
      ok: false,
      error:
        'Do not paste only the JWT "key" field. Paste the full ~/.grok/auth.json object so refresh_token is included (#7610).',
    };
  }
  return {
    ok: false,
    error: "Paste the full contents of ~/.grok/auth.json (JSON object).",
  };
}
