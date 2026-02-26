import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { getRuntimePorts } from "@/lib/runtime/ports";

const OPENAI_COMPAT_PATHS = [
  /^\/v1(?:\/|$)/,
  /^\/chat\/completions(?:\?|$)/,
  /^\/responses(?:\?|$)/,
  /^\/models(?:\?|$)/,
  /^\/codex(?:\/|\?|$)/,
];

function isOpenAiCompatiblePath(pathname: string): boolean {
  return OPENAI_COMPAT_PATHS.some((pattern) => pattern.test(pathname));
}

function proxyRequest(req: IncomingMessage, res: ServerResponse, dashboardPort: number): void {
  const targetReq = http.request(
    {
      hostname: "127.0.0.1",
      port: dashboardPort,
      method: req.method,
      path: req.url,
      headers: {
        ...req.headers,
        host: `127.0.0.1:${dashboardPort}`,
      },
    },
    (targetRes) => {
      res.writeHead(targetRes.statusCode || 502, targetRes.headers);
      targetRes.pipe(res);
    }
  );

  targetReq.on("error", (error) => {
    if (res.headersSent) return;
    res.writeHead(502, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        error: "api_bridge_unavailable",
        detail: String(error.message || error),
      })
    );
  });

  req.on("aborted", () => {
    targetReq.destroy();
  });

  req.pipe(targetReq);
}

declare global {
  var __omnirouteApiBridgeStarted: boolean | undefined;
}

export function initApiBridgeServer(): void {
  if (globalThis.__omnirouteApiBridgeStarted) return;

  const { apiPort, dashboardPort } = getRuntimePorts();
  if (apiPort === dashboardPort) return;

  const host = process.env.API_HOST || "127.0.0.1";

  const server = http.createServer((req, res) => {
    const rawUrl = req.url || "/";
    const pathname = rawUrl.split("?")[0] || "/";

    if (!isOpenAiCompatiblePath(pathname)) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          error: "not_found",
          message: "API port only serves OpenAI-compatible routes.",
        })
      );
      return;
    }

    proxyRequest(req, res, dashboardPort);
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error?.code === "EADDRINUSE") {
      console.warn(
        `[API Bridge] Port ${apiPort} is already in use. API bridge disabled. (dashboard: ${dashboardPort})`
      );
      return;
    }
    console.warn("[API Bridge] Failed to start:", error?.message || error);
  });

  server.listen(apiPort, host, () => {
    globalThis.__omnirouteApiBridgeStarted = true;
    console.log(`[API Bridge] Listening on ${host}:${apiPort} -> dashboard:${dashboardPort}`);
  });
}
