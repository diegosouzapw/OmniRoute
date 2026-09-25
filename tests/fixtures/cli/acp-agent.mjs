import { createInterface } from "node:readline";

const mode = process.env.ACP_TEST_MODE || "normal";
let permissionPromptId;
const reply = (id, result) =>
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
const text = (value, sessionId = "fixture-session") =>
  process.stdout.write(
    JSON.stringify({
      jsonrpc: "2.0",
      method: "session/update",
      params: {
        sessionId,
        update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text: value } },
      },
    }) + "\n"
  );

createInterface({ input: process.stdin }).on("line", (line) => {
  const request = JSON.parse(line);
  if (request.id === "permission-probe") {
    text(request.result.outcome.outcome);
    reply(permissionPromptId, { stopReason: "end_turn" });
    return;
  }
  if (request.method === "initialize") {
    if (mode === "init-hang") return;
    if (mode === "init-fail") {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: "2.0",
          id: request.id,
          error: { code: -32603, message: "fixture failure" },
        }) + "\n"
      );
      return;
    }
    reply(request.id, {
      protocolVersion: mode === "bad-version" ? 99 : 1,
      agentCapabilities: {},
      authMethods: [],
    });
  } else if (request.method === "session/new") {
    reply(request.id, { sessionId: "fixture-session" });
  } else if (request.method === "session/prompt") {
    process.stderr.write("prompt-started\n");
    if (mode === "permission") {
      permissionPromptId = request.id;
      process.stdout.write(
        JSON.stringify({
          jsonrpc: "2.0",
          id: "permission-probe",
          method: "session/request_permission",
          params: {
            sessionId: "fixture-session",
            toolCall: { toolCallId: "probe", title: "Execute a command", kind: "execute" },
            options: [{ optionId: "allow", name: "Allow", kind: "allow_once" }],
          },
        }) + "\n"
      );
      return;
    }
    if (mode === "exit") return process.exit(3);
    if (mode === "frame-flood") return process.stdout.write("x".repeat(3 * 1024 * 1024));
    if (mode === "text-flood") {
      for (let i = 0; i < 24; i++) text("x".repeat(64 * 1024));
      text("FINAL-MARKER");
    } else {
      text("foreign-output", "wrong-session");
      text(
        mode === "env"
          ? JSON.stringify({
              inherited: Boolean(process.env.ACP_PARENT_SECRET),
              explicit: process.env.ACP_EXPLICIT_VALUE,
            })
          : "fixture answer"
      );
    }
    if (mode === "prompt-hang") return;
    reply(request.id, { stopReason: "end_turn" });
  } else if (request.method === "session/cancel") {
    process.stderr.write("cancel-received\n");
  }
});
