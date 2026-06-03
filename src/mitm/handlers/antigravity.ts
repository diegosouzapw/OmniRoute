/**
 * Antigravity IDE handler.
 *
 * Preserves the historical behavior of `src/mitm/server.cjs::intercept()`:
 *   - parses the incoming JSON body,
 *   - replaces `body.model` with the mapped model,
 *   - forwards to `/v1/chat/completions` on the OmniRoute router,
 *   - pipes the SSE response back to the IDE.
 *
 * Non-regressive: any change here must keep the Antigravity flow working as
 * before (see `tests/unit/mitm-handler-antigravity.test.ts`).
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import type { AgentId } from "../types";
import { MitmHandlerBase } from "./base";

export class AntigravityHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "antigravity";

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

      let collected = "";
      await this.pipeSSE(upstream, res, (chunk) => {
        collected += chunk.toString();
      });

      const total = this.now() - startedAt;
      this.hookBufferUpdate(intercepted, {
        status: upstream.status,
        responseHeaders: Object.fromEntries(upstream.headers.entries()),
        responseBody: collected,
        responseSize: Buffer.byteLength(collected),
        proxyLatencyMs: upstreamStart - startedAt,
        upstreamLatencyMs: total - (upstreamStart - startedAt),
      });
    } catch (err) {
      await this.hookBufferError(intercepted, err);
      await this.writeError(res, err);
    }
  }
}
