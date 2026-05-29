# Web Wrapper Integration - Concrete Examples

> Copy-paste examples for common scenarios

## EXAMPLE 1: Cookie Normalization

### Problem: Users provide cookies in different formats

```
Format 1: Bare token
"sk-ant-sid02-abc123def456..."

Format 2: Key-value pair
"sessionKey=sk-ant-sid02-abc123def456..."

Format 3: Full cookie blob
"__Host-user-id=user_123; sessionKey=sk-ant-sid02-...; cf_clearance=xyz..."

Format 4: With prefix
"bearer eyJ0eXAi..."
```

### Solution: Normalize all formats

```typescript
function normalizeSessionCookieHeader(rawInput: string): string {
  if (!rawInput || typeof rawInput !== "string") {
    throw new Error("Invalid cookie input");
  }

  let cleaned = rawInput;

  // Remove known prefixes
  if (cleaned.startsWith("bearer ")) cleaned = cleaned.slice(7);
  if (cleaned.startsWith("cookie:")) cleaned = cleaned.slice(7);
  cleaned = cleaned.trim();

  // Already in key=value format
  if (cleaned.includes("sessionKey=")) {
    const match = cleaned.match(/(sessionKey=[^;]+)/);
    return match ? match[1] : cleaned;
  }

  // Bare token - add key prefix
  if (!cleaned.includes("=")) {
    return `sessionKey=${cleaned}`;
  }

  return cleaned;
}

// USAGE
const input1 = "sk-ant-sid02-abc123def456...";
const output1 = normalizeSessionCookieHeader(input1);
console.log(output1); // "sessionKey=sk-ant-sid02-abc123def456..."

const input2 = "sessionKey=sk-ant-sid02-abc123def456...";
const output2 = normalizeSessionCookieHeader(input2);
console.log(output2); // "sessionKey=sk-ant-sid02-abc123def456..." (unchanged)

const input3 = "__Host-user-id=user_123; sessionKey=sk-ant-...; cf_clearance=xyz...";
const output3 = normalizeSessionCookieHeader(input3);
console.log(output3); // "sessionKey=sk-ant-..." (extracted)
```

---

## EXAMPLE 2: Format Transformation

### Problem: Convert OpenAI format to target API format

```typescript
// INPUT (OpenAI format)
{
  "model": "claude-sonnet-4-6",
  "messages": [
    {
      "role": "user",
      "content": "What's the weather in Tokyo?"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get weather for a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "City name"
            }
          },
          "required": ["location"]
        }
      }
    }
  ]
}
```

### Solution: Transform systematically

```typescript
function transformToClaude(body: Record<string, unknown>, model: string): ClaudeWebRequestPayload {
  // 1. Extract messages
  const messages = Array.isArray(body.messages) ? body.messages : [];

  // 2. Find last user message (this becomes prompt)
  let prompt = "";
  for (const msg of messages) {
    if (typeof msg === "object" && msg !== null) {
      const message = msg as Record<string, unknown>;
      if (message.role === "user") {
        prompt = String(message.content || "");
      }
    }
  }

  if (!prompt.trim()) {
    throw new Error("No user message found in request");
  }

  // 3. Transform tools
  const tools: Array<{
    name?: string;
    description?: string;
    input_schema?: Record<string, unknown>;
  }> = [];

  if (Array.isArray(body.tools)) {
    for (const tool of body.tools) {
      if (typeof tool === "object" && tool !== null) {
        const t = tool as Record<string, unknown>;
        if (t.type === "function" && typeof t.function === "object") {
          const func = t.function as Record<string, unknown>;
          tools.push({
            name: func.name,
            description: func.description,
            input_schema: func.parameters, // ← Convert parameters to input_schema
          });
        }
      }
    }
  }

  // 4. Generate UUIDs for message tracking
  const { human, assistant } = generateMessageUUIDs();

  // 5. Build target request
  return {
    prompt: prompt,
    model: model || "claude-sonnet-4-6",
    timezone: "Asia/Jakarta",
    locale: "en-US",
    personalized_styles: [
      {
        type: "default",
        key: "Default",
        name: "Normal",
        nameKey: "normal_style_name",
        prompt: "Normal\n",
        summary: "Default responses",
        summaryKey: "normal_style_summary",
        isDefault: true,
      },
    ],
    tools: tools,
    turn_message_uuids: {
      human_message_uuid: human,
      assistant_message_uuid: assistant,
    },
    attachments: [],
    rendering_mode: "messages",
    create_conversation_params: {
      name: "",
      model: model || "claude-sonnet-4-6",
      include_conversation_preferences: false,
    },
  };
}

// OUTPUT (Claude Web API format)
// {
//   "prompt": "What's the weather in Tokyo?",
//   "model": "claude-sonnet-4-6",
//   "timezone": "Asia/Jakarta",
//   "locale": "en-US",
//   "tools": [
//     {
//       "name": "get_weather",
//       "description": "Get weather for a location",
//       "input_schema": {        ← Converted from parameters
//         "type": "object",
//         "properties": {
//           "location": {"type": "string", "description": "City name"}
//         },
//         "required": ["location"]
//       }
//     }
//   ],
//   "turn_message_uuids": {
//     "human_message_uuid": "550e8400-e29b-41d4-a716-446655440000",
//     "assistant_message_uuid": "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
//   },
//   "rendering_mode": "messages"
// }
```

