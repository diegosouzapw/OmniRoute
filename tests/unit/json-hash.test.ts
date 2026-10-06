import { describe, it } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { jsonSha256 } from "../../open-sse/utils/jsonHash.ts";

function sha256hex(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

describe("jsonSha256 matches sha256hex(JSON.stringify(x)) for serializable values", () => {
  const cases: Array<unknown> = [
    null,
    0,
    1,
    -1,
    3.14159,
    NaN,
    Infinity,
    -Infinity,
    true,
    false,
    "",
    "plain",
    'with "quotes" and \\backslash',
    "line\nbreak\ttab\rcr\bbs\fform",
    "\u0000\u001f control chars",
    "emoji 🚀 and surrogate \ud83d\ude00",
    "unpaired \ud800 lone",
    "mixed \ud83d\ude00\u0041\uD800X",
    [],
    [1, 2, 3],
    [[1], [2], [3]],
    [undefined, null, 1, "x"],
    {},
    { a: 1, b: "two", c: [true, false] },
    { z: 1, a: 2, m: 3 }, // insertion order preserved
    { nested: { deep: { deeper: [{ ok: 1 }, null] } } },
    { fn: () => 1, ignored: undefined, kept: "x" }, // omitted keys
    ["http://x", { url: "http://y" }],
    {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "hi" },
            {
              type: "image_url",
              image_url: { url: "data:image/png;base64," + "A".repeat(5_400_000) },
            },
          ],
        },
      ],
    },
    {
      // iBrowse MCP local-image shape with a large raw base64 payload.
      messages: [
        {
          role: "user",
          content: [{ type: "image", data: "A".repeat(5_400_000), mimeType: "image/png" }],
        },
      ],
    },
  ];

  for (const value of cases) {
    const label =
      typeof value === "string" && value.length > 40
        ? `string(${value.length})`
        : JSON.stringify(value)?.slice(0, 50);
    it(`matches for ${label}`, () => {
      const expected = sha256hex(JSON.stringify(value));
      assert.equal(jsonSha256(value), expected);
    });
  }

  it("throws on BigInt like JSON.stringify", () => {
    assert.throws(() => jsonSha256({ n: 1n }), TypeError);
  });

  it("throws on circular structures like JSON.stringify", () => {
    const obj: Record<string, unknown> = { a: 1 };
    obj.self = obj;
    assert.throws(() => jsonSha256(obj), TypeError);
  });
});
