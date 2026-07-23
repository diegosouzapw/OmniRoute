"use client";

/**
 * CoolingConnectionsPanel — Dashboard readout of connections currently in a
 * persisted 429 cooldown. Sourced from `useProviderConnections().connections`
 * filtered on `rateLimitedUntil`. Live human-readable countdown via the
 * client-safe `formatResetCountdown` helper in `@/shared/utils/formatting`.
 *
 * Why this exists: Fix A (per-account 429 cascade not persisting) writes the
 * cooldown to `provider_connections.rate_limited_until` so the cascade
 * survives the request boundary and process restart. Without a visible
 * indicator the user has no way to see "OmniRoute learned that this key is
 * exhausted — and for how long". This panel makes the lesson visible.
 *
 * Acceptance criteria (Issue #1, fix scope D):
 *   1. Filters `connections` to those with a future `rateLimitedUntil`.
 *   2. Shows connection name + reset countdown.
 *   3. Re-evaluates every second so countdowns tick down.
 *   4. Renders nothing when no connection is cooling.
 *   5. Uses the same connection-shape type as ConnectionRow so the data flow
 *      stays consistent with the rest of the dashboard.
 */

import { useEffect, useState } from "react";
import { formatResetCountdown } from "@/shared/utils/formatting";
import type { ConnectionRowConnection } from "./ConnectionRow";

export interface CoolingConnectionsPanelProps {
  readonly connections: readonly ConnectionRowConnection[];
}

function isCoolingNow(connection: ConnectionRowConnection, now: number): boolean {
  if (!connection.rateLimitedUntil) return false;
  const until = new Date(connection.rateLimitedUntil).getTime();
  return Number.isFinite(until) && until > now;
}

export default function CoolingConnectionsPanel(props: CoolingConnectionsPanelProps) {
  const { connections } = props;
  // Tick once per second so the human-readable countdown updates.
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const cooling = connections.filter((c) => isCoolingNow(c, now));
  if (cooling.length === 0) return null;

  return (
    <div
      data-testid="cooling-connections-panel"
      className="mb-4 rounded-card border border-amber-500/40 bg-amber-500/5 p-4 shadow-sm"
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          aria-hidden
          className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500"
        />
        <h3 className="text-sm font-medium text-amber-700 dark:text-amber-300">
          Currently cooling ({cooling.length})
        </h3>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        These connections returned a 429 (rate-limit) on their last request. OmniRoute will skip
        them until the timer expires — no manual disable required.
      </p>
      <ul className="space-y-1">
        {cooling.map((c) => {
          const until = c.rateLimitedUntil!;
          const label =
            c.displayName ||
            c.name ||
            c.email ||
            (c.id ? `connection ${c.id.slice(0, 8)}` : "connection");
          return (
            <li
              key={c.id ?? label}
              className="flex items-center justify-between rounded border border-amber-500/30 bg-background/40 px-3 py-2 text-sm"
            >
              <span className="font-medium">{label}</span>
              <span
                className="font-mono text-xs text-amber-700 dark:text-amber-300"
                data-testid="cooling-countdown"
              >
                {formatResetCountdown(until)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
