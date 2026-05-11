import test from "node:test";
import assert from "node:assert/strict";

const { GrokWebExecutor } = await import("../../open-sse/executors/grok-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

// ─── Helpers ────────────────────────────────────────────────────────────────

function mockGrokStream(events: unknown[]) {
  const encoder = new TextEncoder();
  const lines = events.map((e) => JSON.stringify(e)).join("\n") + "\n";
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(lines));
      controller.close();
    },
  });
}

function mockFetch(status: number, events: unknown[]) {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(mockGrokStream(events), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  return () => {
    globalThis.fetch = original;
  };
}

function mockFetchCapture(events: unknown[]) {
  const original = globalThis.fetch;
  let capturedUrl: string | null = null;
  let capturedHeaders: Record<string, string> = {};
  let capturedBody: Record<string, unknown> = {};
  globalThis.fetch = async (url: any, opts: any) => {
    capturedUrl = String(url);
    capturedHeaders = opts?.headers || {};
    capturedBody = JSON.parse(opts?.body || "{}");
    return new Response(mockGrokStream(events), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  return {
    restore: () => {
      globalThis.fetch = original;
    },
    get url() {
      return capturedUrl;
    },
    get headers() {
      return capturedHeaders;
    },
    get body() {
      return capturedBody;
    },
  };
}

const SIMPLE_RESPONSE = [
  { result: { response: { token: "Hello" } } },
  { result: { response: { token: " world!" } } },
  { result: { response: { modelResponse: { message: "Hello world!", responseId: "resp-123" } } } },
];

// ─── Registration ───────────────────────────────────────────────────────────

test("GrokWebExecutor is registered in executor index", () => {
  assert.ok(hasSpecializedExecutor("grok-web"));
  const executor = getExecutor("grok-web");
  assert.ok(executor instanceof GrokWebExecutor);
});

test("GrokWebExecutor sets correct provider name", () => {
  const executor = new GrokWebExecutor();
  assert.equal(executor.getProvider(), "grok-web");
});

// ─── Non-streaming ──────────────────────────────────────────────────────────

test("Non-streaming: simple response", async () => {
  const restore = mockFetch(200, SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const json = (await result.response.json()) as any;
    assert.equal(json.object, "chat.completion");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.equal(json.choices[0].message.content, "Hello world!");
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.ok(json.id.startsWith("chatcmpl-grok-"));
  } finally {
    restore();
  }
});

test("Non-streaming: strips internal Grok tags but preserves render content", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          modelResponse: {
            message:
              'Before <xai:tool_usage_card><xai:tool_name>web_search</xai:tool_name><xai:tool_args><![CDATA[{"query":"x"}]]></xai:tool_args></xai:tool_usage_card> after <grok:render card_id="c1" card_type="citation_card"><argument name="citation_id">1</argument></grok:render>.',
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    const content = json.choices[0].message.content;
    assert.equal(content, "Before  after 1.");
    assert.ok(!content.includes("xai:tool_usage_card"));
    assert.ok(!content.includes("grok:render"));
  } finally {
    restore();
  }
});

test("Non-streaming: maps structured Grok thinking to reasoning_content", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          modelResponse: {
            thinking: "I should inspect the request.",
            message: "Final answer.",
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.20",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.reasoning_content, "I should inspect the request.");
    assert.equal(json.choices[0].message.content, "Final answer.");
  } finally {
    restore();
  }
});

test("Non-streaming: routes Grok isThinking events to reasoning_content", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          token: "Thinking about your request",
          isThinking: true,
          messageTag: "header",
          messageStepId: 0,
        },
      },
    },
    {
      result: {
        response: {
          token: "Buscando fecha de lanzamiento",
          isThinking: true,
          messageTag: "header",
        },
      },
    },
    {
      result: {
        response: {
          token: "Respuesta final.",
          isThinking: false,
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "haz otra tool call" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    const message = json.choices[0].message;
    assert.equal(message.reasoning_content, "Buscando fecha de lanzamiento\n");
    assert.equal(message.content, "Respuesta final.");
  } finally {
    restore();
  }
});

test("Non-streaming: preserves late thinking as metadata", async () => {
  const restore = mockFetch(200, [
    { result: { response: { token: "Respuesta visible." } } },
    {
      result: {
        response: {
          token: "Explaining to user that the result was verified",
          isThinking: true,
          messageTag: "summary",
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    const message = json.choices[0].message;
    assert.equal(message.content, "Respuesta visible.");
    assert.equal(message.reasoning_content, "Explaining to user that the result was verified\n");
  } finally {
    restore();
  }
});

test("Non-streaming: preserves non-generic first thinking header", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          token: "Checking file path",
          isThinking: true,
          messageTag: "header",
          messageStepId: 0,
        },
      },
    },
    { result: { response: { token: "Respuesta final." } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    const message = json.choices[0].message;
    assert.equal(message.reasoning_content, "Checking file path\n");
    assert.equal(message.content, "Respuesta final.");
  } finally {
    restore();
  }
});

test("Non-streaming: leaves textual JSON tool_calls as normal content", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          modelResponse: {
            message:
              '{"tool_calls":[{"id":"call_weather","type":"function","function":{"name":"get_weather","arguments":"{\\"city\\":\\"Madrid\\"}"}}]}',
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "weather in Madrid" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "get_weather",
              description: "Get weather for a city",
              parameters: { type: "object", properties: { city: { type: "string" } } },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.equal(json.choices[0].message.tool_calls, undefined);
    assert.ok(json.choices[0].message.content.includes('"tool_calls"'));
  } finally {
    restore();
  }
});

