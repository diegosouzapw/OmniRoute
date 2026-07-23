import { test } from "node:test";
import assert from "node:assert/strict";
import { compressToolResults } from "../../open-sse/services/compression/lite.ts";

interface TestMessage {
  role: string;
  content: string;
}

interface TestChatBody {
  messages: TestMessage[];
}

function toolBody(content: string): TestChatBody {
  return { messages: [{ role: "tool", content }] };
}

function firstMessageContent(body: TestChatBody): string {
  return body.messages[0].content;
}

test("#8169: lite compressToolResults must not cut a word in half", () => {
  const prefix = "x".repeat(1990);
  const word = "authentication"; // straddles the 2000-char cut point
  const content = prefix + word + " rest of the message continues here.";
  const { body: out } = compressToolResults(toolBody(content));
  const resultContent = firstMessageContent(out as TestChatBody);
  const cutPoint = resultContent.indexOf("\n...[truncated]");
  assert.notEqual(cutPoint, -1);
  const lastChar = resultContent[cutPoint - 1];
  const charAfterWouldBe = content[cutPoint];
  const isMidWord = /[a-zA-Z0-9]/.test(lastChar) && /[a-zA-Z0-9]/.test(charAfterWouldBe);
  assert.equal(
    isMidWord,
    false,
    `mid-word cut: "...${resultContent.slice(cutPoint - 20, cutPoint)}" next="${charAfterWouldBe}"`
  );
});

test("#8169: compressToolResults still truncates content well over MAX_TOOL_LENGTH", () => {
  const content = "word ".repeat(1000); // 5000 chars, plenty of whitespace boundaries
  const { body: out, applied } = compressToolResults(toolBody(content));
  const resultContent = firstMessageContent(out as TestChatBody);
  assert.equal(applied, true);
  assert.ok(resultContent.length < content.length);
  assert.ok(resultContent.endsWith("\n...[truncated]"));
});

test("#8169: compressToolResults falls back to hard cut when no whitespace found in lookback window", () => {
  const content = "a".repeat(2100); // no whitespace anywhere
  const { body: out, applied } = compressToolResults(toolBody(content));
  const resultContent = firstMessageContent(out as TestChatBody);
  assert.equal(applied, true);
  assert.ok(resultContent.endsWith("\n...[truncated]"));
});

test("#8169: compressToolResults leaves short tool content untouched", () => {
  const content = "short content";
  const { body: out, applied } = compressToolResults(toolBody(content));
  const resultContent = firstMessageContent(out as TestChatBody);
  assert.equal(applied, false);
  assert.equal(resultContent, content);
});