---

## EXAMPLE 3: Error Handling

### Problem: Multiple error types, each needs different handling

```typescript
async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
  const bodyObj = (body || {}) as Record<string, unknown>;

  // ERROR 1: Missing credentials
  try {
    if (!credentials?.cookie || typeof credentials.cookie !== "string") {
      const errorResp = new Response(
        JSON.stringify({
          error: {
            message: "Missing session cookie",
            type: "authentication_error",
          },
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
      return { response: errorResp };
    }

    const cookieHeader = normalizeSessionCookieHeader(credentials.cookie as string);

    // ERROR 2: Invalid request format
    let payload: ClaudeWebRequestPayload;
    try {
      payload = transformToClaude(bodyObj, model);
    } catch (transformError) {
      const errorResp = new Response(
        JSON.stringify({
          error: {
            message: transformError instanceof Error ? transformError.message : "Invalid request format",
            type: "invalid_request_error",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errorResp };
    }

    // Get organization ID
    let orgId: string;
    try {
      orgId = await getOrganizationId(cookieHeader);
    } catch (error) {
      log?.warn?.("CLAUDE-WEB", "Could not retrieve organization ID, using fallback");
      orgId = "default"; // Fallback
    }

    // Make API request
    const url = `https://claude.ai/api/organizations/${orgId}/chat_conversations/conv-id/completion`;
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: {
        ...getBrowserHeaders(),
        "Cookie": cookieHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: mergeAbortSignals(signal),
    });

    // ERROR 3: API errors
    if (!fetchResponse.ok) {
      log?.error?.("CLAUDE-WEB", `HTTP ${fetchResponse.status}`);

      // ERROR 3a: Session expired (403/401)
      if (fetchResponse.status === 403 || fetchResponse.status === 401) {
        const errorResp = new Response(
          JSON.stringify({
            error: {
              message: "Session expired or invalid",
              type: "authentication_error",
            },
          }),
          { status: fetchResponse.status, headers: { "Content-Type": "application/json" } }
        );
        return { response: errorResp };
      }

      // ERROR 3b: Other errors (400, 429, 5xx) - pass through
      return { response: fetchResponse };
    }

    // Success
    return { response: fetchResponse };
  } catch (error) {
    // ERROR 4: Unexpected errors
    const message = error instanceof Error ? error.message : String(error);
    const errorResp = new Response(
      JSON.stringify({
        error: {
          message: `Executor error: ${message}`,
          type: "server_error",
        },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
    return { response: errorResp };
  }
}

// ERROR RESPONSE FORMAT (OpenAI compatible)
// {
//   "error": {
//     "message": "Session expired or invalid",
//     "type": "authentication_error"
//   }
// }
```

---

## EXAMPLE 4: Organization UUID Resolution

### Problem: API returns both .id and .uuid - which one to use?

```typescript
// WRONG ❌ - Using .id (causes 400 error)
async function getOrganizationIdWrong(cookieHeader: string): Promise<string> {
  const response = await fetch("https://claude.ai/api/organizations", {
    headers: { "Cookie": cookieHeader },
  });
  const data = (await response.json()) as any[];
  const id = data?.[0]?.id; // ← WRONG
  return id; // Returns: "179014776" (numeric, not UUID)
}

// Then API call fails:
// GET /api/organizations/179014776/chat_conversations/...
// Response: 400 Bad Request


// CORRECT ✅ - Using .uuid
async function getOrganizationId(cookieHeader: string): Promise<string> {
  const response = await fetch("https://claude.ai/api/organizations", {
    headers: { "Cookie": cookieHeader },
  });
  const data = (await response.json()) as any[];
  const uuid = data?.[0]?.uuid; // ← CORRECT
  
  if (!uuid || typeof uuid !== "string") {
    throw new Error("Organization UUID not found");
  }
  
  return uuid; // Returns: "aec600ed-595c-4a0e-b555-aa5930bc7e49" (UUID)
}

// Then API call succeeds:
// GET /api/organizations/aec600ed-595c-4a0e-b555-aa5930bc7e49/chat_conversations/...
// Response: 200 OK

// API RESPONSE SAMPLE
// [
//   {
//     "id": 179014776,           ← Numeric ID (don't use)
//     "uuid": "aec600ed-595c-4a0e-b555-aa5930bc7e49", ← UUID (use this)
//     "name": "Personal",
//     "type": "personal"
//   }
// ]
```

---

## EXAMPLE 5: SSE Response Parsing

### Problem: API returns Server-Sent Events stream, need to parse

```typescript
// STREAM SAMPLE (what API returns)
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","model":"claude-sonnet-4-6","choices":[{"index":0,"delta":{"content":" Hello"},"finish_reason":null}]}
data: {"id":"chatcmpl-124","object":"chat.completion.chunk","model":"claude-sonnet-4-6","choices":[{"index":0,"delta":{"content":" there"},"finish_reason":null}]}
data: {"id":"chatcmpl-125","object":"chat.completion.chunk","model":"claude-sonnet-4-6","choices":[{"index":0,"delta":{"content":" world"},"finish_reason":null}]}
data: {"id":"chatcmpl-126","object":"chat.completion.chunk","model":"claude-sonnet-4-6","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}
data: [DONE]


// PARSER (how to handle it)
async function parseSSEResponse(response: Response): Promise<string> {
  let fullContent = "";
  const reader = response.body?.getReader();

  if (!reader) return fullContent;

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      // Keep last incomplete line in buffer
      buffer = lines[lines.length - 1];

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();

        // Skip empty lines
        if (!line) continue;

        // Check for done marker
        if (line === "[DONE]") {
          return fullContent;
        }

        // Parse data line
        if (line.startsWith("data: ")) {
          const data = line.slice(6);

          try {
            const chunk = JSON.parse(data) as {
              choices: Array<{
                delta: { content?: string };
                finish_reason: string | null;
              }>;
            };

            // Extract content from delta
            if (chunk.choices?.[0]?.delta?.content) {
              fullContent += chunk.choices[0].delta.content;
            }

            // Check for final message
            if (chunk.choices?.[0]?.finish_reason === "stop") {
              return fullContent;
            }
          } catch (e) {
            // Skip invalid JSON lines
            continue;
          }
        }
      }
    }

    return fullContent;
  } finally {
    reader.releaseLock();
  }
}