test("Non-streaming: converts manifest tool_call markup to arbitrary client tool", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          modelResponse: {
            message:
              '<tool_call>{"name":"memory_context_tool","arguments":{"query":"grok tool calling","limit":5}}</tool_call>',
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "busca en memoria grok tool calling" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "memory_context_tool",
              description: "Search memory and history",
              parameters: {
                type: "object",
                properties: { query: { type: "string" }, limit: { type: "number" } },
                required: ["query"],
              },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].finish_reason, "tool_calls");
    assert.equal(json.choices[0].message.tool_calls[0].function.name, "memory_context_tool");
    assert.equal(
      json.choices[0].message.tool_calls[0].function.arguments,
      JSON.stringify({ query: "grok tool calling", limit: 5 })
    );
  } finally {
    restore();
  }
});

test("Non-streaming: converts native Grok bash toolUsageCard to OpenAI tool_calls", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          token: "<xai:tool_usage_card>...</xai:tool_usage_card>",
          isThinking: true,
          messageTag: "tool_usage_card",
          toolUsageCardId: "ded06cb6-deaf-4f01-8337-c31c0c75932c",
          toolUsageCard: {
            toolUsageCardId: "ded06cb6-deaf-4f01-8337-c31c0c75932c",
            intent: "Counting lines in config.json",
            bash: { args: { command: "wc -l /tmp/project/config.json" } },
          },
        },
      },
    },
    {
      result: {
        response: {
          codeExecutionResult: { stdout: "", stderr: "remote sandbox result should not leak" },
          messageTag: "raw_function_result",
          toolUsageCardId: "ded06cb6-deaf-4f01-8337-c31c0c75932c",
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "count lines" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              parameters: {
                type: "object",
                properties: {
                  command: { type: "string" },
                  description: { type: "string" },
                },
                required: ["command", "description"],
              },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].finish_reason, "tool_calls");
    assert.deepEqual(json.choices[0].message.tool_calls, [
      {
        id: "ded06cb6-deaf-4f01-8337-c31c0c75932c",
        type: "function",
        function: {
          name: "bash",
          arguments: JSON.stringify({
            command: "wc -l /tmp/project/config.json",
            description: "Execute shell command: wc -l /tmp/project/config.json",
          }),
        },
      },
    ]);
  } finally {
    restore();
  }
});

test("Non-streaming: maps native Grok bash to environment terminal tool by schema", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          toolUsageCardId: "terminal-call-1",
          toolUsageCard: {
            bash: { args: { command: "pwd" } },
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "run pwd" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "run_command",
              description: "Execute a terminal command in the current environment",
              parameters: {
                type: "object",
                properties: {
                  cmd: { type: "string" },
                  reason: { type: "string" },
                },
                required: ["cmd", "reason"],
              },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.tool_calls[0].function.name, "run_command");
    assert.equal(
      json.choices[0].message.tool_calls[0].function.arguments,
      JSON.stringify({ cmd: "pwd", reason: "Execute shell command: pwd" })
    );
  } finally {
    restore();
  }
});

test("Non-streaming: converts native Grok readFile toolUsageCard to OpenAI read tool_calls", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          toolUsageCardId: "a7f2e241-8513-4329-b685-c1f563c6d246",
          toolUsageCard: {
            toolUsageCardId: "a7f2e241-8513-4329-b685-c1f563c6d246",
            readFile: {
              args: {
                filePath: "/tmp/project/config.json",
                fileType: "FILE_TYPE_FILE",
                offset: 1,
                limit: 5,
              },
            },
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "read file" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "read",
              parameters: {
                type: "object",
                properties: {
                  filePath: { type: "string" },
                  offset: { type: "number" },
                  limit: { type: "number" },
                },
                required: ["filePath"],
              },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.tool_calls[0].function.name, "read");
    const args = JSON.parse(json.choices[0].message.tool_calls[0].function.arguments);
    assert.equal(args.filePath, "/tmp/project/config.json");
    assert.equal(args.offset, 1);
    assert.equal(args.limit, 5);
    assert.equal(args.fileType, undefined);
  } finally {
    restore();
  }
});

test("Non-streaming: routes native Grok webSearch to URL fetch tool when user asks webfetch", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          toolUsageCardId: "fetch-call-1",
          toolUsageCard: {
            webSearch: { args: { query: "site:endless.horse" } },
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "Haz webfetch de http://endless.horse/ y dime que hay" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the web for any topic and get clean content from top results",
              parameters: {
                type: "object",
                properties: { query: { type: "string" }, numResults: { type: "number" } },
                required: ["query"],
              },
            },
          },
          {
            type: "function",
            function: {
              name: "webfetch",
              description: "Fetch a URL and extract the main page content",
              parameters: {
                type: "object",
                properties: { url: { type: "string" }, format: { type: "string" } },
                required: ["url"],
              },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.tool_calls[0].function.name, "webfetch");
    assert.equal(json.choices[0].message.tool_calls[0].function.arguments, JSON.stringify({ url: "http://endless.horse/" }));
  } finally {
    restore();
  }
});

