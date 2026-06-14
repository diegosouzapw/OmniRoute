"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button, EmptyState, Badge } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";

interface PluginInfo {
  name: string;
  version: string;
  description?: string;
  author?: string;
  status: string;
  enabled: boolean;
  hooks: string[];
}

export default function PluginsPage() {
  const { addNotification } = useNotificationStore();
  const t = useTranslations("plugins");
  const [plugins, setPlugins] = useState<PluginInfo[]>([]);
  const [activeTab, setActiveTab] = useState<"installed" | "marketplace">("installed");
  const [marketplacePlugins, setMarketplacePlugins] = useState<any[]>([]);
  const [marketplaceUrl, setMarketplaceUrl] = useState("");
  const [savingUrl, setSavingUrl] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const fetchPlugins = useCallback(async () => {
    try {
      const res = await fetch("/api/plugins");
      if (res.ok) {
        const data = await res.json();
        setPlugins(data.plugins || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlugins();
    fetch("/api/settings")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.pluginMarketplaceUrl) setMarketplaceUrl(data.pluginMarketplaceUrl);
      })
      .catch(() => {});
  }, [fetchPlugins]);
  
  const fetchMarketplace = useCallback(async () => {
    try {
      const res = await fetch("/api/plugins/marketplace");
      if (res.ok) {
        const data = await res.json();
        setMarketplacePlugins(data.plugins || []);
      }
    } catch {}
  }, []);
  
  useEffect(() => {
    if (activeTab === "marketplace") {
      fetchMarketplace();
    }
  }, [activeTab, fetchMarketplace]);
  
  const handleSaveUrl = async () => {
    setSavingUrl(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pluginMarketplaceUrl: marketplaceUrl || null }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        addNotification({ type: "error", message: errData?.error || "Failed to save" });
        return;
      }
      addNotification({ type: "success", message: t("marketplaceUrlSaved") });
      await fetchMarketplace();
    } catch {
      addNotification({ type: "error", message: t("saveConfigurationFailed") });
    } finally {
      setSavingUrl(false);
    }
  };

  const handleScan = async () => {
    setScanning(true);
    try {
      const res = await fetch("/api/plugins/scan", { method: "POST" });
      if (res.ok) {
        addNotification({ type: "success", message: t("pluginScanComplete") });
        await fetchPlugins();
      }
    } catch {
      addNotification({ type: "error", message: t("pluginScanFailed") });
    } finally {
      setScanning(false);
    }
  };

  const handleToggle = async (name: string, enable: boolean) => {
    const endpoint = enable ? "activate" : "deactivate";
    try {
      const res = await fetch(`/api/plugins/${name}/${endpoint}`, { method: "POST" });
      if (res.ok) {
        addNotification({ type: "success", message: enable ? t("activated", { name }) : t("deactivated", { name }) });
        await fetchPlugins();
      }
    } catch {
      addNotification({ type: "error", message: enable ? t("activateFailed", { name }) : t("deactivateFailed", { name }) });
    }
  };

  const handleUninstall = async (name: string) => {
    if (!confirm(t("uninstallConfirm", { name }))) return;
    try {
      const res = await fetch(`/api/plugins/${name}`, { method: "DELETE" });
      if (res.ok) {
        addNotification({ type: "success", message: t("uninstalled", { name }) });
        await fetchPlugins();
      }
    } catch {
      addNotification({ type: "error", message: t("uninstallFailed", { name }) });
    }
  };

  if (loading) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <div className="flex gap-2">
          <Button variant={activeTab === "installed" ? "primary" : "secondary"} onClick={() => setActiveTab("installed")}>
            {t("installedTab")}
          </Button>
          <Button variant={activeTab === "marketplace" ? "primary" : "secondary"} onClick={() => setActiveTab("marketplace")}>
            {t("marketplaceTab")}
          </Button>
        </div>
      </div>

      {activeTab === "marketplace" && (
        <Card className="p-4 flex gap-4 items-end bg-gray-50">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("marketplaceUrlLabel")}</label>
            <input
              type="text"
              className="w-full rounded border-gray-300 p-2"
              placeholder={t("marketplaceUrlPlaceholder")}
              value={marketplaceUrl}
              onChange={(e) => setMarketplaceUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveUrl} disabled={savingUrl}>
            {t("saveMarketplaceUrl")}
          </Button>
        </Card>
      )}

      {activeTab === "installed" ? (
        <>
          <div className="flex items-center justify-end">
            <Button onClick={handleScan} disabled={scanning}>
              {scanning ? t("scanning") : t("scanForPlugins")}
            </Button>
          </div>
          {plugins.length === 0 ? (
            <EmptyState
              title={t("noPlugins")}
              description={t("noPluginsDescription")}
            />
          ) : (
            <div className="grid gap-4">
              {plugins.map((plugin) => (
                <Card key={plugin.name} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{plugin.name}</h3>
                      <p className="text-sm text-gray-500">
                        v{plugin.version}
                        {plugin.author ? ` by ${plugin.author}` : ""}
                        {plugin.description ? ` — ${plugin.description}` : ""}
                      </p>
                      <div className="mt-1 flex gap-1">
                        {plugin.hooks.map((hook) => (
                          <span
                            key={hook}
                            className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
                          >
                            {hook}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={plugin.enabled ? "secondary" : "primary"}
                        onClick={() => handleToggle(plugin.name, !plugin.enabled)}
                      >
                        {plugin.enabled ? t("deactivate") : t("activate")}
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleUninstall(plugin.name)}
                      >
                        {t("uninstall")}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="grid gap-4">
          {marketplacePlugins.length === 0 ? (
             <div className="text-gray-500 py-4">{t("marketplaceEmpty")}</div>
          ) : (
            marketplacePlugins.map((plugin) => (
              <Card key={plugin.name} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {plugin.name}
                      {plugin.verified && <Badge variant="success">{t("verified")}</Badge>}
                    </h3>
                    <p className="text-sm text-gray-500">
                      v{plugin.version} by {plugin.author} — {plugin.description}
                    </p>
                    <div className="mt-1 flex gap-1">
                      {plugin.tags?.map((tag: string) => (
                        <span key={tag} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={() => {
                        addNotification({ type: "info", message: t("marketplaceInstallComingSoon") });
                      }}
                    >
                      {t("install")}
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
