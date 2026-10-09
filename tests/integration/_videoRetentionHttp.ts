import assert from "node:assert/strict";
import http from "node:http";
import { once } from "node:events";

type Route = (request: Request) => Promise<Response>;

export async function serveRetentionRoutes(routes: Record<string, Route>) {
  const server = http.createServer(async (incoming, outgoing) => {
    try {
      const route = routes[incoming.url || ""];
      if (!route || incoming.method !== "POST") {
        outgoing.writeHead(404).end();
        return;
      }
      const chunks: Buffer[] = [];
      for await (const chunk of incoming) chunks.push(Buffer.from(chunk));
      const headers = new Headers();
      for (const [key, value] of Object.entries(incoming.headers)) {
        if (Array.isArray(value)) value.forEach((item) => headers.append(key, item));
        else if (value !== undefined) headers.set(key, value);
      }
      const request = new Request(`http://127.0.0.1${incoming.url}`, {
        method: "POST",
        headers,
        body: Buffer.concat(chunks),
      });
      const response = await route(request);
      outgoing.writeHead(response.status, Object.fromEntries(response.headers));
      if (response.body) {
        const reader = response.body.getReader();
        try {
          for (;;) {
            const next = await reader.read();
            if (next.done) break;
            if (!outgoing.write(next.value)) await once(outgoing, "drain");
          }
        } finally {
          reader.releaseLock();
        }
      }
      outgoing.end();
    } catch {
      outgoing.writeHead(500).end("retention test route failed");
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert(address && typeof address !== "string");
  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

export async function eventually<T>(fn: () => T | Promise<T>, timeout = 30_000): Promise<T> {
  const deadline = Date.now() + timeout;
  for (;;) {
    const value = await fn();
    if (value) return value;
    assert(Date.now() < deadline, "bounded retention observation timed out");
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
}

export function syntheticReply(content: string, stream: boolean, reasoning?: string): Response {
  const base = { id: "chatcmpl_retention", object: "chat.completion", model: "gpt-4o-mini" };
  const usage = { prompt_tokens: 8, completion_tokens: 8, total_tokens: 16 };
  if (!stream) {
    return Response.json({
      ...base,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content,
            ...(reasoning ? { reasoning_content: reasoning } : {}),
          },
          finish_reason: "stop",
        },
      ],
      usage,
    });
  }
  const chunks = [
    {
      ...base,
      choices: [
        {
          index: 0,
          delta: {
            role: "assistant",
            content,
            ...(reasoning ? { reasoning_content: reasoning } : {}),
          },
          finish_reason: null,
        },
      ],
    },
    { ...base, choices: [{ index: 0, delta: {}, finish_reason: "stop" }], usage },
  ];
  return new Response(
    chunks.map((x) => `data: ${JSON.stringify(x)}\n\n`).join("") + "data: [DONE]\n\n",
    {
      headers: { "content-type": "text/event-stream" },
    }
  );
}
