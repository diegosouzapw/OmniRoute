/**
 * tests/integration/live-gemini-agentic-loop.test.ts
 *
 * Live test: a REAL, streaming, 3-turn agentic tool-calling flow against the
 * "default" gemini combo (strategy=auto, 2 gemma-4 targets), scripted to
 * exercise the exact cross-model cooldown-wait sequence live incidents have
 * shown:
 *
 *   1. Turn 1 (~10k-token dispatch): model A serves and replies with a
 *      write_file tool call.
 *   2. Turn 2: the tool result + ~10k MORE filler is appended (cumulative
 *      conversation now ~20k tokens — past gemma-4's published 16000 TPM
 *      free-tier ceiling within the same rolling 60s window). Model A hits a
 *      real 429; OmniRoute transparently falls back to model B — the client
 *      must see a normal 200 with a tool call from B, NEVER the 429.
 *   3. Turn 3: B's tool result + more filler. Now BOTH models are cooling
 *      down, but A's remaining cooldown (recorded a full turn earlier) is
 *      shorter than B's and well under the 5-minute comboCooldownWait budget
 *      — the request must STALL for A rather than give up, using the
 *      synthetic startup "thinking" keep-alive frame
 *      (open-sse/utils/earlyStreamKeepalive.ts OPENAI_STARTUP_THINKING_FRAME)
 *      to hold the SSE connection open during the wait, then resolve with A's
 *      response once its cooldown clears.
 *
 * Streaming is required (not just used for realism): earlyStreamKeepalive's
 * "slow path" only exists for SSE routes, and it's the only way a client can
 * observe that a wait happened without seeing an error — once the slow path
 * commits to HTTP 200, a would-be error response is reframed as an in-band
 * `event: error` SSE frame rather than changing the status code. So this test
 * treats an `event: error` frame exactly like a leaked 429/503 status: both
 * are the same regression (comboCooldownWait giving up instead of waiting).
 *
 * Env vars: same as liveGeminiShared.ts (OMNIROUTE_API_KEY required).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { Agent, fetch } from "undici";

import {
  skip,
  API_KEY,
  BASE_URL,
  MODEL,
  ensureTestEnvironment,
  pick,
  LONG_DOCUMENTS,
  CODE_BLOCKS,
  TOOL_DEFINITION,
} from "./liveGeminiShared.ts";

// comboCooldownWait budgetMs default (src/lib/resilience/settings.ts) is
// 300_000ms. A single client request can span a full combo SET retry
// (maxSetRetries: 3 in the "default" combo config), each set trying both
// targets at up to comboTargetTimeoutMs (300_000ms) apiece — give this two
// full target-timeouts of slack so a legitimate one-set-retry cycle doesn't
// get killed client-side before the server can resolve it.
const TURN_TIMEOUT_MS = 700_000;
const FILLER_TOKENS_PER_TURN = 10_000;
const MODEL_A = "gemma-4-31b-it";
const MODEL_B = "gemma-4-26b-a4b-it";
const SYNTHETIC_MODEL_MARKER = "omniroute";
// Must match STARTUP_THINKING_TEXT in open-sse/utils/earlyStreamKeepalive.ts.
const STARTUP_THINKING_SUBSTRING = "OmniRoute:";

// Node's global fetch (undici) has its own client-side headersTimeout that
// defaults to 300_000ms — the SAME order of magnitude as comboCooldownWait's
// budget, so a genuine full-budget server-side wait can race the client's own
// timeout and get killed with UND_ERR_HEADERS_TIMEOUT before the server ever
// gets to respond. Use an explicit dispatcher with headroom above
// TURN_TIMEOUT_MS so only the server's behavior (and our own AbortSignal) is
// under test, not undici's unrelated default. Irrelevant for the actual SSE
// body once bytes start flowing (the keepalive frames reset it), but matters
// for the initial connection.
const dispatcher = new Agent({
  headersTimeout: TURN_TIMEOUT_MS + 30_000,
  bodyTimeout: TURN_TIMEOUT_MS + 30_000,
});

function buildFillerText(approxTokens: number): string {
  const CHARS_PER_TOKEN = 4;
  const targetChars = approxTokens * CHARS_PER_TOKEN;
  const chunks = [...LONG_DOCUMENTS, ...CODE_BLOCKS];
  let content = "";
  let i = 0;
  while (content.length < targetChars) {
    content += `\n\n--- Reference ${i + 1} ---\n\n${pick(chunks)}`;
    i++;
  }
  return content;
}

type ToolCallMsg = { id: string; type: "function"; function: { name: string; arguments: string } };
type AgentMessage =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string | null; tool_calls?: ToolCallMsg[] }
  | { role: "tool"; tool_call_id: string; content: string };

type TurnResult = {
  status: number;
  servedModel: string | null;
  sawSyntheticKeepalive: boolean;
  sawErrorEvent: string | null;
  toolCalls: ToolCallMsg[];
  content: string;
  finishReason: string;
  timeToFirstByteMs: number;
  timeToFirstRealChunkMs: number | null;
  totalDurationMs: number;
  correlationId: string;
};

async function runStreamingAgentTurn(messages: AgentMessage[]): Promise<TurnResult> {
  const start = performance.now();
  const res = await fetch(`${BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      messages,
      tools: [TOOL_DEFINITION],
      stream: true,
      max_tokens: 4096,
      temperature: 0.2,
      ...(process.env.FORCE_TOOL_CHOICE_REQUIRED === "1" ? { tool_choice: "required" } : {}),
    }),
    signal: AbortSignal.timeout(TURN_TIMEOUT_MS),
    dispatcher,
  });
  const correlationId = res.headers.get("x-correlation-id") || "?";

  // A leaked 429/503 status is the direct regression. The early-keepalive slow
  // path (see file header) never changes the HTTP status once committed to
  // 200, so this only catches a FAST failure (before the 2s keepalive
  // threshold) — the `event: error` scan below catches the slow-path case.
  if (res.status === 429 || res.status === 503) {
    const body = await res.text().catch(() => "");
    assert.fail(
      `turn leaked HTTP ${res.status} to the client instead of waiting for target model ` +
        `availability (cid=${correlationId}): ${body.slice(0, 300)}`
    );
  }
  assert.equal(res.status, 200, `unexpected HTTP ${res.status} (cid=${correlationId})`);

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let servedModel: string | null = null;
  let sawSyntheticKeepalive = false;
  let sawErrorEvent: string | null = null;
  let pendingEventType: string | null = null;
  let timeToFirstByteMs = -1;
  let timeToFirstRealChunkMs: number | null = null;
  let content = "";
  let finishReason = "unknown";
  const toolCallDeltas = new Map<string, { id: string; name: string; arguments: string }>();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (timeToFirstByteMs < 0) timeToFirstByteMs = performance.now() - start;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("event: ")) {
        pendingEventType = line.slice(7).trim();
        continue;
      }
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      const eventType = pendingEventType;
      pendingEventType = null;
      if (data === "[DONE]") continue;

      if (eventType === "error") {
        sawErrorEvent = data.slice(0, 300);
        continue;
      }

      try {
        const parsed = JSON.parse(data) as Record<string, unknown>;
        const model = parsed.model as string | undefined;
        const choice = ((parsed.choices ?? []) as Array<Record<string, unknown>>)[0];
        const delta = choice?.delta as Record<string, unknown> | undefined;

        if (model === SYNTHETIC_MODEL_MARKER) {
          const reasoningDelta = delta?.reasoning_content as string | undefined;
          if (reasoningDelta?.includes(STARTUP_THINKING_SUBSTRING)) {
            sawSyntheticKeepalive = true;
          }
          continue; // synthetic frame — not real model output
        }

        if (model && !servedModel) servedModel = model;
        if (model && timeToFirstRealChunkMs === null) {
          timeToFirstRealChunkMs = performance.now() - start;
        }

        if (delta?.content) content += delta.content as string;
        if (choice?.finish_reason) finishReason = choice.finish_reason as string;

        const tcDeltas = delta?.tool_calls as Array<Record<string, unknown>> | undefined;
        if (tcDeltas) {
          for (const tcd of tcDeltas) {
            const idx = String(tcd.index as number);
            if (!toolCallDeltas.has(idx)) {
              toolCallDeltas.set(idx, { id: (tcd.id as string) ?? "", name: "", arguments: "" });
            }
            const entry = toolCallDeltas.get(idx)!;
            if (tcd.id) entry.id = tcd.id as string;
            const fn = tcd.function as Record<string, unknown> | undefined;
            if (fn?.name) entry.name = fn.name as string;
            if (fn?.arguments) entry.arguments += fn.arguments as string;
          }
        }
      } catch {
        // skip malformed chunks
      }
    }
  }

  const toolCalls: ToolCallMsg[] = [...toolCallDeltas.values()].map((tc) => ({
    id: tc.id,
    type: "function" as const,
    function: { name: tc.name, arguments: tc.arguments },
  }));

  if (sawErrorEvent) {
    assert.fail(
      `turn leaked an in-band SSE error event instead of waiting for target model ` +
        `availability (cid=${correlationId}): ${sawErrorEvent}`
    );
  }

  return {
    status: res.status,
    servedModel,
    sawSyntheticKeepalive,
    sawErrorEvent,
    toolCalls,
    content,
    finishReason,
    timeToFirstByteMs,
    timeToFirstRealChunkMs,
    totalDurationMs: performance.now() - start,
    correlationId,
  };
}

function logTurn(label: string, r: TurnResult) {
  console.log(
    `  ${label.padEnd(10)} HTTP ${r.status} | model=${r.servedModel ?? "?"} | ` +
      `finish=${r.finishReason} | tools=${r.toolCalls.length} | ` +
      `keepalive=${r.sawSyntheticKeepalive ? "yes" : "no"} | ` +
      `ttfb=${Math.round(r.timeToFirstByteMs)}ms | ` +
      `ttfRealChunk=${r.timeToFirstRealChunkMs === null ? "?" : Math.round(r.timeToFirstRealChunkMs) + "ms"} | ` +
      `total=${Math.round(r.totalDurationMs)}ms | cid=${r.correlationId}`
  );
}

test.before(async () => {
  await ensureTestEnvironment();
});

test(
  "[32] agentic loop: transparent cross-model cooldown-wait across 3 real streaming turns",
  { skip, timeout: 3 * TURN_TIMEOUT_MS + 60_000 },
  async () => {
    const messages: AgentMessage[] = [
      {
        role: "system",
        content:
          "You are building a small TypeScript library across 3 steps, one file per step. " +
          "For each step, call write_file exactly once for that step's file (using the reference " +
          "material provided as context), then briefly confirm you're ready for the next step.",
      },
    ];

    // ── Turn 1: initial ~10k-token dispatch — expect model A to serve a tool call ──
    messages.push({
      role: "user",
      content: `Step 1/3: write file step1.ts. Reference material:\n${buildFillerText(FILLER_TOKENS_PER_TURN)}`,
    });
    const turn1 = await runStreamingAgentTurn(messages);
    logTurn("turn 1/3", turn1);

    assert.equal(turn1.finishReason, "tool_calls", "turn 1 should finish with a tool call");
    assert.ok(turn1.toolCalls.length > 0, "turn 1 should have called write_file");
    assert.ok(turn1.servedModel, "turn 1 should report a served model");

    messages.push({
      role: "assistant",
      content: turn1.content || null,
      tool_calls: turn1.toolCalls,
    });
    for (const tc of turn1.toolCalls) {
      messages.push({ role: "tool", tool_call_id: tc.id, content: JSON.stringify({ ok: true }) });
    }

    // ── Turn 2: tool result + ~10k MORE filler (cumulative ~20k, past the 16k ──
    // TPM ceiling within the rolling 60s window) — model A should hit a real
    // 429 and OmniRoute should transparently fail over to model B. The served
    // model changing between turn 1 and turn 2, with NO leaked error, is the
    // client-observable proof that (a) a 429 really happened and (b) the other
    // model was transparently retried — there is no other way for a client to
    // see this, since hiding the 429 from the client is the entire point of
    // comboCooldownWait.
    messages.push({
      role: "user",
      content: `Step 2/3: write file step2.ts. Reference material:\n${buildFillerText(FILLER_TOKENS_PER_TURN)}`,
    });
    const turn2 = await runStreamingAgentTurn(messages);
    logTurn("turn 2/3", turn2);

    assert.equal(turn2.finishReason, "tool_calls", "turn 2 should finish with a tool call");
    assert.ok(turn2.toolCalls.length > 0, "turn 2 should have called write_file");
    assert.notEqual(
      turn2.servedModel,
      turn1.servedModel,
      `expected turn 2 to transparently fail over to the OTHER model after turn 1's model ` +
        `(${turn1.servedModel}) hit TPM contention — got the SAME model again ` +
        `(${turn2.servedModel}), meaning no 429/fallback was observed. Re-run if the account ` +
        `wasn't actually under contention this time.`
    );

    messages.push({
      role: "assistant",
      content: turn2.content || null,
      tool_calls: turn2.toolCalls,
    });
    for (const tc of turn2.toolCalls) {
      messages.push({ role: "tool", tool_call_id: tc.id, content: JSON.stringify({ ok: true }) });
    }

    // ── Turn 3: tool result + more filler — B (just used) should ALSO hit 429, ──
    // but A's cooldown (recorded a full turn earlier) is now the shorter of the
    // two and well under the 5-minute comboCooldownWait budget — the request
    // must STALL for A specifically rather than crystallizing a 503. The
    // synthetic startup "thinking" keep-alive frame is the client-visible proof
    // the server actually waited instead of just failing fast; servedModel
    // flipping back to A (not staying on B, not erroring) is the proof it
    // waited for the SHORTER cooldown specifically.
    messages.push({
      role: "user",
      content: `Step 3/3: write file step3.ts. Reference material:\n${buildFillerText(FILLER_TOKENS_PER_TURN)}`,
    });
    const turn3 = await runStreamingAgentTurn(messages);
    logTurn("turn 3/3", turn3);

    assert.equal(turn3.finishReason, "tool_calls", "turn 3 should finish with a tool call");
    assert.ok(turn3.toolCalls.length > 0, "turn 3 should have called write_file");
    assert.equal(
      turn3.servedModel,
      turn1.servedModel,
      `expected turn 3 to wait for and return the LOWER-cooldown model (${turn1.servedModel}, ` +
        `same as turn 1) once B also hit contention — got ${turn3.servedModel}`
    );
    assert.ok(
      turn3.sawSyntheticKeepalive,
      "expected the synthetic startup keep-alive ('thinking') frame during turn 3's stall — " +
        "its absence means the wait was fast enough to not need it, or the keepalive path didn't engage"
    );

    console.log(
      `\n  Summary: turn1=${turn1.servedModel} → turn2=${turn2.servedModel} (fallback) → ` +
        `turn3=${turn3.servedModel} (waited for lower cooldown, keepalive=${turn3.sawSyntheticKeepalive})`
    );
  }
);
