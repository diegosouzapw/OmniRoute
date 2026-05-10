import { buildKiroPayload } from "./open-sse/translator/request/openai-to-kiro.js";

const messages = [];
for (let i = 0; i < 2; i++) {
  messages.push({ role: "user", content: `user ${i}` });
  messages.push({ role: "assistant", content: `assistant ${i}` });
}
messages.push({ role: "user", content: "use tool" });
messages.push({
  role: "assistant",
  tool_calls: [{ id: "call_1", function: { name: "test", arguments: "{}" } }],
});
messages.push({ role: "tool", tool_call_id: "call_1", content: "ok" });
messages.push({ role: "user", content: "last user" });

const payload = buildKiroPayload("kr/claude-sonnet-4.5", { messages, tools: [] }, false, {});
console.log(JSON.stringify(payload, null, 2));
