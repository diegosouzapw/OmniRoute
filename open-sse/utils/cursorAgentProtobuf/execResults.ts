import { encodeBoolField, encodeMessage, encodeString, encodeUInt32Field } from "./wire.ts";

export const ECM_MINI_SWE_BASH_RESULT = 55; // ExecClientMessage.mini_swe_agent_bash_result

function wrapResultFrame(payload: Buffer): Buffer {
  const header = Buffer.alloc(5);
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}

const ACM_EXEC_CLIENT_MESSAGE = 2; // AgentClientMessage.exec_client_message
const ECM_ID = 1; // ExecClientMessage.id
const ECM_EXEC_ID = 15; // ExecClientMessage.exec_id
const ACM_EXEC_CLIENT_CONTROL = 5;
const ECCM_STREAM_CLOSE = 1; // ExecClientControlMessage.stream_close
const ECSC_ID = 1; // ExecClientStreamClose.id
const ECM_SHELL_RESULT = 2;
const ECM_SHELL_STREAM = 14; // ExecClientMessage.shell_stream
const ECM_WRITE_RESULT = 3;
const ECM_DELETE_RESULT = 4;
const ECM_GREP_RESULT = 5;
const ECM_READ_RESULT = 7;
const ECM_LS_RESULT = 8;
const ECM_DIAGNOSTICS_RESULT = 9;
const ECM_MCP_RESULT = 11;
const ECM_LIST_MCP_RESOURCES_RESULT = 17; // ExecClientMessage.list_mcp_resources_exec_result
const ECM_BACKGROUND_SHELL_SPAWN_RES = 16;
const ECM_FETCH_RESULT = 20;
const ECM_WRITE_SHELL_STDIN_RESULT = 23;
const REJ_PATH = 1;
const REJ_REASON = 2;
const SREJ_COMMAND = 1;
const SREJ_WORKING_DIR = 2;
const SREJ_REASON = 3;
const ERR_MESSAGE = 1; // GrepError.error / WriteShellStdinError.error
const FERR_URL = 1; // FetchError.url
const FERR_ERROR = 2; // FetchError.error
const RES_REJECTED_READ = 3;
const RES_REJECTED_LS = 3;
const RES_REJECTED_WRITE = 6;
const RES_REJECTED_DELETE = 6;
const RES_REJECTED_SHELL = 4;
const RES_REJECTED_BG_SHELL = 3;
const RES_REJECTED_SHELL_STREAM = 5; // ShellStream.rejected — terminal event
const RES_ERROR = 2; // grep / fetch / write_shell_stdin`s only failure member
const RES_SUCCESS = 1; // ReadResult.success / ShellResult.success / WriteResult.success
const READ_SUCCESS_PATH = 1; // ReadSuccess.path
const READ_SUCCESS_CONTENT = 2; // ReadSuccess.content
const READ_SUCCESS_TOTAL_LINES = 3; // ReadSuccess.total_lines
const READ_SUCCESS_FILE_SIZE = 4; // ReadSuccess.file_size
const SHELL_STREAM_STDOUT = 1; // ShellStream.stdout
const SHELL_STREAM_EXIT = 3; // ShellStream.exit
const SHELL_STREAM_START = 4; // ShellStream.start
const SHELL_STREAM_STDOUT_DATA = 1; // ShellStreamStdout.data
const SHELL_STREAM_EXIT_CODE = 1; // ShellStreamExit.code
const SHELL_STREAM_EXIT_CWD = 2; // ShellStreamExit.cwd
const SHELL_SUCCESS_COMMAND = 1; // ShellSuccess.command
const SHELL_SUCCESS_WORKING_DIR = 2; // ShellSuccess.working_directory
const SHELL_SUCCESS_EXIT_CODE = 3; // ShellSuccess.exit_code
const SHELL_SUCCESS_STDOUT = 5; // ShellSuccess.stdout
const READ_FILE_NOT_FOUND = 4; // ReadResult.file_not_found
const READ_NOT_FOUND_PATH = 1; // ReadFileNotFound.path
const GREP_SUCCESS_PATTERN = 1; // GrepSuccess.pattern
const GREP_SUCCESS_PATH = 2; // GrepSuccess.path
const GREP_SUCCESS_OUTPUT_MODE = 3; // GrepSuccess.output_mode
const GREP_SUCCESS_WORKSPACE_RESULTS = 4; // GrepSuccess.workspace_results (map)
const GREP_FILE_MATCH_FILE = 1; // GrepFileMatch.file
const GREP_FILE_MATCH_MATCHES = 2; // GrepFileMatch.matches
const GREP_CONTENT_LINE_NUMBER = 1; // GrepContentMatch.line_number
const GREP_CONTENT_TEXT = 2; // GrepContentMatch.content
const LS_SUCCESS_TREE_ROOT = 1; // LsSuccess.directory_tree_root
const LS_NODE_ABS_PATH = 1; // LsDirectoryTreeNode.abs_path
const LS_NODE_CHILDREN_FILES = 3; // LsDirectoryTreeNode.children_files
const LS_NODE_PROCESSED = 4; // LsDirectoryTreeNode.children_were_processed
const LS_NODE_NUM_FILES = 6; // LsDirectoryTreeNode.num_files
const WRITE_SUCCESS_PATH = 1; // WriteSuccess.path
const WRITE_SUCCESS_LINES_CREATED = 2; // WriteSuccess.lines_created
const WRITE_SUCCESS_FILE_SIZE = 3; // WriteSuccess.file_size
const WRITE_SUCCESS_CONTENT_AFTER = 4; // WriteSuccess.file_content_after_write
const MCR_SUCCESS = 1;
const MCR_ERROR = 2;
const MCS_CONTENT = 1; // McpSuccess.content (repeated McpToolResultContentItem)
const MCS_IS_ERROR = 2;
const MCC_TEXT = 1; // McpToolResultContentItem.text (oneof) -> McpTextContent
const MTC_TEXT = 1; // McpTextContent.text
const MAP_KEY = 1;
const MAP_VALUE = 2;

