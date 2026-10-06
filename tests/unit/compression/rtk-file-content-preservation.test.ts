/**
 * Tests for #13388: RTK should not collapse file-content tool results.
 *
 * When a non-shell tool (read, grep, glob, edit, write) returns file content,
 * RTK's line deduplication should NOT collapse structurally meaningful repeated
 * lines (e.g. `},`, `"models": [`, `]` in JSON files) — that is what corrupts
 * structured content.
 *
 * The generic line/char truncation cap (#4559) is a separate concern: it stays
 * in effect for non-shell results that are not document-like reads (e.g. large
 * grep/glob output), so those outputs can still be bounded. Only document-like
 * reads (see `isDocumentLikeRead`) are exempt from truncation, same as before
 * #13388.
 *
 * Before the fix, RTK applied dedup to all tool results including non-shell
 * tool outputs, silently corrupting file content.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { applyRtkCompression } from "../../../open-sse/services/compression/engines/rtk/index.ts";

// A JSON file with structurally meaningful repeated lines that should NOT
// be collapsed by deduplication.
const JSONC_FILE_CONTENT = `{
  "models": [
    {
      "id": "gpt-4o",
      "name": "GPT-4o",
      "contextLength": 128000
    }
  ],
  // Consecutive identical lines whose collapse silently CORRUPTS the data:
  // dropping rows changes the matrix, it does not just change formatting.
  "embeddingSeed": [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
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

  // The content must NOT carry dedup markers. This assertion runs
  // unconditionally: guarding it behind `if (result.stats)` made the whole
  // check vanish whenever the engine reported no stats, which is exactly the
  // case this test has to catch.
  {
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

// Prose/source-like content that is genuinely "document-like" per `isDocumentLikeRead`
// (no command detected, not classified as a known log/JSON/error type). A pure JSON
// blob does NOT qualify — it matches the `json-output` detector — so this fixture
// intentionally avoids a bare `{...}`/`[...]` shape.
const DOCUMENT_LIKE_SOURCE_CONTENT = `import { registerHandler } from "./registry";

export function handler1() {
  registerHandler("one", () => ({ status: "ok" }));
}

export function handler2() {
  registerHandler("two", () => ({ status: "ok" }));
}

export function handler3() {
  registerHandler("three", () => ({ status: "ok" }));
}

// FINAL_HANDLER_MARKER
export function finalHandler() {
  registerHandler("final", () => ({ status: "ok" }));
}
`;

test("RTK should NOT truncate document-like file content from a non-shell 'read' tool", () => {
  // Build a large file content that would exceed maxCharsPerResult
  const largeContent = DOCUMENT_LIKE_SOURCE_CONTENT.repeat(20);

  const body = {
    model: "codex/gpt-5",
    messages: [
      {
        role: "assistant",
        tool_calls: [
          {
            id: "call_read_2",
            type: "function",
            function: { name: "read", arguments: '{"path": "handlers.ts"}' },
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

  // Runs unconditionally on purpose: a `if (result.stats)` guard here silently
  // skipped the whole check whenever the engine reported no stats.
  {
    const output = JSON.stringify(result.body);
    assert.ok(
      output.includes("FINAL_HANDLER_MARKER"),
      "RTK should NOT truncate file content — the tail of the file must survive"
    );
    assert.ok(
      !output.includes("[rtk:dropped"),
      "RTK should NOT drop lines from file content of a non-shell tool"
    );
  }
});

test("RTK SHOULD still truncate large non-shell grep output (not a document-like read)", () => {
  // #13388 only exempts dedup for non-shell tools; the generic truncation cap
  // must still apply to non-document-like output such as grep results, or a
  // large enough match list could blow the context budget unbounded.
  const grepOutput = Array.from(
    { length: 500 },
    (_, i) => `src/file${i}.ts:${i}: match line ${i}`
  ).join("\n");

  const body = {
    model: "codex/gpt-5",
    messages: [
      {
        role: "assistant",
        tool_calls: [
          {
            id: "call_grep_1",
            type: "function",
            function: { name: "grep", arguments: '{"pattern": "match"}' },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_grep_1",
        content: grepOutput,
      },
    ],
  };

  const result = applyRtkCompression(body, {
    config: {
      enabled: true,
      applyToToolResults: true,
      maxCharsPerResult: 1000,
      maxLinesPerResult: 20,
    },
  });

  assert.equal(result.compressed, true, "RTK should still truncate large grep output");
  const output = JSON.stringify(result.body);
  assert.ok(
    !output.includes("src/file250.ts:250:"),
    "A middle grep match should be dropped by the generic truncation cap"
  );
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
  assert.equal(result.compressed, true, "RTK should still compress shell command output via dedup");
});
