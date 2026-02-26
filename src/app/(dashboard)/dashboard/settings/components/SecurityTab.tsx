"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input, Toggle } from "@/shared/components";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import IPFilterSection from "./IPFilterSection";
import SessionInfoCard from "./SessionInfoCard";
import { useTranslations } from "next-intl";

export default function SecurityTab() {
  const [settings, setSettings] = useState<any>({ requireLogin: false, hasPassword: false });
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passStatus, setPassStatus] = useState({ type: "", message: "" });
  const [passLoading, setPassLoading] = useState(false);
  const t = useTranslations("settings");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateRequireLogin = async (requireLogin) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requireLogin }),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, requireLogin }));
      }
    } catch (err) {
      console.error("Failed to update require login:", err);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, [key]: value }));
      }
    } catch (err) {
      console.error(`Failed to update ${key}:`, err);
    }
  };

  const toggleBlockedProvider = (providerId: string) => {
    const current: string[] = settings.blockedProviders || [];
    const updated = current.includes(providerId)
      ? current.filter((p) => p !== providerId)
      : [...current, providerId];
    updateSetting("blockedProviders", updated);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPassStatus({ type: "error", message: t("passwordsNoMatch") });
      return;
    }

    setPassLoading(true);
    setPassStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPassStatus({ type: "success", message: t("passwordUpdated") });
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        setPassStatus({ type: "error", message: data.error || t("failedUpdatePassword") });
      }
    } catch {
      setPassStatus({ type: "error", message: t("errorOccurred") });
    } finally {
      setPassLoading(false);
    }
  };

  const blockedProviders: string[] = settings.blockedProviders || [];

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              shield
            </span>
          </div>
          <h3 className="text-lg font-semibold">{t("security")}</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("requireLogin")}</p>
              <p className="text-sm text-text-muted">{t("requireLoginDesc")}</p>
            </div>
            <Toggle
              checked={settings.requireLogin === true}
              onChange={() => updateRequireLogin(!settings.requireLogin)}
              disabled={loading}
            />
          </div>
          {settings.requireLogin === true && (
            <form
              onSubmit={handlePasswordChange}
              className="flex flex-col gap-4 pt-4 border-t border-border/50"
            >
              {settings.hasPassword && (
                <Input
                  label={t("currentPassword")}
                  type="password"
                  placeholder={t("enterCurrentPassword")}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  required
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t("newPassword")}
                  type="password"
                  placeholder={t("enterNewPassword")}
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  required
                />
                <Input
                  label={t("confirmPassword")}
                  type="password"
                  placeholder={t("confirmPasswordPlaceholder")}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  required
                />
              </div>

              {passStatus.message && (
                <p
                  className={`text-sm ${passStatus.type === "error" ? "text-red-500" : "text-green-500"}`}
                >
                  {passStatus.message}
                </p>
              )}

              <div className="pt-2">
                <Button type="submit" variant="primary" loading={passLoading}>
                  {settings.hasPassword ? t("updatePassword") : t("setPassword")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>

      {/* API Endpoint Protection */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              api
            </span>
          </div>
          <h3 className="text-lg font-semibold">{t("apiEndpointProtection")}</h3>
        </div>
        <div className="flex flex-col gap-4">
          {/* Require auth for /models */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("requireAuthModels")}</p>
              <p className="text-sm text-text-muted">{t("requireAuthModelsDesc")}</p>
            </div>
            <Toggle
              checked={settings.requireAuthForModels === true}
              onChange={() => updateSetting("requireAuthForModels", !settings.requireAuthForModels)}
              disabled={loading}
            />
          </div>

          {/* Blocked Providers */}
          <div className="pt-4 border-t border-border/50">
            <div className="mb-3">
              <p className="font-medium">{t("blockedProviders")}</p>
              <p className="text-sm text-text-muted">{t("blockedProvidersDesc")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.values(AI_PROVIDERS).map((provider: any) => {
                const isBlocked = blockedProviders.includes(provider.id);
                return (
                  <button
                    key={provider.id}
                    onClick={() => toggleBlockedProvider(provider.id)}
                    disabled={loading}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                      isBlocked
                        ? "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                        : "bg-black/[0.02] dark:bg-white/[0.02] border-transparent text-text-muted hover:bg-black/[0.05] dark:hover:bg-white/[0.05]"
                    }`}
                    title={
                      isBlocked
                        ? t("unblockProviderTitle", { provider: provider.name })
                        : t("blockProviderTitle", { provider: provider.name })
                    }
                  >
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ color: isBlocked ? undefined : provider.color }}
                    >
                      {isBlocked ? "block" : provider.icon}
                    </span>
                    {provider.name}
                    {isBlocked && (
                      <span className="material-symbols-outlined text-[12px] text-red-500">
                        close
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {blockedProviders.length > 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                {t("providersBlocked", { count: blockedProviders.length })}
              </p>
            )}
          </div>
        </div>
      </Card>

      <SessionInfoCard />
      <IPFilterSection />
    </div>
  );
}
