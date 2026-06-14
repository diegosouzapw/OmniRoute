/**
 * Front 1 (Codex multi-account cascade) — global refresh serialization.
 *
 * Providers under the same Auth0 client_id (OpenAI Codex + openai) get the WHOLE
 * refresh_token family revoked when two sibling accounts refresh concurrently
 * (openai/codex#9648). The per-connection mutex does NOT help here — the colliding
 * refreshes are on DIFFERENT connections. `serializeRefresh` forces concurrency=1
 * across every connection in a rotation group, so two siblings never hit Auth0's
 * /oauth/token at the same time. Non-rotating providers are left untouched.
 *
 * Evidence: VM 192.168.0.15 logs showed bursts of 5-6 Codex refreshes within
 * ~14s whenever a batch of accounts was added — exactly the cascade trigger.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  serializeRefresh,
  rotationGroupFor,
  wasRefreshTokenRotated,
  __resetRefreshSerializerForTest,
} from "../../open-sse/services/refreshSerializer.ts";

// These tests assert serialization ORDERING (concurrency=1 per group); the
// inter-refresh settle gap is covered by refresh-serializer-spacing.test.ts.
// Opt out of the gap here so the ordering checks stay fast and deterministic.
process.env.CODEX_REFRESH_SPACING_MS = "0";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

test("codex and openai share one group and never refresh concurrently", async () => {
  __resetRefreshSerializerForTest();
  let active = 0;
  let maxActive = 0;
  const order: string[] = [];

  const task = (label: string, provider: string, ms: number) =>
    serializeRefresh(provider, async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await delay(ms);
      order.push(label);
      active--;
      return label;
    });

  // codex + openai = same Auth0 client → must serialize together.
  await Promise.all([task("a", "codex", 30), task("b", "openai", 10), task("c", "codex", 10)]);

  assert.equal(maxActive, 1, "no two refreshes in the openai-auth0 group may overlap");
  assert.equal(order.length, 3);
});

test("different rotation groups run concurrently (not serialized against each other)", async () => {
  __resetRefreshSerializerForTest();
  let active = 0;
  let maxActive = 0;
  const run = (provider: string) =>
    serializeRefresh(provider, async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await delay(20);
      active--;
    });

  await Promise.all([run("codex"), run("claude"), run("kiro")]);
  assert.equal(maxActive, 3, "codex / claude / kiro are independent groups");
});

test("non-rotating providers are not serialized", async () => {
  __resetRefreshSerializerForTest();
  let active = 0;
  let maxActive = 0;
  const run = (provider: string) =>
    serializeRefresh(provider, async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await delay(20);
      active--;
    });

  await Promise.all([run("gemini-cli"), run("gemini-cli"), run("antigravity")]);
  assert.equal(maxActive, 3, "non-rotating providers must keep running in parallel");
});

test("an error in one refresh does not deadlock the group queue", async () => {
  __resetRefreshSerializerForTest();
  await assert.rejects(
    serializeRefresh("codex", async () => {
      throw new Error("boom");
    }),
    /boom/
  );
  const recovered = await serializeRefresh("codex", async () => "ok");
  assert.equal(recovered, "ok", "queue must keep flowing after a failed refresh");
});

test("rotationGroupFor maps the OpenAI Auth0 family together", () => {
  assert.equal(rotationGroupFor("codex"), rotationGroupFor("openai"));
  assert.notEqual(rotationGroupFor("codex"), rotationGroupFor("claude"));
  assert.equal(rotationGroupFor("gemini-cli"), null);
});

// Front 3 — reuse-race tolerance: only keep a connection active after an
// unrecoverable refresh failure when the DB token actually changed under us.
test("wasRefreshTokenRotated: true only when the DB token changed to a non-empty value", () => {
  assert.equal(wasRefreshTokenRotated("rt-old", "rt-new"), true, "a sibling rotated it");
  assert.equal(wasRefreshTokenRotated("rt-old", "rt-old"), false, "same token = genuinely dead");
  assert.equal(wasRefreshTokenRotated("rt-old", null), false, "no DB token = deactivate");
  assert.equal(wasRefreshTokenRotated("rt-old", ""), false, "empty DB token = deactivate");
  assert.equal(wasRefreshTokenRotated(null, "rt-new"), false, "unknown attempted = deactivate");
  assert.equal(wasRefreshTokenRotated(undefined, undefined), false);
});
