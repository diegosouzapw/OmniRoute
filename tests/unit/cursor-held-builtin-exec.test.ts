/**
 * A built-in Cursor exec (Read / Shell / Write) that is bridged to a declared
 * client tool must be answered with a typed SUCCESS carrying the client's
 * output — not with a rejection.
 *
 * Rejecting it reads to the model as "my own tool did not run", so it retries
 * the same step on the next turn. That is the reported symptom: an agent
 * reading a missing file over and over and never getting to the write.
 *
 * Field numbers come from the agent.v1 schema embedded in the Cursor Agent CLI:
 *   ReadResult{success:1}  -> ReadSuccess{path:1, content:2, total_lines:3}
 *   ShellResult{success:1} -> ShellSuccess{command:1, working_directory:2,
 *                                          exit_code:3, stdout:5}
 *   WriteResult{success:1} -> WriteSuccess{path:1, lines_created:2,
 *                                          file_size:3, content_after:4}
 */
import assert from "node:assert/strict";
import test from "node:test";

import {
  encodeExecBackgroundShellSpawnRejected,
  encodeExecDeleteRejected,
  encodeExecFetchError,
  encodeExecGrepError,
  encodeExecGrepSuccess,
  encodeExecListMcpResourcesResult,
  encodeExecLsRejected,
  encodeExecLsSuccess,
  encodeExecReadRejected,
  encodeExecReadSuccess,
  encodeExecShellRejected,
  encodeExecShellStreamRejected,
  encodeExecShellSuccess,
  encodeExecWriteRejected,
  encodeExecWriteShellStdinError,
  encodeExecWriteSuccess,
} from "../../open-sse/utils/cursorAgentProtobuf.ts";
import { decodeFields } from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";

/** Unwrap connect frame -> AgentClientMessage.exec_client_message (2). */
function execClientMessage(frame: Buffer) {
  const body = frame.subarray(5);
  assert.equal(frame.readUInt32BE(1), body.length, "connect envelope length");
  const acm = decodeFields(body).find((f) => f.fieldNumber === 2);
  assert.ok(acm, "AgentClientMessage.exec_client_message");
  return decodeFields(acm.bytes);
}

function successPayload(frame: Buffer, resultField: number) {
  const ecm = execClientMessage(frame);
  const result = ecm.find((f) => f.fieldNumber === resultField);
  assert.ok(result, `ExecClientMessage field ${resultField}`);
  const success = decodeFields(result.bytes).find((f) => f.fieldNumber === 1);
  assert.ok(success, "result.success (field 1) — NOT rejected (field 2)");
  return { ecm, fields: decodeFields(success.bytes) };
}

test("read success returns the client's file contents on ReadResult.success", () => {
  const frame = encodeExecReadSuccess(4, "exec-r", "/tmp/12/snake.cpp", "line1\nline2");
  const { ecm, fields } = successPayload(frame, 7); // ECM_READ_RESULT

  assert.equal(ecm.find((f) => f.fieldNumber === 1)?.varint, 4n, "ExecClientMessage.id");
  assert.equal(ecm.find((f) => f.fieldNumber === 15)?.bytes.toString("utf8"), "exec-r");
  assert.equal(
    fields.find((f) => f.fieldNumber === 1)?.bytes.toString("utf8"),
    "/tmp/12/snake.cpp"
  );
  assert.equal(fields.find((f) => f.fieldNumber === 2)?.bytes.toString("utf8"), "line1\nline2");
  assert.equal(fields.find((f) => f.fieldNumber === 3)?.varint, 2n, "total_lines");
  assert.equal(fields.find((f) => f.fieldNumber === 4)?.varint, 11n, "file_size");
});

test("shell success carries command, working dir, exit code and stdout", () => {
  const frame = encodeExecShellSuccess(5, "exec-s", "ls -la", "/tmp/12", "total 0", 0);
  const { fields } = successPayload(frame, 2); // ECM_SHELL_RESULT

  assert.equal(fields.find((f) => f.fieldNumber === 1)?.bytes.toString("utf8"), "ls -la");
  assert.equal(fields.find((f) => f.fieldNumber === 2)?.bytes.toString("utf8"), "/tmp/12");
  assert.equal(fields.find((f) => f.fieldNumber === 3)?.varint, 0n, "exit_code");
  assert.equal(fields.find((f) => f.fieldNumber === 5)?.bytes.toString("utf8"), "total 0");
});

test("write success reports the path and the number of lines written", () => {
  const content = "first line\nsecond line";
  const frame = encodeExecWriteSuccess(6, "exec-w", "/tmp/12/snake.cpp", content, true);
  const { fields } = successPayload(frame, 3); // ECM_WRITE_RESULT

  assert.equal(
    fields.find((f) => f.fieldNumber === 1)?.bytes.toString("utf8"),
    "/tmp/12/snake.cpp"
  );
  assert.equal(fields.find((f) => f.fieldNumber === 2)?.varint, 2n, "lines_created");
  assert.equal(fields.find((f) => f.fieldNumber === 3)?.varint, BigInt(content.length));
  assert.equal(fields.find((f) => f.fieldNumber === 4)?.bytes.toString(), content);
});

