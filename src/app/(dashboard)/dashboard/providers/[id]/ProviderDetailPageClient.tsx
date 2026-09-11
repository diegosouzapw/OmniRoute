"use client";

// Issue #3501 strangler-fig decomposition — Phase 1t (final push)
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, Button, CardSkeleton } from "@/shared/components";
import {
  NOAUTH_PROVIDERS,
  getProviderAlias,
  getProviderById,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  supportsApiKeyOnFreeProvider,
  supportsDualAuthProvider,
} from "@/shared/constants/providers";
import { getModelsByProviderId } from "@/shared/constants/models";
import {
  compatibleProviderSupportsModelImport,
  getCompatibleFallbackModels,
} from "@/lib/providers/managedAvailableModels";
import { getProviderServiceKinds } from "@/lib/providers/serviceKindIndex";
import {
  providerLacksModelListing,
  providerUsesCuratedModelsOnly,
} from "@/lib/providers/modelListingCapability";
import { mergeProviderModelListing } from "@/lib/providers/mergeProviderModelListing";
import { normalizeModelCatalogSource } from "@/shared/utils/modelCatalogSearch";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { useNotificationStore } from "@/store/notificationStore";
import {
  resolveDashboardProviderInfo,
  resolveProviderHeaderLink,
  resolveProviderOAuthBackendId,
} from "../providerPageUtils";
import { findDefaultReferral } from "@/lib/radar/referrals";
import { type ConnectionRowConnection } from "./components/ConnectionRow";
import { useProviderConnections } from "./hooks/useProviderConnections";
import { useProviderSettings } from "./hooks/useProviderSettings";
import { useProviderModels } from "./hooks/useProviderModels";
import { useCommandCodeAuth } from "./hooks/useCommandCodeAuth";
import { useConnectionAutoSync } from "./hooks/useConnectionAutoSync";
import { useExternalLinkFlow } from "./hooks/useExternalLinkFlow";
import { useAuthFileHandlers } from "./hooks/useAuthFileHandlers";
import { useModelImportHandlers } from "./hooks/useModelImportHandlers";
import { useApiKeySave } from "./hooks/useApiKeySave";
import { useModelVisibilityHandlers } from "./hooks/useModelVisibilityHandlers";
import { useModelCompatState } from "./hooks/useModelCompatState";
import { useConnectionGate } from "./hooks/useConnectionGate";
import { useProviderNodeActions } from "./hooks/useProviderNodeActions";
import ProviderExtraPanels from "./components/ProviderExtraPanels";
import ProviderModelsSection from "./components/ProviderModelsSection";
import CustomModelsSection from "./components/CustomModelsSection";
import ConnectionsListPanel from "./components/ConnectionsListPanel";
import CoolingConnectionsPanel from "./components/CoolingConnectionsPanel";
import ConnectionsHeaderToolbar from "./components/ConnectionsHeaderToolbar";
import VolcengineConnectModal from "./components/VolcengineConnectModal";
import ProviderAccountRoutingCard from "../../settings/components/ProviderAccountRoutingCard";
import ZedImportCard from "./components/ZedImportCard";
import CursorAgentNudge from "./components/CursorAgentNudge";
import ProviderPageHeader from "./components/ProviderPageHeader";
import CompatibleNodeCard from "./components/CompatibleNodeCard";
import ProviderModalsPanel from "./components/ProviderModalsPanel";
import EmptyConnectionsPlaceholder from "./components/EmptyConnectionsPlaceholder";
import UpstreamProxyCard from "./components/UpstreamProxyCard";
import SearchProviderCard from "./components/SearchProviderCard";
import NoAuthProviderControls from "./components/NoAuthProviderControls";
import AnonymousFallbackToggle from "./components/AnonymousFallbackToggle";
// providerText used by UpstreamProxyCard (Phase 1t.7)

