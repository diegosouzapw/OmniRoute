/**
 * Pure helpers for the home-page Provider Topology panel.
 */


/** Minimal shape expected by <ProviderTopology activeRequests={...}> */
export interface TopologyActiveRequest {
  provider: string;
  model: string;
}

/** Minimal in-flight request shape (subset of LiveRequest from useLiveRequests) */
interface InFlightRequest {
  provider: string;
  model: string;
}

/**
 * Maps an array of in-flight LiveRequest entries to the flat
 * { provider, model }[] shape consumed by <ProviderTopology>.
 *
 * The input is expected to contain only pending/running entries — the
 * useLiveRequests hook already filters out completed and failed requests
 * before exposing them via `activeRequests`.
 */
export function selectActiveRequests(requests: InFlightRequest[]): TopologyActiveRequest[] {
  return requests.map(({ provider, model }) => ({ provider, model }));
}

/** The ordering fields a topology node needs; everything else is irrelevant to layout. */
interface TopologyOrderable {
  provider: string;
  name?: string;
  /** `provider_nodes.created_at` — present only for operator-added compatible nodes. */
  createdAt?: string | null;
  /**
   * Best (lowest) `provider_connections.global_priority` across this provider's enabled
   * connections, or undefined when none of them has one set.
   */
  priority?: number;
}

function orderableLabel(entry: TopologyOrderable): string {
  return (entry.name?.trim() || entry.provider || "").toLowerCase();
}

function orderablePriority(entry: TopologyOrderable): number | null {
  const raw = entry.priority;
  if (typeof raw !== "number" || !Number.isFinite(raw) || raw <= 0) return null;
  return raw;
}

function orderableCreatedAt(entry: TopologyOrderable): number | null {
  const raw = typeof entry.createdAt === "string" ? entry.createdAt.trim() : "";
  if (!raw) return null;
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Ring order: a provider added later sits later, so a new provider APPENDS instead of
 * displacing the existing map.
 *
 * The previous comparator sorted on the provider ID. A compatible node's id is
 * `anthropic-compatible-<uuid>`, which sorts ahead of almost the whole catalog, so every
 * newly added node took the first slot (straight up) and rotated everyone else round. It
 * also sorted by ID while the node RENDERS its display name, so the jump looked arbitrary
 * — the node labelled with the operator's own name appeared pinned first among otherwise
 * alphabetical labels.
 *
 * Built-in registry providers have no `created_at`, so they cannot be ordered by age.
 * They keep a stable alphabetical block BEFORE the operator-added nodes: a catalog
 * provider is not "newer" than anything, and interleaving the two by a synthetic date
 * would make the ring reshuffle whenever a node is added. Ties fall through to the
 * provider id so the comparator is total — otherwise React Flow node order (and the
 * memo key built from it) could differ between renders for equal keys.
 *
 * ORDERING TIERS — operator priority first, then the age rules above.
 *
 * 9Router lays its ring out in connection-priority order (its connectionsRepo sorts
 * `(a.priority || 999) - (b.priority || 999)` before UsageStats dedupes to one entry per
 * provider), so position carries operational meaning rather than being chronological. That
 * is the behaviour being adopted here — but only via `global_priority`, which is the one
 * priority column comparable ACROSS providers. `priority` is allocated per provider as
 * MAX(priority)+1 within that provider, so several providers each own a "1"; ranking the
 * ring by it would produce an order decided entirely by the tie-breaks below, i.e. noise
 * dressed up as intent.
 *
 * A provider WITH a priority always precedes one without. Global priority is sparse in
 * practice (most connections leave it unset), and treating "unset" as 0 or as any numeric
 * default would float the unranked majority to the front and bury the few the operator
 * actually ranked. Unranked providers therefore keep their existing relative order behind
 * the ranked block, which is why the createdAt tier is retained rather than replaced.
 */
export function compareTopologyProviders(a: TopologyOrderable, b: TopologyOrderable): number {
  const aPriority = orderablePriority(a);
  const bPriority = orderablePriority(b);

  if (aPriority !== null && bPriority === null) return -1;
  if (aPriority === null && bPriority !== null) return 1;
  if (aPriority !== null && bPriority !== null && aPriority !== bPriority) {
    return aPriority - bPriority;
  }

  const aCreated = orderableCreatedAt(a);
  const bCreated = orderableCreatedAt(b);

  if (aCreated === null && bCreated !== null) return -1;
  if (aCreated !== null && bCreated === null) return 1;

  if (aCreated !== null && bCreated !== null && aCreated !== bCreated) {
    return aCreated - bCreated;
  }

  const labelCompare = orderableLabel(a).localeCompare(orderableLabel(b));
  if (labelCompare !== 0) return labelCompare;
  return (a.provider || "").localeCompare(b.provider || "");
}

/**
 * Intersect a list of candidate provider ids with the providers actually DRAWN on the ring,
 * lowercased/trimmed for node-key comparison. This is the single rule every derived topology
 * signal obeys: a provider with no node cannot colour, count, or pulse anything, so an id
 * that names no drawn node is dropped rather than inflating a number the picture can't back.
 *
 * Both the active and the error signals arrive from sources broader than the graph — the WS
 * feed reports any casing the request carried, and the metrics source aggregates all-time
 * request logs with no connection check — so both must be filtered through the drawn set
 * before they reach a count or a node highlight.
 */
export function selectDrawnProviders(
  candidates: readonly string[] | null | undefined,
  drawnProviders: readonly string[]
): Set<string> {
  const result = new Set<string>();
  if (!Array.isArray(candidates) || candidates.length === 0) return result;

  const drawn = new Set(
    drawnProviders
      .map((provider) => (typeof provider === "string" ? provider.trim().toLowerCase() : ""))
      .filter(Boolean)
  );
  if (drawn.size === 0) return result;

  for (const candidate of candidates) {
    const key = typeof candidate === "string" ? candidate.trim().toLowerCase() : "";
    if (key && drawn.has(key)) result.add(key);
  }
  return result;
}

/**
 * The failing providers that are actually DRAWN — a thin alias over
 * {@link selectDrawnProviders}, kept because the two defects it guards are error-specific:
 *
 *  - Only one provider could be flagged at a time (the API kept the max-timestamp winner),
 *    so a second failure silently un-flagged the first, and that second provider
 *    succeeding handed the flag back — the red line appearing to hide and return on its
 *    own with nothing about the broken provider having changed.
 *  - The count was computed from all-time request logs with no connection check, while the
 *    graph only draws providers that still have an enabled connection. A provider whose
 *    connection had been disabled or deleted therefore contributed to the error count with
 *    no red node anywhere to explain it.
 */
export function selectDrawnErrorProviders(
  errorProviders: readonly string[] | null | undefined,
  drawnProviders: readonly string[]
): Set<string> {
  return selectDrawnProviders(errorProviders, drawnProviders);
}
