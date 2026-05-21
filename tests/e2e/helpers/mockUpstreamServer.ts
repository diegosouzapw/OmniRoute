import http from "node:http";
import net from "node:net";

export interface PlannedResponse {
  status: number;
  body: Record<string, unknown>;
  headers?: Record<string, string>;
  delayMs?: number;
}

export interface TokenState {
  defaultResponse: PlannedResponse;
  queue: PlannedResponse[];
  hits: number;
  startedAt: number[];
  bodies: Array<Record<string, unknown>>;
}

function getFreePort(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Failed to allocate a free port"));
        return;
      }
      const { port } = address;
      server.close((err) => {
        if (err) reject(err);
        else resolve(port);
      });
    });
  });
}

export function buildCompletion(
  text: string,
  overrides: Partial<PlannedResponse> & { model?: string } = {}
) {
  return {
    status: overrides.status ?? 200,
    delayMs: overrides.delayMs,
    headers: overrides.headers,
    body: overrides.body ?? {
      id: `chatcmpl_${Math.random().toString(16).slice(2, 8)}`,
      object: "chat.completion",
      model: overrides.model ?? "test-model",
      choices: [{ index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" }],
      usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
    },
  };
}

export function buildError(status: number, message: string, headers: Record<string, string> = {}) {
  return {
    status,
    headers,
    body: { error: { message } },
  };
}

export class MockUpstreamServer {
  private behaviors = new Map<string, TokenState>();
  private server: http.Server | null = null;
  private _baseUrl = "";

  get baseUrl(): string {
    if (!this._baseUrl) throw new Error("Server not started yet");
    return this._baseUrl;
  }

  get isRunning(): boolean {
    return this.server !== null;
  }

  async start(): Promise<string> {
    const port = await getFreePort();
    this.server = http.createServer((req, res) => {
      void this.handleRequest(req, res);
    });
    await new Promise<void>((resolve, reject) => {
      this.server!.once("error", reject);
      this.server!.listen(port, "127.0.0.1", () => resolve());
    });
    this._baseUrl = `http://127.0.0.1:${port}/v1`;
    return this._baseUrl;
  }

  configureToken(
    token: string,
    config: { defaultResponse: PlannedResponse; queue?: PlannedResponse[] }
  ): void {
    this.behaviors.set(token, {
      defaultResponse: config.defaultResponse,
      queue: [...(config.queue || [])],
      hits: 0,
      startedAt: [],
      bodies: [],
    });
  }

  getState(token: string): TokenState {
    const state = this.behaviors.get(token);
    if (!state) throw new Error(`Unknown token: ${token}`);
    return state;
  }

  resetState(token: string, queue?: PlannedResponse[]): void {
    const state = this.behaviors.get(token);
    if (!state) throw new Error(`Unknown token: ${token}`);
    state.hits = 0;
    state.startedAt = [];
    state.bodies = [];
    state.queue = [...(queue || [])];
  }

  async stop(): Promise<void> {
    if (!this.server) return;
    await new Promise<void>((resolve) => this.server?.close(() => resolve()));
    this.server = null;
  }

  private async handleRequest(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    const authHeader = String(req.headers.authorization || "");
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const rawBody = Buffer.concat(chunks).toString("utf8");
    const parsedBody = rawBody ? JSON.parse(rawBody) : {};

    if (req.method === "GET" && req.url?.startsWith("/v1/models")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ data: [{ id: "test-model", object: "model" }] }));
      return;
    }

    if (req.method !== "POST" || !req.url?.startsWith("/v1/chat/completions")) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: { message: `Unhandled: ${req.method} ${req.url}` } }));
      return;
    }

    const behavior = this.behaviors.get(token);
    if (!behavior) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: { message: `Unknown token: ${token || "missing"}` } }));
      return;
    }

    behavior.hits += 1;
    behavior.startedAt.push(Date.now());
    behavior.bodies.push(parsedBody as Record<string, unknown>);

    const planned = behavior.queue.shift() || behavior.defaultResponse;
    process.stderr.write(
      `[MOCK] ${token.slice(0, 8)} hit=${behavior.hits} status=${planned.status}\n`
    );
    if (planned.delayMs && planned.delayMs > 0) {
      await new Promise((r) => setTimeout(r, planned.delayMs));
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(planned.headers || {}),
    };
    res.writeHead(planned.status, headers);
    res.end(JSON.stringify(planned.body));
  }
}
