import test from "node:test";
import assert from "node:assert/strict";
import { createPiiSseTransform } from "../../src/lib/streamingPiiTransform";

test("First chunk is stop signal", async () => {
  const transform = createPiiSseTransform({ windowSize: 3 });
  const writer = transform.writable.getWriter();
  const chunks: string[] = [];
  const reader = transform.readable.getReader();

  const readPromise = (async () => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(new TextDecoder().decode(value));
    }
  })();

  const encoder = new TextEncoder();
  const payload = JSON.stringify({ choices: [{ delta: { content: "Hello" }, finish_reason: "stop" }] });
  await writer.write(encoder.encode(`data: ${payload}\n`));
  await writer.close();
  await readPromise;

  const fullOutput = chunks.join("");
  console.log("FULL OUTPUT:", JSON.stringify(fullOutput));
  assert.ok(fullOutput.includes("Hello"), "Should contain the full buffered text");
  // It should be valid JSON
  const lines = fullOutput.split("\n").filter(l => l.startsWith("data: ") && !l.includes("[DONE]"));
  const parsed = JSON.parse(lines[0].replace("data: ", ""));
  assert.equal(parsed.choices[0].delta.content, "Hello");
});
