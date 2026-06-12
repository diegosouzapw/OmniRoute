"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
// Phase 1f extractions — Issue #3501
import { useProviderConnections } from "./hooks/useProviderConnections";
import { useProviderSettings } from "./hooks/useProviderSettings";
import { useProviderModels } from "./hooks/useProviderModels";
// Phase 1h: commandCode auth flow extracted to hooks/useCommandCodeAuth.ts
import { useCommandCodeAuth } from "./hooks/useCommandCodeAuth";
// Phase 1i: external link flow extracted to hooks/useExternalLinkFlow.ts
import { useExternalLinkFlow } from "./hooks/useExternalLinkFlow";
import ExternalLinkModal from "./components/ExternalLinkModal";
// Phase 1j: auth file handlers extracted to hooks/useAuthFileHandlers.ts
import { useAuthFileHandlers } from "./hooks/useAuthFileHandlers";
// Phase 1g: ProviderPlaygroundPanel + helpers extracted to components/ProviderPlaygroundPanel.tsx
import ProviderPlaygroundPanel from "./components/ProviderPlaygroundPanel";
import { useNotificationStore } from "@/store/notificationStore";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Card,
  Button,
  Badge,
  Modal,
  ConfirmModal,
  CardSkeleton,
  OAuthModal,
  KiroOAuthWrapper,
  CursorAuthModal,
  TraeAuthModal,
  Toggle,
  Select,
  ProxyConfigModal,
  NoAuthProviderCard,
  NoAuthAccountCard,
} from "@/shared/components";
import {
  LOCAL_PROVIDERS,
  NOAUTH_PROVIDERS,
  getProviderAlias,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  isSelfHostedChatProvider,
  supportsApiKeyOnFreeProvider,
  // providerAllowsOptionalApiKey + supportsBulkApiKey used by extracted AddApiKeyModal
} from "@/shared/constants/providers";
// antigravityClientProfile + parseBulkApiKeys used by extracted modals (AddApiKeyModal, EditConnectionModal)
import { getModelsByProviderId } from "@/shared/constants/models";
import {
  compatibleProviderSupportsModelImport,
  getCompatibleFallbackModels,
} from "@/lib/providers/managedAvailableModels";
import {
  matchesModelCatalogQuery,
  normalizeModelCatalogSource,
} from "@/shared/utils/modelCatalogSearch";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import EmailPrivacyToggle from "@/shared/components/EmailPrivacyToggle";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { type CodexServiceTier } from "@/lib/providers/requestDefaults";
import { type CodexGlobalServiceMode } from "@/lib/providers/codexFastTier";
// parseExtraApiKeys used by extracted EditConnectionModal
import { compareTr } from "@/shared/utils/turkishText";
import RiskNoticeModal from "../components/RiskNoticeModal";
import CodexCliGuideModal from "../components/CodexCliGuideModal";
import { isRiskAcknowledged, useRiskAcknowledged } from "../hooks/useRiskAcknowledged";
import { resolveDashboardProviderInfo } from "../providerPageUtils";
// webSessionCredentials used by extracted modals (AddApiKeyModal, EditConnectionModal)
import {
  ImportCodexAuthModal,
  ApplyCodexAuthModal,
} from "./components/modals/ImportCodexAuthModal";
import {
  ImportClaudeAuthModal,
  ApplyClaudeAuthModal,
} from "./components/modals/ImportClaudeAuthModal";
import {
  ImportGeminiAuthModal,
  ApplyGeminiAuthModal,
} from "./components/modals/ImportGeminiAuthModal";

import EditCompatibleNodeModal from "./components/modals/EditCompatibleNodeModal";
import AddApiKeyModal from "./components/modals/AddApiKeyModal";
import EditConnectionModal from "./components/modals/EditConnectionModal";
import WebSessionCredentialGuide from "./components/WebSessionCredentialGuide";
// Phase 1d extractions — Issue #3501
import ConnectionRow, {
  type ConnectionRowConnection,
} from "./components/ConnectionRow";
import ModelCompatPopover from "./components/ModelCompatPopover";
import SiliconFlowEndpointModal from "./components/SiliconFlowEndpointModal";
import { CC_COMPATIBLE_DEFAULT_CHAT_PATH } from "./providerDetailConstants";
import {
  // CONFIGURABLE_BASE_URL_PROVIDERS, DEFAULT_PROVIDER_BASE_URLS, getLocalProviderMetadata,
  // isBaseUrlConfigurableProvider, getProviderBaseUrlDefault, getProviderBaseUrlHint,
  // getProviderBaseUrlPlaceholder, isGlmProvider, parseRoutingTagsInput, parseExcludedModelsInput,
  // formatRoutingTagsInput, formatExcludedModelsInput, getWebSessionCredentialLabel,
  // getWebSessionCredentialHint, getWebSessionCredentialCheckLabel, getAddCredentialModalTitle,
  // CODEX_REASONING_STRENGTH_OPTIONS, CODEX_ACCOUNT_SERVICE_TIER_VALUES, getCodexRequestDefaults,
  // getClaudeCodeCompatibleRequestDefaults, extractCommandCodeCredentialInput,
  // normalizeAndValidateHttpBaseUrl, formatTimeAgo
  // — all moved to extracted modals (AddApiKeyModal, EditConnectionModal, WebSessionCredentialGuide)
  providerText,
  providerCountText,
  readBooleanToggle,
  formatProviderModelsErrorResponse,
  type ProviderMessageTranslator,
  type LocalProviderMetadata,
  // CommandCodeAuthFlowState moved to hooks/useCommandCodeAuth.ts (Phase 1h)
  type CompatByProtocolMap,
  type CompatModelRow,
  type CompatModelMap,
} from "./providerPageHelpers";
// CODEX_GLOBAL_SERVICE_MODE_VALUES, getCodexServiceTierLabel, normalizeCodexLimitPolicy
// moved to hooks/useProviderSettings.ts + hooks/useProviderConnections.ts (Phase 1f)
// Phase 1e extractions — Issue #3501
import { useModelCompatState } from "./hooks/useModelCompatState";
import ModelRow, { ModelVisibilityToolbar } from "./components/ModelRow";
import PassthroughModelsSection from "./components/PassthroughModelsSection";
import CustomModelsSection from "./components/CustomModelsSection";
import CompatibleModelsSection from "./components/CompatibleModelsSection";
// recordToHeaderRows moved to components/ModelCompatPopover.tsx (Phase 1d)
// buildCompatMap, isModelHidden*, effectiveNormalize/Preserve*, anyNormalize/NoPreserveCompatBadge
// moved to providerPageHelpers.ts + hook useModelCompatState (Phase 1e)
// formatProviderModelsErrorResponse moved to providerPageHelpers.ts (Phase 1e)

