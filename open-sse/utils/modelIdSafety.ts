/**
 * A model id is part of the upstream URL for many providers (`.../models/{id}:generateContent`,
 * `.../deployments/{id}/chat/completions`, ...), so it must not be able to change that path. The
 * URL parser folds `%2e%2e` into a dot-segment, ends the path at `#` and starts a query at `?`,
 * which lets a caller aim a request that carries the operator's credential at another endpoint of
 * the provider, or swap the model for one their key is not allowed to use while the name they
 * sent still matches an allow-list pattern.
 *
 * Returns true when `modelId` contains a query or fragment delimiter, a backslash, a
 * percent-encoded dot, slash, backslash, `#`, `?` or NUL, or a `.` / `..` path segment. Slashes,
 * colons, `@`, brackets and dots inside names are ordinary in model ids and are allowed.
 */
export function hasUnsafeModelIdSyntax(modelId: string): boolean {
  if (/[?#\\]/.test(modelId)) return true;
  if (/%(?:2e|2f|5c|23|3f|00)/i.test(modelId)) return true;
  return modelId.split("/").some((segment) => segment === "." || segment === "..");
}
