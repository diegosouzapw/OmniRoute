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

  const output = await testTransform(transform, [
    `data: {"choices":[{"delta":{"content":"hello"}}]}\n\n`,
  ]);

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

test("processor does not mutate tool_calls function.arguments", async () => {
  const received: string[] = [];
  const transform = createSseTextTransform((text, field) => {
    received.push(`${field}:${text}`);
    return "MUTATED";
  });
  const payload = {
    choices: [
      {
        delta: {
          tool_calls: [
            {
              function: {
                arguments: JSON.stringify({ command: "find /tmp -name test.txt" }),
              },
            },
          ],
        },
      },
    ],
  };

  const output = await testTransform(transform, [`data: ${JSON.stringify(payload)}\n\n`]);

  assert.equal(received.length, 0, "tool call arguments must bypass text processors");
  assert.ok(output.includes("find /tmp -name test.txt"), "arguments should pass through unchanged");
  assert.ok(!output.includes("MUTATED"), "processor output must not replace tool JSON");
});

test("processor receives delta.reasoning_content with 'reasoning' category", async () => {
  const fields: FieldCategory[] = [];
  const transform = createSseTextTransform((text, field) => {
    fields.push(field);
    return text;
  });

  await testTransform(transform, [
    `data: {"choices":[{"delta":{"reasoning_content":"thinking..."}}]}\n\n`,
  ]);

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

  await testTransform(transform, [`data: {"choices":[{"del`, `ta":{"content":"split"}}]}\n\n`]);

  assert.equal(received.length, 1);
  assert.equal(received[0], "split");
});

test("processor receives Claude delta.text with 'content' category", async () => {
  const received: Array<{ text: string; field: FieldCategory }> = [];
  const transform = createSseTextTransform((text, field) => {
    received.push({ text, field });
    return text;
  });

  await testTransform(transform, [
    `data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"hello claude"}}\n\n`,
  ]);

  assert.ok(received.some((r) => r.text === "hello claude" && r.field === "content"));
});

test("onFlush callback invoked at stream close", async () => {
  let flushCalled = false;
  const transform = createSseTextTransform(
    (text) => text,
    () => {
      flushCalled = true;
      return "";
    }
  );

  await testTransform(transform, [`data: {"choices":[{"delta":{"content":"x"}}]}\n\n`]);

  assert.ok(flushCalled, "onFlush should be called when stream closes");
});

test("malformed JSON data line doesn't crash", async () => {
  const transform = createSseTextTransform((text) => text);

  const output = await testTransform(transform, [`data: {not valid json\n\n`]);

  assert.ok(output, "should emit something (passthrough on parse failure)");
});

test("unknown JSON format passes through without processing (no processDeep)", async () => {
  const received: string[] = [];
  const transform = createSseTextTransform((text) => {
    received.push(text);
    return text.toUpperCase();
  });

  const output = await testTransform(transform, [
    `data: {"model":"gpt-4","id":"chatcmpl-123","object":"chat.completion.chunk"}\n\n`,
  ]);

  assert.equal(received.length, 0, "processor should NOT be called for unrecognized format");
  assert.ok(output.includes('"model":"gpt-4"'), "original data should pass through unchanged");
});

test("onFlush called exactly once when [DONE] is present", async () => {
  let flushCount = 0;
  const transform = createSseTextTransform(
    (text) => text,
    () => {
      flushCount++;
      return null;
    }
  );

  await testTransform(transform, [
    `data: {"choices":[{"delta":{"content":"hi"}}]}\n\n`,
    `data: [DONE]\n\n`,
  ]);

  assert.equal(flushCount, 1, "onFlush should be called exactly once");
});

test("Gemini candidates[0].content.parts[0].text is processed", async () => {
  const received: Array<{ text: string; field: FieldCategory }> = [];
  const transform = createSseTextTransform((text, field) => {
    received.push({ text, field });
    return text.toUpperCase();
  });

  const output = await testTransform(transform, [
    `data: {"candidates":[{"content":{"parts":[{"text":"gemini response"}]}}]}\n\n`,
  ]);

  assert.ok(received.some((r) => r.text === "gemini response" && r.field === "content"));
  assert.ok(output.includes("GEMINI RESPONSE"));
});

test("Responses API string delta is processed", async () => {
  const received: string[] = [];
  const transform = createSseTextTransform((text) => {
    received.push(text);
    return text;
  });

  await testTransform(transform, [
    `data: {"type":"response.output_text.delta","delta":"hello responses"}\n\n`,
  ]);

  assert.ok(received.includes("hello responses"));
});

test("recursive scanning sanitizes multiple nested format fields (no format bypass)", async () => {
  let callCount = 0;
  const transform = createSseTextTransform((text) => {
    callCount++;
    return text;
  });

  // This JSON has both `choices` (OpenAI) AND top-level `content` (Generic)
  await testTransform(transform, [
    `data: {"choices":[{"delta":{"content":"hi"}}],"content":"generic"}\n\n`,
  ]);

  // Should sanitize both fields recursively to prevent format-based bypasses
  assert.equal(callCount, 2, "processor should be called for each string property recursively");
});

test("Responses API snapshot text is identified as snapshot and bypasses delta buffering", async () => {
  let isSnapshotReceived = false;
  const transform = createSseTextTransform((text, field, isStopSignal, index, isSnapshot) => {
    if (isSnapshot) {
      isSnapshotReceived = true;
    }
    return text.toUpperCase();
  });

  const output = await testTransform(transform, [
    `data: {"type":"response.output_text.done","text":"hello snapshot"}\n\n`,
  ]);

  assert.ok(isSnapshotReceived, "should identify done event as snapshot");
  assert.ok(output.includes("HELLO SNAPSHOT"), "output should contain sanitized snapshot text");
});
