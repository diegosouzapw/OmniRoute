/**
 * Id-correlated JSON-RPC 2.0 client over a single WebSocket, for the Codex
 * app-server transport.
 *
 * Ported from the stdio JSON-RPC pattern in `devin-cli-agentic.ts` (monotonic id,
 * pending-request map settled on responses, notification vs response
 * discrimination, settle-once) onto the wreq-js WebSocket transport used by the
 * existing Codex WS path.
 *
 * The critical addition over the other transports is a catch-all handler for
 * server -> client ServerRequests: the app-server can ask the client to approve a
 * command / patch / permission. OmniRoute is a ROUTER — the harness that consumes
 * it owns tool execution and policy — so codex must never stall a turn on its own
 * interactive approval. Every inbound ServerRequest is always answered: approval
 * prompts are auto-DENIED by default (they gate codex's OWN host execution, not
 * the harness's tools; auto-approval is an explicit operator opt-in — hardening
 * after the #11205 security review), and anything else we can't service gets a
 * JSON-RPC error so the id is always settled and the turn never hangs.
 */

// wreq-js WebSocket surface (mirrors the private type in codex.ts:71-77).
export type CodexWreqWebSocket = {
  send: (data: string) => void;
  close: (code?: number, reason?: string) => void;
  onmessage: ((event: { data: unknown }) => void) | null;
  onerror: ((event: { message?: string }) => void) | null;
  onclose: (() => void) | null;
};

export type CodexAppServerWebsocketFn = (
  url: string,
  opts?: Record<string, unknown>
) => Promise<CodexWreqWebSocket>;

interface PendingReq {
  resolve: (result: unknown) => void;
  reject: (err: Error) => void;
}

// The set of ServerRequest methods that are approval prompts (see PROTOCOL-DIGEST
// "Server -> client REQUESTS"). All of these get an auto-DENIAL decision unless
// the operator explicitly opted into auto-approval (hardening after the #11205
// security review): these prompts gate codex's OWN command/file/permission
// execution on the host, NOT the harness's dynamic tools (those travel the
// separate item/tool/call passthrough), so denying by default never sabotages
// harness tool calls — it closes a prompt-injection → host-execution path.
const APPROVAL_REQUEST_METHODS = new Set<string>([
  "item/commandExecution/requestApproval",
  "item/fileChange/requestApproval",
  "item/permissions/requestApproval",
  "applyPatchApproval",
  "execCommandApproval",
]);

const ROUTER_APPROVAL_NOTE = "router: harness-controlled execution";
const ROUTER_DENIAL_NOTE =
  "router: denied by default (set codexAppServerAutoApprove to opt in)";

export interface CodexAppServerClientOptions {
  /** Transport factory. Defaults to the shared wreq-js websocket() when omitted. */
  websocketFn?: CodexAppServerWebsocketFn | null;
  /** Default per-request timeout (ms). */
  defaultTimeoutMs?: number;
  /**
   * Auto-APPROVE codex's own approval prompts (command/file/permission).
   * Defaults to FALSE — prompts are auto-denied. Enable only when the operator
   * trusts the app-server deployment to run codex-decided host commands.
   */
  autoApproveApprovals?: boolean;
}

/**
 * The app-server → client REQUEST method by which codex invokes a harness-defined
 * (dynamic) function tool. See appServerEvents.ts:CODEX_APPSERVER_TOOL_CALL_METHOD.
 * A stateless router cannot execute the harness's tool, so this is handled by a
 * PASSTHROUGH handler (surface it as a Responses function_call and complete the
 * turn) rather than by the default -32601 rejection.
 */
const TOOL_CALL_REQUEST_METHOD = "item/tool/call";

/**
 * Handler for a server → client `item/tool/call` ServerRequest. It receives the
 * JSON-RPC id and raw params (DynamicToolCallParams). It OWNS settling the id
 * (call `respond`/`respondError`) so the socket never hangs. Returning lets the
 * executor emit tool_call_* AdapterEvents + complete the turn.
 */
