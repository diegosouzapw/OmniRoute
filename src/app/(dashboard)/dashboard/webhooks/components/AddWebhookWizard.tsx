"use client";

import { useState } from "react";
import { Modal } from "@/shared/components";
import { Step1ChooseIntegration } from "./steps/Step1ChooseIntegration";
import {
  Step2ConfigureIntegration,
  type SlackConfig,
  type TelegramConfig,
  type DiscordConfig,
  type CustomConfig,
} from "./steps/Step2ConfigureIntegration";
import { Step3EventsAndTest } from "./steps/Step3EventsAndTest";
import { HowItWorksSidebar } from "./HowItWorksSidebar";
import type { WebhookKind } from "./shared/IntegrationCard";

interface AddWebhookWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

const STEPS = [1, 2, 3] as const;

interface WizardState {
  kind: WebhookKind;
  slack: SlackConfig;
  telegram: TelegramConfig;
  discord: DiscordConfig;
  custom: CustomConfig;
  events: string[];
  enabled: boolean;
  description: string;
}

const INITIAL: WizardState = {
  kind: "slack",
  slack: { webhookUrl: "" },
  telegram: { botToken: "", chatId: "" },
  discord: { webhookUrl: "" },
  custom: { endpointUrl: "", secretKey: "" },
  events: ["*"],
  enabled: true,
  description: "",
};

function step2Valid(state: WizardState): boolean {
  const { kind } = state;
  if (kind === "slack") return state.slack.webhookUrl.trim().length > 0;
  if (kind === "telegram")
    return state.telegram.botToken.trim().length > 0 && state.telegram.chatId.trim().length > 0;
  if (kind === "discord") return state.discord.webhookUrl.trim().length > 0;
  if (kind === "custom") return state.custom.endpointUrl.trim().length > 0;
  return false;
}

export function AddWebhookWizard({ isOpen, onClose, onCreated, t }: AddWebhookWizardProps) {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const handleClose = () => {
    if (saving) return;
    setStep(1);
    setState(INITIAL);
    setError(null);
    setCreatedId(null);
    onClose();
  };

  // Builds the config payload (URL + kind + metadata) — sent when entering step 3.
  const buildConfigPayload = () => {
    const { kind } = state;
    if (kind === "slack") return { kind, url: state.slack.webhookUrl };
    if (kind === "discord") return { kind, url: state.discord.webhookUrl };
    if (kind === "telegram") {
      return { kind, url: state.telegram.chatId, metadata: { botToken: state.telegram.botToken } };
    }
    const payload: Record<string, unknown> = { kind, url: state.custom.endpointUrl };
    if (state.custom.secretKey.trim()) payload.secret = state.custom.secretKey.trim();
    return payload;
  };

  // Called when Next is clicked on step 2: create (or update) the webhook so the
  // test button is available at step 3 before the user clicks Finish.
  const handleNextFromStep2 = async () => {
    setSaving(true);
    setError(null);
    try {
      if (createdId) {
        const res = await fetch(`/api/webhooks/${createdId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildConfigPayload()),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || t("saveFailed"));
      } else {
        const res = await fetch("/api/webhooks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildConfigPayload()),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || t("saveFailed"));
        setCreatedId(data.webhook?.id ?? null);
      }
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  // Finish: update events/enabled/description on the already-created webhook.
  const finish = async () => {
    if (!createdId) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/webhooks/${createdId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          events: state.events,
          enabled: state.enabled,
          description: state.description,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("saveFailed"));
      onCreated();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const canGoNext = step === 1 ? true : step === 2 ? step2Valid(state) : true;

  const stepTitle =
    step === 1
      ? t("wizard.step1Title")
      : step === 2
        ? t("wizard.step2Title")
        : t("wizard.step3Title");

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`${t("addWebhook")} — ${stepTitle}`}
      size="xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-1">
            {STEPS.map((s) => (
              <span
                key={s}
                className={`inline-block size-2 rounded-full transition-colors ${
                  s === step ? "bg-primary" : s < step ? "bg-primary/40" : "bg-border"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-sidebar hover:text-text-main disabled:opacity-40"
            >
              {t("wizard.cancel")}
            </button>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={saving}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
              >
                {t("wizard.back")}
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => (step === 2 ? void handleNextFromStep2() : setStep((s) => s + 1))}
                disabled={!canGoNext || saving}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-40"
              >
                {saving && step === 2 && (
                  <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                )}
                {t("wizard.next")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void finish()}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-40"
              >
                {saving && (
                  <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                )}
                {t("wizard.finish")}
              </button>
            )}
          </div>
        </div>
      }
    >
      <div className="flex gap-6">
        <div className="min-w-0 flex-1">
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
              {error}
            </div>
          )}
          {step === 1 && (
            <Step1ChooseIntegration
              selected={state.kind}
              onSelect={(kind) => setState((s) => ({ ...s, kind }))}
              t={t}
            />
          )}
          {step === 2 && (
            <Step2ConfigureIntegration
              kind={state.kind}
              slack={state.slack}
              telegram={state.telegram}
              discord={state.discord}
              custom={state.custom}
              onChangeSlack={(v) => setState((s) => ({ ...s, slack: v }))}
              onChangeTelegram={(v) => setState((s) => ({ ...s, telegram: v }))}
              onChangeDiscord={(v) => setState((s) => ({ ...s, discord: v }))}
              onChangeCustom={(v) => setState((s) => ({ ...s, custom: v }))}
              t={t}
            />
          )}
          {step === 3 && (
            <Step3EventsAndTest
              webhookId={createdId ?? undefined}
              events={state.events}
              enabled={state.enabled}
              description={state.description}
              onChangeEvents={(events) => setState((s) => ({ ...s, events }))}
              onChangeEnabled={(enabled) => setState((s) => ({ ...s, enabled }))}
              onChangeDescription={(description) => setState((s) => ({ ...s, description }))}
              t={t}
            />
          )}
        </div>
        <div className="w-64 shrink-0 hidden lg:block">
          <HowItWorksSidebar t={t} showCustomNote={state.kind === "custom"} />
        </div>
      </div>
    </Modal>
  );
}
