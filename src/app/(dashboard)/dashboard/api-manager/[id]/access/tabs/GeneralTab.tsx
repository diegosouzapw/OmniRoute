"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/shared/components";
import { ENDPOINT_CATEGORIES } from "@/shared/constants/endpointCategories";
import { toLocalDateTimeInputValue } from "@/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils";
import RoutingEntryLink from "@/shared/components/routing/RoutingEntryLink";
import {
  MAX_KEY_NAME_LENGTH,
  type ApiKeyAccessData,
  type ApiKeyAccessFormState,
} from "../useApiKeyAccessForm";

interface GeneralTabProps {
  apiKey: ApiKeyAccessData;
  formState: ApiKeyAccessFormState;
  setName: (name: string) => void;
  setIsActive: (isActive: boolean) => void;
  setIsBanned: (isBanned: boolean) => void;
  setExpiresAt: (expiresAt: string) => void;
  setManageEnabled: (enabled: boolean) => void;
  setSelfUsageEnabled: (enabled: boolean) => void;
  setSelfAccountQuotaEnabled: (enabled: boolean) => void;
  setAllowAllEndpoints: (allowAll: boolean) => void;
  toggleEndpoint: (id: string) => void;
  nameError?: string;
}

export default function GeneralTab({
  apiKey,
  formState,
  setName,
  setIsActive,
  setIsBanned,
  setExpiresAt,
  setManageEnabled,
  setSelfUsageEnabled,
  setSelfAccountQuotaEnabled,
  setAllowAllEndpoints,
  toggleEndpoint,
  nameError,
}: GeneralTabProps) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  const hasExclusiveLeaseScope =
    Array.isArray(apiKey?.scopes) && apiKey.scopes.includes("lease:exclusive");

  return (
    <div className="flex flex-col gap-5">
      {/* Key Name */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("keyName")}</p>
          <p className="text-xs text-text-muted">{t("keyNameDesc")}</p>
        </div>
        <div className="w-full sm:w-64 shrink-0">
          <Input
            value={formState.name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("keyNamePlaceholder")}
            maxLength={MAX_KEY_NAME_LENGTH}
            error={nameError}
          />
        </div>
      </div>

      {apiKey?.id && <RoutingEntryLink apiKeyId={apiKey.id} />}

      {/* Exclusive Lease Notice */}
      {hasExclusiveLeaseScope && (
        <div className="flex flex-col gap-1 p-3 rounded-lg border border-purple-500/30 bg-purple-500/10">
          <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-medium text-sm">
            <span className="material-symbols-outlined text-[16px]">key_vertical</span>
            {t("exclusiveLeaseNoticeTitle")}
          </div>
          <p className="text-xs text-purple-600/80 dark:text-purple-400/80">
            {t("exclusiveLeaseNoticeDesc")}
          </p>
        </div>
      )}

      {/* Key Active Toggle */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("keyActive")}</p>
          <p className="text-xs text-text-muted">{t("keyActiveDesc")}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={formState.isActive}
          onClick={() => setIsActive(!formState.isActive)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            formState.isActive
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
              : "bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {formState.isActive ? "check_circle" : "block"}
          </span>
          {formState.isActive ? tc("enabled") : tc("disabled")}
        </button>
      </div>

      {/* Ban Toggle (SECURITY) */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-red-500/20 bg-red-500/5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-red-700 dark:text-red-400">{t("bannedStatus")}</p>
          <p className="text-xs text-red-600 dark:text-red-300">
            Immediately revoke all access. Used for suspected abuse or compromised keys.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={formState.isBanned}
          onClick={() => setIsBanned(!formState.isBanned)}
          className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-colors ${
            formState.isBanned
              ? "bg-red-500 text-white shadow-sm"
              : "bg-black/5 dark:bg-white/5 text-text-muted hover:bg-black/10 dark:hover:bg-white/10 border border-border"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {formState.isBanned ? "block" : "check_circle"}
          </span>
          {formState.isBanned ? "Banned" : "Active"}
        </button>
      </div>

      {/* Expiration Date */}
      <div className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("expirationDate")}</p>
          <p className="text-xs text-text-muted">
            Key will automatically stop working after this date.
          </p>
        </div>
        <div className="flex gap-2 max-w-md">
          <input
            type="datetime-local"
            value={toLocalDateTimeInputValue(formState.expiresAt)}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) {
                setExpiresAt("");
                return;
              }
              const date = new Date(val);
              if (!Number.isNaN(date.getTime())) {
                setExpiresAt(date.toISOString());
              }
            }}
            className="min-w-0 flex-1 px-2.5 py-1.5 text-sm border border-border rounded-md bg-background text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setExpiresAt("")}
            disabled={!formState.expiresAt}
            className="shrink-0 px-3 py-1.5 text-sm font-medium border border-border rounded-md text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {tc("clear")}
          </button>
        </div>
      </div>

      {/* Management Access */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("managementAccess")}</p>
          <p className="text-xs text-text-muted">{t("managementAccessDesc")}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={formState.manageEnabled}
          onClick={() => setManageEnabled(!formState.manageEnabled)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            formState.manageEnabled
              ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30"
              : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
          {formState.manageEnabled ? tc("enabled") : tc("disabled")}
        </button>
      </div>

      {/* Self-service Visibility */}
      <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("selfServiceVisibility")}</p>
          <p className="text-xs text-text-muted">{t("selfServiceVisibilityDesc")}</p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-medium text-text-main">{t("ownUsageVisibility")}</p>
            <p className="text-xs text-text-muted">{t("ownUsageVisibilityDesc")}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={formState.selfUsageEnabled}
            onClick={() => setSelfUsageEnabled(!formState.selfUsageEnabled)}
            className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              formState.selfUsageEnabled
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">query_stats</span>
            {formState.selfUsageEnabled ? tc("enabled") : tc("disabled")}
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-3">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-medium text-text-main">
              {t("sharedAccountQuotaVisibility")}
            </p>
            <p className="text-xs text-text-muted">{t("sharedAccountQuotaVisibilityDesc")}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={formState.selfAccountQuotaEnabled}
            disabled={!formState.selfUsageEnabled}
            onClick={() => setSelfAccountQuotaEnabled(!formState.selfAccountQuotaEnabled)}
            className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              formState.selfAccountQuotaEnabled
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
            } ${!formState.selfUsageEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span className="material-symbols-outlined text-[14px]">account_balance</span>
            {formState.selfAccountQuotaEnabled ? tc("enabled") : tc("disabled")}
          </button>
        </div>
      </div>

      {/* Allowed Endpoints Section */}
      <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("endpointRestrictions")}</p>
            <p className="text-xs text-text-muted">
              {formState.allowAllEndpoints
                ? t("allEndpointsAllowed")
                : t("endpointsRestricted", {
                    count: formState.selectedEndpoints.length,
                  })}
            </p>
          </div>
          <div className="flex gap-1 p-0.5 bg-surface rounded-md">
            <button
              type="button"
              onClick={() => setAllowAllEndpoints(true)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                formState.allowAllEndpoints
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {t("all")}
            </button>
            <button
              type="button"
              onClick={() => setAllowAllEndpoints(false)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                !formState.allowAllEndpoints
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {t("restrict")}
            </button>
          </div>
        </div>
        {!formState.allowAllEndpoints && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-56 overflow-y-auto">
            {ENDPOINT_CATEGORIES.map((cat) => {
              const isSelected = formState.selectedEndpoints.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleEndpoint(cat.id)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-all border ${
                    isSelected
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-surface/50 border-border text-text-muted hover:text-text-main hover:border-primary/40"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-primary border-primary" : "border-border"
                    }`}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-white text-[11px]">
                        check
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium truncate text-text-main">{cat.label}</span>
                    <span className="text-[10px] text-text-muted truncate">{cat.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
