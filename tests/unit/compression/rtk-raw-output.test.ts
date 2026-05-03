import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  processRtkText,
  readRtkRawOutput,
  redactRtkRawOutput,
} from "../../../open-sse/services/compression/index.ts";

const originalDataDir = process.env.DATA_DIR;

afterEach(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

describe("RTK raw output retention", () => {
  it("redacts secrets before raw output persistence and exposes a pointer", () => {
    const tempData = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-raw-"));
    process.env.DATA_DIR = tempData;
    const raw = [
      "Error: failed with token=sk-1234567890abcdefghijklmnop",
      ...Array.from({ length: 40 }, () => "same noisy line"),
    ].join("\n");

    const result = processRtkText(raw, {
      command: "custom",
      config: {
        rawOutputRetention: "always",
        maxLinesPerResult: 2,
        maxCharsPerResult: 120,
      },
    });

    assert.equal(result.compressed, true);
    assert.equal(result.rawOutputPointers?.length, 1);
    const pointer = result.rawOutputPointers?.[0];
    assert.ok(pointer);
    const recovered = readRtkRawOutput(pointer.id);
    assert.ok(recovered);
    assert.ok(recovered.includes("[REDACTED"));
    assert.ok(!recovered.includes("sk-1234567890abcdefghijklmnop"));
  });

  it("keeps raw output disabled by default", () => {
    const redacted = redactRtkRawOutput("Authorization: Bearer secret-token-value");
    assert.equal(redacted.redacted, true);
    assert.ok(!redacted.text.includes("secret-token-value"));

    const result = processRtkText("line\nline\nline\nline", {
      config: { maxLinesPerResult: 1 },
    });

    assert.equal(result.rawOutputPointers, undefined);
  });
});
