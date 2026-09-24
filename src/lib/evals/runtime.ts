import { POST as postChatCompletion } from "@/app/api/v1/chat/completions/route";
import type { PersistedEvalRun, EvalTargetType } from "@/lib/db/evals";
import { saveEvalRun } from "@/lib/db/evals";
import { getApiKeyById } from "@/lib/db/apiKeys";
import { getCombos } from "@/lib/db/combos";
import { getSuite, listSuites, runSuite } from "./evalRunner";

export interface EvalTargetInput {
  type: EvalTargetType;
  id?: string | null;
}

export interface EvalTargetOption {
  key: string;
  type: EvalTargetType;
  id: string | null;
  label: string;
  description: string;
}

function getNormalizedTargetId(target: EvalTargetInput): string | null {
  return typeof target.id === "string" && target.id.trim().length > 0 ? target.id.trim() : null;
}

export function getEvalTargetLabel(target: EvalTargetInput): string {
  const id = getNormalizedTargetId(target);

  if (target.type === "combo") {
    return `Combo: ${id || "Unknown"}`;
  }

  if (target.type === "model") {
    return `Model: ${id || "Unknown"}`;
  }

  return "Suite defaults";
}

export function normalizeEvalTarget(target?: EvalTargetInput | null): EvalTargetInput {
  if (!target || target.type === "suite-default") {
    return { type: "suite-default", id: null };
  }

  return {
    type: target.type === "combo" ? "combo" : "model",
    id: getNormalizedTargetId(target),
  };
}

export async function buildEvalTargetOptions(): Promise<EvalTargetOption[]> {
  const [suites, combos] = await Promise.all([Promise.resolve(listSuites()), getCombos()]);
  const models = [
    ...new Set(
      suites
        .flatMap((suite) => suite.cases || [])
        .map((evalCase) => evalCase.model)
        .filter((model): model is string => typeof model === "string" && model.trim().length > 0)
    ),
  ].sort((left, right) => left.localeCompare(right));

  const comboOptions = (Array.isArray(combos) ? combos : [])
    .map((combo) => ({
      key: `combo:${combo.name}`,
      type: "combo" as const,
      id: typeof combo.name === "string" ? combo.name : null,
      label: `Combo: ${combo.name}`,
      description:
        typeof combo.strategy === "string" && combo.strategy.trim().length > 0
          ? `Runs through combo strategy "${combo.strategy}"`
          : "Runs through the combo router",
    }))
    .filter((option) => option.id);

  return [
    {
      key: "suite-default:__default__",
      type: "suite-default",
      id: null,
      label: "Suite defaults",
      description: "Use each case's built-in model",
    },
    ...models.map((model) => ({
      key: `model:${model}`,
      type: "model" as const,
      id: model,
      label: `Model: ${model}`,
      description: "Force every case through one direct model",
    })),
    ...comboOptions,
  ];
}

function extractTextParts(value: unknown): string[] {
  if (typeof value === "string") {
    return value.trim().length > 0 ? [value] : [];
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (typeof entry === "string") {
      return entry.trim().length > 0 ? [entry] : [];
    }

    if (!entry || typeof entry !== "object") {
      return [];
    }

    const record = entry as Record<string, unknown>;
    if (typeof record.text === "string" && record.text.trim().length > 0) {
      return [record.text];
    }

    if (
      record.type === "output_text" &&
      typeof record.text === "string" &&
      record.text.trim().length > 0
    ) {
      return [record.text];
    }

    return [];
  });
}

function extractChatOutput(payload: Record<string, unknown> | null): string {
  if (!payload) return "";

  const choices = Array.isArray(payload.choices) ? payload.choices : [];
  const firstChoice =
    choices.length > 0 && choices[0] && typeof choices[0] === "object"
      ? (choices[0] as Record<string, unknown>)
      : null;
  const message =
    firstChoice && firstChoice.message && typeof firstChoice.message === "object"
      ? (firstChoice.message as Record<string, unknown>)
      : null;

  const chatText = extractTextParts(message?.content);
  if (chatText.length > 0) {
    return chatText.join("\n").trim();
  }

  const output = Array.isArray(payload.output) ? payload.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const text = extractTextParts((item as Record<string, unknown>).content);
    if (text.length > 0) {
      return text.join("\n").trim();
    }
  }

  return "";
}

function extractErrorMessage(payload: Record<string, unknown> | null, status: number): string {
  const error =
    payload && payload.error && typeof payload.error === "object"
      ? (payload.error as Record<string, unknown>)
      : null;
  const message =
    (error && typeof error.message === "string" && error.message.trim().length > 0
      ? error.message.trim()
      : null) ||
    (payload && typeof payload.message === "string" && payload.message.trim().length > 0
      ? payload.message.trim()
      : null);

  return message || `HTTP ${status}`;
}

function resolveCaseModel(evalCase: Record<string, unknown>, target: EvalTargetInput): string {
  const targetId = getNormalizedTargetId(target);
  const caseModel =
    typeof evalCase.model === "string" && evalCase.model.trim().length > 0 ? evalCase.model : null;

  if (target.type === "model" || target.type === "combo") {
    return targetId || caseModel || "gpt-4o";
  }

  return caseModel || "gpt-4o";
}

