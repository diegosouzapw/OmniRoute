"use client";

import { useEffect, useState } from "react";
import { Card, Toggle, InfoTooltip } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { useTranslations } from "next-intl";

type FactoryConnection = {
  id: string;
  provider: string;
  authType?: string;
  name?: string | null;
  email?: string | null;
  displayName?: string | null;
};

function connectionLabel(conn: FactoryConnection): string {
  return conn.displayName || conn.name || conn.email || conn.id;
}

function useFactoryAutoPingSettings() {
  const [connections, setConnections] = useState<FactoryConnection[]>([]);
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [status, setStatus] = useState<"" | "saved" | "error">("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/settings").then((res) => res.json()),
      fetch("/api/providers").then((res) => res.json()),
    ])
      .then(([settingsData, providersData]) => {
        if (cancelled) return;
        const factoryOAuthConnections: FactoryConnection[] = (
          providersData?.connections || []
        ).filter((c: FactoryConnection) => c.provider === "factory" && c.authType === "oauth");
        setConnections(factoryOAuthConnections);
        setEnabledMap(settingsData?.factoryAutoPing?.connections || {});
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleConnection = async (connectionId: string, checked: boolean) => {
    if (savingId) return;
    setSavingId(connectionId);
    setStatus("");
    const previous = enabledMap;
    const next = { ...enabledMap, [connectionId]: checked };
    setEnabledMap(next);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ factoryAutoPing: { connections: next } }),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setEnabledMap(previous);
        setStatus("error");
      }
    } catch {
      setEnabledMap(previous);
      setStatus("error");
    } finally {
      setSavingId(null);
    }
  };

  return { connections, enabledMap, loading, savingId, status, toggleConnection };
}

export default function FactoryAutoPingTab() {
  const t = useTranslations("settings");
  const { connections, enabledMap, loading, savingId, status, toggleConnection } =
    useFactoryAutoPingSettings();

  if (!loading && connections.length === 0) return null;

  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-orange-500/10">
          <ProviderIcon providerId="factory" size={24} type="color" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold flex items-center gap-1.5">
            {t("factoryAutoPingTitle")}
            <InfoTooltip text={t("factoryAutoPingWarning")} />
          </h3>
          <p className="text-sm text-text-muted">{t("factoryAutoPingDesc")}</p>
        </div>
        {status === "saved" && (
          <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> {t("saved")}
          </span>
        )}
        {status === "error" && (
          <span className="text-xs font-medium text-rose-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>{" "}
            {t("factoryAutoPingSaveError")}
          </span>
        )}
      </div>
      {loading ? (
        <p className="text-sm text-text-muted">{t("loading")}</p>
      ) : (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          {connections.map((conn) => (
            <div key={conn.id} className="flex items-center justify-between gap-3 py-1">
              <span className="text-sm font-mono truncate">{connectionLabel(conn)}</span>
              <Toggle
                checked={enabledMap[conn.id] === true}
                onChange={(value) => toggleConnection(conn.id, value)}
                disabled={savingId === conn.id}
                ariaLabel={t("factoryAutoPingToggleAria", { connection: connectionLabel(conn) })}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
