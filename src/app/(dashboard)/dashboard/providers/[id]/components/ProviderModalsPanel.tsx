"use client";

// Phase 1t.5 extraction — Issue #3501
// Pure composition of all modal elements rendered by ProviderDetailPageClient.
import {
  ConfirmModal,
  OAuthModal,
  KiroOAuthWrapper,
  CursorAuthModal,
  TraeAuthModal,
  ProxyConfigModal,
} from "@/shared/components";
import RiskNoticeModal from "../../components/RiskNoticeModal";
import CodexCliGuideModal from "../../components/CodexCliGuideModal";
import SiliconFlowEndpointModal from "./SiliconFlowEndpointModal";
import AddApiKeyModal from "./modals/AddApiKeyModal";
import EditConnectionModal from "./modals/EditConnectionModal";
import EditCompatibleNodeModal from "./modals/EditCompatibleNodeModal";
import ExternalLinkModal from "./ExternalLinkModal";
import BatchTestResultsModal from "./BatchTestResultsModal";
import ImportProgressModal from "./ImportProgressModal";
import { AdaptaTutorialModal } from "./AdaptaTutorialModal";
import { ImportCodexAuthModal, ApplyCodexAuthModal } from "./modals/ImportCodexAuthModal";
import { ImportClaudeAuthModal, ApplyClaudeAuthModal } from "./modals/ImportClaudeAuthModal";
import { ImportGeminiAuthModal, ApplyGeminiAuthModal } from "./modals/ImportGeminiAuthModal";
import { type ConnectionRowConnection } from "./ConnectionRow";
import { type BatchTestResults } from "../hooks/useProviderConnections";
import { type ImportProgress } from "../hooks/useModelImportHandlers";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface ProviderInfo {
  name: string;
  riskNoticeVariant?: string;
  [key: string]: unknown;
}

interface ProxyTarget {
  level: string;
  id: string;
  label: string;
}

interface ProviderModalsPanelProps {
  providerId: string;
  providerInfo: ProviderInfo;
  isCompatible: boolean;
  isAnthropicProtocolCompatible: boolean;
  isCcCompatible: boolean;
  isCommandCode: boolean;
  isUpstreamProxyProvider: boolean;
  subscriptionRisk: boolean;
  // Risk notice
  showRiskNoticeModal: boolean;
  handleConfirmRiskNotice: () => void;
  handleCancelRiskNotice: () => void;
  // OAuth
  showOAuthModal: boolean;
  reauthConnection: ConnectionRowConnection | null;
  handleOAuthSuccess: () => void;
  setShowOAuthModal: (show: boolean) => void;
  // SiliconFlow
  showSiliconFlowEndpointModal: boolean;
  setSiliconFlowInitialBaseUrl: (url: string | undefined) => void;
  setShowSiliconFlowEndpointModal: (open: boolean) => void;
  setShowAddApiKeyModal: (open: boolean) => void;
  // AddApiKey
  showAddApiKeyModal: boolean;
  siliconFlowInitialBaseUrl: string | undefined;
  commandCodeAuthState: { phase: string; [key: string]: unknown };
  handleStartCommandCodeAuth: () => void;
  handleSaveApiKey: (data: any) => Promise<void>;
  handleCloseAddApiKeyModal: () => void;
  // Batch delete confirm
  batchDeleteConfirmOpen: boolean;
  setBatchDeleteConfirmOpen: (open: boolean) => void;
  handleBatchDeleteConfirm: () => void;
  selectedIds: Set<string>;
  batchDeleting: boolean;
  // Codex auth
  applyCodexModalConnectionId: string | null;
  setApplyCodexModalConnectionId: (id: string | null) => void;
  applyingCodexAuthId: string | null;
  handleApplyCodexAuthLocal: (id: string) => Promise<void>;
  importCodexModalOpen: boolean;
  setImportCodexModalOpen: (open: boolean) => void;
  fetchConnections: () => Promise<void>;
  // External link
  externalLinkModalOpen: boolean;
  setExternalLinkModalOpen: (open: boolean) => void;
  externalLinkLoading: boolean;
  externalLinkError: string | null;
  externalLinkUrl: string | null;
  externalLinkCopied: boolean;
  externalLinkCopy: () => void;
  // Edit connection
  showEditModal: boolean;
  setShowEditModal: (open: boolean) => void;
  selectedConnection: ConnectionRowConnection | null;
  handleUpdateConnection: (data: any) => Promise<string | null>;
  // Edit compatible node
  showEditNodeModal: boolean;
  setShowEditNodeModal: (open: boolean) => void;
  providerNode: any;
  handleUpdateNode: (data: any) => Promise<void>;
  // Codex CLI guide
  codexCliGuideOpen: boolean;
  setCodexCliGuideOpen: (open: boolean) => void;
  // Claude auth
  applyClaudeModalConnectionId: string | null;
  setApplyClaudeModalConnectionId: (id: string | null) => void;
  applyingClaudeAuthId: string | null;
  handleApplyClaudeAuthLocal: (id: string) => Promise<void>;
  importClaudeModalOpen: boolean;
  setImportClaudeModalOpen: (open: boolean) => void;
  // Gemini auth
  applyGeminiModalConnectionId: string | null;
  setApplyGeminiModalConnectionId: (id: string | null) => void;
  applyingGeminiAuthId: string | null;
  handleApplyGeminiAuthLocal: (id: string) => Promise<void>;
  importGeminiModalOpen: boolean;
  setImportGeminiModalOpen: (open: boolean) => void;
  // Batch test results
  batchTestResults: BatchTestResults | null;
  setBatchTestResults: (r: BatchTestResults | null) => void;
  emailsVisible: boolean;
  // Proxy config
  proxyTarget: ProxyTarget | null;
  setProxyTarget: (t: ProxyTarget | null) => void;
  fetchProxyConfig: () => Promise<void>;
  // Import progress
  importProgress: ImportProgress;
  showImportModal: boolean;
  setShowImportModal: (open: boolean) => void;
  // Tutorial
  showTutorialModal: boolean;
  setShowTutorialModal: (open: boolean) => void;
  t: ProviderMessageTranslator;
}

