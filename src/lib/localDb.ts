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
  clearConnectionErrorIfUnchanged,
  deleteProviderConnection,
  deleteProviderConnections,
  deleteProviderConnectionsByProvider,
  reorderProviderConnections,
  cleanupProviderConnections,

  // Provider Nodes
  getProviderNodes,
  getProviderNodeById,
  resolveProviderNodeForConnection,
  createProviderNode,
  updateProviderNode,
  deleteProviderNode,

  // T05: Rate-limit DB persistence (survives token refresh)
  setConnectionRateLimitUntil,
  isConnectionRateLimited,
  getRateLimitedConnections,

  // T05 startup recovery: clear stale transient cooldowns left by a prior crash
  clearStaleCrashCooldowns,

  // T13: Stale quota display fix (zero out usage after window resets)
  getEffectiveQuotaUsage,
  formatResetCountdown,
} from "./db/providers";

export {
  // Model Aliases
  getModelAliases,
  setModelAlias,
  deleteModelAlias,
  deleteModelAliasesForProvider,

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
  setModelIsHidden,
  getHiddenModelsByProvider,

  // Synced Available Models
  getSyncedAvailableModels,
  getAllSyncedAvailableModels,
  replaceSyncedAvailableModelsForConnection,
  deleteSyncedAvailableModelsForConnection,
  deleteSyncedAvailableModelsForProvider,
  removeSyncedAvailableModel,
} from "./db/models";

export type { ModelCompatPerProtocol, ModelCompatPatch, SyncedAvailableModel } from "./db/models";

export {
  // Combos
  getCombos,
  getComboById,
  getComboByName,
  getComboByNameInsensitive,
  createCombo,
  updateCombo,
  reorderCombos,
  deleteCombo,
} from "./db/combos";

export * from "./db/compressionCacheStats";
export * from "./db/compressionCombos";
export * from "./db/compressionRunTelemetry";
export * from "./db/modelContextOverrides";

export {
  // API Keys
  getApiKeys,
  getApiKeyById,
  createApiKey,
  deleteApiKey,
  validateApiKey,
  getApiKeyMetadata,
  updateApiKeyPermissions,
  regenerateApiKey,
  isModelAllowedForKey,
  pickApiKeyForInternalUse,
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
  getDatabaseSettings,
  getUserDatabaseSettings,
  updateDatabaseSettings,
} from "./db/databaseSettings";

export type { UserDatabaseSettings } from "./db/databaseSettings";

export {
  // Proxy Registry
  listProxies,
  getProxyById,
  createProxy,
  createProxyAndAssign,
  updateProxy,
  updateProxyAndAssign,
  upsertProxy,
  deleteProxyById,
  getProxyAssignments,
  getProxyWhereUsed,
  assignProxyToScope,
  addProxyToScopePool,
  removeProxyFromScopePool,
  getScopeProxyPool,
  setScopeRotationStrategy,
  getScopeRotationStrategy,
  resolveProxyForConnectionFromRegistry,
  resolveProxyForProvider,
  resolveProxyForScopeFromRegistry,
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
  setDbBackupMaxFiles,
  getDbBackupRetentionDays,
  setDbBackupRetentionDays,
  listDbBackups,
  restoreDbBackup,
  // Export-All / Import helpers (#3500 slice 5)
  exportAllSummaryRows,
  getTableNamesFromAdapter,
  countImportedRows,
} from "./db/backup";

export type { ExportAllRows } from "./db/backup";

export {
  // Skills DB operations (#3500 slice 5)
  updateSkill,
} from "./db/skills";

export type { SkillPatch } from "./db/skills";

export {
  // Read Cache (cached wrappers for hot-read paths)
  getCachedSettings,
  getCachedPricing,
  getCachedProviderConnections,
  getCachedLKGP,
  setCachedLKGP,
  invalidateDbCache,
  getCombosCacheVersion,
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
  countFiles,
  formatFileResponse,
  deleteFile,
} from "./db/files";

