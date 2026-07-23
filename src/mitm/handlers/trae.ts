/**
 * Trae handler — stub.
 *
 * D14: Trae viability is still under investigation (see plan 11 §5). The
 * concrete handler will be implemented once we confirm the upstream API
 * surface. Until then, calling `intercept()` throws a structured error and
 * the UI exposes the agent as `viability: "investigating"` (no Setup button).
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import type { AgentId } from "../types";
import { MitmHandlerBase } from "./base";

export class TraeHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "trae";

  async intercept(
    _req: IncomingMessage,
    _res: ServerResponse,
    _body: Buffer,
    _mappedModel: string,
  ): Promise<void> {
    throw new Error("Not yet implemented — Trae viability under investigation. See plan 11 §5.");
  }
}
