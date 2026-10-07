import test from "node:test";
import assert from "node:assert/strict";

const { splitMarkdownBoundary } =
  await import("../../open-sse/translator/helpers/markdownBoundary.ts");
const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { geminiToClaudeResponse } =
  await import("../../open-sse/translator/response/gemini-to-claude.ts");

function flatten(items: (unknown[] | null)[]) {
  return items.flatMap((item) => item || []);
}

function getTextDeltas(events: unknown[]) {
  return events
    .filter(
      (e) =>
        (e as Record<string, unknown>)?.type === "content_block_delta" &&
        ((e as Record<string, unknown>).delta as Record<string, unknown>)?.type === "text_delta"
    )
    .map(
      (e) =>
        (((e as Record<string, unknown>).delta as Record<string, unknown>).text as string) ?? ""
    );
}

// -- splitMarkdownBoundary unit cases ---------------------------------------

test("splitMarkdownBoundary: no boundary emits everything", () => {
  const { emit, hold } = splitMarkdownBoundary("Hello world");
  assert.equal(emit, "Hello world");
  assert.equal(hold, "");
});

test("splitMarkdownBoundary: defers single trailing backtick in opener context", () => {
  const { emit, hold } = splitMarkdownBoundary("Use `git");
  assert.equal(emit, "Use ");
  assert.equal(hold, "`git");
});

test("splitMarkdownBoundary: defers two trailing backticks", () => {
  const { emit, hold } = splitMarkdownBoundary("code ``");
  assert.equal(emit, "code ");
  assert.equal(hold, "``");
});

test("splitMarkdownBoundary: defers fence opener plus partial language", () => {
  const { emit, hold } = splitMarkdownBoundary("\n```p");
  assert.equal(emit, "\n");
  assert.equal(hold, "```p");
});

test("splitMarkdownBoundary: defers fence info containing CommonMark punctuation", () => {
  const { emit, hold } = splitMarkdownBoundary("\n```text/x-c");
  assert.equal(emit, "\n");
  assert.equal(hold, "```text/x-c");
});

test("splitMarkdownBoundary: emits plain triple backticks unchanged", () => {
  const { emit, hold } = splitMarkdownBoundary("code\n```");
  assert.equal(emit, "code\n```");
  assert.equal(hold, "");
});

test("splitMarkdownBoundary: defers single trailing asterisk in opener context", () => {
  const { emit, hold } = splitMarkdownBoundary("This is *");
  assert.equal(emit, "This is ");
  assert.equal(hold, "*");
});

test("splitMarkdownBoundary: does not defer closing delimiter after alphanumerics", () => {
  const { emit, hold } = splitMarkdownBoundary("code`");
  assert.equal(emit, "code`");
  assert.equal(hold, "");
});

test("splitMarkdownBoundary: does not defer a matched closing backtick after punctuation", () => {
  const text = "`(foo)`";
  const { emit, hold } = splitMarkdownBoundary(text);
  assert.equal(emit, text);
  assert.equal(hold, "");
});

test("splitMarkdownBoundary: conservatively defers an unmatched backtick after punctuation", () => {
  const { emit, hold } = splitMarkdownBoundary("(foo)`");
  assert.equal(emit, "(foo)");
  assert.equal(hold, "`");
});

test("splitMarkdownBoundary: keeps different backtick run lengths distinct", () => {
  const { emit, hold } = splitMarkdownBoundary("``(foo)`");
  assert.equal(emit, "``(foo)");
  assert.equal(hold, "`");
});

test("splitMarkdownBoundary: preserves whitespace boundaries", () => {
  const { emit, hold } = splitMarkdownBoundary("Hello, ");
  assert.equal(emit, "Hello, ");
  assert.equal(hold, "");
});

// -- OpenAI to Claude streaming boundary cases -------------------------------

function createOpenAIState() {
  return {
    toolCalls: new Map(),
    _pendingXmlToolCalls: [],
    _xmlInvokeBuffer: "",
    _markdownBuffer: "",
    _markdownCodeSpanRun: 0,
    _markdownFenceRun: 0,
  };
}

