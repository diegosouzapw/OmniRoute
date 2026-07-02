import test from "node:test";
import assert from "node:assert/strict";

const { partitionZedCredentials } = await import("../../src/lib/zed-oauth/importUtils.ts");

type ImportableCredential = {
  provider: string;
  token: string;
};

test("partitionZedCredentials keeps only supported providers with tokens", () => {
  const result = partitionZedCredentials([
    {
      provider: "openai",
      service: "zed-openai",
      account: "api-key",
      token: "sk-openai",
    },
    {
      provider: "unknown",
      service: "zed-custom",
      account: "api-key",
      token: "custom-token",
    },
    {
      provider: "anthropic",
      service: "zed-anthropic",
      account: "api-key",
      token: "",
    },
  ]);

  assert.deepEqual(result.importable, [
    {
      provider: "openai",
      service: "zed-openai",
      account: "api-key",
      token: "sk-openai",
    },
  ]);
  assert.equal(result.skipped.length, 2);
  assert.equal(result.duplicatesDropped, 0);
});

test("partitionZedCredentials drops duplicate provider-token pairs from alias scans", () => {
  const result = partitionZedCredentials([
    {
      provider: "openai",
      service: "zed-openai",
      account: "api-key",
      token: "sk-openai",
    },
    {
      provider: "openai",
      service: "ai.zed.openai",
      account: "token",
      token: "sk-openai",
    },
    {
      provider: "anthropic",
      service: "zed-anthropic",
      account: "oauth",
      token: "sk-anthropic",
    },
  ]);

  assert.equal(result.importable.length, 2);
  assert.deepEqual(
    result.importable.map((entry: ImportableCredential) => `${entry.provider}:${entry.token}`),
    ["openai:sk-openai", "anthropic:sk-anthropic"]
  );
  assert.equal(result.skipped.length, 0);
  assert.equal(result.duplicatesDropped, 1);
});
