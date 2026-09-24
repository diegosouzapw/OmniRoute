/**
 * Muse Spark max-first effort fallback for the OpenCode executor (#12687).
 *
 * The wire tier is sent verbatim — including `max` — and only when the upstream
 * answers 400 with the unsupported-effort signature is the same dispatch retried
 * once with the input downgraded to `xhigh`. Extracted from `opencode.ts` (frozen
 * file-size ceiling); the executor injects its own `parseEffortLevel` so this leaf
 * never imports the executor back.
 */
import type { BaseExecutor, ExecuteInput } from "./base.ts";

/** Object-shaped arm of ExecutorExecuteResult (the HTTP path). */
export type HttpExecuteResult = Extract<
  Awaited<ReturnType<BaseExecutor["execute"]>>,
  { response: Response }
>;

type ParseEffort = (model: string) => { baseModel: string; effort: string } | null;

/**
 * Matches a muse-spark model id in any executor-level form (bare
 * `muse-spark-1.3-contributor`, effort alias, or provider-prefixed).
 */
const MUSE_SPARK_MODEL_PATTERN = /(?:^|\/)muse-spark/i;

/**
 * Whether an upstream 400 body is the OpenCode /responses "effort not
 * supported" rejection (e.g. sending reasoning.effort=max to a model whose
 * wire vocabulary tops out at xhigh). Real upstream shape (2026-09-04):
 * `{"error":{"param":"reasoning.effort","type":"invalid_request_error",
 * "message":"… reasoning_effort 'max' is not supported …"}}`.
 * Exported for testability.
 */
export function isUnsupportedReasoningEffortRejection(bodyText: string): boolean {
  if (!bodyText) return false;
  if (/"param"\s*:\s*"reasoning\.effort"/i.test(bodyText)) return true;
  return /reasoning/i.test(bodyText) && /not supported|unknown variant/i.test(bodyText);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

const isMax = (value: unknown): boolean => String(value ?? "").toLowerCase() === "max";

/**
 * Max-first fallback input rewrite (muse-spark only): when the caller asked
 * for `max` — via a `-max` effort alias or a flat `reasoning_effort` /
 * `reasoning.effort` field — produce a copy of the input pinned to `xhigh`
 * for the single bounded retry. Returns null when the input carries no
 * max-effort intent (no retry). Never mutates the caller's input.
 */
function downgradeMuseSparkMaxEffortInput(
  input: ExecuteInput,
  parseEffort: ParseEffort
): ExecuteInput | null {
  const model = String(input.model ?? "");
  const parsed = parseEffort(model);
  const isSpark =
    MUSE_SPARK_MODEL_PATTERN.test(model) || !!parsed?.baseModel.startsWith("muse-spark");
  if (!isSpark) return null;

  const bodyRec = asRecord(input.body);
  if (parsed?.effort === "max") {
    return {
      ...input,
      model: parsed.baseModel,
      body: { ...(bodyRec ?? {}), reasoning_effort: "xhigh" },
    };
  }
  if (!bodyRec) return null;
  if (isMax(bodyRec.reasoning_effort)) {
    return { ...input, body: { ...bodyRec, reasoning_effort: "xhigh" } };
  }
  const reasoningRec = asRecord(bodyRec.reasoning);
  if (reasoningRec && isMax(reasoningRec.effort)) {
    return { ...input, body: { ...bodyRec, reasoning: { ...reasoningRec, effort: "xhigh" } } };
  }
  return null;
}

/**
 * Max-first effort fallback (muse-spark on /responses): exactly one extra
 * attempt, only on the unsupported-effort 400 signature; every other outcome
 * passes through untouched.
 */
export async function dispatchWithMuseSparkMaxFallback(
  input: ExecuteInput,
  dispatch: (effInput: ExecuteInput) => Promise<HttpExecuteResult>,
  parseEffort: ParseEffort
): Promise<HttpExecuteResult> {
  const first = await dispatch(input);
  if (first.response.status !== 400) return first;
  const downgraded = downgradeMuseSparkMaxEffortInput(input, parseEffort);
  if (!downgraded) return first;
  let bodyText: string | null = null;
  try {
    bodyText = await first.response.clone().text();
  } catch {
    return first;
  }
  if (bodyText === null || !isUnsupportedReasoningEffortRejection(bodyText)) return first;
  input.log?.warn?.(
    "OPENCODE",
    "upstream rejected reasoning effort 'max' for muse-spark, retrying once with 'xhigh'…"
  );
  return dispatch(downgraded);
}

/**
 * Dynamic forward-compatible parsing for future muse-spark-*-contributor
 * effort aliases (e.g. `muse-spark-1.4-contributor-max`). Returns null when the
 * id is not such an alias.
 */
export function parseDynamicMuseSparkEffort(
  model: string
): { baseModel: string; effort: string } | null {
  const museMatch = model.match(
    /^(muse-spark-(?:[0-9]+(?:\.[0-9]+)?|[a-z0-9_-]+)-contributor)-(minimal|low|medium|high|xhigh|max)$/i
  );
  if (!museMatch) return null;
  const baseModel = museMatch[1].toLowerCase();
  const effort = museMatch[2].toLowerCase();
  // 1.2 ceiling is xhigh (no max); 1.3+ and future versions support up to max.
  if (/^muse-spark-1\.2-contributor$/i.test(baseModel) && effort === "max") return null;
  return { baseModel, effort };
}

/**
 * Muse Spark on OpenCode is exclusively a Responses API model on /responses. The
 * upstream strictly expects baseModel in the model field and reasoning.effort for
 * the tier (rejects suffixed model ids with ModelError 401). Max-first: the
 * requested tier goes to the wire verbatim — if the upstream does not know `max`
 * it 400s with the unsupported-effort signature and the executor retries once
 * with `xhigh` (see dispatchWithMuseSparkMaxFallback). Mutates `mb` in place.
 */
export function applyMuseSparkResponsesEffort(
  mb: Record<string, unknown>,
  parsed: { baseModel: string; effort: string }
): void {
  mb.model = parsed.baseModel;
  const responsesEffort = parsed.effort === "ultra" ? "max" : parsed.effort;
  if (mb.reasoning && typeof mb.reasoning === "object" && !Array.isArray(mb.reasoning)) {
    (mb.reasoning as Record<string, unknown>).effort = responsesEffort;
  } else if (mb.reasoning === undefined) {
    mb.reasoning = { effort: responsesEffort };
  }
}
