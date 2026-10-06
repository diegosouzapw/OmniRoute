import test from "node:test";
import assert from "node:assert/strict";

import { readFileSync } from "node:fs";
import { validateAiHordeProvider } from "../../src/lib/providers/validation/aihorde.ts";

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("empty Horde key is valid because the provider is optional", async () => {
  const result = await validateAiHordeProvider({
    apiKey: "   ",
    fetchImpl: async () => {
      throw new Error("find_user must not run when no key is pasted");
    },
  });
  assert.equal(result.valid, true);
  assert.equal(result.method, "aihorde_anonymous");
});

test("junk Horde key is rejected by find_user 404", async () => {
  const result = await validateAiHordeProvider({
    apiKey: "junk-key-not-real",
    fetchImpl: async () =>
      jsonResponse(404, {
        message: "User with api_key 'junk-key-not-real' not found.",
        rc: "UserNotFound",
      }),
  });
  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("missing Horde key header is rejected by find_user 401", async () => {
  const result = await validateAiHordeProvider({
    apiKey: "not-a-real-key",
    fetchImpl: async () =>
      jsonResponse(401, { message: "No user matching sent API Key.", rc: "InvalidAPIKey" }),
  });
  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("registered Horde key is accepted when find_user returns a username", async () => {
  let sentKey = "";
  let sentUrl = "";
  const result = await validateAiHordeProvider({
    apiKey: "horde-registered-key-123",
    fetchImpl: async (url, init) => {
      sentUrl = String(url);
      sentKey = new Headers(init?.headers).get("apikey") || "";
      return jsonResponse(200, { username: "tester#1234", kudos: 100 });
    },
  });
  assert.equal(result.valid, true);
  assert.equal(result.method, "aihorde_find_user");
  assert.equal(sentKey, "horde-registered-key-123");
  assert.match(sentUrl, /\/v2\/find_user$/);
});

test("validation.ts registers the Horde find_user specialty validator", () => {
  const src = readFileSync(
    new URL("../../src/lib/providers/validation.ts", import.meta.url),
    "utf8"
  );
  assert.match(src, /aihorde:\s*validateAiHordeProvider/);
});
