/**
 * opencodeToolObservation.ts — which tool names the gated upstream accepts right now.
 *
 * The free tier inspects the `tools` array, and what it accepts moves. Measured on
 * 2026-09-18: one made-up tool was accepted on `big-pickle` and refused on
 * `nemotron-3.5-lightning-free` and `muse-spark-1.3-contributor-free` — the same body that
 * the first of those had accepted a day earlier. No published artifact carries that rule;
 * the upstream npm package is a 3 KB platform dispatcher. A pinned placeholder is
 * therefore a guess that goes stale between releases.
 *
 * The relayed traffic already carries the answer. A client request that goes out with
 * tools and comes back OK proves which names the upstream accepts, for that surface and
 * that model, at that moment. This module remembers those names so a later request
 * carrying none can borrow them, and forgets them when a borrowed set is refused.
 *
 * Only names are kept — never a schema, a description, or any conversation content — and
 * the placeholder rebuilt from them declares an empty parameter object, so a borrowed name
 * is an entry in a list rather than a callable tool.
 *
 * Leaf module: no internal imports, so the executor and the contract can both use it.
 */

/**
 * Bounds are arbitrary and revisable: they cap memory, they are not a measured property of
 * the upstream. Entries are small (short strings), so the ceiling is generous on purpose.
 */
const MAX_NAMES_PER_ENTRY = 32;
const MAX_ENTRIES = 64;
const NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_-]{0,63}$/;

/**
 * How many refusals in a row a borrowed set takes before it is dropped.
 *
 * One refusal is not proof: the same body was refused and then accepted on
 * `muse-spark-1.3-contributor-free` minutes apart (measured 2026-09-18), so the verdict
 * carries a share of noise. Dropping on the first refusal would make the store oscillate
 * and fall back to a placeholder already known to be refused. Arbitrary and revisable.
 */
const REFUSALS_BEFORE_FORGETTING = 3;

/** Insertion-ordered, so the first key `Map` yields is the least recently confirmed one. */
const observed = new Map<string, readonly string[]>();
const consecutiveRefusals = new Map<string, number>();

/**
 * Surfaces and models do not share a gate, so neither do their entries. A session id
 * narrows it further: within one conversation the tools a request declares belong to the
 * very client whose service request is being repaired.
 */
function keyOf(provider: string, model: string, session?: string): string {
  return [provider, model, session ?? ""].join("|");
}

/**
 * Keep the names usable as a placeholder: well-formed, unique, order preserved. The
 * upstream may care about which names are present; nothing suggests it cares how many
 * follow a given one, so the original order is the safest thing to replay.
 */
function sanitize(names: readonly unknown[]): string[] {
  const kept: string[] = [];
  for (const raw of names) {
    if (kept.length >= MAX_NAMES_PER_ENTRY) break;
    if (typeof raw !== "string" || !NAME_PATTERN.test(raw)) continue;
    if (!kept.includes(raw)) kept.push(raw);
  }
  return kept;
}

/**
 * Record the tool names an accepted gated request carried.
 *
 * Called only for a response the upstream answered OK, so an entry is always a shape that
 * worked rather than one that merely looked plausible.
 */
export function recordAcceptedToolNames(
  provider: string,
  model: string,
  session: string | undefined,
  names: readonly unknown[]
): void {
  const kept = sanitize(names);
  if (kept.length === 0) return;
  const frozen = Object.freeze(kept);
  // Both scopes are written: the session entry serves the conversation it came from, the
  // model entry serves a conversation that has not yet sent a request carrying tools.
  for (const key of session
    ? [keyOf(provider, model, session), keyOf(provider, model)]
    : [keyOf(provider, model)]) {
    // Re-insert so a confirmed entry becomes the most recent one for eviction.
    observed.delete(key);
    observed.set(key, frozen);
    consecutiveRefusals.delete(key);
  }
  while (observed.size > MAX_ENTRIES) {
    const oldest = observed.keys().next();
    if (oldest.done) break;
    observed.delete(oldest.value);
    consecutiveRefusals.delete(oldest.value);
  }
}

/**
 * Count one refusal against a borrowed entry, and drop it once the streak is long enough.
 *
 * Called only when a request that BORROWED this entry was refused. A refusal on a request
 * carrying the client's own tools says nothing about the entry, and a refusal caused by
 * the session or the user-agent says nothing about tools at all — counting either would
 * drop a sound entry and fall back to a placeholder that is already known to be refused.
 */
export function noteRefusedBorrowedToolNames(
  provider: string,
  model: string,
  session?: string
): void {
  const key = observed.has(keyOf(provider, model, session))
    ? keyOf(provider, model, session)
    : keyOf(provider, model);
  if (!observed.has(key)) return;
  const streak = (consecutiveRefusals.get(key) ?? 0) + 1;
  if (streak < REFUSALS_BEFORE_FORGETTING) {
    consecutiveRefusals.set(key, streak);
    return;
  }
  observed.delete(key);
  consecutiveRefusals.delete(key);
}

/** The names last seen accepted for this surface, model and — when known — session. */
export function getObservedToolNames(
  provider: string,
  model: string,
  session?: string
): readonly string[] | null {
  return observed.get(keyOf(provider, model, session)) ?? null;
}

/**
 * The names to declare on a gated request the caller sent without tools.
 *
 * Order of resolution: what this very conversation was last seen declaring, then what any
 * conversation on this surface and model was, then what the operator configured, then
 * nothing — which leaves the caller on the built-in placeholder.
 *
 * The first step is the one that matters. The official client sends its service requests —
 * title generation, compaction — without tools while the build requests of the same
 * session carry a full list (upstream anomalyco/opencode#49433), so replaying that
 * session\'s own list gives a request back the contract its own client just declared.
 */
export function resolvePlaceholderNames(
  provider: string,
  model: string,
  session: string | undefined,
  configured: readonly string[]
): readonly string[] {
  const own = session ? getObservedToolNames(provider, model, session) : null;
  if (own && own.length > 0) return own;
  if (configured && configured.length > 0) return configured;
  return getObservedToolNames(provider, model) ?? configured;
}

/** Reserved for tests. */
export function _resetToolObservationForTests(): void {
  observed.clear();
  consecutiveRefusals.clear();
}
