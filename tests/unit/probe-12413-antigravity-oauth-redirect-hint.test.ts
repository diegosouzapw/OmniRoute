import test from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";

// Repro probe for issue #12413: `omniroute oauth start --provider antigravity`
// prints the Google authorize URL (which advertises
// redirect_uri=http://localhost:8080/callback) and then silently waits for a
// pasted callback URL/code — nothing in the CLI output warns the operator
// that their browser is about to land on a dead port (ERR_CONNECTION_REFUSED)
// and that seeing that error is expected, not a failure.
//
// This asserts the CLI's browser-flow instructions proactively mention the
// expected browser error (e.g. "can't be reached" / "connection refused" /
// "ERR_CONNECTION_REFUSED") BEFORE the user is sent to authorize.

function makeResp(data: unknown, status = 200) {
  return {
    ok: status < 400,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
}

async function captureStdout(fn: () => Promise<void>) {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  (process.stdout.write as unknown) = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : Buffer.from(c).toString("utf8"));
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

function makeCmd() {
  return { optsWithGlobals: () => ({ output: "json", quiet: true }) };
}

// readline's `close` fallback (bin/cli/io.mjs) only fires once per stdin EOF —
// reusing the real (already-ended) process.stdin across tests in the same file
// means the second readline.createInterface() never sees another `end`/`close`
// event and hangs forever. Swap in a fresh, already-ended Readable per test
// instead of calling `process.stdin.push(null)` on the shared real stream.
async function withEndedStdin<T>(fn: () => Promise<T>): Promise<T> {
  const origStdin = process.stdin;
  const fakeStdin = new Readable({ read() {} });
  fakeStdin.push(null);
  Object.defineProperty(process, "stdin", { value: fakeStdin, configurable: true });
  try {
    return await fn();
  } finally {
    Object.defineProperty(process, "stdin", { value: origStdin, configurable: true });
  }
}

test("runOAuthStart browser flow warns antigravity users before the dead localhost:8080 redirect (#12413)", async () => {
  const origFetch = globalThis.fetch;
  const origExit = process.exit;
  let exitErr: Error | null = null;

  (globalThis.fetch as unknown) = (url: string) => {
    if (url.includes("/api/oauth/antigravity/authorize")) {
      return Promise.resolve(
        makeResp({
          authUrl:
            "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback",
          codeVerifier: "verifier",
          state: "state123",
          redirectUri: "http://localhost:8080/callback",
        })
      );
    }
    return Promise.reject(new Error(`Unexpected fetch: ${url}`));
  };

  (process.exit as unknown) = (code?: number) => {
    exitErr = new Error(`exit ${code}`);
    throw exitErr;
  };

  let out = "";
  try {
    const { runOAuthStart } = await import("../../bin/cli/commands/oauth.mjs");
    out = await withEndedStdin(() =>
      captureStdout(async () => {
        try {
          await runOAuthStart({ provider: "antigravity", browser: false }, makeCmd());
        } catch (e) {
          if (e !== exitErr) throw e;
        }
      })
    );
  } finally {
    globalThis.fetch = origFetch;
    process.exit = origExit;
  }

  assert.ok(out.includes("8080"), "should print the advertised (dead) redirect port");

  const mentionsExpectedBrowserError =
    /can't be reached|connection refused|err_connection_refused|won't load|expected/i.test(out);
  assert.ok(
    mentionsExpectedBrowserError,
    `expected the CLI to warn about the dead-redirect browser error BEFORE the user hits it, got:\n${out}`
  );
});

test("runOAuthStart browser flow does NOT warn for a non-loopback redirect (claude-code)", async () => {
  const origFetch = globalThis.fetch;
  const origExit = process.exit;
  let exitErr: Error | null = null;

  (globalThis.fetch as unknown) = (url: string) => {
    if (url.includes("/api/oauth/claude/authorize")) {
      return Promise.resolve(
        makeResp({
          authUrl: "https://platform.claude.com/oauth/authorize?redirect_uri=fixed",
          codeVerifier: "verifier",
          state: "state123",
          redirectUri: "https://platform.claude.com/oauth/code/callback",
        })
      );
    }
    return Promise.reject(new Error(`Unexpected fetch: ${url}`));
  };

  (process.exit as unknown) = (code?: number) => {
    exitErr = new Error(`exit ${code}`);
    throw exitErr;
  };

  let out = "";
  try {
    const { runOAuthStart } = await import("../../bin/cli/commands/oauth.mjs");
    out = await withEndedStdin(() =>
      captureStdout(async () => {
        try {
          await runOAuthStart({ provider: "claude-code", browser: false }, makeCmd());
        } catch (e) {
          if (e !== exitErr) throw e;
        }
      })
    );
  } finally {
    globalThis.fetch = origFetch;
    process.exit = origExit;
  }

  const mentionsExpectedBrowserError =
    /can't be reached|connection refused|err_connection_refused|won't load/i.test(out);
  assert.ok(
    !mentionsExpectedBrowserError,
    `did not expect a dead-redirect warning for a non-loopback provider, got:\n${out}`
  );
});
