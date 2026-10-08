import test from "node:test";
import assert from "node:assert/strict";

import {
  applyCodexClientIdentityHeaders,
  applyCodexClientMetadata,
  createCodexClientIdentity,
  hasCodexIdentityHeaders,
  resolveCodexFingerprintIdentity,
} from "../../open-sse/config/codexIdentity.ts";

const oauthCredentials = {
  accessToken: "oauth-token",
  connectionId: "connection-42",
  providerSpecificData: { workspaceId: "workspace-42", codexFingerprintMode: "session" },
};

function identityFor(clientHeaders: Record<string, string>) {
  const identity = resolveCodexFingerprintIdentity({
    credentials: oauthCredentials,
    clientHeaders,
    body: {},
  });
  assert.ok(identity);
  return identity;
}

test("hasCodexIdentityHeaders only matches a presented Codex client identity", () => {
  assert.equal(hasCodexIdentityHeaders(undefined), false);
  assert.equal(hasCodexIdentityHeaders({}), false);
  assert.equal(hasCodexIdentityHeaders({ "content-type": "application/json" }), false);
  assert.equal(hasCodexIdentityHeaders({ "session-id": "s" }), true);
  assert.equal(hasCodexIdentityHeaders({ session_id: "s" }), true);
  assert.equal(hasCodexIdentityHeaders({ "x-codex-turn-metadata": "{}" }), true);
  assert.equal(hasCodexIdentityHeaders({ "X-Codex-Window-Id": "t:0" }), true);
});

test("a client that presented no identity is never given a synthesized session envelope", () => {
  const identity = identityFor({ "content-type": "application/json" });
  assert.equal(identity.clientPresentedIdentity, false);

  const headers: Record<string, string> = {};
  applyCodexClientIdentityHeaders(headers, identity);

  // Device-level identity is still applied.
  assert.equal(headers["x-codex-installation-id"], identity.installationId);
  // No fabricated session-scoped carriers, and no fabricated turn metadata.
  assert.equal(headers["session-id"], undefined);
  assert.equal(headers["session_id"], undefined);
  assert.equal(headers["thread-id"], undefined);
  assert.equal(headers["x-client-request-id"], undefined);
  assert.equal(headers["x-codex-window-id"], undefined);
  assert.equal(headers["x-codex-turn-metadata"], undefined);
});

test("a client that presented no identity gets no synthesized client_metadata body fields", () => {
  const identity = identityFor({});
  const body: Record<string, unknown> = { model: "gpt-6.1-sol" };
  applyCodexClientMetadata(body, identity);

  const metadata = body.client_metadata as Record<string, unknown>;
  assert.ok(metadata);
  assert.equal(metadata["x-codex-installation-id"], identity.installationId);
  assert.equal(metadata.session_id, undefined);
  assert.equal(metadata.thread_id, undefined);
  assert.equal(metadata.turn_id, undefined);
  assert.equal(metadata["x-codex-window-id"], undefined);
  assert.equal(metadata["x-codex-turn-metadata"], undefined);
});

test("a presented Codex identity is still converged, without inventing sandbox fields", () => {
  const identity = identityFor({ "session-id": "client-session" });
  assert.equal(identity.clientPresentedIdentity, true);

  const headers: Record<string, string> = {};
  applyCodexClientIdentityHeaders(headers, identity);
  assert.equal(headers["session-id"], identity.sessionId);
  assert.equal(headers["thread-id"], identity.threadId);
  assert.equal(headers["x-client-request-id"], identity.threadId);
  assert.equal(headers["x-codex-window-id"], identity.windowId);

  const metadata = JSON.parse(headers["x-codex-turn-metadata"]) as Record<string, unknown>;
  assert.equal(metadata.installation_id, identity.installationId);
  assert.equal(metadata.session_id, identity.sessionId);
  assert.equal(metadata.thread_id, identity.threadId);
  assert.equal(metadata.turn_id, identity.turnId);
  assert.equal(metadata.window_id, identity.windowId);
  // Regression guard: the old code fabricated these when no client metadata existed.
  assert.equal(metadata.sandbox, undefined);
  assert.equal(metadata.thread_source, undefined);
});

test("client-supplied turn metadata fields survive convergence", () => {
  const identity = identityFor({
    "x-codex-turn-metadata": '{"sandbox":"seccomp","custom":"kept"}',
  });
  const headers: Record<string, string> = {
    "x-codex-turn-metadata": '{"sandbox":"seccomp","custom":"kept"}',
  };
  applyCodexClientIdentityHeaders(headers, identity);

  const metadata = JSON.parse(headers["x-codex-turn-metadata"]) as Record<string, unknown>;
  assert.equal(metadata.sandbox, "seccomp");
  assert.equal(metadata.custom, "kept");
  assert.equal(metadata.turn_id, identity.turnId);
});

test("a body-only session without identity headers still counts as presented", () => {
  const identity = resolveCodexFingerprintIdentity({
    credentials: oauthCredentials,
    clientHeaders: { "content-type": "application/json" },
    body: { session_id: "client-body-session" },
  });
  assert.ok(identity);
  assert.equal(identity.clientPresentedIdentity, true);

  const headers: Record<string, string> = {};
  applyCodexClientIdentityHeaders(headers, identity);
  assert.equal(headers["session-id"], identity.sessionId);
  assert.equal(headers["thread-id"], identity.threadId);
});

test("device mode stays installation-scoped regardless of presented identity", () => {
  const providerSpecificData = { workspaceId: "workspace-42", codexFingerprintMode: "device" };
  const identity = createCodexClientIdentity("client-session", providerSpecificData, {
    mode: "device",
    accountKey: "connection-42",
    clientPresentedIdentity: true,
  });
  assert.ok(identity);

  const headers: Record<string, string> = {};
  applyCodexClientIdentityHeaders(headers, identity);
  assert.equal(headers["x-codex-installation-id"], identity.installationId);
  assert.equal(headers["session-id"], undefined);
  assert.equal(headers["x-codex-turn-metadata"], undefined);
});
