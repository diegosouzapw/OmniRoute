import { ModelValidationError } from "./http";
import { abortable } from "./limits";
export { abortable, deadline } from "./limits";

export function proofFailed(): never {
  throw new ModelValidationError(
    422,
    "MODEL_VALIDATION_PROOF_FAILED",
    "The selected model did not complete the required validation proofs"
  );
}

type Json = Record<string, unknown>;
function record(value: unknown): Json {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Json) : {};
}
export interface ProofMessage {
  content: string;
  toolCalls: Array<{ id: string; type: "function"; function: { name: string; arguments: string } }>;
}

async function readBoundedText(response: Response, signal: AbortSignal) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;
  try {
    while (true) {
      const chunk = await abortable(reader.read(), signal);
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 65_536) proofFailed();
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
  return text;
}

function addToolCalls(
  value: unknown,
  calls: Map<number, ProofMessage["toolCalls"][number]>,
  streaming: boolean
) {
  if (!Array.isArray(value)) return;
  for (const [index, item] of value.entries()) {
    const delta = record(item);
    const fn = record(delta.function);
    const key = streaming ? Number(delta.index) : index;
    if (!Number.isSafeInteger(key) || key < 0 || key > 3) proofFailed();
    const call = calls.get(key) ?? {
      id: "",
      type: "function" as const,
      function: { name: "", arguments: "" },
    };
    if (typeof delta.id === "string") call.id += delta.id;
    if (typeof fn.name === "string") call.function.name += fn.name;
    if (typeof fn.arguments === "string") call.function.arguments += fn.arguments;
    calls.set(key, call);
  }
}

function createProofAccumulator(streaming: boolean) {
  let content = "";
  let finishReason: unknown = null;
  const calls = new Map<number, ProofMessage["toolCalls"][number]>();
  return {
    add(raw: string) {
      let parsed: Json;
      try {
        parsed = record(JSON.parse(raw));
      } catch {
        proofFailed();
      }
      if (parsed.error) proofFailed();
      const choices = parsed.choices;
      if (!Array.isArray(choices) || choices.length === 0) return;
      if (choices.length !== 1 || finishReason !== null) proofFailed();
      const choice = record(choices[0]);
      const message = record(streaming ? choice.delta : choice.message);
      if (typeof message.content === "string") content += message.content;
      addToolCalls(message.tool_calls, calls, streaming);
      finishReason = choice.finish_reason ?? null;
    },
    finish(): ProofMessage {
      if (finishReason !== (calls.size ? "tool_calls" : "stop")) proofFailed();
      return { content, toolCalls: [...calls.values()] };
    },
  };
}

export async function readProof(
  response: Response,
  signal: AbortSignal,
  requireStream: boolean
): Promise<ProofMessage> {
  if (!response.ok || !response.body) proofFailed();
  const streaming = response.headers.get("content-type")?.includes("text/event-stream") === true;
  if (requireStream && !streaming) proofFailed();
  const text = await readBoundedText(response, signal);
  const accumulator = createProofAccumulator(streaming);
  if (!streaming) {
    accumulator.add(text);
    return accumulator.finish();
  }
  let done = false;
  for (const frame of text.replace(/\r\n/g, "\n").split("\n\n")) {
    const data = frame
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!data) continue;
    if (done) proofFailed();
    if (data === "[DONE]") {
      accumulator.finish();
      done = true;
    } else accumulator.add(data);
  }
  if (!done) proofFailed();
  return accumulator.finish();
}
