import { z } from "zod";

export const AgentBridgeStateRowSchema = z.object({
  agent_id: z.string(),
  dns_enabled: z.boolean(),
  cert_trusted: z.boolean(),
  setup_completed: z.boolean(),
  last_started_at: z.string().datetime().nullable(),
  last_error: z.string().nullable(),
});

export const AgentBridgeMappingRowSchema = z.object({
  agent_id: z.string(),
  source_model: z.string(),
  target_model: z.string(),
  updated_at: z.string().datetime(),
});

export const AgentBridgeBypassRowSchema = z.object({
  pattern: z.string(),
  source: z.enum(["default", "user"]),
  created_at: z.string().datetime(),
});

export const AgentBridgeServerActionSchema = z.object({
  action: z.enum(["start", "stop", "restart", "trust-cert", "regenerate-cert"]),
});

export const AgentBridgeDnsActionSchema = z.object({ enabled: z.boolean() });

export const AgentBridgeMappingPutSchema = z.object({
  mappings: z.array(z.object({ source: z.string(), target: z.string() })),
});

export const AgentBridgeBypassUpsertSchema = z.object({ patterns: z.array(z.string()) });

export const AgentBridgeUpstreamCaPostSchema = z.object({ path: z.string().min(1) });
