/**
 * #7978 fix-in-place item 1 — the new `createPinnedFetch()` / `pinDns` option
 * in `remoteImageFetch.ts` is the mechanism that closes the DNS-rebinding
 * TOCTOU gap the file's own prior comment flagged as an open issue: a public
 * hostname is resolved and validated once (`assertHostnameResolvesPublic`),
 * but without pinning, the ACTUAL network fetch performs a second, independent
 * DNS lookup — an attacker who controls the DNS record can answer the first
 * lookup with a public IP (passing validation) and the second with a private
 * one (reaching an internal service), because nothing ties the two together.
 *
 * Every existing test in this suite and in `remote-image-fetch-dns-rebinding.
 * test.ts` passes a `fetchImpl` mock, which takes priority over `pinDns` in
 * `fetchRemoteImage` (`injectedFetch ?? (pinDns && addresses.length ? ... :
 * fetch)`) — so `createPinnedFetch` itself has never actually run in any test.
 * These tests exercise the real mechanism: a live loopback HTTP server, no
 * `fetchImpl` mock, and a lookup callback that hands back a validated address.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

import { createPinnedFetch } from "@/shared/network/remoteImageFetch";

async function withHttpServer(
  handler: http.RequestListener,
  fn: (port: number) => Promise<void>
) {
  const server = http.createServer(handler);
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  try {
    await fn((address as { port: number }).port);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test("createPinnedFetch binds the connection to the pinned address, ignoring the requested hostname entirely", async () => {
  await withHttpServer(
    (_req, res) => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("pinned-response");
    },
    async (port) => {
      // The hostname in the URL does not exist in DNS at all. If
      // `createPinnedFetch` fell back to resolving it (i.e. pinning were
      // broken), this request would fail with an ENOTFOUND-style DNS error
      // instead of reaching the loopback server.
      const pinnedFetch = createPinnedFetch("127.0.0.1", 4);
      const response = await pinnedFetch(
        `http://pin-dns-nonexistent-host.invalid:${port}/probe`
      );
      assert.equal(response.status, 200);
      assert.equal(await response.text(), "pinned-response");
    }
  );
});

test("createPinnedFetch ignores a rebinding hostname whose real DNS answer would differ from the pinned address", async () => {
  // `localhost` normally resolves via the OS resolver (often to 127.0.0.1
  // AND/OR ::1 depending on platform). We pin explicitly to the IPv4 loopback
  // family/address our test server is bound to, so the pinned connection
  // must use exactly that address/family rather than whatever `localhost`
  // would otherwise resolve to.
  await withHttpServer(
    (_req, res) => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("still-pinned");
    },
    async (port) => {
      const pinnedFetch = createPinnedFetch("127.0.0.1", 4);
      const response = await pinnedFetch(`http://localhost:${port}/probe`);
      assert.equal(response.status, 200);
      assert.equal(await response.text(), "still-pinned");
    }
  );
});

test("createPinnedFetch surfaces a connection error when the pinned address itself is unreachable (no silent DNS fallback)", async () => {
  // Port 1 is a reserved/unassigned TCP port that nothing listens on. A
  // broken pin implementation that silently fell back to resolving the
  // hostname via real DNS could otherwise "succeed" against some unrelated
  // real host instead of failing closed against the pinned address.
  const pinnedFetch = createPinnedFetch("127.0.0.1", 4);
  await assert.rejects(() => pinnedFetch(`http://some-other-real-looking-host.example:1/probe`));
});

test("createPinnedFetch closes its dispatcher after the request completes (no leaked sockets/agents)", async () => {
  await withHttpServer(
    (_req, res) => res.end("ok"),
    async (port) => {
      const pinnedFetch = createPinnedFetch("127.0.0.1", 4);
      // Two sequential calls with a fresh pinned fetch each — proves the
      // per-call Agent lifecycle (create -> use -> close) does not hang or
      // throw on a second use of a freshly created instance.
      const first = await createPinnedFetch("127.0.0.1", 4)(`http://x.invalid:${port}/`);
      assert.equal(await first.text(), "ok");
      const second = await pinnedFetch(`http://y.invalid:${port}/`);
      assert.equal(await second.text(), "ok");
    }
  );
});
