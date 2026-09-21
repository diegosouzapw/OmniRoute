/** Include native instruction fields in both cache reads and writes. */
export function semanticCacheConversation(body: {
  messages?: unknown;
  input?: unknown;
  contents?: unknown;
  system?: unknown;
  instructions?: unknown;
  systemInstruction?: unknown;
  system_instruction?: unknown;
  request?: unknown;
}): unknown {
  if (body.request && typeof body.request === "object" && !Array.isArray(body.request)) {
    return semanticCacheConversation({ ...body.request, request: undefined });
  }
  const conversation = body.messages ?? body.input;
  const instructions = [
    body.system,
    body.instructions,
    body.systemInstruction,
    body.system_instruction,
  ].filter((value) => value !== undefined && value !== null);
  if (!instructions.length && body.contents === undefined) return conversation;
  const messages = Array.isArray(conversation)
    ? conversation
    : typeof conversation === "string"
      ? [{ role: "user", content: conversation }]
      : Array.isArray(body.contents)
        ? body.contents.map((item) => ({
            role: item.role === "model" ? "assistant" : item.role,
            content: item.parts,
          }))
        : [];
  return [...instructions.map((content) => ({ role: "system", content })), ...messages];
}