// USAGE
const response = await fetch("https://claude.ai/api/...");
const fullMessage = await parseSSEResponse(response);
console.log(fullMessage); // " Hello there world"
```

---

## EXAMPLE 6: Unit Test Template

### Problem: Need comprehensive test coverage

```typescript
import { describe, test, expect } from "node:test";
import { ClaudeWebExecutor } from "../../open-sse/executors/claude-web.ts";

describe("Claude Web Executor", () => {
  // ===== CATEGORY 1: COOKIE HANDLING =====
  describe("Cookie Normalization", () => {
    test("handles bare token", () => {
      const input = "sk-ant-sid02-abc123...";
      const normalized = normalizeSessionCookieHeader(input);
      expect(normalized).toBe("sessionKey=sk-ant-sid02-abc123...");
    });

    test("handles key=value format", () => {
      const input = "sessionKey=sk-ant-sid02-abc123...";
      const normalized = normalizeSessionCookieHeader(input);
      expect(normalized).toBe("sessionKey=sk-ant-sid02-abc123...");
    });

    test("throws on empty input", () => {
      expect(() => normalizeSessionCookieHeader("")).toThrow();
    });
  });

  // ===== CATEGORY 2: FORMAT TRANSFORMATION =====
  describe("Format Transformation", () => {
    test("extracts user message as prompt", () => {
      const input = {
        messages: [
          { role: "system", content: "You are helpful" },
          { role: "user", content: "Hello" },
        ],
      };
      const output = transformToClaude(input, "claude-sonnet-4-6");
      expect(output.prompt).toBe("Hello");
    });

    test("uses last user message", () => {
      const input = {
        messages: [
          { role: "user", content: "First" },
          { role: "user", content: "Second" },
        ],
      };
      const output = transformToClaude(input, "claude-sonnet-4-6");
      expect(output.prompt).toBe("Second");
    });

    test("throws when no user message", () => {
      const input = {
        messages: [
          { role: "assistant", content: "Hi" },
        ],
      };
      expect(() => transformToClaude(input, "claude-sonnet-4-6")).toThrow();
    });

    test("transforms tools parameters to input_schema", () => {
      const input = {
        messages: [{ role: "user", content: "test" }],
        tools: [
          {
            type: "function",
            function: {
              name: "get_weather",
              description: "Get weather",
              parameters: { type: "object" },
            },
          },
        ],
      };
      const output = transformToClaude(input, "claude-sonnet-4-6");
      expect(output.tools[0].input_schema).toBeDefined();
      expect(output.tools[0].input_schema?.type).toBe("object");
    });
  });

  // ===== CATEGORY 3: UUID RESOLUTION =====
  describe("Organization UUID Resolution", () => {
    test("uses uuid not id", async () => {
      // Mock fetch
      global.fetch = async () => new Response(
        JSON.stringify([
          {
            id: 123456789, // ← Numeric ID (wrong)
            uuid: "aec600ed-595c-4a0e-b555-aa5930bc7e49", // ← Use this
            name: "Personal",
          },
        ])
      );

      const uuid = await getOrganizationId("sessionKey=test");
      expect(uuid).toBe("aec600ed-595c-4a0e-b555-aa5930bc7e49");
      expect(uuid).not.toBe("123456789");
    });

    test("throws when uuid missing", async () => {
      global.fetch = async () => new Response(
        JSON.stringify([
          {
            id: 123456789,
            name: "Personal",
            // ← uuid missing
          },
        ])
      );

      await expect(getOrganizationId("sessionKey=test")).rejects.toThrow();
    });
  });

  // ===== CATEGORY 4: ERROR HANDLING =====
  describe("Error Handling", () => {
    test("returns 401 on missing cookie", async () => {
      const executor = new ClaudeWebExecutor();
      const result = await executor.execute({
        model: "claude-sonnet-4-6",
        body: { messages: [{ role: "user", content: "test" }] },
        stream: false,
        credentials: {}, // No cookie
        signal: AbortSignal.timeout(5000),
      });

      expect(result.response.status).toBe(401);
      const error = await result.response.json();
      expect(error.error.type).toBe("authentication_error");
    });

    test("returns 400 on invalid request", async () => {
      const executor = new ClaudeWebExecutor();
      const result = await executor.execute({
        model: "claude-sonnet-4-6",
        body: { messages: [] }, // No user message
        stream: false,
        credentials: { cookie: "sessionKey=test" },
        signal: AbortSignal.timeout(5000),
      });

      expect(result.response.status).toBe(400);
      const error = await result.response.json();
      expect(error.error.type).toBe("invalid_request_error");
    });
  });
});
```

---

## EXAMPLE 7: Live Test Setup

```typescript
/**
 * LIVE TEST - Run with real API
 * Set environment variable: CLAUDE_SESSION_COOKIE=sk-ant-...
 * Run: LIVE_TEST=1 npm run test:live
 */