export {
  // Batches
  createBatch,
  getBatch,
  updateBatch,
  listBatches,
  countBatches,
  getPendingBatches,
  getTerminalBatches,
  ensureBatchItemCheckpoints,
  countBatchItemCheckpoints,
  listBatchItemCheckpoints,
  markBatchItemProcessing,
  markBatchItemResult,
  markBatchItemError,
  deleteBatch,
  deleteCompletedBatches,
} from "./db/batches";

export type { FileRecord } from "./db/files";
export type { BatchItemCheckpoint, BatchRecord } from "./db/batches";

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

export type { Webhook, WebhookKind } from "./db/webhooks";

export { insertDelivery, getDeliveries } from "./db/webhookDeliveries";

export {
  upsertDiscoveryResult,
  getDiscoveryResults,
  getDiscoveryResultById,
  markVerified,
  deleteDiscoveryResult,
} from "./db/discoveryResults";

export type {
  DiscoveryResult,
  DiscoveryMethod,
  DiscoveryAuthType,
  DiscoveryRiskLevel,
  DiscoveryStatus,
} from "./db/discoveryResults";
export type { WebhookDelivery } from "./db/webhookDeliveries";

export {
  saveQuotaSnapshot,
  getQuotaSnapshots,
  getAggregatedSnapshots,
  cleanupOldSnapshots,
} from "./db/quotaSnapshots";

export * from "./db/sessionAccountAffinity";
export * from "./db/quotaResetEvents";

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
  getServiceRow,
  updateServiceField,
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

export {
  getSessionAccountAffinity,
  upsertSessionAccountAffinity,
  touchSessionAccountAffinity,
  deleteSessionAccountAffinity,
  evictSessionAccountAffinityForConnection,
  cleanupStaleSessionAccountAffinities,
  startSessionAccountAffinityCleanup,
  stopSessionAccountAffinityCleanupForTests,
} from "./db/sessionAccountAffinity";

export {
  // Gamification & Leaderboard
  updateScore,
  getRank,
  getTopN,
  addXp,
  getXp,
  updateLevel,
  unlockBadge,
  hasBadge,
  getBadges,
  getBadgeDefinitions,
  transferTokens,
  getBalance,
  getHistory,
  createInviteToken,
  getInviteByCode,
  redeemInvite,
  revokeInvite,
  connectServer,
  disconnectServer,
  listServers,
  getConnectedServerByKeyHash,
} from "./db/gamification";

export type {
  LeaderboardRow,
  UserLevelRow,
  BadgeDefinition,
  UserBadge,
  XpAuditLogEntry,
  TokenLedgerEntry,
  InviteToken,
  CommunityServer,
} from "./db/gamification";

export * from "./db/featureFlags";

export {
  upsertHandoff,
  getHandoff,
  deleteHandoff,
  cleanupExpiredHandoffs,
  hasActiveHandoff,
  recordSessionModelUsage,
  getLastSessionModel,
} from "./db/contextHandoffs";

export type { HandoffPayload } from "./db/contextHandoffs";

export {
  getAllMiddlewareHooks,
  getEnabledMiddlewareHooks,
  getComboMiddlewareHooks,
  getMiddlewareHook,
  createMiddlewareHook,
  updateMiddlewareHook,
  deleteMiddlewareHook,
  recordHookExecution,
  insertHookLog,
  getHookLogs,
  cleanupHookLogs,
} from "./db/middleware";

export {
  getAllKeyGroups,
  getKeyGroup,
  getKeyGroupWithPermissions,
  createKeyGroup,
  updateKeyGroup,
  deleteKeyGroup,
  getGroupPermissions,
  addGroupPermission,
  removeGroupPermission,
  clearGroupPermissions,
  getGroupMembers,
  getKeyGroupsForApiKey,
  addKeyToGroup,
  removeKeyFromGroup,
  checkKeyModelAccess,
} from "./db/apiKeyGroups";

export {
  createRelayToken,
  getRelayTokens,
  getRelayToken,
  getRelayTokenByHash,
  updateRelayToken,
  deleteRelayToken,
  toggleRelayToken,
  checkRateLimit,
  recordRelayUsage,
  getRelayUsage,
  getRelayLogs,
} from "./db/relayProxies";

