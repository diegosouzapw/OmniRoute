import type { RecordedTriageRun } from "@/lib/issueAgent/recordedTriage";
import { looksLikeQuotaExhausted } from "@/shared/utils/classify429";

export interface RecordedTriageExecutionInput {
  run: RecordedTriageRun;
  model?: string;
  provider?: string;
  routingPolicy?: string;
  timeoutMs?: number;
}

export type ChatCompletionsPost = (request: Request) => Promise<Response>;

export type IssueAgentTerminalState =
  | "succeeded"
  | "failed"
  | "timed_out"
  | "budget_stopped";

export type IssueAgentCompletionStatus = "succeeded" | "failed" | "timed_out" | "budget_stopped";

export interface RecordedTriageChatCompletion {
  status: number;
  body: unknown;
  terminalState: IssueAgentTerminalState;
  completionStatus: IssueAgentCompletionStatus;
  durationMs: number;
  timedOutMs?: number;
  terminalError?: string;
}

const DEFAULT_MODEL = "auto/quality";
const DEFAULT_TIMEOUT_MS = 60_000;
const MAX_TIMEOUT_MS = 120_000;
const BUDGET_STOP_PATTERNS: ReadonlyArray<RegExp> = [
  /\bbudget[\s_-]?stopped\b/i,
  /\bbudget\s*exhaust(ed|ion)?\b/i,
  /\bbudget.*exhaust/i,
  /\bbudget\s+cap\b/i,
];

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

function bodyToText(body: unknown): string {
  if (typeof body === "string") return body;
  if (body == null) return "";
  if (typeof body === "object") {
    try {
      return JSON.stringify(body);
    } catch {
      return "";
    }
  }
  return String(body);
}

function classifyBudgetStopped(body: unknown): boolean {
  const text = bodyToText(body);
  if (!text) return false;
  return BUDGET_STOP_PATTERNS.some((pattern) => pattern.test(text));
}

function classifyErrorMessage(body: unknown): string | undefined {
  if (body == null) return undefined;
  if (typeof body === "string") {
    const trimmed = body.trim();
    return trimmed || undefined;
  }

  if (typeof body !== "object") return undefined;

  const raw = body as Record<string, unknown>;
  const nested =
    typeof raw.error === "object" && raw.error !== null ? (raw.error as Record<string, unknown>) : undefined;
  const candidates = [raw.error, raw.message, nested?.message, nested?.error];

  for (const candidate of candidates) {
    if (typeof candidate === "string") {
      const trimmed = candidate.trim();
      if (trimmed) return trimmed;
    }
  }

  return undefined;
}

function classifyTerminalState(status: number, body: unknown, timedOutMs?: number): {
  terminalState: IssueAgentTerminalState;
  completionStatus: IssueAgentCompletionStatus;
  terminalError?: string;
} {
  if (timedOutMs !== undefined) {
    return {
      terminalState: "timed_out",
      completionStatus: "timed_out",
      terminalError: `Execution timed out after ${timedOutMs}ms`,
    };
  }

  if (status >= 200 && status < 300) {
    return {
      terminalState: "succeeded",
      completionStatus: "succeeded",
    };
  }

  const budgetStopped =
    status === 429 && (looksLikeQuotaExhausted(body) || classifyBudgetStopped(body));
  if (budgetStopped) {
    return {
      terminalState: "budget_stopped",
      completionStatus: "budget_stopped",
      terminalError: classifyErrorMessage(body) ?? "Budget has been exhausted and execution stopped",
    };
  }

  return {
    terminalState: "failed",
    completionStatus: "failed",
    terminalError: classifyErrorMessage(body) ?? `Request failed with status ${status}`,
  };
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
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
  const startedAt = Date.now();

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
    const body = await parseResponseBody(response);
    const durationMs = Date.now() - startedAt;
    const classification = classifyTerminalState(response.status, body);

    return {
      status: response.status,
      body,
      durationMs,
      terminalState: classification.terminalState,
      completionStatus: classification.completionStatus,
      terminalError: classification.terminalError,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      const durationMs = Date.now() - startedAt;
      const timedOutMs = timeoutMs;
      const classification = classifyTerminalState(-1, null, timedOutMs);
      return {
        status: 408,
        body: null,
        durationMs,
        timedOutMs,
        terminalState: classification.terminalState,
        completionStatus: classification.completionStatus,
        terminalError: classification.terminalError,
      };
    }
    if (error instanceof Error && error.name === "AbortError") {
      const durationMs = Date.now() - startedAt;
      const timedOutMs = timeoutMs;
      const classification = classifyTerminalState(-1, null, timedOutMs);
      return {
        status: 408,
        body: null,
        durationMs,
        timedOutMs,
        terminalState: classification.terminalState,
        completionStatus: classification.completionStatus,
        terminalError: classification.terminalError,
      };
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
