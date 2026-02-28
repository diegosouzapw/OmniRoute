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
  removeCustomModel,
} from "./db/models";

export {
  // Combos
  getCombos,
  getComboById,
  getComboByName,
  createCombo,
  updateCombo,
  deleteCombo,
} from "./db/combos";

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
  // Settings
  getSettings,
  updateSettings,
  isCloudEnabled,

  // Pricing
  getPricing,
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

export {
  // Backup Management
  backupDbFile,
  listDbBackups,
  restoreDbBackup,
} from "./db/backup";
