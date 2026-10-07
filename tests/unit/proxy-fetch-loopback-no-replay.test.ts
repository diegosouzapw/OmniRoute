/**
 * Regression guard: a loopback self-request must not inherit the outbound-egress
 * bound-and-replay policy.
 *
 * proxyFetch bounds response-start and then replays the request once on a fresh
 * no-keep-alive dispatcher. That exists for a dead keep-alive socket to a REMOTE
 * host (#10214). Against our own listener there is nothing to detect — the
 * replay only doubles how long a slow internal request (model sync,
 * auto-discovery) holds one of our OWN inbound slots (30s bound + 30s replay).
 * Under a stalled provider those self-requests piled up against the chat
 * admission limit and starved live traffic until Cloudflare cut the client at
 * its 120s proxy read timeout and returned HTTP 524.
 */
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";

import proxyFetch from "../../open-sse/utils/proxyFetch.ts";

async function withEnv(
  overrides: Record<string, string | undefined>,
  fn: () => Promise<void>
): Promise<void> {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(overrides)) {
    previous.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("a slow loopback target is neither cut short nor replayed", async () => {
  let requestCount = 0;
  const HEADER_DELAY_MS = 900;

  const server = http.createServer((_req, res) => {
    requestCount += 1;
    // Stall well past the response-start bound configured below.
    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
    }, HEADER_DELAY_MS);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const { port } = server.address() as AddressInfo;

  try {
    await withEnv({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "250" }, async () => {
      const response = await proxyFetch(`http://127.0.0.1:${port}/api/providers/abc/sync-models`);

      assert.equal(response.status, 200, "loopback request completes past the egress bound");
      await response.arrayBuffer();
      assert.equal(
        requestCount,
        1,
        "loopback must be sent exactly once — a replay doubles inbound slot occupancy"
      );
    });
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("a non-loopback target keeps the bounded response-start policy", async () => {
  // 127.0.0.0/8 is loopback; assert the bypass is not accidentally global by
  // confirming the helper's boundary through an ordinary private-LAN host that
  // must NOT be treated as loopback. Connecting is not required — an immediate
  // connection error still proves the loopback short-circuit was not taken.
  await withEnv({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "250" }, async () => {
    await assert.rejects(
      () => proxyFetch("http://192.0.2.1:9/never-routable"),
      "a non-loopback target still goes through the egress path"
    );
  });
});
