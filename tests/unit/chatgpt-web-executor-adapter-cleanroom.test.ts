import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  buildChatGptWebOpenAiResponse,
  executeChatGptWebCleanRoom,
  normalizeChatGptWebStorageState,
  prepareChatGptWebBrowserRequest,
  resolveChatGptWebChromeExecutable,
  resolveChatGptWebTurnTimeoutMs,
  resolveChatGptWebHeadless,
  resolveChatGptWebBrowserAcquireTimeoutMs,
  shouldRetryWithToolReminder,
  TOOL_REMINDER_PROMPT,
  isRetryableChatGptWebHandshake,
} from "../../open-sse/utils/chatgptWebExecutorAdapter.ts";
import { resolveChatGptWebAttachments } from "../../open-sse/utils/chatgptWebAttachments.ts";
import type { ChatGptWebBrowserSession } from "../../open-sse/utils/chatgptWebBrowserSession.ts";

describe("ChatGPT Web clean-room executor request adapter", () => {
  test("maps observed 5.6 modes without treating Pro as max effort", () => {
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5-6-thinking", {
        messages: [{ role: "user", content: "hello" }],
        reasoning_effort: "max",
      }),
      {
        prompt: "hello",
        selection: { kind: "picker", modelLabel: "GPT-5.6 Sol", effortIndex: 3 },
        attachments: [],
        tools: [],
        timeoutMs: 180_000,
      }
    );
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5-6-pro", {
        messages: [{ role: "user", content: "hello" }],
      }).selection,
      { kind: "picker", modelLabel: "GPT-5.6 Sol", effortIndex: 4 }
    );
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5-6-instant", {
        messages: [{ role: "user", content: "hello" }],
      }).selection,
      { kind: "picker", modelLabel: "GPT-5.6 Sol", effortIndex: 0 }
    );
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5-6", {
        messages: [{ role: "user", content: "hello" }],
      }).selection,
      { kind: "picker", modelLabel: "GPT-5.6 Sol", effortIndex: 0 }
    );
  });

  test("assigns bounded and independently configurable budgets to tool turns", () => {
    const tools = [{ type: "function", function: { name: "write" } }];
    assert.equal(resolveChatGptWebTurnTimeoutMs([], {}), 180_000);
    assert.equal(resolveChatGptWebTurnTimeoutMs(tools, {}), 180_000);
    assert.equal(
      resolveChatGptWebTurnTimeoutMs(tools, { CHATGPT_WEB_TOOL_TURN_TIMEOUT_MS: "45000" }),
      45_000
    );
    assert.equal(
      resolveChatGptWebTurnTimeoutMs([], { CHATGPT_WEB_TURN_TIMEOUT_MS: "120000" }),
      120_000
    );
    assert.equal(
      resolveChatGptWebTurnTimeoutMs(tools, { CHATGPT_WEB_TOOL_TURN_TIMEOUT_MS: "invalid" }),
      180_000
    );
  });

  test("runs headless by default and allows an explicit headed override", () => {
    assert.equal(resolveChatGptWebHeadless({}), true);
    assert.equal(resolveChatGptWebHeadless({ CHATGPT_WEB_HEADLESS: "" }), true);
    for (const raw of ["0", "false", "no", "off", "headed"]) {
      assert.equal(resolveChatGptWebHeadless({ CHATGPT_WEB_HEADLESS: raw }), false, raw);
    }
    assert.equal(resolveChatGptWebHeadless({ CHATGPT_WEB_HEADLESS: "1" }), true);
  });

  test("bounds browser acquisition so a dead browser cannot consume the request deadline", () => {
    assert.equal(resolveChatGptWebBrowserAcquireTimeoutMs({}), 45_000);
    assert.equal(
      resolveChatGptWebBrowserAcquireTimeoutMs({ CHATGPT_WEB_BROWSER_ACQUIRE_TIMEOUT_MS: "20000" }),
      20_000
    );
    // Below the floor the default is kept rather than accepting an unusable value.
    assert.equal(
      resolveChatGptWebBrowserAcquireTimeoutMs({ CHATGPT_WEB_BROWSER_ACQUIRE_TIMEOUT_MS: "10" }),
      45_000
    );
  });

  test("compacts an oversized agentic prompt instead of letting ChatGPT reject it", () => {
    // Regression: OpenCode sends a ~66k-char system prompt plus ~19k of tool schemas; one
    // composer submission of that size is refused with "The message you submitted was too long".
    const system = "You are an agentic coding assistant. ".repeat(2_000);
    const tools = Array.from({ length: 9 }, (_, index) => ({
      type: "function",
      function: {
        name: `tool_${index}`,
        description: "Works with files and commands. ".repeat(8),
        parameters: {
          type: "object",
          properties: { path: { type: "string" } },
          required: ["path"],
        },
      },
    }));
    const prepared = prepareChatGptWebBrowserRequest("gpt-5.6-luna-free", {
      tools,
      messages: [
        { role: "system", content: system },
        { role: "user", content: "Use the write tool to create index.html" },
      ],
    });

    assert.ok(prepared.prompt.length <= 24_000, `prompt was ${prepared.prompt.length} chars`);
    assert.match(prepared.prompt, /<tool>/);
    assert.match(prepared.prompt, /create index\.html/);
    assert.equal(prepared.tools.length, 9);
  });

  test("keeps only the recent turns when the transcript exceeds its budget", () => {
    const history = Array.from({ length: 40 }, (_, index) => ({
      role: index % 2 === 0 ? "user" : "assistant",
      content: `turn ${index} ${"x".repeat(4_000)}`,
    }));
    const prepared = prepareChatGptWebBrowserRequest("gpt-5.6-luna-free", {
      messages: [...history, { role: "user", content: "FINAL-QUESTION" }],
    });

    assert.ok(prepared.prompt.length <= 24_000);
    assert.match(prepared.prompt, /FINAL-QUESTION/);
    assert.match(prepared.prompt, /compacted/i);
  });

  test("nudges once when the model narrates tool use instead of calling a tool", () => {
    const tools = [{ type: "function", function: { name: "write" } }];
    // Captured live: finish_reason "stop" with a claim of completed work, no envelope.
    assert.equal(
      shouldRetryWithToolReminder(
        {
          text: "Done. I inspected the available workspace, created /tmp/opencode/index.html, and verified that the file is present.",
        },
        tools
      ),
      true
    );
    // The reminder must forbid ChatGPT's built-in features and demand a real envelope.
    assert.match(TOOL_REMINDER_PROMPT, /did not contain a <tool>/);
    assert.match(TOOL_REMINDER_PROMPT, /data analysis/i);
    // A genuine envelope is never nudged.
    assert.equal(
      shouldRetryWithToolReminder({ text: '<tool>{"name":"write","arguments":{}}</tool>' }, tools),
      false
    );
    // A plain answer is NOT re-issued: doing so doubled the cost of ordinary turns (a bare
    // "hi" paid a second full browser round trip). Only tool-work-shaped replies are nudged.
    assert.equal(shouldRetryWithToolReminder({ text: "42 is the answer." }, tools), false);
    // Tool-less turns are never nudged, and an envelope is never nudged.
    assert.equal(shouldRetryWithToolReminder({ text: "42 is the answer." }, []), false);
    assert.equal(shouldRetryWithToolReminder({ text: "created a file" }, []), false);
    assert.equal(
      shouldRetryWithToolReminder(
        {
          text: "created a file",
          toolCalls: [{ id: "c", type: "function", function: { name: "write", arguments: "{}" } }],
        },
        tools
      ),
      false
    );
    // Captured live: the model reported a failed invocation rather than answering.
    assert.equal(
      shouldRetryWithToolReminder(
        {
          text: "I couldn't complete the file creation because the requested client-side apply_patch invocation was not accepted in this chat.",
        },
        [{ type: "function", function: { name: "apply_patch" } }]
      ),
      true
    );
    assert.equal(
      shouldRetryWithToolReminder(
        {
          text: "I couldn’t complete the requested workspace modification because the client tool calls did not execute.",
        },
        tools
      ),
      true
    );
    assert.equal(
      shouldRetryWithToolReminder(
        { text: "Built and verified index.html for the veterinary clinic." },
        tools
      ),
      true
    );
    assert.equal(
      shouldRetryWithToolReminder(
        { text: "I’m unable to execute the workspace client protocol from this chat environment." },
        tools
      ),
      true
    );
    // Conversational replies stay untouched.
    assert.equal(
      shouldRetryWithToolReminder({ text: "The capital of France is Paris." }, tools),
      false
    );
    assert.equal(shouldRetryWithToolReminder({ text: "Hi! 👋 How's it going?" }, tools), false);
    // ChatGPT's own feature taking over still counts as a miss.
    assert.equal(
      shouldRetryWithToolReminder({ text: "Data analysis isn't available right now." }, tools),
      true
    );

    // A prose summary AFTER a successful write must NOT trigger another tool call: this
    // verify-loop kept a smoke run going ~25 minutes after index.html already existed.
    const ranTool = [
      { role: "user", content: "create index.html" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "c1", function: { name: "apply_patch" } }],
      },
      {
        role: "tool",
        tool_call_id: "c1",
        content: "Success. Updated the following files:\nA index.html",
      },
    ];
    assert.equal(
      shouldRetryWithToolReminder(
        { text: "Done. I inspected the workspace, created index.html, and verified the file." },
        tools,
        ranTool
      ),
      false
    );
    // A failed invocation is still worth one nudge — use a tool result that actually failed.
    const failedTool = [
      { role: "user", content: "create index.html" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "c1", function: { name: "apply_patch" } }],
      },
      {
        role: "tool",
        tool_call_id: "c1",
        content: "apply_patch verification failed: Invalid patch format",
      },
    ];
    assert.equal(
      shouldRetryWithToolReminder(
        { text: "The requested apply_patch invocation was not accepted." },
        tools,
        failedTool
      ),
      true
    );
    // Captured live on a continuation turn: the model declared the client tools missing.
    // The task ended with no file written until this was corrected.
    const afterReadOnly = [
      { role: "user", content: "create index.html" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "c1", function: { name: "glob" } }],
      },
      { role: "tool", tool_call_id: "c1", content: "No files found" },
    ];
    assert.equal(
      shouldRetryWithToolReminder(
        {
          text: "I can\u2019t continue the requested workspace operation from this chat because the required client-side workspace tool isn\u2019t available in my current tool registry.",
        },
        tools,
        afterReadOnly
      ),
      true
    );
    // Second captured phrasing: the refusal list would have missed this one.
    assert.equal(
      shouldRetryWithToolReminder(
        { text: "I can\u2019t emit the required workspace <tool> protocol from this interface." },
        tools,
        afterReadOnly
      ),
      true
    );
    // But a refusal AFTER a successful write must still not loop.
    assert.equal(
      shouldRetryWithToolReminder({ text: "I can't continue further on this." }, tools, ranTool),
      false
    );

    // Before any tool runs, the original tool-work triggers still apply.
    assert.equal(
      shouldRetryWithToolReminder(
        { text: "Done. I inspected the workspace and created index.html." },
        tools,
        [{ role: "user", content: "create index.html" }]
      ),
      true
    );
    // Captured live: a read-only inspection ("No files found") followed by a claimed creation
    // must be corrected, otherwise the task silently fails with no file written.
    const inspectedOnly = [
      { role: "user", content: "create index.html" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "c1", function: { name: "glob" } }],
      },
      { role: "tool", tool_call_id: "c1", content: "No files found" },
    ];
    assert.equal(
      shouldRetryWithToolReminder(
        {
          text: "Created index.html with a minimal valid HTML5 page. The earlier workspace inspection found no existing files.",
        },
        tools,
        inspectedOnly
      ),
      true
    );
  });

  test("never drops the original user request when compacting a long history", () => {
    // Regression: compaction kept only the newest turns, so the model replied
    // "the task from the omitted earlier messages isn't visible here" instead of acting.
    const history = Array.from({ length: 60 }, (_, index) => ({
      role: index % 2 === 0 ? "user" : "assistant",
      content: `turn ${index} ${"y".repeat(3_000)}`,
    }));
    const prepared = prepareChatGptWebBrowserRequest("gpt-5.6-luna-free", {
      messages: [
        { role: "user", content: "ORIGINAL-TASK: create index.html" },
        ...history,
        { role: "user", content: "LATEST-TURN" },
      ],
    });

    assert.ok(prepared.prompt.length <= 24_000, `prompt was ${prepared.prompt.length}`);
    assert.match(prepared.prompt, /ORIGINAL-TASK: create index\.html/);
    assert.match(prepared.prompt, /LATEST-TURN/);
    assert.match(prepared.prompt, /original request above is preserved/i);
  });

  test("maps the observed Free Luna routes to the first-party Think toggle", () => {
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5.6-luna-free", {
        messages: [{ role: "user", content: "hello" }],
      }).selection,
      { kind: "free", thinkEnabled: false }
    );
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5.6-luna-free-thinking", {
        messages: [{ role: "user", content: "hello" }],
      }).selection,
      { kind: "free", thinkEnabled: true }
    );
  });

  test("maps every observed GPT-5.5 route including its distinct Pro model", () => {
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5-5-instant", {
        messages: [{ role: "user", content: "hello" }],
      }).selection,
      { kind: "picker", modelLabel: "GPT-5.5", effortIndex: 0 }
    );
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5-5-thinking", {
        messages: [{ role: "user", content: "hello" }],
        reasoning_effort: "max",
      }).selection,
      { kind: "picker", modelLabel: "GPT-5.5", effortIndex: 3 }
    );
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5-5-pro", {
        messages: [{ role: "user", content: "hello" }],
      }).selection,
      { kind: "picker", modelLabel: "GPT-5.5", effortIndex: 4 }
    );
  });

  test("maps reasoning effort monotonically and preserves multi-message roles", () => {
    const expected = [
      ["low", 0],
      ["medium", 1],
      ["high", 2],
      ["xhigh", 3],
      ["max", 3],
    ] as const;
    for (const [effort, effortIndex] of expected) {
      assert.equal(
        prepareChatGptWebBrowserRequest("gpt-5.5", {
          reasoning_effort: effort,
          messages: [
            { role: "system", content: "Be concise." },
            { role: "user", content: [{ type: "text", text: "Question" }] },
          ],
        }).selection.effortIndex,
        effortIndex
      );
    }

    const prepared = prepareChatGptWebBrowserRequest("gpt-5.5", {
      reasoning_effort: "high",
      messages: [
        { role: "system", content: "Be concise." },
        { role: "user", content: "Question" },
      ],
    });
    assert.equal(prepared.selection.modelLabel, "GPT-5.5");
    assert.equal(prepared.prompt, "System:\nBe concise.\n\nUser:\nQuestion");
  });

  test("replays tool-call history as a compact continuation checkpoint", () => {
    const tools = [{ type: "function", function: { name: "write" } }];
    const prepared = prepareChatGptWebBrowserRequest("gpt-5.5", {
      tools,
      messages: [
        { role: "user", content: "Create the page" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "write", arguments: '{"path":"index.html"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "Wrote index.html" },
      ],
    });

    assert.match(prepared.prompt, /Assistant tool request \(call_1\) write/);
    assert.match(prepared.prompt, /Tool result \(call_1\): Wrote index\.html/);
    assert.match(prepared.prompt, /Continue from the tool results above/);
    assert.match(prepared.prompt, /<tool>/);
  });

  test("honors tool_choice none and strengthens best-effort forced tool prompts", () => {
    const tools = [{ type: "function", function: { name: "write" } }];
    const none = prepareChatGptWebBrowserRequest("gpt-5.5", {
      tools,
      tool_choice: "none",
      messages: [{ role: "user", content: "Explain the task" }],
    });
    assert.deepEqual(none.tools, []);
    assert.doesNotMatch(none.prompt, /<tool>/);

    const required = prepareChatGptWebBrowserRequest("gpt-5.5", {
      tools,
      tool_choice: "required",
      messages: [{ role: "user", content: "Create the page" }],
    });
    assert.match(required.prompt, /A client tool is required for this turn/);
  });

  test("forces the first client tool turn when an auto request explicitly asks for workspace work", () => {
    const prepared = prepareChatGptWebBrowserRequest("gpt-5.6-luna-free", {
      tools: [{ type: "function", function: { name: "write" } }],
      tool_choice: "auto",
      messages: [{ role: "user", content: "Inspect the workspace and create index.html." }],
    });

    assert.match(prepared.prompt, /MUST emit exactly one valid <tool>/i);
  });

  test("does not force another tool call once the latest user request already has a tool result", () => {
    // A "create and verify" task used to carry both "MUST emit exactly one valid
    // <tool> block" and "...or give the final answer" after the tool result, pushing
    // the model into a spurious extra tool call instead of finishing.
    const tools = [{ type: "function", function: { name: "write" } }];
    const prepared = prepareChatGptWebBrowserRequest("gpt-5.6-luna-free", {
      tools,
      tool_choice: "auto",
      messages: [
        { role: "user", content: "Create index.html and verify the file exists." },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "write", arguments: '{"path":"index.html"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "Wrote index.html" },
      ],
    });
    assert.match(prepared.prompt, /Continue from the tool results above/);
    assert.doesNotMatch(prepared.prompt, /MUST emit exactly one valid <tool>/i);

    // A NEW user request after the tool exchange is a fresh workspace ask again.
    const followUp = prepareChatGptWebBrowserRequest("gpt-5.6-luna-free", {
      tools,
      tool_choice: "auto",
      messages: [
        { role: "user", content: "Create index.html." },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "write", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "Wrote index.html" },
        { role: "assistant", content: "Done." },
        { role: "user", content: "Now create about.html." },
      ],
    });
    assert.match(followUp.prompt, /MUST emit exactly one valid <tool>/i);
    assert.doesNotMatch(followUp.prompt, /Continue from the tool results above/);

    // An explicit tool_choice still wins after a tool result.
    const required = prepareChatGptWebBrowserRequest("gpt-5.6-luna-free", {
      tools,
      tool_choice: "required",
      messages: [
        { role: "user", content: "Create index.html." },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "write", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "Wrote index.html" },
      ],
    });
    assert.match(required.prompt, /A client tool is required for this turn/);
  });

  test("extracts image and file inputs without serializing them into the prompt", async () => {
    const prepared = prepareChatGptWebBrowserRequest("gpt-5.6-luna-free", {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Inspect both attachments." },
            {
              type: "image_url",
              image_url:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
            },
            {
              type: "input_file",
              filename: "notes.txt",
              file_data: "data:text/plain;base64,aGVsbG8=",
            },
          ],
        },
      ],
    });

    assert.equal(prepared.prompt, "Inspect both attachments.");
    assert.deepEqual(
      prepared.attachments.map(({ kind, name }) => ({ kind, name })),
      [
        { kind: "image", name: "image-1.png" },
        { kind: "file", name: "notes.txt" },
      ]
    );

    const resolved = await resolveChatGptWebAttachments(prepared.attachments);
    assert.deepEqual(
      resolved.map(({ kind, mimeType, size, width, height }) => ({
        kind,
        mimeType,
        size,
        width,
        height,
      })),
      [
        { kind: "image", mimeType: "image/png", size: 68, width: 1, height: 1 },
        {
          kind: "file",
          mimeType: "text/plain",
          size: 5,
          width: undefined,
          height: undefined,
        },
      ]
    );
  });

  test("pins DNS when resolving a remote attachment URL", async () => {
    let observed: { input: string; options: Record<string, unknown> } | null = null;
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      "base64"
    );
    const resolved = await resolveChatGptWebAttachments(
      [
        {
          kind: "image",
          ref: "https://assets.example.test/pixel.png",
          name: "pixel.png",
        },
      ],
      {
        fetchRemoteMedia: async (input, options) => {
          observed = { input: String(input), options: { ...options } };
          return {
            buffer: png,
            contentType: "image/png",
            url: String(input),
          };
        },
      }
    );

    assert.equal(resolved[0].mimeType, "image/png");
    assert.deepEqual(observed, {
      input: "https://assets.example.test/pixel.png",
      options: {
        guard: "public-only",
        pinDns: true,
        maxBytes: 20 * 1024 * 1024,
        maxRedirects: 3,
        timeoutMs: 20_000,
      },
    });
  });

  test("maps a DNS-rebinding rejection to a safe attachment error", async () => {
    await assert.rejects(
      resolveChatGptWebAttachments(
        [
          {
            kind: "file",
            ref: "https://rebinding.example.test/notes.txt",
            name: "notes.txt",
          },
        ],
        {
          fetchRemoteMedia: async () => {
            throw new Error("Remote image host resolves to a blocked private address");
          },
        }
      ),
      /invalid or blocked/
    );
  });

  test("rejects unknown models and unsupported content while forwarding tools", () => {
    assert.throws(
      () =>
        prepareChatGptWebBrowserRequest("unknown", {
          messages: [{ role: "user", content: "hello" }],
        }),
      /unsupported model/
    );
    assert.deepEqual(
      prepareChatGptWebBrowserRequest("gpt-5.5", {
        tools: [{ type: "function", function: { name: "tool" } }],
        messages: [{ role: "user", content: "hello" }],
      }).tools,
      [{ type: "function", function: { name: "tool" } }]
    );
    assert.throws(
      () =>
        prepareChatGptWebBrowserRequest("gpt-5.5", {
          messages: [{ role: "user", content: [{ type: "input_audio", input_audio: {} }] }],
        }),
      /unsupported content/
    );
  });
});

