import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  assembleProviderModelsHeaders,
  PROVIDER_MODELS_CONFIG,
} from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { fetchClaudeDiscoveryModels } from "../../src/app/api/providers/[id]/models/discovery/claude.ts";
import { applyConnectionCustomHeaders } from "../../src/app/api/providers/[id]/models/discovery/connectionCustomHeaders.ts";

// Connection-level `providerSpecificData.customHeaders` (#8369 / #9497) already reach the chat
// path for every provider. Model discovery must send them too, or a key that needs one (e.g. an
// Anthropic key not scoped to a workspace, which requires `anthropic-workspace-id` on every
// request) chats fine but fails "Import models" with HTTP 400.

const KEY = "sk-ant-api-key-fixture";
const WORKSPACE = "wrkspc_fixture";

test("native anthropic discovery sends connection custom headers", () => {
  const headers = assembleProviderModelsHeaders(PROVIDER_MODELS_CONFIG.anthropic, KEY, {
    apiKey: KEY,
    providerSpecificData: { customHeaders: { "anthropic-workspace-id": WORKSPACE } },
  });
  assert.equal(headers["anthropic-workspace-id"], WORKSPACE);
  assert.equal(headers["x-api-key"], KEY);
  assert.equal(headers["Anthropic-Version"], "2023-06-01");
});

test("claude discovery (its own route branch) sends connection custom headers", async () => {
  const seen: Record<string, string>[] = [];
  const models = await fetchClaudeDiscoveryModels({
    accessToken: "",
    apiKey: KEY,
    providerSpecificData: {
      customHeaders: { "anthropic-workspace-id": WORKSPACE, "x-api-key": "attacker-key" },
    },
    fetchImpl: async (_url, init) => {
      seen.push(init.headers);
      return Response.json({ data: [{ id: "claude-fixture-1" }], has_more: false });
    },
  });
  assert.equal(models.length, 1);
  assert.equal(seen[0]["anthropic-workspace-id"], WORKSPACE);
  assert.equal(seen[0]["x-api-key"], KEY);
});

test("claude discovery without providerSpecificData is unchanged", async () => {
  const seen: Record<string, string>[] = [];
  await fetchClaudeDiscoveryModels({
    accessToken: "",
    apiKey: KEY,
    fetchImpl: async (_url, init) => {
      seen.push(init.headers);
      return Response.json({ data: [{ id: "claude-fixture-1" }], has_more: false });
    },
  });
  assert.ok(!Object.keys(seen[0]).some((k) => k.toLowerCase() === "anthropic-workspace-id"));
});

test("the helper returns the same object so inline discovery builders can wrap it", () => {
  const base = { "x-api-key": KEY, "anthropic-version": "2023-06-01" };
  const out = applyConnectionCustomHeaders(base, {
    customHeaders: { "anthropic-workspace-id": WORKSPACE, Authorization: "Bearer attacker" },
  });
  assert.equal(out, base);
  assert.equal(out["anthropic-workspace-id"], WORKSPACE);
  assert.ok(!("Authorization" in out));
  assert.equal(applyConnectionCustomHeaders(base, undefined), base);
});

test("route wires the helper into the claude and anthropic-compatible branches", () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/providers/[id]/models/route.ts"),
    "utf8"
  );
  assert.match(
    src,
    /fetchClaudeDiscoveryModels\(\{[^}]*providerSpecificData: connection\.providerSpecificData/
  );
  assert.match(src, /headers: applyConnectionCustomHeaders\(/);
});

test("custom headers cannot override discovery auth headers", () => {
  const headers = assembleProviderModelsHeaders(PROVIDER_MODELS_CONFIG.anthropic, KEY, {
    apiKey: KEY,
    providerSpecificData: {
      customHeaders: {
        "X-Api-Key": "attacker-key",
        Authorization: "Bearer attacker",
        Host: "evil.example",
        "anthropic-workspace-id": WORKSPACE,
      },
    },
  });
  assert.equal(headers["x-api-key"], KEY);
  assert.ok(!Object.keys(headers).some((k) => k.toLowerCase() === "authorization"));
  assert.ok(!Object.keys(headers).some((k) => k.toLowerCase() === "host"));
  assert.ok(!("X-Api-Key" in headers));
  assert.equal(headers["anthropic-workspace-id"], WORKSPACE);
});

test("a custom header replaces a same-named default case-insensitively, no duplicate", () => {
  const headers = assembleProviderModelsHeaders(PROVIDER_MODELS_CONFIG.anthropic, KEY, {
    apiKey: KEY,
    providerSpecificData: { customHeaders: { "anthropic-version": "2024-01-01" } },
  });
  const versionKeys = Object.keys(headers).filter((k) => k.toLowerCase() === "anthropic-version");
  assert.deepEqual(versionKeys, ["anthropic-version"]);
  assert.equal(headers["anthropic-version"], "2024-01-01");
});

test("CR/LF in a custom header name or value is dropped", () => {
  const headers = assembleProviderModelsHeaders(PROVIDER_MODELS_CONFIG.anthropic, KEY, {
    apiKey: KEY,
    providerSpecificData: {
      customHeaders: { "x-a\r\nx-b": "1", "x-c": "2\r\nx-d: 3", "x-ok": "fine" },
    },
  });
  assert.equal(headers["x-ok"], "fine");
  assert.ok(!Object.keys(headers).some((k) => /[\r\n]/.test(k) || k === "x-c"));
  assert.ok(!Object.values(headers).some((v) => /[\r\n]/.test(v)));
});

test("no customHeaders leaves discovery headers unchanged", () => {
  const withNothing = assembleProviderModelsHeaders(PROVIDER_MODELS_CONFIG.anthropic, KEY, {
    apiKey: KEY,
  });
  const withoutContext = assembleProviderModelsHeaders(PROVIDER_MODELS_CONFIG.anthropic, KEY);
  const withBadShape = assembleProviderModelsHeaders(PROVIDER_MODELS_CONFIG.anthropic, KEY, {
    apiKey: KEY,
    providerSpecificData: { customHeaders: ["anthropic-workspace-id", WORKSPACE] },
  });
  const expected = {
    "Anthropic-Version": "2023-06-01",
    "Content-Type": "application/json",
    "x-api-key": KEY,
  };
  assert.deepEqual(withNothing, expected);
  assert.deepEqual(withoutContext, expected);
  assert.deepEqual(withBadShape, expected);
});
