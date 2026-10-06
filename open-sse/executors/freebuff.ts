import { randomInt } from "node:crypto";

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

const MODEL_TO_AGENT: Record<string, string> = {
  "deepseek/deepseek-v4-flash": "base2-free-deepseek-flash",
  "deepseek/deepseek-v4-pro": "base2-free-deepseek",
  "openai/gpt-5.6-luna": "base2-free-luna",
  "minimax/minimax-m3": "base2-free-minimax-m3",
  "mimo/mimo-v2.5": "base2-free-mimo",
  "z-ai/glm-5.2": "base2-free-glm",
  "crof/kimi-k3-eco": "base2-free-kimi-k3-eco",
  "anthropic/claude-fable-5": "base2-free-fable",
  "meta/muse-spark-1.2-contributor": "base2-free-muse-spark",
};

function generateClientSessionId(): string {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < 13; i++) {
    out += alphabet[randomInt(alphabet.length)];
  }
  return out;
}

export class FreebuffExecutor extends BaseExecutor {
  constructor() {
    super("freebuff", PROVIDERS.freebuff || { format: "openai" });
  }

  override async execute(input: ExecuteInput) {
    const { model, body, stream, credentials, signal } = input;
    const token = credentials?.apiKey || credentials?.accessToken || "";
    const payload =
      body && typeof body === "object" && !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : {};

    if (!token) {
      return {
        response: new Response(
          JSON.stringify({
            error: { message: "Freebuff Auth Token required", type: "authentication_error" },
          }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        ),
      };
    }

    const requestedModel =
      typeof model === "string"
        ? model.replace(/^freebuff\//, "")
        : model || "deepseek/deepseek-v4-flash";
    const agentId = MODEL_TO_AGENT[requestedModel] || "base2-free";

    const authHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "codebuff/0.1.0 (darwin-arm64)",
    };

    let instanceId = "";
    let runId = "";

    // 1. Session acquisition
    try {
      const sessionRes = await fetch("https://www.codebuff.com/api/v1/freebuff/session", {
        method: "POST",
        headers: {
          ...authHeaders,
          "x-freebuff-model": requestedModel,
        },
        body: JSON.stringify({}),
        signal,
      });
      if (sessionRes.ok) {
        const data = (await sessionRes.json()) as { instanceId?: string };
        instanceId = data.instanceId || "";
      } else {
        const errText = await sessionRes.text();
        return {
          response: new Response(
            JSON.stringify({
              error: {
                message: `Freebuff session failed (${sessionRes.status}): ${errText}`,
                type: "upstream_error",
              },
            }),
            { status: sessionRes.status, headers: { "Content-Type": "application/json" } }
          ),
        };
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return {
        response: new Response(
          JSON.stringify({
            error: { message: `Freebuff session network error: ${msg}`, type: "upstream_error" },
          }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        ),
      };
    }

    // 2. Start agent run
    try {
      const runRes = await fetch("https://www.codebuff.com/api/v1/agent-runs", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ action: "START", agentId }),
        signal,
      });
      if (runRes.ok) {
        const runData = (await runRes.json()) as { runId?: string };
        runId = runData.runId || "";
      }
    } catch {}

    // 3. Prepare Chat Payload & Buffy System Prompt
    const incomingMessages: Array<Record<string, unknown>> = Array.isArray(payload.messages)
      ? payload.messages.filter(
          (message): message is Record<string, unknown> =>
            !!message && typeof message === "object" && !Array.isArray(message)
        )
      : [];
    const firstMessage = incomingMessages[0];
    const hasBuffyPrompt =
      incomingMessages.length > 0 &&
      firstMessage?.role === "system" &&
      typeof firstMessage.content === "string" &&
      firstMessage.content.trim().startsWith("You are Buffy");

    if (!hasBuffyPrompt) {
      incomingMessages.unshift({
        role: "system",
        content: "You are Buffy, the strategic coding assistant.",
      });
    }

    const clientSessionId = generateClientSessionId();
    const existingMetadata =
      payload.codebuff_metadata &&
      typeof payload.codebuff_metadata === "object" &&
      !Array.isArray(payload.codebuff_metadata)
        ? (payload.codebuff_metadata as Record<string, unknown>)
        : {};
    const upstreamBody = {
      ...payload,
      model: requestedModel,
      messages: incomingMessages,
      stream: stream !== false,
      codebuff_metadata: {
        run_id: runId,
        cost_mode: "free",
        client_id: clientSessionId,
        freebuff_instance_id: instanceId,
        ...existingMetadata,
      },
    };

    const completionHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "ai-sdk/openai-compatible/1.0.25/codebuff",
      Accept: "application/json, text/event-stream",
      "x-freebuff-instance-id": instanceId,
      ...(runId ? { "x-codebuff-run-id": runId } : {}),
      "x-codebuff-agent-id": agentId,
    };

    // 4. Chat Completion
    const completionUrl = "https://www.codebuff.com/api/v1/chat/completions";
    const response = await fetch(completionUrl, {
      method: "POST",
      headers: completionHeaders,
      body: JSON.stringify(upstreamBody),
      signal,
    });

    // 5. Finish agent run (background)
    if (runId) {
      void fetch("https://www.codebuff.com/api/v1/agent-runs", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          action: "FINISH",
          runId,
          status: "completed",
          totalSteps: 1,
          directCredits: 0,
          totalCredits: 0,
        }),
      }).catch(() => {});
    }

    return { response };
  }
}
