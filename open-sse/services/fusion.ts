/**
 * Fusion combo strategy — parallel panel + judge synthesis.
 *
 * A fusion combo fans the prompt out to every panel model in parallel, then a
 * configurable judge model synthesizes one final answer from all panel responses.
 *
 *   - quorum-grace collection caps the straggler penalty (the slowest model
 *     otherwise dominates wall time);
 *   - anonymized sources prevent judge brand-bias ("Source N" rather than model name);
 *   - degrades to a direct answer on a single survivor, 503 on total failure.
 *
 * Per OpenRouter's Fusion design, the judge does NOT merge — it analyzes
 * (consensus / contradictions / partial coverage / unique insights / blind spots)
 * then writes one answer grounded in that analysis. Most of fusion's quality lift
 * comes from this synthesis step.
 *
 * Ported from upstream decolua/9router (Daniil Schovkunov), adapted JS → TS and
 * wired through OmniRoute's existing combo schema (combo.config.judgeModel /
 * combo.config.fusionTuning).
 */
import { errorResponse, sanitizeErrorMessage } from "../utils/error.ts";
import { extractTextContent } from "../translator/helpers/geminiHelper.ts";
import type { ComboLogger, HandleSingleModel } from "./combo/types.ts";

// Fusion tuning. Overridable per-combo via combo.config.fusionTuning.
export const FUSION_DEFAULTS = {
  minPanel: 2, // answers needed before stragglers get a grace window
  stragglerGraceMs: 8000, // wait this long for laggards once quorum is reached
  panelHardTimeoutMs: 90000, // absolute cap so one hung model can't stall forever
  // Hard cap on panel size (issue #1905). Every panel member is fanned out in
  // parallel and its full response text buffered in memory simultaneously —
  // with the runtime heap capped (Dockerfile OMNIROUTE_MEMORY_MB, default
  // 1024MB), a large panel (reported: ~73 models) with sizable concurrent
  // responses can exceed the heap ceiling and OOM-crash the whole process.
  // Reject oversized panels up front with a clean 400 instead.
  maxPanel: 40,
} as const;

export type FusionTuning = {
  minPanel?: number;
  stragglerGraceMs?: number;
  panelHardTimeoutMs?: number;
  maxPanel?: number;
};

type Body = Record<string, unknown>;

/**
 * Extract assistant text from a non-stream completion across formats
 * (OpenAI chat, Claude messages, Gemini, OpenAI Responses). Returns "" if none.
 * Panel responses are already translated to the client format by chatCore, so the
 * leaf content → string step reuses the translator's own extractTextContent.
 */
export function extractPanelText(json: unknown): string {
  if (!json || typeof json !== "object") return "";
  const j = json as Record<string, unknown>;

  // OpenAI chat completion
  const choices = j.choices as Array<Record<string, unknown>> | undefined;
  const choice = choices?.[0];
  if (choice) {
    const msg = (choice.message ?? choice.delta ?? {}) as Record<string, unknown>;
    const t = extractTextContent(msg.content);
    if (t.trim()) return t;
    if (typeof choice.text === "string" && choice.text.trim()) return choice.text;
  }

  // Claude messages (text blocks share OpenAI's {type:"text"} shape)
  const claudeText = extractTextContent(j.content);
  if (claudeText.trim()) return claudeText;

  // Gemini (parts carry .text without a type discriminator)
  const candidates = j.candidates as Array<Record<string, unknown>> | undefined;
  const parts = (candidates?.[0]?.content as Record<string, unknown> | undefined)?.parts as
    | Array<{ text?: unknown }>
    | undefined;
  if (Array.isArray(parts)) {
    const t = parts.map((p) => (typeof p?.text === "string" ? p.text : "")).join("");
    if (t.trim()) return t;
  }

  // OpenAI Responses API
  const output = j.output as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(output)) {
    const t = output
      .flatMap((o) =>
        Array.isArray(o.content)
          ? (o.content as Array<{ text?: unknown }>).map((c) =>
              typeof c?.text === "string" ? c.text : ""
            )
          : []
      )
      .join("");
    if (t.trim()) return t;
  }

  return "";
}

/**
 * Append a synthesized user turn to whichever message array the request format uses.
 * Preserves the original conversation + system prompt so the judge has full context.
 */