test("WriteSuccess only returns file content when Cursor asked to read it back", () => {
  const { fields } = successPayload(encodeExecWriteSuccess(6, "exec-w", "/tmp/file", "text"), 3);
  assert.equal(
    fields.some((field) => field.fieldNumber === 4),
    false
  );
});

test("an empty read result still encodes a success, never a rejection", () => {
  // "File not found" is a legitimate answer from the client: the model must see
  // the exec as completed, otherwise it retries the read forever.
  const frame = encodeExecReadSuccess(7, "exec-r2", "/missing", "");
  const { fields } = successPayload(frame, 7);
  assert.equal(fields.find((f) => f.fieldNumber === 2)?.bytes.toString("utf8"), "");
  assert.equal(fields.find((f) => f.fieldNumber === 3)?.varint, 0n, "total_lines of empty output");
});

test("grep file search uses GrepUnionResult.files under the workspace map", () => {
  const frame = encodeExecGrepSuccess(8, "exec-g", "", "/tmp/project", "/tmp/project/snake.c\n");
  const { fields } = successPayload(frame, 5);
  assert.equal(
    fields.find((field) => field.fieldNumber === 3)?.bytes.toString(),
    "files_with_matches"
  );
  const entry = fields.find((field) => field.fieldNumber === 4);
  assert.ok(entry);
  const map = decodeFields(entry.bytes);
  assert.equal(map.find((field) => field.fieldNumber === 1)?.bytes.toString(), "/tmp/project");
  const union = decodeFields(map.find((field) => field.fieldNumber === 2)!.bytes);
  const files = union.find((field) => field.fieldNumber === 2);
  assert.ok(files, "GrepUnionResult.files (field 2)");
  assert.equal(
    decodeFields(files.bytes)
      .find((field) => field.fieldNumber === 1)
      ?.bytes.toString(),
    "/tmp/project/snake.c"
  );
});

test("grep success preserves opencode's grouped matches and line numbers", () => {
  const frame = encodeExecGrepSuccess(
    10,
    "exec-grep",
    "cursor_probe_alpha",
    "/tmp/project",
    "Found 2 matches\n/tmp/project/grep-fixture.txt:\n  Line 1: cursor_probe_alpha: first\n\n  Line 3: cursor_probe_alpha: second\n"
  );
  const { fields } = successPayload(frame, 5);
  const map = decodeFields(fields.find((field) => field.fieldNumber === 4)!.bytes);
  const union = decodeFields(map.find((field) => field.fieldNumber === 2)!.bytes);
  const content = decodeFields(union.find((field) => field.fieldNumber === 3)!.bytes);
  const matches = content.filter((field) => field.fieldNumber === 1);
  assert.equal(matches.length, 1, "one GrepFileMatch per file, not per output line");
  const file = decodeFields(matches[0].bytes);
  assert.equal(
    file.find((field) => field.fieldNumber === 1)?.bytes.toString(),
    "/tmp/project/grep-fixture.txt"
  );
  const lines = file
    .filter((field) => field.fieldNumber === 2)
    .map((field) => decodeFields(field.bytes));
  assert.deepEqual(
    lines.map((fields) => fields.find((field) => field.fieldNumber === 1)?.varint),
    [1n, 3n]
  );
  assert.deepEqual(
    lines.map((fields) => fields.find((field) => field.fieldNumber === 2)?.bytes.toString()),
    ["cursor_probe_alpha: first", "cursor_probe_alpha: second"]
  );
});

test("grep success does not turn no-match and summary text into fake matches", () => {
  const frame = encodeExecGrepSuccess(
    11,
    "exec-empty",
    "absent",
    "/tmp/project",
    "No matches found"
  );
  const { fields } = successPayload(frame, 5);
  const entry = decodeFields(fields.find((field) => field.fieldNumber === 4)!.bytes);
  const union = decodeFields(entry.find((field) => field.fieldNumber === 2)!.bytes);
  const content = decodeFields(union.find((field) => field.fieldNumber === 3)!.bytes);
  assert.equal(
    content.some((field) => field.fieldNumber === 1),
    false
  );
});

test("grep honors files_with_matches even when a search pattern is present", () => {
  const frame = encodeExecGrepSuccess(
    12,
    "exec-files",
    "cursor_probe_alpha",
    "/tmp/project",
    "Found 2 matches\n/tmp/project/grep-fixture.txt:\n  Line 1: cursor_probe_alpha\n",
    "files_with_matches"
  );
  const { fields } = successPayload(frame, 5);
  assert.equal(
    fields.find((field) => field.fieldNumber === 3)?.bytes.toString(),
    "files_with_matches"
  );
  const entry = decodeFields(fields.find((field) => field.fieldNumber === 4)!.bytes);
  const union = decodeFields(entry.find((field) => field.fieldNumber === 2)!.bytes);
  const files = decodeFields(union.find((field) => field.fieldNumber === 2)!.bytes);
  assert.equal(
    files.find((field) => field.fieldNumber === 1)?.bytes.toString(),
    "/tmp/project/grep-fixture.txt"
  );
});

