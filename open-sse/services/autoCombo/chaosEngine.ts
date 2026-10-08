/**
 * Chaos Engine — parallel multi-model dispatch for the `auto/chaos` auto-model.
 *
 * Goal: pick the N most *stable* connected models, fan the same prompt out to
 * all of them in parallel, then return a single merged SSE stream so an IDE that
 * can only issue ONE request / hold ONE agent still receives all N model answers
 * at once.
 *
 * Design notes:
 *   - Selection is done by the caller (virtualFactory → createVirtualAutoCombo)
 *     which already scores candidates with the `chaos-mode` weight pack (health +
 *     stability dominant), so `models` here is already the proven-stable set.
 *   - Dispatch is fully parallel. A slow/hung model is bounded by
 *     `panelHardTimeoutMs` and, crucially, its underlying request is *aborted* on
 *     timeout (not merely resolved-to-fallback) so the connection is released.
 *   - Broadcast is PROGRESSIVE: each panel model's answer is enqueued onto the
 *     SSE stream the moment that model lands — the client does not wait for the
 *     whole panel to finish before receiving the first part. Each part is wrapped
 *     in an SSE `omni-chaos-part` event carrying its own model id. IDEs that
 *     understand the protocol can render several panels; IDEs that don't just see
 *     the canonical final block (the highest-scoring model's answer is used as the
 *     final response chunk).
 *   - Unlike fusion, chaos does NOT run a separate judge synthesis call — it
 *     surfaces raw per-model outputs.
 */

import { errorResponse } from "../../utils/error.ts";
import type { PerTargetAdmissionHook } from "../admission/types.ts";
import type { ComboLogger, HandleSingleModel } from "../combo/types.ts";

export const CHAOS_DEFAULTS = {
  /** Absolute cap on wall time for the whole panel. */
  panelHardTimeoutMs: 120_000,
  /** If fewer than this many succeed, fall back to a plain single-model answer. */
  minPanel: 1,
} as const;

export type ChaosTuning = {
  panelHardTimeoutMs?: number;
  minPanel?: number;
};

type Body = Record<string, unknown>;

/** Minimal shape of the downstream single-model dispatch target (carries an abort signal). */
type ChaosTarget = { modelAbortSignal?: AbortSignal };

export type ChaosPart = {
  model: string;
  index: number;
  ok: boolean;
  text: string;
  error?: string;
};

/**
 * Build the SSE wrapper for one chaos panel part.
 *
 * By DEFAULT only an SSE comment (`: chaos ...`) is emitted — comments are
 * ignored by every SSE parser per spec, so OpenAI-compatible clients
 * (openai-node, @ai-sdk/openai-compatible, …) never see a non-`choices`
 * `data:` payload and their schema validation cannot fail with an
 * `invalid_union` error.
 *
 * When `emitCustomEvent` is true (opt-in via
 * `stream_options.include_chaos_parts`), the custom event name
 * `omni-chaos-part` + metadata `data:` block is also emitted so a
 * protocol-aware IDE can split panels out.
 *
 * The part's text is NOT included in the metadata event — it arrives in the
 * final `data:` chunk for the primary model. This keeps each broadcast event
 * small (metadata-only) so SSE buffering stays predictable.
 */
export function serializeChaosPart(
  part: ChaosPart,
  isFinal: boolean,
  emitCustomEvent = false
): string {
  const meta = {
    type: "omni-chaos-part",
    model: part.model,
    index: part.index,
    ok: part.ok,
    final: isFinal,
    ...(part.error ? { error: part.error } : {}),
  };
  const comment = `: chaos ${part.index} ${part.ok ? "ok" : "fail"} ${part.model}\n`;
  if (!emitCustomEvent) {
    return comment + "\n";
  }
  return comment + `event: omni-chaos-part\n` + `data: ${JSON.stringify(meta)}\n\n`;
}

/**
 * Promise that resolves to `fallback` after `ms`, calling `onTimeout` (e.g. to
 * abort the underlying request) so a slow/hung model releases its connection
 * instead of leaking a dangling fetch.
 */
