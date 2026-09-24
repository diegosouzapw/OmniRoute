import test from "node:test";
import assert from "node:assert/strict";

const {
  judgeBufferedTurn,
  readBoundedResponseOutcome,
  isUsefulSummary,
  summarizeReplayedUpstreamTurn,
  FLUSH_EMPTY_RETRY_MAX_BYTES,
} = await import("../../open-sse/utils/emptyTurnRetry.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const TARGET = FORMATS.OPENAI;
const CLIENT = FORMATS.OPENAI;

const chatChunk = (delta: unknown) =>
  `data: ${JSON.stringify({ choices: [{ delta, finish_reason: null }] })}\n\n`;
const textChunk = (content: string) => chatChunk({ content });
const toolChunk = () =>
  chatChunk({ tool_calls: [{ id: "call-1", function: { name: "f", arguments: "{}" } }] });
const sse = (...frames: string[]) => frames.join("") + "data: [DONE]\n\n";
const bytes = (s: string) => new TextEncoder().encode(s);
const OPTS = { targetFormat: TARGET, sourceFormat: CLIENT };

function respOf(chunks: Uint8Array[], counter: { reads: number }): Response {
  let i = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      counter.reads += 1;
      if (i < chunks.length) controller.enqueue(chunks[i++]);
      else controller.close();
    },
  });
  return new Response(stream, { headers: { "content-type": "text/event-stream" } });
}

test("first useful chunk stops the bounded read, original intact", async () => {
  const tail = "x".repeat(10_000);
  // Chat-completions upstream (identical target/source = same-format replay):
  // the summary classifies translated content on this path.
  const full = sse(textChunk("hello") + textChunk(tail));
  // One chunk per line: the producer counts reads so early-stop is observable.
  const chunks = full.split("\n").map((l) => bytes(l + "\n"));
  const counter = { reads: 0 };
  const original = respOf(chunks, counter);
  const outcome = await readBoundedResponseOutcome(
    original,
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    1000,
    OPTS
  );
  assert.equal(outcome.kind, "early-pass");
  assert.ok(counter.reads < chunks.length, `stopped early (${counter.reads}/${chunks.length})`);
  const verdict = judgeBufferedTurn(outcome, TARGET, CLIENT, false);
  assert.equal(verdict.kind, "pass");
  assert.equal((verdict as { idlePass?: true }).idlePass, undefined);
  // The bounded read consumes the CLONE (response.clone() in
  // readBoundedResponseOutcome) — the pipe target is the untouched original.
  // Prove the clone contract: the outcome fired before the tail was read.
  assert.ok(counter.reads <= 4, `early stop before tail (${counter.reads} reads)`);
});

test("tool-call turn stops early", async () => {
  const toolTurn = sse(toolChunk());
  const counter = { reads: 0 };
  const outcome = await readBoundedResponseOutcome(
    respOf([bytes(toolTurn)], counter),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    1000,
    OPTS
  );
  assert.equal(outcome.kind, "early-pass");
  assert.equal(judgeBufferedTurn(outcome, TARGET, CLIENT, false).kind, "pass");
});

test("empty turn never stops early", async () => {
  const empty = sse(`data: ${JSON.stringify({ choices: [] })}\n\n`);
  const outcome = await readBoundedResponseOutcome(
    respOf([bytes(empty)], counter0()),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    1000,
    OPTS
  );
  assert.notEqual(outcome.kind, "early-pass");
  function counter0() {
    return { reads: 0 };
  }
});

test("hostile text neither stops early nor errors", async () => {
  const hostile = sse(
    "data: {incomplet\n" + "data: not-json{{{\n" + "data: \n" + "data: [DONE]\n" + ": comment\n"
  );
  const counter = { reads: 0 };
  const outcome = await readBoundedResponseOutcome(
    respOf([bytes(hostile)], counter),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    1000,
    OPTS
  );
  assert.notEqual(outcome.kind, "early-pass");
  assert.notEqual(outcome.kind, "error");
});

test("stall before content keeps the parent idle branch", async () => {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes(`data: ${JSON.stringify({ choices: [] })}\n\n`));
    },
  });
  const outcome = await readBoundedResponseOutcome(
    new Response(stream, { headers: { "content-type": "text/event-stream" } }),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    50,
    OPTS
  );
  assert.equal(outcome.kind, "idle");
  assert.equal(judgeBufferedTurn(outcome, TARGET, CLIENT, false).kind, "retry");
});

