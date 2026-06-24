/**
 * Zod Validation Schemas — Shared request schemas for API routes
 *
 * Provides runtime input validation for provider, combo, and settings APIs.
 *
 * @module shared/schemas/validation
 */

import { z } from "zod";
import { ROUTING_STRATEGY_VALUES } from "@/shared/constants/routingStrategies";

// ─── Combo / Routing Rule ─────────────────────────────────────────

export const comboNodeSchema = z.object({
  connectionId: z.string().uuid("Invalid connection ID"),
  weight: z.number().int().min(0).max(100).default(1),
  priority: z.number().int().min(0).default(0),
});

export const comboSchema = z.object({
  name: z.string().min(1, "Combo name is required").max(100),
  model: z.string().min(1, "Model pattern is required"),
  endpoint: z.enum(["chat", "embeddings", "images"]).default("chat"),
  strategy: z.enum(ROUTING_STRATEGY_VALUES).default("priority"),
  nodes: z.array(comboNodeSchema).min(1, "At least one node is required"),
  isActive: z.boolean().default(true),
  maxRetries: z.number().int().min(0).max(10).default(2),
  retryDelay: z.number().int().min(0).max(30000).default(1000),
});
