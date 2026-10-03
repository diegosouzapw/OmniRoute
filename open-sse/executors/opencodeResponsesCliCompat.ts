import snapshot from "./opencodeCliSnapshot.json";

export function adaptOpencodeResponsesBody<T>(body: T): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const input = body as Record<string, unknown>;
  if (input.input === undefined) return body;
  const hasTools = Array.isArray(input.tools) && input.tools.length > 0;
  const items = Array.isArray(input.input)
    ? [...input.input]
    : [{ role: "user", content: input.input }];
  const content =
    snapshot.responsesSystemPrompt +
    (typeof input.instructions === "string" ? "\n\n" + input.instructions : "") +
    (!hasTools
      ? "\n\nNo tool execution is available for this request. The tools are transport compatibility declarations only. Answer directly without calling tools, following the caller's instructions and requested response format."
      : "");
  const { instructions: _instructions, ...rest } = input;
  return {
    ...rest,
    input: [{ role: "developer", content }, ...items],
    tools: hasTools ? input.tools : structuredClone(snapshot.responsesTools),
    max_output_tokens: input.max_output_tokens ?? 32000,
    store: false,
    include: Array.from(
      new Set([
        ...(Array.isArray(input.include) ? input.include : []),
        "reasoning.encrypted_content",
      ])
    ),
    stream: true,
    ...(input.tool_choice === undefined ? { tool_choice: "auto" } : {}),
  } as T;
}
