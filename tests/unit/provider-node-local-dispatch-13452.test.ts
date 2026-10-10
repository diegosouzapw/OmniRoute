import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "node-dispatch-13452-"));
process.env.DATA_DIR = dataDir;
const { createProviderConnection, createProviderNode } =
  await import("../../src/lib/db/providers.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("#13452 legacy credentials rejoin their node and dispatch only to its local upstream", async () => {
  let receivedPath = "";
  let receivedAuth: string | undefined;
  const server = http.createServer((request, response) => {
    receivedPath = request.url || "";
    receivedAuth = request.headers.authorization;
    request.resume();
    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify({ choices: [{ message: { content: "local completion" } }] }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  const provider = "openai-compatible-chat-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const originalFetch = globalThis.fetch;
  try {
    await createProviderNode({
      id: provider,
      type: "openai-compatible",
      apiType: "chat",
      prefix: "local-repro",
      name: "Local fixture",
      baseUrl: `${origin}/v1`,
    });
    await createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: "fixture-local-key",
      isActive: true,
      providerSpecificData: null,
    });
    const credentials = await getProviderCredentials(provider);
    assert.ok(credentials && !credentials.allRateLimited);
    assert.equal(credentials.providerSpecificData?.baseUrl, `${origin}/v1`);
    globalThis.fetch = async (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      assert.equal(new URL(url).origin, origin, "never transmit the fixture key to a public API");
      return originalFetch(input, init);
    };
    const result = await new DefaultExecutor(provider).execute({
      model: "qwen3.6:35b-a3b",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials,
    });
    assert.equal(result.response.status, 200);
    assert.equal(receivedPath, "/v1/chat/completions");
    assert.equal(receivedAuth, "Bearer fixture-local-key");
    assert.equal((await result.response.json()).choices[0].message.content, "local completion");
  } finally {
    globalThis.fetch = originalFetch;
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});
