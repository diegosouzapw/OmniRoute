import test from "node:test";
import assert from "node:assert/strict";
import { buildOpenHandsEnv, serializeOpenHandsEnv } from "../src/env.ts";
import { resolveOpenHandsModel, buildOpenHandsModel } from "../src/model-map.ts";
import { buildOpenHandsCompose, buildOpenHandsDockerRun } from "../src/docker.ts";

test("buildOpenHandsEnv produces LLM vars pointing at OmniRoute", () => {
  const env = buildOpenHandsEnv({
    apiKey: "sk-test-123",
    model: "deepseek-chat",
    omnirouteUrl: "http://192.168.3.106:20128",
    persistenceDir: "/opt/state",
    corsOrigins: ["http://100.73.44.17:3000"],
  });
  assert.equal(env.LLM_MODEL, "deepseek-chat");
  assert.equal(env.LLM_BASE_URL, "http://192.168.3.106:20128/v1");
  assert.equal(env.LLM_API_KEY, "sk-test-123");
  assert.equal(env.OH_PERSISTENCE_DIR, "/opt/state");
  assert.equal(env.PERMITTED_CORS_ORIGINS, "http://100.73.44.17:3000");
});

test("serializeOpenHandsEnv quotes values with whitespace/#", () => {
  const out = serializeOpenHandsEnv({ LLM_MODEL: "deepseek-chat", LLM_BASE_URL: "http://localhost:20128/v1" });
  const lines = out.trim().split("\n");
  assert.ok(lines.some((l) => l.startsWith("LLM_MODEL=deepseek-chat")));
  assert.ok(lines.some((l) => l.startsWith("LLM_BASE_URL=http://localhost:20128/v1")));
});

test("resolveOpenHandsModel maps known names to OmniRoute IDs", () => {
  assert.equal(resolveOpenHandsModel("deepseek-chat"), "ds/deepseek-v4-flash");
  assert.equal(resolveOpenHandsModel("glm-5.2"), "nvidia/z-ai/glm-5.2");
  assert.equal(resolveOpenHandsModel("gpt-4o"), "openai/gpt-4o");
});

test("resolveOpenHandsModel passes unknown names through unchanged", () => {
  assert.equal(resolveOpenHandsModel("vivanta-core"), "vivanta-core");
  assert.equal(resolveOpenHandsModel(""), "");
});

test("resolveOpenHandsModel accepts custom map overrides", () => {
  const custom = { "my-alias": "nvidia/z-ai/glm-5.2" };
  assert.equal(resolveOpenHandsModel("my-alias", custom), "nvidia/z-ai/glm-5.2");
  assert.equal(resolveOpenHandsModel("deepseek-chat", custom), "deepseek-chat");
});

test("buildOpenHandsModel passes combo names through", () => {
  assert.equal(buildOpenHandsModel("vivanta-core"), "vivanta-core");
  assert.equal(buildOpenHandsModel("ds/deepseek-v4-flash"), "ds/deepseek-v4-flash");
});

test("buildOpenHandsCompose includes privileged, extra_hosts, volume, CORS", () => {
  const compose = buildOpenHandsCompose({
    apiKey: "sk-x",
    model: "deepseek-chat",
    persistenceDir: "/Users/me/.openhands-state",
    corsOrigins: ["http://localhost:3000"],
  });
  assert.ok(compose.includes("privileged: true"), "privileged present");
  assert.ok(compose.includes("host.docker.internal:host-gateway"), "host-gateway present");
  assert.ok(compose.includes("/Users/me/.openhands-state"), "persistence volume present");
  assert.ok(compose.includes("LLM_BASE_URL: \"http://localhost:20128/v1\""), "base url present");
  assert.ok(compose.includes("PERMITTED_CORS_ORIGINS: \"http://localhost:3000\""), "cors present");
});

test("buildOpenHandsDockerRun produces a runnable docker command", () => {
  const run = buildOpenHandsDockerRun({
    apiKey: "sk-x",
    model: "glm-5.2",
    persistenceDir: "/opt/state",
  });
  assert.ok(run.startsWith("docker run"));
  assert.ok(run.includes("--privileged"));
  assert.ok(run.includes("--add-host host.docker.internal:host-gateway"));
  assert.ok(run.includes("LLM_MODEL=\"glm-5.2\""));
  assert.ok(run.includes("LLM_BASE_URL=\"http://localhost:20128/v1\""));
});
