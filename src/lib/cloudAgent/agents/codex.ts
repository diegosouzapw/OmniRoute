import {
  CloudAgentBase,
  type AgentCredentials,
  type CreateTaskParams,
  type GetStatusResult,
} from "../baseAgent.ts";
import type { CloudAgentTask, CloudAgentActivity } from "../types.ts";
import { CLOUD_AGENT_STATUS } from "../types.ts";

export class CodexCloudAgent extends CloudAgentBase {
  readonly providerId = "codex-cloud";
  readonly baseUrl = "https://api.openai.com/v1";

  async createTask(
    params: CreateTaskParams,
    credentials: AgentCredentials
  ): Promise<CloudAgentTask> {
    const taskId = this.generateTaskId();

    const body: Record<string, unknown> = {
      prompt: params.prompt,
      repository_context: params.source.repoUrl,
    };

    if (params.source.branch) {
      body.branch = params.source.branch;
    }

    if (params.options.environment) {
      body.environment = {
        setup: params.options.environment,
      };
    }

    const response = await fetch(`${this.baseUrl}/codex/cloud/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Codex Cloud create task failed: ${response.status} ${error}`);
    }

    const data = await response.json();

    return {
      id: taskId,
      providerId: this.providerId,
      externalId: data.id,
      status: this.mapStatus(data.status || "pending"),
      prompt: params.prompt,
      source: params.source,
      options: params.options,
      activities: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async getStatus(externalId: string, credentials: AgentCredentials): Promise<GetStatusResult> {
    const response = await fetch(`${this.baseUrl}/codex/cloud/tasks/${externalId}`, {
      headers: {
        Authorization: `Bearer ${credentials.apiKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Codex Cloud get status failed: ${response.status} ${error}`);
    }

    const data = await response.json();
    const status = this.mapStatus(data.status || "pending");

    const activities: CloudAgentActivity[] = [];

    if (data.subagents) {
      for (const subagent of data.subagents) {
        activities.push({
          id: this.generateActivityId(),
          type: "command",
          content: `Subagent: ${subagent.name} - ${subagent.status}`,
          timestamp: new Date().toISOString(),
        });
      }
    }

    let result;
    if (status === CLOUD_AGENT_STATUS.COMPLETED && (data.result || data.pr_url)) {
      result = {
        prUrl: data.pr_url || data.result?.pr_url,
        commitMessage: data.result?.commit_message,
        summary: data.result?.summary,
        duration: data.elapsed_time,
      };
    }

    return {
      status,
      externalId,
      result,
      activities,
      error: data.error || data.error_message,
    };
  }

  async approvePlan(_externalId: string, _credentials: AgentCredentials): Promise<void> {
    throw new Error("Codex Cloud does not support plan approval - it auto-plans");
  }

  async sendMessage(
    externalId: string,
    message: string,
    credentials: AgentCredentials
  ): Promise<CloudAgentActivity> {
    const response = await fetch(`${this.baseUrl}/codex/cloud/tasks/${externalId}/followup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.apiKey}`,
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Codex Cloud send message failed: ${response.status} ${error}`);
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
