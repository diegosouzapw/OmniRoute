/**
 * Regression test — the live "Generating… / Thinking…" preview in
 * /api/logs/[id] read the request's in-flight stream-chunk log by parsing
 * each logged chunk-array element independently. Each element is one raw
 * network read (timestamp-prefixed for the debug display), not one complete
 * SSE `data:` line, so a single JSON value (e.g. a `reasoning_content` delta)
 * routinely splits across two or more elements. Parsing per-element in
 * isolation intermittently fails JSON.parse and silently drops that piece,
 * leaving gaps in the reconstructed text that read as garbled/scrambled
 * reasoning once the survivors are concatenated — reported live via a
 * dashboard screenshot showing exactly this on /dashboard/conversations.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { extractPartialAssistantText } = await import("../../src/app/api/logs/[id]/route.ts");

function chunkLine(timestamp: string, json: unknown): string {
  return `[${timestamp}] data: ${JSON.stringify(json)}\n\n`;
}

test("extractPartialAssistantText: reasoning_content split across two chunk-log entries reassembles cleanly", () => {
  const fullDelta = "Let me analyze this conversation carefully to create a checkpoint.";
  // Simulate the exact real-world failure: a raw network read boundary lands
  // mid-JSON-string, so the JSON text for one `reasoning_content` delta value
  // is split across two separately-timestamped chunk-log array elements.
  const splitPoint = 30;
  const firstHalfJson = JSON.stringify({
    choices: [{ delta: { reasoning_content: fullDelta.slice(0, splitPoint) } }],
  });
  const secondHalfJson = JSON.stringify({
    choices: [{ delta: { reasoning_content: fullDelta.slice(splitPoint) } }],
  });
  const splitAt = firstHalfJson.indexOf(fullDelta.slice(0, splitPoint)) + splitPoint;

  const chunkArr = [
    `[23:55:00.100] data: ${firstHalfJson.slice(0, splitAt)}`,
    `[23:55:00.101] ${firstHalfJson.slice(splitAt)}\n\n`,
    chunkLine("23:55:00.102", { choices: [{ delta: { reasoning_content: "" } }] }),
  ];
  // The second delta value is itself split too, to prove multi-split survives.
  const secondSplitAt = 10;
  chunkArr.push(`[23:55:00.103] data: ${secondHalfJson.slice(0, secondSplitAt)}`);
  chunkArr.push(`[23:55:00.104] ${secondHalfJson.slice(secondSplitAt)}\n\n`);

  const result = extractPartialAssistantText({ client: chunkArr });

  assert.equal(
    result,
    `_Thinking…_\n\n${fullDelta}`,
    "the reasoning text must reassemble whole, with no gaps from the split JSON values"
  );
});

test("extractPartialAssistantText: without concatenation-first, the split would silently drop reasoning text (documents the bug this test guards against)", () => {
  // Direct demonstration of the OLD (buggy) per-element parsing behavior, so
  // this test file also documents exactly what broke: parsing each element
  // in isolation, a fragment split mid-JSON-string is unparseable on its own.
  const fullDelta = "some reasoning text";
  const json = JSON.stringify({ choices: [{ delta: { reasoning_content: fullDelta } }] });
  const splitAt = Math.floor(json.length / 2);
  const first = `[00:00:00.000] data: ${json.slice(0, splitAt)}`;
  const second = `[00:00:00.001] ${json.slice(splitAt)}`;

  const oldBuggyParse = (raw: string): string | null => {
    const idx = raw.indexOf("data:");
    if (idx === -1) return null;
    try {
      JSON.parse(raw.slice(idx + 5).trim());
      return "parsed";
    } catch {
      return null;
    }
  };

  assert.equal(oldBuggyParse(first), null, "first fragment alone is not valid JSON");
  assert.equal(oldBuggyParse(second), null, "second fragment alone is not valid JSON either");

  // But the fixed function, which concatenates before parsing, recovers it fully.
  const result = extractPartialAssistantText({ client: [first, second] });
  assert.equal(result, `_Thinking…_\n\n${fullDelta}`);
});

test("extractPartialAssistantText: content (not just reasoning) also survives a chunk-log split", () => {
  const fullText = "The answer is forty-two.";
  const json = JSON.stringify({ choices: [{ delta: { content: fullText } }] });
  const splitAt = Math.floor(json.length / 2);
  const chunkArr = [
    `[10:00:00.000] data: ${json.slice(0, splitAt)}`,
    `[10:00:00.001] ${json.slice(splitAt)}`,
  ];

  const result = extractPartialAssistantText({ provider: chunkArr });
  assert.equal(result, fullText);
});

test("extractPartialAssistantText: no reasoning/content anywhere returns empty string", () => {
  assert.equal(extractPartialAssistantText(null), "");
  assert.equal(extractPartialAssistantText({}), "");
  assert.equal(extractPartialAssistantText({ client: [] }), "");
});
