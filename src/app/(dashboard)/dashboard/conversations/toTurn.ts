import type { NormalizedBlock, NormalizedTurn } from "@/mitm/inspector/types";

export interface ConversationTurn {
  seq: number;
  id: string;
  parentId: string | null;
  role: string;
  textPreview: string;
  blockKind: string;
  toolName: string | null;
  firstSeenAt: string;
}

/**
 * Builds the exact NormalizedBlock (src/mitm/inspector/types.ts) the
 * request-detail panel already builds from buildRequestTurns/
 * buildResponseTurns, so a tool call/result renders through the very same
 * ChatBubble → MessageContent → ToolCallBlock/ToolResultBlock pipeline as
 * the detail view — not a parallel implementation. `textPreview` round-
 * tripped through JSON for a structured tool_use/tool_result turn; parse it
 * best-effort so the block gets a real object, not a JSON string.
 *
 * Kept out of page.tsx (a "use client" component that pulls in ChatBubble/
 * MarkdownMessage's dependency tree) so this pure ConversationTurn ->
 * NormalizedTurn mapping stays unit-testable on its own.
 */
export function toTurn(node: ConversationTurn): NormalizedTurn {
  const role: NormalizedTurn["role"] =
    node.role === "system" || node.role === "user" || node.role === "assistant"
      ? node.role
      : "tool";

  let block: NormalizedBlock;
  if (node.blockKind === "tool_use") {
    let input: unknown = node.textPreview;
    try {
      input = JSON.parse(node.textPreview);
    } catch {
      // Arguments weren't valid JSON — show the raw string.
    }
    block = { type: "tool_use", id: node.id.slice(0, 12), name: node.toolName ?? "tool", input };
  } else if (node.blockKind === "tool_result") {
    let content: unknown = node.textPreview;
    try {
      content = JSON.parse(node.textPreview);
    } catch {
      // Not JSON — show the raw string.
    }
    block = { type: "tool_result", tool_use_id: node.id.slice(0, 12), content };
  } else if (!node.textPreview) {
    // The tree API records a node's identity (role/blockKind) the moment
    // the turn is recorded, independent of when its display content
    // resolves from the owning call-log artifact -- a request still in
    // flight has a real node (any role: user, assistant, or tool) with
    // nothing to show yet, and /api/conversations/[id]/tree's own
    // blockKind ?? "text" fallback can't tell that apart from a
    // permanently-purged artifact. Live traffic shows this lag hits every
    // role, not just tool nodes (a user/assistant turn's own textPreview
    // resolves through the same lazy pipeline) -- so any empty text node
    // gets the same treatment. In practice this is near-always transient:
    // the same poll that already refreshes this page (ConversationLogView's
    // activeCallLogId-driven effect) picks up the real content within a
    // tick or two once the artifact lands. Show that instead of a bare
    // "(empty)" that reads as broken rather than in progress.
    block = { type: "pending" };
  } else {
    block = { type: "text", text: node.textPreview || "_(empty)_" };
  }

  return { role, blocks: [block], timestamp: node.firstSeenAt };
}