export function appendUserTurn(body: Body, text: string): Body {
  const next: Body = { ...body };
  if (Array.isArray(body.messages)) {
    next.messages = [...(body.messages as unknown[]), { role: "user", content: text }];
  } else if (Array.isArray(body.input)) {
    next.input = [...(body.input as unknown[]), { role: "user", content: text }];
  } else if (Array.isArray(body.contents)) {
    next.contents = [
      ...(body.contents as unknown[]),
      { role: "user", parts: [{ text }] },
    ];
  } else {
    next.messages = [{ role: "user", content: text }];
  }
  return next;
}

/**
 * Build the judge directive. Sources are anonymized ("Source N") so the judge
 * weighs substance, not the reputation of a model brand.
 */
export function buildJudgePrompt(answers: Array<{ text: string }>): string {
  const panel = answers.map((a, i) => `[Source ${i + 1}]\n${a.text}`).join("\n\n");

  return [
    `You are the JUDGE in a model-fusion panel. ${answers.length} expert models independently answered the user's most recent request. Their responses are below, anonymized by source.`,
    "",
    "Do NOT mention that multiple models were used, and do NOT refer to the sources. Produce ONE authoritative final answer addressed directly to the user.",
    "",
    "First, internally analyze the panel along these dimensions: consensus (points most sources agree on — usually higher-confidence, but NOT automatically correct), contradictions (where they disagree — resolve with your own judgment), partial coverage, unique insights only one source surfaced, and blind spots every source missed.",
    "",
    "You are not a vote-counter, and the panel is not a ceiling — treat it as strong evidence, not as the limit of what you may say. Apply your OWN reasoning and knowledge as a full participant: if the consensus is wrong, incomplete, or outdated, override it and state what is correct; if every source missed something you know, add it; if a lone source is right against the majority, side with it. Do not water down a correct answer to match panel agreement. The only hard limit is honesty — do not assert facts you are not confident about.",
    "",
    "Then write the best possible final answer — more complete and correct than any single response, and than the panel as a whole — with no filler.",
    "",
    "=== PANEL RESPONSES ===",
    panel,
    "=== END PANEL RESPONSES ===",
    "",
    "Now write the final answer to the user's original request.",
  ].join("\n");
}

type Sentinel = { __timeout?: true; __error?: unknown };

// Resolve a Response (or sentinel) within ms; the loser keeps running but is ignored.
function withTimeout(
  promise: Promise<Response>,
  ms: number
): Promise<Response | Sentinel> {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve({ __timeout: true }), ms);
    Promise.resolve(promise)
      .then((v) => {
        clearTimeout(t);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(t);
        resolve({ __error: e });
      });
  });
}

/**
 * Collect panel responses with quorum-grace: as soon as `minPanel` calls succeed,
 * start a short grace timer for the rest, then proceed with whatever arrived. This
 * caps the straggler penalty while still preferring a full panel when everyone is
 * fast. Bounded by a hard timeout.
 *
 * Returns a sparse array aligned to `calls` (undefined = not yet / dropped).
 */
export function collectPanel(
  calls: Array<Promise<Response | Sentinel>>,
  cfg: { minPanel: number; stragglerGraceMs: number; panelHardTimeoutMs: number }
): Promise<Array<Response | Sentinel | undefined>> {
  return new Promise((resolve) => {
    const out: Array<Response | Sentinel | undefined> = new Array(calls.length);
    let settled = 0;
    let ok = 0;
    let finished = false;
    let graceTimer: ReturnType<typeof setTimeout> | null = null;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(hardTimer);
      if (graceTimer) clearTimeout(graceTimer);
      resolve(out);
    };
    const hardTimer = setTimeout(finish, cfg.panelHardTimeoutMs);
    calls.forEach((p, i) => {
      Promise.resolve(p)
        .then((v) => {
          out[i] = v;
        })
        .catch((e) => {
          out[i] = { __error: e };
        })
        .finally(() => {
          settled++;
          const slot = out[i] as Response | undefined;
          if (slot && (slot as Response).ok) ok++;
          if (settled === calls.length) return finish();
          if (ok >= cfg.minPanel && !graceTimer) {
            graceTimer = setTimeout(finish, cfg.stragglerGraceMs);
          }
        });
    });
  });
}

