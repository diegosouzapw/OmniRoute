/**
 * resilience resilience badges: read-only labels for what the gateway did to save
 * the request. The stored-error badge is driven by the flag alone, whatever
 * the persisted status (a stored 429 recopied into a 200 SSE envelope still
 * reads as served-from-stored-error).
 */

export type ResilienceBadge = { key: string; label: string; title: string };

export function getResilienceBadges(
  resilienceActions: unknown,
  format: (key: string, values?: Record<string, string | number>) => string
): ResilienceBadge[] {
  if (resilienceActions === null || typeof resilienceActions !== "object") return [];
  const actions = resilienceActions as Record<string, unknown>;
  const badges: ResilienceBadge[] = [];
  if (actions.stored_429 === true) {
    badges.push({
      key: "stored-error",
      label: format("resilienceStoredError"),
      title: format("resilienceRecovered"),
    });
  }
  if (actions.parked === true) {
    const ms = typeof actions.park_ms === "number" ? actions.park_ms : 0;
    badges.push({
      key: "parked",
      label: format("resilienceParked", { ms }),
      title: format("resilienceRecovered"),
    });
  }
  if (typeof actions.rotations === "number" && actions.rotations > 0) {
    badges.push({
      key: "rotations",
      label: format("resilienceRotations", { count: actions.rotations }),
      title: format("resilienceRecovered"),
    });
  }
  if (typeof actions.empty_retries === "number" && actions.empty_retries > 0) {
    badges.push({
      key: "retried",
      label: format("resilienceRetried"),
      title: format("resilienceRecovered"),
    });
  }
  if (
    (typeof actions.continued === "number" && actions.continued > 0) ||
    actions.resumed === true
  ) {
    badges.push({
      key: "continued",
      label: format("resilienceContinued"),
      title: format("resilienceRecovered"),
    });
  }
  return badges;
}
