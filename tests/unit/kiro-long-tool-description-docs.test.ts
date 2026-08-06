import test from "node:test";
import assert from "node:assert/strict";

import { buildKiroPayload } from "../../open-sse/translator/request/openai-to-kiro.ts";

// Kiro rejects a `toolSpecification.description` longer than ~10000 chars, so the
// translator relocates an oversized description into the current turn's content
// and leaves a pointer in the schema (mirroring kiro-gateway's
// `converters_core.py::process_tools_with_long_descriptions`).
//
// The relocation used to be carried on the message object as `_toolDocs`, which
// broke in two ways: the tool-bearing user turn is moved into `history` on every
// multi-turn request, so the docs were dropped and the model saw only the
// pointer; and the field leaked into the upstream payload, which Kiro rejects
// because it refuses unknown top-level keys.

const POINTER = "[Full documentation in system prompt under '## Tool: big_tool']";
const DOCS_HEADING = "# Tool Documentation";

function bigToolWithDescriptionLength(length: number) {
  return [
    {
      type: "function",
      function: {
        name: "big_tool",
        description: "D".repeat(length),
        parameters: { type: "object", properties: {} },
      },
    },
  ];
}

const TURN_SHAPES = {
  "single user turn": [{ role: "user", content: "a" }],
  "multi-turn conversation": [
    { role: "user", content: "a" },
    { role: "assistant", content: "b" },
    { role: "user", content: "c" },
  ],
  "deep multi-turn conversation": [
    { role: "user", content: "a" },
    { role: "assistant", content: "b" },
    { role: "user", content: "c" },
    { role: "assistant", content: "d" },
    { role: "user", content: "e" },
  ],
  "assistant-first conversation": [
    { role: "assistant", content: "hello" },
    { role: "user", content: "hi" },
  ],
  // No user turn at all: currentMessage is the synthesized filler turn, which
  // reaches the tools schema through the fallback attachment path.
  "no user messages": [{ role: "assistant", content: "only" }],
};

test("relocated tool documentation reaches the current turn for every turn shape", () => {
  for (const [label, messages] of Object.entries(TURN_SHAPES)) {
    const payload = buildKiroPayload(
      "claude-sonnet-4.5",
      { messages, tools: bigToolWithDescriptionLength(12000) },
      true,
      {}
    );
    const current = payload.conversationState.currentMessage.userInputMessage;

    assert.ok(
      current.content.includes(DOCS_HEADING),
      `${label}: full tool documentation must be prepended to the current turn`
    );
    assert.ok(
      current.content.includes("D".repeat(12000)),
      `${label}: the relocated description text itself must survive`
    );
    assert.equal(
      current.userInputMessageContext?.tools[0].toolSpecification.description,
      POINTER,
      `${label}: the oversized description must be replaced by the pointer`
    );
  }
});

test("relocation never leaks an unknown field into the upstream payload", () => {
  for (const [label, messages] of Object.entries(TURN_SHAPES)) {
    const payload = buildKiroPayload(
      "claude-sonnet-4.5",
      { messages, tools: bigToolWithDescriptionLength(12000) },
      true,
      {}
    );

    assert.ok(
      !JSON.stringify(payload).includes("_toolDocs"),
      `${label}: Kiro rejects unknown top-level keys, so _toolDocs must not be serialized`
    );
  }
});

test("a description within the limit is left alone and adds no documentation block", () => {
  const payload = buildKiroPayload(
    "claude-sonnet-4.5",
    {
      messages: TURN_SHAPES["multi-turn conversation"],
      tools: [
        {
          type: "function",
          function: {
            name: "ok_tool",
            description: "short desc",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
    },
    true,
    {}
  );
  const current = payload.conversationState.currentMessage.userInputMessage;

  assert.equal(
    current.userInputMessageContext?.tools[0].toolSpecification.description,
    "short desc",
    "a description under the limit must reach Kiro verbatim"
  );
  assert.ok(
    !current.content.includes(DOCS_HEADING),
    "no documentation block should be injected when nothing was relocated"
  );
});

// A description exactly at the limit must pass through: the guard triggers only
// above it, and an off-by-one here would relocate a description Kiro accepts.
test("the relocation boundary triggers above the limit, not at it", () => {
  const messages = TURN_SHAPES["multi-turn conversation"];

  const atLimit = buildKiroPayload(
    "claude-sonnet-4.5",
    { messages, tools: bigToolWithDescriptionLength(10000) },
    true,
    {}
  );
  const atLimitCurrent = atLimit.conversationState.currentMessage.userInputMessage;
  assert.equal(
    atLimitCurrent.userInputMessageContext?.tools[0].toolSpecification.description.length,
    10000,
    "a description exactly at the limit must not be relocated"
  );
  assert.ok(
    !atLimitCurrent.content.includes(DOCS_HEADING),
    "no documentation block at the boundary"
  );

  const overLimit = buildKiroPayload(
    "claude-sonnet-4.5",
    { messages, tools: bigToolWithDescriptionLength(10001) },
    true,
    {}
  );
  assert.equal(
    overLimit.conversationState.currentMessage.userInputMessage.userInputMessageContext?.tools[0]
      .toolSpecification.description,
    POINTER,
    "one char over the limit must be relocated"
  );
});

// Only the oversized tool is relocated; a mixed inventory must keep the short
// descriptions inline so the model still sees them next to the schema.
test("only oversized descriptions are relocated in a mixed tool inventory", () => {
  const payload = buildKiroPayload(
    "claude-sonnet-4.5",
    {
      messages: TURN_SHAPES["multi-turn conversation"],
      tools: [
        {
          type: "function",
          function: {
            name: "small_tool",
            description: "compact",
            parameters: { type: "object", properties: {} },
          },
        },
        ...bigToolWithDescriptionLength(12000),
      ],
    },
    true,
    {}
  );
  const current = payload.conversationState.currentMessage.userInputMessage;
  const specs = current.userInputMessageContext?.tools;

  assert.equal(specs[0].toolSpecification.description, "compact");
  assert.equal(specs[1].toolSpecification.description, POINTER);
  assert.ok(current.content.includes("## Tool: big_tool"));
  assert.ok(
    !current.content.includes("## Tool: small_tool"),
    "a tool that was never relocated must not get a documentation section"
  );
});
