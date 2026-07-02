import assert from "node:assert/strict";
import test from "node:test";

import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";

// GHSA-cmhj-wh2f-9cgx — DNS-rebinding SSRF: a public hostname whose DNS
// resolves to a private/loopback IP would otherwise bypass the string-only
// `parseAndValidatePublicUrl` guard. The fix is to (a) resolve the host once
// up-front, (b) reject if any resolved record is private, and (c) pin the
// connection to that resolved IP so a second DNS resolution at fetch-time
// cannot rebind to a different (private) address.

test("fetchRemoteImage rejects when DNS resolves a public hostname to loopback (rebinding)", async () => {
  let fetchCalled = false;
  await assert.rejects(
    () =>
      fetchRemoteImage("https://attacker.example.com/image.png", {
        fetchImpl: async () => {
          fetchCalled = true;
          return new Response(new Uint8Array([1, 2, 3]), {
            status: 200,
            headers: { "content-type": "image/png" },
          });
        },
        guard: "public-only",
        // Inject a fake DNS resolver: attacker.example.com resolves to 127.0.0.1
        lookup: async () => [{ address: "127.0.0.1", family: 4 }],
      }),
    /blocked|private|rebind/i
  );
  assert.equal(fetchCalled, false, "fetch must not be called when DNS resolves to a private IP");
});

test("fetchRemoteImage rejects when DNS resolves to cloud-metadata IP (169.254.169.254)", async () => {
  let fetchCalled = false;
  await assert.rejects(
    () =>
      fetchRemoteImage("https://cdn.example.com/image.png", {
        fetchImpl: async () => {
          fetchCalled = true;
          return new Response("unexpected");
        },
        guard: "public-only",
        lookup: async () => [{ address: "169.254.169.254", family: 4 }],
      }),
    /blocked|private|rebind/i
  );
  assert.equal(fetchCalled, false);
});

test("fetchRemoteImage rejects when any of multiple resolved IPs is private (multi-A trick)", async () => {
  let fetchCalled = false;
  await assert.rejects(
    () =>
      fetchRemoteImage("https://multi.example.com/image.png", {
        fetchImpl: async () => {
          fetchCalled = true;
          return new Response("unexpected");
        },
        guard: "public-only",
        lookup: async () => [
          { address: "203.0.113.5", family: 4 },
          { address: "10.0.0.1", family: 4 },
        ],
      }),
    /blocked|private|rebind/i
  );
  assert.equal(fetchCalled, false);
});

test("fetchRemoteImage allows a public hostname that resolves to a public IP", async () => {
  const result = await fetchRemoteImage("https://cdn.example.com/image.png", {
    fetchImpl: async () =>
      new Response(new Uint8Array([1, 2, 3]), {
        status: 200,
        headers: { "content-type": "image/png" },
      }),
    guard: "public-only",
    lookup: async () => [{ address: "203.0.113.5", family: 4 }],
  });
  assert.equal(result.buffer.toString("base64"), "AQID");
});

test("fetchRemoteImage skips DNS resolution for IP-literal hosts (already string-validated)", async () => {
  // IP literals are validated by parseAndValidatePublicUrl directly; the
  // resolver injection should not be invoked.
  let lookupCalled = false;
  const result = await fetchRemoteImage("https://203.0.113.5/image.png", {
    fetchImpl: async () =>
      new Response(new Uint8Array([1]), {
        status: 200,
        headers: { "content-type": "image/png" },
      }),
    guard: "public-only",
    lookup: async () => {
      lookupCalled = true;
      return [{ address: "203.0.113.5", family: 4 }];
    },
  });
  assert.equal(result.buffer.toString("base64"), "AQ==");
  assert.equal(lookupCalled, false, "IP-literal hosts must not trigger DNS lookup");
});

test("fetchRemoteImage rejects when DNS resolution fails entirely", async () => {
  let fetchCalled = false;
  await assert.rejects(
    () =>
      fetchRemoteImage("https://nx.example.com/image.png", {
        fetchImpl: async () => {
          fetchCalled = true;
          return new Response("unexpected");
        },
        guard: "public-only",
        lookup: async () => {
          throw new Error("ENOTFOUND");
        },
      }),
    /resolve|dns|blocked/i
  );
  assert.equal(fetchCalled, false);
});
