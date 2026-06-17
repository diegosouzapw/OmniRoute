import { test } from "node:test";
import assert from "node:assert/strict";
import { extractCommandPrefix } from "../../open-sse/utils/claudeCodeMetaRequests.ts";

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
