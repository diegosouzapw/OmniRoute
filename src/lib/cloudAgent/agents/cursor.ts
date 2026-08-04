import {
  CloudAgentBase,
  type AgentCredentials,
  type CreateTaskParams,
  type GetStatusResult,
} from "../baseAgent.ts";
import type { CloudAgentActivity, CloudAgentStatus, CloudAgentTask } from "../types.ts";
import { CLOUD_AGENT_STATUS } from "../types.ts";

/**
 * Cursor Cloud Agent — drives Cursor's Background / Cloud Agents through its official
 * REST API (api.cursor.com) authenticated with a user or service-account API key.
 *
 * This is the API-key path requested in #4227 as a safer alternative to re-using the
 * Cursor IDE's OAuth session (provider `cursor`, which carries a ban-risk warning).
 * Like Devin and Jules it is a plain REST adapter — it does NOT pull in the
 * `@cursor/sdk` package (which ships per-platform native binaries); Cursor's SDK is
 * itself a thin wrapper over this same REST API.
 *
 * NOTE: the endpoint paths and request/response field names follow Cursor's documented
 * Cloud Agents API (v0). They are pending a live validation run against a real Cursor
 * API key before this is merged (Rule #18 — external-API integration, see PR notes).
 * `baseUrl` is overridable per-credential so the version/path can be corrected without
 * a code change.
 */

const CURSOR_DEFAULT_BASE_URL = "https://api.cursor.com/v0";

// Cursor returns UPPERCASE status enums that the base `mapStatus()` substring matcher
// does not recognize (e.g. FINISHED would fall through to "queued"). Map explicitly,
// falling back to the base matcher for anything unforeseen.
const CURSOR_STATUS_MAP: Record<string, CloudAgentStatus> = {
  CREATING: CLOUD_AGENT_STATUS.QUEUED,
  PENDING: CLOUD_AGENT_STATUS.QUEUED,
  QUEUED: CLOUD_AGENT_STATUS.QUEUED,
  RUNNING: CLOUD_AGENT_STATUS.RUNNING,
  FINISHED: CLOUD_AGENT_STATUS.COMPLETED,
  COMPLETED: CLOUD_AGENT_STATUS.COMPLETED,
  ERROR: CLOUD_AGENT_STATUS.FAILED,
  FAILED: CLOUD_AGENT_STATUS.FAILED,
  CANCELLED: CLOUD_AGENT_STATUS.CANCELLED,
  EXPIRED: CLOUD_AGENT_STATUS.FAILED,
};

export class CursorCloudAgent extends CloudAgentBase {
  readonly providerId = "cursor-cloud";
  readonly baseUrl = CURSOR_DEFAULT_BASE_URL;

  private resolveBaseUrl(credentials: AgentCredentials): string {
    return (credentials.baseUrl || this.baseUrl).replace(/\/$/, "");
  }

  private mapCursorStatus(raw: string | undefined | null): CloudAgentStatus {
    if (!raw) return CLOUD_AGENT_STATUS.QUEUED;
    return CURSOR_STATUS_MAP[raw.toUpperCase()] ?? this.mapStatus(raw);
  }

  private authHeaders(credentials: AgentCredentials, withBody = false): Record<string, string> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${credentials.apiKey}`,
    };
    if (withBody) headers["Content-Type"] = "application/json";
    return headers;
  }

  async createTask(
    params: CreateTaskParams,
    credentials: AgentCredentials
  ): Promise<CloudAgentTask> {
    const taskId = this.generateTaskId();

    const source: Record<string, unknown> = { repository: params.source.repoUrl };
    if (params.source.branch) source.ref = params.source.branch;
    const body: Record<string, unknown> = {
      prompt: { text: params.prompt },
      source,
    };
    if (params.options.autoCreatePr) body.autoCreatePr = true;

    const response = await fetch(`${this.resolveBaseUrl(credentials)}/agents`, {
      method: "POST",
      headers: this.authHeaders(credentials, true),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cursor create agent failed: ${response.status} ${error}`);
    }

    const data = await response.json();

    return {
      id: taskId,
      providerId: this.providerId,
      externalId: data.id,
      status: this.mapCursorStatus(data.status),
      prompt: params.prompt,
      source: params.source,
      options: params.options,
      activities: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async getStatus(externalId: string, credentials: AgentCredentials): Promise<GetStatusResult> {
    const response = await fetch(
      `${this.resolveBaseUrl(credentials)}/agents/${encodeURIComponent(externalId)}`,
      { headers: this.authHeaders(credentials) }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cursor get agent failed: ${response.status} ${error}`);
    }

    const data = await response.json();
    const status = this.mapCursorStatus(data.status);

    const conversation = Array.isArray(data.conversation) ? data.conversation : [];
    const activities: CloudAgentActivity[] = conversation.map((msg: Record<string, unknown>) => ({
      id: this.generateActivityId(),
      type: "message" as const,
      content: typeof msg.text === "string" ? msg.text : "",
      timestamp: (msg.createdAt as string) || new Date().toISOString(),
    }));

    let result;
    if (status === CLOUD_AGENT_STATUS.COMPLETED) {
      const target = (data.target as Record<string, unknown>) || {};
      result = {
        prUrl: (target.prUrl as string) || (target.url as string) || undefined,
        summary: typeof data.summary === "string" ? data.summary : undefined,
      };
    }

    return {
      status,
      externalId,
      result,
      activities,
      error: typeof data.error === "string" ? data.error : undefined,
    };
  }

  async approvePlan(_externalId: string, _credentials: AgentCredentials): Promise<void> {
    throw new Error("Cursor Cloud Agents run autonomously and do not support plan approval");
  }

  async sendMessage(
    externalId: string,
    message: string,
    credentials: AgentCredentials
  ): Promise<CloudAgentActivity> {
    const response = await fetch(
      `${this.resolveBaseUrl(credentials)}/agents/${encodeURIComponent(externalId)}/followup`,
      {
        method: "POST",
        headers: this.authHeaders(credentials, true),
        body: JSON.stringify({ prompt: { text: message } }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cursor follow-up failed: ${response.status} ${error}`);
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
    const response = await fetch(`${this.resolveBaseUrl(credentials)}/repositories`, {
      headers: this.authHeaders(credentials),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const repos = Array.isArray(data?.repositories)
      ? data.repositories
      : Array.isArray(data)
        ? data
        : [];

    return repos
      .map((repo: Record<string, unknown>) => {
        const url = (repo.url as string) || (repo.repository as string) || "";
        if (!url) return null;
        const name = (repo.name as string) || url.split("/").slice(-2).join("/");
        return { name, url };
      })
      .filter((entry: { name: string; url: string } | null): entry is { name: string; url: string } =>
        entry !== null
      );
  }
}
