// #13380 — gemini-web drops system instructions on single-turn requests, and
// buildGeminiToolPrompt() picks the CLIENT's first system message instead of
// the appended tool contract when tools are active.
//
// Bug 1: buildGeminiPrompt()'s single-turn fast path
// (open-sse/executors/gemini-web.ts) returned only the last user message,
// silently dropping any system instruction when there was no prior
// user/assistant turn (title generation, structured extraction, one-shot
// chat completions).
//
// Bug 2: buildGeminiToolPrompt() used
// `effectiveMessages.find(m => m.role === "system")`, which returns the
// FIRST system message. `prepareToolMessages()` (open-sse/translator/
// webTools.ts) appends the synthetic tool contract as the LAST system
// message, so any request that already carries a client system message
// (any real agent request) lost the tool contract entirely.

import test from "node:test";
import assert from "node:assert/strict";

const { buildGeminiPrompt, buildGeminiToolPrompt } =
  await import("../../open-sse/executors/gemini-web.ts");
const { prepareToolMessages } = await import("../../open-sse/translator/webTools.ts");

test("#13380 bug 1: single-turn system + user request retains BOTH contents", () => {
  const messages = [
    { role: "system", content: "SYSTEM_SENTINEL\nSECOND_SYSTEM_LINE" },
    { role: "user", content: "USER_SENTINEL" },
  ];
  const prompt = buildGeminiPrompt(messages);
  assert.ok(prompt.includes("USER_SENTINEL"));
  assert.ok(prompt.includes("SYSTEM_SENTINEL"));
});

test("#13380 bug 1: single-turn request with no system message stays byte-for-byte identical", () => {
  const messages = [{ role: "user", content: "JUST_THE_USER_MESSAGE" }];
  const prompt = buildGeminiPrompt(messages);
  assert.equal(prompt, "JUST_THE_USER_MESSAGE");
});

test("#13380 bug 2: tool-enabled request retains the appended tool contract, not just the client's first system message", () => {
  const bodyObj = {
    tools: [
      {
        type: "function",
        function: {
          name: "ping",
          description: "Return a ping",
          parameters: { type: "object", properties: {} },
        },
      },
    ],
  };
  const messages = [
    { role: "system", content: "CLIENT_SYSTEM_SENTINEL" },
    { role: "user", content: "USER_SENTINEL" },
  ];

  const { effectiveMessages } = prepareToolMessages(bodyObj, messages);
  const systemMessages = effectiveMessages.filter((m: { role: string }) => m.role === "system");
  assert.ok(systemMessages.length >= 2);

  const prompt = buildGeminiToolPrompt(effectiveMessages);
  assert.ok(prompt.includes("Return a ping"));
});

test("#13380 bug 2: tool-enabled request preserves order — client system message(s) before the appended tool contract", () => {
  const bodyObj = {
    tools: [
      {
        type: "function",
        function: {
          name: "ping",
          description: "Return a ping",
          parameters: { type: "object", properties: {} },
        },
      },
    ],
  };
  const messages = [
    { role: "system", content: "CLIENT_SYSTEM_LINE_1\nCLIENT_SYSTEM_LINE_2" },
    { role: "user", content: "USER_SENTINEL" },
  ];

  const { effectiveMessages } = prepareToolMessages(bodyObj, messages);
  const prompt = buildGeminiToolPrompt(effectiveMessages);

  const clientIdx = prompt.indexOf("CLIENT_SYSTEM_LINE_1");
  const contractIdx = prompt.indexOf("Return a ping");
  assert.ok(clientIdx !== -1, "client system message must be present");
  assert.ok(contractIdx !== -1, "tool contract must be present");
  assert.ok(clientIdx < contractIdx, "client system message must come before the tool contract");
});
