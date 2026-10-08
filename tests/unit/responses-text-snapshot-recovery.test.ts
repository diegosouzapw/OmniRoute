import test from "node:test";
import assert from "node:assert/strict";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";

interface Chunk {
  choices: {
    delta: { content?: string; role?: string; tool_calls?: unknown[] };
    finish_reason: string | null;
  }[];
  usage?: Record<string, number>;
}
type Event = Record<string, unknown>;
const message = (id: string | undefined, ...texts: string[]) => ({
  id,
  type: "message",
  role: "assistant",
  content: texts.map((text) => ({ type: "output_text", text })),
});
const completed = (...output: unknown[]): Event => ({
  type: "response.completed",
  response: { output },
});
const delta = (text: string, identity: Event = {}): Event => ({
  type: "response.output_text.delta",
  delta: text,
  ...identity,
});
const done = (text: unknown, identity: Event = {}): Event => ({
  type: "response.output_text.done",
  text,
  ...identity,
});
const itemDone = (item: unknown, identity: Event = {}): Event => ({
  type: "response.output_item.done",
  item,
  ...identity,
});
function run(events: (Event | null)[], state: Record<string, unknown> = {}): Chunk[] {
  return events.flatMap((event) => {
    const result: unknown = openaiResponsesToOpenAIResponse(event, state);
    return (Array.isArray(result) ? result : result ? [result] : []) as Chunk[];
  });
}
const text = (chunks: Chunk[]) =>
  chunks.map((chunk) => chunk.choices[0].delta.content ?? "").join("");
const terminals = (chunks: Chunk[]) => chunks.filter((chunk) => chunk.choices[0].finish_reason);

test("recovers completed-only, text.done-only and item.done-only assistant text", () => {
  for (const events of [
    [completed(message("m", "Hello!"))],
    [done("Hello!"), completed()],
    [itemDone(message("m", "Hello!")), completed()],
  ]) {
    const chunks = run(events);
    assert.equal(text(chunks), "Hello!");
    assert.equal(chunks[0].choices[0].delta.role, "assistant");
    assert.equal(terminals(chunks).length, 1);
    assert.equal(chunks.at(-1)?.choices[0].finish_reason, "stop");
  }
});

test("full deltas and all subsequent snapshots emit text exactly once", () => {
  const identity = { item_id: "m", output_index: 0, content_index: 0 };
  const chunks = run([
    delta("Hel", identity),
    delta("lo!", identity),
    done("Hello!", identity),
    itemDone(message("m", "Hello!"), { output_index: 0 }),
    completed(message("m", "Hello!")),
    completed(message("m", "Hello!")),
    null,
  ]);
  assert.equal(text(chunks), "Hello!");
  assert.equal(terminals(chunks).length, 1);
});

test("partial prefix is recovered once; shorter and divergent snapshots never rewrite it", () => {
  const chunks = run([
    delta("Hel"),
    done("He"),
    done("Goodbye"),
    done("Hello!"),
    itemDone(message("m", "Hello!")),
    completed(message("m", "Hello!")),
  ]);
  assert.deepEqual(
    chunks.filter((c) => c.choices[0].delta.content).map((c) => c.choices[0].delta.content),
    ["Hel", "lo!"]
  );
});

test("keeps original output and content positions across non-text entries", () => {
  const m = {
    ...message("m"),
    content: [
      { type: "refusal", refusal: "no" },
      { type: "output_text", text: "Hello!" },
    ],
  };
  assert.equal(
    text(
      run([
        delta("Hel", { output_index: "1", content_index: "1" }),
        completed({ type: "reasoning", summary: [] }, m),
      ])
    ),
    "Hello!"
  );
});

test("distinct item IDs and content parts may contain identical text", () => {
  assert.equal(
    text(
      run([
        delta("same", { item_id: "a", content_index: 0 }),
        delta("same", { item_id: "b", content_index: 0 }),
        completed(message("a", "same", "second"), message("b", "same", "second")),
      ])
    ),
    "samesamesecondsecond"
  );
});

test("late item aliases reconcile ID-only and index-only events", () => {
  for (const identity of [{ item_id: "m" }, { output_index: "0" }]) {
    assert.equal(
      text(
        run([
          delta("Hel", { ...identity, content_index: 0 }),
          { type: "response.output_item.added", output_index: 0, item: message("m") },
          done("Hello!", { item_id: "m", content_index: "0" }),
          completed(message("m", "Hello!")),
        ])
      ),
      "Hello!"
    );
  }
});