test("Non-streaming: keeps native Grok webSearch on search tool when user asks search", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          toolUsageCardId: "search-call-1",
          toolUsageCard: {
            webSearch: { args: { query: "Ubuntu 24.04.4 Noble Numbat release notes" } },
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "Haz un websearch de Ubuntu 24.04.4" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the web for any topic",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
          {
            type: "function",
            function: {
              name: "webfetch",
              description: "Fetch a URL and extract page content",
              parameters: { type: "object", properties: { url: { type: "string" } }, required: ["url"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.tool_calls[0].function.name, "public_search_tool");
  } finally {
    restore();
  }
});

test("Non-streaming: native Grok webSearch does not choose context memory search", async () => {
  const response = [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          toolUsageCardId: "grok_web_2",
          toolUsageCard: { webSearch: { args: { query: "noticias España" } } },
        },
      },
    },
  ];
  const restore = mockFetch(200, response);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "busca en internet noticias de España" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "memory_context_tool",
              description: "Search across project memories and conversation history",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the web for current public information",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const data = await result.response.json();
    assert.equal(data.choices[0].message.tool_calls[0].function.name, "public_search_tool");
  } finally {
    restore();
  }
});

test("Non-streaming: maps native Grok browsePage to URL fetch tool", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          toolUsageCardId: "browse-call-1",
          toolUsageCard: {
            browsePage: {
              args: {
                url: "https://discourse.ubuntu.com/t/ubuntu-24-04-4-lts-released/76854",
                instructions: "Summarize the official announcement",
              },
            },
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "Busca la release oficial de Ubuntu y abre la pagina del anuncio" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the web for any topic",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
          {
            type: "function",
            function: {
              name: "webfetch",
              description: "Fetch a URL with better extraction for static/docs pages",
              parameters: { type: "object", properties: { url: { type: "string" }, prompt: { type: "string" } }, required: ["url"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.tool_calls[0].function.name, "webfetch");
    assert.equal(
      json.choices[0].message.tool_calls[0].function.arguments,
      JSON.stringify({ url: "https://discourse.ubuntu.com/t/ubuntu-24-04-4-lts-released/76854" })
    );
  } finally {
    restore();
  }
});

test("Non-streaming: does not repeat a tool call that already has a tool result", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          toolUsageCardId: "repeat-bash",
          toolUsageCard: { bash: { args: { command: "wc -l /tmp/a" } } },
        },
      },
    },
    { result: { response: { modelResponse: { message: "413 líneas." } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "user", content: "cuenta lineas" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "bash", arguments: JSON.stringify({ command: "wc -l /tmp/a" }) },
              },
            ],
          },
          { role: "tool", tool_call_id: "call_1", name: "bash", content: "413 /tmp/a" },
        ],
        stream: false,
        tools: [{ type: "function", function: { name: "bash", parameters: { type: "object", properties: { command: { type: "string" } } } } }],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.equal(json.choices[0].message.tool_calls, undefined);
    assert.equal(json.choices[0].message.content, "413 líneas.");
  } finally {
    restore();
  }
});

test("Non-streaming: does not repeat equivalent terminal command with different metadata", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          toolUsageCardId: "repeat-bash-semantic",
          toolUsageCard: { bash: { args: { command: 'wc   -l   "/tmp/a"' } } },
        },
      },
    },
    { result: { response: { modelResponse: { message: "413 líneas." } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "user", content: "cuenta lineas" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: {
                  name: "bash",
                  arguments: JSON.stringify({ command: 'wc -l "/tmp/a"', description: "previous run" }),
                },
              },
            ],
          },
          { role: "tool", tool_call_id: "call_1", name: "bash", content: "413 /tmp/a" },
        ],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              parameters: {
                type: "object",
                properties: { command: { type: "string" }, description: { type: "string" } },
                required: ["command", "description"],
              },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.equal(json.choices[0].message.tool_calls, undefined);
    assert.equal(json.choices[0].message.content, "413 líneas.");
  } finally {
    restore();
  }
});

test("Non-streaming: allows a different tool after a completed call", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          toolUsageCardId: "read-after-bash",
          toolUsageCard: { readFile: { args: { filePath: "/tmp/a" } } },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "user", content: "ahora lee el archivo" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              { id: "call_1", type: "function", function: { name: "bash", arguments: JSON.stringify({ command: "wc -l /tmp/a" }) } },
            ],
          },
          { role: "tool", tool_call_id: "call_1", name: "bash", content: "413 /tmp/a" },
        ],
        stream: false,
        tools: [
          { type: "function", function: { name: "bash", parameters: { type: "object", properties: { command: { type: "string" } } } } },
          { type: "function", function: { name: "read", parameters: { type: "object", properties: { filePath: { type: "string" } } } } },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].finish_reason, "tool_calls");
    assert.equal(json.choices[0].message.tool_calls[0].function.name, "read");
  } finally {
    restore();
  }
});

test("Non-streaming: raw_function_result is not emitted as final content", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          token: "",
          isThinking: false,
          messageTag: "raw_function_result",
          webSearchResults: { results: [{ title: "Ignored" }] },
        },
      },
    },
    {
      result: {
        response: {
          modelResponse: { message: "El archivo tiene 413 líneas." },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "user", content: "cuantas lineas" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "bash", arguments: JSON.stringify({ command: "wc -l /tmp/project/config.json" }) },
              },
            ],
          },
          { role: "tool", tool_call_id: "call_1", name: "bash", content: "413 /tmp/project/config.json" },
        ],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    const content = json.choices[0].message.content;
    assert.ok(!content.includes("Ignored"));
    assert.ok(content.includes("413 líneas"));
  } finally {
    restore();
  }
});

