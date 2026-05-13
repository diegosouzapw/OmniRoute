/**
 * Settings-specific Zod schemas.
 *
 * Extracted from schemas.ts to work around the webpack barrel-file
 * optimization bug that makes large schema barrel exports `undefined`
 * at runtime (see: https://github.com/vercel/next.js/issues/12557).
 */
import { z } from "zod";
import { COMBO_CONFIG_MODES } from "@/shared/constants/comboConfigMode";
import { MAX_REQUEST_BODY_LIMIT_MB, MIN_REQUEST_BODY_LIMIT_MB } from "@/shared/constants/bodySize";
import { HIDEABLE_SIDEBAR_ITEM_IDS } from "@/shared/constants/sidebarVisibility";
import { ACCOUNT_FALLBACK_STRATEGY_VALUES } from "@/shared/constants/routingStrategies";

const signatureCacheModeValues = ["enabled", "bypass", "bypass-strict"] as const;

export const updateSettingsSchema = z.object({
  newPassword: z.string().min(1).max(200).optional(),
  currentPassword: z.string().max(200).optional(),
  theme: z.string().max(50).optional(),
  language: z.string().max(10).optional(),
  requireLogin: z.boolean().optional(),
  enableSocks5Proxy: z.boolean().optional(),
  instanceName: z.string().max(100).optional(),
  customLogoUrl: z.string().max(2000).optional(),
  customLogoBase64: z.string().max(100000).optional(),
  customFaviconUrl: z.string().max(2000).optional(),
  customFaviconBase64: z.string().max(50000).optional(),
  corsOrigins: z.string().max(500).optional(),
  cloudUrl: z.string().max(500).optional(),
  baseUrl: z.string().max(500).optional(),
  setupComplete: z.boolean().optional(),
  blockedProviders: z.array(z.string().max(100)).optional(),
  hideHealthCheckLogs: z.boolean().optional(),
  hideEndpointCloudflaredTunnel: z.boolean().optional(),
  hideEndpointTailscaleFunnel: z.boolean().optional(),
  hideEndpointNgrokTunnel: z.boolean().optional(),
  debugMode: z.boolean().optional(),
  hiddenSidebarItems: z.array(z.enum(HIDEABLE_SIDEBAR_ITEM_IDS)).optional(),
  comboConfigMode: z.enum(COMBO_CONFIG_MODES).optional(),
  codexServiceTier: z.object({ enabled: z.boolean() }).optional(),
  // Routing settings (#134)
  fallbackStrategy: z.enum(ACCOUNT_FALLBACK_STRATEGY_VALUES).optional(),
  wildcardAliases: z.array(z.object({ pattern: z.string(), target: z.string() })).optional(),
  stickyRoundRobinLimit: z.number().int().min(0).max(1000).optional(),
  requestRetry: z.number().int().min(0).max(10).optional(),
  maxRetryIntervalSec: z.number().int().min(0).max(300).optional(),
  maxBodySizeMb: z
    .number()
    .int()
    .min(MIN_REQUEST_BODY_LIMIT_MB)
    .max(MAX_REQUEST_BODY_LIMIT_MB)
    .optional(),
  // Auto intent classifier settings (multilingual routing)
  intentDetectionEnabled: z.boolean().optional(),
  intentSimpleMaxWords: z.number().int().min(1).max(500).optional(),
  intentExtraCodeKeywords: z.array(z.string().max(100)).optional(),
  intentExtraReasoningKeywords: z.array(z.string().max(100)).optional(),
  intentExtraSimpleKeywords: z.array(z.string().max(100)).optional(),
  // Protocol toggles (default: disabled)
  mcpEnabled: z.boolean().optional(),
  mcpTransport: z.enum(["stdio", "sse", "streamable-http"]).optional(),
  a2aEnabled: z.boolean().optional(),
  wsAuth: z.boolean().optional(),
  // CLI Fingerprint compatibility (per-provider)
  cliCompatProviders: z.array(z.string().max(100)).optional(),
  // Strip provider/model prefix at proxy layer (e.g. "openai/gpt-4" → "gpt-4")
  stripModelPrefix: z.boolean().optional(),
  // Cache control preservation mode
  alwaysPreserveClientCache: z.enum(["auto", "always", "never"]).optional(),
  antigravitySignatureCacheMode: z.enum(signatureCacheModeValues).optional(),
  // Adaptive Volume Routing
  adaptiveVolumeRouting: z.boolean().optional(),
  // Usage token buffer — safety margin added to reported prompt/input token counts.
  // Prevents CLI tools from overrunning context windows. Set to 0 to disable.
  usageTokenBuffer: z.number().int().min(0).max(50000).optional(),
  // Custom CLI agent definitions for ACP
  customAgents: z
    .array(
      z.object({
        id: z.string().max(50),
        name: z.string().max(100),
        binary: z.string().max(200),
        versionCommand: z.string().max(300),
        providerAlias: z.string().max(50),
        spawnArgs: z.array(z.string().max(200)),
        protocol: z.enum(["stdio", "http"]),
      })
    )
    .optional(),
  // SkillsMP marketplace API key
  skillsmpApiKey: z.string().max(200).optional(),
  // Active skills provider (single source of truth for skills page)
  skillsProvider: z.enum(["skillsmp", "skillssh"]).optional(),
  // models.dev sync settings
  modelsDevSyncEnabled: z.boolean().optional(),
  modelsDevSyncInterval: z.number().int().min(3600000).max(604800000).optional(),
  // Vision Bridge settings
  visionBridgeEnabled: z.boolean().optional(),
  visionBridgeModel: z.string().max(200).optional(),
  visionBridgePrompt: z.string().max(5000).optional(),
  visionBridgeTimeout: z.number().int().min(1000).max(300000).optional(),
  visionBridgeMaxImages: z.number().int().min(1).max(20).optional(),
  // Missing settings
  lkgpEnabled: z.boolean().optional(),
  backgroundDegradation: z.unknown().optional(),
  bruteForceProtection: z.boolean().optional(),
  // Auto-routing settings
  autoRoutingEnabled: z.boolean().optional(),
  autoRoutingDefaultVariant: z
    .enum(["lkgp", "coding", "fast", "cheap", "offline", "smart"])
    .optional(),
});