test("OpenAI to Claude: code fence language is not split across chunks", () => {
  const state = createOpenAIState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-md1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Here is code:\n\n```p" }, finish_reason: null }],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-md1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "ython\nprint(1)\n```" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 2, completion_tokens: 10, total_tokens: 12 },
    },
    state
  );
  const result = flatten([chunk1, chunk2]);
  const textDeltas = getTextDeltas(result);
  assert.deepEqual(textDeltas, ["Here is code:\n\n", "```python\nprint(1)\n```"]);
});

test("OpenAI to Claude: bold marker is not split across chunks", () => {
  const state = createOpenAIState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-md2",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "This is **" }, finish_reason: null }],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-md2",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "bold** text" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 2, completion_tokens: 5, total_tokens: 7 },
    },
    state
  );
  const result = flatten([chunk1, chunk2]);
  const textDeltas = getTextDeltas(result);
  assert.deepEqual(textDeltas, ["This is ", "**bold** text"]);
});

test("OpenAI to Claude: flushes held boundary on finish", () => {
  const state = createOpenAIState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-md3",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "inline `code" }, finish_reason: null }],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-md3",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 2, completion_tokens: 3, total_tokens: 5 },
    },
    state
  );
  const result = flatten([chunk1, chunk2]);
  const textDeltas = getTextDeltas(result);
  assert.deepEqual(textDeltas, ["inline ", "`code"]);
});

test("OpenAI to Claude: finish flushes a fully-held boundary before message stop", () => {
  const state = createOpenAIState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-held-finish",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "`" }, finish_reason: null }],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-held-finish",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
    state
  );
  // End-of-stream flush (see dd35750e5f): a finish chunk without usage is deferred
  // until production's null flush, so mirror it before asserting the terminal events.
  const chunk3 = openaiToClaudeResponse(null, state);
  const result = flatten([chunk1, chunk2, chunk3]);

  assert.deepEqual(getTextDeltas(result), ["`"]);
  assert.equal(state._markdownBuffer, "");
  assert.deepEqual(
    result.slice(1).map((event) => (event as Record<string, unknown>).type),
    [
      "content_block_start",
      "content_block_delta",
      "content_block_stop",
      "message_delta",
      "message_stop",
    ]
  );
});

test("OpenAI to Claude: tool call flushes a fully-held boundary before tool use", () => {
  const state = createOpenAIState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-held-tool",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "`" }, finish_reason: null }],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-held-tool",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_held_tool",
                function: { name: "bash", arguments: '{"command":"pwd"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    state
  );
  // End-of-stream flush (see dd35750e5f): a finish chunk without usage is deferred
  // until production's null flush, so mirror it before asserting the terminal events.
  const chunk3 = openaiToClaudeResponse(null, state);
  const result = flatten([chunk1, chunk2, chunk3]);
  const contentEvents = result.filter((event) =>
    String((event as Record<string, unknown>).type).startsWith("content_block_")
  );

  assert.deepEqual(getTextDeltas(result), ["`"]);
  assert.equal(state._markdownBuffer, "");
  assert.deepEqual(
    contentEvents.map((event) => {
      const record = event as Record<string, unknown>;
      const contentBlock = record.content_block as Record<string, unknown> | undefined;
      const delta = record.delta as Record<string, unknown> | undefined;
      return [record.type, contentBlock?.type ?? delta?.type ?? null];
    }),
    [
      ["content_block_start", "text"],
      ["content_block_delta", "text_delta"],
      ["content_block_stop", null],
      ["content_block_start", "tool_use"],
      ["content_block_delta", "input_json_delta"],
      ["content_block_stop", null],
    ]
  );
});

test("OpenAI to Claude: reasoning flushes a fully-held boundary before thinking", () => {
  const state = createOpenAIState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-held-reasoning",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "`" }, finish_reason: null }],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-held-reasoning",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { reasoning_content: "Thinking" }, finish_reason: null }],
    },
    state
  );
  const result = flatten([chunk1, chunk2]);

  assert.deepEqual(getTextDeltas(result), ["`"]);
  assert.equal(state._markdownBuffer, "");
  assert.deepEqual(
    result.slice(1).map((event) => {
      const record = event as Record<string, unknown>;
      const contentBlock = record.content_block as Record<string, unknown> | undefined;
      const delta = record.delta as Record<string, unknown> | undefined;
      return [record.type, contentBlock?.type ?? delta?.type ?? null];
    }),
    [
      ["content_block_start", "text"],
      ["content_block_delta", "text_delta"],
      ["content_block_stop", null],
      ["content_block_start", "thinking"],
      ["content_block_delta", "thinking_delta"],
    ]
  );
});

