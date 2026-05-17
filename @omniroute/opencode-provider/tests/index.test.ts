import test from "node:test";
import assert from "node:assert/strict";

import {
  buildOmniRouteOpenCodeConfig,
  createOmniRouteProvider,
  normalizeBaseURL,
  OMNIROUTE_DEFAULT_OPENCODE_MODELS,
  OMNIROUTE_PROVIDER_NPM,
  OPENCODE_CONFIG_SCHEMA,
} from "../src/index.ts";

test("normalizeBaseURL preserves a bare host:port", () => {
  assert.equal(normalizeBaseURL("http://localhost:20128"), "http://localhost:20128/v1");
});

test("normalizeBaseURL strips trailing slashes", () => {
  assert.equal(normalizeBaseURL("http://localhost:20128////"), "http://localhost:20128/v1");
});

test("normalizeBaseURL deduplicates an existing /v1 suffix", () => {
  assert.equal(normalizeBaseURL("http://localhost:20128/v1"), "http://localhost:20128/v1");
  assert.equal(normalizeBaseURL("http://localhost:20128/v1/"), "http://localhost:20128/v1");
});

test("normalizeBaseURL rejects empty input", () => {
  assert.throws(() => normalizeBaseURL("   "), /baseURL is required/);
});

test("normalizeBaseURL rejects malformed URLs", () => {
  assert.throws(() => normalizeBaseURL("not a url"), /not a valid URL/);
});

test("createOmniRouteProvider validates required fields", () => {
  assert.throws(
    () => createOmniRouteProvider({ baseURL: "", apiKey: "x" } as never),
    /baseURL is required/
  );
  assert.throws(
    () => createOmniRouteProvider({ baseURL: "http://x", apiKey: "" } as never),
    /apiKey is required/
  );
});

test("createOmniRouteProvider produces the OpenCode-compatible shape", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });

  assert.equal(provider.npm, OMNIROUTE_PROVIDER_NPM);
  assert.equal(provider.name, "OmniRoute");
  assert.equal(provider.options.baseURL, "http://localhost:20128/v1");
  assert.equal(provider.options.apiKey, "sk_omniroute");
  assert.equal(typeof provider.models, "object");
});

test("createOmniRouteProvider seeds the default model catalog", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });

  const modelIds = Object.keys(provider.models).sort();
  const defaultIds = [...OMNIROUTE_DEFAULT_OPENCODE_MODELS].sort();
  assert.deepEqual(modelIds, defaultIds);
  for (const id of defaultIds) {
    assert.equal(provider.models[id]?.name, id);
  }
});

test("createOmniRouteProvider honours a custom models list and labels", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    models: ["auto", "claude-opus-4-7"],
    modelLabels: { auto: "Auto-Combo", "claude-opus-4-7": "Opus 4.7" },
  });

  assert.deepEqual(Object.keys(provider.models), ["auto", "claude-opus-4-7"]);
  assert.equal(provider.models.auto.name, "Auto-Combo");
  assert.equal(provider.models["claude-opus-4-7"].name, "Opus 4.7");
});

test("createOmniRouteProvider deduplicates and trims model ids", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    models: ["  auto  ", "auto", "", "claude-opus-4-7"],
  });
  assert.deepEqual(Object.keys(provider.models), ["auto", "claude-opus-4-7"]);
});

test("createOmniRouteProvider honours displayName override", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    displayName: "Local OmniRoute",
  });
  assert.equal(provider.name, "Local OmniRoute");
});

test("buildOmniRouteOpenCodeConfig wraps the provider with the OpenCode schema", () => {
  const doc = buildOmniRouteOpenCodeConfig({
    baseURL: "http://localhost:20128/v1",
    apiKey: "sk_omniroute",
  });

  assert.equal(doc.$schema, OPENCODE_CONFIG_SCHEMA);
  assert.equal(typeof doc.provider.omniroute, "object");
  assert.equal(doc.provider.omniroute.options.baseURL, "http://localhost:20128/v1");
});

test("config document is JSON-serialisable", () => {
  const doc = buildOmniRouteOpenCodeConfig({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });
  const round = JSON.parse(JSON.stringify(doc));
  assert.deepEqual(round, doc);
});