test("missing indices do not conflate distinct IDs or explicit content positions", () => {
  assert.equal(
    text(
      run([
        done("one", { item_id: "a" }),
        done("two", { item_id: "b" }),
        completed(message("a", "one"), message("b", "two")),
      ])
    ),
    "onetwo"
  );
  assert.equal(
    text(run([delta("A", { item_id: "m", content_index: 0 }), completed(message("m", "A", "B"))])),
    "AB"
  );
});

test("anonymous single-message deltas bind only when item and part are unambiguous", () => {
  assert.equal(text(run([delta("Hel"), completed(message("m", "Hello!"))])), "Hello!");
  assert.equal(
    text(run([delta("Hel"), completed(message("a", "Hello!"), message("b", "Other"))])),
    "Hel"
  );
  assert.equal(
    text(run([delta("Hel", { item_id: "m" }), completed(message("m", "Hello!", "Other"))])),
    "Hel"
  );
});

test("ambiguous text.done cannot replay one of multiple already streamed parts", () => {
  assert.equal(
    text(
      run([
        delta("A", { item_id: "m", content_index: 0 }),
        delta("B", { item_id: "m", content_index: 1 }),
        done("A", { item_id: "m" }),
        completed(message("m", "A", "B")),
      ])
    ),
    "AB"
  );
});

test("late aliases merge fragments even when content index was initially absent", () => {
  assert.equal(
    text(
      run([
        delta("Hel", { item_id: "m" }),
        delta("lo", { output_index: 0, content_index: 0 }),
        completed(message("m", "Hello!")),
      ])
    ),
    "Hello!"
  );
});

test("an omitted content index remains uncertain after an explicitly indexed delta", () => {
  const identity = { item_id: "m", content_index: 0 };
  for (const snapshots of [
    [],
    [done("A", identity), done("B", { item_id: "m", content_index: 1 })],
    [itemDone(message("m", "A", "B"))],
  ]) {
    assert.equal(
      text(
        run([
          delta("A", identity),
          delta("B", { item_id: "m" }),
          ...snapshots,
          completed(message("m", "A", "B")),
        ])
      ),
      "AB"
    );
  }
});

test("an omitted item identity remains uncertain after an explicitly identified delta", () => {
  for (const snapshots of [
    [],
    [done("A", { item_id: "a" }), done("B", { item_id: "b" })],
    [itemDone(message("a", "A")), itemDone(message("b", "B"))],
  ]) {
    assert.equal(
      text(
        run([
          delta("A", { item_id: "a" }),
          delta("B"),
          ...snapshots,
          completed(message("a", "A"), message("b", "B")),
        ])
      ),
      "AB"
    );
  }
});

test("uncertain content parts do not disable recovery for a different identified message", () => {
  assert.equal(
    text(
      run([
        delta("A", { item_id: "m", content_index: 0 }),
        delta("B", { item_id: "m" }),
        delta("C", { item_id: "n", content_index: 0 }),
        completed(message("m", "A", "B"), message("n", "CD")),
      ])
    ),
    "ABCD"
  );
});

test("anonymous prefixes recover at an unambiguous item snapshot without completed output", () => {
  assert.equal(text(run([delta("Hel"), itemDone(message("m", "Hello!")), completed()])), "Hello!");
});

test("missing identities can still reconcile a completed single message and part", () => {
  assert.equal(
    text(
      run([
        delta("A", { item_id: "m", content_index: 0 }),
        delta("B"),
        completed(message("m", "ABC")),
      ])
    ),
    "ABC"
  );
});

