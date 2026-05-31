import test from "node:test";
import assert from "node:assert/strict";
import { createSseTextTransform } from "../../src/lib/sseTextTransform.ts";
import type { FieldCategory } from "../../src/lib/sseTextTransform.ts";

async function testTransform(transform: TransformStream, inputChunks: string[]): Promise<string> {
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();

  const writePromise = (async () => {
    for (const chunk of inputChunks) {
      await writer.write(new TextEncoder().encode(chunk));
    }
    await writer.close();
  })();

  const outputChunks: string[] = [];
  let res = await reader.read();
  while (!res.done) {
    outputChunks.push(new TextDecoder().decode(res.value));
    res = await reader.read();
  }

  await writePromise;
  return outputChunks.join("");
}

test("processor receives delta.content from OpenAI CC format", async () => {
  const received: string[] = [];
  const transform = createSseTextTransform((text, field) => {
    received.push(text);
    return text.toUpperCase();
  });

  const output = await testTransform(transform, [`data: {"choices":[{"delta":{"content":"hello"}}]}\n\n`]);

  assert.equal(received.length, 1);
  assert.equal(received[0], "hello");
  assert.ok(output.includes("HELLO"), "output should contain uppercased text");
});

test("processor receives 'content' field category for delta.content", async () => {
  const fields: FieldCategory[] = [];
  const transform = createSseTextTransform((text, field) => {
    fields.push(field);
    return text;
  });

  await testTransform(transform, [`data: {"choices":[{"delta":{"content":"hi"}}]}\n\n`]);

  assert.equal(fields[0], "content");
});

test("processor receives tool_calls function.arguments", async () => {
  const received: string[] = [];
  const transform = createSseTextTransform((text, field) => {
    received.push(text);
    return text;
  });

  await testTransform(transform, [`data: {"choices":[{"delta":{"tool_calls":[{"function":{"arguments":"{\\"email\\":\\"test@example.com\\"}"}}]}}]}\n\n`]);

  assert.ok(received.some(t => t.includes("test@example.com")), "should extract tool call arguments");
});

test("processor receives delta.reasoning_content with 'reasoning' category", async () => {
  const fields: FieldCategory[] = [];
  const transform = createSseTextTransform((text, field) => {
    fields.push(field);
    return text;
  });

  await testTransform(transform, [`data: {"choices":[{"delta":{"reasoning_content":"thinking..."}}]}\n\n`]);

  assert.ok(fields.includes("reasoning"));
});

test("[DONE] sentinel passes through unchanged", async () => {
  const received: string[] = [];
  const transform = createSseTextTransform((text) => {
    received.push(text);
    return text;
  });

  const output = await testTransform(transform, [`data: [DONE]\n\n`]);

  assert.equal(received.length, 0, "processor should NOT be called for [DONE]");
  assert.ok(output.includes("[DONE]"), "output should contain [DONE]");
});

test("SSE comments (: prefix) pass through unchanged", async () => {
  const received: string[] = [];
  const transform = createSseTextTransform((text) => {
    received.push(text);
    return text;
  });

  await testTransform(transform, [`: this is a comment\n\n`]);

  assert.equal(received.length, 0, "processor should NOT be called for comments");
});

test("handles data: line split across two chunks", async () => {
  const received: string[] = [];
  const transform = createSseTextTransform((text) => {
    received.push(text);
    return text;
  });

  await testTransform(transform, [
    `data: {"choices":[{"del`,
    `ta":{"content":"split"}}]}\n\n`
  ]);

  assert.equal(received.length, 1);
  assert.equal(received[0], "split");
});

test("processor receives Claude delta.text with 'content' category", async () => {
  const received: Array<{text: string, field: FieldCategory}> = [];
  const transform = createSseTextTransform((text, field) => {
    received.push({text, field});
    return text;
  });

  await testTransform(transform, [`data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"hello claude"}}\n\n`]);

  assert.ok(received.some(r => r.text === "hello claude" && r.field === "content"));
});

test("onFlush callback invoked at stream close", async () => {
  let flushCalled = false;
  const transform = createSseTextTransform(
    (text) => text,
    () => { flushCalled = true; return ""; },
  );

  await testTransform(transform, [`data: {"choices":[{"delta":{"content":"x"}}]}\n\n`]);

  assert.ok(flushCalled, "onFlush should be called when stream closes");
});

test("malformed JSON data line doesn't crash", async () => {
  const transform = createSseTextTransform((text) => text);

  const output = await testTransform(transform, [`data: {not valid json\n\n`]);

  assert.ok(output, "should emit something (passthrough on parse failure)");
});
