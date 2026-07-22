export function buildResponsesToolCallItem(options: {
  callId: string;
  toolName: string;
  custom: boolean;
}) {
  const { callId, toolName, custom } = options;
  return {
    id: `fc_${callId}`,
    type: custom ? "custom_tool_call" : "function_call",
    ...(custom ? { input: "" } : { arguments: "" }),
    call_id: callId,
    name: toolName,
    status: "in_progress",
  };
}