describe("ChatGPT Web clean-room storage state", () => {
  test("prefers an explicit installed Chrome path for the headed first-party session", () => {
    const checked: string[] = [];
    const resolved = resolveChatGptWebChromeExecutable("/custom/chrome", {
      env: {},
      exists: (candidate) => {
        checked.push(candidate);
        return candidate === "/custom/chrome";
      },
    });

    assert.equal(resolved, "/custom/chrome");
    assert.deepEqual(checked, ["/custom/chrome"]);
  });

  test("accepts only first-party cookie/origin state and returns a detached copy", () => {
    const source = {
      cookies: [
        {
          name: "session",
          value: "secret",
          domain: ".chatgpt.com",
          path: "/",
          expires: -1,
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        },
      ],
      origins: [{ origin: "https://chatgpt.com", localStorage: [] }],
    };
    const normalized = normalizeChatGptWebStorageState(source);
    assert.deepEqual(normalized, source);
    assert.notEqual(normalized, source);
    source.cookies[0].value = "changed";
    assert.equal(normalized.cookies[0].value, "secret");
  });

  test("rejects foreign cookie domains and malformed state", () => {
    assert.throws(
      () =>
        normalizeChatGptWebStorageState({
          cookies: [
            {
              name: "x",
              value: "y",
              domain: ".example.com",
              path: "/",
              expires: -1,
              httpOnly: true,
              secure: true,
              sameSite: "Lax",
            },
          ],
          origins: [],
        }),
      /foreign cookie domain/
    );
    assert.throws(() => normalizeChatGptWebStorageState({ cookies: [] }), /invalid/);
  });
});

