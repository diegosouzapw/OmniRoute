import { test } from "node:test";
import assert from "node:assert/strict";
import {
  computeRequestHash,
  deduplicate,
  clearInflight,
} from "../../../open-sse/services/requestDedup.ts";

// GHSA-6c7w-56xp-wpc6 follow-up. The dedup layer shares ONE upstream call — and
// therefore one response object — between every concurrent caller landing on the
// same hash. The hash canonicalized model + prompt + sampling params and nothing
// about WHO was asking, so two distinct OmniRoute API keys issuing the same
// request joined the same in-flight promise: the response was produced with the
// initiator's provider connection, under the initiator's per-key policy, and
// handed to a different authenticated principal.
//
// #10438 fixed the *prompt* half of this class (translated bodies hashing the
// prompt as `null`). This is the *identity* half.

const body = {
  messages: [{ role: "user", content: "Summarize the incident report." }],
  temperature: 0,
  model: "codex/gpt-5.6-terra",
  stream: false,
};

test("the same request from two different API keys does NOT share a dedup hash", () => {
  const hashKey1 = computeRequestHash(body, "apikey-1");
  const hashKey2 = computeRequestHash(body, "apikey-2");
  assert.notEqual(
    hashKey1,
    hashKey2,
    "an identical request from a different API key must not join the first key's in-flight call"
  );
});

test("the same request from the same API key still dedups", () => {
  assert.equal(computeRequestHash(body, "apikey-1"), computeRequestHash(body, "apikey-1"));
});

test("concurrent identical requests on two keys each get their own response", async () => {
  clearInflight();
  const hash1 = computeRequestHash(body, "apikey-1");
  const hash2 = computeRequestHash(body, "apikey-2");

  let released!: () => void;
  const gate = new Promise<void>((resolve) => {
    released = resolve;
  });

  const first = deduplicate(hash1, async () => {
    await gate;
    return "RESPONSE_FOR_KEY_1";
  });
  const second = deduplicate(hash2, async () => {
    await gate;
    return "RESPONSE_FOR_KEY_2";
  });
  released();

  const [a, b] = await Promise.all([first, second]);
  assert.equal(a.result, "RESPONSE_FOR_KEY_1");
  assert.equal(b.result, "RESPONSE_FOR_KEY_2");
  assert.equal(b.wasDeduplicated, false, "key 2 must not have joined key 1's in-flight call");
});

test("an unkeyed (anonymous) caller keeps the un-namespaced hash", () => {
  // Keyless local-first deployments have no tenant boundary to preserve, so the
  // behaviour there is unchanged — and must stay stable, or every such install
  // silently loses dedup.
  const anonymous = computeRequestHash(body);
  assert.equal(computeRequestHash(body, undefined), anonymous);
  assert.equal(computeRequestHash(body, null as unknown as undefined), anonymous);
  assert.notEqual(computeRequestHash(body, "apikey-1"), anonymous);
});

test("the tenant namespace cannot be forged by a colliding request body", () => {
  // The namespace is a plaintext prefix, so it must not be possible to move
  // between namespaces by crafting a body — the separator has to survive.
  const h1 = computeRequestHash(body, "a");
  const h2 = computeRequestHash(body, "a.b");
  assert.notEqual(h1, h2);
  assert.ok(h1.startsWith("a."), "namespace must prefix the digest");
});

test("chatCore passes the caller's API key id into the dedup hash", async () => {
  const { readFileSync } = await import("node:fs");
  const { fileURLToPath } = await import("node:url");
  const source = readFileSync(
    fileURLToPath(new URL("../../../open-sse/handlers/chatCore.ts", import.meta.url)),
    "utf8"
  );
  assert.ok(
    /computeRequestHash\(\s*dedupRequestBody\s*,\s*apiKeyInfo\?\.id/.test(source),
    "the dedup hash must be namespaced by the calling API key (GHSA-6c7w-56xp-wpc6)"
  );
});
