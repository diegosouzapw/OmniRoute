"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect } from "react";
// Direct module imports, not the "@/shared/components" barrel: the barrel
// re-exports Sidebar/Header/composites (and transitively the whole dashboard
// shell) which would otherwise ship in the /login page chunks.
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("auth");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  const [oidcEnabled, setOidcEnabled] = useState<boolean | null>(null);
  const [oidcDisablePasswordLogin, setOidcDisablePasswordLogin] = useState<boolean | null>(null);
  const [googleAuthEnabled, setGoogleAuthEnabled] = useState<boolean | null>(null);
  const [githubAuthEnabled, setGithubAuthEnabled] = useState<boolean | null>(null);
  const [disablePasswordLogin, setDisablePasswordLogin] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const [nodeVersion, setNodeVersion] = useState(null);
  const [nodeCompatible, setNodeCompatible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error") || params.get("oidc_error");
    if (!err) return;
    // Deferred like `setMounted` below: reading the query string needs the browser, and a
    // synchronous setState inside the effect trips react-hooks/set-state-in-effect.
    const raf = requestAnimationFrame(() => {
      if (err === "unauthorized_email" || err === "subject_not_allowed") {
        setError(t("oauthEmailNotAllowed"));
      } else if (err === "email_not_verified") {
        setError(t("oauthEmailNotVerified"));
      } else if (err === "invalid_state") {
        setError(t("oauthStateInvalid"));
      } else if (err === "not_configured") {
        setError(t("oauthNotConfigured"));
      } else {
        setError(t("oauthLoginFailed"));
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [t]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    async function checkAuth() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

      try {
        const res = await fetch(`${baseUrl}/api/settings/require-login`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.nodeVersion) setNodeVersion(data.nodeVersion);
          if (data.nodeCompatible === false) setNodeCompatible(false);
          if (data.authenticated === true || data.requireLogin === false) {
            window.location.href = "/dashboard";
            return;
          }
          setHasPassword(!!data.hasPassword);
          setSetupComplete(!!data.setupComplete);
          setOidcEnabled(!!data.oidcEnabled);
          setOidcDisablePasswordLogin(!!data.oidcDisablePasswordLogin);
          setGoogleAuthEnabled(!!data.googleAuthEnabled);
          setGithubAuthEnabled(!!data.githubAuthEnabled);
          setDisablePasswordLogin(!!data.disablePasswordLogin);
        } else {
          setHasPassword(true);
          setSetupComplete(true);
          setOidcEnabled(false);
          setOidcDisablePasswordLogin(false);
          setGoogleAuthEnabled(false);
          setGithubAuthEnabled(false);
          setDisablePasswordLogin(false);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        setHasPassword(true);
        setSetupComplete(true);
        setOidcEnabled(false);
        setOidcDisablePasswordLogin(false);
        setGoogleAuthEnabled(false);
        setGithubAuthEnabled(false);
        setDisablePasswordLogin(false);
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
        window.location.href = "/dashboard";
      } else {
        const data = await res.json();
        // (#521) If no password is set, redirect to onboarding instead of showing an error
        if (data.needsSetup) {
          window.location.href = "/dashboard/onboarding";
          return;
        }
        setError(data.error || t("invalidPassword"));
      }
    } catch (err) {
      setError(t("errorOccurredRetry"));
    } finally {
      setLoading(false);
    }
  };

  const nodeWarningBanner =
    !nodeCompatible && nodeVersion ? (
      <div className="w-full max-w-lg mx-auto mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="bg-red-950/60 border-2 border-red-500/40 rounded-2xl p-6 shadow-lg shadow-red-900/20 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-red-400 text-[28px]">error</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-red-300 mb-1">
                {t("nodeIncompatibleTitle")}
              </h3>
              <p className="text-sm text-red-200/80 leading-relaxed mb-3">
                {t("nodeIncompatibleDesc", { version: nodeVersion })}
              </p>
              <div className="bg-black/40 rounded-lg px-4 py-3 font-mono text-sm border border-red-500/20">
                <div className="flex items-center gap-2 text-red-300/60 mb-1">
                  <span className="material-symbols-outlined text-[14px]">terminal</span>
                  <span className="text-xs">{t("nodeIncompatibleFixLabel")}</span>
                </div>
                <code className="text-amber-300">nvm install 22 && nvm use 22</code>
              </div>
              <p className="text-xs text-red-300/50 mt-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">info</span>
                {t("nodeIncompatibleHint")}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  if (
    hasPassword === null ||
    setupComplete === null ||
    oidcEnabled === null ||
    (oidcEnabled && oidcDisablePasswordLogin === null)
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {nodeWarningBanner}
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {nodeWarningBanner}
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {nodeWarningBanner}
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
                onClick={() => router.push("/dashboard/onboarding")}
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
    <div className="min-h-screen flex flex-col">
      {nodeWarningBanner && (
        <div className="flex justify-center pt-6 px-6">{nodeWarningBanner}</div>
      )}
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center p-6">
          <div
            className={`w-full max-w-sm transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[20px]">hub</span>
                </div>
                <span className="text-xl font-semibold text-text-main tracking-tight">
                  OmniRoute
                </span>
              </div>
              <h1 className="text-2xl font-bold text-text-main tracking-tight">{t("signIn")}</h1>
              <p className="text-text-muted mt-1.5">
                {disablePasswordLogin || (oidcEnabled && oidcDisablePasswordLogin)
                  ? t("signIn")
                  : t("enterPassword")}
              </p>
            </div>

            {(googleAuthEnabled || githubAuthEnabled || oidcEnabled) && (
              <div className="space-y-3 mb-6">
                {googleAuthEnabled && (
                  <Button
                    type="button"
                    variant={
                      disablePasswordLogin || (oidcEnabled && oidcDisablePasswordLogin)
                        ? "primary"
                        : "secondary"
                    }
                    className="w-full h-11 text-sm font-medium flex items-center justify-center gap-2 border border-border bg-surface hover:bg-surface-hover text-text-main transition-colors"
                    onClick={() => (window.location.href = "/api/auth/google/login")}
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{t("continueWithGoogle")}</span>
                  </Button>
                )}

                {githubAuthEnabled && (
                  <Button
                    type="button"
                    variant={
                      disablePasswordLogin || (oidcEnabled && oidcDisablePasswordLogin)
                        ? "primary"
                        : "secondary"
                    }
                    className="w-full h-11 text-sm font-medium flex items-center justify-center gap-2 border border-border bg-surface hover:bg-surface-hover text-text-main transition-colors"
                    onClick={() => (window.location.href = "/api/auth/github/login")}
                  >
                    <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>{t("continueWithGitHub")}</span>
                  </Button>
                )}

                {oidcEnabled && (
                  <Button
                    type="button"
                    variant={
                      disablePasswordLogin || (oidcEnabled && oidcDisablePasswordLogin)
                        ? "primary"
                        : "secondary"
                    }
                    className="w-full h-11 text-sm font-medium flex items-center justify-center gap-2"
                    onClick={() => (window.location.href = "/api/auth/oidc/login")}
                  >
                    <span className="material-symbols-outlined text-lg">login</span>
                    <span>{t("continueWithOidc")}</span>
                  </Button>
                )}
              </div>
            )}

            {error && (disablePasswordLogin || (oidcEnabled && oidcDisablePasswordLogin)) && (
              <p className="text-sm text-red-500 flex items-center gap-1.5 pb-4">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </p>
            )}

            {!(disablePasswordLogin || (oidcEnabled && oidcDisablePasswordLogin)) && (
              <>
                {(googleAuthEnabled || githubAuthEnabled || oidcEnabled) && (
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-surface px-2 text-text-muted">{t("or")}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5 w-full">
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
                    <p className="text-xs text-text-muted/60 pt-0.5">{t("defaultPasswordHint")}</p>
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
              </>
            )}

            {!(disablePasswordLogin || (oidcEnabled && oidcDisablePasswordLogin)) && (
              <div className="mt-6 pt-6 border-t border-border">
                <a
                  href="/forgot-password"
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  {t("forgotPassword")}
                </a>
              </div>
            )}
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
    </div>
  );
}
