// GHSA-474q-g63r-w4rr: the Obsidian integration's baseUrl is operator-controlled and
// reached fetch() with no outbound guard, so a POST /api/settings/obsidian (or any
// later /api/obsidian/* call reusing the persisted URL) could aim the server at the
// cloud-metadata endpoint. The Local REST API legitimately lives on loopback / LAN /
// Tailscale (docs/frameworks/OBSIDIAN_CONTEXT.md), so the policy is the provider one
// (#5066): private hosts stay allowed, cloud-metadata / link-local is blocked
// unconditionally, redirects never followed.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-obsidian-ssrf-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { createObsidianClient } = await import("../../src/lib/obsidian/api.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function recordingFetch(calls: string[]) {
  return (async (input: string | URL | Request) => {
    calls.push(String(input instanceof Request ? input.url : input));
    return new Response(JSON.stringify({ authenticated: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
}

test("obsidianFetch never dials the cloud-metadata endpoint", async () => {
  const calls: string[] = [];
  globalThis.fetch = recordingFetch(calls);
  const client = createObsidianClient("tok", "http://169.254.169.254");
  await assert.rejects(
    () => client.checkStatus(),
    (err: unknown) => {
      assert.match(String((err as Error).message), /metadata|blocked/i);
      return true;
    }
  );
  assert.deepEqual(calls, [], "no network call may reach the metadata host");
});

test("obsidianFetch blocks IPv4-mapped and link-local spellings of the metadata host", async () => {
  for (const baseUrl of ["http://[::ffff:169.254.169.254]", "http://169.254.10.20:27123"]) {
    const calls: string[] = [];
    globalThis.fetch = recordingFetch(calls);
    const client = createObsidianClient("tok", baseUrl);
    await assert.rejects(() => client.checkStatus(), undefined, baseUrl);
    assert.deepEqual(calls, [], baseUrl);
  }
});

test("obsidianFetch still reaches the documented loopback / Tailscale bases", async () => {
  for (const baseUrl of ["http://127.0.0.1:27123", "http://100.64.0.1:27123"]) {
    const calls: string[] = [];
    globalThis.fetch = recordingFetch(calls);
    const client = createObsidianClient("tok", baseUrl);
    const status = (await client.checkStatus()) as { authenticated?: boolean };
    assert.equal(status.authenticated, true, baseUrl);
    assert.equal(calls.length, 1, baseUrl);
    assert.ok(calls[0].startsWith(baseUrl), calls[0]);
  }
});

test("obsidianFetch does not follow redirects off the configured base", async () => {
  const calls: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request) => {
    calls.push(String(input instanceof Request ? input.url : input));
    return new Response(null, {
      status: 302,
      headers: { location: "http://169.254.169.254/latest/meta-data/" },
    });
  }) as typeof fetch;
  const client = createObsidianClient("tok", "http://127.0.0.1:27123");
  await assert.rejects(() => client.checkStatus());
  // The module's own retry may re-dial the configured base; the Location target never.
  assert.ok(calls.length >= 1);
  for (const url of calls) assert.ok(url.startsWith("http://127.0.0.1:27123"), url);
});

test("POST /api/settings/obsidian rejects a metadata baseUrl before any fetch or persistence", async () => {
  const calls: string[] = [];
  globalThis.fetch = recordingFetch(calls);
  const { POST } = await import("../../src/app/api/settings/obsidian/route.ts");
  const { getObsidianBaseUrl } = await import("../../src/lib/db/obsidian.ts");
  const before = getObsidianBaseUrl();

  const request = await makeManagementSessionRequest("http://localhost/api/settings/obsidian", {
    method: "POST",
    body: { baseUrl: "http://169.254.169.254/latest", token: "ssrf-poc" },
  });
  const response = await POST(request as never);

  assert.equal(response.status, 400);
  const body = (await response.json()) as { error?: string };
  assert.match(String(body.error), /metadata|blocked/i);
  assert.ok(!String(body.error).includes("at /"), "no stack trace in the error body");
  assert.deepEqual(calls, []);
  assert.equal(getObsidianBaseUrl(), before, "a blocked baseUrl must not be persisted");
});
