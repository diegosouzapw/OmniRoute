"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, ProxyConfigModal, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";
import ProxyRegistryManager from "./ProxyRegistryManager";

export default function ProxyTab() {
  const [proxyModalOpen, setProxyModalOpen] = useState(false);
  const [globalProxy, setGlobalProxy] = useState(null);
  const mountedRef = useRef(true);
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [debugMode, setDebugMode] = useState(false);
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
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ debugMode: value }),
      });
      if (res.ok) {
        setDebugMode(value);
      }
    } catch (err) {
      console.error("Failed to update debugMode:", err);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    async function init() {
      try {
        const res = await fetch("/api/settings/proxy?level=global");
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
    fetch("/api/settings")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setDebugMode(data.debugMode === true);
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
        <Card className="p-6 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("debugToggle")}</p>
            </div>
            <Toggle
              checked={debugMode}
              onChange={() => updateDebugMode(!debugMode)}
              disabled={loading}
              data-testid="debug-mode-toggle"
            />
          </div>
        </Card>
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