/** PATCH fields for provider model compat (matches API + `ModelCompatPerProtocol` shape). */
type ModelCompatSavePatch = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  upstreamHeaders?: Record<string, string>;
  compatByProtocol?: CompatByProtocolMap;
  isHidden?: boolean;
};

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
  const router = useRouter();
  const providerId = params.id as string;

  // ── UI-only modal state (not owned by hooks) ─────────────────────────────
  const [showOAuthModal, _setShowOAuthModal] = useState(false);
  const [reauthConnection, setReauthConnection] = useState<ConnectionRowConnection | null>(null);
  const [showAddApiKeyModal, setShowAddApiKeyModal] = useState(false);
  const [showSiliconFlowEndpointModal, setShowSiliconFlowEndpointModal] = useState(false);
  const [siliconFlowInitialBaseUrl, setSiliconFlowInitialBaseUrl] = useState<string | undefined>();
  const [showRiskNoticeModal, setShowRiskNoticeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditNodeModal, setShowEditNodeModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [proxyTarget, setProxyTarget] = useState(null);
  const [importingModels, setImportingModels] = useState(false);
  const [importingZed, setImportingZed] = useState(false);
  const [showZedManual, setShowZedManual] = useState(false);
  const [zedManualProvider, setZedManualProvider] = useState("openai");
  const [zedManualToken, setZedManualToken] = useState("");
  const [importingZedManual, setImportingZedManual] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importProgress, setImportProgress] = useState({
    current: 0,
    total: 0,
    phase: "idle" as "idle" | "fetching" | "importing" | "done" | "error",
    status: "",
    logs: [] as string[],
    error: "",
    importedCount: 0,
  });
  const [compatSavingModelId, setCompatSavingModelId] = useState<string | null>(null);
  const [modelFilter, setModelFilter] = useState("");
  const [togglingModelId, setTogglingModelId] = useState<string | null>(null);
  const [testingModelId, setTestingModelId] = useState<string | null>(null);
  const [modelTestStatus, setModelTestStatus] = useState<Record<string, "ok" | "error">>({});
  const [testingAll, setTestingAll] = useState(false);
  const [testProgress, setTestProgress] = useState<{ done: number; total: number } | null>(null);
  const [autoHideFailed, setAutoHideFailed] = useState(true);
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "visible" | "hidden">("all");
  const [bulkVisibilityAction, setBulkVisibilityAction] = useState<"select" | "deselect" | null>(
    null
  );
  const [importCodexModalOpen, setImportCodexModalOpen] = useState(false);
  const [codexCliGuideOpen, setCodexCliGuideOpen] = useState(false);
  const [importClaudeModalOpen, setImportClaudeModalOpen] = useState(false);
  const [importGeminiModalOpen, setImportGeminiModalOpen] = useState(false);
  const pendingRiskActionRef = useRef<(() => void) | null>(null);
  const { acknowledged: riskAcknowledged, acknowledge: acknowledgeRisk } =
    useRiskAcknowledged(providerId);
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

  const getApiLabel = () => {
    if (isAnthropicProtocolCompatible) return t("messagesApi");
    const type = providerNode?.apiType;
    switch (type) {
      case "responses":
        return t("responsesApi");
      case "embeddings":
        return t("embeddings");
      case "audio-transcriptions":
        return t("audioTranscriptions");
      case "audio-speech":
        return t("audioSpeech");
      case "images-generations":
        return t("imagesGenerations");
      default:
        return t("chatCompletions");
    }
  };

  const getApiDefaultPath = () => {
    if (isCcCompatible) return CC_COMPATIBLE_DEFAULT_CHAT_PATH;
    if (isAnthropicCompatible) return "/messages";
    const type = providerNode?.apiType;
    switch (type) {
      case "responses":
        return "/responses";
      case "embeddings":
        return "/embeddings";
      case "audio-transcriptions":
        return "/audio/transcriptions";
      case "audio-speech":
        return "/audio/speech";
      case "images-generations":
        return "/images/generations";
      default:
        return "/chat/completions";
    }
  };

  const getApiPath = () => {
    const defaultPath = getApiDefaultPath();
    return (providerNode?.chatPath || defaultPath).replace(/^\//, "");
  };

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

  const handleUpdateNode = async (formData: any) => {
    try {
      const res = await fetch(`/api/provider-nodes/${providerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setProviderNode(data.node);
        await fetchConnections();
        setShowEditNodeModal(false);
      }
    } catch (error) {
      console.log("Error updating provider node:", error);
    }
  };

  const handleZedImport = useCallback(async () => {
    if (importingZed) return;
    setImportingZed(true);
    try {
      const res = await fetch("/api/providers/zed/import", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.zedDockerEnvironment) {
          setShowZedManual(true);
        }
        notify.error(data.error || "Zed import failed");
      } else if (!data.count) {
        const found = data.credentials?.length ?? 0;
        if (found === 0) {
          notify.info("No Zed credentials found in keychain");
        } else {
          notify.info(
            `Found ${found} keychain credential(s), but none matched supported providers`
          );
        }
      } else {
        notify.success(
          `Imported ${data.count} credential(s) from Zed for ${data.providers?.length ?? 0} provider(s)`
        );
        await fetchConnections();
      }
    } catch (e: any) {
      notify.error(e?.message || "Zed import failed");
    } finally {
      setImportingZed(false);
    }
  }, [importingZed, notify, fetchConnections]);

  const handleZedManualImport = useCallback(async () => {
    if (importingZedManual || !zedManualToken.trim()) return;
    setImportingZedManual(true);
    try {
      const res = await fetch("/api/providers/zed/manual-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: zedManualProvider, token: zedManualToken.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        notify.error(data.error?.message ?? data.error ?? "Manual import failed");
      } else {
        notify.success(`Imported ${zedManualProvider} token from Zed`);
        setZedManualToken("");
        await fetchConnections();
      }
    } catch (e: any) {
      notify.error(e?.message || "Manual import failed");
    } finally {
      setImportingZedManual(false);
    }
  }, [importingZedManual, zedManualProvider, zedManualToken, notify, fetchConnections]);

  // loadCodexSettings, loadClaudeRoutingSettings → hooks/useProviderSettings.ts (Phase 1f)
  // loadConnProxies → hooks/useProviderConnections.ts (Phase 1f)

  const onTestModel = async (modelId: string, fullModel: string) => {
    setTestingModelId(modelId);
    setModelTestStatus((prev) => ({ ...prev, [modelId]: undefined }));
    try {
      const res = await fetch("/api/models/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId: selectedConnection?.provider || providerNode?.id || providerId,
          modelId: fullModel,
          connectionId: selectedConnection?.id,
        }),
      });
      const data = await res.json();
      if (res.ok && data.status === "ok") {
        notify.success(
          providerText(
            t,
            "testModelSuccess",
            `Model ${modelId} is working. Latency: ${data.latencyMs}ms`,
            { modelId, latencyMs: data.latencyMs }
          )
        );
        setModelTestStatus((prev) => ({ ...prev, [modelId]: "ok" }));
      } else {
        notify.error(data.error || "Model test failed");
        setModelTestStatus((prev) => ({ ...prev, [modelId]: "error" }));
        if (handleToggleModelHidden) {
          await handleToggleModelHidden(providerStorageAlias, modelId, true);
        }
      }
    } catch (err) {
      notify.error("Network error testing model");
      setModelTestStatus((prev) => ({ ...prev, [modelId]: "error" }));
      if (handleToggleModelHidden) {
        await handleToggleModelHidden(providerStorageAlias, modelId, true);
      }
    } finally {
      setTestingModelId(null);
    }
  };

  const handleTestAll = async (
    targets: Array<{ modelId: string; fullModel: string }>
  ): Promise<void> => {
    if (testingAll) return;
    if (targets.length === 0) {
      notify.error(providerText(t, "noModelsToTest", "No models to test"));
      return;
    }
    setTestingAll(true);
    setTestProgress({ done: 0, total: targets.length });

    let ok = 0;
    let error = 0;
    let hiddenCount = 0;

    const CHUNK_SIZE = 3;
    for (let i = 0; i < targets.length; i += CHUNK_SIZE) {
      const chunk = targets.slice(i, i + CHUNK_SIZE);
      await Promise.all(
        chunk.map(async ({ modelId, fullModel }) => {
          try {
            const result: {
              results?: Record<
                string,
                {
                  status?: "ok" | "error";
                  rateLimited?: boolean;
                  isTimeout?: boolean;
                  error?: string;
                }
              >;
            } = await fetch("/api/models/test-all", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                providerId: providerId,
                connectionId: selectedConnection?.id,
                modelIds: [fullModel],
              }),
            }).then((r) => r.json());

            const entry = result.results?.[fullModel];
            if (entry?.status === "ok") {
              ok++;
            } else {
              error++;
              if (autoHideFailed && !entry?.rateLimited && !entry?.isTimeout) {
                await handleToggleModelHidden(providerStorageAlias, modelId, true);
                hiddenCount++;
              }
            }
          } catch (e) {
            error++;
          }
          setTestProgress((prev) => (prev ? { done: prev.done + 1, total: prev.total } : null));
        })
      );
    }

    notify.info(providerText(t, "testAllResults", "{ok} ok, {error} error", { ok, error }));
    if (hiddenCount > 0) {
      notify.info(providerText(t, "testAllFailedHidden", "{count} hidden", { count: hiddenCount }));
    }
    setTestingAll(false);
    setTestProgress(null);
  };

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

  const gateConnectionFlow = useCallback(
    (callback: () => void) => {
      if (subscriptionRisk && !riskAcknowledged && !isRiskAcknowledged(providerId)) {
        pendingRiskActionRef.current = callback;
        setShowRiskNoticeModal(true);
        return;
      }
      callback();
    },
    [providerId, riskAcknowledged, subscriptionRisk]
  );

  const handleConfirmRiskNotice = useCallback(() => {
    acknowledgeRisk();
    setShowRiskNoticeModal(false);
    const pendingAction = pendingRiskActionRef.current;
    pendingRiskActionRef.current = null;
    pendingAction?.();
  }, [acknowledgeRisk]);

  const handleCancelRiskNotice = useCallback(() => {
    pendingRiskActionRef.current = null;
    setShowRiskNoticeModal(false);
  }, []);

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

  const handleSaveApiKey = async (formData) => {
    try {
      const res = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerId, ...formData }),
      });
      if (res.ok) {
        const connectionData = await res.json();
        const newConnection = connectionData?.connection;
        await fetchConnections();
        setShowAddApiKeyModal(false);
        setSiliconFlowInitialBaseUrl(undefined);

        // Universal: sync models from the provider endpoint on every new connection
        // (was previously Gemini-only). Do NOT re-introduce a providerId guard here.
        if (newConnection?.id) {
          setShowImportModal(true);
          setImportProgress({
            current: 0,
            total: 0,
            phase: "fetching",
            status: t("fetchingModels"),
            logs: [],
            error: "",
            importedCount: 0,
          });

          try {
            const syncRes = await fetch(`/api/providers/${newConnection.id}/sync-models`, {
              method: "POST",
              signal: AbortSignal.timeout(30_000), // 30s timeout — model sync shouldn't hang
            });
            const syncData = await syncRes.json();

            if (!syncRes.ok || syncData.error) {
              setImportProgress((prev) => ({
                ...prev,
                phase: "error",
                status: t("failedFetchModels"),
                error: syncData.error?.message || syncData.error || t("failedImportModels"),
              }));
              return null;
            }

            const syncedCount = syncData.syncedModels || 0;
            const availableCount =
              typeof syncData.availableModelsCount === "number"
                ? syncData.availableModelsCount
                : Array.isArray(syncData.models)
                  ? syncData.models.length
                  : syncedCount;
            const syncedModelList: Array<{ id: string; name?: string }> = syncData.models || [];
            const logs: string[] = [];
            if (syncedModelList.length > 0) {
              logs.push(`✓ ${availableCount} models available`);
              logs.push("");
              for (const m of syncedModelList) {
                logs.push(`  ${m.name || m.id}`);
              }
            }

            setImportProgress((prev) => ({
              ...prev,
              phase: "done",
              status: t("modelsImported", { count: availableCount }),
              total: availableCount,
              current: availableCount,
              importedCount: availableCount,
              logs,
            }));

            await fetchProviderModelMeta();
          } catch (syncError) {
            setImportProgress((prev) => ({
              ...prev,
              phase: "error",
              status: t("failedFetchModels"),
              error: String(syncError),
            }));
          }
        }
        return null;
      }
      const data = await res.json().catch(() => ({}));
      const errorMsg = data.error?.message || data.error || t("failedSaveConnection");
      return errorMsg;
    } catch (error) {
      console.log("Error saving connection:", error);
      return t("failedSaveConnectionRetry");
    }
  };

  const handleUpdateConnection = async (formData) => {
    try {
      const res = await fetch(`/api/providers/${selectedConnection.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await fetchConnections();
        setShowEditModal(false);
        return null;
      }
      const data = await res.json().catch(() => ({}));
      return data.error?.message || data.error || t("failedSaveConnection");
    } catch (error) {
      console.log("Error updating connection:", error);
      return t("failedSaveConnectionRetry");
    }
  };

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

  const handleImportModels = async () => {
    if (importingModels) return;
    const activeConnection = connections.find((conn) => conn.isActive !== false);
    // #3047 — no-auth providers (e.g. OpenCode Free) have no connection rows;
    // fall back to the provider id so the models route can serve the public
    // catalog instead of the button silently doing nothing.
    if (!activeConnection && !isFreeNoAuth) return;
    const importTargetId = activeConnection?.id ?? providerId;

    setImportingModels(true);
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      const res = await fetch(`/api/providers/${importTargetId}/models?refresh=true`);
      const data = await res.json();
      if (!res.ok) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "error",
          status: t("failedFetchModels"),
          error: data.error || t("failedImportModels"),
        }));
        return;
      }
      const fetchedModels = data.models || [];
      if (fetchedModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("noModelsFound"),
          logs: [t("noModelsReturnedFromEndpoint")],
        }));
        return;
      }

      const existingIds = new Set([
        ...(modelMeta.customModels || []).map((m: any) => m.id),
        ...models.map((m: any) => m.id),
      ]);
      const newModels = fetchedModels.filter(
        (model: any) => !existingIds.has(model.id || model.name || model.model)
      );

      if (newModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("allModelsAlreadyImported") || "All models already imported",
          logs: [t("noNewModelsToImport") || "No new models to import"],
          importedCount: 0,
          total: 0,
          current: 0,
        }));
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "importing",
        total: newModels.length,
        current: 0,
        status: t("importingModelsProgress", { current: 0, total: newModels.length }),
        logs: [
          t("foundModelsStartingImport", { count: newModels.length }),
          ...(newModels.length < fetchedModels.length
            ? [
                t("skippingExistingModels", { count: fetchedModels.length - newModels.length }) ||
                  `Skipping ${fetchedModels.length - newModels.length} existing models`,
              ]
            : []),
        ],
      }));

      let importedCount = 0;
      for (let i = 0; i < newModels.length; i++) {
        const model = newModels[i];
        const modelId = model.id || model.name || model.model;
        if (!modelId) continue;
        const parts = modelId.split("/");
        const baseAlias = parts[parts.length - 1];

        setImportProgress((prev) => ({
          ...prev,
          current: i + 1,
          status: t("importingModelsProgress", { current: i + 1, total: newModels.length }),
          logs: [...prev.logs, t("importingModelById", { modelId })],
        }));

        // Save as imported (default) model in the DB
        await fetch("/api/provider-models", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: providerId,
            modelId,
            modelName: model.name || modelId,
            source: "imported",
            ...(typeof model.apiFormat === "string" ? { apiFormat: model.apiFormat } : {}),
            ...(Array.isArray(model.supportedEndpoints)
              ? { supportedEndpoints: model.supportedEndpoints }
              : {}),
          }),
        });
        // Also create an alias for routing
        if (!modelAliases[baseAlias]) {
          await handleSetAlias(modelId, baseAlias, providerStorageAlias);
        }
        importedCount += 1;
      }

      await fetchAliases();

      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        current: newModels.length,
        status:
          importedCount > 0
            ? t("importSuccessCount", { count: importedCount })
            : t("noNewModelsAddedExisting"),
        logs: [
          ...prev.logs,
          importedCount > 0
            ? t("importDoneCount", { count: importedCount })
            : t("noNewModelsAdded"),
        ],
        importedCount,
      }));

      // Auto-reload after success
      if (importedCount > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : t("unexpectedErrorOccurred"),
      }));
    } finally {
      setImportingModels(false);
    }
  };

  // Shared import handler for CompatibleModelsSection
  const handleCompatibleImportWithProgress = async (connectionId: string) => {
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      const response = await fetch(`/api/providers/${connectionId}/sync-models?mode=import`, {
        method: "POST",
        signal: AbortSignal.timeout(60_000),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t("failedImportModels"));
      }

      const importedModels = Array.isArray(data.importedModels) ? data.importedModels : [];
      const importedCount =
        typeof data.importedCount === "number" ? data.importedCount : importedModels.length;
      const changedCount =
        typeof data.importedChanges?.total === "number"
          ? data.importedChanges.total
          : importedCount;
      const totalChangedCount =
        changedCount +
        (typeof data.customModelChanges?.total === "number" ? data.customModelChanges.total : 0);

      if (importedModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status:
            importedCount > 0
              ? t("importSuccessCount", { count: importedCount })
              : t("noNewModelsAdded"),
          logs: [
            importedCount > 0
              ? t("importDoneCount", { count: importedCount })
              : t("noNewModelsAdded"),
          ],
          importedCount,
        }));
        if (totalChangedCount > 0) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        total: importedModels.length,
        current: importedModels.length,
        status:
          importedCount > 0
            ? t("importSuccessCount", { count: importedCount })
            : t("noNewModelsAdded"),
        logs: [
          t("foundModelsStartingImport", { count: importedModels.length }),
          ...importedModels.map((model: any) =>
            t("importingModelById", { modelId: model.id || model.name || model.model })
          ),
          importedCount > 0
            ? t("importDoneCount", { count: importedCount })
            : t("noNewModelsAdded"),
        ],
        importedCount,
      }));

      if (totalChangedCount > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : t("unexpectedErrorOccurred"),
      }));
    }
  };

  const canImportModels = isFreeNoAuth || connections.some((conn) => conn.isActive !== false);

  // Auto-sync toggle state: read from first active connection's providerSpecificData
  const autoSyncConnection = connections.find((conn: any) => conn.isActive !== false);
  const isAutoSyncEnabled = !!(autoSyncConnection as any)?.providerSpecificData?.autoSync;
  const [togglingAutoSync, setTogglingAutoSync] = useState(false);

  const handleToggleAutoSync = async () => {
    if (!autoSyncConnection || togglingAutoSync) return;
    setTogglingAutoSync(true);
    try {
      const newValue = !isAutoSyncEnabled;
      await fetch(`/api/providers/${(autoSyncConnection as any).id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: { autoSync: newValue },
        }),
      });
      await fetchConnections();
      notify[newValue ? "success" : "info"](
        newValue ? t("autoSyncEnabled") : t("autoSyncDisabled")
      );
    } catch (error) {
      console.log("Error toggling auto-sync:", error);
      notify.error(t("autoSyncToggleFailed"));
    } finally {
      setTogglingAutoSync(false);
    }
  };

  const [clearingModels, setClearingModels] = useState(false);
  const providerAliasEntries = useMemo(
    () =>
      Object.entries(modelAliases).filter(
        ([, model]) => typeof model === "string" && model.startsWith(`${providerStorageAlias}/`)
      ),
    [modelAliases, providerStorageAlias]
  );

  const handleClearAllModels = async () => {
    if (clearingModels) return;
    if (!confirm(t("clearAllModelsConfirm"))) return;
    setClearingModels(true);
    try {
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerStorageAlias)}&all=true`,
        { method: "DELETE" }
      );
      if (res.ok) {
        // Also delete all aliases that belong to this provider
        await Promise.all(
          providerAliasEntries.map(([alias]) =>
            fetch(`/api/models/alias?alias=${encodeURIComponent(alias)}`, {
              method: "DELETE",
            }).catch(() => {})
          )
        );
        await fetchProviderModelMeta();
        await fetchAliases();
        notify.success(t("clearAllModelsSuccess"));
      } else {
        notify.error(t("clearAllModelsFailed"));
      }
    } catch {
      notify.error(t("clearAllModelsFailed"));
    } finally {
      setClearingModels(false);
    }
  };

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

  const saveModelCompatFlags = async (modelId: string, patch: ModelCompatSavePatch) => {
    setCompatSavingModelId(modelId);
    try {
      const c = customMap.get(modelId) as Record<string, unknown> | undefined;
      let body: Record<string, unknown>;
      const onlyCompatByProtocol =
        patch.compatByProtocol &&
        patch.normalizeToolCallId === undefined &&
        patch.preserveOpenAIDeveloperRole === undefined &&
        !("upstreamHeaders" in patch);

      if (c) {
        if (onlyCompatByProtocol) {
          body = {
            provider: providerId,
            modelId,
            compatByProtocol: patch.compatByProtocol,
          };
        } else {
          body = {
            provider: providerId,
            modelId,
            modelName: (c.name as string) || modelId,
            source: (c.source as string) || "manual",
            apiFormat: (c.apiFormat as string) || "chat-completions",
            supportedEndpoints:
              Array.isArray(c.supportedEndpoints) && (c.supportedEndpoints as unknown[]).length
                ? c.supportedEndpoints
                : ["chat"],
            normalizeToolCallId:
              patch.normalizeToolCallId !== undefined
                ? patch.normalizeToolCallId
                : Boolean(c.normalizeToolCallId),
            preserveOpenAIDeveloperRole:
              patch.preserveOpenAIDeveloperRole !== undefined
                ? patch.preserveOpenAIDeveloperRole
                : Object.prototype.hasOwnProperty.call(c, "preserveOpenAIDeveloperRole")
                  ? Boolean(c.preserveOpenAIDeveloperRole)
                  : true,
          };
          if (patch.compatByProtocol) body.compatByProtocol = patch.compatByProtocol;
        }
      } else {
        body = { provider: providerId, modelId, ...patch };
      }
      const res = await fetch("/api/provider-models", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const detail = await formatProviderModelsErrorResponse(res);
        notify.error(
          detail ? `${t("failedSaveCustomModel")} — ${detail}` : t("failedSaveCustomModel")
        );
        return;
      }
    } catch {
      notify.error(t("failedSaveCustomModel"));
      return;
    } finally {
      setCompatSavingModelId(null);
    }
    try {
      await fetchProviderModelMeta();
    } catch {
      /* refresh failure is non-critical — data was already saved */
    }
  };

  const handleToggleModelHidden = async (
    providerKey: string,
    modelId: string,
    hidden: boolean
  ): Promise<void> => {
    setTogglingModelId(modelId);
    try {
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerKey)}&modelId=${encodeURIComponent(modelId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isHidden: hidden }),
        }
      );
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        notify.error(detail || t("failedSaveCustomModel"));
        return;
      }
      await Promise.all([fetchProviderModelMeta().catch(() => {}), fetchAliases().catch(() => {})]);
    } catch {
      notify.error(t("failedSaveCustomModel"));
    } finally {
      setTogglingModelId(null);
    }
  };

  const handleBulkToggleModelHidden = async (
    providerKey: string,
    modelIds: string[],
    hidden: boolean
  ): Promise<void> => {
    if (modelIds.length === 0) return;
    setBulkVisibilityAction(hidden ? "deselect" : "select");
    try {
      const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerKey)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: hidden, modelIds }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        notify.error(detail || t("failedSaveCustomModel"));
        return;
      }
      await Promise.all([fetchProviderModelMeta().catch(() => {}), fetchAliases().catch(() => {})]);
    } catch {
      notify.error(t("failedSaveCustomModel"));
    } finally {
      setBulkVisibilityAction(null);
    }
  };

  const renderModelsSection = () => {
    const autoSyncToggle = compatibleSupportsModelImport && canImportModels && (
      <button
        onClick={handleToggleAutoSync}
        disabled={togglingAutoSync}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-transparent cursor-pointer text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
        title={t("autoSyncTooltip")}
      >
        <span
          className="material-symbols-outlined text-[16px]"
          style={{ color: isAutoSyncEnabled ? "#22c55e" : "var(--color-text-muted)" }}
        >
          {isAutoSyncEnabled ? "toggle_on" : "toggle_off"}
        </span>
        <span className="text-text-main">{t("autoSync")}</span>
      </button>
    );

    const clearAllButton = (modelMeta.customModels.length > 0 ||
      providerAliasEntries.length > 0) && (
      <button
        onClick={handleClearAllModels}
        disabled={clearingModels}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-red-300 dark:border-red-800 bg-transparent cursor-pointer text-[12px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
        title={t("clearAllModels")}
      >
        <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
        <span>{t("clearAllModels")}</span>
      </button>
    );

    if (isManagedAvailableModelsProvider) {
      const description =
        providerId === "openrouter"
          ? t("openRouterAnyModelHint")
          : isCcCompatible
            ? t("ccCompatibleModelsDescription")
            : t("compatibleModelsDescription", {
                type: isAnthropicCompatible ? t("anthropic") : t("openai"),
              });
      const inputLabel = providerId === "openrouter" ? t("modelIdFromOpenRouter") : t("modelId");
      const inputPlaceholder =
        providerId === "openrouter"
          ? t("openRouterModelPlaceholder")
          : isCcCompatible
            ? "claude-sonnet-4-6"
            : isAnthropicCompatible
              ? t("anthropicCompatibleModelPlaceholder")
              : t("openaiCompatibleModelPlaceholder");

      return (
        <div>
          <div className="flex items-center gap-2 mb-4">
            {autoSyncToggle}
            {clearAllButton}
          </div>
          <CompatibleModelsSection
            providerStorageAlias={providerStorageAlias}
            providerDisplayAlias={providerDisplayAlias}
            modelAliases={modelAliases}
            availableModels={syncedAvailableModels}
            customModels={modelMeta.customModels}
            fallbackModels={compatibleFallbackModels}
            description={description}
            inputLabel={inputLabel}
            inputPlaceholder={inputPlaceholder}
            copied={copied}
            onCopy={copy}
            onSetAlias={handleSetAlias}
            onDeleteAlias={handleDeleteAlias}
            connections={connections}
            isAnthropic={isAnthropicProtocolCompatible}
            onImportWithProgress={handleCompatibleImportWithProgress}
            t={t}
            effectiveModelNormalize={effectiveModelNormalize}
            effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
            getUpstreamHeadersRecord={getUpstreamHeadersRecordForModel}
            saveModelCompatFlags={saveModelCompatFlags}
            compatSavingModelId={compatSavingModelId}
            onModelsChanged={fetchProviderModelMeta}
            allowImport={compatibleSupportsModelImport}
            isModelHidden={effectiveModelHidden}
            onToggleHidden={(modelId, hidden) =>
              handleToggleModelHidden(providerStorageAlias, modelId, hidden)
            }
            onBulkToggleHidden={(modelIds, hidden) =>
              handleBulkToggleModelHidden(providerStorageAlias, modelIds, hidden)
            }
            bulkTogglePending={bulkVisibilityAction !== null}
            togglingModelId={togglingModelId}
            onTestModel={onTestModel}
            modelTestStatus={modelTestStatus}
            testingModelId={testingModelId}
            onTestAll={handleTestAll}
            testingAll={testingAll}
            testProgress={testProgress}
            autoHideFailed={autoHideFailed}
            onAutoHideFailedChange={setAutoHideFailed}
          />
        </div>
      );
    }

    if (providerInfo.passthroughModels) {
      const passthroughDescription =
        providerId === "openrouter"
          ? t("openRouterAnyModelHint")
          : providerId === "bedrock"
            ? t("bedrockModelsDescription")
            : t("passthroughModelsDescription", { provider: providerInfo?.name || providerId });
      const passthroughInputLabel =
        providerId === "openrouter" ? t("modelIdFromOpenRouter") : t("modelId");
      const passthroughInputPlaceholder =
        providerId === "openrouter"
          ? t("openRouterModelPlaceholder")
          : providerId === "bedrock"
            ? t("bedrockModelPlaceholder")
            : t("openaiCompatibleModelPlaceholder");

      return (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button
              size="sm"
              variant="secondary"
              icon="download"
              onClick={handleImportModels}
              disabled={!canImportModels || importingModels}
            >
              {importingModels ? t("importingModels") : t("importFromModels")}
            </Button>
            {autoSyncToggle}
            {clearAllButton}
            {!canImportModels && (
              <span className="text-xs text-text-muted">{t("addConnectionToImport")}</span>
            )}
          </div>
          <PassthroughModelsSection
            providerAlias={providerAlias}
            modelAliases={modelAliases}
            availableModels={syncedAvailableModels}
            customModels={modelMeta.customModels}
            description={passthroughDescription}
            inputLabel={passthroughInputLabel}
            inputPlaceholder={passthroughInputPlaceholder}
            copied={copied}
            onCopy={copy}
            onSetAlias={handleSetAlias}
            onDeleteAlias={handleDeleteAlias}
            t={t}
            effectiveModelNormalize={effectiveModelNormalize}
            effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
            getUpstreamHeadersRecord={getUpstreamHeadersRecordForModel}
            saveModelCompatFlags={saveModelCompatFlags}
            compatSavingModelId={compatSavingModelId}
            isModelHidden={effectiveModelHidden}
            onToggleHidden={(modelId, hidden) =>
              handleToggleModelHidden(providerStorageAlias, modelId, hidden)
            }
            onBulkToggleHidden={(modelIds, hidden) =>
              handleBulkToggleModelHidden(providerStorageAlias, modelIds, hidden)
            }
            bulkTogglePending={bulkVisibilityAction !== null}
            togglingModelId={togglingModelId}
            onTestModel={onTestModel}
            modelTestStatus={modelTestStatus}
            testingModelId={testingModelId}
            providerId={providerId}
            connectionId={selectedConnection?.id ?? ""}
            autoHideFailed={autoHideFailed}
            onAutoHideFailedChange={setAutoHideFailed}
          />
        </div>
      );
    }

    const importButton = (
      <div className="flex items-center gap-2 mb-4">
        <Button
          size="sm"
          variant="secondary"
          icon="download"
          onClick={handleImportModels}
          disabled={!canImportModels || importingModels}
        >
          {importingModels ? t("importingModels") : t("importFromModels")}
        </Button>
        {autoSyncToggle}
        {!canImportModels && (
          <span className="text-xs text-text-muted">{t("addConnectionToImport")}</span>
        )}
      </div>
    );

    if (models.length === 0) {
      return (
        <div>
          {importButton}
          <p className="text-sm text-text-muted">{t("noModelsConfigured")}</p>
        </div>
      );
    }
    const modelsWithVisibility = models.map((model) => ({
      ...model,
      isHidden: effectiveModelHidden(model.id),
    }));
    const filteredModels = modelsWithVisibility.filter((model) => {
      const matchesQuery = matchesModelCatalogQuery(modelFilter, {
        modelId: model.id,
        modelName: model.name,
        source: model.source,
      });
      const matchesVisibility =
        visibilityFilter === "all"
          ? true
          : visibilityFilter === "visible"
            ? !model.isHidden
            : model.isHidden;
      return matchesQuery && matchesVisibility;
    });
    const activeCount = modelsWithVisibility.filter((m) => !m.isHidden).length;
    const hiddenFilteredCount = filteredModels.filter((m) => m.isHidden).length;
    const visibleFilteredCount = filteredModels.length - hiddenFilteredCount;
    const testAllTargets = filteredModels
      .filter((m) => !m.isHidden)
      .map((m) => ({ modelId: m.id, fullModel: `${providerDisplayAlias}/${m.id}` }));
    return (
      <div>
        {importButton}
        {modelsWithVisibility.length > 0 && (
          <ModelVisibilityToolbar
            t={t}
            filterValue={modelFilter}
            onFilterChange={setModelFilter}
            activeCount={activeCount}
            totalCount={modelsWithVisibility.length}
            onSelectAll={() =>
              handleBulkToggleModelHidden(
                providerId,
                filteredModels.map((model) => model.id),
                false
              )
            }
            onDeselectAll={() =>
              handleBulkToggleModelHidden(
                providerId,
                filteredModels.map((model) => model.id),
                true
              )
            }
            selectAllDisabled={hiddenFilteredCount === 0 || bulkVisibilityAction !== null}
            deselectAllDisabled={visibleFilteredCount === 0 || bulkVisibilityAction !== null}
            onTestAll={() => handleTestAll(testAllTargets)}
            testingAll={testingAll}
            testProgress={testProgress}
            visibilityFilter={visibilityFilter}
            onVisibilityFilterChange={setVisibilityFilter}
            autoHideFailed={autoHideFailed}
            onAutoHideFailedChange={setAutoHideFailed}
          />
        )}
        <div className="flex flex-wrap gap-3">
          {filteredModels.map((model) => {
            return (
              <ModelRow
                key={model.id}
                model={model}
                fullModel={`${providerDisplayAlias}/${model.id}`}
                provider={providerId}
                copied={copied}
                onCopy={copy}
                t={t}
                showDeveloperToggle
                effectiveModelNormalize={effectiveModelNormalize}
                effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
                getUpstreamHeadersRecord={(p) => getUpstreamHeadersRecordForModel(model.id, p)}
                saveModelCompatFlags={saveModelCompatFlags}
                compatDisabled={compatSavingModelId === model.id}
                onToggleHidden={(modelId, hidden) =>
                  handleToggleModelHidden(providerId, modelId, hidden)
                }
                togglingHidden={togglingModelId === model.id}
                onTestModel={onTestModel}
                testStatus={modelTestStatus[model.id] || null}
                testingModel={testingModelId === model.id}
              />
            );
          })}
          {filteredModels.length === 0 && modelFilter && (
            <p className="text-sm text-text-muted py-2">
              {providerText(t, "noModelsMatch", `No models match "${modelFilter}"`, {
                filter: modelFilter,
              })}
            </p>
          )}
        </div>
      </div>
    );
  };

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

  // OpenAI/Anthropic compatible providers use their specialized pseudo-provider icons.
  const getHeaderIconProviderId = () => {
    if (isOpenAICompatible && providerInfo.apiType) {
      return providerInfo.apiType === "responses" ? "oai-r" : "oai-cc";
    }
    if (isAnthropicProtocolCompatible) {
      return "anthropic-m";
    }
    return providerInfo.id;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/providers"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          {t("backToProviders")}
        </Link>
        <div className="flex items-center gap-4">
          <div
            className="rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${providerInfo.color}15` }}
          >
            <ProviderIcon providerId={getHeaderIconProviderId()} size={48} type="color" />
          </div>
          <div>
            {providerInfo.website ? (
              <a
                href={providerInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-semibold tracking-tight hover:underline inline-flex items-center gap-2"
                style={{ color: providerInfo.color }}
              >
                {providerInfo.name}
                <span className="material-symbols-outlined text-lg opacity-60">open_in_new</span>
              </a>
            ) : (
              <h1 className="text-3xl font-semibold tracking-tight">{providerInfo.name}</h1>
            )}
            <div className="flex items-center gap-2">
              <p className="text-text-muted">
                {t("connectionCountLabel", { count: connections.length })}
              </p>
              <EmailPrivacyToggle size="md" />
              {providerId === "adapta-web" && (
                <button
                  onClick={() => setShowTutorialModal(true)}
                  className="text-sm font-medium underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity"
                  style={{ color: providerInfo.color }}
                >
                  Tutorial
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {providerId === "zed" && (
        <>
          <Card>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  Import from Zed Keychain
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  Discover AI provider credentials (OpenAI, Anthropic, Google, Mistral, xAI) that
                  Zed IDE stored in the OS keychain and import them as connections. Requires Zed IDE
                  installed on this machine.
                </p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                icon={importingZed ? "sync" : "download"}
                onClick={handleZedImport}
                disabled={importingZed}
              >
                {importingZed ? "Importing…" : "Import from Zed"}
              </Button>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-3">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setShowZedManual((v) => !v)}
              >
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                  Manual Token Import
                </h2>
                <span className="material-symbols-outlined text-[18px] text-text-muted">
                  {showZedManual ? "expand_less" : "expand_more"}
                </span>
              </button>
              {showZedManual && (
                <div className="flex flex-col gap-3 mt-1">
                  <p className="text-sm text-text-muted">
                    Use this when OmniRoute runs in Docker or the keychain is unavailable. Paste the
                    API key that Zed stored under{" "}
                    <code className="font-mono text-xs">~/.config/zed/settings.json</code> or copy
                    it from the Zed AI settings panel.
                  </p>
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <select
                      className="input input-sm"
                      value={zedManualProvider}
                      onChange={(e) => setZedManualProvider(e.target.value)}
                    >
                      <option value="openai">OpenAI</option>
                      <option value="anthropic">Anthropic</option>
                      <option value="google">Google</option>
                      <option value="mistral">Mistral</option>
                      <option value="xai">xAI</option>
                      <option value="openrouter">OpenRouter</option>
                      <option value="deepseek">DeepSeek</option>
                    </select>
                    <input
                      type="password"
                      className="input input-sm flex-1"
                      placeholder="Paste API key…"
                      value={zedManualToken}
                      onChange={(e) => setZedManualToken(e.target.value)}
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={importingZedManual ? "sync" : "upload"}
                      onClick={handleZedManualImport}
                      disabled={importingZedManual || !zedManualToken.trim()}
                    >
                      {importingZedManual ? "Saving…" : "Import"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </>
      )}

      {isCompatible && providerNode && (
        <Card>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                {isCcCompatible
                  ? t("ccCompatibleDetailsTitle")
                  : isAnthropicCompatible
                    ? t("anthropicCompatibleDetails")
                    : t("openaiCompatibleDetails")}
              </h2>
              <p className="text-sm text-text-muted">
                {getApiLabel()} · {(providerNode.baseUrl || "").replace(/\/$/, "")}/{getApiPath()}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" icon="add" onClick={() => gateConnectionFlow(openApiKeyAddFlow)}>
                {t("add")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon="edit"
                onClick={() => setShowEditNodeModal(true)}
              >
                {t("edit")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon="delete"
                onClick={async () => {
                  if (
                    !confirm(
                      t("deleteCompatibleNodeConfirm", {
                        type: isCcCompatible
                          ? t("ccCompatibleLabel")
                          : isAnthropicCompatible
                            ? t("anthropic")
                            : t("openai"),
                      })
                    )
                  )
                    return;
                  try {
                    const res = await fetch(`/api/provider-nodes/${providerId}`, {
                      method: "DELETE",
                    });
                    if (res.ok) {
                      router.push("/dashboard/providers");
                    }
                  } catch (error) {
                    console.error("Error deleting provider node:", error);
                  }
                }}
              >
                {t("delete")}
              </Button>
            </div>
          </div>
          {isCcCompatible && (
            <div className="mb-4 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
                  warning
                </span>
                <p>{t("ccCompatibleValidationHint")}</p>
              </div>
            </div>
          )}
        </Card>
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
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{t("connections")}</h2>
              {providerId === "claude" && (
                <div
                  className="inline-flex items-center gap-2 rounded-lg border border-orange-500/20 bg-orange-500/5 px-2 py-1 text-xs font-medium text-text-muted"
                  title={providerText(
                    t,
                    "preferClaudeCodeForUnprefixedClaudeModelsTooltip",
                    "Route bare claude-* model IDs from Claude Code clients through the Claude Code account instead of asking for a provider prefix."
                  )}
                >
                  <span className="material-symbols-outlined text-[14px] text-orange-500">
                    alt_route
                  </span>
                  <span>
                    {providerText(
                      t,
                      "preferClaudeCodeForUnprefixedClaudeModelsLabel",
                      "Claude Code default"
                    )}
                  </span>
                  <Toggle
                    size="sm"
                    checked={preferClaudeCodeForUnprefixedClaudeModels}
                    onChange={handleToggleClaudeRoutingPreference}
                    disabled={savingClaudeRoutingPreference || !claudeRoutingSettingsLoaded}
                    ariaLabel={providerText(
                      t,
                      "preferClaudeCodeForUnprefixedClaudeModelsAria",
                      "Prefer Claude Code for unprefixed Claude models"
                    )}
                    title={
                      preferClaudeCodeForUnprefixedClaudeModels
                        ? providerText(
                            t,
                            "preferClaudeCodeForUnprefixedClaudeModelsDisable",
                            "Disable Claude Code preference for bare claude-* model IDs"
                          )
                        : providerText(
                            t,
                            "preferClaudeCodeForUnprefixedClaudeModelsEnable",
                            "Enable Claude Code preference for bare claude-* model IDs"
                          )
                    }
                  />
                  <span className="text-[11px] text-text-muted/70">
                    {preferClaudeCodeForUnprefixedClaudeModels
                      ? providerText(t, "toggleOnShort", "On")
                      : providerText(t, "toggleOffShort", "Off")}
                  </span>
                  {claudeRoutingSettingsLoadError ? (
                    <button
                      type="button"
                      onClick={() => void loadClaudeRoutingSettings()}
                      className="rounded border border-orange-500/30 px-2 py-0.5 text-[11px] font-medium text-orange-600 hover:bg-orange-500/10 dark:text-orange-300"
                      title={claudeRoutingSettingsLoadError}
                    >
                      {providerText(t, "retry", "Retry")}
                    </button>
                  ) : null}
                </div>
              )}
              {providerId === "codex" && (
                <div
                  className="inline-flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/5 px-2 py-1 text-xs font-medium text-text-muted"
                  title={providerText(
                    t,
                    "providerDetailServiceModeTooltip",
                    "Set a global Codex service mode, or leave accounts on their individual service-tier setting."
                  )}
                >
                  <span>
                    {providerText(t, "providerDetailServiceModeLabel", "Global service mode:")}
                  </span>
                  <select
                    value={codexGlobalServiceMode}
                    onChange={(event) =>
                      handleChangeCodexGlobalServiceMode(
                        event.target.value as CodexGlobalServiceMode
                      )
                    }
                    disabled={savingCodexGlobalServiceMode || !codexSettingsLoaded}
                    aria-label="Global Codex service mode"
                    className="rounded-md border border-border bg-bg px-2 py-1 text-xs text-text-main outline-none transition-colors focus:border-primary disabled:opacity-60"
                  >
                    {codexGlobalServiceModeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {codexSettingsLoadError ? (
                    <button
                      type="button"
                      onClick={() => void loadCodexSettings()}
                      className="rounded border border-sky-500/30 px-2 py-0.5 text-[11px] font-medium text-sky-600 hover:bg-sky-500/10 dark:text-sky-300"
                      title={codexSettingsLoadError}
                    >
                      {providerText(t, "retry", "Retry")}
                    </button>
                  ) : null}
                </div>
              )}
              {/* Provider-level proxy indicator/button */}
              <button
                onClick={() =>
                  setProxyTarget({
                    level: "provider",
                    id: providerId,
                    label: providerInfo?.name || providerId,
                  })
                }
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                  proxyConfig?.providers?.[providerId]
                    ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25"
                    : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                }`}
                title={
                  proxyConfig?.providers?.[providerId]
                    ? t("providerProxyTitleConfigured", {
                        host: proxyConfig.providers[providerId].host || t("configured"),
                      })
                    : t("providerProxyConfigureHint")
                }
              >
                <span className="material-symbols-outlined text-[14px]">vpn_lock</span>
                {proxyConfig?.providers?.[providerId]
                  ? proxyConfig.providers[providerId].host || t("providerProxy")
                  : t("providerProxy")}
              </button>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              {connections.length > 0 && (
                <button
                  onClick={() => handleDistributeProxies()}
                  disabled={distributingProxies || batchTesting || !!retestingId}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    distributingProxies
                      ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                      : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
                  }`}
                  title={t("distributeProxies")}
                  aria-label={t("distributeProxies")}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {distributingProxies ? "sync" : "swap_horiz"}
                  </span>
                  {distributingProxies ? t("distributing") : t("distributeProxies")}
                </button>
              )}
              {connections.length > 1 && (
                <button
                  onClick={handleBatchTestAll}
                  disabled={batchTesting || batchRetesting || !!retestingId}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    batchTesting
                      ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                      : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
                  }`}
                  title={t("testAll")}
                  aria-label={t("testAll")}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {batchTesting ? "sync" : "play_arrow"}
                  </span>
                  {batchTesting ? t("testing") : t("testAll")}
                </button>
              )}
              {!isCompatible ? (
                <>
                  {isCommandCode ? (
                    <>
                      <Button
                        size="sm"
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
                        size="sm"
                        variant="secondary"
                        icon="add"
                        onClick={() => gateConnectionFlow(openApiKeyAddFlow)}
                      >
                        Manual API key
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        icon="add"
                        onClick={() => gateConnectionFlow(openPrimaryAddFlow)}
                      >
                        {providerSupportsPat ? "Add PAT" : t("add")}
                      </Button>
                      {providerId === "qoder" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => gateConnectionFlow(() => setShowOAuthModal(true))}
                        >
                          Experimental OAuth
                        </Button>
                      )}
                      {providerId === "codex" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          icon="menu_book"
                          onClick={() => setCodexCliGuideOpen(true)}
                        >
                          Codex CLI Guide
                        </Button>
                      )}
                      {providerId === "codex" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          icon="share"
                          onClick={() => gateConnectionFlow(openExternalLinkFlow)}
                        >
                          Adicionar Externo
                        </Button>
                      )}
                      {providerId === "codex" && (
                        <Button
                          size="sm"
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
                          size="sm"
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
                          size="sm"
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
                </>
              ) : (
                connections.length === 0 && (
                  <Button
                    size="sm"
                    icon="add"
                    onClick={() => gateConnectionFlow(openApiKeyAddFlow)}
                  >
                    {t("add")}
                  </Button>
                )
              )}
            </div>
          </div>

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
            (() => {
              const sorted = [...connections].sort((a, b) => (a.priority || 0) - (b.priority || 0));
              const hasAnyTag = sorted.some(
                (c) => c.providerSpecificData?.tag as string | undefined
              );
              const allSelected = selectedIds.size === connections.length && connections.length > 0;
              const someSelected = selectedIds.size > 0 && selectedIds.size < connections.length;
              const bulkBusy =
                batchUpdating !== null || batchRetesting || batchDeleting || batchTesting;
              const bulkActions = selectedIds.size > 0 && (
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon="toggle_on"
                    loading={batchUpdating === "activate"}
                    disabled={bulkBusy && batchUpdating !== "activate"}
                    onClick={() => handleBatchSetActive(true)}
                  >
                    {t("batchActivateSelected")}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon="toggle_off"
                    loading={batchUpdating === "deactivate"}
                    disabled={bulkBusy && batchUpdating !== "deactivate"}
                    onClick={() => handleBatchSetActive(false)}
                  >
                    {t("batchDeactivateSelected")}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon="play_arrow"
                    loading={batchRetesting}
                    disabled={(bulkBusy && !batchRetesting) || !!retestingId}
                    onClick={handleBatchRetest}
                  >
                    {t("batchRetestSelected")}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon="delete"
                    loading={batchDeleting}
                    disabled={bulkBusy && !batchDeleting}
                    onClick={handleBatchDeleteOpenModal}
                  >
                    {t("batchDeleteSelected", { count: selectedIds.size })}
                  </Button>
                </div>
              );

              const isHealthy = (c: ConnectionRowConnection): boolean => {
                const s = c.testStatus;
                return c.isActive !== false && (!s || s === "active" || s === "success");
              };
              const STATUS_FILTER_OPTIONS = [
                { value: "all", label: t("filterAll", "All") },
                { value: "active", label: t("filterActive", "Active") },
                { value: "error", label: t("filterError", "Error") },
                { value: "banned", label: t("filterBanned", "Banned") },
                {
                  value: "credits_exhausted",
                  label: t("filterCreditsExhausted", "Credits Exhausted"),
                },
              ];
              const filtered =
                healthFilter === "all"
                  ? sorted
                  : sorted.filter((c) => {
                      if (healthFilter === "active") return isHealthy(c);
                      if (healthFilter === "error")
                        return (
                          !isHealthy(c) &&
                          c.testStatus !== "banned" &&
                          c.testStatus !== "credits_exhausted"
                        );
                      return c.testStatus === healthFilter;
                    });

              const totalFilteredPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
              const clampedPage = Math.min(page, totalFilteredPages - 1);
              const pageStart = clampedPage * PAGE_SIZE;
              const pageEnd = pageStart + PAGE_SIZE;

              const filterPills = (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {STATUS_FILTER_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setHealthFilter(opt.value);
                        setPage(0);
                        setSelectedIds(new Set());
                      }}
                      className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                        healthFilter === opt.value
                          ? "bg-primary text-white"
                          : "bg-muted/60 text-text-muted hover:bg-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              );

              const paginationBar =
                totalFilteredPages > 1 ? (
                  <div className="flex items-center justify-between px-3 py-2 border-t border-border">
                    <span className="text-xs text-text-muted">
                      {pageStart + 1}–{Math.min(pageEnd, filtered.length)} / {filtered.length}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="chevron_left"
                        disabled={clampedPage === 0}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                      />
                      <span className="text-xs text-text-muted min-w-[4rem] text-center">
                        {clampedPage + 1} / {totalFilteredPages}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="chevron_right"
                        disabled={clampedPage >= totalFilteredPages - 1}
                        onClick={() => setPage((p) => Math.min(totalFilteredPages - 1, p + 1))}
                      />
                    </div>
                  </div>
                ) : null;

              if (!hasAnyTag) {
                const pageConnections = filtered.slice(pageStart, pageEnd);
                const allSelected =
                  pageConnections.length > 0 && pageConnections.every((c) => selectedIds.has(c.id));
                const someSelected = pageConnections.some((c) => selectedIds.has(c.id));
                return (
                  <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3 py-2 bg-muted/50 rounded-t-lg border border-b-0 border-border">
                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            ref={(el) => {
                              if (el) el.indeterminate = someSelected;
                            }}
                            onChange={() => {
                              if (allSelected) {
                                const toRemove = new Set(pageConnections.map((c) => c.id));
                                setSelectedIds((prev) => {
                                  const next = new Set(prev);
                                  for (const id of toRemove) next.delete(id);
                                  return next;
                                });
                              } else {
                                setSelectedIds((prev) => {
                                  const next = new Set(prev);
                                  for (const c of pageConnections) next.add(c.id);
                                  return next;
                                });
                              }
                            }}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                          />
                          <span className="text-sm font-medium text-text-muted">
                            {selectedIds.size > 0
                              ? providerCountText(
                                  t,
                                  "selectedCount",
                                  selectedIds.size,
                                  "{count} selected",
                                  "{count} selected"
                                )
                              : providerCountText(
                                  t,
                                  "accountsCount",
                                  filtered.length,
                                  "{count} account",
                                  "{count} accounts"
                                )}
                          </span>
                        </label>
                        {filterPills}
                      </div>

                      {bulkActions}
                    </div>
                    <div className="flex flex-col divide-y divide-black/[0.03] dark:divide-white/[0.03] border border-t-0 border-border rounded-b-lg overflow-hidden">
                      {pageConnections.length === 0 ? (
                        <div className="px-3 py-6 text-center text-sm text-text-muted">
                          {t("noFilteredConnections", "No connections match the current filter.")}
                        </div>
                      ) : (
                        pageConnections.map((conn, index) => (
                          <ConnectionRow
                            key={conn.id}
                            connection={conn}
                            isOAuth={conn.authType === "oauth"}
                            isClaude={providerId === "claude"}
                            codexGlobalServiceMode={codexGlobalServiceMode}
                            isFirst={index === 0}
                            isLast={index === pageConnections.length - 1}
                            isSelected={selectedIds.has(conn.id)}
                            onToggleSelect={() => handleToggleSelectOne(conn.id)}
                            onMoveUp={() => handleSwapPriority(conn, sorted[index - 1])}
                            onMoveDown={() => handleSwapPriority(conn, sorted[index + 1])}
                            onToggleActive={(isActive) =>
                              handleUpdateConnectionStatus(conn.id, isActive)
                            }
                            onToggleRateLimit={(enabled) => handleToggleRateLimit(conn.id, enabled)}
                            onToggleClaudeExtraUsage={(enabled) =>
                              handleToggleClaudeExtraUsage(conn.id, enabled)
                            }
                            isCodex={providerId === "codex"}
                            isGeminiCli={providerId === "gemini-cli"}
                            isCcCompatible={isCcCompatible}
                            cliproxyapiEnabled={cpaProviderEnabled}
                            onToggleCliproxyapiMode={(enabled) =>
                              handleToggleCliproxyapiMode(conn.id, enabled)
                            }
                            onToggleCodex5h={(enabled) =>
                              handleToggleCodexLimit(conn.id, "use5h", enabled)
                            }
                            onToggleCodexWeekly={(enabled) =>
                              handleToggleCodexLimit(conn.id, "useWeekly", enabled)
                            }
                            onRetest={() => handleRetestConnection(conn.id)}
                            isRetesting={retestingId === conn.id}
                            onEdit={() => {
                              setSelectedConnection(conn);
                              setShowEditModal(true);
                            }}
                            onDelete={() => handleDelete(conn.id)}
                            onReauth={
                              conn.authType === "oauth"
                                ? () => gateConnectionFlow(() => setShowOAuthModal(true, conn))
                                : undefined
                            }
                            onRefreshToken={
                              conn.authType === "oauth"
                                ? () => handleRefreshToken(conn.id)
                                : undefined
                            }
                            isRefreshing={refreshingId === conn.id}
                            onApplyCodexAuthLocal={
                              providerId === "codex"
                                ? () => setApplyCodexModalConnectionId(conn.id)
                                : undefined
                            }
                            isApplyingCodexAuthLocal={applyingCodexAuthId === conn.id}
                            onExportCodexAuthFile={
                              providerId === "codex"
                                ? () => handleExportCodexAuthFile(conn.id)
                                : undefined
                            }
                            isExportingCodexAuthFile={exportingCodexAuthId === conn.id}
                            onApplyClaudeAuthLocal={
                              providerId === "claude"
                                ? () => setApplyClaudeModalConnectionId(conn.id)
                                : undefined
                            }
                            isApplyingClaudeAuthLocal={applyingClaudeAuthId === conn.id}
                            onExportClaudeAuthFile={
                              providerId === "claude"
                                ? () => handleExportClaudeAuthFile(conn.id)
                                : undefined
                            }
                            isExportingClaudeAuthFile={exportingClaudeAuthId === conn.id}
                            onApplyGeminiAuthLocal={
                              providerId === "gemini-cli"
                                ? () => setApplyGeminiModalConnectionId(conn.id)
                                : undefined
                            }
                            isApplyingGeminiAuthLocal={applyingGeminiAuthId === conn.id}
                            onExportGeminiAuthFile={
                              providerId === "gemini-cli"
                                ? () => handleExportGeminiAuthFile(conn.id)
                                : undefined
                            }
                            isExportingGeminiAuthFile={exportingGeminiAuthId === conn.id}
                            onProxy={() =>
                              setProxyTarget({
                                level: "key",
                                id: conn.id,
                                label: pickDisplayValue(
                                  [conn.name, conn.email],
                                  emailsVisible,
                                  conn.id
                                ),
                              })
                            }
                            hasProxy={!!connProxyMap[conn.id]?.proxy}
                            proxySource={connProxyMap[conn.id]?.level || null}
                            proxyHost={connProxyMap[conn.id]?.proxy?.host || null}
                            proxyEnabled={readBooleanToggle(conn.proxyEnabled, true)}
                            onToggleProxyEnabled={(enabled) =>
                              handleToggleProxyEnabled(conn.id, enabled)
                            }
                            perKeyProxyEnabled={readBooleanToggle(conn.perKeyProxyEnabled, false)}
                            onTogglePerKeyProxyEnabled={(enabled) =>
                              handleTogglePerKeyProxyEnabled(conn.id, enabled)
                            }
                          />
                        ))
                      )}
                    </div>
                    {paginationBar}
                  </>
                );
              }

              // Build ordered tag groups: untagged first, then alphabetically
              const groupMap = new Map<string, ConnectionRowConnection[]>();
              for (const conn of filtered) {
                const tag = (conn.providerSpecificData?.tag as string | undefined)?.trim() || "";
                if (!groupMap.has(tag)) groupMap.set(tag, []);
                groupMap.get(tag)!.push(conn);
              }
              const groupKeys = Array.from(groupMap.keys()).sort((a, b) => {
                if (a === "") return -1;
                if (b === "") return 1;
                return compareTr(a, b);
              });

              return (
                <>
                  {selectedIds.size > 0 || connections.length > 0 ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3 py-2 bg-muted/50 rounded-t-lg border border-b-0 border-border">
                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            ref={(el) => {
                              if (el) el.indeterminate = someSelected;
                            }}
                            onChange={handleToggleSelectAll}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                          />
                          <span className="text-sm font-medium text-text-muted">
                            {selectedIds.size > 0
                              ? providerCountText(
                                  t,
                                  "selectedCount",
                                  selectedIds.size,
                                  "{count} selected",
                                  "{count} selected"
                                )
                              : providerCountText(
                                  t,
                                  "accountsCount",
                                  filtered.length,
                                  "{count} account",
                                  "{count} accounts"
                                )}
                          </span>
                        </label>
                        {filterPills}
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-2">
                        {/* Distribute Proxies lives in the provider toolbar (top action bar);
                            removed the duplicate here that rendered simultaneously when nothing
                            was selected. Per-tag groups keep their own scoped button. */}
                        {bulkActions}
                      </div>
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-0 border border-t-0 border-border rounded-b-lg overflow-hidden">
                    {groupKeys.map((tag, gi) => {
                      const groupConns = groupMap.get(tag)!;
                      return (
                        <div
                          key={tag || "__untagged__"}
                          className={
                            gi > 0
                              ? "border-t border-black/[0.06] dark:border-white/[0.06] mt-1 pt-1"
                              : ""
                          }
                        >
                          {tag && (
                            <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                              <span className="material-symbols-outlined text-[13px] text-text-muted/50">
                                label
                              </span>
                              <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60 select-none">
                                {tag}
                              </span>
                              <div className="flex-1 h-px bg-black/[0.04] dark:bg-white/[0.04]" />
                              <Button
                                variant="ghost"
                                size="sm"
                                icon="shield"
                                loading={distributingProxies}
                                onClick={() => handleDistributeProxies(tag)}
                              >
                                Distribute Proxies
                              </Button>
                              <span className="text-[10px] text-text-muted/40">
                                {groupConns.length}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-col divide-y divide-black/[0.03] dark:divide-white/[0.03]">
                            {groupConns.map((conn, index) => (
                              <ConnectionRow
                                key={conn.id}
                                connection={conn}
                                isOAuth={conn.authType === "oauth"}
                                isClaude={providerId === "claude"}
                                codexGlobalServiceMode={codexGlobalServiceMode}
                                isFirst={gi === 0 && index === 0}
                                isLast={
                                  gi === groupKeys.length - 1 && index === groupConns.length - 1
                                }
                                isSelected={selectedIds.has(conn.id)}
                                onToggleSelect={() => handleToggleSelectOne(conn.id)}
                                onMoveUp={() =>
                                  handleSwapPriority(conn, sorted[sorted.indexOf(conn) - 1])
                                }
                                onMoveDown={() =>
                                  handleSwapPriority(conn, sorted[sorted.indexOf(conn) + 1])
                                }
                                onToggleActive={(isActive) =>
                                  handleUpdateConnectionStatus(conn.id, isActive)
                                }
                                onToggleRateLimit={(enabled) =>
                                  handleToggleRateLimit(conn.id, enabled)
                                }
                                onToggleClaudeExtraUsage={(enabled) =>
                                  handleToggleClaudeExtraUsage(conn.id, enabled)
                                }
                                isCodex={providerId === "codex"}
                                isGeminiCli={providerId === "gemini-cli"}
                                isCcCompatible={isCcCompatible}
                                cliproxyapiEnabled={cpaProviderEnabled}
                                onToggleCodex5h={(enabled) =>
                                  handleToggleCodexLimit(conn.id, "use5h", enabled)
                                }
                                onToggleCodexWeekly={(enabled) =>
                                  handleToggleCodexLimit(conn.id, "useWeekly", enabled)
                                }
                                onRetest={() => handleRetestConnection(conn.id)}
                                isRetesting={retestingId === conn.id}
                                onEdit={() => {
                                  setSelectedConnection(conn);
                                  setShowEditModal(true);
                                }}
                                onDelete={() => handleDelete(conn.id)}
                                onReauth={
                                  conn.authType === "oauth"
                                    ? () => gateConnectionFlow(() => setShowOAuthModal(true, conn))
                                    : undefined
                                }
                                onRefreshToken={
                                  conn.authType === "oauth"
                                    ? () => handleRefreshToken(conn.id)
                                    : undefined
                                }
                                isRefreshing={refreshingId === conn.id}
                                onApplyCodexAuthLocal={
                                  providerId === "codex"
                                    ? () => setApplyCodexModalConnectionId(conn.id)
                                    : undefined
                                }
                                isApplyingCodexAuthLocal={applyingCodexAuthId === conn.id}
                                onExportCodexAuthFile={
                                  providerId === "codex"
                                    ? () => handleExportCodexAuthFile(conn.id)
                                    : undefined
                                }
                                isExportingCodexAuthFile={exportingCodexAuthId === conn.id}
                                onApplyClaudeAuthLocal={
                                  providerId === "claude"
                                    ? () => setApplyClaudeModalConnectionId(conn.id)
                                    : undefined
                                }
                                isApplyingClaudeAuthLocal={applyingClaudeAuthId === conn.id}
                                onExportClaudeAuthFile={
                                  providerId === "claude"
                                    ? () => handleExportClaudeAuthFile(conn.id)
                                    : undefined
                                }
                                isExportingClaudeAuthFile={exportingClaudeAuthId === conn.id}
                                onApplyGeminiAuthLocal={
                                  providerId === "gemini-cli"
                                    ? () => setApplyGeminiModalConnectionId(conn.id)
                                    : undefined
                                }
                                isApplyingGeminiAuthLocal={applyingGeminiAuthId === conn.id}
                                onExportGeminiAuthFile={
                                  providerId === "gemini-cli"
                                    ? () => handleExportGeminiAuthFile(conn.id)
                                    : undefined
                                }
                                isExportingGeminiAuthFile={exportingGeminiAuthId === conn.id}
                                onProxy={() =>
                                  setProxyTarget({
                                    level: "key",
                                    id: conn.id,
                                    label: pickDisplayValue(
                                      [conn.name, conn.email],
                                      emailsVisible,
                                      conn.id
                                    ),
                                  })
                                }
                                hasProxy={!!connProxyMap[conn.id]?.proxy}
                                proxySource={connProxyMap[conn.id]?.level || null}
                                proxyHost={connProxyMap[conn.id]?.proxy?.host || null}
                                proxyEnabled={readBooleanToggle(conn.proxyEnabled, true)}
                                onToggleProxyEnabled={(enabled) =>
                                  handleToggleProxyEnabled(conn.id, enabled)
                                }
                                perKeyProxyEnabled={readBooleanToggle(
                                  conn.perKeyProxyEnabled,
                                  false
                                )}
                                onTogglePerKeyProxyEnabled={(enabled) =>
                                  handleTogglePerKeyProxyEnabled(conn.id, enabled)
                                }
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()
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
          {renderModelsSection()}

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

      {/* Modals */}
      {showRiskNoticeModal && subscriptionRisk && (
        <RiskNoticeModal
          variant={providerInfo.riskNoticeVariant ?? "oauth"}
          providerId={providerId}
          providerName={providerInfo.name}
          onConfirm={handleConfirmRiskNotice}
          onCancel={handleCancelRiskNotice}
        />
      )}
      {!isUpstreamProxyProvider &&
        (providerId === "kiro" || providerId === "amazon-q" ? (
          <KiroOAuthWrapper
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            providerInfo={{ ...providerInfo, id: providerId }}
            onSuccess={handleOAuthSuccess}
            onClose={() => {
              setShowOAuthModal(false);
            }}
          />
        ) : providerId === "cursor" ? (
          <CursorAuthModal
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            onSuccess={handleOAuthSuccess}
            onClose={() => {
              setShowOAuthModal(false);
            }}
          />
        ) : providerId === "trae" ? (
          <TraeAuthModal
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            onSuccess={handleOAuthSuccess}
            onClose={() => {
              setShowOAuthModal(false);
            }}
          />
        ) : (
          <OAuthModal
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            provider={providerId}
            providerInfo={providerInfo}
            onSuccess={handleOAuthSuccess}
            onClose={() => {
              setShowOAuthModal(false);
            }}
          />
        ))}
      {providerId === "siliconflow" && (
        <SiliconFlowEndpointModal
          isOpen={showSiliconFlowEndpointModal}
          onSelect={(baseUrl) => {
            setSiliconFlowInitialBaseUrl(baseUrl);
            setShowSiliconFlowEndpointModal(false);
            setShowAddApiKeyModal(true);
          }}
          onClose={() => {
            setShowSiliconFlowEndpointModal(false);
            setSiliconFlowInitialBaseUrl(undefined);
          }}
        />
      )}
      {!isUpstreamProxyProvider && (
        <AddApiKeyModal
          isOpen={showAddApiKeyModal}
          provider={providerId}
          providerName={providerInfo.name}
          initialBaseUrl={siliconFlowInitialBaseUrl}
          isCompatible={isCompatible}
          isAnthropic={isAnthropicProtocolCompatible}
          isCcCompatible={isCcCompatible}
          isCommandCode={isCommandCode}
          commandCodeAuthState={commandCodeAuthState}
          onStartCommandCodeAuth={handleStartCommandCodeAuth}
          onSave={handleSaveApiKey}
          onClose={handleCloseAddApiKeyModal}
        />
      )}
      <ConfirmModal
        isOpen={batchDeleteConfirmOpen}
        onClose={() => setBatchDeleteConfirmOpen(false)}
        onConfirm={handleBatchDeleteConfirm}
        title={t("batchDeleteConfirmTitle", "Delete connections")}
        message={t("batchDeleteConfirm", { count: selectedIds.size })}
        confirmText={t("batchDeleteConfirmButton", "Delete")}
        cancelText={t("cancel", "Cancel")}
        loading={batchDeleting}
      />
      {providerId === "codex" && applyCodexModalConnectionId && (
        <ApplyCodexAuthModal
          key={applyCodexModalConnectionId}
          connectionId={applyCodexModalConnectionId}
          inProgress={!!applyingCodexAuthId}
          onConfirm={handleApplyCodexAuthLocal}
          onClose={() => setApplyCodexModalConnectionId(null)}
        />
      )}
      {!isUpstreamProxyProvider && (
        <EditConnectionModal
          isOpen={showEditModal}
          connection={selectedConnection}
          onSave={handleUpdateConnection}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {!isUpstreamProxyProvider && isCompatible && (
        <EditCompatibleNodeModal
          isOpen={showEditNodeModal}
          node={providerNode}
          onSave={handleUpdateNode}
          onClose={() => setShowEditNodeModal(false)}
          isAnthropic={isAnthropicProtocolCompatible}
          isCcCompatible={isCcCompatible}
        />
      )}
      {/* Codex CLI Guide Modal */}
      <CodexCliGuideModal isOpen={codexCliGuideOpen} onClose={() => setCodexCliGuideOpen(false)} />
      {/* Codex Import Auth Modal */}
      {providerId === "codex" && importCodexModalOpen && (
        <ImportCodexAuthModal
          key="import-codex-modal"
          onClose={() => setImportCodexModalOpen(false)}
          onSuccess={() => {
            setImportCodexModalOpen(false);
            void fetchConnections();
          }}
        />
      )}
      {providerId === "codex" && externalLinkModalOpen && (
        <ExternalLinkModal
          isOpen={externalLinkModalOpen}
          onClose={() => setExternalLinkModalOpen(false)}
          loading={externalLinkLoading}
          error={externalLinkError}
          url={externalLinkUrl}
          copied={externalLinkCopied}
          onCopy={externalLinkCopy}
        />
      )}
      {/* Claude Apply Auth Modal */}
      {providerId === "claude" && applyClaudeModalConnectionId && (
        <ApplyClaudeAuthModal
          key={applyClaudeModalConnectionId}
          connectionId={applyClaudeModalConnectionId}
          inProgress={!!applyingClaudeAuthId}
          onConfirm={handleApplyClaudeAuthLocal}
          onClose={() => setApplyClaudeModalConnectionId(null)}
        />
      )}
      {/* Claude Import Auth Modal */}
      {providerId === "claude" && importClaudeModalOpen && (
        <ImportClaudeAuthModal
          key="import-claude-modal"
          onClose={() => setImportClaudeModalOpen(false)}
          onSuccess={() => {
            setImportClaudeModalOpen(false);
            void fetchConnections();
          }}
        />
      )}
      {/* Gemini Apply Auth Modal */}
      {providerId === "gemini-cli" && applyGeminiModalConnectionId && (
        <ApplyGeminiAuthModal
          key={applyGeminiModalConnectionId}
          connectionId={applyGeminiModalConnectionId}
          inProgress={!!applyingGeminiAuthId}
          onConfirm={handleApplyGeminiAuthLocal}
          onClose={() => setApplyGeminiModalConnectionId(null)}
        />
      )}
      {/* Gemini Import Auth Modal */}
      {providerId === "gemini-cli" && importGeminiModalOpen && (
        <ImportGeminiAuthModal
          key="import-gemini-modal"
          onClose={() => setImportGeminiModalOpen(false)}
          onSuccess={() => {
            setImportGeminiModalOpen(false);
            void fetchConnections();
          }}
        />
      )}
      {/* Batch Test Results Modal */}
      {batchTestResults && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]"
          onClick={() => setBatchTestResults(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-bg-primary border border-border rounded-xl w-full max-w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-border bg-bg-primary/95 backdrop-blur-sm rounded-t-xl">
              <h3 className="font-semibold">{t("testResults")}</h3>
              <button
                onClick={() => setBatchTestResults(null)}
                className="p-1 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
                aria-label={t("close")}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-5">
              {batchTestResults.error &&
              (!batchTestResults.results || batchTestResults.results.length === 0) ? (
                <div className="text-center py-6">
                  <span className="material-symbols-outlined text-red-500 text-[32px] mb-2 block">
                    error
                  </span>
                  <p className="text-sm text-red-400">{String(batchTestResults.error)}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {batchTestResults.summary && (
                    <div className="flex items-center gap-3 text-xs mb-1">
                      <span className="text-text-muted">{providerInfo?.name || providerId}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-medium">
                        {t("passedCount", { count: batchTestResults.summary.passed })}
                      </span>
                      {batchTestResults.summary.failed > 0 && (
                        <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-medium">
                          {t("failedCount", { count: batchTestResults.summary.failed })}
                        </span>
                      )}
                      <span className="text-text-muted ml-auto">
                        {t("testedCount", { count: batchTestResults.summary.total })}
                      </span>
                    </div>
                  )}
                  {(batchTestResults.results || []).map((r: any, i: number) => (
                    <div
                      key={r.connectionId || i}
                      className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03]"
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          r.valid ? "text-emerald-500" : "text-red-500"
                        }`}
                      >
                        {r.valid ? "check_circle" : "error"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium">
                          {pickDisplayValue([r.connectionName], emailsVisible, r.connectionName)}
                        </span>
                      </div>
                      {r.latencyMs !== undefined && (
                        <span className="text-text-muted font-mono tabular-nums">
                          {t("millisecondsAbbr", { value: r.latencyMs })}
                        </span>
                      )}
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          r.valid
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {r.valid ? t("okShort") : r.diagnosis?.type || t("errorShort")}
                      </span>
                    </div>
                  ))}
                  {(!batchTestResults.results || batchTestResults.results.length === 0) && (
                    <div className="text-center py-4 text-text-muted text-sm">
                      {t("noActiveConnectionsInGroup")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Proxy Config Modal */}
      {proxyTarget && (
        <ProxyConfigModal
          isOpen={!!proxyTarget}
          onClose={() => setProxyTarget(null)}
          level={proxyTarget.level}
          levelId={proxyTarget.id}
          levelLabel={proxyTarget.label}
          onSaved={() => {
            void fetchProxyConfig();
          }}
        />
      )}
      {/* Import Progress Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => {
          if (importProgress.phase === "done" || importProgress.phase === "error") {
            setShowImportModal(false);
          }
        }}
        title={t("importingModelsTitle")}
        size="md"
        closeOnOverlay={false}
        showCloseButton={importProgress.phase === "done" || importProgress.phase === "error"}
      >
        <div className="flex flex-col gap-4">
          {/* Status text */}
          <div className="flex items-center gap-3">
            {importProgress.phase === "fetching" && (
              <span className="material-symbols-outlined text-primary animate-spin">
                progress_activity
              </span>
            )}
            {importProgress.phase === "importing" && (
              <span className="material-symbols-outlined text-primary animate-spin">
                progress_activity
              </span>
            )}
            {importProgress.phase === "done" && (
              <span className="material-symbols-outlined text-green-500">check_circle</span>
            )}
            {importProgress.phase === "error" && (
              <span className="material-symbols-outlined text-red-500">error</span>
            )}
            <span className="text-sm font-medium text-text-main">{importProgress.status}</span>
          </div>

          {/* Progress bar */}
          {(importProgress.phase === "importing" || importProgress.phase === "done") &&
            importProgress.total > 0 && (
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-muted">
                    {importProgress.current} / {importProgress.total}
                  </span>
                  <span className="text-xs text-text-muted">
                    {Math.round((importProgress.current / importProgress.total) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${(importProgress.current / importProgress.total) * 100}%`,
                      background:
                        importProgress.phase === "done"
                          ? "linear-gradient(90deg, #22c55e, #16a34a)"
                          : "linear-gradient(90deg, var(--color-primary), var(--color-primary-hover, var(--color-primary)))",
                    }}
                  />
                </div>
              </div>
            )}

          {/* Fetching indeterminate bar */}
          {importProgress.phase === "fetching" && (
            <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full animate-pulse"
                style={{
                  width: "60%",
                  background:
                    "linear-gradient(90deg, var(--color-primary), var(--color-primary-hover, var(--color-primary)))",
                }}
              />
            </div>
          )}

          {/* Error message */}
          {importProgress.phase === "error" && importProgress.error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{importProgress.error}</p>
            </div>
          )}

          {/* Log list */}
          {importProgress.logs.length > 0 && (
            <div className="max-h-48 overflow-y-auto rounded-lg bg-black/5 dark:bg-white/5 p-3 border border-black/5 dark:border-white/5">
              <div className="flex flex-col gap-1">
                {importProgress.logs.map((log, i) => (
                  <p
                    key={i}
                    className={`text-xs font-mono ${
                      typeof log === "string" && log.startsWith("✓")
                        ? "text-green-500 font-semibold"
                        : "text-text-muted"
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Close button */}
          {importProgress.phase === "done" && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 transition-opacity"
              >
                {t("close")}
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* Adapta Web — Tutorial Modal */}
      {providerId === "adapta-web" && (
        <Modal
          isOpen={showTutorialModal}
          onClose={() => setShowTutorialModal(false)}
          title="Como conectar o Adapta Web"
          size="md"
        >
          <div className="flex flex-col gap-5 text-sm">
            <p className="text-text-muted">
              O Adapta usa autenticação via Clerk. O token{" "}
              <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code> é um JWT
              de longa duração que permite renovar sessões automaticamente.
            </p>

            <ol className="flex flex-col gap-4 list-none">
              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <p className="font-medium">Acesse o chat do Adapta</p>
                  <p className="text-text-muted mt-0.5">
                    Abra{" "}
                    <a
                      href="https://agent.adapta.one/agentic-chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-primary"
                    >
                      agent.adapta.one/agentic-chat
                    </a>{" "}
                    e faça login com sua conta Gold ou Business.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <p className="font-medium">Abra o DevTools</p>
                  <p className="text-text-muted mt-0.5">
                    Pressione{" "}
                    <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono">F12</kbd>{" "}
                    ou{" "}
                    <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono">
                      Cmd+Option+I
                    </kbd>{" "}
                    para abrir as Ferramentas do Desenvolvedor.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <p className="font-medium">Vá em Application → Cookies</p>
                  <p className="text-text-muted mt-0.5">
                    Na aba <strong>Application</strong> (Chrome/Edge) ou <strong>Storage</strong>{" "}
                    (Firefox), expanda <strong>Cookies</strong> e clique em{" "}
                    <code className="bg-surface-2 px-1 rounded font-mono text-xs">
                      .clerk.agent.adapta.one
                    </code>
                    .
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <div>
                  <p className="font-medium">
                    Copie o valor do cookie{" "}
                    <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code>
                  </p>
                  <p className="text-text-muted mt-0.5">
                    Localize o cookie chamado{" "}
                    <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code> na
                    lista. Clique nele e copie o conteúdo da coluna <strong>Value</strong> — começa
                    com <code className="bg-surface-2 px-1 rounded font-mono text-xs">eyJ…</code>.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <div>
                  <p className="font-medium">Cole aqui e salve</p>
                  <p className="text-text-muted mt-0.5">
                    Clique em <strong>Add Connection</strong>, cole o valor do{" "}
                    <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code> no
                    campo de API Key e salve. O OmniRoute renovará a sessão automaticamente.
                  </p>
                </div>
              </li>
            </ol>

            <div
              className="rounded-lg p-3 text-xs text-text-muted"
              style={{ backgroundColor: "rgba(110,58,211,0.08)", borderLeft: "3px solid #6E3AD3" }}
            >
              <strong>Dica:</strong> O cookie <code className="font-mono">__client</code> tem
              validade longa (meses). Só será necessário renová-lo se você sair da conta ou o Adapta
              invalidar a sessão.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ModelRow, ModelVisibilityToolbar, PassthroughModelsSection, PassthroughModelRow,
// CustomModelsSection, CompatibleModelsSection → components/ (Phase 1e — Issue #3501)

// Phase 1d: CooldownTimer, inferErrorType, getStatusPresentation, ConnectionRow → components/ConnectionRow.tsx
// Phase 1d: ModelCompatPopover, recordToHeaderRows → components/ModelCompatPopover.tsx
// Phase 1d: SiliconFlowEndpointModal → components/SiliconFlowEndpointModal.tsx
