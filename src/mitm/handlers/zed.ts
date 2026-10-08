/**
 * Zed editor handler.
 *
 * Host: `api.zed.dev`.
 * Format: OpenAI-compatible Chat Completions — `body.model` is rewritten to
 * the mapped target and the request is forwarded to the OmniRoute router.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import type { AgentId } from "../types";
import { MitmHandlerBase, createBoundedCollector } from "./base";

export class ZedHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "zed";

  async intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string,
  ): Promise<void> {
    const startedAt = this.now();
    const intercepted = await this.hookBufferStart(req, body, mappedModel);

    try {
      const payload = JSON.parse(body.toString());
      payload.model = mappedModel;

      const upstreamStart = this.now();
      const upstream = await this.fetchRouter(payload, "/v1/chat/completions", req.headers);

      if (!upstream.ok) {
        const errText = await upstream.text().catch(() => "");
        throw new Error(`OmniRoute ${upstream.status}: ${errText}`);
      }

      const sink = createBoundedCollector();
      await this.pipeSSE(upstream, res, (chunk) => {
        sink.push(chunk.toString());
      });

      const total = this.now() - startedAt;
      this.hookBufferUpdate(intercepted, {
        status: upstream.status,
        responseHeaders: Object.fromEntries(upstream.headers.entries()),
        responseBody: sink.text,
        responseSize: sink.totalBytes,
        proxyLatencyMs: upstreamStart - startedAt,
        upstreamLatencyMs: total - (upstreamStart - startedAt),
      });
    } catch (err) {
      await this.hookBufferError(intercepted, err);
      await this.writeError(res, err);
    }
  }
}
