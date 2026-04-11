/**
 * Settings-specific Zod schemas.
 *
 * Extracted from schemas.ts to work around the webpack barrel-file
 * optimization bug that makes large schema barrel exports `undefined`
 * at runtime (see: https://github.com/vercel/next.js/issues/12557).
 */
import { z } from "zod";
import { HIDEABLE_SIDEBAR_ITEM_IDS } from "@/shared/constants/sidebarVisibility";

const forwardingKeywordRuleSchema = z.object({
  match: z.string().trim().min(1).max(200),
  replace: z.string().max(200),
});

const forwardingTagRuleSchema = z.object({
  open: z.string().trim().min(1).max(200),
  openReplacement: z.string().max(200),
  close: z.string().trim().min(1).max(200),
  closeReplacement: z.string().max(200),
});

const forwardingKeywordLaneSchema = z.object({
  toolNames: z.array(forwardingKeywordRuleSchema).max(50),
  text: z.array(forwardingKeywordRuleSchema).max(50),
  tags: z.array(forwardingTagRuleSchema).max(20),
});

export const updateForwardingKeywordRulesSchema = z.object({
  "claude-oauth-prefixed": forwardingKeywordLaneSchema,
});

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
  requireAuthForModels: z.boolean().optional(),
  blockedProviders: z.array(z.string().max(100)).optional(),
  hideHealthCheckLogs: z.boolean().optional(),
  debugMode: z.boolean().optional(),
  hiddenSidebarItems: z.array(z.enum(HIDEABLE_SIDEBAR_ITEM_IDS)).optional(),
  // Routing settings (#134)
  fallbackStrategy: z
    .enum(["fill-first", "round-robin", "p2c", "random", "least-used", "cost-optimized"])
    .optional(),
  wildcardAliases: z.array(z.object({ pattern: z.string(), target: z.string() })).optional(),
  stickyRoundRobinLimit: z.number().int().min(0).max(1000).optional(),
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
  // CLI Fingerprint compatibility (per-provider)
  cliCompatProviders: z.array(z.string().max(100)).optional(),
  // Strip provider/model prefix at proxy layer (e.g. "openai/gpt-4" → "gpt-4")
  stripModelPrefix: z.boolean().optional(),
  // Cache control preservation mode
  alwaysPreserveClientCache: z.enum(["auto", "always", "never"]).optional(),
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
  // models.dev sync settings
  modelsDevSyncEnabled: z.boolean().optional(),
  modelsDevSyncInterval: z.number().int().min(3600).max(604800).optional(),
});
