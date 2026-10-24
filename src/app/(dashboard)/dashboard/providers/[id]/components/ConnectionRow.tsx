"use client";

import Icon from "@/shared/components/Icon";

import { buttonVariants } from "@omniroute/ui-kit/button";
import ConnectionTestButton from "@/shared/components/ConnectionTestButton";

// Phase 1d extraction — Issue #3501
// ConnectionRow (and its local helpers CooldownTimer, inferErrorType,
// getStatusPresentation) moved out of ProviderDetailPageClient.tsx.

import { readCookieExpiresAt } from "@/shared/utils/webCookieExpiry";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge, Button, Checkbox, ReorderControl, Select, Toggle } from "@/shared/components";
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

  return <span className="text-xs text-warning font-mono">⏱ {remaining}</span>;
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
          className: "bg-info/15 text-info",
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
            className: "bg-chart-2/15 text-chart-2",
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
  const ageMinutes =
    validSync && syncClock !== null
      ? Math.max(0, Math.floor((syncClock - lastSync) / 60_000))
      : null;
  const ageUnit =
    ageMinutes === null ? null : ageMinutes < 60 ? "minute" : ageMinutes < 1440 ? "hour" : "day";
  const ageValue =
    ageMinutes === null
      ? 0
      : ageUnit === "minute"
        ? ageMinutes
        : ageUnit === "hour"
          ? Math.floor(ageMinutes / 60)
          : Math.floor(ageMinutes / 1440);
  const syncAgeLabel =
    ageUnit === null
      ? null
      : new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-ageValue, ageUnit);

  return (
    <div
      className={`group flex ${isCodex ? "flex-col items-stretch gap-3" : "flex-wrap items-center justify-between gap-x-3 gap-y-2"} p-3 rounded-lg hover:bg-bg-subtle transition-colors ${connection.isActive === false ? "opacity-60" : ""}`}
    >
      {/* basis-64 lets the action bar drop to its own line on narrow screens instead of
          pushing the row past the viewport (the page clips x-overflow, so buttons vanished).
          Codex rows stack vertically (#16248), where a 16rem basis would become a height. */}
      <div
        className={`flex items-center gap-2 sm:gap-3 flex-1 min-w-0 ${isCodex ? "" : "basis-64"}`}
      >
        {onToggleSelect && (
          <Checkbox checked={isSelected} onChange={onToggleSelect} className="shrink-0" />
        )}
        <ReorderControl
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          isFirst={isFirst}
          isLast={isLast}
        />
        <Icon
          name={isOAuth ? "lock" : "key"}
          size={16}
          className="hidden text-text-muted sm:inline-block"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium break-words sm:truncate">{displayName}</p>
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
                  <Badge
                    variant="error"
                    size="sm"
                    icon={<Icon name="error" size={11} />}
                    title={t("tokenExpiredTitle", { date: effectiveExpiresAt })}
                  >
                    {t("tokenExpiredBadge")}
                  </Badge>
                ) : null
              ) : tokenMinsLeft < 30 ? (
                <Badge
                  variant="warning"
                  size="sm"
                  icon={<Icon name="warning" size={11} />}
                  title={t("tokenExpiresSoonTitle", { minutes: tokenMinsLeft })}
                >
                  {`~${tokenMinsLeft}m`}
                </Badge>
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
              <Badge
                variant="default"
                size="sm"
                icon={<Icon name="dynamic_feed" size={11} />}
                title={t("accountConcurrencyCapLabel")}
              >
                {connection.maxConcurrent}
              </Badge>
            )}
            {/* Rate Limit Protection — inline toggle with label */}
            <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
            <Button
              variant="ghost"
              size="sm"
              icon="shield"
              onClick={() => onToggleRateLimit(!rateLimitEnabled)}
              className={`h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
                rateLimitShielded
                  ? "bg-success/15 text-success hover:bg-success/25"
                  : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
              }`}
              title={
                rateLimitEnabled ? t("disableRateLimitProtection") : t("enableRateLimitProtection")
              }
            >
              {rateLimitShielded ? t("rateLimitProtected") : t("rateLimitUnprotected")}
            </Button>
            {onToggleQuotaVisibility && (
              <ProviderQuotaVisibilityToggle
                visible={quotaVisible}
                onToggle={onToggleQuotaVisibility}
              />
            )}
            {onToggleAutoSync && (
              <>
                <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="sync"
                  onClick={() => onToggleAutoSync?.(!autoSyncEnabled)}
                  disabled={connection.isActive === false}
                  className={`h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed ${
                    autoSyncEnabled
                      ? "bg-success/15 text-success hover:bg-success/25"
                      : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
                  }`}
                  title={t("autoSyncTooltip")}
                >
                  {t("autoSyncShort")}
                </Button>
                <span
                  className="text-xs text-text-muted"
                  title={
                    validSync ? new Date(lastSync).toLocaleString(locale) : t("autoSyncNeverSynced")
                  }
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
                <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="payments"
                  onClick={() => onToggleClaudeExtraUsage?.(!claudeBlockExtraUsageEnabled)}
                  className={`h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
                    !claudeBlockExtraUsageEnabled
                      ? "bg-warning/15 text-warning hover:bg-warning/25"
                      : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
                  }`}
                  title={t("claudeExtraUsageToggleTitle")}
                >
                  {t("claudeExtraUsageShort")}{" "}
                  {!claudeBlockExtraUsageEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </Button>
              </>
            )}
            {isCodex && connection.provider === "codex" && onToggleCodexPaidCredits && (
              <>
                <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="payments"
                  onClick={() => onToggleCodexPaidCredits(!codexPaidCreditsEnabled)}
                  className={`h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
                    codexPaidCreditsEnabled
                      ? "bg-warning/15 text-warning hover:bg-warning/25"
                      : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
                  }`}
                  title={t("codexPaidCreditsToggleTitle")}
                  aria-pressed={codexPaidCreditsEnabled}
                >
                  {t("codexPaidCreditsShort")}{" "}
                  {codexPaidCreditsEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </Button>
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
                <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
                <Select
                  compact
                  value={effectiveUpstreamProxyMode}
                  onChange={(e) =>
                    onSetUpstreamProxyMode?.(
                      e.target.value as "native" | "cliproxyapi" | "dario" | "fallback"
                    )
                  }
                  className="w-auto"
                  selectClassName="text-xs font-medium"
                  title={t("claudeCodeRoutingTitle")}
                >
                  <option value="native">{t("routingNative")}</option>
                  <option value="cliproxyapi">CLIProxyAPI</option>
                  <option value="dario">Dario</option>
                  <option value="fallback">{t("routingFallback")}</option>
                </Select>
                {effectiveUpstreamProxyMode === "fallback" && (
                  <Select
                    compact
                    value={upstreamProxyFallbackBackend ?? "cliproxyapi"}
                    onChange={(e) =>
                      onSetUpstreamProxyMode?.(
                        "fallback",
                        e.target.value as "cliproxyapi" | "dario"
                      )
                    }
                    className="w-auto"
                    selectClassName="text-xs font-medium"
                    title={t("fallbackRetryBackendTitle")}
                  >
                    <option value="cliproxyapi">→ CLIProxyAPI</option>
                    <option value="dario">→ Dario</option>
                  </Select>
                )}
              </>
            )}
            {isCodex && (
              <>
                <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
                {codexServiceTierBadge && (
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${codexServiceTierBadge.className}`}
                    title={codexServiceTierBadge.title}
                  >
                    <Icon name={codexServiceTierBadge.icon} size={13} />
                    {codexServiceTierBadge.label}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  icon="timer"
                  onClick={() => onToggleCodex5h?.(!codex5hEnabled)}
                  className={`h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
                    codex5hEnabled
                      ? "bg-info/15 text-info hover:bg-info/25"
                      : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
                  }`}
                  title={t("codex5hToggleTitle")}
                >
                  5h {codex5hEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="date_range"
                  onClick={() => onToggleCodexWeekly?.(!codexWeeklyEnabled)}
                  className={`h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
                    codexWeeklyEnabled
                      ? "bg-chart-3/15 text-chart-3 hover:bg-chart-3/25"
                      : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
                  }`}
                  title={t("codexWeeklyToggleTitle")}
                >
                  {t("weeklyShort")} {codexWeeklyEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </Button>
              </>
            )}
            {onToggleProxyEnabled && (
              <>
                <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="vpn_lock"
                  onClick={() => onToggleProxyEnabled(!proxyEnabled)}
                  aria-label={proxyEnabled ? t("proxyEnabledTitle") : t("proxyDisabledTitle")}
                  className={`h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
                    proxyEnabled
                      ? "bg-success/15 text-success hover:bg-success/25"
                      : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
                  }`}
                  title={proxyEnabled ? t("proxyEnabledTitle") : t("proxyDisabledTitle")}
                >
                  {proxyEnabled ? <span className="sr-only">{t("proxyOn")}</span> : t("proxyOff")}
                </Button>
              </>
            )}
            {onTogglePerKeyProxyEnabled && (
              <>
                <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="key"
                  onClick={() => onTogglePerKeyProxyEnabled(!perKeyProxyEnabled)}
                  aria-label={
                    perKeyProxyEnabled
                      ? t("perKeyProxyEnabledTitle")
                      : t("perKeyProxyDisabledTitle")
                  }
                  className={`h-auto min-h-0 gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
                    perKeyProxyEnabled
                      ? "bg-chart-3/15 text-chart-3 hover:bg-chart-3/25"
                      : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
                  }`}
                  title={
                    perKeyProxyEnabled
                      ? t("perKeyProxyEnabledTitle")
                      : t("perKeyProxyDisabledTitle")
                  }
                >
                  {perKeyProxyEnabled ? (
                    t("perKeyProxyOn")
                  ) : (
                    <span className="sr-only">{t("perKeyProxyOff")}</span>
                  )}
                </Button>
              </>
            )}
            {hasProxy &&
              (() => {
                const colorClass =
                  proxySource === "global"
                    ? "bg-success/15 text-success"
                    : proxySource === "provider"
                      ? "bg-warning/15 text-warning"
                      : "bg-info/15 text-info";
                const label =
                  proxySource === "global"
                    ? t("proxySourceGlobal")
                    : proxySource === "provider"
                      ? t("proxySourceProvider")
                      : t("proxySourceKey");
                return (
                  <>
                    <span className="hidden text-text-muted/30 select-none sm:inline">|</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="vpn_lock"
                      onClick={onProxy}
                      disabled={!onProxy}
                      className={`h-auto min-h-0 gap-0.5 rounded px-1.5 py-0.5 text-xs font-medium ${colorClass}`}
                      title={t("proxyConfiguredBySource", {
                        source: label,
                        host: proxyHost || t("configured"),
                      })}
                    >
                      {proxyName || proxyHost || t("proxy")}
                    </Button>
                  </>
                );
              })()}
          </div>
        </div>
      </div>
      <div className="basis-full min-w-0 xl:basis-auto">
        <div className="flex w-full flex-wrap items-center justify-between gap-0.5 sm:gap-1 xl:justify-end [&>button]:grow-0">
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
            className="!size-7 !p-0 sm:!w-auto sm:!px-2 text-xs"
            aria-label={t("retest")}
            title={t("retestAuthentication")}
          >
            <span className="hidden sm:inline">{t("retest")}</span>
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
              className="!size-7 !p-0 sm:!w-auto sm:!px-2 text-xs text-warning hover:text-warning"
              aria-label={t("tokenShort")}
              title={t("refreshOauthTokenTitle")}
            >
              <span className="hidden sm:inline">{t("tokenShort")}</span>
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
              className="!size-7 !p-0 sm:!w-auto sm:!px-2 text-xs text-success hover:text-success"
              aria-label={applyCodexAuthLabel}
              title={applyCodexAuthLabel}
            >
              <span className="hidden sm:inline">{applyCodexAuthLabel}</span>
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
              className="!size-7 !p-0 sm:!w-auto sm:!px-2 text-xs text-info hover:text-info"
              aria-label={exportCodexAuthLabel}
              title={exportCodexAuthLabel}
            >
              <span className="hidden sm:inline">{exportCodexAuthLabel}</span>
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
              className="!size-7 !p-0 sm:!w-auto sm:!px-2 text-xs text-success hover:text-success"
              aria-label={applyClaudeAuthLabel}
              title={applyClaudeAuthLabel}
            >
              <span className="hidden sm:inline">{applyClaudeAuthLabel}</span>
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
              className="!size-7 !p-0 sm:!w-auto sm:!px-2 text-xs text-info hover:text-info"
              aria-label={exportClaudeAuthLabel}
              title={exportClaudeAuthLabel}
            >
              <span className="hidden sm:inline">{exportClaudeAuthLabel}</span>
            </Button>
          )}
          <Toggle
            size="sm"
            checked={connection.isActive ?? true}
            onChange={onToggleActive}
            title={(connection.isActive ?? true) ? t("disableConnection") : t("enableConnection")}
          />
          <div className="contents">
            {onReauth && (
              <Button
                variant="ghost"
                size="icon-sm"
                icon="passkey"
                onClick={onReauth}
                className="size-7 min-h-7 rounded hover:bg-warning/10 text-warning"
                title={t("reauthenticateConnection")}
                aria-label={t("reauthenticateConnection")}
              />
            )}
            {verificationUrl && (
              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon-sm",
                  className: "size-7 min-h-7 rounded hover:bg-warning/10 text-warning",
                })}
                title={t("verifyAccountHint")}
                aria-label={t("verifyAccount")}
                data-testid="connection-verify-account"
              >
                <Icon name="verified_user" size={18} />
              </a>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              icon="edit"
              onClick={onEdit}
              className="size-7 min-h-7 rounded hover:bg-bg-subtle text-text-muted hover:text-primary"
              title={t("edit")}
              aria-label={t("edit")}
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon="vpn_lock"
              onClick={onProxy}
              className="size-7 min-h-7 rounded hover:bg-bg-subtle text-text-muted hover:text-primary"
              title={t("proxyConfig")}
              aria-label={t("proxyConfig")}
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon="delete"
              onClick={onDelete}
              className="size-7 min-h-7 rounded hover:bg-error/10 text-error"
              title={t("delete")}
              aria-label={t("delete")}
            />
          </div>
        </div>
      </div>
      {isCodex && connection.codexAccountPool ? (
        <div className="basis-full min-w-0">
          <CodexAccountDetails pool={connection.codexAccountPool} />
        </div>
      ) : null}
      {quotaPanelSupported ? (
        <div className="basis-full min-w-0">
          <ConnectionQuotaPanel
            providerId={String(connection.provider || "")}
            connection={connection}
            cache={quotaCache}
            refreshing={quotaRefreshing}
            onRefresh={onRefreshQuota}
          />
        </div>
      ) : null}
    </div>
  );
}
