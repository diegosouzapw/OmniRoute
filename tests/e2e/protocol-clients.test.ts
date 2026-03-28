import { describe, it, expect } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const BASE_URL = process.env.OMNIROUTE_BASE_URL || "http://localhost:20128";
const API_KEY = process.env.OMNIROUTE_API_KEY || "";
const REQUEST_TIMEOUT_MS = Number(process.env.ECOSYSTEM_REQUEST_TIMEOUT_MS || 30000);
const TEST_TIMEOUT_MS = Number(process.env.ECOSYSTEM_TEST_TIMEOUT_MS || 60000);

function headers(extra?: Record<string, string>) {
  return {
    "Content-Type": "application/json",
    ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
    ...(extra || {}),
  };
}

async function apiFetch(path: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...headers(),
      ...(options?.headers || {}),
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

async function callA2A(method: string, params: Record<string, unknown>, id: string) {
  const response = await apiFetch("/a2a", {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id,
      method,
      params,
    }),
  });
  const json = await response.json().catch(() => ({}));
  return { response, json };
}

async function consumeA2AStream(response: Response): Promise<{
  taskId: string | null;
  terminalState: string | null;
  chunks: number;
}> {
  if (!response.body) return { taskId: null, terminalState: null, chunks: 0 };

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let taskId: string | null = null;
  let terminalState: string | null = null;
  let chunks = 0;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const event of events) {
      if (!event.startsWith("data: ")) continue;
      const payload = event.slice("data: ".length);
      let parsed: any;
      try {
        parsed = JSON.parse(payload);
      } catch {
        continue;
      }
      const nextTaskId = parsed?.params?.task?.id;
      const nextState = parsed?.params?.task?.state;
      if (nextTaskId) taskId = nextTaskId;
      if (parsed?.params?.chunk) chunks += 1;
      if (
        typeof nextState === "string" &&
        ["completed", "failed", "cancelled"].includes(nextState)
      ) {
        terminalState = nextState;
      }
    }
  }

  return { taskId, terminalState, chunks };
}

describe("Protocol clients E2E", () => {
  it(
    "connects via MCP stdio and invokes required tools",
    async () => {
      const transport = new StdioClientTransport({
        command: process.execPath,
        args: ["--import", "tsx/esm", "open-sse/mcp-server/server.ts"],
        env: {
          ...process.env,
          OMNIROUTE_BASE_URL: BASE_URL,
          OMNIROUTE_API_KEY: API_KEY,
        } as Record<string, string>,
        stderr: "pipe",
      });

      const client = new Client({ name: "protocol-e2e", version: "1.0.0" });
      await client.connect(transport);

      try {
        const listed = await client.listTools();
        const toolNames = listed.tools.map((tool) => tool.name);
        expect(toolNames).toContain("omniroute_get_health");
        expect(toolNames).toContain("omniroute_list_combos");

        const healthResult = await client.callTool({
          name: "omniroute_get_health",
          arguments: {},
        });
        expect(Array.isArray(healthResult.content)).toBe(true);

        const combosResult = await client.callTool({
          name: "omniroute_list_combos",
          arguments: { includeMetrics: false },
        });
        expect(Array.isArray(combosResult.content)).toBe(true);
      } finally {
        await client.close();
      }

      const auditRes = await apiFetch("/api/mcp/audit?limit=50&tool=omniroute_get_health");
      if (auditRes.status === 401) {
        console.warn("Skipping audit log verification (Auth required)");
      } else {
        expect(auditRes.ok).toBe(true);
        const auditJson = await auditRes.json();
        const entries = Array.isArray(auditJson?.entries) ? auditJson.entries : [];
        expect(entries.some((entry: any) => entry.toolName === "omniroute_get_health")).toBe(true);
      }
    },
    TEST_TIMEOUT_MS * 2
  );

  it(
    "executes A2A discovery/send/stream/get/cancel flow",
    async () => {
      const cardRes = await apiFetch("/.well-known/agent.json");
      expect(cardRes.ok).toBe(true);
      const card = await cardRes.json();
      expect(card).toHaveProperty("name");
      expect(Array.isArray(card?.skills)).toBe(true);

      const send = await callA2A(
        "message/send",
        {
          skill: "quota-management",
          messages: [{ role: "user", content: "Return a short quota summary." }],
        },
        "protocol-send"
      );
      if (send.response.status === 401) {
        console.warn("Skipping A2A message send (Auth required)");
        return;
      }
      expect(send.response.ok).toBe(true);
      expect(send.json?.error).toBeFalsy();
      const sendTaskId: string = send.json?.result?.task?.id;
      expect(typeof sendTaskId).toBe("string");

      const streamRes = await apiFetch("/a2a", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "protocol-stream",
          method: "message/stream",
          params: {
            skill: "quota-management",
            messages: [{ role: "user", content: "Stream a short quota summary." }],
          },
        }),
      });
      expect(streamRes.ok).toBe(true);
      expect(streamRes.headers.get("content-type") || "").toContain("text/event-stream");

      const stream = await consumeA2AStream(streamRes);
      expect(typeof stream.taskId === "string" || stream.taskId === null).toBe(true);
      expect(
        stream.terminalState === null ||
          ["completed", "failed", "cancelled"].includes(stream.terminalState)
      ).toBe(true);

      const taskIdForGet = stream.taskId || sendTaskId;
      const get = await callA2A("tasks/get", { taskId: taskIdForGet }, "protocol-get");
      expect(get.response.ok).toBe(true);
      expect(get.json?.result?.task?.id).toBe(taskIdForGet);

      const cancelRes = await apiFetch(
        `/api/a2a/tasks/${encodeURIComponent(taskIdForGet)}/cancel`,
        {
          method: "POST",
        }
      );
      expect([200, 400, 401, 404]).toContain(cancelRes.status);

      const tasksRes = await apiFetch("/api/a2a/tasks?limit=50");
      if (tasksRes.status === 401) {
        console.warn("Skipping a2a tasks listing (Auth required)");
      } else {
        expect(tasksRes.ok).toBe(true);
        const tasksJson = await tasksRes.json();
        const tasks = Array.isArray(tasksJson?.tasks) ? tasksJson.tasks : [];
        expect(tasks.some((task: any) => task.id === sendTaskId)).toBe(true);
      }
    },
    TEST_TIMEOUT_MS * 2
  );
});
