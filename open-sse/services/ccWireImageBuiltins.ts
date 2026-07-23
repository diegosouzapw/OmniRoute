/**
 * Built-in provider ids that must adopt the dynamic Claude-Code wire image
 * (fingerprint headers/order + system transforms + `?beta=true` chat path)
 * WITHOUT inheriting the Claude-Code-Compatible family's default anthropic
 * baseUrl / Bearer auth.
 *
 * These providers keep their own registry `baseUrl` and auth scheme
 * (e.g. `agentrouter` → `https://agentrouter.org/v1/messages` + `x-api-key`),
 * while the two CC predicates (`isClaudeCodeCompatible` /
 * `isClaudeCodeCompatibleProvider`) and `applyFingerprint` treat them as CC
 * for the wire-image concerns only. The CC-baseUrl / CC-Bearer branches in
 * `buildProviderUrl` / `buildProviderHeaders` are guarded so the registry
 * baseUrl + auth are preserved.
 *
 * Single source of truth — imported by both predicates so they never diverge.
 * See issue #6056.
 */
export const CC_WIRE_IMAGE_BUILTINS: ReadonlySet<string> = new Set(["agentrouter"]);

/**
 * True when `provider` is a built-in that adopts the dynamic Claude-Code wire
 * image while keeping its own registry baseUrl + auth.
 */
export function usesCcWireImage(provider: unknown): boolean {
  return typeof provider === "string" && CC_WIRE_IMAGE_BUILTINS.has(provider);
}