export type CodexAppServerToolCallHandler = (
  id: number,
  params: unknown,
  api: {
    /** Settle the request id with a JSON-RPC result (a DynamicToolCallResponse). */
    respond: (result: unknown) => void;
    /** Settle the request id with a JSON-RPC error. */
    respondError: (code: number, message: string) => void;
  }
) => void;

export class CodexAppServerClient {
  private ws: CodexWreqWebSocket | null = null;
  private nextId = 1;
  private readonly pending = new Map<number, PendingReq>();
  private notificationHandler: (method: string, params: unknown) => void = () => {};
  private toolCallHandler: CodexAppServerToolCallHandler | null = null;
  private readonly websocketFn: CodexAppServerWebsocketFn | null;
  private readonly defaultTimeoutMs: number;
  private readonly autoApproveApprovals: boolean;
  private closed = false;

  constructor(options: CodexAppServerClientOptions = {}) {
    this.websocketFn = options.websocketFn ?? null;
    this.defaultTimeoutMs = options.defaultTimeoutMs ?? 120_000;
    this.autoApproveApprovals = options.autoApproveApprovals === true;
  }

  /**
   * Open the WebSocket and attach the capability token as `Authorization: Bearer`.
   * Do NOT add any chatgpt.com Origin/WS header normalization here — the local
   * app-server wants only the Authorization header.
   */
  async connect(url: string, token: string): Promise<void> {
    if (!this.websocketFn) {
      throw new Error("Codex app-server websocket transport unavailable");
    }
    // wreq-js's websocket() REQUIRES a browser/os impersonation profile alongside
    // headers — the same shape the existing Codex WS path uses (codex.ts:980).
    // Omitting browser/os makes the native call hang/throw, so the app-server
    // turn never connects. The local app-server ignores the impersonation
    // fingerprint; only the Authorization bearer matters for its ws-auth.
    this.ws = await this.websocketFn(url, {
      browser: "chrome_142",
      os: "windows",
      headers: { Authorization: `Bearer ${token}` },
    });
    this.ws.onmessage = (event) => this.onFrame(event.data);
    this.ws.onerror = (event) => this.failAll(event?.message ?? "app-server socket error");
    this.ws.onclose = () => this.failAll("app-server connection closed");
  }

