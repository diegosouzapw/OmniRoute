/**
 * localDb.js — Re-export layer for backward compatibility.
 *
 * All 27+ consumer files import from "@/lib/localDb".
 * This thin layer re-exports everything from the domain-specific DB modules,
 * so zero consumer changes are needed.
 */

export {
  // Provider Connections
  getProviderConnections,
  getProviderConnectionById,
  createProviderConnection,
  updateProviderConnection,
  deleteProviderConnection,
  deleteProviderConnectionsByProvider,
  reorderProviderConnections,
  cleanupProviderConnections,

  // Provider Nodes
  getProviderNodes,
  getProviderNodeById,
  createProviderNode,
  updateProviderNode,
  deleteProviderNode,

  // T05: Rate-limit DB persistence (survives token refresh)
  setConnectionRateLimitUntil,
  isConnectionRateLimited,
  getRateLimitedConnections,

  // T13: Stale quota display fix (zero out usage after window resets)
  getEffectiveQuotaUsage,
  formatResetCountdown,
} from "./db/providers";

export {
  // Model Aliases
  getModelAliases,
  setModelAlias,
  deleteModelAlias,

  // MITM Alias
  getMitmAlias,
  setMitmAliasAll,

  // Custom Models
  getCustomModels,
  getAllCustomModels,
  addCustomModel,
  replaceCustomModels,
  removeCustomModel,
  updateCustomModel,
  getModelCompatOverrides,
  mergeModelCompatOverride,
  removeModelCompatOverride,
  getModelNormalizeToolCallId,
  getModelPreserveOpenAIDeveloperRole,
  getModelUpstreamExtraHeaders,
  getModelIsHidden,

  // Synced Available Models
  getSyncedAvailableModels,
  getAllSyncedAvailableModels,
  replaceSyncedAvailableModelsForConnection,
  deleteSyncedAvailableModelsForConnection,
} from "./db/models";

export type { ModelCompatPerProtocol, ModelCompatPatch, SyncedAvailableModel } from "./db/models";

export {
  // Combos
  getCombos,
  getComboById,
  getComboByName,
  createCombo,
  updateCombo,
  reorderCombos,
  deleteCombo,
} from "./db/combos";

export * from "./db/compressionCacheStats";
export * from "./db/compressionCombos";

export {
  // API Keys
  getApiKeys,
  getApiKeyById,
  createApiKey,
  deleteApiKey,
  validateApiKey,
  getApiKeyMetadata,
  updateApiKeyPermissions,
  isModelAllowedForKey,
  clearApiKeyCaches,
  resetApiKeyState,
} from "./db/apiKeys";

export {
  // Evals
  saveEvalRun,
  listEvalRuns,
  getEvalScorecard,
  listCustomEvalSuites,
  getCustomEvalSuite,
  saveCustomEvalSuite,
  deleteCustomEvalSuite,
  serializeEvalTargetKey,
} from "./db/evals";

export type {
  EvalCaseRecord,
  EvalSuiteRecord,
  EvalTargetType,
  EvalTargetDescriptor,
  EvalRunSummary,
  PersistedEvalRun,
} from "./db/evals";

export {
  // Settings
  getSettings,
  updateSettings,
  isCloudEnabled,

  // LKGP (Last Known Good Provider) (#919)
  getLKGP,
  setLKGP,

  // Pricing
  getPricing,
  getPricingWithSources,
  getPricingForModel,
  updatePricing,
  resetPricing,
  resetAllPricing,

  // Proxy Config
  getProxyConfig,
  getProxyForLevel,
  setProxyForLevel,
  deleteProxyForLevel,
  resolveProxyForConnection,
  setProxyConfig,
} from "./db/settings";

export type { PricingSource, PricingSourceMap } from "./db/settings";

export {
  // Proxy Registry
  listProxies,
  getProxyById,
  createProxy,
  updateProxy,
  upsertProxy,
  deleteProxyById,
  getProxyAssignments,
  getProxyWhereUsed,
  assignProxyToScope,
  resolveProxyForConnectionFromRegistry,
  resolveProxyForProvider,
  migrateLegacyProxyConfigToRegistry,
  getProxyHealthStats,
  bulkAssignProxyToScope,
} from "./db/proxies";

export {
  // Pricing Sync
  getSyncedPricing,
  saveSyncedPricing,
  clearSyncedPricing,
  syncPricingFromSources,
  getSyncStatus,
  initPricingSync,
  startPeriodicSync,
  stopPeriodicSync,
} from "./pricingSync";

export {
  // Backup Management
  backupDbFile,
  cleanupDbBackups,
  getDbBackupMaxFiles,
  getDbBackupRetentionDays,
  listDbBackups,
  restoreDbBackup,
} from "./db/backup";

