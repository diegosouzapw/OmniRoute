/**
 * Replay a finished OpenAI Responses object as Responses SSE.
 *
 * chatCore forces stream:false while a server-side web_search fallback runs
 * (streaming interception is not implemented, #9725). For a client that speaks
 * the Responses API, that non-streaming leg is already translated into a
 * Responses object (`object: "response"`, `output[]`), which has no Chat
 * `choices` for synthesizeOpenAiSseFromJson to replay. Emit the event sequence a
 * streaming run would have produced instead, keeping every output item as-is
 * (reasoning, web_search_call, function_call, message...).
 */

type JsonObject = Record<string, unknown>;

// A replayed object is finished: anything that is not a failure ends as completed.
const TERMINAL_EVENTS: Record<string, string> = {
  completed: "response.completed",
  failed: "response.failed",
  cancelled: "response.failed",
  canceled: "response.failed",
  incomplete: "response.incomplete",
};

// What a live stream knows before any output exists (responsesTransformer.ts).
const SHELL_FIELDS = ["id", "object", "created_at", "model", "background"];

// Sub-events reference their item by id, so these item types need one.
const ITEM_ID_PREFIXES: Record<string, string> = {
  message: "msg",
  function_call: "fc",
  reasoning: "rs",
};

function isObject(value: unknown): value is JsonObject {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function textOf(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function isResponsesObject(body: unknown): body is JsonObject {
  return isObject(body) && body.object === "response" && Array.isArray(body.output);
}

// The item as a stream announces it: in progress, before any content arrived.
function openedItem(item: JsonObject): JsonObject {
  if (item.type === "message") return { ...item, status: "in_progress", content: [] };
  if (item.type === "function_call") return { ...item, status: "in_progress", arguments: "" };
  if (item.type === "reasoning") return { ...item, status: "in_progress", summary: [] };
  return "status" in item ? { ...item, status: "in_progress" } : { ...item };
}

export function synthesizeResponsesSseFromObject(response: JsonObject): string {
  const chunks: string[] = [];
  let sequence = 0;
  const emit = (type: string, fields: JsonObject) => {
    const data = { type, sequence_number: sequence++, ...fields };
    chunks.push(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  const shell: JsonObject = { status: "in_progress", error: null, output: [] };
  for (const field of SHELL_FIELDS) {
    if (field in response) shell[field] = response[field];
  }
  emit("response.created", { response: shell });
  emit("response.in_progress", { response: shell });

  const responseId = textOf(response.id) || "resp";
  const output = (response.output as unknown[]).map((entry, outputIndex) => {
    if (!isObject(entry)) return entry;
    const prefix = ITEM_ID_PREFIXES[textOf(entry.type)];
    return prefix && !textOf(entry.id)
      ? { ...entry, id: `${prefix}_${responseId}_${outputIndex}` }
      : entry;
  });
  output.forEach((item, outputIndex) => {
    if (!isObject(item)) return;
    const itemId = item.id;
    emit("response.output_item.added", { output_index: outputIndex, item: openedItem(item) });

    if (item.type === "message" && Array.isArray(item.content)) {
      item.content.forEach((part: unknown, contentIndex: number) => {
        if (!isObject(part)) return;
        const where = { item_id: itemId, output_index: outputIndex, content_index: contentIndex };
        if (part.type === "output_text") {
          const text = textOf(part.text);
          emit("response.content_part.added", { ...where, part: { ...part, text: "" } });
          if (text) emit("response.output_text.delta", { ...where, delta: text, logprobs: [] });
          emit("response.output_text.done", { ...where, text, logprobs: [] });
        } else if (part.type === "refusal") {
          const refusal = textOf(part.refusal);
          emit("response.content_part.added", { ...where, part: { ...part, refusal: "" } });
          if (refusal) emit("response.refusal.delta", { ...where, delta: refusal });
          emit("response.refusal.done", { ...where, refusal });
        } else {
          emit("response.content_part.added", { ...where, part });
        }
        emit("response.content_part.done", { ...where, part });
      });
    } else if (item.type === "reasoning" && Array.isArray(item.summary)) {
      item.summary.forEach((part: unknown, summaryIndex: number) => {
        if (!isObject(part)) return;
        const where = { item_id: itemId, output_index: outputIndex, summary_index: summaryIndex };
        const text = textOf(part.text);
        emit("response.reasoning_summary_part.added", { ...where, part: { ...part, text: "" } });
        if (text) emit("response.reasoning_summary_text.delta", { ...where, delta: text });
        emit("response.reasoning_summary_text.done", { ...where, text });
        emit("response.reasoning_summary_part.done", { ...where, part });
      });
    } else if (item.type === "function_call") {
      const args = textOf(item.arguments);
      const where = { item_id: itemId, output_index: outputIndex };
      if (args) emit("response.function_call_arguments.delta", { ...where, delta: args });
      emit("response.function_call_arguments.done", { ...where, arguments: args });
    }

    emit("response.output_item.done", { output_index: outputIndex, item });
  });

  const terminal = TERMINAL_EVENTS[textOf(response.status)];
  emit(terminal ?? "response.completed", {
    response: { ...response, output, ...(terminal ? {} : { status: "completed" }) },
  });
  chunks.push("data: [DONE]\n\n");
  return chunks.join("");
}
