import assert from "node:assert/strict";
import { test } from "node:test";
import {
  runChatGptWebBrowserTurn,
  type ChatGptWebBrowserSession,
} from "../../open-sse/utils/chatgptWebBrowserSession.ts";

test("returns a client tool call without waiting for first-party terminal status", async () => {
  const directSse =
    'event: delta_encoding\ndata: "v1"\n\n' +
    'event: delta\ndata: {"p":"","o":"add","v":{"message":{' +
    '"author":{"role":"assistant"},"content":{"content_type":"text",' +
    '"parts":["<tool>{\\"name\\":\\"write\\",\\"arguments\\":{}}</tool>"]}}}}\n\n';
  const session = {
    url: () => "https://chatgpt.com/?temporary-chat=true",
    start: async () => async () => {},
    submitPrompt: async () => directSse,
  } satisfies ChatGptWebBrowserSession;

  const result = await runChatGptWebBrowserTurn(session, {
    prompt: "Create index.html",
    timeoutMs: 100,
  });

  assert.equal(result.status, "tool_calls");
  assert.equal(result.text, '<tool>{"name":"write","arguments":{}}</tool>');
});
