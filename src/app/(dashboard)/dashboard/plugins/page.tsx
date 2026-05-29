"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

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
  const [plugins, setPlugins] = useState<PluginInfo[]>([]);
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
  }, [fetchPlugins]);

  const handleScan = async () => {
    setScanning(true);
    try {
      const res = await fetch("/api/plugins/scan", { method: "POST" });
      if (res.ok) {
        addNotification({ type: "success", message: "Plugin scan complete" });
        await fetchPlugins();
      }
    } catch {
      addNotification({ type: "error", message: "Plugin scan failed" });
    } finally {
      setScanning(false);
    }
  };

  const handleToggle = async (name: string, enable: boolean) => {
    const endpoint = enable ? "activate" : "deactivate";
    try {
      const res = await fetch(`/api/plugins/${name}/${endpoint}`, { method: "POST" });
      if (res.ok) {
        addNotification({ type: "success", message: `${name} ${enable ? "activated" : "deactivated"}` });
        await fetchPlugins();
      }
    } catch {
      addNotification({ type: "error", message: `Failed to ${enable ? "activate" : "deactivate"} ${name}` });
    }
  };

  const handleUninstall = async (name: string) => {
    if (!confirm(`Uninstall plugin "${name}"?`)) return;
    try {
      const res = await fetch(`/api/plugins/${name}`, { method: "DELETE" });
      if (res.ok) {
        addNotification({ type: "success", message: `${name} uninstalled` });
        await fetchPlugins();
      }
    } catch {
      addNotification({ type: "error", message: `Failed to uninstall ${name}` });
    }
  };

  if (loading) {
    return <div className="p-6">Loading plugins...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Plugins</h1>
        <Button onClick={handleScan} disabled={scanning}>
          {scanning ? "Scanning..." : "Scan for Plugins"}
        </Button>
      </div>

      {plugins.length === 0 ? (
        <EmptyState
          title="No plugins installed"
          description="Place plugin directories in ~/.omniroute/plugins/ and click Scan."
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
                    {plugin.enabled ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleUninstall(plugin.name)}
                  >
                    Uninstall
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
