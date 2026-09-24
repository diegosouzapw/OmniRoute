import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  getCliproxyAccountHealth,
  sanitizeCliproxyAuthFiles,
} from "../../../src/lib/services/cliproxyAccountHealth.ts";

describe("CLIProxyAPI account health", () => {
  it("keeps only the documented health allowlist", () => {
    const accounts = sanitizeCliproxyAuthFiles({
      files: [
        {
          auth_index: "acct-1",
          provider: "codex",
          type: "codex",
          label: "Work",
          status: "active",
          disabled: false,
          unavailable: true,
          created_at: "2026-08-23T10:00:00Z",
          updated_at: "2026-08-23T11:00:00Z",
          success: 9,
          failed: 2,
          recent_requests: [
            { time: "2026-08-23T11:00:00Z", success: 3, failed: 1, token: "secret" },
          ],
          path: "/home/user/.cli-proxy-api/acct.json",
          access_token: "secret",
          metadata: { refresh_token: "secret" },
          email: "private@example.com",
        },
      ],
    });

    assert.deepEqual(accounts, [
      {
        authIndex: "acct-1",
        provider: "codex",
        type: "codex",
        label: "Work",
        status: "active",
        disabled: false,
        unavailable: true,
        createdAt: "2026-08-23T10:00:00Z",
        updatedAt: "2026-08-23T11:00:00Z",
        success: 9,
        failed: 2,
        recentRequests: [{ time: "2026-08-23T11:00:00Z", success: 3, failed: 1 }],
      },
    ]);
    const serialized = JSON.stringify(accounts);
    for (const secret of ["path", "access_token", "refresh_token", "private@example.com"]) {
      assert.equal(serialized.includes(secret), false);
    }
  });

  it("rejects malformed payloads", () => {
    assert.equal(sanitizeCliproxyAuthFiles({ files: "not-an-array" }), null);
    assert.equal(sanitizeCliproxyAuthFiles(null), null);
  });

  it("uses management auth and never forwards the key", async () => {
    let observed: { url: string; authorization: string | null } | undefined;
    const result = await getCliproxyAccountHealth({
      managementKey: "management-secret",
      host: "127.0.0.1",
      port: 8317,
      fetchImpl: async (input, init) => {
        const headers = new Headers(init?.headers);
        observed = { url: String(input), authorization: headers.get("authorization") };
        return Response.json(
          { files: [{ auth_index: "acct-1", status: "active" }] },
          { headers: { "x-cpa-version": "7.5.0" } }
        );
      },
    });

    assert.deepEqual(observed, {
      url: "http://127.0.0.1:8317/v0/management/auth-files",
      authorization: "Bearer management-secret",
    });
    assert.equal(result.state, "ready");
    assert.equal(result.version, "7.5.0");
    assert.equal(JSON.stringify(result).includes("management-secret"), false);
  });

  it("uses the loopback host for external management when no host is configured", async () => {
    const oldKey = process.env.CLIPROXYAPI_MANAGEMENT_KEY;
    const oldHost = process.env.CLIPROXYAPI_HOST;
    process.env.CLIPROXYAPI_MANAGEMENT_KEY = "external-secret";
    delete process.env.CLIPROXYAPI_HOST;
    try {
      const result = await getCliproxyAccountHealth({
        embedded: false,
        port: 8317,
        fetchImpl: async (input) => {
          assert.equal(String(input), "http://127.0.0.1:8317/v0/management/auth-files");
          return Response.json({ files: [] });
        },
      });
      assert.equal(result.state, "ready");
    } finally {
      if (oldKey === undefined) delete process.env.CLIPROXYAPI_MANAGEMENT_KEY;
      else process.env.CLIPROXYAPI_MANAGEMENT_KEY = oldKey;
      if (oldHost === undefined) delete process.env.CLIPROXYAPI_HOST;
      else process.env.CLIPROXYAPI_HOST = oldHost;
    }
  });

  it("distinguishes missing, unauthorized, unsupported, invalid, and unreachable states", async () => {
    assert.equal(
      (await getCliproxyAccountHealth({ managementKey: null, embedded: false })).state,
      "missing_key"
    );
    assert.equal(
      (
        await getCliproxyAccountHealth({
          managementKey: "key",
          fetchImpl: async () => new Response(null, { status: 401 }),
        })
      ).state,
      "unauthorized"
    );
    assert.equal(
      (
        await getCliproxyAccountHealth({
          managementKey: "key",
          fetchImpl: async () => new Response(null, { status: 404 }),
        })
      ).state,
      "unsupported"
    );
    assert.equal(
      (
        await getCliproxyAccountHealth({
          managementKey: "key",
          fetchImpl: async () => Response.json({ unexpected: true }),
        })
      ).state,
      "invalid_response"
    );
    assert.equal(
      (
        await getCliproxyAccountHealth({
          managementKey: "key",
          fetchImpl: async () => {
            throw new Error("connection refused");
          },
        })
      ).state,
      "unreachable"
    );
  });

  it("bounds a hanging request", async () => {
    const started = Date.now();
    const result = await getCliproxyAccountHealth({
      managementKey: "key",
      timeoutMs: 10,
      fetchImpl: (_input, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("aborted", "AbortError"))
          );
        }),
    });
    assert.equal(result.state, "unreachable");
    assert.ok(Date.now() - started < 1_000);
  });
});
