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
 * Each row also carries a manual "Clear cooldown" action. The cooldown is
 * OmniRoute's local lesson, not upstream truth: when the quota has already
 * refreshed upstream (daily/weekly resets, provider-side fix), the automatic
 * clear paths (Test-button success, Edit-modal key re-validation) still
 * require an upstream round-trip before the bench lifts. The button PUTs
 * `rateLimitedUntil: null` directly so the connection rejoins routing
 * immediately — the next request is the real test of whether the key works.
 *
 * Acceptance criteria (Issue #1, fix scope D):
 *   1. Filters `connections` to those with a future `rateLimitedUntil`.
 *   2. Shows connection name + reset countdown.
 *   3. Re-evaluates every second so countdowns tick down.
 *   4. Renders nothing when no connection is cooling.
 *   5. Uses the same connection-shape type as ConnectionRow so the data flow
 *      stays consistent with the rest of the dashboard.
 *   6. Offers a per-row manual clear (disabled while that row's request is
 *      in flight) for the stale-bench case described above.
 */

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { formatResetCountdown } from "@/shared/utils/formatting";
import type { ConnectionRowConnection } from "./ConnectionRow";
// `providerText` is DEFINED in ./providerCredentialText (a leaf whose only
// import is type-only) and merely re-exported by providerPageHelpers. Going
// through that barrel pulls the whole provider-page graph — providerRegistry
// (352 providers), shared provider constants, requestDefaults — into this tiny
// client component for one string helper. Import from the real home instead.
import { providerText } from "../providerCredentialText";

export interface CoolingConnectionsPanelProps {
  readonly connections: readonly ConnectionRowConnection[];
  /** Clears a connection's persisted cooldown (PUT `rateLimitedUntil: null`). */
  readonly onClearCooldown?: (connectionId: string) => void;
  /** Connection id whose clear request is in flight — disables its button. */
  readonly clearingCooldownId?: string | null;
}

function isCoolingNow(connection: ConnectionRowConnection, now: number): boolean {
  if (!connection.rateLimitedUntil) return false;
  const until = new Date(connection.rateLimitedUntil).getTime();
  return Number.isFinite(until) && until > now;
}

/** Visible last-error text (truncated) plus the full string for the tooltip. */
function coolingRecordedError(connection: ConnectionRowConnection): {
  display: string;
  title: string;
} | null {
  const raw = typeof connection.lastError === "string" ? connection.lastError.trim() : "";
  if (!raw) return null;
  return {
    display: raw.length > 160 ? `${raw.slice(0, 157)}...` : raw,
    title: raw,
  };
}

interface ClearCooldownButtonProps {
  /** Row's connection id — without one there is nothing to PUT, so no button. */
  readonly connectionId: string | undefined;
  /** True while this row's clear request is in flight (disables the button). */
  readonly clearing: boolean;
  readonly onClearCooldown?: (connectionId: string) => void;
}

/**
 * Per-row manual "Clear cooldown" action, split out of the panel body so the
 * row map stays readable (and the panel inside the max-lines-per-function
 * ratchet). Renders nothing when there is no handler or no connection id.
 */
function ClearCooldownButton(props: ClearCooldownButtonProps) {
  const { connectionId, clearing, onClearCooldown } = props;
  const t = useTranslations("providers");
  if (!onClearCooldown || !connectionId) return null;
  return (
    <button
      type="button"
      data-testid={`clear-cooldown-${connectionId}`}
      disabled={clearing}
      onClick={() => onClearCooldown(connectionId)}
      title={providerText(
        t,
        "clearConnectionCooldownTitle",
        "Clear the cooldown now — use when the quota has already refreshed upstream"
      )}
      className="rounded border border-amber-500/50 px-2 py-0.5 text-xs text-amber-700 transition-colors hover:bg-amber-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:text-amber-300"
    >
      {clearing
        ? providerText(t, "clearConnectionCooldownInProgress", "Clearing…")
        : providerText(t, "clearConnectionCooldown", "Clear cooldown")}
    </button>
  );
}

export default function CoolingConnectionsPanel(props: CoolingConnectionsPanelProps) {
  const { connections, onClearCooldown, clearingCooldownId } = props;
  const t = useTranslations("providers");
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
          {providerText(t, "coolingConnectionsTitle", "Currently cooling ({count})", {
            count: cooling.length,
          })}
        </h3>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        {providerText(
          t,
          "coolingConnectionsDescription",
          "These connections are cooling after their last request. OmniRoute will skip them until the timer expires — no manual disable required."
        )}
      </p>
      <ul className="space-y-1">
        {cooling.map((c) => {
          const until = c.rateLimitedUntil!;
          const label =
            c.displayName ||
            c.name ||
            c.email ||
            (c.id
              ? `${providerText(t, "connectionFallback", "connection")} ${c.id.slice(0, 8)}`
              : providerText(t, "connectionFallback", "connection"));
          const recorded = coolingRecordedError(c);
          const clearing = clearingCooldownId != null && clearingCooldownId === c.id;
          return (
            <li
              key={c.id ?? label}
              className="flex items-center justify-between gap-2 rounded border border-amber-500/30 bg-background/40 px-3 py-2 text-sm"
            >
              <span className="min-w-0">
                <span className="font-medium">{label}</span>
                {recorded ? (
                  <span
                    className="mt-0.5 block truncate text-xs text-muted-foreground"
                    data-testid="cooling-last-error"
                    title={recorded.title}
                  >
                    {recorded.display}
                  </span>
                ) : null}
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="font-mono text-xs text-amber-700 dark:text-amber-300"
                  data-testid="cooling-countdown"
                >
                  {formatResetCountdown(until)}
                </span>
                <ClearCooldownButton
                  connectionId={c.id}
                  clearing={clearing}
                  onClearCooldown={onClearCooldown}
                />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
