"use client";

import ConnectionTestButton from "@/shared/components/ConnectionTestButton";

// Phase 1d extraction — Issue #3501
// ConnectionRow (and its local helpers CooldownTimer, inferErrorType,
// getStatusPresentation) moved out of ProviderDetailPageClient.tsx.

import { readCookieExpiresAt } from "@/shared/utils/webCookieExpiry";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge, Button, Toggle } from "@/shared/components";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";
import { shouldShowConnectionLastError } from "./connectionRowHelpers";
import { readStoredVerificationUrl } from "@omniroute/open-sse/services/antigravityVerification.ts";
import type { ConnectionRowProps } from "./connectionRowTypes";
import { getStatusPresentation } from "./connectionRowStatus";
import { getCodexEffectiveServiceTier } from "@/lib/providers/codexFastTier";
import { normalizeCodexLimitPolicy, providerText } from "../providerPageHelpers";
import { getCodexPlanLabel } from "../codexPlanLabel";
import CodexAccountDetails from "./CodexAccountDetails";
import ConnectionQuotaPanel from "./ConnectionQuotaPanel";
import ConnectionIdChip from "./ConnectionIdChip";
import {
  isProviderQuotaVisible,
  supportsProviderQuota,
} from "@/shared/utils/providerQuotaVisibility";
import ProviderQuotaVisibilityToggle from "./ProviderQuotaVisibilityToggle";
import CodexPingNowButton from "./CodexPingNowButton";

// ---------------------------------------------------------------------------
// Types (exported so the client can reference them without re-importing)
// ---------------------------------------------------------------------------

export type { ConnectionRowConnection, ConnectionRowProps } from "./connectionRowTypes";

// ---------------------------------------------------------------------------
// CooldownTimerProps (local — only used below)
// ---------------------------------------------------------------------------

interface CooldownTimerProps {
  until: string | number | Date;
}

// ---------------------------------------------------------------------------
// CooldownTimer
// ---------------------------------------------------------------------------

function CooldownTimer({ until }: CooldownTimerProps) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const updateRemaining = () => {
      const diff = new Date(until).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining("");
        return;
      }
      const secs = Math.floor(diff / 1000);
      if (secs < 60) {
        setRemaining(`${secs}s`);
      } else if (secs < 3600) {
        setRemaining(`${Math.floor(secs / 60)}m ${secs % 60}s`);
      } else {
        const hrs = Math.floor(secs / 3600);
        const mins = Math.floor((secs % 3600) / 60);
        setRemaining(`${hrs}h ${mins}m`);
      }
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, [until]);

  if (!remaining) return null;

  return <span className="text-xs text-orange-500 font-mono">⏱ {remaining}</span>;
}

// ---------------------------------------------------------------------------
// ConnectionRow
// ---------------------------------------------------------------------------

