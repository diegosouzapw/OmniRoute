import { randomUUID } from "node:crypto";
import { createValidationSnapshot, commitValidatedModel } from "../db/validatedModels";
import { ModelValidationError, type ValidationInput } from "./http";
import { proofFailed, deadline, abortable, type ProofMessage } from "./proofs";
import { createProofRunner, type ProofRunner } from "./runner";
import { createValidationPluginFence } from "./pluginFence";
import { withPluginExecutionGuard } from "../plugins/executionGuard";

const TOOL_NAME = "omniroute_validation_echo";
const activeConnections = new Set<string>();

function toolRequest(nonce: string) {
  return {
    tools: [
      {
        type: "function",
        function: {
          name: TOOL_NAME,
          description: "Synthetic validation echo; no external side effects.",
          parameters: {
            type: "object",
            properties: { nonce: { type: "string", enum: [nonce] } },
            required: ["nonce"],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: { type: "function", function: { name: TOOL_NAME } },
    parallel_tool_calls: false,
  };
}

function verifiedToolCall(tool: ProofMessage, nonce: string) {
  if (tool.toolCalls.length !== 1) proofFailed();
  const call = tool.toolCalls[0];
  if (!call.id || call.id.length > 256 || call.function.name !== TOOL_NAME) proofFailed();
  let args: unknown;
  try {
    args = JSON.parse(call.function.arguments);
  } catch {
    proofFailed();
  }
  if (
    !args ||
    typeof args !== "object" ||
    Object.keys(args).length !== 1 ||
    (args as { nonce?: unknown }).nonce !== nonce
  )
    proofFailed();
  return call;
}

async function runProofs(run: ProofRunner) {
  const nonce = `omni_validation_${randomUUID()}`;
  const echo = `omni_receipt_${randomUUID()}`;
  const messages: Array<Record<string, unknown>> = [
    { role: "user", content: `Return exactly this text and nothing else: ${nonce}` },
  ];
  const generation = await run(messages, false);
  if (generation.content.trim() !== nonce || generation.toolCalls.length) proofFailed();
  messages.push(
    { role: "assistant", content: generation.content },
    {
      role: "user",
      content: `Call ${TOOL_NAME} exactly once with nonce ${nonce}. Do not call any other tool.`,
    }
  );
  const call = verifiedToolCall(await run(messages, true, toolRequest(nonce)), nonce);
  // No tool execution. The result is a local, unpredictable synthetic string.
  messages.push(
    { role: "assistant", content: null, tool_calls: [call] },
    { role: "tool", tool_call_id: call.id, content: echo },
    { role: "user", content: "Return exactly the tool result and nothing else." }
  );
  const continuation = await run(messages, false);
  if (continuation.content.trim() !== echo || continuation.toolCalls.length) proofFailed();
}

/** One management operation; no externally redeemable receipt or pre-validation write. */
export async function validateAndAddModel(input: ValidationInput, clientSignal: AbortSignal) {
  if (activeConnections.has(input.connectionId))
    throw new ModelValidationError(
      409,
      "VALIDATION_BUSY",
      "A validation for this connection is already running"
    );
  activeConnections.add(input.connectionId);
  const operation = deadline(clientSignal, 90_000);
  const signal = operation.signal;
  try {
    signal.throwIfAborted();
    const pluginFence = createValidationPluginFence();
    pluginFence.assertIdle();
    const snapshot = createValidationSnapshot(input);
    await abortable(
      withPluginExecutionGuard(pluginFence, async () =>
        runProofs(await abortable(createProofRunner(input, snapshot, signal), signal))
      ),
      signal
    );
    signal.throwIfAborted();
    pluginFence.assertIdle();
    const validation = {
      id: randomUUID(),
      status: "passed",
      provider: input.provider,
      modelId: input.modelId,
      connectionId: input.connectionId,
      validatedAt: new Date().toISOString(),
      stages: { generation: "passed", toolCall: "passed", continuation: "passed" },
    };
    const model = commitValidatedModel(snapshot, input, validation);
    return { schemaVersion: 1, model, persistenceVerified: true, validation };
  } catch (error) {
    if (
      signal.aborted ||
      (error instanceof Error && ["AbortError", "TimeoutError"].includes(error.name))
    )
      throw new ModelValidationError(
        408,
        "MODEL_VALIDATION_TIMEOUT",
        "Model validation was cancelled or timed out"
      );
    throw error;
  } finally {
    operation.clear();
    activeConnections.delete(input.connectionId);
  }
}
