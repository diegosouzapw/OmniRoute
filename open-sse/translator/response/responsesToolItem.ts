export function buildResponsesToolCallItem(options: {
  callId: string;
  toolName: string;
  custom: boolean;
  namespace?: string | null;
}) {
  const { callId, toolName, custom, namespace } = options;
  const item: {
    id: string;
    type: string;
    arguments?: string;
    input?: string;
    call_id: string;
    name: string;
    namespace?: string;
    status: string;
  } = {
    id: `fc_${callId}`,
    type: custom ? "custom_tool_call" : "function_call",
    ...(custom ? { input: "" } : { arguments: "" }),
    call_id: callId,
    name: toolName,
    status: "in_progress",
  };
  // Codex's ResponseItem::FunctionCall / CustomToolCall both accept an optional
  // `namespace` field and dispatch on it independently of `name` (see
  // codex-rs/protocol/src/models.rs and the `function_call_deserializes_optional_namespace`
  // round-trip test). Emit it whenever the request-side identity ledger resolved
  // the bare leaf back to a namespace sub-tool.
  if (namespace) item.namespace = namespace;
  return item;
}
