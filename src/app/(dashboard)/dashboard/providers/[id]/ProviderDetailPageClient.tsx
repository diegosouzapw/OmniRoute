"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
// Phase 1f extractions — Issue #3501
import { useProviderConnections } from "./hooks/useProviderConnections";
import { useProviderSettings } from "./hooks/useProviderSettings";
import { useProviderModels } from "./hooks/useProviderModels";
// Phase 1h: commandCode auth flow extracted to hooks/useCommandCodeAuth.ts
import { useCommandCodeAuth } from "./hooks/useCommandCodeAuth";
// Phase 1i: external link flow extracted to hooks/useExternalLinkFlow.ts
import { useExternalLinkFlow } from "./hooks/useExternalLinkFlow";
// ExternalLinkModal — used by components/ProviderModalsPanel.tsx (Phase 1t.5)
// Phase 1j: auth file handlers extracted to hooks/useAuthFileHandlers.ts
import { useAuthFileHandlers } from "./hooks/useAuthFileHandlers";
// Phase 1g: ProviderPlaygroundPanel + helpers extracted to components/ProviderPlaygroundPanel.tsx
import ProviderPlaygroundPanel from "./components/ProviderPlaygroundPanel";
import { useNotificationStore } from "@/store/notificationStore";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Card,
  Button,
  CardSkeleton,
  NoAuthProviderCard,
  NoAuthAccountCard,
} from "@/shared/components";
// ConfirmModal, OAuthModal, KiroOAuthWrapper, CursorAuthModal, TraeAuthModal, ProxyConfigModal
// — used by components/ProviderModalsPanel.tsx (Phase 1t.5)
import {
  NOAUTH_PROVIDERS,
  getProviderAlias,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  supportsApiKeyOnFreeProvider,
  // LOCAL_PROVIDERS, isSelfHostedChatProvider moved to extracted modals/helpers
  // providerAllowsOptionalApiKey + supportsBulkApiKey used by extracted AddApiKeyModal
} from "@/shared/constants/providers";
// antigravityClientProfile + parseBulkApiKeys used by extracted modals (AddApiKeyModal, EditConnectionModal)
import { getModelsByProviderId } from "@/shared/constants/models";
import {
  compatibleProviderSupportsModelImport,
  getCompatibleFallbackModels,
} from "@/lib/providers/managedAvailableModels";
import { normalizeModelCatalogSource } from "@/shared/utils/modelCatalogSearch";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
// pickDisplayValue, compareTr, CodexServiceTier, CodexGlobalServiceMode — used by extracted modals/hooks
// RiskNoticeModal, CodexCliGuideModal — used by components/ProviderModalsPanel.tsx (Phase 1t.5)
// isRiskAcknowledged, useRiskAcknowledged moved to hooks/useConnectionGate.ts (Phase 1t.3)
import { resolveDashboardProviderInfo } from "../providerPageUtils";
// webSessionCredentials used by extracted modals (AddApiKeyModal, EditConnectionModal)
// ImportCodexAuthModal, ApplyCodexAuthModal, ImportClaudeAuthModal, ApplyClaudeAuthModal,
// ImportGeminiAuthModal, ApplyGeminiAuthModal, EditCompatibleNodeModal, AddApiKeyModal,
// EditConnectionModal — used by components/ProviderModalsPanel.tsx (Phase 1t.5)
// WebSessionCredentialGuide used by extracted ConnectionRow/modals (Phase 1d/1e)
// Phase 1d extractions — Issue #3501 (ConnectionRow, ModelCompatPopover, SiliconFlowEndpointModal
// used by ConnectionsListPanel/ProviderModelsSection/ProviderModalsPanel)
import { type ConnectionRowConnection } from "./components/ConnectionRow";
// Phase 1k extractions — Issue #3501
import { useModelImportHandlers } from "./hooks/useModelImportHandlers";
// Phase 1s extractions — Issue #3501
import { useApiKeySave } from "./hooks/useApiKeySave";
// ImportProgressModal — used by components/ProviderModalsPanel.tsx (Phase 1t.5)
// Phase 1l extractions — Issue #3501
import { useModelVisibilityHandlers } from "./hooks/useModelVisibilityHandlers";
// Phase 1m extractions — Issue #3501
import ProviderModelsSection from "./components/ProviderModelsSection";
import {
  // All non-used helpers moved to extracted modals/hooks in prior phases
  providerText,
} from "./providerPageHelpers";
// CODEX_GLOBAL_SERVICE_MODE_VALUES, getCodexServiceTierLabel, normalizeCodexLimitPolicy
// moved to hooks/useProviderSettings.ts + hooks/useProviderConnections.ts (Phase 1f)
// Phase 1e extractions — Issue #3501
import { useModelCompatState } from "./hooks/useModelCompatState";
import CustomModelsSection from "./components/CustomModelsSection";
// ModelRow, ModelVisibilityToolbar, PassthroughModelsSection, CompatibleModelsSection → ProviderModelsSection (Phase 1m)
import ConnectionsListPanel from "./components/ConnectionsListPanel";
// Phase 1o extractions — Issue #3501
import ConnectionsHeaderToolbar from "./components/ConnectionsHeaderToolbar";
// Phase 1p extractions — Issue #3501
import ZedImportCard from "./components/ZedImportCard";
// Phase 1q extractions — Issue #3501
// BatchTestResultsModal, AdaptaTutorialModal — used by components/ProviderModalsPanel.tsx (Phase 1t.5)
// Phase 1t.1 extractions — Issue #3501
import ProviderPageHeader from "./components/ProviderPageHeader";
// Phase 1t.2 extractions — Issue #3501
import CompatibleNodeCard from "./components/CompatibleNodeCard";
// Phase 1t.5 extractions — Issue #3501
import ProviderModalsPanel from "./components/ProviderModalsPanel";
// Phase 1t.3 extractions — Issue #3501
import { useConnectionGate } from "./hooks/useConnectionGate";
// Phase 1t.4 extractions — Issue #3501
import { useProviderNodeActions } from "./hooks/useProviderNodeActions";
// recordToHeaderRows moved to components/ModelCompatPopover.tsx (Phase 1d)
// buildCompatMap, isModelHidden*, effectiveNormalize/Preserve*, anyNormalize/NoPreserveCompatBadge
// moved to providerPageHelpers.ts + hook useModelCompatState (Phase 1e)
// formatProviderModelsErrorResponse moved to providerPageHelpers.ts (Phase 1e)

