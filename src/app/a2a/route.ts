/**
 * A2A JSON-RPC 2.0 Router — `/a2a` endpoint
 *
 * Methods:
 *   - message/send     — Synchronous task execution
 *   - message/stream   — SSE streaming execution
 *   - tasks/get        — Query task by ID
 *   - tasks/cancel     — Cancel task by ID
 *
 * Auth: Bearer token via Authorization header
 */

import { NextRequest, NextResponse } from "next/server";
import { getTaskManager } from "@/lib/a2a/taskManager";
import { logRoutingDecision } from "@/lib/a2a/routingLogger";
import { createA2AStream, SSE_HEADERS } from "@/lib/a2a/streaming";
import { A2A_SKILL_HANDLERS, executeA2ATaskWithState } from "@/lib/a2a/taskExecution";
import { getSettings } from "@/lib/db/settings";

type A2AMessage = { role: string; content: string };

function toMessageArray(raw: unknown): A2AMessage[] | null {
  if (Array.isArray(raw)) {
    const normalized = raw
      .map((entry) => {
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
        const msg = entry as Record<string, unknown>;
        const role = typeof msg.role === "string" && msg.role.trim() ? msg.role : "user";
        const content = typeof msg.content === "string" ? msg.content : null;
        if (!content) return null;
        return { role, content };
      })
      .filter((entry): entry is A2AMessage => !!entry);
    return normalized.length > 0 ? normalized : null;
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const message = raw as Record<string, unknown>;
  const role = typeof message.role === "string" && message.role.trim() ? message.role : "user";

  // Canonical A2A shape: { message: { role, content } }
  if (typeof message.content === "string" && message.content.trim()) {
    return [{ role, content: message.content }];
  }

  // Legacy compatibility: { message: { parts: [...] } }
  if (Array.isArray(message.parts)) {
    const text = message.parts
      .map((part) => {
        if (typeof part === "string") return part;
        if (!part || typeof part !== "object" || Array.isArray(part)) return "";
        const chunk = part as Record<string, unknown>;
        if (typeof chunk.content === "string") return chunk.content;
        if (typeof chunk.text === "string") return chunk.text;
        return "";
      })
      .filter((chunk) => chunk.trim().length > 0)
      .join("\n");
    if (text) return [{ role, content: text }];
  }

  return null;
}

// ============ Auth ============

function authenticate(req: NextRequest): boolean {
  // If no API key is configured, allow all requests
  const configuredKey = process.env.OMNIROUTE_API_KEY;
  if (!configuredKey) return true;

  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  return token === configuredKey;
}

// ============ JSON-RPC Helpers ============

function jsonRpcError(id: string | number | null, code: number, message: string, data?: unknown) {
  return NextResponse.json(
    { jsonrpc: "2.0", id, error: { code, message, data } },
    { status: code === -32600 ? 400 : code === -32601 ? 404 : code === -32603 ? 500 : 200 }
  );
}

function jsonRpcResult(id: string | number | null, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

async function rejectIfA2ADisabled(id: string | number | null) {
  const settings = await getSettings();
  if (settings.a2aEnabled === true) return null;
  return NextResponse.json(
    {
      jsonrpc: "2.0",
      id,
      error: {
        code: -32000,
        message: "A2A endpoint is disabled. Enable it from the Endpoints page.",
      },
    },
    { status: 503 }
  );
}

// ============ Route Handler ============

export async function POST(req: NextRequest) {
  // Auth check
  if (!authenticate(req)) {
    return jsonRpcError(null, -32600, "Unauthorized: missing or invalid API key");
  }

  // Parse JSON-RPC body
  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonRpcError(null, -32700, "Parse error: invalid JSON");
  }

  const { jsonrpc, id, method, params } = body;
  if (jsonrpc !== "2.0" || !method) {
    return jsonRpcError(id || null, -32600, "Invalid request: missing jsonrpc or method");
  }

  const disabledResponse = await rejectIfA2ADisabled(id ?? null);
  if (disabledResponse) return disabledResponse;

  const tm = getTaskManager();

  switch (method) {
    // ── message/send ──────────────────────────────────────
    case "message/send": {
      const skill = params?.skill || "smart-routing";
      const messages = toMessageArray(params?.messages) || toMessageArray(params?.message);
      if (!messages) {
        return jsonRpcError(
          id,
          -32602,
          "Invalid params: provide `messages[]` or `message.content`"
        );
      }

      const handler = A2A_SKILL_HANDLERS[skill];
      if (!handler) {
        return jsonRpcError(id, -32601, `Unknown skill: ${skill}`);
      }

      const task = tm.createTask({ skill, messages, metadata: params?.metadata });
      try {
        tm.updateTask(task.id, "working");
        const result = await handler(task);
        tm.updateTask(task.id, "completed", result.artifacts);

        // Log routing decision
        if (skill === "smart-routing" && result.metadata) {
          const smartMetadata = result.metadata as {
            routing_explanation?: string;
            cost_envelope?: { actual?: number };
          };
          logRoutingDecision({
            taskType: (params?.metadata?.role as string) || "general",
            comboId: (params?.metadata?.combo as string) || "default",
            providerSelected:
              smartMetadata.routing_explanation?.match(/"([^"]+)"/)?.[1] || "unknown",
            modelUsed: (params?.metadata?.model as string) || "auto",
            score: 1,
            factors: [],
            fallbacksTriggered: [],
            success: true,
            latencyMs: 0,
            cost: smartMetadata.cost_envelope?.actual || 0,
          });
        }

        return jsonRpcResult(id, {
          task: { id: task.id, state: "completed" },
          artifacts: result.artifacts,
          metadata: result.metadata,
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        tm.updateTask(task.id, "failed", [{ type: "error", content: msg }], msg);
        return jsonRpcError(id, -32603, `Skill execution failed: ${msg}`);
      }
    }

    // ── message/stream ────────────────────────────────────
    case "message/stream": {
      const skill = params?.skill || "smart-routing";
      const messages = toMessageArray(params?.messages) || toMessageArray(params?.message);
      if (!messages) {
        return jsonRpcError(
          id,
          -32602,
          "Invalid params: provide `messages[]` or `message.content`"
        );
      }

      const handler = A2A_SKILL_HANDLERS[skill];
      if (!handler) {
        return jsonRpcError(id, -32601, `Unknown skill: ${skill}`);
      }

      const task = tm.createTask({ skill, messages, metadata: params?.metadata });
      tm.updateTask(task.id, "working");

      const stream = createA2AStream(
        task,
        async (t) => executeA2ATaskWithState(tm, t, handler),
        req.signal,
        {
          onStart: () => tm.beginStream(),
          onEnd: () => tm.endStream(),
        }
      );

      return new Response(stream, { headers: SSE_HEADERS });
    }

    // ── tasks/get ─────────────────────────────────────────
    case "tasks/get": {
      const taskId = params?.taskId || params?.id;
      if (!taskId) return jsonRpcError(id, -32602, "Invalid params: taskId required");

      const task = tm.getTask(taskId);
      if (!task) return jsonRpcError(id, -32601, `Task not found: ${taskId}`);

      return jsonRpcResult(id, { task });
    }

    // ── tasks/cancel ──────────────────────────────────────
    case "tasks/cancel": {
      const taskId = params?.taskId || params?.id;
      if (!taskId) return jsonRpcError(id, -32602, "Invalid params: taskId required");

      try {
        const task = tm.cancelTask(taskId);
        return jsonRpcResult(id, { task: { id: task.id, state: task.state } });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return jsonRpcError(id, -32603, msg);
      }
    }

    default:
      return jsonRpcError(id, -32601, `Method not found: ${method}`);
  }
}

// Agent Card discovery via OPTIONS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
