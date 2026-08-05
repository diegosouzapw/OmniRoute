"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import type { ConnectionState } from "@/types/resilience";
import { formatRemaining } from "@/shared/utils/formatRemaining";

interface ConnectionDetailProps {
  connection: ConnectionState | undefined; // undefined when connection deleted
  receivedAt: number; // client fetch receive time (immune to clock skew)
  onClose: () => void;
}

export default function ConnectionDetail({
  connection,
  receivedAt,
  onClose,
}: ConnectionDetailProps) {
  const t = useTranslations("resilienceConnections");
  const [tick, setTick] = useState(0); // force re-render for live countdown
  useEffect(() => {
    if (!connection?.isCoolingDown) return;
    // Reset tick baseline when the connection changes so the countdown restarts from
    // the fresh cooldownRemainingMs. setTick(0) is a re-sync, not a cascading render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTick(0);
    const interval = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(interval);
  }, [connection?.isCoolingDown, connection?.id]);

  if (!connection) return null; // Guard: connection deleted while panel open
  const elapsedMs = tick * 1000;
  const adjustedCooldown = Math.max(0, connection.cooldownRemainingMs - elapsedMs);
  return (
    <div style={{ padding: "16px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
      <h2>{t("detail.title")}</h2>
      <div>
        {t("detail.provider")}: {connection.provider}
      </div>
      <div>
        {t("detail.id")}: {connection.id}
      </div>
      <div>
        {t("detail.authType")}: {connection.authType}
      </div>
      <div>
        {t("detail.priority")}: {connection.priority}
      </div>
      <div>
        {t("detail.isActive")}: {connection.isActive ? t("detail.yes") : t("detail.no")}
      </div>
      <div>
        {t("detail.errorCode")}: {connection.errorCode ?? t("detail.never")}
      </div>
      <div>
        {t("detail.lastErrorAt")}: {connection.lastErrorAt ?? t("detail.never")}
      </div>
      <hr />
      <h3>{t("detail.cooldown")}</h3>
      <div>
        {t("detail.rateLimitedUntil")}: {connection.rateLimitedUntil ?? t("detail.never")}
      </div>
      <div>
        {t("detail.backoffLevel")}: {connection.backoffLevel}
      </div>
      <div>
        {t("detail.remaining")}:{" "}
        {connection.isCoolingDown ? formatRemaining(adjustedCooldown) : t("detail.never")}
      </div>
      <hr />
      <h3>{t("detail.breaker")}</h3>
      {connection.breaker ? (
        <div>
          <Badge
            variant={
              connection.breaker.state === "OPEN"
                ? "error"
                : connection.breaker.state === "HALF_OPEN"
                  ? "warning"
                  : connection.breaker.state === "DEGRADED"
                    ? "warning"
                    : "success"
            }
            size="sm"
          >
            {connection.breaker.state}
          </Badge>
          <div>
            {t("detail.failureCount")}: {connection.breaker.failureCount}
          </div>
          <div>
            {t("detail.retryAfterMs")}: {connection.breaker.retryAfterMs}
          </div>
          <div>
            {t("detail.lastFailureKind")}: {connection.breaker.lastFailureKind ?? t("detail.never")}
          </div>
        </div>
      ) : (
        <div>{t("detail.never")}</div>
      )}
      <hr />
      <h3>{t("detail.lockouts")}</h3>
      {connection.lockouts.length > 0 ? (
        <ul>
          {connection.lockouts.map((l, i) => (
            <li key={i}>
              {l.model}: {l.reason} ({formatRemaining(Math.max(0, l.remainingMs - elapsedMs))})
            </li>
          ))}
        </ul>
      ) : (
        <div>{t("detail.noLockouts")}</div>
      )}
      <button type="button" onClick={onClose}>
        {t("detail.close")}
      </button>
    </div>
  );
}
