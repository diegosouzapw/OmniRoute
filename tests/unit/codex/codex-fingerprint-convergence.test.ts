import test from "node:test";
import assert from "node:assert/strict";

import {
  applyCodexClientIdentityHeaders,
  applyCodexClientMetadata,
  applyCodexOriginalIdentityHeaders,
  createCodexClientIdentity,
  ensureCodexFingerprintSeed,
  getCodexClientSessionId,
  getCodexConvergedSessionId,
  getCodexConvergedThreadId,
  getCodexFingerprintMode,
  getCodexInstallationId,
  resolveCodexFingerprintIdentity,
  resolveCodexOriginalIdentityHeaders,
  withCodexFingerprintCredentials,
} from "../../../open-sse/config/codexIdentity.ts";

const oauthCredentials = {
  accessToken: "oauth-token",
  connectionId: "connection-42",
  providerSpecificData: { workspaceId: "workspace-42" },
};

test("Codex fingerprint mode defaults to session and only explicit off disables it", () => {
  assert.equal(getCodexFingerprintMode(undefined), "session");
  assert.equal(getCodexFingerprintMode({ codexFingerprintMode: "invalid" }), "session");
  assert.equal(getCodexFingerprintMode({ codexFingerprintMode: "off" }), "off");
  assert.equal(
    resolveCodexFingerprintIdentity({
      credentials: { ...oauthCredentials, providerSpecificData: { codexFingerprintMode: "off" } },
      clientHeaders: { "session-id": "client-session" },
      body: {},
    }),
    null
  );
});

test("Codex off mode preserves original OAuth identity headers", () => {
  const clientHeaders = {
    "session-id": "client-session",
    "thread-id": "client-thread",
    "x-client-request-id": "client-request",
    "x-codex-window-id": "client-thread:0",
    "x-codex-turn-metadata": '{"turn_id":"client-turn"}',
  };
  const credentials = {
    ...oauthCredentials,
    providerSpecificData: { codexFingerprintMode: "off" },
  };
  const original = resolveCodexOriginalIdentityHeaders({
    credentials,
    clientHeaders,
  });
  const wrapped = withCodexFingerprintCredentials(credentials, clientHeaders, {});
  assert.deepEqual(wrapped.providerSpecificData.codexOriginalIdentityHeaders, original);
  assert.equal(wrapped.providerSpecificData.codexClientIdentity, undefined);

  const resolvedAgain = resolveCodexOriginalIdentityHeaders({
    credentials,
    clientHeaders,
  });
  assert.ok(resolvedAgain);

  const headers: Record<string, string> = { session_id: "generated-session" };
  applyCodexOriginalIdentityHeaders(headers, resolvedAgain);
  assert.equal(headers["session-id"], "client-session");
  assert.equal(headers["thread-id"], "client-thread");
  assert.equal(headers["x-client-request-id"], "client-request");
  assert.equal(headers["x-codex-window-id"], "client-thread:0");
  assert.equal(headers["x-codex-turn-metadata"], '{"turn_id":"client-turn"}');
  assert.equal(
    resolveCodexOriginalIdentityHeaders({
      credentials: {
        ...oauthCredentials,
        requestEndpointPath: "/responses/compact",
        providerSpecificData: { codexFingerprintMode: "off" },
      },
      clientHeaders: { "session-id": "compact-session" },
    }),
    null
  );
});

test("Codex device/session/full modes preserve their Sub2API convergence boundaries", () => {
  const providerSpecificData = { workspaceId: "workspace-42" };
  const device = createCodexClientIdentity("client-session-a", providerSpecificData, {
    mode: "device",
  });
  const sessionA = createCodexClientIdentity("client-session-a", providerSpecificData, {
    mode: "session",
    accountKey: "connection-42",
  });
  const sessionB = createCodexClientIdentity("client-session-b", providerSpecificData, {
    mode: "session",
    accountKey: "connection-42",
  });
  const fullA = createCodexClientIdentity("client-session-a", providerSpecificData, {
    mode: "full",
    accountKey: "connection-42",
  });
  const fullB = createCodexClientIdentity("client-session-b", providerSpecificData, {
    mode: "full",
    accountKey: "connection-42",
  });

  assert.ok(device && sessionA && sessionB && fullA && fullB);
  assert.equal(device.installationId, getCodexInstallationId(providerSpecificData, undefined));
  assert.notEqual(
    getCodexInstallationId({}, "connection-a"),
    getCodexInstallationId({}, "connection-b")
  );
  assert.equal(device.sessionId, "");
  assert.equal(sessionA.sessionId, sessionB.sessionId);
  assert.notEqual(sessionA.threadId, sessionB.threadId);
  assert.equal(sessionA.windowId, `${sessionA.threadId}:0`);
  assert.equal(fullA.sessionId, fullB.sessionId);
  assert.equal(fullA.threadId, fullA.sessionId);
  assert.equal(fullA.threadId, fullB.threadId);
  assert.notEqual(sessionA.turnId, sessionB.turnId);
  assert.equal(
    getCodexConvergedSessionId(providerSpecificData, "connection-42"),
    sessionA.sessionId
  );
  assert.equal(
    getCodexConvergedThreadId("client-session-a", providerSpecificData, "connection-42"),
    sessionA.threadId
  );
});

