/**
 * Consistent Hashing Routing Strategy for OmniRoute
 *
 * Implements the Jump Consistent Hash algorithm (Google, 2014) for session
 * stickiness without centralized state. Provides deterministic target selection
 * based on session identifiers so that the same session consistently routes to
 * the same target, while minimizing redistribution when target count changes.
 *
 * References:
 *   - "A Fast, Minimal Memory, Consistent Hash Algorithm" (Lamping & Veach, 2014)
 *     https://arxiv.org/abs/1406.2294
 *   - Jump hash: O(log n) time, O(1) memory, minimal redistribution property
 */

import type { ResolvedComboTarget } from "./types.ts";

// ──────────────────────────────────────────────
//  ConsistentHashContext
// ──────────────────────────────────────────────

/**
 * Routing context available for consistent hash key derivation.
 * At least one identifier should be present for effective session stickiness.
 */
export interface ConsistentHashContext {
  sessionId?: string;
  requestId?: string;
  provider?: string;
  model?: string;
  userId?: string;
  apiKey?: string;
  customKey?: string;
}

// ──────────────────────────────────────────────
//  Jump Consistent Hash (64-bit)
// ──────────────────────────────────────────────

/**
 * Jump Consistent Hash algorithm (Google, 2014).
 *
 * Given a 64-bit key and a number of targets, deterministically selects a
 * target bucket with minimal redistribution when the number of targets changes.
 *
 * @param key - A 64-bit unsigned integer (BigInt) derived from the session key.
 * @param numTargets - The number of available targets (> 0).
 * @returns An integer in [0, numTargets) identifying the selected target, or -1
 *          when numTargets <= 0.
 */
export function jumpConsistentHash(key: bigint, numTargets: number): number {
  if (numTargets <= 0) return -1;

  let b = -1n;
  let j = 0n;
  let k = key;

  while (j < BigInt(numTargets)) {
    b = j;
    // Core Jump Hash iteration: multiply by large constant, add 1, mask to 64 bits
    k = ((k * 2862933555777941757n) + 1n) & ((1n << 64n) - 1n);
    // Canonical Jump Hash (Lamping & Veach, 2014): use the upper 31 bits
    // ((key >> 33) + 1) as a denominator: j = (b+1) * 2^31 / ((key>>33) + 1)
    // This gives O(log n) expected iterations and minimal redistribution.
    const upper = (k >> 33n) + 1n; // [1, 2^31]
    j = (b + 1n) * (1n << 31n) / upper;
  }

  return Number(b);
}

// ──────────────────────────────────────────────
//  String Hashing (64-bit)
// ──────────────────────────────────────────────

/**
 * 64-bit hash from a string using the FNV-1a algorithm.
 *
 * FNV-1a provides good distribution across the 64-bit space and is fast for
 * typical session key lengths. This serves as the primary hash function; if a
 * faster hardware-accelerated option (e.g., xxhash-wasm) is available in the
 * runtime, it can be swapped in without changing the caller interface.
 *
 * @param str - The input string to hash.
 * @returns A 64-bit unsigned integer as a BigInt.
 */
export function hashString(str: string): bigint {
  const mask = (1n << 64n) - 1n;

  // FNV-1a 64-bit: offset basis
  let hash = 0xcbf29ce484222325n;
  const fnvPrime = 0x100000001b3n;

  for (let i = 0; i < str.length; i++) {
    // XOR with the byte (low 8 bits of the char code)
    hash ^= BigInt(str.charCodeAt(i) & 0xff);
    hash = (hash * fnvPrime) & mask;
  }

  return hash;
}

// ──────────────────────────────────────────────
//  ConsistentHashRouter
// ──────────────────────────────────────────────

/**
 * Router that provides session-sticky target selection via consistent hashing.
 */
export interface ConsistentHashRouter {
  /**
   * Select a target from the given list, returning all targets re-ordered
   * with the selected one first. The remaining targets preserve their
   * original relative order as fallbacks.
   */
  selectTarget(
    targets: ResolvedComboTarget[],
    context: ConsistentHashContext
  ): ResolvedComboTarget[];
}

/**
 * Factory that creates a `ConsistentHashRouter` whose key derivation is
 * controlled by the provided `getSessionKey` function.
 *
 * @param getSessionKey - A function that extracts the session key from context.
 * @returns A new `ConsistentHashRouter` instance.
 */
export function createConsistentHashRouter(
  getSessionKey: (context: ConsistentHashContext) => string
): ConsistentHashRouter {
  return {
    selectTarget(
      targets: ResolvedComboTarget[],
      context: ConsistentHashContext
    ): ResolvedComboTarget[] {
      if (targets.length <= 1) return targets;

      const key = getSessionKey(context);
      const hash = hashString(key);
      const selectedIndex = jumpConsistentHash(hash, targets.length);

      // selectedIndex should always be valid (0 <= selectedIndex < targets.length)
      // when targets.length > 0 and numTargets > 0. Defensive check:
      if (selectedIndex < 0 || selectedIndex >= targets.length) {
        return targets;
      }

      return [
        targets[selectedIndex],
        ...targets.filter((_, i) => i !== selectedIndex),
      ];
    },
  };
}

// ──────────────────────────────────────────────
//  Default session-key extractor
// ──────────────────────────────────────────────

/**
 * Extract a session key from the routing context.
 *
 * Priority order:
 *   1. `sessionId` — explicit session identifier
 *   2. `customKey` — caller-provided custom routing key
 *   3. `requestId` — per-request identifier (less stable but usable)
 *   4. `userId` — user identifier
 *   5. `provider:model` composite — stable fallback when only model info is known
 *
 * @param context - The routing context.
 * @returns A string key suitable for hashing.
 */
export function extractSessionKey(context: ConsistentHashContext): string {
  if (context.sessionId) return `session:${context.sessionId}`;
  if (context.customKey) return `custom:${context.customKey}`;
  if (context.requestId) return `request:${context.requestId}`;
  if (context.userId) return `user:${context.userId}`;

  // Fallback: composite of provider and model
  const provider = context.provider || "unknown";
  const model = context.model || "unknown";
  return `model:${provider}/${model}`;
}

// ──────────────────────────────────────────────
//  Standalone sorter (for combo.ts integration)
// ──────────────────────────────────────────────

/**
 * Convenience sorter that orders an array of ResolvedComboTargets by
 * consistent hash of the routing context.
 *
 * The selected target is placed first; remaining targets keep their original
 * order as fallback chain.
 *
 * @param targets - The list of resolved combo targets.
 * @param context - The routing context for key derivation.
 * @returns Re-ordered targets with the consistent-hash-selected one first.
 */
export function orderTargetsByConsistentHash(
  targets: ResolvedComboTarget[],
  context: ConsistentHashContext
): ResolvedComboTarget[] {
  const router = createConsistentHashRouter(extractSessionKey);
  return router.selectTarget(targets, context);
}
