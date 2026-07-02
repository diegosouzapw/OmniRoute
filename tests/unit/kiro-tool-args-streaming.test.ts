/**
 * Regression test for Kiro/CodeWhisperer streaming tool_calls.arguments deltas.
 *
 * Kiro streams toolUseEvent.input as PARTIAL OBJECTS that grow over time
 * (e.g. {command:"cat /home"} then {command:"cat /home/wxsys"}). The old executor
 * re-stringified each partial object and emitted it as an OpenAI argument delta, so the
 * overlapping JSON prefixes concatenated downstream into unparseable garbage
 * ("Unterminated string"). The fix buffers object-form payloads keyed by toolCallId, keeps
 * only the latest canonical, and flushes ONCE at a finish boundary. String-form payloads
 * remain concatenable incremental deltas.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { flushBufferedToolArgs } = await import("../../open-sse/executors/kiro.ts");

type ArgsBuffered = Map<string, { toolIndex: number; canonical: string }>;
type State = { toolArgsEmitted: Map<string, string>; toolArgsBuffered: ArgsBuffered };

function makeMockController() {
  const enqueued: string[] = [];
  const decoder = new TextDecoder();
  return {
    enqueued,
    enqueue(bytes: Uint8Array) {
      enqueued.push(decoder.decode(bytes));
    },
  };
}

function parseSSEData(sseLines: string[]) {
  return sseLines
    .map((line) => {
      const m = line.match(/^data: (.+)\n\n$/);
      return m ? JSON.parse(m[1]) : null;
    })
    .filter(Boolean);
}

function reconstructArguments(chunks: any[]) {
  const perIndex = new Map<number, string>();
  for (const chunk of chunks) {
    const tc = chunk.choices?.[0]?.delta?.tool_calls?.[0];
    if (!tc) continue;
    const idx = tc.index as number;
    const args = (tc.function?.arguments as string) || "";
    perIndex.set(idx, (perIndex.get(idx) || "") + args);
  }
  return perIndex;
}

const CTX = { responseId: "resp_test", created: 1, model: "kiro" };

test("flushes a single buffered tool call with valid concatenable JSON", () => {
  const state: State = {
    toolArgsEmitted: new Map(),
    toolArgsBuffered: new Map([
      [
        "tool_abc",
        {
          toolIndex: 0,
          canonical: '{"command":"cat /home/wxsys/Project/naskin/.impeccable.md"}',
        },
      ],
    ]),
  };
  const controller = makeMockController();
  flushBufferedToolArgs(state, controller, CTX);

  const chunks = parseSSEData(controller.enqueued);
  assert.equal(chunks.length, 1);

  const args = reconstructArguments(chunks);
  const final = args.get(0)!;
  assert.doesNotThrow(() => JSON.parse(final));
  assert.deepEqual(JSON.parse(final), {
    command: "cat /home/wxsys/Project/naskin/.impeccable.md",
  });

  assert.equal(state.toolArgsBuffered.size, 0);
  assert.equal(state.toolArgsEmitted.get("tool_abc"), final);
});

test("4 partial-object events produce a single valid flush (reported bug)", () => {
  const state: State = { toolArgsEmitted: new Map(), toolArgsBuffered: new Map() };

  const partialPayloads = [
    { command: "cat /home" },
    { command: "cat /home/wxsys" },
    { command: "cat /home/wxsys/Project" },
    { command: "cat /home/wxsys/Project/naskin/.impeccable.md" },
  ];
  // Each event overwrites the buffered canonical for the same toolCallId.
  for (const input of partialPayloads) {
    state.toolArgsBuffered.set("tool_abc", { toolIndex: 0, canonical: JSON.stringify(input) });
  }

  const controller = makeMockController();
  flushBufferedToolArgs(state, controller, CTX);

  const chunks = parseSSEData(controller.enqueued);
  assert.equal(chunks.length, 1);

  const final = reconstructArguments(chunks).get(0)!;
  assert.doesNotThrow(() => JSON.parse(final));
  assert.equal(JSON.parse(final).command, "cat /home/wxsys/Project/naskin/.impeccable.md");
});

test("flushes multiple concurrent tool calls preserving toolIndex", () => {
  const state: State = {
    toolArgsEmitted: new Map(),
    toolArgsBuffered: new Map([
      ["T1", { toolIndex: 0, canonical: '{"filePath":"/a/b/c.txt"}' }],
      ["T2", { toolIndex: 1, canonical: '{"command":"ls"}' }],
    ]),
  };
  const controller = makeMockController();
  flushBufferedToolArgs(state, controller, CTX);

  const chunks = parseSSEData(controller.enqueued);
  assert.equal(chunks.length, 2);

  const args = reconstructArguments(chunks);
  assert.deepEqual(JSON.parse(args.get(0)!), { filePath: "/a/b/c.txt" });
  assert.deepEqual(JSON.parse(args.get(1)!), { command: "ls" });
});

test("does not re-emit when canonical equals already-emitted (idempotent flush)", () => {
  const state: State = {
    toolArgsEmitted: new Map([["tool_abc", '{"command":"ls"}']]),
    toolArgsBuffered: new Map([["tool_abc", { toolIndex: 0, canonical: '{"command":"ls"}' }]]),
  };
  const controller = makeMockController();
  flushBufferedToolArgs(state, controller, CTX);

  assert.equal(controller.enqueued.length, 0);
  assert.equal(state.toolArgsBuffered.size, 0);
});

test("no-op when buffer is empty", () => {
  const state: State = { toolArgsEmitted: new Map(), toolArgsBuffered: new Map() };
  const controller = makeMockController();
  flushBufferedToolArgs(state, controller, CTX);

  assert.equal(controller.enqueued.length, 0);
});

test("OLD BUG: re-stringifying each partial object produces unparseable concat", () => {
  const partials = [
    { command: "cat /home" },
    { command: "cat /home/wxsys" },
    { command: "cat /home/wxsys/Project/naskin/.impeccable.md" },
  ];
  const buggyConcat = partials.map((p) => JSON.stringify(p)).join("");
  assert.throws(() => JSON.parse(buggyConcat));
});

test("FIX: emitting only the final canonical produces parseable JSON", () => {
  const partials = [
    { command: "cat /home" },
    { command: "cat /home/wxsys" },
    { command: "cat /home/wxsys/Project/naskin/.impeccable.md" },
  ];
  const fixedConcat = JSON.stringify(partials[partials.length - 1]);
  assert.doesNotThrow(() => JSON.parse(fixedConcat));
  assert.equal(JSON.parse(fixedConcat).command, "cat /home/wxsys/Project/naskin/.impeccable.md");
});
