"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import type { ResilienceConnectionsResponse } from "@/types/resilience";
import EmptyState from "@/shared/components/EmptyState";
import ConnectionsTable from "./ConnectionsTable";
import BreakerTimeline from "./BreakerTimeline";

const POLL_INTERVAL_MS = 30000;

export default function ResilienceConnectionsClient() {
  const t = useTranslations("resilienceConnections");
  const [data, setData] = useState<ResilienceConnectionsResponse | null>(null);
  const [windowMs, setWindowMs] = useState(3600000);
  const [pollError, setPollError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stopReason, setStopReason] = useState<"none" | "local_only" | "not_found">("none");
  const [retryCount, setRetryCount] = useState(0);
  const stoppedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (ws: number) => {
    if (stoppedRef.current) return; // permanent stop after 404/403
    if (document.hidden) return; // pause on tab hidden
    // Abort any in-flight request before starting a new one
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    // Timeout: prevent hanging request from killing the polling chain
    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 25000); // < 30s poll interval
    try {
      const res = await fetch(`/api/resilience/connections?windowMs=${ws}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      if (controller.signal.aborted) return; // guard: window switch cancelled this request
      if (res.status === 404 || res.status === 403) {
        stoppedRef.current = true;
        setStopReason(res.status === 403 ? "local_only" : "not_found"); // explicit reason for UI
        setPollError(true);
        setLoading(false); // exit loading so pollError banner is visible
        return;
      }
      if (!res.ok) {
        setPollError(true); // surface 5xx as error (not "No connections")
        setLoading(false);
        return;
      }
      const json = await res.json();
      if (controller.signal.aborted) return; // guard against stale response
      // Capture receive time for client-side countdown (immune to clock skew).
      // Spread to avoid mutating the parsed JSON object.
      setData({ ...json, receivedAt: Date.now() } as ResilienceConnectionsResponse);
      setLoading(false);
      setPollError(false); // clear error on successful fetch
    } catch (err) {
      if (err?.name === "AbortError") {
        // works across browsers, undici, and test mocks
        if (timedOut) {
          // Timeout: surface as error (not user-initiated cancel)
          setPollError(true);
          setLoading(false);
        }
        return;
      }
      // Network error: surface as error state
      setPollError(true);
      setLoading(false);
      console.warn(
        "[ResilienceConnectionsClient] fetch error:",
        err instanceof Error ? err.message : String(err)
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }, []);

  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollGenRef = useRef(0);

  // Retry handler: reset stopped state, trigger effect restart (defined before use in errorBanner)
  const handleRetry = () => {
    stoppedRef.current = false;
    setStopReason("none"); // reset reason on retry
    setRetryCount((c) => c + 1); // triggers useEffect cleanup + restart
  };

  useEffect(() => {
    if (stoppedRef.current) return;
    const gen = ++pollGenRef.current; // generation counter: stale chains self-terminate
    const poll = async () => {
      await fetchData(windowMs);
      if (gen !== pollGenRef.current) return; // stale chain: stop rescheduling
      if (stoppedRef.current) return;
      pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
    };
    poll();
    return () => {
      // pollGenRef is a mutable counter (not a DOM node); cleanup intentionally
      // bumps it so the captured `gen` goes stale and in-flight chains self-terminate.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      pollGenRef.current++; // invalidate any in-flight chain
      abortRef.current?.abort();
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
  }, [windowMs, fetchData, retryCount]); // retryCount restarts chain on retry

  // Resume on tab visible
  useEffect(() => {
    const onVis = () => {
      if (!document.hidden && !stoppedRef.current) fetchData(windowMs);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [windowMs, fetchData]);

  // Cleanup abort on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const errorBanner = pollError ? (
    <div
      style={{
        padding: "12px",
        borderRadius: "8px",
        background: "rgba(239,68,68,0.1)",
        color: "var(--color-error)",
      }}
    >
      {stopReason === "local_only"
        ? t("pollErrorLocalOnly") // LOCAL_ONLY gate rejection - page only accessible from localhost/LAN
        : stopReason !== "none"
          ? t("pollErrorStopped")
          : t("pollErrorTransient")}
      {stopReason !== "local_only" && (
        <button type="button" onClick={handleRetry} style={{ marginLeft: "8px" }}>
          {t("retry")}
        </button>
      )}
    </div>
  ) : null;

  if (pollError && !data) return errorBanner;
  if (loading && !data)
    return (
      <EmptyState icon="shield" title={t("loading.title")} description={t("loading.description")} />
    );
  if (!data)
    return (
      <EmptyState icon="shield" title={t("empty.title")} description={t("empty.description")} />
    );
  // Show degradation banner above empty state when sources failed
  if (data.connections.length === 0 && data.meta.degraded.length === 0)
    return (
      <EmptyState icon="shield" title={t("empty.title")} description={t("empty.description")} />
    );

  return (
    <>
      {errorBanner}
      <div
        style={{ display: "flex", gap: "16px", fontSize: "12px", color: "var(--color-text-muted)" }}
      >
        <span>
          {t("summary.total", { count: data.meta.totalConnections })}
          {data.meta.countsCapped ? ` (${t("summary.capped")})` : ""}
        </span>
        <span>{t("summary.coolingDown", { count: data.meta.coolingDownCount })}</span>
        <span>{t("summary.unhealthyBreakers", { count: data.meta.unhealthyBreakerCount })}</span>
      </div>
      {data.meta.degraded.length > 0 && (
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "rgba(245,158,11,0.1)",
            color: "var(--color-warning)",
          }}
        >
          {t("degraded.message", {
            sources: data.meta.degraded.map((s) => t(`degraded.source.${s}`)).join(", "),
          })}
        </div>
      )}
      <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{t("pollingNote")}</div>
      <ConnectionsTable
        connections={data.connections}
        receivedAt={data.receivedAt ?? 0}
        degraded={data.meta.degraded}
      />
      <BreakerTimeline breakers={data.breakers} onWindowChange={setWindowMs} />
    </>
  );
}
