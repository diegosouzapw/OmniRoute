import test from "node:test";
import assert from "node:assert/strict";
import { after, before } from "node:test";
import { createServer, type Server } from "node:http";

import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";

// #13828 — `zylo-api` is registered with format:"openai", so the generic OpenAI-like probe
// validates a key by calling GET /v1/models and returning `{valid:true}` on the first 2xx.
// Zylo serves that route WITHOUT authentication: it answers 200 with no Authorization header
// and 200 for a bogus key. The account-setup dialog therefore greens any string, and the first
// request that Zylo actually authenticates is the user's own model test, which comes back
// `401 {"error":"Key not found: zk-…"}` — the reporter's screenshot.
//
// The fake upstream below is Zylo-faithful: /v1/models is open, /v1/chat/completions is the
// only authenticated route.

let server: Server;
let baseUrl = "";
let modelsRequests = 0;
let chatRequests = 0;
let lastChatAuthorization: string | null = null;

const VALID_KEY = "zk-valid-test-key";

before(async () => {
  server = createServer((req, res) => {
    const path = (req.url || "").split("?")[0];
    const auth = req.headers["authorization"];

    if (path === "/v1/models") {
      // Open catalog: no Authorization required, any key accepted.
      modelsRequests += 1;
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ text: ["gpt-oss"], image: [], submodels: [] }));
      return;
    }

    if (path === "/v1/chat/completions") {
      chatRequests += 1;
      lastChatAuthorization = typeof auth === "string" ? auth : null;
      if (auth !== `Bearer ${VALID_KEY}`) {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Key not found: zk-i…" }));
        return;
      }
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] }));
      return;
    }

    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not Found");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no assigned port");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve()))
  );
});

test("#13828 zylo key validation rejects a bad key instead of trusting the open catalog", async () => {
  chatRequests = 0;
  modelsRequests = 0;
  const result = await validateProviderApiKey({
    provider: "zylo-api",
    apiKey: "zk-invalid-test-key",
    providerSpecificData: { baseUrl },
  });

  assert.equal(
    modelsRequests,
    0,
    "the open catalog must not be consulted — a 200 from it is what greened bad keys"
  );

  assert.equal(
    result.valid,
    false,
    "a key Zylo rejects on the chat route must not validate just because /v1/models is open"
  );
  assert.ok(chatRequests > 0, "validation must probe the authenticated chat route");
  assert.equal(lastChatAuthorization, "Bearer zk-invalid-test-key");
});

test("#13828 zylo key validation still accepts a key the chat route authenticates", async () => {
  const result = await validateProviderApiKey({
    provider: "zylo-api",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl },
  });

  assert.equal(result.valid, true, `expected a valid verdict, got ${JSON.stringify(result)}`);
});

test("#13828 the `zylo` alias validates through the same authenticated probe", async () => {
  const result = await validateProviderApiKey({
    provider: "zylo",
    apiKey: "zk-invalid-test-key",
    providerSpecificData: { baseUrl },
  });

  assert.equal(result.valid, false, "the alias must not fall back to the open-catalog probe");
});