import { describe, test, expect } from "node:test";
import { ClaudeWebExecutor } from "../../open-sse/executors/claude-web.ts";

if (process.env.LIVE_TEST) {
  describe("Claude Web Executor - LIVE TEST", () => {
    const COOKIE = process.env.CLAUDE_SESSION_COOKIE || "";

    test("Connection test", async () => {
      const executor = new ClaudeWebExecutor();
      const isValid = await executor.testConnection({
        cookie: COOKIE,
      });
      expect(isValid).toBe(true);
    });

    test("Send message and receive response", async () => {
      const executor = new ClaudeWebExecutor();
      const result = await executor.execute({
        model: "claude-sonnet-4-6",
        body: {
          messages: [
            {
              role: "user",
              content: "Say hello in exactly 3 words. Then respond with: LIVE_TEST_WORKS",
            },
          ],
        },
        stream: false,
        credentials: { cookie: COOKIE },
        signal: AbortSignal.timeout(45000),
      });

      expect(result.response.status).toBe(200);

      const text = await result.response.text();
      expect(text).toContain("Hello");
      expect(text).toContain("LIVE_TEST_WORKS");
      
      console.log("✅ Live test PASSED");
      console.log("Response sample:", text.substring(0, 200));
    });
  });
}
```

---

These examples are production-ready. Copy-paste and adapt for your service! 🚀
