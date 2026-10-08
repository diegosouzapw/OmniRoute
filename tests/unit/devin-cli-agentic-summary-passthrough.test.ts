// Regression test for issue #13691: devin-cli-agentic forwarded a bare
// <summary>...</summary> envelope (Devin's internal "summarizer" progress
// report) as the final assistant text verbatim, with stop_reason "end_turn"
// (translated to OpenAI finish_reason "stop" downstream). SWE-2 models are
// heavily tuned to emit this envelope even when no further tool call is
// needed, so agent loops treated the internal report as the answer and
// stopped.
//
// This test drives the real DevinCliAgenticExecutor against a fake local ACP
// bridge (tests/unit/fake-devin-acp-summarizer.mjs) that reproduces exactly
// that behavior: it answers a session/prompt with a <summary> envelope and no
// <tool> tag. No network/devin binary is involved.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DevinCliAgenticExecutor } from "../../open-sse/executors/devin-cli-agentic.ts";
import { extractBareSummaryEnvelope } from "../../open-sse/executors/devin-agentic/toolParser.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FAKE_BIN = path.join(__dirname, "fake-devin-acp-summarizer.mjs");

test("devin-cli-agentic must not forward a bare <summary> envelope as the final answer (#13691)", async () => {
  const sandboxHome = fs.mkdtempSync(path.join(os.tmpdir(), "devin-agentic-"));
  const home = path.join(sandboxHome, ".sandbox", "home");
  fs.mkdirSync(home, { recursive: true });

  const previousBin = process.env.CLI_DEVIN_AGENTIC_BIN;
  const previousHome = process.env.DEVIN_AGENTIC_HOME;
  process.env.CLI_DEVIN_AGENTIC_BIN = FAKE_BIN;
  process.env.DEVIN_AGENTIC_HOME = home;

  try {
    const executor = new DevinCliAgenticExecutor();
    const result = await executor.execute({
      model: "claude-sonnet-4-6",
      stream: false,
      credentials: {},
      body: {
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages: [{ role: "user", content: "Look up the record for me." }],
        tools: [
          {
            name: "lookup",
            description: "Look up a record",
            input_schema: { type: "object", properties: {}, additionalProperties: false },
          },
        ],
      },
    });

    assert.equal(result.response.status, 200, "executor must not error out on this input");
    const payload = await result.response.json();
    assert.equal(payload.type, "message");

    const textBlock = (payload.content || []).find(
      (block: { type?: string }) => block.type === "text"
    );
    assert.ok(textBlock, "expected a text content block in the response");
    const finalText: string = textBlock.text;

    // The fake bridge always answers with the same <summary> envelope, no
    // matter what repair prompt is sent, so the bounded-retry path exhausts
    // and the executor must fall back to stripping the wrapper.
    assert.ok(
      !/<summary>/i.test(finalText),
      `expected the <summary> envelope to be stripped/handled before being returned as the final answer, got:\n${finalText}`
    );
    assert.ok(
      finalText.includes("Lookup finished and the record was located."),
      "expected the stripped inner body to still carry the useful content"
    );
  } finally {
    if (previousBin === undefined) delete process.env.CLI_DEVIN_AGENTIC_BIN;
    else process.env.CLI_DEVIN_AGENTIC_BIN = previousBin;
    if (previousHome === undefined) delete process.env.DEVIN_AGENTIC_HOME;
    else process.env.DEVIN_AGENTIC_HOME = previousHome;
    fs.rmSync(sandboxHome, { recursive: true, force: true });
  }
});

test("extractBareSummaryEnvelope only matches a whole-string <summary> wrapper (#13691)", () => {
  assert.equal(extractBareSummaryEnvelope("<summary>inner text</summary>"), "inner text");
  assert.equal(extractBareSummaryEnvelope("  <summary>\ninner text\n</summary>  "), "inner text");
  // A narrative block that merely mentions "summary" or has a <summary> tag
  // alongside other prose must not be treated as a bare envelope.
  assert.equal(extractBareSummaryEnvelope("Here is a summary of what I did."), null);
  assert.equal(
    extractBareSummaryEnvelope("<summary>partial</summary>\nSome trailing narrative."),
    null
  );
});
