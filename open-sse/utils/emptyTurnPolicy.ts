import { getRegistryEntry } from "../config/providerRegistry.ts";

type NativeProtocol = "openai" | "claude" | "openai-responses";
type EmptyTurnExecution = {
  protocol: NativeProtocol;
  normalStop: boolean;
  messageStop: boolean;
  openedBlock: boolean;
  failed: boolean;
};

// Internal response identities only: no header can grant this policy. The
// execution boundary establishes origin; native bytes establish termination.
const executions = new WeakMap<Response, EmptyTurnExecution>();
const MAX_FRAME_CHARS = 1_048_576;

// Azure resource endpoints documented by the official Foundry API.
function azureProtocol(actual: URL): NativeProtocol | null {
  if (
    !/^[a-z0-9-]{1,63}\.(?:openai\.azure\.com|services\.ai\.azure\.com)$/.test(actual.hostname) ||
    actual.port
  )
    return null;
  if (actual.pathname === "/openai/v1/responses") return "openai-responses";
  if (
    actual.hostname.endsWith(".services.ai.azure.com") &&
    actual.pathname === "/anthropic/v1/messages"
  )
    return "claude";
  return null;
}

function executionProtocol(response: Response, requestUrl: string): NativeProtocol | null {
  try {
    const actual = new URL(response.url || requestUrl);
    if (actual.protocol !== "https:" || actual.username || actual.password) return null;
    const azure = azureProtocol(actual);
    if (azure) return azure;
    // These are protocol-native endpoints already used by the executors. A
    // compatible node or overridden base URL does not inherit their policy.
    for (const id of ["openai", "anthropic", "codex", "openrouter"]) {
      const entry = getRegistryEntry(id);
      if (!entry?.baseUrl) continue;
      const expected = new URL(entry.baseUrl);
      if (actual.origin === expected.origin && actual.pathname === expected.pathname) {
        return entry.format as NativeProtocol;
      }
    }
  } catch {
    // Unknown origins keep the existing empty-content guard.
  }
  return null;
}

function observeClaudePayload(state: EmptyTurnExecution, data: Record<string, unknown>) {
  if (
    data.type === "content_block_start" ||
    (Array.isArray(data.content) && data.content.length > 0)
  )
    state.openedBlock = true;
  const delta = data.delta as Record<string, unknown> | undefined;
  const reason = data.stop_reason ?? delta?.stop_reason;
  if (reason === "end_turn" || reason === "stop_sequence") state.normalStop = true;
  if (data.type === "message_stop" || data.type === "message") state.messageStop = true;
}

function isCompletedResponsesPayload(
  data: Record<string, unknown>,
  response: Record<string, unknown> | undefined
): boolean {
  return (
    (data.type === "response.completed" && response?.status === "completed") ||
    (data.object === "response" && data.status === "completed")
  );
}

function observePayload(state: EmptyTurnExecution, value: unknown) {
  if (!value || typeof value !== "object") return;
  const data = value as Record<string, unknown>;
  const response = data.response as Record<string, unknown> | undefined;
  if (
    data.error ||
    response?.error ||
    data.type === "error" ||
    data.type === "response.failed" ||
    data.status === "failed"
  ) {
    state.failed = true;
    return;
  }
  if (state.protocol === "openai") {
    const choices = data.choices as { finish_reason?: unknown }[] | undefined;
    if (
      Array.isArray(choices) &&
      choices.length > 0 &&
      choices.every((choice) => choice.finish_reason === "stop")
    )
      state.normalStop = true;
  } else if (state.protocol === "claude") {
    observeClaudePayload(state, data);
  } else if (isCompletedResponsesPayload(data, response)) {
    state.normalStop = true;
  }
}

function observePart(state: EmptyTurnExecution, part: string, isSse: boolean) {
  const json = isSse ? (part.startsWith("data:") ? part.slice(5).trim() : "") : part;
  if (!json || json === "[DONE]") return;
  try {
    observePayload(state, JSON.parse(json));
  } catch {
    // An incomplete/unrecognized frame cannot establish a normal stop.
  }
}

export function markEmptyTurnExecution(
  response: Response,
  requestUrl: string,
  credentials: Record<string, unknown>
): Response {
  if (
    !response.ok ||
    !response.body ||
    !credentials?.connectionId ||
    !(credentials.apiKey || credentials.accessToken)
  )
    return response;
  const protocol = executionProtocol(response, requestUrl);
  if (!protocol) return response;
  const state: EmptyTurnExecution = {
    protocol,
    normalStop: false,
    messageStop: false,
    openedBlock: false,
    failed: false,
  };
  const decoder = new TextDecoder();
  const isSse = (response.headers.get("content-type") || "").includes("text/event-stream");
  let pending = "";
  function consume(text: string, done = false) {
    if (state.failed) return;
    pending += text;
    if (pending.length > MAX_FRAME_CHARS) {
      state.failed = true;
      pending = "";
      return;
    }
    if (!isSse && !done) return;
    const parts = isSse ? pending.split(/\r?\n/) : [pending];
    pending = isSse && !done ? parts.pop() || "" : "";
    for (const part of parts) {
      observePart(state, part, isSse);
    }
  }
  const body = response.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        consume(decoder.decode(chunk, { stream: true }));
        controller.enqueue(chunk);
      },
      flush() {
        consume(decoder.decode(), true);
      },
    })
  );
  const observed = new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
  executions.set(observed, state);
  return observed;
}

/** True only after an executed native protocol supplied its ordinary terminal. */
export function hasTrustedEmptyTurn(response: Response): boolean {
  const state = executions.get(response);
  return (
    !!state &&
    !state.failed &&
    state.normalStop &&
    (state.protocol !== "claude" || (state.messageStop && !state.openedBlock))
  );
}

export function inheritEmptyTurnPolicy(source: Response, target: Response): Response {
  const execution = executions.get(source);
  if (execution) executions.set(target, execution);
  return target;
}
