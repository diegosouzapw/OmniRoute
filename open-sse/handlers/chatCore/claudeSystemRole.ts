/**
 * chatCore Claude system-role lifter (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure helper extracted from chatCore.ts: lifts any `system`/`developer` role messages out of the
 * messages[] array into the top-level `system` field. Anthropic's Messages API rejects either as a
 * chat role, so they must be hoisted. `developer` is OpenAI's Responses-API rename of `system` and
 * is treated identically. Mutates the payload in place; behaviour is byte-identical to the previous
 * top-level definition (still re-exported from chatCore.ts for existing importers/tests).
 */

export function extractSystemRoleMessages(payload: Record<string, unknown>): void {
  if (!Array.isArray(payload.messages)) return;
  const messages = payload.messages as Array<{ role?: unknown; content?: unknown }>;
  // Treat both `system` and `developer` as system-equivalent (OpenAI's Responses
  // API renamed system → developer). Anthropic rejects either as a chat role, so
  // both must be lifted into the top-level `system` field — parity with the
  // normal-path extractSystemMessagesToBody closure.
  const isSystemRole = (role: unknown): boolean =>
    typeof role === "string" &&
    (role.toLowerCase() === "system" || role.toLowerCase() === "developer");
  const systemMessages = messages.filter((m) => isSystemRole(m.role));
  if (systemMessages.length === 0) return;

  const extraBlocks: Array<Record<string, unknown>> = [];
  for (const sm of systemMessages) {
    if (typeof sm.content === "string" && sm.content.length > 0) {
      extraBlocks.push({ type: "text", text: sm.content });
    } else if (Array.isArray(sm.content)) {
      for (const block of sm.content as Array<Record<string, unknown>>) {
        if (block?.type === "text" && typeof block.text === "string" && block.text.length > 0) {
          extraBlocks.push({ ...block });
        }
      }
    }
  }
  if (extraBlocks.length > 0) {
    const existingSystem = payload.system;
    if (typeof existingSystem === "string" && existingSystem.length > 0) {
      payload.system = [{ type: "text", text: existingSystem }, ...extraBlocks];
    } else if (Array.isArray(existingSystem)) {
      payload.system = [...(existingSystem as Array<Record<string, unknown>>), ...extraBlocks];
    } else {
      payload.system = extraBlocks;
    }
  }
  payload.messages = messages.filter((m) => !isSystemRole(m.role));
}
