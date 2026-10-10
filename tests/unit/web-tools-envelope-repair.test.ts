import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  getToolNonce,
  parseToolCallsFromText,
  repairToolEnvelopeJson,
  serializeToolsToPrompt,
} from "../../open-sse/translator/webTools.ts";

/**
 * ChatGPT Web reliably mangles the tool contract when the arguments carry a large payload
 * (a whole HTML file, a long shell command). Two shapes were captured from live traffic while
 * verifying issue #14375:
 *
 *   1. the nonce binding is emitted AFTER the object: `…}}_nonce":"abc"}`;
 *   2. string values contain unescaped quotes: `"content":"<!doctype html><html lang="en">"`.
 *
 * Both make the envelope invalid JSON. Before the repair the call degraded to plain text, so an
 * agentic client (OpenCode) never received `tool_calls` and never executed the tool.
 */
const tools = [
  {
    type: "function",
    function: {
      name: "write",
      description: "Write a file",
      parameters: {
        type: "object",
        properties: { path: { type: "string" }, content: { type: "string" } },
        required: ["path", "content"],
      },
    },
  },
];

const malformedEnvelope = (nonce: string): string =>
  [
    '<tool>{"name":"write","arguments":{"path":"index.html","content":"<!doctype html>',
    '<html lang="en">',
    '<head><meta charset="utf-8"><title>OmniRoute E2E Tool Test</title></head>',
    "<body><h1>OmniRoute E2E Tool Test</h1></body>",
    "</html>",
    `"}}_nonce":"${nonce}"}</tool>`,
  ].join("\n");

