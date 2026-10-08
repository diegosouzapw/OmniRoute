/**
 * #15311: OpenCode Go must keep a third-party coding agent's own User-Agent.
 *
 * OpenCode Go's client requirements (opencode.ai/docs/go, "Where can I use it?") ask a
 * client to "identify itself with its own user agent, such as `my-coding-agent/1.0`,
 * rather than a generic SDK or HTTP-library name" and to send a stable
 * `x-opencode-session`. The Zen free-tier rewrite (#5997) replaced every UA that is not a
 * versioned OpenCode CLI, so on the authenticated Go path an agent's identity became
 * `opencode/<version>` unless synthesis was switched off globally.
 *
 * Rules:
 *   R1 Go keeps an agent's own UA with synthesis unset and with synthesis on.
 *   R2 Go keeps the client's session unchanged across turns.
 *   R3 Go still replaces a generic SDK / HTTP-library UA, and fills a missing one.
 *   R4 Go keeps a genuine OpenCode CLI UA (unchanged behaviour).
 *   R5 The Zen free tier still replaces a non-CLI UA (its policy is untouched).
 *   R6 With synthesis off, the client UA is forwarded as before.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

const CLI_UA_RE = /^opencode\/\d+\.\d+/;
const SESSION = "ses_00000000000000000000000000";

function withEnv(entries: Record<string, string | undefined>, fn: () => void) {
  const saved: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(entries)) {
    saved[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    fn();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

const CLEAN_ENV = {
  OPENCODE_SYNTHESIZE_CLI_HEADERS: undefined,
  OPENCODE_USER_AGENT: undefined,
  OPENCODE_GO_USER_AGENT: undefined,
};

function goHeaders(clientHeaders: Record<string, string> | null) {
  const executor = new OpencodeExecutor("opencode-go");
  return executor.buildHeaders({ apiKey: "synthetic-test-key" }, true, clientHeaders, "glm-5.2");
}

function userAgentOf(headers: Record<string, string>) {
  return Object.entries(headers).find(([key]) => key.toLowerCase() === "user-agent")?.[1];
}

test("R1: Go keeps an agent's own User-Agent with synthesis unset", () => {
  withEnv(CLEAN_ENV, () => {
    const headers = goHeaders({
      "User-Agent": "my-coding-agent/1.0",
      "x-opencode-session": SESSION,
    });
    assert.equal(userAgentOf(headers), "my-coding-agent/1.0");
  });
});

test("R1: Go keeps an agent's own User-Agent with synthesis explicitly on", () => {
  withEnv({ ...CLEAN_ENV, OPENCODE_SYNTHESIZE_CLI_HEADERS: "true" }, () => {
    const headers = goHeaders({
      "user-agent": "hermes-agent/2.3.1",
      "x-opencode-session": SESSION,
    });
    assert.equal(userAgentOf(headers), "hermes-agent/2.3.1");
  });
});

test("R2: Go keeps the client's session unchanged across turns", () => {
  withEnv(CLEAN_ENV, () => {
    const client = { "User-Agent": "my-coding-agent/1.0", "x-opencode-session": SESSION };
    const first = goHeaders(client);
    const second = goHeaders(client);
    assert.equal(first["x-opencode-session"], SESSION);
    assert.equal(second["x-opencode-session"], SESSION);
    assert.equal(userAgentOf(second), "my-coding-agent/1.0");
  });
});

test("R3: Go still replaces a generic SDK or HTTP-library User-Agent", () => {
  withEnv(CLEAN_ENV, () => {
    for (const generic of [
      "curl/8.5.0",
      "python-requests/2.32.3",
      "python-httpx/0.27.0",
      "OpenAI/JS 4.67.3",
      "OpenAI/Python 1.51.0",
      "axios/1.7.7",
      "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
      "undici",
      "Go-http-client/2.0",
      "okhttp/4.12.0",
      "Bun/1.4.2",
    ]) {
      const headers = goHeaders({ "User-Agent": generic });
      assert.match(userAgentOf(headers) ?? "", CLI_UA_RE, `${generic} must be replaced`);
    }
  });
});

test("R3: Go fills a User-Agent when the client sends none", () => {
  withEnv(CLEAN_ENV, () => {
    assert.match(userAgentOf(goHeaders(null)) ?? "", CLI_UA_RE);
    assert.match(userAgentOf(goHeaders({ "x-opencode-session": SESSION })) ?? "", CLI_UA_RE);
  });
});

test("R4: Go keeps a genuine OpenCode CLI User-Agent", () => {
  withEnv(CLEAN_ENV, () => {
    const headers = goHeaders({ "User-Agent": "opencode/1.18.31" });
    assert.equal(userAgentOf(headers), "opencode/1.18.31");
  });
});

test("R5: the Zen free tier still replaces a non-CLI User-Agent", () => {
  withEnv(CLEAN_ENV, () => {
    const executor = new OpencodeExecutor("opencode");
    const headers = executor.buildHeaders(
      null,
      true,
      { "User-Agent": "my-coding-agent/1.0" },
      "nemotron-3.5-lightning-free"
    );
    assert.match(userAgentOf(headers) ?? "", CLI_UA_RE);
  });
});

test("R6: with synthesis off, Go forwards the client User-Agent as before", () => {
  withEnv({ ...CLEAN_ENV, OPENCODE_SYNTHESIZE_CLI_HEADERS: "false" }, () => {
    const headers = goHeaders({
      "User-Agent": "my-coding-agent/1.0",
      "x-opencode-session": SESSION,
    });
    assert.equal(userAgentOf(headers), "my-coding-agent/1.0");
    assert.equal(headers["x-opencode-session"], SESSION);
  });
});