export default function ProviderModalsPanel({
  providerId,
  providerInfo,
  isCompatible,
  isAnthropicProtocolCompatible,
  isCcCompatible,
  isUpstreamProxyProvider,
  subscriptionRisk,
  showRiskNoticeModal,
  handleConfirmRiskNotice,
  handleCancelRiskNotice,
  showOAuthModal,
  reauthConnection,
  handleOAuthSuccess,
  setShowOAuthModal,
  showSiliconFlowEndpointModal,
  setSiliconFlowInitialBaseUrl,
  setShowSiliconFlowEndpointModal,
  setShowAddApiKeyModal,
  showAddApiKeyModal,
  siliconFlowInitialBaseUrl,
  commandCodeAuthState,
  handleStartCommandCodeAuth,
  handleSaveApiKey,
  handleCloseAddApiKeyModal,
  isCommandCode,
  batchDeleteConfirmOpen,
  setBatchDeleteConfirmOpen,
  handleBatchDeleteConfirm,
  selectedIds,
  batchDeleting,
  applyCodexModalConnectionId,
  setApplyCodexModalConnectionId,
  applyingCodexAuthId,
  handleApplyCodexAuthLocal,
  importCodexModalOpen,
  setImportCodexModalOpen,
  fetchConnections,
  externalLinkModalOpen,
  setExternalLinkModalOpen,
  externalLinkLoading,
  externalLinkError,
  externalLinkUrl,
  externalLinkCopied,
  externalLinkCopy,
  showEditModal,
  setShowEditModal,
  selectedConnection,
  handleUpdateConnection,
  showEditNodeModal,
  setShowEditNodeModal,
  providerNode,
  handleUpdateNode,
  codexCliGuideOpen,
  setCodexCliGuideOpen,
  applyClaudeModalConnectionId,
  setApplyClaudeModalConnectionId,
  applyingClaudeAuthId,
  handleApplyClaudeAuthLocal,
  importClaudeModalOpen,
  setImportClaudeModalOpen,
  applyGeminiModalConnectionId,
  setApplyGeminiModalConnectionId,
  applyingGeminiAuthId,
  handleApplyGeminiAuthLocal,
  importGeminiModalOpen,
  setImportGeminiModalOpen,
  batchTestResults,
  setBatchTestResults,
  emailsVisible,
  proxyTarget,
  setProxyTarget,
  fetchProxyConfig,
  importProgress,
  showImportModal,
  setShowImportModal,
  showTutorialModal,
  setShowTutorialModal,
  t,
}: ProviderModalsPanelProps) {
  return (
    <>
      {showRiskNoticeModal && subscriptionRisk && (
        <RiskNoticeModal
          variant={(providerInfo.riskNoticeVariant as string) ?? "oauth"}
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
            onClose={() => setShowOAuthModal(false)}
          />
        ) : providerId === "cursor" ? (
          <CursorAuthModal
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            onSuccess={handleOAuthSuccess}
            onClose={() => setShowOAuthModal(false)}
          />
        ) : providerId === "trae" ? (
          <TraeAuthModal
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            onSuccess={handleOAuthSuccess}
            onClose={() => setShowOAuthModal(false)}
          />
        ) : (
          <OAuthModal
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            provider={providerId}
            providerInfo={providerInfo}
            onSuccess={handleOAuthSuccess}
            onClose={() => setShowOAuthModal(false)}
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
          providerId={providerId}
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
      <CodexCliGuideModal isOpen={codexCliGuideOpen} onClose={() => setCodexCliGuideOpen(false)} />
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
      {providerId === "claude" && applyClaudeModalConnectionId && (
        <ApplyClaudeAuthModal
          key={applyClaudeModalConnectionId}
          connectionId={applyClaudeModalConnectionId}
          inProgress={!!applyingClaudeAuthId}
          onConfirm={handleApplyClaudeAuthLocal}
          onClose={() => setApplyClaudeModalConnectionId(null)}
        />
      )}
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
      {providerId === "gemini-cli" && applyGeminiModalConnectionId && (
        <ApplyGeminiAuthModal
          key={applyGeminiModalConnectionId}
          connectionId={applyGeminiModalConnectionId}
          inProgress={!!applyingGeminiAuthId}
          onConfirm={handleApplyGeminiAuthLocal}
          onClose={() => setApplyGeminiModalConnectionId(null)}
        />
      )}
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
      <BatchTestResultsModal
        batchTestResults={batchTestResults}
        providerInfo={providerInfo}
        providerId={providerId}
        emailsVisible={emailsVisible}
        onClose={() => setBatchTestResults(null)}
        t={t}
      />
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
      <ImportProgressModal
        importProgress={importProgress}
        isOpen={showImportModal}
        onClose={() => {
          if (importProgress.phase === "done" || importProgress.phase === "error") {
            setShowImportModal(false);
          }
        }}
        t={t}
      />
      {providerId === "adapta-web" && (
        <AdaptaTutorialModal
          isOpen={showTutorialModal}
          onClose={() => setShowTutorialModal(false)}
        />
      )}
    </>
  );
}