function withTimeout<T>(
  p: Promise<T>,
  ms: number,
  fallback: T,
  onTimeout?: () => void
): Promise<T> {
  if (!Number.isFinite(ms) || ms <= 0) return p;
  return new Promise<T>((resolve) => {
    const timer = setTimeout(() => {
      onTimeout?.();
      resolve(fallback);
    }, ms);
    p.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      () => {
        clearTimeout(timer);
        resolve(fallback);
      }
    );
  });
}

/** Encoded SSE string builder — avoids re-encoding the same separator. */
const SSE_SEP = "\n\n";
const SSE_DONE = "data: [DONE]\n\n";

/**
 * Build a standard OpenAI-style chat.completion.chunk SSE data line.
 */
function chatChunk(id: string, model: string, content: string, finishReason = "stop"): string {
  return (
    `data: ${JSON.stringify({
      id,
      object: "chat.completion.chunk",
      model,
      choices: [
        {
          index: 0,
          delta: { role: "assistant", content },
          finish_reason: finishReason,
        },
      ],
    })}` + SSE_SEP
  );
}

/**
 * Run the chaos panel. Returns the ordered parts plus a recommended "primary"
 * part (highest index of a successful model, or the first success) that callers
 * can use as the canonical response body for non-aware clients.
 *
 * Each panel call gets its own AbortController; `withTimeout` aborts it on
 * timeout so the underlying request is cancelled, not merely superseded.
 */
/**
 * Shared per-model dispatch: wraps a single chaos panel call with timeout + abort.
 * Used by both runChaosPanel and handleChaosChat to avoid code duplication.
 */
function dispatchOnePanelModel(opts: {
  body: Body;
  model: string;
  index: number;
  handleSingleModel: HandleSingleModel;
  ctrl: AbortController;
  hardTimeout: number;
  log?: { info?: (...a: unknown[]) => void; warn?: (...a: unknown[]) => void };
  /** Optional callback invoked per-result so callers (handleChaosChat) can
   *  enqueue progressive SSE events without duplicating dispatch logic. */
  onResult?: (part: ChaosPart) => Promise<void>;
}): Promise<ChaosPart> {
  const { body, model, index, handleSingleModel, ctrl, hardTimeout, log, onResult } = opts;
  return withTimeout(
    (async (): Promise<ChaosPart> => {
      try {
        const res = await handleSingleModel(body, model, {
          modelAbortSignal: ctrl.signal,
        });
        const text = await extractText(res);
        log?.info?.(
          `CHAOS panel ${index} (${model}) ok=${res.ok} status=${res.status} textLen=${text.length}`
        );
        // G5b: honor the upstream response status — a 4xx/5xx is a panel FAILURE,
        // not a success (previously ok:true was hardcoded, so an all-error panel
        // never reached the all-failed branch and the error text was streamed as
        // if it were a successful answer).
        if (res.ok) {
          const part: ChaosPart = { model, index, ok: true, text };
          await onResult?.(part);
          return part;
        }
        const part: ChaosPart = {
          model,
          index,
          ok: false,
          text: "",
          error: `upstream ${res.status}: ${text.slice(0, 200) || res.statusText || "error"}`,
        };
        await onResult?.(part);
        return part;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        log?.warn?.(`CHAOS panel ${index} (${model}) failed:`, msg);
        const part: ChaosPart = { model, index, ok: false, text: "", error: msg };
        await onResult?.(part);
        return part;
      }
    })(),
    hardTimeout,
    { model, index, ok: false, text: "", error: "chaos-panel-timeout" } as ChaosPart,
    () => ctrl.abort()
  );
}

