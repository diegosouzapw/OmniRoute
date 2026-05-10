"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, ProxyConfigModal } from "@/shared/components";
import { useTranslations } from "next-intl";
import ProxyRegistryManager from "./ProxyRegistryManager";

export default function ProxyTab() {
  const [proxyModalOpen, setProxyModalOpen] = useState(false);
  const [globalProxy, setGlobalProxy] = useState(null);
  const mountedRef = useRef(true);
  const t = useTranslations("settings");
  const tc = useTranslations("common");

  const loadGlobalProxy = async () => {
    try {
      const res = await fetch("/api/settings/proxy?level=global");
      if (res.ok) {
        const data = await res.json();
        setGlobalProxy(data.proxy || null);
      }
    } catch {}
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
