import { encodeBoolField, encodeMessage, encodeString, encodeUInt32Field } from "./wire.ts";
import { encodeCursorExecThrow } from "./extraExec.ts";

type Hunk = {
  content: string;
  lines: string[];
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
};
type FilePatch = { from: string; to: string; added: number; removed: number; hunks: Hunk[] };

function parseGitDiff(output: string): FilePatch[] {
  if (!output.trim() || output.trim() === "(no output)") return [];
  const files: FilePatch[] = [];
  let file: FilePatch | null = null;
  let hunk: Hunk | null = null;
  for (const line of output.split("\n")) {
    if (line.startsWith("diff --git a/")) {
      const boundary = line.indexOf(" b/", "diff --git a/".length);
      if (boundary < 0) throw new Error("Unrecognized git diff file header");
      file = {
        from: line.slice("diff --git a/".length, boundary),
        to: line.slice(boundary + " b/".length),
        added: 0,
        removed: 0,
        hunks: [],
      };
      files.push(file);
      hunk = null;
      continue;
    }
    if (!file) {
      if (line) throw new Error("Git diff has content without a file header");
      continue;
    }
    if (
      line.startsWith("Binary files ") ||
      line === "GIT binary patch" ||
      /^(?:old mode|new mode|new file mode|deleted file mode|rename from|rename to|copy from|copy to) /.test(
        line
      )
    ) {
      throw new Error("Git diff contains unsupported non-textual changes");
    }
    if (line.startsWith("--- ")) {
      const from = line.slice(4);
      file.from = from === "/dev/null" ? "" : from.startsWith("a/") ? from.slice(2) : from;
    } else if (line.startsWith("+++ ")) {
      const to = line.slice(4);
      file.to = to === "/dev/null" ? "" : to.startsWith("b/") ? to.slice(2) : to;
    } else if (line.startsWith("@@ ")) {
      const header = /^@@ -(\d{1,9})(?:,(\d{1,9}))? \+(\d{1,9})(?:,(\d{1,9}))? @@/.exec(line);
      if (!header) throw new Error("Unrecognized git diff hunk header");
      hunk = {
        content: line,
        lines: [],
        oldStart: Number(header[1]),
        oldLines: header[2] === undefined ? 1 : Number(header[2]),
        newStart: Number(header[3]),
        newLines: header[4] === undefined ? 1 : Number(header[4]),
      };
      file.hunks.push(hunk);
    } else if (hunk && (line.startsWith("+") || line.startsWith("-") || line.startsWith(" "))) {
      hunk.lines.push(line);
      hunk.content += `\n${line}`;
      if (line.startsWith("+")) file.added++;
      if (line.startsWith("-")) file.removed++;
    }
  }
  if (!files.length || files.some((entry) => !entry.hunks.length)) {
    throw new Error("Git diff did not contain a supported textual patch for every file");
  }
  return files;
}

/** GetDiffResponse -> GitDiff -> FileDiff -> Chunk (aiserver.v1/utils.proto). */
export function encodeGitDiffResult(execMsgId: number, execId: string, output: string): Buffer {
  let files: FilePatch[];
  try {
    files = parseGitDiff(output);
  } catch {
    return encodeCursorExecThrow(execMsgId, "Git diff output could not be decoded safely");
  }
  const diff = encodeMessage(1, [
    ...files.map((file) =>
      encodeMessage(1, [
        encodeString(1, file.from),
        encodeString(2, file.to),
        ...file.hunks.map((hunk) =>
          encodeMessage(3, [
            encodeString(1, hunk.content),
            ...hunk.lines.map((line) => encodeString(2, line)),
            encodeUInt32Field(3, hunk.oldStart),
            encodeUInt32Field(4, hunk.oldLines),
            encodeUInt32Field(5, hunk.newStart),
            encodeUInt32Field(6, hunk.newLines),
          ])
        ),
        encodeUInt32Field(4, file.added),
        encodeUInt32Field(5, file.removed),
      ])
    ),
    encodeUInt32Field(2, 1), // GitDiff.DIFF_TO_HEAD
  ]);
  const reply = encodeMessage(44, [diff, encodeBoolField(5, files.length > 0)]);
  const payload = encodeMessage(2, [
    encodeUInt32Field(1, execMsgId),
    encodeString(15, execId),
    reply,
  ]);
  const header = Buffer.alloc(5);
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}
