/**
 * Pairs Gemini `functionResponse` parts with the `functionCall` they answer.
 *
 * Gemini carries an `id` on either part only when the client set one, and OmniRoute's own
 * Gemini-format responses never emit it, so multi-turn tool loops through the Gemini
 * endpoints usually arrive without ids. A call without an id is given a generated one;
 * falling back to the function *name* for the matching response then points the tool
 * message at a call id that does not exist, and the tool-call normalization downstream
 * (fixMissingToolResponses / stripOrphanedToolResults) replaces the real output with an
 * empty result. Responses without an id therefore take the oldest still-open call id with
 * the same function name, in order, since one function can be called several times.
 *
 * Pairing is scoped to one round of calls. Once a non-model content (the user's reply, the
 * tool responses) has come in, the next content that makes calls starts a new round, so a call
 * left unanswered earlier in the history cannot take the response meant for a later call to
 * the same function. The model's own thought or text contents between two call contents do
 * not end the round.
 */
export function createGeminiToolCallIdPairing(newId: () => string) {
  const openCalls = new Map<string, Array<{ id: string; generated: boolean }>>();
  let roundEnded = false;

  return {
    /** Call once per Gemini `content`, before its parts. */
    beginContent(content: { role?: unknown; parts?: unknown }): void {
      const madeCalls =
        Array.isArray(content?.parts) &&
        content.parts.some((part) => Boolean((part as { functionCall?: unknown })?.functionCall));
      if (madeCalls && roundEnded) openCalls.clear();
      if (madeCalls) roundEnded = false;
      else if (content?.role !== "model") roundEnded = true;
    },

    /** Id for a `functionCall` part: its own id, or a generated one. */
    callId(call: { id?: unknown; name?: unknown }): string {
      const generated = !(typeof call.id === "string" && call.id);
      const id = generated ? newId() : (call.id as string);
      const name = typeof call.name === "string" ? call.name : "";
      const open = openCalls.get(name) ?? [];
      open.push({ id, generated });
      openCalls.set(name, open);
      return id;
    },

    /** `tool_call_id` for a `functionResponse` part. */
    responseId(response: { id?: unknown; name?: unknown }): string {
      const name = typeof response.name === "string" ? response.name : "";
      const open = openCalls.get(name) ?? [];
      if (typeof response.id === "string" && response.id) {
        const index = open.findIndex((call) => call.id === response.id);
        if (index !== -1) open.splice(index, 1);
        return response.id;
      }
      // An id the client chose is answered by a response carrying that id, so an id-less
      // response takes the oldest call whose id was generated here.
      const index = open.findIndex((call) => call.generated);
      if (index === -1) return open.shift()?.id ?? name;
      return open.splice(index, 1)[0].id;
    },
  };
}