test("Non-streaming: skips raw_function_result even if it carries modelResponse text", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "raw_function_result",
          modelResponse: { message: "internal tool result should not be content" },
        },
      },
    },
    { result: { response: { modelResponse: { message: "Respuesta final limpia." } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "resume" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.content, "Respuesta final limpia.");
  } finally {
    restore();
  }
});

test("Non-streaming: skips unmapped tool_usage_card text structurally", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          messageTag: "tool_usage_card",
          token: "plain tool card text should not be content",
        },
      },
    },
    { result: { response: { modelResponse: { message: "Final visible." } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const json = (await result.response.json()) as any;
    assert.equal(json.choices[0].message.content, "Final visible.");
  } finally {
    restore();
  }
});

test("Request: forwards tool results into Grok prompt for the next turn", async () => {
  let capturedBody = "";
  const originalFetch = global.fetch;
  global.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    capturedBody = String(init?.body || "");
    return new Response(mockGrokStream([{ result: { response: { modelResponse: { message: "It is sunny." } } } }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "user", content: "weather in Madrid" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              { id: "call_weather", type: "function", function: { name: "get_weather", arguments: "{}" } },
            ],
          },
          { role: "tool", tool_call_id: "call_weather", name: "get_weather", content: "sunny" },
        ],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const payload = JSON.parse(capturedBody);
    assert.ok(payload.message.includes("Previous assistant tool calls"));
    assert.ok(payload.message.includes("CLIENT TOOL RESULT from caller runtime for get_weather (call_weather)"));
    assert.ok(payload.message.includes("do not call the same tool again"));
    assert.ok(payload.message.includes("sunny"));
  } finally {
    global.fetch = originalFetch;
  }
});

test("Request: injects dynamic client tool manifest without truncating tools", async () => {
  const capture = mockFetchCapture([
    { result: { response: { modelResponse: { message: "{}" } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          {
            role: "user",
            content: "dime cuantas lineas tiene /tmp/project/config.json",
          },
        ],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              description: "Run a shell command and return stdout/stderr",
              parameters: {
                type: "object",
                properties: { command: { type: "string" }, timeout: { type: "number" } },
                required: ["command"],
              },
            },
          },
        ],
        tool_choice: "required",
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.includes("CLIENT_TOOLS:"));
    assert.equal(capture.body.disableSearch, false);
    assert.ok(prompt.includes("name: bash"));
    assert.ok(prompt.includes("args=command,timeout; required=command"));
    assert.ok(prompt.includes("description: Run a shell command and return stdout/stderr"));
    assert.ok(prompt.includes("<tool_call>"));
    assert.ok(prompt.includes("/tmp/project/config.json"));
    assert.ok(prompt.indexOf("CLIENT_TOOLS:") > prompt.indexOf("/tmp/project/config.json"));
  } finally {
    capture.restore();
  }
});

test("Request: leaves native Grok search enabled when client tools are absent", async () => {
  const capture = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "Busca noticias" }],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(capture.body.disableSearch, false);
    assert.ok(!String(capture.body.message).includes("CLIENT_TOOLS:"));
  } finally {
    capture.restore();
  }
});

test("Request: places tool manifest next to latest user after noisy history", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "user", content: "old question" },
          { role: "assistant", content: "old answer claiming file does not exist" },
          { role: "user", content: "/tmp/project/config.json dime cuantas lineas tiene este archivo" },
        ],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              description: "Run a shell command",
              parameters: { type: "object", properties: { command: { type: "string" } }, required: ["command"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    const oldIdx = prompt.indexOf("old answer claiming file does not exist");
    const manifestIdx = prompt.lastIndexOf("CLIENT_TOOLS:");
    const latestIdx = prompt.indexOf("/tmp/project/config.json");
    assert.ok(oldIdx >= 0);
    assert.ok(manifestIdx > oldIdx);
    assert.ok(manifestIdx > latestIdx);
  } finally {
    capture.restore();
  }
});

test("Request: strips injected internal reminders from Grok prompt", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          {
            role: "user",
            content:
              "investiga example.com\n\n---\n\n<internal_reminder>!IMPORTANT! hidden runtime workflow reminder</internal_reminder>",
          },
        ],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "fetch_url_tool",
              description: "Fetch URL or browse web page content",
              parameters: { type: "object", properties: { url: { type: "string" } }, required: ["url"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.includes("investiga example.com"));
    assert.ok(!prompt.includes("internal_reminder"));
    assert.ok(!prompt.includes("hidden runtime workflow reminder"));
  } finally {
    capture.restore();
  }
});

test("Request: old completed tools do not suppress fresh latest-user tool calls", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "user", content: "old count" },
          {
            role: "assistant",
            content: "",
            tool_calls: [
              {
                id: "old_call",
                type: "function",
                function: { name: "bash", arguments: JSON.stringify({ command: "wc -l /tmp/a" }) },
              },
            ],
          },
          { role: "tool", tool_call_id: "old_call", name: "bash", content: "10 /tmp/a" },
          { role: "assistant", content: "10 lines" },
          { role: "user", content: "wc -l /tmp/a otra vez" },
        ],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              description: "Run a shell command",
              parameters: { type: "object", properties: { command: { type: "string" } }, required: ["command"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.includes("CLIENT_TOOLS:"));
    assert.ok(!prompt.includes("completed_tool_calls:"));
  } finally {
    capture.restore();
  }
});

