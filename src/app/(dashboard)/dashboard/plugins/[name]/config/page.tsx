"use client";

import { useState, useEffect, useCallback, use } from "react";
import { Card, Button } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";

interface ConfigField {
  type: string;
  default?: unknown;
  min?: number;
  max?: number;
  enum?: string[];
  description?: string;
}

interface PluginConfig {
  name: string;
  config: Record<string, unknown>;
  configSchema: Record<string, ConfigField>;
}

export default function PluginConfigPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const { addNotification } = useNotificationStore();
  const t = useTranslations("plugins");
  const [plugin, setPlugin] = useState<PluginConfig | null>(null);
  const [config, setConfig] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch(`/api/plugins/${name}/config`);
      if (res.ok) {
        const data = await res.json();
        setPlugin(data);
        setConfig(data.config || {});
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/plugins/${name}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      if (res.ok) {
        addNotification({ type: "success", message: t("configurationSaved") });
      } else {
        addNotification({ type: "error", message: t("saveConfigurationFailed") });
      }
    } catch {
      addNotification({ type: "error", message: t("saveConfigurationFailed") });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: unknown) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="p-6">{t("loading")}</div>;
  if (!plugin) return <div className="p-6">{t("pluginNotFound")}</div>;

  const schemaKeys = Object.keys(plugin.configSchema || {});

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">{t("configure", { name })}</h1>

      {schemaKeys.length === 0 ? (
        <Card className="p-4">
          <p className="text-gray-500">{t("noConfigSettings")}</p>
        </Card>
      ) : (
        <Card className="space-y-4 p-4">
          {schemaKeys.map((key) => {
            const field = plugin.configSchema[key];
            const value = config[key] ?? field.default ?? "";

            return (
              <div key={key} className="space-y-1">
                <label className="text-sm font-medium">
                  {key}
                  {field.description && (
                    <span className="ml-2 text-xs text-gray-500">
                      {field.description}
                    </span>
                  )}
                </label>
                {field.type === "boolean" ? (
                  <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => handleChange(key, e.target.checked)}
                    className="ml-2"
                  />
                ) : field.enum ? (
                  <select
                    value={String(value)}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full rounded border p-2"
                  >
                    {field.enum.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "number" ? (
                  <input
                    type="number"
                    value={Number(value)}
                    min={field.min}
                    max={field.max}
                    onChange={(e) => handleChange(key, Number(e.target.value))}
                    className="w-full rounded border p-2"
                  />
                ) : (
                  <input
                    type="text"
                    value={String(value)}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full rounded border p-2"
                  />
                )}
              </div>
            );
          })}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? t("saving") : t("saveConfiguration")}
          </Button>
        </Card>
      )}
    </div>
  );
}
