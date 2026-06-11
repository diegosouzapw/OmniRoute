"use client";
import { useState, useEffect, useMemo } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import {
  Button,
  Badge,
  Input,
  Modal,
  Toggle,
  Select
} from "@/shared/components";
import {
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  providerAllowsOptionalApiKey
} from "@/shared/constants/providers";
import {
  ANTIGRAVITY_CLIENT_PROFILE_OPTIONS,
  normalizeAntigravityClientProfileSetting
} from "@/shared/constants/antigravityClientProfile";
import { maskEmail, pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import {
  CodexServiceTier
} from "@/lib/providers/requestDefaults";
import {
  getCodexEffectiveServiceTier
} from "@/lib/providers/codexFastTier";
import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";
import { parseExtraApiKeys } from "@/shared/utils/parseApiKeys";
import { resolveDashboardProviderInfo } from "../providerPageUtils";
import {
  getWebSessionCredentialRequirement
} from "./webSessionCredentials";

import type {
  CompatByProtocolMap,
  ModelCompatSavePatch,
  CompatModelRow,
  CompatModelMap,
  ModelRowProps,
  PassthroughModelRowProps,
  PassthroughModelsSectionProps,
  CustomModelsSectionProps,
  CompatibleModelsSectionProps,
  ProviderMessageTranslator,
  HeaderDraftRow,
  ProviderModelsApiErrorBody,
  CommandCodeAuthFlowState,
  CooldownTimerProps,
  ConnectionRowConnection,
  ConnectionRowProps,
  AddApiKeyModalProps,
  EditConnectionModalConnection,
  EditConnectionModalProps,
  EditCompatibleNodeModalNode,
  EditCompatibleNodeModalProps,
  ImportTopTab,
  ClaudeImportTopTab,
  GeminiImportTopTab,
  LocalProviderMetadata
} from "./types";
import {
  providerText,
  getWebSessionCredentialLabel,
  getWebSessionCredentialHint,
  getWebSessionCredentialCheckLabel,
  WebSessionCredentialGuide,
  getCodexServiceTierLabel,
  normalizeCodexLimitPolicy,
  getCodexRequestDefaults,
  getClaudeCodeCompatibleRequestDefaults,
  getLocalProviderMetadata,
  isBaseUrlConfigurableProvider,
  getProviderBaseUrlDefault,
  getProviderBaseUrlHint,
  getProviderBaseUrlPlaceholder,
  isGlmProvider,
  parseRoutingTagsInput,
  parseExcludedModelsInput,
  formatRoutingTagsInput,
  formatExcludedModelsInput,
  normalizeAndValidateHttpBaseUrl,
  getStatusPresentation,
  CooldownTimer
} from "./utils";

function ConnectionRow({
  connection,
  isOAuth,
  isClaude,
  isCodex,
  isGeminiCli,
  codexGlobalServiceMode,
  isCcCompatible,
  cliproxyapiEnabled,
  isFirst,
  isLast,
  isSelected,
  onToggleSelect,
  onMoveUp,
  onMoveDown,
  onToggleActive,
  onToggleRateLimit,
  onToggleClaudeExtraUsage,
  onToggleCodex5h,
  onToggleCodexWeekly,
  onToggleCliproxyapiMode,
  onRetest,
  isRetesting,
  onEdit,
  onDelete,
  onReauth,
  onProxy,
  hasProxy,
  proxySource,
  proxyHost,
  onRefreshToken,
  isRefreshing,
  onApplyCodexAuthLocal,
  isApplyingCodexAuthLocal,
  onExportCodexAuthFile,
  isExportingCodexAuthFile,
  onApplyClaudeAuthLocal,
  isApplyingClaudeAuthLocal,
  onExportClaudeAuthFile,
  isExportingClaudeAuthFile,
  onApplyGeminiAuthLocal,
  isApplyingGeminiAuthLocal,
  onExportGeminiAuthFile,
  isExportingGeminiAuthFile,
  perKeyProxyEnabled,
  onTogglePerKeyProxyEnabled,
  proxyEnabled,
  onToggleProxyEnabled,
}: ConnectionRowProps) {
  const t = useTranslations("providers");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const displayName = isOAuth
    ? pickDisplayValue(
        [connection.name, connection.email, connection.displayName],
        emailsVisible,
        t("oauthAccount")
      )
    : connection.name;
  const applyCodexAuthLabel =
    typeof t.has === "function" && t.has("applyCodexAuthLocal")
      ? t("applyCodexAuthLocal")
      : "Apply auth";
  const exportCodexAuthLabel =
    typeof t.has === "function" && t.has("exportCodexAuthFile")
      ? t("exportCodexAuthFile")
      : "Export auth";
  const applyClaudeAuthLabel =
    typeof t.has === "function" && t.has("applyClaudeAuthLocal")
      ? t("applyClaudeAuthLocal")
      : "Apply auth";
  const exportClaudeAuthLabel =
    typeof t.has === "function" && t.has("exportClaudeAuthFile")
      ? t("exportClaudeAuthFile")
      : "Export auth";
  const applyGeminiAuthLabel =
    typeof t.has === "function" && t.has("applyGeminiAuthLocal")
      ? t("applyGeminiAuthLocal")
      : "Apply auth";
  const exportGeminiAuthLabel =
    typeof t.has === "function" && t.has("exportGeminiAuthFile")
      ? t("exportGeminiAuthFile")
      : "Export auth";

  // Use useState + useEffect for impure Date.now() to avoid calling during render
  const [isCooldown, setIsCooldown] = useState(false);
  // T12: token expiry status — lazy init avoids calling Date.now() during render;
  // updates every 30s via interval only (no sync setState in effect body).
  // Prefer tokenExpiresAt (updated on each refresh) over expiresAt (original grant date).
  const effectiveExpiresAt = connection.tokenExpiresAt || connection.expiresAt;
  const getTokenMinsLeft = () => {
    if (!isOAuth || !effectiveExpiresAt) return null;
    const expiresMs = new Date(effectiveExpiresAt).getTime();
    return Math.floor((expiresMs - Date.now()) / 60000);
  };
  const [tokenMinsLeft, setTokenMinsLeft] = useState<number | null>(getTokenMinsLeft);

  useEffect(() => {
    if (!isOAuth || !effectiveExpiresAt) return;
    const update = () => {
      const expiresMs = new Date(effectiveExpiresAt).getTime();
      setTokenMinsLeft(Math.floor((expiresMs - Date.now()) / 60000));
    };
    update();
    const iv = setInterval(update, 30000);
    return () => clearInterval(iv);
  }, [isOAuth, effectiveExpiresAt]);

  useEffect(() => {
    const checkCooldown = () => {
      const cooldown =
        connection.rateLimitedUntil && new Date(connection.rateLimitedUntil).getTime() > Date.now();
      setIsCooldown(cooldown);
    };

    checkCooldown();
    // Update every second while in cooldown
    const interval = connection.rateLimitedUntil ? setInterval(checkCooldown, 1000) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connection.rateLimitedUntil]);

  // Determine effective status (override unavailable if cooldown expired)
  const effectiveStatus =
    connection.testStatus === "unavailable" && !isCooldown
      ? "active" // Cooldown expired → treat as active
      : connection.testStatus;

  const statusPresentation = getStatusPresentation(connection, effectiveStatus, isCooldown, t);
  const rateLimitEnabled = !!connection.rateLimitProtection;
  const codexPolicy =
    connection.providerSpecificData &&
    typeof connection.providerSpecificData === "object" &&
    connection.providerSpecificData.codexLimitPolicy &&
    typeof connection.providerSpecificData.codexLimitPolicy === "object"
      ? connection.providerSpecificData.codexLimitPolicy
      : {};
  const normalizedCodexPolicy = normalizeCodexLimitPolicy(codexPolicy);
  const codex5hEnabled = normalizedCodexPolicy.use5h;
  const codexWeeklyEnabled = normalizedCodexPolicy.useWeekly;
  const codexServiceTier = isCodex
    ? getCodexEffectiveServiceTier(
        connection.providerSpecificData,
        codexGlobalServiceMode ?? "none"
      )
    : "default";
  const codexServiceTierIsGlobal =
    isCodex && codexGlobalServiceMode !== undefined && codexGlobalServiceMode !== "none";
  const codexServiceTierBadge =
    codexServiceTier === "priority"
      ? {
          label: providerText(t, "codexTierFastLabel", "Fast"),
          icon: "bolt",
          className: "bg-sky-500/15 text-sky-500",
          title: codexServiceTierIsGlobal
            ? providerText(
                t,
                "providerDetailGlobalPriorityActive",
                "Global Codex priority service tier is active"
              )
            : providerText(
                t,
                "providerDetailConnectionPriorityActive",
                "Codex priority service tier is active for this connection"
              ),
        }
      : codexServiceTier === "flex"
        ? {
            label: providerText(t, "codexTierFlexLabel", "Flex"),
            icon: "speed",
            className: "bg-cyan-500/15 text-cyan-500",
            title: codexServiceTierIsGlobal
              ? providerText(
                  t,
                  "providerDetailGlobalFlexActive",
                  "Global Codex flex service tier is active"
                )
              : providerText(
                  t,
                  "providerDetailConnectionFlexActive",
                  "Codex flex service tier is active for this connection"
                ),
          }
        : null;
  const claudeBlockExtraUsageEnabled = isClaude
    ? isClaudeExtraUsageBlockEnabled("claude", connection.providerSpecificData)
    : false;
  const cliproxyapiDeepMode = !!cliproxyapiEnabled;

  return (
    <div
      className={`group flex items-center justify-between p-3 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${connection.isActive === false ? "opacity-60" : ""}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {onToggleSelect && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="w-4 h-4 shrink-0 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
          />
        )}
        {/* Priority arrows */}
        <div className="flex flex-col">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className={`p-0.5 rounded ${isFirst ? "text-text-muted/30 cursor-not-allowed" : "hover:bg-sidebar text-text-muted hover:text-primary"}`}
          >
            <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className={`p-0.5 rounded ${isLast ? "text-text-muted/30 cursor-not-allowed" : "hover:bg-sidebar text-text-muted hover:text-primary"}`}
          >
            <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </button>
        </div>
        <span className="material-symbols-outlined text-base text-text-muted">
          {isOAuth ? "lock" : "key"}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{displayName}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant={statusPresentation.statusVariant as any} size="sm" dot>
              {statusPresentation.statusLabel}
            </Badge>
            {/* T12: Token expiry status indicator (state-driven, no Date.now in render) */}
            {tokenMinsLeft !== null &&
              (tokenMinsLeft < 0 ? (
                <span
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-red-500/15 text-red-500"
                  title={t("tokenExpiredTitle", { date: effectiveExpiresAt })}
                >
                  <span className="material-symbols-outlined text-[11px]">error</span>
                  {t("tokenExpiredBadge")}
                </span>
              ) : tokenMinsLeft < 30 ? (
                <span
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/15 text-amber-500"
                  title={t("tokenExpiresSoonTitle", { minutes: tokenMinsLeft })}
                >
                  <span className="material-symbols-outlined text-[11px]">warning</span>
                  {`~${tokenMinsLeft}m`}
                </span>
              ) : null)}
            {isCooldown && connection.isActive !== false && (
              <CooldownTimer until={connection.rateLimitedUntil} />
            )}
            {statusPresentation.errorBadge && connection.isActive !== false && (
              <Badge variant={statusPresentation.errorBadge.variant} size="sm">
                {t(statusPresentation.errorBadge.labelKey)}
              </Badge>
            )}
            {connection.lastError && connection.isActive !== false && (
              <span
                className={`text-xs truncate max-w-[300px] ${statusPresentation.errorTextClass}`}
                title={connection.lastError}
              >
                {connection.lastError}
              </span>
            )}
            <span className="text-xs text-text-muted">#{connection.priority}</span>
            {connection.globalPriority && (
              <span className="text-xs text-text-muted">
                {t("autoPriority", { priority: connection.globalPriority })}
              </span>
            )}
            {connection.maxConcurrent != null && connection.maxConcurrent > 0 && (
              <span
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-zinc-500/15 text-zinc-500 dark:bg-zinc-400/15 dark:text-zinc-400"
                title={t("accountConcurrencyCapLabel")}
              >
                <span className="material-symbols-outlined text-[11px]">dynamic_feed</span>
                {connection.maxConcurrent}
              </span>
            )}
            {/* Rate Limit Protection — inline toggle with label */}
            <span className="text-text-muted/30 select-none">|</span>
            <button
              onClick={() => onToggleRateLimit(!rateLimitEnabled)}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                rateLimitEnabled
                  ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25"
                  : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
              }`}
              title={
                rateLimitEnabled ? t("disableRateLimitProtection") : t("enableRateLimitProtection")
              }
            >
              <span className="material-symbols-outlined text-[13px]">shield</span>
              {rateLimitEnabled ? t("rateLimitProtected") : t("rateLimitUnprotected")}
            </button>
            {isClaude && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <button
                  onClick={() => onToggleClaudeExtraUsage?.(!claudeBlockExtraUsageEnabled)}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    !claudeBlockExtraUsageEnabled
                      ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={t("claudeExtraUsageToggleTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">payments</span>
                  {t("claudeExtraUsageShort")}{" "}
                  {!claudeBlockExtraUsageEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </button>
              </>
            )}
            {isCcCompatible && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <button
                  onClick={() => onToggleCliproxyapiMode?.(!cliproxyapiDeepMode)}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    cliproxyapiDeepMode
                      ? "bg-indigo-500/15 text-indigo-500 hover:bg-indigo-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={cliproxyapiDeepMode ? t("cpaModeEnabledTitle") : t("cpaModeDisabledTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">swap_horiz</span>
                  CPA {cliproxyapiDeepMode ? t("toggleOnShort") : t("toggleOffShort")}
                </button>
              </>
            )}
            {isCodex && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                {codexServiceTierBadge && (
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${codexServiceTierBadge.className}`}
                    title={codexServiceTierBadge.title}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {codexServiceTierBadge.icon}
                    </span>
                    {codexServiceTierBadge.label}
                  </span>
                )}
                <button
                  onClick={() => onToggleCodex5h?.(!codex5hEnabled)}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    codex5hEnabled
                      ? "bg-blue-500/15 text-blue-500 hover:bg-blue-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={t("codex5hToggleTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">timer</span>
                  5h {codex5hEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </button>
                <button
                  onClick={() => onToggleCodexWeekly?.(!codexWeeklyEnabled)}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    codexWeeklyEnabled
                      ? "bg-violet-500/15 text-violet-500 hover:bg-violet-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={t("codexWeeklyToggleTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">date_range</span>
                  {t("weeklyShort")} {codexWeeklyEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </button>
              </>
            )}
            {onToggleProxyEnabled && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <button
                  onClick={() => onToggleProxyEnabled(!proxyEnabled)}
                  aria-label={proxyEnabled ? t("proxyEnabledTitle") : t("proxyDisabledTitle")}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    proxyEnabled
                      ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={proxyEnabled ? t("proxyEnabledTitle") : t("proxyDisabledTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">vpn_lock</span>
                  {proxyEnabled ? <span className="sr-only">{t("proxyOn")}</span> : t("proxyOff")}
                </button>
              </>
            )}
            {onTogglePerKeyProxyEnabled && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <button
                  onClick={() => onTogglePerKeyProxyEnabled(!perKeyProxyEnabled)}
                  aria-label={perKeyProxyEnabled ? t("perKeyProxyEnabledTitle") : t("perKeyProxyDisabledTitle")}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    perKeyProxyEnabled
                      ? "bg-violet-500/15 text-violet-500 hover:bg-violet-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={perKeyProxyEnabled ? t("perKeyProxyEnabledTitle") : t("perKeyProxyDisabledTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">key</span>
                  {perKeyProxyEnabled ? (
                    t("perKeyProxyOn")
                  ) : (
                    <span className="sr-only">{t("perKeyProxyOff")}</span>
                  )}
                </button>
              </>
            )}
            {hasProxy &&
              (() => {
                const colorClass =
                  proxySource === "global"
                    ? "bg-emerald-500/15 text-emerald-500"
                    : proxySource === "provider"
                      ? "bg-amber-500/15 text-amber-500"
                      : "bg-blue-500/15 text-blue-500";
                const label =
                  proxySource === "global"
                    ? t("proxySourceGlobal")
                    : proxySource === "provider"
                      ? t("proxySourceProvider")
                      : t("proxySourceKey");
                return (
                  <>
                    <span className="text-text-muted/30 select-none">|</span>
                    <span
                      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium ${colorClass}`}
                      title={t("proxyConfiguredBySource", {
                        source: label,
                        host: proxyHost || t("configured"),
                      })}
                    >
                      <span className="material-symbols-outlined text-[13px]">vpn_lock</span>
                      {proxyHost || t("proxy")}
                    </span>
                  </>
                );
              })()}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          icon="refresh"
          loading={isRetesting}
          disabled={connection.isActive === false}
          onClick={onRetest}
          className="!h-7 !px-2 text-xs"
          title={t("retestAuthentication")}
        >
          {t("retest")}
        </Button>
        {/* T12: Manual token refresh for OAuth accounts */}
        {onRefreshToken && (
          <Button
            size="sm"
            variant="ghost"
            icon="token"
            loading={isRefreshing}
            disabled={connection.isActive === false || isRefreshing}
            onClick={onRefreshToken}
            className="!h-7 !px-2 text-xs text-amber-500 hover:text-amber-400"
            title={t("refreshOauthTokenTitle")}
          >
            {t("tokenShort")}
          </Button>
        )}
        {isCodex && onApplyCodexAuthLocal && (
          <Button
            size="sm"
            variant="ghost"
            icon="download_done"
            loading={isApplyingCodexAuthLocal}
            disabled={isApplyingCodexAuthLocal}
            onClick={onApplyCodexAuthLocal}
            className="!h-7 !px-2 text-xs text-emerald-500 hover:text-emerald-400"
            title={applyCodexAuthLabel}
          >
            {applyCodexAuthLabel}
          </Button>
        )}
        {isCodex && onExportCodexAuthFile && (
          <Button
            size="sm"
            variant="ghost"
            icon="download"
            loading={isExportingCodexAuthFile}
            disabled={isExportingCodexAuthFile}
            onClick={onExportCodexAuthFile}
            className="!h-7 !px-2 text-xs text-sky-500 hover:text-sky-400"
            title={exportCodexAuthLabel}
          >
            {exportCodexAuthLabel}
          </Button>
        )}
        {isClaude && onApplyClaudeAuthLocal && (
          <Button
            size="sm"
            variant="ghost"
            icon="install_desktop"
            loading={isApplyingClaudeAuthLocal}
            disabled={isApplyingClaudeAuthLocal}
            onClick={onApplyClaudeAuthLocal}
            className="!h-7 !px-2 text-xs text-emerald-500 hover:text-emerald-400"
            title={applyClaudeAuthLabel}
          >
            {applyClaudeAuthLabel}
          </Button>
        )}
        {isClaude && onExportClaudeAuthFile && (
          <Button
            size="sm"
            variant="ghost"
            icon="download"
            loading={isExportingClaudeAuthFile}
            disabled={isExportingClaudeAuthFile}
            onClick={onExportClaudeAuthFile}
            className="!h-7 !px-2 text-xs text-sky-500 hover:text-sky-400"
            title={exportClaudeAuthLabel}
          >
            {exportClaudeAuthLabel}
          </Button>
        )}
        {isGeminiCli && onApplyGeminiAuthLocal && (
          <Button
            size="sm"
            variant="ghost"
            icon="install_desktop"
            loading={isApplyingGeminiAuthLocal}
            disabled={isApplyingGeminiAuthLocal}
            onClick={onApplyGeminiAuthLocal}
            className="!h-7 !px-2 text-xs text-emerald-500 hover:text-emerald-400"
            title={applyGeminiAuthLabel}
          >
            {applyGeminiAuthLabel}
          </Button>
        )}
        {isGeminiCli && onExportGeminiAuthFile && (
          <Button
            size="sm"
            variant="ghost"
            icon="download"
            loading={isExportingGeminiAuthFile}
            disabled={isExportingGeminiAuthFile}
            onClick={onExportGeminiAuthFile}
            className="!h-7 !px-2 text-xs text-sky-500 hover:text-sky-400"
            title={exportGeminiAuthLabel}
          >
            {exportGeminiAuthLabel}
          </Button>
        )}
        <Toggle
          size="sm"
          checked={connection.isActive ?? true}
          onChange={onToggleActive}
          title={(connection.isActive ?? true) ? t("disableConnection") : t("enableConnection")}
        />
        <div className="flex gap-1 ml-1 transition-opacity">
          {onReauth && (
            <button
              onClick={onReauth}
              className="p-2 hover:bg-amber-500/10 rounded text-amber-600 hover:text-amber-500"
              title={t("reauthenticateConnection")}
            >
              <span className="material-symbols-outlined text-[18px]">passkey</span>
            </button>
          )}
          <button
            onClick={onEdit}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary"
            title={t("edit")}
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={onProxy}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary"
            title={t("proxyConfig")}
          >
            <span className="material-symbols-outlined text-[18px]">vpn_lock</span>
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-500/10 rounded text-red-500"
            title={t("delete")}
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function EditConnectionModal({ isOpen, connection, onSave, onClose }: EditConnectionModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [formData, setFormData] = useState({
    name: "",
    priority: 1,
    maxConcurrent: "",
    rpm: "",
    tpm: "",
    tpd: "",
    minTime: "",
    rateLimitMaxConcurrent: "",
    apiKey: "",
    healthCheckInterval: 60,
    baseUrl: "",
    cx: "",
    region: "",
    apiRegion: "international",
    validationModelId: "",
    tag: "",
    routingTags: "",
    excludedModels: "",
    customUserAgent: "",
    accountId: "",
    codexReasoningEffort: "medium",
    codexServiceTier: "default" as CodexServiceTier,
    codexOpenaiStoreEnabled: false,
    consoleApiKey: "",
    ccCompatibleContext1m: false,
    cloudCodeProjectId: "",
    antigravityClientProfile: "ide",
    blockExtraUsage:
      connection?.provider === "claude"
        ? isClaudeExtraUsageBlockEnabled(connection?.provider, connection?.providerSpecificData)
        : false,
    passthroughModels: connection?.providerSpecificData?.passthroughModels === true,
  });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [extraApiKeys, setExtraApiKeys] = useState<string[]>([]);
  const [newExtraKey, setNewExtraKey] = useState("");
  const [apiKeyHealth, setApiKeyHealth] = useState<
    Record<
      string,
      {
        status: "active" | "warning" | "invalid";
        failures: number;
        lastFailure: string | null;
        totalRequests?: number;
        totalFailures?: number;
      }
    >
  >({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { emailsVisible: showEmail, toggleEmailVisibility: toggleShowEmail } =
    useEmailPrivacyStore();

  const usesBaseUrl = isBaseUrlConfigurableProvider(connection?.provider);
  const defaultBaseUrl = getProviderBaseUrlDefault(connection?.provider);
  const isVertex = connection?.provider === "vertex" || connection?.provider === "vertex-partner";
  const isBedrock = connection?.provider === "bedrock";
  const showsRegion = isVertex || isBedrock;
  const isGlm = isGlmProvider(connection?.provider);
  const isCloudflare = connection?.provider === "cloudflare-ai";
  const isCodex = connection?.provider === "codex";
  const isClaude = connection?.provider === "claude";
  const isGeminiCli = connection?.provider === "gemini-cli";
  const isAntigravity = connection?.provider === "antigravity";
  const supportsGoogleProjectId = isGeminiCli || isAntigravity;
  const localProviderMetadata = getLocalProviderMetadata(connection?.provider);
  const isLocalSelfHostedProvider = !!localProviderMetadata;
  const isGooglePse = connection?.provider === "google-pse-search";
  const webSessionCredential = getWebSessionCredentialRequirement(connection?.provider);
  const isNoAuthWebSessionCredential = webSessionCredential?.kind === "none";
  const isWebSessionCredential = !!webSessionCredential && webSessionCredential.kind !== "none";
  const providerDisplayName =
    (connection?.provider ? resolveDashboardProviderInfo(connection.provider)?.name : null) ||
    connection?.provider ||
    "";
  const apiKeyOptional =
    providerAllowsOptionalApiKey(connection?.provider) || Boolean(isNoAuthWebSessionCredential);
  const isCcCompatible = isClaudeCodeCompatibleProvider(connection?.provider);
  const defaultRegion = isBedrock ? "eu-west-2" : "us-central1";
  const apiCredentialLabel = webSessionCredential
    ? getWebSessionCredentialLabel(t, webSessionCredential, apiKeyOptional)
    : apiKeyOptional
      ? t("apiKeyOptionalLabel")
      : t("apiKeyLabel");
  const apiCredentialPlaceholder = isWebSessionCredential
    ? webSessionCredential.placeholder
    : isVertex
      ? t("vertexServiceAccountPlaceholder")
      : t("enterNewApiKey");
  const apiCredentialHint = isWebSessionCredential
    ? getWebSessionCredentialHint(t, webSessionCredential, providerDisplayName, true)
    : isLocalSelfHostedProvider
      ? t("localProviderApiKeyOptionalHint", {
          provider: localProviderMetadata?.name || connection?.provider || "",
        })
      : apiKeyOptional
        ? t("apiKeyOptionalHint")
        : t("leaveBlankKeepCurrentApiKey");
  const codexAccountServiceTierOptions = useMemo(
    () =>
      CODEX_ACCOUNT_SERVICE_TIER_VALUES.map((value) => ({
        value,
        label: getCodexServiceTierLabel(t, value),
      })),
    [t]
  );

  useEffect(() => {
    if (isOpen && connection) {
      const rawBaseUrl = connection.providerSpecificData?.baseUrl;
      const existingBaseUrl = typeof rawBaseUrl === "string" ? rawBaseUrl : "";
      const rawRegion = connection.providerSpecificData?.region;
      const existingRegion = typeof rawRegion === "string" ? rawRegion : "";
      const rawCustomUserAgent = connection.providerSpecificData?.customUserAgent;
      const existingCustomUserAgent =
        typeof rawCustomUserAgent === "string" ? rawCustomUserAgent : "";
      const rawCx = connection.providerSpecificData?.cx;
      const existingCx = typeof rawCx === "string" ? rawCx : "";
      const rawAccountId = connection.providerSpecificData?.accountId;
      const existingAccountId = typeof rawAccountId === "string" ? rawAccountId : "";
      const codexRequestDefaults = getCodexRequestDefaults(connection.providerSpecificData);
      const ccRequestDefaults = getClaudeCodeCompatibleRequestDefaults(
        connection.providerSpecificData
      );
      const rawConsoleApiKey = connection.providerSpecificData?.consoleApiKey;
      const existingConsoleApiKey = typeof rawConsoleApiKey === "string" ? rawConsoleApiKey : "";
      setFormData({
        name: connection.name || "",
        priority: connection.priority || 1,
        maxConcurrent:
          connection.maxConcurrent !== null && connection.maxConcurrent !== undefined
            ? String(connection.maxConcurrent)
            : "",
        rpm:
          connection.rateLimitOverrides?.rpm != null
            ? String(connection.rateLimitOverrides.rpm)
            : "",
        tpm:
          connection.rateLimitOverrides?.tpm != null
            ? String(connection.rateLimitOverrides.tpm)
            : "",
        tpd:
          connection.rateLimitOverrides?.tpd != null
            ? String(connection.rateLimitOverrides.tpd)
            : "",
        minTime:
          connection.rateLimitOverrides?.minTime != null
            ? String(connection.rateLimitOverrides.minTime)
            : "",
        rateLimitMaxConcurrent:
          connection.rateLimitOverrides?.maxConcurrent != null
            ? String(connection.rateLimitOverrides.maxConcurrent)
            : "",
        apiKey: "",
        healthCheckInterval: connection.healthCheckInterval ?? 60,
        baseUrl: existingBaseUrl || defaultBaseUrl,
        cx: existingCx,
        region: existingRegion || (showsRegion ? defaultRegion : ""),
        apiRegion: (connection.providerSpecificData?.apiRegion as string) || "international",
        validationModelId: (connection.providerSpecificData?.validationModelId as string) || "",
        tag: (connection.providerSpecificData?.tag as string) || "",
        routingTags: formatRoutingTagsInput(connection.providerSpecificData?.tags),
        excludedModels: formatExcludedModelsInput(
          connection.providerSpecificData?.excludedModels ??
            connection.providerSpecificData?.excluded_models
        ),
        customUserAgent: existingCustomUserAgent,
        accountId: existingAccountId,
        codexReasoningEffort: codexRequestDefaults.reasoningEffort,
        codexServiceTier: codexRequestDefaults.serviceTier ?? "default",
        codexOpenaiStoreEnabled: connection.providerSpecificData?.openaiStoreEnabled === true,
        consoleApiKey: existingConsoleApiKey,
        ccCompatibleContext1m: ccRequestDefaults.context1m,
        cloudCodeProjectId:
          (connection.providerSpecificData?.projectId as string) || connection.projectId || "",
        antigravityClientProfile: normalizeAntigravityClientProfileSetting(
          connection.providerSpecificData?.clientProfile
        ),
        blockExtraUsage: isClaudeExtraUsageBlockEnabled(
          connection.provider,
          connection.providerSpecificData
        ),
        passthroughModels: connection?.providerSpecificData?.passthroughModels === true,
      });
      // Load existing extra keys from providerSpecificData
      const existing = connection.providerSpecificData?.extraApiKeys;
      setExtraApiKeys(Array.isArray(existing) ? existing : []);
      // Load API key health status
      const health = connection.providerSpecificData?.apiKeyHealth as
        | Record<
            string,
            {
              status: "active" | "warning" | "invalid";
              failures: number;
              lastFailure: string | null;
              totalRequests?: number;
              totalFailures?: number;
            }
          >
        | undefined;
      setApiKeyHealth(health || {});
      setNewExtraKey("");
      setShowAdvanced(!!existingCustomUserAgent);
      // email visibility controlled by global store
      setTestResult(null);
      setValidationResult(null);
      setSaveError(null);
    }
  }, [isOpen, connection, defaultBaseUrl, showsRegion, defaultRegion]);

  const handleTest = async () => {
    if (!connection?.provider) return;
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(`/api/providers/${connection.id}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          validationModelId: formData.validationModelId || undefined,
        }),
      });
      const data = await res.json();
      setTestResult({
        valid: !!data.valid,
        diagnosis: data.diagnosis || null,
        message: data.error || null,
      });
    } catch {
      setTestResult({
        valid: false,
        diagnosis: { type: "network_error" },
        message: t("failedTestConnection"),
      });
    } finally {
      setTesting(false);
    }
  };

  const handleValidate = async () => {
    if (
      !connection?.provider ||
      isNoAuthWebSessionCredential ||
      (!isCompatible && !apiKeyOptional && !formData.apiKey)
    ) {
      return;
    }
    setValidating(true);
    setValidationResult(null);
    try {
      const res = await fetch("/api/providers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: connection.provider,
          apiKey: formData.apiKey,
          validationModelId: formData.validationModelId || undefined,
          customUserAgent: formData.customUserAgent.trim() || undefined,
          baseUrl: formData.baseUrl.trim() || undefined,
          region: showsRegion ? formData.region.trim() || defaultRegion : undefined,
          cx: formData.cx.trim() || undefined,
        }),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };

  const handleAddParsedExtraKeys = (raw: string) => {
    const { added, duplicates } = parseExtraApiKeys(raw, extraApiKeys);
    if (added.length > 0) {
      setExtraApiKeys((prev) => [...prev, ...added]);
      notify.success(t("bulkPasteAdded", { count: added.length }));
    }
    if (duplicates > 0) {
      notify.warning(t("bulkPasteDuplicatesIgnored", { count: duplicates }));
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const trimmedMaxConcurrent = formData.maxConcurrent.trim();
      const trimmedCloudCodeProjectId = formData.cloudCodeProjectId.trim();
      let parsedMaxConcurrent: number | null = null;
      if (trimmedMaxConcurrent) {
        const numericMaxConcurrent = Number(trimmedMaxConcurrent);
        if (!Number.isInteger(numericMaxConcurrent) || numericMaxConcurrent < 0) {
          setSaveError(t("maxConcurrentWholeNumberError"));
          return;
        }
        parsedMaxConcurrent = numericMaxConcurrent;
      }

      const updates: any = {
        name: formData.name,
        priority: formData.priority,
        maxConcurrent: parsedMaxConcurrent,
        healthCheckInterval: formData.healthCheckInterval,
      };

      // Build rateLimitOverrides from non-empty fields
      const overrides: Record<string, number> = {};
      if (formData.rpm.trim()) overrides.rpm = Number(formData.rpm);
      if (formData.tpm.trim()) overrides.tpm = Number(formData.tpm);
      if (formData.tpd.trim()) overrides.tpd = Number(formData.tpd);
      if (formData.minTime.trim()) overrides.minTime = Number(formData.minTime);
      if (formData.rateLimitMaxConcurrent.trim())
        overrides.maxConcurrent = Number(formData.rateLimitMaxConcurrent);
      updates.rateLimitOverrides = Object.keys(overrides).length > 0 ? overrides : null;

      if (supportsGoogleProjectId) {
        updates.projectId = trimmedCloudCodeProjectId || null;
      }

      if (isGooglePse && !formData.cx.trim()) {
        setSaveError(t("searchEngineIdRequired"));
        return;
      }

      let validatedBaseUrl = null;
      if (usesBaseUrl) {
        const checked = normalizeAndValidateHttpBaseUrl(formData.baseUrl, defaultBaseUrl);
        if (checked.error) {
          setSaveError(checked.error);
          return;
        }
        validatedBaseUrl = checked.value;
      }

      if (!isOAuth && formData.apiKey) {
        updates.apiKey = formData.apiKey;
        let isValid = validationResult === "success";
        if (!isValid) {
          try {
            setValidating(true);
            setValidationResult(null);
            const res = await fetch("/api/providers/validate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: connection.provider,
                apiKey: formData.apiKey,
                validationModelId: formData.validationModelId || undefined,
                customUserAgent: formData.customUserAgent.trim() || undefined,
                baseUrl: formData.baseUrl.trim() || undefined,
                region: showsRegion ? formData.region.trim() || defaultRegion : undefined,
                cx: formData.cx.trim() || undefined,
              }),
            });
            const data = await res.json();
            isValid = !!data.valid;
            setValidationResult(isValid ? "success" : "failed");
          } catch {
            setValidationResult("failed");
          } finally {
            setValidating(false);
          }
        }
        if (isValid) {
          updates.testStatus = "active";
          updates.lastError = null;
          updates.lastErrorAt = null;
          updates.lastErrorType = null;
          updates.lastErrorSource = null;
          updates.errorCode = null;
          updates.rateLimitedUntil = null;
        }
      }
      // Persist extra API keys and baseUrl in providerSpecificData
      if (!isOAuth) {
        updates.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          extraApiKeys: extraApiKeys.filter((k) => k.trim().length > 0),
          tag: formData.tag.trim() || undefined,
          tags: parseRoutingTagsInput(formData.routingTags),
          excludedModels: parseExcludedModelsInput(formData.excludedModels),
          customUserAgent: formData.customUserAgent.trim(),
          // Only write when explicitly enabled; omit to let registry default take effect
          ...(formData.passthroughModels ? { passthroughModels: true } : {}),
        };
        if (connection.provider === "bailian-coding-plan") {
          if (formData.consoleApiKey.trim()) {
            updates.providerSpecificData.consoleApiKey = formData.consoleApiKey.trim();
          } else {
            updates.providerSpecificData.consoleApiKey = undefined;
          }
        }
        if (formData.validationModelId) {
          updates.providerSpecificData.validationModelId = formData.validationModelId;
        }
        if (isGooglePse) {
          updates.providerSpecificData.cx = formData.cx.trim() || undefined;
        }
        if (usesBaseUrl) {
          updates.providerSpecificData.baseUrl = validatedBaseUrl;
        } else if (showsRegion) {
          updates.providerSpecificData.region = formData.region.trim() || defaultRegion;
        } else if (isGlm) {
          updates.providerSpecificData.apiRegion = formData.apiRegion;
        } else if (isCloudflare && formData.accountId.trim()) {
          updates.providerSpecificData.accountId = formData.accountId.trim();
        }
        if (supportsGoogleProjectId) {
          updates.providerSpecificData.projectId = trimmedCloudCodeProjectId || null;
        }
        if (isCcCompatible) {
          const currentRequestDefaults =
            updates.providerSpecificData.requestDefaults &&
            typeof updates.providerSpecificData.requestDefaults === "object" &&
            !Array.isArray(updates.providerSpecificData.requestDefaults)
              ? { ...(updates.providerSpecificData.requestDefaults as Record<string, unknown>) }
              : {};
          if (formData.ccCompatibleContext1m) {
            currentRequestDefaults.context1m = true;
          } else {
            delete currentRequestDefaults.context1m;
          }
          updates.providerSpecificData.requestDefaults =
            Object.keys(currentRequestDefaults).length > 0 ? currentRequestDefaults : undefined;
        }
      } else {
        // Also persist tag for OAuth accounts
        updates.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          tag: formData.tag.trim() || undefined,
          tags: parseRoutingTagsInput(formData.routingTags),
          excludedModels: parseExcludedModelsInput(formData.excludedModels),
        };
        if (isClaude) {
          updates.providerSpecificData.blockExtraUsage = formData.blockExtraUsage;
        }
        if (isCodex) {
          updates.providerSpecificData.requestDefaults = {
            reasoningEffort: formData.codexReasoningEffort,
            ...(formData.codexServiceTier !== "default"
              ? { serviceTier: formData.codexServiceTier }
              : {}),
          };
          updates.providerSpecificData.openaiStoreEnabled =
            formData.codexOpenaiStoreEnabled === true;
        }
        if (supportsGoogleProjectId) {
          updates.providerSpecificData.projectId = trimmedCloudCodeProjectId || null;
        }
      }
      if (isAntigravity) {
        updates.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          ...(updates.providerSpecificData || {}),
          clientProfile: normalizeAntigravityClientProfileSetting(
            formData.antigravityClientProfile
          ),
        };
      }
      const error = (await onSave(updates)) as void | unknown;
      if (error) {
        setSaveError(typeof error === "string" ? error : t("failedSaveConnection"));
      }
    } finally {
      setSaving(false);
    }
  };

  if (!connection) return null;

  const isOAuth = connection.authType === "oauth";
  const isCompatible =
    isOpenAICompatibleProvider(connection.provider) ||
    isAnthropicCompatibleProvider(connection.provider);
  const testErrorMeta =
    !testResult?.valid && testResult?.diagnosis?.type
      ? ERROR_TYPE_LABELS[testResult.diagnosis.type] || null
      : null;

  return (
    <Modal isOpen={isOpen} title={t("editConnection")} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label={t("nameLabel")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={isOAuth ? t("accountName") : t("productionKey")}
        />
        <Input
          label={t("tagGroupLabel")}
          value={formData.tag}
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          placeholder={t("tagGroupPlaceholder")}
          hint={t("tagGroupHint")}
        />
        <Input
          label={t("routingTagsLabel")}
          value={formData.routingTags}
          onChange={(e) => setFormData({ ...formData, routingTags: e.target.value })}
          placeholder={t("routingTagsPlaceholder")}
          hint={t("routingTagsHint")}
        />
        <Input
          label={t("excludedModelsLabel")}
          value={formData.excludedModels}
          onChange={(e) => setFormData({ ...formData, excludedModels: e.target.value })}
          placeholder={t("excludedModelsPlaceholder")}
          hint={t("excludedModelsHint")}
        />
        {isCodex && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            <Select
              label={t("defaultThinkingStrengthLabel")}
              value={formData.codexReasoningEffort}
              options={CODEX_REASONING_STRENGTH_OPTIONS}
              onChange={(e) => setFormData({ ...formData, codexReasoningEffort: e.target.value })}
              hint={t("defaultThinkingStrengthHint")}
            />
            <Select
              label={providerText(t, "codexServiceTierLabel", "Codex service tier")}
              value={formData.codexServiceTier}
              options={codexAccountServiceTierOptions}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  codexServiceTier: event.target.value as CodexServiceTier,
                })
              }
              hint={providerText(
                t,
                "codexServiceTierDescription",
                "Default uses the normal Codex tier. Priority shows as Fast; Flex uses the flex service tier when available."
              )}
            />
            <Toggle
              checked={formData.codexOpenaiStoreEnabled}
              onChange={(checked) => setFormData({ ...formData, codexOpenaiStoreEnabled: checked })}
              label={t("openaiResponsesStoreLabel")}
              description={t("openaiResponsesStoreDescription")}
            />
          </div>
        )}
        {isClaude && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            <Toggle
              checked={formData.blockExtraUsage}
              onChange={(checked) => setFormData({ ...formData, blockExtraUsage: checked })}
              label={t("blockClaudeExtraUsageLabel")}
              description={t("blockClaudeExtraUsageDescription")}
            />
          </div>
        )}
        {isCcCompatible && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            <Toggle
              checked={formData.ccCompatibleContext1m}
              onChange={(checked) => setFormData({ ...formData, ccCompatibleContext1m: checked })}
              label={t("ccCompatibleContext1mLabel")}
              description={t("ccCompatibleContext1mDescription")}
            />
          </div>
        )}
        {supportsGoogleProjectId && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            {isAntigravity && (
              <Select
                label={t("antigravityClientProfileLabel")}
                value={formData.antigravityClientProfile}
                options={ANTIGRAVITY_CLIENT_PROFILE_OPTIONS.map((option) => ({
                  value: option.value,
                  label: t(option.labelKey),
                }))}
                onChange={(e) =>
                  setFormData({ ...formData, antigravityClientProfile: e.target.value })
                }
                hint={t("antigravityClientProfileHint")}
              />
            )}
            <Input
              label={isAntigravity ? t("antigravityProjectIdLabel") : t("geminiCliProjectIdLabel")}
              value={formData.cloudCodeProjectId}
              onChange={(e) => setFormData({ ...formData, cloudCodeProjectId: e.target.value })}
              placeholder={
                isAntigravity
                  ? t("antigravityProjectIdPlaceholder")
                  : t("geminiCliProjectIdPlaceholder")
              }
              hint={isAntigravity ? t("antigravityProjectIdHint") : t("geminiCliProjectIdHint")}
              className="font-mono text-xs"
            />
          </div>
        )}
        {isOAuth && connection.email && (
          <div className="bg-sidebar/50 p-3 rounded-lg">
            <p className="text-sm text-text-muted mb-1">{t("email")}</p>
            <div className="flex items-center gap-2">
              <p className="font-medium" title={showEmail ? connection.email : undefined}>
                {showEmail ? connection.email : maskEmail(connection.email)}
              </p>
              <button
                type="button"
                onClick={toggleShowEmail}
                className="rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary"
                title={showEmail ? t("hideEmail") : t("showEmail")}
              >
                <span className="material-symbols-outlined text-sm">
                  {showEmail ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
        )}
        {isOAuth && (
          <Input
            label={t("healthCheckMinutes")}
            type="number"
            value={formData.healthCheckInterval}
            onChange={(e) =>
              setFormData({
                ...formData,
                healthCheckInterval: Math.max(0, Number.parseInt(e.target.value) || 0),
              })
            }
            hint={t("healthCheckHint")}
          />
        )}
        <Input
          label={t("priorityLabel")}
          type="number"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: Number.parseInt(e.target.value) || 1 })
          }
        />
        <Input
          label={t("accountConcurrencyCapLabel")}
          type="number"
          min={0}
          step={1}
          value={formData.maxConcurrent}
          onChange={(e) => {
            const nextValue = e.target.value;
            setFormData({ ...formData, maxConcurrent: nextValue });
            if (saveError && nextValue.trim()) {
              const numericValue = Number(nextValue);
              if (Number.isInteger(numericValue) && numericValue >= 0) {
                setSaveError(null);
              }
            }
          }}
          placeholder="0"
          hint={t("accountConcurrencyCapHint")}
        />
        {saveError && (
          <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {saveError}
          </div>
        )}
        {!isOAuth && (
          <>
            {webSessionCredential && (
              <WebSessionCredentialGuide
                requirement={webSessionCredential}
                providerName={providerDisplayName}
                t={t}
              />
            )}
            {!isNoAuthWebSessionCredential && (
              <div className="flex gap-2">
                <Input
                  label={apiCredentialLabel}
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder={apiCredentialPlaceholder}
                  hint={apiCredentialHint}
                  className="flex-1"
                  autoComplete="off"
                  spellCheck={false}
                  autoCapitalize="off"
                />
                <div className="pt-6">
                  <Button
                    onClick={handleValidate}
                    disabled={
                      (!isCompatible && !apiKeyOptional && !formData.apiKey) ||
                      (isGooglePse && !formData.cx.trim()) ||
                      validating ||
                      saving
                    }
                    variant="secondary"
                  >
                    {validating
                      ? t("checking")
                      : webSessionCredential
                        ? getWebSessionCredentialCheckLabel(t, webSessionCredential)
                        : t("check")}
                  </Button>
                </div>
              </div>
            )}
            {isGooglePse && (
              <Input
                label={t("searchEngineIdLabel")}
                value={formData.cx}
                onChange={(e) => setFormData({ ...formData, cx: e.target.value })}
                placeholder="012345678901234567890:abc123xyz"
                hint={t("searchEngineIdHint")}
              />
            )}
            {validationResult && (
              <Badge variant={validationResult === "success" ? "success" : "error"}>
                {validationResult === "success" ? t("valid") : t("invalid")}
              </Badge>
            )}
            <button
              type="button"
              className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
              onClick={() => setShowAdvanced(!showAdvanced)}
              aria-expanded={showAdvanced}
              aria-controls="edit-connection-advanced-settings"
            >
              <span
                className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}
                aria-hidden="true"
              >
                ▶
              </span>
              {t("advancedSettings")}
            </button>
            {showAdvanced && (
              <div
                id="edit-connection-advanced-settings"
                className="flex flex-col gap-3 pl-2 border-l-2 border-border"
              >
                <Input
                  label={t("customUserAgentLabel")}
                  value={formData.customUserAgent}
                  onChange={(e) => setFormData({ ...formData, customUserAgent: e.target.value })}
                  placeholder="my-app/1.0"
                  hint={t("customUserAgentHint")}
                />
                <Toggle
                  size="sm"
                  checked={formData.passthroughModels}
                  onChange={(checked) => setFormData({ ...formData, passthroughModels: checked })}
                  label={t("perModelQuotaLabel")}
                  description={t("perModelQuotaDescription")}
                />
                {connection.provider === "bailian-coding-plan" && (
                  <Input
                    label={t("consoleApiKeyOracleLabel")}
                    value={formData.consoleApiKey}
                    onChange={(e) => setFormData({ ...formData, consoleApiKey: e.target.value })}
                    placeholder={t("consoleApiKeyOraclePlaceholder")}
                    hint={t("consoleApiKeyOracleHint")}
                    type="password"
                  />
                )}
                <div className="border-t border-border/30 pt-3 mt-1">
                  <p className="text-xs font-medium text-text-muted mb-2">
                    {t("rateLimitOverridesSection")}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label={t("rateLimitOverridesRpmLabel")}
                      type="number"
                      min={0}
                      value={formData.rpm}
                      onChange={(e) => setFormData({ ...formData, rpm: e.target.value })}
                      placeholder="Inherit"
                      hint={t("rateLimitOverridesRpmHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesTpmLabel")}
                      type="number"
                      min={0}
                      value={formData.tpm}
                      onChange={(e) => setFormData({ ...formData, tpm: e.target.value })}
                      placeholder="Inherit"
                      hint={t("rateLimitOverridesTpmHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesTpdLabel")}
                      type="number"
                      min={0}
                      value={formData.tpd}
                      onChange={(e) => setFormData({ ...formData, tpd: e.target.value })}
                      placeholder="Inherit"
                      hint={t("rateLimitOverridesTpdHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesMinTimeLabel")}
                      type="number"
                      min={0}
                      value={formData.minTime}
                      onChange={(e) => setFormData({ ...formData, minTime: e.target.value })}
                      placeholder="Inherit"
                      hint={t("rateLimitOverridesMinTimeHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesMaxConcurrentLabel")}
                      type="number"
                      min={0}
                      value={formData.rateLimitMaxConcurrent}
                      onChange={(e) =>
                        setFormData({ ...formData, rateLimitMaxConcurrent: e.target.value })
                      }
                      placeholder="Inherit"
                      hint={t("rateLimitOverridesMaxConcurrentHint")}
                    />
                  </div>
                </div>
              </div>
            )}
            <Input
              label={t("validationModelIdLabel")}
              placeholder={t("validationModelIdPlaceholder")}
              value={formData.validationModelId}
              onChange={(e) => setFormData({ ...formData, validationModelId: e.target.value })}
              hint={t("validationModelIdHint")}
            />
          </>
        )}

        {usesBaseUrl && (
          <Input
            label={t("baseUrlLabel")}
            value={formData.baseUrl}
            onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
            placeholder={getProviderBaseUrlPlaceholder(connection.provider)}
            hint={getProviderBaseUrlHint(connection.provider, t)}
          />
        )}

        {showsRegion && (
          <Input
            label={t("regionLabel")}
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            placeholder={defaultRegion}
            hint={t("regionHint")}
          />
        )}

        {isCloudflare && (
          <Input
            label={t("accountIdLabel")}
            value={formData.accountId}
            onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
            placeholder={t("accountIdPlaceholder")}
            hint={t("accountIdHint")}
          />
        )}

        {isGlm && (
          <div>
            <label className="text-sm font-medium text-text-main mb-1 block">
              {t("apiRegionLabel")}
            </label>
            <select
              value={formData.apiRegion}
              onChange={(e) => setFormData({ ...formData, apiRegion: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="international">{t("apiRegionInternational")}</option>
              <option value="china">{t("apiRegionChina")}</option>
            </select>
            <p className="text-xs text-text-muted mt-1">{t("apiRegionHint")}</p>
          </div>
        )}

        {/* T07: API Key Health Status */}
        {!isOAuth && connection?.apiKey && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-main">{t("apiKeyHealthLabel")}</label>
            <div className="flex flex-col gap-1.5">
              {/* Primary Key Health */}
              {(() => {
                const keyId = "primary";
                const health = apiKeyHealth[keyId];
                const statusColor =
                  health?.status === "invalid"
                    ? "text-red-400"
                    : health?.status === "warning"
                      ? "text-yellow-400"
                      : "text-text-muted";
                const statusIcon =
                  health?.status === "invalid" ? "🔴" : health?.status === "warning" ? "🟡" : "🟢";
                const statusLabel =
                  health?.status === "invalid"
                    ? t("apiKeyStatusInvalid")
                    : health?.status === "warning"
                      ? t("apiKeyStatusWarning", { count: health.failures })
                      : t("apiKeyStatusActive");

                return (
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex-1 font-mono text-xs bg-sidebar/50 px-3 py-2 rounded border border-border truncate ${statusColor}`}
                    >
                      {statusIcon} {t("primaryKey")}: {connection.apiKey.slice(0, 6)}...
                      {connection.apiKey.slice(-4)}
                    </span>
                    {health && (
                      <span
                        className="text-[10px] text-text-muted whitespace-nowrap"
                        title={statusLabel}
                      >
                        {health.failures}x
                        {health.lastFailure ? ` · ${formatTimeAgo(health.lastFailure)}` : ""}
                        {health.totalRequests != null
                          ? ` · (${health.totalRequests} req${health.totalFailures != null ? `, ${health.totalFailures} fail` : ""})`
                          : ""}
                      </span>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* T07: Extra API Keys for round-robin rotation */}
        {!isOAuth && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-text-main">
                {t("extraApiKeysLabel")}
                <span className="ml-2 text-[11px] font-normal text-text-muted">
                  ({t("extraApiKeysHint")})
                </span>
              </label>
              {extraApiKeys.length > 0 && (
                <button
                  type="button"
                  onClick={() => setExtraApiKeys([])}
                  className="px-2.5 py-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 text-xs font-medium transition-colors"
                >
                  {t("deleteAllExtraApiKeys")}
                </button>
              )}
            </div>
            {extraApiKeys.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {extraApiKeys.map((key, idx) => {
                  const keyId = `extra_${idx}`;
                  const health = apiKeyHealth[keyId];
                  const statusColor =
                    health?.status === "invalid"
                      ? "text-red-400"
                      : health?.status === "warning"
                        ? "text-yellow-400"
                        : "text-text-muted";
                  const statusIcon =
                    health?.status === "invalid"
                      ? "🔴"
                      : health?.status === "warning"
                        ? "🟡"
                        : "🟢";
                  const statusLabel =
                    health?.status === "invalid"
                      ? t("apiKeyStatusInvalid")
                      : health?.status === "warning"
                        ? t("apiKeyStatusWarning", { count: health.failures })
                        : t("apiKeyStatusActive");

                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span
                        className={`flex-1 font-mono text-xs bg-sidebar/50 px-3 py-2 rounded border border-border truncate ${statusColor}`}
                      >
                        {statusIcon}{" "}
                        {t("extraApiKeyMasked", {
                          index: idx + 2,
                          prefix: key.slice(0, 6),
                          suffix: key.slice(-4),
                        })}
                      </span>
                      <div className="flex items-center gap-1">
                        {health && (
                          <span
                            className="text-[10px] text-text-muted whitespace-nowrap"
                            title={statusLabel}
                          >
                            {health.failures}x
                            {health.lastFailure ? ` · ${formatTimeAgo(health.lastFailure)}` : ""}
                            {health.totalRequests != null
                              ? ` · (${health.totalRequests} req${health.totalFailures != null ? `, ${health.totalFailures} fail` : ""})`
                              : ""}
                          </span>
                        )}
                        <button
                          onClick={() => setExtraApiKeys(extraApiKeys.filter((_, i) => i !== idx))}
                          className="p-1.5 rounded hover:bg-red-500/10 text-red-400 hover:text-red-500"
                          title={t("removeThisKey")}
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="password"
                value={newExtraKey}
                onChange={(e) => setNewExtraKey(e.target.value)}
                placeholder={t("addAnotherApiKey")}
                className="flex-1 text-sm bg-sidebar/50 border border-border rounded px-3 py-2 text-text-main placeholder:text-text-muted focus:ring-1 focus:ring-primary outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newExtraKey.trim()) {
                    setExtraApiKeys([...extraApiKeys, newExtraKey.trim()]);
                    setNewExtraKey("");
                  }
                }}
                onPaste={(e) => {
                  const text = e.clipboardData.getData("text");
                  if (!/\r?\n/.test(text)) return;
                  e.preventDefault();
                  handleAddParsedExtraKeys(text);
                }}
              />
              <button
                onClick={() => {
                  if (newExtraKey.trim()) {
                    setExtraApiKeys([...extraApiKeys, newExtraKey.trim()]);
                    setNewExtraKey("");
                  }
                }}
                disabled={!newExtraKey.trim()}
                className="px-3 py-2 rounded bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-40 text-sm font-medium"
              >
                {t("add")}
              </button>
            </div>
            <p className="text-[11px] text-text-muted">{t("bulkPasteHint")}</p>
            {extraApiKeys.length > 0 && (
              <p className="text-[11px] text-text-muted">
                {t("totalKeysRotating", { count: extraApiKeys.length + 1 })}
              </p>
            )}
          </div>
        )}

        {/* Test Connection */}
        {!isCompatible && (
          <div className="flex items-center gap-3">
            <Button onClick={handleTest} variant="secondary" disabled={testing}>
              {testing ? t("testing") : t("testConnection")}
            </Button>
            {testResult && (
              <>
                <Badge variant={testResult.valid ? "success" : "error"}>
                  {testResult.valid ? t("valid") : t("failed")}
                </Badge>
                {testErrorMeta && (
                  <Badge variant={testErrorMeta.variant}>{t(testErrorMeta.labelKey)}</Badge>
                )}
              </>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={saving || (isGooglePse && !formData.cx.trim())}
          >
            {saving ? t("saving") : t("save")}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function EditCompatibleNodeModal({
  isOpen,
  node,
  onSave,
  onClose,
  isAnthropic,
  isCcCompatible,
}: EditCompatibleNodeModalProps) {
  const t = useTranslations("providers");
  const [formData, setFormData] = useState({
    name: "",
    prefix: "",
    apiType: "chat",
    baseUrl: "https://api.openai.com/v1",
    chatPath: "",
    modelsPath: "",
  });
  const [saving, setSaving] = useState(false);
  const [checkKey, setCheckKey] = useState("");
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (node) {
      setFormData({
        name: node.name || "",
        prefix: node.prefix || "",
        apiType: node.apiType || "chat",
        baseUrl:
          node.baseUrl ||
          (isCcCompatible
            ? "https://api.anthropic.com"
            : isAnthropic
              ? "https://api.anthropic.com/v1"
              : "https://api.openai.com/v1"),
        chatPath: node.chatPath || (isCcCompatible ? CC_COMPATIBLE_DEFAULT_CHAT_PATH : ""),
        modelsPath: isCcCompatible ? "" : node.modelsPath || "",
      });
      setShowAdvanced(
        !!(
          node.chatPath ||
          (!isCcCompatible && node.modelsPath) ||
          (isCcCompatible && !node.chatPath)
        )
      );
    }
  }, [node, isAnthropic, isCcCompatible]);

  const apiTypeOptions = [
    { value: "chat", label: t("chatCompletions") },
    { value: "responses", label: t("responsesApi") },
    { value: "embeddings", label: t("embeddings") },
    { value: "audio-transcriptions", label: t("audioTranscriptions") },
    { value: "audio-speech", label: t("audioSpeech") },
    { value: "images-generations", label: t("imagesGenerations") },
  ];

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim()) return;
    setSaving(true);
    try {
      const payload: any = {
        name: formData.name,
        prefix: formData.prefix,
        baseUrl: formData.baseUrl,
        chatPath: formData.chatPath || (isCcCompatible ? CC_COMPATIBLE_DEFAULT_CHAT_PATH : ""),
        modelsPath: isCcCompatible ? "" : formData.modelsPath,
      };
      if (!isAnthropic) {
        payload.apiType = formData.apiType;
      }
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async () => {
    setValidating(true);
    try {
      const res = await fetch("/api/provider-nodes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: formData.baseUrl,
          apiKey: checkKey,
          type: isAnthropic ? "anthropic-compatible" : "openai-compatible",
          compatMode: isCcCompatible ? "cc" : undefined,
          chatPath: formData.chatPath || (isCcCompatible ? CC_COMPATIBLE_DEFAULT_CHAT_PATH : ""),
          modelsPath: isCcCompatible ? "" : formData.modelsPath,
        }),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };

  if (!node) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={
        isCcCompatible
          ? t("ccCompatibleDetailsTitle")
          : t("editCompatibleTitle", { type: isAnthropic ? t("anthropic") : t("openai") })
      }
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        {isCcCompatible && (
          <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
                warning
              </span>
              <p>{t("ccCompatibleValidationHint")}</p>
            </div>
          </div>
        )}
        <Input
          label={t("nameLabel")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={
            isCcCompatible
              ? t("ccCompatibleNamePlaceholder")
              : t("compatibleProdPlaceholder", {
                  type: isAnthropic ? t("anthropic") : t("openai"),
                })
          }
          hint={isCcCompatible ? t("ccCompatibleNameHint") : t("nameHint")}
        />
        <Input
          label={t("prefixLabel")}
          value={formData.prefix}
          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
          placeholder={
            isCcCompatible
              ? t("ccCompatiblePrefixPlaceholder")
              : isAnthropic
                ? t("anthropicPrefixPlaceholder")
                : t("openaiPrefixPlaceholder")
          }
          hint={isCcCompatible ? t("ccCompatiblePrefixHint") : t("prefixHint")}
        />
        {!isAnthropic && (
          <Select
            label={t("apiTypeLabel")}
            options={apiTypeOptions}
            value={formData.apiType}
            onChange={(e) => setFormData({ ...formData, apiType: e.target.value })}
          />
        )}
        <Input
          label={t("baseUrlLabel")}
          value={formData.baseUrl}
          onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
          placeholder={
            isCcCompatible
              ? t("ccCompatibleBaseUrlPlaceholder")
              : isAnthropic
                ? t("anthropicBaseUrlPlaceholder")
                : t("openaiBaseUrlPlaceholder")
          }
          hint={
            isCcCompatible
              ? t("ccCompatibleBaseUrlHint")
              : t("compatibleBaseUrlHint", {
                  type: isAnthropic ? t("anthropic") : t("openai"),
                })
          }
        />
        <button
          type="button"
          className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
          aria-controls="advanced-settings"
        >
          <span
            className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}
            aria-hidden="true"
          >
            ▶
          </span>
          {t("advancedSettings")}
        </button>
        {showAdvanced && (
          <div id="advanced-settings" className="flex flex-col gap-3 pl-2 border-l-2 border-border">
            <Input
              label={t("chatPathLabel")}
              value={formData.chatPath}
              onChange={(e) => setFormData({ ...formData, chatPath: e.target.value })}
              placeholder={
                isCcCompatible
                  ? CC_COMPATIBLE_DEFAULT_CHAT_PATH
                  : isAnthropic
                    ? "/messages"
                    : t("chatPathPlaceholder")
              }
              hint={isCcCompatible ? t("ccCompatibleChatPathHint") : t("chatPathHint")}
            />
            {!isCcCompatible && (
              <Input
                label={t("modelsPathLabel")}
                value={formData.modelsPath}
                onChange={(e) => setFormData({ ...formData, modelsPath: e.target.value })}
                placeholder={t("modelsPathPlaceholder")}
                hint={t("modelsPathHint")}
              />
            )}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            label={t("apiKeyForCheck")}
            type="password"
            value={checkKey}
            onChange={(e) => setCheckKey(e.target.value)}
            className="flex-1"
          />
          <div className="pt-6">
            <Button
              onClick={handleValidate}
              disabled={!checkKey || validating || !formData.baseUrl.trim()}
              variant="secondary"
            >
              {validating ? t("checking") : t("check")}
            </Button>
          </div>
        </div>
        {validationResult && (
          <Badge variant={validationResult === "success" ? "success" : "error"}>
            {validationResult === "success" ? t("valid") : t("invalid")}
          </Badge>
        )}
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={
              !formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim() || saving
            }
          >
            {saving ? t("saving") : t("save")}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
