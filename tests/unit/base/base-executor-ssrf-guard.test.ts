import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../../open-sse/executors/default.ts";

// GHSA-4f49-hj64-448x — a persisted, caller-supplied providerSpecificData.baseUrl
// reaches fetch() on the runtime dispatch path with no SSRF guard. BaseExecutor
// now mirrors the provider VALIDATION guard before every upstream fetch. In the
// shipped default (block-metadata) mode the cloud-metadata IMDS pivot is blocked
// for non-local providers, public upstreams pass, and local / self-hosted
// providers (vLLM, LM Studio, Ollama, …) stay exempt so loopback/LAN keeps working.

function guardOf(provider: string) {
  const exec = new DefaultExecutor(provider) as unknown as {
    assertOutboundUrlAllowed(url: string): void;
  };
  return (url: string) => exec.assertOutboundUrlAllowed(url);
}

test("BaseExecutor blocks cloud-metadata for a non-local provider (GHSA-4f49-hj64-448x)", () => {
  const guard = guardOf("openai");
  assert.throws(() => guard("http://169.254.169.254/latest/meta-data/iam/security-credentials/"));
  // IPv4-mapped IPv6 spelling of the same address (folded out by #10843).
  assert.throws(() => guard("http://[::ffff:169.254.169.254]/latest/meta-data/"));
});

test("BaseExecutor allows a public upstream URL for a non-local provider", () => {
  const guard = guardOf("openai");
  assert.doesNotThrow(() => guard("https://api.openai.com/v1/chat/completions"));
});

test("BaseExecutor exempts local / self-hosted providers from the outbound guard", () => {
  assert.doesNotThrow(() => guardOf("ollama-local")("http://127.0.0.1:11434/v1/chat/completions"));
  assert.doesNotThrow(() => guardOf("lm-studio")("http://192.168.1.50:1234/v1/chat/completions"));
});

test("BaseExecutor guard is a no-op for an empty URL", () => {
  assert.doesNotThrow(() => guardOf("openai")(""));
});
