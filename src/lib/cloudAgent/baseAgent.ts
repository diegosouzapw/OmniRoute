import { randomBytes } from "node:crypto";
import type {
  CloudAgentTask,
  CloudAgentStatus,
  CloudAgentSource,
  CloudAgentResult,
  CloudAgentActivity,
} from "./types.ts";

export interface AgentCredentials {
  apiKey: string;
  baseUrl?: string;
}

export interface CreateTaskParams {
  prompt: string;
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
}

export interface GetStatusResult {
  status: CloudAgentStatus;
  externalId?: string;
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
}

export abstract class CloudAgentBase {
  abstract readonly providerId: string;
  abstract readonly baseUrl: string;

  abstract createTask(
    params: CreateTaskParams,
    credentials: AgentCredentials
  ): Promise<CloudAgentTask>;

  abstract getStatus(externalId: string, credentials: AgentCredentials): Promise<GetStatusResult>;

  abstract approvePlan(externalId: string, credentials: AgentCredentials): Promise<void>;

  abstract sendMessage(
    externalId: string,
    message: string,
    credentials: AgentCredentials
  ): Promise<CloudAgentActivity>;

  abstract listSources(
    credentials: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]>;

  protected mapStatus(status: string): CloudAgentStatus {
    const statusLower = status.toLowerCase();

    if (statusLower.includes("completed") || statusLower.includes("done")) {
      return "completed";
    }
    if (statusLower.includes("failed") || statusLower.includes("error")) {
      return "failed";
    }
    if (statusLower.includes("cancelled") || statusLower.includes("canceled")) {
      return "cancelled";
    }
    if (
      statusLower.includes("running") ||
      statusLower.includes("active") ||
      statusLower.includes("executing")
    ) {
      return "running";
    }
    if (
      statusLower.includes("pending") ||
      statusLower.includes("queued") ||
      statusLower.includes("waiting")
    ) {
      return "queued";
    }
    if (statusLower.includes("approval") || statusLower.includes("plan")) {
      return "awaiting_approval";
    }

    return "queued";
  }

  protected generateTaskId(): string {
    // Cryptographically secure suffix (not Math.random) — task IDs flow into
    // session/external identifiers, so they must be unpredictable (CodeQL js/insecure-randomness).
    return `task_${Date.now()}_${randomBytes(8).toString("hex")}`;
  }

  protected generateActivityId(): string {
    return `act_${Date.now()}_${randomBytes(8).toString("hex")}`;
  }
}
