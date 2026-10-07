/**
 * Agentic pipeline mode for planner/executor model pairs.
 *
 * The first model owns reasoning and final answers. The second model receives the
 * client's native tools and turns an explicit planner decision into native tool calls.
 * Every client-returned tool result goes back through the planner before another
 * executor turn, so the planner remains in control of sequential workflows while the
 * executor may still emit multiple independent tool calls in parallel.
 */
import { errorResponse } from "../utils/error.ts";
import type { ComboLogger, HandleSingleModel, ResolvedComboTarget } from "./combo/types.ts";
import { extractPanelText, isToolBearingRequest } from "./fusion.ts";
import { prependSystemInstruction, type PipelineStep } from "./pipeline.ts";

type Body = Record<string, unknown>;

export type AgenticOrchestrationConfig = {
  enabled?: boolean;
  maxToolRounds?: number;
};

export type HandleAgenticPipelineOptions = {
  body: Body;
  steps: PipelineStep[];
  handleSingleModel: HandleSingleModel;
  log: ComboLogger;
  comboName?: string;
  config?: AgenticOrchestrationConfig | null;
};

type RouteDecision = {
  route: "tools" | "final";
  content: string;
  explicit: boolean;
};

const ROUTE_RE = /^\s*OMNIROUTE_ROUTE:\s*(TOOLS|FINAL)\b\s*([\s\S]*)$/i;
const DEFAULT_MAX_TOOL_ROUNDS = 8;

function stepModel(step: PipelineStep): string {
  return "target" in step ? step.target.modelStr : step.model;
}

