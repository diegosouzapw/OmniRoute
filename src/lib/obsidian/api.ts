import { getDbInstance } from "@/lib/db/core";

const DEFAULT_OBSIDIAN_BASE_URL = "http://127.0.0.1:27123";
const MAX_RETRIES = 2;
const TIMEOUT_MS = 30000;

export class ObsidianAuthError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ObsidianAuthError";
  }
}

export class ObsidianNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ObsidianNotFoundError";
  }
}

export class ObsidianServerError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ObsidianServerError";
  }
}

export class ObsidianTimeoutError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ObsidianTimeoutError";
  }
}

type ObsidianResult = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};

function classifyObsidianError(status: number, message: string): Error {
  switch (status) {
    case 401:
    case 403:
      return new ObsidianAuthError(message);
    case 404:
      return new ObsidianNotFoundError(message);
    default:
      if (status >= 500) return new ObsidianServerError(message);
      return new Error(`Obsidian API error (${status}): ${message}`);
  }
}

function obsidianFetch(
  path: string,
  apiKey: string,
  baseUrl: string,
  options: RequestInit = {}
): Promise<unknown> {
  const url = `${baseUrl}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const mergedSignal = options.signal
    ? combineSignals(options.signal, controller.signal)
    : controller.signal;

  let lastError: Error | null = null;

  const attempt = async (retryCount: number): Promise<unknown> => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          ...(options.headers as Record<string, string>),
        },
        signal: mergedSignal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;
        const msg = (body?.message as string) ?? `HTTP ${response.status}`;
        const error = classifyObsidianError(response.status, msg);

        if (error instanceof ObsidianServerError && retryCount < MAX_RETRIES - 1) {
          lastError = error;
          await sleep(Math.pow(2, retryCount) * 200);
          return attempt(retryCount + 1);
        }

        throw error;
      }

      const ct = response.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        return response.json();
      }
      return response.text();
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        clearTimeout(timeout);
        throw new ObsidianTimeoutError("Obsidian API request timed out after 30s");
      }
      if (err instanceof ObsidianAuthError || err instanceof ObsidianNotFoundError) {
        clearTimeout(timeout);
        throw err;
      }
      if (err instanceof TypeError && err.message === "fetch failed") {
        clearTimeout(timeout);
        throw new ObsidianServerError(
          `Cannot reach Obsidian at ${baseUrl}. Ensure the Local REST API plugin is running ` +
            `and using the correct port. The REST API uses HTTP on port 27123 — do not use ` +
            `port 27124 (that is a separate MCP endpoint with HTTPS). If connecting via ` +
            `Tailscale, use http://<tailscale-ip>:27123.`
        );
      }
      if (retryCount < MAX_RETRIES - 1) {
        lastError = err instanceof Error ? err : new ObsidianServerError(String(err));
        await sleep(Math.pow(2, retryCount) * 200);
        return attempt(retryCount + 1);
      }
      clearTimeout(timeout);
      throw err;
    }
  };

  return attempt(0);
}

function combineSignals(...signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
  }
  return controller.signal;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function encodePath(segments: string): string {
  return segments.split("/").map(encodeURIComponent).join("/");
}

export type PatchOperation = "append" | "prepend" | "replace";
export type TargetType = "heading" | "block" | "frontmatter";

