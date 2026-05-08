"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, ProxyConfigModal, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";
import ProxyRegistryManager from "./ProxyRegistryManager";
import OneproxyTab from "./OneproxyTab";
import RequestLimitsTab from "./RequestLimitsTab";

export default function ProxyTab() {
  const [proxyModalOpen, setProxyModalOpen] = useState(false);
  const [globalProxy, setGlobalProxy] = useState(null);
  const mountedRef = useRef(true);
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [debugMode, setDebugMode] = useState(false);
  const [usageTokenBuffer, setUsageTokenBuffer] = useState<number | null>(null);
  const [bufferInput, setBufferInput] = useState("");
  const [bufferSaving, setBufferSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadGlobalProxy = async () => {
    try {
      const res = await fetch("/api/settings/proxy?level=global");
      if (res.ok) {
        const data = await res.json();
        setGlobalProxy(data.proxy || null);
      }
    } catch {}
  };

  const updateDebugMode = async (value: boolean) => {
    const previousValue = debugMode;
    setDebugMode(value);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ debugMode: value }),
      });
      if (!res.ok) {
        setDebugMode(previousValue);
      }
    } catch (err) {
      setDebugMode(previousValue);
      console.error("Failed to update debugMode:", err);
    }
  };

  const updateUsageTokenBuffer = async () => {
    const val = parseInt(bufferInput, 10);
    if (isNaN(val) || val < 0 || val > 50000) return;
    setBufferSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usageTokenBuffer: val }),
      });
      if (res.ok) {
        setUsageTokenBuffer(val);
      }
    } catch (err) {
      console.error("Failed to update usageTokenBuffer:", err);
    } finally {
      setBufferSaving(false);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    async function init() {
      try {
        const res = await fetch("/api/settings/proxy?level=global", { cache: "no-store" });
        if (!mountedRef.current) return;
        if (res.ok) {
          const data = await res.json();
          if (mountedRef.current) setGlobalProxy(data.proxy || null);
        }
      } catch {}
    }
    init();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setDebugMode(data.debugMode === true);
        const buf = typeof data.usageTokenBuffer === "number" ? data.usageTokenBuffer : 2000;
        setUsageTokenBuffer(buf);
        setBufferInput(String(buf));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6">
        <Card className="p-0 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
                vpn_lock
              </span>
              <h2 className="text-lg font-bold">{t("globalProxy")}</h2>
            </div>
            <p className="text-sm text-text-muted mb-4">{t("globalProxyDesc")}</p>
            <div className="flex items-center gap-3">
              {globalProxy ? (
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {globalProxy.type}://{globalProxy.host}:{globalProxy.port}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-text-muted">{t("noGlobalProxy")}</span>
              )}
              <Button
                size="sm"
                variant={globalProxy ? "secondary" : "primary"}
                icon="settings"
                onClick={() => {
                  loadGlobalProxy();
                  setProxyModalOpen(true);
                }}
              >
                {globalProxy ? tc("edit") : t("configure")}
              </Button>
            </div>
          </div>
        </Card>

        <ProxyRegistryManager />
        <OneproxyTab />
        <Card className="p-6 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("debugToggle")}</p>
            </div>
            <Toggle checked={debugMode} onChange={updateDebugMode} disabled={loading} />
          </div>
        </Card>
        <Card className="p-6 mt-4">
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-medium">Usage Token Buffer</p>
              <p className="text-sm text-text-muted mt-1">
                Extra tokens added to reported usage to account for system prompt overhead. Set to 0
                to report raw provider token counts. Default: 2000. Changes take effect within 30
                seconds.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={0}
                max={50000}
                value={bufferInput}
                onChange={(e) => setBufferInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") updateUsageTokenBuffer();
                }}
                className="w-32 px-3 py-1.5 rounded bg-surface-2 border border-border text-sm text-text-primary"
                disabled={loading}
              />
              <Button
                size="sm"
                variant="primary"
                onClick={updateUsageTokenBuffer}
                disabled={bufferSaving || loading || parseInt(bufferInput, 10) === usageTokenBuffer}
              >
                {bufferSaving ? tc("saving") : tc("save")}
              </Button>
              {usageTokenBuffer !== null && parseInt(bufferInput, 10) !== usageTokenBuffer && (
                <span className="text-xs text-text-muted">Current: {usageTokenBuffer}</span>
              )}
            </div>
          </div>
        </Card>
        <RequestLimitsTab />
      </div>

      <ProxyConfigModal
        isOpen={proxyModalOpen}
        onClose={() => setProxyModalOpen(false)}
        level="global"
        levelLabel={t("globalLabel")}
        onSaved={loadGlobalProxy}
      />
    </>
  );
}