export async function runChaosPanel(opts: {
  body: Body;
  models: string[];
  handleSingleModel: HandleSingleModel;
  log?: { info?: (...a: unknown[]) => void; warn?: (...a: unknown[]) => void };
  tuning?: ChaosTuning | null;
}): Promise<{ parts: ChaosPart[]; primary: ChaosPart | null }> {
  const { body, models, handleSingleModel, log, tuning } = opts;
  const panel = Array.isArray(models) ? models.filter(Boolean) : [];
  const hardTimeout = tuning?.panelHardTimeoutMs ?? CHAOS_DEFAULTS.panelHardTimeoutMs;

  if (panel.length === 0) {
    return { parts: [], primary: null };
  }

  const controllers = panel.map(() => new AbortController());
  const calls = panel.map((model, index) =>
    dispatchOnePanelModel({
      body,
      model,
      index,
      handleSingleModel,
      ctrl: controllers[index],
      hardTimeout,
      log,
    })
  );

  const parts = await Promise.all(calls);
  // Release all abort controllers (those not already aborted by timeout).
  for (const ac of controllers) {
    if (!ac.signal.aborted) ac.abort();
  }

  const successes = parts.filter((p) => p.ok);
  const primary = successes.length > 0 ? successes[successes.length - 1] : null;

  log?.info?.(`CHAOS panel complete: ${successes.length}/${parts.length} succeeded`);
  return { parts, primary };
}

/**
 * Pull assistant text out of an OpenAI-style OR Anthropic-style Response body.
 * Clones the response first (body is single-consume; fusion.ts does the same),
 * then tries JSON first and falls back to SSE concat — content-type headers are
 * not reliable here because OmniRoute may force a streaming envelope internally.
 */
async function extractText(res: Response): Promise<string> {
  // Include error status info when non-200, so the dispatch caller can log it.
  if (!res.ok) {
    try {
      const errBody = await res.clone().text();
      return errBody.trim() || `(HTTP ${res.status})`;
    } catch {
      return `(HTTP ${res.status})`;
    }
  }
  let raw: string;
  try {
    raw = await res.clone().text();
  } catch {
    return "";
  }
  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      const fromJson = firstTextFromOpenAI(parsed);
      if (fromJson) return fromJson;
      if (typeof (parsed as Record<string, unknown>)?.content === "string") {
        return (parsed as Record<string, unknown>).content as string;
      }
    } catch {
      /* fall through to SSE / raw */
    }
  }
  const sse = concatSseText(raw);
  if (sse) return sse;
  return trimmed.length > 0 && !trimmed.startsWith("data:") ? trimmed : "";
}

function firstTextFromOpenAI(obj: unknown): string {
  if (!obj || typeof obj !== "object") return "";
  const o = obj as Record<string, unknown>;
  const choices = o.choices as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(choices) && choices.length > 0) {
    const msg = choices[0]?.message as Record<string, unknown> | undefined;
    if (msg && typeof msg.content === "string") return msg.content;
    const delta = choices[0]?.delta as Record<string, unknown> | undefined;
    if (delta && typeof delta.content === "string") return delta.content;
  }
  if (typeof o.content === "string") return o.content;
  return "";
}

/**
 * Concatenate assistant text out of an SSE byte stream.
 *
 * Supports BOTH wire formats OmniRoute may emit:
 *   - OpenAI: `data: {"choices":[{"delta":{"content":"..."}}]}`
 *   - Anthropic: `data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"..."}}`
 *     (also accepts the older `delta:{"content":"..."}` proxy shape and a
 *     top-level `content` token).
 */
function concatSseText(sse: string): string {
  const out: string[] = [];
  for (const line of sse.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const json = JSON.parse(payload);
      const choices = json?.choices as Array<Record<string, unknown>> | undefined;
      if (Array.isArray(choices) && choices.length > 0) {
        const delta = choices[0]?.delta as Record<string, unknown> | undefined;
        if (delta?.content) {
          out.push(String(delta.content));
          continue;
        }
        const message = choices[0]?.message as Record<string, unknown> | undefined;
        if (message?.content) {
          out.push(String(message.content));
          continue;
        }
      }
      // Anthropic Messages streaming delta shapes.
      const delta = json?.delta as Record<string, unknown> | undefined;
      if (delta && typeof delta.text === "string") {
        out.push(String(delta.text));
      } else if (delta && typeof delta.content === "string") {
        out.push(String(delta.content));
      } else if (typeof json?.content === "string") {
        out.push(String(json.content));
      }
    } catch {
      /* ignore non-JSON lines */
    }
  }
  return out.join("");
}