export {
  // Read Cache (cached wrappers for hot-read paths)
  getCachedSettings,
  getCachedPricing,
  getCachedProviderConnections,
  getCachedLKGP,
  setCachedLKGP,
  invalidateDbCache,
} from "./db/readCache";

export {
  // Registered Keys Provisioning (#464)
  issueRegisteredKey,
  getRegisteredKey,
  listRegisteredKeys,
  revokeRegisteredKey,
  validateRegisteredKey,
  incrementRegisteredKeyUsage,
  checkQuota,
  setProviderKeyLimit,
  setAccountKeyLimit,
  getProviderKeyLimit,
  getAccountKeyLimit,
} from "./db/registeredKeys";

export type {
  RegisteredKey,
  RegisteredKeyWithSecret,
  ProviderKeyLimit,
  AccountKeyLimit,
  QuotaCheckResult,
  IssueKeyParams,
} from "./db/registeredKeys";

export {
  // Model-Combo Mappings (#563)
  getModelComboMappings,
  getModelComboMappingById,
  createModelComboMapping,
  updateModelComboMapping,
  deleteModelComboMapping,
  resolveComboForModel,
} from "./db/modelComboMappings";

export {
  // Files
  createFile,
  getFile,
  getFileContent,
  listFiles,
  updateFileStatus,
  formatFileResponse,
  deleteFile,
} from "./db/files";

export {
  // Batches
  createBatch,
  getBatch,
  updateBatch,
  listBatches,
  getPendingBatches,
  getTerminalBatches,
} from "./db/batches";

export type { FileRecord } from "./db/files";
export type { BatchRecord } from "./db/batches";

export type { ModelComboMapping } from "./db/modelComboMappings";

export {
  // Webhooks
  getWebhooks,
  getWebhook,
  getEnabledWebhooks,
  createWebhook,
  updateWebhook as updateWebhookRecord,
  deleteWebhook,
  recordWebhookDelivery,
  disableWebhooksWithHighFailures,
} from "./db/webhooks";

export type { Webhook } from "./db/webhooks";

export {
  saveQuotaSnapshot,
  getQuotaSnapshots,
  getAggregatedSnapshots,
  cleanupOldSnapshots,
} from "./db/quotaSnapshots";

export type { QuotaSnapshotRow, ProviderUtilizationPoint } from "@/shared/types/utilization";

export {
  getVersionManagerStatus,
  getVersionManagerTool,
  upsertVersionManagerTool,
  updateVersionManagerTool,
  deleteVersionManagerTool,
  updateToolHealth,
  updateToolVersion,
  setToolStatus,
} from "./db/versionManager";

export {
  listSyncTokens,
  getSyncTokenById,
  getSyncTokenByHash,
  createSyncTokenRecord,
  revokeSyncToken,
  touchSyncTokenLastUsed,
} from "./db/syncTokens";

export {
  getUpstreamProxyConfigs,
  getUpstreamProxyConfig,
  upsertUpstreamProxyConfig,
  updateUpstreamProxyConfig,
  deleteUpstreamProxyConfig,
  getProvidersByMode,
  getFallbackChainForProvider,
  validateProxyUrl,
} from "./db/upstreamProxy";

export {
  getProviderLimitsCache,
  getAllProviderLimitsCache,
  setProviderLimitsCache,
  setProviderLimitsCacheBatch,
  deleteProviderLimitsCache,
} from "./db/providerLimits";

export type { ProviderLimitsCacheEntry } from "./db/providerLimits";

export {
  getPersistedCreditBalance,
  getAllPersistedCreditBalances,
  persistCreditBalance,
} from "./db/creditBalance";

export {
  insertCompressionAnalyticsRow,
  getCompressionAnalyticsSummary,
} from "./db/compressionAnalytics";

export type {
  CompressionAnalyticsRow,
  CompressionAnalyticsSummary,
} from "./db/compressionAnalytics";

export {
  // Reasoning Replay Cache (#1628)
  setReasoningCache,
  getReasoningCache,
  deleteReasoningCache,
  clearAllReasoningCache,
} from "./db/reasoningCache";

export type { ReasoningCacheEntry, ReasoningCacheStats } from "./db/reasoningCache";

export {
  // 1proxy Integration (#1788)
  listOneproxyProxies,
  getOneproxyStats,
  upsertOneproxyProxy,
  getOneproxyProxyById,
  deleteOneproxyProxy,
  clearAllOneproxyProxies,
  getOneproxyProxyForRotation,
  markOneproxyProxyFailed,
} from "./db/oneproxy";

export type { OneproxyProxyRecord, OneproxyStats } from "./db/oneproxy";
