import type { RecordedTriageRun } from "@/lib/issueAgent/recordedTriage";

export interface RecordedTriageExecutionInput {
  run: RecordedTriageRun;
  model?: string;
  provider?: string;
  routingPolicy?: string;
  timeoutMs?: number;
}

export type ChatCompletionsPost = (request: Request) => Promise<Response>;

export interface RecordedTriageChatCompletion {
  status: number;
  body: unknown;
}

export class RecordedTriageTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Issue Agent triage timed out after ${timeoutMs}ms`);
    this.name = "RecordedTriageTimeoutError";
  }
}

const DEFAULT_MODEL = "auto/quality";
const DEFAULT_TIMEOUT_MS = 60_000;
const MAX_TIMEOUT_MS = 120_000;

function configuredString(value: string | undefined, envName: string): string | undefined {
  const configured = value ?? process.env[envName];
  const normalized = configured?.trim();
  return normalized || undefined;
}

function resolveModel(input: RecordedTriageExecutionInput): string {
  const model = configuredString(input.model, "OMNIROUTE_ISSUE_AGENT_MODEL") ?? DEFAULT_MODEL;
  const provider = configuredString(input.provider, "OMNIROUTE_ISSUE_AGENT_PROVIDER");

  if (!provider || model.includes("/")) return model;
  return `${provider}/${model}`;
}

function resolveTimeoutMs(input: RecordedTriageExecutionInput): number {
  const configured = input.timeoutMs ?? Number(process.env.OMNIROUTE_ISSUE_AGENT_TIMEOUT_MS);
  if (!Number.isFinite(configured) || configured <= 0) return DEFAULT_TIMEOUT_MS;
  return Math.min(Math.floor(configured), MAX_TIMEOUT_MS);
}

function buildMessages(run: RecordedTriageRun) {
  return [
    {
      role: "system",
      content:
        "You are the OmniRoute Issue Agent. Analyze only the recorded GitHub context and produce a concise, actionable triage response. Do not claim to have accessed external state.",
    },
    {
      role: "user",
      content: [
        `Issue: ${run.repository}#${run.issueNumber}`,
        `URL: ${run.issueUrl}`,
        `Intent: ${run.context.intent}`,
        `Title: ${run.context.issueTitle ?? "(untitled)"}`,
        "Recorded context:",
        run.context.redactedDigestSource || "(none)",
      ].join("\n"),
    },
  ];
}

/**
 * Route recorded-triage work through the same in-process chat endpoint used by
 * clients, retaining its initialization, admission, guardrails, and policy path.
 */
export async function executeRecordedTriageChatCompletion(
  input: RecordedTriageExecutionInput,
  post: ChatCompletionsPost
): Promise<RecordedTriageChatCompletion> {
  const controller = new AbortController();
  const timeoutMs = resolveTimeoutMs(input);
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const routingPolicy = configuredString(
    input.routingPolicy,
    "OMNIROUTE_ISSUE_AGENT_ROUTING_POLICY"
  );

  try {
    const response = await post(
      new Request("http://localhost/api/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(routingPolicy ? { "X-OmniRoute-Mode": routingPolicy } : {}),
        },
        body: JSON.stringify({
          model: resolveModel(input),
          messages: buildMessages(input.run),
          max_tokens: 1200,
          temperature: 0,
          stream: false,
        }),
      })
    );

    return { status: response.status, body: await response.json() };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new RecordedTriageTimeoutError(timeoutMs);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
