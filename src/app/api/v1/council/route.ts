/**
 * POST /api/v1/council — AI Council SSE endpoint.
 *
 * Accepts an OpenAI-compatible chat body plus council-specific fields:
 *   models:      string[]          — panel model IDs
 *   judgeModel:  string?           — explicit judge (defaults to models[0])
 *   debateTuning.debateRounds: number?   — total rounds (default 2)
 *   debateTuning.minPanel:     number?   — quorum before grace timer
 *   debateTuning.stragglerGraceMs: number?
 *   debateTuning.panelHardTimeoutMs: number?
 *   stream:      boolean?          — whether the final judge answer should stream
 *
 * SSE event stream:
 *   data: {"type":"round_start","round":0,"models":["a","b"]}
 *   data: {"type":"panel_answer","round":0,"model":"a","text":"..."}
 *   data: {"type":"round_end","round":0,"answers":2}
 *   data: {"type":"synthesis_start","judge":"a"}
 *   data: {"type":"token","text":"..."}\n          ← streamed judge tokens
 *   data: {"type":"done","rounds":2,"totalAnswers":4,"durationMs":12345}
 *   data: [DONE]
 *
 * For non-streaming callers the synthesis answer is delivered as a standard
 * OpenAI chat completion JSON object after the metadata events.
 */
import { z } from "zod";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { logger } from "@omniroute/open-sse/utils/logger.ts";
import { type DebateTuning } from "@omniroute/open-sse/services/debate.ts";
import { handleSingleModelChat } from "@/sse/handlers/chat";
import { resolveAutoPanel } from "@omniroute/open-sse/services/autoPanel.ts";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import type { ComboLogger } from "@omniroute/open-sse/services/combo/types.ts";

// ---------------------------------------------------------------------------
// One-time translator init
// ---------------------------------------------------------------------------
let _initPromise: Promise<void> | null = null;
function ensureInitialized(): Promise<void> {
  if (!_initPromise) {
    _initPromise = Promise.resolve(initTranslators()).then(() => {});
  }
  return _initPromise;
}

// ---------------------------------------------------------------------------
// Request schema
// ---------------------------------------------------------------------------
const debateTuningSchema = z
  .object({
    debateRounds: z.coerce.number().int().min(1).max(10).optional(),
    minPanel: z.coerce.number().int().min(1).max(50).optional(),
    stragglerGraceMs: z.coerce.number().int().min(0).max(120_000).optional(),
    panelHardTimeoutMs: z.coerce.number().int().min(1_000).max(600_000).optional(),
    maxPanel: z.coerce.number().int().min(1).max(40).optional(),
    consensusThreshold: z.coerce.number().min(0).max(2).optional(),
  })
  .strict();

const councilBodySchema = z.object({
  // panel & tuning. `models` is OPTIONAL: when omitted (or empty) the council
  // auto-derives its panel from every currently-connected, healthy model
  // (resolveAutoPanel → createVirtualAutoCombo) — the "use full models" mode.
  models: z.array(z.string().trim().min(1).max(300)).max(40).optional(),
  judgeModel: z.string().trim().min(1).max(300).optional(),
  debateTuning: debateTuningSchema.optional(),
  // standard chat fields (forwarded to panel models)
  messages: z.array(z.record(z.string(), z.unknown())).min(1),
  stream: z.boolean().optional(),
  // passthrough — everything else forwarded as-is
}).passthrough();

// ---------------------------------------------------------------------------
// SSE helpers
// ---------------------------------------------------------------------------
function sseEvent(payload: Record<string, unknown>): string {
  return `data: ${JSON.stringify(payload)}\n\n`;
}
const SSE_DONE = "data: [DONE]\n\n";

const SSE_HEADERS = {
  ...CORS_HEADERS,
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
};

