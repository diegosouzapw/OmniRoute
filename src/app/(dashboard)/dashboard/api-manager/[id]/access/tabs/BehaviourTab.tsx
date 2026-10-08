"use client";

import { useTranslations } from "next-intl";
import { ApiKeyCompressionToggle } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCompressionToggle";
import { ChaosModeAccessToggle } from "@/app/(dashboard)/dashboard/api-manager/components/ChaosModeAccessToggle";
import { BypassProviderQuotaToggle } from "@/app/(dashboard)/dashboard/api-manager/components/BypassProviderQuotaToggle";
import type { ApiKeyAccessFormState, StreamDefaultMode } from "../useApiKeyAccessForm";
import TabErrorList from "./TabErrorList";

interface BehaviourTabProps {
  formState: ApiKeyAccessFormState;
  setNoLog: (enabled: boolean) => void;
  setAutoResolve: (enabled: boolean) => void;
  setStreamDefaultMode: (mode: StreamDefaultMode) => void;
  setCompressionEnabled: (enabled: boolean) => void;
  setChaosModeEnabled: (enabled: boolean) => void;
  setAllowUsageCommand: (enabled: boolean) => void;
  setBypassProviderQuotaPolicyEnabled: (enabled: boolean) => void;
  errors?: string[];
}

type BehaviourSectionProps<K extends keyof BehaviourTabProps> = Pick<
  BehaviourTabProps,
  "formState" | K
>;

function PayloadPrivacyToggle({ formState, setNoLog }: BehaviourSectionProps<"setNoLog">) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("noLogPayloadPrivacy")}</p>
        <p className="text-xs text-text-muted">
          Disable request/response payload persistence for this API key.
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={formState.noLog}
        onClick={() => setNoLog(!formState.noLog)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
          formState.noLog
            ? "bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30"
            : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
        }`}
      >
        <span className="material-symbols-outlined text-[14px]">
          {formState.noLog ? "visibility_off" : "visibility"}
        </span>
        {formState.noLog ? tc("enabled") : tc("disabled")}
      </button>
    </div>
  );
}

function AutoResolveToggle({ formState, setAutoResolve }: BehaviourSectionProps<"setAutoResolve">) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("autoResolve")}</p>
        <p className="text-xs text-text-muted">{t("autoResolveDesc")}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={formState.autoResolve}
        onClick={() => setAutoResolve(!formState.autoResolve)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
          formState.autoResolve
            ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
            : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
        }`}
      >
        <span className="material-symbols-outlined text-[14px]">
          {formState.autoResolve ? "auto_fix_high" : "auto_fix_normal"}
        </span>
        {formState.autoResolve ? tc("enabled") : tc("disabled")}
      </button>
    </div>
  );
}

function StreamDefaultModeSelector({
  formState,
  setStreamDefaultMode,
}: BehaviourSectionProps<"setStreamDefaultMode">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-sm font-medium text-text-main">{t("streamDefaultMode")}</p>
        <p className="text-xs text-text-muted">{t("streamDefaultModeDesc")}</p>
      </div>
      <div className="flex gap-1 p-0.5 bg-surface rounded-md shrink-0 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setStreamDefaultMode("legacy")}
          className={`inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
            formState.streamDefaultMode === "legacy"
              ? "bg-primary text-white"
              : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">settings_backup_restore</span>
          {t("streamDefaultLegacy")}
        </button>
        <button
          type="button"
          onClick={() => setStreamDefaultMode("json")}
          className={`inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
            formState.streamDefaultMode === "json"
              ? "bg-primary text-white"
              : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">data_object</span>
          {t("streamDefaultJson")}
        </button>
      </div>
    </div>
  );
}

export default function BehaviourTab({
  formState,
  setNoLog,
  setAutoResolve,
  setStreamDefaultMode,
  setCompressionEnabled,
  setChaosModeEnabled,
  setAllowUsageCommand,
  setBypassProviderQuotaPolicyEnabled,
  errors,
}: BehaviourTabProps) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col gap-5">
      <TabErrorList errors={errors} />

      {/* Privacy Toggle */}
      <PayloadPrivacyToggle formState={formState} setNoLog={setNoLog} />

      {/* Auto-Resolve Toggle */}
      <AutoResolveToggle formState={formState} setAutoResolve={setAutoResolve} />

      {/* Stream Default Compatibility */}
      <StreamDefaultModeSelector
        formState={formState}
        setStreamDefaultMode={setStreamDefaultMode}
      />

      {/* Prompt Compression Toggle */}
      <ApiKeyCompressionToggle
        enabled={formState.compressionEnabled}
        onToggle={() => setCompressionEnabled(!formState.compressionEnabled)}
      />

      {/* Chaos Mode Access Toggle */}
      <ChaosModeAccessToggle
        enabled={formState.chaosModeEnabled}
        onToggle={() => setChaosModeEnabled(!formState.chaosModeEnabled)}
      />

      {/* Local Usage Command Toggle */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("localUsageCommand")}</p>
          <p className="text-xs text-text-muted">{t("localUsageCommandDesc")}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={formState.allowUsageCommand}
          onClick={() => setAllowUsageCommand(!formState.allowUsageCommand)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            formState.allowUsageCommand
              ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30"
              : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">terminal</span>
          {formState.allowUsageCommand ? tc("enabled") : tc("disabled")}
        </button>
      </div>

      {/* Advanced Provider Quota Policy Override */}
      <BypassProviderQuotaToggle
        enabled={formState.bypassProviderQuotaPolicyEnabled}
        onToggle={() =>
          setBypassProviderQuotaPolicyEnabled(!formState.bypassProviderQuotaPolicyEnabled)
        }
      />
    </div>
  );
}
