"use client";

// Issue #3501 strangler-fig decomposition — Phase 1t (final push)
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, Button, CardSkeleton } from "@/shared/components";
import {
  NOAUTH_PROVIDERS,
  getProviderAlias,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  supportsApiKeyOnFreeProvider,
} from "@/shared/constants/providers";
import { getModelsByProviderId } from "@/shared/constants/models";
import {
  compatibleProviderSupportsModelImport,
  getCompatibleFallbackModels,
} from "@/lib/providers/managedAvailableModels";
import { getProviderServiceKinds } from "@/lib/providers/serviceKindIndex";
import { providerLacksModelListing } from "@/lib/providers/modelListingCapability";
import { normalizeModelCatalogSource } from "@/shared/utils/modelCatalogSearch";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { useNotificationStore } from "@/store/notificationStore";
import { resolveDashboardProviderInfo } from "../providerPageUtils";
import { type ConnectionRowConnection } from "./components/ConnectionRow";
import { useProviderConnections } from "./hooks/useProviderConnections";
import { useProviderSettings } from "./hooks/useProviderSettings";
import { useProviderModels } from "./hooks/useProviderModels";
import { useCommandCodeAuth } from "./hooks/useCommandCodeAuth";
import { useExternalLinkFlow } from "./hooks/useExternalLinkFlow";
import { useAuthFileHandlers } from "./hooks/useAuthFileHandlers";
import { useModelImportHandlers } from "./hooks/useModelImportHandlers";
import { useApiKeySave } from "./hooks/useApiKeySave";
import { useModelVisibilityHandlers } from "./hooks/useModelVisibilityHandlers";
import { useModelCompatState } from "./hooks/useModelCompatState";
import { useConnectionGate } from "./hooks/useConnectionGate";
import { useProviderNodeActions } from "./hooks/useProviderNodeActions";
import ProviderPlaygroundPanel from "./components/ProviderPlaygroundPanel";
import ProviderModelsSection from "./components/ProviderModelsSection";
import CustomModelsSection from "./components/CustomModelsSection";
import ConnectionsListPanel from "./components/ConnectionsListPanel";
import ConnectionsHeaderToolbar from "./components/ConnectionsHeaderToolbar";
import ZedImportCard from "./components/ZedImportCard";
import ProviderPageHeader from "./components/ProviderPageHeader";
import CompatibleNodeCard from "./components/CompatibleNodeCard";
import ProviderModalsPanel from "./components/ProviderModalsPanel";
import EmptyConnectionsPlaceholder from "./components/EmptyConnectionsPlaceholder";
import UpstreamProxyCard from "./components/UpstreamProxyCard";
import SearchProviderCard from "./components/SearchProviderCard";
import NoAuthProviderControls from "./components/NoAuthProviderControls";
// providerText used by UpstreamProxyCard (Phase 1t.7)

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
  const [importGrokCliModalOpen, setImportGrokCliModalOpen] = useState(false);
  const isOpenAICompatible = isOpenAICompatibleProvider(providerId);
  const isCcCompatible = isClaudeCodeCompatibleProvider(providerId);
  const isCommandCode = providerId === "command-code";
  const isAnthropicCompatible =
    isAnthropicCompatibleProvider(providerId) && !isClaudeCodeCompatibleProvider(providerId);
  const isCompatible = isOpenAICompatible || isAnthropicCompatible || isCcCompatible;
  const isAnthropicProtocolCompatible = isAnthropicCompatible || isCcCompatible;
  // #5420: hide model listing for tool-only providers (web search / web fetch),
  // not just `-search`-suffixed ids. Declared serviceKinds come from the static
  // provider catalog (e.g. firecrawl → ["webFetch"]); compatible providers resolve
  // to null here and fall through to the empty-kinds check (model listing stays on).
  const declaredServiceKinds = (
    resolveDashboardProviderInfo(providerId) as { serviceKinds?: readonly string[] } | null
  )?.serviceKinds;
  const isSearchProvider = providerLacksModelListing(
    providerId,
    getProviderServiceKinds(providerId, declaredServiceKinds)
  );

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
  const {
    showRiskNoticeModal,
    gateConnectionFlow,
    handleConfirmRiskNotice,
    handleCancelRiskNotice,
  } = useConnectionGate({ providerId, subscriptionRisk });

  const providerSupportsPat = supportsApiKeyOnFreeProvider(providerId);
  const isOAuth = providerSupportsOAuth && !providerSupportsPat;
  const providerAlias = getProviderAlias(providerId);
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

      {providerId === "zed" && (
        <ZedImportCard fetchConnections={fetchConnections} notify={notify} />
      )}

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
      {!isUpstreamProxyProvider && isFreeNoAuth && (
        <NoAuthProviderControls
          providerId={providerId}
          providerName={providerInfo?.name || providerId}
        />
      )}
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
            onOpenImportGrokCli={() => setImportGrokCliModalOpen(true)}
            t={t}
          />

          {connections.length === 0 ? (
            <EmptyConnectionsPlaceholder
              isOAuth={isOAuth}
              isCompatible={isCompatible}
              isCommandCode={isCommandCode}
              providerId={providerId}
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
              gateConnectionFlow={gateConnectionFlow}
              t={t}
            />
          )}
        </Card>
      )}
      {isUpstreamProxyProvider && <UpstreamProxyCard t={t} />}

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
          />
        </Card>
      )}

      {/* Search provider info */}
      {isSearchProvider && <SearchProviderCard providerId={providerId} t={t} />}

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
    </div>
  );
}