test("Codex client session extraction prefers hyphenated session-id and rejects unsafe values", () => {
  assert.equal(
    getCodexClientSessionId({ "session-id": "hyphen", session_id: "underscore" }),
    "hyphen"
  );
  assert.equal(getCodexClientSessionId({ session_id: "underscore" }), "underscore");
  assert.equal(getCodexClientSessionId({ "session-id": "bad\\r\\nheader" }), null);
});

test("One Codex identity is shared by headers, body metadata, and nested turn metadata", () => {
  const identity = resolveCodexFingerprintIdentity({
    credentials: oauthCredentials,
    clientHeaders: { "session-id": "client-session" },
    body: {},
  });
  assert.ok(identity);

  const headers: Record<string, string> = {};
  applyCodexClientIdentityHeaders(headers, identity);
  const body: Record<string, unknown> = {
    client_metadata: { "x-codex-turn-metadata": '{"sandbox":"none"}' },
  };
  applyCodexClientMetadata(body, identity);

  const headerMetadata = JSON.parse(headers["x-codex-turn-metadata"]);
  const clientMetadata = body.client_metadata as Record<string, unknown>;
  const bodyMetadata = JSON.parse(clientMetadata["x-codex-turn-metadata"] as string);

  assert.equal(headers["session-id"], clientMetadata.session_id);
  assert.equal(headers["thread-id"], clientMetadata.thread_id);
  assert.equal(headers["x-codex-window-id"], clientMetadata["x-codex-window-id"]);
  assert.equal(identity.installationId, headers["x-codex-installation-id"]);
  assert.equal(identity.turnId, clientMetadata.turn_id);
  assert.equal(identity.turnId, headerMetadata.turn_id);
  assert.equal(identity.turnId, bodyMetadata.turn_id);
  assert.equal(bodyMetadata.sandbox, "none");
});

test("Codex compact requests do not resolve a fingerprint identity", () => {
  assert.equal(
    resolveCodexFingerprintIdentity({
      credentials: {
        ...oauthCredentials,
        requestEndpointPath: "/responses/compact",
      },
      clientHeaders: { "session-id": "client-session" },
      body: {},
    }),
    null
  );
});

