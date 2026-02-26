"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input } from "@/shared/components";
import { useTranslations } from "next-intl";

const MODES = [
  { value: "disabled", labelKey: "ipModeDisabled", icon: "block" },
  { value: "blacklist", labelKey: "ipModeBlacklist", icon: "do_not_disturb" },
  { value: "whitelist", labelKey: "ipModeWhitelist", icon: "verified_user" },
  { value: "whitelist-priority", labelKey: "ipModeWhitelistPriority", icon: "priority_high" },
];

export default function IPFilterSection() {
  const [config, setConfig] = useState({
    enabled: false,
    mode: "blacklist",
    blacklist: [],
    whitelist: [],
    tempBans: [],
  });
  const [loading, setLoading] = useState(true);
  const [newIP, setNewIP] = useState("");
  const [listTarget, setListTarget] = useState("blacklist");
  const t = useTranslations("settings");

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const res = await fetch("/api/settings/ip-filter");
      if (res.ok) setConfig(await res.json());
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (updates) => {
    try {
      const res = await fetch("/api/settings/ip-filter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) setConfig(await res.json());
    } catch {}
  };

  const setMode = (mode) => {
    if (mode === "disabled") {
      updateConfig({ enabled: false });
    } else {
      updateConfig({ enabled: true, mode });
    }
  };

  const addIP = () => {
    if (!newIP.trim()) return;
    const key = listTarget === "blacklist" ? "addBlacklist" : "addWhitelist";
    updateConfig({ [key]: newIP.trim() });
    setNewIP("");
  };

  const removeIP = (ip, list) => {
    const key = list === "blacklist" ? "removeBlacklist" : "removeWhitelist";
    updateConfig({ [key]: ip });
  };

  const removeBan = (ip) => updateConfig({ removeBan: ip });

  const activeMode = !config.enabled ? "disabled" : config.mode;

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            security
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("ipAccessControl")}</h3>
          <p className="text-sm text-text-muted">{t("ipAccessControlDesc")}</p>
        </div>
      </div>

      {/* Mode selector */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
            disabled={loading}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-all ${
              activeMode === m.value
                ? "border-red-500/50 bg-red-500/5 ring-1 ring-red-500/20"
                : "border-border/50 hover:border-border hover:bg-surface/30"
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                activeMode === m.value ? "text-red-400" : "text-text-muted"
              }`}
            >
              {m.icon}
            </span>
            <span
              className={`text-xs font-medium ${activeMode === m.value ? "text-red-400" : "text-text-muted"}`}
            >
              {t(m.labelKey)}
            </span>
          </button>
        ))}
      </div>

      {config.enabled && (
        <div className="flex flex-col gap-4">
          {/* Add IP */}
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Input
                label={t("addIpAddress")}
                placeholder={t("ipAddressPlaceholder")}
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIP()}
              />
            </div>
            <div className="flex gap-1 pb-[2px]">
              <Button
                size="sm"
                variant={listTarget === "blacklist" ? "danger" : "secondary"}
                onClick={() => {
                  setListTarget("blacklist");
                  if (newIP.trim()) addIP();
                }}
              >
                {t("block")}
              </Button>
              <Button
                size="sm"
                variant={listTarget === "whitelist" ? "primary" : "secondary"}
                onClick={() => {
                  setListTarget("whitelist");
                  if (newIP.trim()) addIP();
                }}
              >
                {t("allow")}
              </Button>
            </div>
          </div>

          {/* Blacklist */}
          {config.blacklist.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                {t("blocked", { count: config.blacklist.length })}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {config.blacklist.map((ip) => (
                  <span
                    key={ip}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono
                               bg-red-500/10 text-red-400 border border-red-500/20"
                  >
                    {ip}
                    <button
                      onClick={() => removeIP(ip, "blacklist")}
                      className="hover:text-red-300"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Whitelist */}
          {config.whitelist.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                {t("allowed", { count: config.whitelist.length })}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {config.whitelist.map((ip) => (
                  <span
                    key={ip}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono
                               bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    {ip}
                    <button
                      onClick={() => removeIP(ip, "whitelist")}
                      className="hover:text-emerald-300"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Temp Bans */}
          {config.tempBans.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                {t("temporaryBans", { count: config.tempBans.length })}
              </p>
              <div className="flex flex-col gap-1.5">
                {config.tempBans.map((ban) => (
                  <div
                    key={ban.ip}
                    className="flex items-center justify-between px-3 py-2 rounded-lg
                               bg-orange-500/5 border border-orange-500/20 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-orange-400">{ban.ip}</span>
                      <span className="text-xs text-text-muted">— {ban.reason}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted tabular-nums">
                        {t("minLeft", { min: Math.ceil(ban.remainingMs / 60000) })}
                      </span>
                      <button
                        onClick={() => removeBan(ban.ip)}
                        className="text-text-muted hover:text-orange-400"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