export default function ConnectionRow({
  connection,
  isOAuth,
  isClaude,
  isCodex,
  codexGlobalServiceMode,
  isCcCompatible,
  cliproxyapiEnabled,
  upstreamProxyMode,
  upstreamProxyFallbackBackend,
  onSetUpstreamProxyMode,
  isFirst,
  isLast,
  isSelected,
  onToggleSelect,
  onMoveUp,
  onMoveDown,
  onToggleActive,
  onToggleRateLimit,
  onToggleQuotaVisibility,
  onToggleClaudeExtraUsage,
  onToggleCodexPaidCredits,
  onToggleAutoSync,
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
  proxyName,
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
  perKeyProxyEnabled,
  onTogglePerKeyProxyEnabled,
  proxyEnabled,
  onToggleProxyEnabled,
  quotaCache,
  quotaRefreshing,
  onRefreshQuota,
}: ConnectionRowProps) {
  const t = useTranslations("providers");
  const locale = useLocale();
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const displayName = isOAuth
    ? pickDisplayValue(
        [connection.name, connection.email, connection.displayName],
        emailsVisible,
        t("oauthAccount")
      )
    : connection.name;
  const applyCodexAuthLabel = providerText(t, "applyCodexAuthLocal", "Apply auth");
  const exportCodexAuthLabel = providerText(t, "exportCodexAuthFile", "Export auth");
  const applyClaudeAuthLabel = providerText(t, "applyClaudeAuthLocal", "Apply auth");
  const exportClaudeAuthLabel = providerText(t, "exportClaudeAuthFile", "Export auth");
  // Use useState + useEffect for impure Date.now() to avoid calling during render
  const [isCooldown, setIsCooldown] = useState(false);
  // T12: token expiry status — lazy init avoids calling Date.now() during render;
  // updates every 30s via interval only (no sync setState in effect body).
  // Prefer tokenExpiresAt (updated on each refresh) over expiresAt (original grant date).
  // #11497: cookie rows with a decodable JWT credential carry a persisted
  // cookieExpiresAt — feed it into the same countdown badge OAuth rows use.
  const cookieExpiresAt = readCookieExpiresAt(connection.providerSpecificData);
  // Antigravity 403 VALIDATION_REQUIRED: Google link that unlocks the account (validated host).
  const verificationUrl = readStoredVerificationUrl(connection.providerSpecificData);
  const effectiveExpiresAt = connection.tokenExpiresAt || connection.expiresAt || cookieExpiresAt;
  const hasExpirySource = isOAuth || Boolean(cookieExpiresAt);
  const getTokenMinsLeft = () => {
    if (!hasExpirySource || !effectiveExpiresAt) return null;
    const expiresMs = new Date(effectiveExpiresAt).getTime();
    return Math.floor((expiresMs - Date.now()) / 60000);
  };
  const [tokenMinsLeft, setTokenMinsLeft] = useState<number | null>(getTokenMinsLeft);

  useEffect(() => {
    if (!hasExpirySource || !effectiveExpiresAt) return;
    const update = () => {
      const expiresMs = new Date(effectiveExpiresAt).getTime();
      setTokenMinsLeft(Math.floor((expiresMs - Date.now()) / 60000));
    };
    update();
    const iv = setInterval(update, 30000);
    return () => clearInterval(iv);
  }, [hasExpirySource, effectiveExpiresAt]);

  useEffect(() => {
    const checkCooldown = () => {
      const cooldown =
        connection.rateLimitedUntil && new Date(connection.rateLimitedUntil).getTime() > Date.now();
      setIsCooldown(!!cooldown);
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
  const rateLimitAutoProtected = connection.rateLimitAutoProtected === true;
  const rateLimitShielded = rateLimitEnabled || rateLimitAutoProtected;
  const quotaVisible = connection.quotaVisible !== false;
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
  const codexPaidCreditsEnabled = connection.providerSpecificData?.allowPaidCredits === true;
  const codexPlanLabel = getCodexPlanLabel(!!isCodex, connection.providerSpecificData);
  // Per-account quota strip — gated per connection (not per page) so family
  // aliases and openai-compatible-* nodes with their own quotaEndpoint qualify.
  const quotaPanelSupported =
    supportsProviderQuota(String(connection.provider || ""), connection) &&
    isProviderQuotaVisible(connection);
  // Subscription/plan label from the usage cache (claude tier, antigravity
  // tier, grok subscription, …). Codex keeps its dedicated badge above. The
  // badge is quota-derived, so it disappears together with the quota strip
  // when the connection opts out or the provider has no usage API.
  const planLabel =
    quotaPanelSupported &&
    !codexPlanLabel &&
    typeof quotaCache?.plan === "string" &&
    quotaCache.plan.trim()
      ? quotaCache.plan.trim()
      : null;
  // #dario: this control is now a full mode selector (native/CLIProxyAPI/
  // Dario/fallback), not a binary toggle — cliproxyapiEnabled/
  // onToggleCliproxyapiMode are kept on the props interface for any other
  // consumer but are no longer read here.
  const effectiveUpstreamProxyMode = upstreamProxyMode ?? "native";
  const autoSyncEnabled = !!(connection.providerSpecificData as Record<string, unknown> | undefined)
    ?.autoSync;
  const [syncClock, setSyncClock] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setSyncClock(Date.now());
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);
  const lastSync = connection.syncedModelsAt ? Date.parse(connection.syncedModelsAt) : NaN;
  const validSync = Number.isFinite(lastSync) && lastSync > 0;
  const ageMinutes = validSync && syncClock !== null
    ? Math.max(0, Math.floor((syncClock - lastSync) / 60_000))
    : null;
  const ageUnit = ageMinutes === null ? null
    : ageMinutes < 60 ? "minute"
      : ageMinutes < 1440 ? "hour" : "day";
  const ageValue = ageMinutes === null ? 0
    : ageUnit === "minute" ? ageMinutes
      : ageUnit === "hour" ? Math.floor(ageMinutes / 60) : Math.floor(ageMinutes / 1440);
  const syncAgeLabel = ageUnit === null ? null
    : new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-ageValue, ageUnit);

  return (
    <div
      className={`group flex ${isCodex ? "flex-col items-stretch gap-3" : "items-center justify-between"} p-3 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${connection.isActive === false ? "opacity-60" : ""}`}
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
            {codexPlanLabel && (
              <Badge variant="primary" size="sm" className="capitalize">
                {codexPlanLabel}
              </Badge>
            )}
            {planLabel && (
              <span title={t("quotaPlanBadge")}>
                <Badge variant="primary" size="sm" className="capitalize">
                  {planLabel}
                </Badge>
              </span>
            )}
            {/* T12: Token expiry status indicator (state-driven, no Date.now in render) */}
            {/* #5836: the red "Token Expired" badge is TERMINAL-only — for OAuth
               refresh-capable providers (Antigravity/Gemini) the access token lapses
               ~hourly but is auto-refreshed, so a lapsed token alone must not paint
               red. Gate it on testStatus === "expired" (continuation of #5326). */}
            {tokenMinsLeft !== null &&
              (tokenMinsLeft < 0 ? (
                connection.testStatus === "expired" ? (
                  <span
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-red-500/15 text-red-500"
                    title={t("tokenExpiredTitle", { date: effectiveExpiresAt })}
                  >
                    <span className="material-symbols-outlined text-[11px]">error</span>
                    {t("tokenExpiredBadge")}
                  </span>
                ) : null
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
              <CooldownTimer until={connection.rateLimitedUntil!} />
            )}
            {statusPresentation.errorBadge && connection.isActive !== false && (
              <Badge variant={statusPresentation.errorBadge.variant} size="sm">
                {t(statusPresentation.errorBadge.labelKey)}
              </Badge>
            )}
            {shouldShowConnectionLastError(connection) && (
              <span
                className={`text-xs truncate max-w-[300px] ${statusPresentation.errorTextClass}`}
                title={connection.lastError}
              >
                {connection.lastError}
              </span>
            )}
            <span className="text-xs text-text-muted">#{connection.priority}</span>
            <ConnectionIdChip connectionId={connection.id} />
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
                rateLimitShielded
                  ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25"
                  : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
              }`}
              title={
                rateLimitEnabled ? t("disableRateLimitProtection") : t("enableRateLimitProtection")
              }
            >
              <span className="material-symbols-outlined text-[13px]">shield</span>
              {rateLimitShielded ? t("rateLimitProtected") : t("rateLimitUnprotected")}
            </button>
            {onToggleQuotaVisibility && (
              <ProviderQuotaVisibilityToggle
                visible={quotaVisible}
                onToggle={onToggleQuotaVisibility}
              />
            )}
            {onToggleAutoSync && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <button
                  onClick={() => onToggleAutoSync?.(!autoSyncEnabled)}
                  disabled={connection.isActive === false}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    autoSyncEnabled
                      ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={t("autoSyncTooltip")}
                >
                  <span className="material-symbols-outlined text-[13px]">sync</span>
                  {t("autoSyncShort")}
                </button>
                <span
                  className="text-xs text-text-muted"
                  title={validSync ? new Date(lastSync).toLocaleString(locale) : t("autoSyncNeverSynced")}
                  data-testid="connection-last-model-sync"
                >
                  {validSync && syncAgeLabel
                    ? t("autoSyncLastSynced", { time: syncAgeLabel })
                    : t("autoSyncNeverSynced")}
                </span>
              </>
            )}
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
            {isCodex && connection.provider === "codex" && onToggleCodexPaidCredits && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <button
                  onClick={() => onToggleCodexPaidCredits(!codexPaidCreditsEnabled)}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    codexPaidCreditsEnabled
                      ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={t("codexPaidCreditsToggleTitle")}
                  aria-pressed={codexPaidCreditsEnabled}
                >
                  <span className="material-symbols-outlined text-[13px]">payments</span>
                  {t("codexPaidCreditsShort")}{" "}
                  {codexPaidCreditsEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </button>
              </>
            )}
            {/* #dario: upstream proxy routing selector. Gated on isClaude (the
                real, built-in "claude" provider — the primary intended use
                case for CLIProxyAPI/Dario failover) OR isCcCompatible (a
                custom Claude-Code-protocol-compatible node). Previously this
                only checked isCcCompatible, which never covered the built-in
                Claude provider at all — the control was unreachable for the
                one connection type it was actually built for. */}
            {(isClaude || isCcCompatible) && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <select
                  value={effectiveUpstreamProxyMode}
                  onChange={(e) =>
                    onSetUpstreamProxyMode?.(
                      e.target.value as "native" | "cliproxyapi" | "dario" | "fallback"
                    )
                  }
                  className="text-xs font-medium rounded px-1.5 py-0.5 border-0 bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/70 hover:text-text-muted cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/30"
                  title="Upstream proxy routing for Claude Code traffic"
                >
                  <option value="native">Native</option>
                  <option value="cliproxyapi">CLIProxyAPI</option>
                  <option value="dario">Dario</option>
                  <option value="fallback">Fallback</option>
                </select>
                {effectiveUpstreamProxyMode === "fallback" && (
                  <select
                    value={upstreamProxyFallbackBackend ?? "cliproxyapi"}
                    onChange={(e) =>
                      onSetUpstreamProxyMode?.(
                        "fallback",
                        e.target.value as "cliproxyapi" | "dario"
                      )
                    }
                    className="text-xs font-medium rounded px-1.5 py-0.5 border-0 bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/70 hover:text-text-muted cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/30"
                    title="Fallback retry backend"
                  >
                    <option value="cliproxyapi">→ CLIProxyAPI</option>
                    <option value="dario">→ Dario</option>
                  </select>
                )}
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
                  aria-label={
                    perKeyProxyEnabled
                      ? t("perKeyProxyEnabledTitle")
                      : t("perKeyProxyDisabledTitle")
                  }
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    perKeyProxyEnabled
                      ? "bg-violet-500/15 text-violet-500 hover:bg-violet-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={
                    perKeyProxyEnabled
                      ? t("perKeyProxyEnabledTitle")
                      : t("perKeyProxyDisabledTitle")
                  }
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
                      {proxyName || proxyHost || t("proxy")}
                    </span>
                  </>
                );
              })()}
          </div>
        </div>
      </div>
      <div className={`flex items-center gap-2 ${isCodex ? "flex-wrap" : ""}`}>
        <ConnectionTestButton
          connectionId={connection.id}
          disabled={connection.isActive === false}
        />
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
        {isCodex && isOAuth && connection.provider === "codex" && (
          <CodexPingNowButton
            connectionId={connection.id}
            disabled={connection.isActive === false}
          />
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
        <Toggle
          size="sm"
          checked={connection.isActive ?? true}
          onChange={onToggleActive}
          title={(connection.isActive ?? true) ? t("disableConnection") : t("enableConnection")}
        />
        <div className="flex gap-1 ms-1 transition-opacity">
          {onReauth && (
            <button
              onClick={onReauth}
              className="p-2 hover:bg-amber-500/10 rounded text-amber-600 hover:text-amber-500"
              title={t("reauthenticateConnection")}
            >
              <span className="material-symbols-outlined text-[18px]">passkey</span>
            </button>
          )}
          {verificationUrl && (
            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-amber-500/10 rounded text-amber-600 hover:text-amber-500"
              title={t("verifyAccountHint")}
              aria-label={t("verifyAccount")}
              data-testid="connection-verify-account"
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </a>
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
      {isCodex && connection.codexAccountPool ? (
        <CodexAccountDetails pool={connection.codexAccountPool} />
      ) : null}
      {quotaPanelSupported ? (
        <ConnectionQuotaPanel
          providerId={String(connection.provider || "")}
          connection={connection}
          cache={quotaCache}
          refreshing={quotaRefreshing}
          onRefresh={onRefreshQuota}
        />
      ) : null}
    </div>
  );
}
