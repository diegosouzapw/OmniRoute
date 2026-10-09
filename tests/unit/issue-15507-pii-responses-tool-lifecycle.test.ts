import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-issue-15507-"));
process.env.DATA_DIR = tmpDir;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "warn";

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

test("#15507: warn mode keeps Responses tool lifecycle bytes intact (no id mutation, no replayed done)", async () => {
  const item = {
    type: "function_call",
    id: "fc_probe",
    call_id: "call_probe",
    name: "bash",
    arguments: "",
  };
  const args = '{"command":"echo hi"}';
  const events = [
    { type: "response.output_item.added", sequence_number: 0, output_index: 0, item },
    {
      type: "response.function_call_arguments.delta",
      sequence_number: 1,
      output_index: 0,
      item_id: "fc_probe",
      delta: args,
      obfuscation: "random-padding-1",
    },
    {
      type: "response.function_call_arguments.done",
      sequence_number: 2,
      output_index: 0,
      item_id: "fc_probe",
      arguments: args,
    },
    {
      type: "response.output_item.done",
      sequence_number: 3,
      output_index: 0,
      item: { ...item, arguments: args },
    },
    {
      type: "response.completed",
      sequence_number: 4,
      response: { id: "resp_probe", status: "completed", output: [{ ...item, arguments: args }] },
    },
  ];
  const input = events.map((e) => `data: ${JSON.stringify(e)}\n\n`);
  const output = await run(input);
  const parsed = output
    .split("\n")
    .filter((l) => l.startsWith("data: "))
    .map((l) => JSON.parse(l.slice(6)));

  const added = parsed.find((e) => e.type === "response.output_item.added");
  assert.equal(added.item.call_id, "call_probe", "added.item.call_id must be preserved");
  const delta = parsed.find((e) => e.type === "response.function_call_arguments.delta");
  assert.equal(delta.item_id, "fc_probe", "arg delta item_id must be preserved");
  assert.equal(delta.delta, args, "arg delta must be preserved");
  const dones = parsed.filter((e) => e.type === "response.output_item.done");
  assert.equal(dones.length, 1, "exactly one output_item.done");
  assert.equal(output, input.join(""), "warn mode must be byte-preserving");
});
