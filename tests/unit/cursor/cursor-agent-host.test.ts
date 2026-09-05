import assert from "node:assert/strict";
import test from "node:test";

import { resolveCursorAgentUrl } from "../../../open-sse/executors/cursor/agentEndpoint.ts";
import { encodeMessage, encodeString } from "../../../open-sse/utils/cursorAgentProtobuf/wire.ts";

function serverConfig(agentUrl: string, agentnUrl: string): Buffer {
  return encodeMessage(27, [encodeString(1, agentUrl), encodeString(2, agentnUrl)]);
}

test("Cursor Agent uses each connection's server-assigned endpoint", async () => {
  const originalFetch = globalThis.fetch;
  const requestedTokens: string[] = [];
  globalThis.fetch = async (input, init) => {
    assert.equal(
      String(input),
      "https://api2.cursor.sh/aiserver.v1.ServerConfigService/GetServerConfig"
    );
    const token = new Headers(init?.headers).get("authorization") ?? "";
    requestedTokens.push(token);
    const region = token === "Bearer token-us" ? "us" : "eu";
    return new Response(
      serverConfig(
        `https://agent.${region}.api5.cursor.sh`,
        `https://agentn.${region}.api5.cursor.sh`
      ),
      { status: 200, headers: { "Content-Type": "application/proto" } }
    );
  };

  try {
    const usCredentials = {
      accessToken: "token-us",
      connectionId: "connection-us",
      providerSpecificData: { ghostMode: false },
    };
    assert.equal(
      await resolveCursorAgentUrl(usCredentials),
      "https://agentn.us.api5.cursor.sh/agent.v1.AgentService/Run"
    );
    assert.equal(
      await resolveCursorAgentUrl(usCredentials),
      await resolveCursorAgentUrl(usCredentials)
    );
    assert.equal(
      await resolveCursorAgentUrl({
        accessToken: "token-eu",
        connectionId: "connection-eu",
        providerSpecificData: { ghostMode: true },
      }),
      "https://agent.eu.api5.cursor.sh/agent.v1.AgentService/Run"
    );
    assert.deepEqual(requestedTokens, ["Bearer token-us", "Bearer token-eu"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Cursor Agent uses the token with the connection cache key", async () => {
  const originalFetch = globalThis.fetch;
  const requestedTokens: string[] = [];
  globalThis.fetch = async (_input, init) => {
    const token = new Headers(init?.headers).get("authorization") ?? "";
    requestedTokens.push(token);
    const region = token.endsWith("new") ? "new" : "old";
    return new Response(
      serverConfig(
        `https://agent.${region}.api5.cursor.sh`,
        `https://agentn.${region}.api5.cursor.sh`
      ),
      { status: 200, headers: { "Content-Type": "application/proto" } }
    );
  };

  try {
    assert.equal(
      await resolveCursorAgentUrl({ accessToken: "token-old", connectionId: "connection-rotate" }),
      "https://agent.old.api5.cursor.sh/agent.v1.AgentService/Run"
    );
    assert.equal(
      await resolveCursorAgentUrl({ accessToken: "token-new", connectionId: "connection-rotate" }),
      "https://agent.new.api5.cursor.sh/agent.v1.AgentService/Run"
    );
    assert.deepEqual(requestedTokens, ["Bearer token-old", "Bearer token-new"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Cursor Agent rejects an endpoint outside Cursor's API domain", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      serverConfig("https://attacker.example/agent", "https://attacker.example/agentn"),
      { status: 200, headers: { "Content-Type": "application/proto" } }
    );

  try {
    await assert.rejects(
      resolveCursorAgentUrl({
        accessToken: "token-invalid-host",
        connectionId: "connection-invalid-host",
      }),
      /invalid Agent URL/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
