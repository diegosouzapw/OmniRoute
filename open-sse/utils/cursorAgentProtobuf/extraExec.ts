import {
  decodeFields,
  decodeStringField,
  decodeVarintField,
  encodeBoolField,
  encodeMessage,
  encodeString,
  encodeUInt32Field,
} from "./wire.ts";

type ExtraBase = { execMsgId: number; execId: string };

export type ExtraExecEvent = ExtraBase &
  (
    | { kind: "exec_read_mcp_resource"; uri: string }
    | { kind: "exec_record_screen" }
    | { kind: "exec_computer_use" }
    | { kind: "exec_execute_hook"; hookField: number }
    | { kind: "exec_subagent"; agentId: string }
    | { kind: "exec_redacted_read"; path: string }
    | { kind: "exec_force_background_shell" }
    | { kind: "exec_force_background_subagent" }
    | { kind: "exec_subagent_await"; agentId: string }
    | { kind: "exec_smart_mode_classifier" }
    | { kind: "exec_canvas_diagnostics"; path: string }
    | { kind: "exec_shell_allowlist_precheck" }
    | { kind: "exec_mcp_allowlist_precheck" }
    | { kind: "exec_web_fetch_allowlist_precheck" }
    | {
        kind: "exec_git_diff";
        cwd: string;
        ref: string;
        baseRef: string;
        outputFormat: number;
        targetPaths: string[];
        mergeBase: boolean;
        maxUntrackedFiles: number;
        submoduleRecurseDepth: number;
        includeSpaceChanges: boolean;
        committedOnly: boolean;
        computePatchId: boolean;
        returnHeadSha: boolean;
        hasAdvancedLimits: boolean;
      }
    | { kind: "exec_conversation_search" }
    | { kind: "exec_agent_store_conflict" }
    | { kind: "exec_adopt"; sourceAgentId: string }
  );

const EXTRA_FIELDS = [
  18, 21, 22, 27, 28, 29, 30, 31, 37, 38, 40, 41, 42, 43, 44, 53, 54, 56,
] as const;
const EXTRA_KINDS = [
  "exec_read_mcp_resource",
  "exec_record_screen",
  "exec_computer_use",
  "exec_execute_hook",
  "exec_subagent",
  "exec_redacted_read",
  "exec_force_background_shell",
  "exec_force_background_subagent",
  "exec_subagent_await",
  "exec_smart_mode_classifier",
  "exec_canvas_diagnostics",
  "exec_shell_allowlist_precheck",
  "exec_mcp_allowlist_precheck",
  "exec_web_fetch_allowlist_precheck",
  "exec_git_diff",
  "exec_conversation_search",
  "exec_agent_store_conflict",
  "exec_adopt",
] as const;

export const EXTRA_EXEC_SERVER_FIELDS = EXTRA_FIELDS;
const HOOK_VARIANTS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11]);

export function isExtraExecEvent(event: { kind: string }): event is ExtraExecEvent {
  return EXTRA_KINDS.some((kind) => kind === event.kind);
}

export function decodeExtraExecEvent(
  field: number,
  { execMsgId, execId, variantBytes }: ExtraBase & { variantBytes: Buffer }
): ExtraExecEvent {
  const base = { execMsgId, execId };
  switch (field) {
    case 18:
      return { ...base, kind: "exec_read_mcp_resource", uri: decodeStringField(variantBytes, 2) };
    case 21:
      return { ...base, kind: "exec_record_screen" };
    case 22:
      return { ...base, kind: "exec_computer_use" };
    case 27: {
      const request = decodeFields(variantBytes).find(
        (part) => part.fieldNumber === 1 && part.wireType === 2
      );
      const hookField =
        request?.wireType === 2
          ? (decodeFields(request.bytes).find(
              (part) => part.wireType === 2 && HOOK_VARIANTS.has(part.fieldNumber)
            )?.fieldNumber ?? 0)
          : 0;
      return { ...base, kind: "exec_execute_hook", hookField };
    }
    case 28:
      return { ...base, kind: "exec_subagent", agentId: decodeStringField(variantBytes, 6) };
    case 29:
      return { ...base, kind: "exec_redacted_read", path: decodeStringField(variantBytes, 1) };
    case 30:
      return { ...base, kind: "exec_force_background_shell" };
    case 31:
      return { ...base, kind: "exec_force_background_subagent" };
    case 37:
      return { ...base, kind: "exec_subagent_await", agentId: decodeStringField(variantBytes, 1) };
    case 38:
      return { ...base, kind: "exec_smart_mode_classifier" };
    case 40:
      return { ...base, kind: "exec_canvas_diagnostics", path: decodeStringField(variantBytes, 1) };
    case 41:
      return { ...base, kind: "exec_shell_allowlist_precheck" };
    case 42:
      return { ...base, kind: "exec_mcp_allowlist_precheck" };
    case 43:
      return { ...base, kind: "exec_web_fetch_allowlist_precheck" };
    case 44: {
      const fields = decodeFields(variantBytes);
      return {
        ...base,
        kind: "exec_git_diff",
        cwd: decodeStringField(variantBytes, 1),
        ref: decodeStringField(variantBytes, 2),
        baseRef: decodeStringField(variantBytes, 3),
        outputFormat: decodeVarintField(variantBytes, 8),
        targetPaths: fields.flatMap((part) =>
          part.fieldNumber === 5 && part.wireType === 2 ? [part.bytes.toString("utf8")] : []
        ),
        mergeBase: decodeVarintField(variantBytes, 4) !== 0,
        maxUntrackedFiles: decodeVarintField(variantBytes, 7),
        submoduleRecurseDepth: decodeVarintField(variantBytes, 9),
        includeSpaceChanges: decodeVarintField(variantBytes, 10) !== 0,
        committedOnly: decodeVarintField(variantBytes, 11) !== 0,
        computePatchId: decodeVarintField(variantBytes, 12) !== 0,
        returnHeadSha: decodeVarintField(variantBytes, 13) !== 0,
        hasAdvancedLimits: fields.some((part) => [6, 14, 15].includes(part.fieldNumber)),
      };
    }
    case 53:
      return { ...base, kind: "exec_conversation_search" };
    case 54:
      return { ...base, kind: "exec_agent_store_conflict" };
    case 56:
      return { ...base, kind: "exec_adopt", sourceAgentId: decodeStringField(variantBytes, 1) };
    default:
      throw new RangeError(`Unknown auxiliary exec variant ${field}`);
  }
}

