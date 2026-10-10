/**
 * ChatGPT Web clean-room bridge failures are local integration failures, not
 * evidence that the browser credential or the provider is unavailable. They
 * commonly surface as synthetic 502s and must not disable the connection or
 * open the provider-wide breaker after one malformed/stale browser bridge.
 *
 * The pattern list mirrors the messages `chatgptWebFirstParty.ts` and
 * `chatgptWebBrowserSession.ts` actually throw; keep it aligned when those
 * change, or a local browser failure silently re-enables account cooldown.
 */
export function isChatGptWebBridgeFailure(
  provider: string | null | undefined,
  error: unknown
): boolean {
  if (provider !== "chatgpt-web") return false;
  const message =
    typeof error === "string"
      ? error
      : error &&
          typeof error === "object" &&
          typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "";
  // A missing/unlaunchable browser binary is a local install problem, not a dead
  // account: Playwright reports `browserType.launch: Executable doesn't exist at …`.
  if (
    /browserType\.launch|Executable doesn't exist|browser launch (?:timed out|failed)/i.test(
      message
    )
  ) {
    return true;
  }
  return /ChatGPT Web (?:first-party )?(?:request client is unavailable|challenge bridge is incomplete|conversation request scope is unavailable|request cancellation scope is unavailable|request scope is unavailable|bridge did not initialize|bridge module failed to load|request module was not loaded|module contract (?:was not found|exports were not found)|conversation returned (?:an invalid response|an empty stream|a non-SSE response)|browser turn timed out|browser launch timed out|sentinel headers are unavailable)/i.test(
    message
  );
}