// ---------------------------------------------------------------------------
// CORS preflight
// ---------------------------------------------------------------------------
export async function OPTIONS(): Promise<Response> {
  return handleCorsOptions();
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: Request): Promise<Response> {
  await ensureInitialized();

  // Content-Type guard
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().split(";")[0].trim().startsWith("application/json")) {
    return new Response(
      JSON.stringify(buildErrorBody(415, "Content-Type must be application/json")),
      { status: 415, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }

  // Auth
  const apiKey = extractApiKey(request);
  const sessionOk = await isDashboardSessionAuthenticated(request);
  const requireApiKey = await isRequireApiKeyEnabled();
  if (requireApiKey && !sessionOk) {
    if (!apiKey) {
      return new Response(
        JSON.stringify(buildErrorBody(401, "API key required")),
        { status: 401, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }
    const validKey = await isValidApiKey(apiKey);
    if (!validKey) {
      return new Response(
        JSON.stringify(buildErrorBody(401, "Invalid API key")),
        { status: 401, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }
  }

  // Parse + validate body
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return new Response(
      JSON.stringify(buildErrorBody(400, "Invalid JSON body")),
      { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }

  const parsed = councilBodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(
        buildErrorBody(
          400,
          `Invalid council request: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`
        )
      ),
      { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }

  const { models, judgeModel, debateTuning, stream: clientStream, ...chatFields } = parsed.data;

  const log: ComboLogger = logger("COUNCIL");

  // ---------------------------------------------------------------------------
  // SSE stream setup
  // ---------------------------------------------------------------------------
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  function emit(payload: Record<string, unknown>): void {
    writer.write(encoder.encode(sseEvent(payload))).catch(() => {});
  }

  async function runCouncil(): Promise<void> {
    const tStart = Date.now();

    // Build a handleSingleModel adapter that routes through the full OmniRoute stack
    const handleSingleModel = (body: Record<string, unknown>, model: string) =>
      handleSingleModelChat(body, model, request, request, "council", null, null, {
        sessionId: null,
        forceLiveComboTest: false,
      });

    try {
      const tuning: DebateTuning = { ...debateTuning };
      const totalRounds = tuning.debateRounds ?? 2;

      // Resolve the panel. When the caller supplies models[], use them verbatim.
      // Otherwise derive the panel from every connected, credential-valid provider
      // (the "use full models" mode) via resolveAutoPanel → createVirtualAutoCombo.
      const panelModels =
        models && models.length > 0
          ? models
          : await resolveAutoPanel({ log, maxPanel: tuning.maxPanel });

      if (panelModels.length === 0) {
        emit({
          type: "error",
          message:
            "No panel models available: none supplied and no provider is connected with usable credentials",
        });
        emit({ type: "done", rounds: 0, totalAnswers: 0, durationMs: Date.now() - tStart });
        writer.write(encoder.encode(SSE_DONE)).catch(() => {});
        writer.close().catch(() => {});
        return;
      }

      // We intercept the debate flow manually for SSE progress events.
      // For each round we call collectPanel directly then emit events.
      // Final judge call honours clientStream.

      // Import what we need for the per-round fan-out
      const { collectPanel, extractPanelText, appendUserTurn } = await import(
        "@omniroute/open-sse/services/fusion.ts"
      );
      const { buildDebateRoundPrompt, buildDebateJudgePrompt, measureConsensus, DEBATE_DEFAULTS } =
        await import("@omniroute/open-sse/services/debate.ts");

      const cfg = {
        minPanel: Math.min(
          Math.max(1, tuning.minPanel ?? 2),
          panelModels.length
        ),
        stragglerGraceMs: tuning.stragglerGraceMs ?? 8_000,
        panelHardTimeoutMs: tuning.panelHardTimeoutMs ?? 90_000,
      };
      const consensusThreshold = tuning.consensusThreshold ?? DEBATE_DEFAULTS.consensusThreshold;

      // Strip tool params from panel calls
      const { tools: _t, tool_choice: _tc, ...rest } = chatFields as Record<string, unknown>;
      void _t;
      void _tc;
      const panelBase: Record<string, unknown> = { ...rest, messages: chatFields.messages, stream: false };

      type PanelAnswer = { model: string; text: string };
      const history: PanelAnswer[][] = [];

      // ---- Rounds ----
      for (let r = 0; r < totalRounds; r++) {
        let roundBody = panelBase;

        if (r > 0) {
          const priorRound = history[history.length - 1];
          if (priorRound.length < 2) {
            log.info("COUNCIL", `Round ${r}: only ${priorRound.length} survivor(s) — stopping debate`);
            break;
          }
          const debatePrompt = buildDebateRoundPrompt(priorRound, r, totalRounds);
          roundBody = appendUserTurn(panelBase, debatePrompt) as Record<string, unknown>;
        }

        // Only surviving models participate in subsequent rounds
        const roundModels = r === 0 ? panelModels : history[history.length - 1].map((a) => a.model);

        emit({ type: "round_start", round: r, models: roundModels });

        const calls = roundModels.map((m) =>
          Promise.resolve(handleSingleModel(roundBody, m)).catch(
            (): Response => new Response(null, { status: 500 })
          )
        );

        const settled = await collectPanel(calls, cfg);
        const roundAnswers: PanelAnswer[] = [];

        for (let i = 0; i < settled.length; i++) {
          const res = settled[i];
          const m = roundModels[i];
          if (!res) continue;
          const s = res as { __timeout?: boolean; __error?: unknown };
          if (s.__timeout || s.__error) continue;
          const resp = res as Response;
          if (!resp.ok) continue;
          try {
            const json = await resp.clone().json();
            const text = extractPanelText(json);
            if (text) {
              roundAnswers.push({ model: m, text });
              emit({ type: "panel_answer", round: r, model: m, text });
            }
          } catch {
            // unparseable — skip
          }
        }

        emit({ type: "round_end", round: r, answers: roundAnswers.length });

        if (roundAnswers.length === 0) {
          if (r === 0) {
            emit({ type: "error", message: "All panel models failed in round 0" });
            emit({ type: "done", rounds: 0, totalAnswers: 0, durationMs: Date.now() - tStart });
            writer.write(encoder.encode(SSE_DONE)).catch(() => {});
            writer.close().catch(() => {});
            return;
          }
          log.warn("COUNCIL", `Round ${r}: 0 survivors — using prior round`);
          break;
        }

        history.push(roundAnswers);

        // Consensus-stop: when surviving answers have converged past the threshold,
        // further rounds only re-confirm agreement. Stop early and go to the judge.
        // Disabled when consensusThreshold > 1. Only meaningful with ≥2 answers.
        if (r > 0 && roundAnswers.length >= 2 && consensusThreshold <= 1) {
          const consensus = measureConsensus(roundAnswers);
          if (consensus >= consensusThreshold) {
            emit({ type: "consensus", round: r, score: Number(consensus.toFixed(3)) });
            log.info(
              "COUNCIL",
              `Round ${r}: consensus ${consensus.toFixed(3)} ≥ ${consensusThreshold} — stopping early`
            );
            break;
          }
        }
      }

      // ---- Judge synthesis ----
      const finalRound = history[history.length - 1];
      const effectiveJudge =
        judgeModel?.trim() ||
        (finalRound.some((a) => a.model === panelModels[0])
          ? panelModels[0]
          : finalRound[0].model);

      emit({ type: "synthesis_start", judge: effectiveJudge });

      const judgePrompt = buildDebateJudgePrompt(history);
      const judgeBody = appendUserTurn(
        { ...chatFields, stream: Boolean(clientStream) } as Record<string, unknown>,
        judgePrompt
      ) as Record<string, unknown>;

      const judgeResponse = await handleSingleModel(judgeBody, effectiveJudge);
      const totalAnswers = history.reduce((s, r) => s + r.length, 0);
      const durationMs = Date.now() - tStart;

      if (Boolean(clientStream) && judgeResponse.body) {
        // Stream judge tokens as SSE token events
        const reader = judgeResponse.body.getReader();
        const dec = new TextDecoder();
        let buf = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const chunk = JSON.parse(data) as Record<string, unknown>;
              const choices = (chunk.choices as Array<Record<string, unknown>> | undefined) ?? [];
              for (const choice of choices) {
                const delta = choice.delta as Record<string, unknown> | undefined;
                const text = delta?.content;
                if (typeof text === "string" && text) {
                  emit({ type: "token", text });
                }
              }
            } catch {
              // non-JSON SSE line — skip
            }
          }
        }
      } else {
        // Non-streaming: emit the full completion JSON
        try {
          const json = await judgeResponse.clone().json();
          emit({ type: "synthesis", completion: json });
        } catch {
          const text = await judgeResponse.text().catch(() => "");
          emit({ type: "synthesis", text });
        }
      }

      emit({ type: "done", rounds: history.length, totalAnswers, durationMs });
    } catch (err) {
      log.error("COUNCIL", "Unhandled error in council run", {
        error: err instanceof Error ? err.message : String(err),
      });
      emit({ type: "error", message: "Internal council error" });
    }

    writer.write(encoder.encode(SSE_DONE)).catch(() => {});
    writer.close().catch(() => {});
  }

  // Fire-and-forget — response is already streaming
  runCouncil().catch(() => {});

  return new Response(readable as unknown as BodyInit, { status: 200, headers: SSE_HEADERS });
}
