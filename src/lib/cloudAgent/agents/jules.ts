import { randomUUID } from "node:crypto";
import {
  CloudAgentBase,
  type AgentCredentials,
  type CreateTaskParams,
  type GetStatusResult,
} from "../baseAgent.ts";
import type { CloudAgentTask, CloudAgentActivity, CloudAgentStatus } from "../types.ts";
import { CLOUD_AGENT_STATUS } from "../types.ts";

const JULES_API_BASE = "https://jules.googleapis.com/v1alpha";

function julesHeaders(apiKey: string, json = false): Record<string, string> {
  const headers: Record<string, string> = {
    "X-Goog-Api-Key": apiKey,
  };
  if (json) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

function parseGithubOwnerRepo(repoUrl: string, repoName: string): { owner: string; repo: string } {
  try {
    const url = new URL(repoUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return {
        owner: parts[0],
        repo: parts[1].replace(/\.git$/i, ""),
      };
    }
  } catch {
    // fall through
  }
  const parts = repoUrl.split("/").filter(Boolean);
  const owner = parts.length >= 2 ? parts[parts.length - 2] : "";
  return { owner, repo: repoName };
}

function buildJulesSourceResourceName(owner: string, repo: string): string {
  return `sources/github/${owner}/${repo}`;
}

function normalizeJulesSessionId(externalId: string): string {
  const trimmed = externalId.trim();
  return trimmed.startsWith("sessions/") ? trimmed.slice("sessions/".length) : trimmed;
}

function mapJulesActivity(act: Record<string, unknown>): CloudAgentActivity {
  const progress = act.progressUpdated as Record<string, unknown> | undefined;
  const planGenerated = act.planGenerated as Record<string, unknown> | undefined;
  let type: CloudAgentActivity["type"] = "command";
  let content = "";

  if (act.planGenerated) {
    type = "plan";
    const plan = planGenerated?.plan as Record<string, unknown> | undefined;
    const steps = Array.isArray(plan?.steps) ? plan.steps : [];
    content = steps
      .map((step) => {
        const row = step as Record<string, unknown>;
        return typeof row.title === "string" ? row.title : "";
      })
      .filter(Boolean)
      .join("\n");
  } else if (act.sessionCompleted) {
    type = "completion";
    content = "Session completed";
  } else if (act.planApproved) {
    type = "message";
    content = "Plan approved";
  } else if (progress) {
    content = [progress.title, progress.description].filter(Boolean).join(": ");
  }

  return {
    id: (act.id as string) || randomUUID(),
    type,
    content,
    timestamp: (act.createTime as string) || new Date().toISOString(),
  };
}

function extractJulesResult(outputs: unknown) {
  if (!Array.isArray(outputs)) return undefined;

  for (const item of outputs) {
    const output = item as Record<string, unknown>;
    const pullRequest = output.pullRequest as Record<string, unknown> | undefined;
    if (pullRequest?.url) {
      return {
        prUrl: String(pullRequest.url),
        commitMessage:
          typeof pullRequest.description === "string" ? pullRequest.description : undefined,
        summary: typeof pullRequest.title === "string" ? pullRequest.title : undefined,
      };
    }
  }

  return undefined;
}

function inferJulesStatus(
  data: Record<string, unknown>,
  activities: Record<string, unknown>[]
): CloudAgentStatus {
  if (extractJulesResult(data.outputs)) {
    return CLOUD_AGENT_STATUS.COMPLETED;
  }
  if (activities.some((act) => act.sessionCompleted)) {
    return CLOUD_AGENT_STATUS.COMPLETED;
  }
  if (activities.some((act) => act.planGenerated) && !activities.some((act) => act.planApproved)) {
    return CLOUD_AGENT_STATUS.AWAITING_APPROVAL;
  }
  const state = typeof data.state === "string" ? data.state : "running";
  if (state.toLowerCase().includes("pending")) {
    return CLOUD_AGENT_STATUS.QUEUED;
  }
  return CLOUD_AGENT_STATUS.RUNNING;
}

export class JulesAgent extends CloudAgentBase {
  readonly providerId = "jules";
  readonly baseUrl = JULES_API_BASE;

  async createTask(
    params: CreateTaskParams,
    credentials: AgentCredentials
  ): Promise<CloudAgentTask> {
    const taskId = this.generateTaskId();
    const { owner, repo } = parseGithubOwnerRepo(params.source.repoUrl, params.source.repoName);
    const sourceResource = buildJulesSourceResourceName(owner, repo);

    const body: Record<string, unknown> = {
      prompt: params.prompt,
      title: params.source.repoName || repo,
      sourceContext: {
        source: sourceResource,
        githubRepoContext: {
          startingBranch: params.source.branch || "main",
        },
      },
    };

    if (params.options.autoCreatePr) {
      body.automationMode = "AUTO_CREATE_PR";
    }
    if (params.options.planApprovalRequired) {
      body.requirePlanApproval = true;
    }

    const response = await fetch(`${this.baseUrl}/sessions`, {
      method: "POST",
      headers: julesHeaders(credentials.apiKey, true),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Jules create task failed: ${response.status} ${error}`);
    }

    const data = (await response.json()) as Record<string, unknown>;
    const sessionId =
      (typeof data.id === "string" && data.id) ||
      (typeof data.name === "string" ? normalizeJulesSessionId(data.name) : "") ||
      taskId;

    return {
      id: taskId,
      providerId: this.providerId,
      externalId: sessionId,
      status: CLOUD_AGENT_STATUS.QUEUED,
      prompt: params.prompt,
      source: params.source,
      options: params.options,
      activities: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async getStatus(externalId: string, credentials: AgentCredentials): Promise<GetStatusResult> {
    const sessionId = normalizeJulesSessionId(externalId);

    const [sessionRes, activitiesRes] = await Promise.all([
      fetch(`${this.baseUrl}/sessions/${sessionId}`, {
        headers: julesHeaders(credentials.apiKey),
      }),
      fetch(`${this.baseUrl}/sessions/${sessionId}/activities?pageSize=30`, {
        headers: julesHeaders(credentials.apiKey),
      }),
    ]);

    if (!sessionRes.ok) {
      const error = await sessionRes.text();
      throw new Error(`Jules get status failed: ${sessionRes.status} ${error}`);
    }

    const data = (await sessionRes.json()) as Record<string, unknown>;
    let rawActivities: Record<string, unknown>[] = [];
    if (activitiesRes.ok) {
      const activitiesPayload = (await activitiesRes.json()) as Record<string, unknown>;
      rawActivities = Array.isArray(activitiesPayload.activities)
        ? (activitiesPayload.activities as Record<string, unknown>[])
        : [];
    }

    const activities = rawActivities.map(mapJulesActivity);
    const status = inferJulesStatus(data, rawActivities);
    const result = extractJulesResult(data.outputs);

    return {
      status,
      externalId: sessionId,
      result,
      activities,
      error: typeof data.error === "string" ? data.error : undefined,
    };
  }

  async approvePlan(externalId: string, credentials: AgentCredentials): Promise<void> {
    const sessionId = normalizeJulesSessionId(externalId);
    const response = await fetch(`${this.baseUrl}/sessions/${sessionId}:approvePlan`, {
      method: "POST",
      headers: julesHeaders(credentials.apiKey, true),
      body: "{}",
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
    const sessionId = normalizeJulesSessionId(externalId);
    const response = await fetch(`${this.baseUrl}/sessions/${sessionId}:sendMessage`, {
      method: "POST",
      headers: julesHeaders(credentials.apiKey, true),
      body: JSON.stringify({ prompt: message }),
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
      headers: julesHeaders(credentials.apiKey),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Jules list sources failed: ${response.status} ${error}`);
    }

    const data = (await response.json()) as Record<string, unknown>;
    return (Array.isArray(data.sources) ? data.sources : []).map(
      (source: Record<string, unknown>) => {
        const githubRepo = source.githubRepo as Record<string, unknown> | undefined;
        const owner = typeof githubRepo?.owner === "string" ? githubRepo.owner : "";
        const repo = typeof githubRepo?.repo === "string" ? githubRepo.repo : "";
        return {
          name: typeof source.name === "string" ? source.name : `${owner}/${repo}`,
          url: owner && repo ? `https://github.com/${owner}/${repo}` : "",
          branch: "main",
        };
      }
    );
  }
}
