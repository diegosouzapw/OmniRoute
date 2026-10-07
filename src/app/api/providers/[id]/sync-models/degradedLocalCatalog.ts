/**
 * #5460 (Reka) + #5465 (t3.chat) — Distinguish a genuinely degraded
 * `local_catalog` models response (remote model discovery failed → the sync
 * route surfaces a 502) from a provider whose local catalog is its INTENDED and
 * only discovery source (reka, embedding/rerank providers like
 * voyage-ai/jina-ai, web-cookie providers like t3-web).
 *
 * The models route tags the latter with `intentional: true`. Before this guard,
 * model-sync 502'd on ANY `local_catalog` source, so the Import/Sync button
 * failed every single time for those providers even with a valid key/cookie.
 *
 * Dependency-free leaf so it can be unit-tested without booting the DB/route.
 */
export function isDegradedLocalCatalog(modelsData: {
  source?: unknown;
  intentional?: unknown;
}): boolean {
  const source =
    typeof modelsData?.source === "string" ? modelsData.source.trim().toLowerCase() : "";
  return source === "local_catalog" && modelsData?.intentional !== true;
}

/**
 * #9683 — the same degradation, one branch further up.
 *
 * When remote discovery fails, the models route falls back to the CACHED
 * catalog if it has one and only falls back to the local catalog when it does
 * not (`buildDiscoveryFallbackResponse`). A provider that was imported
 * successfully once therefore has a cache, so an expired key produced
 * `source: "cache"` + a warning and HTTP 200 — model-sync treated that as a
 * successful discovery, found every cached model already imported, and reported
 * "No new models were added" instead of the credential error. Retest, which
 * does not go through this path, failed correctly, which is what made the
 * import look like a real "nothing to do".
 *
 * The discriminator is the warning: the fallback builder always attaches one,
 * while the ordinary cache hit (`maybeReturnCachedDiscovery`, a non-refresh
 * read) attaches none. Model-sync always requests `refresh=true`, so the one
 * warning-carrying cache response it can observe is a degraded one.
 */
export function isDegradedCachedCatalog(modelsData: {
  source?: unknown;
  warning?: unknown;
}): boolean {
  const source =
    typeof modelsData?.source === "string" ? modelsData.source.trim().toLowerCase() : "";
  if (source !== "cache") return false;
  return typeof modelsData?.warning === "string" && modelsData.warning.trim().length > 0;
}

/**
 * Codex live-empty GET returns `{ source: "github_catalog", warning: "…" }`
 * via `buildResponse`. That is a display fallback of public models.json, not
 * an authoritative discovery. Same discriminator as cache: source match + a
 * non-empty warning. Without this, Import/Sync and boot ModelSync would persist
 * the public catalog as the synced source of truth (spec 3.7).
 */
export function isDegradedGithubCatalog(modelsData: {
  source?: unknown;
  warning?: unknown;
}): boolean {
  const source =
    typeof modelsData?.source === "string" ? modelsData.source.trim().toLowerCase() : "";
  if (source !== "github_catalog") return false;
  return typeof modelsData?.warning === "string" && modelsData.warning.trim().length > 0;
}

/**
 * Either degraded shape. Model-sync must refuse to treat these as a successful
 * discovery: persisting them would silently pin a stale catalog and hide the
 * real failure from the operator.
 */
export function isDegradedDiscovery(modelsData: {
  source?: unknown;
  intentional?: unknown;
  warning?: unknown;
}): boolean {
  return (
    isDegradedLocalCatalog(modelsData) ||
    isDegradedCachedCatalog(modelsData) ||
    isDegradedGithubCatalog(modelsData)
  );
}
