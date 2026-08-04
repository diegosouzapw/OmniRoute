/**
 * Regression test for #5997 — opencode-go/opencode-zen upstream requests must carry
 * OpenCode CLI identity headers even when the client did not supply them.
 *
 * On a datacenter VPS, `opencode.ai/zen/go/v1/chat/completions` is fronted by
 * Cloudflare, which 403s (HTML challenge) requests lacking CLI identity. The reporter's
 * control curl proved the exact headers that succeed:
 *   User-Agent: opencode-cli/1.0.0 · x-opencode-client: cli ·
 *   x-opencode-project: default · x-opencode-request/-session: fresh UUIDs
 * Forwarding those headers from the client also fixes it — confirming the upstream
 * expects CLI identity. Since most OpenAI-compatible clients never send them,
 * `OpencodeExecutor.buildHeaders()` must synthesize the defaults when absent.
 *
 * Client-supplied values always take precedence (defaults only fill gaps), and the
 * UA/client/project defaults are env-overridable.
 *
 * The executor-level synthesis is OPT-IN via `OPENCODE_SYNTHESIZE_CLI_HEADERS=true`:
 * the forward-only default is deliberate (fabricating a WRONG value risks upstream
 * rejection — #5720 regressed with "opencode/local"), and this is deployment-specific
 * (the owner asked for it to stay off-by-default pending live validation). With the flag
 * off, buildHeaders keeps the historical forward-only behavior.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { forwardOpencodeClientHeaders } from "../../open-sse/utils/opencodeHeaders.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const CLI_DEFAULTS = { userAgent: "opencode-cli/1.0.0", client: "cli", project: "default" };

function withEnv(key: string, value: string | undefined, fn: () => void) {
  const saved = process.env[key];
  try {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
    fn();
  } finally {
    if (saved === undefined) delete process.env[key];
    else process.env[key] = saved;
  }
}

test("forwardOpencodeClientHeaders: cliDefaults synthesize all CLI identity headers when absent [#5997]", () => {
  const headers: Record<string, string> = {};
  forwardOpencodeClientHeaders(headers, {}, { cliDefaults: CLI_DEFAULTS });

  assert.equal(headers["User-Agent"], "opencode-cli/1.0.0");
  assert.equal(headers["x-opencode-client"], "cli");
  assert.equal(headers["x-opencode-project"], "default");
  assert.match(headers["x-opencode-request"] ?? "", UUID_RE);
  assert.match(headers["x-opencode-session"] ?? "", UUID_RE);
  assert.notEqual(headers["x-opencode-request"], headers["x-opencode-session"]);
});

test("forwardOpencodeClientHeaders: client-supplied CLI headers take precedence over defaults [#5997]", () => {
  const headers: Record<string, string> = {};
  const clientHeaders = {
    "User-Agent": "my-tool/9.9",
    "x-opencode-client": "vscode",
    "x-opencode-project": "acme",
    "x-opencode-request": "req-from-client",
    "x-opencode-session": "sess-from-client",
  };
  forwardOpencodeClientHeaders(headers, clientHeaders, { cliDefaults: CLI_DEFAULTS });

  assert.equal(headers["User-Agent"], "my-tool/9.9");
  assert.equal(headers["x-opencode-client"], "vscode");
  assert.equal(headers["x-opencode-project"], "acme");
  assert.equal(headers["x-opencode-request"], "req-from-client");
  assert.equal(headers["x-opencode-session"], "sess-from-client");
});

test("forwardOpencodeClientHeaders: without cliDefaults, no synthesis (DefaultExecutor path unchanged)", () => {
  const headers: Record<string, string> = {};
  forwardOpencodeClientHeaders(headers, {});
  assert.equal(headers["User-Agent"], undefined);
  assert.equal(headers["x-opencode-client"], undefined);
  assert.equal(headers["x-opencode-project"], undefined);
});

test("OpencodeExecutor.buildHeaders: forward-only by default — no fabrication when flag is off [#5997]", () => {
  withEnv("OPENCODE_SYNTHESIZE_CLI_HEADERS", undefined, () => {
    const executor = new OpencodeExecutor("opencode-go");
    const headers = executor.buildHeaders(null, true, null, "glm-5.2");
    assert.equal(headers["User-Agent"], undefined);
    assert.equal(headers["x-opencode-client"], undefined);
    assert.equal(headers["x-opencode-project"], undefined);
  });
});

test("OpencodeExecutor.buildHeaders: synthesizes CLI defaults with flag on + no client headers [#5997]", () => {
  withEnv("OPENCODE_SYNTHESIZE_CLI_HEADERS", "true", () => {
    const executor = new OpencodeExecutor("opencode-go");
    const headers = executor.buildHeaders(null, true, null, "glm-5.2");

    assert.equal(headers["User-Agent"], "opencode-cli/1.0.0");
    assert.equal(headers["x-opencode-client"], "cli");
    assert.equal(headers["x-opencode-project"], "default");
    assert.match(headers["x-opencode-request"] ?? "", UUID_RE);
    assert.match(headers["x-opencode-session"] ?? "", UUID_RE);
  });
});

test("OpencodeExecutor.buildHeaders: OPENCODE_GO_USER_AGENT env overrides the default UA (flag on) [#5997]", () => {
  withEnv("OPENCODE_SYNTHESIZE_CLI_HEADERS", "true", () => {
    withEnv("OPENCODE_GO_USER_AGENT", "opencode-cli/2.5.0", () => {
      const executor = new OpencodeExecutor("opencode-go");
      const headers = executor.buildHeaders(null, true, null, "glm-5.2");
      assert.equal(headers["User-Agent"], "opencode-cli/2.5.0");
    });
  });
});
