"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { AgentStateEntry } from "../AgentBridgePageClient";
import type { MitmTargetView } from "@/mitm/types";

interface SetupWizardProps {
  target: MitmTargetView;
  agentState: AgentStateEntry | undefined;
  serverRunning: boolean;
  onClose: () => void;
  onDnsToggle: (agentId: string, enabled: boolean) => Promise<void>;
}

type Step = "verify" | "dns" | "mappings";

/**
 * 3-step setup wizard for a single agent.
 * Step 1: Verify server + cert
 * Step 2: Enable DNS
 * Step 3: Model mappings prompt
 */
export function SetupWizard({
  target,
  agentState,
  serverRunning,
  onClose,
  onDnsToggle,
}: SetupWizardProps) {
  const t = useTranslations("agentBridge");
  const tc = useTranslations("common");
  const [step, setStep] = useState<Step>("verify");
  const [enablingDns, setEnablingDns] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const certTrusted = agentState?.cert_trusted ?? false;
  const dnsEnabled = agentState?.dns_enabled ?? false;

  const handleEnableDns = async () => {
    setEnablingDns(true);
    try {
      await onDnsToggle(target.id, true);
      setStep("mappings");
    } finally {
      setEnablingDns(false);
    }
  };

  const steps: { id: Step; label: string }[] = [
    { id: "verify", label: t("wizardStep1Label") },
    { id: "dns", label: t("wizardStep2Label") },
    { id: "mappings", label: t("wizardStep3Label") },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-xl border border-border/60 bg-card shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]" style={{ color: target.color }}>
              {target.icon}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-text-main">
                {t("wizardTitle")} — {target.name}
              </h3>
              <p className="text-xs text-text-muted">{t("wizardSubtitle")}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label={tc("close")}>
            <span className="material-symbols-outlined text-[18px] text-text-muted hover:text-text-main">
              close
            </span>
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex px-5 pt-4 gap-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1.5 flex-1">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium shrink-0 ${
                  i < stepIndex
                    ? "bg-emerald-500 text-white"
                    : i === stepIndex
                      ? "bg-primary text-white"
                      : "bg-surface text-text-muted border border-border/50"
                }`}
              >
                {i < stepIndex ? (
                  <span className="material-symbols-outlined text-[12px]">check</span>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs ${i === stepIndex ? "text-text-main font-medium" : "text-text-muted"}`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-border/30 ml-1" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="px-5 py-5 flex flex-col gap-4 min-h-[180px]">
          {step === "verify" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-text-muted">{t("wizardStep1Desc")}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`material-symbols-outlined text-[16px] ${serverRunning ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {serverRunning ? "check_circle" : "cancel"}
                  </span>
                  <span>
                    {t("wizardServerCheck")}{" "}
                    {serverRunning ? t("wizardRunning") : t("wizardNotRunning")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`material-symbols-outlined text-[16px] ${certTrusted ? "text-emerald-500" : "text-amber-500"}`}
                  >
                    {certTrusted ? "verified_user" : "warning"}
                  </span>
                  <span>
                    {t("wizardCertCheck")}{" "}
                    {certTrusted ? t("wizardTrusted") : t("wizardNotTrusted")}
                  </span>
                </div>
              </div>

              {/* Tutorial steps */}
              {target.setupTutorial.steps.length > 0 && (
                <div className="mt-2 p-3 rounded-lg bg-surface/50 border border-border/30">
                  <p className="text-xs font-medium text-text-muted mb-2">
                    {t("wizardTutorialTitle")}
                  </p>
                  <ol className="flex flex-col gap-1">
                    {target.setupTutorial.steps.map((step, i) => (
                      <li key={i} className="text-xs text-text-muted flex items-start gap-1.5">
                        <span className="shrink-0 text-primary font-medium">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {step === "dns" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-text-muted">{t("wizardStep2Desc")}</p>
              <div className="rounded-lg bg-surface/50 border border-border/30 p-3 font-mono text-xs flex flex-col gap-1">
                {target.hosts.map((host) => (
                  <div key={host} className="text-text-muted">
                    <span className="text-primary">127.0.0.1</span> {host}
                  </div>
                ))}
              </div>
              {dnsEnabled && (
                <div className="flex items-center gap-2 text-sm text-emerald-500">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  {t("wizardDnsAlreadyEnabled")}
                </div>
              )}
            </div>
          )}

          {step === "mappings" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-500">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <p className="text-sm font-medium">{t("wizardStep3Success")}</p>
              </div>
              <p className="text-sm text-text-muted">{t("wizardStep3Desc")}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 pb-5 pt-0 border-t border-border/30 mt-0 pt-4">
          <button
            type="button"
            onClick={() => {
              if (step === "dns") setStep("verify");
              else if (step === "mappings") setStep("dns");
              else onClose();
            }}
            className="rounded-lg border border-border/50 bg-card px-4 py-2 text-sm text-text-muted hover:bg-surface transition-colors"
          >
            {step === "verify" ? t("cancel") : t("back")}
          </button>

          <div className="flex gap-2">
            {step === "verify" && (
              <button
                type="button"
                onClick={() => setStep("dns")}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                {t("next")}{" "}
                <span className="material-symbols-outlined text-[14px] ml-1">arrow_forward</span>
              </button>
            )}

            {step === "dns" && (
              <>
                {dnsEnabled ? (
                  <button
                    type="button"
                    onClick={() => setStep("mappings")}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                  >
                    {t("next")}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleEnableDns}
                    disabled={enablingDns}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {enablingDns ? t("enablingDns") : t("wizardEnableDns")}
                  </button>
                )}
              </>
            )}

            {step === "mappings" && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-400 transition-colors"
              >
                {t("done")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
