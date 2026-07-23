import { NextResponse } from "next/server";
import { createProviderConnection } from "@/models";
import { parseTraeCallbackQuery } from "./parseCallback";

/**
 * GET /authorize
 *
 * Loopback callback for the Trae SOLO desktop OAuth flow (auth_from=solo).
 * Trae's authorize server validates that auth_callback_url ends with the
 * literal `/authorize` path — any other path makes the page short-circuit
 * to "Login Failed". So this handler lives at the app root, not under
 * /api/oauth/trae/. The provider tag is implicit (only Trae uses /authorize).
 *
 * Receives the redirect from https://www.trae.ai/authorization after the user
 * confirms login. Trae's auth server packs the entire credential set into
 * query parameters (no separate token-exchange HTTP call exists):
 *
 *   userJwt   — JSON string with { ClientID, Token, RefreshToken, TokenExpireAt,
 *               RefreshExpireAt, TokenExpireDuration }
 *   userInfo  — JSON string with { UserID, TenantID, Region, AIRegion, ... }
 *   refreshToken, loginTraceID, host, refreshExpireAt, userRegion, scope — flat fields
 *
 * We parse the bundle, persist a connection via `createProviderConnection`
 * (which encrypts the token), and return an HTML page that postMessages the
 * opening window before closing itself — that's how TraeAuthModal knows
 * the import succeeded.
 *
 * State validation: the caller passes its UUID as `login_trace_id` in the
 * authorize URL; Trae echoes it back as `loginTraceID`. The modal verifies
 * the echoed state before trusting the postMessage.
 */
function htmlClose(message: Record<string, unknown>): NextResponse {
  // Embedding values: only emit the small/sanitized status payload — never the
  // raw token. We post to the loopback origin pair (localhost + 127.0.0.1) on
  // this same port rather than "*": Trae forces the callback onto 127.0.0.1,
  // but the dashboard opener is usually on localhost, so a single
  // window.location.origin target would silently drop the message. Restricting
  // to the two known loopback hosts keeps it secure (CWE-359) and working.
  const safe = JSON.stringify({
    type: "trae-oauth-callback",
    ...message,
  }).replace(/</g, "\\u003c");
  return new NextResponse(
    `<!doctype html><html><body style="font:16px sans-serif;padding:40px">
      <h2 style="margin:0 0 8px">Trae authorization ${message.success ? "✓" : "failed"}</h2>
      <p>${message.success ? "You can close this window." : "Return to the dashboard."}</p>
      <script>
        (function () {
          try {
            if (!window.opener) return;
            var msg = ${safe};
            var loc = window.location;
            var targets = [loc.origin];
            var alt = loc.hostname === "127.0.0.1" ? "localhost" : loc.hostname === "localhost" ? "127.0.0.1" : null;
            if (alt) targets.push(loc.protocol + "//" + alt + (loc.port ? ":" + loc.port : ""));
            targets.forEach(function (t) { try { window.opener.postMessage(msg, t); } catch (e) {} });
          } catch (e) {}
        })();
        setTimeout(function () { window.close(); }, ${message.success ? 800 : 4000});
      </script>
    </body></html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams;
  const parsed = parseTraeCallbackQuery(q);
  if (!parsed.ok) {
    return htmlClose({ success: false, error: parsed.error });
  }
  try {
    const connection: any = await createProviderConnection(parsed.record);
    return htmlClose({
      success: true,
      connectionId: connection.id,
      loginTraceId: q.get("loginTraceID") || null,
    });
  } catch (err: any) {
    console.error("[trae callback] error:", err);
    return htmlClose({ success: false, error: "Internal error during callback" });
  }
}
