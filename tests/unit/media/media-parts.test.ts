import { test } from "node:test";
import assert from "node:assert";
import { containsMediaKind, detectMediaParts } from "../../../open-sse/utils/mediaParts";
import { extractImageParts, replaceImageParts } from "../../../src/lib/guardrails/visionBridgeHelpers";

const msg = (content: unknown) => [{ role: "user", content }];

test("detects OpenAI image_url part", () => {
  const parts = detectMediaParts(
    msg([{ type: "image_url", image_url: { url: "https://x/i.png" } }])
  );
  assert.equal(parts.length, 1);
  assert.equal(parts[0].kind, "image");
  assert.equal(parts[0].ref, "https://x/i.png");
});

test("detects Anthropic base64 image source", () => {
  const parts = detectMediaParts(
    msg([{ type: "image", source: { type: "base64", media_type: "image/png", data: "AAA" } }])
  );
  assert.equal(parts[0].ref, "data:image/png;base64,AAA");
});

test("detects Responses-API input_image", () => {
  const parts = detectMediaParts(msg([{ type: "input_image", image_url: "https://x/i.png" }]));
  assert.equal(parts.length, 1);
  assert.equal(parts[0].kind, "image");
});

test("detects bare data:image string in content array", () => {
  const parts = detectMediaParts(msg([{ type: "text", text: "data:image/jpeg;base64,QUJD" }]));
  assert.equal(parts.length, 1);
});

test("detects input_audio and audio_url as audio kind", () => {
  const parts = detectMediaParts(
    msg([
      { type: "input_audio", input_audio: { data: "QUJD", format: "wav" } },
      { type: "audio_url", audio_url: { url: "https://x/a.mp3" } },
    ])
  );
  assert.deepEqual(
    parts.map((p) => p.kind),
    ["audio", "audio"]
  );
});

test("recursion depth capped at 8", () => {
  let nested: Record<string, unknown> = { type: "image_url", image_url: { url: "https://x" } };
  for (let i = 0; i < 10; i++) nested = { wrap: nested };
  assert.equal(detectMediaParts(msg([nested])).length, 0);
});

test("string content and empty messages yield []", () => {
  assert.deepEqual(detectMediaParts([{ role: "user", content: "oi" }]), []);
  assert.deepEqual(detectMediaParts([]), []);
});

test("combo-parity: image indicators without extractable refs are still detected", () => {
  // Bare image_url key without a `type` (legacy combo matched by key presence).
  const bareKey = detectMediaParts(msg([{ image_url: { url: "https://x/i.png" } }]));
  assert.equal(bareKey.length, 1);
  assert.equal(bareKey[0].kind, "image");
  assert.equal(bareKey[0].ref, "https://x/i.png");

  // `type: "image"` with no usable source (legacy combo matched by type name).
  const bareType = detectMediaParts(msg([{ type: "image" }]));
  assert.equal(bareType.length, 1);
  assert.equal(bareType[0].shape, "image_indicator");
  assert.equal(bareType[0].ref, "");

  // source.media_type image/* on an untyped part.
  const bySourceMedia = detectMediaParts(
    msg([{ source: { media_type: "image/JPEG", data: "AAA" } }])
  );
  assert.equal(bySourceMedia.length, 1);
  assert.equal(bySourceMedia[0].kind, "image");

  // Case-insensitive type match (legacy combo lowercased `type`).
  const upperType = detectMediaParts(msg([{ type: "IMAGE_URL", image_url: { url: "https://x" } }]));
  assert.equal(upperType.length, 1);
  assert.equal(upperType[0].ref, "https://x");
});

test("audio part does not shadow a bare image_url key on the same object", () => {
  const parts = detectMediaParts(
    msg([{ type: "input_audio", input_audio: { data: "QUJD" }, image_url: "https://x/i.png" }])
  );
  assert.deepEqual(parts.map((p) => p.kind).sort(), ["audio", "image"]);
  assert.equal(parts.find((p) => p.kind === "image")?.ref, "https://x/i.png");
});

test("audio_url part does not shadow a bare input_image key on the same object", () => {
  const parts = detectMediaParts(
    msg([{ type: "audio_url", audio_url: "https://x/a.mp3", input_image: "https://x/i.png" }])
  );
  assert.deepEqual(parts.map((p) => p.kind).sort(), ["audio", "image"]);
});

