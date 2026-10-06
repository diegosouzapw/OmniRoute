// Regression test for issue #10527 — "Deepseek web just never does anything" (Cline).
//
// DeepSeek Web has no native messages[]/tool-calling API, so OmniRoute flattens the chat
// history into a single `prompt` string via messagesToPrompt(). Cline (and most
// XML-tool-convention agentic clients) never sends OpenAI-native `tools[]`, so it always
// takes this non-tool path. With the old default (historyWindow<=0 -> system + last user
// message only), the original task instruction was silently dropped after a couple of
// tool-result turns, causing the model to lose the task and loop asking "what do you want
// me to do?". The fix auto-applies a bounded rolling window for genuinely multi-turn
// conversations even when historyWindow is unset.
import test from "node:test";
import assert from "node:assert/strict";

const { messagesToPrompt } = await import("../../open-sse/executors/deepseek-web.ts");

test("#10527: default (no tools[], no historyWindow) keeps the original task after a few Cline-style turns", () => {
  const clineStyleConversation = [
    { role: "system", content: "You are Cline, an autonomous coding agent. Use the available tools." },
    { role: "user", content: "Add input validation to the /api/v1/signup route and write a test for it." },
    {
      role: "assistant",
      content:
        "I'll look at the signup route first.\n<read_file><path>src/app/api/v1/signup/route.ts</path></read_file>",
    },
    {
      role: "user",
      content:
        "[read_file for 'src/app/api/v1/signup/route.ts'] Result:\nexport async function POST(req) { /* ...200 lines... */ }",
    },
    {
      role: "assistant",
      content:
        "Now let me check the existing validation schema.\n<read_file><path>src/lib/validation/signup.ts</path></read_file>",
    },
    {
      role: "user",
      content:
        "[read_file for 'src/lib/validation/signup.ts'] Result:\nexport const signupSchema = z.object({ /* ... */ });",
    },
  ];

  const upstreamPrompt = messagesToPrompt(clineStyleConversation, 0 /* default historyWindow */);

  assert.ok(
    upstreamPrompt.includes("Add input validation to the /api/v1/signup route"),
    "#10527: the original task instruction must survive in the upstream prompt " +
      "even after a couple of Cline-style tool-result turns.\n\n" +
      `Actual upstream prompt sent to chat.deepseek.com:\n${upstreamPrompt}`
  );
});

test("#10527: genuinely single-turn request keeps the minimal system + last-user-only prompt", () => {
  const singleTurn = [
    { role: "system", content: "You are helpful." },
    { role: "user", content: "What is 2+2?" },
  ];

  const upstreamPrompt = messagesToPrompt(singleTurn, 0);
  assert.equal(upstreamPrompt, "You are helpful.\n\nWhat is 2+2?");
});
