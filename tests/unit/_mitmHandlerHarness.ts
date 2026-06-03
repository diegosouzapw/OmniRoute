/**
 * Test harness for MitmHandlerBase subclasses.
 *
 * Mocks `globalThis.fetch` so handlers exercise their full intercept() path
 * (router round-trip + SSE pipe) without touching the network. Returns the
 * captured payload, response chunks written to the fake ServerResponse, and
 * the final status code.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { Readable } from "node:stream";
import type { MitmHandlerBase } from "../../src/mitm/handlers/base.ts";

export interface HarnessResult {
  fetchCalled: boolean;
  fetchUrl: string | null;
  fetchHeaders: Record<string, string>;
  fetchBody: string;
  status: number;
  responseChunks: string[];
}

function fakeReq(headers: Record<string, string> = {}): IncomingMessage {
  return {
    method: "POST",
    url: "/v1/chat/completions",
    headers: {
      host: "api.example.com",
      "user-agent": "ut",
      ...headers,
    },
  } as unknown as IncomingMessage;
}

function fakeRes(): { res: ServerResponse; out: HarnessResult } {
  const out: HarnessResult = {
    fetchCalled: false,
    fetchUrl: null,
    fetchHeaders: {},
    fetchBody: "",
    status: 0,
    responseChunks: [],
  };
  let headersSent = false;
  const res = {
    get headersSent() {
      return headersSent;
    },
    writeHead(s: number) {
      out.status = s;
      headersSent = true;
    },
    write(c: Buffer | string) {
      out.responseChunks.push(typeof c === "string" ? c : c.toString());
      return true;
    },
    end(c?: Buffer | string) {
      if (c) out.responseChunks.push(typeof c === "string" ? c : c.toString());
    },
  } as unknown as ServerResponse;
  return { res, out };
}

export async function runHandler(
  handler: MitmHandlerBase,
  body: unknown,
  mappedModel: string,
  opts: {
    upstreamStatus?: number;
    upstreamBody?: string;
    headers?: Record<string, string>;
  } = {}
): Promise<HarnessResult> {
  const { res, out } = fakeRes();
  const req = fakeReq(opts.headers);
  const buf = Buffer.from(typeof body === "string" ? body : JSON.stringify(body));

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    out.fetchCalled = true;
    out.fetchUrl = String(url);
    out.fetchHeaders = (init?.headers ?? {}) as Record<string, string>;
    out.fetchBody = typeof init?.body === "string" ? init.body : "";
    const upstreamBody = opts.upstreamBody ?? "data: hello\n\n";
    const status = opts.upstreamStatus ?? 200;
    const stream = Readable.toWeb(
      Readable.from(Buffer.from(upstreamBody))
    ) as unknown as ReadableStream<Uint8Array>;
    return new Response(stream, { status });
  }) as unknown as typeof fetch;

  try {
    await handler.intercept(req, res, buf, mappedModel);
  } finally {
    globalThis.fetch = originalFetch;
  }
  return out;
}
