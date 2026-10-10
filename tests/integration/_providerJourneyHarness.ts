/**
 * Shared harness for the multi-format provider-journey contract suites
 * (`provider-journey-claude.contract.test.ts`, `provider-journey-gemini.contract.test.ts`).
 *
 * - `startFakeUpstream()` runs a real HTTP server on 127.0.0.1 with an ephemeral port that
 *   answers in the PROVIDER's wire format and records every request it receives, so the
 *   suites assert what OmniRoute actually sent upstream. No external network is touched.
 * - `installLoopbackModelsFetch()` serves the sync-models route's loopback self-fetch
 *   (`GET <dashboard>/api/providers/:id/models`) from the in-process `/models` route
 *   handler, so the REAL sync path runs (sync route -> /models route -> upstream /models)
 *   without a dashboard listener. Every other URL goes to the original fetch, i.e. to the
 *   fake upstream.
 */

import http from "node:http";
import type { AddressInfo } from "node:net";

export type JsonObject = Record<string, unknown>;

export type RecordedRequest = {
  method: string;
  path: string;
  headers: http.IncomingHttpHeaders;
  body: JsonObject | null;
};

export type FakeReply = {
  status?: number;
  headers?: Record<string, string>;
  /** Objects are sent as JSON; strings are sent verbatim (e.g. an SSE transcript). */
  body: string | JsonObject;
};

export type FakeUpstream = {
  origin: string;
  port: number;
  requests: RecordedRequest[];
  close: () => Promise<void>;
};

export async function startFakeUpstream(
  reply: (request: RecordedRequest) => FakeReply
): Promise<FakeUpstream> {
  const requests: RecordedRequest[] = [];
  const server = http.createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      let body: JsonObject | null = null;
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as unknown;
          body = parsed && typeof parsed === "object" ? (parsed as JsonObject) : null;
        } catch {
          body = null;
        }
      }
      const recorded: RecordedRequest = {
        method: req.method ?? "GET",
        path: req.url ?? "/",
        headers: req.headers,
        body,
      };
      requests.push(recorded);
      const out = reply(recorded);
      const isJson = typeof out.body !== "string";
      res.writeHead(out.status ?? 200, {
        "content-type": isJson ? "application/json" : "text/event-stream",
        ...(out.headers ?? {}),
      });
      res.end(isJson ? JSON.stringify(out.body) : out.body);
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return {
    origin: `http://127.0.0.1:${port}`,
    port,
    requests,
    close: () =>
      new Promise<void>((resolve) => {
        server.closeAllConnections?.();
        server.close(() => resolve());
      }),
  };
}

type ModelsRouteGet = (
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) => Promise<Response>;

export function installLoopbackModelsFetch(
  internalBaseUrl: string,
  modelsRouteGet: ModelsRouteGet
): () => void {
  const originalFetch = globalThis.fetch;
  const internalOrigin = new URL(internalBaseUrl).origin;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const url = new URL(href);
    if (url.origin !== internalOrigin) return originalFetch(input, init);
    if (url.pathname.includes("__readiness_probe__")) return new Response(null, { status: 404 });
    const match = url.pathname.match(/\/api\/providers\/([^/]+)\/models$/);
    if (!match) throw new Error(`Unexpected loopback fetch in provider journey: ${url.href}`);
    const id = decodeURIComponent(match[1]);
    return modelsRouteGet(new Request(url.href, { headers: init?.headers }), {
      params: Promise.resolve({ id }),
    });
  }) as typeof fetch;
  return () => {
    globalThis.fetch = originalFetch;
  };
}

export async function readJsonObject(response: Response): Promise<JsonObject> {
  const text = await response.text();
  try {
    const parsed = JSON.parse(text) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as JsonObject) : {};
  } catch {
    return { __raw: text };
  }
}

export function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function headerValue(headers: http.IncomingHttpHeaders, name: string): string {
  const value = headers[name.toLowerCase()];
  return Array.isArray(value) ? value.join(",") : (value ?? "");
}