/**
 * #9654 Wave 2: per-target lane-aware admission probe — drop lane-full panel
 * members before fan-out (strictly non-blocking; no-op when off).
 */
async function filterPanelByAdmission(
  panel: string[],
  body: Body,
  perTargetAdmission: PerTargetAdmissionHook | null | undefined,
  log?: { info?: (...a: unknown[]) => void }
): Promise<string[]> {
  if (!perTargetAdmission) return panel;
  const gates = await Promise.all(
    panel.map(async (model) => ({
      model,
      ok: await perTargetAdmission({ modelStr: model, executionKey: model, body }),
    }))
  );
  const dropped = gates.filter((g) => !g.ok);
  if (dropped.length > 0) {
    log?.info?.(
      "CHAOS",
      `Skipping ${dropped.length} panel member(s) — admission lane full: ${dropped
        .map((g) => g.model)
        .join(", ")}`
    );
  }
  return gates.filter((g) => g.ok).map((g) => g.model);
}

/**
 * The primary is the explicit primaryModel if it succeeded, else the last
 * successful part (by construction the top-scored stable model).
 */
function pickPrimaryPart(
  allParts: ChaosPart[],
  primaryModel?: string | null
): ChaosPart | undefined {
  return (
    (primaryModel ? allParts.find((p) => p.model === primaryModel && p.ok) : undefined) ||
    allParts.filter((p) => p.ok).slice(-1)[0]
  );
}

/**
 * G5 (silent-stop fix): make an all-panel failure visible server-side and
 * build the client-facing error text with the per-model errors.
 */
function describeAllPanelFailed(
  allParts: ChaosPart[],
  comboName: string | undefined,
  log?: { warn?: (...a: unknown[]) => void }
): string {
  const modelErrors = allParts.map((p) => `${p.model}: ${p.error ?? "unknown"}`).join(" | ");
  log?.warn?.("CHAOS", `All chaos panel models failed for ${comboName ?? "panel"}: ${modelErrors}`);
  return `All chaos panel models failed — ${modelErrors}`;
}

/**
 * Top-level chaos dispatch entrypoint used by `handleComboChat` when a combo's
 * `config.chaos.enabled` flag is set (the `auto/chaos` virtual combo).
 *
 * A non-streaming request (body `stream` omitted or false) gets a JSON
 * `chat.completion` carrying the primary model's answer (or a JSON 502 when the
 * whole panel failed). A `stream: true` request gets a single Response whose
 * body is an SSE stream:
 *   - one SSE comment (`: chaos N ...`) per panel model, enqueued
 *     PROGRESSIVELY as each model lands (comments are ignored by every SSE
 *     parser, so OpenAI-compatible clients see only the final chunk)
 *   - when `stream_options.include_chaos_parts: true` is set, the per-panel
 *     `omni-chaos-part` custom event is emitted instead of the bare comment
 *   - a final `data:` OpenAI-style chunk carrying the primary model's answer
 *     (so non-aware clients / IDEs still get a usable completion)
 *   - a terminating `data: [DONE]`
 *
 * If no panel model succeeds, the stream still terminates cleanly with a
 * `x-omniroute-chaos-error` header and an error final chunk (status stays 200
 * so the SSE envelope is well-formed; non-aware clients see the error text).
 */
