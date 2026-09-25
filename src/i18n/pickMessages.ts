/**
 * Picks a subset of top-level namespaces from a merged next-intl catalog.
 *
 * next-intl 4.x has no `getMessages({ namespaces })` — the client provider
 * either receives explicit messages or serializes the ENTIRE catalog into
 * the RSC flight payload (see src/app/layout.tsx). Route layouts therefore
 * load the full merged catalog server-side (cheap, stays in the server
 * request) and pass only the namespaces their subtree's client components
 * use — computed by scripts/i18n/generate-route-namespaces.mjs.
 *
 * Keys that exist at the catalog root as plain values (e.g. the legacy
 * root-level "disabled" string addressed by no-arg useTranslations() calls)
 * are copied verbatim.
 */

export function pickMessages(
  messages: Record<string, unknown>,
  namespaces: readonly string[]
): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const namespace of namespaces) {
    if (typeof namespace !== "string" || namespace.length === 0) continue;
    if (namespace === "__proto__" || namespace === "constructor") continue;
    if (!Object.prototype.hasOwnProperty.call(messages, namespace)) continue;
    picked[namespace] = messages[namespace];
  }
  return picked;
}