test("Request: appends tool manifest after tool results during multi-step continuation", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "user", content: "lee archivo y busca release oficial" },
          {
            role: "assistant",
            content: "",
            tool_calls: [
              { id: "read_call", type: "function", function: { name: "read", arguments: JSON.stringify({ filePath: "/tmp/a" }) } },
            ],
          },
          { role: "tool", tool_call_id: "read_call", name: "read", content: "file content" },
        ],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "memory_context_tool",
              description: "Search across project memories and raw conversation history.",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the web for any topic and get clean content.",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    const toolResultIdx = prompt.indexOf("CLIENT TOOL RESULT from caller runtime for read");
    const manifestIdx = prompt.lastIndexOf("CLIENT_TOOLS:");
    assert.ok(toolResultIdx >= 0);
    assert.ok(manifestIdx > toolResultIdx);
    assert.ok(prompt.includes("name: public_search_tool"));
  } finally {
    capture.restore();
  }
});

test("Request: keeps generic manifest ordered for file understanding tasks", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          {
            role: "user",
            content: "lee /tmp/project/config.json y dime de que va y que modelo usa por defecto",
          },
        ],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              description: "Execute shell command",
              parameters: { type: "object", properties: { command: { type: "string" }, description: { type: "string" } }, required: ["command"] },
            },
          },
          {
            type: "function",
            function: {
              name: "read",
              description: "Read a file or directory from the local filesystem",
              parameters: { type: "object", properties: { filePath: { type: "string" } }, required: ["filePath"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(!prompt.includes("recommended_tools:"));
    assert.ok(!prompt.includes("primary_tools:"));
    assert.ok(!prompt.includes("other_tools:"));
    assert.ok(!prompt.includes("scope_guide:"));
    assert.ok(!prompt.includes("request_scopes:"));
    const readIdx = prompt.indexOf("name: read");
    const bashIdx = prompt.indexOf("name: bash");
    assert.ok(readIdx >= 0);
    assert.ok(bashIdx >= 0);
    assert.ok(readIdx < bashIdx);
    assert.ok(prompt.includes("args=filePath; required=filePath"));
  } finally {
    capture.restore();
  }
});

test("Request: keeps generic manifest ordered for official web facts", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "contrasta con una fuente web oficial la ultima release de Ubuntu 24.04" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "memory_context_tool",
              description: "Search across project memories, indexed git commits, and raw conversation history.",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the web for any topic and get clean, ready-to-use content.",
              parameters: { type: "object", properties: { query: { type: "string" }, numResults: { type: "number" } }, required: ["query"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(!prompt.includes("recommended_tools:"));
    assert.ok(!prompt.includes("primary_tools:"));
    assert.ok(!prompt.includes("other_tools:"));
    assert.ok(!prompt.includes("scope_guide:"));
    assert.ok(!prompt.includes("request_scopes:"));
    const webIdx = prompt.indexOf("name: public_search_tool");
    const ctxIdx = prompt.indexOf("name: memory_context_tool");
    assert.ok(webIdx >= 0);
    assert.ok(ctxIdx >= 0);
    assert.ok(webIdx < ctxIdx);
    assert.ok(prompt.includes("args=query,numResults; required=query"));
  } finally {
    capture.restore();
  }
});

test("Request: base manifest order puts public web search before context memory", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "Dime que herramientas ves" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "memory_context_tool",
              description: "Search across project memories and conversation history",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the web for current public information",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.indexOf("name: public_search_tool") < prompt.indexOf("name: memory_context_tool"));
  } finally {
    capture.restore();
  }
});

test("Request: ranks public web search before infrastructure search", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "busca en web la última release de Ubuntu 24.04" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "tool_discovery_search",
              description: "Search and discover available upstream tools using BM25 full-text search",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the web for current public information",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.indexOf("name: public_search_tool") < prompt.indexOf("name: tool_discovery_search"));
  } finally {
    capture.restore();
  }
});

test("Request: ranks URL fetch before generic MCP read", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "lee https://example.com/docs" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "mcp_read_tool",
              description: "Execute a read-only upstream tool such as fetch, get, query, list, or search",
              parameters: { type: "object", properties: { name: { type: "string" }, args: { type: "object" } }, required: ["name"] },
            },
          },
          {
            type: "function",
            function: {
              name: "fetch_url_tool",
              description: "Fetch URL or browse web page content",
              parameters: { type: "object", properties: { url: { type: "string" } }, required: ["url"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.indexOf("name: fetch_url_tool") < prompt.indexOf("name: mcp_read_tool"));
  } finally {
    capture.restore();
  }
});

test("Request: ranks shell command before infrastructure command config", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "cuántas líneas tiene /tmp/a" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "upstream_server_config",
              description: "Manage upstream MCP servers, including stdio command configuration",
              parameters: { type: "object", properties: { command: { type: "string" }, name: { type: "string" } }, required: ["name"] },
            },
          },
          {
            type: "function",
            function: {
              name: "shell_command_tool",
              description: "Execute a shell command and return output",
              parameters: { type: "object", properties: { command: { type: "string" } }, required: ["command"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.indexOf("name: shell_command_tool") < prompt.indexOf("name: upstream_server_config"));
  } finally {
    capture.restore();
  }
});

