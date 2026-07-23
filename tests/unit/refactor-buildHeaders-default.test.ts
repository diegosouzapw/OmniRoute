import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("DefaultExecutor.buildHeaders: gemini uses x-goog-api-key header", () => {
  const executor = new DefaultExecutor("gemini");
  const headers = executor.buildHeaders({ apiKey: "gem-key-1" }, true);
  assert.equal(headers["x-goog-api-key"], "gem-key-1");
  assert.equal(headers["Authorization"], undefined);
});

test("DefaultExecutor.buildHeaders: gemini falls back to accessToken when no apiKey", () => {
  const executor = new DefaultExecutor("gemini");
  const headers = executor.buildHeaders({ accessToken: "tok-gem" }, true);
  assert.equal(headers["Authorization"], "Bearer tok-gem");
  assert.equal(headers["x-goog-api-key"], undefined);
});

test("DefaultExecutor.buildHeaders: claude uses x-api-key header", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders({ apiKey: "sk-ant-123" }, true);
  assert.equal(headers["x-api-key"], "sk-ant-123");
  assert.equal(headers["Authorization"], undefined);
});

test("DefaultExecutor.buildHeaders: claude falls back to accessToken", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders({ accessToken: "tok-claude" }, true);
  assert.equal(headers["Authorization"], "Bearer tok-claude");
  assert.equal(headers["x-api-key"], undefined);
});

test("DefaultExecutor.buildHeaders: anthropic uses x-api-key header", () => {
  const executor = new DefaultExecutor("anthropic");
  const headers = executor.buildHeaders({ apiKey: "sk-ant-456" }, true);
  assert.equal(headers["x-api-key"], "sk-ant-456");
  assert.equal(headers["Authorization"], undefined);
});

test("DefaultExecutor.buildHeaders: azure-ai uses api-key header", () => {
  const executor = new DefaultExecutor("azure-ai");
  const headers = executor.buildHeaders({ apiKey: "az-key-1" }, true);
  assert.equal(headers["api-key"], "az-key-1");
  assert.equal(headers["Authorization"], undefined);
});

test("DefaultExecutor.buildHeaders: azure-ai uses accessToken when no apiKey", () => {
  const executor = new DefaultExecutor("azure-ai");
  const headers = executor.buildHeaders({ accessToken: "tok-az" }, true);
  assert.equal(headers["api-key"], "tok-az");
  assert.equal(headers["Authorization"], undefined);
});

test("DefaultExecutor.buildHeaders: snowflake strips pat/ prefix", () => {
  const executor = new DefaultExecutor("snowflake");
  const headers = executor.buildHeaders({ apiKey: "pat/my-token" }, true);
  assert.equal(headers["Authorization"], "Bearer my-token");
  assert.equal(headers["X-Snowflake-Authorization-Token-Type"], "PROGRAMMATIC_ACCESS_TOKEN");
});

test("DefaultExecutor.buildHeaders: snowflake uses KEYPAIR_JWT when no pat/ prefix", () => {
  const executor = new DefaultExecutor("snowflake");
  const headers = executor.buildHeaders({ apiKey: "jwt-token-abc" }, true);
  assert.equal(headers["Authorization"], "Bearer jwt-token-abc");
  assert.equal(headers["X-Snowflake-Authorization-Token-Type"], "KEYPAIR_JWT");
});

test("DefaultExecutor.buildHeaders: clarifai uses Key prefix", () => {
  const executor = new DefaultExecutor("clarifai");
  const headers = executor.buildHeaders({ apiKey: "clar-123" }, true);
  assert.equal(headers["Authorization"], "Key clar-123");
});

test("DefaultExecutor.buildHeaders: maritalk uses Key prefix", () => {
  const executor = new DefaultExecutor("maritalk");
  const headers = executor.buildHeaders({ apiKey: "mt-key-1" }, true);
  assert.equal(headers["Authorization"], "Key mt-key-1");
});

test("DefaultExecutor.buildHeaders: reka sets both Authorization and X-Api-Key", () => {
  const executor = new DefaultExecutor("reka");
  const headers = executor.buildHeaders({ apiKey: "reka-1" }, true);
  assert.equal(headers["Authorization"], "Bearer reka-1");
  assert.equal(headers["X-Api-Key"], "reka-1");
});

test("DefaultExecutor.buildHeaders: gigachat uses accessToken preferentially", () => {
  const executor = new DefaultExecutor("gigachat");
  const headers = executor.buildHeaders({ apiKey: "giga-key", accessToken: "giga-tok" }, true);
  assert.equal(headers["Authorization"], "Bearer giga-tok");
});

test("DefaultExecutor.buildHeaders: gigachat falls back to apiKey", () => {
  const executor = new DefaultExecutor("gigachat");
  const headers = executor.buildHeaders({ apiKey: "giga-key" }, true);
  assert.equal(headers["Authorization"], "Bearer giga-key");
});

test("DefaultExecutor.buildHeaders: generic provider uses Bearer Authorization", () => {
  const executor = new DefaultExecutor("openai");
  const headers = executor.buildHeaders({ apiKey: "sk-openai-1" }, true);
  assert.equal(headers["Authorization"], "Bearer sk-openai-1");
});

test("DefaultExecutor.buildHeaders: stream=true sets Accept text/event-stream", () => {
  const executor = new DefaultExecutor("openai");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["Accept"], "text/event-stream");
});

test("DefaultExecutor.buildHeaders: stream=false sets Accept application/json", () => {
  const executor = new DefaultExecutor("openai");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, false);
  assert.equal(headers["Accept"], "application/json");
});

test("DefaultExecutor.buildHeaders: OCI adds OpenAI-Project header when projectId present", () => {
  const executor = new DefaultExecutor("oci");
  const headers = executor.buildHeaders({ apiKey: "oci-key", projectId: "proj-123" }, true);
  assert.equal(headers["Authorization"], "Bearer oci-key");
  assert.equal(headers["OpenAI-Project"], "proj-123");
});

test("DefaultExecutor.buildHeaders: OCI omits OpenAI-Project when projectId absent", () => {
  const executor = new DefaultExecutor("oci");
  const headers = executor.buildHeaders({ apiKey: "oci-key" }, true);
  assert.equal(headers["Authorization"], "Bearer oci-key");
  assert.equal(headers["OpenAI-Project"], undefined);
});