/**
 * Build the chat-completions request for one eval case.
 *
 * The runner manages its own context: a graded case must measure the model
 * answering the case, not the operator's injected context. Two injections
 * otherwise apply on the ordinary chat path — a selected output style is
 * prepended as a system message (gated on `x-omniroute-compression`), and
 * retrieved memory plus the built-in `memory_*` tools are appended once the
 * request carries an API key (gated on `x-omniroute-no-memory`). Both are
 * request-header opt-outs, so the runner sets them on every case. Without them
 * a graded case answers in the configured persona or spends its turn calling
 * `memory_*`, and a run that passes an API key scores *worse* than one that
 * does not, because the key is what gives the request a memory owner (#13139).
 *
 * Exported so the header contract can be asserted without invoking the chat
 * route — see tests/unit/evals-runtime-self-managed-headers-13139.test.ts.
 */
export function buildEvalCaseRequest(
  evalCase: Record<string, unknown>,
  target: EvalTargetInput,
  apiKey: string | null
): Request {
  const input =
    evalCase.input && typeof evalCase.input === "object" && !Array.isArray(evalCase.input)
      ? (evalCase.input as Record<string, unknown>)
      : {};
  const model = resolveCaseModel(evalCase, target);
  const headers = new Headers({
    "Content-Type": "application/json",
    // Self-managed context — see the docblock above.
    "x-omniroute-compression": "off",
    "x-omniroute-no-memory": "true",
  });

  if (apiKey) {
    headers.set("Authorization", `Bearer ${apiKey}`);
  }

  return new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...input,
      model,
      stream: false,
      max_tokens:
        typeof input.max_tokens === "number" && Number.isFinite(input.max_tokens)
          ? input.max_tokens
          : 512,
    }),
  });
}

async function executeEvalCase(
  evalCase: Record<string, unknown>,
  target: EvalTargetInput,
  apiKey: string | null
): Promise<{ output: string; durationMs: number; error?: string }> {
  const request = buildEvalCaseRequest(evalCase, target, apiKey);

  const startedAt = Date.now();
  const response = await postChatCompletion(request);
  const durationMs = Date.now() - startedAt;

  let payload: Record<string, unknown> | null = null;
  try {
    payload = (await response.json()) as Record<string, unknown>;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = extractErrorMessage(payload, response.status);
    return {
      output: `[ERROR] ${error}`,
      durationMs,
      error,
    };
  }

  const output = extractChatOutput(payload);
  return {
    output: output || "[No content returned]",
    durationMs,
  };
}

function getAverageLatency(caseMetrics: Record<string, { durationMs?: number }>): number {
  const durations = Object.values(caseMetrics)
    .map((metric) => Number(metric.durationMs))
    .filter((duration) => Number.isFinite(duration) && duration >= 0);

  if (durations.length === 0) return 0;
  return Math.round(durations.reduce((sum, duration) => sum + duration, 0) / durations.length);
}

export async function runEvalSuiteAgainstTarget(input: {
  suiteId: string;
  target?: EvalTargetInput | null;
  apiKeyId?: string;
  runGroupId?: string | null;
}): Promise<PersistedEvalRun> {
  const suite = getSuite(input.suiteId);
  if (!suite) {
    throw new Error(`Suite not found: ${input.suiteId}`);
  }

  const normalizedTarget = normalizeEvalTarget(input.target);
  const targetLabel = getEvalTargetLabel(normalizedTarget);

  let resolvedApiKey: string | null = null;
  if (typeof input.apiKeyId === "string" && input.apiKeyId.trim().length > 0) {
    const keyRecord = await getApiKeyById(input.apiKeyId);
    if (!keyRecord || typeof keyRecord.key !== "string" || keyRecord.key.trim().length === 0) {
      throw new Error("Selected API key was not found");
    }
    if (keyRecord.isActive === false) {
      throw new Error("Selected API key is inactive");
    }
    resolvedApiKey = keyRecord.key;
  }

  const outputs: Record<string, string> = {};
  const caseMetrics: Record<string, { durationMs?: number; error?: string }> = {};

  for (const evalCase of suite.cases || []) {
    const execution = await executeEvalCase(
      (evalCase || {}) as Record<string, unknown>,
      normalizedTarget,
      resolvedApiKey
    );
    outputs[evalCase.id] = execution.output;
    caseMetrics[evalCase.id] = {
      durationMs: execution.durationMs,
      ...(execution.error ? { error: execution.error } : {}),
    };
  }

  const evaluated = runSuite(input.suiteId, outputs, caseMetrics);
  return saveEvalRun({
    runGroupId: input.runGroupId || null,
    suiteId: evaluated.suiteId,
    suiteName: evaluated.suiteName,
    target: {
      type: normalizedTarget.type,
      id: getNormalizedTargetId(normalizedTarget),
      label: targetLabel,
    },
    apiKeyId: input.apiKeyId || null,
    avgLatencyMs: getAverageLatency(caseMetrics),
    summary: evaluated.summary,
    results: evaluated.results as Array<Record<string, unknown>>,
    outputs,
  });
}
