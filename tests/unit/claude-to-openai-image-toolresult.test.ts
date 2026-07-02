/**
 * Tests for fix(translator): forward image tool_result blocks as image_url
 * instead of stringifying base64.
 *
 * Port of decolua/9router PR #2123 (alican532).
 * Without this fix, an image-only tool_result is JSON.stringify-d into the
 * tool message as a base64 text blob — bloating context and causing
 * "input exceeds the context window" errors in OpenAI-protocol upstreams.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } = await import(
  "../../open-sse/translator/request/claude-to-openai.ts"
);

const FAKE_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const MEDIA_TYPE = "image/png";
const EXPECTED_DATA_URI = `data:${MEDIA_TYPE};base64,${FAKE_BASE64}`;

// ---------------------------------------------------------------------------
// 1. image-only tool_result → image_url in a FOLLOWING user message
// ---------------------------------------------------------------------------
test("image-only tool_result produces image_url in following user turn (not stringified in tool msg)", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        // The assistant called a tool
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: "tool-abc",
              name: "screenshot",
              input: {},
            },
          ],
        },
        // The user returned a tool_result containing only an image block
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tool-abc",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: MEDIA_TYPE,
                    data: FAKE_BASE64,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    false
  );

  const msgs = result.messages as any[];

  // There must be a tool message
  const toolMsg = msgs.find((m) => m.role === "tool");
  assert.ok(toolMsg, "expected a tool message");

  // The tool message must NOT contain raw base64 text
  const toolContent = JSON.stringify(toolMsg.content);
  assert.ok(
    !toolContent.includes(FAKE_BASE64),
    `tool message must not contain raw base64 data; got: ${toolContent.slice(0, 200)}`
  );

  // There must be a following user message with image_url
  const userMsg = msgs.find((m) => m.role === "user");
  assert.ok(userMsg, "expected a following user message carrying the image");

  const userContent: any[] = Array.isArray(userMsg.content)
    ? userMsg.content
    : [userMsg.content];

  const imageUrlPart = userContent.find(
    (p: any) => p.type === "image_url" && p.image_url?.url === EXPECTED_DATA_URI
  );
  assert.ok(
    imageUrlPart,
    `expected image_url part with data URI in the user message; got: ${JSON.stringify(userContent)}`
  );

  // The tool message should have a placeholder text (not empty)
  const toolContentStr =
    typeof toolMsg.content === "string" ? toolMsg.content : JSON.stringify(toolMsg.content);
  assert.ok(toolContentStr.length > 0, "tool message content should not be empty");
});

// ---------------------------------------------------------------------------
// 2. mixed text+image tool_result → text stays in tool msg; image in user turn
// ---------------------------------------------------------------------------
test("mixed text+image tool_result: text stays in tool message, image appears as image_url in following user turn", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: "tool-xyz",
              name: "run_test",
              input: {},
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tool-xyz",
              content: [
                { type: "text", text: "Test passed." },
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: MEDIA_TYPE,
                    data: FAKE_BASE64,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    false
  );

  const msgs = result.messages as any[];

  const toolMsg = msgs.find((m) => m.role === "tool");
  assert.ok(toolMsg, "expected a tool message");
  assert.equal(toolMsg.content, "Test passed.", "text should remain in the tool message");

  // base64 must NOT appear in the tool message
  assert.ok(
    !JSON.stringify(toolMsg.content).includes(FAKE_BASE64),
    "tool message must not contain raw base64"
  );

  // Following user message must contain image_url
  const userMsg = msgs.find((m) => m.role === "user");
  assert.ok(userMsg, "expected a following user message carrying the image");

  const userContent: any[] = Array.isArray(userMsg.content)
    ? userMsg.content
    : [userMsg.content];

  const imageUrlPart = userContent.find(
    (p: any) => p.type === "image_url" && p.image_url?.url === EXPECTED_DATA_URI
  );
  assert.ok(
    imageUrlPart,
    `expected image_url part in the following user message; got: ${JSON.stringify(userContent)}`
  );
});

// ---------------------------------------------------------------------------
// 3. text-only tool_result → completely unchanged (regression guard)
// ---------------------------------------------------------------------------
test("text-only tool_result is byte-identical to before the fix", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: "tool-text",
              name: "search",
              input: { query: "hello" },
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tool-text",
              content: [{ type: "text", text: "Result: 42" }],
            },
          ],
        },
      ],
    },
    false
  );

  const msgs = result.messages as any[];
  const toolMsg = msgs.find((m) => m.role === "tool");
  assert.ok(toolMsg, "expected a tool message");
  assert.equal(toolMsg.content, "Result: 42");
  // No spurious user message
  assert.ok(
    !msgs.find((m) => m.role === "user"),
    "text-only tool_result should not produce a following user message"
  );
});

// ---------------------------------------------------------------------------
// 4. string content tool_result → unchanged (regression guard)
// ---------------------------------------------------------------------------
test("string content tool_result is unchanged", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: "tool-str",
              name: "echo",
              input: {},
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tool-str",
              content: "Simple string result",
            },
          ],
        },
      ],
    },
    false
  );

  const msgs = result.messages as any[];
  const toolMsg = msgs.find((m) => m.role === "tool");
  assert.ok(toolMsg, "expected a tool message");
  assert.equal(toolMsg.content, "Simple string result");
});
