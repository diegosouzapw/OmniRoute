/**
 * Tests for #13388: RTK should not collapse file-content tool results.
 *
 * When a non-shell tool (read, grep, glob, edit, write) returns file content,
 * RTK's line deduplication and truncation should NOT collapse structurally
 * meaningful repeated lines (e.g. `},`, `"models": [`, `]` in JSON files).
 *
 * Before the fix, RTK applied dedup + truncation to all tool results including
 * non-shell tool outputs, silently corrupting file content.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { applyRtkCompression } from "../../open-sse/services/compression/engines/rtk/index.ts";

// A JSON file with structurally meaningful repeated lines that should NOT
// be collapsed by deduplication.
const JSONC_FILE_CONTENT = `{
  "models": [
    {
      "id": "gpt-4o",
      "name": "GPT-4o",
      "contextLength": 128000
    },
    {
      "id": "gpt-4o-mini",
      "name": "GPT-4o Mini",
      "contextLength": 128000
    },
    {
      "id": "claude-3.5-sonnet",
      "name": "Claude 3.5 Sonnet",
      "contextLength": 200000
    },
    {
      "id": "gemini-2.0-pro",
      "name": "Gemini 2.0 Pro",
      "contextLength": 1000000
    },
    {
      "id": "deepseek-r1",
      "name": "DeepSeek R1",
      "contextLength": 128000
    },
    {
      "id": "llama-3.1-405b",
      "name": "Llama 3.1 405B",
      "contextLength": 128000
    }
  ],
  "providers": [
    {
      "id": "openai",
      "name": "OpenAI",
      "models": ["gpt-4o", "gpt-4o-mini"]
    },
    {
      "id": "anthropic",
      "name": "Anthropic",
      "models": ["claude-3.5-sonnet"]
    },
    {
      "id": "google",
      "name": "Google",
      "models": ["gemini-2.0-pro"]
    },
    {
      "id": "deepseek",
      "name": "DeepSeek",
      "models": ["deepseek-r1"]
    },
    {
      "id": "meta",
      "name": "Meta",
      "models": ["llama-3.1-405b"]
    }
  ]
}`;

test("RTK should NOT dedup file content from a non-shell 'read' tool", () => {
  const body = {
    model: "codex/gpt-5",
    messages: [
      // The assistant asked to read a file
      {
        role: "assistant",
        tool_calls: [
          {
            id: "call_read_1",
            type: "function",
            function: { name: "read", arguments: '{"path": "models.json"}' },
          },
        ],
      },
      // The tool result contains the file content
      {
        role: "tool",
        tool_call_id: "call_read_1",
        content: JSONC_FILE_CONTENT,
      },
    ],
  };

  const result = applyRtkCompression(body, {
    config: {
      enabled: true,
      applyToToolResults: true,
      deduplicateThreshold: 2,
    },
  });

  // The content should NOT be compressed (or at least not have dedup markers)
  if (result.stats) {
    // Verify no dedup markers appear in the output
    const output = JSON.stringify(result.body);
    assert.ok(
      !output.includes("[line repeated"),
      "RTK should NOT insert dedup markers into file content from a non-shell tool"
    );
    assert.ok(
      !output.includes("[rtk:dropped"),
      "RTK should NOT insert drop markers into file content from a non-shell tool"
    );
  }
});

test("RTK should NOT truncate file content from a non-shell 'read' tool", () => {
  // Build a large file content that would exceed maxCharsPerResult
  const largeContent = JSONC_FILE_CONTENT.repeat(20);

  const body = {
    model: "codex/gpt-5",
    messages: [
      {
        role: "assistant",
        tool_calls: [
          {
            id: "call_read_2",
            type: "function",
            function: { name: "read", arguments: '{"path": "models.json"}' },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_read_2",
        content: largeContent,
      },
    ],
  };

  const result = applyRtkCompression(body, {
    config: {
      enabled: true,
      applyToToolResults: true,
      maxCharsPerResult: 1000, // Very low limit that would truncate file content
      maxLinesPerResult: 5,
    },
  });

  // Even if stats says something was compressed, verify the full content is preserved
  if (result.stats) {
    const output = JSON.stringify(result.body);
    assert.ok(
      output.includes('"id": "llama-3.1-405b"'),
      "RTK should NOT truncate file content — the last model entry must survive"
    );
    assert.ok(
      !output.includes("[rtk:dropped"),
      "RTK should NOT drop lines from file content of a non-shell tool"
    );
  }
});

test("RTK SHOULD still dedup and truncate shell command output", () => {
  const shellOutput = Array(50)
    .fill("npm WARN deprecated package@1.0.0: use package@2.0.0 instead")
    .join("\n");

  const body = {
    model: "codex/gpt-5",
    messages: [
      {
        role: "assistant",
        tool_calls: [
          {
            id: "call_bash_1",
            type: "function",
            function: {
              name: "bash",
              arguments: '{"command": "npm install"}',
            },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_bash_1",
        content: shellOutput,
      },
    ],
  };

  const result = applyRtkCompression(body, {
    config: {
      enabled: true,
      applyToToolResults: true,
      deduplicateThreshold: 2,
    },
  });

  // Shell output SHOULD be deduped
  assert.equal(
    result.compressed,
    true,
    "RTK should still compress shell command output via dedup"
  );
});
