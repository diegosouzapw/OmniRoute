import test from "node:test";
import assert from "node:assert/strict";

import { getCodexClientVersionFromHeaders } from "../../open-sse/config/codexClient.ts";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { DEFAULT_CODEX_CLIENT_VERSION } from "../../src/shared/constants/codexClient.ts";

test("getCodexClientVersionFromHeaders: extracts the version from a real Codex CLI User-Agent", () => {
  assert.equal(
    getCodexClientVersionFromHeaders({
      "user-agent": "codex_cli_rs/0.154.0 (Mac OS 26.6.2; arm64)",
    }),
    "0.154.0"
  );
  assert.equal(
    getCodexClientVersionFromHeaders({
      "user-agent":
        "codex_exec/0.154.0 (Mac OS 26.6.2; arm64) xterm-256color (codex_exec; 0.154.0)",
    }),
    "0.154.0"
  );
});

test("getCodexClientVersionFromHeaders: prefers a valid generic version header over User-Agent", () => {
  assert.equal(
    getCodexClientVersionFromHeaders({
      version: "9.9.9",
      "user-agent": "codex_cli_rs/0.154.0 (Mac OS 26.6.2; arm64)",
    }),
    "9.9.9"
  );
});

test("getCodexClientVersionFromHeaders: returns null when headers are absent or empty", () => {
  assert.equal(getCodexClientVersionFromHeaders(null), null);
  assert.equal(getCodexClientVersionFromHeaders(undefined), null);
  assert.equal(getCodexClientVersionFromHeaders({}), null);
});

test("getCodexClientVersionFromHeaders: returns null for a non-Codex User-Agent with no version header", () => {
  assert.equal(getCodexClientVersionFromHeaders({ "user-agent": "curl/8.4.0" }), null);
});

test("getCodexClientVersionFromHeaders: rejects a CRLF injection attempt in the version header", () => {
  assert.equal(getCodexClientVersionFromHeaders({ version: "1.0.0\r\nX-Injected: evil" }), null);
});

test("getCodexClientVersionFromHeaders: rejects a version header longer than the 32-char safe token limit", () => {
  const overlong = "1.0.0-" + "a".repeat(30);
  assert.ok(overlong.length > 32);
  assert.equal(getCodexClientVersionFromHeaders({ version: overlong }), null);
});

test("getCodexClientVersionFromHeaders: a CRLF/oversized User-Agent injection only ever yields the captured digits", () => {
  assert.equal(
    getCodexClientVersionFromHeaders({
      "user-agent": "codex_cli_rs/1.0.0\r\nX-Evil: 1",
    }),
    "1.0.0"
  );
});

test("CodexExecutor.buildHeaders forwards the caller's Codex client version from clientHeaders", () => {
  const executor = new CodexExecutor();

  const fromUserAgent = executor.buildHeaders({ accessToken: "codex-token" }, true, {
    "user-agent": "codex_cli_rs/0.160.2 (Mac OS 26.6.2; arm64)",
  });
  assert.equal(fromUserAgent.Version, "0.160.2");
  assert.equal(fromUserAgent["User-Agent"], "codex-cli/0.160.2 (Windows 10.0.26200; x64)");

  const fromVersionHeader = executor.buildHeaders({ accessToken: "codex-token" }, true, {
    version: "9.9.9",
  });
  assert.equal(fromVersionHeader.Version, "9.9.9");
  assert.equal(fromVersionHeader["User-Agent"], "codex-cli/9.9.9 (Windows 10.0.26200; x64)");
});

test("CodexExecutor.buildHeaders falls back to the default client version when clientHeaders is absent, empty, or unusable", () => {
  const executor = new CodexExecutor();

  const noHeaders = executor.buildHeaders({ accessToken: "codex-token" }, true);
  assert.equal(noHeaders.Version, DEFAULT_CODEX_CLIENT_VERSION);

  const emptyHeaders = executor.buildHeaders({ accessToken: "codex-token" }, true, {});
  assert.equal(emptyHeaders.Version, DEFAULT_CODEX_CLIENT_VERSION);

  const nonCodexUserAgent = executor.buildHeaders({ accessToken: "codex-token" }, true, {
    "user-agent": "curl/8.4.0",
  });
  assert.equal(nonCodexUserAgent.Version, DEFAULT_CODEX_CLIENT_VERSION);
});

test("CodexExecutor.buildHeaders rejects injection attempts in the caller's version/User-Agent headers", () => {
  const executor = new CodexExecutor();

  const crlfVersion = executor.buildHeaders({ accessToken: "codex-token" }, true, {
    version: "1.0.0\r\nX-Injected: evil",
  });
  assert.equal(crlfVersion.Version, DEFAULT_CODEX_CLIENT_VERSION);
  assert.equal(crlfVersion["User-Agent"].includes("\r\n"), false);

  const overlongVersion = executor.buildHeaders({ accessToken: "codex-token" }, true, {
    version: "1.0.0-" + "a".repeat(30),
  });
  assert.equal(overlongVersion.Version, DEFAULT_CODEX_CLIENT_VERSION);

  const injectedUserAgent = executor.buildHeaders({ accessToken: "codex-token" }, true, {
    "user-agent": "codex_cli_rs/1.0.0\r\nX-Evil: 1",
  });
  assert.equal(injectedUserAgent.Version, "1.0.0");
  assert.equal(injectedUserAgent["User-Agent"].includes("\r\n"), false);
  assert.equal(injectedUserAgent["User-Agent"], "codex-cli/1.0.0 (Windows 10.0.26200; x64)");
});
