"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type FailureFamily = {
  family: string;
  count: number;
};

type FailureExit = {
  exit: string;
  failures: number;
  byFamily: FailureFamily[];
};

type Observation = {
  connections: number;
  distinctExits: number;
  maxConnectionsOnOneExit: number;
  windowHours: number;
  failures?: {
    byExit: FailureExit[];
    byFamily: FailureFamily[];
    unattributed: number;
  };
};

const OBSERVATION_KEYS = [
  "connections",
  "distinctExits",
  "maxConnectionsOnOneExit",
  "windowHours",
] as const;

function isFailureFamily(value: unknown): value is FailureFamily {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.family === "string" && typeof record.count === "number";
}

function isFailureExit(value: unknown): value is FailureExit {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.exit === "string" &&
    typeof record.failures === "number" &&
    Array.isArray(record.byFamily) &&
    record.byFamily.every(isFailureFamily)
  );
}

function isObservation(value: unknown): value is Observation {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (!OBSERVATION_KEYS.every((key) => typeof record[key] === "number")) return false;
  if (record.failures === undefined) return true;
  if (!record.failures || typeof record.failures !== "object") return false;
  const failures = record.failures as Record<string, unknown>;
  return (
    Array.isArray(failures.byExit) &&
    failures.byExit.every(isFailureExit) &&
    Array.isArray(failures.byFamily) &&
    failures.byFamily.every(isFailureFamily) &&
    typeof failures.unattributed === "number"
  );
}

/**
 * Lines under a pool's member list: how many observed egress IPs actually served its
 * members over the window, how many connections the busiest one carried, and — when
 * the route reports it — the failed requests attributable to each exit plus the
 * unattributed remainder. Renders nothing when the observation is off, failed, or
 * the request itself errored. Failure lines have their own sentences: the traffic
 * sentence ("N exits used by N connections") would misstate a failure count.
 */
export function PoolEgressObservation({ query }: { query: string }) {
  const t = useTranslations("proxyRegistry");
  const [loaded, setLoaded] = useState<{ query: string; observation: Observation | null }>({
    query: "",
    observation: null,
  });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/settings/proxies/pool/egress-observation?${query}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((body: unknown) => {
        if (!cancelled) setLoaded({ query, observation: isObservation(body) ? body : null });
      })
      .catch(() => {
        if (!cancelled) setLoaded({ query, observation: null });
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const observation = loaded.query === query ? loaded.observation : null;
  if (!observation) return null;

  const text =
    observation.connections === 0
      ? t("poolEgressObservationEmpty", { hours: observation.windowHours })
      : t("poolEgressObservation", {
          exits: observation.distinctExits,
          connections: observation.connections,
          max: observation.maxConnectionsOnOneExit,
          hours: observation.windowHours,
        });

  const failures = observation.failures;
  const failureLines =
    failures === undefined
      ? null
      : failures.byExit.map((entry) => (
          <span key={entry.exit} className="block">
            {t("poolEgressFailuresByExit", { exit: entry.exit, count: entry.failures })}
            {entry.byFamily.map((item) => ` · ${item.family}: ${item.count}`).join("")}
          </span>
        ));
  const unattributedLine =
    failures !== undefined && failures.unattributed > 0 ? (
      <span className="block">
        {t("poolEgressFailuresUnattributed", { count: failures.unattributed })}
      </span>
    ) : null;

  return (
    <div className="mb-1" data-testid="proxy-registry-pool-egress-observation">
      <p className="text-xs text-text-muted" title={t("poolEgressObservationHint")}>
        {text}
      </p>
      {failureLines !== null && failureLines.length > 0 && (
        <p className="text-xs text-text-muted">{failureLines}</p>
      )}
      {unattributedLine !== null && <p className="text-xs text-text-muted">{unattributedLine}</p>}
    </div>
  );
}
