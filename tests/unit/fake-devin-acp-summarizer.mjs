#!/usr/bin/env node
// Fake local ACP bridge used by tests/unit/devin-cli-agentic-summary-passthrough.test.ts
// (issue #13691). Reproduces the exact SWE-2 behavior: answers a session/prompt
// with a bare <summary>...</summary> envelope and no <tool> tag.
import readline from "node:readline";

const SUMMARY_TEXT = [
  "<summary>",
  "Overview",
  "Searched the knowledge base for the requested record.",
  "",
  "Key Details & Breadcrumbs",
  "- Found the relevant entry in the catalog table.",
  "",
  "Current State",
  "Lookup finished and the record was located.",
  "</summary>",
].join("\n");

const rl = readline.createInterface({ input: process.stdin });

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + "\n");
}

const sessionId = "fake-session-1";

rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let msg;
  try {
    msg = JSON.parse(trimmed);
  } catch {
    return;
  }
  if (msg.method === "initialize") {
    send({ jsonrpc: "2.0", id: msg.id, result: { protocolVersion: 1 } });
    return;
  }
  if (msg.method === "session/new") {
    send({ jsonrpc: "2.0", id: msg.id, result: { sessionId } });
    return;
  }
  if (msg.method === "session/prompt") {
    send({
      jsonrpc: "2.0",
      method: "session/update",
      params: {
        sessionId,
        update: {
          sessionUpdate: "agent_message_chunk",
          content: { type: "text", text: SUMMARY_TEXT },
        },
      },
    });
    send({ jsonrpc: "2.0", id: msg.id, result: { stopReason: "end_turn" } });
    return;
  }
});
