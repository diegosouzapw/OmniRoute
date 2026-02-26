"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect } from "react";
import { Button, Input } from "@/shared/components";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("auth");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPassword, setHasPassword] = useState(null);
  const [setupComplete, setSetupComplete] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    async function checkAuth() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

      try {
        const res = await fetch(`${baseUrl}/api/settings`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.requireLogin === false) {
            router.push("/dashboard");
            router.refresh();
            return;
          }
          setHasPassword(!!data.hasPassword);
          setSetupComplete(!!data.setupComplete);
        } else {
          setHasPassword(true);
          setSetupComplete(true);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        setHasPassword(true);
        setSetupComplete(true);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem("omniroute_login_time", String(Date.now()));
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || t("invalidPassword"));
      }
    } catch (err) {
      setError(t("errorOccurredRetry"));
    } finally {
      setLoading(false);
    }
  };

  if (hasPassword === null || setupComplete === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 border-2 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <span className="text-sm text-text-muted">{t("loading")}</span>
        </div>
      </div>
    );
  }

  if (!hasPassword && !setupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-6">
        <div
          className={`w-full max-w-md transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 mb-6">
              <span className="material-symbols-outlined text-primary text-[40px]">
                rocket_launch
              </span>
            </div>
            <h1 className="text-3xl font-bold text-text-main tracking-tight">{t("welcome")}</h1>
            <p className="text-text-muted mt-2">{t("configureInstance")}</p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-8 shadow-soft">
            <div className="text-center">
              <p className="text-text-muted leading-relaxed mb-6">{t("runOnboardingWizard")}</p>
              <Button
                variant="primary"
                className="w-full h-11 text-sm font-medium"
                onClick={() => router.push("/dashboard/onboarding")}
              >
                {t("startOnboarding")}
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted/60 mt-8">
            OmniRoute — {t("unifiedProxy")}
          </p>
        </div>
      </div>
    );
  }

  if (!hasPassword && setupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-6">
        <div
          className={`w-full max-w-md transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/10 mb-6">
              <span className="material-symbols-outlined text-amber-500 text-[40px]">
                shield_person
              </span>
            </div>
            <h1 className="text-3xl font-bold text-text-main tracking-tight">
              {t("secureYourInstance")}
            </h1>
            <p className="text-text-muted mt-2">{t("passwordNotEnabled")}</p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-8 shadow-soft">
            <div className="text-center">
              <p className="text-text-muted leading-relaxed mb-6">{t("setPasswordDescription")}</p>
              <Button
                variant="primary"
                className="w-full h-11 text-sm font-medium"
                onClick={() => router.push("/dashboard/settings?tab=security")}
              >
                {t("configurePassword")}
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted/60 mt-8">
            OmniRoute — {t("unifiedAiApiProxy")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-bg">
      <div className="flex-1 flex items-center justify-center p-6">
        <div
          className={`w-full max-w-sm transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]">hub</span>
              </div>
              <span className="text-xl font-semibold text-text-main tracking-tight">OmniRoute</span>
            </div>
            <h1 className="text-2xl font-bold text-text-main tracking-tight">{t("signIn")}</h1>
            <p className="text-text-muted mt-1.5">{t("enterPassword")}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">{t("password")}</label>
              <Input
                type="password"
                placeholder={t("enterPassword")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="h-11"
              />
              {error && (
                <p className="text-sm text-red-500 flex items-center gap-1.5 pt-1">
                  <span className="material-symbols-outlined text-base">error</span>
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full h-11 text-sm font-medium"
              loading={loading}
            >
              {t("continue")}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <a
              href="/forgot-password"
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              {t("forgotPassword")}
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent items-center justify-center p-12">
        <div
          className={`max-w-md transition-all duration-700 delay-200 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-text-main mb-3">{t("unifiedAiApiProxy")}</h2>
              <p className="text-text-muted leading-relaxed">{t("unifiedAiApiProxyDesc")}</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "swap_horiz",
                  title: t("featureMultiProviderTitle"),
                  desc: t("featureMultiProviderDesc"),
                },
                {
                  icon: "speed",
                  title: t("featureLoadBalancingTitle"),
                  desc: t("featureLoadBalancingDesc"),
                },
                {
                  icon: "analytics",
                  title: t("featureUsageTrackingTitle"),
                  desc: t("featureUsageTrackingDesc"),
                },
              ].map((item) => (
                <div
                  key={item.icon}
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface/50 border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-text-main">{item.title}</h3>
                    <p className="text-sm text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