test("OpenAI to Claude: extends a held code span across multiple chunks", () => {
  const state = createOpenAIState();
  const chunks = ["`", "c", "ode` body"].map((content, index) =>
    openaiToClaudeResponse(
      {
        id: "chatcmpl-multistep",
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { content }, finish_reason: index === 2 ? "stop" : null }],
      },
      state
    )
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), ["`code` body"]);
  assert.equal(state._markdownBuffer, "");
});

test("OpenAI to Claude: emits punctuation-adjacent closer opened in a prior chunk", () => {
  const state = createOpenAIState();
  const chunks = ["Use `foo ", "(bar)`", " done"].map((content, index) =>
    openaiToClaudeResponse(
      {
        id: "chatcmpl-cross-chunk-code",
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { content }, finish_reason: index === 2 ? "stop" : null }],
      },
      state
    )
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), ["Use `foo ", "(bar)`", " done"]);
});

test("OpenAI to Claude: longer fence closer restores inline code parsing", () => {
  const state = createOpenAIState();
  const contents = ["```\nfoo\n", "````\n", "`(bar)`", " done"];
  const chunks = contents.map((content) =>
    openaiToClaudeResponse(
      {
        id: "chatcmpl-long-fence-close",
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { content }, finish_reason: null }],
      },
      state
    )
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), contents);
  assert.equal(state._markdownFenceRun, 0);
});

test("OpenAI to Claude: shorter fence run does not close a longer fence", () => {
  const state = createOpenAIState();
  const contents = ["````\nfoo\n", "```\n", "`(bar)`", " done"];
  const chunks = contents.map((content) =>
    openaiToClaudeResponse(
      {
        id: "chatcmpl-short-fence-close",
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { content }, finish_reason: null }],
      },
      state
    )
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), contents);
  assert.equal(state._markdownFenceRun, 4);
});

test("OpenAI to Claude: ignores escaped backticks while tracking cross-chunk code spans", () => {
  const state = createOpenAIState();
  const chunks = ["\\` foo `bar", "`"].map((content) =>
    openaiToClaudeResponse(
      {
        id: "chatcmpl-escaped-code",
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { content }, finish_reason: null }],
      },
      state
    )
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), ["\\` foo ", "`bar`"]);
});

test("OpenAI to Claude: backslash does not escape a code span closing backtick", () => {
  const state = createOpenAIState();
  const chunks = ["`foo\\`", "(bar)`", " done"].map((content) =>
    openaiToClaudeResponse(
      {
        id: "chatcmpl-code-backslash",
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { content }, finish_reason: null }],
      },
      state
    )
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), ["`foo\\`", "(bar)", "` done"]);
});

test("OpenAI to Claude: escaped opener is equivalent when split after backslash", () => {
  const splitState = createOpenAIState();
  const splitChunks = ["\\", "` foo ", "(bar)`"].map((content) =>
    openaiToClaudeResponse(
      {
        id: "chatcmpl-split-escape",
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { content }, finish_reason: null }],
      },
      splitState
    )
  );
  const joinedState = createOpenAIState();
  const joinedChunks = ["\\` foo ", "(bar)`"].map((content) =>
    openaiToClaudeResponse(
      {
        id: "chatcmpl-joined-escape",
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { content }, finish_reason: null }],
      },
      joinedState
    )
  );

  assert.equal(
    getTextDeltas(flatten(splitChunks)).join(""),
    getTextDeltas(flatten(joinedChunks)).join("")
  );
  assert.equal(splitState._markdownBuffer, "`");
  assert.equal(splitState._markdownBuffer, joinedState._markdownBuffer);
  assert.equal(splitState._markdownCodeSpanRun || 0, joinedState._markdownCodeSpanRun || 0);
});

