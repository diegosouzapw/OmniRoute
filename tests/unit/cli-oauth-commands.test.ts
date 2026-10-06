import test from "node:test";
import assert from "node:assert/strict";

const CONNECTIONS = [
  {
    id: "conn1",
    provider: "gemini",
    name: "My Gemini",
    authType: "oauth",
    isActive: true,
    testStatus: "ok",
  },
  {
    id: "conn2",
    provider: "copilot",
    name: "Copilot",
    authType: "oauth2",
    isActive: true,
    testStatus: "ok",
  },
  {
    id: "conn3",
    provider: "openai",
    name: "OpenAI Key",
    authType: "api_key",
    isActive: true,
    testStatus: "ok",
  },
];

function makeResp(data: unknown, status = 200) {
  const obj = {
    ok: status < 400,
    status,
    exitCode: status < 400 ? 0 : 1,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (c: string | Uint8Array) => {
    if (typeof c === "string") chunks.push(c);
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

test("runOAuthStatus filtra apenas conexões oauth/oauth2", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    assert.ok(url.includes("/api/providers"));
    return Promise.resolve(makeResp({ providers: CONNECTIONS }));
  }) as any;

  const { runOAuthStatus } = await import("../../bin/cli/commands/oauth.mjs");
  const out = await captureStdout(() => runOAuthStatus({}, makeCmd() as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed.length, 2);
  assert.ok(parsed.every((c: any) => c.authType === "oauth" || c.authType === "oauth2"));
});

test("runOAuthStatus filtra por provider", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(
      makeResp({ providers: CONNECTIONS.filter((c) => c.provider === "gemini") })
    );
  }) as any;

  const { runOAuthStatus } = await import("../../bin/cli/commands/oauth.mjs");
  await captureStdout(() => runOAuthStatus({ provider: "gemini" }, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("provider=gemini"));
});

test("runOAuthStatus consumes the connections envelope", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    assert.ok(url.includes("/api/providers"));
    return Promise.resolve(makeResp({ connections: CONNECTIONS }));
  }) as any;

  try {
    const { runOAuthStatus } = await import("../../bin/cli/commands/oauth.mjs");
    const out = await captureStdout(() => runOAuthStatus({}, makeCmd() as any));
    const parsed = JSON.parse(out);
    assert.deepEqual(
      parsed.map((connection: { id: string }) => connection.id),
      ["conn1", "conn2"]
    );
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("runOAuthStatus tolerates an out-of-contract 200 payload (#11236)", async () => {
  // Bug 5 residual: #10491 added the `data.connections ??` envelope, but a 200
  // whose body is an object without connections/providers/items still fell
  // through to `data` itself and crashed on `.filter is not a function`
  // (followed by a libuv teardown assertion on Windows). The guard must coerce
  // to an empty list and warn on stderr — never throw a raw TypeError.
  const origFetch = globalThis.fetch;
  // `as unknown as` (not `as any`): this file's no-explicit-any suppression is
  // frozen at its pre-existing count, so new casts must be any-free.
  globalThis.fetch = (() =>
    Promise.resolve(makeResp({ status: "ok" }))) as unknown as typeof globalThis.fetch;

  const stderrChunks: string[] = [];
  const origStderr = process.stderr.write.bind(process.stderr);
  process.stderr.write = ((chunk: string | Uint8Array) => {
    if (typeof chunk === "string") stderrChunks.push(chunk);
    return true;
  }) as typeof process.stderr.write;

  try {
    const { runOAuthStatus } = await import("../../bin/cli/commands/oauth.mjs");
    const out = await captureStdout(() => runOAuthStatus({}, makeCmd()));
    assert.deepEqual(JSON.parse(out), []);
  } finally {
    globalThis.fetch = origFetch;
    process.stderr.write = origStderr;
  }

  const warning = stderrChunks.join("");
  assert.ok(warning.length > 0, "a sanitized warning must be written to stderr");
  assert.ok(!warning.includes("at /"), "warning must not leak a stack trace");
});

test("runOAuthRevoke com --yes chama endpoint de revogação", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({}));
  }) as any;

  const out = await captureStdout(async () => {
    const { runOAuthRevoke } = await import("../../bin/cli/commands/oauth.mjs");
    await runOAuthRevoke({ provider: "gemini", yes: true }, makeCmd() as any);
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/oauth/gemini/revoke"));
  assert.equal(capturedMethod, "POST");
  assert.ok(out.includes("Revoked"));
});

test("runOAuthRevoke com connectionId usa DELETE no provider", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({}));
  }) as any;

  const out = await captureStdout(async () => {
    const { runOAuthRevoke } = await import("../../bin/cli/commands/oauth.mjs");
    await runOAuthRevoke(
      { provider: "gemini", connectionId: "conn1", yes: true },
      makeCmd() as any
    );
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/providers/conn1"));
  assert.equal(capturedMethod, "DELETE");
  assert.ok(out.includes("Revoked"));
});

test("runOAuthStart flow=import chama endpoint de import", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({ count: 3 }));
  }) as any;

  const out = await captureStdout(async () => {
    const { runOAuthStart } = await import("../../bin/cli/commands/oauth.mjs");
    await runOAuthStart({ provider: "cursor" }, makeCmd() as any);
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/oauth/cursor/import"));
  assert.equal(capturedMethod, "POST");
  assert.ok(out.includes("3"));
});

test("runOAuthStart flow=import com --import-from-system usa auto-import", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ count: 1 }));
  }) as any;

  const out = await captureStdout(async () => {
    const { runOAuthStart } = await import("../../bin/cli/commands/oauth.mjs");
    await runOAuthStart({ provider: "zed", importFromSystem: true }, makeCmd() as any);
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/oauth/zed/auto-import"));
  assert.ok(out.includes("1"));
});

test("runOAuthStart rejects retired Windsurf instead of starting a public OAuth flow", async () => {
  const origFetch = globalThis.fetch;
  const origExit = process.exit;
  let fetchCalled = false;
  let exitCode: number | undefined;
  globalThis.fetch = (() => {
    fetchCalled = true;
    return Promise.reject(new Error("Windsurf must not start a public OAuth request"));
  }) as typeof fetch;
  process.exit = ((code?: number | string | null): never => {
    exitCode = typeof code === "number" ? code : undefined;
    throw new Error(`exit ${code}`);
  }) as typeof process.exit;

  try {
    const { runOAuthStart } = await import("../../bin/cli/commands/oauth.mjs");
    await assert.rejects(runOAuthStart({ provider: "windsurf" }, makeCmd()), /exit 2/);
  } finally {
    globalThis.fetch = origFetch;
    process.exit = origExit;
  }

  assert.equal(exitCode, 2);
  assert.equal(fetchCalled, false);
});

test("providers lista provedores OAuth conhecidos", async () => {
  const { PROVIDERS_WITH_OAUTH_TEST } = await import("../../bin/cli/commands/oauth.mjs").catch(
    () => ({ PROVIDERS_WITH_OAUTH_TEST: null })
  );
  // validate via runOAuthStart unknown provider exits
  const origExit = process.exit;
  let exitCode: number | undefined;
  process.exit = ((code: number) => {
    exitCode = code;
    throw new Error("exit");
  }) as any;

  try {
    const { runOAuthStart } = await import("../../bin/cli/commands/oauth.mjs");
    await runOAuthStart({ provider: "unknown_provider_xyz" }, makeCmd() as any).catch(() => {});
  } catch {
    // expected
  }

  process.exit = origExit;
  assert.equal(exitCode, 2);
});
