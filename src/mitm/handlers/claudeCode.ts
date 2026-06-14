/**
 * Claude Code (Anthropic CLI) handler.
 *
 * Host: `api.anthropic.com` (opt-in — typical Anthropic API requests originate
 * from many callers, so this handler only fires when the user explicitly
 * configures DNS routing for Claude Code).
 * Format: Anthropic Messages API — POST `/v1/messages` on the OmniRoute router.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import type { AgentId } from "../types";
import { MitmHandlerBase } from "./base";

export class ClaudeCodeHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "claude-code";

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
      const upstream = await this.fetchRouter(payload, "/v1/messages", req.headers);

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
