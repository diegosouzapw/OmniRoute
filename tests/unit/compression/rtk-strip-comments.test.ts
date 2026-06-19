import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  applyRtkCompression,
  stripCode,
} from "../../../open-sse/services/compression/index.ts";
import { rtkConfigSchema } from "../../../src/shared/validation/compressionConfigSchemas.ts";
import { DEFAULT_RTK_CONFIG } from "../../../open-sse/services/compression/types.ts";

// codeStripper has always supported removeComments + preserveDocstrings, but the feature was
// unreachable: the RTK engine called stripCode with no options (so comments were never removed
// through the runtime), and preserveDocstrings was folded into opts yet never honored by
// stripJsTsComments. This proves the new RTK config fields wire it end to end and that
// preserveDocstrings now keeps JSDoc.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-strip-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } = await import(
  "../../../src/lib/db/compression.ts"
);

describe("RTK strip-code-comments — stripCode behavior", () => {
  it("removes line/block comments but keeps JSDoc when preserveDocstrings is on", () => {
    const code = [
      "/** Adds two numbers. */",
      "function add(a, b) {",
      "  // inline note",
      "  return a + b; /* trailing */",
      "}",
    ].join("\n");
    const out = stripCode(code, "typescript", {
      removeComments: true,
      preserveDocstrings: true,
      removeEmptyLines: false,
      collapseWhitespace: false,
    });
    assert.ok(out.text.includes("/** Adds two numbers. */"), "JSDoc preserved");
    assert.ok(!out.text.includes("inline note"), "line comment removed");
    assert.ok(!out.text.includes("trailing"), "trailing block comment removed");
  });

  it("removes JSDoc too when preserveDocstrings is off", () => {
    const out = stripCode("/** doc */\nconst x = 1; // n", "typescript", {
      removeComments: true,
      preserveDocstrings: false,
      removeEmptyLines: false,
      collapseWhitespace: false,
    });
    assert.ok(!out.text.includes("doc"), "JSDoc removed when not preserving");
    assert.ok(!out.text.includes("// n"), "line comment removed");
  });
});

describe("RTK strip-code-comments — runtime reachability", () => {
  it("strips fenced-block comments when applyToCodeBlocks + stripCodeComments are on", () => {
    // RTK only processes tool/assistant messages (shouldCompressMessage); code-block stripping
    // rides on applyToCodeBlocks for assistant content regardless of applyToAssistantMessages.
    const body = {
      messages: [
        {
          role: "assistant",
          content: "```ts\n// secret note\nconst x = 1;\n/* block secret */\nconst y = 2;\n```",
        },
      ],
    };
    const result = applyRtkCompression(body, {
      config: {
        ...DEFAULT_RTK_CONFIG,
        enabled: true,
        applyToCodeBlocks: true,
        stripCodeComments: true,
      },
    });
    const serialized = JSON.stringify(result.body.messages);
    assert.ok(!serialized.includes("secret note"), "line comment stripped via runtime");
    assert.ok(!serialized.includes("block secret"), "block comment stripped via runtime");
    assert.match(serialized, /const x = 1/);
    assert.match(serialized, /const y = 2/);
  });

  it("leaves fenced-block comments intact when stripCodeComments is off (default)", () => {
    const body = {
      messages: [{ role: "assistant", content: "```ts\n// keep me\nconst x = 1;\n```" }],
    };
    const result = applyRtkCompression(body, {
      config: { ...DEFAULT_RTK_CONFIG, enabled: true, applyToCodeBlocks: true },
    });
    assert.match(JSON.stringify(result.body.messages), /keep me/);
  });
});

describe("RTK strip-code-comments — config persistence", () => {
  beforeEach(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  });

  afterEach(() => {
    core.resetDbInstance();
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  });

  it("accepts stripCodeComments / preserveDocstrings on the write schema", () => {
    assert.equal(
      rtkConfigSchema.safeParse({ stripCodeComments: true, preserveDocstrings: false }).success,
      true
    );
  });

  it("preserves stripCodeComments / preserveDocstrings through a DB round-trip", async () => {
    const settings = await updateCompressionSettings({
      rtkConfig: { ...DEFAULT_RTK_CONFIG, stripCodeComments: true, preserveDocstrings: false },
    });
    assert.equal(settings.rtkConfig.stripCodeComments, true);
    assert.equal(settings.rtkConfig.preserveDocstrings, false);

    core.resetDbInstance();
    const reread = await getCompressionSettings();
    assert.equal(reread.rtkConfig.stripCodeComments, true);
    assert.equal(reread.rtkConfig.preserveDocstrings, false);
  });
});