// ModelCompatSavePatch → hooks/useModelVisibilityHandlers.ts (Phase 1l)
// MAX_BULK_IDS moved to hooks/useProviderConnections.ts (Phase 1f)
// ModelRowProps, PassthroughModelRowProps → components/ModelRow.tsx, PassthroughModelRow.tsx (Phase 1e)
// PassthroughModelsSectionProps → components/PassthroughModelsSection.tsx (Phase 1e)
// CustomModelsSectionProps → components/CustomModelsSection.tsx (Phase 1e)
// CompatibleModelsSectionProps → components/CompatibleModelsSection.tsx (Phase 1e)
// CooldownTimerProps moved to components/ConnectionRow.tsx (Phase 1d)

// getModelSourceBadgeClass + ModelSourceBadge → components/ModelRow.tsx (Phase 1e)
// ConnectionRowConnection, ConnectionRowProps moved to components/ConnectionRow.tsx (Phase 1d)

// ModelCompatPopover extracted to components/ModelCompatPopover.tsx (Phase 1d)

// ── ProviderPlaygroundPanel extracted to components/ProviderPlaygroundPanel.tsx (Phase 1g) ──

export default function ProviderDetailPageClient() {
  const params = useParams();
  const providerId = params.id as string;

  // ── UI-only modal state (not owned by hooks) ─────────────────────────────
  const [showOAuthModal, _setShowOAuthModal] = useState(false);
  const [reauthConnection, setReauthConnection] = useState<ConnectionRowConnection | null>(null);
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
  const isOpenAICompatible = isOpenAICompatibleProvider(providerId);
  const isCcCompatible = isClaudeCodeCompatibleProvider(providerId);
  const isCommandCode = providerId === "command-code";
  const isAnthropicCompatible =
    isAnthropicCompatibleProvider(providerId) && !isClaudeCodeCompatibleProvider(providerId);
  const isCompatible = isOpenAICompatible || isAnthropicCompatible || isCcCompatible;
  const isAnthropicProtocolCompatible = isAnthropicCompatible || isCcCompatible;
  const isSearchProvider = providerId.endsWith("-search");

  // ── Phase 1f hooks ────────────────────────────────────────────────────────
  const {
    connections,
    providerNode,
    loading,
    retestingId,
    batchTesting,
    batchTestResults,
    selectedIds,
    batchDeleting,
    batchUpdating,
    batchRetesting,
    batchDeleteConfirmOpen,
    healthFilter,
    page,
    distributingProxies,
    proxyConfig,
    connProxyMap,
    cpaProviderEnabled,
    refreshingId,
    setPage,
    setHealthFilter,
    setSelectedIds,
    setBatchDeleteConfirmOpen,
    setBatchTestResults,
    setConnections,
    setProviderNode,
    fetchConnections,
    fetchProxyConfig,
    handleDelete,
    handleUpdateConnectionStatus,
    handleToggleRateLimit,
    handleToggleClaudeExtraUsage,
    handleToggleCodexLimit,
    handleToggleCliproxyapiMode,
    handleToggleProxyEnabled,
    handleTogglePerKeyProxyEnabled,
    handleRetestConnection,
    handleRefreshToken,
    handleSwapPriority,
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
    externalLinkToken,
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
  const providerSupportsOAuth =
    providerInfo?.toggleAuthType === "oauth" || providerInfo?.toggleAuthType === "free";
  const subscriptionRisk = providerInfo?.subscriptionRisk === true;

  // ── Phase 1t.3: connection gate + risk-notice modal state ───────────────
  const { showRiskNoticeModal, gateConnectionFlow, handleConfirmRiskNotice, handleCancelRiskNotice } =
    useConnectionGate({ providerId, subscriptionRisk });

  const providerSupportsPat = supportsApiKeyOnFreeProvider(providerId);
  const isOAuth = providerSupportsOAuth && !providerSupportsPat;
  const isFreeNoAuth = NOAUTH_PROVIDERS[providerId]?.noAuth === true;
  const registryModels = getModelsByProviderId(providerId);
  // Prefer synced API-discovered models when available, then merge built-ins
  // and user-managed custom models without duplicating IDs.
  const models = useMemo(() => {
    // Universal: merge built-in registry models with API-synced models and
    // user-managed custom models for ALL providers (was previously Gemini-only).
    // Synced models keep their full property spread so provider-specific fields
    // (e.g. Gemini's `supportedGenerationMethods`) survive into the table.
    const builtInModels = registryModels.map((model) => ({
      ...model,
      source: "system",
    }));

    const registryIds = new Set(builtInModels.map((m) => m.id));
    const syncedExtras = syncedAvailableModels
      .filter((model: any) => model?.id && !registryIds.has(model.id))
      .map((model: any) => ({
        ...model,
        id: model.id,
        name: model.name || model.id,
        source: "imported",
      }));
    const knownIds = new Set([...registryIds, ...syncedExtras.map((model: any) => model.id)]);
    const customExtras = modelMeta.customModels
      .filter((cm: any) => cm.id && !knownIds.has(cm.id))
      .map((cm: any) => ({
        id: cm.id,
        name: cm.name || cm.id,
        source: normalizeModelCatalogSource(cm.source) === "imported" ? "imported" : "custom",
      }));
    const allModels = [...builtInModels, ...syncedExtras, ...customExtras];
    const deduped = new Map<string, (typeof allModels)[0]>();
    for (const m of allModels) {
      if (m.id && !deduped.has(m.id)) deduped.set(m.id, m);
    }
    return Array.from(deduped.values());
  }, [providerId, registryModels, syncedAvailableModels, modelMeta.customModels]);
  const providerAlias = getProviderAlias(providerId);
  const isManagedAvailableModelsProvider = isCompatible || providerId === "openrouter";
  // isSearchProvider declared earlier (before hooks)
  const isUpstreamProxyProvider = providerInfo?.category === "upstream-proxy";
  const compatibleSupportsModelImport = compatibleProviderSupportsModelImport(providerId);

  const providerStorageAlias = isCompatible ? providerId : providerAlias;
  const providerDisplayAlias = isCompatible ? providerNode?.prefix || providerId : providerAlias;

  // ── Phase 1k: model import handlers ─────────────────────────────────────
  const {
    importingModels,
    showImportModal,
    importProgress,
    togglingAutoSync,
    canImportModels,
    isAutoSyncEnabled,
    autoSyncConnection,
    setShowImportModal,
    setImportProgress,
    handleImportModels,
    handleCompatibleImportWithProgress,
    handleToggleAutoSync,
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

  // fetchAliases, handleSetAlias, handleDeleteAlias → hooks/useProviderModels.ts (Phase 1f)
  // fetchProviderModelMeta, fetchProxyConfig, fetchConnections → hooks/useProviderConnections.ts + useProviderModels.ts (Phase 1f)
  // loadCodexSettings, loadClaudeRoutingSettings → hooks/useProviderSettings.ts (Phase 1f)
  // loadConnProxies, handleRetestConnection, handleBatchTestAll, handleBatchRetest → hooks/useProviderConnections.ts (Phase 1f)
  // handleDelete, handleBatchDeleteConfirm, handleBatchSetActive → hooks/useProviderConnections.ts (Phase 1f)
  // handleUpdateConnectionStatus, handleToggleProxyEnabled, handleTogglePerKeyProxyEnabled → hooks/useProviderConnections.ts (Phase 1f)
  // handleDistributeProxies, handleToggleRateLimit, handleToggleClaudeExtraUsage → hooks/useProviderConnections.ts (Phase 1f)
  // handleToggleCliproxyapiMode, handleToggleCodexLimit, handleSwapPriority → hooks/useProviderConnections.ts (Phase 1f)
  // handleToggleClaudeRoutingPreference, handleChangeCodexGlobalServiceMode → hooks/useProviderSettings.ts (Phase 1f)
  // handleRefreshToken → hooks/useProviderConnections.ts (Phase 1f)

  // ── model-related effects (loading gate) ────────────────────────────────
  useEffect(() => {
    if (loading || isSearchProvider) return;
    fetchProviderModelMeta();
    fetchAliases();
  }, [loading, isSearchProvider, fetchProviderModelMeta, fetchAliases]);

  // loadCodexSettings, loadClaudeRoutingSettings → hooks/useProviderSettings.ts (Phase 1f)
  // loadConnProxies → hooks/useProviderConnections.ts (Phase 1f)
  // onTestModel, handleTestAll, saveModelCompatFlags, handleToggleModelHidden,
  // handleBulkToggleModelHidden, handleClearAllModels, providerAliasEntries
  // → hooks/useModelVisibilityHandlers.ts (Phase 1l)

  // handleToggleSelectOne/All, handleBatchDeleteOpenModal/Confirm, handleDelete,
  // handleBatchSetActive → hooks/useProviderConnections.ts (Phase 1f)

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

  const openPrimaryAddFlow = useCallback(() => {
    if (isOAuth) {
      setShowOAuthModal(true);
      return;
    }
    openApiKeyAddFlow();
  }, [isOAuth, openApiKeyAddFlow]);

  // ── Phase 1h: commandCode auth flow ─────────────────────────────────────
  const {
    commandCodeAuthState,
    clearCommandCodeAuthTimer,
    handleCloseAddApiKeyModal,
    handleCommandCodeAuthApply,
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

  // handleUpdateConnectionStatus, handleToggleProxyEnabled, handleTogglePerKeyProxyEnabled,
  // handleDistributeProxies, handleToggleRateLimit, handleToggleClaudeExtraUsage,
  // handleToggleCliproxyapiMode, handleToggleCodexLimit, handleToggleClaudeRoutingPreference,
  // handleChangeCodexGlobalServiceMode, handleRetestConnection, runBatchTest,
  // handleBatchTestAll, handleBatchRetest, parseApiErrorMessage, getAttachmentFilename,
  // handleRefreshToken → hooks/useProviderConnections.ts + useProviderSettings.ts (Phase 1f)

  // handleToggleProxyEnabled → useProviderConnections (Phase 1f)

  // handleTogglePerKeyProxyEnabled → useProviderConnections (Phase 1f)

  // handleDistributeProxies → useProviderConnections (Phase 1f)

  // handleToggleRateLimit → useProviderConnections (Phase 1f)

  // handleToggleClaudeExtraUsage → useProviderConnections (Phase 1f)

  // [cpaProviderEnabled] state + useEffect + handleToggleCliproxyapiMode → useProviderConnections (Phase 1f)

  // handleToggleCodexLimit → useProviderConnections (Phase 1f)

  // handleToggleClaudeRoutingPreference + handleChangeCodexGlobalServiceMode → useProviderSettings (Phase 1f)

  // handleRetestConnection, runBatchTest, handleBatchTestAll, handleBatchRetest,
  // [refreshingId], parseApiErrorMessage, getAttachmentFilename, handleRefreshToken
  // → useProviderConnections (Phase 1f)

  // Phase 1j: auth file handlers extracted to hooks/useAuthFileHandlers.ts
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
    applyingGeminiAuthId,
    applyGeminiModalConnectionId,
    setApplyGeminiModalConnectionId,
    exportingGeminiAuthId,
    handleApplyGeminiAuthLocal,
    handleExportGeminiAuthFile,
  } = useAuthFileHandlers({ parseApiErrorMessage, getAttachmentFilename, notify, t });

  // handleSwapPriority → useProviderConnections (Phase 1f)
  // handleImportModels, handleCompatibleImportWithProgress, handleToggleAutoSync,
  // canImportModels, isAutoSyncEnabled, autoSyncConnection → hooks/useModelImportHandlers.ts (Phase 1k)

  // Phase 1e: compat-state derivations moved to useModelCompatState hook.
  const compat = useModelCompatState(
    modelMeta.customModels,
    modelMeta.modelCompatOverrides
  );
  const { customMap, overrideMap } = compat;
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

  // renderModelsSection → components/ProviderModelsSection.tsx (Phase 1m)


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
      {/* Header — Phase 1t.1: extracted to components/ProviderPageHeader.tsx */}
      <ProviderPageHeader
        providerId={providerId}
        providerInfo={providerInfo}
        connectionsCount={connections.length}
        isOpenAICompatible={isOpenAICompatible}
        isAnthropicProtocolCompatible={isAnthropicProtocolCompatible}
        onOpenTutorial={() => setShowTutorialModal(true)}
        t={t}
      />

      {providerId === "zed" && <ZedImportCard fetchConnections={fetchConnections} notify={notify} />}

      {/* CompatibleNodeCard — Phase 1t.2: extracted to components/CompatibleNodeCard.tsx */}
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

      {/* Connections */}
      {!isUpstreamProxyProvider && isFreeNoAuth && providerId === "mimocode" && (
        <NoAuthAccountCard
          providerId={providerId}
          providerName="MiMoCode"
          generateAccountId={() => crypto.randomUUID().replace(/-/g, "")}
        />
      )}
      {!isUpstreamProxyProvider && isFreeNoAuth && providerId === "opencode" && (
        <NoAuthAccountCard
          providerId={providerId}
          providerName="OpenCode"
          generateAccountId={() => crypto.randomUUID().replace(/-/g, "")}
        />
      )}
      {!isUpstreamProxyProvider &&
        isFreeNoAuth &&
        providerId !== "mimocode" &&
        providerId !== "opencode" && <NoAuthProviderCard />}
      {!isUpstreamProxyProvider && !isFreeNoAuth && (
        <Card>
          <ConnectionsHeaderToolbar
            providerId={providerId}
            providerInfo={providerInfo}
            isCompatible={isCompatible}
            isCommandCode={isCommandCode}
            isOAuth={isOAuth}
            providerSupportsPat={providerSupportsPat}
            connections={connections}
            batchTesting={batchTesting}
            batchRetesting={batchRetesting}
            retestingId={retestingId}
            distributingProxies={distributingProxies}
            proxyConfig={proxyConfig}
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
            openExternalLinkFlow={openExternalLinkFlow}
            handleOpenCommandCodeConnect={handleOpenCommandCodeConnect}
            commandCodeAuthState={commandCodeAuthState}
            onOpenOAuthModal={() => setShowOAuthModal(true)}
            onOpenCodexCliGuide={() => setCodexCliGuideOpen(true)}
            onOpenImportCodex={() => setImportCodexModalOpen(true)}
            onOpenImportClaude={() => setImportClaudeModalOpen(true)}
            onOpenImportGemini={() => setImportGeminiModalOpen(true)}
            t={t}
          />

          {connections.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <span className="material-symbols-outlined text-[32px]">
                  {isOAuth ? "lock" : "key"}
                </span>
              </div>
              <p className="text-text-main font-medium mb-1">{t("noConnectionsYet")}</p>
              <p className="text-sm text-text-muted mb-4">{t("addFirstConnectionHint")}</p>
              {!isCompatible && (
                <div className="flex items-center justify-center gap-2">
                  {isCommandCode ? (
                    <>
                      <Button
                        icon="open_in_new"
                        loading={
                          commandCodeAuthState.phase === "starting" ||
                          commandCodeAuthState.phase === "polling" ||
                          commandCodeAuthState.phase === "applying"
                        }
                        onClick={() => gateConnectionFlow(handleOpenCommandCodeConnect)}
                      >
                        Connect
                      </Button>
                      <Button
                        variant="secondary"
                        icon="add"
                        onClick={() => gateConnectionFlow(openApiKeyAddFlow)}
                      >
                        Manual API key
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button icon="add" onClick={() => gateConnectionFlow(openPrimaryAddFlow)}>
                        {providerSupportsPat ? "Add PAT" : t("addConnection")}
                      </Button>
                      {providerId === "qoder" && (
                        <Button
                          variant="secondary"
                          onClick={() => gateConnectionFlow(() => setShowOAuthModal(true))}
                        >
                          Experimental OAuth
                        </Button>
                      )}
                      {providerId === "codex" && (
                        <Button
                          variant="secondary"
                          icon="upload_file"
                          onClick={() => gateConnectionFlow(() => setImportCodexModalOpen(true))}
                        >
                          {typeof t.has === "function" && t.has("importCodexAuth")
                            ? t("importCodexAuth")
                            : "Import auth"}
                        </Button>
                      )}
                      {providerId === "claude" && (
                        <Button
                          variant="secondary"
                          icon="upload_file"
                          onClick={() => gateConnectionFlow(() => setImportClaudeModalOpen(true))}
                        >
                          {typeof t.has === "function" && t.has("importClaudeAuth")
                            ? t("importClaudeAuth")
                            : "Import auth"}
                        </Button>
                      )}
                      {providerId === "gemini-cli" && (
                        <Button
                          variant="secondary"
                          icon="upload_file"
                          onClick={() => gateConnectionFlow(() => setImportGeminiModalOpen(true))}
                        >
                          {typeof t.has === "function" && t.has("importGeminiAuth")
                            ? t("importGeminiAuth")
                            : "Import auth"}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
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
              PAGE_SIZE={PAGE_SIZE}
              connProxyMap={connProxyMap}
              proxyConfig={proxyConfig}
              applyingCodexAuthId={applyingCodexAuthId}
              exportingCodexAuthId={exportingCodexAuthId}
              applyingClaudeAuthId={applyingClaudeAuthId}
              exportingClaudeAuthId={exportingClaudeAuthId}
              applyingGeminiAuthId={applyingGeminiAuthId}
              exportingGeminiAuthId={exportingGeminiAuthId}
              emailsVisible={emailsVisible}
              setSelectedIds={setSelectedIds}
              setPage={setPage}
              setHealthFilter={setHealthFilter}
              handleDelete={handleDelete}
              handleUpdateConnectionStatus={handleUpdateConnectionStatus}
              handleToggleRateLimit={handleToggleRateLimit}
              handleToggleClaudeExtraUsage={handleToggleClaudeExtraUsage}
              handleToggleCliproxyapiMode={handleToggleCliproxyapiMode}
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
              onOpenApplyGeminiModal={setApplyGeminiModalConnectionId}
              onExportGeminiAuthFile={handleExportGeminiAuthFile}
              gateConnectionFlow={gateConnectionFlow}
              t={t}
            />
          )}
        </Card>
      )}
      {isUpstreamProxyProvider && (
        <Card>
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                {providerText(
                  t,
                  "upstreamProxyManagedTitle",
                  "Managed via Upstream Proxy Settings"
                )}
              </h2>
              <p className="text-sm text-text-muted mt-1">
                {providerText(
                  t,
                  "upstreamProxyManagedDescription",
                  "CLIProxyAPI is configured as an upstream proxy layer, not as a direct provider connection. Manage the binary/runtime in CLI Tools and enable proxy routing on each provider via the provider proxy controls."
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/cli-code"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-main hover:border-primary/40 hover:text-text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">terminal</span>
                {t("openCliTools")}
              </Link>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-main hover:border-primary/40 hover:text-text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">settings</span>
                {t("openSettings")}
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Models — hidden for search providers (they don't have models) */}
      {!isSearchProvider && !isUpstreamProxyProvider && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">{t("availableModels")}</h2>
          {/* Phase 1m: extracted to components/ProviderModelsSection.tsx */}
          <ProviderModelsSection
            providerId={providerId}
            providerAlias={providerAlias}
            providerStorageAlias={providerStorageAlias}
            providerDisplayAlias={providerDisplayAlias}
            providerInfo={providerInfo}
            isCcCompatible={isCcCompatible}
            isAnthropicCompatible={isAnthropicCompatible}
            isAnthropicProtocolCompatible={isAnthropicProtocolCompatible}
            isManagedAvailableModelsProvider={isManagedAvailableModelsProvider}
            compatibleSupportsModelImport={compatibleSupportsModelImport}
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
            handleCompatibleImportWithProgress={handleCompatibleImportWithProgress}
            compatSavingModelId={compatSavingModelId}
            togglingModelId={togglingModelId}
            bulkVisibilityAction={bulkVisibilityAction}
            clearingModels={clearingModels}
            modelFilter={modelFilter}
            testingModelId={testingModelId}
            modelTestStatus={modelTestStatus}
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
          />
        </Card>
      )}

      {/* Search provider info */}
      {isSearchProvider && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">{t("searchProvider")}</h2>
          <p className="text-sm text-text-muted">{t("searchProviderDesc")}</p>
          {providerId === "perplexity-search" && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="material-symbols-outlined text-sm text-blue-400">link</span>
              <p className="text-xs text-blue-300">{t("perplexitySearchSharedKeyInfo")}</p>
            </div>
          )}
          {providerId === "google-pse-search" && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="material-symbols-outlined text-sm text-amber-300">tune</span>
              <p className="text-xs text-amber-200">{t("googlePseInfo")}</p>
            </div>
          )}
          {providerId === "searxng-search" && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="material-symbols-outlined text-sm text-emerald-300">dns</span>
              <p className="text-xs text-emerald-200">{t("searxngInfo")}</p>
            </div>
          )}
        </Card>
      )}

      {/* Playground panel — rendered for providers that declare serviceKinds */}
      <ProviderPlaygroundPanel providerId={providerId} />

      {/* Modals — Phase 1t.5: extracted to components/ProviderModalsPanel.tsx */}
      <ProviderModalsPanel
        providerId={providerId}
        providerInfo={providerInfo}
        isCompatible={isCompatible}
        isAnthropicProtocolCompatible={isAnthropicProtocolCompatible}
        isCcCompatible={isCcCompatible}
        isCommandCode={isCommandCode}
        isUpstreamProxyProvider={isUpstreamProxyProvider}
        subscriptionRisk={subscriptionRisk}
        showRiskNoticeModal={showRiskNoticeModal}
        handleConfirmRiskNotice={handleConfirmRiskNotice}
        handleCancelRiskNotice={handleCancelRiskNotice}
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
        applyGeminiModalConnectionId={applyGeminiModalConnectionId}
        setApplyGeminiModalConnectionId={setApplyGeminiModalConnectionId}
        applyingGeminiAuthId={applyingGeminiAuthId}
        handleApplyGeminiAuthLocal={handleApplyGeminiAuthLocal}
        importGeminiModalOpen={importGeminiModalOpen}
        setImportGeminiModalOpen={setImportGeminiModalOpen}
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
    </div>
  );
}

// ModelRow, ModelVisibilityToolbar, PassthroughModelsSection, PassthroughModelRow,
// CustomModelsSection, CompatibleModelsSection → components/ (Phase 1e — Issue #3501)

// Phase 1d: CooldownTimer, inferErrorType, getStatusPresentation, ConnectionRow → components/ConnectionRow.tsx
// Phase 1d: ModelCompatPopover, recordToHeaderRows → components/ModelCompatPopover.tsx
// Phase 1d: SiliconFlowEndpointModal → components/SiliconFlowEndpointModal.tsx
