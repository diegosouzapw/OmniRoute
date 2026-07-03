import assert from "node:assert/strict";
import { test } from "node:test";

import { checkIssueAgentPrerequisites } from "../../../../src/lib/issueAgent/prerequisites.ts";

test("prerequisite checker reports missing git and gh via injected runner", async () => {
  const calls: Array<{ command: string; args: string[] }> = [];

  const result = await checkIssueAgentPrerequisites(async (command, args) => {
    calls.push({ command, args });
    return { exitCode: command === "git" ? 0 : 127 };
  });

  assert.deepEqual(calls, [
    { command: "git", args: ["--version"] },
    { command: "gh", args: ["--version"] },
  ]);
  assert.deepEqual(result, {
    ok: false,
    missing: ["gh"],
  });
});
