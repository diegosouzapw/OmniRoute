import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-issue-15507-b-"));
process.env.DATA_DIR = tmpDir;
process.env.PII_RESPONSE_SANITIZATION = "true";

import { createPiiSseTransform } from "../../src/lib/streamingPiiTransform.ts";

async function run(chunks: string[]): Promise<string> {
  const t = createPiiSseTransform();
  const writer = t.writable.getWriter();
  const reader = t.readable.getReader();
  const w = (async () => {
    for (const c of chunks) await writer.write(new TextEncoder().encode(c));
    await writer.close();
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await w;
  return out.join("");
}

const EMAIL = "jane.doe@example.com";
const parts = ["Contact me at ", EMAIL, " please. ", "x".repeat(300), " bye"];
const full = parts.join("");

function textStream(): string[] {
  const evs: Array<Record<string, unknown>> = parts.map((p, i) => ({
    type: "response.output_text.delta",
    sequence_number: i,
    item_id: "msg_1",
    output_index: 0,
    content_index: 0,
    delta: p,
  }));
  evs.push({
    type: "response.output_text.done",
    sequence_number: 10,
    item_id: "msg_1",
    output_index: 0,
    content_index: 0,
    text: full,
  });
  evs.push({
    type: "response.completed",
    sequence_number: 11,
    response: {
      id: "resp_1",
      status: "completed",
      output: [
        {
          type: "message",
          id: "msg_1",
          role: "assistant",
          content: [{ type: "output_text", text: full }],
        },
      ],
    },
  });
  return evs.map((e) => `data: ${JSON.stringify(e)}\n\n`);
}

test("#15507: warn mode passes Responses text deltas through byte-identical", async () => {
  process.env.PII_RESPONSE_SANITIZATION_MODE = "warn";
  const input = textStream();
  assert.equal(await run(input), input.join(""));
});

test("#15507: redact mode sanitizes the response.completed text snapshot", async () => {
  process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
  const out = await run(textStream());
  assert.ok(!out.includes(EMAIL), "email must not leak anywhere in the stream");
  const completed = out
    .split("\n")
    .filter((l) => l.startsWith("data: "))
    .map((l) => JSON.parse(l.slice(6)))
    .find((e) => e.type === "response.completed");
  assert.ok(completed.response.output[0].content[0].text.includes("[EMAIL_REDACTED]"));
  const dones = out.match(/"type":"response.completed"/g) || [];
  assert.equal(dones.length, 1);
});
