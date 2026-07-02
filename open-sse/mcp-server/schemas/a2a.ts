/**
 * A2A (Agent-to-Agent) Schemas — Contracts for OmniRoute A2A Server.
 *
 * Defines the Agent Card structure, Task lifecycle, Message format,
 * and all A2A protocol types conforming to A2A Protocol v0.3.
 */

import { z } from "zod";

// ============ Agent Card Schema ============

export const AgentSkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  examples: z.array(z.string()).optional(),
});

export const AgentCardSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  version: z.string(),
  capabilities: z.object({
    streaming: z.boolean(),
    pushNotifications: z.boolean(),
  }),
  skills: z.array(AgentSkillSchema),
  authentication: z.object({
    schemes: z.array(z.string()),
    apiKeyHeader: z.string().optional(),
  }),
});

export type AgentCard = z.infer<typeof AgentCardSchema>;
export type AgentSkill = z.infer<typeof AgentSkillSchema>;

// ============ Task Schema ============

export const TaskStateEnum = z.enum(["submitted", "working", "completed", "failed", "cancelled"]);

export type TaskState = z.infer<typeof TaskStateEnum>;

export const TaskInputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
      })
    )
    .optional(),
  model: z.string().optional(),
  combo: z.string().optional(),
  budget: z.number().optional(),
  role: z
    .enum(["coding", "review", "planning", "analysis", "debugging", "documentation"])
    .optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const CostEnvelopeSchema = z.object({
  estimated: z.number(),
  actual: z.number(),
  currency: z.string().default("USD"),
});

export const ResilienceTraceEventSchema = z.object({
  event: z.string(),
  provider: z.string().optional(),
  reason: z.string().optional(),
  timestamp: z.string(),
});

export const PolicyVerdictSchema = z.object({
  allowed: z.boolean(),
  reason: z.string(),
  restrictions: z.array(z.string()).optional(),
});

export const TaskOutputSchema = z.object({
  response: z
    .object({
      content: z.string(),
      model: z.string(),
      tokens: z.object({
        prompt: z.number(),
        completion: z.number(),
      }),
    })
    .optional(),
  routingExplanation: z.string().optional(),
  costEnvelope: CostEnvelopeSchema.optional(),
  resilienceTrace: z.array(ResilienceTraceEventSchema).optional(),
  policyVerdict: PolicyVerdictSchema.optional(),
});

export const TaskSchema = z.object({
  id: z.string().uuid(),
  state: TaskStateEnum,
  skillId: z.string(),
  input: TaskInputSchema.optional(),
  output: TaskOutputSchema.optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskInput = z.infer<typeof TaskInputSchema>;
export type TaskOutput = z.infer<typeof TaskOutputSchema>;
export type CostEnvelope = z.infer<typeof CostEnvelopeSchema>;
export type ResilienceTraceEvent = z.infer<typeof ResilienceTraceEventSchema>;
export type PolicyVerdict = z.infer<typeof PolicyVerdictSchema>;

// ============ JSON-RPC 2.0 Schemas ============

export const JsonRpcRequestSchema = z.object({
  jsonrpc: z.literal("2.0"),
  method: z.enum(["message/send", "message/stream", "tasks/get", "tasks/cancel"]),
  params: z.record(z.string(), z.unknown()),
  id: z.union([z.string(), z.number()]),
});

export const JsonRpcResponseSchema = z.object({
  jsonrpc: z.literal("2.0"),
  result: z.unknown().optional(),
  error: z
    .object({
      code: z.number(),
      message: z.string(),
      data: z.unknown().optional(),
    })
    .optional(),
  id: z.union([z.string(), z.number()]).nullable(),
});

export type JsonRpcRequest = z.infer<typeof JsonRpcRequestSchema>;
export type JsonRpcResponse = z.infer<typeof JsonRpcResponseSchema>;

// ============ Message Schemas ============

export const MessageSendParamsSchema = z.object({
  task: z
    .object({
      skillId: z.string(),
    })
    .optional(),
  message: z.object({
    role: z.string().default("user"),
    content: z.string(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  }),
  config: z
    .object({
      model: z.string().optional(),
      combo: z.string().optional(),
      budget: z.number().optional(),
      taskRole: z
        .enum(["coding", "review", "planning", "analysis", "debugging", "documentation"])
        .optional(),
    })
    .optional(),
});

export const TasksGetParamsSchema = z.object({
  taskId: z.string().uuid(),
});

export const TasksCancelParamsSchema = z.object({
  taskId: z.string().uuid(),
});

export type MessageSendParams = z.infer<typeof MessageSendParamsSchema>;
export type TasksGetParams = z.infer<typeof TasksGetParamsSchema>;
export type TasksCancelParams = z.infer<typeof TasksCancelParamsSchema>;

// ============ SSE Event Types ============

export const A2A_SSE_EVENTS = {
  TASK_STATUS: "task.status",
  TASK_ARTIFACT: "task.artifact",
  TASK_CHUNK: "task.chunk",
  TASK_COMPLETE: "task.complete",
  TASK_ERROR: "task.error",
  HEARTBEAT: "heartbeat",
} as const;

// ============ A2A Error Codes ============

export const A2A_ERROR_CODES = {
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  TASK_NOT_FOUND: -32001,
  TASK_ALREADY_COMPLETED: -32002,
  UNAUTHORIZED: -32003,
  BUDGET_EXCEEDED: -32004,
  PROVIDER_UNAVAILABLE: -32005,
} as const;
