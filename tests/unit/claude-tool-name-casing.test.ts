import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  restoreClaudeToolName,
  remapToolNamesInRequest,
  remapToolNamesInResponse,
} from "../../open-sse/services/claudeCodeToolRemapper.ts";

describe("Claude tool name casing preservation (#11487)", () => {
  it("preserves native PascalCase Claude Code tool names without toolNameMap", () => {
    const tools = ["Bash", "Read", "Write", "Edit", "Grep", "Glob", "Task", "WebSearch"];
    for (const name of tools) {
      assert.equal(
        restoreClaudeToolName(name, null),
        name,
        `Expected ${name} to remain ${name} without toolNameMap`
      );
    }
  });

  it("preserves custom PascalCase / camelCase tool names without toolNameMap", () => {
    const customTools = ["MyCustomTool", "fetchDatabase", "deployToStaging"];
    for (const name of customTools) {
      assert.equal(
        restoreClaudeToolName(name, null),
        name,
        `Expected ${name} to preserve original casing`
      );
    }
  });

  it("restores mapped lowercase tools when toolNameMap was recorded from request", () => {
    const reqBody = {
      tools: [
        { name: "bash" },
        { name: "read" },
      ],
    };
    remapToolNamesInRequest(reqBody);
    const map = (reqBody as Record<string, unknown>)._toolNameMap as Map<string, string>;

    assert.equal(restoreClaudeToolName("Bash", map), "bash");
    assert.equal(restoreClaudeToolName("Read", map), "read");
  });

  it("remaps TitleCase to lowercase in response JSON when forceLowercase is true", () => {
    const responseChunk = JSON.stringify({
      choices: [
        {
          delta: {
            tool_calls: [
              { function: { name: "Bash" } },
              { function: { name: "Write" } },
            ],
          },
        },
      ],
    });
    const processed = remapToolNamesInResponse(responseChunk, true);
    const parsed = JSON.parse(processed);
    assert.equal(parsed.choices[0].delta.tool_calls[0].function.name, "bash");
    assert.equal(parsed.choices[0].delta.tool_calls[1].function.name, "write");
  });
});
