// Responses -> Chat projection for the /alpha/generate CLI fallback.
//
// Split out of commandCode.ts to keep that file under the 1200-line file-size
// gate; the logic is self-contained and only two symbols are needed by callers.

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

/**
 * True for an OpenAI Responses-shaped body (`input`, not `messages`). Command Code
 * serves OpenAI models on BOTH /chat/completions and /responses, but only the
 * Responses endpoint honors `reasoning: {"effort": "none"}` (the chat validator
 * accepts low|medium|high|xhigh|max only, and silently ignores a nested
 * `reasoning.effort`). Route Responses-shaped bodies there so a no-thinking
 * request can actually disable reasoning.
 *
 * `messages` is the Chat discriminator and WINS when both are present: `input` is
 * only consulted when `messages` is absent. A body carrying both is malformed,
 * and defaulting to the flat Chat surface keeps routing predictable if a payload
 * override ever injects `messages` into a Responses request.
 */
export function isResponsesShapedBody(body: unknown): boolean {
  if (!isRecord(body)) return false;
  return body.input !== undefined && body.messages === undefined;
}

/**
 * Per-type projections from a Responses input item onto Chat messages. The map
 * keys are exactly the item types that have a faithful Chat form. Anything else
 * — `reasoning` items, built-in tool calls (`web_search_call`,
 * `local_shell_call`, …), and any future opaque item — has no CLI
 * representation. Bailing on those is the only honest option: silently dropping
 * the item would corrupt the replay.
 */
const RESPONSES_ITEM_PROJECTORS: Record<
  string,
  (item: JsonRecord, messages: JsonRecord[]) => boolean
> = {
  message: projectResponsesMessageItem,
  function_call: projectResponsesFunctionCallItem,
  function_call_output: projectResponsesToolOutputItem,
};

function projectResponsesMessageItem(item: JsonRecord, messages: JsonRecord[]): boolean {
  const role = stringValue(item.role);
  if (role !== "user" && role !== "system" && role !== "assistant") return false;
  messages.push({ role, content: item.content });
  return true;
}

function projectResponsesToolOutputItem(item: JsonRecord, messages: JsonRecord[]): boolean {
  const callId = stringValue(item.call_id) ?? "";
  if (!callId) return false;
  messages.push({ role: "tool", tool_call_id: callId, content: item.output });
  return true;
}

/**
 * Project a Responses `function_call` item onto a Chat assistant `tool_calls`
 * entry. Consecutive calls — and a preceding assistant `message` — collapse into
 * one assistant turn, matching how Chat groups `tool_calls`.
 */
function projectResponsesFunctionCallItem(item: JsonRecord, messages: JsonRecord[]): boolean {
  const callId = stringValue(item.call_id) ?? "";
  const name = stringValue(item.name) ?? "";
  if (!callId || !name) return false;
  const call: JsonRecord = {
    id: callId,
    type: "function",
    function: { name, arguments: stringValue(item.arguments) ?? "{}" },
  };
  const last = messages[messages.length - 1];
  if (isRecord(last) && last.role === "assistant") {
    if (!Array.isArray(last.tool_calls)) last.tool_calls = [];
    (last.tool_calls as JsonRecord[]).push(call);
  } else {
    messages.push({ role: "assistant", content: null, tool_calls: [call] });
  }
  return true;
}

/**
 * Project Responses input items onto Chat messages in place. Returns false when
 * an item has no faithful Chat form.
 */
function projectResponsesItems(items: unknown[], messages: JsonRecord[]): boolean {
  for (const item of items) {
    if (!isRecord(item)) return false;
    const type = typeof item.type === "string" ? item.type : "message";
    const project = RESPONSES_ITEM_PROJECTORS[type];
    if (!project || !project(item, messages)) return false;
  }
  return true;
}

/**
 * Project a Responses-shaped body onto the Chat shape `/alpha/generate` speaks.
 *
 * The CLI fallback is `messages`-based (`buildCommandCodeCliBody` reads
 * `input.messages` and `input.max_tokens`), but a Responses request carries
 * `input` and `max_output_tokens` instead. Replaying it unchanged sends an empty
 * message list and drops the output cap, so the two have to be projected.
 *
 * Returns `null` when the request has no faithful CLI form (see
 * `projectResponsesItems`); the caller then surfaces the upstream error rather
 * than replaying a mangled body. `instructions` maps onto `system`, since the
 * CLI body has no `instructions` field and would otherwise drop it.
 */
export function projectResponsesForCli(body: JsonRecord): JsonRecord | null {
  const raw = body.input;
  const messages: JsonRecord[] = [];

  if (typeof raw === "string") {
    messages.push({ role: "user", content: raw });
  } else if (Array.isArray(raw)) {
    if (!projectResponsesItems(raw, messages)) return null;
    if (messages.length === 0) return null;
  } else {
    return null;
  }

  const out: JsonRecord = { ...body, messages };
  delete out.input;
  if (typeof body.max_output_tokens === "number") {
    out.max_tokens = body.max_output_tokens;
  }
  delete out.max_output_tokens;

  // Responses carries the system prompt as `instructions`; the CLI body has no
  // such field and would silently drop it. Map it onto `system` when the request
  // did not already set one.
  const instructions = stringValue(body.instructions);
  if (instructions && !stringValue(out.system)) {
    out.system = instructions;
  }
  delete out.instructions;

  return out;
}