test("Codex HTTP off mode preserves original identity headers and body metadata", async () => {
  const { CodexExecutor } = await import("../../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  let upstreamHeaders = new Headers();
  let upstreamBody: Record<string, unknown> = {};
  globalThis.fetch = async (_url, init) => {
    upstreamHeaders = new Headers(init?.headers);
    upstreamBody = JSON.parse(String(init?.body || "{}"));
    return new Response(JSON.stringify({ id: "resp-off", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-5.5",
      body: {
        model: "gpt-5.5",
        input: [{ role: "user", content: "hello" }],
        client_metadata: {
          session_id: "client-session",
          thread_id: "client-thread",
          turn_id: "client-turn",
          "x-codex-window-id": "client-thread:0",
          "x-codex-turn-metadata": '{"turn_id":"client-turn"}',
        },
        _nativeCodexPassthrough: true,
      },
      stream: true,
      clientHeaders: {
        "session-id": "client-session",
        "thread-id": "client-thread",
        "x-client-request-id": "client-request",
        "x-codex-window-id": "client-thread:0",
        "x-codex-turn-metadata": '{"turn_id":"client-turn"}',
      },
      credentials: {
        accessToken: "codex-token",
        connectionId: "conn-http-off",
        providerSpecificData: { workspaceId: "http-off", codexFingerprintMode: "off" },
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  const metadata = upstreamBody.client_metadata as Record<string, unknown>;
  assert.equal(upstreamHeaders.get("session-id"), "client-session");
  assert.equal(upstreamHeaders.get("thread-id"), "client-thread");
  assert.equal(upstreamHeaders.get("x-client-request-id"), "client-request");
  assert.equal(upstreamHeaders.get("x-codex-window-id"), "client-thread:0");
  assert.equal(upstreamHeaders.get("x-codex-turn-metadata"), '{"turn_id":"client-turn"}');
  assert.equal(metadata.session_id, "client-session");
  assert.equal(metadata.thread_id, "client-thread");
  assert.equal(metadata.turn_id, "client-turn");
  assert.equal(metadata["x-codex-window-id"], "client-thread:0");
  assert.equal(metadata["x-codex-turn-metadata"], '{"turn_id":"client-turn"}');
});

test("Codex websocket off mode preserves original identity headers and body metadata", async () => {
  const { CodexExecutor, __setCodexWebSocketTransportForTesting } =
    await import("../../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();
  let sent: string | null = null;
  let wsHeaders: Record<string, string> = {};
  __setCodexWebSocketTransportForTesting(async (_url, opts) => {
    wsHeaders = (opts?.headers as Record<string, string>) || {};
    return {
      send(data: string) {
        sent = data;
        queueMicrotask(() => {
          this.onmessage?.({
            data: JSON.stringify({
              type: "response.completed",
              response: { status: "completed" },
            }),
          });
        });
      },
      close() {},
      onmessage: null,
      onerror: null,
      onclose: null,
    };
  });

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: {
        model: "gpt-5.5",
        input: [{ role: "user", content: "hello" }],
        client_metadata: {
          session_id: "client-session",
          thread_id: "client-thread",
          turn_id: "client-turn",
        },
      },
      stream: true,
      clientHeaders: {
        "session-id": "client-session",
        "thread-id": "client-thread",
        "x-client-request-id": "client-request",
        "x-codex-window-id": "client-thread:0",
        "x-codex-turn-metadata": '{"turn_id":"client-turn"}',
      },
      credentials: {
        accessToken: "codex-token",
        connectionId: "conn-ws-off",
        providerSpecificData: {
          workspaceId: "ws-off",
          codexTransport: "websocket",
          codexFingerprintMode: "off",
        },
      },
    });
    await result.response.text();
  } finally {
    __setCodexWebSocketTransportForTesting(undefined);
  }

  assert.ok(sent);
  const payload = JSON.parse(sent as string) as Record<string, unknown>;
  const metadata = payload.client_metadata as Record<string, unknown>;
  assert.equal(wsHeaders["session-id"], "client-session");
  assert.equal(wsHeaders["thread-id"], "client-thread");
  assert.equal(wsHeaders["x-client-request-id"], "client-request");
  assert.equal(wsHeaders["x-codex-window-id"], "client-thread:0");
  assert.equal(wsHeaders["x-codex-turn-metadata"], '{"turn_id":"client-turn"}');
  assert.equal(metadata.session_id, "client-session");
  assert.equal(metadata.thread_id, "client-thread");
  assert.equal(metadata.turn_id, "client-turn");
});

test("Codex websocket headers and payload share one fingerprint identity", async () => {
  const { CodexExecutor, __setCodexWebSocketTransportForTesting } =
    await import("../../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();
  let sent: string | null = null;
  let wsHeaders: Record<string, string> = {};
  __setCodexWebSocketTransportForTesting(async (_url, opts) => {
    wsHeaders = (opts?.headers as Record<string, string>) || {};
    return {
      send(data: string) {
        sent = data;
        queueMicrotask(() => {
          this.onmessage?.({
            data: JSON.stringify({
              type: "response.completed",
              response: { status: "completed" },
            }),
          });
        });
      },
      close() {},
      onmessage: null,
      onerror: null,
      onclose: null,
    };
  });

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: {
        model: "gpt-5.5",
        session_id: "client-ws",
        input: [{ role: "user", content: "hello" }],
      },
      stream: true,
      credentials: {
        accessToken: "codex-token",
        connectionId: "conn-ws",
        providerSpecificData: { workspaceId: "ws-ws", codexTransport: "websocket" },
      },
    });
    await result.response.text();
  } finally {
    __setCodexWebSocketTransportForTesting(undefined);
  }

  assert.ok(sent);
  const payload = JSON.parse(sent as string) as Record<string, unknown>;
  const metadata = (payload.client_metadata as Record<string, unknown>) || {};
  assert.equal(wsHeaders.session_id, metadata.session_id);
  assert.equal(wsHeaders["x-client-request-id"], metadata.thread_id);
  assert.equal(wsHeaders["x-codex-window-id"], metadata["x-codex-window-id"]);
  assert.equal(payload.type, "response.create");
});

test("Codex fingerprint seed: persisted seed drives v2 derivation deterministically", () => {
  const seed = "11111111-2222-4233-8444-555555555555";
  const seeded = { workspaceId: "workspace-42", codexFingerprintSeed: seed };

  const installationId = getCodexInstallationId(seeded, "connection-42");
  const sessionId = getCodexConvergedSessionId(seeded, "connection-42");
  const threadId = getCodexConvergedThreadId("client-session", seeded, "connection-42");

  // Deterministic: same seed → same ids, regardless of the connection key.
  assert.equal(getCodexInstallationId(seeded, "another-connection"), installationId);
  assert.equal(getCodexConvergedSessionId(seeded, "another-connection"), sessionId);
  assert.equal(getCodexConvergedThreadId("client-session", seeded, null), threadId);

  // v2 derivation deliberately rotates away from the legacy workspace-derived ids.
  const legacy = { workspaceId: "workspace-42" };
  assert.notEqual(installationId, getCodexInstallationId(legacy, "connection-42"));
  assert.notEqual(sessionId, getCodexConvergedSessionId(legacy, "connection-42"));

  // Two connections never share an identity once seeded (sub2api #5696).
  const otherSeed = { codexFingerprintSeed: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee" };
  assert.notEqual(getCodexInstallationId(otherSeed, "connection-42"), installationId);
  assert.notEqual(getCodexConvergedSessionId(otherSeed, "connection-42"), sessionId);

  // Admin-configured explicit installation id still wins over the seed.
  assert.equal(
    getCodexInstallationId(
      { ...seeded, codexInstallationId: "99999999-8888-4777-8666-555555555555" },
      "connection-42"
    ),
    "99999999-8888-4777-8666-555555555555"
  );
});

test("ensureCodexFingerprintSeed creates once, preserves, and skips non-converged", () => {
  const oauth = { accessToken: "oauth-token" };

  // Default mode (session) on OAuth → seed created.
  const created = ensureCodexFingerprintSeed(undefined, oauth);
  assert.match(created?.codexFingerprintSeed as string, /^[0-9a-f-]{36}$/);

  // The stored seed ALWAYS wins over an incoming payload that omits it
  // (partial update) or carries a client-forged one (system-managed key).
  const stored = { codexFingerprintSeed: "11111111-2222-4233-8444-555555555555" };
  assert.deepEqual(ensureCodexFingerprintSeed(undefined, oauth, stored), stored);
  assert.deepEqual(
    ensureCodexFingerprintSeed(
      { codexFingerprintSeed: "99999999-8888-4777-8666-555555555555" },
      oauth,
      stored
    ),
    stored
  );
  // The stored seed stays dormant when the mode is switched off.
  assert.deepEqual(ensureCodexFingerprintSeed({ codexFingerprintMode: "off" }, oauth, stored), {
    codexFingerprintMode: "off",
    codexFingerprintSeed: "11111111-2222-4233-8444-555555555555",
  });

  // Explicit off without a stored seed stays seedless; a client-supplied seed
  // on create is stripped and replaced by a system-generated one.
  assert.deepEqual(ensureCodexFingerprintSeed({ codexFingerprintMode: "off" }, oauth), {
    codexFingerprintMode: "off",
  });
  const forgedOnCreate = ensureCodexFingerprintSeed(
    { codexFingerprintSeed: "99999999-8888-4777-8666-555555555555" },
    oauth
  );
  assert.match(forgedOnCreate?.codexFingerprintSeed as string, /^[0-9a-f-]{36}$/);
  assert.notEqual(forgedOnCreate?.codexFingerprintSeed, "99999999-8888-4777-8666-555555555555");

  // Non-OAuth (API key) connections are never seeded.
  assert.equal(ensureCodexFingerprintSeed(undefined, { apiKey: "sk-x" }), undefined);
  assert.equal(ensureCodexFingerprintSeed(undefined, undefined), undefined);

  // device/full modes require the seed as well.
  for (const mode of ["device", "full"]) {
    const result = ensureCodexFingerprintSeed({ codexFingerprintMode: mode }, oauth);
    assert.match(result?.codexFingerprintSeed as string, /^[0-9a-f-]{36}$/);
  }
});
