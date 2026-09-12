/**
 * Providers whose 402 is a shared account wallet, not a per-model billing miss.
 *
 * Grok Build (`grok-cli`), grok.com cookie sessions (`grok-web`), and xAI
 * OAuth (`xai-oauth`) bill Chat/Imagine/Voice/Build/API against one weekly
 * percent pool. `passthroughModels: true` still stands for catalog/404
 * behaviour; it must not send this 402 through the #12242 model-only lockout,
 * or a combo of five grok-4.6 steps parks the empty account and then skips the
 * remaining live accounts as "model locked".
 *
 * `matchesSharedWalletCreditsBody` expects a pre-lowercased string.
 */
const SHARED_WALLET_402_PROVIDERS = new Set(["grok-cli", "grok-web", "xai-oauth"]);

export const GROK_BUILD_USAGE_BALANCE_SIGNAL = "usage balance exhausted";

export function matchesSharedWalletCreditsBody(loweredErrorText: string): boolean {
  return loweredErrorText.includes(GROK_BUILD_USAGE_BALANCE_SIGNAL);
}

export function isSharedWalletCredits402(
  provider: string | null | undefined,
  status: number,
  errorText?: string | null
): boolean {
  if (status !== 402 || typeof provider !== "string" || !SHARED_WALLET_402_PROVIDERS.has(provider)) {
    return false;
  }
  if (errorText == null || String(errorText).trim() === "") return true;
  return matchesSharedWalletCreditsBody(String(errorText).toLowerCase());
}

export function isCreditsExhaustedWithSharedWallet(
  errorText: string,
  signals: readonly string[]
): boolean {
  const lower = String(errorText || "").toLowerCase();
  return signals.some((sig) => lower.includes(sig)) || matchesSharedWalletCreditsBody(lower);
}