export type HandleFusionChatOptions = {
  body: Body;
  models: string[];
  handleSingleModel: HandleSingleModel;
  log: ComboLogger;
  comboName?: string;
  judgeModel?: string | null;
  tuning?: FusionTuning | null;
};

/**
 * Handle a fusion combo: fan the prompt out to every panel model in parallel,
 * then a judge model synthesizes one final answer from all panel responses.
 *
 * Panel calls are forced non-streaming with tools stripped (the judge needs
 * complete prose to synthesize). The judge call keeps the client's original
 * stream flag + tools, so streaming and downstream tool use still work.
 *
 * Speed: quorum-grace collection caps the straggler penalty. Quality: the judge
 * runs the consensus/contradiction/blind-spot analysis before writing.
 *
 * Degrades gracefully: 0 panel answers → 503, exactly 1 → return it directly.
 */
export async function handleFusionChat({
  body,
  models,
  handleSingleModel,
  log,
  comboName,
  judgeModel,
  tuning,
}: HandleFusionChatOptions): Promise<Response> {
  const panel = Array.isArray(models) ? models.filter(Boolean) : [];
  if (panel.length === 0) {
    return errorResponse(400, "Fusion combo has no models");
  }

  // A single-model fusion has nothing to fuse — just answer directly.
  if (panel.length === 1) {
    return handleSingleModel(body, panel[0]);
  }

  // Reject an oversized panel BEFORE fan-out (issue #1905): fanning out N
  // parallel calls and buffering N full response bodies at once is what
  // drives the process into an OOM crash, not any one call in isolation.
  const maxPanel = tuning?.maxPanel ?? FUSION_DEFAULTS.maxPanel;
  if (panel.length > maxPanel) {
    log.warn(
      "FUSION",
      `Combo "${comboName ?? ""}" panel=${panel.length} exceeds maxPanel=${maxPanel} — rejecting before fan-out (#1905)`
    );
    return errorResponse(
      400,
      `Fusion panel too large (${panel.length} models, max ${maxPanel}) — reduce the combo's target count or raise fusionTuning.maxPanel`
    );
  }

  const cfg = {
    minPanel: tuning?.minPanel ?? FUSION_DEFAULTS.minPanel,
    stragglerGraceMs: tuning?.stragglerGraceMs ?? FUSION_DEFAULTS.stragglerGraceMs,
    panelHardTimeoutMs: tuning?.panelHardTimeoutMs ?? FUSION_DEFAULTS.panelHardTimeoutMs,
  };
  // Honor user-supplied minPanel down to 1: with 1 survivor we still degrade
  // gracefully via the answers.length===1 branch below (issue #6454).
  const minPanel = Math.min(Math.max(1, cfg.minPanel), panel.length);
  const hasExplicitJudge = Boolean(judgeModel && judgeModel.trim());
  const judge = hasExplicitJudge ? (judgeModel as string).trim() : panel[0];
  log.info(
    "FUSION",
    `Combo "${comboName ?? ""}" | panel=${panel.length} [${panel.join(", ")}] | judge=${judge} | quorum=${minPanel}`
  );

  // 1. Fan out to the panel in parallel: non-streaming, tools stripped (we want prose).
  const { tools: _tools, tool_choice: _tc, ...rest } = body;
  void _tools;
  void _tc;
  const panelBody: Body = { ...rest, stream: false };
  const t0 = Date.now();
  const calls = panel.map((m) =>
    withTimeout(handleSingleModel(panelBody, m), cfg.panelHardTimeoutMs)
  );
  const settled = await collectPanel(calls, { ...cfg, minPanel });
  log.info("FUSION", `fan-out collected in ${Date.now() - t0}ms`);

  // 2. Collect successful answers + per-member failure reasons (issue #6454).
  const answers: Array<{ model: string; text: string }> = [];
  const failures: Array<{ model: string; reason: string }> = [];
  for (let i = 0; i < settled.length; i++) {
    const res = settled[i];
    const model = panel[i];
    if (!res) {
      log.warn("FUSION", `Panel ${model} dropped (straggler/timeout)`);
      failures.push({ model, reason: "straggler_dropped" });
      continue;
    }
    const sentinel = res as Sentinel;
    if (sentinel.__timeout) {
      log.warn("FUSION", `Panel ${model} timed out`);
      failures.push({ model, reason: "timeout" });
      continue;
    }
    if (sentinel.__error) {
      log.warn("FUSION", `Panel ${model} threw`, {
        error: sanitizeErrorMessage(sentinel.__error as Error),
      });
      failures.push({ model, reason: "threw" });
      continue;
    }
    const resp = res as Response;
    if (!resp.ok) {
      // Per-member reason keeps the exact status code (e.g. status_429 for a
      // rate-limit fan-fail, status_503 for an outage) — strictly more
      // informative than the earlier aggregate rate-limit count (#6454).
      failures.push({ model, reason: `status_${resp.status}` });
      log.warn("FUSION", `Panel ${model} ${resp.status === 429 ? "rate-limited" : "failed"}`, {
        status: resp.status,
      });
      continue;
    }
    try {
      const json = await resp.clone().json();
      const text = extractPanelText(json);
      if (text) {
        answers.push({ model, text });
        log.info("FUSION", `Panel ${model} ok (${text.length} chars)`);
      } else {
        log.warn("FUSION", `Panel ${model} returned empty content`);
        failures.push({ model, reason: "empty_content" });
      }
    } catch (e) {
      log.warn("FUSION", `Panel ${model} unparseable`, {
        error: sanitizeErrorMessage(e as Error),
      });
      failures.push({ model, reason: "unparseable" });
    }
  }

  // 3. Degrade gracefully when the panel is too thin to fuse.
  if (answers.length === 0) {
    // Surface per-member reasons so operators can distinguish a rate-limit
    // fan-fail (reason=rate_limited) from an outage (issue #6454). This supersedes
    // the earlier aggregate "N rate-limited, M failed" summary — per-member is
    // strictly more informative. Still routed through errorResponse for sanitization.
    const detail = failures.map((f) => `${f.model}=${f.reason}`).join(", ");
    log.warn("FUSION", `No live models: ${detail}`);
    return errorResponse(
      503,
      detail ? `All fusion panel models failed: ${detail}` : "All fusion panel models failed"
    );
  }
  if (answers.length === 1) {
    // No explicit judgeModel configured: the "judge" is just panel[0], so
    // synthesizing from a single source through itself would be redundant —
    // answer directly with the lone survivor (issue #6454).
    if (!hasExplicitJudge) {
      log.info(
        "FUSION",
        `Only ${answers[0].model} succeeded — answering directly (no fusion)`
      );
      return handleSingleModel(body, answers[0].model);
    }
    // An explicit judgeModel IS configured: honor it even with a single
    // surviving panel answer, rather than silently substituting the panel
    // member for the configured judge (issue #6455). The judge still adds
    // value reviewing/polishing a lone source per its documented contract.
  }

  // Resolve the judge that ACTUALLY runs synthesis. An explicit judgeModel is
  // honored as configured (operator intent — kept even if it was down during
  // fan-out; that's the operator's choice). With NO explicit judge the judge
  // defaulted to panel[0] — but panel[0] may have FAILED fan-out (timeout /
  // rate-limit / dropped straggler → it lands in `failures`, not `answers`).
  // Handing synthesis to a dead panel[0] sinks the whole request despite a
  // healthy quorum — exactly the case fusion exists to tolerate. So pick a
  // SURVIVOR: prefer panel[0] when it survived, otherwise the first survivor.
  const effectiveJudge = hasExplicitJudge
    ? judge
    : answers.some((a) => a.model === panel[0])
      ? panel[0]
      : answers[0].model;

  if (answers.length === 1) {
    log.info(
      "FUSION",
      `Only ${answers[0].model} succeeded — judging single answer with ${effectiveJudge}`
    );
  }

  // 4. Judge analyzes + writes one final answer (streams to client if requested).
  const judgeBody = appendUserTurn(body, buildJudgePrompt(answers));
  log.info("FUSION", `Judging ${answers.length} answers with ${effectiveJudge}`);
  return handleSingleModel(judgeBody, effectiveJudge);
}
