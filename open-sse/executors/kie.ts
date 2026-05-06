import { BaseExecutor } from "./base.ts";
import { sleep } from "../utils/sleep.ts";
import {
  isJsonObject,
  normalizeKieTaskState,
  type JsonObject,
  type KieTaskState,
} from "../utils/kieTask.ts";

export type { KieTaskState } from "../utils/kieTask.ts";

type KieTaskInput = {
  baseUrl: string;
  token: string;
  payload: unknown;
  endpoint?: string;
};

type KiePollInput = {
  statusUrl: string;
  taskId: string;
  token: string;
  timeoutMs: number;
  pollIntervalMs: number;
};

export type KieTaskRecord = {
  data: JsonObject;
  state: KieTaskState;
};

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/$/, "");
}

export class KieExecutor extends BaseExecutor {
  constructor() {
    super("kie", { baseUrl: "https://api.kie.ai" });
  }

  getTaskCreateUrl(baseUrl: string, endpoint = "/api/v1/jobs/createTask"): string {
    return `${normalizeBaseUrl(baseUrl)}${endpoint}`;
  }

  getTaskStatusUrl(baseUrl: string): string {
    return `${normalizeBaseUrl(baseUrl)}/api/v1/jobs/recordInfo`;
  }

  async createTask({ baseUrl, token, payload, endpoint }: KieTaskInput): Promise<JsonObject> {
    const res = await fetch(this.getTaskCreateUrl(baseUrl, endpoint), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      throw Object.assign(new Error(error || `Kie createTask failed with status ${res.status}`), {
        status: res.status,
      });
    }

    const data = (await res.json()) as unknown;
    return isJsonObject(data) ? data : {};
  }

  async pollTask({
    statusUrl,
    taskId,
    token,
    timeoutMs,
    pollIntervalMs,
  }: KiePollInput): Promise<KieTaskRecord> {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const pollUrl = new URL(statusUrl);
      pollUrl.searchParams.set("taskId", String(taskId));

      const res = await fetch(pollUrl.toString(), {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const error = await res.text();
        throw Object.assign(new Error(error || `Kie poll failed with status ${res.status}`), {
          status: res.status,
        });
      }

      const data = (await res.json()) as unknown;
      const recordData = isJsonObject(data) ? data : {};
      const state = normalizeKieTaskState(recordData);
      if (state !== "pending") {
        return { data: recordData, state };
      }

      await sleep(pollIntervalMs);
    }

    throw Object.assign(new Error("Kie task timed out"), { status: 504 });
  }
}

export const kieExecutor = new KieExecutor();
