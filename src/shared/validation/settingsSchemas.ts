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
import { HIDEABLE_SIDEBAR_GROUP_IDS } from "@/shared/constants/sidebarGroupVisibility";
import { HIDEABLE_SIDEBAR_ITEM_IDS, SIDEBAR_SECTIONS } from "@/shared/constants/sidebarVisibility";
import { ACCOUNT_FALLBACK_STRATEGY_VALUES } from "@/shared/constants/routingStrategies";
import { RESPONSES_PREVIOUS_RESPONSE_ID_MODES } from "@/shared/constants/responsesPreviousResponseId";
import { SPAWN_CAPABLE_PREFIXES } from "@/server/authz/routeGuard";

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
  preferClaudeCodeForUnprefixedClaudeModels: z.boolean().optional(),
  autoRefreshProviderQuota: z.boolean().optional(),
  autoRefreshProviderQuotaInterval: z.number().int().min(10).max(3600).optional(),
  pinProviderQuotaToHome: z.boolean().optional(),
  showQuickStartOnHome: z.boolean().optional(),
  showProviderTopologyOnHome: z.boolean().optional(),
  localOnlyManageScopeBypassEnabled: z.boolean().optional(),
  // Layer 1 of the spawn-capable guard (Hard Rules #15/#17): reject any bypass
  // prefix that reaches a SPAWN_CAPABLE_PREFIXES path at PATCH time, with the
  // BYPASS_PREFIX_NOT_ALLOWED code the settings route handler translates.
  // Layer 2 (isLocalOnlyBypassableByManageScope) still refuses spawn paths at
  // runtime even if a malformed DB row claims otherwise. This refine was in the
  // routeGuard.ts contract docs but missing from the live schema — restored by
  // the 6A.1 orphan-test re-wire (AC-8 / AC-10c, 2026-06-09).
  localOnlyManageScopeBypassPrefixes: z
    .array(
      z
        .string()
        .max(200)
        .refine(
          (prefix) => {
            const normalized = prefix.endsWith("/") ? prefix : `${prefix}/`;
            return !SPAWN_CAPABLE_PREFIXES.some((sp) => normalized.startsWith(sp));
          },
          {
            message:
              "BYPASS_PREFIX_NOT_ALLOWED: spawn-capable prefixes cannot be added to the manage-scope bypass list",
          }
        )
    )
    .optional(),
  customBannedSignals: z.array(z.string().max(200)).optional(),
  debugMode: z.boolean().optional(),
  hiddenSidebarItems: z.array(z.enum(HIDEABLE_SIDEBAR_ITEM_IDS)).optional(),
  hiddenSidebarGroupLabels: z.array(z.enum(HIDEABLE_SIDEBAR_GROUP_IDS)).optional(),
  sidebarSectionOrder: z
    .array(z.enum(SIDEBAR_SECTIONS.map((s) => s.id) as [string, ...string[]]))
    .optional(),
  sidebarItemOrder: z.record(z.string(), z.array(z.string().max(100))).optional(),
  sidebarActivePreset: z.enum(["all", "minimal", "developer", "admin"]).nullable().optional(),
  comboConfigMode: z.enum(COMBO_CONFIG_MODES).optional(),
  codexServiceTier: z
    .object({
      enabled: z.boolean().optional(),
      tier: z.enum(["default", "priority", "flex"]).optional(),
      supportedModels: z.array(z.string().max(200)).max(200).optional(),
    })
    .optional(),
  // Claude Fast Mode: opt-in toggle that asks a paired CLIProxyAPI build
  // (claude-fastmode-spoof) to rewrite SDK-shaped entrypoints so requests can
  // reach Anthropic Fast Mode (speed:"fast"). Default off; only the listed
  // Opus models are gated by the Anthropic binary KT() check. Schema is
  // intentionally permissive on supportedModels so additional eligible model
  // ids can be enabled without a schema bump.
  claudeFastMode: z
    .object({
      enabled: z.boolean().optional(),
      supportedModels: z.array(z.string().max(200)).max(200).optional(),
    })
    .optional(),
  codexSessionAffinityTtlMs: z.number().int().min(0).max(86_400_000).optional(),
  responsesPreviousResponseIdMode: z.enum(RESPONSES_PREVIOUS_RESPONSE_ID_MODES).optional(),
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
  // CC bridge transforms (issue #2260): config-driven pipeline that normalizes
  // system blocks at the Claude Code bridge so any client (OpenCode, Cline,
  // Cursor, Continue, raw API) ends up with classifier-correct structure.
  ccBridgeTransforms: z
    .object({
      enabled: z.boolean(),
      pipeline: z
        .array(
          z.discriminatedUnion("kind", [
            z.object({
              kind: z.literal("drop_paragraph_if_contains"),
              needles: z.array(z.string().max(500)).max(50),
              caseSensitive: z.boolean().optional(),
            }),
            z.object({
              kind: z.literal("drop_paragraph_if_starts_with"),
              prefixes: z.array(z.string().max(500)).max(50),
              caseSensitive: z.boolean().optional(),
            }),
            z.object({
              kind: z.literal("replace_text"),
              match: z.string().min(1).max(500),
              replacement: z.string().max(500),
              allOccurrences: z.boolean().optional(),
            }),
            z.object({
              kind: z.literal("replace_regex"),
              pattern: z.string().min(1).max(500),
              flags: z.string().max(10).optional(),
              replacement: z.string().max(500),
            }),
            z.object({
              kind: z.literal("drop_block_if_contains"),
              needles: z.array(z.string().max(500)).max(50),
            }),
            z.object({
              kind: z.literal("prepend_system_block"),
              text: z.string().min(1).max(2000),
              idempotencyKey: z.string().max(100).optional(),
            }),
            z.object({
              kind: z.literal("append_system_block"),
              text: z.string().min(1).max(2000),
              idempotencyKey: z.string().max(100).optional(),
            }),
            z.object({
              kind: z.literal("inject_billing_header"),
              entrypoint: z.string().min(1).max(50),
              versionFormat: z.enum(["ex-machina", "omniroute-daystamp"]),
              cchAlgo: z.enum(["sha256-first-user", "xxhash64-body", "static-zero"]),
              version: z.string().max(50).optional(),
            }),
          ])
        )
        .max(50),
    })
    .optional(),
  // System Transforms (issue #2260 v2): generic per-provider DSL covering
  // native `claude`, `anthropic-compatible-cc-*` bridge, and any other
  // provider key. Adds `obfuscate_words` op kind on top of the base set.
  systemTransforms: z
    .object({
      providers: z.record(
        z.string().max(100),
        z.object({
          enabled: z.boolean(),
          pipeline: z
            .array(
              z.discriminatedUnion("kind", [
                z.object({
                  kind: z.literal("drop_paragraph_if_contains"),
                  needles: z.array(z.string().max(500)).max(50),
                  caseSensitive: z.boolean().optional(),
                }),
                z.object({
                  kind: z.literal("drop_paragraph_if_starts_with"),
                  prefixes: z.array(z.string().max(500)).max(50),
                  caseSensitive: z.boolean().optional(),
                }),
                z.object({
                  kind: z.literal("replace_text"),
                  match: z.string().min(1).max(500),
                  replacement: z.string().max(500),
                  allOccurrences: z.boolean().optional(),
                }),
                z.object({
                  kind: z.literal("replace_regex"),
                  pattern: z.string().min(1).max(500),
                  flags: z.string().max(10).optional(),
                  replacement: z.string().max(500),
                }),
                z.object({
                  kind: z.literal("drop_block_if_contains"),
                  needles: z.array(z.string().max(500)).max(50),
                }),
                z.object({
                  kind: z.literal("prepend_system_block"),
                  text: z.string().min(1).max(2000),
                  idempotencyKey: z.string().max(100).optional(),
                }),
                z.object({
                  kind: z.literal("append_system_block"),
                  text: z.string().min(1).max(2000),
                  idempotencyKey: z.string().max(100).optional(),
                }),
                z.object({
                  kind: z.literal("inject_billing_header"),
                  entrypoint: z.string().min(1).max(50),
                  versionFormat: z.enum(["ex-machina", "omniroute-daystamp"]),
                  cchAlgo: z.enum(["sha256-first-user", "xxhash64-body", "static-zero"]),
                  version: z.string().max(50).optional(),
                }),
                z.object({
                  kind: z.literal("obfuscate_words"),
                  words: z.array(z.string().max(100)).max(200),
                  targets: z
                    .array(z.enum(["system", "messages", "tools"]))
                    .max(3)
                    .optional(),
                }),
              ])
            )
            .max(50),
        })
      ),
    })
    .optional(),
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
  // #1311: echo the requested alias/combo name in the response model field (opt-in)
  echoRequestedModelName: z.boolean().optional(),
  // #4481 layer 2: CCR-style Router.webSearch — when a request carries a native
  // web_search server tool, route the whole request to this model/provider instead of
  // the default (for providers that don't implement Anthropic's web_search server tool).
  // Empty/unset = disabled. Value is a model string ("provider,model" / alias / combo).
  webSearchRouteModel: z.string().max(200).optional(),
  backgroundDegradation: z.unknown().optional(),
  bruteForceProtection: z.boolean().optional(),
  // Auto-routing settings
  autoRoutingEnabled: z.boolean().optional(),
  autoRoutingDefaultVariant: z
    .enum(["lkgp", "coding", "fast", "cheap", "offline", "smart"])
    .optional(),
  proxyEnabled: z.boolean().optional(),
  perKeyProxyEnabled: z.boolean().optional(),
  // CLIProxyAPI connection settings
  cliproxyapi_fallback_enabled: z.boolean().optional(),
  cliproxyapi_url: z.string().url().max(500).optional(),
  cliproxyapi_fallback_codes: z.string().max(200).optional(),
  // CLIProxyAPI model mapping (Record<string, string>)
  cliproxyapi_model_mapping: z.record(z.string(), z.string()).optional(),
  // Model lockout settings
  modelLockout: z
    .object({
      enabled: z.boolean().optional(),
      errorCodes: z.array(z.number().int().min(100).max(599)).min(0).max(20).optional(),
      baseCooldownMs: z
        .number()
        .int()
        .min(5000, "Must be at least 5,000ms")
        .max(600000, "Must be at most 600,000ms (10 min)")
        .optional(),
      maxCooldownMs: z
        .number()
        .int()
        .min(5000, "Must be at least 5,000ms")
        .max(3600000, "Must be at most 3,600,000ms (1 h)")
        .optional(),
      maxBackoffSteps: z
        .number()
        .int()
        .min(0, "Must be at least 0")
        .max(20, "Must be at most 20")
        .optional(),
      useExponentialBackoff: z.boolean().optional(),
    })
    .optional(),
});

export const databaseSettingsSchema = z
  .object({
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
      rawDataRetentionDays: z.number().int().min(1).max(3650),
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
      cacheSize: z.number().int().positive().max(1000000),
      optimizeOnStartup: z.boolean(),
    }),

    // Skip location and stats as they're read-only
  })
  .strict();
