#!/usr/bin/env node
import fs from "node:fs";
import readline from "node:readline";

if (
  process.argv[2] !== "acp" ||
  process.argv[3] !== "--agent-type" ||
  process.argv[4] !== "summarizer" ||
  process.argv.length !== 5
) {
  process.exit(64);
}

const logFile = process.env.DEVIN_BRIDGE_MOCK_LOG || "/evidence/mock-acp.jsonl";
const rl = readline.createInterface({ input: process.stdin });
const send = (value) => process.stdout.write(`${JSON.stringify(value)}\n`);
const log = (value) => fs.appendFileSync(logFile, `${JSON.stringify(value)}\n`);

const actions = [
  {
    name: "Skill",
    arguments: { skill: "bridge-proof" },
  },
  {
    name: "Bash",
    arguments: {
      command: "find . -maxdepth 2 -type f -print",
      description: "Locate the fixture files",
    },
  },
  {
    name: "Read",
    arguments: { file_path: "/workspace/math.js" },
  },
  {
    name: "Edit",
    arguments: {
      file_path: "/workspace/math.js",
      old_string: "return a - b;",
      new_string: "return a * b;",
    },
  },
  {
    name: "Bash",
    arguments: { command: "npm test", description: "Run the fixture tests" },
  },
  {
    name: "Edit",
    arguments: {
      file_path: "/workspace/math.js",
      old_string: "return a * b;",
      new_string: "return a + b;",
    },
  },
  {
    name: "Bash",
    arguments: { command: "npm test", description: "Confirm the corrected fixture" },
  },
];

rl.on("line", (line) => {
  const message = JSON.parse(line);
  if (message.method === "initialize") {
    if (message.params?.protocolVersion !== 1) {
      send({ jsonrpc: "2.0", id: message.id, error: { code: -32602, message: "ACP v1 required" } });
      return;
    }
    send({ jsonrpc: "2.0", id: message.id, result: { protocolVersion: 1 } });
  } else if (message.method === "session/new") {
    if (message.params?.cwd !== "/home/bridge" || !Array.isArray(message.params?.mcpServers)) {
      send({ jsonrpc: "2.0", id: message.id, error: { code: -32602, message: "unsafe session" } });
      return;
    }
    send({
      jsonrpc: "2.0",
      id: message.id,
      result: { sessionId: "offline" },
    });
  } else if (message.method === "session/set_config_option") {
    send({
      jsonrpc: "2.0",
      id: message.id,
      error: { code: -32602, message: "summarizer mode must not be mutated" },
    });
  } else if (message.method === "session/prompt") {
    const prompt = String(message.params?.prompt?.[0]?.text || "");
    if (!prompt.includes("[Devin Summarizer Bridge]") || !prompt.includes("[Execution Trace]")) {
      send({
        jsonrpc: "2.0",
        id: message.id,
        error: { code: -32602, message: "summarizer bridge framing required" },
      });
      return;
    }
    if (prompt.includes("CONTRACT_AFTER_TOOL")) {
      log({ provider: "devin-cli-agentic", scenario: "after-tool" });
      send({
        jsonrpc: "2.0",
        method: "session/update",
        params: {
          sessionId: "offline",
          update: {
            sessionUpdate: "agent_message_chunk",
            content: { type: "text", text: "contract continued" },
          },
        },
      });
      send({ jsonrpc: "2.0", id: message.id, result: { stopReason: "end_turn" } });
      return;
    }
    if (prompt.includes("CONTRACT_EXIT")) {
      log({ provider: "devin-cli-agentic", scenario: "exit" });
      process.exit(7);
    }
    if (prompt.includes("CONTRACT_ERROR")) {
      log({ provider: "devin-cli-agentic", scenario: "error" });
      send({
        jsonrpc: "2.0",
        id: message.id,
        error: { code: -32000, message: "deterministic upstream failure" },
      });
      return;
    }
    if (prompt.includes("CONTRACT_TEXT")) {
      log({ provider: "devin-cli-agentic", scenario: "text" });
      send({
        jsonrpc: "2.0",
        method: "session/update",
        params: {
          sessionId: "offline",
          update: {
            sessionUpdate: "agent_message_chunk",
            content: { type: "text", text: "contract text" },
          },
        },
      });
      send({ jsonrpc: "2.0", id: message.id, result: { stopReason: "end_turn" } });
      return;
    }
    if (prompt.includes("CONTRACT_NARRATIVE_REPAIR")) {
      const isRepair = prompt.includes("[Single Repair Attempt]");
      log({
        provider: "devin-cli-agentic",
        scenario: "narrative-repair",
        stage: isRepair ? "repair" : "initial",
      });
      send({
        jsonrpc: "2.0",
        method: "session/update",
        params: {
          sessionId: "offline",
          update: {
            sessionUpdate: "agent_message_chunk",
            content: {
              type: "text",
              text: isRepair
                ? '<tool>{"name":"Read","arguments":{"file_path":"/workspace/math.js"}}</tool>'
                : "I'll start by reading the math.js file, then run the tests.",
            },
          },
        },
      });
      send({ jsonrpc: "2.0", id: message.id, result: { stopReason: "end_turn" } });
      return;
    }
    if (prompt.includes("CONTRACT_TOOL")) {
      log({ provider: "devin-cli-agentic", scenario: "tool" });
      send({
        jsonrpc: "2.0",
        method: "session/update",
        params: {
          sessionId: "offline",
          update: {
            sessionUpdate: "agent_message_chunk",
            content: {
              type: "text",
              text: '<tool>{"name":"Read","arguments":{"file_path":"/workspace/math.js"}}</tool>',
            },
          },
        },
      });
      send({ jsonrpc: "2.0", id: message.id, result: { stopReason: "end_turn" } });
      return;
    }
    const resultCount = (prompt.match(/\[Tool Result\]/g) || []).length;
    if (!prompt.includes("CLAUDE_MD_BRIDGE_ACTIVE") || !prompt.includes("COMMAND_BRIDGE_ACTIVE")) {
      send({
        jsonrpc: "2.0",
        id: message.id,
        error: { code: -32602, message: "Claude project context missing" },
      });
      return;
    }

    const action = actions[resultCount];
    const text = action
      ? `<tool>${JSON.stringify(action)}</tool>`
      : "BRIDGE_E2E_COMPLETE CLAUDE_MD_BRIDGE_ACTIVE SKILL_BRIDGE_ACTIVE COMMAND_BRIDGE_ACTIVE";
    if (!action && !prompt.includes("SKILL_BRIDGE_ACTIVE")) {
      send({
        jsonrpc: "2.0",
        id: message.id,
        error: { code: -32602, message: "Skill result missing" },
      });
      return;
    }
    log({
      provider: "devin-cli-agentic",
      model: message.params?.model || "swe-1-7",
      resultCount,
      action: action?.name || "final",
    });
    const midpoint = Math.max(1, Math.floor(text.length / 2));
    for (const chunk of [text.slice(0, midpoint), text.slice(midpoint)]) {
      send({
        jsonrpc: "2.0",
        method: "session/update",
        params: {
          sessionId: "offline",
          update: {
            sessionUpdate: "agent_message_chunk",
            content: { type: "text", text: chunk },
          },
        },
      });
    }
    send({ jsonrpc: "2.0", id: message.id, result: { stopReason: "end_turn" } });
  }
});
