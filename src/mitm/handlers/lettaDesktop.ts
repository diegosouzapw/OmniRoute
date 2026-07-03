/**
 * Letta Desktop App handler.
 *
 * Host: `api.letta.com`.
 * Format: Custom Letta JSON -> translated to OpenAI Chat Completions for OmniRoute.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import type { AgentId } from "../types";
import { MitmHandlerBase } from "./base";
import { createParser } from "eventsource-parser"; // standard for parsing SSE

export class LettaHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "lettaDesktop";

  async intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void> {
    const startedAt = this.now();
    const intercepted = await this.hookBufferStart(req, body, mappedModel);

    try {
      const lettaPayload = JSON.parse(body.toString());

      // 1. Translate Letta to OpenAI format
      const openaiMessages = (lettaPayload.messages || []).map((m: any) => {
        let role = "user";
        if (m.message_type === "assistant_message") role = "assistant";
        if (m.message_type === "system_message") role = "system";

        let content = m.content;
        // If content isn't a string (or missing), stringify it as fallback
        if (typeof content !== "string") {
          content = JSON.stringify(m);
        }

        return { role, content };
      });

      const openaiPayload = {
        model: mappedModel,
        messages: openaiMessages,
        stream: true,
      };

      const upstreamStart = this.now();
      const upstream = await this.fetchRouter(openaiPayload, "/v1/chat/completions", req.headers);

      if (!upstream.ok) {
        const errText = await upstream.text().catch(() => "");
        throw new Error(`OmniRoute ${upstream.status}: ${errText}`);
      }

      // 2. Stream back translated Letta SSE
      if (!res.headersSent) {
        res.writeHead(upstream.status, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "X-Accel-Buffering": "no",
        });
      }

      let collected = "";

      if (!upstream.body) {
        res.end();
        return;
      }

      // Setup parser to parse OpenAI SSE chunks
      const parser = createParser((event) => {
        if (event.type === "event") {
          if (event.data === "[DONE]") {
            res.write(`data: [DONE]\n\n`);
            return;
          }

          try {
            const data = JSON.parse(event.data);
            const delta = data.choices?.[0]?.delta?.content;
            if (delta) {
              const lettaChunk = {
                id: data.id || `msg_${randomUUID()}`,
                message_type: "assistant_message",
                content: delta,
                date: new Date().toISOString(),
              };
              res.write(`data: ${JSON.stringify(lettaChunk)}\n\n`);
            }
          } catch {
            // Ignore malformed JSON in SSE
          }
        }
      });

      const reader = upstream.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const buf = Buffer.from(value);
          collected += buf.toString();
          parser.feed(buf.toString());
        }
      } finally {
        res.end();
      }

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
