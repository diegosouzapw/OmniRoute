/**
 * Regression test for #6220 — GitLab Duo executor must feed tool results back into the
 * prompt so the agent continues instead of re-emitting the same tool_call forever.
 *
 * Complements #6051 (PR #6111), which taught the executor to DETECT `<tool>` blocks and
 * emit a valid OpenAI `tool_calls` response. #6220 is the follow-up turn: once the client
 * appends `assistant{tool_calls}` + `tool{result}` and calls again, `buildPrompt()` used
 * to branch only on `system`/`user` and take `userParts.at(-1)`, silently dropping the
 * assistant and tool messages. The reconstructed prompt was byte-identical to turn 1, so
 * the model re-derived the same `<tool>` call → infinite loop.
 *
 * Fix: when the message array carries a tool exchange (an assistant with `tool_calls` or
 * a `tool` result), serialize the full conversation — including the tool result keyed by
 * `tool_call_id` — so the prompt differs from turn 1 and carries the observation.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { buildPrompt } from "../../open-sse/executors/gitlab.ts";

const SYSTEM = { role: "system", content: "You are a helpful assistant." };
const USER = { role: "user", content: "What's the weather in Paris?" };

test("buildPrompt: simple system+user prompt is unchanged (legacy path) [#6220]", () => {
  const prompt = buildPrompt([SYSTEM, USER]);
  assert.match(prompt, /System instructions:/);
  assert.match(prompt, /What's the weather in Paris\?/);
  // No tool exchange → no conversation serialization markers.
  assert.doesNotMatch(prompt, /Tool result/);
});

test("buildPrompt: only the latest user message is used when no tool exchange (legacy) [#6220]", () => {
  const prompt = buildPrompt([
    { role: "user", content: "first" },
    { role: "user", content: "second" },
  ]);
  assert.equal(prompt, "second");
});

test("buildPrompt: tool result is fed back and prompt differs from turn 1 [#6220]", () => {
  const turn1 = buildPrompt([SYSTEM, USER]);

  const turn2 = buildPrompt([
    SYSTEM,
    USER,
    {
      role: "assistant",
      content: "",
      tool_calls: [
        {
          id: "call_abc123",
          type: "function",
          function: { name: "get_weather", arguments: '{"city":"Paris"}' },
        },
      ],
    },
    { role: "tool", tool_call_id: "call_abc123", name: "get_weather", content: '{"temp_c":21}' },
  ]);

  // The tool result must be present…
  assert.match(turn2, /temp_c/);
  assert.match(turn2, /21/);
  // …the tool_call_id must key the observation…
  assert.match(turn2, /call_abc123/);
  // …and the prompt must NOT be identical to turn 1 (that identity was the loop).
  assert.notEqual(turn2, turn1);
});

test("buildPrompt: multiple tool results are each keyed by their tool_call_id [#6220]", () => {
  const prompt = buildPrompt([
    USER,
    {
      role: "assistant",
      content: "",
      tool_calls: [
        { id: "call_1", type: "function", function: { name: "a", arguments: "{}" } },
        { id: "call_2", type: "function", function: { name: "b", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "call_1", name: "a", content: "result-A" },
    { role: "tool", tool_call_id: "call_2", name: "b", content: "result-B" },
  ]);

  assert.match(prompt, /call_1/);
  assert.match(prompt, /result-A/);
  assert.match(prompt, /call_2/);
  assert.match(prompt, /result-B/);
});