test("grep count mode reports per-file and total matches from client content", () => {
  const frame = encodeExecGrepSuccess(
    14,
    "exec-count",
    "cursor_probe_alpha",
    "/tmp/project",
    "Found 2 matches\n/tmp/project/fixture.txt:\n  Line 1: cursor_probe_alpha\n  Line 3: cursor_probe_alpha\n",
    "count"
  );
  const { fields } = successPayload(frame, 5);
  assert.equal(fields.find((field) => field.fieldNumber === 3)?.bytes.toString(), "count");
  const entry = decodeFields(fields.find((field) => field.fieldNumber === 4)!.bytes);
  const union = decodeFields(entry.find((field) => field.fieldNumber === 2)!.bytes);
  const count = decodeFields(union.find((field) => field.fieldNumber === 1)!.bytes);
  const file = decodeFields(count.find((field) => field.fieldNumber === 1)!.bytes);
  assert.equal(
    file.find((field) => field.fieldNumber === 1)?.bytes.toString(),
    "/tmp/project/fixture.txt"
  );
  assert.equal(file.find((field) => field.fieldNumber === 2)?.varint, 2n);
  assert.equal(count.find((field) => field.fieldNumber === 2)?.varint, 1n);
  assert.equal(count.find((field) => field.fieldNumber === 3)?.varint, 2n);
});

test("ls success encodes child files as LsFile nodes", () => {
  const frame = encodeExecLsSuccess(9, "exec-ls", "/tmp/project", "snake.c");
  const { fields } = successPayload(frame, 8);
  const root = fields.find((field) => field.fieldNumber === 1);
  assert.ok(root);
  const child = decodeFields(root.bytes).find((field) => field.fieldNumber === 3);
  assert.ok(child, "LsDirectoryTreeNode.children_files");
  assert.equal(
    decodeFields(child.bytes)
      .find((field) => field.fieldNumber === 1)
      ?.bytes.toString(),
    "snake.c"
  );
});

test("ls success uses child names from opencode's absolute glob paths", () => {
  const frame = encodeExecLsSuccess(
    13,
    "exec-ls-absolute",
    "/tmp/project",
    "/tmp/project/fixture.txt\n/tmp/project/snake.c\n"
  );
  const { fields } = successPayload(frame, 8);
  const node = decodeFields(fields.find((field) => field.fieldNumber === 1)!.bytes);
  const names = node
    .filter((field) => field.fieldNumber === 3)
    .map((field) =>
      decodeFields(field.bytes)
        .find((child) => child.fieldNumber === 1)
        ?.bytes.toString()
    );
  assert.deepEqual(names, ["fixture.txt", "snake.c"]);
});

test("exec failures use their own result oneof member from the CLI schema", () => {
  const cases: Array<{ frame: Buffer; resultField: number; rejectedField: number }> = [
    { frame: encodeExecReadRejected(1, "r", "/x", "no"), resultField: 7, rejectedField: 3 },
    { frame: encodeExecWriteRejected(1, "w", "/x", "no"), resultField: 3, rejectedField: 6 },
    { frame: encodeExecDeleteRejected(1, "d", "/x", "no"), resultField: 4, rejectedField: 6 },
    { frame: encodeExecLsRejected(1, "l", "/x", "no"), resultField: 8, rejectedField: 3 },
    {
      frame: encodeExecShellRejected(1, "s", "ls", "/tmp", "no"),
      resultField: 2,
      rejectedField: 4,
    },
    {
      frame: encodeExecBackgroundShellSpawnRejected(1, "b", "ls", "/tmp", "no"),
      resultField: 16,
      rejectedField: 3,
    },
    {
      frame: encodeExecShellStreamRejected(1, "ss", "ls", "/tmp", "no"),
      resultField: 14,
      rejectedField: 5,
    },
    { frame: encodeExecGrepError(1, "g", "no"), resultField: 5, rejectedField: 2 },
    {
      frame: encodeExecFetchError(1, "f", "https://example.com", "no"),
      resultField: 20,
      rejectedField: 2,
    },
    { frame: encodeExecWriteShellStdinError(1, "si", "no"), resultField: 23, rejectedField: 2 },
  ];
  for (const { frame, resultField, rejectedField } of cases) {
    const firstFrame = frame.subarray(0, frame.readUInt32BE(1) + 5);
    const ecm = execClientMessage(firstFrame);
    const result = ecm.find((field) => field.fieldNumber === resultField);
    assert.ok(result, `ExecClientMessage.${resultField}`);
    assert.deepEqual(
      decodeFields(result.bytes).map((field) => field.fieldNumber),
      [rejectedField],
      `result ${resultField} must reject on member ${rejectedField}`
    );
  }
});

test("list_mcp_resources acknowledges the blocking exec on field 17", () => {
  const frame = encodeExecListMcpResourcesResult(3, "resources-3");
  const { ecm } = successPayload(frame, 17);
  assert.equal(ecm.find((field) => field.fieldNumber === 15)?.bytes.toString(), "resources-3");
});
