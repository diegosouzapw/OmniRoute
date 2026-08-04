import { NextResponse } from "next/server";

/**
 * Providers that have NO browser OAuth flow at all — their credentials are read
 * from the OS keychain via a dedicated Import button, not an OAuth
 * authorize/exchange. They are listed in the OAuth provider *catalog*
 * (so the dashboard shows them) but have no entry in the OAuth provider
 * *handler* registry, so hitting the generic OAuth route for them threw an
 * unhandled `Unknown provider: <id>` 500 (#6041). Return a clear, actionable
 * response pointing at the Import flow instead.
 *
 * Extracted from the OAuth route handler into this leaf module so the route
 * stays under its frozen file-size cap (#6155 base-red follow-up).
 */
export const KEYCHAIN_IMPORT_ONLY_PROVIDERS = new Set(["zed"]);

/** GET/POST OAuth actions that don't apply to keychain-import-only providers. */
export const OAUTH_FLOW_ACTIONS = new Set([
  "authorize",
  "device-code",
  "start-callback-server",
  "poll-callback",
  "exchange",
  "poll",
  "device-complete",
]);

function keychainImportOnlyResponse(provider: string) {
  return NextResponse.json(
    {
      error:
        `${provider} has no browser OAuth flow — it imports LLM credentials from the ` +
        `OS keychain. Use the "Import" button on the ${provider} provider card in the ` +
        `dashboard to discover and import them automatically.`,
    },
    { status: 400 }
  );
}

/**
 * If `provider` is keychain-import-only and `action` is an OAuth-flow action,
 * return the graceful 400 response; otherwise return null so the caller falls
 * through to normal OAuth handling.
 */
export function keychainImportOnlyGuard(provider: string, action: string): NextResponse | null {
  if (KEYCHAIN_IMPORT_ONLY_PROVIDERS.has(provider) && OAUTH_FLOW_ACTIONS.has(action)) {
    return keychainImportOnlyResponse(provider);
  }
  return null;
}