test("OpenAI to Claude: ignores literal backtick runs inside longer code spans", () => {
  const state = createOpenAIState();
  const chunks = ["`` ` `` `foo", "`"].map((content) =>
    openaiToClaudeResponse(
      {
        id: "chatcmpl-nested-code",
        model: "gpt-4.1",
        choices: [{ index: 0, delta: { content }, finish_reason: null }],
      },
      state
    )
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), ["`` ` `` ", "`foo`"]);
});

test("OpenAI to Claude: whitespace between chunks is still preserved", () => {
  const state = createOpenAIState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-space",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Hello, " }, finish_reason: null }],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-space",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "world." }, finish_reason: "stop" }],
      usage: { prompt_tokens: 2, completion_tokens: 3, total_tokens: 5 },
    },
    state
  );
  const result = flatten([chunk1, chunk2]);
  const textDeltas = getTextDeltas(result);
  assert.deepEqual(textDeltas, ["Hello, ", "world."]);
  assert.equal(textDeltas.join(""), "Hello, world.");
});

// -- Gemini to Claude streaming boundary cases -------------------------------

function createGeminiState() {
  return {
    _xmlInvokeBuffer: "",
    _markdownBuffer: "",
    _markdownCodeSpanRun: 0,
    _markdownFenceRun: 0,
  };
}

function geminiChunk(text: string, finish = false) {
  return {
    responseId: "msg-md-gemini",
    modelVersion: "gemini-2.0",
    candidates: [
      {
        content: { parts: [{ text }] },
        finishReason: finish ? "STOP" : undefined,
      },
    ],
  };
}

test("Gemini to Claude: code fence language is not split across chunks", () => {
  const state = createGeminiState();
  const chunk1 = geminiToClaudeResponse(geminiChunk("Here is code:\n\n```p"), state);
  const chunk2 = geminiToClaudeResponse(geminiChunk("ython\nprint(1)\n```", true), state);
  const result = flatten([chunk1, chunk2]);
  const textDeltas = getTextDeltas(result);
  assert.deepEqual(textDeltas, ["Here is code:\n\n", "```python\nprint(1)\n```"]);
});

test("Gemini to Claude: bold marker is not split across chunks", () => {
  const state = createGeminiState();
  const chunk1 = geminiToClaudeResponse(geminiChunk("This is **"), state);
  const chunk2 = geminiToClaudeResponse(geminiChunk("bold** text", true), state);
  const result = flatten([chunk1, chunk2]);
  const textDeltas = getTextDeltas(result);
  assert.deepEqual(textDeltas, ["This is ", "**bold** text"]);
});

test("Gemini to Claude: emits punctuation-adjacent closer opened in a prior chunk", () => {
  const state = createGeminiState();
  const chunks = ["Use `foo ", "(bar)`", " done"].map((text, index) =>
    geminiToClaudeResponse(geminiChunk(text, index === 2), state)
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), ["Use `foo ", "(bar)`", " done"]);
});

test("Gemini to Claude: longer fence closer restores inline code parsing", () => {
  const state = createGeminiState();
  const contents = ["```\nfoo\n", "````\n", "`(bar)`", " done"];
  const chunks = contents.map((text) => geminiToClaudeResponse(geminiChunk(text), state));

  assert.deepEqual(getTextDeltas(flatten(chunks)), contents);
  assert.equal(state._markdownFenceRun, 0);
});

test("Gemini to Claude: shorter fence run does not close a longer fence", () => {
  const state = createGeminiState();
  const contents = ["````\nfoo\n", "```\n", "`(bar)`", " done"];
  const chunks = contents.map((text) => geminiToClaudeResponse(geminiChunk(text), state));

  assert.deepEqual(getTextDeltas(flatten(chunks)), contents);
  assert.equal(state._markdownFenceRun, 4);
});

test("Gemini to Claude: joins a closing backtick run split across chunks", () => {
  const state = createGeminiState();
  const chunks = ["``a`", "`", " done"].map((text, index) =>
    geminiToClaudeResponse(geminiChunk(text, index === 2), state)
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), ["``a", "``", " done"]);
});

test("Gemini to Claude: backslash does not escape a code span closing backtick", () => {
  const state = createGeminiState();
  const chunks = ["`foo\\`", "(bar)`", " done"].map((text) =>
    geminiToClaudeResponse(geminiChunk(text), state)
  );

  assert.deepEqual(getTextDeltas(flatten(chunks)), ["`foo\\`", "(bar)", "` done"]);
});