export type {
  RelayToken,
  RelayTokenRow,
  RelayLogRow,
  CreateRelayTokenInput,
  RelayTokenWithSecret,
} from "./db/relayProxies";

export {
  upsertFreeProxy,
  listFreeProxies,
  countFreeProxies,
  listFreeProxiesBySource,
  getFreeProxyById,
  markFreeProxyInPool,
  promoteFreeProxyToPool,
  deleteFreeProxy,
  clearFreeProxiesBySource,
  pruneStaleFreeProxies,
  getFreeProxyStats,
  recordFreeProxySync,
  recordFreeProxySyncErrors,
  clearFreeProxySyncErrors,
  getFreeProxySyncErrors,
} from "./db/freeProxies";

export type { FreeProxyRecord, FreeProxyStats, FreeProxySyncErrors } from "./db/freeProxies";

export {
  listPlaygroundPresets,
  getPlaygroundPreset,
  createPlaygroundPreset,
  updatePlaygroundPreset,
  deletePlaygroundPreset,
} from "./db/playgroundPresets";

export type { PlaygroundPresetListItem } from "./db/playgroundPresets";
// Plan 21 — Memory Engine Redesign
export {
  getMemoryVecMeta,
  setMemoryVecMeta,
  markMemoryNeedsReindex,
  markAllMemoriesNeedReindex,
  getMemoryReindexQueue,
  countMemoryReindexPending,
  type MemoryVecMeta,
} from "./db/memoryVec";
// T-A-F2: AgentBridge state/mappings/bypass + Inspector custom hosts/sessions
export * from "./db/agentBridgeState";
export * from "./db/agentBridgeMappings";
export * from "./db/agentBridgeBypass";
export * from "./db/inspectorCustomHosts";
export * from "./db/inspectorSessions";
export * from "./db/omp";
// Quota Sharing — Group B (planos 16+22)
export {
  listPools,
  getPool,
  getPoolsByGroup,
  createPool,
  updatePool,
  deletePool,
  upsertAllocations,
  listAllocationsForApiKey,
} from "./db/quotaPools";
// Quota per-(key, model) caps — Group B Fase 3 #7
export { getModelCap, listModelCaps, setModelCap, deleteModelCap } from "./db/quotaModelCaps";

export {
  // Quota Groups (B2)
  createGroup,
  getGroup,
  getGroupName,
  listGroups,
  renameGroup,
  deleteGroup,
} from "./db/quotaGroups";

export type { QuotaGroup } from "./db/quotaGroups";
export {
  getBucket,
  incrementBucket,
  getPair,
  sumPoolDimension,
  gcOlderThan as gcQuotaConsumption,
} from "./db/quotaConsumption";
export {
  getPlan as getProviderPlan,
  listPlans as listProviderPlans,
  upsertPlan as upsertProviderPlan,
  deletePlan as deleteProviderPlan,
} from "./db/providerPlans";

export {
  // Per-API-Key Token Limits (migration 073)
  upsertTokenLimit,
  listTokenLimits,
  getTokenLimitsForRequest,
  deleteTokenLimit,
  getWindowUsage,
  incrementWindowTokens,
  resetWindowIfElapsed,
  logTokenLimitReset,
} from "./db/tokenLimits";

export type {
  TokenLimit,
  TokenLimitScopeType,
  UpsertTokenLimitInput,
  TokenWindowState,
} from "./db/tokenLimits";

export {
  insertPlugin,
  getPluginById,
  getPluginByName,
  listPlugins,
  updatePluginStatus,
  updatePluginConfig,
  deletePlugin,
  pluginExists,
} from "./db/plugins";

export type { PluginRow, PluginCreateInput } from "./db/plugins";

export {
  getApiKeyContextSource,
  setApiKeyContextSource,
  deleteApiKeyContextSource,
  listApiKeyContextSources,
} from "./db/apiKeyContextSources";
export type { ApiKeyContextSource } from "./db/apiKeyContextSources";

export { sumUsageTokensThisMonth } from "./db/usageSummary";

