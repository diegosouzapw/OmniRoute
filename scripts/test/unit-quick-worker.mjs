import fs from "node:fs";
import path from "node:path";
import { run } from "node:test";
import { spec } from "node:test/reporters";
import { pipeline } from "node:stream/promises";

// This process owns one phase's scheduler. Loaders run only in its isolated
// test children, keeping the scheduler out of the tests' module and DB state.
const { phase, report, ...options } = JSON.parse(fs.readFileSync(0, "utf8"));
const selectedFiles = new Set(options.files.map((file) => path.resolve(file)));
const reportedFiles = new Set();
const completions = new Map();
const relativeFile = (file) => path.relative(process.cwd(), file).split(path.sep).join("/");
function recordCompletion(event, success) {
  if (!report || event.nesting !== 0 || typeof event.name !== "string") return;
  const file = path.resolve(event.file || event.name);
  // Match Node's synthetic file completion, not an individual test description.
  if (selectedFiles.has(file) && path.resolve(event.name) === file) {
    completions.set(file, { duration_ms: event.details.duration_ms, success });
  }
}
const stream = run(options).on("test:summary", (summary) => {
  if (!summary.success) process.exitCode = 1;
  if (report) {
    if (summary.file) reportedFiles.add(path.resolve(summary.file));
    fs.appendFileSync(
      report,
      `${JSON.stringify({
        type: summary.file ? "file" : "phase",
        phase,
        file: summary.file ? relativeFile(summary.file) : undefined,
        duration_ms: summary.duration_ms,
        counts: summary.counts,
        success: summary.success,
      })}\n`
    );
  }
});
stream.on("test:pass", (event) => recordCompletion(event, true));
stream.on("test:fail", (event) => recordCompletion(event, false));
// Only test children force-exit after completion. Let the scheduler drain the
// reporter, including buffered failure output, before its natural exit.
await pipeline(stream.compose(spec), process.stdout);
// Node omits summary.file for some executable scripts. Preserve their observed
// completion without inventing per-file assertion counts.
if (report) {
  for (const [file, completion] of completions) {
    if (reportedFiles.has(file)) continue;
    fs.appendFileSync(
      report,
      `${JSON.stringify({
        type: "file",
        phase,
        file: relativeFile(file),
        ...completion,
        counts: null,
        source: "completion",
      })}\n`
    );
  }
}
