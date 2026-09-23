import assert from "node:assert/strict";
import { createServer, type IncomingMessage } from "node:http";
import test from "node:test";
import {
  MUSE_SUBSCRIPTION_RESPONSES_URL,
  MUSE_SUBSCRIPTION_BASE_URL,
  mintMuseSubscriptionKey,
  museSubscriptionHeaders,
  normalizeMuseResponsesRequest,
  pollMuseDeviceToken,
  requestMuseDeviceCode,
  type MuseFetch,
} from "../../../open-sse/services/museCodeSubscription.ts";

async function readBody(request: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

test("loopback HTTP contract: browser approval, mint, bearer request and Responses SSE", async () => {
  let polls = 0;
  const seen: string[] = [];
  const errors: unknown[] = [];
  const key = "test-loopback-key-never-valid";
  const server = createServer(async (request, response) => {
    try {
      const path = request.url || "";
      seen.push(path);
      assert.equal(request.method, "POST");
      const body = await readBody(request);
      response.setHeader("Content-Type", "application/json");
      if (path === "/oidc/device/authorization/") {
        assert.equal(new URLSearchParams(body).get("client_id"), "fixture-client");
        response.end(JSON.stringify({
          device_code: "loopback-device", user_code: "TEST-CODE",
          verification_uri: "https://auth.meta.com/oidc/device/", expires_in: 600,
        }));
      } else if (path === "/oidc/device/token/") {
        assert.equal(new URLSearchParams(body).get("device_code"), "loopback-device");
        polls += 1;
        response.statusCode = polls === 1 ? 400 : 200;
        response.end(JSON.stringify(polls === 1
          ? { error: "authorization_pending" }
          : { access_token: "dca:loopback-session", expires_in: 60 }));
      } else if (path === "/muse-code/key") {
        assert.equal(request.headers.authorization, "Bearer dca:loopback-session");
        assert.equal(JSON.parse(body).dca_token, "dca:loopback-session");
        response.end(JSON.stringify({
          api_key: key, is_subs_active: true, base_url: MUSE_SUBSCRIPTION_BASE_URL,
        }));
      } else if (path === "/v1/responses") {
        assert.equal(request.headers.authorization, `Bearer ${key}`);
        assert.equal(request.headers.accept, "text/event-stream");
        const input = JSON.parse(body);
        assert.equal(input.stream, true);
        assert.equal(input.tools[0].name, "read_file");
        response.setHeader("Content-Type", "text/event-stream");
        const events = [
          { type: "response.created", response: { id: "resp_test", status: "in_progress" } },
          { type: "response.output_text.delta", delta: "Hello" },
          { type: "response.completed", response: {
            id: "resp_test", status: "completed", output: [],
            usage: { input_tokens: 12, output_tokens: 2, total_tokens: 14 },
          } },
        ];
        for (const event of events) response.write(`data: ${JSON.stringify(event)}\n\n`);
        response.end();
      } else {
        throw new Error("Unexpected mock endpoint");
      }
    } catch (error) {
      errors.push(error);
      response.statusCode = 500;
      response.end("mock assertion failed");
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  // Remapping exists only in this test. Production destinations stay fixed.
  const fetcher: MuseFetch = (input, init) => {
    const url = new URL(input);
    assert.ok(url.origin === "https://auth.meta.com" || url.origin === "https://api.meta.ai");
    return fetch(`http://127.0.0.1:${address.port}${url.pathname}`, init);
  };
  try {
    const device = await requestMuseDeviceCode("fixture-client", fetcher);
    const pending = await pollMuseDeviceToken("fixture-client", device.device_code, fetcher);
    assert.equal(pending.data.error, "authorization_pending");
    const approved = await pollMuseDeviceToken("fixture-client", device.device_code, fetcher);
    assert.ok(approved.data.access_token);
    const grant = await mintMuseSubscriptionKey(approved.data.access_token, fetcher);
    const response = await fetcher(MUSE_SUBSCRIPTION_RESPONSES_URL, {
      method: "POST", headers: museSubscriptionHeaders(grant),
      body: JSON.stringify(normalizeMuseResponsesRequest("muse-spark-1.3", {
        input: "hello", tools: [{ type: "function", name: "read_file", parameters: {} }],
      })),
      signal: AbortSignal.timeout(5000), redirect: "error",
    });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") || "", /text\/event-stream/);
    const sse = await response.text();
    assert.match(sse, /response\.output_text\.delta/);
    assert.match(sse, /response\.completed/);
    assert.match(sse, /"total_tokens":14/);
    assert.deepEqual(errors, []);
    assert.deepEqual(seen, [
      "/oidc/device/authorization/", "/oidc/device/token/", "/oidc/device/token/",
      "/muse-code/key", "/v1/responses",
    ]);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