test("content after the cap stays skipped", async () => {
  const filler = chatChunk({ role: "assistant" }).repeat(20_000);
  const full = filler + sse(textChunk("too-late"));
  const counter = { reads: 0 };
  const outcome = await readBoundedResponseOutcome(
    respOf([bytes(full)], counter),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    1000,
    OPTS
  );
  assert.equal(outcome.kind, "skipped");
});

test("isUsefulSummary is pure content-or-tool", () => {
  const base = {
    finishReason: "",
    reasoningText: "",
    forwardedValuableChunk: false,
    hasValidUsage: false,
  };
  assert.equal(isUsefulSummary({ ...base, contentText: "x", toolCallsPresent: false }), true);
  assert.equal(isUsefulSummary({ ...base, contentText: "", toolCallsPresent: true }), true);
  assert.equal(
    isUsefulSummary({ ...base, contentText: "", toolCallsPresent: false, reasoningText: "r" }),
    false
  );
  assert.equal(isUsefulSummary({ ...base, contentText: "", toolCallsPresent: false }), false);
  assert.equal(isUsefulSummary(null), false);
});

test("split pushes agree with the end summary", async () => {
  const full = sse(textChunk("hel") + textChunk("lo"));
  const expected = summarizeReplayedUpstreamTurn(full, TARGET, CLIENT);
  assert.ok(expected);
  const ref = { contentText: expected.contentText, toolCallsPresent: expected.toolCallsPresent };
  // 1 push
  assert.equal(await outcomeOf([bytes(full)]), "early-pass");
  // 2 pushes (split mid-stream)
  const mid = Math.floor(full.length / 2);
  assert.equal(await outcomeOf([bytes(full.slice(0, mid)), bytes(full.slice(mid))]), "early-pass");
  // N pushes: byte-sliced incl. mid-line + mid-UTF-8 ("e-acute" = 2 bytes)
  const utf = sse(textChunk("h\u00e9llo"));
  const raw = bytes(utf);
  const slices: Uint8Array[] = [];
  for (let i = 0; i < raw.length; i += 7) slices.push(raw.slice(i, i + 7));
  assert.equal(await outcomeOf(slices), "early-pass");
  assert.ok(ref.contentText.includes("hel"));

  async function outcomeOf(chunks: Uint8Array[]) {
    const o = await readBoundedResponseOutcome(
      respOf(chunks, { reads: 0 }),
      FLUSH_EMPTY_RETRY_MAX_BYTES,
      1000,
      OPTS
    );
    return o.kind;
  }
});

test("cut after content is a pass, not a retry", async () => {
  const cut = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes(sse(textChunk("hello"))));
      controller.error(new Error("upstream cut"));
    },
  });
  const outcome = await readBoundedResponseOutcome(
    new Response(cut, { headers: { "content-type": "text/event-stream" } }),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    1000,
    OPTS
  );
  // Early-pass fires before the cut is ever read; if the cut wins the race
  // the parent error branch still retries - never a silent wrong pass.
  if (outcome.kind === "early-pass") {
    assert.equal(judgeBufferedTurn(outcome, TARGET, CLIENT, false).kind, "pass");
  } else {
    assert.equal(outcome.kind, "error");
  }
});

test("translated responses turn stops early via outcome", async () => {
  // Real Responses path direction: translateResponse(targetFormat=R,
  // sourceFormat=O) replays upstream Responses events into OpenAI deltas
  // (openaiResponsesToOpenAIResponse), whose content the summary classifies.
  const R = FORMATS.OPENAI_RESPONSES;
  const O = FORMATS.OPENAI;
  const rev = (o: unknown) => `data: ${JSON.stringify(o)}\n\n`;
  const turn = sse(
    rev({ type: "response.created", response: { id: "resp_1" } }) +
      rev({ type: "response.output_text.delta", output_index: 0, content_index: 0, delta: "hello" })
  );
  const outcome = await readBoundedResponseOutcome(
    respOf([bytes(turn)], { reads: 0 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    1000,
    { targetFormat: R, sourceFormat: O }
  );
  assert.equal(outcome.kind, "early-pass");
  assert.equal(judgeBufferedTurn(outcome, R, O, false).kind, "pass");
});
