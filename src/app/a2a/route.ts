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
import { authenticateA2ARequest, resolveA2AOwner } from "@/lib/a2a/authenticate";

// ============ A2A v1.0 ↔ v0.3 compatibility layer ============
// A2A 1.0 renamed the JSON-RPC methods (message/send → SendMessage,
// message/stream → SendStreamingMessage) and changed the synchronous
// response shape: a 1.0 client reads the reply from
// `task.status.message.parts[].text` (and `task.artifacts`), whereas OmniRoute's
// v0.3 server returns top-level `artifacts`/`metadata`. This layer aliases the
// 1.0 method names and reshapes the synchronous response so 1.0 clients
// (a2a-sdk 1.x, Hermes, …) can call the endpoint unchanged. v0.3 clients are
// unaffected.

const V1_METHOD_ALIASES: Record<string, string> = {
  SendMessage: "message/send",
  SendStreamingMessage: "message/stream",
};

/** Map a v0.3 task state to the v1.0 TASK_STATE_* enum string. */
function toV1State(state: string): string {
  const s = state.toUpperCase();
  return s.startsWith("TASK_STATE_") ? s : `TASK_STATE_${s}`;
}

/**
 * Rebuild a v1.0 Task from a v0.3 task + skill result. v0.3 carries the reply in
 * `artifacts[].content` (type: "text"); v1.0 expects the text inside
 * `task.status.message.parts[].text` and `task.artifacts` as Message parts.
 */
function buildV1Task(
  task: { id: string; state: string },
  result: { artifacts?: unknown },
  contextId?: unknown
): Record<string, unknown> {
  const text = Array.isArray(result.artifacts)
    ? result.artifacts
        .map((a) =>
          a && typeof a === "object" && typeof (a as { content?: unknown }).content === "string"
            ? (a as { content: string }).content
            : ""
        )
        .filter((s) => s.length > 0)
        .join("\n")
    : "";

  const v1Task: Record<string, unknown> = {
    id: task.id,
    status: {
      state: toV1State(task.state),
      message: {
        role: "ROLE_AGENT",
        parts: [{ text, mediaType: "text/plain" }],
      },
    },
    artifacts: [{ role: "ROLE_AGENT", parts: [{ text, mediaType: "text/plain" }] }],
  };
  if (typeof contextId === "string" && contextId) v1Task.contextId = contextId;
  return v1Task;
}

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

async function authenticate(req: NextRequest): Promise<boolean> {
  // /a2a is outside the authz proxy matcher, so the REQUIRE_API_KEY posture the
  // pipeline enforces for /v1 never ran here — the route accepted every caller
  // whenever OMNIROUTE_API_KEY was unset, which is the shipped default
  // (GHSA-v54m-6rm3-p565). The shared helper applies the same posture on both
  // the JSON-RPC and the REST task surfaces (GHSA-jcm5-6wpp-wjj8).
  return authenticateA2ARequest(req);
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
  if (!(await authenticate(req))) {
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
  // GHSA-jcm5-6wpp-wjj8: scope every task read/mutation below to the caller's
  // owner id (hashed API key; undefined under the keyless local-first posture).
  const callerOwner = await resolveA2AOwner(req);

  // A2A 1.0 method-name compatibility (SendMessage → message/send, etc.)
  const isV1Method = method in V1_METHOD_ALIASES;
  const normalizedMethod = V1_METHOD_ALIASES[method] ?? method;

  switch (normalizedMethod) {
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

      const task = tm.createTask({ skill, messages, metadata: params?.metadata }, callerOwner);
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

        if (isV1Method) {
          // A2A 1.0 SendMessageResponse — the reply text lives in
          // task.status.message.parts (1.0 clients read it there; the v0.3
          // top-level artifacts/metadata are not part of the 1.0 shape).
          return jsonRpcResult(id, {
            task: buildV1Task(task, result, params?.message?.contextId),
          });
        }

        return jsonRpcResult(id, {
          task: { id: task.id, state: "completed" },
          artifacts: result.artifacts,
          metadata: result.metadata,
        });
      } catch (err) {
        console.error("A2A ERROR TRACE:", err);
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

      const task = tm.createTask({ skill, messages, metadata: params?.metadata }, callerOwner);
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

      const task = tm.getTask(taskId, callerOwner);
      if (!task) return jsonRpcError(id, -32601, `Task not found: ${taskId}`);

      return jsonRpcResult(id, { task });
    }

    // ── tasks/cancel ──────────────────────────────────────
    case "tasks/cancel": {
      const taskId = params?.taskId || params?.id;
      if (!taskId) return jsonRpcError(id, -32602, "Invalid params: taskId required");

      try {
        const task = tm.cancelTask(taskId, callerOwner);
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