for (const order of ["tool-text", "text-tool", "text-tool-text", "partial-tool-text"]) {
  test(`completion synthesis preserves ${order} order and emits role, usage and terminal once`, () => {
    const tool = { type: "function_call", call_id: "c", name: "lookup", arguments: "{}" };
    const output =
      order === "tool-text" || order === "partial-tool-text"
        ? [tool, message("m", "Hello!")]
        : order === "text-tool"
          ? [message("m", "Hello!"), tool]
          : [message("before", "Before"), tool, message("m", "Hello!")];
    const event = completed(...output);
    const chunks = run([
      ...(order === "partial-tool-text" ? [delta("Hel", { item_id: "m", content_index: 0 })] : []),
      {
        ...event,
        response: { ...(event.response as Event), usage: { input_tokens: 4, output_tokens: 3 } },
      },
      completed(...output),
      null,
    ]);
    const emitted = chunks.flatMap((chunk) => {
      const d = chunk.choices[0].delta;
      if (d.content) return [`text:${d.content}`];
      const call = d.tool_calls?.[0] as { id?: string } | undefined;
      return call?.id ? [`tool:${call.id}`] : [];
    });
    assert.deepEqual(
      emitted,
      order === "tool-text"
        ? ["tool:c", "text:Hello!"]
        : order === "text-tool"
          ? ["text:Hello!", "tool:c"]
          : order === "text-tool-text"
            ? ["text:Before", "tool:c", "text:Hello!"]
            : ["text:Hel", "tool:c", "text:lo!"]
    );
    assert.equal(chunks.filter((c) => c.choices[0].delta.role).length, 1);
    assert.equal(chunks[0].choices[0].delta.role, "assistant");
    assert.equal(chunks.filter((c) => c.usage).length, 1);
    assert.equal(terminals(chunks).length, 1);
    assert.equal(chunks.at(-1)?.choices[0].finish_reason, "tool_calls");
    assert.deepEqual(chunks.at(-1)?.usage, {
      prompt_tokens: 4,
      completion_tokens: 3,
      total_tokens: 7,
    });
  });
}

test("malformed and non-assistant snapshots never become text", () => {
  for (const output of [
    null,
    {},
    { type: "message", role: "user", content: [{ type: "output_text", text: "user" }] },
    {
      type: "message",
      role: "assistant",
      content: [
        { type: "output_text", text: {} },
        { type: "refusal", text: "no" },
      ],
    },
  ]) {
    const chunks = run([done({}), completed(output)]);
    assert.equal(text(chunks), "");
    assert.equal(terminals(chunks).length, 1);
  }
});

test("text precedes synthesized tools and their single terminal with usage", () => {
  const event = completed(message("m", "Hello!"), {
    type: "function_call",
    call_id: "c",
    name: "lookup",
    arguments: "{}",
  });
  const chunks = run([
    {
      ...event,
      response: { ...(event.response as Event), usage: { input_tokens: 4, output_tokens: 3 } },
    },
  ]);
  assert.equal(text(chunks), "Hello!");
  assert.equal(chunks[0].choices[0].delta.content, "Hello!");
  assert.equal(terminals(chunks).length, 1);
  assert.equal(chunks.at(-1)?.choices[0].finish_reason, "tool_calls");
  assert.deepEqual(chunks.at(-1)?.usage, {
    prompt_tokens: 4,
    completion_tokens: 3,
    total_tokens: 7,
  });
});

test("completion, errors and EOF release retained text and reject late events", () => {
  for (const terminal of [
    completed(message("m", "Hello!")),
    { type: "error", message: "failed" },
    null,
  ]) {
    const state: Record<string, unknown> = {};
    run([delta("Hello!", { item_id: "m", content_index: 0 }), terminal], state);
    const chunks = run(
      [
        done("Hello! More", { item_id: "m" }),
        delta("late"),
        completed(message("m", "Hello! More")),
        null,
      ],
      state
    );
    assert.deepEqual(chunks, []);
    const tracker = state.responsesTextSnapshots as {
      closed: boolean;
      items: Set<unknown>;
      byId: Map<string, unknown>;
      byIndex: Map<number, unknown>;
    };
    assert.equal(tracker.closed, true);
    assert.equal(tracker.items.size, 0);
    assert.equal(tracker.byId.size, 0);
    assert.equal(tracker.byIndex.size, 0);
  }
});

test("many Unicode fragments retain linear text storage and reconcile an exact suffix", () => {
  const state: Record<string, unknown> = {};
  const fragments = Array.from({ length: 2000 }, (_, i) => (i % 2 ? "é" : "😀"));
  const chunks = run(
    fragments.map((fragment) => delta(fragment, { item_id: "m", content_index: 0 })),
    state
  );
  const tracker = state.responsesTextSnapshots as {
    items: Set<{ parts: Map<number, { fragments: string[]; length: number }> }>;
  };
  const part = [...tracker.items][0].parts.get(0)!;
  assert.equal(part.fragments.length, fragments.length);
  assert.equal(part.length, fragments.join("").length);
  chunks.push(...run([completed(message("m", fragments.join("") + "終"))], state));
  assert.equal(text(chunks), fragments.join("") + "終");
});
