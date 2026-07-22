/**
 * omniroute_council MCP tool handler.
 *
 * Convenes the AI Council: fans a prompt out to a panel of models (an explicit
 * list, or every connected model when omitted), runs adversarial debate rounds
 * with early consensus-stop, and returns the judge-synthesized final answer.
 *
 * Implementation: POST /api/v1/council with stream:false and drain the SSE
 * envelope. The council endpoint is always SSE (even for non-stream callers,
 * where the synthesized answer arrives as a single `synthesis` event). We reuse
 * the endpoint verbatim — auto-panel, debate rounds, and consensus-stop all live
 * there — so this tool is a thin adapter, not a second implementation (DRY).
 *
 * `foldCouncilResult` is pure and exported so the SSE→result fold is unit-testable
 * without a live server.
 */
import { logToolCall } from "../audit.ts";
import { getMcpHttpAuthHeadersForInternalFetch } from "../httpAuthContext.ts";
import { resolveOmniRouteBaseUrl } from "../../../src/shared/utils/resolveOmniRouteBaseUrl.ts";

const OMNIROUTE_BASE_URL = resolveOmniRouteBaseUrl();

export type CouncilArgs = {
  prompt: string;
  models?: string[];
  judgeModel?: string;
  debateRounds?: number;
  consensusThreshold?: number;
};

export type CouncilResult = {
  answer: string;
  judge: string;
  rounds: number;
  panel: string[];
  totalAnswers: number;
  consensusStoppedEarly: boolean;
};

type CouncilEvent = Record<string, unknown>;

/** Extract assistant text from a non-stream OpenAI-shaped completion. "" if none. */
function extractCompletionText(completion: unknown): string {
  if (!completion || typeof completion !== "object") return "";
  const choices = (completion as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) return "";
  const message = (choices[0] as { message?: unknown }).message;
  const content = (message as { content?: unknown })?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Fold the full list of parsed council SSE events into a single structured
 * result. Pure — no I/O — so it can be unit-tested against a fixture event log.
 *
 * Throws when the stream reported a fatal `error` event and produced no answer,
 * so the handler surfaces it as an MCP tool error.
 */
export function foldCouncilResult(events: CouncilEvent[]): CouncilResult {
  const panel = new Set<string>();
  let answer = "";
  let judge = "";
  let rounds = 0;
  let totalAnswers = 0;
  let consensusStoppedEarly = false;
  let errorMessage = "";

  for (const ev of events) {
    switch (ev.type) {
      case "round_start": {
        const models = Array.isArray(ev.models) ? (ev.models as string[]) : [];
        for (const m of models) if (typeof m === "string") panel.add(m);
        break;
      }
      case "panel_answer":
        totalAnswers += 1;
        break;
      case "consensus":
        consensusStoppedEarly = true;
        break;
      case "synthesis_start":
        judge = typeof ev.judge === "string" ? ev.judge : judge;
        break;
      case "token":
        if (typeof ev.text === "string") answer += ev.text;
        break;
      case "synthesis":
        if (typeof ev.text === "string") answer += ev.text;
        else answer += extractCompletionText(ev.completion);
        break;
      case "done":
        rounds = typeof ev.rounds === "number" ? ev.rounds : rounds;
        if (typeof ev.totalAnswers === "number") totalAnswers = ev.totalAnswers;
        break;
      case "error":
        errorMessage = typeof ev.message === "string" ? ev.message : "council error";
        break;
      default:
        break;
    }
  }

  if (!answer && errorMessage) {
    throw new Error(errorMessage);
  }

  return {
    answer,
    judge,
    rounds,
    panel: [...panel],
    totalAnswers,
    consensusStoppedEarly,
  };
}

/**
 * Parse an SSE text buffer into the list of `data:` JSON events (skipping
 * `[DONE]` and non-JSON lines). Pure — exported for testing.
 */
export function parseSseEvents(text: string): CouncilEvent[] {
  const events: CouncilEvent[] = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const data = trimmed.slice(5).trim();
    if (data === "[DONE]") continue;
    try {
      events.push(JSON.parse(data) as CouncilEvent);
    } catch {
      // non-JSON SSE line — skip
    }
  }
  return events;
}

async function drainCouncilStream(args: CouncilArgs): Promise<CouncilResult> {
  const apiKey = process.env.OMNIROUTE_API_KEY || "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    ...getMcpHttpAuthHeadersForInternalFetch(),
  };

  const body: Record<string, unknown> = {
    messages: [{ role: "user", content: args.prompt }],
    stream: false,
  };
  if (args.models && args.models.length > 0) body.models = args.models;
  if (args.judgeModel) body.judgeModel = args.judgeModel;
  const debateTuning: Record<string, unknown> = {};
  if (typeof args.debateRounds === "number") debateTuning.debateRounds = args.debateRounds;
  if (typeof args.consensusThreshold === "number")
    debateTuning.consensusThreshold = args.consensusThreshold;
  if (Object.keys(debateTuning).length > 0) body.debateTuning = debateTuning;

  // Debate + judge across a panel can take a while; allow a generous timeout.
  const response = await fetch(`${OMNIROUTE_BASE_URL}/api/v1/council`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(300_000),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    throw new Error(`Council API [${response.status}]: ${text}`);
  }

  const text = await response.text();
  return foldCouncilResult(parseSseEvents(text));
}

export async function handleCouncil(args: CouncilArgs) {
  const start = Date.now();
  try {
    const result = await drainCouncilStream(args);
    await logToolCall(
      "omniroute_council",
      { prompt: args.prompt.slice(0, 80), panelSize: result.panel.length },
      { judge: result.judge, rounds: result.rounds, totalAnswers: result.totalAnswers },
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_council", { prompt: args.prompt.slice(0, 80) }, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}
