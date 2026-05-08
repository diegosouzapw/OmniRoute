import {
  CloudAgentBase,
  type AgentCredentials,
  type CreateTaskParams,
  type GetStatusResult,
} from "../baseAgent.ts";
import type { CloudAgentTask, CloudAgentActivity } from "../types.ts";
import { CLOUD_AGENT_STATUS } from "../types.ts";

export class JulesAgent extends CloudAgentBase {
  readonly providerId = "jules";
  readonly baseUrl = "https://jules.googleapis.com/v1alpha";

  async createTask(
    params: CreateTaskParams,
    credentials: AgentCredentials
  ): Promise<CloudAgentTask> {
    const taskId = this.generateTaskId();

    const body: Record<string, unknown> = {
      prompt: params.prompt,
      source: {
        repository: {
          owner: params.source.repoUrl.split("/").filter(Boolean).slice(-2, -1)[0] || "",
          name: params.source.repoName,
        },
        branch: params.source.branch || "main",
      },
    };

    if (params.options.autoCreatePr) {
      body.automationMode = "AUTO_CREATE_PR";
    }

    const response = await fetch(`${this.baseUrl}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": credentials.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Jules create task failed: ${response.status} ${error}`);
    }

    const data = await response.json();

    return {
      id: taskId,
      providerId: this.providerId,
      externalId: data.name?.split("/").pop() || taskId,
      status: this.mapStatus(data.state || "pending"),
      prompt: params.prompt,
      source: params.source,
      options: params.options,
      activities: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async getStatus(externalId: string, _credentials: AgentCredentials): Promise<GetStatusResult> {
    const response = await fetch(`${this.baseUrl}/sessions/${externalId}`, {
      headers: {
        "X-Goog-Api-Key": _credentials.apiKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Jules get status failed: ${response.status} ${error}`);
    }

    const data = await response.json();
    const status = this.mapStatus(data.state || "pending");

    const activities: CloudAgentActivity[] = (data.activities || []).map(
      (act: Record<string, unknown>) => ({
        id: this.generateActivityId(),
        type: act.type as CloudAgentActivity["type"],
        content: (act.description as string) || "",
        timestamp: (act.timestamp as string) || new Date().toISOString(),
      })
    );

    let result;
    if (status === CLOUD_AGENT_STATUS.COMPLETED && data.outputs) {
      result = {
        prUrl: data.outputs.prUrl,
        commitMessage: data.outputs.commitMessage,
        summary: data.outputs.summary,
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

  async approvePlan(externalId: string, credentials: AgentCredentials): Promise<void> {
    const response = await fetch(`${this.baseUrl}/sessions/${externalId}:approvePlan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": credentials.apiKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Jules approve plan failed: ${response.status} ${error}`);
    }
  }

  async sendMessage(
    externalId: string,
    message: string,
    credentials: AgentCredentials
  ): Promise<CloudAgentActivity> {
    const response = await fetch(`${this.baseUrl}/sessions/${externalId}:sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": credentials.apiKey,
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Jules send message failed: ${response.status} ${error}`);
    }

    return {
      id: this.generateActivityId(),
      type: "message",
      content: message,
      timestamp: new Date().toISOString(),
    };
  }

  async listSources(
    credentials: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]> {
    const response = await fetch(`${this.baseUrl}/sources`, {
      headers: {
        "X-Goog-Api-Key": credentials.apiKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Jules list sources failed: ${response.status} ${error}`);
    }

    const data = await response.json();
    return (data.sources || []).map((source: Record<string, unknown>) => ({
      name: source.name as string,
      url: `https://github.com/${source.repoOwner}/${source.repoName}`,
      branch: source.defaultBranch as string | undefined,
    }));
  }
}
