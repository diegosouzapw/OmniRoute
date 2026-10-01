import {
  encodeExecReadRejected,
  encodeExecWriteRejected,
  encodeExecDeleteRejected,
  encodeExecLsRejected,
  encodeExecShellRejected,
  encodeExecShellStreamRejected,
  encodeExecBackgroundShellSpawnRejected,
  encodeExecGrepError,
  encodeExecFetchError,
  encodeExecWriteShellStdinError,
  encodeExecDiagnosticsResult,
  ECM_MINI_SWE_BASH_RESULT,
  type ExecServerEvent,
} from "../../utils/cursorAgentProtobuf.ts";
import {
  encodeExtraExecResult,
  isExtraExecEvent,
} from "../../utils/cursorAgentProtobuf/extraExec.ts";
import { encodePiExecResult, isPiExecEvent } from "../../utils/cursorAgentProtobuf/pi.ts";

const BUILTIN_TOOL_REJECT_REASON =
  "Tool not available in this environment. Use the MCP tools provided instead.";

export function buildExecRejection(event: ExecServerEvent): Buffer | null {
  if (isExtraExecEvent(event)) {
    return encodeExtraExecResult(event);
  }
  if (isPiExecEvent(event)) {
    return encodePiExecResult(event, BUILTIN_TOOL_REJECT_REASON, true);
  }
  switch (event.kind) {
    case "exec_request_context":
    case "exec_mcp":
    // Answered on the dedicated mcp_state path, not by a rejection.
    case "exec_unknown":
    case "exec_list_mcp_resources":
    case "exec_mcp_state":
      return null;
    case "exec_read":
      return encodeExecReadRejected(
        event.execMsgId,
        event.execId,
        event.path,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_write":
      return encodeExecWriteRejected(
        event.execMsgId,
        event.execId,
        event.path,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_delete":
      return encodeExecDeleteRejected(
        event.execMsgId,
        event.execId,
        event.path,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_ls":
      return encodeExecLsRejected(
        event.execMsgId,
        event.execId,
        event.path,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_grep":
      return encodeExecGrepError(event.execMsgId, event.execId, BUILTIN_TOOL_REJECT_REASON);
    case "exec_diagnostics":
      // Diagnostics has no rejection variant — return an empty success.
      return encodeExecDiagnosticsResult(event.execMsgId, event.execId);
    case "exec_shell_stream":
      // Stream execs are rejected as a terminal ShellStream event on field 14.
      return encodeExecShellStreamRejected(
        event.execMsgId,
        event.execId,
        event.command,
        event.workingDir,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_shell":
      return encodeExecShellRejected(
        event.execMsgId,
        event.execId,
        event.command,
        event.workingDir,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_mini_swe_bash":
      return encodeExecShellRejected(
        event.execMsgId,
        event.execId,
        event.command,
        event.workingDir,
        BUILTIN_TOOL_REJECT_REASON,
        ECM_MINI_SWE_BASH_RESULT
      );
    case "exec_bg_shell":
      return encodeExecBackgroundShellSpawnRejected(
        event.execMsgId,
        event.execId,
        event.command,
        event.workingDir,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_fetch":
      return encodeExecFetchError(
        event.execMsgId,
        event.execId,
        event.url,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_write_shell_stdin":
      return encodeExecWriteShellStdinError(
        event.execMsgId,
        event.execId,
        BUILTIN_TOOL_REJECT_REASON
      );
  }
}