test("audio media_type part still recurses into sibling values (combo parity)", () => {
  const parts = detectMediaParts(
    msg([{ source: { media_type: "audio/mp3", data: "QUJD" }, sibling: { type: "image" } }])
  );
  assert.equal(parts.filter((p) => p.kind === "audio").length, 1);
  assert.equal(parts.filter((p) => p.kind === "image").length, 1);
});

test("image nested inside input_audio payload is still detected", () => {
  const parts = detectMediaParts(
    msg([
      {
        type: "input_audio",
        input_audio: {
          data: "QUJD",
          cover: { type: "image_url", image_url: { url: "https://x/c.png" } },
        },
      },
    ])
  );
  assert.equal(parts.filter((p) => p.kind === "audio").length, 1);
  assert.ok(parts.some((p) => p.kind === "image" && p.ref === "https://x/c.png"));
});

test("bare source.media_type audio/* yields a single audio_source part", () => {
  const parts = detectMediaParts(msg([{ source: { media_type: "audio/wav", data: "QUJD" } }]));
  assert.equal(parts.length, 1);
  assert.equal(parts[0].kind, "audio");
  assert.equal(parts[0].shape, "audio_source");
  assert.equal(parts[0].ref, "QUJD");
});

test("containsMediaKind early-exit agrees with detectMediaParts presence", () => {
  const withImage = msg([
    { type: "text", text: "hi" },
    { type: "image_url", image_url: { url: "https://x/i.png" } },
  ]);
  assert.equal(containsMediaKind(withImage, "image"), true);
  assert.equal(containsMediaKind(withImage, "audio"), false);

  const withAudio = msg([{ type: "input_audio", input_audio: { data: "QUJD", format: "wav" } }]);
  assert.equal(containsMediaKind(withAudio, "audio"), true);
  assert.equal(containsMediaKind(withAudio, "image"), false);

  // Nested/indicator hits count for presence (combo parity).
  assert.equal(containsMediaKind(msg([{ image_url: "https://x" }]), "image"), true);
  assert.equal(containsMediaKind([{ role: "user", content: "oi" }], "image"), false);
  assert.equal(containsMediaKind(undefined, "image"), false);
});

test("extractImageParts skips indicator parts without extractable refs", () => {
  assert.deepEqual(
    extractImageParts([{ role: "user", content: [{ type: "image" }] } as never]),
    []
  );
});

test("extractImageParts now sees input_image (Responses API)", () => {
  const parts = extractImageParts([
    { role: "user", content: [{ type: "input_image", image_url: "https://x/i.png" }] } as never,
  ]);
  assert.equal(parts.length, 1);
  assert.equal(parts[0].imageUrl, "https://x/i.png");
});

test("extract→replace round-trip: input_image does not shift sibling descriptions", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "input_image", image_url: "https://x/a.png" },
          { type: "image_url", image_url: { url: "https://x/b.png" } },
        ],
      },
    ],
  };
  const extracted = extractImageParts(body.messages as never);
  assert.equal(extracted.length, 2);
  assert.equal(extracted[0].imageUrl, "https://x/a.png");
  assert.equal(extracted[1].imageUrl, "https://x/b.png");

  const replaced = replaceImageParts(body as never, ["DA", "DB"]);
  const content = (replaced.messages as Array<{ content: unknown }>)[0].content;
  assert.deepEqual(content, [
    { type: "text", text: "DA" },
    { type: "text", text: "DB" },
  ]);
});

test("extractImageParts does not extract a data URI embedded in a text part", () => {
  const parts = extractImageParts([
    {
      role: "user",
      content: [{ type: "text", text: "data:image/png;base64,QUJD" }],
    } as never,
  ]);
  assert.deepEqual(parts, []);
});

test("extractImageParts skips nested and indicator-only detections", () => {
  const parts = extractImageParts([
    {
      role: "user",
      content: [
        // Image nested inside an audio payload: detector reports it (combo needs
        // it) but the replacer cannot splice it — must not be extracted.
        {
          type: "input_audio",
          input_audio: {
            data: "QUJD",
            cover: { type: "image_url", image_url: { url: "https://x/c.png" } },
          },
        },
        // Bare image_url key without type: indicator shape, not replaceable.
        { image_url: "https://x/bare.png" },
      ],
    } as never,
  ]);
  assert.deepEqual(parts, []);
});