export const databaseSettingsSchema = z.object(
  {
    // Logs settings
    logs: z.object({
      detailedLogsEnabled: z.boolean(),
      callLogPipelineEnabled: z.boolean(),
      maxDetailSizeKb: z.number().int().nonnegative(),
      ringBufferSize: z.number().int().min(100).max(10000),
    }),

    // Backup settings
    backup: z.object({
      autoBackupEnabled: z.boolean(),
      autoBackupFrequency: z
        .literal("never")
        .or(z.literal("daily"))
        .or(z.literal("weekly"))
        .or(z.literal("monthly")),
      keepLastNBackups: z.number().int().min(1).max(100),
    }),

    // Cache settings
    cache: z.object({
      semanticCacheEnabled: z.boolean(),
      semanticCacheMaxSize: z.number().int().min(10).max(1000),
      semanticCacheTTL: z.number().int().min(60000),
      promptCacheEnabled: z.boolean(),
      promptCacheStrategy: z.literal("auto").or(z.literal("system-only")).or(z.literal("manual")),
      alwaysPreserveClientCache: z.literal("auto").or(z.literal("always")).or(z.literal("never")),
    }),

    // Retention settings
    retention: z.object({
      quotaSnapshots: z.number().int().min(1).max(3650), // Max 10 years
      compressionAnalytics: z.number().int().min(1).max(365),
      mcpAudit: z.number().int().min(1).max(365),
      a2aEvents: z.number().int().min(1).max(365),
      callLogs: z.number().int().min(1).max(3650),
      usageHistory: z.number().int().min(1).max(3650),
      memoryEntries: z.number().int().min(1).max(3650),
      autoCleanupEnabled: z.boolean(),
    }),

    // Aggregation settings
    aggregation: z.object({
      enabled: z.boolean(),
      rawDataRetentionDays: z.number().int().min(1).max(90),
      granularity: z.literal("hourly").or(z.literal("daily")).or(z.literal("weekly")),
    }),

    // Optimization settings
    optimization: z.object({
      autoVacuumMode: z.literal("NONE").or(z.literal("FULL")).or(z.literal("INCREMENTAL")),
      scheduledVacuum: z
        .literal("never")
        .or(z.literal("daily"))
        .or(z.literal("weekly"))
        .or(z.literal("monthly")),
      vacuumHour: z.number().int().min(0).max(23),
      pageSize: z.number().multipleOf(512).min(512).max(65536),
      cacheSize: z.number().int().min(-1000000).max(1000000),
      optimizeOnStartup: z.boolean(),
    }),

    // Skip location and stats as they're read-only
  },
  { strict: true }
);

export type DatabaseSettingsSchema = z.infer<typeof databaseSettingsSchema>;
