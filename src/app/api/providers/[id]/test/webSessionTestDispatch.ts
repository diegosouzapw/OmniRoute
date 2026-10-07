import { getWebSessionCredentialRequirement } from "@/shared/providers/webSessionCredentials";

/**
 * Token-kind web-session providers (`getWebSessionCredentialRequirement(...).kind ===
 * "token"`) that actually have a token-aware connection validator wired up in
 * `src/lib/providers/validation.ts`'s `SPECIALTY_VALIDATORS` map — either a dedicated
 * `validate*WebProvider` entry, or (zai-web) a token-aware branch inside the generic
 * `validateWebCookieProvider` probe (`src/lib/providers/validation/webCookie.ts`).
 *
 * `WEB_SESSION_CREDENTIAL_REQUIREMENTS` currently marks more providers as `kind: "token"`
 * than have a matching validator (e.g. t3-chat-web, promptql). Those fall
 * through to `validateWebCookieProvider`'s generic probe, which
 * sends the stored credential as a `Cookie` header and treats most non-401/403 responses
 * as valid — the wrong wire format for a token-authenticated provider, so an invalid
 * token can be reported as a healthy connection. Keep this set in sync with
 * `SPECIALTY_VALIDATORS` (and the zai-web branch in `webCookie.ts`): add a provider here
 * only after it has a real token-aware validator.
 */
const TOKEN_AWARE_VALIDATED_WEB_SESSION_PROVIDERS = new Set([
  "deepseek-web",
  "kimi-web",
  "tinycms-web",
  "copilot-m365-web",
  "copilot-web",
  "zai-web",
]);

export function shouldUseApiKeyConnectionTest(authType: unknown, providerId: unknown): boolean {
  if (authType === "apikey") return true;
  if (authType !== "cookie") return false;
  if (getWebSessionCredentialRequirement(providerId)?.kind !== "token") return false;
  return (
    typeof providerId === "string" && TOKEN_AWARE_VALIDATED_WEB_SESSION_PROVIDERS.has(providerId)
  );
}
