// tests/unit/video-bridge-derived-prompt-redaction.test.ts
// P2c of #12150/#12430 (Video Bridge transcript retention — derived-prompt
// dispatch logs, item 4).
//
// Seam trace finding (decisive): videoBridgeLog is ALREADY threaded end-to-end
// to every nested handleChatCore — pipeline-strategy stages
// (src/domain/pipeline.ts::executeStage), smart-auto-pipeline, and
// context-handoff summaries (open-sse/services/contextHandoff.ts) — because
// all of them dispatch through the single P1b `handleSingleModel` closure and
// terminate in the SAME handleChatCore -> persistAttemptLogs ->
// applyVideoBridgeLogRedaction logging path. No plumbing/param changes were
// needed anywhere.
//
// The gap this file proves closed: those derived dispatches embed the
// transcript as a SUBSTRING of a plain STRING `content` message —
// `{ role: "user", content: <rendered prompt string containing the
// "[Video description: ...]" blob> }` — built by executeStage()
// (pipeline.ts:196-199 via prompts.ts interpolation) and by the
// context-handoff summary builders (contextHandoff.ts:415/729, `{HISTORY}`
// template substitution). Before this fix, applyVideoBridgeLogRedaction only
// matched ARRAY-content parts by exact text (`part.text === fullText`), so it
// silently skipped these string-content messages and the raw transcript
// persisted in the stage/summary sub-request call logs.
//
// This suite calls the real, already-exported `applyVideoBridgeLogRedaction`
// (open-sse/handlers/chatCore/attemptLogging.ts) directly — it is a pure
// function (no DB), so no persistAttemptLogs/DB harness is needed here; that
// integration-level proof already lives in
// tests/unit/video-bridge-log-redaction.test.ts.
import { test } from "node:test";
import assert from "node:assert/strict";

import { applyVideoBridgeLogRedaction } from "../../open-sse/handlers/chatCore/attemptLogging.ts";
import type { VideoBridgeLogRedactionEntry } from "../../src/lib/guardrails/videoBridge.ts";

const SECRET = "secret words";
const FULL_TEXT = `[Video description: transcript[source=client] ${SECRET}]`;
const REDACTED_TEXT = "[Video description: transcript[source=client] [redacted-video-transcript]]";

function entry(
  overrides: Partial<VideoBridgeLogRedactionEntry> = {}
): VideoBridgeLogRedactionEntry {
  return {
    container: "messages",
    messageIndex: 0,
    partIndex: 0,
    fullText: FULL_TEXT,
    redactedText: REDACTED_TEXT,
    ...overrides,
  };
}

test("derived-prompt (pipeline stage): a string-content message with the transcript embedded as a substring is redacted, secret absent, surrounding prompt text intact", () => {
  const body = {
    model: "openai/gpt-x",
    messages: [
      { role: "system", content: "You are a summarization stage." },
      {
        role: "user",
        content: `Summarize the following context.\n\n${FULL_TEXT}\n\nEnd of context.`,
      },
    ],
  };

  const result = applyVideoBridgeLogRedaction(body, [
    entry({ messageIndex: 1, partIndex: 0 }),
  ]) as typeof body;

  const redactedContent = result.messages[1].content;
  assert.equal(
    redactedContent,
    `Summarize the following context.\n\n${REDACTED_TEXT}\n\nEnd of context.`
  );
  assert.ok(!redactedContent.includes(SECRET), "the raw transcript must not survive redaction");
  assert.ok(
    redactedContent.startsWith("Summarize the following context.\n\n"),
    "surrounding prompt text before the blob must stay intact"
  );
  assert.ok(
    redactedContent.endsWith("\n\nEnd of context."),
    "surrounding prompt text after the blob must stay intact"
  );
  assert.equal(JSON.stringify(result).includes(SECRET), false);
});

test("derived-prompt (context-handoff summary): input container string content is redacted the same way as messages", () => {
  const body = {
    model: "openai/gpt-x",
    input: [
      {
        role: "user",
        content: `Continue the conversation given this history.\n\n${FULL_TEXT}\n\nContinue now.`,
      },
    ],
  };

  const result = applyVideoBridgeLogRedaction(body, [
    entry({ container: "input", messageIndex: 0, partIndex: 0 }),
  ]) as typeof body;

  const redactedContent = result.input[0].content;
  assert.equal(
    redactedContent,
    `Continue the conversation given this history.\n\n${REDACTED_TEXT}\n\nContinue now.`
  );
  assert.ok(!redactedContent.includes(SECRET));
  assert.equal(JSON.stringify(result).includes(SECRET), false);
});

test("multiple occurrences of fullText within the same string are ALL replaced (replaceAll, not replace)", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: `First mention: ${FULL_TEXT}\n\nQuoted back for grounding: ${FULL_TEXT}\n\nDone.`,
      },
    ],
  };

  const result = applyVideoBridgeLogRedaction(body, [entry({ messageIndex: 0, partIndex: 0 })]) as {
    messages: Array<{ content: string }>;
  };

  const redactedContent = result.messages[0].content;
  assert.equal(
    redactedContent,
    `First mention: ${REDACTED_TEXT}\n\nQuoted back for grounding: ${REDACTED_TEXT}\n\nDone.`
  );
  assert.equal(
    redactedContent.split(REDACTED_TEXT).length - 1,
    2,
    "both occurrences must be replaced"
  );
  assert.ok(!redactedContent.includes(SECRET));
});

test("regression: the existing ARRAY-content exact-part-match path still redacts (no regression from the new string branch)", () => {
  const body = {
    messages: [
      { role: "system", content: "sys" },
      {
        role: "user",
        content: [
          { type: "text", text: "look at this video" },
          { type: "text", text: FULL_TEXT },
        ],
      },
    ],
  };

  const result = applyVideoBridgeLogRedaction(body, [entry({ messageIndex: 1, partIndex: 1 })]) as {
    messages: Array<{ content: unknown }>;
  };

  const content = result.messages[1].content as Array<{ text: string }>;
  assert.equal(content[1].text, REDACTED_TEXT);
  assert.ok(!content[1].text.includes(SECRET));
  assert.equal(content[0].text, "look at this video", "sibling part must stay untouched");
});

test("no mutation of the input object: the caller's body is byte-identical after redaction (string-content path)", () => {
  const body = {
    messages: [{ role: "user", content: `before ${FULL_TEXT} after` }],
  };
  const snapshotBefore = JSON.parse(JSON.stringify(body));

  applyVideoBridgeLogRedaction(body, [entry({ messageIndex: 0, partIndex: 0 })]);

  assert.deepEqual(body, snapshotBefore, "the original body must never be mutated");
});

test("non-matching string content is returned unchanged, with the SAME root reference (nothing redacted -> no clone allocated)", () => {
  const body = {
    messages: [{ role: "user", content: "nothing to see here, no transcript blob at all" }],
  };

  const result = applyVideoBridgeLogRedaction(body, [entry({ messageIndex: 0, partIndex: 0 })]);

  assert.equal(
    result,
    body,
    "when no fullText matches, the exact same object reference is returned"
  );
});
