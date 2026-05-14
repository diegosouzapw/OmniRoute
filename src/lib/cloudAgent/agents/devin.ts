import {
  CloudAgentBase,
  type AgentCredentials,
  type CreateTaskParams,
  type GetStatusResult,
} from "../baseAgent.ts";
import type { CloudAgentTask, CloudAgentActivity } from "../types.ts";
import { CLOUD_AGENT_STATUS } from "../types.ts";

export class DevinAgent extends CloudAgentBase {
  readonly providerId = "devin";
  readonly baseUrl = "https://api.devin.ai/v1";

  async createTask(
    params: CreateTaskParams,
    credentials: AgentCredentials
  ): Promise<CloudAgentTask> {
    const taskId = this.generateTaskId();

    const body: Record<string, unknown> = {
      prompt: params.prompt,
      repo_url: params.source.repoUrl,
    };

    if (params.source.branch) {
      body.branch = params.source.branch;
    }

    const response = await fetch(`${this.baseUrl}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Devin create task failed: ${response.status} ${error}`);
    }

    const data = await response.json();

    return {
      id: taskId,
      providerId: this.providerId,
      externalId: data.id,
      status: this.mapStatus(data.status || "created"),
      prompt: params.prompt,
      source: params.source,
      options: params.options,
      activities: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async getStatus(externalId: string, credentials: AgentCredentials): Promise<GetStatusResult> {
    const response = await fetch(`${this.baseUrl}/sessions/${externalId}`, {
      headers: {
        Authorization: `Bearer ${credentials.apiKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Devin get status failed: ${response.status} ${error}`);
    }

    const data = await response.json();
    const status = this.mapStatus(data.status || "created");

    const activities: CloudAgentActivity[] = (data.messages || []).map(
      (msg: Record<string, unknown>) => ({
        id: this.generateActivityId(),
        type: "message" as const,
        content: (msg.content as string) || "",
        timestamp: (msg.created_at as string) || new Date().toISOString(),
      })
    );

    let result;
    if (status === CLOUD_AGENT_STATUS.COMPLETED && data.output) {
      result = {
        prUrl: data.pr_url,
        summary: data.output,
        duration: data.duration,
      };
    }

    return {
      status,
      externalId,
      result,
      activities,
      error: data.error,
    };
  }

  async approvePlan(_externalId: string, _credentials: AgentCredentials): Promise<void> {
    throw new Error("Devin does not support plan approval - it auto-plans");
  }

  async sendMessage(
    externalId: string,
    message: string,
    credentials: AgentCredentials
  ): Promise<CloudAgentActivity> {
    const response = await fetch(`${this.baseUrl}/sessions/${externalId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.apiKey}`,
      },
      body: JSON.stringify({ content: message }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Devin send message failed: ${response.status} ${error}`);
    }

    return {
      id: this.generateActivityId(),
      type: "message",
      content: message,
      timestamp: new Date().toISOString(),
    };
  }

  async listSources(
    _credentials: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]> {
    return [];
  }
}
