/**
 * Settings-specific Zod schemas.
 *
 * Extracted from schemas.ts to work around the webpack barrel-file
 * optimization bug that makes large schema barrel exports `undefined`
 * at runtime (see: https://github.com/vercel/next.js/issues/12557).
 */
import { z } from "zod";

export const updateSettingsSchema = z.object({
  newPassword: z.string().min(1).max(200).optional(),
  currentPassword: z.string().max(200).optional(),
  theme: z.string().max(50).optional(),
  language: z.string().max(10).optional(),
  requireLogin: z.boolean().optional(),
  enableRequestLogs: z.boolean().optional(),
  enableSocks5Proxy: z.boolean().optional(),
  instanceName: z.string().max(100).optional(),
  corsOrigins: z.string().max(500).optional(),
  logRetentionDays: z.number().int().min(1).max(365).optional(),
  maxCallLogs: z.number().int().min(1).max(1_000_000).optional(),
  cloudUrl: z.string().max(500).optional(),
  baseUrl: z.string().max(500).optional(),
  setupComplete: z.boolean().optional(),
  requireAuthForModels: z.boolean().optional(),
  blockedProviders: z.array(z.string().max(100)).optional(),
  hideHealthCheckLogs: z.boolean().optional(),
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
});
