import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cavemanCompress } from "../../../open-sse/services/compression/caveman.ts";

// Regression guard for #9144: Caveman's recapitalizeSentences()/cleanupArtifacts()
// treated every line-start as a sentence-start, so an unfenced raw code file
// reference (e.g. a Copilot `#file` attachment) had its keywords/identifiers
// recapitalized (`function`→`Function`, `input.variables`→`Input.variables`) and
// its indentation collapsed. Fenced code was already protected via preservation;
// this only covers the unfenced/raw case.

const FILE_REFERENCE = [
  "Please review this function:",
  "",
  "function decodeUplink(input) {",
  "  input.variables = input.metadata;",
  "  var decoded = decode(input.bytes);",
  "  return { data: decoded };",
  "}",
].join("\n");

describe("Caveman — #9144 raw code preservation", () => {
  it("preserves an unfenced file-reference's JavaScript casing and keywords", () => {
    const result = cavemanCompress({
      messages: [{ role: "user", content: FILE_REFERENCE }],
    } as never, { enabled: true });
    const compressedText =
      typeof result.body.messages === "object" &&
      Array.isArray((result.body as { messages: unknown[] }).messages)
        ? String(
            (
              (result.body as { messages: Array<{ content: unknown }> }).messages[0] as {
                content: unknown;
              }
            ).content
          )
        : "";

    assert.match(compressedText, /function decodeUplink/, "must not capitalize 'function'");
    assert.match(compressedText, /input\.variables/, "must not capitalize 'input.variables'");
    assert.match(compressedText, /\bvar decoded\b/, "must not capitalize 'var'");
    assert.match(compressedText, /\breturn \{/, "must not capitalize 'return'");
  });

  it("still recapitalizes plain prose (control)", () => {
    const result = cavemanCompress({
      messages: [
        {
          role: "user",
          content:
            "hello there. this is a plain prose message with no code at all in it whatsoever. thanks!",
        },
      ],
    } as never, { enabled: true });
    const compressedText =
      typeof result.body.messages === "object" &&
      Array.isArray((result.body as { messages: unknown[] }).messages)
        ? String(
            (
              (result.body as { messages: Array<{ content: unknown }> }).messages[0] as {
                content: unknown;
              }
            ).content
          )
        : "";
    assert.match(compressedText, /\. This is a plain/, "prose recapitalization must still work");
  });
});
