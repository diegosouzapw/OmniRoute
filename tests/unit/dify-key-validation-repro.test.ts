import test from "node:test";
import assert from "node:assert/strict";
import { after, before } from "node:test";
import { createServer, type Server } from "node:http";

import { readFileSync } from "node:fs";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import {
  difyValidationResultFromStatus,
  resolveDifyChatMessagesUrl,
} from "../../src/lib/providers/validation/dify.ts";
import { difyProvider } from "../../open-sse/config/providers/registry/dify/index.ts";

// #11002 — the `dify` provider is registered with format:"openai", so the generic OpenAI-like
// validation probe hits GET /v1/models then POST /v1/chat/completions. Dify's native API serves
// neither — it only exposes POST /v1/chat-messages (401 {"code":"unauthorized"} for a bad key).
// Every real Dify app key therefore fails validation with the generic
// "Provider validation endpoint not supported" instead of a clean invalid/valid verdict.
//
// The fake upstream below is Dify-faithful: /v1/models and /v1/chat/completions 404, while
// /v1/chat-messages is the only route and answers 401 for a bad key.

let server: Server;
let baseUrl = "";

before(async () => {
  server = createServer((req, res) => {
    const path = (req.url || "").split("?")[0];
    if (path === "/v1/models") {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Not Found");
    } else if (path === "/v1/chat/completions") {
      res.writeHead(404, { "content-type": "text/html" });
      res.end("<html>404 Not Found</html>");
    } else if (path === "/v1/chat-messages") {
      res.writeHead(401, { "content-type": "application/json" });
      res.end(JSON.stringify({ code: "unauthorized", message: "Access token is invalid" }));
    } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Not Found");
    }
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

test("#11002 dify key validation probes /v1/chat-messages and rejects a bad key", async () => {
  const result = await validateProviderApiKey({
    provider: "dify",
    apiKey: "app-test-key",
    providerSpecificData: { baseUrl },
  });
  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("#11002 dify status→result maps bad keys and valid keys", () => {
  assert.deepEqual(difyValidationResultFromStatus(401), {
    valid: false,
    error: "Invalid API key",
  });
  assert.deepEqual(difyValidationResultFromStatus(403), {
    valid: false,
    error: "Invalid API key",
  });
  assert.deepEqual(difyValidationResultFromStatus(200), { valid: true, error: null });
  assert.deepEqual(difyValidationResultFromStatus(500), {
    valid: false,
    error: "Dify validation failed (500)",
  });
});

test("#11002 resolveDifyChatMessagesUrl always targets /v1/chat-messages", () => {
  assert.equal(resolveDifyChatMessagesUrl("https://api.dify.ai"), "https://api.dify.ai/v1/chat-messages");
  assert.equal(
    resolveDifyChatMessagesUrl("https://selfhosted.example.com/v1"),
    "https://selfhosted.example.com/v1/chat-messages"
  );
  assert.equal(
    resolveDifyChatMessagesUrl("https://selfhosted.example.com/v1/chat-messages"),
    "https://selfhosted.example.com/v1/chat-messages"
  );
});

test("#11002 dify registry baseUrl is the bare API root, not /chat/completions", () => {
  assert.equal(difyProvider.baseUrl, "https://api.dify.ai");
  const src = readFileSync(
    new URL("../../src/lib/providers/validation.ts", import.meta.url),
    "utf8"
  );
  assert.match(src, /dify:\s*validateDifyProvider/);
});