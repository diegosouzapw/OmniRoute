import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  applyCompression,
  maybePersistRtkRawOutput,
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

  it("retains only configured failure output and enforces byte caps", () => {
    const tempData = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-raw-cap-"));
    process.env.DATA_DIR = tempData;

    assert.equal(
      maybePersistRtkRawOutput("ordinary successful output", { retention: "failures" }),
      null
    );

    const pointer = maybePersistRtkRawOutput("error: " + "x".repeat(5000), {
      retention: "failures",
      maxBytes: 64,
    });
    assert.ok(pointer);
    const recovered = readRtkRawOutput(pointer.id);
    assert.ok(recovered?.includes("truncated at 1024 bytes"));
    assert.equal(readRtkRawOutput("0123456789abcdef01234567"), null);
  });

  it("propagates raw output pointers from stacked RTK runs", () => {
    const tempData = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-stacked-raw-"));
    process.env.DATA_DIR = tempData;

    const result = applyCompression(
      {
        messages: [
          {
            role: "tool",
            content: [
              "Error: failed with Authorization: Bearer secret-token-value",
              ...Array.from({ length: 40 }, () => "same noisy line"),
            ].join("\n"),
          },
        ],
      },
      "stacked",
      {
        config: {
          enabled: true,
          defaultMode: "stacked",
          autoTriggerTokens: 0,
          cacheMinutes: 5,
          preserveSystemPrompt: true,
          comboOverrides: {},
          rtkConfig: {
            enabled: true,
            intensity: "standard",
            applyToToolResults: true,
            applyToCodeBlocks: false,
            applyToAssistantMessages: false,
            enabledFilters: [],
            disabledFilters: [],
            maxLinesPerResult: 2,
            maxCharsPerResult: 120,
            deduplicateThreshold: 3,
            customFiltersEnabled: true,
            trustProjectFilters: false,
            rawOutputRetention: "always",
            rawOutputMaxBytes: 1_048_576,
          },
          stackedPipeline: [{ engine: "rtk", intensity: "standard" }],
        },
      }
    );

    const pointer = result.stats?.rtkRawOutputPointers?.[0];
    assert.ok(pointer);
    assert.ok(readRtkRawOutput(pointer.id)?.includes("[REDACTED"));
  });

  it("never throws when the raw-output write fails (disk error → null pointer)", () => {
    // Point DATA_DIR underneath a regular FILE so mkdirSync(recursive) throws ENOTDIR.
    // maybePersistRtkRawOutput is best-effort capture: a write failure must degrade to a
    // skipped capture (null), never propagate into the compression pipeline (F5.3).
    const blocker = path.join(os.tmpdir(), `omniroute-rtk-blocked-${process.pid}-${Date.now()}`);
    fs.writeFileSync(blocker, "x");
    process.env.DATA_DIR = path.join(blocker, "nested");

    let pointer: ReturnType<typeof maybePersistRtkRawOutput> | undefined;
    assert.doesNotThrow(() => {
      pointer = maybePersistRtkRawOutput("error: boom\n" + "noise\n".repeat(8), {
        retention: "always",
      });
    });
    assert.equal(pointer, null);
    fs.rmSync(blocker, { force: true });
  });

  it("redacts Basic/Proxy auth headers and key fields the base patterns miss", () => {
    const basic = redactRtkRawOutput("> Authorization: Basic dXNlcjpwYXNzd29yZA==");
    assert.equal(basic.redacted, true);
    assert.ok(!basic.text.includes("dXNlcjpwYXNzd29yZA=="), "Authorization: Basic base64 redacted");

    const proxy = redactRtkRawOutput("Proxy-Authorization: Basic c2VjcmV0OnBhc3M=");
    assert.equal(proxy.redacted, true);
    assert.ok(!proxy.text.includes("c2VjcmV0OnBhc3M="), "Proxy-Authorization redacted");

    const pkey = redactRtkRawOutput("private_key=abc123def456ghi");
    assert.equal(pkey.redacted, true);
    assert.ok(!pkey.text.includes("abc123def456ghi"), "private_key value redacted");

    const cred = redactRtkRawOutput("credential: my-credential-value-x");
    assert.equal(cred.redacted, true);
    assert.ok(!cred.text.includes("my-credential-value-x"), "credential value redacted");
  });
});