describe("ChatGPT Web clean-room executor response adapter", () => {
  const turn = {
    conversationId: "conversation",
    turnExchangeId: "turn",
    text: "answer",
    status: "finished_successfully",
    endTurn: true as const,
  };

  test("builds OpenAI JSON and terminal SSE without leaking transport identity", async () => {
    const jsonResponse = buildChatGptWebOpenAiResponse("gpt-5-6-thinking", turn, false, {
      id: "chatcmpl-cleanroom",
      created: 123,
    });
    const json = (await jsonResponse.json()) as Record<string, unknown>;
    assert.equal(json.object, "chat.completion");
    assert.equal(JSON.stringify(json).includes("conversation"), false);
    assert.equal(JSON.stringify(json).includes("turn"), false);

    const streamResponse = buildChatGptWebOpenAiResponse("gpt-5-6-thinking", turn, true, {
      id: "chatcmpl-cleanroom",
      created: 123,
    });
    const stream = await streamResponse.text();
    assert.match(stream, /"role":"assistant"/);
    assert.match(stream, /"content":"answer"/);
    assert.match(stream, /"finish_reason":"stop"/);
    assert.ok(stream.endsWith("data: [DONE]\n\n"));
  });

  test("returns browser-native tool calls at the OpenAI boundary", async () => {
    const result = {
      conversationId: "conversation",
      turnExchangeId: "turn",
      text: "",
      status: "finished_successfully",
      endTurn: true as const,
      toolCalls: [
        {
          id: "call_browser_1",
          type: "function" as const,
          function: { name: "write", arguments: '{"path":"index.html"}' },
        },
      ],
    };

    const response = buildChatGptWebOpenAiResponse("gpt-5-6-thinking", result, false);
    const body = (await response.json()) as {
      choices: Array<{
        message: { content: unknown; tool_calls?: unknown[] };
        finish_reason: string;
      }>;
    };

    assert.equal(body.choices[0].finish_reason, "tool_calls");
    assert.equal(body.choices[0].message.content, null);
    assert.deepEqual(body.choices[0].message.tool_calls, result.toolCalls);
  });

  test("preserves multiple browser-native tool calls in JSON and streaming responses", async () => {
    const result = {
      conversationId: "conversation",
      turnExchangeId: "turn",
      text: "",
      status: "finished_successfully",
      endTurn: true as const,
      toolCalls: [
        {
          id: "call_browser_1",
          type: "function" as const,
          function: { name: "write", arguments: '{"path":"index.html"}' },
        },
        {
          id: "call_browser_2",
          type: "function" as const,
          function: { name: "read", arguments: '{"path":"index.html"}' },
        },
      ],
    };

    const jsonResponse = buildChatGptWebOpenAiResponse("gpt-5-6-thinking", result, false);
    const json = (await jsonResponse.json()) as {
      choices: Array<{ message: { tool_calls?: typeof result.toolCalls } }>;
    };
    assert.deepEqual(json.choices[0].message.tool_calls, result.toolCalls);

    const streamResponse = buildChatGptWebOpenAiResponse("gpt-5-6-thinking", result, true);
    const stream = await streamResponse.text();
    assert.match(stream, /"index":0/);
    assert.match(stream, /"index":1/);
    assert.match(stream, /"finish_reason":"tool_calls"/);
  });

  test("retries once on a fresh context when the app shell comes back", async () => {
    const session = {
      url: () => "https://chatgpt.com/?temporary-chat=true",
      start: async () => async () => {},
      submitPrompt: async () => "",
    } satisfies ChatGptWebBrowserSession;
    let attempts = 0;
    const response = await executeChatGptWebCleanRoom(
      {
        model: "gpt-5.6-luna-free",
        body: { messages: [{ role: "user", content: "hello" }] },
        stream: false,
        credentials: {
          connectionId: "connection",
          providerSpecificData: { storageState: { cookies: [], origins: [] } },
        },
      },
      {
        createSession: async () => session,
        runTurn: async () => {
          attempts += 1;
          if (attempts === 1) {
            throw new Error(
              "ChatGPT Web first-party conversation returned a non-SSE response (the app shell)"
            );
          }
          return turn;
        },
        id: () => "chatcmpl-cleanroom",
        now: () => 123_000,
      }
    );

    assert.equal(attempts, 2);
    assert.equal(response.status, 200);
  });

  test("does not retry a non-handshake failure", async () => {
    const session = {
      url: () => "https://chatgpt.com/?temporary-chat=true",
      start: async () => async () => {},
      submitPrompt: async () => "",
    } satisfies ChatGptWebBrowserSession;
    let attempts = 0;
    await assert.rejects(
      () =>
        executeChatGptWebCleanRoom(
          {
            model: "gpt-5.6-luna-free",
            body: { messages: [{ role: "user", content: "hello" }] },
            stream: false,
            credentials: {
              connectionId: "connection",
              providerSpecificData: { storageState: { cookies: [], origins: [] } },
            },
          },
          {
            createSession: async () => session,
            runTurn: async () => {
              attempts += 1;
              throw new Error("ChatGPT Web browser turn timed out");
            },
          }
        ),
      /timed out/
    );
    assert.equal(attempts, 1);
  });

  test("executes through an injected browser session factory", async () => {
    const session = {
      url: () => "https://chatgpt.com/?temporary-chat=true",
      start: async () => async () => {},
      submitPrompt: async () => "",
    } satisfies ChatGptWebBrowserSession;
    let observed: Record<string, unknown> | null = null;
    const response = await executeChatGptWebCleanRoom(
      {
        model: "gpt-5-6-pro",
        body: { messages: [{ role: "user", content: "hello" }] },
        stream: false,
        credentials: {
          connectionId: "connection",
          providerSpecificData: {
            storageState: { cookies: [], origins: [] },
            customUserAgent: "CleanRoomBrowser/1.0",
          },
        },
      },
      {
        createSession: async (input) => {
          observed = input;
          return session;
        },
        runTurn: async (_session, request) => {
          assert.equal(request.prompt, "hello");
          assert.deepEqual(request.attachments, []);
          assert.equal(request.timeoutMs, 180_000);
          return turn;
        },
        id: () => "chatcmpl-cleanroom",
        now: () => 123_000,
      }
    );

    assert.deepEqual(observed?.selection, {
      kind: "picker",
      modelLabel: "GPT-5.6 Sol",
      effortIndex: 4,
    });
    assert.deepEqual(observed?.storageState, { cookies: [], origins: [] });
    assert.equal(observed?.userAgent, "CleanRoomBrowser/1.0");
    assert.equal(response.status, 200);
  });

  test("retries both dead-turn shapes observed on the live account", () => {
    // ChatGPT mounted an assistant bubble and left it empty for 153s (count=1 textLen=0).
    assert.equal(
      isRetryableChatGptWebHandshake(
        new Error(
          "ChatGPT Web composer submission failed: ChatGPT Web assistant response stayed empty"
        )
      ),
      true
    );
    // ChatGPT accepted the user message and never created a reply node (count=0, roles:["user"]).
    assert.equal(
      isRetryableChatGptWebHandshake(
        new Error(
          "ChatGPT Web composer submission failed: ChatGPT Web assistant response never started"
        )
      ),
      true
    );
    // A genuine failure must still not be retried blindly.
    assert.equal(isRetryableChatGptWebHandshake(new Error("something else went wrong")), false);
  });
});