/** Preserve the exec id and result member on every client reply frame. */
function wrapExecClientMessage(
  execMsgId: number,
  execId: string,
  resultFieldNumber: number,
  resultPayload: Buffer
): Buffer {
  const ecm = encodeMessage(ACM_EXEC_CLIENT_MESSAGE, [
    encodeUInt32Field(ECM_ID, execMsgId),
    encodeString(ECM_EXEC_ID, execId),
    encodeMessage(resultFieldNumber, [resultPayload]),
  ]);
  return wrapResultFrame(ecm);
}

// ─── Phase 1: built-in tool rejection encoders ─────────────────────────────
// Cursor's model invokes built-in tools (read/write/shell/grep/etc.) which we
// can't safely run inside the proxy. We respond with a typed rejection so the
// model continues without that tool — matches kaitranntt's stance and avoids
// stalling the h2 stream.

function encodePathRejection(path: string, reason: string): Buffer {
  return Buffer.concat([encodeString(REJ_PATH, path), encodeString(REJ_REASON, reason)]);
}

function encodeShellRejection(command: string, workingDir: string, reason: string): Buffer {
  return Buffer.concat([
    encodeString(SREJ_COMMAND, command),
    encodeString(SREJ_WORKING_DIR, workingDir),
    encodeString(SREJ_REASON, reason),
  ]);
}