test("Gemini to Claude: escaped opener is equivalent when split after backslash", () => {
  const splitState = createGeminiState();
  const splitChunks = ["\\", "` foo ", "(bar)`"].map((text) =>
    geminiToClaudeResponse(geminiChunk(text), splitState)
  );
  const joinedState = createGeminiState();
  const joinedChunks = ["\\` foo ", "(bar)`"].map((text) =>
    geminiToClaudeResponse(geminiChunk(text), joinedState)
  );

  assert.equal(
    getTextDeltas(flatten(splitChunks)).join(""),
    getTextDeltas(flatten(joinedChunks)).join("")
  );
  assert.equal(splitState._markdownBuffer, "`");
  assert.equal(splitState._markdownBuffer, joinedState._markdownBuffer);
  assert.equal(splitState._markdownCodeSpanRun || 0, joinedState._markdownCodeSpanRun || 0);
});

test("Gemini to Claude: flushes held boundary before tool call transition", () => {
  const state = createGeminiState();
  const chunk1 = geminiToClaudeResponse(geminiChunk("Run `ls"), state);
  const chunk2 = geminiToClaudeResponse(
    {
      responseId: "msg-md-gemini",
      modelVersion: "gemini-2.0",
      candidates: [
        {
          content: {
            parts: [
              { text: "` then" },
              {
                functionCall: {
                  name: "bash",
                  args: { command: "ls -la" },
                },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );
  const result = flatten([chunk1, chunk2]);
  const textDeltas = getTextDeltas(result);
  assert.deepEqual(textDeltas, ["Run ", "`ls` then"]);
  const toolStart = result.find(
    (e) =>
      (e as Record<string, unknown>)?.type === "content_block_start" &&
      ((e as Record<string, unknown>).content_block as Record<string, unknown>)?.type === "tool_use"
  );
  assert.ok(toolStart, "expected tool_use block after flushed text");
});

test("Gemini to Claude: fully-held chunk emits no empty text_delta (#11606 R1)", () => {
  const state = createGeminiState();
  // Chunk 1 ends with a single backtick (opener context) -> fully held.
  const chunk1 = geminiToClaudeResponse(geminiChunk("Run `", false), state);
  // Chunk 2 continues with the inline code body + closing backtick.
  const chunk2 = geminiToClaudeResponse(geminiChunk("ls` done", true), state);
  const result = flatten([chunk1, chunk2]);
  const textDeltas = getTextDeltas(result);
  // No zero-length delta may appear; the boundary flushes joined on chunk 2.
  assert.ok(
    textDeltas.every((d) => d.length > 0),
    `zero-length text_delta emitted: ${JSON.stringify(textDeltas)}`
  );
  assert.deepEqual(textDeltas, ["Run ", "`ls` done"]);
  // The trailing backtick is held; only the real text "Run " is emitted on
  // chunk 1. In particular NO zero-length text_delta may appear (the R1
  // finding: a fully-held "cleaned" chunk used to open a text block and fire
  // an empty delta for nothing).
  const chunk1TextDeltas = (chunk1 as unknown as Record<string, unknown>[])
    .filter(
      (e) =>
        (e as Record<string, unknown>)?.type === "content_block_delta" &&
        ((e as Record<string, unknown>).delta as Record<string, unknown>)?.type === "text_delta"
    )
    .map((e) => ((e as Record<string, unknown>).delta as Record<string, unknown>).text ?? "");
  assert.deepEqual(chunk1TextDeltas, ["Run "]);
});

test("Gemini to Claude: finish flushes a fully-held boundary before message stop", () => {
  const state = createGeminiState();
  const chunk1 = geminiToClaudeResponse(geminiChunk("`"), state);
  const chunk2 = geminiToClaudeResponse(geminiChunk("", true), state);
  const result = flatten([chunk1, chunk2]);

  assert.deepEqual(getTextDeltas(result), ["`"]);
  assert.equal(state._markdownBuffer, "");
  assert.deepEqual(
    result.slice(1).map((event) => (event as Record<string, unknown>).type),
    [
      "content_block_start",
      "content_block_delta",
      "content_block_stop",
      "message_delta",
      "message_stop",
    ]
  );
});
