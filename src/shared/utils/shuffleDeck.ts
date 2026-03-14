/**
 * Shared shuffle deck utility — Fisher-Yates shuffle with anti-repeat guarantee.
 * Used by both combo model rotation and credential connection selection.
 *
 * Thread-safe: each deck namespace gets its own promise-based mutex to prevent
 * race conditions when concurrent requests hit the same deck simultaneously.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

interface ShuffleDeck {
  order: readonly string[];
  index: number;
  idsKey: string;
}

// ─── State ──────────────────────────────────────────────────────────────────

const decks = new Map<string, ShuffleDeck>();
const mutexes = new Map<string, Promise<void>>();

// ─── Fisher-Yates Shuffle ───────────────────────────────────────────────────

/**
 * Fisher-Yates shuffle — returns a new shuffled copy of the array.
 * Does NOT mutate the original.
 */
export function fisherYatesShuffle<T>(arr: readonly T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = result[i];
    result[i] = result[j];
    result[j] = tmp;
  }
  return result;
}

// ─── Deck Operations ────────────────────────────────────────────────────────

/**
 * Get next item from a namespaced shuffle deck.
 *
 * - Namespace isolates decks (e.g. "combo:myCombo" vs "conn:openai").
 * - Uses each item exactly once per cycle before reshuffling.
 * - Guarantees the last item of a cycle is not the first of the next.
 * - Resets deck when the item set changes (detected via sorted key).
 * - Serialized per namespace via promise-based mutex (no race conditions).
 */
export async function getNextFromDeck(
  namespace: string,
  itemIds: readonly string[]
): Promise<string> {
  if (itemIds.length === 0) return "";
  if (itemIds.length === 1) return itemIds[0];

  // Acquire per-namespace mutex
  const currentMutex = mutexes.get(namespace) ?? Promise.resolve();
  let resolveMutex: (() => void) | undefined;
  mutexes.set(
    namespace,
    new Promise<void>((resolve) => {
      resolveMutex = resolve;
    })
  );

  try {
    await currentMutex;

    const idsKey = [...itemIds].sort().join(",");
    const existing = decks.get(namespace);

    // If deck exists, same item set, and not exhausted — advance
    if (existing && existing.idsKey === idsKey && existing.index < existing.order.length) {
      const id = existing.order[existing.index];
      decks.set(namespace, { ...existing, index: existing.index + 1 });
      return id;
    }

    // Reshuffle — ensure last of previous cycle is not first of new cycle
    const lastUsedId =
      existing && existing.idsKey === idsKey && existing.order.length > 0
        ? existing.order[existing.order.length - 1]
        : undefined;

    const newOrder = fisherYatesShuffle(itemIds);

    if (lastUsedId !== undefined && newOrder[0] === lastUsedId && newOrder.length > 1) {
      const swapIdx = 1 + Math.floor(Math.random() * (newOrder.length - 1));
      const tmp = newOrder[0];
      newOrder[0] = newOrder[swapIdx];
      newOrder[swapIdx] = tmp;
    }

    decks.set(namespace, { order: newOrder, index: 1, idsKey });
    return newOrder[0];
  } finally {
    resolveMutex?.();
  }
}

// ─── Sync version (backwards compat for non-concurrent callers) ─────────────

/**
 * Synchronous version of getNextFromDeck — NO mutex protection.
 * Only safe when the caller already holds a mutex (e.g. auth.ts getProviderCredentials).
 */
export function getNextFromDeckSync(namespace: string, itemIds: readonly string[]): string {
  if (itemIds.length === 0) return "";
  if (itemIds.length === 1) return itemIds[0];

  const idsKey = [...itemIds].sort().join(",");
  const existing = decks.get(namespace);

  if (existing && existing.idsKey === idsKey && existing.index < existing.order.length) {
    const id = existing.order[existing.index];
    decks.set(namespace, { ...existing, index: existing.index + 1 });
    return id;
  }

  const lastUsedId =
    existing && existing.idsKey === idsKey && existing.order.length > 0
      ? existing.order[existing.order.length - 1]
      : undefined;

  const newOrder = fisherYatesShuffle(itemIds);

  if (lastUsedId !== undefined && newOrder[0] === lastUsedId && newOrder.length > 1) {
    const swapIdx = 1 + Math.floor(Math.random() * (newOrder.length - 1));
    const tmp = newOrder[0];
    newOrder[0] = newOrder[swapIdx];
    newOrder[swapIdx] = tmp;
  }

  decks.set(namespace, { order: newOrder, index: 1, idsKey });
  return newOrder[0];
}

// ─── Test helpers ───────────────────────────────────────────────────────────

/** Reset all decks — for testing only. */
export function _resetAllDecks(): void {
  decks.clear();
  mutexes.clear();
}