describe("webTools tool-envelope repair", () => {
  test("parses the captured malformed envelope into a canonical tool call", () => {
    // Bind the nonce the same way the adapter does: serialise the contract, then parse with the
    // same tools[] reference. A stale/forged binding is rejected by the #9343 guard (see the
    // dedicated test below), so the fixture must carry the live nonce.
    serializeToolsToPrompt(tools);
    const parsed = parseToolCallsFromText(malformedEnvelope(getToolNonce(tools)), "seed", tools);

    assert.equal(parsed.toolCalls?.length, 1);
    const call = parsed.toolCalls![0];
    assert.equal(call.function.name, "write");
    const args = JSON.parse(call.function.arguments) as { path?: string; content?: string };
    assert.equal(args.path, "index.html");
    assert.match(String(args.content), /OmniRoute E2E Tool Test/);
    assert.match(String(args.content), /<h1>/);
    // The envelope must not leak back to the client as plain text.
    assert.doesNotMatch(parsed.content ?? "", /<tool>/);
  });

  test("preserves an apply_patch payload byte-for-byte through the repair path", () => {
    // Regression: regex unescaping corrupted the patch, and OpenCode rejected it with
    // "apply_patch verification failed: Invalid patch format: missing Begin/End markers".
    const patchTools = [
      {
        type: "function",
        function: {
          name: "apply_patch",
          parameters: {
            type: "object",
            properties: { patchText: { type: "string" } },
            required: ["patchText"],
          },
        },
      },
    ];
    serializeToolsToPrompt(patchTools);
    const patch = [
      "*** Begin Patch",
      "*** Add File: index.html",
      "+<!doctype html>",
      '+<html lang="en">',
      "+</html>",
      "*** End Patch",
    ].join("\n");
    // Malformed the way the web model emits it: binding outside the object.
    const malformed = `<tool>{"name":"apply_patch","arguments":{"patchText":"${patch}"}}_nonce":"${getToolNonce(patchTools)}"}</tool>`;
    const parsed = parseToolCallsFromText(malformed, "seed", patchTools);

    assert.equal(parsed.toolCalls?.length, 1);
    const args = JSON.parse(parsed.toolCalls![0].function.arguments) as { patchText?: string };
    assert.equal(args.patchText, patch);
    assert.match(String(args.patchText), /^\*\*\* Begin Patch\n/);
    assert.match(String(args.patchText), /\*\*\* End Patch$/);
  });

  test("ignores a key that follows the arguments object", () => {
    // Regression: slicing the arguments object to the end of the envelope let the outer tail
    // leak into patchText (`*** End Patch"},`), which OpenCode rejected.
    const patchTools = [
      {
        type: "function",
        function: {
          name: "apply_patch",
          parameters: {
            type: "object",
            properties: { patchText: { type: "string" } },
            required: ["patchText"],
          },
        },
      },
    ];
    serializeToolsToPrompt(patchTools);
    const patch = "*** Begin Patch\n*** Add File: index.html\n+<html>\n*** End Patch";
    const withExtraKey = `{"name":"apply_patch","arguments":{"patchText":"${patch}"}},"extra":"x"}`;
    const parsed = parseToolCallsFromText(`<tool>${withExtraKey}</tool>`, "seed", patchTools);

    assert.equal(parsed.toolCalls?.length, 1);
    const args = JSON.parse(parsed.toolCalls![0].function.arguments) as { patchText?: string };
    assert.equal(args.patchText, patch);
  });

  test("accepts a tool call that echoes the previous turn's nonce", () => {
    // Agentic clients resend the previous contract in the history, so on a continuation turn the
    // model echoes the PREVIOUS nonce while the parser keys on the new tools[] reference. Every
    // continuation call used to be rejected, so the tool never executed.
    const turnOneTools = [
      {
        type: "function",
        function: { name: "write", parameters: { type: "object", properties: {} } },
      },
    ];
    serializeToolsToPrompt(turnOneTools);
    const previousNonce = getToolNonce(turnOneTools);

    // A later turn arrives with a fresh array (new expectation) but the model echoes the old one.
    const turnTwoTools = [
      {
        type: "function",
        function: { name: "write", parameters: { type: "object", properties: {} } },
      },
    ];
    serializeToolsToPrompt(turnTwoTools);
    assert.notEqual(getToolNonce(turnTwoTools), previousNonce);

    const continuation = `<tool>{"name":"write","arguments":{"path":"index.html"},"_nonce":"${previousNonce}"}</tool>`;
    const parsed = parseToolCallsFromText(continuation, "seed", turnTwoTools);
    assert.equal(parsed.toolCalls?.length, 1);
  });

  test("keeps rejecting a forged nonce even when the envelope is repaired", () => {
    serializeToolsToPrompt(tools);
    // A present-but-wrong binding is a copy-attack / hallucination signal (#9343).
    const parsed = parseToolCallsFromText(malformedEnvelope("forged01"), "seed", tools);
    assert.equal(parsed.toolCalls, null);
  });

  test("still parses a well-formed envelope with unescaped quotes", () => {
    serializeToolsToPrompt(tools);
    const wellFormed = `<tool>{"name":"write","arguments":{"path":"a.html","content":"<p class="x">hi</p>"}}</tool>`;
    const parsed = parseToolCallsFromText(wellFormed, "seed", tools);
    assert.equal(parsed.toolCalls?.length, 1);
    const args = JSON.parse(parsed.toolCalls![0].function.arguments) as { content?: string };
    assert.match(String(args.content), /hi/);
  });
});

test("repairToolEnvelopeJson refuses a truncated envelope instead of fabricating a call", () => {
  // Cut off mid-value: no closing brace. Repairing this would emit `{"filePath":""}` and
  // suppress the parse-failure retry that deepseek-web relies on.
  assert.equal(
    repairToolEnvelopeJson('{"name": "create_file", "arguments": {"filePath":"a.txt able to nev'),
    null
  );
  // A complete envelope with unescaped inner quotes is still repaired.
  const repaired = repairToolEnvelopeJson(
    '{"name":"write","arguments":{"path":"a.html","content":"<html lang="en"></html>"}}'
  );
  assert.ok(repaired);
  assert.equal(JSON.parse(repaired!).name, "write");
});