  /** Send a ClientRequest and resolve when its id-matched response arrives. */
  request<T = unknown>(method: string, params: unknown, timeoutMs = this.defaultTimeoutMs): Promise<T> {
    const id = this.nextId++;
    return new Promise<T>((resolve, reject) => {
      if (!this.ws || this.closed) {
        reject(new Error(`Cannot send ${method}: app-server connection is not open`));
        return;
      }
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Codex app-server request "${method}" timed out after ${timeoutMs}ms`));
      }, timeoutMs);
      this.pending.set(id, {
        resolve: (result) => {
          clearTimeout(timer);
          resolve(result as T);
        },
        reject: (err) => {
          clearTimeout(timer);
          reject(err);
        },
      });
      this.ws.send(JSON.stringify({ jsonrpc: "2.0", id, method, params }));
    });
  }

  /** Send a ClientNotification (no id, no reply expected — e.g. turn/interrupt). */
  notify(method: string, params: unknown): void {
    if (!this.ws || this.closed) return;
    this.ws.send(JSON.stringify({ jsonrpc: "2.0", method, params }));
  }

  /** Register the handler that receives server -> client NOTIFICATIONS (no id). */
  onNotification(fn: (method: string, params: unknown) => void): void {
    this.notificationHandler = fn;
  }

  /**
   * Register the handler for the `item/tool/call` server → client ServerRequest
   * (a harness function-tool invocation). When set, `item/tool/call` is routed to
   * this handler INSTEAD of the default -32601 rejection; the handler must settle
   * the id via the provided `respond`/`respondError`. When unset, `item/tool/call`
   * falls through to the default rejection (keeps the turn unstuck).
   */
  onToolCall(fn: CodexAppServerToolCallHandler): void {
    this.toolCallHandler = fn;
  }

  close(): void {
    if (this.closed) return;
    this.closed = true;
    try {
      this.ws?.close(1000, "done");
    } catch {
      /* socket close race — ignore */
    }
  }

  /** Parse one inbound frame and dispatch by JSON-RPC shape. */
  private onFrame(raw: unknown): void {
    let msg: Record<string, unknown>;
    try {
      const line = typeof raw === "string" ? raw : Buffer.from(raw as Uint8Array).toString("utf8");
      msg = JSON.parse(line) as Record<string, unknown>;
    } catch {
      // A non-JSON frame is unusable; drop it rather than crash the socket.
      return;
    }

    const hasId = msg.id !== undefined && msg.id !== null;
    const hasMethod = typeof msg.method === "string";

    if (hasId && !hasMethod) {
      // A RESPONSE to one of our ClientRequests → settle the pending map.
      const id = msg.id as number;
      const pending = this.pending.get(id);
      if (!pending) return;
      this.pending.delete(id);
      if (msg.error) {
        const err = msg.error as { code?: unknown; message?: unknown };
        pending.reject(new Error(`${String(err.code ?? "error")}: ${String(err.message ?? "unknown")}`));
      } else {
        pending.resolve(msg.result);
      }
      return;
    }

    if (hasMethod && hasId) {
      // A server -> client REQUEST → we MUST reply with the matching id or the turn stalls.
      const id = msg.id as number;
      const method = msg.method as string;
      // A harness function-tool invocation is routed to the passthrough handler
      // (if registered) so the executor can surface it as a Responses function_call
      // and complete the turn. The handler owns settling the id.
      if (method === TOOL_CALL_REQUEST_METHOD && this.toolCallHandler) {
        this.toolCallHandler(id, msg.params, {
          respond: (result) => this.respondToRequest(id, result),
          respondError: (code, message) => this.respondErrorToRequest(id, code, message),
        });
        return;
      }
      this.answerServerRequest(id, method);
      return;
    }

    if (hasMethod) {
      // A server -> client NOTIFICATION → hand to the stream.
      this.notificationHandler(msg.method as string, msg.params);
    }
  }

  /**
   * Always answer an inbound ServerRequest so its id is settled. Approval
   * prompts are auto-DENIED unless the operator opted into auto-approval
   * (hardening after the #11205 security review): they gate codex's OWN host
   * command/file execution, not the harness's tools. Anything we cannot
   * service gets a JSON-RPC error so the id is still settled.
   */
  private answerServerRequest(id: number, method: string): void {
    if (!this.ws || this.closed) return;
    if (APPROVAL_REQUEST_METHODS.has(method)) {
      // ReviewDecision — "denied" by default; "approved" only with the explicit
      // operator opt-in. The note field is advisory; the decision string is
      // what codex acts on.
      const approved = this.autoApproveApprovals;
      this.ws.send(
        JSON.stringify({
          jsonrpc: "2.0",
          id,
          result: {
            decision: approved ? "approved" : "denied",
            note: approved ? ROUTER_APPROVAL_NOTE : ROUTER_DENIAL_NOTE,
          },
        })
      );
      return;
    }
    // Non-approval server request we do not service here: reject the id so the
    // app-server does not wait on us (belt-and-suspenders; keeps turns unstuck).
    this.ws.send(
      JSON.stringify({
        jsonrpc: "2.0",
        id,
        error: {
          code: -32601,
          message: `router: unsupported server request "${method}"`,
        },
      })
    );
  }

  /** Settle an inbound ServerRequest id with a JSON-RPC result. */
  private respondToRequest(id: number, result: unknown): void {
    if (!this.ws || this.closed) return;
    this.ws.send(JSON.stringify({ jsonrpc: "2.0", id, result }));
  }

  /** Settle an inbound ServerRequest id with a JSON-RPC error. */
  private respondErrorToRequest(id: number, code: number, message: string): void {
    if (!this.ws || this.closed) return;
    this.ws.send(JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }));
  }

  private failAll(reason: string): void {
    const err = new Error(reason);
    for (const [id, pending] of this.pending.entries()) {
      this.pending.delete(id);
      pending.reject(err);
    }
    this.notificationHandler("__transport_closed__", { reason });
  }
}
