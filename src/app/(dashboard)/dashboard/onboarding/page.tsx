"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: "welcome", title: "Welcome", icon: "waving_hand" },
  { id: "security", title: "Security", icon: "lock" },
  { id: "provider", title: "Provider", icon: "dns" },
  { id: "test", title: "Test", icon: "play_circle" },
  { id: "done", title: "Ready!", icon: "check_circle" },
];

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
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [apiEndpoint, setApiEndpoint] = useState("http://localhost:20128/api/v1");

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
    const resolveApiEndpoint = (apiPort) => {
      if (typeof window === "undefined") return;
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      const effectiveApiPort = apiPort || 20128;
      setApiEndpoint(`${protocol}//${hostname}:${effectiveApiPort}/api/v1`);
    };

    const checkSetup = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const settings = await res.json();
          resolveApiEndpoint(settings?.apiPort);
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
        setErrorMessage(data.error || "Failed to set password. Try again.");
        return;
      }
      handleNext();
    } catch {
      setErrorMessage("Connection error. Please try again.");
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
        setErrorMessage(data.error || "Failed to add provider. Try again.");
        return;
      }
      handleNext();
    } catch {
      setErrorMessage("Connection error. Please try again.");
    }
  };

  const handleTestProvider = async () => {
    setTestStatus("testing");
    setTestMessage("Testing connection...");
    try {
      const res = await fetch("/api/providers");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const conn = data.connections?.[0];
      if (!conn) {
        setTestStatus("error");
        setTestMessage("No provider found. You can add one from the dashboard later.");
        return;
      }
      const testRes = await fetch(`/api/providers/${conn.id}/test`, { method: "POST" });
      if (testRes.ok) {
        setTestStatus("success");
        setTestMessage("Connection successful! Your provider is ready.");
      } else {
        const err = await testRes.json().catch(() => ({}));
        setTestStatus("error");
        setTestMessage(err.error || "Test failed, but you can configure this later.");
      }
    } catch {
      setTestStatus("error");
      setTestMessage("Could not test right now. You can test from the dashboard.");
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
        <div className="animate-pulse text-text-muted">Loading...</div>
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
                <p className="text-text-muted">
                  <strong className="text-text-main">OmniRoute</strong> is your local AI API proxy.
                  It routes requests to multiple AI providers with load balancing, failover, and
                  usage tracking.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: "swap_horiz", label: "Multi-Provider" },
                    { icon: "monitoring", label: "Usage Tracking" },
                    { icon: "shield", label: "API Key Mgmt" },
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
                <p className="text-sm text-text-muted text-center">
                  Set a password to protect your dashboard, or skip for now.
                </p>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-text-muted">
                  <input
                    type="checkbox"
                    checked={skipSecurity}
                    onChange={(e) => setSkipSecurity(e.target.checked)}
                    className="accent-primary"
                  />
                  Skip password setup
                </label>
                {!skipSecurity && (
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    {password && confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-400">Passwords do not match</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Provider */}
            {currentStep.id === "provider" && (
              <div className="space-y-4">
                <p className="text-sm text-text-muted text-center">
                  Connect your first AI provider. You can add more later.
                </p>
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
                      placeholder="API Key (required)"
                      value={providerKey}
                      onChange={(e) => setProviderKey(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <input
                      type="text"
                      placeholder="Custom URL (optional)"
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
                <p className="text-sm text-text-muted">
                  Let&apos;s verify your provider connection works.
                </p>
                {testStatus === "idle" && (
                  <button
                    onClick={handleTestProvider}
                    className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    Run Connection Test
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
                      Retry
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Done */}
            {currentStep.id === "done" && (
              <div className="text-center space-y-4">
                <p className="text-text-muted">
                  You&apos;re all set! Your OmniRoute instance is configured and ready to proxy AI
                  requests.
                </p>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] text-left">
                  <p className="text-xs text-text-muted mb-2 font-medium">Your endpoint:</p>
                  <code className="text-sm text-primary">{apiEndpoint}</code>
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
                  Back
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {!isLastStep && step > 0 && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 text-sm text-text-muted hover:text-text-main transition-colors cursor-pointer"
                >
                  Skip
                </button>
              )}
              {currentStep.id === "welcome" && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Get Started
                </button>
              )}
              {currentStep.id === "security" && (
                <button
                  onClick={handleSetPassword}
                  disabled={!skipSecurity && (!password || password !== confirmPassword)}
                  className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {skipSecurity ? "Skip & Continue" : "Set Password"}
                </button>
              )}
              {currentStep.id === "provider" && (
                <button
                  onClick={handleAddProvider}
                  disabled={!selectedProvider || !providerKey}
                  className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Add Provider
                </button>
              )}
              {currentStep.id === "test" && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-primary rounded-lg text-white font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  {testStatus === "success" ? "Continue" : "Skip"}
                </button>
              )}
              {isLastStep && (
                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-green-500 rounded-lg text-white font-medium text-sm hover:bg-green-500/90 transition-colors cursor-pointer"
                >
                  Go to Dashboard →
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
              Skip wizard entirely
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