export async function handleChaosChat(opts: {
  body: Body;
  models: string[];
  handleSingleModel: HandleSingleModel;
  log?: { info?: (...a: unknown[]) => void; warn?: (...a: unknown[]) => void };
  comboName?: string;
  primaryModel?: string | null;
  tuning?: ChaosTuning | null;
  /** #9654 Wave 2: per-target lane-aware admission probe (see HandleComboChatOptions). */
  perTargetAdmission?: PerTargetAdmissionHook | null;
}): Promise<Response> {
  const {
    body,
    models,
    handleSingleModel,
    log,
    comboName,
    primaryModel,
    tuning,
    perTargetAdmission,
  } = opts;
  const panel = Array.isArray(models) ? models.filter(Boolean) : [];
  const hardTimeout = tuning?.panelHardTimeoutMs ?? CHAOS_DEFAULTS.panelHardTimeoutMs;
  const minPanel = tuning?.minPanel ?? CHAOS_DEFAULTS.minPanel;
  // Opt-in gate: only protocol-aware clients request the custom event. OpenAI
  // SDK validators choke on any `data:` payload without `choices`/`error`, so
  // the default MUST be comment-only output.
  const streamOptions = (body as Record<string, unknown> | null | undefined)?.stream_options;
  const emitCustomEvent =
    typeof streamOptions === "object" &&
    streamOptions !== null &&
    (streamOptions as Record<string, unknown>).include_chaos_parts === true;
  if (panel.length === 0) {
    return errorResponse(400, "Chaos combo has no models");
  }

  // Single-model chaos degrades to a direct answer.
  if (panel.length === 1) {
    return handleSingleModel(body, panel[0]);
  }

  const chunkId = `chaos-${comboName ?? "panel"}`;

  // A non-streaming client (body `stream` omitted or false — the OpenAI Chat
  // Completions default) must receive a JSON `chat.completion`, never an SSE
  // body it cannot parse. The progressive panel broadcast only exists for
  // clients that asked for a stream; here the panel is collected and the
  // primary answer is returned as one JSON object.
  if (body?.stream !== true) {
    const panelToDispatch = await filterPanelByAdmission(panel, body, perTargetAdmission, log);
    const allParts = await Promise.all(
      panelToDispatch.map((model, index) => {
        const ctrl = new AbortController();
        return dispatchOnePanelModel({
          body,
          model,
          index,
          handleSingleModel,
          ctrl,
          hardTimeout,
          log,
        }).finally(() => {
          if (!ctrl.signal.aborted) ctrl.abort();
        });
      })
    );
    const chaosHeaders = {
      "X-OmniRoute-Chaos": "true",
      "X-OmniRoute-Chaos-Panel": String(panel.length),
      "X-OmniRoute-Chaos-Primary": primaryModel ?? "",
    };
    if (!allParts.some((p) => p.ok)) {
      const errResponse = errorResponse(502, describeAllPanelFailed(allParts, comboName, log));
      for (const [key, value] of Object.entries(chaosHeaders)) {
        errResponse.headers.set(key, value);
      }
      return errResponse;
    }
    const primaryPart = pickPrimaryPart(allParts, primaryModel);
    const payload = {
      id: chunkId,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: primaryPart?.model ?? panel[0],
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: primaryPart?.text ?? "" },
          finish_reason: "stop",
        },
      ],
    };
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json", ...chaosHeaders },
    });
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const enc = new TextEncoder();
      let closed = false;
      let enqueueChain: Promise<void> = Promise.resolve();
      const safeEnqueue = (s: string): Promise<void> => {
        enqueueChain = enqueueChain.then(() => {
          if (closed) return;
          try {
            controller.enqueue(enc.encode(s));
          } catch {
            /* stream already errored/closed */
          }
        });
        return enqueueChain;
      };

      const abortControllers: AbortController[] = [];

      const panelToDispatch = await filterPanelByAdmission(panel, body, perTargetAdmission, log);

      const modelPromises = panelToDispatch.map((model, index) => {
        const ctrl = new AbortController();
        abortControllers.push(ctrl);
        return dispatchOnePanelModel({
          body,
          model,
          index,
          handleSingleModel,
          ctrl,
          hardTimeout,
          log,
          onResult: async (part) => {
            await safeEnqueue(serializeChaosPart(part, false, emitCustomEvent));
          },
        });
      });

      const allParts = await Promise.all(modelPromises);
      const successes = allParts.filter((p) => p.ok);

      // Clean up all abort controllers to release references.
      for (const ac of abortControllers) {
        if (!ac.signal.aborted) ac.abort();
      }

      if (successes.length === 0) {
        // G5 (silent-stop fix): make an all-panel failure visible server-side.
        // The status stays 200 (SSE envelope must stay well-formed), but the
        // failure is now logged with the per-model errors so operators can see
        // why the chaos panel produced nothing.
        const errText = describeAllPanelFailed(allParts, comboName, log);
        await safeEnqueue(chatChunk(chunkId, panelToDispatch[0] ?? panel[0] ?? "", errText));
        await safeEnqueue(SSE_DONE);
        await enqueueChain;
        closed = true;
        controller.close();
        return;
      }

      // If fewer than minPanel succeeded, still return the best we have.
      // The primary is the explicit primaryModel if it succeeded, else the
      // last successful part (by construction that's the top-scored stable model).
      const primaryPart = pickPrimaryPart(allParts, primaryModel);

      // Final canonical answer (non-aware clients consume this).
      await safeEnqueue(
        chatChunk(chunkId, primaryPart?.model ?? panel[0], primaryPart?.text ?? "")
      );
      await safeEnqueue(SSE_DONE);
      await enqueueChain;
      closed = true;
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-OmniRoute-Chaos": "true",
      "X-OmniRoute-Chaos-Panel": String(panel.length),
      "X-OmniRoute-Chaos-Primary": primaryModel ?? "",
    },
  });
}