function stepTarget(step: PipelineStep): ResolvedComboTarget | undefined {
  return "target" in step ? step.target : undefined;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function contentHasType(content: unknown, types: ReadonlySet<string>): boolean {
  if (!Array.isArray(content)) return false;
  return content.some((part) => {
    const record = asRecord(part);
    return record && typeof record.type === "string" && types.has(record.type);
  });
}

function geminiPartsHaveFunctionResponse(content: unknown): boolean {
  if (!Array.isArray(content)) return false;
  return content.some((part) => {
    const record = asRecord(part);
    return Boolean(record?.functionResponse || record?.function_response);
  });
}

/** Detect only the trailing native tool-result turn, never historical tool use. */
export function hasTrailingToolResult(body: Body): boolean {
  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (messages?.length) {
    const last = asRecord(messages[messages.length - 1]);
    if (last?.role === "tool") return true;
    if (
      contentHasType(
        last?.content,
        new Set(["tool_result", "function_call_output", "computer_call_output"])
      )
    ) {
      return true;
    }
  }

  const input = Array.isArray(body.input) ? body.input : null;
  if (input?.length) {
    const last = asRecord(input[input.length - 1]);
    if (
      typeof last?.type === "string" &&
      new Set(["function_call_output", "computer_call_output", "local_shell_call_output"]).has(
        last.type
      )
    ) {
      return true;
    }
    if (contentHasType(last?.content, new Set(["tool_result", "function_call_output"]))) {
      return true;
    }
  }

  const contents = Array.isArray(body.contents) ? body.contents : null;
  if (contents?.length) {
    const last = asRecord(contents[contents.length - 1]);
    if (geminiPartsHaveFunctionResponse(last?.parts)) return true;
  }
  return false;
}

/** Count completed tool-result turns to bound client-driven sequential loops. */
export function countToolResultTurns(body: Body): number {
  let count = 0;
  const messages = Array.isArray(body.messages) ? body.messages : [];
  let messageBoundary = 0;
  for (let index = messages.length - 1; index >= 0; index--) {
    const record = asRecord(messages[index]);
    if (
      record?.role === "user" &&
      !contentHasType(record.content, new Set(["tool_result", "function_call_output"]))
    ) {
      messageBoundary = index + 1;
      break;
    }
  }
  for (const message of messages.slice(messageBoundary)) {
    const record = asRecord(message);
    if (record?.role === "tool") count++;
    else if (contentHasType(record?.content, new Set(["tool_result"]))) count++;
  }

  const input = Array.isArray(body.input) ? body.input : [];
  let inputBoundary = 0;
  for (let index = input.length - 1; index >= 0; index--) {
    const record = asRecord(input[index]);
    if (record?.role === "user" && record?.type !== "function_call_output") {
      inputBoundary = index + 1;
      break;
    }
  }
  for (const item of input.slice(inputBoundary)) {
    const record = asRecord(item);
    if (
      typeof record?.type === "string" &&
      new Set(["function_call_output", "computer_call_output", "local_shell_call_output"]).has(
        record.type
      )
    ) {
      count++;
    }
  }
  const contents = Array.isArray(body.contents) ? body.contents : [];
  let contentsBoundary = 0;
  for (let index = contents.length - 1; index >= 0; index--) {
    const record = asRecord(contents[index]);
    if (record?.role === "user" && !geminiPartsHaveFunctionResponse(record.parts)) {
      contentsBoundary = index + 1;
      break;
    }
  }
  for (const content of contents.slice(contentsBoundary)) {
    if (geminiPartsHaveFunctionResponse(asRecord(content)?.parts)) count++;
  }
  return count;
}

function availableToolsPrompt(body: Body): string {
  const tools = body.tools;
  if (!Array.isArray(tools) || tools.length === 0) return "No native tools are available.";
  return [
    "Available native tools (reference only; do not call them in this planning pass):",
    JSON.stringify(tools),
  ].join("\n");
}

function withoutTools(body: Body, preserveStreaming: boolean): Body {
  const {
    tools: _tools,
    tool_choice: _toolChoice,
    parallel_tool_calls: _parallelToolCalls,
    ...rest
  } = body;
  void _tools;
  void _toolChoice;
  void _parallelToolCalls;
  return preserveStreaming ? rest : { ...rest, stream: false };
}

function parseDecision(text: string, continuation: boolean): RouteDecision {
  const match = ROUTE_RE.exec(text);
  if (match) {
    return {
      route: match[1].toLowerCase() === "tools" ? "tools" : "final",
      content: match[2].trim(),
      explicit: true,
    };
  }
  // A malformed planner response on a continuation must not start an uncontrolled
  // tool loop. Fresh tool-bearing turns may still use the prose as executor guidance.
  return { route: continuation ? "final" : "tools", content: text.trim(), explicit: false };
}

function plannerDecisionPrompt(continuation: boolean, maxRoundsReached: boolean): string {
  const state = continuation
    ? "The client has returned one or more native tool results. Review them before deciding the next action."
    : "This is a fresh client turn. Decide whether tools are required before answering.";
  const limit = maxRoundsReached
    ? "The configured tool-round limit has been reached. You MUST choose FINAL and provide the best answer possible from the available evidence."
    : "Choose TOOLS only when another tool call is necessary; otherwise choose FINAL.";
  return [
    "You are the planning and final-answer model in a two-model agentic workflow.",
    state,
    limit,
    "Return exactly one routing line followed by the content:",
    "OMNIROUTE_ROUTE: TOOLS",
    "<precise instructions for the tool executor>",
    "or",
    "OMNIROUTE_ROUTE: FINAL",
    "<a concise draft of the final answer>",
    "Do not emit native tool calls in this internal planning pass.",
  ].join("\n");
}

function executorPrompt(plan: string): string {
  return [
    "Act as the tool-call executor for this turn.",
    "Use the client's native tools to carry out the plan below. Emit all independent tool calls in parallel when possible.",
    "Do not replace a required tool call with prose. For dependent work, emit only the currently executable calls; their results will be reviewed before the next round.",
    "",
    "Tool execution plan:",
    plan,
  ].join("\n");
}

function finalPrompt(draft: string): string {
  return [
    "Produce the final answer to the user's request now.",
    "Do not call tools. Use the full conversation and returned tool results as evidence.",
    "Do not mention routing, orchestration, or this instruction.",
    draft ? `Planning draft:\n${draft}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export async function handleAgenticPipelineChat({
  body,
  steps,
  handleSingleModel,
  log,
  comboName,
  config,
}: HandleAgenticPipelineOptions): Promise<Response> {
  const chain = steps.filter((step) => Boolean(step && stepModel(step)));
  if (chain.length !== 2) {
    return errorResponse(400, "Agentic pipeline requires exactly two models: planner, executor");
  }

  const planner = chain[0];
  const executor = chain[1];
  const plannerModel = stepModel(planner);
  const executorModel = stepModel(executor);
  const continuation = hasTrailingToolResult(body);
  const maxToolRounds = Math.min(Math.max(config?.maxToolRounds ?? DEFAULT_MAX_TOOL_ROUNDS, 1), 32);
  const toolRounds = countToolResultTurns(body);
  const maxRoundsReached = toolRounds >= maxToolRounds;

  log.info(
    "AGENTIC_PIPELINE",
    `Combo "${comboName ?? ""}" | planner=${plannerModel} executor=${executorModel} continuation=${continuation} toolRounds=${toolRounds}/${maxToolRounds}`
  );

  // Without client tools there is nothing for the executor to do. The planner owns
  // the response directly and preserves the client's stream preference.
  if (!isToolBearingRequest(body)) {
    return handleSingleModel(
      prependSystemInstruction(body, planner.prompt),
      plannerModel,
      stepTarget(planner)
    );
  }

  const decisionBody = prependSystemInstruction(
    withoutTools(body, false),
    [
      planner.prompt,
      plannerDecisionPrompt(continuation, maxRoundsReached),
      availableToolsPrompt(body),
    ]
      .filter(Boolean)
      .join("\n\n")
  );
  const decisionResponse = await handleSingleModel(decisionBody, plannerModel, stepTarget(planner));
  if (!decisionResponse.ok) return decisionResponse;

  let decisionText = "";
  try {
    decisionText = extractPanelText(await decisionResponse.clone().json());
  } catch {
    return errorResponse(502, `Agentic planner (${plannerModel}) returned an unparseable response`);
  }
  if (!decisionText.trim()) {
    return errorResponse(502, `Agentic planner (${plannerModel}) returned an empty decision`);
  }

  const decision = parseDecision(decisionText, continuation);
  if (!decision.explicit) {
    log.warn(
      "AGENTIC_PIPELINE",
      `Planner ${plannerModel} omitted OMNIROUTE_ROUTE; using safe ${decision.route.toUpperCase()} fallback`
    );
  }

  if (decision.route === "tools" && !maxRoundsReached) {
    const executorBody = prependSystemInstruction(
      body,
      [executor.prompt, executorPrompt(decision.content)].filter(Boolean).join("\n\n")
    );
    log.info("AGENTIC_PIPELINE", `Routing client-facing tool turn to ${executorModel}`);
    return handleSingleModel(executorBody, executorModel, stepTarget(executor));
  }

  // The planner owns final responses. A second planner call preserves provider-native
  // streaming and response translation while keeping the internal decision buffered.
  const finalBody = prependSystemInstruction(
    withoutTools(body, true),
    [planner.prompt, finalPrompt(decision.content)].filter(Boolean).join("\n\n")
  );
  log.info("AGENTIC_PIPELINE", `Routing client-facing final turn to ${plannerModel}`);
  return handleSingleModel(finalBody, plannerModel, stepTarget(planner));
}
