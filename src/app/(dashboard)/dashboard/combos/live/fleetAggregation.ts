/**
 * fleetAggregation — pure aggregation for Combo/Routing Studio fleet mode (U2).
 *
 * Pure functions: no React, no side effects, no Date.now() calls.
 * `now` is always passed as a parameter so this module is trivially unit-testable.
 *
 * `aggregateComboEventsToSets` classifies providers into three mutually-exclusive
 * sets based on their most recent event within a rolling time window:
 *
 *   error  — most recent event within windowMs was `failed`
 *   active — most recent event within windowMs was `attempt` or `succeeded`
 *   last   — most recent event is older than windowMs (or no events)
 *
 * A provider appears in exactly one set (latest-event wins; error/active only for
 * events within the window; everything else lands in `last`).
 *
 * This mirrors the three-state fleet colouring of `ProviderTopology.tsx` (the
 * `activeSet / errorSet / lastSet` pattern) so the fleet view of Tela B uses the
 * same visual language as the home dashboard.
 */

import type { ComboEventInput } from "./comboFlowModel";

// ── aggregateComboEventsToSets ────────────────────────────────────────────

export interface FleetSets {
  /** Providers whose most recent event (within window) was `failed`. */
  error: Set<string>;
  /** Providers whose most recent event (within window) was `attempt` or `succeeded`. */
  active: Set<string>;
  /** Providers with events only outside the window, or no events. */
  last: Set<string>;
}

/**
 * Aggregate combo events into three provider sets for fleet mode display.
 *
 * @param events   All combo events to consider (order does not matter — timestamps govern).
 * @param windowMs Rolling window size in ms. Events older than `now - windowMs` → `last`.
 * @param now      Current time in ms (epoch). Caller-supplied for purity and testability.
 */
export function aggregateComboEventsToSets(
  events: ComboEventInput[],
  windowMs: number,
  now: number
): FleetSets {
  // Build a map of provider → {latestTimestamp, latestType}
  // We only care about the most recent event per provider.
  const latestByProvider = new Map<string, { timestamp: number; type: ComboEventInput["type"] }>();

  for (const ev of events) {
    const existing = latestByProvider.get(ev.provider);
    if (!existing || ev.timestamp > existing.timestamp) {
      latestByProvider.set(ev.provider, { timestamp: ev.timestamp, type: ev.type });
    }
  }

  const error = new Set<string>();
  const active = new Set<string>();
  const last = new Set<string>();

  for (const [provider, { timestamp, type }] of latestByProvider) {
    const age = now - timestamp;
    const withinWindow = age < windowMs;

    if (withinWindow && type === "failed") {
      error.add(provider);
    } else if (withinWindow && (type === "attempt" || type === "succeeded")) {
      active.add(provider);
    } else {
      last.add(provider);
    }
  }

  return { error, active, last };
}
