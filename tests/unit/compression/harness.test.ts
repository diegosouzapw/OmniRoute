import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  measureCompression,
  computeRetention,
  extractEntities,
  runCompressionEval,
  tokensPerTask,
  checkTokensPerTaskGate,
  replayTranscripts,
  transcriptsToCorpus,
  requestBodyToTranscript,
  requestBodiesToTranscripts,
} from "../../../open-sse/services/compression/harness/index.ts";

const SAMPLE = "Call fetchUser() at https://api.example.com/v1 with MAX_RETRIES set to 3.0.0";

describe("compression harness — measure (C1)", () => {
  it("extracts technical entities from the original", () => {
    const entities = extractEntities(SAMPLE);
    assert.ok(entities.length >= 3, `expected >=3 entities, got ${entities.length}`);
    assert.ok(
      entities.some((e) => e.includes("api.example.com")),
      "url entity missing"
    );
    assert.ok(
      entities.some((e) => e.includes("MAX_RETRIES")),
      "const_case entity missing"
    );
  });

  it("scores full retention when nothing is lost", () => {
    const m = measureCompression(SAMPLE, SAMPLE);
    assert.equal(m.retention.score, 1);
    assert.equal(m.retention.survived, m.retention.total);
    assert.equal(m.retention.lost.length, 0);
    assert.equal(m.savingsPercent, 0);
  });

  it("retention drops and lost-list signals when a URL is removed (degraded)", () => {
    const degraded = "Call fetchUser() with MAX_RETRIES set to 3.0.0";
    const r = computeRetention(SAMPLE, degraded);
    assert.ok(r.score < 1, "retention should drop when the URL is dropped");
    assert.ok(
      r.lost.some((e) => e.includes("api.example.com")),
      "lost list must name the URL"
    );
  });

  it("reports a positive savings ratio when the compressed text is shorter", () => {
    const m = measureCompression(SAMPLE, "fetchUser https://api.example.com/v1 MAX_RETRIES 3.0.0");
    assert.ok(m.savingsPercent > 0, "shorter output should report savings");
    assert.ok(m.compressedTokens < m.originalTokens);
  });
});

describe("compression harness — eval runner (C1)", () => {
  it("aggregates ratio + retention across a corpus", async () => {
    const corpus = [
      { id: "a", input: SAMPLE, task: "chat" },
      { id: "b", input: "Read config from process.env.API_KEY then run build()", task: "chat" },
    ];
    const report = await runCompressionEval(corpus, (s) => s); // identity = lossless
    assert.equal(report.results.length, 2);
    assert.equal(report.meanRetention, 1);
    assert.equal(report.meanSavingsPercent, 0);
  });

  it("awaits async compress functions (H10-friendly)", async () => {
    const report = await runCompressionEval(
      [{ id: "a", input: SAMPLE, task: "chat" }],
      async (s) => s
    );
    assert.equal(report.results[0].retention.score, 1);
  });
});

describe("compression harness — tokens-per-task gate (N4)", () => {
  const longInput = "lorem ipsum dolor sit amet ".repeat(40);

  it("passes when cost/task matches the baseline", async () => {
    const corpus = [{ id: "a", input: longInput, task: "chat" }];
    const baselineReport = await runCompressionEval(corpus, () => "ok");
    const baseline = { tasks: tokensPerTask(baselineReport) };

    const gate = checkTokensPerTaskGate(baselineReport, baseline);
    assert.equal(gate.passed, true);
    assert.equal(gate.regressions.length, 0);
  });

  it("FAILS when compressed cost/task rises above the baseline", async () => {
    const corpus = [{ id: "a", input: longInput, task: "chat" }];
    const baselineReport = await runCompressionEval(corpus, () => "ok"); // tiny output
    const baseline = { tasks: tokensPerTask(baselineReport) };

    // Regression: the pipeline now barely compresses (returns the full input).
    const regressedReport = await runCompressionEval(corpus, (s) => s);
    const gate = checkTokensPerTaskGate(regressedReport, baseline);

    assert.equal(gate.passed, false);
    assert.equal(gate.regressions[0].task, "chat");
    assert.ok(gate.regressions[0].current > gate.regressions[0].baseline);
    assert.ok(gate.regressions[0].deltaPercent > gate.tolerancePercent);
  });
});

describe("compression harness — transcript replay (TV3)", () => {
  it("flattens transcripts into a corpus skipping empty turns", () => {
    const corpus = transcriptsToCorpus([
      {
        id: "t1",
        turns: [
          { role: "user", content: "hi" },
          { role: "assistant", content: "  " },
        ],
      },
    ]);
    assert.equal(corpus.length, 1);
    assert.equal(corpus[0].task, "t1");
  });

  it("measures ratio + retention replaying real transcript turns", async () => {
    const report = await replayTranscripts(
      [
        {
          id: "t1",
          turns: [
            { role: "user", content: "see https://x.com/a and call run()" },
            { role: "assistant", content: "ok done" },
          ],
        },
      ],
      (s) => s
    );
    assert.equal(report.results.length, 2);
    assert.ok(report.results.every((r) => r.task === "t1"));
    assert.equal(report.meanRetention, 1);
  });
});

describe("compression harness — transcript loader (TV3)", () => {
  it("builds a transcript from a captured request body, flattening content blocks", () => {
    const transcript = requestBodyToTranscript("req-1", {
      model: "gpt-x",
      messages: [
        { role: "system", content: "You are helpful." },
        {
          role: "user",
          content: [
            { type: "text", text: "first block" },
            { type: "image_url", image_url: { url: "data:..." } },
            { type: "text", text: "second block" },
          ],
        },
      ],
    });
    assert.equal(transcript.id, "req-1");
    assert.equal(transcript.turns.length, 2);
    assert.equal(transcript.turns[0].role, "system");
    assert.equal(transcript.turns[0].content, "You are helpful.");
    // multimodal content flattened to its text blocks (image dropped)
    assert.equal(transcript.turns[1].content, "first block\nsecond block");
  });

  it("returns an empty transcript for a body without a messages array", () => {
    assert.deepEqual(requestBodyToTranscript("empty", { foo: 1 }), { id: "empty", turns: [] });
    assert.deepEqual(requestBodyToTranscript("nullish", null), { id: "nullish", turns: [] });
  });

  it("maps captured bodies into transcripts that feed the replay corpus", () => {
    const transcripts = requestBodiesToTranscripts([
      { id: "a", body: { messages: [{ role: "user", content: "hi" }] } },
      { id: "b", body: { messages: [{ role: "user", content: "  " }] } }, // empty turn → skipped
    ]);
    assert.equal(transcripts.length, 2);
    const corpus = transcriptsToCorpus(transcripts);
    // transcript "a" contributes one case; "b" is all-blank so transcriptsToCorpus drops it
    assert.equal(corpus.length, 1);
    assert.equal(corpus[0].task, "a");
  });
});