export function encodeExecReadRejected(
  execMsgId: number,
  execId: string,
  path: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED_READ, [encodePathRejection(path, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_READ_RESULT, rejected);
}

export function encodeExecWriteRejected(
  execMsgId: number,
  execId: string,
  path: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED_WRITE, [encodePathRejection(path, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_WRITE_RESULT, rejected);
}

export function encodeExecDeleteRejected(
  execMsgId: number,
  execId: string,
  path: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED_DELETE, [encodePathRejection(path, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_DELETE_RESULT, rejected);
}

export function encodeExecLsRejected(
  execMsgId: number,
  execId: string,
  path: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED_LS, [encodePathRejection(path, reason)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_LS_RESULT, rejected);
}

export function encodeExecShellRejected(
  execMsgId: number,
  execId: string,
  command: string,
  workingDir: string,
  reason: string,
  resultField = ECM_SHELL_RESULT
): Buffer {
  const rejected = encodeMessage(RES_REJECTED_SHELL, [
    encodeShellRejection(command, workingDir, reason),
  ]);
  return wrapExecClientMessage(execMsgId, execId, resultField, rejected);
}

/**
 * A shell_stream exec is rejected as a TERMINAL STREAM EVENT
 * (ShellStream.rejected, field 5) on ExecClientMessage.shell_stream (14) —
 * not as a ShellResult on field 2. With the correct shape Cursor continues the
 * turn: the model reports the shell as unavailable and the turn ends normally
 * in seconds instead of stalling on heartbeats.
 */
export function encodeExecShellStreamRejected(
  execMsgId: number,
  execId: string,
  command: string,
  workingDir: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED_SHELL_STREAM, [
    encodeShellRejection(command, workingDir, reason),
  ]);
  const frame = wrapExecClientMessage(execMsgId, execId, ECM_SHELL_STREAM, rejected);
  const close = wrapResultFrame(
    encodeMessage(ACM_EXEC_CLIENT_CONTROL, [
      encodeMessage(ECCM_STREAM_CLOSE, [encodeUInt32Field(ECSC_ID, execMsgId)]),
    ])
  );
  return Buffer.concat([frame, close]);
}

/**
 * ListMcpResourcesExecResult{success} — the exec is blocking, and OmniRoute
 * exposes no MCP *resources* (only tools), so an empty success lets the turn
 * finish instead of waiting out the safety timeout. Reported by @QuangBlue.
 */
export function encodeExecListMcpResourcesResult(execMsgId: number, execId: string): Buffer {
  const success = encodeMessage(RES_SUCCESS, [Buffer.alloc(0)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_LIST_MCP_RESOURCES_RESULT, success);
}

export function encodeExecBackgroundShellSpawnRejected(
  execMsgId: number,
  execId: string,
  command: string,
  workingDir: string,
  reason: string
): Buffer {
  const rejected = encodeMessage(RES_REJECTED_BG_SHELL, [
    encodeShellRejection(command, workingDir, reason),
  ]);
  return wrapExecClientMessage(execMsgId, execId, ECM_BACKGROUND_SHELL_SPAWN_RES, rejected);
}

export function encodeExecGrepError(execMsgId: number, execId: string, errMsg: string): Buffer {
  const grepError = encodeString(ERR_MESSAGE, errMsg);
  const errorVariant = encodeMessage(RES_ERROR, [grepError]);
  return wrapExecClientMessage(execMsgId, execId, ECM_GREP_RESULT, errorVariant);
}

export function encodeExecFetchError(
  execMsgId: number,
  execId: string,
  url: string,
  errMsg: string
): Buffer {
  const fetchError = Buffer.concat([encodeString(FERR_URL, url), encodeString(FERR_ERROR, errMsg)]);
  const errorVariant = encodeMessage(RES_ERROR, [fetchError]);
  return wrapExecClientMessage(execMsgId, execId, ECM_FETCH_RESULT, errorVariant);
}

export function encodeExecFetchSuccess(
  execMsgId: number,
  execId: string,
  url: string,
  content: string
): Buffer {
  const success = encodeMessage(RES_SUCCESS, [
    Buffer.concat([
      encodeString(1, url),
      encodeString(2, content),
      encodeUInt32Field(3, 200),
      encodeString(4, "text/plain"),
    ]),
  ]);
  return wrapExecClientMessage(execMsgId, execId, ECM_FETCH_RESULT, success);
}

export function encodeExecWriteShellStdinError(
  execMsgId: number,
  execId: string,
  errMsg: string
): Buffer {
  const stdinError = encodeString(ERR_MESSAGE, errMsg);
  const errorVariant = encodeMessage(RES_ERROR, [stdinError]);
  return wrapExecClientMessage(execMsgId, execId, ECM_WRITE_SHELL_STDIN_RESULT, errorVariant);
}

/**
 * Real results for Cursor's built-in tools, carrying what the CLIENT produced.
 *
 * These exist because bridging a built-in exec to a declared client tool while
 * telling Cursor the exec was *rejected* makes the model believe its own tool
 * never ran: it retries the same step on the next turn, which is how an agent
 * ends up reading a missing file in a loop. Feeding the client's output back as
 * the exec's success closes the loop the way Cursor's own CLI does.
 */
export function encodeExecReadSuccess(
  execMsgId: number,
  execId: string,
  path: string,
  content: string
): Buffer {
  const success = encodeMessage(RES_SUCCESS, [
    Buffer.concat([
      encodeString(READ_SUCCESS_PATH, path),
      encodeString(READ_SUCCESS_CONTENT, content),
      encodeUInt32Field(READ_SUCCESS_TOTAL_LINES, content ? content.split("\n").length : 0),
      encodeUInt32Field(READ_SUCCESS_FILE_SIZE, Buffer.byteLength(content, "utf8")),
    ]),
  ]);
  return wrapExecClientMessage(execMsgId, execId, ECM_READ_RESULT, success);
}

/**
 * ReadResult.file_not_found — the honest answer when the client reports a
 * missing file. Returning success with the literal text "File not found: …" as
 * the file's CONTENT is what kept the model re-reading: it saw a file that
 * exists yet holds nonsense, instead of a file that is simply absent.
 */
export function encodeExecReadFileNotFound(
  execMsgId: number,
  execId: string,
  path: string
): Buffer {
  const notFound = encodeMessage(READ_FILE_NOT_FOUND, [encodeString(READ_NOT_FOUND_PATH, path)]);
  return wrapExecClientMessage(execMsgId, execId, ECM_READ_RESULT, notFound);
}

/**
 * Heuristic used to map a client tool's textual answer onto the typed variant.
 * Deliberately narrow: only the unambiguous "missing file" phrasings that
 * agent harnesses emit (opencode: "File not found: <path>", POSIX: ENOENT).
 */
export function looksLikeFileNotFound(content: string): boolean {
  const head = content.slice(0, 200).toLowerCase();
  return (
    head.startsWith("file not found") ||
    head.includes("enoent") ||
    head.includes("no such file or directory")
  );
}

/**
 * GrepResult.success — workspace_results is a map<path, GrepUnionResult>.
 *
 * OpenCode's grep prints `Found N matches`, then `path:` sections containing
 * `Line N: text`. Raw ripgrep uses `path:line:text`. Only recognized matches
 * are encoded; a summary is never fabricated into a match at line zero.
 */
export function encodeExecGrepSuccess(
  execMsgId: number,
  execId: string,
  pattern: string,
  path: string,
  output: string,
  outputMode?: string
): Buffer {
  const byFile = new Map<string, Array<{ line: number; text: string }>>();
  const fileSearch = outputMode ? outputMode === "files_with_matches" : !pattern.trim();
  const mode = outputMode || (fileSearch ? "files_with_matches" : "content");
  if (mode !== "files_with_matches" && mode !== "content" && mode !== "count") {
    return encodeExecGrepError(execMsgId, execId, "Unsupported grep output mode");
  }
  const lineNumber = (value: string): number | null => {
    if (!value || value.length > 10) return null;
    for (const char of value) if (char < "0" || char > "9") return null;
    const n = Number(value);
    return Number.isSafeInteger(n) && n <= 0xffffffff ? n : null;
  };
  let currentFile = "";
  let recognized = false;
  for (const raw of output.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("Found ") || line === "No matches found" || line === "No files found") {
      recognized = true;
      continue;
    }
    if (line.startsWith("Line ") && currentFile) {
      const colon = line.indexOf(":", 5);
      const number = colon < 0 ? null : lineNumber(line.slice(5, colon));
      if (number !== null) {
        byFile.get(currentFile)?.push({ line: number, text: line.slice(colon + 1).trimStart() });
        recognized = true;
        continue;
      }
    }
    if (line.endsWith(":") && !line.startsWith("Line ")) {
      currentFile = line.slice(0, -1);
      if (!byFile.has(currentFile)) byFile.set(currentFile, []);
      recognized = true;
      continue;
    }
    // Raw ripgrep's path:line:text, including paths with a Windows drive colon.
    for (let colon = line.indexOf(":"); colon >= 0; colon = line.indexOf(":", colon + 1)) {
      const next = line.indexOf(":", colon + 1);
      if (next < 0) break;
      const number = lineNumber(line.slice(colon + 1, next));
      if (number === null || !line.slice(0, colon)) continue;
      const file = line.slice(0, colon);
      const matches = byFile.get(file) ?? [];
      matches.push({ line: number, text: line.slice(next + 1) });
      byFile.set(file, matches);
      recognized = true;
      break;
    }
    if (fileSearch && (line.startsWith("/") || !line.includes(" "))) {
      byFile.set(line, []);
      recognized = true;
    }
  }
  if (output.trim() && !recognized) {
    return encodeExecGrepError(execMsgId, execId, "Unrecognized grep result format");
  }

  const files = [...byFile.keys()];
  const matchedFiles = [...byFile.entries()].filter(([, matches]) => matches.length > 0);
  const totalMatches = matchedFiles.reduce((sum, [, matches]) => sum + matches.length, 0);
  const union = fileSearch
    ? encodeMessage(2, [
        Buffer.concat([
          ...files.map((file) => encodeString(1, file)),
          encodeUInt32Field(2, files.length),
        ]),
      ]) // GrepUnionResult.files -> GrepFilesResult
    : mode === "count"
      ? encodeMessage(1, [
          Buffer.concat([
            ...matchedFiles.map(([file, matches]) =>
              encodeMessage(1, [
                Buffer.concat([encodeString(1, file), encodeUInt32Field(2, matches.length)]),
              ])
            ),
            encodeUInt32Field(2, matchedFiles.length),
            encodeUInt32Field(3, totalMatches),
          ]),
        ]) // GrepUnionResult.count -> GrepCountResult
      : encodeMessage(3, [
          Buffer.concat([
            ...matchedFiles.map(([file, matches]) =>
              encodeMessage(1, [
                Buffer.concat([
                  encodeString(GREP_FILE_MATCH_FILE, file),
                  ...matches.map((m) =>
                    encodeMessage(GREP_FILE_MATCH_MATCHES, [
                      Buffer.concat([
                        encodeUInt32Field(GREP_CONTENT_LINE_NUMBER, m.line),
                        encodeString(GREP_CONTENT_TEXT, m.text),
                      ]),
                    ])
                  ),
                ]),
              ])
            ),
            encodeUInt32Field(3, totalMatches),
          ]),
        ]); // GrepUnionResult.content -> GrepContentResult
  const workspaceResult = encodeMessage(GREP_SUCCESS_WORKSPACE_RESULTS, [
    Buffer.concat([
      encodeString(MAP_KEY, path || files[0]?.slice(0, files[0].lastIndexOf("/")) || ""),
      encodeMessage(MAP_VALUE, [union]),
    ]),
  ]);

  const success = encodeMessage(RES_SUCCESS, [
    Buffer.concat([
      encodeString(GREP_SUCCESS_PATTERN, pattern),
      encodeString(GREP_SUCCESS_PATH, path),
      encodeString(GREP_SUCCESS_OUTPUT_MODE, mode),
      workspaceResult,
    ]),
  ]);
  return wrapExecClientMessage(execMsgId, execId, ECM_GREP_RESULT, success);
}

/** LsResult.success — the client's listing as a one-level directory tree. */
export function encodeExecLsSuccess(
  execMsgId: number,
  execId: string,
  path: string,
  output: string
): Buffer {
  const files = output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("Found ") && line !== "No files found")
    .map((line) => line.slice(Math.max(line.lastIndexOf("/"), line.lastIndexOf("\\")) + 1))
    .filter(Boolean);

  const node = Buffer.concat([
    encodeString(LS_NODE_ABS_PATH, path),
    ...files.map((file) => encodeMessage(LS_NODE_CHILDREN_FILES, [encodeString(1, file)])),
    encodeBoolField(LS_NODE_PROCESSED, true),
    encodeUInt32Field(LS_NODE_NUM_FILES, files.length),
  ]);
  const success = encodeMessage(RES_SUCCESS, [encodeMessage(LS_SUCCESS_TREE_ROOT, [node])]);
  return wrapExecClientMessage(execMsgId, execId, ECM_LS_RESULT, success);
}

export function encodeExecShellSuccess(
  execMsgId: number,
  execId: string,
  command: string,
  workingDir: string,
  stdout: string,
  exitCode = 0,
  resultField = ECM_SHELL_RESULT
): Buffer {
  const success = encodeMessage(RES_SUCCESS, [
    Buffer.concat([
      encodeString(SHELL_SUCCESS_COMMAND, command),
      encodeString(SHELL_SUCCESS_WORKING_DIR, workingDir),
      encodeUInt32Field(SHELL_SUCCESS_EXIT_CODE, exitCode),
      encodeString(SHELL_SUCCESS_STDOUT, stdout),
    ]),
  ]);
  return wrapExecClientMessage(execMsgId, execId, resultField, success);
}

/**
 * Answer a shell_stream exec with the streaming protocol Cursor expects:
 * an empty `start`, the captured output as `stdout`, then `exit`.
 *
 * Emitted as three ExecClientMessage frames on field 14 (shell_stream) — the
 * same exec id on each, which is how the CLI reports a completed command.
 */
export function encodeExecShellStreamResult(
  execMsgId: number,
  execId: string,
  stdout: string,
  workingDir: string,
  exitCode = 0
): Buffer {
  const frame = (payload: Buffer) =>
    wrapExecClientMessage(execMsgId, execId, ECM_SHELL_STREAM, payload);

  const start = encodeMessage(SHELL_STREAM_START, [Buffer.alloc(0)]);
  const out = encodeMessage(SHELL_STREAM_STDOUT, [encodeString(SHELL_STREAM_STDOUT_DATA, stdout)]);
  const exit = encodeMessage(SHELL_STREAM_EXIT, [
    Buffer.concat([
      encodeUInt32Field(SHELL_STREAM_EXIT_CODE, exitCode),
      encodeString(SHELL_STREAM_EXIT_CWD, workingDir),
    ]),
  ]);

  // ExecClientControlMessage.stream_close — mandatory terminator for a
  // streaming exec (AgentClientMessage field 5, not the exec_client_message
  // channel). Cursor waits for it before moving the turn forward.
  const close = wrapResultFrame(
    encodeMessage(ACM_EXEC_CLIENT_CONTROL, [
      encodeMessage(ECCM_STREAM_CLOSE, [encodeUInt32Field(ECSC_ID, execMsgId)]),
    ])
  );

  return Buffer.concat([frame(start), frame(out), frame(exit), close]);
}

export function encodeExecWriteSuccess(
  execMsgId: number,
  execId: string,
  path: string,
  fileText: string,
  returnFileContentAfterWrite = false
): Buffer {
  // Only echo the requested text when Cursor explicitly asks for read-back.
  const byteLength = Buffer.byteLength(fileText, "utf8");
  const success = encodeMessage(RES_SUCCESS, [
    Buffer.concat([
      encodeString(WRITE_SUCCESS_PATH, path),
      encodeUInt32Field(WRITE_SUCCESS_LINES_CREATED, fileText ? fileText.split("\n").length : 0),
      encodeUInt32Field(WRITE_SUCCESS_FILE_SIZE, byteLength),
      ...(returnFileContentAfterWrite ? [encodeString(WRITE_SUCCESS_CONTENT_AFTER, fileText)] : []),
    ]),
  ]);
  return wrapExecClientMessage(execMsgId, execId, ECM_WRITE_RESULT, success);
}

export function encodeExecWriteError(execMsgId: number, execId: string, path: string): Buffer {
  const error = encodeMessage(5, [
    encodeString(1, path),
    encodeString(2, "Client write failed. Read the file and use Edit for existing content."),
  ]);
  return wrapExecClientMessage(execMsgId, execId, ECM_WRITE_RESULT, error);
}

export function encodeExecDiagnosticsResult(execMsgId: number, execId: string): Buffer {
  // DiagnosticsResult is empty — there's no rejection variant.
  return wrapExecClientMessage(execMsgId, execId, ECM_DIAGNOSTICS_RESULT, Buffer.alloc(0));
}

// ─── Phase 1: MCP result encoders (used when WE invoke a tool on behalf
// of the model — Phase 5 wires this to OpenAI tool_calls). ─────────────────

export function encodeExecMcpResult(
  execMsgId: number,
  execId: string,
  content: string,
  isError: boolean
): Buffer {
  // McpTextContent { text } → McpToolResultContentItem.text
  const textContent = encodeMessage(MCC_TEXT, [encodeString(MTC_TEXT, content)]);
  const successFields: Buffer[] = [encodeMessage(MCS_CONTENT, [textContent])];
  if (isError) successFields.push(encodeBoolField(MCS_IS_ERROR, true));
  const success = encodeMessage(MCR_SUCCESS, successFields);
  return wrapExecClientMessage(execMsgId, execId, ECM_MCP_RESULT, success);
}

export function encodeExecMcpError(execMsgId: number, execId: string, errMsg: string): Buffer {
  const mcpError = encodeString(ERR_MESSAGE, errMsg);
  const errorVariant = encodeMessage(MCR_ERROR, [mcpError]);
  return wrapExecClientMessage(execMsgId, execId, ECM_MCP_RESULT, errorVariant);
}