export default function ProviderDetailPageClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const providerId = params.id as string;

  // ── UI-only modal state (not owned by hooks) ─────────────────────────────
  const [showOAuthModal, _setShowOAuthModal] = useState(false);
  const [reauthConnection, setReauthConnection] = useState<ConnectionRowConnection | null>(null);
  const [showKimiAuthMethodModal, setShowKimiAuthMethodModal] = useState(false);
  const [showVolcengineConnectModal, setShowVolcengineConnectModal] = useState(false);
  const [showAddApiKeyModal, setShowAddApiKeyModal] = useState(false);
  const [showSiliconFlowEndpointModal, setShowSiliconFlowEndpointModal] = useState(false);
  const [siliconFlowInitialBaseUrl, setSiliconFlowInitialBaseUrl] = useState<string | undefined>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditNodeModal, setShowEditNodeModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [proxyTarget, setProxyTarget] = useState(null);
  const [importCodexModalOpen, setImportCodexModalOpen] = useState(false);
  const [codexCliGuideOpen, setCodexCliGuideOpen] = useState(false);
  const [importClaudeModalOpen, setImportClaudeModalOpen] = useState(false);
  const [importGeminiModalOpen, setImportGeminiModalOpen] = useState(false);
  const [importGrokCliModalOpen, setImportGrokCliModalOpen] = useState(false);
  const [connectingVolcengineAccount, setConnectingVolcengineAccount] = useState(false);
  const isOpenAICompatible = isOpenAICompatibleProvider(providerId);
  const isCcCompatible = isClaudeCodeCompatibleProvider(providerId);
  const isCommandCode = providerId === "command-code";
  const isAnthropicCompatible =
    isAnthropicCompatibleProvider(providerId) && !isClaudeCodeCompatibleProvider(providerId);
  const isCompatible = isOpenAICompatible || isAnthropicCompatible || isCcCompatible;
  const isAnthropicProtocolCompatible = isAnthropicCompatible || isCcCompatible;
  // #5420: hide model listing for tool-only providers, not just `-search` ids.
  const declaredServiceKinds = (
    resolveDashboardProviderInfo(providerId) as { serviceKinds?: readonly string[] } | null
  )?.serviceKinds;
  const isSearchProvider = providerLacksModelListing(
    providerId,
    getProviderServiceKinds(providerId, declaredServiceKinds)
  );
  const usesCuratedModelsOnly = providerUsesCuratedModelsOnly(providerId);
  const {
    connections,
    setConnections,
    providerNode,
    loading,
    retestingId,
    handleClearCooldown,
    clearingCooldownId,
    batchTesting,
    batchTestResults,
    selectedIds,
    batchDeleting,
    batchUpdating,
    batchRetesting,
    batchDeleteConfirmOpen,
    healthFilter,
    page,
    accountSearch,
    distributingProxies,
    proxyConfig,
    connProxyMap,
    cpaProviderEnabled,
    upstreamProxyMode,
    upstreamProxyFallbackBackend,
    refreshingId,
    setPage,
    setHealthFilter,
    setAccountSearch,
    setSelectedIds,
    setBatchDeleteConfirmOpen,
    setBatchTestResults,
    setProviderNode,
    fetchConnections,
    fetchProxyConfig,
    deleteConfirm,
    handleUpdateConnectionStatus,
    handleToggleRateLimit,
    handleToggleQuotaVisibility,
    handleToggleClaudeExtraUsage,
    handleToggleCodexPaidCredits,
    handleToggleCodexLimit,
    handleToggleCliproxyapiMode,
    handleSetUpstreamProxyMode,
    handleToggleProxyEnabled,
    handleTogglePerKeyProxyEnabled,
    handleRetestConnection,
    handleRefreshToken,
    handleSwapPriority,
    handleReorderByAvailability,
    reorderingByAvailability,
    handleBatchSetActive,
    handleBatchDeleteOpenModal,
    handleBatchDeleteConfirm,
    handleBatchRetest,
    handleBatchTestAll,
    handleToggleSelectOne,
    handleToggleSelectAll,
    handleDistributeProxies,
    parseApiErrorMessage,
    getAttachmentFilename,
    PAGE_SIZE,
  } = useProviderConnections(providerId, isCompatible, isSearchProvider);

  const {
    codexGlobalServiceMode,
    codexSettingsLoaded,
    codexSettingsLoadError,
    savingCodexGlobalServiceMode,
    codexGlobalServiceModeOptions,
    loadCodexSettings,
    handleChangeCodexGlobalServiceMode,
    preferClaudeCodeForUnprefixedClaudeModels,
    claudeRoutingSettingsLoaded,
    claudeRoutingSettingsLoadError,
    savingClaudeRoutingPreference,
    loadClaudeRoutingSettings,
    handleToggleClaudeRoutingPreference,
  } = useProviderSettings(providerId);

  const {
    modelMeta,
    syncedAvailableModels,
    modelAliases,
    fetchProviderModelMeta,
    fetchAliases,
    handleSetAlias,
    handleDeleteAlias,
  } = useProviderModels(providerId, isSearchProvider);

  // ── shared hook/store ─────────────────────────────────────────────────────
  const { copied, copy } = useCopyToClipboard();
  const t = useTranslations("providers");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const notify = useNotificationStore();

  // Phase 1i: external link flow — placed after notify/fetchConnections are defined
  const {
    externalLinkModalOpen,
    setExternalLinkModalOpen,
    externalLinkUrl,
    externalLinkLoading,
    externalLinkError,
    externalLinkCopied,
    externalLinkCopy,
    openExternalLinkFlow,
  } = useExternalLinkFlow({ providerId, notify, fetchConnections });

  const setShowOAuthModal = (show: boolean, connectionRow?: ConnectionRowConnection) => {
    _setShowOAuthModal(show);
    setReauthConnection(show && connectionRow ? connectionRow : null);
  };

  const providerInfo = resolveDashboardProviderInfo(providerId, {
    providerNode,
    compatibleLabels: {
      ccCompatibleName: t("ccCompatibleLabel"),
      anthropicCompatibleName: t("anthropicCompatibleName"),
      openAiCompatibleName: t("openaiCompatibleName"),
    },
  });

  // D28 — Radar default referral link ("Pegue seus créditos grátis"). Fetched
  // from the LOCAL /api/radar/referrals route only (never talks to the
  // private feed server directly) — same client-fetch pattern the Radar
  // dashboard page already uses for its own data. This keeps the providers
  // page decoupled from @/lib/radar (DB-touching, Node-only): a 404 (flag
  // off) or 401/network failure just leaves `referralUrl` null, and
  // `resolveProviderHeaderLink` below then falls back to the static catalog
  // website — byte-identical to before this feature existed.
  const [referralUrl, setReferralUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/radar/referrals");
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const fixed = Array.isArray(data?.fixed) ? data.fixed : [];
        const match = findDefaultReferral(fixed, providerId);
        setReferralUrl(match?.url ?? null);
      } catch {
        // Best-effort only — never blocks rendering of the provider page.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [providerId]);
  const { website: providerHeaderWebsite, isReferralLink } = resolveProviderHeaderLink(
    providerInfo?.website,
    referralUrl
  );
  const oauthProviderId = resolveProviderOAuthBackendId(providerId, providerInfo);
  const providerSupportsOAuth =
    providerInfo?.toggleAuthType === "oauth" ||
    providerInfo?.toggleAuthType === "free" ||
    oauthProviderId !== providerId;
  const subscriptionRisk = providerInfo?.subscriptionRisk === true;

  // ── Phase 1t.3: connection gate + risk-notice modal state ───────────────
  const {
    showRiskNoticeModal,
    gateConnectionFlow,
    handleConfirmRiskNotice,
    handleCancelRiskNotice,
  } = useConnectionGate({ providerId, subscriptionRisk });

  const providerSupportsPat = supportsApiKeyOnFreeProvider(providerId);
  const supportsDualAuth = supportsDualAuthProvider(providerId);
  const isOAuth = providerSupportsOAuth && !providerSupportsPat;
  const providerAlias = getProviderAlias(providerId);
  const isFreeNoAuth =
    NOAUTH_PROVIDERS[providerId]?.noAuth === true ||
    getProviderById(providerId)?.managedAccount === true;
  const registryModels = getModelsByProviderId(providerId);
  // Prefer synced API-discovered models when available, then merge built-ins
  // and user-managed custom models without duplicating IDs. Cursor exclusive
  // listing drops the static registry entirely when synced is non-empty.
  const models = useMemo(() => {
    return mergeProviderModelListing({
      providerId,
      registryModels,
      syncedModels: syncedAvailableModels,
      customModels: (modelMeta.customModels || []).map((cm) => ({
        ...cm,
        id: cm.id,
        name: cm.name || cm.id,
        source: normalizeModelCatalogSource(cm.source) === "imported" ? "imported" : "custom",
      })),
      usesCuratedModelsOnly,
    });
  }, [
    providerId,
    registryModels,
    syncedAvailableModels,
    modelMeta.customModels,
    usesCuratedModelsOnly,
  ]);
  const isUpstreamProxyProvider = providerInfo?.category === "upstream-proxy";
  const compatibleSupportsModelImport = compatibleProviderSupportsModelImport(providerId);

  const providerStorageAlias = isCompatible ? providerId : providerAlias;
  const providerDisplayAlias = isCompatible ? providerNode?.prefix || providerId : providerAlias;

  const {
    importingModels,
    showImportModal,
    importProgress,
    togglingAutoSync,
    togglingAutoFetchModels,
    canImportModels,
    isAutoSyncEnabled,
    isAutoFetchModelsEnabled,
    setShowImportModal,
    setImportProgress,
    handleImportModels,
    handleCompatibleImportWithProgress,
    handleToggleAutoSync,
    handleToggleAutoFetchModels,
  } = useModelImportHandlers({
    providerId,
    models,
    modelMeta,
    modelAliases,
    connections,
    isFreeNoAuth,
    handleSetAlias,
    fetchAliases,
    fetchProviderModelMeta,
    fetchConnections,
    notify,
    t,
    providerStorageAlias,
  });

  const handleToggleConnectionAutoSync = useConnectionAutoSync(
    connections,
    setConnections,
    notify,
    t
  );

  // ── model-related effects (loading gate) ────────────────────────────────
  useEffect(() => {
    if (loading || isSearchProvider) return;
    fetchProviderModelMeta();
    fetchAliases();
  }, [loading, isSearchProvider, fetchProviderModelMeta, fetchAliases]);

  const handleOAuthSuccess = useCallback(() => {
    fetchConnections();
    setShowOAuthModal(false);
  }, [fetchConnections]);

  const openApiKeyAddFlow = useCallback(() => {
    if (providerId === "siliconflow") {
      setShowSiliconFlowEndpointModal(true);
      return;
    }
    setShowAddApiKeyModal(true);
  }, [providerId]);

  useEffect(() => {
    if (searchParams.get("action") === "add-api-key") gateConnectionFlow(openApiKeyAddFlow);
  }, [searchParams, gateConnectionFlow, openApiKeyAddFlow]);

  const openPrimaryAddFlow = useCallback(() => {
    if (providerId === "kimi-coding") return setShowKimiAuthMethodModal(true);
    if (isOAuth) {
      setShowOAuthModal(true);
      return;
    }
    openApiKeyAddFlow();
  }, [providerId, isOAuth, openApiKeyAddFlow]);

  // Legacy manual flow: headful browser login on the machine running OmniRoute.
  // Kept as the fallback for the phone/SMS auto-login modal.
  const connectVolcengineAccountManually = useCallback(async () => {
    setConnectingVolcengineAccount(true);
    try {
      const response = await fetch("/api/providers/volcengine-plan/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeout: 300_000 }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to connect Volcano account");
      }
      const results = Array.isArray(data?.binding?.results) ? data.binding.results : [];
      const connected = results.filter((item: any) => item?.ok).length;
      const failed = results.filter((item: any) => item && item.ok === false && item.available);
      if (connected > 0) {
        notify.success(`Connected ${connected} Volcano plan${connected > 1 ? "s" : ""}`);
      }
      if (failed.length > 0) {
        notify.error(
          failed.map((item: any) => `${item.plan}: ${item.error || "failed"}`).join("; ")
        );
      }
      await fetchConnections();
    } catch (error) {
      notify.error(error instanceof Error ? error.message : "Failed to connect Volcano account");
    } finally {
      setConnectingVolcengineAccount(false);
    }
  }, [fetchConnections, notify]);

  const connectVolcengineAccount = useCallback(() => {
    setShowVolcengineConnectModal(true);
  }, []);

  const {
    commandCodeAuthState,
    handleCloseAddApiKeyModal,
    handleStartCommandCodeAuth,
    handleOpenCommandCodeConnect,
  } = useCommandCodeAuth({
    providerId,
    fetchConnections,
    setSiliconFlowInitialBaseUrl,
    setShowAddApiKeyModal,
    notify,
  });

  // Phase 1s: handleSaveApiKey extracted to hooks/useApiKeySave.ts
  const { handleSaveApiKey } = useApiKeySave({
    providerId,
    fetchConnections,
    fetchProviderModelMeta,
    setImportProgress,
    setShowImportModal,
    setShowAddApiKeyModal,
    setSiliconFlowInitialBaseUrl,
    notify,
    t,
  });

  // ── Phase 1t.4: node/connection update handlers ──────────────────────────
  const { handleUpdateNode, handleUpdateConnection } = useProviderNodeActions({
    providerId,
    fetchConnections,
    selectedConnection,
    setProviderNode,
    setShowEditNodeModal,
    setShowEditModal,
    t,
  });

  // Phase 1j: auth file handlers
  const {
    applyingCodexAuthId,
    applyCodexModalConnectionId,
    setApplyCodexModalConnectionId,
    exportingCodexAuthId,
    handleApplyCodexAuthLocal,
    handleExportCodexAuthFile,
    applyingClaudeAuthId,
    applyClaudeModalConnectionId,
    setApplyClaudeModalConnectionId,
    exportingClaudeAuthId,
    handleApplyClaudeAuthLocal,
    handleExportClaudeAuthFile,
  } = useAuthFileHandlers({ parseApiErrorMessage, getAttachmentFilename, notify, t });

  // Phase 1e: compat-state derivations
  const compat = useModelCompatState(modelMeta.customModels, modelMeta.modelCompatOverrides);
  const { customMap } = compat;
  const effectiveModelNormalize = compat.effectiveModelNormalize;
  const effectiveModelPreserveDeveloper = compat.effectiveModelPreserveDeveloper;
  const effectiveModelHidden = compat.isModelHidden;
  const getUpstreamHeadersRecordForModel = compat.getUpstreamHeadersRecord;

  const compatibleFallbackModels = useMemo(
    () => getCompatibleFallbackModels(providerId, modelMeta.customModels),
    [providerId, modelMeta.customModels]
  );

  // ── Phase 1l: model visibility handlers ─────────────────────────────────
  const {
    compatSavingModelId,
    togglingModelId,
    bulkVisibilityAction,
    clearingModels,
    modelFilter,
    testingModelId,
    modelTestStatus,
    testingAll,
    testProgress,
    autoHideFailed,
    visibilityFilter,
    providerAliasEntries,
    setModelFilter,
    setAutoHideFailed,
    setVisibilityFilter,
    saveModelCompatFlags,
    handleToggleModelHidden,
    handleBulkToggleModelHidden,
    handleClearAllModels,
    onTestModel,
    handleTestAll,
    onModelTestStatusChange,
  } = useModelVisibilityHandlers({
    providerId,
    modelAliases,
    customMap,
    providerStorageAlias,
    fetchProviderModelMeta,
    fetchAliases,
    notify,
    t,
    selectedConnection,
    providerNode,
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!providerInfo) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">{t("providerNotFound")}</p>
        <Link href="/dashboard/providers" className="text-primary mt-4 inline-block">
          {t("backToProviders")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ProviderPageHeader
        providerId={providerId}
        providerInfo={{ ...providerInfo, website: providerHeaderWebsite }}
        connectionsCount={connections.length}
        isOpenAICompatible={isOpenAICompatible}
        isAnthropicProtocolCompatible={isAnthropicProtocolCompatible}
        onOpenTutorial={() => setShowTutorialModal(true)}
        t={t}
        isReferralLink={isReferralLink}
      />

      {providerId === "zed" && (
        <ZedImportCard fetchConnections={fetchConnections} notify={notify} />
      )}
      {providerId === "cursor" && <CursorAgentNudge />}
      {isCompatible && providerNode && (
        <CompatibleNodeCard
          providerId={providerId}
          providerNode={providerNode}
          isCcCompatible={isCcCompatible}
          isAnthropicCompatible={isAnthropicCompatible}
          isAnthropicProtocolCompatible={isAnthropicProtocolCompatible}
          gateConnectionFlow={gateConnectionFlow}
          openApiKeyAddFlow={openApiKeyAddFlow}
          onOpenEditNodeModal={() => setShowEditNodeModal(true)}
          t={t}
        />
      )}
      {!isUpstreamProxyProvider && isFreeNoAuth && (
        <NoAuthProviderControls
          providerId={providerId}
          providerName={providerInfo?.name || providerId}
          providerProxy={proxyConfig?.providers?.[providerId]}
          onConfigureProviderProxy={() =>
            setProxyTarget({
              level: "provider",
              id: providerId,
              label: providerInfo?.name || providerId,
            })
          }
        />
      )}
      {!isUpstreamProxyProvider && !isFreeNoAuth && (
        <AnonymousFallbackToggle
          providerId={providerId}
          providerName={providerInfo?.name || providerId}
        />
      )}
      {!isUpstreamProxyProvider && (!isFreeNoAuth || providerSupportsPat) && (
        <Card>
          <ProviderAccountRoutingCard
            providerKey={providerId}
            connectionCount={connections.length}
          />
          <ConnectionsHeaderToolbar
            providerId={providerId}
            providerInfo={providerInfo}
            isCompatible={isCompatible}
            isCommandCode={isCommandCode}
            isOAuth={isOAuth}
            supportsDualAuth={supportsDualAuth}
            providerSupportsPat={providerSupportsPat}
            connections={connections}
            batchTesting={batchTesting}
            batchRetesting={batchRetesting}
            retestingId={retestingId}
            distributingProxies={distributingProxies}
            proxyConfig={proxyConfig}
            reorderingByAvailability={reorderingByAvailability}
            handleReorderByAvailability={handleReorderByAvailability}
            preferClaudeCodeForUnprefixedClaudeModels={preferClaudeCodeForUnprefixedClaudeModels}
            claudeRoutingSettingsLoaded={claudeRoutingSettingsLoaded}
            claudeRoutingSettingsLoadError={claudeRoutingSettingsLoadError}
            savingClaudeRoutingPreference={savingClaudeRoutingPreference}
            handleToggleClaudeRoutingPreference={handleToggleClaudeRoutingPreference}
            loadClaudeRoutingSettings={loadClaudeRoutingSettings}
            codexGlobalServiceMode={codexGlobalServiceMode}
            codexGlobalServiceModeOptions={codexGlobalServiceModeOptions}
            codexSettingsLoaded={codexSettingsLoaded}
            codexSettingsLoadError={codexSettingsLoadError}
            savingCodexGlobalServiceMode={savingCodexGlobalServiceMode}
            handleChangeCodexGlobalServiceMode={handleChangeCodexGlobalServiceMode}
            loadCodexSettings={loadCodexSettings}
            onSetProxyTarget={setProxyTarget}
            handleDistributeProxies={handleDistributeProxies}
            handleBatchTestAll={handleBatchTestAll}
            gateConnectionFlow={gateConnectionFlow}
            openApiKeyAddFlow={openApiKeyAddFlow}
            openPrimaryAddFlow={openPrimaryAddFlow}
            connectVolcengineAccount={connectVolcengineAccount}
            connectingVolcengineAccount={connectingVolcengineAccount}
            openExternalLinkFlow={openExternalLinkFlow}
            handleOpenCommandCodeConnect={handleOpenCommandCodeConnect}
            commandCodeAuthState={commandCodeAuthState}
            onOpenOAuthModal={() => setShowOAuthModal(true)}
            onOpenCodexCliGuide={() => setCodexCliGuideOpen(true)}
            onOpenImportCodex={() => setImportCodexModalOpen(true)}
            onOpenImportClaude={() => setImportClaudeModalOpen(true)}
            onOpenImportGemini={() => setImportGeminiModalOpen(true)}
            onOpenImportGrokCli={() => setImportGrokCliModalOpen(true)}
            t={t}
          />

          {connections.length === 0 ? (
            <EmptyConnectionsPlaceholder
              isOAuth={isOAuth}
              isCompatible={isCompatible}
              isCommandCode={isCommandCode}
              providerId={providerId}
              supportsDualAuth={supportsDualAuth}
              providerSupportsPat={providerSupportsPat}
              commandCodeAuthState={commandCodeAuthState}
              gateConnectionFlow={gateConnectionFlow}
              openApiKeyAddFlow={openApiKeyAddFlow}
              openPrimaryAddFlow={openPrimaryAddFlow}
              handleOpenCommandCodeConnect={handleOpenCommandCodeConnect}
              onOpenOAuthModal={() => setShowOAuthModal(true)}
              onOpenImportCodex={() => setImportCodexModalOpen(true)}
              onOpenImportClaude={() => setImportClaudeModalOpen(true)}
              onOpenImportGemini={() => setImportGeminiModalOpen(true)}
              onOpenImportGrokCli={() => setImportGrokCliModalOpen(true)}
              t={t}
            />
          ) : (
            <>
              <CoolingConnectionsPanel
                connections={connections}
                onClearCooldown={handleClearCooldown}
                clearingCooldownId={clearingCooldownId}
              />
              <ConnectionsListPanel
                connections={connections}
                providerId={providerId}
                isCcCompatible={isCcCompatible}
                isOAuth={isOAuth}
                codexGlobalServiceMode={codexGlobalServiceMode}
                selectedIds={selectedIds}
                batchUpdating={batchUpdating}
                batchRetesting={batchRetesting}
                batchDeleting={batchDeleting}
                batchTesting={batchTesting}
                retestingId={retestingId}
                refreshingId={refreshingId}
                distributingProxies={distributingProxies}
                healthFilter={healthFilter}
                page={page}
                accountSearch={accountSearch}
                PAGE_SIZE={PAGE_SIZE}
                connProxyMap={connProxyMap}
                proxyConfig={proxyConfig}
                applyingCodexAuthId={applyingCodexAuthId}
                exportingCodexAuthId={exportingCodexAuthId}
                applyingClaudeAuthId={applyingClaudeAuthId}
                exportingClaudeAuthId={exportingClaudeAuthId}
                emailsVisible={emailsVisible}
                setSelectedIds={setSelectedIds}
                setPage={setPage}
                setHealthFilter={setHealthFilter}
                setAccountSearch={setAccountSearch}
                deleteConfirm={deleteConfirm}
                handleUpdateConnectionStatus={handleUpdateConnectionStatus}
                handleToggleRateLimit={handleToggleRateLimit}
                handleToggleQuotaVisibility={handleToggleQuotaVisibility}
                handleToggleClaudeExtraUsage={handleToggleClaudeExtraUsage}
                handleToggleCodexPaidCredits={handleToggleCodexPaidCredits}
                canAutoSync={!usesCuratedModelsOnly && compatibleSupportsModelImport}
                handleToggleConnectionAutoSync={handleToggleConnectionAutoSync}
                handleToggleCliproxyapiMode={handleToggleCliproxyapiMode}
                handleSetUpstreamProxyMode={handleSetUpstreamProxyMode}
                upstreamProxyMode={upstreamProxyMode}
                upstreamProxyFallbackBackend={upstreamProxyFallbackBackend}
                handleToggleCodexLimit={handleToggleCodexLimit}
                handleToggleProxyEnabled={handleToggleProxyEnabled}
                handleTogglePerKeyProxyEnabled={handleTogglePerKeyProxyEnabled}
                handleRetestConnection={handleRetestConnection}
                handleRefreshToken={handleRefreshToken}
                handleSwapPriority={handleSwapPriority}
                handleBatchSetActive={handleBatchSetActive}
                handleBatchDeleteOpenModal={handleBatchDeleteOpenModal}
                handleBatchRetest={handleBatchRetest}
                handleToggleSelectOne={handleToggleSelectOne}
                handleToggleSelectAll={handleToggleSelectAll}
                handleDistributeProxies={handleDistributeProxies}
                cpaProviderEnabled={cpaProviderEnabled}
                onOpenEditModal={(conn) => {
                  setSelectedConnection(conn);
                  setShowEditModal(true);
                }}
                onOpenOAuth={(conn) => gateConnectionFlow(() => setShowOAuthModal(true, conn))}
                onSetProxyTarget={setProxyTarget}
                onOpenApplyCodexModal={setApplyCodexModalConnectionId}
                onExportCodexAuthFile={handleExportCodexAuthFile}
                onOpenApplyClaudeModal={setApplyClaudeModalConnectionId}
                onExportClaudeAuthFile={handleExportClaudeAuthFile}
                gateConnectionFlow={gateConnectionFlow}
                t={t}
              />
            </>
          )}
        </Card>
      )}
      {isUpstreamProxyProvider && <UpstreamProxyCard t={t} />}

      {/* Models — hidden for search providers (they don't have models) */}
      {!isSearchProvider && !isUpstreamProxyProvider && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">{t("availableModels")}</h2>
          <ProviderModelsSection
            providerId={providerId}
            providerAlias={providerAlias}
            providerStorageAlias={providerStorageAlias}
            providerDisplayAlias={providerDisplayAlias}
            providerInfo={providerInfo}
            isCcCompatible={isCcCompatible}
            isAnthropicCompatible={isAnthropicCompatible}
            isAnthropicProtocolCompatible={isAnthropicProtocolCompatible}
            isManagedAvailableModelsProvider={isCompatible || providerId === "openrouter"}
            compatibleSupportsModelImport={compatibleSupportsModelImport}
            allowModelImport={!usesCuratedModelsOnly}
            models={models}
            modelMeta={modelMeta}
            modelAliases={modelAliases}
            syncedAvailableModels={syncedAvailableModels}
            compatibleFallbackModels={compatibleFallbackModels}
            copied={copied}
            onCopy={copy}
            onSetAlias={handleSetAlias}
            onDeleteAlias={handleDeleteAlias}
            fetchProviderModelMeta={fetchProviderModelMeta}
            connections={connections}
            selectedConnection={selectedConnection}
            canImportModels={canImportModels}
            importingModels={importingModels}
            handleImportModels={handleImportModels}
            isAutoSyncEnabled={isAutoSyncEnabled}
            togglingAutoSync={togglingAutoSync}
            handleToggleAutoSync={handleToggleAutoSync}
            isAutoFetchModelsEnabled={isAutoFetchModelsEnabled}
            togglingAutoFetchModels={togglingAutoFetchModels}
            handleToggleAutoFetchModels={handleToggleAutoFetchModels}
            handleCompatibleImportWithProgress={handleCompatibleImportWithProgress}
            compatSavingModelId={compatSavingModelId}
            togglingModelId={togglingModelId}
            bulkVisibilityAction={bulkVisibilityAction}
            clearingModels={clearingModels}
            modelFilter={modelFilter}
            testingModelId={testingModelId}
            modelTestStatus={modelTestStatus}
            onModelTestStatusChange={onModelTestStatusChange}
            testingAll={testingAll}
            testProgress={testProgress}
            autoHideFailed={autoHideFailed}
            visibilityFilter={visibilityFilter}
            providerAliasEntries={providerAliasEntries}
            setModelFilter={setModelFilter}
            setAutoHideFailed={setAutoHideFailed}
            setVisibilityFilter={setVisibilityFilter}
            saveModelCompatFlags={saveModelCompatFlags}
            handleToggleModelHidden={handleToggleModelHidden}
            handleBulkToggleModelHidden={handleBulkToggleModelHidden}
            handleClearAllModels={handleClearAllModels}
            onTestModel={onTestModel}
            handleTestAll={handleTestAll}
            effectiveModelNormalize={effectiveModelNormalize}
            effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
            effectiveModelHidden={effectiveModelHidden}
            getUpstreamHeadersRecordForModel={getUpstreamHeadersRecordForModel}
            t={t}
          />

          {/* Custom Models — available for all providers */}
          <CustomModelsSection
            providerId={providerId}
            providerAlias={providerDisplayAlias}
            copied={copied}
            onCopy={copy}
            onModelsChanged={fetchProviderModelMeta}
            syncedModelIds={syncedAvailableModels.map((model) => model.id)}
          />
        </Card>
      )}

      {/* Search provider info */}
      {isSearchProvider && <SearchProviderCard providerId={providerId} t={t} />}

      {/* Playground + param filters — extracted to components/ProviderExtraPanels.tsx (#6649) */}
      <ProviderExtraPanels providerId={providerId} />

      <ProviderModalsPanel
        providerId={providerId}
        providerInfo={providerInfo}
        isCompatible={isCompatible}
        isAnthropicProtocolCompatible={isAnthropicProtocolCompatible}
        isCcCompatible={isCcCompatible}
        isCommandCode={isCommandCode}
        isUpstreamProxyProvider={isUpstreamProxyProvider}
        subscriptionRisk={subscriptionRisk}
        existingConnectionCount={connections.length}
        showRiskNoticeModal={showRiskNoticeModal}
        handleConfirmRiskNotice={handleConfirmRiskNotice}
        handleCancelRiskNotice={handleCancelRiskNotice}
        showKimiAuthMethodModal={showKimiAuthMethodModal}
        setShowKimiAuthMethodModal={setShowKimiAuthMethodModal}
        showOAuthModal={showOAuthModal}
        reauthConnection={reauthConnection}
        handleOAuthSuccess={handleOAuthSuccess}
        setShowOAuthModal={setShowOAuthModal}
        showSiliconFlowEndpointModal={showSiliconFlowEndpointModal}
        setSiliconFlowInitialBaseUrl={setSiliconFlowInitialBaseUrl}
        setShowSiliconFlowEndpointModal={setShowSiliconFlowEndpointModal}
        setShowAddApiKeyModal={setShowAddApiKeyModal}
        showAddApiKeyModal={showAddApiKeyModal}
        siliconFlowInitialBaseUrl={siliconFlowInitialBaseUrl}
        commandCodeAuthState={commandCodeAuthState}
        handleStartCommandCodeAuth={handleStartCommandCodeAuth}
        handleSaveApiKey={handleSaveApiKey}
        handleCloseAddApiKeyModal={handleCloseAddApiKeyModal}
        batchDeleteConfirmOpen={batchDeleteConfirmOpen}
        setBatchDeleteConfirmOpen={setBatchDeleteConfirmOpen}
        handleBatchDeleteConfirm={handleBatchDeleteConfirm}
        selectedIds={selectedIds}
        batchDeleting={batchDeleting}
        deleteConfirm={deleteConfirm}
        applyCodexModalConnectionId={applyCodexModalConnectionId}
        setApplyCodexModalConnectionId={setApplyCodexModalConnectionId}
        applyingCodexAuthId={applyingCodexAuthId}
        handleApplyCodexAuthLocal={handleApplyCodexAuthLocal}
        importCodexModalOpen={importCodexModalOpen}
        setImportCodexModalOpen={setImportCodexModalOpen}
        fetchConnections={fetchConnections}
        externalLinkModalOpen={externalLinkModalOpen}
        setExternalLinkModalOpen={setExternalLinkModalOpen}
        externalLinkLoading={externalLinkLoading}
        externalLinkError={externalLinkError}
        externalLinkUrl={externalLinkUrl}
        externalLinkCopied={externalLinkCopied}
        externalLinkCopy={externalLinkCopy}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedConnection={selectedConnection}
        handleUpdateConnection={handleUpdateConnection}
        handleCompatibleImportWithProgress={handleCompatibleImportWithProgress}
        showEditNodeModal={showEditNodeModal}
        setShowEditNodeModal={setShowEditNodeModal}
        providerNode={providerNode}
        handleUpdateNode={handleUpdateNode}
        codexCliGuideOpen={codexCliGuideOpen}
        setCodexCliGuideOpen={setCodexCliGuideOpen}
        applyClaudeModalConnectionId={applyClaudeModalConnectionId}
        setApplyClaudeModalConnectionId={setApplyClaudeModalConnectionId}
        applyingClaudeAuthId={applyingClaudeAuthId}
        handleApplyClaudeAuthLocal={handleApplyClaudeAuthLocal}
        importClaudeModalOpen={importClaudeModalOpen}
        setImportClaudeModalOpen={setImportClaudeModalOpen}
        importGrokCliModalOpen={importGrokCliModalOpen}
        setImportGrokCliModalOpen={setImportGrokCliModalOpen}
        batchTestResults={batchTestResults}
        setBatchTestResults={setBatchTestResults}
        emailsVisible={emailsVisible}
        proxyTarget={proxyTarget}
        setProxyTarget={setProxyTarget}
        fetchProxyConfig={fetchProxyConfig}
        importProgress={importProgress}
        showImportModal={showImportModal}
        setShowImportModal={setShowImportModal}
        showTutorialModal={showTutorialModal}
        setShowTutorialModal={setShowTutorialModal}
        t={t}
      />

      {/* Volcano Engine console phone/SMS auto-login (falls back to manual browser login) */}
      <VolcengineConnectModal
        isOpen={showVolcengineConnectModal}
        onClose={() => setShowVolcengineConnectModal(false)}
        onFallbackManual={connectVolcengineAccountManually}
        onConnected={fetchConnections}
        notify={notify}
        t={t}
      />
    </div>
  );
}
