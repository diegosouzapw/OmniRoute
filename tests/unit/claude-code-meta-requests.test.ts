import { test } from "node:test";
import assert from "node:assert/strict";
import { extractCommandPrefix } from "../../open-sse/utils/claudeCodeMetaRequests.ts";
import { extractFilepathsFromCommand } from "../../open-sse/utils/claudeCodeMetaRequests.ts";

test("extractCommandPrefix returns two-word prefix for known multi-verb tools", () => {
  assert.equal(extractCommandPrefix("git commit -m 'x'"), "git commit");
  assert.equal(extractCommandPrefix("npm install lodash"), "npm install");
  assert.equal(extractCommandPrefix("docker build ."), "docker build");
});

test("extractCommandPrefix returns single word for simple commands", () => {
  assert.equal(extractCommandPrefix("ls -la"), "ls");
  assert.equal(extractCommandPrefix("cat file.txt"), "cat");
});

test("extractCommandPrefix strips leading env assignments", () => {
  assert.equal(extractCommandPrefix("FOO=bar npm run build"), "npm run");
});

test("extractCommandPrefix detects command injection", () => {
  assert.equal(extractCommandPrefix("ls; rm -rf /"), "command_injection_detected");
  assert.equal(extractCommandPrefix("echo $(whoami)"), "command_injection_detected");
  assert.equal(extractCommandPrefix("cat `id`"), "command_injection_detected");
});

test("extractFilepathsFromCommand returns read files for read commands", () => {
  assert.deepEqual(extractFilepathsFromCommand("cat src/a.ts src/b.ts", ""), ["src/a.ts", "src/b.ts"]);
  assert.deepEqual(extractFilepathsFromCommand("head -n5 README.md", ""), ["README.md"]);
});

test("extractFilepathsFromCommand returns empty for listing commands", () => {
  assert.deepEqual(extractFilepathsFromCommand("ls -la src/", ""), []);
  assert.deepEqual(extractFilepathsFromCommand("find . -name '*.ts'", ""), []);
});

test("extractFilepathsFromCommand skips the grep pattern arg", () => {
  assert.deepEqual(extractFilepathsFromCommand("grep -n foo src/a.ts", ""), ["src/a.ts"]);
});

test("extractCommandPrefix stays conservative when a flag precedes the subcommand", () => {
  // -C takes a path arg; we don't parse flag-args, so fall back to the head
  // (never emit a wrong two-word prefix like "git -C" or "git /x").
  assert.equal(extractCommandPrefix("git -C /x commit"), "git");
});

test("extractFilepathsFromCommand handles grep -e pattern then file", () => {
  assert.deepEqual(extractFilepathsFromCommand("grep -e pattern a.ts", ""), ["a.ts"]);
});

test("extractFilepathsFromCommand handles grep -f patternfile then file", () => {
  assert.deepEqual(extractFilepathsFromCommand("grep -f pats.txt a.ts", ""), ["a.ts"]);
});
