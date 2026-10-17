/**
 * No-auth `oc` passthrough helpers. `isOcPt` mirrors `isOpencodePassthroughClient`
 * in `open-sse/executors/opencodeClientGate.ts` without importing the executor
 * (combo hot paths stay free of the executor module edge).
 */
export function isOcPt(
  requestHeaders: Headers | Record<string, unknown> | null | undefined
): boolean {
  const entries =
    requestHeaders instanceof Headers
      ? [...requestHeaders.entries()]
      : Object.entries(requestHeaders ?? {});
  const value = (name: string): string =>
    String(
      entries.find(([key, item]) => key.toLowerCase() === name && typeof item === "string")?.[1] ??
        ""
    );
  return (
    /^opencode\/\S+/i.test(value("user-agent").trim()) &&
    (value("x-opencode-session").trim() || value("x-opencode-session-id").trim()).length > 0
  );
}

/** Drop no-auth `oc` candidates; keyed `opencode-zen`/`opencode-go` stay. */
export function excludeNoauthOcTargets<T extends { provider?: string }>(targets: T[]): T[] {
  return targets.filter((t) => t.provider !== "opencode" && t.provider !== "oc");
}

/** Same exclusion, skipped when the caller presents the OpenCode client identity. */
export function excludeNoauthOcTargetsUnlessClient<T extends { provider?: string }>(
  targets: T[],
  deps: { isOpencodePassthroughClient?: boolean }
): T[] {
  if (deps.isOpencodePassthroughClient === true) return targets;
  return excludeNoauthOcTargets(targets);
}
