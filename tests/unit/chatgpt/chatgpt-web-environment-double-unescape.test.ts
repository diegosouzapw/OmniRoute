/**
 * CodeQL alert 811 — js/double-escaping (HIGH) on
 * `open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/environment.ts`.
 *
 * `decodeXmlText()` unescapes the XML entities of the trusted Codex
 * `<environment_context>` block. It decoded `&amp;` BEFORE `&quot;` / `&#39;`,
 * so the `&` it produced was re-consumed by a later `replaceAll` and the text
 * was unescaped twice: `&amp;quot;` collapsed to `"` instead of `&quot;`.
 *
 * These values become sandbox `cwd` / `workspace_roots` paths, so a
 * double-unescape silently rewrites the trusted workspace boundary.
 * `&amp;` must be decoded LAST.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { extractChatGptTurnEnvironment } from "../../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/environment.ts";

function parsedRequestWithCwd(cwdLiteral: string) {
  const environmentText = [
    "<environment_context>",
    `  <cwd>${cwdLiteral}</cwd>`,
    "  <sandbox_mode>read-only</sandbox_mode>",
    "</environment_context>",
  ].join("\n");

  const turnMetadata = { internal_chat_message_metadata_passthrough: { turn_id: "turn-1" } };

  return {
    context: { tools: [] },
    _rawBody: {
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({ thread_id: "thread-1", turn_id: "turn-1" }),
      },
      input: [
        { type: "message", role: "system", content: [{ type: "input_text", text: "sys" }] },
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: environmentText }],
          ...turnMetadata,
        },
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "hello" }],
          ...turnMetadata,
        },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}

test("decoding the trusted Codex environment does not double-unescape &amp;quot;", () => {
  const env = extractChatGptTurnEnvironment(parsedRequestWithCwd("/tmp/ws&amp;quot;dir"));
  assert.equal(
    env.cwd,
    "/tmp/ws&quot;dir",
    '`&amp;quot;` must decode to the literal text `&quot;`, not to a double-unescaped `"`'
  );
});

test("decoding the trusted Codex environment does not double-unescape &amp;lt; / &amp;#39;", () => {
  assert.equal(
    extractChatGptTurnEnvironment(parsedRequestWithCwd("/tmp/ws&amp;lt;dir")).cwd,
    "/tmp/ws&lt;dir"
  );
  assert.equal(
    extractChatGptTurnEnvironment(parsedRequestWithCwd("/tmp/ws&amp;#39;dir")).cwd,
    "/tmp/ws&#39;dir"
  );
});

test("single-level XML entities still decode normally", () => {
  assert.equal(extractChatGptTurnEnvironment(parsedRequestWithCwd("/tmp/a&amp;b")).cwd, "/tmp/a&b");
  assert.equal(
    extractChatGptTurnEnvironment(parsedRequestWithCwd("/tmp/a&quot;b")).cwd,
    '/tmp/a"b'
  );
  assert.equal(extractChatGptTurnEnvironment(parsedRequestWithCwd("/tmp/a&#39;b")).cwd, "/tmp/a'b");
  assert.equal(extractChatGptTurnEnvironment(parsedRequestWithCwd("/tmp/a&gt;b")).cwd, "/tmp/a>b");
});
