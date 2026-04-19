export enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}

export enum SkillMode {
  AUTO = "auto",
  MANUAL = "manual",
  HYBRID = "hybrid",
}

export interface SkillSchema {
  input: Record<string, unknown>;
  output: Record<string, unknown>;
}

export interface Skill {
  id: string;
  apiKeyId: string;
  name: string;
  version: string;
  description: string;
  schema: SkillSchema;
  handler: string;
  enabled: boolean;
  mode?: "on" | "off" | "auto";
  sourceProvider?: "skillsmp" | "skillssh" | "local";
  tags?: string[];
  installCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillExecution {
  id: string;
  skillId: string;
  apiKeyId: string;
  sessionId: string;
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  status: SkillStatus;
  errorMessage: string | null;
  durationMs: number | null;
  createdAt: Date;
}

export interface SkillConfig {
  enabled: boolean;
  mode: SkillMode;
  allowedSkills: string[];
  timeout: number;
  maxRetries: number;
}

export type SkillHandler = (
  input: Record<string, unknown>,
  context: { apiKeyId: string; sessionId: string }
) => Promise<Record<string, unknown>>;