export function createObsidianClient(apiKey: string, baseUrl?: string) {
  const resolvedBaseUrl = baseUrl ?? DEFAULT_OBSIDIAN_BASE_URL;

  const client = {
    async checkStatus(): Promise<unknown> {
      return obsidianFetch("/", apiKey, resolvedBaseUrl);
    },

    async searchSimple(query: string, contextLength = 100): Promise<unknown> {
      const params = new URLSearchParams();
      params.set("query", query);
      params.set("contextLength", String(contextLength));
      return obsidianFetch(`/search/simple/?${params}`, apiKey, resolvedBaseUrl, {
        method: "POST",
      });
    },

    async searchStructured(jsonLogic: unknown): Promise<unknown> {
      return obsidianFetch("/search/", apiKey, resolvedBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/vnd.olrapi.jsonlogic+json" },
        body: JSON.stringify(jsonLogic),
      });
    },

    async readNote(path: string, targetType?: TargetType, target?: string): Promise<unknown> {
      const headers: Record<string, string> = {};
      if (targetType) headers["Target-Type"] = targetType;
      if (target) headers["Target"] = encodeURIComponent(target);
      return obsidianFetch(`/vault/${encodePath(path)}`, apiKey, resolvedBaseUrl, { headers });
    },

    async listVault(path = ""): Promise<unknown> {
      const suffix = path ? `/${encodePath(path)}/` : "/";
      return obsidianFetch(`/vault${suffix}`, apiKey, resolvedBaseUrl);
    },

    async getDocumentMap(path: string): Promise<unknown> {
      return obsidianFetch(`/vault/${encodePath(path)}`, apiKey, resolvedBaseUrl, {
        headers: { Accept: "application/vnd.olrapi.document-map+json" },
      });
    },

    async getNoteMetadata(path: string): Promise<unknown> {
      return obsidianFetch(`/vault/${encodePath(path)}`, apiKey, resolvedBaseUrl, {
        headers: { Accept: "application/vnd.olrapi.note+json" },
      });
    },

    async getActiveFile(): Promise<unknown> {
      return obsidianFetch("/active/", apiKey, resolvedBaseUrl);
    },

    async getPeriodicNote(
      period: string,
      year?: number,
      month?: number,
      day?: number
    ): Promise<unknown> {
      let url: string;
      if (year && month && day) {
        url = `/periodic/${period}/${year}/${month}/${day}/`;
      } else {
        url = `/periodic/${period}/`;
      }
      return obsidianFetch(url, apiKey, resolvedBaseUrl);
    },

    async getTags(): Promise<unknown> {
      return obsidianFetch("/tags/", apiKey, resolvedBaseUrl);
    },

    async commandList(): Promise<unknown> {
      return obsidianFetch("/commands/", apiKey, resolvedBaseUrl);
    },

    async writeNote(path: string, content: string): Promise<void> {
      await obsidianFetch(`/vault/${encodePath(path)}`, apiKey, resolvedBaseUrl, {
        method: "PUT",
        headers: { "Content-Type": "text/markdown" },
        body: content,
      });
    },

    async appendNote(
      path: string,
      content: string,
      targetType?: TargetType,
      target?: string
    ): Promise<void> {
      const headers: Record<string, string> = { "Content-Type": "text/markdown" };
      if (targetType) headers["Target-Type"] = targetType;
      if (target) headers["Target"] = encodeURIComponent(target);
      await obsidianFetch(`/vault/${encodePath(path)}`, apiKey, resolvedBaseUrl, {
        method: "POST",
        headers,
        body: content,
      });
    },

    async patchNote(
      path: string,
      operation: PatchOperation,
      targetType: TargetType,
      target: string,
      content: string,
      createTargetIfMissing = false
    ): Promise<unknown> {
      const headers: Record<string, string> = {
        Operation: operation,
        "Target-Type": targetType,
        Target: encodeURIComponent(target),
        "Content-Type": "text/markdown",
      };
      if (createTargetIfMissing) headers["Create-Target-If-Missing"] = "true";
      return obsidianFetch(`/vault/${encodePath(path)}`, apiKey, resolvedBaseUrl, {
        method: "PATCH",
        headers,
        body: content,
      });
    },

    async deleteNote(path: string): Promise<void> {
      await obsidianFetch(`/vault/${encodePath(path)}`, apiKey, resolvedBaseUrl, {
        method: "DELETE",
      });
    },

    async moveNote(path: string, destination: string): Promise<void> {
      await obsidianFetch(`/vault/${encodePath(path)}`, apiKey, resolvedBaseUrl, {
        method: "MOVE",
        headers: { Destination: encodeURIComponent(destination) },
      });
    },

    async executeCommand(commandId: string): Promise<void> {
      await obsidianFetch(`/commands/${encodeURIComponent(commandId)}/`, apiKey, resolvedBaseUrl, {
        method: "POST",
      });
    },

    async openFile(path: string): Promise<void> {
      await obsidianFetch(`/open/${encodePath(path)}`, apiKey, resolvedBaseUrl, {
        method: "POST",
      });
    },
  };

  return client;
}

export type ObsidianClient = ReturnType<typeof createObsidianClient>;

const DEFAULT_SYNC_SERVER_URL = "http://127.0.0.1:27781";
const SYNC_TOKEN_KEY = "omniroute_sync_token";

export function getSyncToken(): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get("sync", SYNC_TOKEN_KEY) as { value?: string } | undefined;
    return typeof row?.value === "string" ? JSON.parse(row.value) : null;
  } catch {
    return null;
  }
}

export interface SyncServerStatus {
  running: boolean;
  uptime: number;
  port: number;
  vaultName: string;
  lastSync: { ok: boolean; pulled: number; pushed: number; deleted: number; conflicts: number };
}

export interface SyncConflict {
  path: string;
  conflictPath: string;
  detectedAt: number;
}

export function createSyncServerClient(syncToken: string, baseUrl?: string) {
  const resolvedBaseUrl = baseUrl ?? DEFAULT_SYNC_SERVER_URL;

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${resolvedBaseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(syncToken ? { Authorization: `Bearer ${syncToken}` } : {}),
        ...init?.headers,
      },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Sync server ${res.status}: ${body}`);
    }
    return res.json() as Promise<T>;
  }

  return {
    async getStatus(): Promise<SyncServerStatus> {
      return request<SyncServerStatus>("/vault/sync/status");
    },
    async triggerSync(): Promise<{
      ok: boolean;
      pulled: number;
      pushed: number;
      deleted: number;
      conflicts: number;
    }> {
      return request("/vault/sync/trigger", { method: "POST" });
    },
    async getConflicts(): Promise<{ conflicts: SyncConflict[] }> {
      return request("/vault/sync/conflicts");
    },
    async resolveConflict(
      path: string,
      resolution: "local" | "remote" | "keep-both"
    ): Promise<unknown> {
      return request("/vault/sync/resolve", {
        method: "POST",
        body: JSON.stringify({ path, resolution }),
      });
    },
  };
}

export type SyncServerClient = ReturnType<typeof createSyncServerClient>;