/**
 * Detect + dispatch chaos mode from `handleComboChat`'s combo config, mirroring
 * the fusion-strategy short-circuit right above it. Detected via
 * `combo.config.chaos.enabled` (set by the auto/chaos virtual combo). Unlike
 * fusion, chaos surfaces each model's raw answer (no judge synthesis) so a
 * single-turn IDE request still receives N model outputs at once.
 *
 * Returns `null` when the combo is not a chaos combo (caller falls through to
 * its normal strategy handling); otherwise returns the chaos dispatch promise.
 */
export function dispatchChaosFromCombo(args: {
  cfg: Record<string, unknown>;
  comboModels: unknown[];
  comboName: string;
  body: Body;
  handleSingleModel: HandleSingleModel;
  log: ComboLogger;
  /** #9654 Wave 2: per-target lane-aware admission probe (see HandleComboChatOptions). */
  perTargetAdmission?: PerTargetAdmissionHook | null;
}): Promise<Response> | null {
  const { cfg, comboModels, comboName, body, handleSingleModel, log, perTargetAdmission } = args;
  if (
    !cfg.chaos ||
    typeof cfg.chaos !== "object" ||
    !(cfg.chaos as Record<string, unknown>).enabled
  ) {
    return null;
  }
  const chaosCfg = cfg.chaos as { panelSize?: number; judgeModel?: string; tuning?: ChaosTuning };
  const chaosModels = (comboModels || [])
    .map((m) => {
      if (typeof m === "string") return m;
      if (m && typeof m === "object") {
        const obj = m as Record<string, unknown>;
        if (typeof obj.model === "string") return obj.model;
      }
      return null;
    })
    .filter((m): m is string => Boolean(m));
  // Enforce minPanel: if configured and pool < minPanel, degrades to single model.
  const minPanel = chaosCfg.tuning?.minPanel ?? 1;
  const effectiveModels = chaosModels.length >= minPanel ? chaosModels : chaosModels.slice(0, 1);
  log.info("CHAOS", `dispatching parallel panel of ${effectiveModels.length} stable models`);
  return handleChaosChat({
    body,
    models: effectiveModels,
    handleSingleModel,
    log,
    comboName,
    primaryModel: chaosCfg.judgeModel,
    tuning: chaosCfg.tuning,
    perTargetAdmission,
  });
}
