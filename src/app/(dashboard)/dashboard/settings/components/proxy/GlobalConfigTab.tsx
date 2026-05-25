"use client";
import { useState, useEffect, useRef } from "react";
import { Card, Button, ProxyConfigModal } from "@/shared/components";
import { useTranslations } from "next-intl";

type GlobalProxyConfig = { type: string; host: string; port: number } | null;

export default function GlobalConfigTab() {
  const [proxyModalOpen, setProxyModalOpen] = useState(false);
  const [globalProxy, setGlobalProxy] = useState<GlobalProxyConfig>(null);
  const mountedRef = useRef(true);
  const t = useTranslations("settings");
  const tc = useTranslations("common");

  const loadGlobalProxy = async () => {
    try {
      const res = await fetch("/api/settings/proxy?level=global");
      if (res.ok && mountedRef.current) {
        const data = await res.json();
        setGlobalProxy(data.proxy || null);
      }
    } catch {}
  };

  useEffect(() => {
    mountedRef.current = true;
    loadGlobalProxy().catch(() => {});
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <>
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
              <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {globalProxy.type}://{globalProxy.host}:{globalProxy.port}
              </span>
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
