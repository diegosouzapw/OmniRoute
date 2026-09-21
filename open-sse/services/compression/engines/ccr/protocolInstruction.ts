/**
 * CCR retrieve-protocol instruction (#8033)
 *
 * The CCR engine replaces large blocks of text with a bare
 * `[CCR retrieve hash=<24hex> chars=N]` marker (see `index.ts`). A caller that has
 * never been told what that marker means has no way to recover the original
 * content — it can only call `omniroute_ccr_retrieve` if it (a) knows the tool
 * exists and (b) copies the 24-hex hash verbatim.
 *
 * This module injects a single, idempotent `system` message the first time a
 * request carries a CCR marker, teaching the model the marker → tool contract —
 * but ONLY when the caller's advertised `tools[]` proves it can actually reach
 * `omniroute_ccr_retrieve` (an MCP-capable caller). Plain OpenAI-compatible
 * callers that cannot reach the tool must never be told to call it.
 *
 * MCP gateways/aggregators (Docker MCP Toolkit, Claude Code, and similar) rename
 * tools when re-exposing them to the model to avoid cross-server name collisions,
 * typically as `mcp__<gateway>__<server>__omniroute_ccr_retrieve` or with a
 * dotted/slashed namespace prefix (`omniroute.omniroute_ccr_retrieve`). A caller
 * reachable only under such a namespaced name is still MCP-capable, so the match
 * below accepts a trailing-segment match bounded by a separator (`__`, `.`, `/`,
 * `:`) — never a bare substring test — so a near-miss like
 * `omniroute_ccr_retrieve_v2` still correctly does not match (#13781, #13897).
 */

const CCR_RETRIEVE_TOOL_NAME = "omniroute_ccr_retrieve";

/** Separators MCP gateways use to namespace a re-exposed tool name. */
const CCR_RETRIEVE_TOOL_NAME_SEPARATORS = ["__", ".", "/", ":"];

/**
 * True when `name` is exactly the CCR retrieve tool name, or ends with it as a
 * separator-bounded trailing segment (e.g. an MCP-gateway-namespaced name such
 * as `mcp__docker__omniroute__omniroute_ccr_retrieve`). Deliberately NOT a bare
 * `.includes()`/unqualified `.endsWith()` — that would also match an unrelated
 * near-miss name like `omniroute_ccr_retrieve_v2`.
 */
function matchesCcrRetrieveToolName(name: string | undefined): boolean {
  if (typeof name !== "string") return false;
  if (name === CCR_RETRIEVE_TOOL_NAME) return true;
  return CCR_RETRIEVE_TOOL_NAME_SEPARATORS.some((separator) =>
    name.endsWith(`${separator}${CCR_RETRIEVE_TOOL_NAME}`)
  );
}

/** Leading marker that identifies the injected instruction (also the idempotency sentinel). */
export const CCR_PROTOCOL_MARKER_SENTINEL = "[CCR protocol]";

export const CCR_PROTOCOL_INSTRUCTION = `${CCR_PROTOCOL_MARKER_SENTINEL} This conversation uses content-compression-retrieve (CCR). When you see a marker like \`[CCR retrieve hash=<24hex> chars=N]\` in a message, it means the full original text (N characters) was stored and replaced with this marker to save space — call the \`${CCR_RETRIEVE_TOOL_NAME}\` tool with that hash to get the original text back verbatim. Copy the hash EXACTLY as written — all 24 hexadecimal characters, never truncated, abbreviated, or reformatted — a single wrong character will make the retrieval fail. If you instead see a marker like \`[dedup:ref sha=...]\`, it means that content already appeared earlier in this conversation — look back in the message history for it; do NOT call ${CCR_RETRIEVE_TOOL_NAME} for a dedup reference.`;

type ToolLike = {
  type?: unknown;
  name?: unknown;
  function?: { name?: unknown } | null;
};

/**
 * Scan a request body's `tools[]` for the CCR retrieve tool name, across the
 * three shapes seen in the wild: OpenAI-nested (`{type:"function",
 * function:{name}}`), flat (`{name}`), and Claude (`{name}`). A non-array or
 * absent `tools` field means the caller advertised no tools at all → `false`.
 */
export function callerSupportsCcrRetrieve(body: Record<string, unknown>): boolean {
  const tools = body["tools"];
  if (!Array.isArray(tools)) return false;

  return tools.some((tool) => {
    const t = tool as ToolLike;
    const flatName = typeof t?.name === "string" ? t.name : undefined;
    const nestedName = typeof t?.function?.name === "string" ? t.function.name : undefined;
    return matchesCcrRetrieveToolName(flatName) || matchesCcrRetrieveToolName(nestedName);
  });
}

type MessageWithContent = {
  role?: unknown;
  content?: unknown;
};

function messageContainsSentinel(message: MessageWithContent): boolean {
  const content = message?.content;
  if (typeof content === "string") return content.includes(CCR_PROTOCOL_MARKER_SENTINEL);
  if (Array.isArray(content)) {
    return content.some(
      (part) =>
        part &&
        typeof part === "object" &&
        typeof (part as Record<string, unknown>)["text"] === "string" &&
        ((part as Record<string, unknown>)["text"] as string).includes(CCR_PROTOCOL_MARKER_SENTINEL)
    );
  }
  return false;
}

/**
 * Prepend the CCR protocol instruction as a single leading `system` message,
 * but only when:
 *  - the caller can actually reach `omniroute_ccr_retrieve` (see
 *    `callerSupportsCcrRetrieve`), and
 *  - the message history does not already carry the sentinel (idempotent —
 *    multi-turn requests replay prior messages, so without this check the
 *    note would stack once per turn).
 *
 * Otherwise returns `messages` unchanged.
 */
export function injectCcrProtocolInstruction<T extends MessageWithContent>(
  messages: T[],
  body: Record<string, unknown>
): T[] {
  if (!callerSupportsCcrRetrieve(body)) return messages;
  if (messages.some((message) => messageContainsSentinel(message))) return messages;

  const instructionMessage = {
    role: "system",
    content: CCR_PROTOCOL_INSTRUCTION,
  } as unknown as T;

  return [instructionMessage, ...messages];
}
