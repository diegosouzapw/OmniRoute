import { z } from "zod";

export const CLOUD_AGENT_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  AWAITING_APPROVAL: "awaiting_approval",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

export type CloudAgentStatus = (typeof CLOUD_AGENT_STATUS)[keyof typeof CLOUD_AGENT_STATUS];

export const CloudAgentStatusSchema = z.enum([
  "queued",
  "running",
  "awaiting_approval",
  "completed",
  "failed",
  "cancelled",
]);

export interface CloudAgentSource {
  repoName: string;
  repoUrl: string;
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number;
  cost?: number;
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string;
  providerId: "jules" | "devin" | "codex-cloud";
  externalId?: string;
  status: CloudAgentStatus;
  prompt: string;
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export const CloudAgentSourceSchema = z.object({
  repoName: z.string().min(1),
  repoUrl: z.string().url(),
  branch: z.string().optional(),
});

export const CloudAgentResultSchema = z.object({
  prUrl: z.string().url().optional(),
  prNumber: z.number().int().positive().optional(),
  commitMessage: z.string().optional(),
  diffUrl: z.string().url().optional(),
  summary: z.string().optional(),
  duration: z.number().int().positive().optional(),
  cost: z.number().positive().optional(),
});

export const CloudAgentActivitySchema = z.object({
  id: z.string(),
  type: z.enum(["plan", "command", "code_change", "message", "error", "completion"]),
  content: z.string(),
  timestamp: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const CloudAgentTaskOptionsSchema = z.object({
  autoCreatePr: z.boolean().optional(),
  planApprovalRequired: z.boolean().optional(),
  environment: z.record(z.string(), z.string()).optional(),
});

export const CreateCloudAgentTaskSchema = z.object({
  providerId: z.enum(["jules", "devin", "codex-cloud"]),
  prompt: z.string().min(1).max(10000),
  source: CloudAgentSourceSchema,
  options: CloudAgentTaskOptionsSchema.optional(),
});

export const UpdateCloudAgentTaskSchema = z.object({
  id: z.string().min(1),
  action: z.enum(["approve", "reject", "cancel", "message"]),
  message: z.string().optional(),
});

export type CreateCloudAgentTaskInput = z.infer<typeof CreateCloudAgentTaskSchema>;
export type UpdateCloudAgentTaskInput = z.infer<typeof UpdateCloudAgentTaskSchema>;