export {
  // Model Intelligence (task-fitness scores)
  getModelIntelligence,
  getModelIntelligenceBySource,
  upsertModelIntelligence,
  deleteModelIntelligence,
  deleteExpiredIntelligence,
  deleteModelIntelligenceBySource,
  listModelIntelligence,
  bulkUpsertModelIntelligence,
  getResolvedTaskFitness,
  setUserFitnessOverrideEntry,
  deleteUserFitnessOverrideEntry,
} from "./db/modelIntelligence";

export type { ModelIntelligenceEntry } from "./db/modelIntelligence";

export {
  getProviderMetrics,
  getSearchProviderStats,
  getRecentSearchLogs,
  getSearchAggregateStats,
  getSearchProviderCounts,
  getFallbackStats,
} from "./db/callLogStats";
export type {
  ProviderMetricRow,
  SearchProviderStatRow,
  SearchRecentRow,
  SearchAggregateStats,
  SearchProviderCountRow,
  FallbackStatsRow,
} from "./db/callLogStats";

export {
  buildUnifiedSource,
  buildPresetUnifiedSource,
  getUsageSummary,
  getDailyUsage,
  getDailyCostRows,
  getHeatmapRows,
  getModelUsageRows,
  getProviderCostRows,
  getProviderUsageRows,
  getAccountCostRows,
  getAccountUsageRows,
  getApiKeyUsageRows,
  getServiceTierUsageRows,
  getApiKeyMetadataRows,
  getWeeklyPatternRows,
  getPresetCostModelRows,
  getAllUsageHistory,
  getAllDomainCostHistory,
  getAllDomainBudgets,
} from "./db/usageAnalytics";
export type {
  AnalyticsParams,
  BuildUnifiedSourceOptions,
  UnifiedSourceResult,
  UsageSummaryRow,
  DailyUsageRow,
  DailyCostRow,
  HeatmapRow,
  ModelUsageRow,
  ProviderCostRow,
  ProviderUsageRow,
  AccountCostRow,
  AccountUsageRow,
  ApiKeyUsageRow,
  ServiceTierUsageRow,
  ApiKeyMetadataRow,
  WeeklyPatternRow,
  PresetCostModelRow,
} from "./db/usageAnalytics";

// ---------------------------------------------------------------------------
// usage_logs — auto-routing analytics (#3500 slice 4)
// ---------------------------------------------------------------------------
export {
  getAutoRoutingTotalCount,
  getAutoRoutingVariantBreakdown,
  getAutoRoutingTopProviders,
} from "./db/usageLogs";
export type {
  AutoRoutingTotalResult,
  AutoRoutingVariantRow,
  AutoRoutingTopProviderRow,
} from "./db/usageLogs";

// ---------------------------------------------------------------------------
// semantic_cache — cache entries CRUD (#3500 slice 4)
// ---------------------------------------------------------------------------
export {
  listSemanticCacheEntries,
  deleteSemanticCacheBySignature,
  deleteSemanticCacheByModel,
} from "./db/semanticCache";
export type {
  SemanticCacheEntry,
  SemanticCacheListOptions,
  SemanticCacheListResult,
  DeleteSemanticCacheBySignatureResult,
  DeleteSemanticCacheByModelResult,
} from "./db/semanticCache";

// ---------------------------------------------------------------------------
// proxy_logs — export query (#3500 slice 4)
// ---------------------------------------------------------------------------
export { exportProxyLogsSince } from "./db/proxyLogs";
// ---------------------------------------------------------------------------
// Per-connection 429 cooldown wrappers (#5957 / #5958 — Issue 1 follow-ups)
// Logic lives in db/providers/rateLimit.ts (Hard Rule #2 — localDb is re-export
// only); re-exported here for the historical localDb import contract.
// ---------------------------------------------------------------------------
export { markConnectionRateLimitedUntil, clearConnectionRateLimit } from "./db/providers";
// Provider param filters — denylist/allowlist config per provider/model (#6625)
export * from "./db/paramFilters";
export * from "./db/interceptionRules"; // Per-model web-search/web-fetch interception rules (#3384)