test("Request: commit wording does not prioritize memory over shell", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "ejecuta git rev-parse HEAD para ver el commit actual" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "memory_context_tool",
              description: "Search project memories and conversation history",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
          {
            type: "function",
            function: {
              name: "shell_command_tool",
              description: "Execute a shell command and return output",
              parameters: { type: "object", properties: { command: { type: "string" } }, required: ["command"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.indexOf("name: shell_command_tool") < prompt.indexOf("name: memory_context_tool"));
  } finally {
    capture.restore();
  }
});

test("Request: explicit memory request prioritizes context over public web", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "busca en memoria si hablamos antes de Ubuntu" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the web for current public information",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
          {
            type: "function",
            function: {
              name: "memory_context_tool",
              description: "Search project memories and conversation history",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.indexOf("name: memory_context_tool") < prompt.indexOf("name: public_search_tool"));
  } finally {
    capture.restore();
  }
});

test("Request: explicit tool_choice exposes only the forced tool", async () => {
  const capture = mockFetchCapture([{ result: { response: { modelResponse: { message: "{}" } } } }]);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "usa una herramienta concreta" }],
        stream: false,
        tool_choice: { type: "function", function: { name: "forced_tool" } },
        tools: [
          {
            type: "function",
            function: {
              name: "other_tool",
              description: "Other available tool",
              parameters: { type: "object", properties: { input: { type: "string" } }, required: ["input"] },
            },
          },
          {
            type: "function",
            function: {
              name: "forced_tool",
              description: "Forced tool",
              parameters: { type: "object", properties: { input: { type: "string" } }, required: ["input"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const prompt = String(capture.body.message);
    assert.ok(prompt.includes("name: forced_tool"));
    assert.ok(!prompt.includes("name: other_tool"));
  } finally {
    capture.restore();
  }
});

test("Non-streaming: routes URL-like webfetch requests conservatively", async () => {
  const cases = [
    {
      title: "trailing punctuation",
      user: "haz webfetch de https://example.com/docs.",
      query: "example docs",
      expectedName: "fetch_url_tool",
      expectedArgs: { url: "https://example.com/docs" },
    },
    {
      title: "bare domain",
      user: "haz webfetch en rtve.es",
      query: "rtve.es",
      expectedName: "fetch_url_tool",
      expectedArgs: { url: "https://rtve.es" },
    },
    {
      title: "www domain",
      user: "haz webfetch en www.example.com/docs",
      query: "www.example.com/docs",
      expectedName: "fetch_url_tool",
      expectedArgs: { url: "https://www.example.com/docs" },
    },
    {
      title: "http URL",
      user: "haz webfetch en <http://example.com/path>.",
      query: "http example",
      expectedName: "fetch_url_tool",
      expectedArgs: { url: "http://example.com/path" },
    },
    {
      title: "websocket URL",
      user: "haz webfetch en wss://example.com/socket",
      query: "wss endpoint",
      expectedName: "public_search_tool",
      expectedArgs: { query: "wss endpoint" },
    },
  ];

  for (const item of cases) {
    const restore = mockFetch(200, [
      {
        result: {
          response: {
            messageTag: "tool_usage_card",
            toolUsageCardId: `grok_web_${item.title.replace(/\s+/g, "_")}`,
            toolUsageCard: { webSearch: { args: { query: item.query } } },
          },
        },
      },
    ]);
    try {
      const executor = new GrokWebExecutor();
      const result = await executor.execute({
        model: "grok-4.1-fast",
        body: {
          messages: [{ role: "user", content: item.user }],
          stream: false,
          tools: [
            {
              type: "function",
              function: {
                name: "fetch_url_tool",
                description: "Fetch URL or browse web page content",
                parameters: { type: "object", properties: { url: { type: "string" } }, required: ["url"] },
              },
            },
            {
              type: "function",
              function: {
                name: "public_search_tool",
                description: "Search the web for current public information",
                parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
              },
            },
          ],
        },
        stream: false,
        credentials: { apiKey: "test-sso-token" },
        signal: AbortSignal.timeout(10000),
        log: null,
      });
      const json = (await result.response.json()) as any;
      assert.equal(json.choices[0].message.tool_calls[0].function.name, item.expectedName, item.title);
      assert.equal(json.choices[0].message.tool_calls[0].function.arguments, JSON.stringify(item.expectedArgs), item.title);
    } finally {
      restore();
    }
  }
});

// ─── Streaming ──────────────────────────────────────────────────────────────

test("Streaming: produces valid SSE chunks", async () => {
  const restore = mockFetch(200, SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-sso" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

    const text = await result.response.text();
    const lines = text.split("\n").filter((l: string) => l.startsWith("data: "));
    assert.ok(lines.length >= 3, `Expected at least 3 SSE data lines, got ${lines.length}`);

    // First chunk has role
    const first = JSON.parse(lines[0].slice(6));
    assert.equal(first.choices[0].delta.role, "assistant");

    // Last line is [DONE]
    const lastLine = text.trim().split("\n").filter(Boolean).pop();
    assert.equal(lastLine, "data: [DONE]");
  } finally {
    restore();
  }
});

test("Streaming: strips internal Grok cards across chunk boundaries", async () => {
  const restore = mockFetch(200, [
    { result: { response: { token: "Visible " } } },
    { result: { response: { token: "<xai:tool_usage_card><xai:tool_name>" } } },
    { result: { response: { token: "web_search</xai:tool_name></xai:tool_usage_card> text" } } },
    { result: { response: { modelResponse: { message: "Visible  text" } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-sso" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const text = await result.response.text();
    assert.ok(text.includes('"content":"Visible "'));
    assert.ok(text.includes('"content":" text"'));
    assert.ok(!text.includes("xai:tool_usage_card"));
    assert.ok(!text.includes("web_search"));
  } finally {
    restore();
  }
});

test("Streaming: handles Grok card closing tags split across chunks", async () => {
  const restore = mockFetch(200, [
    { result: { response: { token: "Before " } } },
    { result: { response: { token: "<xai:tool_usage_card>hidden" } } },
    { result: { response: { token: "</xai:tool_" } } },
    { result: { response: { token: "usage_card> after" } } },
    { result: { response: { modelResponse: { message: "Before  after" } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-sso" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const text = await result.response.text();
    assert.ok(text.includes('"content":"Before "'));
    assert.ok(text.includes('"content":" after"'));
    assert.ok(!text.includes("xai:tool_usage_card"));
    assert.ok(!text.includes("hidden"));
  } finally {
    restore();
  }
});

test("Streaming: strips self-closing Grok render cards without swallowing later text", async () => {
  const restore = mockFetch(200, [
    { result: { response: { token: "Alpha " } } },
    { result: { response: { token: '<grok:render card_id="c1" card_type="citation_card" /> omega' } } },
    { result: { response: { modelResponse: { message: "Alpha  omega" } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-sso" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const text = await result.response.text();
    assert.ok(text.includes('"content":"Alpha "'));
    assert.ok(text.includes('"content":" omega"'));
    assert.ok(!text.includes("grok:render"));
  } finally {
    restore();
  }
});

test("Streaming: does not end suppressed Grok card on slash-close text inside the card", async () => {
  const restore = mockFetch(200, [
    { result: { response: { token: "Start " } } },
    { result: { response: { token: "<xai:tool_usage_card>hidden /> still hidden" } } },
    { result: { response: { token: "</xai:tool_usage_card> end" } } },
    { result: { response: { modelResponse: { message: "Start  end" } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-sso" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const text = await result.response.text();
    assert.ok(text.includes('"content":"Start "'));
    assert.ok(text.includes('"content":" end"'));
    assert.ok(!text.includes("hidden"));
  } finally {
    restore();
  }
});

test("Streaming: maps structured Grok thinking to reasoning_content", async () => {
  const restore = mockFetch(200, [
    { result: { response: { thinking: "Plan first. " } } },
    { result: { response: { token: "Answer" } } },
    { result: { response: { modelResponse: { message: "Answer" } } } },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.20",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-sso" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const text = await result.response.text();
    assert.ok(text.includes('"reasoning_content":"Plan first. "'));
    assert.ok(text.includes('"content":"Answer"'));
  } finally {
    restore();
  }
});

test("Streaming: routes Grok thinking tokens separately from content", async () => {
  const restore = mockFetch(200, [
    { result: { response: { token: "Thinking about your request", isThinking: true, messageTag: "header", messageStepId: 0 } } },
    { result: { response: { token: "Buscando fecha de lanzamiento", isThinking: true, messageTag: "header" } } },
    { result: { response: { token: "- Tool calls succeeded, confirming Ubuntu 24.04.4.\n", isThinking: true, messageTag: "summary" } } },
    { result: { response: { token: "Tool call ejecutado.\nweb_search ejecutado correctamente.\n" } } },
    { result: { response: { token: "Resultados clave:\n- Ubuntu 24.04.4 LTS liberado.\n" } } },
    {
      result: {
        response: {
          modelResponse: {
            message:
              "Tool call ejecutado.\nweb_search ejecutado correctamente.\nResultados clave:\n- Ubuntu 24.04.4 LTS liberado.\n",
          },
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "prueba otra vez" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-sso" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const text = await result.response.text();
    assert.ok(!text.includes('"reasoning_content":"..."'));
    assert.ok(text.includes('"reasoning_content":"Buscando fecha de lanzamiento\\n"'));
    assert.ok(!text.includes('"content":"Buscando fecha de lanzamiento"'));
    assert.ok(text.includes("Tool calls succeeded"));
    assert.ok(text.includes("Tool call ejecutado."));
    assert.ok(text.includes("Resultados clave:"));
  } finally {
    restore();
  }
});

test("Streaming: ignores late thinking after content starts", async () => {
  const restore = mockFetch(200, [
    { result: { response: { token: "413 líneas" } } },
    {
      result: {
        response: {
          token: "Explaining to user that file cannot be accessed",
          isThinking: true,
          messageTag: "summary",
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "line count" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-sso" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const text = await result.response.text();
    assert.ok(text.includes('"content":"413 líneas"'));
    assert.ok(!text.includes("Explaining to user"));
    assert.ok(!text.includes("reasoning_content"));
  } finally {
    restore();
  }
});

test("Streaming: leaves textual JSON tool_calls as content", async () => {
  const restore = mockFetch(200, [
    {
      result: {
        response: {
          token:
            '{"tool_calls":[{"id":"call_search","type":"function","function":{"name":"search_docs","arguments":"{\\"query\\":\\"Ubuntu 24.04.4\\"}"}}]}',
        },
      },
    },
  ]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [{ role: "user", content: "search docs" }],
        stream: true,
        tools: [{ type: "function", function: { name: "search_docs" } }],
      },
      stream: true,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const text = await result.response.text();
    assert.ok(text.includes("tool_calls"));
    assert.ok(text.includes('"finish_reason":"stop"'));
    assert.ok(text.includes("search_docs"));
    assert.ok(text.includes('"content"'));
  } finally {
    restore();
  }
});

// ─── Error handling ─────────────────────────────────────────────────────────

test("Error: 401 returns auth error", async () => {
  const restore = mockFetch(401, []);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "expired" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 401);
    const json = (await result.response.json()) as any;
    assert.ok(json.error.message.includes("auth failed"));
    assert.ok(json.error.message.includes("sso"));
  } finally {
    restore();
  }
});

test("Error: 429 returns rate limit message", async () => {
  const restore = mockFetch(429, []);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 429);
    const json = (await result.response.json()) as any;
    assert.ok(json.error.message.includes("rate limited"));
  } finally {
    restore();
  }
});

test("Error: empty messages returns 400", async () => {
  const executor = new GrokWebExecutor();
  const result = await executor.execute({
    model: "grok-4",
    body: { messages: [] },
    stream: false,
    credentials: { apiKey: "test" },
    signal: AbortSignal.timeout(10000),
    log: null,
  });
  assert.equal(result.response.status, 400);
});

test("Error: Grok stream error returns 502", async () => {
  const restore = mockFetch(200, [{ error: { message: "Internal error", code: "500" } }]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 502);
    const json = (await result.response.json()) as any;
    assert.ok(json.error.message.includes("Internal error"));
  } finally {
    restore();
  }
});

// ─── Auth headers ───────────────────────────────────────────────────────────

test("Auth: cookie sends sso= header", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "my-sso-token-value" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.headers["Cookie"], "sso=my-sso-token-value");
  } finally {
    cap.restore();
  }
});

test("Auth: strips sso= prefix if user included it", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "sso=my-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.headers["Cookie"], "sso=my-token");
    assert.ok(!cap.headers["Cookie"].includes("sso=sso="));
  } finally {
    cap.restore();
  }
});

// ─── Request format ─────────────────────────────────────────────────────────

test("Request: posts to correct Grok endpoint", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.url, "https://grok.com/rest/app-chat/conversations/new");
    assert.equal(cap.headers["Origin"], "https://grok.com");
    assert.ok(cap.headers["x-statsig-id"], "Should have x-statsig-id header");
    assert.ok(cap.headers["x-xai-request-id"], "Should have x-xai-request-id header");
    assert.ok(cap.headers["traceparent"]?.startsWith("00-"), "Should have W3C traceparent");
  } finally {
    cap.restore();
  }
});

test("Request: payload has correct model mapping", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-expert",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.body.modeId, "expert");
    assert.equal("modelName" in cap.body, false);
    assert.equal("modelMode" in cap.body, false);
    assert.equal(cap.body.temporary, true);
  } finally {
    cap.restore();
  }
});

test("Request: preserves selected mode and native search state when client tools are present", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-420-computer-use-sa",
      body: {
        messages: [{ role: "user", content: "Busca noticias" }],
        stream: false,
        tools: [
          {
            type: "function",
            function: {
              name: "public_search_tool",
              description: "Search the public web",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
          },
        ],
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.body.modeId, "grok-420-computer-use-sa");
    assert.equal(cap.body.disableSearch, false);
    assert.deepEqual(cap.body.toolOverrides, {});
    assert.ok(String(cap.body.message).includes("CLIENT_TOOLS:"));
  } finally {
    cap.restore();
  }
});

test("Request: grok-4-heavy maps to heavy mode", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4-heavy",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.body.modeId, "heavy");
    assert.equal("modelName" in cap.body, false);
    assert.equal("modelMode" in cap.body, false);
  } finally {
    cap.restore();
  }
});

// ─── Message parsing ────────────────────────────────────────────────────────

test("Message parsing: combines system + history + user", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "system", content: "Be helpful" },
          { role: "user", content: "First question" },
          { role: "assistant", content: "First answer" },
          { role: "user", content: "Follow up" },
        ],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const msg = cap.body.message as string;
    assert.ok(msg.includes("Follow up"), "Should contain current user message");
    assert.ok(msg.includes("Be helpful"), "Should contain system message");
    assert.ok(msg.includes("First answer"), "Should contain assistant history");
  } finally {
    cap.restore();
  }
});

// ─── Provider registry ──────────────────────────────────────────────────────

test("Provider registry: grok-web has correct models", async () => {
  const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");
  const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
  const models = PROVIDER_MODELS["gw"];
  assert.ok(models, "gw should be in PROVIDER_MODELS");
  assert.equal(models.length, 4, `Expected 4 models, got ${models.length}`);
  const ids = models.map((m: any) => m.id);
  assert.ok(!ids.includes("auto"), "auto modeId no longer accepted by grok.com");
  assert.ok(ids.includes("fast"));
  assert.ok(ids.includes("expert"));
  assert.ok(ids.includes("heavy"));
  assert.ok(ids.includes("grok-420-computer-use-sa"));
  assert.equal(getRegistryEntry("grok-web")?.passthroughModels, true);
});

// ─── Statsig header ─────────────────────────────────────────────────────────

test("Statsig: x-statsig-id is valid base64", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const statsig = cap.headers["x-statsig-id"];
    assert.ok(statsig, "Should have statsig header");
    const decoded = atob(statsig);
    assert.ok(
      decoded.startsWith("e:TypeError:"),
      `Decoded statsig should start with e:TypeError:, got: ${decoded}`
    );
  } finally {
    cap.restore();
  }
});
