"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const STEP_IDS = ["welcome", "security", "provider", "test", "done"];
const STEP_ICONS = ["waving_hand", "lock", "dns", "play_circle", "check_circle"];

const COMMON_PROVIDERS = [
  { id: "openai", name: "OpenAI", color: "#10A37F" },
  { id: "anthropic", name: "Anthropic", color: "#D97757" },
  { id: "google", name: "Google AI", color: "#4285F4" },
  { id: "openrouter", name: "OpenRouter", color: "#6B21A8" },
  { id: "groq", name: "Groq", color: "#F55036" },
  { id: "mistral", name: "Mistral", color: "#FF7000" },
];

export default function OnboardingWizard() {
  const router = useRouter();
  const t = useTranslations("onboarding");
  const tc = useTranslations("common");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  // Security step state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skipSecurity, setSkipSecurity] = useState(false);

  // Provider step state
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providerUrl, setProviderUrl] = useState("");
  const [providerKey, setProviderKey] = useState("");
  const [providerName, setProviderName] = useState("");

  // Test step state
  const [testStatus, setTestStatus] = useState("idle"); // idle, testing, success, error
  const [testMessage, setTestMessage] = useState("");

  // Check if setup is already complete
  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const settings = await res.json();
          if (settings.setupComplete) {
            router.replace("/dashboard");
            return;
          }
        }
      } catch {
        // Continue with setup
      }
      setLoading(false);
    };
    checkSetup();
  }, [router]);

  const STEPS = STEP_IDS.map((id, i) => ({
    id,
    title: t(id === "done" ? "ready" : id),
    icon: STEP_ICONS[i],
  }));

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSetPassword = async () => {
    if (skipSecurity) {
      handleNext();
      return;
    }
    if (password !== confirmPassword) return;
    setErrorMessage("");
    try {
      const res = await fetch("/api/settings/require-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requireLogin: true, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || t("failedSetPassword"));
        return;
      }
      handleNext();
    } catch {
      setErrorMessage(t("connectionError"));
    }
  };

  const handleAddProvider = async () => {
    if (!selectedProvider || !providerKey) return;
    setErrorMessage("");
    try {
      const provider = COMMON_PROVIDERS.find((p) => p.id === selectedProvider);
      const defaultUrls = {
        openai: "https://api.openai.com",
        anthropic: "https://api.anthropic.com",
        google: "https://generativelanguage.googleapis.com",
        openrouter: "https://openrouter.ai/api",
        groq: "https://api.groq.com/openai",
        mistral: "https://api.mistral.ai",
      };
      const res = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: selectedProvider,
          name: providerName || provider?.name || selectedProvider,
          url: providerUrl || defaultUrls[selectedProvider] || "",
          apiKey: providerKey,
          isActive: true,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || t("failedAddProvider"));
        return;
      }
      handleNext();
    } catch {
      setErrorMessage(t("connectionError"));
    }
  };

  const handleTestProvider = async () => {
    setTestStatus("testing");
    setTestMessage(t("testingConnection"));
    try {
      const res = await fetch("/api/providers");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const conn = data.connections?.[0];
      if (!conn) {
        setTestStatus("error");
        setTestMessage(t("noProviderFound"));
        return;
      }
      const testRes = await fetch(`/api/providers/${conn.id}/test`, { method: "POST" });
      if (testRes.ok) {
        setTestStatus("success");
        setTestMessage(t("connectionSuccessful"));
      } else {
        const err = await testRes.json().catch(() => ({}));
        setTestStatus("error");
        setTestMessage(err.error || t("testFailed"));
      }
    } catch {
      setTestStatus("error");
      setTestMessage(t("couldNotTest"));
    }
  };

  const handleFinish = async () => {
    try {
      await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setupComplete: true }),
      });
    } catch {
      // Non-critical
    }
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-pulse text-text-muted">{tc("loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-lg">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  i < step
                    ? "bg-green-500/20 text-green-400"
                    : i === step
                      ? "bg-primary/20 text-primary ring-2 ring-primary/40"
                      : "bg-white/5 text-text-muted"
                }`}
              >
                {i < step ? (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                ) : (
                  i + 1
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 h-0.5 rounded-full transition-colors ${
                    i < step ? "bg-green-500/40" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-surface rounded-2xl border border-white/[0.06] p-8 shadow-xl">
          {/* Step Header */}
          <div className="text-center mb-6">
            <span
              className={`material-symbols-outlined text-[48px] mb-3 block ${
                currentStep.id === "done" ? "text-green-400" : "text-primary"
              }`}
            >
              {currentStep.icon}
            </span>
            <h2 className="text-2xl font-bold text-text-main mb-1">{currentStep.title}</h2>
          </div>

          {/* Step Content */}
          <div className="min-h-[200px]">
            {/* Welcome */}
            {currentStep.id === "welcome" && (
              <div className="text-center space-y-4">
                <p className="text-text-muted">{t("welcomeDesc")}</p>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: "swap_horiz", label: t("multiProvider") },
                    { icon: "monitoring", label: t("usageTracking") },
                    { icon: "shield", label: t("apiKeyMgmt") },
                  ].map((f) => (
                    <div
                      key={f.icon}
                      className="bg-white/[0.03] rounded-xl p-3 text-center border border-white/[0.06]"
                    >
                      <span className="material-symbols-outlined text-primary text-[24px] mb-1 block">
                        {f.icon}
                      </span>
                      <span className="text-xs text-text-muted">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {currentStep.id === "security" && (
              <div className="space-y-4">
                <p className="text-sm text-text-muted text-center">{t("securityDesc")}</p>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-text-muted">
                  <input
                    type="checkbox"
                    checked={skipSecurity}
                    onChange={(e) => setSkipSecurity(e.target.checked)}
                    className="accent-primary"
                  />
                  {t("skipPassword")}
                </label>
                {!skipSecurity && (
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder={t("enterPassword")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <input
                      type="password"
                      placeholder={t("confirmPasswordPlaceholder")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    {password && confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-400">{t("passwordsMismatch")}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Provider */}
            {currentStep.id === "provider" && (
              <div className="space-y-4">
                <p className="text-sm text-text-muted text-center">{t("providerDesc")}</p>
                <div className="grid grid-cols-3 gap-2">
                  {COMMON_PROVIDERS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProvider(p.id);
                        setProviderName(p.name);
                      }}
                      className={`p-3 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                        selectedProvider === p.id
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : "border-white/10 bg-white/[0.03] text-text-muted hover:border-white/20"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
                {selectedProvider && (
                  <div className="space-y-3 mt-4">
                    <input
                      type="password"
                      placeholder={t("apiKeyRequired")}
                      value={providerKey}
                      onChange={(e) => setProviderKey(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <input
                      type="text"
                      placeholder={t("customUrlOptional")}
                      value={providerUrl}
                      onChange={(e) => setProviderUrl(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Test */}
            {currentStep.id === "test" && (
              <div className="text-center space-y-4">
                <p className="text-sm text-text-muted">{t("testDesc")}</p>
                {testStatus === "idle" && (
                  <button
                    onClick={handleTestProvider}
                    className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    {t("runTest")}
                  </button>
                )}
                {testStatus === "testing" && (
                  <div className="flex items-center justify-center gap-2 text-text-muted">
                    <span className="material-symbols-outlined animate-spin text-[20px]">
                      progress_activity
                    </span>
                    <span className="text-sm">{testMessage}</span>
                  </div>
                )}
                {testStatus === "success" && (
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    <span className="text-sm">{testMessage}</span>
                  </div>
                )}
                {testStatus === "error" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-amber-400">
                      <span className="material-symbols-outlined text-[20px]">warning</span>
                      <span className="text-sm">{testMessage}</span>
                    </div>
                    <button
                      onClick={handleTestProvider}
                      className="text-xs text-text-muted underline cursor-pointer"
                    >
                      {t("retry")}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Done */}
            {currentStep.id === "done" && (
              <div className="text-center space-y-4">
                <p className="text-text-muted">{t("doneDesc")}</p>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] text-left">
                  <p className="text-xs text-text-muted mb-2 font-medium">{t("yourEndpoint")}</p>
                  <code className="text-sm text-primary">http://localhost:20128/api/v1</code>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
            <div>
              {step > 0 && !isLastStep && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm text-text-muted hover:text-text-main transition-colors cursor-pointer"
                >
                  {tc("back")}
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {!isLastStep && step > 0 && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 text-sm text-text-muted hover:text-text-main transition-colors cursor-pointer"
                >
                  {t("skip")}
                </button>
              )}
              {currentStep.id === "welcome" && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  {t("getStarted")}
                </button>
              )}
              {currentStep.id === "security" && (
                <button
                  onClick={handleSetPassword}
                  disabled={!skipSecurity && (!password || password !== confirmPassword)}
                  className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {skipSecurity ? t("skipAndContinue") : t("setPassword")}
                </button>
              )}
              {currentStep.id === "provider" && (
                <button
                  onClick={handleAddProvider}
                  disabled={!selectedProvider || !providerKey}
                  className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {t("addProvider")}
                </button>
              )}
              {currentStep.id === "test" && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  {testStatus === "success" ? t("continue") : t("skip")}
                </button>
              )}
              {isLastStep && (
                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-green-500 rounded-lg text-white font-medium text-sm hover:bg-green-500/90 transition-colors cursor-pointer"
                >
                  {t("goToDashboard")}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Skip Wizard */}
        {!isLastStep && (
          <div className="text-center mt-4">
            <button
              onClick={handleFinish}
              className="text-xs text-text-muted/60 hover:text-text-muted transition-colors cursor-pointer"
            >
              {t("skipWizard")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
