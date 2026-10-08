import test from "node:test";
import assert from "node:assert/strict";

// Poe (api.poe.com) returns 400 "invalid request error" for a user message whose
// content is image-only. claudeToOpenAIRequest produces exactly that shape when a
// Claude tool_result carries an image (e.g. Claude Code `Read` on a screenshot).

const { ensurePoeUserTurnHasText, POE_IMAGE_ONLY_TEXT_PLACEHOLDER } =
  await import("../../open-sse/translator/helpers/poeImageOnlyUserTurn.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const IMG = "data:image/png;base64,iVBORw0KGgo=";
const imageOnly = () => [
  { role: "user", content: "read the screenshot" },
  {
    role: "assistant",
    content: null,
    tool_calls: [{ id: "call_1", type: "function", function: { name: "Read", arguments: "{}" } }],
  },
  { role: "tool", tool_call_id: "call_1", content: "[tool returned an image; see attached]" },
  { role: "user", content: [{ type: "image_url", image_url: { url: IMG } }] },
];

test("poe: prepends a text part to an image-only user turn", () => {
  const out = ensurePoeUserTurnHasText(imageOnly(), "poe");
  const last = out[out.length - 1] as { content: { type: string; text?: string }[] };
  assert.equal(last.content[0].type, "text");
  assert.equal(last.content[0].text, POE_IMAGE_ONLY_TEXT_PLACEHOLDER);
  assert.equal(last.content[1].type, "image_url");
});

test("poe: user turn that already has text is returned by reference", () => {
  const msgs = [
    {
      role: "user",
      content: [
        { type: "text", text: "what colour?" },
        { type: "image_url", image_url: { url: IMG } },
      ],
    },
  ];
  assert.equal(ensurePoeUserTurnHasText(msgs, "poe"), msgs);
});

test("non-poe providers are untouched (same reference)", () => {
  for (const provider of ["glmt", "openai", "zed-hosted", "poe-web", null, undefined]) {
    const msgs = imageOnly();
    assert.equal(ensurePoeUserTurnHasText(msgs, provider), msgs);
  }
});

test("translateRequest claude->openai for poe: image-only tool_result gets a text part", () => {
  const body = {
    model: "glm-5.3-flash",
    max_tokens: 64,
    messages: [
      { role: "user", content: "Read /tmp/x.png" },
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: "toolu_1", name: "Read", input: { file_path: "/tmp/x.png" } },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_1",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: "image/png", data: "iVBORw0KGgo=" },
              },
            ],
          },
        ],
      },
    ],
    tools: [
      { name: "Read", description: "Read", input_schema: { type: "object", properties: {} } },
    ],
  };
  const pick = (provider: string) => {
    const out = translateRequest(
      FORMATS.CLAUDE,
      FORMATS.OPENAI,
      "glm-5.3-flash",
      structuredClone(body),
      false,
      null,
      provider
    ) as {
      messages: { role: string; content: unknown }[];
    };
    return out.messages[out.messages.length - 1];
  };
  const poeLast = pick("poe");
  assert.equal(poeLast.role, "user");
  assert.deepEqual(
    (poeLast.content as { type: string }[]).map((p) => p.type),
    ["text", "image_url"]
  );
  const otherLast = pick("glmt");
  assert.deepEqual(
    (otherLast.content as { type: string }[]).map((p) => p.type),
    ["image_url"]
  );
});