/** No client resource store, desktop, history index, or permission policy is available here. */
export function encodeExtraExecResult(event: ExtraExecEvent): Buffer {
  if (event.kind === "exec_git_diff" || (event.kind === "exec_execute_hook" && !event.hookField)) {
    // GetDiffResponse has no error variant. Throwing is preferable to reporting
    // a fabricated empty working-tree diff or accepting an unknown hook.
    return encodeCursorExecThrow(
      event.execMsgId,
      "This Cursor operation is unavailable in this client"
    );
  }
  const index = EXTRA_KINDS.indexOf(event.kind);
  const field = EXTRA_FIELDS[index];
  let result: Buffer;
  switch (event.kind) {
    case "exec_read_mcp_resource":
      result = encodeMessage(4, [encodeString(1, event.uri)]);
      break;
    case "exec_record_screen":
      result = encodeMessage(4, [
        encodeString(1, "Screen recording is unavailable in this client"),
      ]);
      break;
    case "exec_computer_use":
      result = encodeMessage(2, [encodeString(1, "Computer use is unavailable in this client")]);
      break;
    case "exec_execute_hook":
      // No Cursor CLI hooks are installed in the external OpenAI tool client.
      // An empty response of the requested kind adds no permission decision.
      result = encodeMessage(1, [encodeMessage(event.hookField, [])]);
      break;
    case "exec_subagent":
      result = encodeMessage(2, [
        encodeString(1, event.agentId),
        encodeString(2, "Subagents are unavailable in this client"),
      ]);
      break;
    case "exec_force_background_shell":
    case "exec_force_background_subagent":
      // Both CLI status enums use 2 for NOT_FOUND; no background process was started.
      result = encodeUInt32Field(1, 2);
      break;
    case "exec_subagent_await":
      result = encodeMessage(3, [encodeString(1, event.agentId)]);
      break;
    case "exec_redacted_read":
      result = encodeMessage(3, [
        encodeString(1, event.path),
        encodeString(2, "Redacted file reads are unavailable in this client"),
      ]);
      break;
    case "exec_canvas_diagnostics":
      result = encodeMessage(2, [
        encodeString(1, event.path),
        encodeString(2, "Canvas diagnostics are unavailable in this client"),
      ]);
      break;
    case "exec_shell_allowlist_precheck":
    case "exec_mcp_allowlist_precheck":
    case "exec_web_fetch_allowlist_precheck":
      result = encodeBoolField(1, false);
      break;
    case "exec_adopt":
      result = Buffer.concat([
        encodeString(1, event.sourceAgentId),
        encodeString(5, "Adopting a subagent is unavailable in this client"),
      ]);
      break;
    default:
      result = encodeMessage(2, [
        encodeString(1, "This Cursor tool is unavailable in this client"),
      ]);
  }

  const payload = encodeMessage(2, [
    encodeUInt32Field(1, event.execMsgId),
    encodeString(15, event.execId),
    encodeMessage(field, [result]),
  ]);
  return frame(payload);
}

export function encodeCursorExecThrow(execMsgId: number, reason: string): Buffer {
  return frame(
    encodeMessage(5, [encodeMessage(2, [encodeUInt32Field(1, execMsgId), encodeString(2, reason)])])
  );
}

function frame(payload: Buffer): Buffer {
  const header = Buffer.alloc(5);
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}
