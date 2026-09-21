import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-pindns-13883-"));

// #13883 — security: pinDns off at the three new public-only image fetch sites let a
// DNS-rebinding hostname (public at validation time, private at real connect time) bypass
// the `guard: "public-only"` check, since an un-pinned fetch performs its own, independent
// DNS resolution. `resolveImageSource` / `normalizeNanoBananaTaskResult` (imageGeneration.ts)
// and `resolveUpscaleImageSource` (imageUpscale/shared.ts) now all set `pinDns: true`, which
// closes the gap by binding the connection to the single validated DNS answer instead of
// letting the transport re-resolve it — see `src/shared/network/dnsPinnedFetch.ts`.
//
// None of these three call sites expose a `lookup` injection point (they always use the
// real resolver), so this regression guard resolves a fake hostname to a public-looking,
// deliberately unreachable TEST-NET-3 address (RFC 5737 — never routed on the public
// internet) and asserts each site's request goes out through the real pinned undici socket
// (and therefore fails closed against that unreachable address) rather than through a
// mocked `globalThis.fetch`. If a future change dropped `pinDns: true` at any of these
// sites, the un-pinned `fetch()` call would hit the mock below instead — turning this red.

function withPublicDns<T>(run: () => Promise<T>): Promise<T> {
  const original = dns.promises.lookup;
  (dns.promises as { lookup: unknown }).lookup = (async (
    _hostname: string,
    options?: { all?: boolean }
  ) => {
    const record = { address: "203.0.113.7", family: 4 }; // RFC 5737 TEST-NET-3: unreachable
    return options && options.all ? [record] : record;
  }) as typeof dns.promises.lookup;
  return run().finally(() => {
    (dns.promises as { lookup: unknown }).lookup = original;
  });
}

const { resolveImageSource, normalizeNanoBananaTaskResult } =
  await import("../../open-sse/handlers/imageGeneration.ts");
const { resolveUpscaleImageSource } =
  await import("../../open-sse/handlers/imageUpscale/shared.ts");

/** Runs `attempt` with a mocked `globalThis.fetch` that must never be reached when
 * `pinDns: true` is wired correctly, and confirms the call still fails closed (the pinned
 * connection targets an unreachable address instead of falling back to the mock). */
async function assertPinnedNotMocked(attempt: () => Promise<unknown>): Promise<void> {
  let mockCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    mockCalled = true;
    throw new Error("globalThis.fetch must not be reached when pinDns is active");
  }) as typeof fetch;

  try {
    await assert.rejects(() => withPublicDns(attempt));
    assert.equal(mockCalled, false, "pinDns must bypass globalThis.fetch, not call it");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("resolveImageSource (imageGeneration.ts) fetches through the real pinned socket, not a mocked fetch (#13883)", async () => {
  await assertPinnedNotMocked(() => resolveImageSource("https://rebind-13883.example.com/x.png"));
});

test("normalizeNanoBananaTaskResult result-URL download fetches through the real pinned socket, not a mocked fetch (#13883)", async () => {
  const taskData = {
    response: { resultImageUrl: "https://rebind-13883.example.com/result.png" },
  };
  await assertPinnedNotMocked(() =>
    normalizeNanoBananaTaskResult(taskData, { response_format: "b64_json" }, null)
  );
});

test("resolveUpscaleImageSource (imageUpscale/shared.ts) fetches through the real pinned socket, not a mocked fetch (#13883)", async () => {
  await assertPinnedNotMocked(() =>
    resolveUpscaleImageSource("https://rebind-13883.example.com/source.png")
  );
});
