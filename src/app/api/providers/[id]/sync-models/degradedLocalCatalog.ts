/**
 * #5460 (Reka) + #5465 (t3.chat) — Distinguish a genuinely degraded
 * `local_catalog` models response (remote model discovery failed → the sync
 * route surfaces a 502) from a provider whose local catalog is its INTENDED and
 * only discovery source (reka, qwen-oauth, embedding/rerank providers like
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
